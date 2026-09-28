/**
 * Dynamic Database-Backed RBAC, PBAC & Contextual Scoping Engine
 * Phase U2 Implementation — Egyptian Baccalaureate Platform
 */

export type RoleCode =
  | 'SUPER_ADMIN'
  | 'PLATFORM_ADMIN'
  | 'ACADEMIC_ADMIN'
  | 'TEACHER'
  | 'ASSISTANT_TEACHER'
  | 'CONTENT_MANAGER'
  | 'QUESTION_BANK_MANAGER'
  | 'EXAM_MANAGER'
  | 'REVIEWER'
  | 'SUPPORT_AGENT'
  | 'ANALYST'
  | 'STUDENT'
  | 'GUARDIAN';

export type ScopeType = 'GLOBAL' | 'ORGANIZATION' | 'GROUP' | 'ASSIGNED' | 'SELF' | 'LINKED' | 'CONSUME' | 'PREVIEW' | 'PROPOSE' | 'TRIGGER' | 'DENY';

export interface RoleEntity {
  id: string;
  code: RoleCode;
  nameAr: string;
  nameEn: string;
  isSystemRole: boolean;
  priorityLevel: number; // Lower number = higher authority (1 = SUPER_ADMIN)
}

export interface PermissionEntity {
  id: string;
  code: string; // e.g. "users.view", "exams.publish"
  module: string;
  nameAr: string;
  nameEn: string;
}

export interface UserRoleAssignmentEntity {
  id: string;
  userId: string;
  roleCode: RoleCode;
  scopeType: 'GLOBAL' | 'ORGANIZATION' | 'GROUP' | 'ASSIGNED' | 'SELF';
  scopeId?: string; // organizationId, classId, etc.
}

export interface AuthorizeParams {
  actorUserId: string;
  action: string;             // e.g. "view", "create", "update", "assign", "take"
  resource: string;           // e.g. "users", "students", "questions", "exams", "audit_logs"
  targetResourceId?: string;  // e.g. target studentId, questionId
  targetOrganizationId?: string;
  context?: {
    assignedStudentIds?: string[];
    linkedWardStudentIds?: string[];
    isDraft?: boolean;
    hasCorrectAnswerRevealed?: boolean;
    targetRolePriority?: number;
  };
}

export interface AuthorizeResult {
  allowed: boolean;
  reason?: string;
  effectiveScope?: string;
}

// 1. Canonical 13 Seed Roles with Priority Levels
export const CANONICAL_ROLES: RoleEntity[] = [
  { id: 'role-super-admin', code: 'SUPER_ADMIN', nameAr: 'مدير النظام الأعلى', nameEn: 'Super Administrator', isSystemRole: true, priorityLevel: 1 },
  { id: 'role-platform-admin', code: 'PLATFORM_ADMIN', nameAr: 'مدير المنصة', nameEn: 'Platform Administrator', isSystemRole: true, priorityLevel: 2 },
  { id: 'role-academic-admin', code: 'ACADEMIC_ADMIN', nameAr: 'مدير أكاديمي / ناظر', nameEn: 'Academic Administrator', isSystemRole: true, priorityLevel: 3 },
  { id: 'role-content-mgr', code: 'CONTENT_MANAGER', nameAr: 'مدير المحتوى التعليمي', nameEn: 'Content Manager', isSystemRole: true, priorityLevel: 4 },
  { id: 'role-qb-mgr', code: 'QUESTION_BANK_MANAGER', nameAr: 'مدير بنك الأسئلة', nameEn: 'Question Bank Manager', isSystemRole: true, priorityLevel: 4 },
  { id: 'role-exam-mgr', code: 'EXAM_MANAGER', nameAr: 'مسؤول الامتحانات والتقييم', nameEn: 'Examination Manager', isSystemRole: true, priorityLevel: 4 },
  { id: 'role-reviewer', code: 'REVIEWER', nameAr: 'محكم ومراجع أكاديمي', nameEn: 'Pedagogical Reviewer', isSystemRole: true, priorityLevel: 5 },
  { id: 'role-teacher', code: 'TEACHER', nameAr: 'معلم معتمد', nameEn: 'Certified Teacher', isSystemRole: true, priorityLevel: 6 },
  { id: 'role-asst-teacher', code: 'ASSISTANT_TEACHER', nameAr: 'معلم مساعد', nameEn: 'Assistant Teacher', isSystemRole: true, priorityLevel: 7 },
  { id: 'role-support', code: 'SUPPORT_AGENT', nameAr: 'أخصائي دعم فني', nameEn: 'Support Agent', isSystemRole: true, priorityLevel: 8 },
  { id: 'role-analyst', code: 'ANALYST', nameAr: 'محلل بيانات وتقييم', nameEn: 'Psychometric Analyst', isSystemRole: true, priorityLevel: 8 },
  { id: 'role-student', code: 'STUDENT', nameAr: 'طالب بكالوريا', nameEn: 'Student', isSystemRole: true, priorityLevel: 9 },
  { id: 'role-guardian', code: 'GUARDIAN', nameAr: 'ولي أمر', nameEn: 'Guardian', isSystemRole: true, priorityLevel: 9 }
];

