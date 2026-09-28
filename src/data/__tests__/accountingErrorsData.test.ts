import { describe, it, expect } from 'vitest';
import { 
  ACCOUNTING_ERROR_CASES, 
  ACCOUNTING_ERROR_CATEGORIES, 
  OFFICIAL_CORRECTION_RULES 
} from '../accountingErrorsData';

describe('Accounting Error Correction Module - Curriculum Integrity (Phase 1)', () => {
  it('contains the official ministerial error cases', () => {
    expect(ACCOUNTING_ERROR_CASES.length).toBeGreaterThanOrEqual(6);
  });

  it('contains all required classifications according to Unit 4', () => {
    const categoryIds = ACCOUNTING_ERROR_CATEGORIES.map(c => c.id);
    expect(categoryIds).toContain('PRINCIPLE');
    expect(categoryIds).toContain('COMMISSION_NAMING');
    expect(categoryIds).toContain('AMOUNT_EXCESS');
    expect(categoryIds).toContain('AMOUNT_DEFICIT');
    expect(categoryIds).toContain('OMISSION');
    expect(categoryIds).toContain('POSTING_ONE_SIDED');
  });

  it('correctly implements the Extended and Short method specifications for each case', () => {
    ACCOUNTING_ERROR_CASES.forEach(errCase => {
      // Extended Method verification
      expect(errCase.extendedMethod).toBeDefined();
      expect(errCase.extendedMethod.step2Establishment.rows.length).toBeGreaterThanOrEqual(2);

      // Short Method verification
      expect(errCase.shortMethod).toBeDefined();
      expect(errCase.shortMethod.adjustingEntry.rows.length).toBeGreaterThanOrEqual(2);

      // Verify debit equals credit in adjusting entries
      const totalDebit = errCase.shortMethod.adjustingEntry.rows.reduce((sum, r) => sum + r.debit, 0);
      const totalCredit = errCase.shortMethod.adjustingEntry.rows.reduce((sum, r) => sum + r.credit, 0);
      expect(totalDebit).toBe(totalCredit);
      expect(totalDebit).toBeGreaterThan(0);
    });
  });

  it('enforces Egyptian Commercial Law Article 11 rule against physical erasure', () => {
    expect(OFFICIAL_CORRECTION_RULES.legalFoundation.law).toContain('المادة (11)');
    expect(OFFICIAL_CORRECTION_RULES.legalFoundation.ruleText).toContain('قشط أو شطب');
  });

  it('accurately specifies Suspense Account only for errors affecting trial balance', () => {
    const oneSidedCase = ACCOUNTING_ERROR_CASES.find(c => c.code === 'ERR-06' || c.id === 'case-err-6');
    expect(oneSidedCase).toBeDefined();
    expect(oneSidedCase?.classification.impactOnBalance).toBe('AFFECTS_BALANCE');
    expect(oneSidedCase?.suspenseImpact).toBeDefined();
    expect(oneSidedCase?.suspenseImpact?.suspenseBalanceAfter).toBe(0);

    const principleCase = ACCOUNTING_ERROR_CASES.find(c => c.code === 'ERR-01' || c.id === 'case-err-1');
    expect(principleCase?.classification.impactOnBalance).toBe('NO_EFFECT');
    expect(principleCase?.suspenseImpact).toBeUndefined();
  });
});
