# Authorization Model & Policy Specification

**Document Identifier:** EB-ARCH-AUTHZ-MODEL-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Executive Summary & Authorization Paradigm

The Egyptian Baccalaureate platform transitions from a hard-coded 4-role enum (`STUDENT | TEACHER | CONTENT_MANAGER | ADMIN`) to a **dynamic, database-backed Role-Based and Policy-Based Access Control (RBAC/PBAC) architecture**.

### Core Tenet
> **Frontend visibility is convenience; server-side evaluation is authorization.**  
> Hiding a button, masking a URL, or omitting a menu item in React does not constitute authorization. Every API request arriving at the server must pass through an authoritative, context-aware policy engine.

```text
┌──────────────────────────────────────────────────────────┐
│                      ACTOR USER                          │
└────────────────────────────┬─────────────────────────────┘
                             │ Has assignments
                             ▼
┌──────────────────────────────────────────────────────────┐
│                 USER ROLE ASSIGNMENT                     │
│  - roleId                                                │
│  - scopeType (GLOBAL, ORGANIZATION, GROUP, ASSIGNED)    │
│  - scopeId (e.g., School ID, Class ID, Course ID)       │
└────────────────────────────┬─────────────────────────────┘
                             │ References
                             ▼
┌──────────────────────────────────────────────────────────┐
│                      SYSTEM ROLE                         │
│  - code (e.g., 'TEACHER', 'EXAM_MANAGER')                │
│  - isSystemProtected: boolean                            │
└────────────────────────────┬─────────────────────────────┘
                             │ Maps via RolePermission
                             ▼
┌──────────────────────────────────────────────────────────┐
│                      PERMISSION                          │
│  - resource.action (e.g., 'exams.publish')               │
│  - scopeLevelConstraint                                  │
└────────────────────────────┬─────────────────────────────┘
                             │ Evaluated against
                             ▼
┌──────────────────────────────────────────────────────────┐
│                 AUTHORIZATION SERVICE                    │
│  authorize({ actorUserId, action, resource, context })   │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Dynamic RBAC Entities

### 2.1 Role Entity (`Role`)
Roles are stored in PostgreSQL rather than hard-coded enums. This allows institutional customization without requiring schema migrations or code recompilation.

```typescript
export interface Role {
  id: string;                                  // UUIDv4
  code: string;                                // Unique identifier (e.g., 'ACADEMIC_ADMIN')
  nameAr: string;                              // Arabic display name
  nameEn: string;                              // English display name
  description?: string;
  isSystemRole: boolean;                       // If true, cannot be deleted or code-renamed
  priorityLevel: number;                       // Hierarchical evaluation weight (100 = SuperAdmin, 10 = Student)
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 Initial Seed Roles (Institutional Hierarchy)

The system initializes with 13 canonical seed roles:

| Priority | Role Code | Arabic Name | Educational Function / Description |
| :---: | :--- | :--- | :--- |
| **100** | `SUPER_ADMIN` | مدير النظام الأعلى | Root administrative access, security keys, audit logs, tenant provisioning. |
| **90** | `PLATFORM_ADMIN` | مدير المنصة التقنية | Operational system configuration, feature flags, service integrations. |
| **80** | `ACADEMIC_ADMIN` | مدير الشؤون الأكاديمية | Ministry/Directorate academic supervision, curriculum publishing approval. |
| **70** | `TEACHER` | معلم خبير | Classroom instruction, student progress review, assignment of remediation. |
| **65** | `ASSISTANT_TEACHER` | معلم مساعد | Grading assistance, drill supervision, student messaging support. |
| **60** | `CONTENT_MANAGER` | مدير المحتوى التعليمي | Lesson authoring, pedagogical text curation, textbook chapter structuring. |
| **55** | `QUESTION_BANK_MANAGER`| مسؤول بنوك الأسئلة | Taxonomy mapping, question quality validation, psychometric approval. |
| **50** | `EXAM_MANAGER` | مسؤول الامتحانات | Examination blueprint creation, timing rules, exam session scheduling. |
| **45** | `REVIEWER` | محكم أكاديمي | Independent double-blind review of items, pedagogical compliance checks. |
| **30** | `SUPPORT_AGENT` | مسؤول الدعم الفني | End-user account assistance, password reset verification, ticketing. |
| **25** | `ANALYST` | محلل بيانات أكاديمية | Read-only statistical aggregation, national performance dashboards. |
| **10** | `STUDENT` | طالب البكالوريا | Learning consumption, drill attempt submission, mock exams, path tracking. |
| **10** | `GUARDIAN` | ولي الأمر | Read-only progress, attendance, and mastery oversight for linked student(s). |

---

## 3. Permission Model (`resource.action`)

Permissions follow a clean, standardized dot-notation syntax: `<resource>.<action>`.

### 3.1 Permission Entity (`Permission`)

```typescript
export interface Permission {
  id: string;                                  // UUIDv4
  code: string;                                // e.g., "questions.create", "users.suspend"
  module: string;                              // e.g., "CURRICULUM", "ASSESSMENT", "IDENTITY"
  nameAr: string;
  nameEn: string;
  description?: string;
  createdAt: Date;
}

export interface RolePermission {
  roleId: string;                              // FK -> Role.id
  permissionId: string;                        // FK -> Permission.id
  grantedAt: Date;
}
```

### 3.2 Canonical Resource Actions

```text
users.view               users.create             users.update             users.suspend
users.archive            users.roles_assign       students.view            students.create
students.update          students.enroll          students.archive         students.export
lessons.view             lessons.create           lessons.update           lessons.publish
questions.view           questions.create         questions.update         questions.validate
questions.retire         exams.view               exams.create             exams.publish
exams.grade              exams.submit             attempts.view_own        attempts.view_assigned
analytics.view_platform  analytics.view_school    analytics.view_class     audit.view
security.manage          sessions.view            sessions.revoke          system.configure
```

---

## 4. User Role Assignment & Scoping

Users do not possess permissions directly; they are assigned roles that may be scoped globally, organizationally, or by class cohort.

```typescript
export enum AssignmentScopeType {
  GLOBAL = 'GLOBAL',                           // Applies across entire Egyptian platform
  ORGANIZATION = 'ORGANIZATION',               // Applies to specific School or Directorate
  GROUP = 'GROUP',                             // Applies to specific Class Cohort / Section
  SELF = 'SELF'                                // Strictly self-referential
}

export interface UserRoleAssignment {
  id: string;
  userId: string;                              // FK -> User.id
  roleId: string;                              // FK -> Role.id
  scopeType: AssignmentScopeType;
  scopeId?: string;                            // Organization ID, School ID, or Class ID
  assignedByUserId: string;
  assignedAt: Date;
  expiresAt?: Date;                            // Temporary assignments (e.g., substitute teacher)
}
```

---

## 5. Central Authorization Engine Specification

All authorization checks are routed through a single, testable `AuthorizationService`.

```typescript
export interface AuthorizationRequest {
  actorUserId: string;                         // The user performing the action
  action: string;                              // e.g., 'students.view', 'exams.publish'
  resourceType: string;                        // e.g., 'StudentProfile', 'Exam', 'User'
  resourceId?: string;                         // Target entity ID
  context?: {
    organizationId?: string;                   // Tenant/School context
    classGroupId?: string;                     // Class cohort context
    targetUserId?: string;                     // In ownership comparisons
    isEmergencyOverride?: boolean;
  };
}

export interface AuthorizationResult {
  authorized: boolean;
  reason?: string;
  appliedRole?: string;
  appliedScope?: AssignmentScopeType;
}

export interface IAuthorizationService {
  authorize(req: AuthorizationRequest): Promise<AuthorizationResult>;
  getUserPermissions(userId: string): Promise<Set<string>>;
  hasRole(userId: string, roleCode: string): Promise<boolean>;
}
```

### 5.1 Policy Evaluation Algorithm
1. **Account Liveness Check:** Ensure actor's `User.status === 'ACTIVE'`. If `SUSPENDED`, `LOCKED`, or `DEACTIVATED`, reject immediately (`403 FORBIDDEN - ACCOUNT_NOT_ACTIVE`).
2. **Super Admin Bypass:** If actor holds active `SUPER_ADMIN` with `GLOBAL` scope, permit immediately with high-level audit trail.
3. **Role & Permission Resolution:** Fetch all active, non-expired `UserRoleAssignment` entries for `actorUserId`. Collect associated permissions.
4. **Action Matching:** Check if requested `action` exists within the permission set. If not found, reject (`403 FORBIDDEN - MISSING_PERMISSION`).
5. **Scope & Tenancy Validation:**
   * If assignment is `GLOBAL`: Grant.
   * If assignment is `ORGANIZATION`: Assert `context.organizationId === assignment.scopeId`.
   * If assignment is `GROUP`: Assert target resource belongs to assigned group.
   * If assignment is `SELF`: Assert `context.targetUserId === actorUserId`.
6. **Audit Telemetry:** Log authorization decision to internal telemetry for anomalous privilege probing detection.

---

## 6. Registration & Privilege Escalation Defenses

### Invariant 1: Public Self-Registration Lock
* Any request to public `/api/auth/register` is strictly bound to the `STUDENT` role with `SELF` scope.
* Payloads submitting `role`, `roles`, `isAdmin`, `isTeacher`, or `permissions` are rejected with `400 VALIDATION_ERROR` or strictly ignored.

### Invariant 2: Administrative Role Assignment Boundary
* Assigning a role with priority $P$ requires the actor to hold a role with priority $P_{actor} > P$.
* A `PLATFORM_ADMIN` cannot create or elevate an account to `SUPER_ADMIN`.
* A `TEACHER` cannot assign roles to other users.
* Users cannot modify their own role assignments under any circumstances.
