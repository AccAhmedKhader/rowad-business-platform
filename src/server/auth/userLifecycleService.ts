import { db } from '../db/database';
import { UserStatus } from '../db/schema';

export enum UserAccountStatus {
  INVITED = 'INVITED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED',
  ARCHIVED = 'ARCHIVED'
}

export interface UserLifecycleState {
  userId: string;
  status: UserAccountStatus;
  failedLoginAttempts: number;
  lockExpiresAt?: string;
  suspendedAt?: string;
  deactivatedAt?: string;
  statusReason?: string;
}

// Legal State Transition Matrix
const LEGAL_TRANSITIONS: Record<UserAccountStatus, UserAccountStatus[]> = {
  [UserAccountStatus.INVITED]: [UserAccountStatus.PENDING_VERIFICATION, UserAccountStatus.ACTIVE, UserAccountStatus.DEACTIVATED],
  [UserAccountStatus.PENDING_VERIFICATION]: [UserAccountStatus.ACTIVE, UserAccountStatus.DEACTIVATED],
  [UserAccountStatus.ACTIVE]: [UserAccountStatus.LOCKED, UserAccountStatus.SUSPENDED, UserAccountStatus.DEACTIVATED, UserAccountStatus.ARCHIVED],
  [UserAccountStatus.LOCKED]: [UserAccountStatus.ACTIVE, UserAccountStatus.SUSPENDED, UserAccountStatus.DEACTIVATED],
  [UserAccountStatus.SUSPENDED]: [UserAccountStatus.ACTIVE, UserAccountStatus.DEACTIVATED, UserAccountStatus.ARCHIVED],
  [UserAccountStatus.DEACTIVATED]: [UserAccountStatus.ARCHIVED], // Cannot directly reactivate without administrative intervention
  [UserAccountStatus.ARCHIVED]: [] // Terminal state
};

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

class UserLifecycleService {
  private userStates: Map<string, UserLifecycleState> = new Map();

  /**
   * Retrieves or initializes lifecycle state for a user.
   */
  public getState(userId: string): UserLifecycleState {
    let state = this.userStates.get(userId);
    if (!state) {
      const user = db.findUserById(userId);
      const initialStatus = user?.status === 'SUSPENDED' 
        ? UserAccountStatus.SUSPENDED 
        : UserAccountStatus.ACTIVE;

      state = {
        userId,
        status: initialStatus,
        failedLoginAttempts: 0
      };
      this.userStates.set(userId, state);
    }

    // Auto-unlock if lockout expired
    if (state.status === UserAccountStatus.LOCKED && state.lockExpiresAt) {
      if (new Date(state.lockExpiresAt) <= new Date()) {
        state.status = UserAccountStatus.ACTIVE;
        state.failedLoginAttempts = 0;
        state.lockExpiresAt = undefined;
        state.statusReason = 'Auto-unlocked after lockout period expiry';
      }
    }

    return state;
  }

  /**
   * Records a failed login attempt. If >= 5 consecutive failures, transitions to LOCKED.
   */
  public recordFailedLogin(userId: string): { locked: boolean; attemptsLeft: number } {
    const state = this.getState(userId);
    state.failedLoginAttempts += 1;

    if (state.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      state.status = UserAccountStatus.LOCKED;
      state.lockExpiresAt = new Date(Date.now() + LOCKOUT_DURATION_MS).toISOString();
      state.statusReason = 'Exceeded maximum consecutive login attempts (Brute Force Defense)';

      db.recordAuditLog({
        actor_id: userId,
        actor_role: 'SYSTEM',
        action: 'SECURITY_ALERT_ACCOUNT_LOCKED',
        resource: 'User',
        resource_id: userId,
        result: 'REJECTED',
        metadata: {
          consecutiveFailures: state.failedLoginAttempts,
          lockExpiresAt: state.lockExpiresAt
        }
      });

      return { locked: true, attemptsLeft: 0 };
    }

    return { locked: false, attemptsLeft: MAX_FAILED_ATTEMPTS - state.failedLoginAttempts };
  }

  /**
   * Resets consecutive failed login attempts on successful login.
   */
  public recordSuccessfulLogin(userId: string) {
    const state = this.getState(userId);
    state.failedLoginAttempts = 0;
    if (state.status === UserAccountStatus.LOCKED) {
      state.status = UserAccountStatus.ACTIVE;
      state.lockExpiresAt = undefined;
    }
  }

  /**
   * Transition user status with strict invariant validation.
   */
  public transitionStatus(
    userId: string,
    targetStatus: UserAccountStatus,
    reason?: string,
    actorId?: string
  ): { success: boolean; error?: string } {
    const state = this.getState(userId);
    const allowedTargets = LEGAL_TRANSITIONS[state.status] || [];

    if (!allowedTargets.includes(targetStatus)) {
      return {
        success: false,
        error: `INVALID_STATE_TRANSITION: Cannot transition user from '${state.status}' to '${targetStatus}'.`
      };
    }

    const previousStatus = state.status;
    state.status = targetStatus;
    state.statusReason = reason;

    if (targetStatus === UserAccountStatus.SUSPENDED) {
      state.suspendedAt = new Date().toISOString();
      // Sync with underlying database
      const u = db.findUserById(userId);
      if (u) {
        u.status = 'SUSPENDED';
        db.updateUser(userId, { status: 'SUSPENDED' });
      }
    } else if (targetStatus === UserAccountStatus.ACTIVE) {
      state.suspendedAt = undefined;
      state.failedLoginAttempts = 0;
      state.lockExpiresAt = undefined;
      const u = db.findUserById(userId);
      if (u) {
        u.status = 'ACTIVE';
        db.updateUser(userId, { status: 'ACTIVE' });
      }
    }

    db.recordAuditLog({
      actor_id: actorId || 'SYSTEM',
      actor_role: 'ADMIN',
      action: `USER_STATUS_CHANGE_${previousStatus}_TO_${targetStatus}`,
      resource: 'User',
      resource_id: userId,
      result: 'SUCCESS',
      metadata: { previousStatus, targetStatus, reason }
    });

    return { success: true };
  }

  /**
   * Checks if user account is allowed to log in or make authenticated requests.
   */
  public isAccountUsable(userId: string): { usable: boolean; code?: string; message?: string } {
    const state = this.getState(userId);

    if (state.status === UserAccountStatus.LOCKED) {
      return {
        usable: false,
        code: 'ACCOUNT_LOCKED',
        message: 'تم قفل الحساب مؤقتاً بسبب تكرار محاولات تسجيل الدخول الخاطئة. يرجى المحاولة بعد 15 دقيقة.'
      };
    }

    if (state.status === UserAccountStatus.SUSPENDED) {
      return {
        usable: false,
        code: 'ACCOUNT_SUSPENDED',
        message: 'هذا الحساب موقوف حالياً بقرار إداري. يرجى مراجعة إدارة المنصة.'
      };
    }

    if (state.status === UserAccountStatus.DEACTIVATED || state.status === UserAccountStatus.ARCHIVED) {
      return {
        usable: false,
        code: 'ACCOUNT_INACTIVE',
        message: 'الحساب غير مفعّل أو تم إلغاء تنشيطه.'
      };
    }

    return { usable: true };
  }
}

export const userLifecycleService = new UserLifecycleService();