// 2. Canonical Permission Matrix Mapping (Resource -> Action -> Role -> Allowed Scope)
const PERMISSION_RULESET: Record<string, Record<string, Partial<Record<RoleCode, ScopeType>>>> = {
  users: {
    view: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION',
      TEACHER: 'ASSIGNED',
      SUPPORT_AGENT: 'GLOBAL',
      STUDENT: 'SELF',
      GUARDIAN: 'SELF'
    },
    create: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    },
    update: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION',
      STUDENT: 'SELF',
      TEACHER: 'SELF',
      SUPPORT_AGENT: 'SELF',
      GUARDIAN: 'SELF'
    },
    suspend: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    },
    archive: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL'
    }
  },
  roles: {
    view: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    },
    manage: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL'
    }
  },
  permissions: {
    manage: {
      SUPER_ADMIN: 'GLOBAL'
    }
  },
  user_roles: {
    assign: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    }
  },
  sessions: {
    view: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION',
      STUDENT: 'SELF',
      TEACHER: 'SELF'
    },
    revoke: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION',
      STUDENT: 'SELF',
      TEACHER: 'SELF'
    }
  },
  students: {
    view: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION',
      TEACHER: 'ASSIGNED',
      ASSISTANT_TEACHER: 'ASSIGNED',
      STUDENT: 'SELF',
      GUARDIAN: 'LINKED'
    },
    create: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    },
    update: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION',
      TEACHER: 'ASSIGNED'
    }
  },
  questions: {
    view: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      CONTENT_MANAGER: 'GLOBAL',
      QUESTION_BANK_MANAGER: 'GLOBAL',
      EXAM_MANAGER: 'GLOBAL',
      REVIEWER: 'GLOBAL',
      TEACHER: 'GLOBAL',
      STUDENT: 'CONSUME'
    },
    create: {
      SUPER_ADMIN: 'GLOBAL',
      CONTENT_MANAGER: 'GLOBAL',
      QUESTION_BANK_MANAGER: 'GLOBAL',
      TEACHER: 'PROPOSE'
    }
  },
  exams: {
    create: {
      SUPER_ADMIN: 'GLOBAL',
      EXAM_MANAGER: 'GLOBAL',
      TEACHER: 'PROPOSE'
    },
    publish: {
      SUPER_ADMIN: 'GLOBAL',
      EXAM_MANAGER: 'GLOBAL'
    },
    take: {
      STUDENT: 'ASSIGNED',
      TEACHER: 'PREVIEW'
    }
  },
  audit_logs: {
    view: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    }
  },
  security_events: {
    view: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL'
    }
  },
  analytics: {
    platform: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      CONTENT_MANAGER: 'GLOBAL',
      ANALYST: 'GLOBAL'
    },
    school: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    },
    teacher: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      TEACHER: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION'
    },
    content: {
      SUPER_ADMIN: 'GLOBAL',
      CONTENT_MANAGER: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL'
    },
    student: {
      SUPER_ADMIN: 'GLOBAL',
      PLATFORM_ADMIN: 'GLOBAL',
      ACADEMIC_ADMIN: 'ORGANIZATION',
      TEACHER: 'ASSIGNED',
      STUDENT: 'SELF'
    }
  }
};

class AuthorizationService {
  private userRoleAssignments: Map<string, UserRoleAssignmentEntity[]> = new Map();
  private userOrganizations: Map<string, string> = new Map(); // userId -> orgId

  constructor() {
    this.seedDefaultAssignments();
  }

  private seedDefaultAssignments() {
    // Default system users mapped to their role codes
    this.assignRole('usr-admin-1', 'ADMIN' as any);
    this.assignRole('usr-content-1', 'CONTENT_MANAGER');
    this.assignRole('usr-teacher-1', 'TEACHER');
    this.assignRole('usr-student-1', 'STUDENT');
  }

  public assignRole(
    userId: string,
    roleCode: RoleCode | string,
    scopeType: 'GLOBAL' | 'ORGANIZATION' | 'GROUP' | 'ASSIGNED' | 'SELF' = 'GLOBAL',
    scopeId?: string
  ) {
    const canonicalCode = (roleCode === 'ADMIN' ? 'PLATFORM_ADMIN' : roleCode) as RoleCode;
    const assignments = this.userRoleAssignments.get(userId) || [];
    // Prevent duplicate
    const exists = assignments.some(a => a.roleCode === canonicalCode && a.scopeType === scopeType && a.scopeId === scopeId);
    if (!exists) {
      assignments.push({
        id: `assign_${userId}_${canonicalCode}_${scopeType}`,
        userId,
        roleCode: canonicalCode,
        scopeType,
        scopeId
      });
      this.userRoleAssignments.set(userId, assignments);
    }
  }

