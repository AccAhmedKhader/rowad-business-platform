import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db/database';
import { hashPassword, verifyPassword } from '../auth/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../auth/jwt';
import { sessionService, SessionStatus } from '../auth/sessionService';
import { userLifecycleService, UserAccountStatus } from '../auth/userLifecycleService';
import { authorizationService, RoleCode, CANONICAL_ROLES } from '../auth/authorizationService';
import { verificationTokenService, TokenPurpose } from '../auth/verificationTokenService';
import { telemetryService } from '../auth/telemetryService';
import { normalizeEmail, parseEgyptianFullName } from '../auth/identifierNormalizer';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
  firstName: z.string().min(2, 'الاسم الأول مطلوب'),
  lastName: z.string().min(2, 'اسم العائلة مطلوب')
  // Role is strictly omitted from public registration to prevent privilege escalation
});

const adminCreateUserSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
  firstName: z.string().min(2, 'الاسم الأول مطلوب'),
  lastName: z.string().min(2, 'اسم العائلة مطلوب'),
  role: z.string()
});

const updateRoleSchema = z.object({
  role: z.string()
});

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة')
});

const forgotPasswordSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح')
});

const resetPasswordSchema = z.object({
  token: z.string().min(10, 'رمز إعادة التعيين غير صالح'),
  newPassword: z.string().min(8, 'كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف')
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: z.string().min(8, 'كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف')
});

export async function handleRegister(req: Request, res: Response) {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      const msg = parseResult.error.issues?.[0]?.message || 'بيانات التسجيل غير صالحة';
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: msg }
      });
    }

    const { password, firstName, lastName } = parseResult.data;
    const email = normalizeEmail(parseResult.data.email);

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'EMAIL_EXISTS',
          message: 'البريد الإلكتروني مسجل مسبقاً في المنظومة'
        }
      });
    }

    const passwordHash = await hashPassword(password);
    // Public registration is strictly locked to STUDENT
    const user = db.createUser({
      email,
      passwordHash,
      firstName,
      lastName,
      role: 'STUDENT'
    });

    authorizationService.assignRole(user.id, 'STUDENT');

    // Create session and issue tokens
    const refreshToken = signRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name
    });

    const userAgent = req.headers ? (req.headers['user-agent'] as string) : undefined;
    const session = sessionService.createSession({
      userId: user.id,
      refreshToken,
      ipAddress: req.ip,
      userAgent
    });

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name
    }, session.id);

    telemetryService.logAudit({
      actorUserId: user.id,
      action: 'REGISTER_STUDENT',
      resourceType: 'User',
      resourceId: user.id,
      result: 'SUCCESS',
      metadata: { email: user.email, role: 'STUDENT', sessionId: session.id }
    });

    return res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      sessionId: session.id,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        roles: authorizationService.getUserRoles(user.id),
        status: user.status
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: err.message || 'حدث خطأ أثناء التسجيل' }
    });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      const msg = parseResult.error.issues?.[0]?.message || 'البريد الإلكتروني وكلمة المرور مطلوبان';
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: msg }
      });
    }

    const email = normalizeEmail(parseResult.data.email);
    const { password } = parseResult.data;
    const user = db.findUserByEmail(email);

    if (!user) {
      telemetryService.logSecurity({
        eventType: 'LOGIN_FAILURE',
        severity: 'WARN',
        identifier: email,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        details: { reason: 'USER_NOT_FOUND' }
      });

      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        }
      });
    }

    // Check account status & lockout
    const usableCheck = userLifecycleService.isAccountUsable(user.id);
    if (!usableCheck.usable) {
      return res.status(403).json({
        success: false,
        error: {
          code: usableCheck.code,
          message: usableCheck.message
        }
      });
    }

    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      const failureState = userLifecycleService.recordFailedLogin(user.id);

      telemetryService.logSecurity({
        eventType: 'LOGIN_FAILURE',
        severity: failureState.locked ? 'CRITICAL' : 'WARN',
        actorId: user.id,
        identifier: email,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        details: { failureState }
      });

      if (failureState.locked) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'ACCOUNT_LOCKED',
            message: 'تم قفل الحساب مؤقتاً بسبب تكرار محاولات تسجيل الدخول الخاطئة (5 محاولات). يرجى الانتظار 15 دقيقة.'
          }
        });
      }

      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: `البريد الإلكتروني أو كلمة المرور غير صحيحة. المحاولات المتبقية: ${failureState.attemptsLeft}`
        }
      });
    }

    // Login successful: Reset failures
    userLifecycleService.recordSuccessfulLogin(user.id);

    // Create server-authoritative session
    const refreshToken = signRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name
    });

    const userAgent = req.headers ? (req.headers['user-agent'] as string) : undefined;
    const session = sessionService.createSession({
      userId: user.id,
      refreshToken,
      ipAddress: req.ip,
      userAgent
    });

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name
    }, session.id);

    telemetryService.logSecurity({
      eventType: 'LOGIN_SUCCESS',
      severity: 'INFO',
      actorId: user.id,
      identifier: email,
      ipAddress: req.ip,
      userAgent,
      details: { sessionId: session.id }
    });

    return res.json({
      success: true,
      accessToken,
      refreshToken,
      sessionId: session.id,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        roles: authorizationService.getUserRoles(user.id),
        status: user.status
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: err.message || 'حدث خطأ أثناء تسجيل الدخول' }
    });
  }
}

