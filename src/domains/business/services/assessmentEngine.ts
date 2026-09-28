import { 
  AssessmentQuizDefinition, 
  AssessmentDiagnosticResult, 
  BankQuestion, 
  ContentOrigin 
} from '../types';
import { ALL_BANK_QUESTIONS } from '../data/questionBankData';
import { lmsService } from './lmsService';

/**
 * Creates or retrieves a standard unit diagnostic quiz.
 * Selects representative questions covering Bloom levels and learning objectives.
 */
export function generateUnitAssessment(unitNumber: number): AssessmentQuizDefinition {
  const unitCode = `U${String(unitNumber).padStart(2, '0')}`;
  
  // Filter questions for this unit from the question bank
  const unitQuestions = ALL_BANK_QUESTIONS.filter(q => q.unitNumber === unitNumber);
  
  // Pick up to 10 balanced questions across Bloom levels
  const selectedQuestions: BankQuestion[] = [];
  const bloomTargets = ['تذكر', 'فهم', 'تطبيق', 'تحليل', 'تقييم'];
  
  bloomTargets.forEach(bloom => {
    const matching = unitQuestions.filter(q => q.bloomLevel?.includes(bloom) || q.bloomLevel === bloom);
    if (matching.length > 0) {
      selectedQuestions.push(matching[0]);
      if (matching.length > 1 && selectedQuestions.length < 10) {
        selectedQuestions.push(matching[1]);
      }
    }
  });

  // Fill up to 10 questions if we have fewer
  if (selectedQuestions.length < 10) {
    for (const q of unitQuestions) {
      if (!selectedQuestions.find(sq => sq.id === q.id)) {
        selectedQuestions.push(q);
        if (selectedQuestions.length >= 10) break;
      }
    }
  }

  // Extract unique learning objectives
  const loSet = new Set<string>();
  selectedQuestions.forEach(q => {
    if (q.learningOutcome) loSet.add(q.learningOutcome);
    if (q.lessonTitle) loSet.add(q.lessonTitle);
  });

  return {
    id: `ASSESS-${unitCode}-DIAG`,
    unitId: unitCode,
    unitNumber,
    title: `الاختبار التشخيصي للوحدة ${unitNumber}`,
    description: `اختبار قياس نواتج التعلم ومستويات التفكير للوحدة ${unitNumber} وفق المعايير المنهجية.`,
    durationMinutes: 20,
    attemptsAllowed: 3,
    scoringPolicy: 'highest',
    sourceType: 'PLATFORM_EXPLANATION' as ContentOrigin,
    sourceId: `ASSESS_ENG_${unitCode}`,
    learningObjectives: Array.from(loSet),
    questions: selectedQuestions.length > 0 ? selectedQuestions : unitQuestions.slice(0, 8)
  };
}

/**
 * Evaluates an assessment submission, computes diagnostic metrics, and updates LMS.
 */
