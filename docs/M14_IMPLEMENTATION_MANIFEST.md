# M14 Implementation Manifest

## Added
- `src/server/modules/teacherStudentManagement.ts`
- `src/pages/TeacherStudentManagementPage.tsx`
- `src/server/__tests__/teacherStudentManagement.test.ts`
- `docs/M14_TEACHER_STUDENT_MANAGEMENT_DEEPENING.md`

## Updated
- `server.ts` — M14 API routes
- `src/app/AppRoutes.tsx` — `/admin/academic-management`
- `src/server/db/schema.ts` — canonical user-role union expanded for assistant teacher and guardian

## Runtime gate
M14 static integration completed. Runtime lint/test/build remain blocked by the environment's incomplete dependency installation; this is not marked as PASS.
