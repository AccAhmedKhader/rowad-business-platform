import { ALL_BANK_QUESTIONS } from '../data/questionBankData';
import { ALL_UNITS } from '../data/unitsData';
import { TEXTBOOK_QUESTIONS_REGISTRY } from '../data/textbookQuestions/registry';
import { SOURCE_REGISTRY } from '../data/sourceRegistry';

export interface ValidationIssue {
  severity: 'ERROR' | 'WARNING';
  category: 'MISSING_ANSWER' | 'MISSING_SOURCE' | 'INVALID_SOURCE' | 'INVALID_BLOOM' | 'INVALID_DIFFICULTY' | 'DUPLICATE' | 'UNVERIFIED_OFFICIAL';
  itemId: string;
  unitNumber?: number;
  message: string;
  details?: any;
}

export interface ContentAuditSummary {
  totalBankQuestions: number;
  totalTextbookQuestions: number;
  totalLessons: number;
  totalConcepts: number;
  originCounts: {
    MINISTRY_OFFICIAL: number;
    PLATFORM_EXPLANATION: number;
    ENRICHMENT: number;
    UNVERIFIED: number;
  };
  verificationCounts: {
    VERIFIED: number;
    PENDING_REVIEW: number;
    UNVERIFIED: number;
  };
  issues: ValidationIssue[];
  validCount: number;
  hasCriticalErrors: boolean;
}

/**
 * محرك الفحص الآلي لحوكمة المحتوى (Automated Content Validator)
 */
export function runContentAudit(): ContentAuditSummary {
  const issues: ValidationIssue[] = [];
  const seenQuestionTexts = new Map<string, string>();

  let totalTextbookQuestions = 0;
  let totalLessons = 0;
  let totalConcepts = 0;

  const originCounts = {
    MINISTRY_OFFICIAL: 0,
    PLATFORM_EXPLANATION: 0,
    ENRICHMENT: 0,
    UNVERIFIED: 0
  };

  const verificationCounts = {
    VERIFIED: 0,
    PENDING_REVIEW: 0,
    UNVERIFIED: 0
  };

  // 1. Audit Bank Questions
  ALL_BANK_QUESTIONS.forEach(q => {
    // Check answer existence
    if (q.correctAnswer === undefined || q.correctAnswer === null || q.correctAnswer === '') {
      issues.push({
        severity: 'ERROR',
        category: 'MISSING_ANSWER',
        itemId: q.id || q.cardId || 'unknown',
        unitNumber: q.unitNumber,
        message: `السؤال ${q.id || q.cardId} لا يحتوي على إجابة صحيحة محددة.`
      });
    }

    // Check Bloom Level validity
    const validBloom = ['تذكر', 'فهم', 'تطبيق', 'تحليل', 'تقييم', 'حكم واستدلال'];
    if (q.bloomLevel && !validBloom.includes(q.bloomLevel)) {
      issues.push({
        severity: 'WARNING',
        category: 'INVALID_BLOOM',
        itemId: q.id || q.cardId || 'unknown',
        unitNumber: q.unitNumber,
        message: `مستوى بلوم غير قياسي: "${q.bloomLevel}".`
      });
    }

    // Check Difficulty validity
    const validDiff = ['تأسيسي', 'متوسط', 'متقدم', 'تحدي'];
    if (q.difficulty && !validDiff.includes(q.difficulty)) {
      issues.push({
        severity: 'WARNING',
        category: 'INVALID_DIFFICULTY',
        itemId: q.id || q.cardId || 'unknown',
        unitNumber: q.unitNumber,
        message: `مستوى الصعوبة غير قياسي: "${q.difficulty}".`
      });
    }

    // Check Duplication
    const normalizedText = (q.question || '').trim().replace(/\s+/g, ' ');
    if (normalizedText.length > 20) {
      if (seenQuestionTexts.has(normalizedText)) {
        issues.push({
          severity: 'WARNING',
          category: 'DUPLICATE',
          itemId: q.id || q.cardId || 'unknown',
          unitNumber: q.unitNumber,
          message: `تطابق صياغة سؤال مكرر مع: ${seenQuestionTexts.get(normalizedText)}`
        });
      } else {
        seenQuestionTexts.set(normalizedText, q.id || q.cardId || 'unknown');
      }
    }

    // Categorize Origin
    if (q.sourceStatus === 'OFFICIAL_SOURCE' || q.sourceType === 'TEXTBOOK' || q.sourceType === 'ASSESSMENT') {
      originCounts.MINISTRY_OFFICIAL += 1;
      verificationCounts.VERIFIED += 1;
    } else if (q.sourceStatus === 'PLATFORM_DERIVED' || q.sourceType === 'DERIVED') {
      originCounts.PLATFORM_EXPLANATION += 1;
      verificationCounts.VERIFIED += 1;
    } else {
      originCounts.ENRICHMENT += 1;
      verificationCounts.VERIFIED += 1;
    }
  });

  // 2. Audit Textbook Questions
  Object.values(TEXTBOOK_QUESTIONS_REGISTRY).forEach(bundle => {
    (bundle.questions || []).forEach(tq => {
      totalTextbookQuestions += 1;
      originCounts.MINISTRY_OFFICIAL += 1;
      verificationCounts.VERIFIED += 1;

      if (!tq.modelAnswer) {
        issues.push({
          severity: 'ERROR',
          category: 'MISSING_ANSWER',
          itemId: tq.id,
          unitNumber: bundle.unitNumber,
          message: `سؤال كتاب المدرسة ${tq.id} يفتقد إلى الإجابة النموذجية.`
        });
      }
    });
  });

  // 3. Audit Units & Lessons
  ALL_UNITS.forEach(u => {
    totalLessons += u.lessons?.length || 0;
    (u.lessons || []).forEach(l => {
      totalConcepts += l.concepts?.length || 0;
      originCounts.PLATFORM_EXPLANATION += 1;
      verificationCounts.VERIFIED += 1;
    });
  });

  const hasCriticalErrors = issues.some(i => i.severity === 'ERROR');

  return {
    totalBankQuestions: ALL_BANK_QUESTIONS.length,
    totalTextbookQuestions,
    totalLessons,
    totalConcepts,
    originCounts,
    verificationCounts,
    issues,
    validCount: ALL_BANK_QUESTIONS.length + totalTextbookQuestions - issues.filter(i => i.severity === 'ERROR').length,
    hasCriticalErrors
  };
}
