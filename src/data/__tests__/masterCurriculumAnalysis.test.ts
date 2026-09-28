import { describe, it, expect } from 'vitest';
import { 
  allUnitsAnalysisData, 
  masterCurriculumMatchingRows, 
  SupportedAnalysisUnitId 
} from '../masterCurriculumAnalysis';

describe('Methodology Analysis Report & Official Matching Table (100%)', () => {
  const expectedUnitIds: SupportedAnalysisUnitId[] = [
    'unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5',
    'unit-6', 'unit-7', 'unit-8', 'unit-9', 'unit-10'
  ];

  it('covers all 10 units in the master registry with complete data structures', () => {
    expect(Object.keys(allUnitsAnalysisData)).toHaveLength(10);

    for (const unitId of expectedUnitIds) {
      const data = allUnitsAnalysisData[unitId];
      expect(data).toBeDefined();
      expect(data.unitName).toBeTruthy();
      expect(data.sourceReference).toBeTruthy();
      expect(data.lessonsCount).toBeGreaterThanOrEqual(5);
      expect(data.lessons).toHaveLength(data.lessonsCount);
      expect(data.relationalMapDescription).toBeTruthy();
      expect(data.contentMatchingMatrix.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('ensures every lesson has core concepts, target LOs, and acquired skills', () => {
    for (const unitId of expectedUnitIds) {
      const data = allUnitsAnalysisData[unitId];
      for (const lesson of data.lessons) {
        expect(lesson.title).toBeTruthy();
        expect(lesson.sourcePages).toBeTruthy();
        expect(lesson.coreConcepts.length).toBeGreaterThanOrEqual(3);
        expect(lesson.targetLearningOutcomes.length).toBeGreaterThanOrEqual(1);
        expect(lesson.acquiredSkills.length).toBeGreaterThanOrEqual(1);
        expect(lesson.questionTypes.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('ensures 100% verification status in content matching matrices for all 10 units', () => {
    for (const unitId of expectedUnitIds) {
      const data = allUnitsAnalysisData[unitId];
      for (const item of data.contentMatchingMatrix) {
        expect(item.sourceElement).toBeTruthy();
        expect(item.foundInExternalBook).toBeTruthy();
        expect(item.bookSection).toBeTruthy();
        expect(item.exercisesCount).toBeGreaterThan(0);
        expect(item.verificationStatus).toContain('100%');
      }
    }
  });

  it('contains an accredited master curriculum matching table with 10 rows', () => {
    expect(masterCurriculumMatchingRows).toHaveLength(10);
    
    let totalLessons = 0;
    let totalExercises = 0;

    masterCurriculumMatchingRows.forEach((row, idx) => {
      expect(row.unitNum).toBe(idx + 1);
      expect(row.unitId).toBe(expectedUnitIds[idx]);
      expect(row.matchingPercentage).toBe('100%');
      expect(row.accreditationStatus).toContain('معتمد');
      expect(row.pages).toBeTruthy();
      expect(row.jreCaseTitle).toBeTruthy();
      
      totalLessons += row.lessonsCount;
      totalExercises += row.totalExercises;
    });

    // Verify curriculum size
    expect(totalLessons).toBeGreaterThanOrEqual(56);
    expect(totalExercises).toBeGreaterThanOrEqual(400);
  });
});
