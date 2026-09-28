import { SourceRecord, ContentOrigin } from '../types';

/**
 * سجل المصادر المركزي المعتمد لمنصة رواد الأعمال (البكالوريا المصرية 2027)
 * Central Educational Source Registry
 * 
 * يمنع منعاً باتاً تصنيف أي محتوى بأنه "وزاري رسمي" ما لم يكن مرتبطاً بـ SourceRecord موثق هنا.
 */
export const SOURCE_REGISTRY: Record<string, SourceRecord> = {
  // -------------------------------------------------------------
  // 1. الوثائق والمصادر الوزارية المعتمدة (MINISTRY_OFFICIAL)
  // -------------------------------------------------------------
  'SRC-MOE-TB-PART1': {
    id: 'SRC-MOE-TB-PART1',
    title: 'كتاب الطالب في إدارة الأعمال — الجزء الأول (الوحدات 1 - 5)',
    type: 'MINISTRY_OFFICIAL',
    authority: 'المناهج الدراسية المقررة — مادة إدارة الأعمال',
    unit: '1-5',
    section: 'المنهج الدراسي المعتمد للصف الثاني الثانوي - مسار البكالوريا المصرية',
    sourceFile: 'Ministry_Business_Studies_Grade11_Part1_2026_2027.pdf',
    sourceVersion: 'طبعة 2026 / 2027 الرسمية',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-01',
    notes: 'النص الأصلي المعتمد لمفاهيم الوحدات (1: طبيعة الأعمال، 2: أشكال الملكية، 3: الأهداف وأصحاب المصلحة، 4: بيئة الأعمال وPESTEL، 5: الإدارة والقيادة).'
  },

  'SRC-MOE-TB-PART2': {
    id: 'SRC-MOE-TB-PART2',
    title: 'كتاب الطالب في إدارة الأعمال — الجزء الثاني (الوحدات 6 - 10)',
    type: 'MINISTRY_OFFICIAL',
    authority: 'المناهج الدراسية المقررة — مادة إدارة الأعمال',
    unit: '6-10',
    section: 'المنهج الدراسي المعتمد للصف الثاني الثانوي - مسار البكالوريا المصرية',
    sourceFile: 'Ministry_Business_Studies_Grade11_Part2_2026_2027.pdf',
    sourceVersion: 'طبعة 2026 / 2027 الرسمية',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-01',
    notes: 'المصدر الرسمي للوحدات المتقدمة (6: التسويق والمزيج التسويقي، 7: العمليات والإنتاج، 8: الموارد البشرية، 9: المالية والمحاسبة، 10: خطة العمل).'
  },

  'SRC-MOE-ASSESS-U01': {
    id: 'SRC-MOE-ASSESS-U01',
    title: 'كراسة الأداءات الصفية والواجبات والتقييمات الأسبوعية — الوحدة الأولى',
    type: 'MINISTRY_OFFICIAL',
    authority: 'الإدارة المركزية لتطوير المناهج — قطاع التعليم العام',
    unit: 1,
    page: '1-14',
    section: 'التقييمات الأسبوعية التراكمية (الأسابيع 1 - 4)',
    sourceFile: 'Ministry_Assessments_Business_Unit1.pdf',
    sourceVersion: 'إصدار العام الدراسي 2026 / 2027',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-05',
    notes: 'تتضمن الأداءات الصفية والمنزلية والتقييم الأسبوعي بنماذجه المعتمدة الثلاثة (أ، ب، ج).'
  },

  'SRC-MOE-ASSESS-U02': {
    id: 'SRC-MOE-ASSESS-U02',
    title: 'كراسة الأداءات الصفية والواجبات والتقييمات الأسبوعية — الوحدة الثانية',
    type: 'MINISTRY_OFFICIAL',
    authority: 'الإدارة المركزية لتطوير المناهج — قطاع التعليم العام',
    unit: 2,
    page: '1-16',
    section: 'التقييمات الأسبوعية التراكمية (الأسابيع 1 - 4)',
    sourceFile: 'Ministry_Assessments_Business_Unit2.pdf',
    sourceVersion: 'إصدار العام الدراسي 2026 / 2027',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-05',
    notes: 'تتضمن الأداءات الصفية والمنزلية والتقييم الأسبوعي بنماذجه المعتمدة الثلاثة (أ، ب، ج).'
  },

  'SRC-MOE-ASSESS-U03': {
    id: 'SRC-MOE-ASSESS-U03',
    title: 'كراسة الأداءات الصفية والواجبات والتقييمات الأسبوعية — الوحدة الثالثة',
    type: 'MINISTRY_OFFICIAL',
    authority: 'الإدارة المركزية لتطوير المناهج — قطاع التعليم العام',
    unit: 3,
    page: '1-15',
    section: 'التقييمات الأسبوعية التراكمية (الأسابيع 1 - 4)',
    sourceFile: 'Ministry_Assessments_Business_Unit3.pdf',
    sourceVersion: 'إصدار العام الدراسي 2026 / 2027',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-05',
    notes: 'تتضمن الأداءات الصفية والمنزلية والتقييم الأسبوعي بنماذجه المعتمدة الثلاثة (أ، ب، ج).'
  },

  'SRC-MOE-ASSESS-U04': {
    id: 'SRC-MOE-ASSESS-U04',
    title: 'كراسة الأداءات الصفية والواجبات والتقييمات الأسبوعية — الوحدة الرابعة',
    type: 'MINISTRY_OFFICIAL',
    authority: 'الإدارة المركزية لتطوير المناهج — قطاع التعليم العام',
    unit: 4,
    page: '1-16',
    section: 'التقييمات الأسبوعية التراكمية (الأسابيع 1 - 4)',
    sourceFile: 'Ministry_Assessments_Business_Unit4.pdf',
    sourceVersion: 'إصدار العام الدراسي 2026 / 2027',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-05',
    notes: 'تتضمن الأداءات الصفية والمنزلية والتقييم الأسبوعي بنماذجه المعتمدة الثلاثة (أ، ب، ج).'
  },

  'SRC-MOE-FRAMEWORK-2027': {
    id: 'SRC-MOE-FRAMEWORK-2027',
    title: 'الإطار المنهجي المعتمد ومصفوفة نواتج التعلم لنظام البكالوريا 2027',
    type: 'MINISTRY_OFFICIAL',
    authority: 'المركز القومي لتطوير المناهج — قطاع التعليم الثانوي والبكالوريا',
    section: 'مواصفات الورقة الامتحانية وتوزيع درجات أعمال السنة (40% أداءات + 60% اختبار فصلي)',
    sourceFile: 'Egyptian_Baccalaureate_Business_Framework_2027.pdf',
    sourceVersion: 'الوثيقة التوجيهية الأولى',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-08-20',
    notes: 'المرجع الرسمي لتوزيع درجات أعمال السنة وتوجيهات بناء أسئلة التقييم المستمر.'
  },

  // -------------------------------------------------------------
  // 2. شروحات وتحليلات المنصة التربوية (PLATFORM_EXPLANATION)
  // -------------------------------------------------------------
  'SRC-PLAT-PEDAGOGY': {
    id: 'SRC-PLAT-PEDAGOGY',
    title: 'التنظيم البيداغوجي وسلاسل خلق القيمة وبطاقات التعلّم',
    type: 'PLATFORM_EXPLANATION',
    authority: 'فريق التطوير التربوي والديداكتيكي — منصة رواد الأعمال',
    sourceFile: 'src/data/unitsData.ts',
    sourceVersion: 'v2.1',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-15',
    notes: 'إعادة صياغة وتنظيم معرفي لمفاهيم المقرر لتسهيل استيعاب الطلاب وتوفير محطات تفكير وقرار تفاعلية مستندة للمصادر الوزارية.'
  },

  'SRC-PLAT-JRE-GUIDE': {
    id: 'SRC-PLAT-JRE-GUIDE',
    title: 'دليل ومختبر كتابة مقال الحكم والاستدلال (JRE) وفق مقياس الـ 20 درجة',
    type: 'PLATFORM_EXPLANATION',
    authority: 'خبراء التقييم التربوي وبكالوريا الأعمال بالمنصة',
    sourceFile: 'src/data/jreGuideData.ts',
    sourceVersion: 'v1.5',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-18',
    notes: 'نموذج تدريبي بنائي يفكك سؤال الـ 20 درجة إلى 5 أركان استدلالية. هو روبرك تدريبي من تصميم المنصة مسترشد بالمعايير التربوية المعاصرة.'
  },

  'SRC-PLAT-GLOSSARY': {
    id: 'SRC-PLAT-GLOSSARY',
    title: 'قاموس المصطلحات والمفاهيم الإدارية الميسر',
    type: 'PLATFORM_EXPLANATION',
    authority: 'المكتب الفني للمحتوى الرقمي بالمنصة',
    sourceFile: 'src/data/glossaryData.ts',
    sourceVersion: 'v1.8',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-10',
    notes: 'شرح مبسط وتوضيح الفروق الدقيقة بين المصطلحات الإدارية المتشابهة لتجنب الخلط المفاهيمي.'
  },

  // -------------------------------------------------------------
  // 3. التدريبات والأنشطة الإثرائية للمنصة (ENRICHMENT)
  // -------------------------------------------------------------
  'SRC-PLAT-BANK-MCQ': {
    id: 'SRC-PLAT-BANK-MCQ',
    title: 'بنك الأسئلة التدريبي المتقدم — أسئلة الاختيار من متعدد وتحليل المشتتات',
    type: 'ENRICHMENT',
    authority: 'وحدة القياس والتقويم بالمنصة بالتعاون مع أساتذة إدارة الأعمال',
    sourceFile: 'src/data/questionBanks/*.ts',
    sourceVersion: 'v3.0',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-20',
    notes: 'أسئلة تدريبية تأهيلية جديدة تحاكي نواتج التعلم المستهدفة، مزودة بتحليل لكل مشتت وتبرير منهجي مفصل.'
  },

  'SRC-PLAT-BANK-NUMERICAL': {
    id: 'SRC-PLAT-BANK-NUMERICAL',
    title: 'المسائل الحسابية والتطبيقات الرقمية ومسارات الاستدلال المالي',
    type: 'ENRICHMENT',
    authority: 'وحدة النمذجة المالية والرياضيات التطبيقية بالمنصة',
    sourceFile: 'src/data/questionBanks/*.ts',
    sourceVersion: 'v2.4',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-20',
    notes: 'تطبيقات ومسائل رقمية حسابية (نقطة التعادل، القوائم المالية، هوامش الربح، حصص الشركاء) من إعداد المنصة لتعميق الفهم الحسابي.'
  },

  'SRC-PLAT-EGYPTIAN-CASES': {
    id: 'SRC-PLAT-EGYPTIAN-CASES',
    title: 'دراسات الحالة التطبيقية المستوحاة من واقع السوق وبيئة الأعمال المصرية',
    type: 'ENRICHMENT',
    authority: 'لجنة دراسات الحالة وأبحاث السوق بالمنصة',
    sourceFile: 'src/components/IntegrativeCasesView.tsx',
    sourceVersion: 'v2.0',
    verificationStatus: 'VERIFIED',
    verifiedAt: '2026-09-12',
    notes: 'سيناريوهات تدريبية واقعية تحاكي الشركات العائلية، ريادة الأعمال الشبابية، التحول الرقمي، وسلاسل الإمداد في مصر.'
  },

  // -------------------------------------------------------------
  // 4. المحتوى قيد المراجعة أو غير الموثق (UNVERIFIED / PENDING_REVIEW)
  // -------------------------------------------------------------
  'SRC-EXTERNAL-SUPPLEMENT': {
    id: 'SRC-EXTERNAL-SUPPLEMENT',
    title: 'إضافات إثرائية خارجية قيد التدقيق التوثيقي',
    type: 'UNVERIFIED',
    authority: 'مساهمات خارجية ومسودات تدريبية',
    sourceFile: 'draft_notes.md',
    sourceVersion: 'v0.1',
    verificationStatus: 'PENDING_REVIEW',
    verifiedAt: '2026-09-22',
    notes: 'محتوى تجريبي يخضع حالياً لتدقيق فريق التوثيق للتأكد من ملاءمته الدقيقة لنواتج التعلم الوزارية.'
  }
};

