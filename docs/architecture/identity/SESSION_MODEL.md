# Session Management & Token Lifecycle Specification

**Document Identifier:** EB-ARCH-SESS-MODEL-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Overview & Architectural Philosophy

The **Session Management Model** defines how authenticated sessions are established, tracked, validated, and terminated across client interfaces (web browser, mobile, institutional testing lab).

### Key Architectural Tenet: Server-Authoritative Sessions
While modern web clients utilize JSON Web Tokens (JWT) for high-performance stateless API routing, security-critical events (logout, password change, account suspension, privilege modification, token theft) **must** have immediate server-authoritative invalidation power.

```text
┌──────────────────────────────────────────────────────────────┐
│                    CLIENT APPLICATION                        │
│                                                              │
│  Access Token (Short-lived: 15 mins)                         │
│  - In-memory / closure storage (XSS protected)               │
│                                                              │
│  Refresh Token (Long-lived: 7-30 days)                       │
│  - HttpOnly, SameSite=Strict, Secure Cookie OR Auth API body │
└──────────────────────────────┬───────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────────────┐ ┌─────────────────────────────┐
│    API GATEWAY / MIDDLEWARE   │ │     AUTH SERVICE / ENGINE   │
│                               │ │                             │
│  Fast path:                   │ │  Full Session Validation:   │
│  - Cryptographic JWT verify   │ │  - Check UserSession in DB  │
│  - Expiry / Issuer / Audience │ │  - Check Account Status     │
│  - Scope verification         │ │  - Refresh Token Rotation   │
└───────────────────────────────┘ └─────────────────────────────┘
```

---

## 2. Session Domain Entity (`UserSession`)

Every login creates a distinct, auditable `UserSession` aggregate root. Refresh tokens do not float as detached strings; they are strictly bound to a session and tracked within a cryptographic token family.

```typescript
export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  SUSPICIOUS_REUSE = 'SUSPICIOUS_REUSE'
}

export interface UserSession {
  id: string;                                  // UUIDv4 (Session Identifier: sid)
  userId: string;                              // FK -> User.id
  identityId: string;                          // FK -> Identity.id
  status: SessionStatus;
  
  // Cryptographic Refresh Tracking
  currentRefreshTokenHash: string;             // SHA-256 hash of active refresh token
  tokenFamilyId: string;                       // UUID linking the rotation chain
  rotationCounter: number;                     // Sequence counter for rotation detection
  
  // Client & Network Context (Privacy-Preserving)
  ipAddressMasked?: string;                    // e.g., "197.165.xx.xx"
  userAgent?: string;                          // Browser user agent header string
  deviceType?: 'DESKTOP' | 'MOBILE' | 'TABLET' | 'LAB_TERMINAL';
  clientName?: string;                         // e.g., "Chrome on Windows 11"
  
  // Lifecycle & Invalidation
  createdAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;                             // Absolute session expiry (e.g., 30 days)
  idleExpiresAt: Date;                         // Inactivity timeout (e.g., 2 hours for exam mode)
  revokedAt?: Date;
  revokedByUserId?: string;                    // Self or Admin
  revokeReason?: 'USER_LOGOUT' | 'USER_REVOKED_OTHER' | 'PASSWORD_CHANGED' | 'ADMIN_TERMINATION' | 'TOKEN_REUSE_DETECTED';
}
```

---

## 3. Refresh Token Rotation (RTR) & Family Reuse Detection

To neutralize the risk of refresh token leakage (e.g., via network interception, browser storage compromise, or cache dumps), the platform implements strict **Single-Use Refresh Token Rotation with Automatic Family Revocation**.

### 3.1 Normal Rotation Lifecycle (Happy Path)
```text
Client                         Server                         Database
  │                              │                               │
  │─── POST /api/auth/refresh ──►│                               │
  │    (Token A, sid)            │─── Verify Hash(Token A) ─────►│
  │                              │◄── Hash Matches Active ───────│
  │                              │                               │
  │                              │─── 1. Invalidate Token A ────►│
  │                              │    2. Issue Token B           │
  │                              │    3. Hash(Token B) stored ──►│
  │                              │    4. rotationCounter += 1    │
  │◄── 200 OK ───────────────────│                               │
  │    (AccessToken B,           │                               │
  │     RefreshToken B)          │                               │
```

### 3.2 Malicious Reuse Detection & Threat Response (Theft Scenario)
If an attacker steals **Token A** and attempts to exchange it after the legitimate client has already rotated to **Token B**:

