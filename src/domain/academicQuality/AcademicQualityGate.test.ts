import { describe, expect, it } from 'vitest';
import { academicQualityGate } from './AcademicQualityGate';

describe('M16 AcademicQualityGate', () => {
  it('blocks a question without an answer key', () => {
    const r = academicQualityGate.inspectQuestion({ id:'q1', lessonId:'l1' });
    expect(r.status).toBe('BLOCKED');
    expect(r.hasAnswerKey).toBe(false);
  });
  it('does not invent missing source metadata', () => {
    const r = academicQualityGate.inspectQuestion({ id:'q2', correctAnswer:'A', learningObjectiveId:'LO-1' });
    expect(r.sourceTraceable).toBe(false);
  });
});
