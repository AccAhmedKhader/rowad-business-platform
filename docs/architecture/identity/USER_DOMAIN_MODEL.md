# User Domain Model Specification

**Document Identifier:** EB-ARCH-USER-MODEL-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Domain Overview & Aggregate Root

The **User Domain** represents a system actor within the Egyptian Baccalaureate platform. It encapsulates the tenancy, account lifecycle, profile attributes, and organizational associations of an individual who has been granted access.

### The Boundary Axiom
> **A User is an account actor; a Student is an educational domain entity.**  
> An administrative User (e.g., School Director, Teacher) interacts with the system using User Account semantics without an academic student persona. A Student interacts with the system via a User Account backed by an educational `StudentProfile`.

```text
┌───────────────────────────────────────────────────────────────┐
│                      USER AGGREGATE                           │
│                                                               │
│  User (Root)                                                  │
│  ├── id: UUID                                                 │
│  ├── identityId: UUID (FK -> Identity.id)                     │
│  ├── status: UserAccountStatus                                │
│  ├── organizationId?: UUID (FK -> Organization.id)            │
│  ├── profile: UserProfile                                     │
│  ├── roleAssignments: UserRoleAssignment[]                    │
│  └── auditMetadata: LifecycleTimestamps                       │
└───────────────────────────────┬───────────────────────────────┘
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
   ┌───────────────────────────┐ ┌───────────────────────────┐
   │      STUDENT DOMAIN       │ │      TEACHER DOMAIN       │
   │  StudentProfile           │ │  TeacherProfile           │
   │  AcademicEnrollment       │ │  SubjectAssignment        │
   │  LearningRecord           │ │  ClassSupervision         │
   └───────────────────────────┘ └───────────────────────────┘
```

---

## 2. User Account Aggregate (`User`)

```typescript
export enum UserAccountStatus {
  INVITED = 'INVITED',                         // Created by admin, awaiting initial claim
  PENDING_VERIFICATION = 'PENDING_VERIFICATION', // Registered, awaiting email/phone confirmation
  ACTIVE = 'ACTIVE',                           // Fully functional account
  LOCKED = 'LOCKED',                           // Temporarily locked due to repeated failed logins
  SUSPENDED = 'SUSPENDED',                     // Administratively disabled (disciplinary/security)
  DEACTIVATED = 'DEACTIVATED',                 // Soft-closed by user request
  ARCHIVED = 'ARCHIVED'                        // Long-term cold storage / graduation rollover
}

export interface User {
  id: string;                                  // UUIDv4 (System User ID)
  identityId: string;                          // 1:1 reference to Identity aggregate
  organizationId?: string;                     // Optional organization / school boundary
  status: UserAccountStatus;
  statusReason?: string;                       // Justification for suspension/lock/archive
  failedLoginAttempts: number;                 // Counter for brute-force lock triggering
  lockExpiresAt?: Date;                        // Temporary lock timeout
  
  // Lifecycle audit timestamps
  createdAt: Date;
  updatedAt: Date;
  activatedAt?: Date;
  suspendedAt?: Date;
  deactivatedAt?: Date;
  archivedAt?: Date;
}
```

---

## 3. User Profile Entity (`UserProfile`)

To support localization, proper formal Arabic naming conventions, and internationalization, the profile is separated from the core authentication identity.

```typescript
export interface UserProfile {
  id: string;                                  // UUIDv4
  userId: string;                              // 1:1 FK -> User.id
  
  // Formal Naming Structure (Egyptian Educational Standard)
  firstName: string;                           // First / Given name (e.g., أحمد)
  secondName?: string;                         // Father's name (e.g., محمد)
  thirdName?: string;                          // Grandfather's name (e.g., علي)
  lastName: string;                            // Family / Surname (e.g., الشناوي)
  displayName: string;                         // Preferred display name in UI
  
  // Regional & Accessibility Settings
  locale: 'ar-EG' | 'en-US';                   // Default: Egyptian Arabic ('ar-EG')
  timezone: string;                            // Default: 'Africa/Cairo'
  avatarUrl?: string;                          // Secure storage URL
  bio?: string;
  
  // Extensible Preferences
  preferences: {
    theme?: 'classic-navy' | 'light' | 'high-contrast';
    notificationsEmail?: boolean;
    notificationsSms?: boolean;
    accessibilityFontScaling?: 'standard' | 'large' | 'extra-large';
  };
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 4. User Account Lifecycle State Machine

Transitions between states are strictly governed by business operations and security policies. Direct mutations from UI controllers or database updates are strictly forbidden.

```text
               ┌──────────┐
               │ INVITED  │
               └────┬─────┘
                    │ Complete Setup
                    ▼
          ┌────────────────────┐
          │PENDING_VERIFICATION│
          └─────────┬──────────┘
                    │ Verify Identifier
                    ▼
               ┌──────────┐
         ┌────►│  ACTIVE  │◄────────────┐
         │     └────┬─────┘             │
         │          │                   │
