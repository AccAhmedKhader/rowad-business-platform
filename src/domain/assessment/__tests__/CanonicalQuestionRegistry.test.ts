import { describe, it, expect } from 'vitest';
import { canonicalQuestionRegistry } from '../canonical/CanonicalQuestionRegistry';
import { evaluateExamEligibility } from '../canonical/CanonicalQuestionModel';

describe('Phase 4.1 — Canonical Assessment Question Architecture', () => {
  it('reconciles exactly 697 canonical assessment items with zero discrepancy', () => {
    const stats = canonicalQuestionRegistry.getStatistics();
    expect(stats.totalCanonicalItems).toBe(697);
    expect(stats.textbookBankItems).toBe(670);
    expect(stats.examSimulatorItems).toBe(27);
    expect(stats.totalCanonicalItems).toBe(stats.textbookBankItems + stats.examSimulatorItems);
  });

  it('correctly classifies exam-eligible questions vs academic review questions', () => {
    const stats = canonicalQuestionRegistry.getStatistics();
    expect(stats.examEligibleCount).toBe(610);
    expect(stats.academicReviewCount).toBe(87);
    expect(stats.examEligibleCount + stats.academicReviewCount).toBe(697);
  });

  it('enforces that active does not equal exam eligible for review questions', () => {
    const reviewQs = canonicalQuestionRegistry.getReviewRequiredQuestions();
    expect(reviewQs.length).toBe(87);
    reviewQs.forEach(q => {
      expect(q.assessment.exam_eligibility).toBe(false);
      expect(q.lifecycle_status).toBe('ACADEMIC_REVIEW');
    });
  });

  it('maps questions across all 10 canonical curriculum units', () => {
    const stats = canonicalQuestionRegistry.getStatistics();
    for (let u = 1; u <= 10; u++) {
      const unitKey = `unit-${u}`;
      expect(stats.byUnit[unitKey]).toBeGreaterThan(0);
    }
  });

  it('enforces academic eligibility checks via evaluateExamEligibility', () => {
    // 1. Missing stem
    const invalidStem = evaluateExamEligibility({
      stem: 'قصيرة',
      answer_verification: { correct_answer: 'إجابة' } as any,
      academic_mapping: { unit_id: 'unit-1', lesson_id: 'lesson-1', learning_objective_id: 'LO-1' } as any
    });
    expect(invalidStem.isEligible).toBe(false);

    // 2. Placeholder answer
    const placeholderAns = evaluateExamEligibility({
      stem: 'سؤال محاسبي كامل ومفصل لاختبار الإهلاك',
      answer_verification: { correct_answer: 'تطبيق محاسبي معتمد ضمن ص 100' } as any,
      academic_mapping: { unit_id: 'unit-1', lesson_id: 'lesson-1', learning_objective_id: 'LO-1' } as any
    });
    expect(placeholderAns.isEligible).toBe(false);

    // 3. Unmapped objective
    const unmappedLo = evaluateExamEligibility({
      stem: 'سؤال محاسبي كامل ومفصل لاختبار الإهلاك',
      answer_verification: { correct_answer: '50000' } as any,
      academic_mapping: { unit_id: 'unit-1', lesson_id: 'lesson-1', learning_objective_id: 'UNMAPPED' } as any
    });
    expect(unmappedLo.isEligible).toBe(false);
  });
});
