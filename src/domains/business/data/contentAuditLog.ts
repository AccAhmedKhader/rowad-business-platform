export interface ContentAuditLogEntry {
  id: string;
  timestamp: string;
  editor: string;
  role: string;
  itemType: 'QUESTION' | 'LESSON' | 'RUBRIC' | 'ASSESSMENT' | 'GLOSSARY';
  itemId: string;
  unitNumber?: number;
  changeDescription: string;
  previousSource?: string;
  newSource: string;
  reason: string;
  verificationStatus: 'VERIFIED' | 'PENDING_REVIEW';
}

export interface CurriculumVersion {
  version: string;
  releaseDate: string;
  title: string;
  academicYear: string;
  changesSummary: string[];
  governanceCompliance: boolean;
}

export const CURRICULUM_VERSIONS: CurriculumVersion[] = [
  {
    version: '2027.v1.0',
    releaseDate: '2026-08-15',
    title: 'الإطلاق التأسيسي لمقرر إدارة الأعمال بالبكالوريا المصرية',
    academicYear: '2026 / 2027',
    changesSummary: [
      'تضمين الوحدات الخمس الأولى من كتاب الوزارة المعتمد.',
      'هيكلة محطات التفكير والقرار وسلاسل القيمة.',
      'صياغة بنك أسئلة استرشادي بنماذج الاختيار من متعدد.'
    ],
    governanceCompliance: true
  },
  {
    version: '2027.v1.5',
    releaseDate: '2026-09-01',
    title: 'إدماج كراسات التقييمات والأداءات الأسبوعية ونماذج (أ، ب، ج)',
    academicYear: '2026 / 2027',
    changesSummary: [
      'إضافة الأداءات الصفية والمنزلية لجميع أسابيع الوحدات 1-4.',
      'تضمين التقييمات التراكمية بنماذجها الثلاثة مع الإجابات والسلالم.',
      'تدقيق مطابقة أرقام صفحات المراجع الرسمية.'
    ],
    governanceCompliance: true
  },
  {
    version: '2027.v2.0',
    releaseDate: '2026-09-23',
    title: 'إطلاق نظام الحوكمة الشاملة والفصل الصريح وسجل المصادر المركزي وLMS',
    academicYear: '2026 / 2027',
    changesSummary: [
      'الفصل الصريح بين (وزاري رسمي، شرح المنصة، تدريب إثرائي، غير موثق).',
      'تدشين سجل المصادر المركزي (Source Registry) وشارات التتبع الشفافة.',
      'تصحيح كافة العبارات المبالغ فيها واستبدالها بصياغات أكاديمية دقيقة.',
      'إضافة نظام LMS تراكمي (حساب الطالب، الإتقان 0-4، نقاط المراجعة، وتصنيف بلوم).',
      'حوكمة الـ AI Tutor وضبط RAG مع حظر الهلوسة وحماية الأمان.'
    ],
    governanceCompliance: true
  }
];

export const CONTENT_AUDIT_LOG: ContentAuditLogEntry[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-09-23T08:00:00Z',
    editor: 'لجنة الحوكمة التربوية بالمنصة',
    role: 'Senior Educational Assessment Specialist',
    itemType: 'RUBRIC',
    itemId: 'JRE-RUBRIC-20',
    changeDescription: 'تصحيح وصف روبرك الحكم والاستدلال ليكون "روبرك تدريبي من تصميم المنصة مسترشد بالمعايير التربوية" بدلاً من "سلم التصحيح الوزاري الرسمي".',
    previousSource: 'ادعاء غير موثق (سلم وزاري رسمي)',
    newSource: 'SRC-PLAT-JRE-GUIDE (روبرك تدريبي من إعداد المنصة)',
    reason: 'منع تضليل الطالب وضمان الفصل التام بين المعتمد رسمياً والتدريب الإثرائي الداخلي.',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-09-23T08:15:00Z',
    editor: 'وحدة التوثيق المنهجي',
    role: 'Curriculum Auditor',
    itemType: 'QUESTION',
    itemId: 'ALL_TEXTBOOK_QUESTIONS',
    changeDescription: 'ربط جميع أسئلة كتاب المدرسة بكتاب الوزارة المعتمد (الجزء الأول والثاني) مع إسناد رقم الصفحة والباب.',
    previousSource: 'نص غير مقيد بسجل مركزي',
    newSource: 'SRC-MOE-TB-PART1 & SRC-MOE-TB-PART2',
    reason: 'تحقيق التتبع الكامل (Traceability) بنسبة 100%.',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-09-23T08:30:00Z',
    editor: 'فريق هندسة الأمان والذكاء الاصطناعي',
    role: 'AI Governance Engineer',
    itemType: 'ASSESSMENT',
    itemId: 'AI-TUTOR-PIPELINE',
    changeDescription: 'تقييد الـ AI Tutor بقاعدة المعرفة الوزارية وإلزامه بذكر الإسناد الموثق وحظر توليد قرارات وزارية وهمية.',
    newSource: 'Source Registry + RAG Pipeline',
    reason: 'منع الهلوسة ومطابقة معايير الحوكمة الرشيدة.',
    verificationStatus: 'VERIFIED'
  }
];
