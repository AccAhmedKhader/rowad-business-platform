# Forensic Architecture Audit: Current Identity & User Baseline

**Document Identifier:** EB-ARCH-IDENT-CURRENT-01  
**Version:** 1.0.0  
**Audit Date:** 2026-09-24  
**Auditor:** Principal Software & IAM Architect  
**Classification:** Internal Forensic Architecture Baseline  
**Scope:** Egyptian Baccalaureate (EB) Accounting & Business Mastery Platform

---

## 1. Executive Forensic Summary

This forensic audit investigates and establishes the exact, unvarnished state of Identity, User, Authentication, and Access Management within the Egyptian Baccalaureate platform repository.

The repository exhibits a dual-state architecture:
1. **Declared Prisma/PostgreSQL Schema:** A valid relational schema exists in `prisma/schema.prisma` describing `User`, `RefreshToken`, and learning records.
2. **Authoritative Runtime Persistence:** The active Express server (`server.ts`), authentication module (`src/server/modules/auth.ts`), and repositories (`src/server/db/repositories/*`) do **not** query Prisma/PostgreSQL at runtime. Instead, they operate entirely against an in-memory/JSON-serialized storage engine (`PersistentProductionDatabase` located at `data/eb_accounting_database.json`).

While previous remediation phases established basic cryptographic hashing (bcrypt) and locked public registration to `STUDENT`, the platform remains heavily exposed to architectural and security vulnerabilities:
* Hard-coded fallback JWT secrets in source code (`src/server/auth/jwt.ts`).
* Hard-coded default credentials and auto-login in frontend context (`src/context/AuthContext.tsx`).
* Absence of identity/user decoupling (conflating the human identity, system user, and student academic persona).
* Stateless JWT role consumption without real-time database validation or account status verification.
* Rudimentary refresh token storage with no token rotation, family reuse detection, or device/session telemetry.
* Total absence of scoped, fine-grained RBAC/PBAC.

---

## 2. Current Architecture Inventory

| Architectural Pillar | Implementation Source | Mechanism / Engine | Current Status |
| :--- | :--- | :--- | :--- |
| **Identity Entity** | Conflated with User | Single table/JSON entry (`User` / `DbUser`) | Non-separated |
| **User Identification** | `email` in `DbUser` | Normalized lowercase string | Single-identifier lock |
| **Credentials** | `password_hash` in `DbUser` | `bcryptjs` (cost factor 10) | Single-credential lock |
| **Authentication Flow** | `src/server/modules/auth.ts` | `/api/auth/register`, `/login`, `/refresh`, `/logout`, `/me` | Functional (Runtime JSON) |
| **Token Mechanism** | `src/server/auth/jwt.ts` | `jsonwebtoken` (HS256) | Insecure secret fallback |
| **Session Model** | `DbRefreshToken` array | Plaintext string in JSON, 7-day TTL | No session abstraction |
| **Authorization Flow** | `src/server/middleware/authMiddleware.ts` | `authenticate`, `requireRole`, `requireOwnershipOrStaff` | Token-claim dependent |
| **RBAC Model** | Hardcoded Enum | `'STUDENT' \| 'TEACHER' \| 'CONTENT_MANAGER' \| 'ADMIN'` | Flat 4-role hierarchy |
| **Student Domain** | Conflated with User | Direct foreign keys `user_id` on attempts/progress | Missing Student domain |
| **Persistence Engine** | `src/server/db/database.ts` | In-memory arrays + `data/eb_accounting_database.json` | Non-production runtime |

---

## 3. Forensic Findings & Technical Vulnerability Log

### Finding SEC-U0-01: Hardcoded JWT Fallback Secrets
* **Severity:** `CRITICAL`
* **Evidence:** `src/server/auth/jwt.ts`, lines 10–11:
  ```typescript
  const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'eb_jwt_access_secret_production_2026_super_secure_key';
  const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'eb_jwt_refresh_secret_production_2026_super_secure_key';
  ```
