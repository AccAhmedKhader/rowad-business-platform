import { describe, it, expect, beforeEach } from 'vitest';
import { hashPassword, verifyPassword } from '../auth/password';
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, getJwtSecrets, hashToken } from '../auth/jwt';
import { sessionService, SessionStatus } from '../auth/sessionService';
import { authorizationService } from '../auth/authorizationService';
import { userLifecycleService, UserAccountStatus } from '../auth/userLifecycleService';
import { verificationTokenService, TokenPurpose } from '../auth/verificationTokenService';
import { normalizeEmail, normalizeStudentCode, normalizePhone, parseEgyptianFullName } from '../auth/identifierNormalizer';
import { db } from '../db/database';

describe('Phase U2: Enterprise Identity, Sessions, RTR & Dynamic RBAC Suite', () => {
  beforeEach(() => {
    // Reset any state if necessary
  });

  describe('1. Secret Hygiene & Standard JWT Claims', () => {
    it('should derive high-entropy 256-bit secrets without insecure fallbacks', () => {
      const secrets = getJwtSecrets();
      expect(secrets.accessSecret.length).toBeGreaterThanOrEqual(32);
      expect(secrets.refreshSecret.length).toBeGreaterThanOrEqual(32);
    });

    it('should generate standard claims (sub, sid, jti, iss, aud)', () => {
      const payload = {
        userId: 'usr-student-u2-1',
        email: 'student.u2@eb.edu.eg',
        role: 'STUDENT',
        fullName: 'أحمد محمود علي'
      };

      const token = signAccessToken(payload, 'sess_test_123');
      const decoded: any = verifyAccessToken(token);

      expect(decoded).not.toBeNull();
      expect(decoded.sub).toBe(payload.userId);
      expect(decoded.sid).toBe('sess_test_123');
      expect(decoded.iss).toBe('https://api.eb.edu.eg');
      expect(decoded.aud).toBe('https://eb.edu.eg');
      expect(decoded.jti).toBeDefined();
    });
  });

  describe('2. Server-Authoritative Sessions & Single-Use Refresh Token Rotation (RTR)', () => {
    it('should establish an active UserSession with hashed refresh token and token family', () => {
      const userId = 'usr-session-test-1';
      const initialRefreshToken = 'initial_refresh_token_u2_secure_string_123';

      const session = sessionService.createSession({
        userId,
        refreshToken: initialRefreshToken,
        ipAddress: '197.165.12.34',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'
      });

      expect(session.id).toMatch(/^sess_/);
      expect(session.tokenFamilyId).toMatch(/^fam_/);
      expect(session.status).toBe(SessionStatus.ACTIVE);
      expect(session.rotationCounter).toBe(0);
      expect(session.currentRefreshTokenHash).toBe(hashToken(initialRefreshToken));
      expect(session.ipAddressMasked).toBe('197.165.*.34');
      expect(session.deviceType).toBe('DESKTOP');
      expect(sessionService.isSessionActive(session.id)).toBe(true);
    });

    it('should execute single-use RTR (rotate token and increment counter)', () => {
      const userId = 'usr-rotation-test-2';
      const tokenA = 'refresh_token_A_valid_secret_hash';
      const tokenB = 'refresh_token_B_valid_secret_hash';

      const session = sessionService.createSession({
        userId,
        refreshToken: tokenA
      });

      const rotation = sessionService.rotateRefreshToken({
        oldRefreshToken: tokenA,
        newRefreshToken: tokenB,
        sessionId: session.id
      });

      expect(rotation.success).toBe(true);
      expect(rotation.session?.rotationCounter).toBe(1);
      expect(rotation.session?.currentRefreshTokenHash).toBe(hashToken(tokenB));
    });

    it('should DETECT REUSE ANOMALY and immediately REVOKE ENTIRE FAMILY if consumed token is replayed', () => {
      const userId = 'usr-theft-test-3';
      const tokenA = 'token_A_to_be_stolen';
      const tokenB = 'token_B_legitimate_rotation';
      const tokenC = 'token_C_future_rotation';

      const session = sessionService.createSession({
        userId,
        refreshToken: tokenA
      });

      // Legitimate client rotates Token A -> Token B
      const legitRotation = sessionService.rotateRefreshToken({
        oldRefreshToken: tokenA,
        newRefreshToken: tokenB,
        sessionId: session.id
      });
      expect(legitRotation.success).toBe(true);

      // Attacker attempts to replay already-consumed Token A!
      const theftAttempt = sessionService.rotateRefreshToken({
        oldRefreshToken: tokenA,
        newRefreshToken: tokenC,
        sessionId: session.id,
        ipAddress: '41.128.99.1'
      });

      expect(theftAttempt.success).toBe(false);
      expect(theftAttempt.reuseDetected).toBe(true);
      expect(theftAttempt.error).toContain('SESSION_REVOKED_THEFT');

      // The entire session status is now marked SUSPICIOUS_REUSE
      const recheckedSession = sessionService.getSession(session.id);
      expect(recheckedSession?.status).toBe(SessionStatus.SUSPICIOUS_REUSE);
      expect(sessionService.isSessionActive(session.id)).toBe(false);
    });

    it('should revoke individual session and batch-revoke all other sessions', () => {
      const userId = 'usr-multi-session-user';
      const s1 = sessionService.createSession({ userId, refreshToken: 'token_s1' });
      const s2 = sessionService.createSession({ userId, refreshToken: 'token_s2' });
      const s3 = sessionService.createSession({ userId, refreshToken: 'token_s3' });

      expect(sessionService.listUserSessions(userId).length).toBe(3);

      // Revoke s1
      sessionService.revokeSession(s1.id, userId, 'USER_LOGOUT');
      expect(sessionService.isSessionActive(s1.id)).toBe(false);

      // Revoke all remaining except s2
      const revokedCount = sessionService.revokeAllUserSessions(userId, s2.id);
      expect(revokedCount).toBe(1); // s3 was revoked
      expect(sessionService.isSessionActive(s2.id)).toBe(true);
      expect(sessionService.isSessionActive(s3.id)).toBe(false);
    });
  });

  describe('3. Dynamic RBAC Engine & Contextual Authorization', () => {
    it('should strictly enforce Default Deny if no explicit permission matches', () => {
      const result = authorizationService.authorize({
        actorUserId: 'usr-student-1',
        resource: 'questions',
        action: 'validate' // Student cannot validate questions
      });

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('DEFAULT_DENY');
    });

    it('should allow student to view/update own records (SELF scope) but block IDOR on others', () => {
      const selfCheck = authorizationService.authorize({
        actorUserId: 'usr-student-1',
        resource: 'users',
        action: 'view',
        targetResourceId: 'usr-student-1'
      });
      expect(selfCheck.allowed).toBe(true);
      expect(selfCheck.effectiveScope).toBe('SELF');

      const idorCheck = authorizationService.authorize({
        actorUserId: 'usr-student-1',
        resource: 'users',
        action: 'view',
        targetResourceId: 'usr-other-student-99'
      });
      expect(idorCheck.allowed).toBe(false);
    });

    it('should permit teachers to view assigned students but not arbitrary unassigned students', () => {
      const assignedTeacherId = 'usr-teacher-1';
      const assignedStudentId = 'usr-student-assigned-1';
      const unassignedStudentId = 'usr-student-stranger-2';

      const allowedCheck = authorizationService.authorize({
        actorUserId: assignedTeacherId,
        resource: 'students',
        action: 'view',
        targetResourceId: assignedStudentId,
        context: { assignedStudentIds: [assignedStudentId] }
      });
      expect(allowedCheck.allowed).toBe(true);
      expect(allowedCheck.effectiveScope).toBe('ASSIGNED');

      const deniedCheck = authorizationService.authorize({
        actorUserId: assignedTeacherId,
        resource: 'students',
        action: 'view',
        targetResourceId: unassignedStudentId,
        context: { assignedStudentIds: [assignedStudentId] }
      });
      expect(deniedCheck.allowed).toBe(false);
    });

    it('should prevent privilege escalation: Admin cannot assign higher priority role', () => {
      const escalCheck = authorizationService.authorize({
        actorUserId: 'usr-admin-1', // PLATFORM_ADMIN (priority 2)
        resource: 'user_roles',
        action: 'assign',
        context: { targetRolePriority: 1 } // SUPER_ADMIN (priority 1)
      });
      expect(escalCheck.allowed).toBe(false);
      expect(escalCheck.reason).toContain('CANNOT_ASSIGN_HIGHER_OR_EQUAL_PRIORITY_ROLE');
    });
  });

  describe('4. User Account Lifecycle State Machine & Lockout Defense', () => {
    it('should lock account after 5 consecutive failed login attempts', () => {
      const testUserId = 'usr-lockout-test';

      // 4 failures
      for (let i = 0; i < 4; i++) {
        const res = userLifecycleService.recordFailedLogin(testUserId);
        expect(res.locked).toBe(false);
      }

      // 5th failure -> LOCKED
      const fifthRes = userLifecycleService.recordFailedLogin(testUserId);
      expect(fifthRes.locked).toBe(true);

      const state = userLifecycleService.getState(testUserId);
      expect(state.status).toBe(UserAccountStatus.LOCKED);

      // Usability check should reject
      const usable = userLifecycleService.isAccountUsable(testUserId);
      expect(usable.usable).toBe(false);
      expect(usable.code).toBe('ACCOUNT_LOCKED');

      // Successful login resets failures
      userLifecycleService.recordSuccessfulLogin(testUserId);
      expect(userLifecycleService.isAccountUsable(testUserId).usable).toBe(true);
    });

    it('should enforce legal state transitions and block invalid transitions', () => {
      const testUserId = 'usr-transition-test';

      // ACTIVE -> SUSPENDED (Legal)
      const t1 = userLifecycleService.transitionStatus(testUserId, UserAccountStatus.SUSPENDED, 'Disciplinary review');
      expect(t1.success).toBe(true);

      // SUSPENDED -> ACTIVE (Legal)
      const t2 = userLifecycleService.transitionStatus(testUserId, UserAccountStatus.ACTIVE, 'Review cleared');
      expect(t2.success).toBe(true);

      // ACTIVE -> ARCHIVED (Legal)
      const t3 = userLifecycleService.transitionStatus(testUserId, UserAccountStatus.ARCHIVED, 'Graduated student');
      expect(t3.success).toBe(true);

      // ARCHIVED -> ACTIVE (Illegal: Terminal state)
      const t4 = userLifecycleService.transitionStatus(testUserId, UserAccountStatus.ACTIVE);
      expect(t4.success).toBe(false);
      expect(t4.error).toContain('INVALID_STATE_TRANSITION');
    });
  });

  describe('5. Verification & Password Recovery Tokens', () => {
    it('should issue and consume single-use purpose-bound tokens', () => {
      const userId = 'usr-pw-reset-target';
      const token = verificationTokenService.generateToken(userId, TokenPurpose.PASSWORD_RESET, 15);

      expect(typeof token).toBe('string');
      expect(token.length).toBe(64); // 32 hex bytes

      // Purpose mismatch fails
      const mismatch = verificationTokenService.consumeToken(token, TokenPurpose.EMAIL_VERIFICATION);
      expect(mismatch.success).toBe(false);
      expect(mismatch.error).toContain('PURPOSE_MISMATCH');

      // Correct consumption succeeds
      const consume = verificationTokenService.consumeToken(token, TokenPurpose.PASSWORD_RESET);
      expect(consume.success).toBe(true);
      expect(consume.userId).toBe(userId);

      // Re-consumption fails (Single-use invariant)
      const reConsume = verificationTokenService.consumeToken(token, TokenPurpose.PASSWORD_RESET);
      expect(reConsume.success).toBe(false);
      expect(reConsume.error).toContain('TOKEN_ALREADY_USED');
    });
  });

  describe('6. Identifier Normalization Utilities', () => {
    it('should normalize emails, student codes, and phone numbers', () => {
      expect(normalizeEmail('  STUDENT.Alpha@EB.EDU.EG  ')).toBe('student.alpha@eb.edu.eg');
      expect(normalizeStudentCode(' eb- 2026 -stu- 001 ')).toBe('EB-2026-STU-001');
      expect(normalizePhone('01012345678')).toBe('+201012345678');
    });

    it('should parse tripartite Egyptian names cleanly', () => {
      const parsed = parseEgyptianFullName('محمد حسام الدين عبد الله');
      expect(parsed.firstName).toBe('محمد');
      expect(parsed.secondName).toBe('حسام');
      expect(parsed.lastName).toBe('الله');
      expect(parsed.displayName).toBe('محمد حسام الدين عبد الله');
    });
  });
});
