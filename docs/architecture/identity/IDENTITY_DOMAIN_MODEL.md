# Identity Domain Model Specification

**Document Identifier:** EB-ARCH-IDENT-MODEL-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Domain Overview & Boundary Definition

The **Identity Bounded Context** is responsible for establishing, verifying, and maintaining the verifiable existence of actors who interact with the Egyptian Baccalaureate platform.

### Core Architectural Principle: Separation of Concerns
```text
┌──────────────────────────────────────────────────────────┐
│                   IDENTITY CONTEXT                       │
│  "Who is asserting this action and how is it verified?"   │
│   - Identifiers (Email, Phone, Username, Student Code)   │
│   - Verification & Trust State                           │
│   - Authentication Credentials                           │
└────────────────────────────┬─────────────────────────────┘
                             │ 1 : 1
                             ▼
┌──────────────────────────────────────────────────────────┐
│                     USER CONTEXT                         │
│       "What account entity holds tenancy and state?"      │
│   - Account Status (Active, Suspended, Locked)           │
│   - Organization Membership                              │
│   - User Profile (Display Name, Locale, Avatar)          │
└────────────────────────────┬─────────────────────────────┘
                             │ 1 : 1 (Conditional)
                             ▼
┌──────────────────────────────────────────────────────────┐
│                   STUDENT CONTEXT                        │
│     "What educational and academic journey is tracked?"  │
│   - Academic Enrollment, Grade, Track                    │
│   - Learning Mastery Snapshots                           │
│   - Question & Exam Attempts                             │
└──────────────────────────────────────────────────────────┘
```

**Cardinal Rule:**  
An Identity is **not** a User, and a User is **not** a Student.  
* An Identity represents authentication credentials and verifiable claims.  
* A User represents a system actor and security principal.  
* A Student represents an educational domain persona with academic enrollments.

---

## 2. Identity Aggregate & Value Objects

### 2.1 Identity Aggregate Root (`Identity`)

```typescript
export interface Identity {
  id: string;                         // UUIDv4 (Immutable identifier)
  status: IdentityStatus;             // ACTIVE, UNVERIFIED, SUSPENDED, DELETED
  identifiers: UserIdentifier[];      // Collection of claimed identifiers
  credentials: Credential[];          // Collection of registered authentication factors
  mfaEnrollment: MfaEnrollment;       // MFA configurations & status
  createdAt: Date;
  updatedAt: Date;
  lastAuthenticatedAt?: Date;
}
```

### 2.2 Identifier Types & Normalization

An Identity can possess multiple identifiers of different types, but must possess exactly **one primary identifier** at any time.

```typescript
export enum IdentifierType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  USERNAME = 'USERNAME',
  STUDENT_CODE = 'STUDENT_CODE',      // Ministry/School Official Student Code
  NATIONAL_ID = 'NATIONAL_ID',        // Egyptian National ID (Optional / Restricted)
  EXTERNAL_ID = 'EXTERNAL_ID'         // Third-party IdP / OAuth subject identifier
}

export interface UserIdentifier {
  id: string;                         // UUIDv4
  identityId: string;                 // FK -> Identity.id
  type: IdentifierType;
  value: string;                      // Raw value (as entered)
  normalizedValue: string;            // Canonical normalized representation
  isPrimary: boolean;                 // Exactly one primary per Identity
  isVerified: boolean;
  verifiedAt?: Date;
  verificationMethod?: 'EMAIL_OTP' | 'SMS_OTP' | 'ADMIN_VERIFIED' | 'IDP_TRUST';
  createdAt: Date;
}
```

### Normalization Invariants:
1. **EMAIL:** Trimmed whitespace, converted strictly to lowercase (`RFC 5322`). Sub-addressing (e.g., `user+tag@eb.edu.eg`) is preserved but domain normalized.
2. **PHONE:** Cleaned of all non-digit characters and formatted in international E.164 standard (e.g., `+201012345678` for Egypt).
3. **USERNAME:** Trimmed, lowercased, constrained to `^[a-z0-9_.-]{3,30}$`.
4. **STUDENT_CODE:** Trimmed, uppercase, alphanumeric (`EB-2026-XXXXX`).

