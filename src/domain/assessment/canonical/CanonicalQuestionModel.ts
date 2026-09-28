/**
 * CANONICAL ASSESSMENT QUESTION MODEL
 * Platform: المحاسبة ببساطة وإتقان — بكالوريا مصر 2027
 * Specification: Phase 4.1 — Canonical Question Architecture
 */

export type QuestionLifecycleStatus =
  | 'RAW'                    // Stored question without academic or structural verification
  | 'STRUCTURALLY_VALID'     // Stem, options, correct answer syntax valid
  | 'ACADEMIC_REVIEW'        // Flagged for content review (e.g. placeholder answer, scaffold header)
  | 'ACADEMIC_VALIDATED'     // Verified curriculum mapping, LO, Bloom, Concept & Source
  | 'EXAM_ELIGIBLE'          // Certified for high-stakes examinations and mock tests
  | 'REJECTED'               // Failed verification or invalid
  | 'RETIRED';               // Deprecated question replaced by newer version

export type DuplicateClassification =
  | 'UNIQUE'                 // Distinct question with no identical stems or answers
  | 'SAFE_VARIANT'           // Valid pedagogical variant (different numbers, same concept)
  | 'REDUNDANT'              // Conceptual redundancy needing consolidation
  | 'DUPLICATE'              // Exact stem & answer duplicate
  | 'REVIEW_REQUIRED';       // Flagged scaffold or potential copy

export type GradingMode =
  | 'AUTO_EXACT'             // Strict equality (MCQ, True/False)
  | 'AUTO_NUMERIC'           // Numeric tolerance
  | 'AUTO_STRUCTURED'        // Journal entry, T-account, financial statement
  | 'AUTO_ORDERING'          // Ordering / Matching
  | 'RUBRIC'                 // Multi-criteria analytical rubric (JRE)
  | 'MANUAL_REVIEW';         // Teacher grading required

export type QuestionType =
  | 'mcq'
  | 'true_false'
  | 'numerical'
  | 'applied'
  | 'case'
  | 'case_study'
  | 'concept'
  | 'analytical'
  | 'jre'
  | 'jre_essay'
  | 't_account'
  | 'fill_blank';

export type BloomLevel =
  | 'remember'
  | 'understand'
  | 'apply'
  | 'analyze'
  | 'evaluate'
  | 'create';

export type DifficultyLevel =
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'challenge';

export interface QuestionOption {
  id: string;
  text: string;
  orderIndex: number;
  isCorrect?: boolean;
}

export interface SourceProvenance {
  source_id: string;
  source_document: string;
  source_page: number;
  source_section?: string;
  source_version: string;
  content_hash: string;
  is_verified_against_textbook: boolean;
}

export interface AcademicMapping {
  unit_id: string;
  lesson_id: string;
  concept_id: string;
  learning_objective_id: string;
  learning_objective_code?: string;
  bloom_level: BloomLevel;
  difficulty: DifficultyLevel;
  mapping_confidence: 'VERIFIED_EXACT' | 'DERIVED' | 'NEEDS_REVIEW' | 'UNMAPPED';
}

export interface AnswerKeyVerification {
  correct_answer: any;
  answer_key_hash: string;
  is_verified: boolean;
  has_distractor_parity: boolean;
  explanation: string;
  verification_date: string;
  verified_by: string;
}

export interface AssessmentCharacteristics {
  grading_mode: GradingMode;
  max_score: number;
  rubric_version?: string;
  exam_eligibility: boolean;
  exam_ineligibility_reasons?: string[];
  requires_human_eval: boolean;
}

export interface CanonicalQuestion {
  canonical_id: string;
  version: number;
  original_ids: string[];
  
  // Content Identity
  stem: string;
  options?: QuestionOption[];
  question_type: QuestionType;
  tags: string[];

  // Source Provenance
  provenance: SourceProvenance;

  // Academic Identity
  academic_mapping: AcademicMapping;

  // Answer & Verification
  answer_verification: AnswerKeyVerification;

  // Assessment & Grading
  assessment: AssessmentCharacteristics;

  // Lifecycle & Integrity
  lifecycle_status: QuestionLifecycleStatus;
  duplicate_classification: DuplicateClassification;
  integrity_hash: string;

  created_at: string;
  updated_at: string;
}

/**
 * Reason codes dictionary for Academic Validation & Exam Eligibility (Phase 4.2)
 */
export const REASON_CODES = {
  SRC_001: 'SRC-001: Missing source provenance document or page',
  CUR_001: 'CUR-001: Missing curriculum unit mapping',
  LES_001: 'LES-001: Missing lesson mapping',
  CON_001: 'CON-001: Missing conceptual alignment',
  LO_001: 'LO-001: Missing learning objective mapping or marked UNMAPPED',
  ANS_001: 'ANS-001: Answer key is completely missing or empty',
  ANS_002: 'ANS-002: Question stem is identical to answer key',
  CALC_001: 'CALC-001: Numerical calculation contradiction or invalid format',
  MCQ_001: 'MCQ-001: Multiple choice item has fewer than 2 options',
  MCQ_002: 'MCQ-002: Declared answer does not match any multiple choice distractor',
  MCQ_003: 'MCQ-003: Multiple choice item contains duplicate distractors',
  EXP_001: 'EXP-001: Explanation is contradictory or missing',
  BLM_001: 'BLM-001: Invalid or unmapped Bloom cognitive level',
  DIF_001: 'DIF-001: Invalid difficulty level',
  LAN_001: 'LAN-001: Significant language defect or ambiguity',
  PED_001: 'PED-001: Stem is a heading fragment, glossary, or non-interrogative prompt',
  DUP_001: 'DUP-001: Duplicate or redundant item classified in duplicate family',
  DUP_002: 'DUP-002: Normalized stem duplicate',
  RED_001: 'RED-001: Conceptual redundancy with no independent evaluation value',
  PH_001: 'PH-001: Placeholder or scaffold question requiring curriculum authoring',
  OOS_001: 'OOS-001: Content outside the official Egyptian Baccalaureate 2027 curriculum',
  RUB_001: 'RUB-001: Essay/JRE question lacks formal grading rubric'
} as const;

