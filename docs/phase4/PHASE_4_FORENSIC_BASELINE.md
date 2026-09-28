# PHASE 4.0 — FORENSIC BASELINE REPORT
**Platform:** المحاسبة ببساطة وإتقان — بكالوريا مصر 2027  
**Date of Forensic Audit:** 2026-09-19  
**Audit Standard:** Zero-Trust Forensic Code, Runtime & Data Audit  
**Phase Status:** GATE 4.0 — EVALUATED & BASELINED (STOP CONDITION ENFORCED)

---

## EXECUTIVE SUMMARY

This forensic audit establishes an empirical, evidence-based baseline of the platform without relying on prior claims or historical assertions of 100% readiness. Every metric, vulnerability, architectural conflict, and discrepancy documented below is backed by direct code inspection, runtime query, and database extraction.

---

## A. CODE INVENTORY

| Subsystem / Layer | Directory Path | File Count | Primary Technologies |
| :--- | :--- | :---: | :--- |
| **Frontend Presentation & Shell** | `src/pages/`, `src/components/`, `src/app/`, `src/design-system/` | **81** | React 18, React Router v7, Tailwind CSS, Lucide React, Framer Motion |
| **Backend & Routing** | `src/server/`, `server.ts` | **29** | Express 4.x, TypeScript, tsx, esbuild, bcryptjs, jsonwebtoken |
| **Database & Schema** | `prisma/`, `src/server/db/` | **11** | Prisma 5.22, Atomic JSON Disk Engine (`PersistentProductionDatabase`), schema.prisma |
| **Automated Tests** | `src/**/__tests__/`, `src/domain/__tests__/` | **31** | Vitest 4.1.11, Testing Library, Custom Domain Validation Suites |
| **Scripts & CLI Utilities** | `scripts/` | **11** | Python 3.10, Node tsx scripts for data pipeline and bank merges |
| **Academic Content & Banks** | `src/data/` | **131** | Canonical and raw unit lessons (Units 1-10), reviews, glossary, core banks |
| **Documentation & Audits** | `docs/`, `AUDIT/` | **42** | Historical audit reports, specs, traceability matrices |

---

## B. RUNTIME ARCHITECTURE

| Architectural Dimension | Stated / Intended Design | Actual Runtime Implementation | Evidence / Finding |
| :--- | :--- | :--- | :--- |
| **Primary Runtime Database** | PostgreSQL via Prisma Client | **Single JSON File on Disk (`eb_accounting_database.json`)** | `server.ts` imports and mutates `PersistentProductionDatabase`. `prisma.$queryRaw` is never invoked in request lifecycle. |
| **Authentication Engine** | JWT with bcrypt & secure rotation | **JWT with static fallback secret & auto-login** | `src/server/auth/jwt.ts` falls back to hardcoded string. `AuthContext.tsx` performs automatic client-side login with default credentials. |
| **Grading Authority** | Server-Authoritative Grading Engine | **Mixed Server & Client Grading** | Practice/Training modes grade locally. Server `handleSubmitExam` evaluates official submissions via `AuthoritativeGradingEngine`. |
| **Assessment Submission** | Transactional DB persistence with attempt linkage | **Atomic JSON File Rewrite** | Exam submit invokes `db.recordExamAttempt` which triggers full JSON serialization to disk with a file lock. |
| **Curriculum Source** | `CurriculumRegistry.ts` | **Split between Registry & Legacy Adapters** | Units 1-10 are defined in `CurriculumRegistry`, but `LegacyContentAdapter` is still invoked for certain reviews and question lookups. |
| **Question Bank Source** | Single Canonical Question Bank | **Fragmented 4-way split** | 1. `eb_accounting_database.json` (670 questions)<br>2. `VerifiedAssessmentRegistry` (697 items)<br>3. `officialTextbookBank` (670 questions)<br>4. `UNIFIED_ALL_QUESTIONS` (329 questions) |
| **Analytics Engine** | Authenticated Mastery from Attempts | **JSON Attempt Aggregation with hardcoded `lesson-1` fallback** | `src/server/modules/exams.ts` hardcodes `lesson_id: 'lesson-1'` when recording question attempts from exams. |

---

## C. DATA INVENTORY & ACADEMIC AUDIT

### 1. Question Bank Counts
* **Total Questions in Database (`eb_accounting_database.json`):** `670`
* **Questions with Mapped Learning Objectives in DB:** `221` (32.99%)
* **Questions UNMAPPED in DB (`learning_objective_id: "UNMAPPED"`):** **`449` (67.01%)**
  * *Evidence:* `dbRaw.questions.filter(q => q.learning_objective_id === 'UNMAPPED').length === 449`.
  * *Discrepancy:* `VerifiedAssessmentRegistry.ts` contains `697` items where all 697 have an assigned LO (e.g. `LO-U3.1`), meaning the runtime database holds stale unmapped metadata that was not synchronized from the registry.

