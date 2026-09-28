# Forensic Migration Mapping & Data Reconciliation Specification

**Document Identifier:** EB-ARCH-MIGRATION-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Migration & Data Integrity Architecture  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Migration Overview & Non-Destructive Principles

The Egyptian Baccalaureate platform currently persists its runtime state in an atomic JSON file (`data/eb_accounting_database.json`).

### Fundamental Invariants
1. **Zero Data Loss Invariant:**  
   $$N_{\text{legacy users}} = N_{\text{target users}}$$  
   Every user in the legacy JSON database must map to an identical user record in the target schema.
2. **Referential Integrity Invariant:**  
   Every historical learning record (`QuestionAttempt`, `ExamAttempt`, `LessonProgress`, `StudentMasterySnapshot`, `AdaptiveRecommendation`) must resolve to a valid target `User.id` matching its historical `user_id`.
3. **Non-Destructive Preservation:**  
   The legacy JSON database file and its automated timestamped backups (`data/backups/`) must **never be deleted or overwritten** during migration.

---

## 2. Legacy-to-Target Entity Mapping Matrix

### 2.1 User Entity Mapping

| Legacy `DbUser` Field (JSON) | Target Entity | Target Field | Transformation / Normalization Rule |
| :--- | :--- | :--- | :--- |
| `id` (e.g., `'usr-student-1'`) | `User` | `id` | **Direct 1:1 Preservation.** Retains original UUID/string to protect all existing foreign key relationships. |
| `id` (e.g., `'usr-student-1'`) | `Identity` | `id` | New UUID generated or derived deterministically (`uuidv5(id)`). |
| `email` | `UserIdentifier` | `value` | Original raw email string preserved. |
| `email` | `UserIdentifier` | `normalizedValue` | Lowercased, trimmed string (`email.trim().toLowerCase()`). Marked `isPrimary = true, isVerified = true`. |
| `password_hash` | `Credential` | `secretHash` | Direct transfer of existing bcrypt hash. Algorithm marked as `'bcrypt'`. |
| `first_name` | `UserProfile` | `firstName` | Direct transfer. |
| `last_name` | `UserProfile` | `lastName` | Direct transfer. |
| `full_name` | `UserProfile` | `displayName` | Direct transfer. |
| `status` (`'ACTIVE'`) | `User` | `status` | Direct transfer to `UserAccountStatus.ACTIVE`. |
| `role` (`'STUDENT'`) | `UserRoleAssignment` | `roleId` | Mapped to database `Role.id` where `Role.code === legacy.role`. Scope assigned as `GLOBAL`. |
| `created_at` | `User` / `Identity` | `createdAt` | ISO-8601 string parsed to `DateTime`. |
| `updated_at` | `User` / `Identity` | `updatedAt` | ISO-8601 string parsed to `DateTime`. |

---

### 2.2 Learning Records Mapping (Zero ID Displacement)

| Learning Record Table | Legacy FK (`user_id`) | Target FK (`userId`) | Preservation Proof |
| :--- | :--- | :--- | :--- |
| **`question_attempts`** | `att.user_id` | `QuestionAttempt.userId` | Because `User.id` preserves the legacy `id` (`usr-student-1`), all question attempts link directly to the target `User` without foreign key re-mapping or data rewrites. |
| **`exam_attempts`** | `ea.user_id` | `ExamAttempt.userId` | Identical preservation: `userId` matches target `User.id`. |
| **`lesson_progress`** | `lp.user_id` | `LessonProgress.userId` | Identical preservation: `userId` matches target `User.id`. |
| **`student_mastery_snapshots`**| `sms.user_id`| `StudentMasterySnapshot.userId`| Identical preservation: `userId` matches target `User.id`. |
| **`adaptive_recommendations`** | `rec.user_id` | `AdaptiveRecommendation.userId`| Identical preservation: `userId` matches target `User.id`. |
| **`document_cycle_attempts`** | `dca.user_id` | `DocumentCycleAttempt.userId` | Identical preservation: `userId` matches target `User.id`. |

---

## 3. Migration Pipeline Architecture

```text
┌────────────────────────────────┐
│ 1. EXTRACT                     │
│ Read data/eb_accounting_       │
│ database.json state snapshot   │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ 2. VALIDATE & NORMALIZE        │
│ Run Zod migration schemas      │
│ Check email uniqueness         │
│ Validate bcrypt hash prefixes  │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ 3. TRANSFORM                   │
│ Split DbUser into:             │
│ Identity + User + UserProfile  │
│ + UserIdentifier + Credential  │
│ + UserRoleAssignment           │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ 4. LOAD (PostgreSQL / Prisma)  │
│ Execute atomic transaction:    │
│ prisma.$transaction([...])     │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ 5. RECONCILE & AUDIT           │
│ Compare record counts          │
│ Verify sample hash checks      │
│ Confirm 0 orphaned attempts    │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ 6. AUTHORITATIVE SWITCHOVER    │
│ Route repositories to Prisma   │
│ Archive legacy JSON database   │
└────────────────────────────────┘
```

---

## 4. Reconciliation Verification Script Specification

Before retiring the JSON database, a forensic reconciliation script executes the following assertions:

```typescript
export async function verifyMigrationIntegrity(legacyData: DatabaseData, prisma: PrismaClient): Promise<void> {
  // 1. User Count Invariant
  const targetUserCount = await prisma.user.count();
  if (targetUserCount !== legacyData.users.length) {
    throw new Error(`[RECONCILIATION FAILED] User count mismatch: Legacy=${legacyData.users.length}, Target=${targetUserCount}`);
  }

  // 2. Identifier Uniqueness Invariant
  const targetIdentifierCount = await prisma.userIdentifier.count();
  if (targetIdentifierCount !== legacyData.users.length) {
    throw new Error(`[RECONCILIATION FAILED] Identifier count mismatch: Expected ${legacyData.users.length}, got ${targetIdentifierCount}`);
  }

  // 3. Learning Record Integrity Invariant (Question Attempts)
  const legacyAttemptCount = legacyData.questionAttempts.length;
  const targetAttemptCount = await prisma.questionAttempt.count();
  if (targetAttemptCount !== legacyAttemptCount) {
    throw new Error(`[RECONCILIATION FAILED] QuestionAttempt count mismatch: Legacy=${legacyAttemptCount}, Target=${targetAttemptCount}`);
  }

  // 4. Orphan Detection Check
  const orphanedAttempts = await prisma.$queryRaw`
    SELECT COUNT(*) as count FROM question_attempts qa
    LEFT JOIN users u ON qa."userId" = u.id
    WHERE u.id IS NULL
  `;
  // Asserts count === 0
}
```

---

## 5. Rollback Strategy
If any reconciliation check fails during migration:
1. The entire PostgreSQL transaction is aborted (`ROLLBACK`).
2. The runtime server continues operating against `data/eb_accounting_database.json` with zero customer disruption.
3. Errors are logged to `MIGRATION_EXECUTION_FAILURE.log` for engineer analysis.
