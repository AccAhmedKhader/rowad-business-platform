import { 
  UserProfile, 
  StudentProfile, 
  StudentProgress, 
  StudentMasteryItem, 
  UserBadge, 
  DailyQuestItem, 
  UserBookmarkItem, 
  UserNoteItem, 
  MistakeItem, 
  UserStudyPlan, 
  UserRole,
  AppPermission,
  RolePermissionRule,
  UnitLockState,
  UnitLockMode,
  PrerequisiteStatus,
  AuditLogItem,
  UserStatus
} from '../types';
import { ALL_UNITS } from '../data/unitsData';

const STORAGE_KEYS = {
  CURRENT_USER: 'rowad_current_user_v2',
  ALL_USERS: 'rowad_all_users_v2',
  PROGRESS_PREFIX: 'rowad_student_progress_v2_',
  UNIT_LOCKS: 'rowad_unit_locks_v1',
  PREREQUISITE_ENABLED: 'rowad_prerequisite_gating_enabled_v1',
  AUDIT_LOGS: 'rowad_audit_logs_v1',
  // Legacy fallback keys
  LEGACY_CURRENT: 'rowad_current_student_v1',
  LEGACY_ALL: 'rowad_all_students_v1'
};

export const ROLE_PERMISSION_RULES: RolePermissionRule[] = [
  {
    permission: 'view_content',
    label: 'تصفح المنهج والدروس',
    description: 'الاطلاع على الوحدات الدراسية والمحطات البيداغوجية والخرائط المفاهيمية',
    allowedRoles: ['student', 'teacher', 'parent', 'auditor']
  },
  {
    permission: 'attempt_questions',
    label: 'حل الأسئلة والتقييمات',
    description: 'التدرب على بنك الأسئلة ونماذج التقييم الأسبوعي ومختبر استدلال JRE',
    allowedRoles: ['student', 'teacher', 'auditor']
  },
  {
    permission: 'view_model_answers',
    label: 'عرض الإجابات النموذجية والتبريرات',
    description: 'كشف الحلول النموذجية ومفاتيح التصحيح وتفنيد المشتتات الخاطئة',
    allowedRoles: ['teacher', 'auditor', 'parent', 'student']
  },
  {
    permission: 'manage_unit_locks',
    label: 'حجب وفتح الوحدات الدراسية',
    description: 'التحكم الإداري والتربوي في إتاحة أو قفل وحدات المنهج أمام الطلاب',
    allowedRoles: ['teacher', 'auditor']
  },
  {
    permission: 'view_detailed_analytics',
    label: 'التحليلات المعرفية وهرم بلوم',
    description: 'متابعة نسب إتقان نواتج التعلم وتوزيع الأسئلة على المهارات العقلية',
    allowedRoles: ['teacher', 'auditor', 'parent', 'student']
  },
  {
    permission: 'view_governance_matrix',
    label: 'حوكمة وتدقيق كتاب الوزارة',
    description: 'الوصول للوحة المطابقة الصريحة مع نصوص كتاب الوزارة وقرارات البكالوريا 2027',
    allowedRoles: ['auditor', 'teacher']
  },
  {
    permission: 'export_reports',
    label: 'تصدير التقارير الأكاديمية',
    description: 'استخراج الخطط الأسبوعية وكشوف الدرجات وتحليلات الأداء بصيغة JSON أو طباعة',
    allowedRoles: ['teacher', 'auditor', 'parent']
  },
  {
    permission: 'manage_users',
    label: 'إدارة الأدوار والحسابات',
    description: 'تبديل المنظور التعليمي، إنشاء حسابات جديدة، وتعديل ملفات التعريف',
    allowedRoles: ['teacher', 'auditor']
  }
];

export const INITIAL_BADGES: UserBadge[] = [
  {
    id: 'badge_first_step',
    code: 'FIRST_STEP',
    title: 'خطوة البداية',
    description: 'حل أول سؤال تدريبي بنجاح في المنصة',
    icon: '🎯',
    category: 'mastery',
    progress: 1,
    maxProgress: 1,
    unlockedAt: '2026-09-10T10:00:00.000Z'
  },
  {
    id: 'badge_streak_3',
    code: 'STREAK_3',
    title: 'شعلة الالتزام 🔥',
    description: 'الحفاظ على وتيرة دراسية لـ 3 أيام متتالية دون انقطاع',
    icon: '🔥',
    category: 'streak',
    progress: 3,
    maxProgress: 3,
    unlockedAt: '2026-09-15T14:30:00.000Z'
  },
  {
    id: 'badge_streak_7',
    code: 'STREAK_7',
    title: 'فولاذ الإرادة ⚡',
    description: 'الحفاظ على دراسة متواصلة لمدة 7 أيام متتالية',
    icon: '⚡',
    category: 'streak',
    progress: 5,
    maxProgress: 7
  },
  {
    id: 'badge_jre_master',
    code: 'JRE_MASTER',
    title: 'فارس الاستدلال JRE ⚖️',
    description: 'إتقان هيكل الحكم والاستدلال (الحكم، التعليل، الشاهد، الدحض، الخاتمة)',
    icon: '⚖️',
    category: 'jre',
    progress: 2,
    maxProgress: 3
  },
  {
    id: 'badge_swot_analyst',
    code: 'SWOT_ANALYST',
    title: 'محلل استراتيجي SWOT 📊',
    description: 'إتقان مصفوفة البيئة الداخلية والخارجية وتمييز عناصر القوة والفرص',
    icon: '📊',
    category: 'mastery',
    progress: 1,
    maxProgress: 1,
    unlockedAt: '2026-09-18T16:00:00.000Z'
  },
  {
    id: 'badge_quiz_perfect',
    code: 'QUIZ_PERFECT',
    title: 'العلامة الكاملة 💯',
    description: 'إحراز 100% في أي نموذج تقييم أسبوعي وزاري',
    icon: '💯',
    category: 'exam',
    progress: 1,
    maxProgress: 1,
    unlockedAt: '2026-09-20T11:20:00.000Z'
  },
  {
    id: 'badge_mistake_cleaner',
    code: 'MISTAKE_CLEANER',
    title: 'المصحح الذاتي 🛠️',
    description: 'معالجة وإعادة حل 3 مفاهيم بنجاح من دفتر الأخطاء الذكي',
    icon: '🛠️',
    category: 'dedication',
    progress: 2,
    maxProgress: 3
  },
  {
    id: 'badge_ministry_scholar',
    code: 'MINISTRY_SCHOLAR',
    title: 'حليف كتاب الوزارة 📚',
    description: 'الاطلاع على جميع أسئلة كتاب الطالب والحل النموذجي',
    icon: '📚',
    category: 'mastery',
    progress: 65,
    maxProgress: 65,
    unlockedAt: '2026-09-22T09:00:00.000Z'
  },
  {
    id: 'badge_note_taker',
    code: 'NOTE_TAKER',
    title: 'الموثق الأكاديمي 📝',
    description: 'تدوين وحفظ 3 ملاحظات واستنتاجات شخصية في مفكرة المذاكرة',
    icon: '📝',
    category: 'dedication',
    progress: 2,
    maxProgress: 3
  }
];

export const INITIAL_DAILY_QUESTS: DailyQuestItem[] = [
  {
    id: 'quest_1',
    title: 'حل 5 أسئلة من بنك الأسئلة',
    description: 'اختبر فهمك بمجموعة أسئلة متنوعة المستويات المعرفية',
    rewardXp: 50,
    current: 3,
    target: 5,
    isCompleted: false,
    claimed: false,
    actionTab: 'question_bank'
  },
  {
    id: 'quest_2',
    title: 'مراجعة نموذج تقييم أسبوعي وزاري',
    description: 'اطلع على أحد النماذج (أ، ب، ج) وحلل خطوات الإجابة النموذجية',
    rewardXp: 75,
    current: 1,
    target: 1,
    isCompleted: true,
    claimed: false,
    actionTab: 'assessments'
  },
  {
    id: 'quest_3',
    title: 'تدريب على مهارة حكم واستدلال (JRE)',
    description: 'قم ببناء حكم منطقي متكامل مدعم بالأدلة والشواهد الإدارية',
    rewardXp: 100,
    current: 0,
    target: 1,
    isCompleted: false,
    claimed: false,
    actionTab: 'jre_lab'
  }
];