  public removeRole(userId: string, roleCode: RoleCode | string): boolean {
    const canonicalCode = (roleCode === 'ADMIN' ? 'PLATFORM_ADMIN' : roleCode) as RoleCode;
    const assignments = this.userRoleAssignments.get(userId);
    if (!assignments) return false;
    const filtered = assignments.filter(a => a.roleCode !== canonicalCode);
    this.userRoleAssignments.set(userId, filtered);
    return filtered.length < assignments.length;
  }

  public getAllRoles(): RoleEntity[] {
    return CANONICAL_ROLES.map(role => ({ ...role }));
  }

  public getUserRoles(userId: string): RoleCode[] {
    const assignments = this.userRoleAssignments.get(userId);
    if (!assignments || assignments.length === 0) {
      // Default to STUDENT if none assigned
      return ['STUDENT'];
    }
    return assignments.map(a => a.roleCode);
  }

  public setUserOrganization(userId: string, organizationId: string) {
    this.userOrganizations.set(userId, organizationId);
  }

  /**
   * Central Declarative Authorization Function.
   * Default Deny: If no rule explicitly allows, returns { allowed: false }.
   */
  public authorize(params: AuthorizeParams): AuthorizeResult {
    const roles = this.getUserRoles(params.actorUserId);
    const actorOrg = this.userOrganizations.get(params.actorUserId);

    const resourceRules = PERMISSION_RULESET[params.resource];
    if (!resourceRules) {
      return { allowed: false, reason: `DEFAULT_DENY: Unknown resource '${params.resource}'` };
    }

    const actionRules = resourceRules[params.action];
    if (!actionRules) {
      return { allowed: false, reason: `DEFAULT_DENY: Action '${params.action}' not defined on resource '${params.resource}'` };
    }

    // Evaluate across actor's roles
    for (const role of roles) {
      const allowedScope = actionRules[role];
      if (!allowedScope || allowedScope === 'DENY') {
        continue;
      }

      // Check Privilege Escalation Protection on role assignment
      if (params.resource === 'user_roles' && params.action === 'assign') {
        const actorPriority = this.getRolePriority(role);
        const targetPriority = params.context?.targetRolePriority ?? 999;
        if (targetPriority <= actorPriority && role !== 'SUPER_ADMIN') {
          return {
            allowed: false,
            reason: 'CANNOT_ASSIGN_HIGHER_OR_EQUAL_PRIORITY_ROLE: غير مصرح لك بتعيين رتبة مساوية أو أعلى من رتبتك'
          };
        }
      }

      // 1. GLOBAL Scope: Unrestricted
      if (allowedScope === 'GLOBAL') {
        return { allowed: true, effectiveScope: 'GLOBAL' };
      }

      // 2. SELF Scope: Actor ID must match target resource ID
      if (allowedScope === 'SELF') {
        if (!params.targetResourceId || params.targetResourceId === params.actorUserId || params.targetResourceId === 'self') {
          return { allowed: true, effectiveScope: 'SELF' };
        }
        // If actor tries to view another user's records under SELF scope, block IDOR
        continue;
      }

      // 3. ORGANIZATION Scope: Actor org must match target org
      if (allowedScope === 'ORGANIZATION') {
        if (!params.targetOrganizationId || params.targetOrganizationId === actorOrg || !actorOrg) {
          return { allowed: true, effectiveScope: 'ORGANIZATION' };
        }
        continue;
      }

      // 4. ASSIGNED Scope: Teacher checking assigned student roster
      if (allowedScope === 'ASSIGNED') {
        if (!params.targetResourceId || params.context?.assignedStudentIds?.includes(params.targetResourceId)) {
          return { allowed: true, effectiveScope: 'ASSIGNED' };
        }
        continue;
      }

      // 5. LINKED Scope: Guardian checking linked ward
      if (allowedScope === 'LINKED') {
        if (params.targetResourceId && params.context?.linkedWardStudentIds?.includes(params.targetResourceId)) {
          return { allowed: true, effectiveScope: 'LINKED' };
        }
        continue;
      }

      // 6. CONSUME Scope: Question viewing for students (cannot view correct answers)
      if (allowedScope === 'CONSUME') {
        if (params.context?.hasCorrectAnswerRevealed) {
          return { allowed: false, reason: 'STUDENT_CANNOT_VIEW_UNSANITIZED_QUESTIONS' };
        }
        return { allowed: true, effectiveScope: 'CONSUME' };
      }

      // 7. PREVIEW / PROPOSE
      if (allowedScope === 'PREVIEW' || allowedScope === 'PROPOSE') {
        return { allowed: true, effectiveScope: allowedScope };
      }
    }

    return {
      allowed: false,
      reason: 'DEFAULT_DENY: الصلاحية المطلوبة غير ممنوحة للمستخدم في هذا السياق'
    };
  }

  public getRolePriority(roleCode: RoleCode | string): number {
    const r = CANONICAL_ROLES.find(item => item.code === roleCode);
    return r ? r.priorityLevel : 99;
  }
}

export const authorizationService = new AuthorizationService();