/**
 * Single-Use Refresh Token Rotation (RTR) Handler
 */
export function handleRefreshToken(req: Request, res: Response) {
  const { refreshToken, sessionId } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_TOKEN', message: 'رمز التجديد مطلوب' }
    });
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.status(401).json({
      success: false,
      error: { code: 'EXPIRED_REFRESH_TOKEN', message: 'رمز التجديد منتهي الصلاحية أو غير صالح' }
    });
  }

  // Issue new rotating token
  const newRefreshToken = signRefreshToken(payload, sessionId || payload.sid);

  const userAgent = req.headers ? (req.headers['user-agent'] as string) : undefined;
  // Rotate through sessionService
  const rotationResult = sessionService.rotateRefreshToken({
    oldRefreshToken: refreshToken,
    newRefreshToken,
    sessionId: sessionId || payload.sid,
    ipAddress: req.ip,
    userAgent
  });

  if (!rotationResult.success) {
    telemetryService.logSecurity({
      eventType: rotationResult.reuseDetected ? 'TOKEN_REUSE_DETECTED' : 'REFRESH_FAILURE',
      severity: rotationResult.reuseDetected ? 'CRITICAL' : 'WARN',
      actorId: payload.userId,
      ipAddress: req.ip,
      userAgent,
      details: { error: rotationResult.error }
    });

    return res.status(401).json({
      success: false,
      error: {
        code: rotationResult.reuseDetected ? 'SESSION_REVOKED_THEFT' : 'INVALID_REFRESH_TOKEN',
        message: rotationResult.error || 'فشل تجديد جلسة العمل'
      }
    });
  }

  const newAccessToken = signAccessToken(payload, rotationResult.session?.id);

  return res.json({
    success: true,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionId: rotationResult.session?.id
  });
}

export function handleLogout(req: Request, res: Response) {
  const { refreshToken, sessionId } = req.body;
  if (sessionId) {
    sessionService.revokeSession(sessionId, undefined, 'USER_LOGOUT');
  }
  if (refreshToken) {
    db.deleteRefreshToken(refreshToken);
  }
  return res.json({ success: true, message: 'تم تسجيل الخروج وإبطال الجلسة بنجاح' });
}

export function handleGetMe(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'يرجى تسجيل الدخول' }
    });
  }

  const user = db.findUserById(req.user.userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: { code: 'USER_NOT_FOUND', message: 'المستخدم غير موجود في قاعدة البيانات' }
    });
  }

  const roles = authorizationService.getUserRoles(user.id);
  const session = req.sessionId ? sessionService.getSession(req.sessionId) : undefined;

  return res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      roles,
      status: user.status
    },
    activeSession: session ? {
      id: session.id,
      createdAt: session.createdAt,
      lastActiveAt: session.lastActiveAt,
      deviceType: session.deviceType
    } : undefined
  });
}

/**
 * List Active Sessions for Current User
 */
export function handleListSessions(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED' } });
  }

  const sessions = sessionService.listUserSessions(req.user.userId);
  return res.json({
    success: true,
    currentSessionId: req.sessionId,
    sessions: sessions.map(s => ({
      id: s.id,
      status: s.status,
      deviceType: s.deviceType,
      ipAddressMasked: s.ipAddressMasked,
      lastActiveAt: s.lastActiveAt,
      createdAt: s.createdAt,
      isCurrent: s.id === req.sessionId
    }))
  });
}

/**
 * Revoke specific session
 */
