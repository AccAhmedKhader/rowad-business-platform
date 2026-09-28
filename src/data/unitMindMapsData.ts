/**
 * بيانات الخرائط الذهنية الشاملة للوحدات (Unit Master Mind Maps Data)
 * تربط الصورة الكبرى للوحدات بالدروس ونواتج التعلم والتدريبات والاختبارات
 * لبكالوريا مصر 2027 — المحاسبة ببساطة وإتقان
 */

import { MIND_MAP_UNITS, MindMapUnit, MindMapLesson } from './mindMaps';
import { unitReviewData } from './unitReviewData';
import { unit2ReviewData } from './unit2ReviewData';
import { unit3ReviewData } from './unit3ReviewData';
import { unit4ReviewData } from './unit4ReviewData';
import { unit5ReviewData } from './unit5ReviewData';
import { unit6ReviewData } from './unit6ReviewData';
import { unit7ReviewData } from './unit7ReviewData';
import { unit8ReviewData } from './unit8ReviewData';
import { unit9ReviewData } from './unit9ReviewData';
import { unit10ReviewData } from './unit10ReviewData';
import { curriculumRegistry } from '../domain/curriculum/CurriculumRegistry';

export interface UnitOutcomeBinding {
  subLo: string;
  bloomLevel: string;
  description: string;
  targetQuestionsCount?: number;
  lessonId?: string;
  difficulty?: string;
}

export interface UnitLessonBinding {
  id: string;
  no: number;
  title: string;
  subtitle: string;
  enrich?: boolean;
  progressionStage: string;
  keyConcepts: string[];
  outcomes: UnitOutcomeBinding[];
  questionCount: number;
  lessonUrl: string;
  exercisesUrl: string;
  toolKey?: string;
  toolLabel?: string;
}

export interface UnitMasterMindMap {
  unitId: string;
  unitNumber: number;
  bookPageNumber: number;
  label: string;
  title: string;
  edition: string;
  bigIdea: string;
  essentialQuestion: string;
  realWorldHook: {
    story: string;
    connection: string;
  };
  lessons: UnitLessonBinding[];
  outcomes: UnitOutcomeBinding[];
  goldenRules: string[];
  examTraps: {
    title: string;
    error: string;
    correction: string;
    why?: string;
  }[];
  solveGuide: string[];
  jreEssayPrompt: {
    title: string;
    prompt: string;
    rubricHighlights: string[];
  };
  interactiveTools: {
    key: string;
    name: string;
    path: string;
    description: string;
  }[];
  assessment: {
    totalUnitQuestions: number;
    unitTestUrl: string;
    questionBankUrl: string;
    mockExamUrl: string;
  };
}

/* أرقام صفحات بداية خرائط الوحدات في الكتاب المطبوع */
export const UNIT_BOOK_PAGES: Record<string, number> = {
  'unit-1': 2,
  'unit-2': 10,
  'unit-3': 18,
  'unit-4': 26,
  'unit-5': 34,
  'unit-6': 42,
  'unit-7': 50,
  'unit-8': 58,
  'unit-9': 66,
  'unit-10': 74,
};

const UNIT_REVIEW_MAP: Record<string, any> = {
  'unit-1': unitReviewData,
  'unit-2': unit2ReviewData,
  'unit-3': unit3ReviewData,
  'unit-4': unit4ReviewData,
  'unit-5': unit5ReviewData,
  'unit-6': unit6ReviewData,
  'unit-7': unit7ReviewData,
  'unit-8': unit8ReviewData,
  'unit-9': unit9ReviewData,
  'unit-10': unit10ReviewData,
};

