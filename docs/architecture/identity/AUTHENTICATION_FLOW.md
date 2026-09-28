# End-to-End Authentication Flow Specification

**Document Identifier:** EB-ARCH-AUTHN-FLOW-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Login Authentication Flow (Sequence Diagram)

```text
User / Client                      Auth Gateway                  Auth Service                 Database / Cache
      │                                 │                             │                               │
      │── 1. POST /api/auth/login ─────►│                             │                               │
      │   (identifier, password)        │── 2. Rate Limit Check ─────►│                               │
      │                                 │                             │── 3. Find UserIdentifier ────►│
      │                                 │                             │◄─ Return Identity + Credential│
      │                                 │                             │                               │
      │                                 │                             │── 4. Verify Account Status ───│
      │                                 │                             │   (Reject if SUSPENDED/LOCKED)│
      │                                 │                             │                               │
      │                                 │                             │── 5. bcrypt.compare() ────────│
      │                                 │                             │                               │
      │                                 │                             │── 6. On Success: ─────────────│
      │                                 │                             │   Create UserSession          │
      │                                 │                             │   Issue JWT Access Token      │
      │                                 │                             │   Issue Rotation Refresh Token│
      │                                 │                             │── 7. Save Session & Hash ────►│
      │                                 │                             │── 8. Emit Audit & Security ──►│
      │◄─ 200 OK (Tokens, Session, User)│◄────────────────────────────│                               │
```

---

## 2. Step-by-Step Flow Specifications

### 2.1 Public Student Registration Flow
1. **Request Intake:** Client submits `email`, `password`, `firstName`, `lastName`.
2. **Schema Validation:** Zod schema validates email RFC format, minimum password complexity (8+ characters with mixed case, number, special character).
3. **Identifier Normalization:** Email trimmed and lowercased.
4. **Uniqueness Check:** Database checks `UserIdentifier` for `(type='EMAIL', normalizedValue)`. If collision, returns `409 EMAIL_ALREADY_REGISTERED`.
5. **Cryptographic Hashing:** `bcrypt.hash(password, 10)`.
6. **Aggregate Creation:** In a single database transaction:
   * Create `Identity` (`status = 'UNVERIFIED'`).
   * Create `UserIdentifier` (`isPrimary = true, isVerified = false`).
   * Create `Credential` (`type = 'PASSWORD', secretHash`).
   * Create `User` (`status = 'PENDING_VERIFICATION'`).
   * Create `UserProfile` (`firstName`, `lastName`, `displayName = firstName + ' ' + lastName`).
   * Create `UserRoleAssignment` (`role = 'STUDENT', scope = 'GLOBAL'`).
   * Create `VerificationToken` (64-byte random hex, hashed via SHA-256).
7. **Email Dispatch:** Verification email queued with single-use verification link.
8. **Audit & Response:** Emits `USER_REGISTERED` audit event; returns `201 Created` with provisional student profile.

---

### 2.2 Refresh Token Rotation & Re-authentication Flow
1. **Request:** Client submits `sessionId` and raw `refreshToken`.
2. **Session Lookup:** Auth service queries `UserSession` by `id = sessionId`.
3. **Liveness Check:** If session does not exist, is `EXPIRED`, or is `REVOKED`, reject with `401 INVALID_SESSION`.
4. **Cryptographic Comparison:** Compute `hash = SHA256(refreshToken)`.
   * **Branch A (Valid Rotation):** `hash === session.currentRefreshTokenHash`:
     * Generate `newRefreshToken` and compute `newHash`.
     * Update `UserSession`: `currentRefreshTokenHash = newHash`, `rotationCounter += 1`, `lastActiveAt = now()`.
     * Sign new short-lived JWT access token (15 mins).
     * Return `200 OK` with both tokens.
   * **Branch B (Malicious Reuse Detected):** `hash !== session.currentRefreshTokenHash`:
     * Check if token was previously recorded in historical family logs.
     * If previously consumed: **Trigger Immediate Family Revocation**.
     * Mark `RefreshTokenFamily.isCompromised = true`.
     * Mark `UserSession.status = 'SUSPICIOUS_REUSE'`.
     * Revoke all active sessions linked to this `tokenFamilyId`.
     * Emit high-priority `SECURITY_ALERT` (`REFRESH_TOKEN_REUSE_DETECTED`).
     * Return `401 SESSION_REVOKED_THEFT`.

---

### 2.3 Password Reset Flow (Anti-Enumeration)
1. **Forgot Password Request:** User inputs identifier at `POST /api/v2/auth/password/forgot`.
2. **Lookup:** Server checks `UserIdentifier`.
3. **Generic Response:** Regardless of whether the identifier exists, the server responds with:
   ```json
   {
     "success": true,
     "message": "إذا كان الحساب مسجلاً في المنظومة، فقد تم إرسال تعليمات إعادة التعيين."
   }
   ```
4. **Token Generation (If Found):** 
   * Generates cryptographically secure random token (32 bytes entropy).
   * Stores SHA-256 hash in `VerificationToken` (`purpose = 'PASSWORD_RESET'`, TTL = 15 minutes).
   * Sends reset URL containing raw token to user's registered email.
5. **Token Consumption:** User visits reset link, inputs new password.
   * Server validates token hash, checks expiration and `consumedAt IS NULL`.
   * Verifies new password does not match recent passwords in `PasswordHistory`.
   * Updates `Credential.secretHash` with new bcrypt hash.
   * Marks token `consumedAt = now()`.
   * **Session Revocation Policy:** Immediately revokes all active `UserSession` entries for this user, forcing re-authentication everywhere.
   * Emits `PASSWORD_RESET_SUCCESS` audit event.

---

### 2.4 Multi-Factor Authentication (MFA) Step-Up Flow
1. **Primary Authentication:** User validates password.
2. **MFA Enforcement Evaluation:** If user has active `MfaMethod`:
   * Temporary ephemeral session token issued (`scope: "mfa:challenge"`, TTL = 5 minutes).
   * Client receives `403 MFA_REQUIRED` with available method types (e.g., `TOTP`).
3. **Challenge Verification:** User submits 6-digit TOTP code to `POST /api/v2/auth/mfa/verify`.
4. **Validation:** Auth service decrypts TOTP secret and validates time-drift code (`RFC 6238`, window $\pm 1$).
5. **Completion:** Upon success, standard access token and rotating refresh token are issued with claim `"amr": ["pwd", "totp"]`.
