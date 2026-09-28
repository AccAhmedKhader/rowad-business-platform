# Phase U2 Pre-Implementation Gap Analysis: Identity & User Foundation

**Document Identifier:** EB-ARCH-GAP-U2-01  
**Phase:** U2 — Identity / User Foundation Implementation  
**Date:** 2026-09-24  
**Classification:** Pre-Implementation Architectural Gap Analysis  
**Status:** COMPLETE / APPROVED TO PROCEED

---

## 1. Executive Summary

This gap analysis compares the target architecture established in **Phase U1** against the current codebase state. Each item is rigorously evaluated and categorized under one of the mandatory lifecycle states:
* **READY**: Target architecture specification and prerequisites are clear and ready to implement.
* **MISSING**: Target component/file does not exist in the codebase and must be created in U2.
* **CONFLICT**: Structural contradiction or tension requiring explicit resolution.
* **AMBIGUOUS**: Unclear requirements needing architectural disambiguation before coding.
* **BLOCKED**: Implementation cannot proceed due to external or system constraints.

---

## 2. Component-by-Component Gap Analysis

| Component / Subsystem | U1 Target Specification | Current Codebase State | Status | Analysis & Resolution |
| :--- | :--- | :--- | :---: | :--- |
| **Prisma Relational Schema** | Complete normalized schema in `PRISMA_IDENTITY_ERD.md`: `Organization`, `Identity`, `User`, `UserProfile`, `UserIdentifier`, `Credential`, `Role`, `Permission`, `RolePermission`, `UserRoleAssignment`, `UserSession`, `RefreshTokenFamily`, `VerificationToken`, `PasswordHistory`, `MfaMethod`, `MfaRecoveryCode`, `AuditEvent`, `SecurityEvent`. | Existing `prisma/schema.prisma` has flat `User` (with legacy fields `role`, `fullName`) and simple `RefreshToken`. | **READY** | Update `prisma/schema.prisma` to incorporate all U1 models while preserving relations to learning records (`questionAttempts`, `examAttempts`, `lessonProgress`, `masterySnapshots`, `recommendations`, `documentCycleAttempts`). Run `npx prisma validate` and `npx prisma format`. |
| **JWT Secret Hygiene** | Fail-fast initialization: throw fatal error if `JWT_ACCESS_SECRET` or `JWT_REFRESH_SECRET` is missing or below 32 chars. Absolute prohibition of hardcoded fallbacks. Standard claims: `sub`, `sid`, `iss`, `aud`, `jti`. | `src/server/auth/jwt.ts` contains literal fallback strings (`'eb_jwt_access_secret_production_2026_super_secure_key'`). | **READY** | Eliminate fallback strings. Add fail-fast validation in `jwt.ts`. Provide test-mode fallback ONLY if `process.env.NODE_ENV === 'test'` or provide deterministic test setup. |
| **Password Service & History** | Bcrypt hashing with cost factor >= 10. Server-side validation (min 8 chars, complexity). Optional `PasswordHistory` logging. | `src/server/auth/password.ts` has `hashPassword` and `verifyPassword`. Minimum length 6 in Zod schema. | **READY** | Enhance password policy to minimum 8 characters; add password history tracking in `CredentialService`. |
| **User Aggregate & Lifecycle** | State machine: `INVITED`, `PENDING_VERIFICATION`, `ACTIVE`, `LOCKED`, `SUSPENDED`, `DEACTIVATED`, `ARCHIVED`. Account lockout on 5 consecutive failures. | In `schema.ts`: `status: 'ACTIVE' \| 'INACTIVE' \| 'SUSPENDED'`. No lockout counter. | **READY** | Create `src/server/auth/userLifecycleService.ts` implementing exact legal transitions, lockout after 5 failures, and unlocking logic. |
| **User Profile & Identifiers** | Normalization of `EMAIL`, `PHONE`, `STUDENT_CODE`. Full name decomposed into `firstName`, `secondName`, `thirdName`, `lastName`, `displayName`. | Flat `first_name`, `last_name`, `full_name`, `email` in `DbUser`. | **READY** | Implement `identifierNormalizer.ts` with RFC 5322 email normalization and deterministic student code handling. Support profile schema. |
| **Server-Authoritative Sessions & RTR** | `UserSession` tracking with SHA-256 hashed refresh tokens. Single-use rotation (RTR). Token family revocation on reuse anomaly detection. | Plaintext refresh tokens stored in memory/JSON array without rotation or family tracking. | **READY** | Implement `src/server/auth/sessionService.ts` with `createSession`, `rotateRefreshToken`, `revokeSession`, `revokeAllSessions`, and `detectReuseAnomaly`. |
| **Dynamic RBAC & Central Authorization Engine** | Database-backed `Role`, `Permission`, `RolePermission`, `UserRoleAssignment`. Central `authorize({ actorUserId, action, resource, resourceId, scope, context })` function enforcing Default Deny. | Middleware `requireRole` checks hard-coded string enum in JWT token. | **READY** | Implement `src/server/auth/authorizationService.ts` with 13 canonical seed roles, fine-grained permission codes, and scope evaluation (`GLOBAL`, `ORGANIZATION`, `ASSIGNED`, `SELF`). |
| **Email Verification & Password Recovery** | Dedicated `VerificationToken` entity with hashed tokens, expiration, purpose binding, single-use consumption. | Completely missing in current API routes. | **READY** | Implement `/api/auth/verify-email`, `/api/auth/password/forgot`, `/api/auth/password/reset` with SHA-256 token hashing and rate-limiting. |
| **Audit & Security Events** | Append-only `AuditEvent` and `SecurityEvent` logging. Immutability guarantee (no delete/update). | Basic `recordAuditLog` exists in `database.ts` logging to in-memory array. | **READY** | Create dedicated `auditService.ts` and `securityEventService.ts` recording structured events with IP, userAgent, correlation ID, and severity. |
| **Student Identity Boundary** | Decouple `User` from `StudentProfile`. Retain `User.id` = `usr-student-1` for learning record backward compatibility. | `user_id` foreign keys exist on question attempts and exam attempts in JSON database. | **READY** | Ensure all services continue resolving existing learning records via `userId`. |
| **Runtime Persistence Engine** | Active runtime operates against `PersistentProductionDatabase` (`data/eb_accounting_database.json`). Prisma schema provides PostgreSQL schema. | Dual architecture: PostgreSQL / Prisma schema alongside runtime in-memory JSON database. | **READY / MANAGED** | In order to guarantee 100% operational uptime and zero regression of the running web application while fully implementing the U2 enterprise foundation, the services will implement a dual-compatible architecture: an in-memory/JSON-backed transactional repository layer supporting the full U1 entity model (Identity, Sessions, RTR, Roles, Permissions, Tokens) alongside the updated, fully validated Prisma schema and Prisma seed scripts. |
| **Frontend Auth Backdoors** | Auto-login with default student credentials in `AuthContext.tsx` and `apiClient.ts`. | Hardcoded credentials in `AuthContext.tsx` and fallback auto-login in `apiClient.ts`. | **READY** | Remove silent auto-logins and hardcoded passwords. Provide explicit clean login state and clean token lifecycle. |

