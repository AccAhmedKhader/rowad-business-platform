import crypto from 'crypto';
import { db } from '../db/database';
import { hashToken, TokenPayload } from './jwt';

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  SUSPICIOUS_REUSE = 'SUSPICIOUS_REUSE'
}

export interface UserSessionEntity {
  id: string; // sid
  userId: string;
  identityId: string;
  status: SessionStatus;
  currentRefreshTokenHash: string;
  tokenFamilyId: string;
  rotationCounter: number;
  ipAddressMasked?: string;
  userAgent?: string;
  deviceType?: string;
  clientName?: string;
  createdAt: string;
  lastActiveAt: string;
  expiresAt: string;
  idleExpiresAt: string;
  revokedAt?: string;
  revokedByUserId?: string;
  revokeReason?: string;
}

export interface RefreshTokenFamilyEntity {
  id: string;
  identityId: string;
  isCompromised: boolean;
  createdAt: string;
}

export interface ConsumedTokenRecord {
  tokenHash: string;
  sessionId: string;
  tokenFamilyId: string;
  consumedAt: string;
}

class SessionService {
  // In-memory runtime persistence for sessions & families (synchronized with database)
  private sessions: Map<string, UserSessionEntity> = new Map();
  private tokenFamilies: Map<string, RefreshTokenFamilyEntity> = new Map();
  private consumedTokens: Map<string, ConsumedTokenRecord> = new Map();

  constructor() {
    this.initDefaultSessions();
  }

  private initDefaultSessions() {
    // Seed default session for test accounts if existing
  }

  /**
   * Creates a new UserSession upon successful login or registration.
   */
  public createSession(params: {
    userId: string;
    identityId?: string;
    refreshToken: string;
    ipAddress?: string;
    userAgent?: string;
  }): UserSessionEntity {
    const sessionId = `sess_${crypto.randomUUID()}`;
    const tokenFamilyId = `fam_${crypto.randomUUID()}`;
    const identityId = params.identityId || `ident_${params.userId}`;
    const refreshTokenHash = hashToken(params.refreshToken);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const idleExpiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000);   // 2 hours idle

    const session: UserSessionEntity = {
      id: sessionId,
      userId: params.userId,
      identityId,
      status: SessionStatus.ACTIVE,
      currentRefreshTokenHash: refreshTokenHash,
      tokenFamilyId,
      rotationCounter: 0,
      ipAddressMasked: params.ipAddress ? this.maskIp(params.ipAddress) : undefined,
      userAgent: params.userAgent,
      deviceType: this.detectDeviceType(params.userAgent),
      clientName: params.userAgent?.slice(0, 50),
      createdAt: now.toISOString(),
      lastActiveAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      idleExpiresAt: idleExpiresAt.toISOString()
    };

    const family: RefreshTokenFamilyEntity = {
      id: tokenFamilyId,
      identityId,
      isCompromised: false,
      createdAt: now.toISOString()
    };

    this.sessions.set(sessionId, session);
    this.tokenFamilies.set(tokenFamilyId, family);

    // Also link in db for backward compatibility
    db.saveRefreshToken(params.userId, params.refreshToken);

