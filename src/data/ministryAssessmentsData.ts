import { CANONICAL_MASTER_ASSESSMENTS } from './canonicalMasterAssessments';

export interface MinistryAssessmentItem {
  question_id: string;
  canonical_id?: string;
  legacy_id?: string;
  source_page: number;
  source_type: 'أدائي' | 'تقييم';
  text_match_status?: 'HIGH' | 'PARTIAL' | 'WEAK';
  week: string;
  period: string;
  question_text: string;
  required: string;
  answer: string;
  solution_path: string[];
  reasoning: string;
  official_unit: string;
  official_unit_id: string;
  official_lesson: string;
  official_lesson_id: string;
  official_concept: string;
  LO: string;
  sub_LO?: string;
  skill: string;
  bloom: 'تذكر' | 'فهم' | 'تطبيق' | 'تحليل' | 'تقويم' | 'ابتكار' | (string & {});
  canonical_bloom?: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
  difficulty: 'أساسي' | 'متوسط' | 'متقدم' | 'تحدي' | (string & {});
  canonical_difficulty?: 'Basic' | 'Intermediate' | 'Advanced';
  assessment_type?: string;
  official_source_file?: string;
  cross_unit_repetition?: { related_qid: string; similarity: string; note: string };
  answer_key_audit?: string;
  answer_key?: string;
  options?: { label: string; text: string; isCorrect: boolean; rationale?: string }[];
  tables?: { headers: string[]; rows: string[][] };
  calculation_audit?: { formula: string; result: string };
}

export const ALL_MINISTRY_ASSESSMENTS: MinistryAssessmentItem[] = CANONICAL_MASTER_ASSESSMENTS;

export const MINISTRY_ASSESSMENTS_DATA: MinistryAssessmentItem[] = ALL_MINISTRY_ASSESSMENTS;

export const MINISTRY_PERFORMANCE_ITEMS = ALL_MINISTRY_ASSESSMENTS.filter(
  item => item.source_type === 'أدائي'
);

export const MINISTRY_EVALUATION_ITEMS = ALL_MINISTRY_ASSESSMENTS.filter(
  item => item.source_type === 'تقييم'
);