export function evaluateAssessment(
  assessment: AssessmentQuizDefinition,
  userAnswers: Record<string, number>
): AssessmentDiagnosticResult {
  let totalPoints = assessment.questions.length;
  let earnedScore = 0;

  const bloomStats: Record<string, { correct: number; total: number }> = {};
  const loStats: Record<string, { correct: number; total: number; concept: string }> = {};

  assessment.questions.forEach(q => {
    const bloom = q.bloomLevel || 'فهم';
    if (!bloomStats[bloom]) {
      bloomStats[bloom] = { correct: 0, total: 0 };
    }
    bloomStats[bloom].total += 1;

    const lo = q.learningOutcome || `نواتج الوحدة ${q.unitNumber}`;
    const concept = q.lessonTitle || `الدرس ${q.lessonNumber || 1}`;
    if (!loStats[lo]) {
      loStats[lo] = { correct: 0, total: 0, concept };
    }
    loStats[lo].total += 1;

    const selectedOption = userAnswers[q.id];
    const isCorrect: boolean = Boolean(
      selectedOption !== undefined && (
        selectedOption === Number(q.correctAnswer) ||
        (q.options && q.options[selectedOption] === q.correctAnswer)
      )
    );

    if (isCorrect) {
      earnedScore += 1;
      bloomStats[bloom].correct += 1;
      loStats[lo].correct += 1;
    }

    // Record to LMS service so student mastery model updates live
    if (selectedOption !== undefined) {
      lmsService.recordQuestionAnswer({
        questionId: q.id,
        unitNumber: q.unitNumber,
        loId: lo,
        isCorrect,
        selectedAnswer: selectedOption,
        bloomLevel: bloom,
        difficulty: q.difficulty
      });
    }
  });

  const percentage = totalPoints > 0 ? Math.round((earnedScore / totalPoints) * 100) : 0;

  // Identify weak learning objectives (accuracy < 60%)
  const weakLOs: string[] = [];
  const conceptsToReview: string[] = [];

  Object.entries(loStats).forEach(([lo, stats]) => {
    const acc = stats.correct / stats.total;
    if (acc < 0.6) {
      weakLOs.push(lo);
      if (stats.concept && !conceptsToReview.includes(stats.concept)) {
        conceptsToReview.push(stats.concept);
      }
    }
  });

  // Generate qualitative diagnostic feedback instead of a dry number
  const qualitativeFeedback = generateQualitativeFeedback(percentage, bloomStats);

  // Generate actionable study recommendations
  const recommendedActions: string[] = [];
  if (weakLOs.length > 0) {
    recommendedActions.push(`مراجعة الدروس الخاصة بـ: ${weakLOs.slice(0, 2).join(' و ')} من كتاب الطالب.`);
  }
  if (bloomStats['تحليل'] && (bloomStats['تحليل'].correct / bloomStats['تحليل'].total) < 0.6) {
    recommendedActions.push('التدرب على تفكيك دراسات الحالة وتحليل المشتتات في بنك الأسئلة.');
  }
  if (bloomStats['تقييم'] && (bloomStats['تقييم'].correct / bloomStats['تقييم'].total) < 0.6) {
    recommendedActions.push('دخول مختبر الحكم والاستدلال (JRE Lab) للتمرن على صياغة الحجج المنطقية ومقارنة البدائل.');
  }
  if (recommendedActions.length === 0) {
    recommendedActions.push('مستوى متقدم ومتميز! انتقل للوحدة التالية أو تدرب على أسئلة التحدي في بنك الأسئلة.');
  }

  // Update overall progress exam score in LMS
  try {
    const progress = lmsService.getProgress();
    const newTestHistory = [
      ...(progress.testScores || []),
      {
        assessmentId: assessment.id,
        unitId: assessment.unitId,
        score: earnedScore,
        total: totalPoints,
        percentage,
        date: new Date().toISOString()
      }
    ];
    localStorage.setItem('ent_student_test_scores', JSON.stringify(newTestHistory));
  } catch {
    // Graceful fallback
  }

  return {
    score: earnedScore,
    totalPoints,
    percentage,
    bloomPerformance: bloomStats,
    weakLearningObjectives: weakLOs,
    conceptsToReview,
    qualitativeFeedback,
    recommendedActions
  };
}

/**
 * Builds pedagogically grounded feedback comparing thinking levels.
 */
function generateQualitativeFeedback(
  percentage: number,
  bloomStats: Record<string, { correct: number; total: number }>
): string {
  const getRate = (bloom: string) => {
    const stat = bloomStats[bloom];
    return stat && stat.total > 0 ? stat.correct / stat.total : null;
  };

  const applyRate = getRate('تطبيق');
  const analyzeRate = getRate('تحليل');
  const evalRate = getRate('تقييم');
  const rememberRate = getRate('تذكر');
  const understandRate = getRate('فهم');

  const strengths: string[] = [];
  const needsWork: string[] = [];

  if (rememberRate !== null && rememberRate >= 0.75) strengths.push('استرجاع المفاهيم الأساسية والمصطلحات');
  if (understandRate !== null && understandRate >= 0.75) strengths.push('استيعاب العلاقات الإدارية');
  if (applyRate !== null && applyRate >= 0.75) strengths.push('التطبيق العملي وحل المشكلات التشغيلية');
  if (analyzeRate !== null && analyzeRate >= 0.75) strengths.push('التحليل النقدي والمقارنة');
  if (evalRate !== null && evalRate >= 0.75) strengths.push('إصدار الأحكام والاستدلال');

  if (applyRate !== null && applyRate < 0.6) needsWork.push('التطبيق على المواقف المستحدثة');
  if (analyzeRate !== null && analyzeRate < 0.6) needsWork.push('التحليل واستنباط العلاقات المعقدة');
  if (evalRate !== null && evalRate < 0.6) needsWork.push('التقييم والمفاضلة الرشيدة بين البدائل');

  if (percentage >= 85) {
    let text = 'أداء استثنائي ينم عن استيعاب مفاهيمي متين وقدرة عالية على الاستدلال.';
    if (needsWork.length > 0) {
      text += ` مع حاجة خفيفة لتعزيز ${needsWork.join(' و ')}.`;
    }
    return text;
  } else if (percentage >= 65) {
    let text = 'أداؤك إيجابي وجيد؛ ';
    if (strengths.length > 0) {
      text += `أظهرت قوة ملحوظة في ${strengths.join(' و ')}، `;
    }
    if (needsWork.length > 0) {
      text += `بينما تحتاج إلى تدريب إضافي وتركيز على ${needsWork.join(' و ')}.`;
    } else {
      text += 'مع إمكانية الوصول إلى مستوى الإتقان الكامل بمزيد من التدريب.';
    }
    return text;
  } else {
    let text = 'بداية مقبولة تتطلب مراجعة منهجية وتأسيسًا أعمق للمفاهيم الأساسية. ';
    if (needsWork.length > 0) {
      text += `ينبغي التركيز فورًا على علاج نقاط الضعف في ${needsWork.join(' و ')}.`;
    }
    return text;
  }
}
