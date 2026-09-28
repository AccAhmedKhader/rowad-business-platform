import { MinistryWeekAssessmentData } from '../../types';
import { UNIT_1_MINISTRY_ASSESSMENTS, UNIT_1_SUMMARY_STATS } from './unit1';
import { UNIT_2_MINISTRY_ASSESSMENTS, UNIT_2_SUMMARY_STATS } from './unit2';
import { UNIT_3_MINISTRY_ASSESSMENTS, UNIT_3_SUMMARY_STATS } from './unit3';
import { UNIT_4_MINISTRY_ASSESSMENTS, UNIT_4_SUMMARY_STATS } from './unit4';
import { UNIT_5_MINISTRY_ASSESSMENTS, UNIT_5_SUMMARY_STATS } from './unit5';
import { UNIT_6_MINISTRY_ASSESSMENTS, UNIT_6_SUMMARY_STATS } from './unit6';
import { UNIT_7_MINISTRY_ASSESSMENTS, UNIT_7_SUMMARY_STATS } from './unit7';
import { UNIT_8_MINISTRY_ASSESSMENTS, UNIT_8_SUMMARY_STATS } from './unit8';
import { UNIT_9_MINISTRY_ASSESSMENTS, UNIT_9_SUMMARY_STATS } from './unit9';
import { UNIT_10_MINISTRY_ASSESSMENTS, UNIT_10_SUMMARY_STATS } from './unit10';

export interface UnitAssessmentSummaryStats {
  totalWeeks: number;
  totalPeriods: number;
  performancePeriods: number;
  evaluationPeriods: number;
  totalClassActivities: number;
  totalClassActivityQuestions: number;
  totalHomeworkQuestions: number;
  totalWeeklyModels: number;
  totalWeeklyMCQs: number;
  totalWeeklyWrittenQuestions: number;
  totalWeeklyEvaluationQuestions: number;
  totalDirectQuestions: number;
  grandTotalQuestions: number;
}

export interface UnitAssessmentBundle {
  unitNumber: number;
  unitTitle: string;
  assessments: MinistryWeekAssessmentData[];
  stats: UnitAssessmentSummaryStats;
}

export const UNIT_ASSESSMENTS_REGISTRY: Record<number, UnitAssessmentBundle> = {
  1: {
    unitNumber: 1,
    unitTitle: "مفهوم منظمة الأعمال وخلق القيمة",
    assessments: UNIT_1_MINISTRY_ASSESSMENTS,
    stats: UNIT_1_SUMMARY_STATS,
  },
  2: {
    unitNumber: 2,
    unitTitle: "أنواع منظمات الأعمال",
    assessments: UNIT_2_MINISTRY_ASSESSMENTS,
    stats: UNIT_2_SUMMARY_STATS,
  },
  3: {
    unitNumber: 3,
    unitTitle: "أهداف منظمات الأعمال وأصحاب المصلحة",
    assessments: UNIT_3_MINISTRY_ASSESSMENTS,
    stats: UNIT_3_SUMMARY_STATS,
  },
  4: {
    unitNumber: 4,
    unitTitle: "البيئة الداخلية والخارجية لمنظمات الأعمال",
    assessments: UNIT_4_MINISTRY_ASSESSMENTS,
    stats: UNIT_4_SUMMARY_STATS,
  },
  5: {
    unitNumber: 5,
    unitTitle: "الريادة والابتكار وتأسيس المشروعات",
    assessments: UNIT_5_MINISTRY_ASSESSMENTS,
    stats: UNIT_5_SUMMARY_STATS,
  },
  6: {
    unitNumber: 6,
    unitTitle: "التسويق",
    assessments: UNIT_6_MINISTRY_ASSESSMENTS,
    stats: UNIT_6_SUMMARY_STATS,
  },
  7: {
    unitNumber: 7,
    unitTitle: "إدارة العمليات والإنتاج",
    assessments: UNIT_7_MINISTRY_ASSESSMENTS,
    stats: UNIT_7_SUMMARY_STATS,
  },
  8: {
    unitNumber: 8,
    unitTitle: "إدارة الموارد البشرية",
    assessments: UNIT_8_MINISTRY_ASSESSMENTS,
    stats: UNIT_8_SUMMARY_STATS,
  },
  9: {
    unitNumber: 9,
    unitTitle: "التمويل وأداء الأعمال",
    assessments: UNIT_9_MINISTRY_ASSESSMENTS,
    stats: UNIT_9_SUMMARY_STATS,
  },
  10: {
    unitNumber: 10,
    unitTitle: "الاستراتيجية والتحليل واتخاذ القرار",
    assessments: UNIT_10_MINISTRY_ASSESSMENTS,
    stats: UNIT_10_SUMMARY_STATS,
  },
};

export function getUnitAssessmentData(unitNumber: number): UnitAssessmentBundle | undefined {
  return UNIT_ASSESSMENTS_REGISTRY[unitNumber];
}

export function hasUnitAssessmentData(unitNumber: number): boolean {
  return !!UNIT_ASSESSMENTS_REGISTRY[unitNumber];
}

export function getTotalAssessmentQuestionsCount(): number {
  return Object.values(UNIT_ASSESSMENTS_REGISTRY).reduce(
    (sum, bundle) => sum + (bundle.stats.grandTotalQuestions || 0),
    0
  );
}

// Re-exports for convenience
export { UNIT_1_MINISTRY_ASSESSMENTS, UNIT_1_SUMMARY_STATS } from './unit1';
export { UNIT_2_MINISTRY_ASSESSMENTS, UNIT_2_SUMMARY_STATS } from './unit2';
export { UNIT_3_MINISTRY_ASSESSMENTS, UNIT_3_SUMMARY_STATS } from './unit3';
export { UNIT_4_MINISTRY_ASSESSMENTS, UNIT_4_SUMMARY_STATS } from './unit4';
export { UNIT_5_MINISTRY_ASSESSMENTS, UNIT_5_SUMMARY_STATS } from './unit5';
export { UNIT_6_MINISTRY_ASSESSMENTS, UNIT_6_SUMMARY_STATS } from './unit6';
export { UNIT_7_MINISTRY_ASSESSMENTS, UNIT_7_SUMMARY_STATS } from './unit7';
export { UNIT_8_MINISTRY_ASSESSMENTS, UNIT_8_SUMMARY_STATS } from './unit8';
export { UNIT_9_MINISTRY_ASSESSMENTS, UNIT_9_SUMMARY_STATS } from './unit9';
export { UNIT_10_MINISTRY_ASSESSMENTS, UNIT_10_SUMMARY_STATS } from './unit10';

