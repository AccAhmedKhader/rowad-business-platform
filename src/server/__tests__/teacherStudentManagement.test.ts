import { describe,expect,it } from 'vitest';
import { teacherStudentState } from '../modules/teacherStudentManagement';
describe('M14 teacher and student management',()=>{
 it('has normalized academic management collections',()=>{expect(Array.isArray(teacherStudentState.organizations)).toBe(true);expect(Array.isArray(teacherStudentState.classes)).toBe(true);expect(Array.isArray(teacherStudentState.enrollments)).toBe(true);expect(Array.isArray(teacherStudentState.teacherAssignments)).toBe(true);expect(Array.isArray(teacherStudentState.guardianLinks)).toBe(true);});
 it('keeps relationship collections distinct',()=>{const ids=[...teacherStudentState.enrollments.map(x=>x.id),...teacherStudentState.teacherAssignments.map(x=>x.id),...teacherStudentState.guardianLinks.map(x=>x.id)];expect(new Set(ids).size).toBe(ids.length);});
});
