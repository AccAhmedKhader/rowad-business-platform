import { describe, expect, it } from 'vitest';
import { CanonicalAcademicRegistry, M3_QUESTION_SUMMARY } from '../canonicalAcademicRegistry';

describe('M3 CanonicalAcademicRegistry', () => {
  it('keeps Accounting and Business Administration as separate domains', () => {
    expect(CanonicalAcademicRegistry.get('ruwad:domain:accounting')?.status).toBe('ACTIVE');
    expect(CanonicalAcademicRegistry.get('ruwad:domain:business-administration')?.status).toBe('ACTIVE');
  });

  it('reconciles all 697 M2 canonical questions without index identity', () => {
    const questions = CanonicalAcademicRegistry.byType('Question');
    expect(questions).toHaveLength(697);
    expect(M3_QUESTION_SUMMARY.total_items).toBe(697);
    expect(new Set(questions.map(q => q.canonicalId)).size).toBe(697);
    expect(questions.every(q => q.metadata.questionCanonicalId)).toBe(true);
  });

  it('keeps storage and exam eligibility separate', () => {
    const eligible = CanonicalAcademicRegistry.byType('Question').filter(q => q.status === 'EXAM_ELIGIBLE');
    const review = CanonicalAcademicRegistry.byType('Question').filter(q => q.status === 'ACADEMIC_REVIEW');
    expect(eligible).toHaveLength(610);
    expect(review).toHaveLength(87);
    expect(review.every(q => q.status !== 'EXAM_ELIGIBLE')).toBe(true);
  });

  it('has no duplicate IDs, orphan parents, invalid domains, or source-less entries', () => {
    const result = CanonicalAcademicRegistry.validate();
    expect(result.duplicateIds).toEqual([]);
    expect(result.orphanIds).toEqual([]);
    expect(result.invalidDomainIds).toEqual([]);
    expect(result.sourceLessIds).toEqual([]);
    expect(result.pass).toBe(true);
  });
});