Reactivate/Unlock   ├───────────┬───────┴──────────┐
         │          ▼           ▼                  ▼
   ┌─────┴────┐┌──────────┐┌───────────┐    ┌──────────┐
   │  LOCKED  ││SUSPENDED ││DEACTIVATED│    │ ARCHIVED │
   └──────────┘└────┬─────┘└─────┬─────┘    └────▲─────┘
                    │            │               │
                    └────────────┴───────────────┘
                              Archive
```

### 4.1 Legal State Transitions

| From State | Triggering Action | To State | Authorization Scope | Emitted Audit Event |
| :--- | :--- | :--- | :--- | :--- |
| `INVITED` | Initial account claim & credential setup | `PENDING_VERIFICATION` | Self | `USER_INVITE_CLAIMED` |
| `INVITED` | Admin cancellation | `ARCHIVED` | Academic Admin / Super Admin | `USER_INVITE_CANCELLED` |
| `PENDING_VERIFICATION` | Email/SMS verification token consumed | `ACTIVE` | System / Self | `USER_ACTIVATED` |
| `ACTIVE` | Max failed logins exceeded (e.g., 5 attempts) | `LOCKED` | Security System | `ACCOUNT_AUTO_LOCKED` |
| `ACTIVE` | Administrative disciplinary or security action | `SUSPENDED` | Platform Admin / Super Admin | `ACCOUNT_SUSPENDED` |
| `ACTIVE` | User self-service deactivation | `DEACTIVATED` | Self (`users.deactivate_self`) | `ACCOUNT_DEACTIVATED` |
| `LOCKED` | Lockout window expires or admin unlock | `ACTIVE` | Security System / Admin | `ACCOUNT_UNLOCKED` |
| `SUSPENDED` | Administrative investigation resolved | `ACTIVE` | Platform Admin / Super Admin | `ACCOUNT_REINSTATED` |
| `DEACTIVATED` | Re-activation within grace period (30 days) | `ACTIVE` | Self (with step-up auth) | `ACCOUNT_REACTIVATED` |
| Any Non-Active | Graduation rollover / Retention policy expiry | `ARCHIVED` | System Batch / Admin | `ACCOUNT_ARCHIVED` |

---

## 5. Multi-Tenancy & Institutional Readiness (`Organization`)

To prepare the Egyptian Baccalaureate platform for multi-school deployments, regional educational directorates, and private/public academy cohorts without requiring a rewrite of the schema:

```typescript
export enum OrganizationType {
  MINISTRY_CENTRAL = 'MINISTRY_CENTRAL',       // Central Ministry oversight
  EDUCATIONAL_DIRECTORATE = 'DIRECTORATE',     // Regional Directorate (e.g., Giza, Cairo)
  SCHOOL = 'SCHOOL',                           // Egyptian Baccalaureate High School
  TESTING_CENTER = 'TESTING_CENTER'            // Official Examination Center
}

export interface Organization {
  id: string;                                  // UUIDv4
  code: string;                                // e.g., "SCH-GIZA-014"
  nameAr: string;                              // Official Arabic Name
  nameEn?: string;
  type: OrganizationType;
  parentId?: string;                           // Hierarchical parent (FK -> Organization.id)
  isActive: boolean;
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
```

### Partitioning Axiom:
* **Global Reference Data:** Curriculum, Official Question Banks, Standard Competencies, Taxonomies, and System Roles are **global** (not partitioned by organization).
* **Tenant-Scoped Data:** Student enrollments, class cohorts, teacher-student assignments, and internal mock exams may be bounded by `organizationId`.

---

## 6. Minimal Student Boundary Reference

The full Student Domain will be implemented in subsequent phases (U2+). For architectural boundary enforcement during U1:

```typescript
export interface StudentProfileMinimal {
  id: string;                                  // UUIDv4 (Student Aggregate ID)
  userId: string;                              // 1:1 FK -> User.id (Unique)
  studentCode: string;                         // Unique Official Student Code ("EB-2026-XXXXX")
  nationalIdMasked?: string;                   // Egyptian National ID (Masked)
  academicStatus: 'ENROLLED' | 'GRADUATED' | 'TRANSFERRED' | 'WITHDRAWN';
  createdAt: Date;
  updatedAt: Date;
}

export interface AcademicEnrollmentMinimal {
  id: string;
  studentId: string;                           // FK -> StudentProfile.id
  gradeLevel: 'GRADE_10' | 'GRADE_11' | 'GRADE_12';
  track: 'GENERAL' | 'BUSINESS_ACCOUNTING';
  academicYear: string;                        // "2025/2026"
  organizationId: string;                      // School / Testing Center
  status: 'ACTIVE' | 'COMPLETED' | 'INACTIVE';
}
```

**Anti-Corruption Invariant:**  
No academic property (`gradeLevel`, `track`, `academicYear`, `gpa`, `masteryScore`) may be written to the `User` or `UserProfile` tables.
