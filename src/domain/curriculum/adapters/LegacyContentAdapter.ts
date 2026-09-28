import { allLessons, unit1Lessons, unit2Lessons, unit10Lessons } from '../../../data/lessonsData';
import { unitReviewData } from '../../../data/unitReviewData';
import { unit2ReviewData } from '../../../data/unit2ReviewData';
import { unit5ReviewData } from '../../../data/unit5ReviewData';
import { unit6ReviewData } from '../../../data/unit6ReviewData';
import { unit7ReviewData } from '../../../data/unit7ReviewData';
import { unit8ReviewData } from '../../../data/unit8ReviewData';
import { unit9ReviewData } from '../../../data/unit9ReviewData';
import { unit10ReviewData } from '../../../data/unit10ReviewData';
import { CANONICAL_UNIT_1, CANONICAL_UNIT_2, LessonSpec, ConceptSpec, SkillSpec } from '../CurriculumModel';
import { expandedQuestionBank, questionBankSummary, TraceableQuestion } from '../../../data/expandedQuestionBank';
import { unit3CoreBank } from '../../../data/unit3CoreBank';
import { unit4CoreBank } from '../../../data/unit4CoreBank';
import { unit5CoreBank } from '../../../data/unit5CoreBank';
import { unit6CoreBank } from '../../../data/unit6CoreBank';
import { unit7CoreBank } from '../../../data/unit7CoreBank';
import { unit8CoreBank } from '../../../data/unit8CoreBank';
import { unit9Bank } from '../../../data/unifiedQuestionBank/unit9Bank';
import { unit10Bank } from '../../../data/unifiedQuestionBank/unit10Bank';
import type { LessonContent } from '../../../types';

/**
 * Adapter to bridge legacy static content (LessonContent, Review data, Question Bank)
 * into the Canonical Architecture without deleting the old files.
 */
export class LegacyContentAdapter {
  
  /**
   * Returns all lessons content across Unit 1 and Unit 2.
   */
  static getAllLessonsContent(): LessonContent[] {
    return allLessons;
  }

  /**
   * Fetches the legacy lesson content object for a given canonical lesson ID.
   */
  static getLegacyLessonContent(unitId: string, lessonId: string): LessonContent | undefined {
    // legacy U1 lessons use 'lesson-X', U2 lessons use 'u2-lesson-X', U3 lessons use 'lesson-3-X', U4 use 'lesson-4-X', U5 use 'lesson-5-X', U6 use 'lesson-6-X'
    let legacyId = lessonId;
    if (unitId === 'unit-2' && !lessonId.startsWith('u2-')) {
      legacyId = `u2-${lessonId}`;
    } else if (unitId === 'unit-3' && !lessonId.startsWith('lesson-3-')) {
      legacyId = `lesson-3-${lessonId.replace('lesson-', '')}`;
    } else if (unitId === 'unit-4' && !lessonId.startsWith('lesson-4-')) {
      legacyId = `lesson-4-${lessonId.replace('lesson-', '')}`;
    } else if (unitId === 'unit-5' && !lessonId.startsWith('lesson-5-')) {
      legacyId = `lesson-5-${lessonId.replace('lesson-', '')}`;
    } else if (unitId === 'unit-6' && !lessonId.startsWith('lesson-6-')) {
      legacyId = `lesson-6-${lessonId.replace('lesson-', '')}`;
    } else if (unitId === 'unit-7' && !lessonId.startsWith('lesson-7-')) {
      legacyId = `lesson-7-${lessonId.replace('lesson-', '')}`;
    } else if (unitId === 'unit-8' && !lessonId.startsWith('lesson-8-')) {
      legacyId = `lesson-8-${lessonId.replace('lesson-', '')}`;
    } else if (unitId === 'unit-10' && !lessonId.startsWith('lesson-10-')) {
      legacyId = `lesson-10-${lessonId.replace('lesson-', '')}`;
    } else if (unitId === 'unit-9' && !lessonId.startsWith('lesson-9-')) {
      legacyId = `lesson-9-${lessonId.replace('lesson-', '')}`;
    }
    const lesson = allLessons.find(l => l.id === legacyId || l.id === lessonId);
    if (!lesson) return undefined;
    return {
      ...lesson,
      unitId: (lesson.unitId || (unitId as import('../../../types').UnitId))
    };
  }