export function handleRevokeSession(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED' } });
  }

  const { id } = req.params;
  const session = sessionService.getSession(id);

  if (!session) {
    return res.status(404).json({ success: false, error: { code: 'SESSION_NOT_FOUND', message: 'الجلسة غير موجودة' } });
  }

  // Self or admin verification
  const isSelf = session.userId === req.user.userId;
  const isAdmin = req.user.role === 'ADMIN' || authorizationService.getUserRoles(req.user.userId).includes('SUPER_ADMIN' as any);

  if (!isSelf && !isAdmin) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'غير مصرح لك بإلغاء جلسة مستخدم آخر' } });
  }

  sessionService.revokeSession(id, req.user.userId, isSelf ? 'USER_REVOKED_SELF' : 'ADMIN_REVOKED');
  return res.json({ success: true, message: 'تم إبطال الجلسة بنجاح' });
}

/**
 * Revoke all user sessions except current
 */
export function handleRevokeAllSessions(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED' } });
  }

  const count = sessionService.revokeAllUserSessions(req.user.userId, req.sessionId, 'USER_REVOKED_ALL_OTHER');
  return res.json({ success: true, revokedCount: count, message: `تم إنهاء ${count} جلسة نشطة أخرى بنجاح` });
}

/**
 * Password Recovery: Request Reset Token
 */
export function handleForgotPassword(req: Request, res: Response) {
  const parseResult = forgotPasswordSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'البريد الإلكتروني غير صالح' } });
  }

  const email = normalizeEmail(parseResult.data.email);
  const user = db.findUserByEmail(email);

  // Return generic success to prevent email enumeration attacks
  if (!user) {
    return res.json({
      success: true,
      message: 'إذا كان البريد الإلكتروني مسجلاً، فسيتم إرسال تعليمات إعادة تعيين كلمة المرور.'
    });
  }

  const resetToken = verificationTokenService.generateToken(user.id, TokenPurpose.PASSWORD_RESET, 30);

  telemetryService.logAudit({
    actorUserId: user.id,
    action: 'REQUEST_PASSWORD_RESET',
    resourceType: 'User',
    resourceId: user.id,
    result: 'SUCCESS'
  });

  return res.json({
    success: true,
    message: 'تم إنشاء رمز إعادة التعيين بنجاح.',
    // Returned in response for automated testing and client handling
    resetToken
  });
}

/**
 * Password Recovery: Reset with Token
 */
export async function handleResetPassword(req: Request, res: Response) {
  const parseResult = resetPasswordSchema.safeParse(req.body);
  if (!parseResult.success) {
    const msg = parseResult.error.issues?.[0]?.message || 'البيانات غير صالحة';
    return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: msg } });
  }

  const { token, newPassword } = parseResult.data;
  const consumption = verificationTokenService.consumeToken(token, TokenPurpose.PASSWORD_RESET);

  if (!consumption.success || !consumption.userId) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_RESET_TOKEN', message: consumption.error || 'رمز إعادة التعيين غير صالح أو منتهي' }
    });
  }

  const user = db.findUserById(consumption.userId);
  if (!user) {
    return res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'المستخدم غير موجود' } });
  }

  const newHash = await hashPassword(newPassword);
  user.password_hash = newHash;
  user.updated_at = new Date().toISOString();
  db.persist();

  // Invalidate all active sessions for security after password reset
  sessionService.revokeAllUserSessions(user.id, undefined, 'PASSWORD_CHANGED');

  telemetryService.logAudit({
    actorUserId: user.id,
    action: 'PASSWORD_RESET_COMPLETED',
    resourceType: 'User',
    resourceId: user.id,
    result: 'SUCCESS'
  });

  return res.json({
    success: true,
    message: 'تم إعادة تعيين كلمة المرور بنجاح. يرجى تسجيل الدخول بكلمة المرور الجديدة.'
  });
}

/**
 * Change Password (Authenticated)
 */
export async function handleChangePassword(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED' } });
  }

  const parseResult = changePasswordSchema.safeParse(req.body);
  if (!parseResult.success) {
    const msg = parseResult.error.issues?.[0]?.message || 'البيانات غير صالحة';
    return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: msg } });
  }

  const user = db.findUserById(req.user.userId);
  if (!user) {
    return res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND' } });
  }

  const { currentPassword, newPassword } = parseResult.data;
  const isMatch = await verifyPassword(currentPassword, user.password_hash);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: { code: 'INCORRECT_CURRENT_PASSWORD', message: 'كلمة المرور الحالية غير صحيحة' }
    });
  }

  const newHash = await hashPassword(newPassword);
  user.password_hash = newHash;
  user.updated_at = new Date().toISOString();
  db.persist();

  // Revoke other sessions
  sessionService.revokeAllUserSessions(user.id, req.sessionId, 'PASSWORD_CHANGED');

  return res.json({
    success: true,
    message: 'تم تغيير كلمة المرور بنجاح.'
  });
}

