import { MinistryWeekAssessmentData } from '../../../types';
import { WEEK_1_ASSESSMENTS_DATA } from './week1Data';
import { WEEK_2_ASSESSMENTS_DATA } from './week2Data';
import { WEEK_3_ASSESSMENTS_DATA } from './week3Data';

export const UNIT_4_MINISTRY_ASSESSMENTS: MinistryWeekAssessmentData[] = [
  WEEK_1_ASSESSMENTS_DATA,
  WEEK_2_ASSESSMENTS_DATA,
  WEEK_3_ASSESSMENTS_DATA,
];

// Helper calculations for summary stats for Unit 4
export const UNIT_4_SUMMARY_STATS = {
  totalWeeks: 3,
  totalPeriods: 9, // 3 periods per week * 3 weeks
  performancePeriods: 6, // Period 1 and 2 in each of the 3 weeks
  evaluationPeriods: 3, // Period 3 in each of the 3 weeks
  totalClassActivities: 6, // 2 activities per week * 3 weeks = 6
  totalClassActivityQuestions: 9, // 3 analytical questions across activities
  totalHomeworkQuestions: 30, // 3 weeks * 10 questions = 30
  totalWeeklyModels: 9, // 3 weeks * 3 models (أ, ب, ج)
  totalWeeklyMCQs: 9, // 1 MCQ per model * 9 models = 9
  totalWeeklyWrittenQuestions: 21, // written and JRE questions in models
  totalWeeklyEvaluationQuestions: 30, // 9 MCQs + 21 written questions = 30
  totalDirectQuestions: 30 + 9 + 21 + 9, // 69 direct questions
  grandTotalQuestions: 30 + 9 + 21 + 9 + 6, // 75 total tasks and questions
};

export { WEEK_1_ASSESSMENTS_DATA, WEEK_2_ASSESSMENTS_DATA, WEEK_3_ASSESSMENTS_DATA };
