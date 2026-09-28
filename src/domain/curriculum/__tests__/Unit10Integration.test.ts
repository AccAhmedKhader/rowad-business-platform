import { describe, it, expect } from 'vitest';
import { curriculumRegistry } from '../CurriculumRegistry';
import { LegacyContentAdapter } from '../adapters/LegacyContentAdapter';
import { 
  normalizeUnitSlug, 
  normalizeLessonSlug, 
  isValidUnitSlug, 
  isValidLessonSlug, 
  getLessonIndexFromSlugs, 
  getSlugsFromLessonIndex,
  buildUnitUrl,
  buildLessonUrl
} from '../../../routing/routeParams';
import { unit10ReviewData } from '../../../data/unit10ReviewData';
import { unit10Bank } from '../../../data/unifiedQuestionBank/unit10Bank';

describe('Unit 10 Integration & Canonical Verification Suite', () => {
  it('registers CANONICAL_UNIT_10 in CurriculumRegistry with 6 complete lessons', () => {
    const unit10 = curriculumRegistry.getUnitById('unit-10');
    expect(unit10).toBeDefined();
    expect(unit10?.unitNumber).toBe(10);
    expect(unit10?.subjectCode).toBe('ACC.U10');
    expect(unit10?.titleAr).toContain('تحليل القوائم المالية');
    expect(unit10?.lessons.length).toBe(6);

    // Verify each lesson structure
    unit10?.lessons.forEach((lesson, idx) => {
      expect(lesson.id).toBe(`lesson-${idx + 1}`);
      expect(lesson.lessonNumber).toBe(idx + 1);
      expect(lesson.unitId).toBe('unit-10');
      expect(lesson.titleAr.length).toBeGreaterThan(5);
      expect(lesson.subtitleAr.length).toBeGreaterThan(5);
      expect(lesson.nominalWeight).toBeGreaterThan(0);
      expect(lesson.hasExercises).toBe(true);
      expect(lesson.questionIds?.length).toBeGreaterThan(0);
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(2);
      expect(lesson.concepts?.length).toBeGreaterThanOrEqual(2);
      expect(lesson.skills?.length).toBeGreaterThanOrEqual(1);

      // Verify objective attributes
      lesson.objectives.forEach(obj => {
        expect(obj.id).toBeDefined();
        expect(obj.code).toMatch(/^LO-U10\.\d+$/);
        expect(obj.titleAr.length).toBeGreaterThan(10);
        expect(obj.conceptIds.length).toBeGreaterThan(0);
        expect(obj.primaryMisconceptions.length).toBeGreaterThan(0);
        expect(obj.weightPercentage).toBeGreaterThan(0);
      });
    });
  });

  it('bridges review items and JRE through LegacyContentAdapter', () => {
    const reviewData = LegacyContentAdapter.getLegacyUnitReview('unit-10');
    expect(reviewData).toBeDefined();
    expect(reviewData).toEqual(unit10ReviewData);
    expect(reviewData?.maryamComprehensiveCase.steps.length).toBe(4);
    expect(reviewData?.jreScaffoldedSuite.length).toBe(1);

    const reviewIds = LegacyContentAdapter.getReviewItemIdsForUnit('unit-10');
    expect(reviewIds.length).toBe(21);
    expect(reviewIds).toContain('u10-outcome-1');
    expect(reviewIds).toContain('u10-step-1');
    expect(reviewIds).toContain('u10-step-6');
    expect(reviewIds).toContain('u10-case-step-1');
    expect(reviewIds).toContain('err-10-1');
    expect(reviewIds).toContain('JRE-U10-CASE-1');
  });

  it('bridges Unit 10 question bank (U10-Q-001 through U10-Q-036)', () => {
    expect(unit10Bank.length).toBe(36);

    for (let i = 1; i <= 36; i++) {
      const qId = `U10-Q-${i.toString().padStart(3, '0')}`;
      const question = LegacyContentAdapter.getQuestionById(qId);
      expect(question).toBeDefined();
      expect(question?.id).toBe(qId);
      expect(question?.unitId).toBe('unit-10');
    }

    const trainingQuestions = curriculumRegistry.getTrainingBankQuestions('unit-10');
    expect(trainingQuestions.length).toBe(36);
  });

  it('verifies routing utilities and lesson offset mapping for Unit 10', () => {
    // Normalization
    expect(normalizeUnitSlug('unit-10')).toBe('unit-10');
    expect(normalizeUnitSlug('u10')).toBe('unit-10');
    expect(normalizeLessonSlug('lesson-1')).toBe('lesson-1');
    expect(normalizeLessonSlug('u10-lesson-1')).toBe('lesson-1');
    expect(normalizeLessonSlug('u10-lesson-6')).toBe('lesson-6');

    // Validation
    expect(isValidUnitSlug('unit-10')).toBe(true);
    expect(isValidLessonSlug('unit-10', 'lesson-1')).toBe(true);
    expect(isValidLessonSlug('unit-10', 'lesson-6')).toBe(true);
    expect(isValidLessonSlug('unit-10', 'lesson-7')).toBe(false);

    // Index mapping (Unit 10 offset is 52: lessons 1..6 -> indices 52..57)
    expect(getLessonIndexFromSlugs('unit-10', 'lesson-1')).toBe(52);
    expect(getLessonIndexFromSlugs('unit-10', 'lesson-6')).toBe(57);

    expect(getSlugsFromLessonIndex(52)).toEqual({ unitSlug: 'unit-10', lessonSlug: 'lesson-1' });
    expect(getSlugsFromLessonIndex(57)).toEqual({ unitSlug: 'unit-10', lessonSlug: 'lesson-6' });

    // URL building
    expect(buildUnitUrl('unit-10')).toBe('/curriculum/unit-10');
    expect(buildLessonUrl('unit-10', 'lesson-3')).toBe('/curriculum/unit-10/lessons/lesson-3');
  });

  it('delivers all 6 Unit 10 lessons for UI consumption via getAllLessonsContent', () => {
    const all = curriculumRegistry.getAllLessonsContent();
    const u10Lessons = all.filter(l => l.unitId === 'unit-10');
    expect(u10Lessons.length).toBe(6);

    const l1 = all[52];
    expect(l1.unitId).toBe('unit-10');
    expect(l1.lessonNumber).toBe(1);

    const l6 = all[57];
    expect(l6.unitId).toBe('unit-10');
    expect(l6.lessonNumber).toBe(6);
  });
});
