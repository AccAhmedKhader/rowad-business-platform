# Complete REST API Contract: Identity, User & Session Services

**Document Identifier:** EB-ARCH-API-CONTRACT-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Global API Conventions

### Base URL: `/api/v2`
### Standard Response Envelope
All responses adhere to the standard JSON API envelope:

```typescript
// Success Response
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    requestId: string;
    timestamp: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Error Response
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;                      // Machine-readable enum (e.g., 'INVALID_CREDENTIALS')
    message: string;                   // Human-readable localized Arabic message
    details?: Record<string, any>;     // Validation error fields
    requestId: string;
    timestamp: string;
  };
}
```

---

## 2. Authentication & Credential Endpoints

### 2.1 Register New Student Account
* **Endpoint:** `POST /api/v2/auth/register`
* **Purpose:** Public self-registration for new Egyptian Baccalaureate students.
* **Authentication Required:** No.
* **Permission Required:** None (Public).
* **Enforced Scope:** `SELF` (Role strictly hard-coded to `STUDENT`).
* **Rate Limit:** 10 requests / hour / IP.
* **Audit Event:** `USER_REGISTERED` (`result: SUCCESS`).
* **Security Event:** `ACCOUNT_CREATED` (`severity: INFO`).
* **Idempotency:** Unique on `email`. Duplicate submission returns `409 EMAIL_ALREADY_REGISTERED`.

#### Request Schema:
```json
{
  "email": "ahmed.ali@example.com",
  "password": "Password2026!",
  "firstName": "أحمد",
  "lastName": "علي",
  "locale": "ar-EG"
}
```

#### Response Schema (`201 Created`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "email": "ahmed.ali@example.com",
      "displayName": "أحمد علي",
      "status": "PENDING_VERIFICATION",
      "roles": ["STUDENT"]
    },
    "verificationRequired": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "ref_9a8b7c6d5e4f3a2b1c0d",
    "expiresInSeconds": 900
  }
}
```

---

### 2.2 User Login
* **Endpoint:** `POST /api/v2/auth/login`
* **Purpose:** Authenticate an identity and initiate a new `UserSession`.
* **Authentication Required:** No.
* **Permission Required:** None.
* **Rate Limit:** 5 failed attempts / 15 minutes per IP/account (triggers temporary lockout).
* **Audit Event:** `USER_LOGIN` (`result: SUCCESS | FAILED`).
* **Security Event:** `LOGIN_SUCCESS` / `LOGIN_FAILURE` / `ACCOUNT_LOCKED`.

#### Request Schema:
```json
{
  "identifier": "student@eb.edu.eg",
  "password": "Password123!",
  "deviceInfo": {
    "clientName": "Chrome 128 on Windows 11",
    "deviceType": "DESKTOP"
  }
}
```

#### Response Schema (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_student_1",
      "email": "student@eb.edu.eg",
      "displayName": "طالب البكالوريا المتميز",
      "status": "ACTIVE",
      "roles": ["STUDENT"]
    },
    "sessionId": "sess_8f29c2d1-0f7a-4a2e-b6a3-6e2a1b9f7a4e",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "ref_4e3d2c1b0a9f8e7d",
    "expiresInSeconds": 900
  }
}
```

#### Error Codes:
* `401 INVALID_CREDENTIALS`: Identifier or password does not match.
* `403 ACCOUNT_LOCKED`: Account temporarily locked due to brute-force threshold.
* `403 ACCOUNT_SUSPENDED`: Account administratively suspended.

---

### 2.3 Refresh Token Rotation
* **Endpoint:** `POST /api/v2/auth/refresh`
* **Purpose:** Exchange single-use refresh token for a newly rotated token pair.
* **Authentication Required:** No (Token bearer in payload).
* **Rate Limit:** 30 requests / minute / session.
* **Audit Event:** `TOKEN_ROTATED`.
* **Security Event:** Emits `REFRESH_TOKEN_REUSE` if an invalidated token is re-submitted.