export const DEFAULT_STUDY_PLAN: UserStudyPlan = {
  weeklyTargetHours: 8,
  dailyStudyPace: 'moderate',
  targetExamDate: '2027-06-01',
  unitGoals: [
    { unitNumber: 1, title: 'مدخل إلى الأعمال وغايتها', status: 'completed', estimatedHours: 6 },
    { unitNumber: 2, title: 'أنواع منظمات الأعمال', status: 'completed', estimatedHours: 7 },
    { unitNumber: 3, title: 'أهداف المنظمات وأصحاب المصلحة', status: 'completed', estimatedHours: 6 },
    { unitNumber: 4, title: 'البيئة الداخلية والخارجية للأعمال', status: 'in_progress', estimatedHours: 8 },
    { unitNumber: 5, title: 'الإدارة والقيادة', status: 'pending', estimatedHours: 7 },
    { unitNumber: 6, title: 'التسويق وسلوك المستهلك', status: 'pending', estimatedHours: 9 },
    { unitNumber: 7, title: 'إدارة العمليات والإنتاج', status: 'pending', estimatedHours: 8 },
    { unitNumber: 8, title: 'إدارة الموارد البشرية', status: 'pending', estimatedHours: 7 },
    { unitNumber: 9, title: 'التمويل وأداء الأعمال', status: 'pending', estimatedHours: 9 },
    { unitNumber: 10, title: 'الاستراتيجية وصنع القرار', status: 'pending', estimatedHours: 10 }
  ]
};

// Curated Persona 1: Student (Default)
export const PERSONA_STUDENT: UserProfile = {
  id: 'std_ahmed_2027',
  name: 'أحمد حسام',
  username: 'ahmed_rowad27',
  email: 'ahmed.rowad@edu.eg',
  avatar: '🎓',
  role: 'student',
  grade: 'الصف الثاني الثانوي — نظام البكالوريا المصرية 2027',
  school: 'مدرسة المتفوقين الرسمية المتميزة',
  track: 'إدارة الأعمال وريادة الأعمال (الشعبة الاقتصادية)',
  dailyGoalQuestions: 10,
  studyStreak: {
    currentDays: 5,
    bestDays: 9,
    lastStudyDate: new Date().toISOString().split('T')[0],
    freezeTokens: 2
  },
  gamification: {
    xp: 850,
    level: 3,
    levelTitle: 'محلل أعمال معتمد',
    badges: INITIAL_BADGES
  },
  dailyQuests: INITIAL_DAILY_QUESTS,
  bookmarks: [
    {
      id: 'bm_1',
      title: 'مصفوفة SWOT وتحليل البيئة الداخلية والخارجية',
      type: 'concept',
      unitNumber: 4,
      lessonTitle: 'تحليل البيئة الداخلية والخارجية',
      details: 'القوة والضعف (بيئة داخلية) مقابل الفرص والتهديدات (بيئة خارجية)',
      savedAt: '2026-09-18T10:15:00.000Z'
    },
    {
      id: 'bm_2',
      title: 'سلم درجات الـ 20 درجة الوزاري لأسئلة الحكم والاستدلال JRE',
      type: 'station',
      unitNumber: 1,
      lessonTitle: 'مفهوم ريادة الأعمال',
      details: 'المحاور الخمسة: الحكم الواضح، الاستدلال المنطقي، الشواهد، الدحض، النتيجة',
      savedAt: '2026-09-20T14:30:00.000Z'
    },
    {
      id: 'bm_3',
      title: 'كتاب المدرسة ص 48: حساب نقطة التعادل والكمية الحرجة',
      type: 'question',
      unitNumber: 4,
      details: 'التكاليف الثابتة مقسومة على هامش المساهمة (سعر البيع - التكلفة المتغيرة)',
      savedAt: '2026-09-22T11:00:00.000Z'
    }
  ],
  personalNotes: [
    {
      id: 'note_1',
      title: 'الفرق الجوهري بين السهم والسند في تمويل الشركات',
      content: 'السهم يعبر عن حصة ملكية في رأس مال الشركة ويمنح حامله حق التصويت ونصيباً في الأرباح المتغيرة ومخاطرة أعلى. بينما السند هو أداة دين وقرض على الشركة يمنح حامله فائدة ثابتة محددة مقدماً بغض النظر عن ربح أو خسارة الشركة وله أولوية في التصفية.',
      unitNumber: 2,
      lessonTitle: 'أنواع الشركات والتمويل',
      tags: ['تمويل', 'أسهم وسندات', 'فخ امتحاني'],
      updatedAt: '2026-09-19T18:00:00.000Z'
    },
    {
      id: 'note_2',
      title: 'قاعدة ذهبية في سؤال JRE',
      content: 'لا تكتفِ أبداً بذكر "أوافق أو أعترض"، بل اذكر الحكم بوضوح في أول سطر ثم اشفع ذلك بتعليل اقتصادي مستنداً لأرقام وسيناريو الحالة، ثم فند الرأي المعارض لضمان الدرجة النهائية.',
      unitNumber: 1,
      lessonTitle: 'التفكير النقدي في الأعمال',
      tags: ['JRE', 'استراتيجية الحل'],
      updatedAt: '2026-09-21T20:15:00.000Z'
    }
  ],
  mistakeNotebook: [
    {
      id: 'mistake_1',
      questionId: 'U04-BANK-Q12',
      questionText: 'أي من العناصر التالية يُعد عنصراً من عناصر البيئة الداخلية المباشرة للمنظمة؟',
      questionType: 'mcq',
      unitNumber: 4,
      studentWrongAnswer: 'معدل التضخم وأسعار الفائدة البنكية',
      correctAnswer: 'الثقافة التنظيمية وهيكل الكفاءات البشرية',
      explanation: 'معدل التضخم والسياسات البنكية تتبع البيئة الاقتصادية الكلية (PESTEL - خارجية)، بينما الثقافة التنظيمية والموارد البشرية تقع بالكامل تحت السيطرة الداخلية للمنظمة.',
      recordedAt: '2026-09-21T13:40:00.000Z',
      resolved: false,
      attempts: 1
    },
    {
      id: 'mistake_2',
      questionId: 'U03-BANK-Q08',
      questionText: 'وفق مصفوفة مندلو لأصحاب المصلحة، كيف تتعامل الإدارة مع طرف ذي (سلطة عالية واهتمام منخفض)؟',
      questionType: 'mcq',
      unitNumber: 3,
      studentWrongAnswer: 'إبقاؤهم على اطلاع دوري ومشاركتهم تفاصيل التشغيل',
      correctAnswer: 'إبقاؤهم راضين (Keep Satisfied) لتفادي أي استخدام مفاجئ لنفوذهم',
      explanation: 'أصحاب القوة العالية والاهتمام المنخفض يحتاجون لاستراتيجية "إبقاؤهم راضين" دون إغراقهم بتفاصيل غير مهمة لهم.',
      recordedAt: '2026-09-22T16:10:00.000Z',
      resolved: true,
      attempts: 2
    }
  ],
  studyPlan: DEFAULT_STUDY_PLAN,
  createdAt: '2026-09-01T08:00:00.000Z',
  lastLogin: new Date().toISOString()
};