    return session;
  }

  /**
   * Rotates a refresh token (Single-use RTR).
   * If a previously consumed token is presented, detects reuse anomaly and revokes the family.
   */
  public rotateRefreshToken(params: {
    oldRefreshToken: string;
    newRefreshToken: string;
    sessionId?: string;
    ipAddress?: string;
    userAgent?: string;
  }): {
    success: boolean;
    session?: UserSessionEntity;
    error?: string;
    reuseDetected?: boolean;
  } {
    const oldHash = hashToken(params.oldRefreshToken);

    // 1. Check if token was previously consumed (Theft Anomaly Detection)
    const consumed = this.consumedTokens.get(oldHash);
    if (consumed) {
      // REUSE DETECTED! Attacker is using a rotated token!
      this.handleTokenReuseAnomaly(consumed.tokenFamilyId, consumed.sessionId, params.ipAddress);
      return {
        success: false,
        reuseDetected: true,
        error: 'SESSION_REVOKED_THEFT: تم اكتشاف استخدام غير مصرح به لرمز تحديث سابق. تم إبطال الجلسة لحماية الحساب.'
      };
    }

    // 2. Find active session matching this refresh token hash
    let matchingSession: UserSessionEntity | undefined;
    if (params.sessionId) {
      const s = this.sessions.get(params.sessionId);
      if (s && s.currentRefreshTokenHash === oldHash) {
        matchingSession = s;
      }
    } else {
      for (const s of this.sessions.values()) {
        if (s.currentRefreshTokenHash === oldHash) {
          matchingSession = s;
          break;
        }
      }
    }

    if (!matchingSession) {
      return {
        success: false,
        error: 'INVALID_REFRESH_TOKEN: رمز التحديث غير صالح أو منتهي'
      };
    }

    // 3. Verify session status
    if (matchingSession.status !== SessionStatus.ACTIVE) {
      return {
        success: false,
        error: `SESSION_INACTIVE: الجلسة بحالة ${matchingSession.status}`
      };
    }

    const now = new Date();
    if (new Date(matchingSession.expiresAt) < now) {
      matchingSession.status = SessionStatus.EXPIRED;
      return {
        success: false,
        error: 'SESSION_EXPIRED: انتهت صلاحية الجلسة'
      };
    }

    // 4. Mark old token as consumed
    this.consumedTokens.set(oldHash, {
      tokenHash: oldHash,
      sessionId: matchingSession.id,
      tokenFamilyId: matchingSession.tokenFamilyId,
      consumedAt: now.toISOString()
    });

    // 5. Update session with new token hash and increment rotation counter
    const newHash = hashToken(params.newRefreshToken);
    matchingSession.currentRefreshTokenHash = newHash;
    matchingSession.rotationCounter += 1;
    matchingSession.lastActiveAt = now.toISOString();
    matchingSession.idleExpiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();

    // Sync with db
    db.saveRefreshToken(matchingSession.userId, params.newRefreshToken);

    return {
      success: true,
      session: matchingSession
    };
  }

  /**
   * Action taken when a previously consumed token is re-submitted.
   * Immediately invalidates all sessions in the token family and records a security incident.
   */
  private handleTokenReuseAnomaly(tokenFamilyId: string, sessionId: string, ipAddress?: string) {
    const family = this.tokenFamilies.get(tokenFamilyId);
    if (family) {
      family.isCompromised = true;
    }

    // Revoke all sessions belonging to this family
    for (const session of this.sessions.values()) {
      if (session.tokenFamilyId === tokenFamilyId) {
        session.status = SessionStatus.SUSPICIOUS_REUSE;
        session.revokedAt = new Date().toISOString();
        session.revokeReason = 'TOKEN_REUSE_DETECTED';
      }
    }

    // Record high-priority audit & security event
    db.recordAuditLog({
      actor_id: sessionId,
      actor_role: 'SYSTEM',
      action: 'SECURITY_ALERT_TOKEN_REUSE',
      resource: 'UserSession',
      resource_id: sessionId,
      result: 'REJECTED',
      metadata: {
        tokenFamilyId,
        ipAddress: ipAddress ? this.maskIp(ipAddress) : undefined,
        severity: 'CRITICAL',
        description: 'Attempted reuse of invalidated refresh token. Immediate family revocation executed.'
      }
    });
  }

  public getSession(sessionId: string): UserSessionEntity | undefined {
    return this.sessions.get(sessionId);
  }

  public listUserSessions(userId: string): UserSessionEntity[] {
    const list: UserSessionEntity[] = [];
    for (const s of this.sessions.values()) {
      if (s.userId === userId) {
        list.push(s);
      }
    }
    return list.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
  }

  public revokeSession(sessionId: string, revokedByUserId?: string, reason: string = 'USER_LOGOUT'): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.status = SessionStatus.REVOKED;
    session.revokedAt = new Date().toISOString();
    session.revokedByUserId = revokedByUserId;
    session.revokeReason = reason;
    return true;
  }

  public revokeAllUserSessions(userId: string, exceptSessionId?: string, reason: string = 'USER_REVOKED_OTHER'): number {
    let count = 0;
    for (const session of this.sessions.values()) {
      if (session.userId === userId && session.id !== exceptSessionId && session.status === SessionStatus.ACTIVE) {
        session.status = SessionStatus.REVOKED;
        session.revokedAt = new Date().toISOString();
        session.revokeReason = reason;
        count++;
      }
    }
    return count;
  }

  public isSessionActive(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    if (session.status !== SessionStatus.ACTIVE) return false;
    if (new Date(session.expiresAt) < new Date()) {
      session.status = SessionStatus.EXPIRED;
      return false;
    }
    return true;
  }

  private maskIp(ip: string): string {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.*.${parts[3]}`;
    }
    return ip;
  }

  private detectDeviceType(ua?: string): string {
    if (!ua) return 'UNKNOWN';
    const lower = ua.toLowerCase();
    if (lower.includes('mobi')) return 'MOBILE';
    if (lower.includes('tablet') || lower.includes('ipad')) return 'TABLET';
    return 'DESKTOP';
  }
}

export const sessionService = new SessionService();
