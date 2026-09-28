# Test Matrix & Verification Specification: Identity, User & Access

**Document Identifier:** EB-ARCH-TEST-MATRIX-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Quality Assurance & Verification Standard  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Test Strategy Overview

The testing matrix provides exhaustive verification of the architectural invariants defined across the Identity, User, Session, and Authorization domains.

Testing is divided into five critical tiers:
1. **UNIT:** Algorithmic verification of normalizers, DTO validators, and token claims.
2. **INTEGRATION:** Service-to-database transactions, password hashing, and session lifecycles.
3. **POLICY:** Matrix evaluation of permissions and multi-tenant scopes.
4. **SECURITY:** Penetration-style tests for privilege escalation, token reuse, and brute-force lockouts.
5. **REGRESSION:** Verification that existing student attempts, progress, and mastery calculations remain 100% intact.

---

## 2. Exhaustive Verification Test Cases

| Test ID | Test Category | Description & Scenario | Inputs / Preconditions | Expected Outcome | Priority |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **AUTH-P0-01** | Security | Fail-fast on missing JWT secrets | Unset `JWT_ACCESS_SECRET` in environment | Server throws fatal exception on boot and terminates immediately | **P0** |
| **AUTH-P0-02** | Security | Fail-fast on weak/default JWT secrets | Set `JWT_ACCESS_SECRET = "secret"` | Server throws fatal exception refusing known weak placeholders | **P0** |
| **AUTH-P0-03** | Auth Positive | Standard Student Registration | Valid email, password meeting complexity, names | `201 Created`, user role is `STUDENT`, `status = 'PENDING_VERIFICATION'` | **P0** |
| **AUTH-P0-04** | Security | Privilege Escalation in Registration | Registration payload with injected `role: 'ADMIN'` | Role injection ignored; user created strictly as `STUDENT` | **P0** |
| **AUTH-P0-05** | Auth Positive | Standard Login with Valid Credentials | Correct email and password for active user | `200 OK`, issues 15-min JWT, issues rotating refresh token, returns session ID | **P0** |
| **AUTH-P0-06** | Auth Negative | Login with Incorrect Password | Valid email, wrong password | `401 INVALID_CREDENTIALS`, failed attempt counter incremented | **P0** |
| **AUTH-P0-07** | Security | Account Brute-Force Lockout | 5 consecutive invalid login attempts within 15 mins | Account status transitions to `LOCKED`, returns `403 ACCOUNT_LOCKED` | **P0** |
| **SESS-P0-01** | Session Positive| Normal Refresh Token Rotation (RTR) | Valid active `refreshToken` and `sessionId` | `200 OK`, old token invalidated, new access token & refresh token issued | **P0** |
| **SESS-P0-02** | Security | Refresh Token Reuse Anomaly Detection | Re-submitting a previously rotated refresh token | `401 SESSION_REVOKED_THEFT`, all sessions in token family revoked immediately | **P0** |
| **SESS-P0-03** | Session Positive| User Self-Service Session Revocation | Call `/api/auth/sessions/:id/revoke` for device B | Device B session marked `REVOKED`, cannot be used for refresh; Device A remains active | **P1** |
| **SESS-P0-04** | Session Positive| Revoke All Other Sessions | Call `/api/auth/sessions/revoke-all` from Device A | All sessions except current marked `REVOKED` | **P1** |
| **AUTHZ-P0-01**| Authz Negative| Block Suspended Account with Valid Token | Active JWT token presented for user suspended in DB | Request rejected with `403 ACCOUNT_SUSPENDED` | **P0** |
| **AUTHZ-P0-02**| Scope / RBAC | Student Access to Own Attempts | Student queries `/api/progress/student?studentId=self` | `200 OK`, returns attempts | **P0** |
| **AUTHZ-P0-03**| Scope / IDOR | Student Attempt to Access Other Student | Student queries `/api/progress/student?studentId=other`| `403 FORBIDDEN - OWNERSHIP_REQUIRED` | **P0** |
| **AUTHZ-P0-04**| Scope / RBAC | Teacher Access to Assigned Student Roster | Teacher queries enrolled students | `200 OK`, returns class learning analytics | **P1** |
| **AUTHZ-P0-05**| Scope / RBAC | Teacher Cross-School Student Denial | Teacher queries student from different school | `403 FORBIDDEN - RESOURCE_OUTSIDE_ASSIGNED_SCOPE` | **P1** |
| **AUTHZ-P0-06**| RBAC Hierarchy| Platform Admin cannot create Super Admin | Admin attempts `user_roles.assign` with `SUPER_ADMIN` | `403 FORBIDDEN - CANNOT_ASSIGN_HIGHER_PRIORITY_ROLE` | **P0** |
| **DATA-P0-01** | Regression | Migration 1:1 Record Preservation | Run migration against test database snapshot | Target user count strictly equals legacy user count; 0 orphaned attempts | **P0** |
| **DATA-P0-02** | Regression | Existing Student Attempt Linkage | Query student `usr-student-1` attempts after migration | All 72 historical attempts resolve to valid student profile | **P0** |
| **CONT-P0-01** | Security | Question Option Sanitization | Unauthenticated or student requests question bank | Options stripped of `is_correct`, `explanation` omitted | **P0** |

---

## 3. Test Execution Framework

The test suite executes inside the standard Vitest runner:
```bash
# Run targeted identity & authorization test suite
npm run test:integration -- src/server/__tests__/auth.test.ts src/server/__tests__/authorization.test.ts src/server/__tests__/security_p0_remediation.test.ts
```

All 20 test cases will be compiled into the regression gate for Phase U2.
