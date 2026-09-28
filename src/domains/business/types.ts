export interface PedagogicalStations {
  // 🧭 المرحلة الأولى: اليقظة الريادية والاستكشاف السياقي
  guidingQuestion?: string; // المحطة 1: سؤال توجيهي واستثارة فكرية
  strategicKey?: string;
  introduction?: string; // المحطة 2: مقدمة وسيناريو دراسة الحالة
  caseScenario?: {
    title?: string;
    scenario?: string;
    story?: string;
    dilemma?: string;
    marketSignificance?: string;
  };

  // 🧠 المرحلة الثانية: البناء المفاهيمي والهندسة المعرفية
  learnTitle?: string; // المحطة 3: تعلّم وتأصيل المتن المعرفي
  learnContent?: string;
  learnPoints?: string[];
  competitivePatterns?: { // المحطة 4: الاستكشاف وتحليل الأنماط التنافسية
    title?: string;
    description?: string;
    patterns?: string[];
    marketShiftAnalysis?: string;
  };
  explore?: string; // المحطة 4 (توافق)
  analyzedExample?: { // المحطة 5: مثال ونموذج استرشادي مبرر
    title: string;
    scenario: string;
    analysis: string;
    justification?: string;
  };
  operationalCalculations?: { // المحطة 6: الشرح والعمليات الحسابية والتشغيلية
    title?: string;
    description?: string;
    formula?: string;
    calculationSteps?: string[];
    sampleProblem?: string;
    financialLogic?: string;
  };
  explain?: string; // المحطة 6 (توافق)

  // 💼 المرحلة الثالثة: المحاكاة الاستراتيجية والممارسة التنفيذية
  thinkAsEntrepreneur?: { // المحطة 7: فكّر كرائد أعمال
    title?: string;
    scenario?: string;
    opportunity?: string;
    valueProposition?: string;
    riskManagement?: string;
  };
  thinkAsProfessional?: string; // المحطة 7 (توافق)
  thinkAsManager?: { // المحطة 8: فكّر كمدير
    title: string;
    scenario: string;
    decisionQuestion: string;
    guidance: string;
    resourceGovernance?: string;
    delegation?: string;
    qualityControl?: string;
  };
  lifeApplication?: string; // المحطة 9: تطبيق حياتي واستدامة الأعمال
  sustainabilityDimension?: string;
  strategicFrameworks?: { // المحطة 10: بنية المعرفة والهياكل الاستراتيجية
    title?: string;
    frameworkName?: string;
    description?: string;
    dimensions?: string[];
    diagramType?: 'breakeven' | 'maslow' | 'pestel' | 'swot' | 'stakeholders' | 'production' | 'leadership' | 'valuechain';
    table?: { headers: string[]; rows: { label: string; values: string[] }[] };
  };
  toolOrMetric?: { // المحطة 10 (توافق)
    title: string;
    description: string;
    diagramType?: 'breakeven' | 'maslow' | 'pestel' | 'swot' | 'stakeholders' | 'production' | 'leadership' | 'valuechain';
    table?: { headers: string[]; rows: { label: string; values: string[] }[] };
  };
  connectToWorld?: string;

  // 🧪 المرحلة الرابعة: ضبط النزاهة المعرفية وتصحيح المسار
  marketResearch?: { // المحطة 11: طبيعة المعرفة الاقتصادية وبحوث السوق
    title?: string;
    methodology?: string;
    dataCollection?: string;
    empiricalInsight?: string;
  };
  natureOfBusiness?: string; // المحطة 11 (توافق)
  challengeIdea?: { // المحطة 12: التصورات الخطأ والفخاخ الإدارية
    trap: string;
    correction: string;
    scientificDeconstruction?: string;
  };
  formulasSummary?: { // المحطة 13: المعادلات والمفاهيم في لمحة
    title?: string;
    formulas?: { name: string; formula: string; note: string }[];
    coreRelationships?: string[];
  };

  // 🥇 المرحلة الخامسة: التمكين والاتقان وحوكمة الاستدلال
  tryYourself?: string; // المحطة 14: حاول بنفسك وتمارين موجهة
  tryYourselfAnswer?: string;
  practice?: { // المحطة 14 (توافق)
    question: string;
    answer: string;
  };
  tieredTraining?: { // المحطة 15: تدريب وتقييمات متدرجة الصعوبة (النماذج أ، ب، ج)
    modelA?: { title: string; question: string; answer: string; bloom: string };
    modelB?: { title: string; question: string; answer: string; bloom: string };
    modelC?: { title: string; question: string; answer: string; bloom: string };
  };
  jreQuestion?: { // المحطة 16: تحدّ تفكيرك (مختبر الحكم والاستدلال JRE)
    prompt: string;
    criteria?: string;
    judgment?: string;
    reasoning?: string;
    evidence?: string;
    counterArgument?: string;
    conclusion?: string;
    modelConclusion?: string;
  };
  reflect?: string; // المحطة 17: فكّر وتأمل والمراجعة المستدامة
  cumulativeReviewLinks?: string[];
}