```text
Attacker                       Server                         Database
  │                              │                               │
  │─── POST /api/auth/refresh ──►│                               │
  │    (Stolen Token A, sid)     │─── Verify Hash(Token A) ─────►│
  │                              │    Token A was PREVIOUSLY     │
  │                              │    consumed! (REUSE DETECTED) │
  │                              │                               │
  │                              │─── 1. REVOKE ALL SESSIONS ───►│
  │                              │       in Token Family         │
  │                              │    2. Mark Session:           │
  │                              │       SUSPICIOUS_REUSE        │
  │                              │    3. Emit Critical Security  │
  │                              │       Telemetry Event         │
  │◄── 401 Unauthorized ─────────│                               │
  │    (SESSION_REVOKED_THEFT)   │                               │
```

**Immediate Actions on Reuse:**
1. Invalidate the entire `tokenFamilyId` immediately.
2. Invalidate all access and refresh capabilities for that session.
3. Emit high-priority `SECURITY_ALERT` (`REFRESH_TOKEN_REUSE_ATTACK`).
4. Force re-authentication with MFA or password verification on next client request.

---

## 4. Access Token (JWT) Claim Specification

Target access tokens contain only minimal claims necessary for distributed micro-routing and request context.

```json
{
  "iss": "https://api.eb.edu.eg",
  "sub": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "aud": "https://eb.edu.eg",
  "sid": "sess_8f29c2d1-0f7a-4a2e-b6a3-6e2a1b9f7a4e",
  "jti": "tok_1a2b3c4d5e6f7a8b9c0d",
  "iat": 1774416000,
  "exp": 1774416900,
  "amr": ["pwd"],
  "scope": "openid profile email"
}
```

### Claim Definitions:
| Claim | Type | Description |
| :--- | :--- | :--- |
| `iss` | String | Token issuer (`https://api.eb.edu.eg`). |
| `sub` | String | Subject: System `User.id` (Immutable). |
| `aud` | String | Audience identifier (`https://eb.edu.eg`). |
| `sid` | String | Session ID matching active `UserSession.id`. |
| `jti` | String | Unique token ID for replay prevention. |
| `iat` | Integer | Issued at timestamp (UNIX epoch seconds). |
| `exp` | Integer | Expiration timestamp (15 minutes from issuance). |
| `amr` | Array | Authentication Method Reference (e.g., `["pwd"]`, `["pwd", "totp"]`). |

**Omission Rule:**  
Roles and permissions are **not** embedded as static claims in the access token for authoritative RBAC decisions. Authorization is verified server-side against the actor's current active role and permission matrix.

---

## 5. Secret Policy & Cryptographic Hygiene

### 5.1 Zero-Fallback Startup Validation
The application server must fail immediately at boot time if cryptographic secrets are absent, default, or weak.

```typescript
// Strict Fail-Fast Secret Assertion
export function assertCryptographicEnvironment(): void {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  
  if (!accessSecret || accessSecret.length < 32) {
    throw new Error('[FATAL SECURITY EXCEPTION] JWT_ACCESS_SECRET is missing or lacks 256-bit entropy (minimum 32 characters required). Server cannot start.');
  }
  
  if (!refreshSecret || refreshSecret.length < 32) {
    throw new Error('[FATAL SECURITY EXCEPTION] JWT_REFRESH_SECRET is missing or lacks 256-bit entropy (minimum 32 characters required). Server cannot start.');
  }
  
  const forbiddenPlaceholders = [
    'eb_jwt_access_secret_production_2026_super_secure_key',
    'eb_jwt_refresh_secret_production_2026_super_secure_key',
    'change_this_to_a_secure_random_string_in_production',
    'secret', 'password', '123456'
  ];
  
  if (forbiddenPlaceholders.includes(accessSecret) || forbiddenPlaceholders.includes(refreshSecret)) {
    throw new Error('[FATAL SECURITY EXCEPTION] Production server detected prohibited default secret placeholder in environment configuration.');
  }
}
```

---

## 6. Session Lifecycle API Capabilities

The platform exposes self-service and administrative session lifecycle controls:

| Endpoint | Method | Permission / Scope | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/sessions` | `GET` | `sessions.view_self` | List active sessions for the current user. |
| `/api/auth/sessions/:id/revoke` | `POST` | `sessions.revoke_self` | Revoke a specific session (e.g., lost phone). |
| `/api/auth/sessions/revoke-all` | `POST` | `sessions.revoke_self` | Terminate all active sessions except current. |
| `/api/admin/users/:id/sessions` | `GET` | `sessions.view_admin` | View all active sessions of a managed user. |
| `/api/admin/users/:id/sessions/terminate` | `POST` | `sessions.terminate_admin` | Forcefully kill all sessions of a compromised account. |