#### Request Schema:
```json
{
  "sessionId": "sess_8f29c2d1-0f7a-4a2e-b6a3-6e2a1b9f7a4e",
  "refreshToken": "ref_4e3d2c1b0a9f8e7d"
}
```

#### Response Schema (`200 OK`):
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "ref_5f4e3d2c1b0a9f8e",
    "expiresInSeconds": 900
  }
}
```

---

### 2.4 User Logout
* **Endpoint:** `POST /api/v2/auth/logout`
* **Purpose:** Terminate current `UserSession` and invalidate refresh token.
* **Authentication Required:** Optional (Accepts access token header and/or sessionId in body).
* **Rate Limit:** Standard.
* **Audit Event:** `USER_LOGOUT`.

---

### 2.5 Get Authenticated User Profile (`/auth/me`)
* **Endpoint:** `GET /api/v2/auth/me`
* **Purpose:** Fetch current active user profile, tenant information, and authorized roles.
* **Authentication Required:** Yes.
* **Permission Required:** Authenticated User (`SELF`).
* **Response Schema (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "id": "usr_student_1",
    "email": "student@eb.edu.eg",
    "profile": {
      "firstName": "طالب",
      "lastName": "البكالوريا",
      "displayName": "طالب البكالوريا المتميز",
      "locale": "ar-EG",
      "timezone": "Africa/Cairo"
    },
    "status": "ACTIVE",
    "organization": null,
    "roles": [
      {
        "code": "STUDENT",
        "nameAr": "طالب البكالوريا",
        "scopeType": "GLOBAL"
      }
    ]
  }
}
```

---

### 2.6 Password Recovery Endpoints
* `POST /api/v2/auth/password/forgot`:
  * Public endpoint.
  * Body: `{"identifier": "user@eb.edu.eg"}`.
  * **Anti-Enumeration Rule:** Always responds with `200 OK: "إذا كان الحساب موجوداً، تم إرسال رابط الاستعادة"` regardless of whether the email exists.
* `POST /api/v2/auth/password/reset`:
  * Consumes single-use reset token and assigns new password hash.
  * Automatically revokes all existing active sessions.
* `POST /api/v2/auth/password/change`:
  * Requires active session authentication.
  * Requires old password verification.

---

## 3. Session Management Endpoints

| Method | Path | Required Permission | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v2/auth/sessions` | `sessions.view_self` | Returns array of user's active devices & sessions. |
| `POST` | `/api/v2/auth/sessions/:id/revoke` | `sessions.revoke_self` | Revokes the specified session ID. |
| `POST` | `/api/v2/auth/sessions/revoke-all` | `sessions.revoke_self` | Revokes all sessions except the current active session. |

---

## 4. User Administration Endpoints

### 4.1 List Users
* **Endpoint:** `GET /api/v2/users`
* **Permission Required:** `users.view`
* **Query Parameters:** `page`, `limit`, `role`, `status`, `organizationId`, `search`.

### 4.2 Create Managed Staff/User Account
* **Endpoint:** `POST /api/v2/users`
* **Permission Required:** `users.create`
* **Enforced Scope:** Actor must hold higher priority than assigned role.

### 4.3 Suspend / Reactivate User
* **Endpoint:** `POST /api/v2/users/:id/suspend`
* **Permission Required:** `users.suspend`
* **Action:** Sets `status = 'SUSPENDED'` and immediately terminates all active sessions in `UserSession`.
* **Endpoint:** `POST /api/v2/users/:id/reactivate`
* **Permission Required:** `users.suspend`

### 4.4 Manage User Roles
* **Endpoint:** `POST /api/v2/users/:id/roles`
* **Permission Required:** `user_roles.assign`
* **Endpoint:** `DELETE /api/v2/users/:id/roles/:roleId`
* **Permission Required:** `user_roles.assign`