  /**
   * Returns question IDs belonging to a specific lesson, or all questions in unit if lessonId is omitted.
   * Handles both canonical lessonId ('lesson-1') and legacy names ('u2-lesson-1').
   */
  static getQuestionIds(unitId: string, lessonId?: string): string[] {
    if (lessonId) {
      return this.getQuestionIdsForLesson(unitId, lessonId);
    }
    const allLessonIds = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6'];
    const result: string[] = [];
    for (const lid of allLessonIds) {
      const qIds = this.getQuestionIdsForLesson(unitId, lid);
      for (const q of qIds) {
        if (!result.includes(q)) result.push(q);
      }
    }
    return result;
  }

  /**
   * Returns question IDs belonging to a specific lesson.
   * Handles both canonical lessonId ('lesson-1') and legacy names ('u2-lesson-1').
   */
  static getQuestionIdsForLesson(unitId: string, lessonId: string): string[] {
    if (unitId === 'unit-3') {
      const num = lessonId.replace('lesson-3-', '').replace('lesson-', '');
      const targetLid = `lesson-3-${num}`;
      return unit3CoreBank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId)
        .map(q => q.id);
    }
    if (unitId === 'unit-4') {
      const num = lessonId.replace('lesson-4-', '').replace('lesson-', '');
      const targetLid = `lesson-4-${num}`;
      return unit4CoreBank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId)
        .map(q => q.id);
    }
    if (unitId === 'unit-5') {
      const num = lessonId.replace('lesson-5-', '').replace('lesson-', '');
      const targetLid = `lesson-5-${num}`;
      return unit5CoreBank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId)
        .map(q => q.id);
    }
    if (unitId === 'unit-6') {
      const num = lessonId.replace('lesson-6-', '').replace('lesson-', '');
      const targetLid = `lesson-6-${num}`;
      return unit6CoreBank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId)
        .map(q => q.id);
    }
    if (unitId === 'unit-7') {
      const num = lessonId.replace('lesson-7-', '').replace('lesson-', '');
      const targetLid = `lesson-7-${num}`;
      return unit7CoreBank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId)
        .map(q => q.id);
    }
    if (unitId === 'unit-8') {
      const num = lessonId.replace('lesson-8-', '').replace('lesson-', '');
      const targetLid = `lesson-${num}`;
      return unit8CoreBank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId || q.lessonId === `lesson-8-${num}`)
        .map(q => q.id);
    }
    if (unitId === 'unit-10') {
      const num = lessonId.replace('lesson-10-', '').replace('lesson-', '');
      const targetLid = `lesson-10-${num}`;
      return unit10Bank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId || q.lessonId === `lesson-${num}`)
        .map(q => q.id);
    }
    if (unitId === 'unit-9') {
      const num = lessonId.replace('lesson-9-', '').replace('lesson-', '');
      const targetLid = `lesson-9-${num}`;
      return unit9Bank
        .filter(q => q.lessonId === targetLid || q.lessonId === lessonId || q.lessonId === `lesson-${num}`)
        .map(q => q.id);
    }
    if (unitId === 'unit-1') {
      const canonicalLesson = CANONICAL_UNIT_1.lessons.find(l => l.id === lessonId);
      if (canonicalLesson?.questionIds && canonicalLesson.questionIds.length > 0) {
        return canonicalLesson.questionIds;
      }
    }
    if (unitId === 'unit-2') {
      const targetLid = lessonId.startsWith('u2-') ? lessonId : `u2-${lessonId}`;
      const canonicalLesson = CANONICAL_UNIT_2.lessons.find(l => l.id === targetLid || l.id === lessonId);
      if (canonicalLesson?.questionIds && canonicalLesson.questionIds.length > 0) {
        return canonicalLesson.questionIds;
      }
    }
    const targetLessonId = (unitId === 'unit-2' && !lessonId.startsWith('u2-'))
      ? `u2-${lessonId}`
      : lessonId;
    return expandedQuestionBank
      .filter(q => (q.unitId === unitId || (!q.unitId && unitId === 'unit-1')) && q.lessonId === targetLessonId)
      .map(q => q.id);
  }

  /**
   * Returns stable, traceable review item IDs for a unit from unitReviewData / unit2ReviewData / unit5ReviewData.
   */
  static getReviewItemIds(unitId: string): string[] {
    return this.getReviewItemIdsForUnit(unitId);
  }

  /**
   * Returns stable, traceable review item IDs for a unit from unitReviewData / unit2ReviewData / unit5ReviewData.
   */
  static getReviewItemIdsForUnit(unitId: string): string[] {
    if (unitId === 'unit-1') {
      return [
        ...unitReviewData.unitOutcomes.map((_, i) => `u1-outcome-${i + 1}`),
        ...unitReviewData.theBigPicture.diagramSteps.map(s => `u1-step-${s.step}`),
        ...unitReviewData.maryamComprehensiveCase.steps.map(s => `maryam-step-${s.step}`),
        ...unitReviewData.commonErrors.map(e => e.id),
        ...unitReviewData.jreScaffoldedSuite.map(j => j.id),
      ];
    }
    if (unitId === 'unit-2') {
      return [
        ...unit2ReviewData.unitOutcomes.map((_, i) => `u2-outcome-${i + 1}`),
        ...unit2ReviewData.theBigPicture.diagramSteps.map(s => `u2-step-${s.step}`),
        ...unit2ReviewData.maryamComprehensiveCase.steps.map(s => `u2-maryam-step-${s.step}`),
        ...unit2ReviewData.commonErrors.map(e => e.id),
        ...unit2ReviewData.jreScaffoldedSuite.map(j => j.id),
      ];
    }
    if (unitId === 'unit-5') {
      return [
        ...unit5ReviewData.unitOutcomes.map((_, i) => `u5-outcome-${i + 1}`),
        ...unit5ReviewData.theBigPicture.diagramSteps.map(s => `u5-step-${s.step}`),
        ...unit5ReviewData.commonErrors.map(e => e.id),
        ...unit5ReviewData.quickCheck.map(q => q.id),
      ];
    }
    if (unitId === 'unit-6') {
      return [
        ...unit6ReviewData.unitOutcomes.map((_, i) => `u6-outcome-${i + 1}`),
        ...unit6ReviewData.theBigPicture.diagramSteps.map(s => `u6-step-${s.step}`),
        ...unit6ReviewData.commonErrors.map(e => e.id),
        ...unit6ReviewData.quickCheck.map(q => q.id),
      ];
    }
    if (unitId === 'unit-7') {
      return [
        ...unit7ReviewData.unitOutcomes.map((_, i) => `u7-outcome-${i + 1}`),
        ...unit7ReviewData.theBigPicture.diagramSteps.map(s => `u7-step-${s.step}`),
        ...unit7ReviewData.commonErrors.map(e => e.id),
        ...unit7ReviewData.jreScaffoldedSuite.map(j => j.id),
      ];
    }
    if (unitId === 'unit-8') {
      return [
        ...unit8ReviewData.unitOutcomes.map((_, i) => `u8-outcome-${i + 1}`),
        ...unit8ReviewData.theBigPicture.diagramSteps.map(s => `u8-step-${s.step}`),
        ...unit8ReviewData.commonErrors.map(e => e.id),
        ...unit8ReviewData.jreScaffoldedSuite.map(j => j.id),
      ];
    }
    if (unitId === 'unit-10') {
      return [
        ...unit10ReviewData.unitOutcomes.map((_, i) => `u10-outcome-${i + 1}`),
        ...unit10ReviewData.theBigPicture.diagramSteps.map(s => `u10-step-${s.step}`),
        ...unit10ReviewData.maryamComprehensiveCase.steps.map(s => `u10-case-step-${s.step}`),
        ...unit10ReviewData.commonErrors.map(e => e.id),
        ...unit10ReviewData.jreScaffoldedSuite.map(j => j.id),
      ];
    }
    if (unitId === 'unit-9') {
      return [
        ...unit9ReviewData.unitOutcomes.map((_, i) => `u9-outcome-${i + 1}`),
        ...unit9ReviewData.theBigPicture.diagramSteps.map(s => `u9-step-${s.step}`),
        ...unit9ReviewData.commonErrors.map(e => e.id),
        ...unit9ReviewData.jreScaffoldedSuite.map(j => j.id),
      ];
    }
    return [];
  }

  /**
   * Evaluates actual presence of legacy exercise and practice elements in the lesson content:
   * solvedExamples, quickChecks, thinkLikeAnAccountantQuestions, realWorldCase, or lessonQuiz.
   */
  static hasLegacyExercises(unitId: string, lessonId: string): boolean {
    const lesson = this.getLegacyLessonContent(unitId, lessonId);
    if (!lesson) return false;
    const solvedCount = lesson.solvedExamples?.length || 0;
    const quickCount = lesson.quickChecks?.length || 0;
    const thinkCount = lesson.thinkLikeAnAccountantQuestions?.length || 0;
    const caseCount = lesson.realWorldCase ? 1 : 0;
    const quizCount = (lesson.lessonQuiz?.mcqs?.length || 0) + 
      (lesson.lessonQuiz?.trueFalse?.length || 0) + 
      (lesson.lessonQuiz?.appliedQuestions?.length || 0);
    return (solvedCount + quickCount + thinkCount + caseCount + quizCount) > 0;
  }

  /**
   * Fetches the legacy unit review data for a given canonical unit ID.
   */
  static getLegacyUnitReview(unitId: string) {
    if (unitId === 'unit-1') return unitReviewData;
    if (unitId === 'unit-2') return unit2ReviewData;
    if (unitId === 'unit-5') return unit5ReviewData;
    if (unitId === 'unit-6') return unit6ReviewData;
    if (unitId === 'unit-7') return unit7ReviewData;
    if (unitId === 'unit-8') return unit8ReviewData;
    if (unitId === 'unit-10') return unit10ReviewData;
    if (unitId === 'unit-9') return unit9ReviewData;
    return null;
  }

  /**
   * Returns the entire traceable question bank (130 questions).
   */
  static getQuestionBank(): TraceableQuestion[] {
    return expandedQuestionBank;
  }

  /**
   * Returns summary statistics for the question bank.
   */
  static getQuestionBankSummary() {
    return questionBankSummary;
  }

  /**
   * Fetches a question by its unique ID.
   */
  static getQuestionById(id: string): TraceableQuestion | undefined {
    return expandedQuestionBank.find(q => q.id === id) || 
      unit3CoreBank.find(q => q.id === id) || 
      unit4CoreBank.find(q => q.id === id) ||
      unit5CoreBank.find(q => q.id === id) ||
      unit6CoreBank.find(q => q.id === id) ||
      unit7CoreBank.find(q => q.id === id) ||
      unit8CoreBank.find(q => q.id === id) ||
      unit9Bank.find(q => q.id === id) ||
      unit10Bank.find(q => q.id === id);
  }

  /**
   * Fetches questions by lesson ID. Supports exact lessonId ('lesson-1', 'u2-lesson-1', etc.).
   */
  static getQuestionsByLesson(lessonId: string): TraceableQuestion[] {
    const legacy = expandedQuestionBank.filter(q => q.lessonId === lessonId);
    if (legacy.length > 0) return legacy;
    const u3 = unit3CoreBank.filter(q => q.lessonId === lessonId);
    if (u3.length > 0) return u3;
    const u4 = unit4CoreBank.filter(q => q.lessonId === lessonId);
    if (u4.length > 0) return u4;
    const u5 = unit5CoreBank.filter(q => q.lessonId === lessonId);
    if (u5.length > 0) return u5;
    const u6 = unit6CoreBank.filter(q => q.lessonId === lessonId);
    if (u6.length > 0) return u6;
    const u7 = unit7CoreBank.filter(q => q.lessonId === lessonId);
    if (u7.length > 0) return u7;
    const u8 = unit8CoreBank.filter(q => q.lessonId === lessonId);
    if (u8.length > 0) return u8;
    const u9 = unit9Bank.filter(q => q.lessonId === lessonId || q.lessonId === `lesson-9-${lessonId.replace('lesson-', '')}` || q.lessonId === `lesson-${lessonId.replace('lesson-9-', '')}`);
    if (u9.length > 0) return u9;
    return unit10Bank.filter(q => q.lessonId === lessonId || q.lessonId === `lesson-10-${lessonId.replace('lesson-', '')}` || q.lessonId === `lesson-${lessonId.replace('lesson-10-', '')}`);
  }

  /**
   * Fetches questions by learning objective ID.
   */
  static getQuestionsByObjective(objectiveId: string): TraceableQuestion[] {
    const legacy = expandedQuestionBank.filter(q => q.learningObjectiveId === objectiveId);
    if (legacy.length > 0) return legacy;
    const u3 = unit3CoreBank.filter(q => q.learningObjectiveId === objectiveId);
    if (u3.length > 0) return u3;
    const u4 = unit4CoreBank.filter(q => q.learningObjectiveId === objectiveId);
    if (u4.length > 0) return u4;
    const u5 = unit5CoreBank.filter(q => q.learningObjectiveId === objectiveId);
    if (u5.length > 0) return u5;
    const u6 = unit6CoreBank.filter(q => q.learningObjectiveId === objectiveId);
    if (u6.length > 0) return u6;
    const u7 = unit7CoreBank.filter(q => q.learningObjectiveId === objectiveId);
    if (u7.length > 0) return u7;
    const u8 = unit8CoreBank.filter(q => q.learningObjectiveId === objectiveId);
    if (u8.length > 0) return u8;
    const u9 = unit9Bank.filter(q => q.learningObjectiveId === objectiveId);
    if (u9.length > 0) return u9;
    return unit10Bank.filter(q => q.learningObjectiveId === objectiveId);
  }

  /**
   * Fetches questions by unit ID ('unit-1' through 'unit-9').
   */
  static getQuestionsByUnit(unitId: string): TraceableQuestion[] {
    if (unitId === 'unit-3') {
      return unit3CoreBank;
    }
    if (unitId === 'unit-4') {
      return unit4CoreBank;
    }
    if (unitId === 'unit-5') {
      return unit5CoreBank;
    }
    if (unitId === 'unit-6') {
      return unit6CoreBank;
    }
    if (unitId === 'unit-7') {
      return unit7CoreBank;
    }
    if (unitId === 'unit-8') {
      return unit8CoreBank;
    }
    if (unitId === 'unit-10') {
      return unit10Bank;
    }
    if (unitId === 'unit-9') {
      return unit9Bank;
    }
    return expandedQuestionBank.filter(q => q.unitId === unitId);
  }

  /**
   * Attempts to extract ReviewItems (which are not yet in Canonical UnitSpec)
   * into a unified format for future mapping.
   */
  static extractCanonicalReviewItems(unitId: string) {
    const reviewData = this.getLegacyUnitReview(unitId);
    if (!reviewData) return [];
    
    const errors = (reviewData as any).commonErrors || [];
    return errors.map((item: any, index: number) => ({
      id: `review-${unitId}-${index + 1}`,
      titleAr: item.mistake || item.title || 'Review Item',
      legacyRef: item
    }));
  }

  /**
   * Synchronizes or validates Concepts between Legacy and Canonical.
   * Legacy has 'whatYouWillLearn', Canonical has 'concepts'.
   */
  static validateConcepts(unitId: string, lessonId: string) {
    const unit = unitId === 'unit-1' ? CANONICAL_UNIT_1 : CANONICAL_UNIT_2;
    const canonicalLesson = unit.lessons.find(l => l.id === lessonId);
    const legacyLesson = this.getLegacyLessonContent(unitId, lessonId);
    
    return {
      canonicalConceptsCount: canonicalLesson?.concepts?.length || 0,
      legacyLearningOutcomesCount: legacyLesson?.whatYouWillLearn?.length || 0,
    };
  }
}