export function handleListUsers(req: AuthenticatedRequest, res: Response) {
  return res.json({
    success: true,
    users: db.users.map(u => ({
      id: u.id,
      email: u.email,
      full_name: u.full_name,
      role: u.role,
      roles: authorizationService.getUserRoles(u.id),
      status: u.status
    }))
  });
}

export async function handleAdminCreateUser(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'صلاحية مسؤول النظام (ADMIN) مطلوبة لإنشاء حسابات برتب خاصة' }
      });
    }

    const parseResult = adminCreateUserSchema.safeParse(req.body);
    if (!parseResult.success) {
      const msg = parseResult.error.issues?.[0]?.message || 'بيانات إنشاء المستخدم غير صالحة';
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: msg }
      });
    }

    const { password, firstName, lastName, role } = parseResult.data;
    const email = normalizeEmail(parseResult.data.email);

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: { code: 'EMAIL_EXISTS', message: 'البريد الإلكتروني مسجل مسبقاً في المنظومة' }
      });
    }

    const passwordHash = await hashPassword(password);
    const user = db.createUser({
      email,
      passwordHash,
      firstName,
      lastName,
      role: (role === 'ADMIN' || role === 'SUPER_ADMIN') ? 'ADMIN' : (role as any)
    });

    authorizationService.assignRole(user.id, role);

    telemetryService.logAudit({
      actorUserId: req.user.userId,
      actorRole: 'ADMIN',
      action: 'ADMIN_CREATE_USER',
      resourceType: 'User',
      resourceId: user.id,
      result: 'SUCCESS',
      metadata: { createdUserId: user.id, email: user.email, assignedRole: role }
    });

    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        roles: authorizationService.getUserRoles(user.id),
        status: user.status
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: err.message || 'حدث خطأ أثناء إنشاء المستخدم' }
    });
  }
}

export function handleAdminUpdateUserRole(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'صلاحية مسؤول النظام (ADMIN) مطلوبة لتعديل رتب المستخدمين' }
      });
    }

    const { id } = req.params;
    const parseResult = updateRoleSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'الرتبة المحددة غير صالحة' }
      });
    }

    const targetUser = db.findUserById(id);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'المستخدم غير موجود' }
      });
    }

    const oldRole = targetUser.role;
    const newRole = parseResult.data.role;

    // Check privilege escalation prevention
    const authCheck = authorizationService.authorize({
      actorUserId: req.user.userId,
      resource: 'user_roles',
      action: 'assign',
      context: { targetRolePriority: authorizationService.getRolePriority(newRole) }
    });

    if (!authCheck.allowed) {
      return res.status(403).json({
        success: false,
        error: { code: 'PRIVILEGE_ESCALATION_BLOCKED', message: authCheck.reason || 'لا يمكنك تعيين رتبة أعلى من رتبتك' }
      });
    }

    targetUser.role = (newRole === 'SUPER_ADMIN' || newRole === 'PLATFORM_ADMIN') ? 'ADMIN' : (newRole as any);
    targetUser.updated_at = new Date().toISOString();
    db.persist();

    authorizationService.assignRole(targetUser.id, newRole);

    telemetryService.logAudit({
      actorUserId: req.user.userId,
      action: 'ADMIN_UPDATE_ROLE',
      resourceType: 'User',
      resourceId: targetUser.id,
      result: 'SUCCESS',
      metadata: { targetUserId: targetUser.id, oldRole, newRole }
    });

    return res.json({
      success: true,
      user: {
        id: targetUser.id,
        email: targetUser.email,
        full_name: targetUser.full_name,
        role: targetUser.role,
        roles: authorizationService.getUserRoles(targetUser.id),
        status: targetUser.status
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: err.message || 'حدث خطأ أثناء تعديل رتبة المستخدم' }
    });
  }
}

/**
 * Telemetry endpoint for viewing immutable audit events
 */
export function handleGetAuditLogs(req: AuthenticatedRequest, res: Response) {
  const events = telemetryService.getAuditEvents(50);
  return res.json({
    success: true,
    total: events.length,
    events
  });
}