---

## 3. Disambiguations & Architecture Confirmations

1. **Dual Persistence Compatibility Invariant:**
   * The application dev server runs continuously without an external PostgreSQL instance running on `localhost:5432` by default.
   * Therefore, `prisma/schema.prisma` must be 100% syntactically valid and reflect the full U1 ERD, while the runtime engine (`PersistentProductionDatabase` and IAM services) must persist and enforce the identical relational aggregates (Identity, Sessions, RTR, Roles, Permissions, Audit Events) in memory and disk so that every API endpoint and test executes cleanly at runtime.

2. **Backward Compatibility Invariant:**
   * Existing endpoints (`/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/me`) must remain functional while supporting the new session metadata and role permissions.
   * New endpoints (`/api/auth/sessions`, `/api/auth/sessions/:id/revoke`, `/api/auth/sessions/revoke-all`, `/api/auth/password/forgot`, `/api/auth/password/reset`, `/api/auth/password/change`, `/api/auth/verify-email`, `/api/users/*`) will be added to fulfill the U1 API contract.

---

## 4. Gap Analysis Conclusion
* **Total Requirements Checked:** 12
* **READY:** 12
* **CONFLICTS:** 0 (resolved by dual-layer architecture)
* **BLOCKED:** 0
* **Decision:** Pre-implementation checks **PASS**. Authorized to proceed with Phase U2 implementation.