/* أدوات ومحاكيات كل وحدة */
const UNIT_TOOLS_MAP: Record<string, { key: string; name: string; path: string; description: string }[]> = {
  'unit-1': [
    { key: 'simulators', name: 'محاكي حسابات الأستاذ وميزان المراجعة', path: '/training/simulators', description: 'توليد قيود وبناء حسابات T واستخراج الميزان آلياً' },
    { key: 'jre', name: 'استوديو مقال التقييم المالي JRE', path: '/training/jre', description: 'تدريب منهجي على صياغة الحجج وتقييم موثوقية القوائم' },
    { key: 'exercises', name: 'ورشة التدريبات والمسائل التطبيقية', path: '/training/exercises', description: 'مسائل متدرجة من الأساسيات حتى المستوى المتقدم' }
  ],
  'unit-2': [
    { key: 'documentary-cycle', name: 'محاكي الدورة المستندية ومصادر القيد', path: '/training/documentary-cycle', description: 'تتبع المستند من الفاتورة والإيصال وحتى دفتر اليومية' },
    { key: 'simulators', name: 'محاكي منطق المدين والدائن (T-Account)', path: '/training/simulators', description: 'التدريب التفاعلي على فئات الحسابات الخمس وأثر العمليات' },
    { key: 'exercises', name: 'تدريبات التسجيل والترصيد', path: '/training/exercises', description: 'تطبيقات عملية على اليومية والأستاذ' }
  ],
  'unit-3': [
    { key: 'simulators', name: 'محاكي دفاتر اليومية المساعدة وحسابات المراقبة', path: '/training/simulators', description: 'تقسيم العمل والربط بين الدفاتر المساعدة والدفتر العام' },
    { key: 'exercises', name: 'تدريبات مطابقة موازين المراجعة المساعدة', path: '/training/exercises', description: 'الرقابة المزدوجة ومطابقة الأرصدة الإجمالية والتفصيلية' }
  ],
  'unit-4': [
    { key: 'error-correction', name: 'معمل تصحيح الأخطاء المحاسبية والحساب المعلق', path: '/training/error-correction', description: 'اكتشاف الأخطاء التي تخل بالتوازن وتلك التي لا تخل، وقيود التصحيح' },
    { key: 'exercises', name: 'مسائل ميزان المراجعة بالمجاميع والأرصدة', path: '/training/exercises', description: 'اختبار دقة التوازن وتطبيق الحساب المعلق' }
  ],
  'unit-5': [
    { key: 'simulators', name: 'محاكي إعداد القوائم المالية للمنشأة الفردية', path: '/training/simulators', description: 'بناء قائمة الدخل وقائمة المركز المالي وفق المعايير' },
    { key: 'jre', name: 'استوديو تقييم الأداء المالي والسيولة', path: '/training/jre', description: 'تحليل هامش الربح والمركز المالي بمقال مالي متوازن' }
  ],
  'unit-6': [
    { key: 'error-correction', name: 'معمل السجلات غير المكتملة وطريقة رأس المال', path: '/training/error-correction', description: 'تحديد نتيجة النشاط في المنشآت الصغيرة والرقابة المحاسبية' },
    { key: 'exercises', name: 'تدريبات كشف الاختلاسات وفحص الفواتير', path: '/training/exercises', description: 'تقنيات الرقابة الداخلية وإعادة تركيب الحسابات' }
  ],
  'unit-7': [
    { key: 'simulators', name: 'محاكي طرق الإهلاك واستبعاد الأصول الثابتة', path: '/training/simulators', description: 'مقارنة القسط الثابت والمتناقص وأثر البيع والاستبدال' },
    { key: 'exercises', name: 'تدريبات مخصصات الديون المشكوك فيها والالتزامات', path: '/training/exercises', description: 'حساب مخصص الديون المعدومة والتسويات الجردية' }
  ],
  'unit-8': [
    { key: 'simulators', name: 'محاكي شركات التضامن وتوزيع الأرباح والخسائر', path: '/training/simulators', description: 'حساب توزيع الأرباح، مكافأة الشريك، وفائدة رأس المال' },
    { key: 'exercises', name: 'تدريبات انضمام وانفصال شريك وتصفية الشركة', path: '/training/exercises', description: 'إعادة التقدير وتعديل حقوق الشركاء' }
  ],
  'unit-9': [
    { key: 'simulators', name: 'محاكي إصدار الأسهم والسندات في شركات المساهمة', path: '/training/simulators', description: 'معالجة الاكتتاب، أقساط الأسهم، وعلاوة الإصدار' },
    { key: 'exercises', name: 'تدريبات توزيعات الأرباح والاحتياطيات النظامية', path: '/training/exercises', description: 'توزيع الأرباح على المساهمين وتكوين الاحتياطي القانوني' }
  ],
  'unit-10': [
    { key: 'capstone', name: 'كابستون التحليل المالي والمفاضلة الاستثمارية', path: '/training/capstone', description: 'دراسة حالة أمير: المفاضلة الشاملة بين شركتين بالنسب المالية' },
    { key: 'jre', name: 'استوديو القرار المالي والمقال الاستقصائي (20 درجة)', path: '/training/jre', description: 'صياغة التقرير الاستثماري وتفسير نسب السيولة والربحية' }
  ]
};