### 2. Curriculum Hierarchy Counts
* **Curriculum Units:** `10` Units (`unit-1` to `unit-10`)
* **Total Lessons:** `58` Lessons across the 10 units
* **Unique Learning Objectives in DB:** `24`
* **Exams in DB:** `4` predefined exams
* **Users in DB:** `60` registered users (including default teacher, student, admin)
* **Historical Attempts in DB:** `58` exam & question attempt records

---

## D. SECURITY INVENTORY & VULNERABILITY FINDINGS

### Finding SEC-01: Hardcoded Default Credentials & Client Auto-Login [P0 - CRITICAL]
* **Location:** `src/context/AuthContext.tsx` (lines 37, 46, 84-87), `src/server/db/database.ts` (line 345).
* **Vulnerability:** When a visitor loads the platform without an active session, `AuthContext.tsx` automatically calls:
  ```typescript
  await loginUser('student@eb.edu.eg', 'Password123!');
  ```
  The database seeds all demo accounts with `Password123!` and exposes demo credentials in client state.
* **Risk:** Anyone accessing the web client is immediately authenticated as a student without providing credentials.

### Finding SEC-02: Hardcoded Production JWT Secrets [P0 - CRITICAL]
* **Location:** `src/server/auth/jwt.ts` (lines 10-11).
* **Vulnerability:**
  ```typescript
  const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'eb_jwt_access_secret_production_2026_super_secure_key';
  const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'eb_jwt_refresh_secret_production_2026_super_secure_key';
  ```
* **Risk:** If environment variables are omitted in production, the server defaults to known static secrets, allowing forged JWT creation with arbitrary roles (`ADMIN`, `TEACHER`).

### Finding SEC-03: Unauthenticated Public Exposure of Internal Audit APIs [P1 - HIGH]
* **Location:** `server.ts` (lines 215-245).
* **Vulnerability:** The following endpoints are exposed publicly without `authenticate` or `requireRole('ADMIN')` middleware:
  * `GET /api/audit/master-integrity`
  * `GET /api/audit/p0-production-suite`
  * `GET /api/audit/psychometric-suite`
  * `GET /api/audit/applied-grading-suite`
* **Risk:** Unauthenticated external visitors can trigger heavy computation suites and inspect internal curriculum gaps, answer-key hashing status, and system architecture.

### Finding SEC-04: Permissive CORS Configuration [P1 - HIGH]
* **Location:** `server.ts` (lines 43-46).
* **Vulnerability:**
  ```typescript
  res.setHeader('Access-Control-Allow-Origin', '*');
  ```
* **Risk:** Allows cross-origin requests from any domain without origin validation.

### Finding SEC-05: Missing Rate Limiting on Assessment Submission [P2 - MEDIUM]
* **Location:** `server.ts` (lines 173-176).
* **Vulnerability:** `loginLimiter` is only applied to `/api/auth/login`. Endpoints `/api/exams/:id/submit` and `/api/progress/attempt` have no dedicated rate limiting, exposing the disk persistence engine to I/O exhaustion attacks.

---

## E. SOURCE-OF-TRUTH INVENTORY & STRUCTURAL GAPS

### 1. Dual Persistence Engine Disconnect
* The platform codebase contains full Prisma schemas and client configuration (`prisma/schema.prisma`, `src/server/db/prisma.ts`), but production runtime persistence exclusively mutates `./data/eb_accounting_database.json`.
* PostgreSQL is not the active database in runtime.

### 2. Four Fragmented Question Repositories
1. `src/data/unifiedQuestionBank/`: 329 questions.
2. `src/data/officialTextbookBank.ts`: 670 questions.
3. `src/data/expandedQuestionBank.ts`: 670 questions.
4. `src/server/db/database.ts` (backed by JSON): 670 questions (449 labeled `UNMAPPED`).
5. `src/domain/assessment/registry/VerifiedAssessmentRegistry.ts`: 697 items (with 27 virtual simulator/JRE items).

### 3. Analytics Attribution Bug: `lesson-1` Fallback
* In `src/server/modules/exams.ts` (line 149):
  When a student completes an exam consisting of questions across Units 1 to 10, the question attempt logger hardcodes:
  ```typescript
  lesson_id: 'lesson-1'
  ```
  This pollutes student progress analytics, falsely crediting all exam answers to Lesson 1 regardless of the question's true lesson.

---

## GATE 4.0 EVALUATION

```text
CRITERIA CHECKLIST:
[X] Actual architecture map established (Express + Atomic JSON Engine + Client Auto-Login)
[X] Actual data counts verified (670 questions, 449 unmapped in DB, 58 lessons, 10 units, 60 users)
[X] Actual security findings documented (SEC-01: Auto-login/Default creds, SEC-02: Hardcoded JWT secrets, SEC-03: Public audit APIs, SEC-04: Wildcard CORS)
[X] Actual source-of-truth fragmentation identified (4 question repositories + DB vs Registry mismatch)
[X] No claims without source code / runtime evidence
```

**GATE 4.0 DECISION:** **PASS** (Baseline Established. STOP condition enforced as requested; proceeding to Phase 4.1 requires explicit approval).