export interface UnitConcept {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  keyPoints: string[];
  examTip?: string;
  examTrap?: string;
  businessManagerBox?: {
    title: string;
    scenario: string;
    decisionQuestion: string;
    guidance: string;
  };
  comparisonTable?: {
    headers: string[];
    rows: { label: string; values: string[] }[];
  };
  diagramType?: 'breakeven' | 'maslow' | 'pestel' | 'swot' | 'stakeholders' | 'production' | 'leadership' | 'valuechain';
}

export interface TeacherPedagogicalStationGuide {
  stationNumber: number;
  stationName: string;
  inquiry: string; // التساؤل أو التحدي المطروح بالمحطة
  modelAnswer: string; // الإجابة النموذجية والاستدلالية
  teacherGuidance: string; // التوجيه والهدف التربوي لإدارة الحوار الصفي للمعلم
  pedagogicalObjective: string; // ناتج التعلم ومستوى بلوم
  commonMistakesToAddress?: string; // التنبيه للأخطاء الشائعة والتصويب
}

export interface UnitLesson {
  id: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  guidingQuestion: string;
  introduction: string;
  priorContext?: string; // الموقف التمهيدي
  behavioralDimension?: string; // البعد السلوكي والتربوي
  curriculumLinks?: string[]; // الرابط المنهجي
  lessonSummary?: string; // خلاصة الدرس
  tieredTraining?: { level: string; task: string }[]; // تدريب متدرج
  examTrapsList?: { trap: string; correction: string }[]; // فخ الامتحان
  analysisTool?: {
    title: string;
    description: string;
    questions?: string[];
    table?: { headers: string[]; rows: { label: string; values: string[] }[] };
    application?: string;
    steps?: string[];
  };
  concepts: UnitConcept[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  stations?: PedagogicalStations;
  teacherStationsGuide?: TeacherPedagogicalStationGuide[];
}

export interface UnitData {
  id: string;
  number: number;
  part: 1 | 2;
  title: string;
  englishTitle: string;
  icon: string;
  color: string;
  badge: string;
  overview: string;
  bigIdea: string;
  philosophy?: string; // فلسفة هذا الكتاب
  curriculumMap?: { // خريطة المنهج في فكرة واحدة
    singleIdea: string;
    coreSections: { title: string; question: string }[];
    futureConnections: string;
  };
  integrativeCases?: { // التطبيق التكاملي: ثلاث حالات رسمية
    id: string;
    name: string;
    story: string;
    analysisPath: string;
  }[];
  smartReviewBank?: { // بنك المراجعة الذكي
    mcqStrategy: string[];
    essayStrategy: string;
    selfQuiz: string[];
  };
  finalConnectingCard?: string; // بطاقة الربط النهائي
  references?: string[]; // المراجع
  essentialQuestions: string[];
  learningOutcomes: string[];
  caseStudy: {
    title: string;
    story: string;
    discussionQuestions: string[];
    analysis: string;
  };
  lessons: UnitLesson[];
  jreQuestion: {
    prompt: string;
    background: string;
    judgmentCriteria: string;
    modelAnswer: {
      judgment: string;
      reasoning: string;
      evidence: string;
      counterArgument: string;
      conclusion: string;
    };
  };
}

export interface WeeklyAssessmentModel {
  modelName: 'أ' | 'ب' | 'ج';
  mcqQuestion: {
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  openQuestions: {
    prompt: string;
    modelAnswer: string;
  }[];
}

export interface PeriodAssessment {
  periodNumber: number;
  periodTitle: string;
  classActivity?: {
    title: string;
    type: string;
    steps?: string[];
    task: string;
    guidance?: string;
    modelAnswer?: string;
    evidenceGuideline?: string;
  };
  homeworkActivity?: {
    title?: string;
    questions: {
      id: string;
      text: string;
      modelAnswer: string;
      evidenceExplanation?: string;
    }[];
  };
}

export interface WeeklyAssessmentItem {
  id: string;
  unitId: string;
  unitNumber?: number;
  lessonNumber?: number;
  lessonTitle?: string;
  unitTitle: string;
  weekNumber: number;
  sectionTitle: string;
  periods?: PeriodAssessment[];
  evidenceGuide?: {
    formula: string;
    explanation: string;
    acceptanceCriteria?: string[];
  };
  classActivity: {
    title: string;
    type: string;
    steps: string[];
    task: string;
    guidance: string;
  };
  homeworkActivity: {
    questions: {
      id: string;
      text: string;
      modelAnswer: string;
      evidenceExplanation?: string;
    }[];
  };
  weeklyModels: WeeklyAssessmentModel[];
}

export interface HardenedQuestionLineage {
  officialUnit: string;
  officialSection: string;
  sourcePage: string;
  sourceType: 'TEXTBOOK' | 'ASSESSMENT' | 'PERFORMANCE_TASK' | 'BANK' | 'DERIVED';
  sourceStatus: 'OFFICIAL_SOURCE' | 'PLATFORM_DERIVED' | 'U01-CROSS' | 'DERIVED_FROM_OFFICIAL_CURRICULUM';
  concept: string;
  lo: string;
  subLo: string;
  skill: string;
  calculationAudit?: { formula: string; result: string; status: 'PASS' | 'REVIEW' };
  jreStructure?: { judgment: string; reasoning: string; evidence: string; counterArgument: string; conclusion: string };
  crossUnitScope?: string;
  duplicationStatus: 'CANONICAL' | 'MERGED_VARIANT' | 'CROSS_UNIT' | 'REVIEW' | 'CANONICAL_NEW';
}

export interface BankQuestion {
  id: string;
  unitId: string;
  unitNumber: number;
  questionNumber?: number;
  lessonNumber?: number;
  lessonTitle?: string;
  cardId?: string;
  learningOutcome?: string;
  estimatedTime?: string;
  type: 'mcq' | 'true_false' | 'short_essay' | 'calculation' | 'jre' | 'case_study' | 'open_essay';
  bloomLevel: 'تذكر' | 'فهم' | 'تطبيق' | 'تحليل' | 'تقييم' | 'حكم واستدلال';
  difficulty: 'تأسيسي' | 'متوسط' | 'متقدم' | 'تحدي';
  question: string;
  options?: string[];
  correctAnswer: string | number; // index for mcq or boolean or text
  isTrue?: boolean;
  correctionNote?: string; // if true/false is false
  explanation: string;
  systematicJustification?: string; // التفسير الاستدلالي المنهجي وفق نموذج الكتاب المدرسي والتقييمات
  reasoningPath?: string; // مسار الاستدلال العلمي
  distractorAnalysis?: { option: string; whyIncorrect: string }[];
  modelAnswerDetails?: string[];
  rubricScore?: number;
  // Golden Data Contract Hardening
  lineage?: HardenedQuestionLineage;
  officialUnit?: string;
  officialSection?: string;
  sourcePage?: string;
  sourceType?: 'TEXTBOOK' | 'ASSESSMENT' | 'PERFORMANCE_TASK' | 'BANK' | 'DERIVED';
  sourceStatus?: 'OFFICIAL_SOURCE' | 'PLATFORM_DERIVED' | 'U01-CROSS' | 'DERIVED_FROM_OFFICIAL_CURRICULUM';
  concept?: string;
  lo?: string;
  subLo?: string;
  skill?: string;
  calculationAudit?: { formula: string; result: string; status: 'PASS' | 'REVIEW' };
  jreStructure?: { judgment: string; reasoning: string; evidence: string; counterArgument: string; conclusion: string };
  crossUnitScope?: string;
  duplicationStatus?: 'CANONICAL' | 'MERGED_VARIANT' | 'CROSS_UNIT' | 'REVIEW' | 'CANONICAL_NEW';
}

export interface GlossaryItem {
  english: string;
  arabic: string;
  definition: string;
  unitNumber: number;
  unitTitle: string;
  realWorldExample: string;
}

export interface TextbookQuestion {
  id: string; // e.g. "U01-BOOK-Q01"
  questionNumber: number;
  sectionNumber: number;
  sectionTitle: string;
  page: string;
  axis: string;
  bloomLevel: 'تذكر' | 'فهم' | 'تطبيق' | 'تحليل' | 'تقييم' | 'حكم واستدلال';
  difficulty: 'تأسيسي' | 'متوسط' | 'متقدم' | 'تحدي';
  questionType: 'open_essay' | 'short_essay' | 'mcq' | 'true_false' | 'classification' | 'table_analysis' | 'table_completion' | 'case_study' | 'calculation' | 'jre';
  questionText: string;
  options?: string[];
  correctOptionIndex?: number;
  isTrue?: boolean;
  correctionText?: string;
  modelAnswer: string;
  distractorAnalysis?: { option: string; whyIncorrect: string }[];
  systematicJustification?: string;
  reasoningPath?: string;
  rubricBreakdown?: Record<string, string>;
  tableData?: {
    headers: string[];
    rows: { col1: string; col2: string; col3?: string }[];
  };
  tableHeaders?: string[];
  tableRows?: {
    rowTitle: string;
    correctAnswers: string[];
  }[];
  rubricsTable?: { score: string; description: string }[];
  strongJudgmentRequirements?: string[];
  estimatedTime?: string;
  rubricScore?: number;
  notes?: string;
}

export interface PerformanceTaskItem {
  id: string;
  lessonId: string;
  lessonName: string;
  officialMapping: string;
  concept: string;
  subLo: string;
  skill: string;
  bloom: string;
  bloomCategory: 'فهم' | 'تطبيق' | 'تحليل';
  difficulty: string;
  difficultyCategory: 'تأسيسي' | 'متوسط';
  sourcePages: string;
  sourceMatch: 'HIGH' | 'PARTIAL';
  assessmentType: string;
  duplication: 'CANONICAL' | 'MERGED_VARIANT';
  question: string;
  modelAnswer: string;
  modelAnswerTable?: {
    headers: string[];
    rows: string[][];
  };
  rationale?: string;
  reasoningPath?: string;
  performanceStandard?: string;
  note?: string;
  answerAudit: string;
}

export interface UnitPerformanceMapItem {
  lessonId: string;
  domain: string;
  subLo: string;
  skill: string;
}

export interface AssessmentMatrixRow {
  qid: string;
  lesson: string;
  concept: string;
  subLo: string;
  skill: string;
  bloom: string;
  difficulty: string;
  sourceMatch: 'HIGH' | 'PARTIAL';
  duplication: 'CANONICAL' | 'MERGED_VARIANT';
}

export interface MinistryClassActivityQuestion {
  number: number;
  text: string;
  modelAnswer: string;
  rationale: string;
  reasoningPath?: string;
}

export interface MinistryClassActivity {
  title: string;
  description?: string;
  steps?: string[];
  task?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  questions?: MinistryClassActivityQuestion[];
  modelAnswer: string;
  rationale: string;
  reasoningPath?: string;
}

export interface MinistryHomeworkQuestion {
  number: number;
  id: string;
  question: string;
  modelAnswer: string;
  rationale: string;
  reasoningPath?: string;
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface MinistryPerformancePeriod {
  periodNumber: number; // 1 or 2
  periodTitle: string; // 'الفترة الأولى' | 'الفترة الثانية'
  classActivity: MinistryClassActivity;
  homeworkQuestions: MinistryHomeworkQuestion[];
}

export interface MinistryWeeklyMCQ {
  id: string;
  questionNumber?: number;
  text: string;
  options: string[];
  correctIndex: number;
  correctLetter: string;
  explanation: string;
  rationale: string;
}

export interface MinistryWeeklyWrittenQuestion {
  id: string;
  number: number;
  text: string;
  modelAnswer: string;
  rationale: string;
  reasoningPath?: string;
  subItems?: { label: string; type: string; answer: string }[];
  tableData?: { headers: string[]; rows: string[][] };
}

export interface MinistryWeeklyModel {
  modelName: 'أ' | 'ب' | 'ج';
  mcqQuestions: MinistryWeeklyMCQ[];
  writtenQuestions: MinistryWeeklyWrittenQuestion[];
}

export interface MinistryWeekAssessmentData {
  weekNumber: number;
  sectionTitle: string;
  unitNumber: number;
  unitTitle: string;
  lessonName: string;
  pdfPages: string;
  performancePeriods: MinistryPerformancePeriod[];
  weeklyEvaluation: {
    periodNumber: 3;
    periodTitle: string; // 'الفترة الثالثة'
    evaluationTitle: string; // 'التقييم الأسبوعي'
    models: MinistryWeeklyModel[];
  };
}

// ==========================================
// Central Governance & Traceability Types
// ==========================================
export type ContentOrigin = 'MINISTRY_OFFICIAL' | 'PLATFORM_EXPLANATION' | 'ENRICHMENT' | 'UNVERIFIED';
export type VerificationStatus = 'VERIFIED' | 'PENDING_REVIEW' | 'UNVERIFIED';

export interface SourceRecord {
  id: string;
  title: string;
  type: ContentOrigin;
  authority: string;
  unit?: number | string;
  lesson?: number | string;
  page?: string;
  section?: string;
  sourceFile: string;
  sourceVersion: string;
  verificationStatus: VerificationStatus;
  verifiedAt: string;
  notes: string;
}

export interface TraceableMetadata {
  contentOrigin: ContentOrigin;
  sourceId?: string;
  unitId?: string;
  lessonId?: string;
  page?: string | number;
  verificationStatus?: VerificationStatus;
  notes?: string;
}

// ==========================================
// LMS & World-Class User Platform Architecture
// ==========================================
export type UserRole = 'student' | 'teacher' | 'parent' | 'auditor';

export type AppPermission = 
  | 'view_content'             // تصفح محتوى الكتاب والدروس
  | 'attempt_questions'        // حل بنك الأسئلة والتقييمات
  | 'view_model_answers'       // الاطلاع على نموذج الإجابة والتبرير
  | 'manage_unit_locks'        // حجب وفتح الوحدات الدراسية
  | 'view_detailed_analytics'  // الاطلاع على تحليلات بلوم ونواتج التعلم
  | 'view_governance_matrix'   // فحص مطابقة نصوص كتاب الوزارة
  | 'export_reports'           // تصدير كشوف الدرجات والتقارير
  | 'manage_users';            // إدارة وتبديل الحسابات

export interface RolePermissionRule {
  permission: AppPermission;
  label: string;
  description: string;
  allowedRoles: UserRole[];
}

export type UnitLockMode = 'manual' | 'prerequisite' | 'both';

export interface UnitLockState {
  unitNumber: number;
  isLocked: boolean;
  lockMode?: UnitLockMode;           // 'manual' (إغلاق يدوي من المعلم) أو 'prerequisite' (تلقائي تتابعي)
  reason?: string;
  lockedBy?: string;
  lockedAt?: string;
  manualOverride?: 'unlocked' | 'locked'; // استثناء يدوي فرضه المعلم
  minPassingScore?: number;         // النسبة المطلوبة في الوحدة السابقة لفتحها (افتراضياً 70%)
}

export interface PrerequisiteStatus {
  unitNumber: number;
  isLocked: boolean;
  lockType: 'manual' | 'prerequisite' | 'none';
  reason: string;
  previousUnitNumber?: number;
  previousUnitTitle?: string;
  studentBestScore?: number;
  requiredScore?: number;
  isExempted?: boolean;
}

export interface UserBadge {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  category: 'mastery' | 'streak' | 'exam' | 'jre' | 'dedication';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface DailyQuestItem {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  current: number;
  target: number;
  isCompleted: boolean;
  claimed: boolean;
  actionTab?: string;
}

export interface UserBookmarkItem {
  id: string;
  title: string;
  type: 'concept' | 'question' | 'station' | 'summary' | 'diagram' | 'assessment';
  unitNumber: number;
  lessonTitle?: string;
  details?: string;
  savedAt: string;
}

export interface UserNoteItem {
  id: string;
  title: string;
  content: string;
  unitNumber: number;
  lessonTitle?: string;
  tags: string[];
  updatedAt: string;
}

export interface MistakeItem {
  id: string;
  questionId: string;
  questionText: string;
  questionType: string;
  unitNumber: number;
  studentWrongAnswer: string;
  correctAnswer: string;
  explanation: string;
  recordedAt: string;
  resolved: boolean;
  attempts: number;
}

export interface UserStudyPlan {
  weeklyTargetHours: number;
  dailyStudyPace: 'light' | 'moderate' | 'intensive';
  targetExamDate?: string;
  unitGoals: {
    unitNumber: number;
    title: string;
    status: 'pending' | 'in_progress' | 'completed';
    targetDate?: string;
    estimatedHours: number;
  }[];
}

export type UserStatus = 'active' | 'suspended' | 'pending';

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: 'create_user' | 'update_user' | 'delete_user' | 'switch_role' | 'toggle_unit_lock' | 'reset_progress' | 'export_data' | 'suspend_user' | 'activate_user';
  targetUserId?: string;
  targetUserName?: string;
  details: string;
  ipAddress?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  status?: UserStatus;
  customPermissions?: AppPermission[]; // تخصيص استثنائي للصلاحيات
  tags?: string[];                     // وسوم التصنيف (فصل 2/1، شعبة متميزة، متفوقين)
  avatar: string;
  role: UserRole;
  grade: string;
  school?: string;
  track: string;
  dailyGoalQuestions: number;
  studyStreak: {
    currentDays: number;
    bestDays: number;
    lastStudyDate: string;
    freezeTokens: number;
  };
  gamification: {
    xp: number;
    level: number;
    levelTitle: string;
    badges: UserBadge[];
  };
  dailyQuests: DailyQuestItem[];
  bookmarks: UserBookmarkItem[];
  personalNotes: UserNoteItem[];
  mistakeNotebook: MistakeItem[];
  studyPlan: UserStudyPlan;
  createdAt: string;
  lastLogin: string;
}

export interface StudentProfile extends UserProfile {
  // Backwards compatibility
}

export interface StudentMasteryItem {
  loId: string;
  loTitle: string;
  unitNumber: number;
  score: number; // 0 to 4
  level: 'لم يبدأ' | 'بدأ' | 'يحتاج تدريب' | 'جيد' | 'متقن';
  totalQuestionsAttempted: number;
  correctCount: number;
  errorCount: number;
  bloomBreakdown: Record<string, { correct: number; total: number }>;
  lastAttemptAt?: string;
  needsReview: boolean;
}

export interface StudentProgress {
  studentId: string;
  currentUnit: number;
  completedLessons: string[];
  answeredQuestions: Record<string, {
    questionId: string;
    unitNumber: number;
    loId?: string;
    isCorrect: boolean;
    selectedAnswer: any;
    bloomLevel?: string;
    difficulty?: string;
    attempts: number;
    answeredAt: string;
  }>;
  quizAttempts: Array<{
    id: string;
    assessmentId: string;
    unitNumber: number;
    title: string;
    score: number;
    total: number;
    percentage: number;
    completedAt: string;
    durationSeconds: number;
    weakLOs: string[];
    errorConcepts: string[];
  }>;
  jreSubmissions: Array<{
    id: string;
    questionId: string;
    unitNumber: number;
    studentAnswer: string;
    feedback: string;
    rubricBreakdown?: Record<string, number>;
    submittedAt: string;
  }>;
  testScores?: Array<{
    assessmentId: string;
    unitId: string;
    score: number;
    total: number;
    percentage: number;
    date: string;
  }>;
  timeSpentMinutes: number;
  lastActive: string;
}

// ==========================================
// Assessment Engine Types
// ==========================================
export interface AssessmentQuizDefinition {
  id: string;
  unitId: string;
  unitNumber: number;
  title: string;
  description: string;
  durationMinutes: number;
  attemptsAllowed: number;
  scoringPolicy: 'highest' | 'latest' | 'average';
  sourceType: ContentOrigin;
  sourceId: string;
  learningObjectives: string[];
  questions: BankQuestion[];
}

export interface AssessmentDiagnosticResult {
  score: number;
  totalPoints: number;
  percentage: number;
  bloomPerformance: Record<string, { correct: number; total: number }>;
  weakLearningObjectives: string[];
  conceptsToReview: string[];
  qualitativeFeedback: string;
  recommendedActions: string[];
}