/**
 * تجميع الخريطة الذهنية الشاملة المتكاملة لأي وحدة من الوحدات العشر
 */
export function getUnitMasterMindMap(unitSlugOrNum: string | number): UnitMasterMindMap {
  const num = typeof unitSlugOrNum === 'number' 
    ? unitSlugOrNum 
    : Number(String(unitSlugOrNum).replace(/\D+/g, '')) || 1;
  const unitId = `unit-${num}`;

  const mmUnit = MIND_MAP_UNITS.find((u) => u.n === num) || MIND_MAP_UNITS[0];
  const rev = UNIT_REVIEW_MAP[unitId] || unitReviewData;
  const canonicalUnit = curriculumRegistry.getUnitById(unitId);

  // استخراج نواتج التعلم
  const rawOutcomes = rev.unitOutcomes || [];
  const outcomes: UnitOutcomeBinding[] = rawOutcomes.map((lo: any) => ({
    subLo: lo.subLo,
    bloomLevel: lo.bloomLevel || 'الفهم والتطبيق',
    description: lo.description,
    difficulty: lo.bloomLevel?.includes('تقويم') || lo.bloomLevel?.includes('تحليل') ? 'advanced' : 'intermediate',
  }));

  // استخراج خطوات التقدم المعرفي في الوحدة
  const diagramSteps = rev.theBigPicture?.diagramSteps || [];

  // ربط كل درس ببياناته التفصيلية
  const lessons: UnitLessonBinding[] = mmUnit.lessons.map((l: MindMapLesson, idx: number) => {
    const matchingStep = diagramSteps[idx] || diagramSteps.find((s: any) => s.step === l.no);
    const specLesson = canonicalUnit?.lessons.find((sl) => sl.lessonNumber === l.no);

    // مفاهيم الدرس الأساسية من فروع خريطة الدرس
    const keyConcepts = l.map.b.map((b) => b.t).slice(0, 4);

    // نواتج التعلم المرتبطة بالدرس
    const lessonOutcomes = specLesson?.objectives?.map((obj) => ({
      subLo: obj.code,
      bloomLevel: obj.taxonomy === 'Analyze' ? 'تحليل' : obj.taxonomy === 'Evaluate' ? 'تقويم' : 'تطبيق',
      description: obj.titleAr,
      targetQuestionsCount: obj.questionIds?.length || 4,
      lessonId: l.id,
      difficulty: obj.targetDifficulty,
    })) || outcomes.slice(idx * 2, idx * 2 + 2);

    // أداة تفاعلية مقترحة للدرس
    const defaultTools = UNIT_TOOLS_MAP[unitId] || [];
    const tool = defaultTools[idx % defaultTools.length];

    return {
      id: l.id,
      no: l.no,
      title: l.title,
      subtitle: l.sub || (matchingStep ? matchingStep.detail : ''),
      enrich: l.enrich,
      progressionStage: matchingStep ? matchingStep.title : `الدرس ${l.no}: البناء المنهجي`,
      keyConcepts: keyConcepts.length > 0 ? keyConcepts : ['المفاهيم المحاسبية', 'التطبيق العملي', 'الرقابة'],
      outcomes: lessonOutcomes,
      questionCount: specLesson?.questionIds?.length || 12,
      lessonUrl: `/curriculum/unit-${num}/lessons/lesson-${l.no}`,
      exercisesUrl: `/training/exercises?unit=${unitId}&lesson=${l.id}`,
      toolKey: tool?.key,
      toolLabel: tool?.name,
    };
  });

  // فخاخ الامتحان الشائعة
  const commonErrors = rev.commonErrors || [];
  const examTraps = commonErrors.slice(0, 5).map((e: any) => ({
    title: e.title || 'فخ تطبيقي شائع',
    error: e.error || e.mistake || '',
    correction: e.correction || e.correct || '',
    why: e.why || '',
  }));

  // القواعد الجوهرية المستخلصة من دروس الوحدة
  const goldenRules: string[] = [];
  mmUnit.lessons.forEach((l) => {
    if (l.map.rules && l.map.rules.length > 0) {
      goldenRules.push(...l.map.rules);
    }
  });
  const uniqueRules = Array.from(new Set(goldenRules)).slice(0, 5);
  if (uniqueRules.length === 0) {
    uniqueRules.push(
      'توازن المعادلة المحاسبية مستمر بعد كل معاملة مالية دون استثناء.',
      'تساوي ميزان المراجعة شرط ضروري لصحة الأرقام ولكنه ليس دليلاً قاطعاً على خلوها من الأخطاء.',
      'أساس الاستحقاق يفصل بين تحقق الإيراد والمصروف وبين واقعة السداد أو القبض النقدي.',
      'التحليل المالي يربط الأرقام بالسياق الاقتصادي ولا يقدم أحكاماً قطعية منفصلة.'
    );
  }

  // دليل الحل السريع ومقال JRE
  const solveGuide = [
    'حدد أطراف المعاملة الثلاثة: ما الذي دخل؟ ما الذي خرج؟ وما طبيعة الحساب؟',
    'اختبر توازن القيد: إجمالي الجانب المدين = إجمالي الجانب الدائن بدقة.',
    'صنف الخطأ فوراً: هل يؤثر على توازن الميزان (حساب معلق) أم خطأ توجيه متكافئ؟',
    'في مقال JRE: اذكر الحجة المؤيدة بالأرقام، ثم الحجة المضادة بالقيود، ثم التقييم الرصين.'
  ];

  // سؤال مقال JRE
  const jrePrompt = rev.jreScaffoldedSuite?.[0] || {
    title: 'مقال التفسير والتقييم المالي JRE (20 درجة)',
    prompt: `ناقش القضية المالية الجوهرية للوحدة ${num}: هل تكفي الأرقام المحاسبية وحدها لاتخاذ القرار؟ وما هي حدود وموثوقية المعلومات المالية؟`,
    rubric: ['استخدام المصطلحات المحاسبية بدقة', 'موازنة الحجج والقيود', 'إصدار حكم تقييمي مدعوم بالأدلة']
  };

  const interactiveTools = UNIT_TOOLS_MAP[unitId] || [
    { key: 'exercises', name: 'ورشة التدريبات التطبيقية', path: '/training/exercises', description: 'تمارين تفاعلية متدرجة' },
    { key: 'simulators', name: 'محاكيات المحاسبة الشاملة', path: '/training/simulators', description: 'محاكاة القيود والأرصدة' }
  ];

  const totalQuestions = lessons.reduce((sum, l) => sum + l.questionCount, 0);

  return {
    unitId,
    unitNumber: num,
    bookPageNumber: UNIT_BOOK_PAGES[unitId] || (num * 8 - 6),
    label: mmUnit.label,
    title: mmUnit.title,
    edition: rev.edition || 'Master Template Edition 2.0 — بكالوريا 2027',
    bigIdea: rev.theBigPicture?.bigIdea || 'المحاسبة نظام معلومات متكامل يترجم الأحداث المالية إلى قرارات استراتيجية موثوقة.',
    essentialQuestion: rev.theBigPicture?.essentialQuestion || 'كيف يرتقي الطالب من إتقان العمليات اليومية إلى بناء القوائم والتفسير المالي المعمق؟',
    realWorldHook: rev.theBigPicture?.realWorldHook || {
      story: 'دراسة حالة واقعية تربط معاملات المشروع بالدورة المحاسبية الكاملة.',
      connection: 'الانتقال المنهجي من المفهوم إلى التطبيق والرقابة ثم التحليل.'
    },
    lessons,
    outcomes,
    goldenRules: uniqueRules,
    examTraps,
    solveGuide,
    jreEssayPrompt: {
      title: jrePrompt.title || 'مقال التقييم المالي والتحليل الاستقصائي',
      prompt: jrePrompt.prompt || 'صياغة مقال مالي متوازن مدعوم بالأدلة المحاسبية.',
      rubricHighlights: jrePrompt.rubric || ['الدقة الاصطلاحية', 'التوازن الموضوعي', 'التقييم المستند للأدلة']
    },
    interactiveTools,
    assessment: {
      totalUnitQuestions: totalQuestions > 0 ? totalQuestions : 65,
      unitTestUrl: `/assessment/unit-tests`,
      questionBankUrl: `/assessment/question-bank`,
      mockExamUrl: `/assessment/mock-exams`,
    }
  };
}
