import crypto from 'crypto';

export interface SecurityAuditEvent {
  id: string;
  timestamp: string;
  action: string;
  actorUserId?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
  previousHash: string;
  hash: string;
}

const events: SecurityAuditEvent[] = [];

function canonicalize(value: unknown): string {
  return JSON.stringify(value, Object.keys(value as object).sort());
}

export function appendSecurityAuditEvent(input: Omit<SecurityAuditEvent, 'id' | 'timestamp' | 'previousHash' | 'hash'>): SecurityAuditEvent {
  const previousHash = events.at(-1)?.hash ?? 'GENESIS';
  const base = {
    ...input,
    id: `sec_${crypto.randomUUID()}`,
    timestamp: new Date().toISOString(),
    previousHash,
  };
  const hash = crypto.createHash('sha256').update(canonicalize(base)).digest('hex');
  const event = { ...base, hash };
  events.push(event);
  return event;
}

export function verifySecurityAuditChain(): { valid: boolean; count: number; brokenAt?: number } {
  let previousHash = 'GENESIS';
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const { hash, ...base } = event;
    if (event.previousHash !== previousHash) return { valid: false, count: events.length, brokenAt: i };
    const expected = crypto.createHash('sha256').update(canonicalize(base)).digest('hex');
    if (expected !== hash) return { valid: false, count: events.length, brokenAt: i };
    previousHash = hash;
  }
  return { valid: true, count: events.length };
}

export function getSecurityAuditEvents(limit = 100): SecurityAuditEvent[] {
  return events.slice(-Math.max(1, Math.min(limit, 1000))).reverse();
}