---

## 3. Credential Model & Polymorphism

Credentials represent the verifiable cryptographic secrets associated with an Identity. The model supports multi-modal authentication without requiring immediate implementation of all methods.

```typescript
export enum CredentialType {
  PASSWORD = 'PASSWORD',
  PASSKEY_WEBAUTHN = 'PASSKEY_WEBAUTHN',
  OAUTH_LINK = 'OAUTH_LINK',
  SECURITY_KEY = 'SECURITY_KEY'
}

export enum CredentialStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  PENDING_ROTATION = 'PENDING_ROTATION'
}

export interface Credential {
  id: string;                         // UUIDv4
  identityId: string;                 // FK -> Identity.id
  type: CredentialType;
  status: CredentialStatus;
  algorithm: string;                  // 'bcrypt', 'argon2id', 'ed25519', 'rs256'
  secretHash: string;                 // Salted hash or public credential key
  metadata?: Record<string, any>;     // Key IDs, public keys, authenticator info
  createdAt: Date;
  lastUsedAt?: Date;
  expiresAt?: Date;
}
```

### 3.1 Password Credential Specifics
* **Algorithm:** `bcrypt` (default: 10 salt rounds; configurable to 12 in production environment) with planned upgrade path to `Argon2id`.
* **Constraint:** Passwords must meet minimum complexity:
  * Minimum 8 characters (12 recommended).
  * At least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character.
  * Checked against common breached password lists (NIST SP 800-63-4).
* **Storage Invariant:** Plaintext passwords are never stored, never logged, and never transmitted back to clients.

---

## 4. Multi-Factor Authentication (MFA) Foundation

MFA state is decoupled from core credentials to allow step-up authentication and compliance with institutional requirements.

```typescript
export enum MfaType {
  TOTP = 'TOTP',                      // RFC 6238 Time-Based One-Time Password
  EMAIL_OTP = 'EMAIL_OTP',            // Short-lived 6-digit numeric token
  SMS_OTP = 'SMS_OTP',                // Short-lived SMS token
  WEBAUTHN = 'WEBAUTHN'               // FIDO2 Hardware Token / Biometric
}

export interface MfaMethod {
  id: string;
  identityId: string;
  type: MfaType;
  label: string;                      // e.g., "Google Authenticator - Pixel 8"
  encryptedSecret?: string;           // Encrypted at rest via KMS / AES-256-GCM
  isEnabled: boolean;
  confirmedAt?: Date;
  createdAt: Date;
  lastUsedAt?: Date;
}

export interface MfaRecoveryCode {
  id: string;
  identityId: string;
  codeHash: string;                   // bcrypt/argon2 hash of single-use recovery code
  consumedAt?: Date;
  createdAt: Date;
}

export interface MfaEnrollment {
  isEnabled: boolean;
  enforcedByPolicy: boolean;
  defaultMethod?: MfaType;
  methods: MfaMethod[];
  backupCodesRemaining: number;
}
```

---

## 5. Domain Invariants & Business Rules

1. **Unique Primary Identifier:**  
   Every Identity must have at least one active identifier marked `isPrimary = true`. No two identities may share the same `(type, normalizedValue)`.
2. **Credential Presence:**  
   An active Identity must possess at least one active credential unless authenticated exclusively via an authorized external federated Identity Provider (IdP).
3. **Immutability of Historical Hashes:**  
   Credential secrets are immutable. Changing a password creates a new active `Credential` and moves the previous credential to `REVOKED` or archived state in `PasswordHistory`.
4. **Verification Boundary:**  
   An unverified identifier cannot be used for account recovery or high-privilege administrative actions.
5. **No Academic Properties:**  
   The Identity aggregate contains zero references to courses, grades, curriculum, exams, or student progress.