// Curated Persona 2: Senior Teacher / Supervisor
export const PERSONA_TEACHER: UserProfile = {
  id: 'teacher_essam',
  name: 'أ.د. عصام عبد الرحمن',
  username: 'dr_essam_expert',
  email: 'essam.abdelrahman@moe.edu.eg',
  avatar: '👨‍🏫',
  role: 'teacher',
  grade: 'معلم أول أ وموجه تخصصي — إدارة القاهرة الجديدة التعليمية',
  school: 'مجمع مدارس النيل المصرية الدولية وموجه التقييمات',
  track: 'تخصص إدارة الأعمال وريادة الأعمال ونظم التقييم',
  dailyGoalQuestions: 20,
  studyStreak: {
    currentDays: 14,
    bestDays: 28,
    lastStudyDate: new Date().toISOString().split('T')[0],
    freezeTokens: 3
  },
  gamification: {
    xp: 3800,
    level: 6,
    levelTitle: 'مستشار البكالوريا الذهبي',
    badges: INITIAL_BADGES.map(b => ({ ...b, progress: b.maxProgress, unlockedAt: '2026-09-01T00:00:00.000Z' }))
  },
  dailyQuests: INITIAL_DAILY_QUESTS.map(q => ({ ...q, isCompleted: true, claimed: true })),
  bookmarks: [
    {
      id: 't_bm_1',
      title: 'مصفوفة ربط نواتج التعلم بالاختبارات الأسبوعية الرسمية',
      type: 'assessment',
      unitNumber: 1,
      details: 'توزيع درجات أعمال السنة وفق القرار الوزاري للتقييمات الأسبوعية',
      savedAt: '2026-09-05T09:00:00.000Z'
    }
  ],
  personalNotes: [
    {
      id: 't_note_1',
      title: 'ملاحظات تصحيح أسئلة JRE للطلاب الضعاف',
      content: 'ينبغي تدريب الطلاب على كتابة الكلمات المفتاحية الخمس: (حكمي هو، والسبب وراء ذلك، والدليل من نص الحالة، ورداً على الرأي الآخر، وخلاصة القول) لضمان عدم إهدار أي درجة جزئية في سلم التصحيح.',
      unitNumber: 1,
      lessonTitle: 'التدريب على مهارات الاستدلال',
      tags: ['توجيه تربوي', 'تصحيح', 'JRE'],
      updatedAt: '2026-09-12T11:00:00.000Z'
    }
  ],
  mistakeNotebook: [],
  studyPlan: DEFAULT_STUDY_PLAN,
  createdAt: '2026-08-15T08:00:00.000Z',
  lastLogin: new Date().toISOString()
};

// Curated Persona 3: Parent / Guardian
export const PERSONA_PARENT: UserProfile = {
  id: 'parent_sherif',
  name: 'م. شريف عبد المنعم',
  username: 'eng_sherif_parent',
  email: 'sherif.parent@gmail.com',
  avatar: '👨‍👩‍👧',
  role: 'parent',
  grade: 'ولي أمر الطالب: أحمد حسام (الصف الثاني الثانوي)',
  school: 'متابعة دورية مع مدرسة المتفوقين',
  track: 'المسار الاقتصادي والريادي',
  dailyGoalQuestions: 5,
  studyStreak: {
    currentDays: 5,
    bestDays: 7,
    lastStudyDate: new Date().toISOString().split('T')[0],
    freezeTokens: 2
  },
  gamification: {
    xp: 620,
    level: 3,
    levelTitle: 'محلل أعمال معتمد',
    badges: INITIAL_BADGES.slice(0, 4)
  },
  dailyQuests: INITIAL_DAILY_QUESTS,
  bookmarks: [],
  personalNotes: [
    {
      id: 'p_note_1',
      title: 'خطة المذاكرة المنزلية لعطلة نهاية الأسبوع',
      content: 'تخصيص ساعتين يوم السبت لمراجعة بنك أسئلة الوحدة 4، وحل اختبار أسبوعي تجريبي قبل التقييم المدرسي يوم الأحد.',
      unitNumber: 4,
      lessonTitle: 'متابعة أسرية',
      tags: ['متابعة منزلية', 'جدول مذاكرة'],
      updatedAt: '2026-09-22T19:00:00.000Z'
    }
  ],
  mistakeNotebook: [],
  studyPlan: DEFAULT_STUDY_PLAN,
  createdAt: '2026-09-02T12:00:00.000Z',
  lastLogin: new Date().toISOString()
};

// Curated Persona 4: Pedagogical Auditor / Inspector
export const PERSONA_AUDITOR: UserProfile = {
  id: 'auditor_nadia',
  name: 'د. نادية كمال',
  username: 'dr_nadia_quality',
  email: 'nadia.kamal@quality-gov.eg',
  avatar: '🛡️',
  role: 'auditor',
  grade: 'خبير تدقيق المناهج ومطابقة نواتج التعلم',
  school: 'الإدارة المركزية لتطوير المناهج وضمان الجودة',
  track: 'حوكمة وتدقيق مصادر البكالوريا المصرية 2027',
  dailyGoalQuestions: 15,
  studyStreak: {
    currentDays: 12,
    bestDays: 20,
    lastStudyDate: new Date().toISOString().split('T')[0],
    freezeTokens: 3
  },
  gamification: {
    xp: 2950,
    level: 5,
    levelTitle: 'رائد أعمال تنفيذي',
    badges: INITIAL_BADGES
  },
  dailyQuests: INITIAL_DAILY_QUESTS,
  bookmarks: [],
  personalNotes: [],
  mistakeNotebook: [],
  studyPlan: DEFAULT_STUDY_PLAN,
  createdAt: '2026-08-20T08:00:00.000Z',
  lastLogin: new Date().toISOString()
};

export const ALL_PRESET_USERS: UserProfile[] = [
  PERSONA_STUDENT,
  PERSONA_TEACHER,
  PERSONA_PARENT,
  PERSONA_AUDITOR
];

/**
 * دالة مساعدة لتحديد مسمى المستوى ونسبة التقدم
 */
export function calculateLevelFromXP(xp: number): { level: number; title: string; nextLevelXP: number; progressPercent: number } {
  if (xp < 250) {
    return {
      level: 1,
      title: 'باحث مبتدئ',
      nextLevelXP: 250,
      progressPercent: Math.round((xp / 250) * 100)
    };
  } else if (xp < 600) {
    return {
      level: 2,
      title: 'ريادي واعد',
      nextLevelXP: 600,
      progressPercent: Math.round(((xp - 250) / 350) * 100)
    };
  } else if (xp < 1200) {
    return {
      level: 3,
      title: 'محلل أعمال معتمد',
      nextLevelXP: 1200,
      progressPercent: Math.round(((xp - 600) / 600) * 100)
    };
  } else if (xp < 2000) {
    return {
      level: 4,
      title: 'خبير استراتيجي',
      nextLevelXP: 2000,
      progressPercent: Math.round(((xp - 1200) / 800) * 100)
    };
  } else if (xp < 3500) {
    return {
      level: 5,
      title: 'رائد أعمال تنفيذي',
      nextLevelXP: 3500,
      progressPercent: Math.round(((xp - 2000) / 1500) * 100)
    };
  } else {
    return {
      level: 6,
      title: 'مستشار البكالوريا الذهبي',
      nextLevelXP: 5000,
      progressPercent: Math.min(100, Math.round(((xp - 3500) / 1500) * 100))
    };
  }
}

/**
 * خدمة إدارة التعلم والطبقة العالمية للمستخدمين (LmsService & Global User Engine)
 */
class LmsService {
  /**
   * جلب المستخدم الحالي النشط
   */
  getCurrentUser(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required fields exist
        return this.normalizeUserProfile(parsed);
      }
      