* **Impact:** In the event that environment variables are unconfigured or fail to bind, the system defaults to publicly known static secrets committed to version control. Any attacker can forge valid access tokens with arbitrary administrative claims (`role: 'ADMIN'`).
* **Recommended Direction:** Enforce fail-fast server startup when `JWT_ACCESS_SECRET` or `JWT_REFRESH_SECRET` are missing or fail cryptographic entropy validation. Remove all fallback strings.

---

### Finding SEC-U0-02: Hardcoded Credentials & Auto-Authentication in Frontend
* **Severity:** `CRITICAL`
* **Evidence:** `src/context/AuthContext.tsx`, lines 36–41 & lines 83–88:
  ```typescript
  // Line 37
  const res = await loginUser('student@eb.edu.eg', 'Password123!');
  
  // Line 83-88
  const roleCredentials: Record<PlatformRole, { email: string; pass: string }> = {
    STUDENT: { email: 'student@eb.edu.eg', pass: 'Password123!' },
    TEACHER: { email: 'teacher@eb.edu.eg', pass: 'Password123!' },
    CONTENT_MANAGER: { email: 'content@eb.edu.eg', pass: 'Password123!' },
    ADMIN: { email: 'admin@eb.edu.eg', pass: 'Password123!' }
  };
  ```
* **Impact:** Development convenience code leaks default administrative and staff credentials into client-side bundles. Unauthenticated visitors are automatically logged into the student account, preventing true guest/unauthenticated sessions and polluting student attempt data.
* **Recommended Direction:** Strip all hardcoded credentials from frontend code. Guest users must remain unauthenticated until explicit user action. Role switching must require valid authentication against distinct authorized accounts.

---

### Finding ARCH-U0-03: Conflation of Identity, User Account, and Student Persona (`USER = STUDENT`)
* **Severity:** `HIGH`
* **Evidence:** 
  * `prisma/schema.prisma`, lines 55–75: `User` directly owns `questionAttempts`, `examAttempts`, `lessonProgress`, `masterySnapshots`, and `recommendations`.
  * `src/server/db/schema.ts`, lines 7–18: `DbUser` directly stores name, status, role, and email.
  * No `Student` or `StudentProfile` table exists in either schema.
* **Impact:** A teacher, school administrator, or guardian cannot have an academic record or enroll in courses without becoming a "Student". Conversely, academic lifecycle events (e.g., repeating a grade, suspension from a class, changing schools) directly alter the system-level User account.
* **Recommended Direction:** Decouple into:
  1. `Identity` (Identifiers, Credentials, Multi-Factor)
  2. `User` (Account status, System profile, Organizations)
  3. `StudentProfile` (Academic code, Enrollment, Cohorts, Pedagogical records)

---

### Finding ARCH-U0-04: Non-Authoritative Prisma Schema & Runtime JSON Divergence
* **Severity:** `HIGH`
* **Evidence:**
  * `src/server/db/database.ts`: `PersistentProductionDatabase` executes all CRUD operations on JSON files.
  * `src/server/modules/auth.ts`, line 3: Imports `db` from `../db/database`.
  * `src/server/db/repositories/userRepository.ts`: Implements repository interface by delegating exclusively to `db` (`PersistentProductionDatabase`), bypassing `prisma` in `src/server/db/prisma.ts`.
* **Impact:** The database schema in `prisma/schema.prisma` is decorative rather than authoritative. Changes to the database do not affect runtime execution, risking data corruption, unmanaged concurrency, memory leaks, and lack of relational integrity.
* **Recommended Direction:** Establish Prisma/PostgreSQL as the single authoritative persistence engine through an atomic migration path.

---