/**
 * الحصول على كائن المصدر عبر معرفه
 */
export function getSourceById(sourceId?: string): SourceRecord | undefined {
  if (!sourceId) return undefined;
  return SOURCE_REGISTRY[sourceId];
}

/**
 * الحصول على كافة المصادر المسجلة
 */
export function getAllSources(): SourceRecord[] {
  return Object.values(SOURCE_REGISTRY);
}

/**
 * جلب المصادر حسب نوع التصنيف (وزاري رسمي، شرح منصة، تدريب إثرائي، غير موثق)
 */
export function getSourcesByType(type: ContentOrigin): SourceRecord[] {
  return Object.values(SOURCE_REGISTRY).filter(s => s.type === type);
}

/**
 * بيانات العرض الموحدة لشارات التصنيف
 */
export interface ContentOriginMeta {
  origin: ContentOrigin;
  label: string;
  shortLabel: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  description: string;
  authorityHint: string;
}

export function getContentOriginMeta(origin: ContentOrigin): ContentOriginMeta {
  switch (origin) {
    case 'MINISTRY_OFFICIAL':
      return {
        origin: 'MINISTRY_OFFICIAL',
        label: 'وزاري رسمي موثق',
        shortLabel: 'وزاري رسمي',
        badgeBg: 'bg-emerald-50 text-emerald-900',
        badgeText: 'text-emerald-800',
        badgeBorder: 'border-emerald-300',
        dotColor: 'bg-emerald-500',
        description: 'محتوى أو سؤال أو نشاط مأخوذ مباشرة وبشكل موثق من المصادر الرسمية لكتاب الوزارة وكراسات التقييم المعتمدة.',
        authorityHint: 'صادر عن الهيئات ولجان المناهج والتقويم التربوي المعتمدة'
      };
    case 'PLATFORM_EXPLANATION':
      return {
        origin: 'PLATFORM_EXPLANATION',
        label: 'شرح المنصة التربوي',
        shortLabel: 'شرح المنصة',
        badgeBg: 'bg-sky-50 text-sky-900',
        badgeText: 'text-sky-800',
        badgeBorder: 'border-sky-300',
        dotColor: 'bg-sky-500',
        description: 'تبسيط، تحليل، تنظيم بيداغوجي، أو خارطة مفاهيمية أعدها الفريق التربوي للمنصة تيسيراً للطلاب اعتماداً على المنهج.',
        authorityHint: 'إعداد فريق التطوير التربوي بالمنصة'
      };
    case 'ENRICHMENT':
      return {
        origin: 'ENRICHMENT',
        label: 'تدريب إثرائي ومحاكاة',
        shortLabel: 'تدريب إثرائي',
        badgeBg: 'bg-purple-50 text-purple-900',
        badgeText: 'text-purple-800',
        badgeBorder: 'border-purple-300',
        dotColor: 'bg-purple-500',
        description: 'سؤال جديد، أو مسألة حسابية، أو دراسة حالة تطبيقية، أو نموذج تقييم مصمم خصيصاً من المنصة لرفع كفاءة الطالب.',
        authorityHint: 'تصميم وبنك أسئلة منصة رواد الأعمال'
      };
    case 'UNVERIFIED':
    default:
      return {
        origin: 'UNVERIFIED',
        label: 'محتوى غير موثق / قيد المراجعة',
        shortLabel: 'غير موثق',
        badgeBg: 'bg-slate-100 text-slate-800',
        badgeText: 'text-slate-700',
        badgeBorder: 'border-slate-300',
        dotColor: 'bg-slate-400',
        description: 'محتوى إرشادي لا يملك حتى الآن رابطاً توثيقياً مؤكداً بمرجع وزاري، ويخضع للمراجعة الأكاديمية.',
        authorityHint: 'قيد التدقيق الأكاديمي الداخلي'
      };
  }
}

/**
 * تحديد الأصل التلقائي لأي كائن إذا لم يكن محددًا صراحة
 */
export function inferContentOrigin(item: {
  sourceType?: string;
  sourceStatus?: string;
  contentOrigin?: ContentOrigin;
  sourceId?: string;
}): ContentOrigin {
  if (item.contentOrigin) {
    return item.contentOrigin;
  }
  if (item.sourceId && SOURCE_REGISTRY[item.sourceId]) {
    return SOURCE_REGISTRY[item.sourceId].type;
  }
  if (item.sourceStatus === 'OFFICIAL_SOURCE' || item.sourceType === 'TEXTBOOK' || item.sourceType === 'ASSESSMENT') {
    return 'MINISTRY_OFFICIAL';
  }
  if (item.sourceStatus === 'PLATFORM_DERIVED' || item.sourceType === 'DERIVED') {
    return 'PLATFORM_EXPLANATION';
  }
  if (item.sourceType === 'BANK') {
    return 'ENRICHMENT';
  }
  return 'UNVERIFIED';
}
