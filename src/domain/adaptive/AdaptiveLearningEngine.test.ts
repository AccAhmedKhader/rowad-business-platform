import { describe, expect, it } from 'vitest';
import { adaptiveLearningEngine } from './AdaptiveLearningEngine';

describe('M17 AdaptiveLearningEngine', () => {
  it('prioritizes weak lessons for review', () => {
    const p = adaptiveLearningEngine.buildPlan({ userId:'s1', lessons:[{id:'l1'}], attempts:[
      {lesson_id:'l1',is_correct:false},{lesson_id:'l1',is_correct:false},{lesson_id:'l1',is_correct:true}
    ]});
    expect(p.steps[0].action).toBe('REVIEW_LESSON');
  });
});
