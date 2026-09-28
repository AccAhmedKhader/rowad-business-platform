# Canonical Permission Matrix Specification

**Document Identifier:** EB-ARCH-PERM-MATRIX-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Matrix Overview

This document specifies the exact, non-ambiguous mapping between system roles and functional permissions across all core modules of the Egyptian Baccalaureate platform.

### Scope Definitions:
* **`GLOBAL`**: Unrestricted across all platform tenants, schools, and datasets.
* **`ORGANIZATION`**: Restricted to the actor's assigned School, Testing Center, or Directorate.
* **`ASSIGNED`**: Restricted to students or cohorts explicitly assigned to the teacher/mentor.
* **`SELF`**: Restricted exclusively to the actor's own records.
* **`DENY`**: Not permitted under any condition.

---

## 2. Identity, User & Session Management Permissions

| Resource | Action | SUPER_ADMIN | PLATFORM_ADMIN | ACADEMIC_ADMIN | TEACHER | SUPPORT_AGENT | STUDENT | GUARDIAN | Conditions / Business Logic |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **users** | `view` | GLOBAL | GLOBAL | ORGANIZATION | ASSIGNED | GLOBAL | SELF | SELF | Students only view self; Teachers view assigned class roster. |
| **users** | `create` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | DENY | Admin provisioning of staff accounts; Public registers via student flow. |
| **users** | `update` | GLOBAL | GLOBAL | ORGANIZATION | DENY | SELF | SELF | SELF | Profile update only for self; Administrative update for staff. |
| **users** | `suspend` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | DENY | Requires administrative security clearance. |
| **users** | `archive` | GLOBAL | GLOBAL | DENY | DENY | DENY | DENY | DENY | Soft-archive cold storage. |
| **roles** | `view` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | DENY | List roles defined in system. |
| **roles** | `manage` | GLOBAL | GLOBAL | DENY | DENY | DENY | DENY | DENY | Create/edit custom role configurations. |
| **permissions** | `manage` | GLOBAL | DENY | DENY | DENY | DENY | DENY | DENY | Strictly reserved for root Super Admin. |
| **user_roles** | `assign` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | DENY | Cannot assign role of higher priority than self. |
| **sessions** | `view` | GLOBAL | GLOBAL | ORGANIZATION | DENY | ASSISTED | SELF | SELF | Support agent requires user ticket correlation. |
| **sessions** | `revoke` | GLOBAL | GLOBAL | ORGANIZATION | DENY | ASSISTED | SELF | SELF | Terminate session tokens. |
| **mfa** | `reset` | GLOBAL | GLOBAL | ORGANIZATION | DENY | ASSISTED | DENY | DENY | Security recovery protocol for lost MFA devices. |

---

## 3. Student Management & Academic Records Permissions

| Resource | Action | SUPER_ADMIN | PLATFORM_ADMIN | ACADEMIC_ADMIN | TEACHER | ASST_TEACHER | STUDENT | GUARDIAN | Conditions / Business Logic |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **students** | `view` | GLOBAL | GLOBAL | ORGANIZATION | ASSIGNED | ASSIGNED | SELF | LINKED | Guardian can only view officially verified ward(s). |
| **students** | `create` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | DENY | Provisioning of official student profile & student code. |
| **students** | `enroll` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | DENY | Assign student to grade level, track, and school cohort. |
| **students** | `update` | GLOBAL | GLOBAL | ORGANIZATION | ASSIGNED | DENY | DENY | DENY | Academic remarks, track assignment modifications. |
| **students** | `export` | GLOBAL | GLOBAL | ORGANIZATION | ASSIGNED | DENY | SELF | LINKED | Export official performance transcript. |
| **students** | `archive` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | DENY | Graduation or official transfer archive. |

---

## 4. Assessment, Question Bank & Grading Permissions

| Resource | Action | CONTENT_MGR | QB_MANAGER | EXAM_MANAGER | REVIEWER | TEACHER | STUDENT | Conditions / Business Logic |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **questions** | `view` | GLOBAL | GLOBAL | GLOBAL | GLOBAL | GLOBAL | CONSUME | Students cannot view answer keys, rubrics, or drafts. |
| **questions** | `create` | GLOBAL | GLOBAL | DENY | DENY | PROPOSE | DENY | Teacher submissions go to draft/review queue. |
| **questions** | `validate`| DENY | GLOBAL | DENY | GLOBAL | DENY | DENY | Blind pedagogical review & psychometric sign-off. |
| **questions** | `retire` | DENY | GLOBAL | DENY | DENY | DENY | DENY | Deprecate flawed or outdated questions. |
| **exams** | `create` | DENY | DENY | GLOBAL | DENY | PROPOSE | DENY | Exam paper blueprint assembly. |
| **exams** | `publish` | DENY | DENY | GLOBAL | DENY | DENY | DENY | Make official exam accessible to cohorts. |
| **exams** | `take` | DENY | DENY | DENY | DENY | PREVIEW | ASSIGNED | Official timed exam execution. |
| **grading** | `evaluate` | DENY | DENY | GLOBAL | DENY | ASSIGNED | DENY | Applied rubric grading for JRE essays & T-accounts. |
| **mastery** | `calculate`| DENY | DENY | DENY | DENY | TRIGGER | SELF | Run Bayesian Knowledge Tracing calculation. |

---

## 5. Audit, Security & Analytics Permissions

| Resource | Action | SUPER_ADMIN | PLATFORM_ADMIN | ACADEMIC_ADMIN | ANALYST | TEACHER | STUDENT | Conditions / Business Logic |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **audit_logs** | `view` | GLOBAL | GLOBAL | ORGANIZATION | DENY | DENY | DENY | Immutable audit log examination. |
| **security_events**| `view` | GLOBAL | GLOBAL | DENY | DENY | DENY | DENY | Telemetry: brute force, token reuse, privilege probes. |
| **analytics** | `platform` | GLOBAL | GLOBAL | GLOBAL | GLOBAL | DENY | DENY | National pass rates, item difficulty calibration. |
| **analytics** | `school` | GLOBAL | GLOBAL | ORGANIZATION | ORGANIZATION| DENY | DENY | School comparative performance. |
| **analytics** | `class` | GLOBAL | GLOBAL | ORGANIZATION | ASSIGNED | ASSIGNED| DENY | Class cohort mastery distribution. |
| **analytics** | `student` | GLOBAL | GLOBAL | ORGANIZATION | ASSIGNED | ASSIGNED| SELF | Individual learning path and weak concepts. |

---

## 6. Denial Precedence & Invariants

1. **Explicit Denial Precedence:**  
   If an actor holds multiple roles (e.g., `TEACHER` and `GUARDIAN`), a permission granted in one role applies within its specific scope. An explicit restriction on a resource in a lower role does not override an administrative grant in a higher role, provided the request context matches the higher scope.
2. **Contextual Isolation:**  
   A `TEACHER` acting in a personal capacity as a `GUARDIAN` cannot view other teachers' grading remarks unless they are the assigned teacher for that specific course.
3. **Immutability of Audit Trails:**  
   No role—including `SUPER_ADMIN`—has `audit.delete` or `audit.update` permission. Audit logs are strictly append-only.
