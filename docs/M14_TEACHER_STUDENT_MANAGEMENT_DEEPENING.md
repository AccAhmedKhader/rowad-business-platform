# M14 — Teacher & Student Management Deepening

## Scope
- Organizations / schools foundation.
- Classes and academic groups.
- Student enrollment with bulk enrollment endpoint.
- Teacher and assistant-teacher assignment.
- Guardian ↔ student relationship.
- Class roster retrieval.
- CSV preview/apply bulk import for students, teachers, assistant teachers, and guardians.
- Audit integration through existing telemetry for bulk enrollment.
- Existing M13 authentication/RBAC remains the authorization authority.

## New API surface
- GET `/api/admin/academic-management/summary`
- POST `/api/admin/academic-management/organizations`
- POST `/api/admin/academic-management/classes`
- POST `/api/admin/academic-management/classes/:classId/enrollments`
- POST `/api/admin/academic-management/classes/:classId/teachers`
- POST `/api/admin/academic-management/guardian-links`
- GET `/api/admin/academic-management/classes/:classId/roster`
- POST `/api/admin/academic-management/bulk-import`

## Data integrity
State is persisted atomically in `data/teacher_student_management.json`. IDs are namespaced by relationship type. Duplicate active enrollment/assignment/guardian links are rejected as existing relationships rather than duplicated.

## Runtime status
Static implementation completed. Full runtime verification remains subject to the project's dependency-installation environment and the M10 gate.
