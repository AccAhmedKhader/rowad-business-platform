# End-to-End Authorization Flow & Policy Enforcement

**Document Identifier:** EB-ARCH-AUTHZ-FLOW-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Authorization Flow Architecture

```text
Incoming HTTP Request
         │
         ▼
┌────────────────────────────────────────────────────────┐
│  STEP 1: Authentication Middleware                     │
│  - Extracts Bearer Token from Authorization Header     │
│  - Validates Cryptographic Signature & Expiration      │
│  - Extracts `sub` (userId) and `sid` (sessionId)       │
└────────────────────────┬───────────────────────────────┘
                         │ Valid
                         ▼
┌────────────────────────────────────────────────────────┐
│  STEP 2: Session & Account Liveness Verification       │
│  - Checks `UserSession` status === 'ACTIVE'            │
│  - Checks `User` status === 'ACTIVE'                   │
│  (Fails immediately if SUSPENDED, LOCKED, or REVOKED)  │
└────────────────────────┬───────────────────────────────┘
                         │ Active
                         ▼
┌────────────────────────────────────────────────────────┐
│  STEP 3: Role & Permission Resolution                  │
│  - Queries active `UserRoleAssignment` records         │
│  - Resolves cumulative `RolePermission` set            │
│  - Identifies applicable `AssignmentScopeType`         │
└────────────────────────┬───────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│  STEP 4: Action & Scope Matching                       │
│  - Does permission set include `<resource>.<action>`?  │
│  - Does request context satisfy assignment scope?      │
│    * GLOBAL -> Allow                                   │
│    * ORGANIZATION -> Matches tenant                    │
│    * ASSIGNED -> Matches roster                        │
│    * SELF -> Matches actor identity                    │
└────────────────────────┬───────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
     Granted│                   Denied│
            ▼                         ▼
┌────────────────────────┐  ┌────────────────────────┐
│  Execute Controller    │  │  Return 403 Forbidden  │
│  & Business Logic      │  │  Emit Security Probe   │
└────────────────────────┘  └────────────────────────┘
```

---

## 2. Policy Enforcement Steps

### Step 1: Authentication & Token Validation
The middleware extracts the token from `Authorization: Bearer <jwt>`.
* If header is missing or malformed: Returns `401 UNAUTHORIZED - MISSING_BEARER_TOKEN`.
* If signature fails or token is expired: Returns `401 UNAUTHORIZED - INVALID_OR_EXPIRED_TOKEN`.
* Extracts `req.actor = { userId: decoded.sub, sessionId: decoded.sid }`.

### Step 2: Server-Authoritative Liveness Check
Unlike purely stateless JWT architectures that remain blind to user suspensions for up to an hour, the platform executes an authoritative session lookup (cached with a 30-second TTL in high-performance environments):
```typescript
const session = await sessionRepository.findById(req.actor.sessionId);
if (!session || session.status !== 'ACTIVE') {
  return res.status(401).json({
    success: false,
    error: { code: 'SESSION_REVOKED', message: 'انتهت صلاحية الجلسة أو تم إلغاؤها' }
  });
}

const user = await userRepository.findById(req.actor.userId);
if (!user || user.status !== 'ACTIVE') {
  return res.status(403).json({
    success: false,
    error: { 
      code: 'ACCOUNT_SUSPENDED', 
      message: 'تم إيقاف هذا الحساب إدارياً. يرجى مراجعة إدارة المنظومة' 
    }
  });
}
```

### Step 3: Dynamic Permission Resolution
The authorization service resolves all active role assignments for `user.id`:
* Filters out expired assignments (`expiresAt < now()`).
* Gathers permissions linked through `RolePermission`.

### Step 4: Contextual Scope & Ownership Evaluation
When checking a permission (e.g., `attempts.view`):
1. **Global Grant:** If user holds `SUPER_ADMIN`, `PLATFORM_ADMIN`, or an assignment with `scopeType = 'GLOBAL'`, access is granted.
2. **Organization Grant:** If user holds `ORGANIZATION` scope, verifies `context.organizationId === assignment.scopeId`.
3. **Assigned Pedagogical Scope:** If user holds `TEACHER`, checks whether target student is enrolled in the teacher's active classes.
4. **Self Ownership Scope:** If user holds `STUDENT`, checks whether target resource `userId === req.actor.userId`.

---

## 3. Denial & Telemetry Logging

Whenever authorization is denied:
1. **Response:** A standardized `403 Forbidden` response is returned. To prevent metadata leakage, the error message does not disclose existence of sensitive resources outside scope.
2. **Security Telemetry:** Emits an immutable `SecurityEvent`:
   ```json
   {
     "eventType": "PRIVILEGE_PROBE_DENIED",
     "severity": "WARN",
     "actorId": "usr_student_1",
     "details": {
       "attemptedAction": "users.view",
       "attemptedScope": "GLOBAL",
       "targetResourceId": "usr_admin_1",
       "ipAddress": "197.165.45.12",
       "userAgent": "Mozilla/5.0..."
     }
   }
   ```
3. **Threshold Alerting:** If an account accumulates more than 5 denied privilege probes within 10 minutes, the account is temporarily flagged for security review.
