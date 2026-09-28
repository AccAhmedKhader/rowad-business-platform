# Target Prisma ERD: Identity, User & Access Architecture

**Document Identifier:** EB-ARCH-PRISMA-ERD-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Relational Data Model  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Entity-Relationship Diagram (ERD)

```text
┌────────────────────────┐
│      Organization      │
│  (Multi-Tenant School) │
└───────────┬────────────┘
            │ 1
            │
            │ 0..*
┌───────────▼────────────┐        1 : 1        ┌────────────────────────┐
│          User          ├────────────────────►│      UserProfile       │
│    (Account Entity)    │                     │  (Display & Regional)  │
└─────┬──────────────┬───┘                     └────────────────────────┘
      │ 1            │ 1
      │              │
      │ 1            │ 0..*
┌─────▼──────┐ ┌─────▼──────────────────┐       ┌────────────────────────┐
│  Identity  │ │   UserRoleAssignment   ├──────►│          Role          │
└─────┬──────┘ └────────────────────────┘       └───────────┬────────────┘
      │                                                     │ 1
      │ 1..*                                                │ 0..*
      ├──────────────────┬─────────────────┐          ┌─────▼────────────┐
      ▼                  ▼                 ▼          │  RolePermission  │
┌──────────────┐   ┌────────────┐   ┌────────────┐    └─────┬────────────┘
│UserIdentifier│   │ Credential │   │ MfaMethod  │          │
└──────────────┘   └────────────┘   └────────────┘          │ 0..*
                                                            ▼
                                                      ┌──────────────────┐
                                                      │    Permission    │
                                                      └──────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                       SESSION & TOKEN LIFECYCLE                        │
│                                                                        │
│  UserSession ──────► RefreshTokenFamily ──────► VerificationToken      │
│  PasswordHistory ──► AuditEvent         ──────► SecurityEvent          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Target Prisma Schema Specification

```prisma
// ============================================================================
// EGYPTIAN BACCALAUREATE (EB) IDENTITY, USER & RBAC PRISMA SCHEMA
// Architecture Version: 2.1 (Foundation Phase U1)
// Authoritative Engine: PostgreSQL 16+
// ============================================================================

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ----------------------------------------------------------------------------
// 1. ORGANIZATIONS & TENANCY
// ----------------------------------------------------------------------------

enum OrganizationType {
  MINISTRY_CENTRAL
  DIRECTORATE
  SCHOOL
  TESTING_CENTER
}

model Organization {
  id          String           @id @default(uuid())
  code        String           @unique
  nameAr      String
  nameEn      String?
  type        OrganizationType @default(SCHOOL)
  parentId    String?
  isActive    Boolean          @default(true)
  settings    Json?            @default("{}")
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  parent      Organization?    @relation("OrgHierarchy", fields: [parentId], references: [id], onDelete: SetNull)
  children    Organization[]   @relation("OrgHierarchy")
  users       User[]

  @@map("organizations")
}

// ----------------------------------------------------------------------------
// 2. IDENTITY AGGREGATE
// ----------------------------------------------------------------------------

enum IdentityStatus {
  ACTIVE
  UNVERIFIED
  SUSPENDED
  DELETED
}

enum IdentifierType {
  EMAIL
  PHONE
  USERNAME
  STUDENT_CODE
  NATIONAL_ID
  EXTERNAL_ID
}

enum CredentialType {
  PASSWORD
  PASSKEY_WEBAUTHN
  OAUTH_LINK
}

enum CredentialStatus {
  ACTIVE
  EXPIRED
  REVOKED
}

model Identity {
  id                 String           @id @default(uuid())
  status             IdentityStatus   @default(UNVERIFIED)
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt
  lastAuthenticatedAt DateTime?

  user               User?
  identifiers        UserIdentifier[]
  credentials        Credential[]
  passwordHistory    PasswordHistory[]
  mfaMethods         MfaMethod[]
  mfaRecoveryCodes   MfaRecoveryCode[]
  verificationTokens VerificationToken[]
  sessions           UserSession[]

  @@map("identities")
}

model UserIdentifier {
  id                 String         @id @default(uuid())
  identityId         String
  type               IdentifierType
  value              String
  normalizedValue    String
  isPrimary          Boolean        @default(false)
  isVerified         Boolean        @default(false)
  verifiedAt         DateTime?
  verificationMethod String?
  createdAt          DateTime       @default(now())

  identity           Identity       @relation(fields: [identityId], references: [id], onDelete: Cascade)

  @@unique([type, normalizedValue])
  @@index([identityId])
  @@index([normalizedValue])
  @@map("user_identifiers")
}