/**
 * Validates whether a Canonical Question fulfills the strict criteria for EXAM_ELIGIBLE.
 * In Phase 4.2, eligibility cannot be granted if ANY blocking gate fails.
 */
export function evaluateExamEligibility(q: Partial<CanonicalQuestion>): {
  isEligible: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  const stem = (q.stem || '').trim();

  // 1. Stem sufficiency & Pedagogical form
  if (!stem || stem.length < 12) {
    reasons.push(REASON_CODES.PED_001 + ': نص رأس السؤال قصير جداً أو مفقود (أقل من 12 حرفاً).');
  }

  // Detect non-interrogative fragments / glossary / truncated stems
  if (
    stem.startsWith('مسرد المصطلحات') ||
    stem === 'الغرض من قائمة الدخل' ||
    stem === 'سبب احتساب الإهلاك' ||
    stem === 'فائدة حسابات المراقبة' ||
    stem === 'سبب مخصص الديون المشكوك فيها'
  ) {
    reasons.push(REASON_CODES.PED_001 + ': رأس السؤال يمثل عنواناً أو فقرة مسردية وليس سؤالاً تقييمياً قابلاً للامتحان.');
  }

  // 2. Answer key completeness
  const rawAns = q.answer_verification?.correct_answer;
  const ansStr = rawAns !== undefined && rawAns !== null ? String(rawAns).trim() : '';

  if (rawAns === undefined || rawAns === null || (typeof rawAns === 'string' && ansStr.length === 0)) {
    reasons.push(REASON_CODES.ANS_001 + ': مفتاح الإجابة النموذجية مفقود أو فارغ.');
  }

  // Stem == Answer (fatal authoring artifact)
  if (stem === ansStr) {
    reasons.push(REASON_CODES.ANS_002 + ': نص السؤال مطابق تماماً للإجابة النموذجية (تلف صياغي).');
  }

  // 3. Placeholder answer check
  if (
    ansStr.startsWith('تطبيق محاسبي معتمد ضمن') ||
    stem.startsWith('(ص ') ||
    stem.includes('تطبيقات معلقة متتالية') ||
    (typeof rawAns === 'string' && ansStr.length < 4 && rawAns !== 'صح' && rawAns !== 'خطأ')
  ) {
    reasons.push(REASON_CODES.PH_001 + ': الإجابة المسجلة هي نص نائبي (Placeholder) وتتطلب مراجعة أكاديمية متخصصة.');
  }

  // 4. MCQ Option validation
  if (q.question_type === 'mcq') {
    if (!q.options || q.options.length < 2) {
      reasons.push(REASON_CODES.MCQ_001 + ': سؤال اختيار من متعدد يحتوي على أقل من خيارين.');
    } else {
      const optionTexts = q.options.map(opt => opt.text.trim());
      const match = optionTexts.some(optText => optText === ansStr);
      if (!match) {
        reasons.push(REASON_CODES.MCQ_002 + ': الإجابة الصحيحة غير مطابقة لأي خيار من الخيارات المطروحة.');
      }
    }
  }

  // 5. Academic Mapping
  if (!q.academic_mapping) {
    reasons.push(REASON_CODES.CUR_001 + ': الربط الأكاديمي مفقود بالكامل.');
  } else {
    if (!q.academic_mapping.unit_id || q.academic_mapping.unit_id === 'UNKNOWN') {
      reasons.push(REASON_CODES.CUR_001 + ': الوحدة الدراسية غير محددة.');
    }
    if (!q.academic_mapping.lesson_id || q.academic_mapping.lesson_id === 'UNKNOWN') {
      reasons.push(REASON_CODES.LES_001 + ': الدرس الأكاديمي غير محدد.');
    }
    if (
      !q.academic_mapping.learning_objective_id ||
      q.academic_mapping.learning_objective_id === 'UNMAPPED'
    ) {
      reasons.push(REASON_CODES.LO_001 + ': ناتج التعلم الأكاديمي (Learning Objective) غير مربوط أو مصنف كـ UNMAPPED.');
    }
  }

  // 6. Source Provenance
  if (!q.provenance?.source_document || !q.provenance?.source_page) {
    reasons.push(REASON_CODES.SRC_001 + ': مصدر السؤال أو رقم الصفحة مفقود.');
  }

  // 7. Duplicate & Scaffold status
  if (q.duplicate_classification === 'DUPLICATE' || q.duplicate_classification === 'REDUNDANT') {
    reasons.push(REASON_CODES.DUP_001 + ': السؤال مكرر أو زائد عن الحاجة وتم تصنيفه للمراجعة.');
  }

  // 8. Rubric validation for JRE
  if ((q.question_type === 'jre' || q.question_type === 'jre_essay') && (!q.assessment?.rubric_version || q.assessment.rubric_version === 'NONE')) {
    reasons.push(REASON_CODES.RUB_001 + ': السؤال المقالي/الاستدلالي يفتقر إلى روبرك تصحيح معتمد.');
  }

  return {
    isEligible: reasons.length === 0,
    reasons
  };
}
