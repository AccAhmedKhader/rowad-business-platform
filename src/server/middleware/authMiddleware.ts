import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../auth/jwt';
import { sessionService } from '../auth/sessionService';
import { userLifecycleService } from '../auth/userLifecycleService';
import { authorizationService, RoleCode } from '../auth/authorizationService';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
  sessionId?: string;
}

/**
 * Enterprise Authentication Middleware:
 * 1. Cryptographically verifies JWT access token.
 * 2. Checks server-authoritative session liveness (if sid present).
 * 3. Checks real-time user lifecycle status (blocks locked, suspended, inactive accounts).
 */
export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'جلسة تسجيل الدخول غير صالحة أو منتهية. يرجى تسجيل الدخول.'
      }
    });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'رمز التحقق غير صالح أو منتهي الصلاحية.'
      }
    });
  }

  // Session liveness check if sid present
  if (payload.sid) {
    const isLive = sessionService.isSessionActive(payload.sid);
    if (!isLive) {
      // If session was actively revoked or expired
      const session = sessionService.getSession(payload.sid);
      if (session && session.status !== 'ACTIVE') {
        return res.status(401).json({
          success: false,
          error: {
            code: 'SESSION_REVOKED',
            message: `تم إنهاء جلسة العمل هذه (${session.revokeReason || session.status}). يرجى تسجيل الدخول مجدداً.`
          }
        });
      }
    }
    req.sessionId = payload.sid;
  }

  // Account lifecycle check
  const accountCheck = userLifecycleService.isAccountUsable(payload.userId);
  if (!accountCheck.usable) {
    return res.status(403).json({
      success: false,
      error: {
        code: accountCheck.code || 'ACCOUNT_UNAVAILABLE',
        message: accountCheck.message || 'لا يمكن استخدام الحساب في الوقت الحالي.'
      }
    });
  }

  req.user = payload;
  return next();
}

/**
 * Backward-compatible role enforcement supporting both legacy and U1 canonical roles.
 */
export function requireRole(...allowedRoles: Array<'STUDENT' | 'TEACHER' | 'CONTENT_MANAGER' | 'ADMIN' | RoleCode>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'المصادقة مطلوبة.' }
      });
    }

    const userRoles = authorizationService.getUserRoles(req.user.userId);
    // Include the token role for backwards compatibility
    if (req.user.role && !userRoles.includes(req.user.role as any)) {
      userRoles.push(req.user.role as any);
    }

    const hasRole = allowedRoles.some(allowed => {
      if (allowed === 'ADMIN' && (userRoles.includes('ADMIN' as any) || userRoles.includes('PLATFORM_ADMIN') || userRoles.includes('SUPER_ADMIN'))) {
        return true;
      }
      return userRoles.includes(allowed as any);
    });

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'ليس لديك الصلاحية الكافية للوصول إلى هذا المورد الأكاديمي.'
        }
      });
    }

    return next();
  };
}

/**
 * Fine-Grained PBAC Middleware: Enforces permissions via authorizationService.authorize()
 */
export function requirePermission(resource: string, action: string, getResourceId?: (req: AuthenticatedRequest) => string | undefined) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'المصادقة مطلوبة.' }
      });
    }

    const targetResourceId = getResourceId ? getResourceId(req) : undefined;
    const authResult = authorizationService.authorize({
      actorUserId: req.user.userId,
      resource,
      action,
      targetResourceId
    });

    if (!authResult.allowed) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN_PERMISSION',
          message: authResult.reason || 'تم رفض الوصول بواسطة محرك الصلاحيات (Default Deny).'
        }
      });
    }

    return next();
  };
}

export function requireOwnershipOrStaff(targetUserIdExtractor: (req: AuthenticatedRequest) => string | undefined) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'المصادقة مطلوبة.' }
      });
    }

    const targetUserId = targetUserIdExtractor(req);
    const userRoles = authorizationService.getUserRoles(req.user.userId);
    const isStaff = userRoles.some(r => ['SUPER_ADMIN', 'PLATFORM_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER', 'CONTENT_MANAGER', 'ADMIN' as any].includes(r));

    if (isStaff) {
      return next();
    }

    // Students can ONLY access their own records
    if (!targetUserId || targetUserId === req.user.userId || targetUserId === 'self') {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_OWNERSHIP',
        message: 'غير مصرح لك بالاطلاع على بيانات طالب آخر.'
      }
    });
  };
}
