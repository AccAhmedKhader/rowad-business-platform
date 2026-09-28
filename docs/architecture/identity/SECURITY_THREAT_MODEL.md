# Security Threat Model: Identity, Authentication & Access Control

**Document Identifier:** EB-ARCH-SEC-THREAT-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Threat Modeling & Risk Mitigation Analysis  
**Frameworks Referenced:** STRIDE, OWASP ASVS v4.0, NIST SP 800-63-4  
**Status:** APPROVED FOUNDATION

---

## 1. Executive Summary & Threat Landscape

As the digital backbone for the Egyptian Baccalaureate (EB) educational system, the platform handles official examinations, student academic records, continuous assessment grading, and educator credentials.

This Threat Model assesses 18 distinct threat vectors targeting identity, sessions, and authorization mechanisms, providing forensic analysis of the current baseline alongside the mandatory target mitigations.

---

## 2. Threat Analysis & Mitigation Matrix

### 2.1 Credential Stuffing & Automated Spraying
* **Threat:** Automated botnets testing compromised credential dumps from other platforms against EB login endpoints.
* **Attack Surface:** `POST /api/auth/login`.
* **Current State:** Basic Express rate limiter (100 req / 15 min / IP). Vulnerable to distributed proxy rotation.
* **Target Control:** Distributed rate limiting with account-level velocity tracking; CAPTCHA on suspicious velocity; temporary account lockout after 5 consecutive failures; proactive password breach dictionary validation (NIST SP 800-63-4).
* **Residual Risk:** Low.
* **Verification Test:** Automated simulation of 20 rapid login attempts using distributed IP headers to verify account-level lockout.

---

### 2.2 Brute-Force Password Guessing
* **Threat:** Targeted dictionary or brute-force attack against high-value accounts (e.g., `admin@eb.edu.eg`, `content@eb.edu.eg`).
* **Attack Surface:** `POST /api/auth/login`.
* **Current State:** No exponential backoff or account lockout in JSON database; rate limit is per-IP only.
* **Target Control:** Progressive delay (exponential backoff) after 3 failures; account transition to `LOCKED` status at 5 failures with notification to user email.
* **Residual Risk:** Minimal.
* **Verification Test:** Unit test asserting `user.status === 'LOCKED'` upon 5th consecutive invalid password.

---

### 2.3 Session Hijacking & Man-in-the-Middle (MitM)
* **Threat:** Interception of active session tokens over untrusted networks (e.g., public Wi-Fi, school lab networks).
* **Attack Surface:** Network transit; HTTP headers.
* **Current State:** Tokens passed via Authorization Bearer headers over HTTP/HTTPS; no TLS enforcement in dev.
* **Target Control:** Enforce HTTPS with HSTS (`max-age=31536000; includeSubDomains`); short-lived access tokens (15 minutes); refresh tokens bound to client device fingerprint and masked IP subnet.
* **Residual Risk:** Low.
* **Verification Test:** Verify HSTS headers and refusal of plaintext HTTP requests.

---

### 2.4 Refresh Token Theft & Out-of-Band Exfiltration
* **Threat:** Malicious script or physical attacker copies stored refresh token from client terminal.
* **Attack Surface:** Client browser storage / API responses.
* **Current State:** Raw refresh tokens stored as plaintext in JSON array for 7 days without rotation.
* **Target Control:** Single-use Refresh Token Rotation (RTR); tokens stored as SHA-256 hashes in database; optional `HttpOnly`, `SameSite=Strict` cookie transport.
* **Residual Risk:** Low.
* **Verification Test:** Invalidate previous token immediately upon rotation request.

---

### 2.5 Refresh Token Reuse Anomaly (Token Theft Detection)
* **Threat:** Attacker uses a stolen refresh token after the legitimate user has already exchanged it for a newer token.
* **Attack Surface:** `POST /api/auth/refresh`.
* **Current State:** Not detected; reused tokens are accepted until expiry.
* **Target Control:** Automatic Token Family Revocation: detecting reuse of a consumed token immediately marks the family compromised, revokes all sessions, and emits a critical security alert.
* **Residual Risk:** Low.
* **Verification Test:** Automated test re-submitting Token A after Token B has been issued, asserting both are revoked.

---

### 2.6 JWT Signature Forgery & Algorithm Confusion
* **Threat:** Attacker modifies payload claims (e.g., `role: "ADMIN"`) and sets algorithm to `none` or signs with symmetric key against public key.
* **Attack Surface:** `Authorization: Bearer <jwt>`.
* **Current State:** HS256 verified via `jsonwebtoken`, but with hard-coded fallback secrets in code.
* **Target Control:** Explicit algorithm whitelist (`algorithms: ['HS256']`); fail-fast startup assertion verifying 256-bit entropy secret; zero fallback secrets in source code.
* **Residual Risk:** Negligible.
* **Verification Test:** Unit test asserting rejection of `{ alg: "none" }` and tokens signed with unauthorized secrets.

---

### 2.7 Hardcoded Secret Leakage
* **Threat:** Extraction of default secrets from GitHub repository or compiled JavaScript client bundles.
* **Attack Surface:** Source code repositories; client distribution packages.
* **Current State:** `src/server/auth/jwt.ts` contains literal fallback strings.
* **Target Control:** Mandatory environment injection; build-time static analysis scanner blocking commits with hardcoded secrets; server crash on missing environment secrets.
* **Residual Risk:** Negligible.
* **Verification Test:** Verify server refuses to start if `JWT_ACCESS_SECRET` is unset.