model Credential {
  id                 String           @id @default(uuid())
  identityId         String
  type               CredentialType   @default(PASSWORD)
  status             CredentialStatus @default(ACTIVE)
  algorithm          String           @default("bcrypt")
  secretHash         String
  metadata           Json?
  createdAt          DateTime         @default(now())
  lastUsedAt         DateTime?
  expiresAt          DateTime?

  identity           Identity         @relation(fields: [identityId], references: [id], onDelete: Cascade)

  @@index([identityId, status])
  @@map("credentials")
}

model PasswordHistory {
  id                 String   @id @default(uuid())
  identityId         String
  passwordHash       String
  algorithm          String   @default("bcrypt")
  createdAt          DateTime @default(now())

  identity           Identity @relation(fields: [identityId], references: [id], onDelete: Cascade)

  @@index([identityId, createdAt])
  @@map("password_history")
}

// ----------------------------------------------------------------------------
// 3. USER ACCOUNT & PROFILE
// ----------------------------------------------------------------------------

enum UserAccountStatus {
  INVITED
  PENDING_VERIFICATION
  ACTIVE
  LOCKED
  SUSPENDED
  DEACTIVATED
  ARCHIVED
}

model User {
  id                  String             @id @default(uuid())
  identityId          String             @unique
  organizationId      String?
  status              UserAccountStatus  @default(PENDING_VERIFICATION)
  statusReason        String?
  failedLoginAttempts Int                @default(0)
  lockExpiresAt       DateTime?
  
  createdAt           DateTime           @default(now())
  updatedAt           DateTime           @updatedAt
  activatedAt         DateTime?
  suspendedAt         DateTime?
  deactivatedAt       DateTime?
  archivedAt          DateTime?

  identity            Identity           @relation(fields: [identityId], references: [id], onDelete: Cascade)
  organization        Organization?      @relation(fields: [organizationId], references: [id], onDelete: SetNull)
  profile             UserProfile?
  roleAssignments     UserRoleAssignment[]
  sessions            UserSession[]
  auditEvents         AuditEvent[]       @relation("ActorAuditEvents")

  // Backward-compatible foreign key connections to existing learning records
  questionAttempts    QuestionAttempt[]
  examAttempts        ExamAttempt[]
  lessonProgress      LessonProgress[]
  masterySnapshots    StudentMasterySnapshot[]
  recommendations     AdaptiveRecommendation[]
  documentCycleAttempts DocumentCycleAttempt[]

  @@index([status])
  @@index([organizationId])
  @@map("users")
}

model UserProfile {
  id          String   @id @default(uuid())
  userId      String   @unique
  firstName   String
  secondName  String?
  thirdName   String?
  lastName    String
  displayName String
  locale      String   @default("ar-EG")
  timezone    String   @default("Africa/Cairo")
  avatarUrl   String?
  bio         String?
  preferences Json?    @default("{}")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_profiles")
}

// ----------------------------------------------------------------------------
// 4. NORMALIZED DYNAMIC RBAC & PERMISSIONS
// ----------------------------------------------------------------------------

enum AssignmentScopeType {
  GLOBAL
  ORGANIZATION
  GROUP
  SELF
}

model Role {
  id              String               @id @default(uuid())
  code            String               @unique
  nameAr          String
  nameEn          String
  description     String?
  isSystemRole    Boolean              @default(false)
  priorityLevel   Int                  @default(10)
  createdAt       DateTime             @default(now())
  updatedAt       DateTime             @updatedAt

  rolePermissions RolePermission[]
  assignments     UserRoleAssignment[]

  @@map("roles")
}

model Permission {
  id              String           @id @default(uuid())
  code            String           @unique
  module          String
  nameAr          String
  nameEn          String
  description     String?
  createdAt       DateTime         @default(now())

  rolePermissions RolePermission[]

  @@index([module])
  @@map("permissions")
}

model RolePermission {
  roleId       String
  permissionId String
  grantedAt    DateTime   @default(now())

  role         Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@id([roleId, permissionId])
  @@map("role_permissions")
}

model UserRoleAssignment {
  id               String              @id @default(uuid())
  userId           String
  roleId           String
  scopeType        AssignmentScopeType @default(GLOBAL)
  scopeId          String?
  assignedByUserId String?
  assignedAt       DateTime            @default(now())
  expiresAt        DateTime?

  user             User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  role             Role                @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@unique([userId, roleId, scopeType, scopeId])
  @@index([userId])
  @@index([roleId])
  @@map("user_role_assignments")
}

// ----------------------------------------------------------------------------
// 5. SESSION & REFRESH ROTATION ENGINE
// ----------------------------------------------------------------------------

enum SessionStatus {
  ACTIVE
  EXPIRED
  REVOKED
  SUSPICIOUS_REUSE
}

