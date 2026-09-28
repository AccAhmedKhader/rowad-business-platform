import crypto from 'crypto';
import { db } from '../db/database';
import { hashPassword } from './password';

export enum TokenPurpose {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_CHANGE = 'EMAIL_CHANGE',
  INVITATION = 'INVITATION'
}

export interface VerificationTokenEntity {
  id: string;
  identityId: string;
  userId: string;
  purpose: TokenPurpose;
  tokenHash: string;
  expiresAt: string;
  consumedAt?: string;
  createdAt: string;
}

class VerificationTokenService {
  private tokens: Map<string, VerificationTokenEntity> = new Map(); // tokenHash -> Entity

  /**
   * Generates a single-use purpose-bound verification or password reset token.
   * Stored securely as SHA-256 hash. Returns the raw token string for transmission.
   */
  public generateToken(userId: string, purpose: TokenPurpose, ttlMinutes: number = 60): string {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlMinutes * 60 * 1000);

    const entity: VerificationTokenEntity = {
      id: `tok_${crypto.randomUUID()}`,
      identityId: `ident_${userId}`,
      userId,
      purpose,
      tokenHash,
      expiresAt: expiresAt.toISOString(),
      createdAt: now.toISOString()
    };

    this.tokens.set(tokenHash, entity);
    return rawToken;
  }

  /**
   * Consumes a token. Enforces single-use, purpose matching, and expiration.
   */
  public consumeToken(
    rawToken: string,
    expectedPurpose: TokenPurpose
  ): { success: boolean; userId?: string; error?: string } {
    if (!rawToken || typeof rawToken !== 'string') {
      return { success: false, error: 'INVALID_TOKEN: رمز التحقق غير صالح' };
    }

    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const token = this.tokens.get(tokenHash);

    if (!token) {
      return { success: false, error: 'TOKEN_NOT_FOUND: رمز التحقق غير موجود أو غير صالح' };
    }

    if (token.consumedAt) {
      return { success: false, error: 'TOKEN_ALREADY_USED: تم استخدام رمز التحقق هذا مسبقاً' };
    }

    if (token.purpose !== expectedPurpose) {
      return { success: false, error: 'PURPOSE_MISMATCH: رمز التحقق غير مخصص لهذه العملية' };
    }

    const now = new Date();
    if (new Date(token.expiresAt) < now) {
      return { success: false, error: 'TOKEN_EXPIRED: انتهت صلاحية رمز التحقق' };
    }

    // Mark consumed immediately (Single-use invariant)
    token.consumedAt = now.toISOString();

    return {
      success: true,
      userId: token.userId
    };
  }
}

export const verificationTokenService = new VerificationTokenService();
