import { describe, expect, it } from 'vitest';
import { appendSecurityAuditEvent, getSecurityAuditEvents, verifySecurityAuditChain } from '../auth/productionHardening';

describe('M15 production hardening', () => {
  it('maintains a tamper-evident audit chain', () => {
    appendSecurityAuditEvent({ action: 'M15_TEST_A', requestId: 'r1', metadata: { ok: true } });
    appendSecurityAuditEvent({ action: 'M15_TEST_B', requestId: 'r2' });
    expect(verifySecurityAuditChain().valid).toBe(true);
    expect(getSecurityAuditEvents(2)).toHaveLength(2);
  });
});
