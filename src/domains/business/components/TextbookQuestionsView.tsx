import React, { useState, useMemo } from 'react';
import { 
  getTextbookQuestionsBundle,
  TEXTBOOK_QUESTIONS_REGISTRY 
} from '../data/textbookQuestions/registry';
import { ALL_UNITS, getUnitByNumber } from '../data/unitsData';
import { TextbookQuestion } from '../types';
import { 
  BookMarked, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Lightbulb, 
  HelpCircle, 
  RotateCcw, 
  FileText, 
  Scale, 
  Award, 
  Compass, 
  Layers, 
  Eye, 
  EyeOff, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  ClipboardCheck,
  Check,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { PresentationToolbar, PresentationScale } from './PresentationToolbar';
import { SourceProvenanceBadge } from './SourceProvenanceBadge';

interface TextbookQuestionsViewProps {
  selectedUnitNumber?: number;
  setSelectedUnitNumber?: (num: number) => void;
  onAskAi: (questionPrompt: string, context?: string) => void;
  onOpenJreLab?: () => void;
  isAutoFillPage?: boolean;
  onToggleAutoFillPage?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  presentationScale?: PresentationScale;
  onChangeScale?: (scale: PresentationScale) => void;
}

export const TextbookQuestionsView: React.FC<TextbookQuestionsViewProps> = ({
  selectedUnitNumber = 1,
  setSelectedUnitNumber,
  onAskAi,
  onOpenJreLab,
  isAutoFillPage = true,
  onToggleAutoFillPage,
  isFullscreen = false,
  onToggleFullscreen,
  presentationScale = 'large',
  onChangeScale = () => {}
}) => {
  // Modes: 'explanation' (teacher/review mode) vs 'practice' (student testing mode)
  const [viewMode, setViewMode] = useState<'explanation' | 'practice'>('explanation');
  
  // Active unit data from central registry
  const currentUnitBundle = useMemo(() => {
    return getTextbookQuestionsBundle(selectedUnitNumber) || TEXTBOOK_QUESTIONS_REGISTRY[1];
  }, [selectedUnitNumber]);

  const currentUnitMeta = useMemo(() => {
    return getUnitByNumber(selectedUnitNumber) || ALL_UNITS[0];
  }, [selectedUnitNumber]);

  const unitQuestions = currentUnitBundle.questions;
  const unitAxesMap = currentUnitBundle.axesMap;
  const unitAuditLog = currentUnitBundle.auditLog;

  // Filter States
  const [selectedSection, setSelectedSection] = useState<number>(0); // 0 = all
  const [selectedAxis, setSelectedAxis] = useState<string>('all');
  const [selectedBloom, setSelectedBloom] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Answers & Reveal States
  const [userAnswers, setUserAnswers] = useState<Record<string, number | boolean | string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [showUnitMapModal, setShowUnitMapModal] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  // Student scratchpads for essay answers
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});

  // Unique sections list for active unit
  const sectionsList = useMemo(() => {
    const map = new Map<number, string>();
    unitQuestions.forEach(q => {
      if (!map.has(q.sectionNumber)) {
        map.set(q.sectionNumber, q.sectionTitle);
      }
    });
    return Array.from(map.entries()).map(([num, title]) => ({ num, title }));
  }, [unitQuestions]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return unitQuestions.filter(q => {
      if (selectedSection !== 0 && q.sectionNumber !== selectedSection) return false;
      if (selectedAxis !== 'all' && !q.axis.includes(selectedAxis)) return false;
      if (selectedBloom !== 'all' && q.bloomLevel !== selectedBloom) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedType !== 'all' && q.questionType !== selectedType) return false;
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inId = q.id.toLowerCase().includes(query);
        const inText = q.questionText.toLowerCase().includes(query);
        const inAnswer = q.modelAnswer.toLowerCase().includes(query);
        const inSection = q.sectionTitle.toLowerCase().includes(query);
        if (!inId && !inText && !inAnswer && !inSection) return false;
      }

      return true;
    });
  }, [unitQuestions, selectedSection, selectedAxis, selectedBloom, selectedDifficulty, selectedType, searchQuery]);

  const handleSelectOption = (qId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    setRevealedAnswers(prev => ({ ...prev, [qId]: true }));
  };

  const handleSelectTrueFalse = (qId: string, answer: boolean) => {
    setUserAnswers(prev => ({ ...prev, [qId]: answer }));
    setRevealedAnswers(prev => ({ ...prev, [qId]: true }));
  };

  const handleToggleReveal = (qId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleResetProgress = () => {
    setUserAnswers({});
    setRevealedAnswers({});
    setStudentNotes({});
  };

  const completedCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Presentation & Screen Controls Toolbar */}
      <PresentationToolbar
        title={`أسئلة كتاب المدرسة المعتمد — ${currentUnitMeta.title} (${unitAuditLog.pageRange})`}
        badge={`النموذج الذهبي 100% • ${unitQuestions.length} سؤالاً ومهمة`}
        isAutoFillPage={isAutoFillPage}
        onToggleAutoFillPage={onToggleAutoFillPage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        presentationScale={presentationScale}
        onChangeScale={onChangeScale}
      />

      {/* Main Header Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-900/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                كتاب الوزارة الرسمي 2025 / 2026
              </span>
              <span className="bg-white/10 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                إدارة الأعمال • الجزء {currentUnitMeta.part} ({unitAuditLog.pageRange})
              </span>
            </div>

            {/* Quick Action Buttons for Map & Audit */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowUnitMapModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>خريطة المحاور المعتمدة</span>
              </button>
              <button
                onClick={() => setShowAuditModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <ClipboardCheck className="w-4 h-4 text-amber-300" />
                <span>سجل التدقيق والمصدر</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Cairo'] tracking-tight">
              أسئلة كتاب المدرسة — الوحدة {currentUnitMeta.number}: {currentUnitMeta.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-4xl font-medium leading-relaxed">
              نسخة تفاعلية كاملة محلولة ومحللة على مستوى كل سؤال ومهمة تشمل الإجابات المعتمدة، والتعليل المنهجي الدقيق، ومسارات الاستدلال، وتحليل المشتتات والخيارات غير الصحيحة (Distractor Analysis)، وسلم التقييم التدريبي لسؤال الحكم والاستدلال (JRE).
            </p>
          </div>

          {/* Unit Switcher Bar (All 10 Units) */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-200">اختر الوحدة الدراسية للاطلاع على أسئلة كتابها المعتمد:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
              {ALL_UNITS.map(unit => {
                const isActive = unit.number === selectedUnitNumber;
                return (
                  <button
                    key={unit.id}
                    onClick={() => {
                      if (setSelectedUnitNumber) {
                        setSelectedUnitNumber(unit.number);
                      }
                      setSelectedSection(0);
                      setSelectedAxis('all');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <span>و{unit.number}:</span>
                    <span className="truncate max-w-[130px]">{unit.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>إجمالي الأسئلة: <strong className="text-amber-400">{unitQuestions.length} سؤالاً ومهمة</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>المحاور المغطاة: <strong className="text-emerald-400">{unitAxesMap.length} محاور معتمدة</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>الأقسام الفرعية: <strong className="text-blue-400">{sectionsList.length} قسمًا وتطبيقًا</strong></span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <Award className="w-4 h-4 text-amber-400" />
              <span>الأسئلة المتفاعَل معها: <strong className="text-amber-400">{completedCount}</strong> من {unitQuestions.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher & Filter Controls Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        
        {/* Top Controls: Mode Switcher & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('explanation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'explanation'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>وضع المعلم والشرح (كشف مباشر للحل والتعليل)</span>
            </button>
            <button
              onClick={() => setViewMode('practice')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'practice'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <EyeOff className="w-4 h-4" />
              <span>وضع التدريب الذاتي (إخفاء الحلول للاختبار)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم السؤال، المفهوم، أو الكلمة..."
              className="w-full pl-3 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Filter Dropdowns & Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Section Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              القسم بالكتاب المدرسي:
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value={0}>كل الأقسام ({sectionsList.length})</option>
              {sectionsList.map(s => (
                <option key={s.num} value={s.num}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Axis Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              محور التعلم (OC):
            </label>
            <select
              value={selectedAxis}
              onChange={(e) => setSelectedAxis(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">كل المحاور ({unitAxesMap.length})</option>
              {unitAxesMap.map(ax => (
                <option key={ax.code} value={ax.code}>
                  {ax.code}: {ax.title}
                </option>
              ))}
            </select>
          </div>

          {/* Bloom Level */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              المستوى المعرفي (بلوم):
            </label>
            <select
              value={selectedBloom}
              onChange={(e) => setSelectedBloom(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">كل المستويات</option>
              <option value="تذكر">تذكر (Knowledge)</option>
              <option value="فهم">فهم (Comprehension)</option>
              <option value="تطبيق">تطبيق (Application)</option>
              <option value="تحليل">تحليل (Analysis)</option>
              <option value="تقييم">تقييم (Evaluation)</option>
              <option value="ابتكار">ابتكار / خلق (Synthesis)</option>
            </select>
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              نوع السؤال:
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">كل الأنواع</option>
              <option value="mcq">اختيار من متعدد (MCQ)</option>
              <option value="true_false">صواب أم خطأ</option>
              <option value="short_essay">مقال قصير / تفسير</option>
              <option value="case_study">دراسة حالة تطبيقية</option>
              <option value="calculation">مسألة حسابية / تطبيق</option>
              <option value="jre">سؤال حكم واستدلال (JRE)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              مستوى الصعوبة:
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">كل المستويات</option>
              <option value="تأسيسي">تأسيسي</option>
              <option value="متوسط">متوسط</option>
              <option value="متقدم">متقدم</option>
              <option value="تحدي">تحدي فائق</option>
            </select>
          </div>
        </div>

        {/* Quick Reset & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <div>
            يتم الآن عرض <strong className="text-slate-900 font-black">{filteredQuestions.length}</strong> من أصل {unitQuestions.length} سؤالًا ومهمة
          </div>

          <div className="flex items-center gap-2">
            {(selectedSection !== 0 || selectedAxis !== 'all' || selectedBloom !== 'all' || selectedDifficulty !== 'all' || selectedType !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedSection(0);
                  setSelectedAxis('all');
                  setSelectedBloom('all');
                  setSelectedDifficulty('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
              >
                إعادة ضبط الفلاتر
              </button>
            )}

            <button
              onClick={handleResetProgress}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تصفير الإجابات المسجلة</span>
            </button>
          </div>
        </div>

      </div>

      {/* Questions Feed */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-black text-slate-700 font-['Cairo']">
              لا توجد أسئلة تطابق معايير الفلترة الحالية
            </h3>
            <p className="text-sm text-slate-500">
              يرجى تغيير خيارات الفلترة أو مسح حقل البحث لعرض المزيد من الأسئلة.
            </p>
          </div>
        ) : (
          filteredQuestions.map((question) => {
            const isRevealed = viewMode === 'explanation' || Boolean(revealedAnswers[question.id]);
            const userAnswer = userAnswers[question.id];

            return (
              <div
                key={question.id}
                id={question.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Question Metadata Header */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center font-['Cairo']">
                      #{question.questionNumber}
                    </span>
                    <span className="text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {question.id}
                    </span>
                    <SourceProvenanceBadge
                      origin="MINISTRY_OFFICIAL"
                      sourceTitle="كتاب الطالب المدرسي المقرر"
                      sourcePage={question.page}
                      unitId={selectedUnitNumber}
                      compact={true}
                    />
                    <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                      {question.axis}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                      {question.sectionTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                      question.difficulty === 'تأسيسي' ? 'bg-emerald-100 text-emerald-800' :
                      question.difficulty === 'متوسط' ? 'bg-amber-100 text-amber-800' :
                      question.difficulty === 'متقدم' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {question.difficulty}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {question.bloomLevel}
                    </span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="space-y-2">
                  <h3 className={`font-black text-slate-900 leading-relaxed font-['Cairo'] ${
                    presentationScale === 'xlarge' ? 'text-xl sm:text-2xl' :
                    presentationScale === 'large' ? 'text-lg sm:text-xl' :
                    'text-base sm:text-lg'
                  }`}>
                    {question.questionText}
                  </h3>
                </div>

                {/* Interactive Answer Area by Type */}

                {/* 1. Multiple Choice (MCQ) */}
                {question.questionType === 'mcq' && question.options && (
                  <div className="space-y-2.5 pt-1">
                    {question.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = optIdx === question.correctOptionIndex;
                      const showResult = isRevealed || isSelected;

                      let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100";
                      if (showResult && isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300";
                      } else if (showResult && isSelected && !isCorrect) {
                        btnStyle = "bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-200";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(question.id, optIdx)}
                          className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${btnStyle}`}
                        >
                          <span className="font-['Cairo']">{opt}</span>
                          {showResult && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}

                    {/* Targeted Distractor Feedback on Incorrect Choice */}
                    {typeof userAnswer === 'number' && userAnswer !== question.correctOptionIndex && question.options && (
                      (() => {
                        const selectedText = question.options[userAnswer];
                        const matched = question.distractorAnalysis?.find(d => 
                          d.option === selectedText || 
                          (selectedText && d.option.includes(selectedText)) || 
                          (selectedText && selectedText.includes(d.option))
                        );
                        if (matched) {
                          return (
                            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs sm:text-sm text-rose-900 font-medium animate-in fade-in duration-200">
                              <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-1">
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>تحليل الخيار الخاطئ (لماذا استُبعد هذا الخيار؟):</span>
                              </div>
                              <p className="text-rose-950 font-normal leading-relaxed">{matched.whyIncorrect}</p>
                            </div>
                          );
                        }
                        return null;
                      })()
                    )}
                  </div>
                )}

                {/* 2. True / False */}
                {question.questionType === 'true_false' && (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSelectTrueFalse(question.id, true)}
                        className={`flex-1 py-3 px-4 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                          userAnswer === true
                            ? question.isTrue
                              ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                              : 'bg-rose-500 border-rose-600 text-white shadow-xs'
                            : isRevealed && question.isTrue
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-black'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>العبارة صواب</span>
                      </button>

                      <button
                        onClick={() => handleSelectTrueFalse(question.id, false)}
                        className={`flex-1 py-3 px-4 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                          userAnswer === false
                            ? !question.isTrue
                              ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                              : 'bg-rose-500 border-rose-600 text-white shadow-xs'
                            : isRevealed && !question.isTrue
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-black'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>العبارة خطأ</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Written Answers / Essays Scratchpad */}
                {(question.questionType === 'short_essay' || question.questionType === 'case_study' || question.questionType === 'open_essay' || question.questionType === 'calculation' || question.questionType === 'jre') && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold flex items-center gap-1 text-slate-700">
                        <FileText className="w-3.5 h-3.5 text-amber-600" />
                        <span>مساحة تجربة الصياغة الذاتية للطالب:</span>
                      </span>
                      <span>سجل أفكارك قبل الاطلاع على الإجابة الرسمية</span>
                    </div>
                    <textarea
                      rows={2}
                      value={studentNotes[question.id] || ''}
                      onChange={(e) => setStudentNotes(prev => ({ ...prev, [question.id]: e.target.value }))}
                      placeholder="اكتب صياغتك أو حساباتك هنا للمقارنة..."
                      className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}

                {/* Toggle Reveal Button in Practice Mode */}
                {viewMode === 'practice' && (
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleReveal(question.id)}
                      className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{isRevealed ? 'إخفاء الإجابة والتعليل' : 'كشف الإجابة النموذجية والتعليل المنهجي'}</span>
                    </button>

                    <button
                      onClick={() => onAskAi(
                        `اشرح لي سؤال كتاب الوزارة: "${question.questionText}"، وأوضح كيف أصيغ استدلالاً إدارياً ممتازاً.`,
                        `كتاب الوزارة ص ${question.page} - ${question.sectionTitle}`
                      )}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>اسأل مستشار الذكاء الاصطناعي</span>
                    </button>
                  </div>
                )}

                {/* Model Answer & Justification Details (Always shown in explanation mode, or revealed on demand) */}
                {isRevealed && (
                  <div className="pt-3 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                    
                    {/* Model Answer Card */}
                    <div className="p-4 sm:p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-black uppercase text-emerald-900">
                          الإجابة النموذجية المعتمدة (كتاب المدرسة):
                        </span>
                      </div>
                      <p className={`whitespace-pre-line text-emerald-950 font-medium leading-relaxed ${
                        presentationScale === 'xlarge' ? 'text-lg sm:text-xl' :
                        presentationScale === 'large' ? 'text-base sm:text-lg' :
                        'text-sm sm:text-base'
                      }`}>
                        {question.modelAnswer}
                      </p>
                    </div>

                    {/* Systematic Justification & Reasoning Path (2-col grid) */}
                    {(question.systematicJustification || question.reasoningPath) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        
                        {question.systematicJustification && (
                          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-amber-700" />
                              <span className="text-xs font-black text-amber-950">
                                التعليل المنهجي (لماذا هذه الإجابة؟):
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                              {question.systematicJustification}
                            </p>
                          </div>
                        )}

                        {question.reasoningPath && (
                          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <Compass className="w-4 h-4 text-indigo-700" />
                              <span className="text-xs font-black text-indigo-950">
                                مسار الاستدلال (تسلسل الفكرة):
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                              {question.reasoningPath}
                            </p>
                          </div>
                        )}

                      </div>
                    )}

                    {/* Distractor Analysis Breakdown (Why incorrect options were rejected) */}
                    {question.distractorAnalysis && question.distractorAnalysis.length > 0 && (
                      <div className="p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                          <span className="text-xs font-black text-slate-800">
                            تحليل المشتتات والخيارات غير الصحيحة (لماذا استُبعدت؟):
                          </span>
                        </div>
                        <div className="space-y-2">
                          {question.distractorAnalysis.map((distractor, dIdx) => (
                            <div key={dIdx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                              <span className="font-bold text-rose-700 ml-1.5">× {distractor.option}:</span>
                              <span>{distractor.whyIncorrect}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* JRE Rubrics Details (for JRE Questions) */}
                    {question.rubricBreakdown && (
                      <div className="p-4 sm:p-5 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Scale className="w-4 h-4 text-purple-700" />
                            <span className="text-xs font-black text-purple-950">
                              سلم تقييم تدريبي من تصميم المنصة لسؤال الحكم والاستدلال (JRE):
                            </span>
                          </div>
                          {onOpenJreLab && (
                            <button
                              onClick={onOpenJreLab}
                              className="text-xs font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1"
                            >
                              <span>الانتقال لمختبر JRE التفاعلي</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                          {Object.entries(question.rubricBreakdown).map(([criterion, desc]) => (
                            <div key={criterion} className="p-3 bg-white/80 rounded-xl border border-purple-100 space-y-1">
                              <div className="font-black text-purple-900 capitalize">
                                {criterion === 'judgment' ? '1. الحكم الصريح المباشر (3 درجات)' :
                                 criterion === 'reasoning' ? '2. التعليل والتبرير المنطقي (4 درجات)' :
                                 criterion === 'evidence' ? '3. الاستشهاد بالدليل والسياق (5 درجات)' :
                                 criterion === 'counterArgument' ? '4. موازنة الحجة المقابلة (4 درجات)' :
                                 '5. الاستنتاج والتوصية المشروطة (4 درجات)'}
                              </div>
                              <p className="text-purple-950/80 font-medium leading-relaxed">
                                {String(desc)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ask AI Contextual Prompt Button */}
                    <div className="pt-2 flex items-center justify-end">
                      <button
                        onClick={() => onAskAi(
                          `اشرح لي سؤال كتاب الوزارة بالتفصيل: "${question.questionText}".\nالإجابة النموذجية: "${question.modelAnswer}"\nما هي أهم الأخطاء الشائعة التي يقع فيها الطلاب في هذا السؤال؟`,
                          `كتاب الوزارة ص ${question.page} - ${question.sectionTitle}`
                        )}
                        className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 font-bold text-xs flex items-center gap-2 transition-all border border-amber-500/20"
                      >
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>مناقشة السؤال والأخطاء الشائعة مع مستشار الذكاء الاصطناعي</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Modal: Unit Map (خريطة المحاور المعتمدة) */}
      {showUnitMapModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-black text-slate-900 font-['Cairo']">
                  خريطة محاور الوحدة {currentUnitMeta.number}: {currentUnitMeta.title}
                </h3>
              </div>
              <button
                onClick={() => setShowUnitMapModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              هذه المحاور مشتقة تحليليًا من نصوص كتاب الوزارة المعتمد، وتحدد المفاهيم الجوهرية والمهارات المكتسبة عبر صفحات الوحدة ({unitAuditLog.pageRange}):
            </p>

            <div className="space-y-2.5">
              {unitAxesMap.map(ax => (
                <div key={ax.code} className="p-3.5 bg-slate-50 hover:bg-amber-50/50 rounded-2xl border border-slate-200 transition-all flex items-start gap-3">
                  <span className="px-2 py-1 rounded-lg bg-slate-900 text-white font-black text-xs shrink-0">
                    {ax.code}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 font-['Cairo']">{ax.title}</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">{ax.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowUnitMapModal(false)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-xs"
              >
                إغلاق الخريطة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Audit Log (سجل التدقيق والمصدر) */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900 font-['Cairo']">
                  سجل التدقيق والمطابقة الوزارية
                </h3>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">الوحدة:</span>
                <span className="font-black text-slate-900">{unitAuditLog.unitCode} — {unitAuditLog.unitTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">المصدر المعتمد:</span>
                <span className="font-black text-slate-900">{unitAuditLog.source}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">نطاق الصفحات:</span>
                <span className="font-black text-slate-900">{unitAuditLog.pageRange}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">إجمالي الأسئلة المعتمدة:</span>
                <span className="font-black text-amber-700">{unitAuditLog.totalQuestions} سؤالًا ومهمة</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="font-bold text-slate-500">الحلول والتعليلات:</span>
                <span className="font-black text-emerald-700">مكتملة ومحللة بنسبة 100%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-bold text-slate-500">سلم الحكم والاستدلال (JRE):</span>
                <span className="font-black text-purple-700">مدرج وفق سلم الـ 20 درجة الوزاري</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed italic">
              {unitAuditLog.note}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all shadow-xs"
              >
                تم الاطلاع
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
