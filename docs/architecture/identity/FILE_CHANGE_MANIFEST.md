# File Change Manifest: Identity & User Foundation

**Document Identifier:** EB-ARCH-MANIFEST-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Operational Change Log & Phase U2 Implementation Plan  
**Status:** APPROVED FOUNDATION

---

## 1. Manifest Overview

This manifest documents all file operations executed during **Phase U1** (Architecture & Design Artifacts) and inventories the controlled changes authorized for execution in **Phase U2** (Implementation).

### Absolute Boundary Invariant
* **No Mass Rewrites:** No existing educational module (Curriculum, Question Bank, Mind Maps, Exam Engine, T-Account Simulator, JRE Rubric Evaluator) may be rewritten or destabilized.
* **Backward Compatibility:** All existing learning endpoints (`/api/progress/*`, `/api/exams/*`) continue functioning without breaking changes.

---

## 2. Phase U1 Artifacts (Created Architecture Specifications)

| Path | Action | Description / Justification | Risk |
| :--- | :---: | :--- | :---: |
| `docs/architecture/identity/CURRENT_IDENTITY_ARCHITECTURE.md` | `CREATE` | Complete forensic baseline of existing auth and user code. | NONE |
| `docs/architecture/identity/IDENTITY_DOMAIN_MODEL.md` | `CREATE` | Domain model for Identity aggregate, multi-identifiers, credentials. | NONE |
| `docs/architecture/identity/USER_DOMAIN_MODEL.md` | `CREATE` | Domain model for User account, lifecycle, profile, and tenancy. | NONE |
| `docs/architecture/identity/SESSION_MODEL.md` | `CREATE` | Session aggregate, RTR token family, and secret hygiene policy. | NONE |
| `docs/architecture/identity/AUTHORIZATION_MODEL.md` | `CREATE` | Dynamic database-backed RBAC/PBAC policy engine design. | NONE |
| `docs/architecture/identity/PERMISSION_MATRIX.md` | `CREATE` | Canonical mapping of 13 roles to resource permissions. | NONE |
| `docs/architecture/identity/SCOPE_MATRIX.md` | `CREATE` | Hierarchical evaluation matrix for `GLOBAL`, `ORGANIZATION`, `SELF`. | NONE |
| `docs/architecture/identity/PRISMA_IDENTITY_ERD.md` | `CREATE` | Normalized PostgreSQL schema with exact types, indexes, and FKs. | NONE |
| `docs/architecture/identity/API_CONTRACT.md` | `CREATE` | Complete REST API contract for identity, sessions, and administration. | NONE |
| `docs/architecture/identity/AUTHENTICATION_FLOW.md` | `CREATE` | Sequence diagrams and step-by-step auth flows. | NONE |
| `docs/architecture/identity/AUTHORIZATION_FLOW.md` | `CREATE` | Middleware and policy enforcement execution order. | NONE |
| `docs/architecture/identity/SECURITY_THREAT_MODEL.md` | `CREATE` | STRIDE/ASVS analysis of 18 threat vectors and controls. | NONE |
| `docs/architecture/identity/MIGRATION_MAPPING.md` | `CREATE` | 1:1 data transformation matrix from JSON database to Prisma. | NONE |
| `docs/architecture/identity/FILE_CHANGE_MANIFEST.md` | `CREATE` | Current inventory and planned implementation manifest. | NONE |
| `docs/architecture/identity/U1_TEST_MATRIX.md` | `CREATE` | Detailed test plan covering positive, negative, and security cases. | NONE |
| `docs/architecture/identity/PHASE_U1_EXECUTION_REPORT.md` | `CREATE` | Master phase governance gate audit report. | NONE |

---

## 3. Phase U2 Authorized Implementation Manifest (Planned)

The following files are identified for controlled creation or modification during Phase U2 implementation:

| Path | Planned Action | Objective / Rationale | Dependencies | Risk Level |
| :--- | :---: | :--- | :--- | :---: |
| `prisma/schema.prisma` | `MODIFY` | Merge Identity, UserProfile, Role, Permission, and Session models into schema. | Prisma CLI | MEDIUM |
| `src/server/auth/jwt.ts` | `MODIFY` | Remove fallback secret strings; add fail-fast secret validation; adopt standard claims (`sub`, `sid`). | `dotenv` | MEDIUM |
| `src/server/auth/sessionService.ts` | `CREATE` | Implement `UserSession` tracking, rotation, and family revocation. | `prisma` | LOW |
| `src/server/auth/authorizationService.ts` | `CREATE` | Implement central `authorize({ actorUserId, action, ... })` engine. | `prisma` | LOW |
| `src/server/middleware/authMiddleware.ts` | `MODIFY` | Add session liveness check; wire into `authorizationService`. | `sessionService` | MEDIUM |
| `src/server/modules/auth.ts` | `MODIFY` | Add `/api/auth/sessions` and password recovery endpoints. | `sessionService` | LOW |
| `src/context/AuthContext.tsx` | `MODIFY` | Remove hard-coded credentials and auto-login backdoor. | None | LOW |
| `src/server/__tests__/auth_u2_foundation.test.ts` | `CREATE` | Comprehensive integration test suite for U2 deliverables. | `vitest` | LOW |

---

## 4. Protected / Non-Modifiable Modules (Out of Scope for U1/U2)

* `src/domain/curriculum/*` — Canonical curriculum registry, lessons, and unit mapping.
* `src/domain/assessment/*` — Question banks, psychometrics, and rubrics.
* `src/domain/analytics/*` — Student mastery engine and Bayesian knowledge tracing.
* `src/domain/adaptive/*` — Remediation algorithms.
* `src/components/*` — Existing learning viewers, mind maps, simulators, and calculators.
