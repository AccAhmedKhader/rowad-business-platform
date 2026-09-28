import { MinistryWeekAssessmentData } from '../../../types';
import { WEEK_1_ASSESSMENTS_DATA } from './week1Data';
import { WEEK_2_ASSESSMENTS_DATA } from './week2Data';
import { WEEK_3_ASSESSMENTS_DATA } from './week3Data';
import { WEEK_4_ASSESSMENTS_DATA } from './week4Data';

export const UNIT_1_MINISTRY_ASSESSMENTS: MinistryWeekAssessmentData[] = [
  WEEK_1_ASSESSMENTS_DATA,
  WEEK_2_ASSESSMENTS_DATA,
  WEEK_3_ASSESSMENTS_DATA,
  WEEK_4_ASSESSMENTS_DATA,
];

// Helper calculations for summary stats
export const UNIT_1_SUMMARY_STATS = {
  totalWeeks: 4,
  totalPeriods: 12, // 3 periods per week * 4 weeks
  performancePeriods: 8, // Period 1 and 2 in each of the 4 weeks
  evaluationPeriods: 4, // Period 3 in each of the 4 weeks
  totalClassActivities: 8, // 2 activities per week * 4 weeks = 8
  totalClassActivityQuestions: 12, // 3 detailed analytical sub-questions in Period 2 * 4 weeks = 12
  totalHomeworkQuestions: 40, // 4 weeks * 2 periods * 5 questions = 40
  totalWeeklyModels: 12, // 4 weeks * 3 models (أ, ب, ج)
  totalWeeklyMCQs: 15, // Week 1: 3, Week 2: 3, Week 3: 3, Week 4: 6 (2 per model) = 15
  totalWeeklyWrittenQuestions: 36, // 4 weeks * 3 models * 3 questions = 36
  totalWeeklyEvaluationQuestions: 51, // 15 MCQs + 36 written questions = 51
  totalDirectQuestions: 40 + 15 + 36 + 12, // 103 أسئلة مباشرة
  grandTotalQuestions: 40 + 15 + 36 + 12 + 8, // 111 سؤالاً ومهمة أدائية كاملة بالوحدة الأولى
};
