import { MinistryWeekAssessmentData } from '../../../types';
import { WEEK_1_ASSESSMENTS_DATA } from './week1Data';
import { WEEK_2_ASSESSMENTS_DATA } from './week2Data';
import { WEEK_3_ASSESSMENTS_DATA } from './week3Data';
import { WEEK_4_ASSESSMENTS_DATA } from './week4Data';

export const UNIT_2_MINISTRY_ASSESSMENTS: MinistryWeekAssessmentData[] = [
  WEEK_1_ASSESSMENTS_DATA,
  WEEK_2_ASSESSMENTS_DATA,
  WEEK_3_ASSESSMENTS_DATA,
  WEEK_4_ASSESSMENTS_DATA,
];

// Helper calculations for summary stats for Unit 2
export const UNIT_2_SUMMARY_STATS = {
  totalWeeks: 4,
  totalPeriods: 12, // 3 periods per week * 4 weeks
  performancePeriods: 8, // Period 1 and 2 in each of the 4 weeks
  evaluationPeriods: 4, // Period 3 in each of the 4 weeks
  totalClassActivities: 8, // 2 activities per week * 4 weeks = 8
  totalClassActivityQuestions: 8,
  totalHomeworkQuestions: 51,
  totalWeeklyModels: 10,
  totalWeeklyMCQs: 10,
  totalWeeklyWrittenQuestions: 29,
  totalWeeklyEvaluationQuestions: 39,
  totalDirectQuestions: 87,
  grandTotalQuestions: 95, // 26 (القسم الأول) + 26 (القسم الثاني) + 26 (القسم الثالث) + 17 (ملحق الشهر الأول) = 95 سجلاً كاملاً
};

export { WEEK_1_ASSESSMENTS_DATA, WEEK_2_ASSESSMENTS_DATA, WEEK_3_ASSESSMENTS_DATA, WEEK_4_ASSESSMENTS_DATA };