      // Fallback check for legacy v1 student
      const legacy = localStorage.getItem(STORAGE_KEYS.LEGACY_CURRENT);
      if (legacy) {
        const legacyParsed = JSON.parse(legacy);
        const migrated = {
          ...PERSONA_STUDENT,
          id: legacyParsed.id || PERSONA_STUDENT.id,
          name: legacyParsed.name || PERSONA_STUDENT.name,
          username: legacyParsed.username || PERSONA_STUDENT.username
        };
        this.saveCurrentUser(migrated);
        return migrated;
      }
    } catch {
      // Storage unavailable fallback
    }

    this.saveCurrentUser(PERSONA_STUDENT);
    return PERSONA_STUDENT;
  }

  /**
   * للتوافق الخلفي
   */
  getCurrentStudent(): StudentProfile {
    return this.getCurrentUser();
  }

  /**
   * تطبيع بيانات المستخدم لضمان سلامة الـ Schema
   */
  private normalizeUserProfile(user: any): UserProfile {
    const levelInfo = calculateLevelFromXP(user.gamification?.xp || 0);

    return {
      id: user.id || `user_${Date.now()}`,
      name: user.name || 'مستخدم المنصة',
      username: user.username || 'rowad_user',
      email: user.email || '',
      phone: user.phone || '',
      status: (user.status as UserStatus) || 'active',
      customPermissions: Array.isArray(user.customPermissions) ? user.customPermissions : undefined,
      tags: Array.isArray(user.tags) ? user.tags : ['دفعة 2027'],
      avatar: user.avatar || '🎓',
      role: (user.role as UserRole) || 'student',
      grade: user.grade || 'الصف الثاني الثانوي — البكالوريا المصرية',
      school: user.school || 'مدرسة المتفوقين',
      track: user.track || 'إدارة الأعمال وريادة الأعمال',
      dailyGoalQuestions: user.dailyGoalQuestions || 10,
      studyStreak: user.studyStreak || {
        currentDays: 1,
        bestDays: 1,
        lastStudyDate: new Date().toISOString().split('T')[0],
        freezeTokens: 1
      },
      gamification: {
        xp: user.gamification?.xp || 0,
        level: levelInfo.level,
        levelTitle: levelInfo.title,
        badges: user.gamification?.badges || INITIAL_BADGES
      },
      dailyQuests: user.dailyQuests || INITIAL_DAILY_QUESTS,
      bookmarks: user.bookmarks || [],
      personalNotes: user.personalNotes || [],
      mistakeNotebook: user.mistakeNotebook || [],
      studyPlan: user.studyPlan || DEFAULT_STUDY_PLAN,
      createdAt: user.createdAt || new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
  }

  /**
   * حفظ المستخدم الحالي
   */
  saveCurrentUser(user: UserProfile): void {
    try {
      const levelInfo = calculateLevelFromXP(user.gamification.xp);
      user.gamification.level = levelInfo.level;
      user.gamification.levelTitle = levelInfo.title;

      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      
      const all = this.getAllUsers();
      const idx = all.findIndex(u => u.id === user.id);
      if (idx >= 0) {
        all[idx] = user;
      } else {
        all.push(user);
      }
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(all));

      // Trigger standard cross-component event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('rowad_user_updated', { detail: user }));
      }
    } catch (err) {
      console.warn('Could not persist user profile:', err);
    }
  }

  /**
   * للتوافق الخلفي
   */
  saveCurrentStudent(student: StudentProfile): void {
    this.saveCurrentUser(student);
  }

  /**
   * جلب كافة حسابات المستخدمين المخزنة
   */
  getAllUsers(): UserProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(u => this.normalizeUserProfile(u));
        }
      }
    } catch {}

    // Initialize with standard personas
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(ALL_PRESET_USERS));
    return ALL_PRESET_USERS;
  }

  /**
   * للتوافق الخلفي
   */
  getAllStudents(): StudentProfile[] {
    return this.getAllUsers();
  }

  /**
   * تبديل الحساب النشط
   */
  switchUser(userId: string): UserProfile {
    const all = this.getAllUsers();
    let found = all.find(u => u.id === userId);
    if (!found) {
      // Check in preset presets
      found = ALL_PRESET_USERS.find(u => u.id === userId);
    }

    if (found) {
      found.lastLogin = new Date().toISOString();
      this.saveCurrentUser(found);
      return found;
    }
    return this.getCurrentUser();
  }

  /**
   * للتوافق الخلفي
   */
  switchStudent(studentId: string): StudentProfile {
    return this.switchUser(studentId);
  }

  /**
   * إنشاء مستخدم جديد
   */
  createUser(params: {
    name: string;
    role: UserRole;
    avatar?: string;
    grade?: string;
    track?: string;
    school?: string;
  }): UserProfile {
    const newUser: UserProfile = {
      ...PERSONA_STUDENT,
      id: `user_${Date.now()}`,
      name: params.name.trim() || 'مستخدم جديد',
      username: params.name.trim().replace(/\s+/g, '_').toLowerCase() + '_' + Math.floor(Math.random() * 1000),
      avatar: params.avatar || (params.role === 'teacher' ? '👨‍🏫' : params.role === 'parent' ? '👨‍👩‍👧' : params.role === 'auditor' ? '🛡️' : '🎓'),
      role: params.role,
      grade: params.grade || (params.role === 'student' ? 'الصف الثاني الثانوي — البكالوريا المصرية' : 'عضو المنصة'),
      school: params.school || 'المنصة الرقمية للبكالوريا',
      track: params.track || 'إدارة الأعمال وريادة الأعمال',
      status: 'active',
      tags: ['دفعة 2027'],
      studyStreak: {
        currentDays: 1,
        bestDays: 1,
        lastStudyDate: new Date().toISOString().split('T')[0],
        freezeTokens: 1
      },
      gamification: {
        xp: 100,
        level: 1,
        levelTitle: 'باحث مبتدئ',
        badges: INITIAL_BADGES
      },
      dailyQuests: INITIAL_DAILY_QUESTS,
      bookmarks: [],
      personalNotes: [],
      mistakeNotebook: [],
      studyPlan: DEFAULT_STUDY_PLAN,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    this.saveCurrentUser(newUser);
    this.recordAuditLog({
      action: 'create_user',
      targetUserId: newUser.id,
      targetUserName: newUser.name,
      details: `تم إنشاء حساب مستخدم جديد بدور: ${newUser.role}`
    });
    return newUser;
  }

  /**
   * للتوافق الخلفي
   */
  createStudent(name: string, username?: string): StudentProfile {
    return this.createUser({ name, role: 'student' });
  }

  /**
   * تبديل دور المستخدم الحالي (Student / Teacher / Parent / Auditor)
   */
  switchRole(role: UserRole): UserProfile {
    const user = this.getCurrentUser();
    user.role = role;
    if (role === 'teacher') user.avatar = '👨‍🏫';
    else if (role === 'parent') user.avatar = '👨‍👩‍👧';
    else if (role === 'auditor') user.avatar = '🛡️';
    else user.avatar = '🎓';
    this.saveCurrentUser(user);
    return user;
  }

  /**
   * إضافة نقاط خبرة XP وتحديث المستوى والشارات
   */
  addXP(amount: number, reason: string): { newXP: number; leveledUp: boolean; newLevel: number; title: string } {
    const user = this.getCurrentUser();
    const oldLevel = user.gamification.level;
    user.gamification.xp += amount;

    const levelInfo = calculateLevelFromXP(user.gamification.xp);
    user.gamification.level = levelInfo.level;
    user.gamification.levelTitle = levelInfo.title;

    const leveledUp = levelInfo.level > oldLevel;

    // Check badges unlocking progress
    if (user.gamification.xp >= 250) {
      this.unlockBadgeInternal(user, 'FIRST_STEP');
    }

    this.saveCurrentUser(user);
    return {
      newXP: user.gamification.xp,
      leveledUp,
      newLevel: levelInfo.level,
      title: levelInfo.title
    };
  }

  /**
   * فحص وتحديث الحماسة اليومية (Study Streak)
   */
  checkAndUpdateStreak(): { streakDays: number; isMaintained: boolean } {
    const user = this.getCurrentUser();
    const today = new Date().toISOString().split('T')[0];
    const lastDate = user.studyStreak.lastStudyDate;

    if (lastDate === today) {
      return { streakDays: user.studyStreak.currentDays, isMaintained: true };
    }

    // Calculate days difference
    const last = new Date(lastDate);
    const curr = new Date(today);
    const diffDays = Math.floor((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      user.studyStreak.currentDays += 1;
      if (user.studyStreak.currentDays > user.studyStreak.bestDays) {
        user.studyStreak.bestDays = user.studyStreak.currentDays;
      }
      user.studyStreak.lastStudyDate = today;

      // Check streak badges
      if (user.studyStreak.currentDays >= 3) this.unlockBadgeInternal(user, 'STREAK_3');
      if (user.studyStreak.currentDays >= 7) this.unlockBadgeInternal(user, 'STREAK_7');

    } else if (diffDays > 1) {
      // Missed days - check freeze token
      if (user.studyStreak.freezeTokens > 0) {
        user.studyStreak.freezeTokens -= 1;
        user.studyStreak.lastStudyDate = today;
      } else {
        user.studyStreak.currentDays = 1;
        user.studyStreak.lastStudyDate = today;
      }
    }

    this.saveCurrentUser(user);
    return { streakDays: user.studyStreak.currentDays, isMaintained: true };
  }

  /**
   * فتح شارة محددة
   */
  private unlockBadgeInternal(user: UserProfile, badgeCode: string): void {
    const badge = user.gamification.badges.find(b => b.code === badgeCode);
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = new Date().toISOString();
      badge.progress = badge.maxProgress;
    }
  }

  /**
   * المطالبة بمكافأة مهمة يومية
   */
  claimDailyQuest(questId: string): boolean {
    const user = this.getCurrentUser();
    const quest = user.dailyQuests.find(q => q.id === questId);
    if (quest && quest.isCompleted && !quest.claimed) {
      quest.claimed = true;
      user.gamification.xp += quest.rewardXp;
      const levelInfo = calculateLevelFromXP(user.gamification.xp);
      user.gamification.level = levelInfo.level;
      user.gamification.levelTitle = levelInfo.title;
      this.saveCurrentUser(user);
      return true;
    }
    return false;
  }

  /**
   * تبديل حالة حفظ في المفضلة (Bookmark)
   */
  toggleBookmark(item: Omit<UserBookmarkItem, 'id' | 'savedAt'>): boolean {
    const user = this.getCurrentUser();
    const existingIdx = user.bookmarks.findIndex(b => b.title === item.title && b.unitNumber === item.unitNumber);

    if (existingIdx >= 0) {
      user.bookmarks.splice(existingIdx, 1);
      this.saveCurrentUser(user);
      return false; // Removed
    } else {
      user.bookmarks.unshift({
        ...item,
        id: `bm_${Date.now()}`,
        savedAt: new Date().toISOString()
      });
      this.saveCurrentUser(user);
      return true; // Added
    }
  }

  /**
   * إضافة أو تعديل ملاحظة دراسية شخصية
   */
  savePersonalNote(note: Omit<UserNoteItem, 'id' | 'updatedAt'> & { id?: string }): UserNoteItem {
    const user = this.getCurrentUser();
    let savedNote: UserNoteItem;

    if (note.id) {
      const idx = user.personalNotes.findIndex(n => n.id === note.id);
      if (idx >= 0) {
        user.personalNotes[idx] = {
          ...user.personalNotes[idx],
          title: note.title,
          content: note.content,
          unitNumber: note.unitNumber,
          lessonTitle: note.lessonTitle,
          tags: note.tags,
          updatedAt: new Date().toISOString()
        };
        savedNote = user.personalNotes[idx];
      } else {
        savedNote = {
          ...note,
          id: note.id,
          updatedAt: new Date().toISOString()
        };
        user.personalNotes.unshift(savedNote);
      }
    } else {
      savedNote = {
        ...note,
        id: `note_${Date.now()}`,
        updatedAt: new Date().toISOString()
      };
      user.personalNotes.unshift(savedNote);
    }

    if (user.personalNotes.length >= 3) {
      this.unlockBadgeInternal(user, 'NOTE_TAKER');
    }

    this.saveCurrentUser(user);
    return savedNote;
  }

  /**
   * حذف ملاحظة شخصية
   */
  deletePersonalNote(noteId: string): void {
    const user = this.getCurrentUser();
    user.personalNotes = user.personalNotes.filter(n => n.id !== noteId);
    this.saveCurrentUser(user);
  }

  /**
   * تسجيل خطأ في دفتر الأخطاء الذكي
   */
  recordMistakeItem(mistake: Omit<MistakeItem, 'id' | 'recordedAt' | 'resolved' | 'attempts'>): void {
    const user = this.getCurrentUser();
    const existing = user.mistakeNotebook.find(m => m.questionId === mistake.questionId);

    if (existing) {
      existing.attempts += 1;
      existing.studentWrongAnswer = mistake.studentWrongAnswer;
      existing.recordedAt = new Date().toISOString();
      existing.resolved = false;
    } else {
      user.mistakeNotebook.unshift({
        ...mistake,
        id: `mst_${Date.now()}`,
        recordedAt: new Date().toISOString(),
        resolved: false,
        attempts: 1
      });
    }

    this.saveCurrentUser(user);
  }

  /**
   * تحديد السؤال بأنه تم حله وتجاوزه بنجاح في دفتر الأخطاء
   */
  resolveMistakeItem(mistakeId: string): void {
    const user = this.getCurrentUser();
    const mistake = user.mistakeNotebook.find(m => m.id === mistakeId);
    if (mistake) {
      mistake.resolved = true;
      this.addXP(30, 'تصحيح مفهوم في دفتر الأخطاء');

      const resolvedCount = user.mistakeNotebook.filter(m => m.resolved).length;
      if (resolvedCount >= 3) {
        this.unlockBadgeInternal(user, 'MISTAKE_CLEANER');
      }

      this.saveCurrentUser(user);
    }
  }

  /**
   * تحديث خطة المذاكرة
   */
  updateStudyPlan(plan: UserStudyPlan): void {
    const user = this.getCurrentUser();
    user.studyPlan = plan;
    this.saveCurrentUser(user);
  }

  // ==========================================
  // LMS Progress Engine (Backwards compatible)
  // ==========================================

  /**
   * جلب سجل تقدم الطالب الحالي
   */
  getProgress(studentId?: string): StudentProgress {
    const id = studentId || this.getCurrentUser().id;
    try {
      const stored = localStorage.getItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${id}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    const freshProgress: StudentProgress = {
      studentId: id,
      currentUnit: 1,
      completedLessons: [],
      answeredQuestions: {},
      quizAttempts: [],
      jreSubmissions: [],
      timeSpentMinutes: 35,
      lastActive: new Date().toISOString()
    };
    this.saveProgress(freshProgress);
    return freshProgress;
  }

  /**
   * حفظ سجل التقدم
   */
  saveProgress(progress: StudentProgress): void {
    try {
      progress.lastActive = new Date().toISOString();
      localStorage.setItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${progress.studentId}`, JSON.stringify(progress));
    } catch (err) {
      console.warn('Could not persist progress:', err);
    }
  }

  /**
   * تسجيل إجابة سؤال
   */
  recordQuestionAnswer(params: {
    questionId: string;
    unitNumber: number;
    loId?: string;
    isCorrect: boolean;
    selectedAnswer: any;
    bloomLevel?: string;
    difficulty?: string;
    questionText?: string;
    correctAnswer?: string;
    explanation?: string;
  }): void {
    const progress = this.getProgress();
    const prev = progress.answeredQuestions[params.questionId];

    progress.answeredQuestions[params.questionId] = {
      questionId: params.questionId,
      unitNumber: params.unitNumber,
      loId: params.loId || `U${params.unitNumber}_LO_MAIN`,
      isCorrect: params.isCorrect,
      selectedAnswer: params.selectedAnswer,
      bloomLevel: params.bloomLevel || 'فهم',
      difficulty: params.difficulty || 'متوسط',
      attempts: (prev ? prev.attempts : 0) + 1,
      answeredAt: new Date().toISOString()
    };

    this.saveProgress(progress);

    // Gamification & Quests integration
    if (params.isCorrect) {
      this.addXP(20, 'حل سؤال صحيح');
    } else {
      this.addXP(5, 'محاولة حل سؤال');
      if (params.questionText && params.correctAnswer) {
        this.recordMistakeItem({
          questionId: params.questionId,
          questionText: params.questionText,
          questionType: 'mcq',
          unitNumber: params.unitNumber,
          studentWrongAnswer: String(params.selectedAnswer || 'إجابة غير صحيحة'),
          correctAnswer: params.correctAnswer,
          explanation: params.explanation || 'راجع نصوص ومفاهيم كتاب المدرسة المقابلة.'
        });
      }
    }

    // Update streak
    this.checkAndUpdateStreak();

    // Update daily quest
    const user = this.getCurrentUser();
    const bankQuest = user.dailyQuests.find(q => q.id === 'quest_1');
    if (bankQuest && !bankQuest.isCompleted) {
      bankQuest.current += 1;
      if (bankQuest.current >= bankQuest.target) {
        bankQuest.isCompleted = true;
      }
      this.saveCurrentUser(user);
    }
  }

  /**
   * تسجيل إكمال درس
   */
  recordLessonCompletion(lessonKey: string): void {
    const progress = this.getProgress();
    if (!progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey);
      this.saveProgress(progress);
      this.addXP(40, 'إكمال دراسة درس جديد');
    }
  }

  /**
   * تسجيل محاولة اختبار
   */
  recordQuizAttempt(attempt: {
    assessmentId: string;
    unitNumber: number;
    title: string;
    score: number;
    total: number;
    percentage: number;
    durationSeconds: number;
    weakLOs: string[];
    errorConcepts: string[];
  }): void {
    const progress = this.getProgress();
    progress.quizAttempts.push({
      id: `att_${Date.now()}`,
      ...attempt,
      completedAt: new Date().toISOString()
    });
    this.saveProgress(progress);

    // Reward XP proportional to score
    this.addXP(Math.round(attempt.percentage * 1.5), 'إنجاز اختبار تقييمي');

    if (attempt.percentage === 100) {
      const user = this.getCurrentUser();
      this.unlockBadgeInternal(user, 'QUIZ_PERFECT');
      this.saveCurrentUser(user);
    }
  }

  /**
   * تسجيل مقال استدلال JRE
   */
  recordJreSubmission(submission: {
    questionId: string;
    unitNumber: number;
    studentAnswer: string;
    feedback: string;
    rubricBreakdown?: Record<string, number>;
  }): void {
    const progress = this.getProgress();
    progress.jreSubmissions.push({
      id: `jre_${Date.now()}`,
      ...submission,
      submittedAt: new Date().toISOString()
    });
    this.saveProgress(progress);

    this.addXP(80, 'تقديم تحليل استدلال JRE');
    
    // Complete JRE daily quest if available
    const user = this.getCurrentUser();
    const jreQuest = user.dailyQuests.find(q => q.id === 'quest_3');
    if (jreQuest && !jreQuest.isCompleted) {
      jreQuest.current = 1;
      jreQuest.isCompleted = true;
      this.saveCurrentUser(user);
    }
  }

  /**
   * إضافة وقت دراسة
   */
  addStudyTime(minutes: number): void {
    const progress = this.getProgress();
    progress.timeSpentMinutes += minutes;
    this.saveProgress(progress);
  }

  /**
   * حساب نموذج الإتقان التراكمي (Mastery Model 0-4)
   */
  calculateMastery(): StudentMasteryItem[] {
    const progress = this.getProgress();
    const answers = Object.values(progress.answeredQuestions);

    const loMap: Record<string, {
      loId: string;
      loTitle: string;
      unitNumber: number;
      total: number;
      correct: number;
      errors: number;
      bloom: Record<string, { correct: number; total: number }>;
      lastAttemptAt?: string;
    }> = {};

    ALL_UNITS.forEach(unit => {
      (unit.learningOutcomes || []).forEach((loText, idx) => {
        const loKey = `U0${unit.number}_LO_${idx + 1}`;
        loMap[loKey] = {
          loId: loKey,
          loTitle: loText,
          unitNumber: unit.number,
          total: 0,
          correct: 0,
          errors: 0,
          bloom: {},
          lastAttemptAt: undefined
        };
      });
    });

    answers.forEach(ans => {
      let targetLoKey = ans.loId && loMap[ans.loId] ? ans.loId : `U0${ans.unitNumber}_LO_1`;
      if (!loMap[targetLoKey]) {
        targetLoKey = Object.keys(loMap).find(k => k.startsWith(`U0${ans.unitNumber}`)) || `U0${ans.unitNumber}_LO_1`;
      }

      if (loMap[targetLoKey]) {
        loMap[targetLoKey].total += 1;
        if (ans.isCorrect) {
          loMap[targetLoKey].correct += 1;
        } else {
          loMap[targetLoKey].errors += 1;
        }
        
        const bloom = ans.bloomLevel || 'فهم';
        if (!loMap[targetLoKey].bloom[bloom]) {
          loMap[targetLoKey].bloom[bloom] = { correct: 0, total: 0 };
        }
        loMap[targetLoKey].bloom[bloom].total += 1;
        if (ans.isCorrect) {
          loMap[targetLoKey].bloom[bloom].correct += 1;
        }

        loMap[targetLoKey].lastAttemptAt = ans.answeredAt;
      }
    });

    return Object.values(loMap).map(item => {
      let score = 0;
      let level: StudentMasteryItem['level'] = 'لم يبدأ';

      if (item.total === 0) {
        score = 0;
        level = 'لم يبدأ';
      } else {
        const accuracy = item.correct / item.total;
        
        if (item.total < 2) {
          score = 1;
          level = 'بدأ';
        } else if (accuracy < 0.6) {
          score = 2;
          level = 'يحتاج تدريب';
        } else if (accuracy < 0.85) {
          score = 3;
          level = 'جيد';
        } else {
          score = 4;
          level = 'متقن';
        }
      }

      const needsReview = score === 2 || (item.total > 0 && item.errors >= 2);

      return {
        loId: item.loId,
        loTitle: item.loTitle,
        unitNumber: item.unitNumber,
        score,
        level,
        totalQuestionsAttempted: item.total,
        correctCount: item.correct,
        errorCount: item.errors,
        bloomBreakdown: item.bloom,
        lastAttemptAt: item.lastAttemptAt,
        needsReview
      };
    });
  }

  /**
   * جلب المفاهيم التي تحتاج إلى مراجعة
   */
  getReviewRecommendations(): { loTitle: string; unitNumber: number; reason: string }[] {
    const masteries = this.calculateMastery();
    const needsWork = masteries.filter(m => m.needsReview || (m.totalQuestionsAttempted > 0 && m.score <= 2));

    return needsWork.map(m => ({
      loTitle: m.loTitle,
      unitNumber: m.unitNumber,
      reason: m.errorCount > 1 
        ? `تكرر الخطأ في ${m.errorCount} أسئلة ضمن هذا الناتج التعليمي.` 
        : `يحتاج هذا الناتج إلى تثبيت المفاهيم وحل تدريبات إضافية.`
    }));
  }

  /**
   * إحصائيات التفكير الإدراكي لبلوم
   */
  getCognitiveBloomStats(): Record<string, { correct: number; total: number; percentage: number }> {
    const progress = this.getProgress();
    const answers = Object.values(progress.answeredQuestions);

    const standardLevels = ['تذكر', 'فهم', 'تطبيق', 'تحليل', 'تقييم', 'حكم واستدلال'];
    const stats: Record<string, { correct: number; total: number; percentage: number }> = {};

    standardLevels.forEach(lvl => {
      stats[lvl] = { correct: 0, total: 0, percentage: 0 };
    });

    answers.forEach(ans => {
      const lvl = ans.bloomLevel || 'فهم';
      if (!stats[lvl]) {
        stats[lvl] = { correct: 0, total: 0, percentage: 0 };
      }
      stats[lvl].total += 1;
      if (ans.isCorrect) {
        stats[lvl].correct += 1;
      }
    });

    Object.keys(stats).forEach(k => {
      if (stats[k].total > 0) {
        stats[k].percentage = Math.round((stats[k].correct / stats[k].total) * 100);
      }
    });

    return stats;
  }

  /**
   * مسح بيانات الطالب
   */
  resetStudentData(studentId?: string): void {
    const id = studentId || this.getCurrentUser().id;
    try {
      localStorage.removeItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${id}`);
    } catch {}
  }

  // ==========================================
  // Unit Locking & Gating Engine (حجب وفتح الوحدات والفتح التتابعي)
  // ==========================================

  /**
   * هل نظام القفل التلقائي التتابعي (الخيار ج) مفعل؟
   * افتراضياً: مفعل (true) لتحفيز الطالب واشتراط إتقان الوحدة السابقة بـ 70%.
   */
  isPrerequisiteGatingEnabled(): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREREQUISITE_ENABLED);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch {}
    return true; // مفعل افتراضياً
  }

  /**
   * تفعيل أو تعطيل القفل التلقائي التتابعي
   */
  setPrerequisiteGatingEnabled(enabled: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PREREQUISITE_ENABLED, JSON.stringify(enabled));
      window.dispatchEvent(new CustomEvent('rowad_unit_locks_updated', { detail: this.getUnitLocks() }));
    } catch {}
  }

  /**
   * جلب سجل حالات قفل وحجب الوحدات
   */
  getUnitLocks(): Record<number, UnitLockState> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.UNIT_LOCKS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    const defaults: Record<number, UnitLockState> = {};
    return defaults;
  }

  /**
   * حفظ مصفوفة إقفال الوحدات
   */
  saveUnitLocks(locks: Record<number, UnitLockState>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.UNIT_LOCKS, JSON.stringify(locks));
      window.dispatchEvent(new CustomEvent('rowad_unit_locks_updated', { detail: locks }));
    } catch {}
  }

  /**
   * تبديل حالة حجب أو فتح وحدة دراسية يدوياً بواسطة المعلم أو المشرف (الخيار ب)
   * مع حماية الوحدة 1 من الحجب المطلق لضمان وجود مدخل دائم للطالب.
   */
  toggleUnitLock(
    unitNumber: number, 
    isLocked: boolean, 
    reason?: string, 
    lockedBy?: string,
    minPassingScore: number = 70
  ): void {
    // حماية الوحدة 1 (المدخل التأسيسي): لا يمكن قفلها يدوياً لضمان عدم حبس الطالب خارج المنصة
    if (unitNumber === 1 && isLocked) {
      console.warn('الوحدة 1 هي المدخل التأسيسي لمنهج ريادة الأعمال ولا يمكن قفلها.');
      return;
    }

    const locks = this.getUnitLocks();
    locks[unitNumber] = {
      unitNumber,
      isLocked,
      lockMode: 'manual',
      manualOverride: isLocked ? 'locked' : 'unlocked',
      reason: reason || (isLocked ? 'محجوبة بقرار تربوي من المعلم الأول لحين موعد الخطة التدريسية واجتياز المتطلبات' : undefined),
      lockedBy: lockedBy || this.getCurrentUser().name,
      lockedAt: new Date().toISOString(),
      minPassingScore
    };
    this.saveUnitLocks(locks);
  }

  /**
   * حساب أعلى نسبة مئوية حققها الطالب في اختبارات وحدة معينة
   */
  getBestQuizScoreForUnit(unitNumber: number, studentId?: string): number {
    const progress = this.getProgress(studentId);
    if (!progress || !progress.quizAttempts) return 0;
    
    const attempts = progress.quizAttempts.filter(att => att.unitNumber === unitNumber);
    if (attempts.length === 0) return 0;

    return Math.max(...attempts.map(att => att.percentage || 0));
  }

  /**
   * الفحص الشامل لحالة وصول الوحدة وتطبيق القفل التلقائي التتابعي (الخيار ج)
   * مع أولوية التدخل اليدوي للمعلم/المشرف (الخيار ب).
   */
  checkUnitAccessStatus(unitNumber: number, role?: UserRole): PrerequisiteStatus {
    const currentRole = role || this.getCurrentUser().role;
    
    // 1. المعلم والمشرف يتمتعان بوصول شامل دائم لكافة الوحدات لإعداد الدروس والتدقيق
    if (currentRole === 'teacher' || currentRole === 'auditor') {
      return {
        unitNumber,
        isLocked: false,
        lockType: 'none',
        reason: 'مصرح لك بالوصول الشامل بصفتك معلماً أول أو مشرف جودة للتحضير والتدقيق.'
      };
    }

    // 2. الوحدة 1 متاحة دائماً لجميع الطلاب كمدخل تأسيسي ومفتاح المنهج
    if (unitNumber === 1) {
      return {
        unitNumber: 1,
        isLocked: false,
        lockType: 'none',
        reason: 'الوحدة التأسيسية الأولى مفتوحة دائماً لكافة الطلاب.'
      };
    }

    const locks = this.getUnitLocks();
    const lockInfo = locks[unitNumber];

    // 3. فحص التدخل اليدوي من المعلم (Manual Override)
    // إذا أمر المعلم صراحة بإلغاء الحجب وفتح الوحدة استثنائياً للطالب
    if (lockInfo?.manualOverride === 'unlocked') {
      return {
        unitNumber,
        isLocked: false,
        lockType: 'none',
        reason: 'تم فتح هذه الوحدة باستثناء خاص وتوجيه مباشر من المعلم.',
        isExempted: true
      };
    }

    // إذا قام المعلم بحجب الوحدة يدوياً (الخيار ب)
    if (lockInfo && lockInfo.isLocked) {
      return {
        unitNumber,
        isLocked: true,
        lockType: 'manual',
        reason: lockInfo.reason || 'محجوبة بقرار تربوي مباشر من المعلم الأول لحين موعد الخطة المدرسية.',
        requiredScore: lockInfo.minPassingScore || 70
      };
    }

    // 4. تطبيق القفل التلقائي التتابعي (الخيار ج - Prerequisite Gating)
    const isPrereqActive = this.isPrerequisiteGatingEnabled();
    if (isPrereqActive) {
      const prevUnitNumber = unitNumber - 1;
      const prevUnit = ALL_UNITS.find(u => u.number === prevUnitNumber);
      const prevTitle = prevUnit ? prevUnit.title : `الوحدة 0${prevUnitNumber}`;
      
      const requiredThreshold = lockInfo?.minPassingScore || 70;
      const bestScore = this.getBestQuizScoreForUnit(prevUnitNumber);

      if (bestScore < requiredThreshold) {
        return {
          unitNumber,
          isLocked: true,
          lockType: 'prerequisite',
          previousUnitNumber: prevUnitNumber,
          previousUnitTitle: prevTitle,
          studentBestScore: bestScore,
          requiredScore: requiredThreshold,
          reason: `تتطلب هذه الوحدة إتقان الوحدة السابقة (الوحدة 0${prevUnitNumber}: ${prevTitle}) بنسبة ${requiredThreshold}% على الأقل في أحد التقييمات الأسبوعية. درجاتك الحالية: ${bestScore}%.`
        };
      }
    }

    // 5. الوحدة مستوفية للشروط ومفتوحة
    return {
      unitNumber,
      isLocked: false,
      lockType: 'none',
      reason: 'مستوفي لجميع الشروط ومسموح بالمذاكرة.'
    };
  }

  /**
   * فحص إمكانية وصول المستخدم للوحدة بناءً على دوره التعليمي (تكامل الواجهة)
   */
  isUnitAccessible(unitNumber: number, role?: UserRole): { isAccessible: boolean; lockInfo?: UnitLockState; prereqStatus?: PrerequisiteStatus } {
    const prereqStatus = this.checkUnitAccessStatus(unitNumber, role);
    const locks = this.getUnitLocks();
    const lockInfo = locks[unitNumber] || {
      unitNumber,
      isLocked: prereqStatus.isLocked,
      reason: prereqStatus.reason
    };

    return {
      isAccessible: !prereqStatus.isLocked,
      lockInfo: {
        ...lockInfo,
        isLocked: prereqStatus.isLocked,
        reason: prereqStatus.reason
      },
      prereqStatus
    };
  }

  /**
   * فحص صلاحية معينة لدور المستخدم مع مراعاة الصلاحيات المخصصة
   */
  hasPermission(role: UserRole, permission: AppPermission, user?: UserProfile): boolean {
    const targetUser = user || this.getCurrentUser();
    // إذا كان للمستخدم تخصيص استثنائي مباشر
    if (targetUser.customPermissions && targetUser.customPermissions.includes(permission)) {
      return true;
    }
    const rule = ROLE_PERMISSION_RULES.find(r => r.permission === permission);
    if (!rule) return false;
    return rule.allowedRoles.includes(role);
  }

  /**
   * جلب قائمة كافة الصلاحيات الممنوحة لدور محدد
   */
  getPermissionsForRole(role: UserRole): AppPermission[] {
    return ROLE_PERMISSION_RULES
      .filter(rule => rule.allowedRoles.includes(role))
      .map(rule => rule.permission);
  }

  // ==========================================
  // Enterprise User Management & Audit Logging
  // ==========================================

  /**
   * حذف مستخدم نهائياً من قاعدة البيانات المحلية
   */
  deleteUser(userId: string): { success: boolean; message: string } {
    const currentUser = this.getCurrentUser();
    if (userId === currentUser.id) {
      return { success: false, message: 'لا يمكن حذف الحساب النشط حالياً، يرجى التبديل لحساب آخر أولاً.' };
    }

    const all = this.getAllUsers();
    const target = all.find(u => u.id === userId);
    if (!target) {
      return { success: false, message: 'المستخدم غير موجود.' };
    }

    const updated = all.filter(u => u.id !== userId);
    try {
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updated));
      localStorage.removeItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${userId}`);
      
      this.recordAuditLog({
        action: 'delete_user',
        targetUserId: userId,
        targetUserName: target.name,
        details: `تم حذف حساب المستخدم (${target.name} - ${target.role}) نهائياً`
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('rowad_user_updated', { detail: this.getCurrentUser() }));
      }
      return { success: true, message: `تم حذف حساب ${target.name} بنجاح.` };
    } catch (e) {
      return { success: false, message: 'فشلت عملية الحذف بسبب قيود التخزين.' };
    }
  }

  /**
   * تغيير حالة المستخدم (نشط / موقوف / معلق)
   */
  updateUserStatus(userId: string, newStatus: UserStatus): void {
    const all = this.getAllUsers();
    const user = all.find(u => u.id === userId);
    if (user) {
      user.status = newStatus;
      try {
        localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(all));
        if (userId === this.getCurrentUser().id) {
          const current = this.getCurrentUser();
          current.status = newStatus;
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(current));
        }

        this.recordAuditLog({
          action: newStatus === 'suspended' ? 'suspend_user' : 'activate_user',
          targetUserId: user.id,
          targetUserName: user.name,
          details: `تم تحديث حالة المستخدم إلى: ${newStatus === 'active' ? 'نشط' : newStatus === 'suspended' ? 'موقوف مؤقتاً' : 'معلق'}`
        });

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('rowad_user_updated', { detail: this.getCurrentUser() }));
        }
      } catch {}
    }
  }

  /**
   * تغيير دور مستخدم محدد (من قِبل المشرف/المعلم)
   */
  updateUserRole(userId: string, newRole: UserRole): void {
    const all = this.getAllUsers();
    const user = all.find(u => u.id === userId);
    if (user) {
      const oldRole = user.role;
      user.role = newRole;
      if (newRole === 'teacher') user.avatar = '👨‍🏫';
      else if (newRole === 'parent') user.avatar = '👨‍👩‍👧';
      else if (newRole === 'auditor') user.avatar = '🛡️';
      else user.avatar = '🎓';

      try {
        localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(all));
        if (userId === this.getCurrentUser().id) {
          this.saveCurrentUser(user);
        }

        this.recordAuditLog({
          action: 'switch_role',
          targetUserId: user.id,
          targetUserName: user.name,
          details: `تم ترقية/تعديل دور المستخدم من (${oldRole}) إلى (${newRole})`
        });

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('rowad_user_updated', { detail: this.getCurrentUser() }));
        }
      } catch {}
    }
  }

  /**
   * تعديل صلاحيات مخصصة لمستخدم (Granular Permission Assignment)
   */
  updateUserCustomPermissions(userId: string, permissions: AppPermission[]): void {
    const all = this.getAllUsers();
    const user = all.find(u => u.id === userId);
    if (user) {
      user.customPermissions = permissions;
      try {
        localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(all));
        if (userId === this.getCurrentUser().id) {
          const current = this.getCurrentUser();
          current.customPermissions = permissions;
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(current));
        }

        this.recordAuditLog({
          action: 'update_user',
          targetUserId: user.id,
          targetUserName: user.name,
          details: `تم تحديث الصلاحيات المخصصة للمستخدم (${permissions.length} صلاحيات)`
        });

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('rowad_user_updated', { detail: this.getCurrentUser() }));
        }
      } catch {}
    }
  }

  /**
   * تسجيل عملية في سجل التدقيق الأمني (Audit Log)
   */
  recordAuditLog(params: {
    action: AuditLogItem['action'];
    targetUserId?: string;
    targetUserName?: string;
    details: string;
  }): void {
    try {
      const current = this.getCurrentUser();
      const logs = this.getAuditLogs();
      const newEntry: AuditLogItem = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toISOString(),
        actorId: current.id,
        actorName: current.name,
        actorRole: current.role,
        action: params.action,
        targetUserId: params.targetUserId,
        targetUserName: params.targetUserName,
        details: params.details
      };
      logs.unshift(newEntry);
      // Keep latest 100 log entries
      if (logs.length > 100) logs.pop();
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
      window.dispatchEvent(new CustomEvent('rowad_audit_logs_updated', { detail: logs }));
    } catch {}
  }

  /**
   * استرجاع سجلات التدقيق
   */
  getAuditLogs(): AuditLogItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'audit_init_1',
        timestamp: new Date().toISOString(),
        actorId: 'system',
        actorName: 'نظام الحوكمة الرقمية',
        actorRole: 'auditor',
        action: 'activate_user',
        details: 'تهيئة سجل الرقابة والحوكمة المعتمد لمنصة البكالوريا المصرية 2027'
      }
    ];
  }

  /**
   * تصدير منظومة المستخدمين بالكامل كـ JSON
   */
  exportEnterpriseRosterJson(): string {
    const data = {
      version: '2.5.0-Enterprise',
      exportedAt: new Date().toISOString(),
      exporter: this.getCurrentUser().name,
      users: this.getAllUsers(),
      unitLocks: this.getUnitLocks(),
      auditLogs: this.getAuditLogs()
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * استيراد وتطبيق قاعدة مستخدمين من ملف JSON
   */
  importEnterpriseRosterJson(jsonString: string): { success: boolean; count: number; message: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !Array.isArray(parsed.users)) {
        return { success: false, count: 0, message: 'تنسيق الملف غير صالح، يجب أن يحتوي على مصفوفة users.' };
      }
      const existing = this.getAllUsers();
      let importedCount = 0;

      for (const u of parsed.users) {
        if (!u.id || !u.name) continue;
        const normalized = this.normalizeUserProfile(u);
        const idx = existing.findIndex(ex => ex.id === normalized.id);
        if (idx >= 0) {
          existing[idx] = normalized;
        } else {
          existing.push(normalized);
        }
        importedCount++;
      }

      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(existing));
      if (parsed.unitLocks) {
        this.saveUnitLocks(parsed.unitLocks);
      }

      this.recordAuditLog({
        action: 'create_user',
        details: `تم استيراد ${importedCount} مستخدم دفعة واحدة من ملف بيانات مؤسسي`
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('rowad_user_updated', { detail: this.getCurrentUser() }));
      }
      return { success: true, count: importedCount, message: `تم استيراد وتحديث ${importedCount} حساب بنجاح.` };
    } catch (err: any) {
      return { success: false, count: 0, message: `خطأ في تحليل الملف: ${err.message || 'بيانات غير متوافقة'}` };
    }
  }
}

export const lmsService = new LmsService();