### Finding SEC-U0-05: Stateless RBAC Claim Blindness & Absence of Session Revocation
* **Severity:** `HIGH`
* **Evidence:** `src/server/middleware/authMiddleware.ts`, lines 21–35 & 47–56:
  * `authenticate` verifies JWT signature and assigns `req.user = payload`.
  * `requireRole` directly reads `req.user.role`.
  * No database lookup is performed to check whether the user has been deactivated (`status === 'SUSPENDED'`), whether the user's role was demoted, or whether the user's session was revoked.
* **Impact:** If an administrator suspends a compromised account or revokes admin permissions, the user retains full administrative access until the access token expires (up to 1 hour).
* **Recommended Direction:** Implement session verification (`sid` claim in token checked against active session cache/database) and evaluate active user status on sensitive/administrative endpoints.

---

### Finding SEC-U0-06: Raw Refresh Token Persistence & Lack of Rotation Families
* **Severity:** `MEDIUM`
* **Evidence:** 
  * `src/server/db/database.ts`, lines 741–753: Refresh token string is saved in plaintext in `refreshTokens` array.
  * `src/server/modules/auth.ts`, lines 180–217: `handleRefreshToken` checks `db.findRefreshToken(refreshToken)`, issues a new access token, but **does not rotate or invalidate the refresh token**.
* **Impact:** A stolen refresh token can be used repeatedly for 7 days without triggering invalidation, rotation, or reuse anomaly alarms.
* **Recommended Direction:** Implement Refresh Token Rotation (RTR) with token family tracking. Upon refresh, immediately invalidate the consumed refresh token, issue a new pair, and trigger family revocation if a consumed token is reused.

---

### Finding ARCH-U0-07: Hardcoded 4-Role Architecture & Absence of Permission Granularity
* **Severity:** `MEDIUM`
* **Evidence:** `src/types.ts` & `src/server/db/schema.ts`:
  ```typescript
  export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN' | 'CONTENT_MANAGER';
  ```
  `src/server/middleware/authMiddleware.ts`:
  ```typescript
  export function requireRole(...allowedRoles: Array<'STUDENT' | 'TEACHER' | 'CONTENT_MANAGER' | 'ADMIN'>)
  ```
* **Impact:** The system cannot model Assistant Teachers, School Principals, Ministry Inspectors, Department Heads, or Guardians without hardcoded code changes. Permissions cannot be assigned or revoked dynamically.
* **Recommended Direction:** Replace hardcoded role enums with a normalized, database-backed RBAC model: `Role`, `Permission`, `RolePermission`, `UserRoleAssignment`.

---

## 4. Current Test Coverage & Gap Analysis

The repository currently contains two targeted authentication test suites:
1. `src/server/__tests__/auth.test.ts`:
   * Verifies bcrypt hashing (`SALT_ROUNDS = 10`).
   * Verifies JWT access token signing & payload retrieval.
   * Verifies malformed token rejection.
   * Verifies refresh token persistence and deletion in JSON `db`.
2. `src/server/__tests__/authorization.test.ts`:
   * Verifies `requireRole` blocks unauthenticated requests (401).
   * Verifies `requireRole` forbids STUDENT from TEACHER/ADMIN endpoints (403).
   * Verifies `requireOwnershipOrStaff` allows student self-access and blocks other-student access.
3. `src/server/__tests__/security_p0_remediation.test.ts`:
   * Verifies public registration forces `role = 'STUDENT'`.
   * Verifies server-side authoritative grading prevents client spoofing.

### Uncovered Test Scenarios:
* Missing secret startup termination.
* Token expiration behavior.
* Suspended/Inactive user rejection during active token usage.
* Token family reuse detection.
* Concurrent session revocation.
* Cross-tenant / cross-organization boundary enforcement.
* Rate-limiting enforcement under distributed IP proxy headers.

---

## 5. Summary Conclusion & Gate Readiness

The current baseline is functional as an educational demonstration, but does not meet production-grade enterprise standards for security, identity separation, or scalability.

PHASE U1 will establish the comprehensive architectural specifications to decouple Identity, User, and Student, introduce database-backed granular RBAC, and model professional session lifecycles.