---

### 2.8 Privilege Escalation via Mass Assignment
* **Threat:** Attacker appends `"role": "ADMIN"` or `"isSuperAdmin": true` to registration or profile update payloads.
* **Attack Surface:** `POST /api/auth/register`, `PATCH /api/users/:id`.
* **Current State:** `handleRegister` in `auth.ts` ignores submitted role and forces `STUDENT`, but legacy schema contains mutable fields.
* **Target Control:** Strict Zod DTO filtering with `.strict()` or explicit whitelisting; roles assigned exclusively via dedicated administrative endpoint `/api/v2/users/:id/roles` requiring `user_roles.assign`.
* **Residual Risk:** Negligible.
* **Verification Test:** Integration test verifying injected `role: 'ADMIN'` in registration payload produces a user with role `STUDENT`.

---

### 2.9 Insecure Direct Object Reference (IDOR) on Student Attempts
* **Threat:** Student changes URL parameter `studentId=usr-student-2` to view another student's exam answers or grades.
* **Attack Surface:** `/api/progress/student`, `/api/exams/submit`.
* **Current State:** `requireOwnershipOrStaff` exists in middleware, but must be manually wired to each endpoint.
* **Target Control:** Centralized declarative authorization policy (`authorize()`); context-aware resource ownership assertion at repository and service layer.
* **Residual Risk:** Low.
* **Verification Test:** Integration test asserting student receives `403 FORBIDDEN` when querying records of another student.

---

### 2.10 Broken Access Control on Content / Question Bank
* **Threat:** Student or unauthorized user queries unreleased exam blueprints or answer keys.
* **Attack Surface:** `GET /api/questions`, `GET /api/exams/:id`.
* **Current State:** Sanitization helper (`sanitizeExamForStudent`) strips correct answers, but raw question endpoint requires strict guard.
* **Target Control:** Role-gated database views; public queries execute through student-safe DTO projector stripping `correct_answer`, `model_answer`, and `rubric_evaluations`.
* **Residual Risk:** Low.
* **Verification Test:** Regression test confirming student responses never contain `correctAnswer` or `is_correct`.

---

### 2.11 User Account Enumeration
* **Threat:** Attacker uses login or forgot-password error messages to map which email addresses belong to registered students/teachers.
* **Attack Surface:** `POST /api/auth/login`, `POST /api/auth/password/forgot`.
* **Current State:** Login returns `INVALID_CREDENTIALS` (anti-enumeration), but forgot password endpoint is currently unimplemented.
* **Target Control:** Unified error response on login (`"البريد الإلكتروني أو كلمة المرور غير صحيحة"`); uniform generic success message on password reset request regardless of whether email exists.
* **Residual Risk:** Negligible.
* **Verification Test:** Response status and timing analysis for existing vs. non-existing email addresses.

---

### 2.12 Cross-Site Request Forgery (CSRF)
* **Threat:** Malicious web page submits authenticated state-changing requests on behalf of a logged-in user.
* **Attack Surface:** State-changing API endpoints.
* **Current State:** API uses Authorization Bearer header (immune to browser auto-submission CSRF unless using ambient cookies).
* **Target Control:** For Bearer tokens: standard header authentication is immune. For optional cookie transport: enforce `SameSite=Strict`, `Secure`, and Double Submit CSRF token header for all mutating verbs.
* **Residual Risk:** Negligible.
* **Verification Test:** Verify requests without valid Bearer header or CSRF token are rejected.

---

### 2.13 Cross-Site Scripting (XSS) Impact on Tokens
* **Threat:** Injected script steals tokens from `localStorage` or `sessionStorage`.
* **Attack Surface:** React frontend rendering; Markdown parsing (`react-markdown`).
* **Current State:** HTML sanitization and markdown sanitization active (`sanitizeMath.ts`, `remark-gfm`).
* **Target Control:** Store access token exclusively in private JavaScript module closure / memory (never in `localStorage`); refresh tokens stored in `HttpOnly` cookies where supported; strict Content Security Policy (`CSP`).
* **Residual Risk:** Low.
* **Verification Test:** Verify client auth context does not write access tokens to `window.localStorage`.

---

### 2.14 Multi-Tenant / Cross-School Breakout
* **Threat:** School Administrator from School A queries or modifies student records from School B.
* **Attack Surface:** `/api/v2/users`, `/api/v2/analytics/school`.
* **Current State:** No multi-tenant partitioning in runtime JSON database.
* **Target Control:** Prisma/PostgreSQL row-level filtering or service-layer tenant scoping: every query by an `ACADEMIC_ADMIN` is scoped with `WHERE organization_id = actor.organizationId`.
* **Residual Risk:** Low.
* **Verification Test:** Test verifying School A admin cannot access School B student profiles.

---

### 2.15 Tampering with System Audit Logs
* **Threat:** Rogue administrator or compromised account deletes or alters audit logs to conceal unauthorized actions.
* **Attack Surface:** `audit_events` database table.
* **Current State:** In-memory array in JSON database with no access control.
* **Target Control:** Append-only database table; no `UPDATE` or `DELETE` permissions granted to application user role in PostgreSQL (`REVOKE UPDATE, DELETE ON audit_events FROM eb_app_user`); cryptographic hash chaining for audit integrity.
* **Residual Risk:** Negligible.
* **Verification Test:** Attempting `UPDATE audit_events` triggers PostgreSQL permission denial.
