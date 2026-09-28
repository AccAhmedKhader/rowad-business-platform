import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'CONTENT_MANAGER' | 'ADMIN' | string;
  fullName: string;
  sub?: string;
  sid?: string;
  jti?: string;
  amr?: string[];
  iss?: string;
  aud?: string;
}

export const ACCESS_TOKEN_EXPIRY = '15m'; // U1: 15 minutes
export const REFRESH_TOKEN_EXPIRY = '7d';  // U1: 7 days

const FORBIDDEN_PLACEHOLDERS = [
  'eb_jwt_access_secret_production_2026_super_secure_key',
  'eb_jwt_refresh_secret_production_2026_super_secure_key',
  'change_this_to_a_secure_random_string_in_production',
  'change_this_to_another_secure_random_string_in_production',
  'secret',
  'password',
  '123456'
];

/**
 * Validates cryptographic secret entropy and presence.
 * In production/staging, fails closed with a fatal exception if secrets are missing,
 * weak (< 32 chars), or set to known insecure placeholders.
 */
export function getJwtSecrets(): { accessSecret: string; refreshSecret: string } {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';

  if (!accessSecret || accessSecret.length < 32) {
    if (isTest) {
      // Ephemeral deterministic key exclusively for automated test suites
      return {
        accessSecret: 'test_ephemeral_jwt_access_secret_key_entropy_32_chars_ok!',
        refreshSecret: 'test_ephemeral_jwt_refresh_secret_key_entropy_32_chars_ok!'
      };
    }
    throw new Error(
      '[FATAL SECURITY EXCEPTION] JWT_ACCESS_SECRET is missing or lacks 256-bit entropy (minimum 32 characters required). Server cannot start.'
    );
  }

  if (!refreshSecret || refreshSecret.length < 32) {
    if (isTest) {
      return {
        accessSecret,
        refreshSecret: 'test_ephemeral_jwt_refresh_secret_key_entropy_32_chars_ok!'
      };
    }
    throw new Error(
      '[FATAL SECURITY EXCEPTION] JWT_REFRESH_SECRET is missing or lacks 256-bit entropy (minimum 32 characters required). Server cannot start.'
    );
  }

  if (FORBIDDEN_PLACEHOLDERS.includes(accessSecret) || FORBIDDEN_PLACEHOLDERS.includes(refreshSecret)) {
    throw new Error(
      '[FATAL SECURITY EXCEPTION] Server detected prohibited default secret placeholder in environment configuration.'
    );
  }

  return { accessSecret, refreshSecret };
}

/**
 * Startup assertion hook to fail fast if secrets are unconfigured.
 */
export function assertCryptographicEnvironment(): void {
  getJwtSecrets();
}

/**
 * Compute SHA-256 hash of tokens for safe database persistence.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Signs standard access token with sub, sid, jti claims.
 */
export function signAccessToken(payload: TokenPayload, sessionId?: string): string {
  const { accessSecret } = getJwtSecrets();
  const jti = crypto.randomUUID();
  const sid = sessionId || payload.sid || `sess_${crypto.randomUUID()}`;

  const claims = {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    fullName: payload.fullName,
    sub: payload.userId,
    sid,
    iss: 'https://api.eb.edu.eg',
    aud: 'https://eb.edu.eg',
    jti,
    amr: payload.amr || ['pwd']
  };

  return jwt.sign(claims, accessSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
    algorithm: 'HS256'
  });
}

/**
 * Signs rotating refresh token.
 */
export function signRefreshToken(payload: TokenPayload, sessionId?: string): string {
  const { refreshSecret } = getJwtSecrets();
  const jti = crypto.randomUUID();
  const sid = sessionId || payload.sid || `sess_${crypto.randomUUID()}`;

  const claims = {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    fullName: payload.fullName,
    sub: payload.userId,
    sid,
    jti
  };

  return jwt.sign(claims, refreshSecret, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    algorithm: 'HS256'
  });
}

/**
 * Verifies access token with explicit algorithm whitelist.
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    if (!token || typeof token !== 'string') return null;
    const { accessSecret } = getJwtSecrets();
    const decoded = jwt.verify(token, accessSecret, {
      algorithms: ['HS256']
    }) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Verifies refresh token with explicit algorithm whitelist.
 */
export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    if (!token || typeof token !== 'string') return null;
    const { refreshSecret } = getJwtSecrets();
    const decoded = jwt.verify(token, refreshSecret, {
      algorithms: ['HS256']
    }) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
