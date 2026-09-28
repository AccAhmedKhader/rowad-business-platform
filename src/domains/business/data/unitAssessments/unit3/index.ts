import { MinistryWeekAssessmentData } from '../../../types';
import { WEEK_1_ASSESSMENTS_DATA } from './week1Data';
import { WEEK_2_ASSESSMENTS_DATA } from './week2Data';
import { WEEK_3_ASSESSMENTS_DATA } from './week3Data';

export const UNIT_3_MINISTRY_ASSESSMENTS: MinistryWeekAssessmentData[] = [
  WEEK_1_ASSESSMENTS_DATA,
  WEEK_2_ASSESSMENTS_DATA,
  WEEK_3_ASSESSMENTS_DATA,
];

// Helper calculations for summary stats for Unit 3
export const UNIT_3_SUMMARY_STATS = {
  totalWeeks: 3,
  totalPeriods: 9, // 3 periods per week * 3 weeks
  performancePeriods: 6, // Period 1 and 2 in each of the 3 weeks
  evaluationPeriods: 3, // Period 3 in each of the 3 weeks
  totalClassActivities: 6, // 2 activities per week * 3 weeks = 6
  totalClassActivityQuestions: 9, // 3 analytical questions in Period 2 of each week = 9
  totalHomeworkQuestions: 30, // 3 weeks * 2 periods * 5 questions = 30
  totalWeeklyModels: 9, // 3 weeks * 3 models (أ, ب, ج)
  totalWeeklyMCQs: 9, // 1 MCQ per model * 9 models = 9
  totalWeeklyWrittenQuestions: 27, // 3 written questions per model (including JRE) * 9 models = 27
  totalWeeklyEvaluationQuestions: 36, // 9 MCQs + 27 written questions = 36
  totalDirectQuestions: 30 + 9 + 27 + 9, // 75 أسئلة مباشرة
  grandTotalQuestions: 30 + 9 + 27 + 9 + 6, // 81 سؤالاً ومهمة أدائية كاملة بالوحدة الثالثة
};

export { WEEK_1_ASSESSMENTS_DATA, WEEK_2_ASSESSMENTS_DATA, WEEK_3_ASSESSMENTS_DATA };
