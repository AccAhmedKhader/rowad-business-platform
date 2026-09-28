# Scoping & Boundary Matrix Specification

**Document Identifier:** EB-ARCH-SCOPE-MATRIX-01  
**Version:** 1.0.0  
**Phase:** U1 — Identity & User Foundation Design  
**Classification:** Target Architectural Specification  
**Status:** DRAFT / APPROVED FOUNDATION

---

## 1. Architectural Scoping Principles

The Egyptian Baccalaureate platform operates as a hierarchical, multi-institution educational system. Authorization is not merely binary (Allowed vs. Denied); it is **contextually bounded by scope**.

```text
┌──────────────────────────────────────────────────────────────┐
│                    GLOBAL SCOPE                              │
│  Applies across all educational directorates, schools,       │
│  and student cohorts in the Republic of Egypt.               │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                 ORGANIZATION SCOPE                           │
│  Bounded to a single Educational Directorate or High School  │
│  (e.g., Giza STEM Baccalaureate School).                     │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    GROUP / COHORT SCOPE                      │
│  Bounded to a specific Class Group, Grade Section,           │
│  or Academic Study Cohort (e.g., Grade 10 - Section A).      │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                   ASSIGNED SCOPE                             │
│  Explicit teacher-to-student pedagogical relationship        │
│  established via active course enrollment.                   │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                     SELF SCOPE                               │
│  Strictly isolated to records owned by the actor itself.     │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Scope Hierarchy & Evaluation Semantics

| Scope Code | Priority | Definition | Typical Roles | Evaluation Rule |
| :--- | :---: | :--- | :--- | :--- |
| **`GLOBAL`** | 5 | Unrestricted national access across all entities. | `SUPER_ADMIN`, `PLATFORM_ADMIN`, `CONTENT_MANAGER`, `QB_MANAGER` | `true` (Always passes scope check) |
| **`ORGANIZATION`** | 4 | Access restricted to the school/directorate of the actor. | `ACADEMIC_ADMIN`, School Principal, School Counselor | `target.organizationId === actorAssignment.scopeId` |
| **`GROUP`** | 3 | Access restricted to designated class group / study hall. | `ASSISTANT_TEACHER`, Exam Proctor | `target.groupId === actorAssignment.scopeId` |
| **`ASSIGNED`** | 2 | Access restricted to students officially enrolled in teacher's classes. | `TEACHER`, Academic Mentor | `isStudentEnrolledInTeacherCourse(target.studentId, actor.userId)` |
| **`SELF`** | 1 | Access restricted to the actor's own personal account or records. | `STUDENT`, `GUARDIAN` (for linked ward) | `target.userId === actor.userId` OR `isLinkedWard(actor.userId, target.studentId)` |

---

## 3. Resource Scope Matrix

| Domain Resource | Operation | Allowed Scope(s) | Boundary Validation Logic |
| :--- | :--- | :--- | :--- |
| **User Profile** | `users.view` | `SELF`, `ASSIGNED`, `ORGANIZATION`, `GLOBAL` | If actor is Student: must match `userId`. If Teacher: must be in teacher's assigned roster. If Admin: must match school tenant or be global. |
| **Question Attempt** | `attempts.view` | `SELF`, `ASSIGNED`, `ORGANIZATION`, `GLOBAL` | Student can only view their own attempts. Teacher views attempts of assigned students for homework/drill analysis. |
| **Mastery Snapshot**| `mastery.view` | `SELF`, `ASSIGNED`, `ORGANIZATION`, `GLOBAL` | Student views personal mastery. Teacher views class mastery distribution. |
| **Exam Submission** | `exams.grade` | `ASSIGNED`, `ORGANIZATION`, `GLOBAL` | Teacher can only grade subjective JRE essays and T-accounts for students assigned to their class roster. |
| **Curriculum Unit** | `curriculum.view` | `GLOBAL` | Official curriculum is national and universally viewable. |
| **Question Draft** | `questions.edit` | `GLOBAL` (Content Team) / `SELF` (Teacher Drafts) | Official items edited only by global managers; teacher custom items isolated until approved. |
| **Audit Logs** | `audit.view` | `ORGANIZATION`, `GLOBAL` | School Admin can only view logs where `tenantId === schoolId`. Platform Admin views national logs. |

---

## 4. Cross-Scope Denial Matrix (Edge Cases)

1. **Cross-School Teacher Access Denial:**  
   A Teacher from *School A* attempting to query `/api/progress/student?studentId=XYZ` where Student *XYZ* is enrolled in *School B* is rejected with:  
   `403 FORBIDDEN - RESOURCE_OUTSIDE_ASSIGNED_SCOPE`.
2. **Student Cross-Student Access Denial:**  
   A Student attempting to query attempts or profile of another student is rejected with:  
   `403 FORBIDDEN - OWNERSHIP_REQUIRED`.
3. **Teacher Privilege Escalation to Admin:**  
   A Teacher attempting to call `/api/admin/users` is rejected with:  
   `403 FORBIDDEN - INSUFFICIENT_SCOPE_AND_ROLE`.
4. **Guardian Cross-Child Denial:**  
   A Guardian can only access records for verified students where an active, approved `GuardianStudentRelationship` exists in the database.