model UserSession {
  id                      String         @id @default(uuid())
  userId                  String
  identityId              String
  status                  SessionStatus  @default(ACTIVE)
  currentRefreshTokenHash String         @unique
  tokenFamilyId           String
  rotationCounter         Int            @default(0)
  ipAddressMasked         String?
  userAgent               String?
  deviceType              String?
  clientName              String?
  createdAt               DateTime       @default(now())
  lastActiveAt            DateTime       @default(now())
  expiresAt               DateTime
  idleExpiresAt           DateTime
  revokedAt               DateTime?
  revokedByUserId         String?
  revokeReason            String?

  user                    User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  identity                Identity       @relation(fields: [identityId], references: [id], onDelete: Cascade)
  tokenFamily             RefreshTokenFamily @relation(fields: [tokenFamilyId], references: [id], onDelete: Cascade)

  @@index([userId, status])
  @@index([tokenFamilyId])
  @@map("user_sessions")
}

model RefreshTokenFamily {
  id          String        @id @default(uuid())
  identityId  String
  isCompromised Boolean     @default(false)
  createdAt   DateTime      @default(now())

  sessions    UserSession[]

  @@map("refresh_token_families")
}

enum TokenPurpose {
  EMAIL_VERIFICATION
  PASSWORD_RESET
  EMAIL_CHANGE
  INVITATION
}

model VerificationToken {
  id          String       @id @default(uuid())
  identityId  String
  purpose     TokenPurpose
  tokenHash   String       @unique
  expiresAt   DateTime
  consumedAt  DateTime?
  createdAt   DateTime     @default(now())

  identity    Identity     @relation(fields: [identityId], references: [id], onDelete: Cascade)

  @@index([identityId, purpose])
  @@map("verification_tokens")
}

// ----------------------------------------------------------------------------
// 6. MULTI-FACTOR AUTHENTICATION (MFA)
// ----------------------------------------------------------------------------

enum MfaType {
  TOTP
  EMAIL_OTP
  SMS_OTP
  WEBAUTHN
}

model MfaMethod {
  id              String    @id @default(uuid())
  identityId      String
  type            MfaType   @default(TOTP)
  label           String
  encryptedSecret String?
  isEnabled       Boolean   @default(false)
  confirmedAt     DateTime?
  createdAt       DateTime  @default(now())
  lastUsedAt      DateTime?

  identity        Identity  @relation(fields: [identityId], references: [id], onDelete: Cascade)

  @@index([identityId])
  @@map("mfa_methods")
}

model MfaRecoveryCode {
  id          String    @id @default(uuid())
  identityId  String
  codeHash    String
  consumedAt  DateTime?
  createdAt   DateTime  @default(now())

  identity    Identity  @relation(fields: [identityId], references: [id], onDelete: Cascade)

  @@index([identityId])
  @@map("mfa_recovery_codes")
}

// ----------------------------------------------------------------------------
// 7. ENTERPRISE AUDITING & SECURITY TELEMETRY
// ----------------------------------------------------------------------------

model AuditEvent {
  id            String   @id @default(uuid())
  actorUserId   String?
  action        String
  resourceType  String
  resourceId    String?
  result        String   // SUCCESS, REJECTED, ERROR
  occurredAt    DateTime @default(now())
  requestId     String?
  correlationId String?
  reason        String?
  beforeState   Json?
  afterState    Json?
  metadata      Json?    @default("{}")

  actor         User?    @relation("ActorAuditEvents", fields: [actorUserId], references: [id], onDelete: SetNull)

  @@index([actorUserId])
  @@index([action])
  @@index([occurredAt])
  @@map("audit_events")
}

model SecurityEvent {
  id            String   @id @default(uuid())
  eventType     String   // LOGIN_SUCCESS, LOGIN_FAILURE, TOKEN_REUSE, PRIVILEGE_PROBE
  severity      String   // INFO, WARN, CRITICAL
  actorId       String?
  identifier    String?
  ipAddress     String?
  userAgent     String?
  details       Json?    @default("{}")
  occurredAt    DateTime @default(now())

  @@index([eventType])
  @@index([severity])
  @@index([occurredAt])
  @@map("security_events")
}
```

---

## 3. Relationship to Existing Learning Records

All existing learning records remain linked via the canonical `userId` foreign key pointing to `User.id`:
* `QuestionAttempt.userId -> User.id`
* `ExamAttempt.userId -> User.id`
* `LessonProgress.userId -> User.id`
* `StudentMasterySnapshot.userId -> User.id`
* `AdaptiveRecommendation.userId -> User.id`
* `DocumentCycleAttempt.userId -> User.id`

**Zero Historical Data Loss:**  
When migrating from legacy JSON to PostgreSQL, every student record retains its existing `usr-student-1` identifier as the system `User.id`.
