import React, { useState, useMemo } from 'react';
import { 
  getUnitAssessmentData,
  hasUnitAssessmentData
} from '../data/unitAssessments/registry';
import { ALL_UNITS, getUnitByNumber } from '../data/unitsData';
import { 
  MinistryWeekAssessmentData,
  MinistryPerformancePeriod,
  MinistryWeeklyModel,
  MinistryWeeklyMCQ,
  MinistryWeeklyWrittenQuestion,
  MinistryHomeworkQuestion
} from '../types';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Table as TableIcon, 
  Layers, 
  HelpCircle,
  ArrowRight,
  Info,
  PenTool,
  Copy,
  Check,
  Calendar,
  Clock,
  Home,
  GraduationCap,
  ListFilter,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { PresentationToolbar, PresentationScale } from './PresentationToolbar';
import { SourceProvenanceBadge } from './SourceProvenanceBadge';

interface AssessmentsViewProps {
  selectedUnitNumber?: number;
  setSelectedUnitNumber?: (num: number) => void;
  onAskAi: (prompt: string, context?: string) => void;
  onNavigateToTab?: (tab: 'book' | 'textbook_questions' | 'assessments' | 'question_bank' | 'jre_lab' | 'glossary') => void;
  isAutoFillPage?: boolean;
  onToggleAutoFillPage?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  presentationScale?: PresentationScale;
  onChangeScale?: (scale: PresentationScale) => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  selectedUnitNumber = 1,
  setSelectedUnitNumber,
  onAskAi,
  onNavigateToTab,
  isAutoFillPage = true,
  onToggleAutoFillPage,
  isFullscreen = false,
  onToggleFullscreen,
  presentationScale = 'large',
  onChangeScale = () => {}
}) => {
  const currentUnitMeta = getUnitByNumber(selectedUnitNumber) || ALL_UNITS[0];
  const unitBundle = getUnitAssessmentData(selectedUnitNumber);
  // Main Category Separation: 'all' | 'performance' (الأداء الصفي والمنزلي) | 'evaluation' (التقييم الأسبوعي)
  const [activeCategory, setActiveCategory] = useState<'all' | 'performance' | 'evaluation'>('all');

  // Week Filter: 0 for all, or 1, 2, 3, 4
  const [selectedWeek, setSelectedWeek] = useState<number>(0);

  // Period Filter: 0 for all, or 1, 2, 3
  const [selectedPeriod, setSelectedPeriod] = useState<number>(0);

  // Evaluation Model Filter (when in evaluation mode): 'all' | 'أ' | 'ب' | 'ج'
  const [selectedModel, setSelectedModel] = useState<'all' | 'أ' | 'ب' | 'ج'>('all');

  // Performance Subtype Filter (when in performance mode): 'all' | 'class' | 'homework'
  const [selectedPerformanceType, setSelectedPerformanceType] = useState<'all' | 'class' | 'homework'>('all');

  // Search input
  const [searchQuery, setSearchQuery] = useState('');

  // Default: Training mode (answers hidden, student can test themselves)
  // Master Key: toggle to show or hide all answers at once
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [studentDrafts, setStudentDrafts] = useState<Record<string, string>>({});
  const [userMcqAnswers, setUserMcqAnswers] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Expanded weeks accordion
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true
  });

  const toggleWeekExpansion = (weekNum: number) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  };

  const toggleShowAllAnswers = () => {
    setShowAllAnswers(prev => {
      const next = !prev;
      setRevealedSolutions({});
      return next;
    });
  };

  const toggleSolutionReveal = (id: string) => {
    setRevealedSolutions(prev => {
      const currentlyVisible = showAllAnswers ? (prev[id] !== false) : (prev[id] === true);
      return {
        ...prev,
        [id]: !currentlyVisible
      };
    });
  };

  const isSolutionVisible = (id: string) => {
    if (showAllAnswers) {
      return revealedSolutions[id] !== false;
    }
    return revealedSolutions[id] === true;
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectMcqOption = (questionId: string, optionIndex: number) => {
    setUserMcqAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSelectedWeek(0);
    setSelectedPeriod(0);
    setSelectedModel('all');
    setSelectedPerformanceType('all');
    setSearchQuery('');
  };

  // Filtered Weeks based on selected week and search
  const filteredWeeks = useMemo(() => {
    if (!unitBundle) return [];
    return unitBundle.assessments.filter(week => {
      if (selectedWeek !== 0 && week.weekNumber !== selectedWeek) {
        return false;
      }
      return true;
    });
  }, [unitBundle, selectedWeek]);

  // If unit assessment bundle does not exist for this unit (in preparation state)
  if (!unitBundle) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
        <PresentationToolbar
          title="شاشة الأداءات والتقييمات الوزارية"
          badge={`الوحدة ${selectedUnitNumber}: قيد الإعداد المنهجي`}
          isAutoFillPage={isAutoFillPage}
          onToggleAutoFillPage={onToggleAutoFillPage}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
          presentationScale={presentationScale}
          onChangeScale={onChangeScale}
        />

        <div className={`mx-auto transition-all duration-300 ${
          isAutoFillPage ? 'w-full px-2 sm:px-6 py-6' : 'max-w-5xl px-4 py-8'
        }`}>
          {/* Unit Switcher Bar */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-black text-slate-500 shrink-0 px-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>اختر الوحدة:</span>
            </span>
            {ALL_UNITS.map(unit => {
              const hasData = hasUnitAssessmentData(unit.number);
              const isSelected = unit.number === selectedUnitNumber;
              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnitNumber?.(unit.number)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : hasData
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>و{unit.number}: {unit.title.substring(0, 18)}...</span>
                  {hasData && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="مكتمل 100%" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Friendly Status Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-inner">
              <Clock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                <span>الوحدة {selectedUnitNumber}: {currentUnitMeta.title}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-['Cairo']">
                الأداءات والتقييمات الوزارية قيد الإعداد
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                محتوى الأداءات والتقييمات الوزارية لهذه الوحدة قيد الإعداد حاليًا، ويمكنك استخدام بنك الأسئلة العام وقاعدة أسئلة الكتاب المدرسي المتاحة لهذه الوحدة في الوقت الحالي.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedUnitNumber?.(1)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-all"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>عرض أداءات وتقييمات الوحدة الأولى (111 مهمة مكتملة)</span>
              </button>

              {onNavigateToTab && (
                <>
                  <button
                    onClick={() => onNavigateToTab('question_bank')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-sm border border-emerald-200 flex items-center gap-2 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>الانتقال لبنك الأسئلة</span>
                  </button>

                  <button
                    onClick={() => onNavigateToTab('textbook_questions')}
                    className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-sm border border-indigo-200 flex items-center gap-2 transition-all"
                  >
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>أسئلة الكتاب المدرسي</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const unitStats = unitBundle.stats;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Presentation Toolbar */}
      <PresentationToolbar
        title="شاشة الأداءات والتقييمات الوزارية"
        badge={`الوحدة ${selectedUnitNumber} (${unitBundle.unitTitle}): ${unitStats.grandTotalQuestions} مهمة وسؤال محلول`}
        isAutoFillPage={isAutoFillPage}
        onToggleAutoFillPage={onToggleAutoFillPage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        presentationScale={presentationScale}
        onChangeScale={onChangeScale}
      />

      <div className={`mx-auto transition-all duration-300 ${
        isAutoFillPage ? 'w-full px-2 sm:px-6 py-4' : 'max-w-7xl px-4 py-6'
      }`}>
        {/* Unit Switcher Bar */}
        <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs mb-5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-black text-slate-500 shrink-0 px-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>الوحدة:</span>
          </span>
          {ALL_UNITS.map(unit => {
            const hasData = hasUnitAssessmentData(unit.number);
            const isSelected = unit.number === selectedUnitNumber;
            return (
              <button
                key={unit.id}
                onClick={() => setSelectedUnitNumber?.(unit.number)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-black'
                    : hasData
                    ? 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>و{unit.number}: {unit.title.substring(0, 16)}...</span>
                {hasData && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="مكتمل 100%" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Official Header */}
        <header className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6 relative overflow-hidden border border-blue-900/40">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-500/25 text-blue-200 border border-blue-400/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-blue-300" />
                  منهاج إدارة الأعمال والتقييمات المقررة — الصف الثاني الثانوي
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full">
                  استخراج شامل للوحدة {selectedUnitNumber} (كاملة)
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full">
                  إجابات نموذجية + تعليل منهجي استدلالي
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                كتاب الأداءات والتقييمات: الوحدة {selectedUnitNumber} — {unitBundle.unitTitle}
              </h1>

              <p className="text-sm sm:text-base text-blue-100/90 max-w-3xl leading-relaxed">
                استخراج دقيق ومفصل لجميع أسئلة الأداءات والتقييمات من ملف الوزارة الرسمي. تم الفصل التام والمنهجي بين <strong>«الأداء الصفي والمنزلي»</strong> (الفترتان الأولى والثانية) و<strong>«التقييمات الأسبوعية»</strong> (الفترة الثالثة بنماذجها أ، ب، ج)، مع بيان رقم الأسبوع، الفترة، ومسار الاستدلال لكل سؤال.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 w-full lg:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <div className="text-2xl font-black text-amber-300 font-mono">{unitStats.totalWeeks} أسابيع</div>
                <div className="text-[11px] text-blue-200 font-bold">الوحدة كاملة</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <div className="text-2xl font-black text-emerald-300 font-mono">{unitStats.totalHomeworkQuestions} سؤالاً</div>
                <div className="text-[11px] text-blue-200 font-bold">واجب منزلي رسمي</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <div className="text-2xl font-black text-blue-300 font-mono">{unitStats.totalWeeklyEvaluationQuestions} سؤالاً</div>
                <div className="text-[11px] text-blue-200 font-bold">تقييم أسبوعي ({unitStats.totalWeeklyModels} نموذجاً)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
                <div className="text-2xl font-black text-purple-300 font-mono">{unitStats.grandTotalQuestions}</div>
                <div className="text-[11px] text-blue-200 font-bold">إجمالي المهام والأسئلة</div>
              </div>
            </div>
          </div>

          {/* Primary View Switch: All vs Performance vs Evaluation */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-blue-200 ml-1">التصنيف المنهجي الرئيسي:</span>
              <button
                onClick={() => setActiveCategory('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-blue-950 shadow-md font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>عرض الكل (الأداءات + التقييمات)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-900 font-mono font-black">
                  {unitStats.grandTotalQuestions}
                </span>
              </button>

              <button
                onClick={() => setActiveCategory('performance')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === 'performance'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>قسم الأداءات فقط (الصفي والمنزلي)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 text-amber-300 font-mono font-black">
                  {unitStats.totalHomeworkQuestions + unitStats.totalClassActivities + unitStats.totalClassActivityQuestions} أداء وسؤال
                </span>
              </button>

              <button
                onClick={() => setActiveCategory('evaluation')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === 'evaluation'
                    ? 'bg-emerald-400 text-slate-950 shadow-md font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>قسم التقييمات الأسبوعية فقط (نماذج الاختبارات)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 text-emerald-300 font-mono font-black">
                  {unitStats.totalWeeklyEvaluationQuestions} سؤالاً (أ، ب، ج)
                </span>
              </button>
            </div>

            {/* Master Answer Toggle Key (وضع التدريب الافتراضي مع مفتاح إظهار الإجابة) */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleShowAllAnswers}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm ${
                  showAllAnswers
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black ring-2 ring-amber-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
                title="مفتاح إظهار أو إخفاء الإجابات النموذجية لجميع الأسئلة"
              >
                {showAllAnswers ? (
                  <>
                    <EyeOff className="w-4 h-4 text-slate-950" />
                    <span>إخفاء كافة الإجابات (وضع التدريب)</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 text-amber-300" />
                    <span>مفتاح إظهار كافة الإجابات</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Filter and Navigation Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في نصوص الأسئلة، المفاهيم، المصطلحات، أو الإجابات النموذجية..."
                className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
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

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={toggleShowAllAnswers}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all border ${
                  showAllAnswers
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-black shadow-2xs'
                    : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-200'
                }`}
                title="مفتاح التبديل العام لإظهار أو إخفاء الإجابات"
              >
                {showAllAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAllAnswers ? 'إخفاء الإجابات' : 'مفتاح إظهار الإجابات'}</span>
              </button>

              <button
                onClick={() => {
                  const allOpen = Object.values(expandedWeeks).every(v => v);
                  setExpandedWeeks({
                    1: !allOpen,
                    2: !allOpen,
                    3: !allOpen,
                    4: !allOpen
                  });
                }}
                className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
              >
                {Object.values(expandedWeeks).every(v => v) ? 'طي جميع الأسابيع' : 'توسيع جميع الأسابيع'}
              </button>

              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
                title="إعادة ضبط المرشحات"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
            </div>
          </div>

          {/* Granular Filters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
            {/* Week Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>الأسبوع الدراسي:</span>
              </label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-blue-500"
              >
                <option value={0}>جميع الأسابيع (الأسبوع 1 إلى 4)</option>
                <option value={1}>الأسبوع الأول (ص 3-6)</option>
                <option value={2}>الأسبوع الثاني (ص 6-10)</option>
                <option value={3}>الأسبوع الثالث (ص 10-13)</option>
                <option value={4}>الأسبوع الرابع (ص 13-16)</option>
              </select>
            </div>

            {/* Period Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>الفترة الدراسية:</span>
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-blue-500"
              >
                <option value={0}>جميع الفترات (1، 2، 3)</option>
                <option value={1}>الفترة الأولى (أداء صفي ومنزلي)</option>
                <option value={2}>الفترة الثانية (أداء صفي ومنزلي)</option>
                <option value={3}>الفترة الثالثة (التقييم الأسبوعي)</option>
              </select>
            </div>

            {/* Performance Subtype Filter (if performance or all) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-amber-600" />
                <span>نوع الأداء:</span>
              </label>
              <select
                value={selectedPerformanceType}
                onChange={(e) => setSelectedPerformanceType(e.target.value as any)}
                disabled={activeCategory === 'evaluation'}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="all">الأداء الصفي + المنزلي</option>
                <option value="class">الأنشطة الصفية فقط</option>
                <option value="homework">الواجبات والأسئلة المنزلية فقط</option>
              </select>
            </div>

            {/* Evaluation Model Filter (if evaluation or all) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>نموذج التقييم الأسبوعي:</span>
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                disabled={activeCategory === 'performance'}
                className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="all">جميع النماذج (أ، ب، ج)</option>
                <option value="أ">نموذج (أ) فقط</option>
                <option value="ب">نموذج (ب) فقط</option>
                <option value="ج">نموذج (ج) فقط</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Section: Iterating through weeks */}
        <div className="space-y-8">
          {filteredWeeks.map((week) => {
            const isWeekExpanded = expandedWeeks[week.weekNumber] ?? true;

            // Check if this week has matching items according to filters
            const showPerformanceSection = 
              activeCategory !== 'evaluation' && 
              (selectedPeriod === 0 || selectedPeriod === 1 || selectedPeriod === 2);

            const showEvaluationSection = 
              activeCategory !== 'performance' && 
              (selectedPeriod === 0 || selectedPeriod === 3);

            return (
              <section 
                key={week.weekNumber} 
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                {/* Week Banner Header */}
                <div 
                  onClick={() => toggleWeekExpansion(week.weekNumber)}
                  className="bg-slate-100/80 hover:bg-slate-100 cursor-pointer p-5 sm:p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-blue-900 text-white font-black text-base flex items-center justify-center font-mono shadow-xs">
                      {week.weekNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-blue-700 font-mono">الأسبوع {week.weekNumber}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-bold text-slate-500">كتاب الوزارة: ص {week.pdfPages}</span>
                      </div>
                      <h2 className="text-base sm:text-lg font-black text-slate-900">
                        {week.sectionTitle}
                      </h2>
                      <div className="text-xs text-slate-600 font-medium">
                        {week.lessonName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                      {isWeekExpanded ? 'انقر للطي' : 'انقر للتوسيع'}
                    </span>
                    <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                      {isWeekExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isWeekExpanded && (
                  <div className="p-5 sm:p-7 space-y-8">

                    {/* ----------------- SECTION 1: PERFORMANCE ACTIVITIES (الصفية والمنزلية) ----------------- */}
                    {showPerformanceSection && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b-2 border-amber-300">
                          <Home className="w-5 h-5 text-amber-600" />
                          <h3 className="text-base sm:text-lg font-black text-slate-900">
                            أولاً: قسم الأداءات (الأداء الصفي والمنزلي) — الأسبوع {week.weekNumber}
                          </h3>
                          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full mr-auto">
                            الفترة 1 و 2
                          </span>
                        </div>

                        {/* Iterate over Periods (Period 1, Period 2) */}
                        {week.performancePeriods
                          .filter(p => selectedPeriod === 0 || p.periodNumber === selectedPeriod)
                          .map((period) => (
                            <div key={period.periodNumber} className="space-y-6 bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-200/80">
                              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="bg-amber-600 text-white font-black text-xs px-2.5 py-1 rounded-lg font-mono">
                                    {period.periodTitle}
                                  </span>
                                  <span className="text-xs font-bold text-slate-700">
                                    {period.periodNumber === 1 ? 'مدخل المفهوم والتطبيق الأساسي' : 'التحليل المتقدم وحالة دراسة مريم'}
                                  </span>
                                </div>
                              </div>

                              {/* 1. Class Activity */}
                              {(selectedPerformanceType === 'all' || selectedPerformanceType === 'class') && (
                                <article className="bg-white rounded-2xl border border-amber-200 p-5 shadow-2xs space-y-4">
                                  <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <div className="flex items-center gap-2">
                                      <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-1 rounded-lg">
                                        الأداء الصفي (Class Activity)
                                      </span>
                                      <h4 className="text-sm font-black text-slate-900">
                                        {period.classActivity.title}
                                      </h4>
                                    </div>
                                    <span className="text-xs text-slate-400 font-mono">
                                      {period.periodTitle} — الأسبوع {week.weekNumber}
                                    </span>
                                  </div>

                                  {period.classActivity.description && (
                                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                      {period.classActivity.description}
                                    </p>
                                  )}

                                  {period.classActivity.steps && (
                                    <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200/60 space-y-1.5 text-xs text-amber-950 font-medium">
                                      <div className="font-bold text-amber-900">إجراءات وخطوات النشاط الصفي:</div>
                                      <ul className="list-disc list-inside space-y-1 pr-1">
                                        {period.classActivity.steps.map((step, sIdx) => (
                                          <li key={sIdx}>{step}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {period.classActivity.task && (
                                    <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-800 font-bold">
                                      المطلوب: {period.classActivity.task}
                                    </div>
                                  )}

                                  {/* If class activity has sub-questions (e.g. Period 2) */}
                                  {period.classActivity.questions && (
                                    <div className="space-y-4 pt-2">
                                      {period.classActivity.questions.map((q) => (
                                        <div key={q.number} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                                          <div className="text-xs sm:text-sm font-black text-blue-900">
                                            {q.number}. {q.text}
                                          </div>
                                          {isSolutionVisible(`class-q-${week.weekNumber}-${period.periodNumber}-${q.number}`) ? (
                                            <div className="space-y-2 pt-1 border-t border-slate-200 text-xs sm:text-sm">
                                              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-950 font-medium">
                                                <span className="font-bold text-emerald-900 block mb-1">الإجابة النموذجية المشتقة:</span>
                                                {q.modelAnswer}
                                              </div>
                                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-amber-950 text-xs">
                                                <span className="font-bold text-amber-900 block mb-0.5">التعليل المنهجي:</span>
                                                {q.rationale}
                                              </div>
                                              <div className="flex justify-end pt-1">
                                                <button
                                                  onClick={() => toggleSolutionReveal(`class-q-${week.weekNumber}-${period.periodNumber}-${q.number}`)}
                                                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-xs font-bold"
                                                >
                                                  <EyeOff className="w-3.5 h-3.5" />
                                                  <span>إخفاء الإجابة</span>
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="pt-1">
                                              <button
                                                onClick={() => toggleSolutionReveal(`class-q-${week.weekNumber}-${period.periodNumber}-${q.number}`)}
                                                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                                              >
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>مفتاح إظهار الإجابة والتعليل</span>
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Table Data if exists (e.g. decision matrix or value matrix) */}
                                  {period.classActivity.tableData && (
                                    <div className="overflow-x-auto rounded-xl border border-amber-200">
                                      <table className="w-full text-right text-xs">
                                        <thead className="bg-amber-100 text-amber-950 font-bold border-b border-amber-200">
                                          <tr>
                                            {period.classActivity.tableData.headers.map((h, hIdx) => (
                                              <th key={hIdx} className="p-3 border-l border-amber-200 last:border-l-0">
                                                {h}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-amber-100 bg-white">
                                          {period.classActivity.tableData.rows.map((row, rIdx) => (
                                            <tr key={rIdx} className="hover:bg-amber-50/40">
                                              {row.map((cell, cIdx) => (
                                                <td key={cIdx} className="p-3 border-l border-amber-100 last:border-l-0 text-slate-800 font-medium">
                                                  {cell}
                                                </td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}

                                  {/* Model Answer & Rationale */}
                                  <div className="pt-2">
                                    {isSolutionVisible(`class-act-${week.weekNumber}-${period.periodNumber}`) ? (
                                      <div className="space-y-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 font-medium">
                                          <div className="flex items-center justify-between mb-1.5">
                                            <span className="font-bold text-emerald-900 flex items-center gap-1">
                                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                              الخلاصة والإجابة النموذجية للنشاط:
                                            </span>
                                          </div>
                                          <p className="leading-relaxed">{period.classActivity.modelAnswer}</p>
                                        </div>

                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-amber-950 text-xs">
                                          <span className="font-bold text-amber-900 flex items-center gap-1 mb-1">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                            التعليل المنهجي والاستدلالي:
                                          </span>
                                          <p className="leading-relaxed">{period.classActivity.rationale}</p>
                                        </div>

                                        {period.classActivity.reasoningPath && (
                                          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs font-mono font-bold text-indigo-900">
                                            مسار الاستدلال: {period.classActivity.reasoningPath}
                                          </div>
                                        )}

                                        <div className="flex justify-end pt-1">
                                          <button
                                            onClick={() => toggleSolutionReveal(`class-act-${week.weekNumber}-${period.periodNumber}`)}
                                            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-xs font-bold"
                                          >
                                            <EyeOff className="w-3.5 h-3.5" />
                                            <span>إخفاء الحل النموذجي</span>
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => toggleSolutionReveal(`class-act-${week.weekNumber}-${period.periodNumber}`)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs sm:text-sm font-bold transition-all border border-blue-200"
                                      >
                                        <Eye className="w-4 h-4" />
                                        <span>مفتاح إظهار الحل النموذجي وتحليل هذا النشاط الصفي</span>
                                      </button>
                                    )}
                                  </div>
                                </article>
                              )}

                              {/* 2. Homework Questions (5 Questions per Period) */}
                              {(selectedPerformanceType === 'all' || selectedPerformanceType === 'homework') && (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="bg-blue-100 text-blue-900 text-xs font-black px-2.5 py-1 rounded-lg">
                                        الأداء المنزلي (Homework Questions)
                                      </span>
                                      <span className="text-xs text-slate-500 font-bold">
                                        ({period.homeworkQuestions.length} أسئلة واجب منزلي رسمية)
                                      </span>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    {period.homeworkQuestions
                                      .filter(hw => !searchQuery || hw.question.includes(searchQuery) || hw.modelAnswer.includes(searchQuery))
                                      .map((hw) => {
                                        const visible = isSolutionVisible(hw.id);
                                        const isCopied = copiedId === hw.id;

                                        return (
                                          <div 
                                            key={hw.id} 
                                            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3 hover:border-blue-300 transition-all"
                                          >
                                            <div className="flex items-start justify-between gap-2">
                                              <div className="flex items-start gap-2.5">
                                                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-900 font-black text-xs flex items-center justify-center font-mono shrink-0 mt-0.5">
                                                  {hw.number}
                                                </span>
                                                <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                                                  {hw.question}
                                                </h5>
                                              </div>

                                              <div className="flex items-center gap-1 shrink-0">
                                                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{hw.id}</span>
                                                <button
                                                  onClick={() => handleCopy(hw.id, `س: ${hw.question}\n\nالإجابة:\n${hw.modelAnswer}`)}
                                                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                                                  title="نسخ السؤال والحل"
                                                >
                                                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                                </button>
                                              </div>
                                            </div>

                                            {/* Practice Mode Scratchpad (Default Active) */}
                                            {!visible && (
                                              <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-200">
                                                <textarea
                                                  rows={2}
                                                  value={studentDrafts[hw.id] || ''}
                                                  onChange={(e) => setStudentDrafts({ ...studentDrafts, [hw.id]: e.target.value })}
                                                  placeholder="اكتب مسودة إجابتك هنا للتدريب الذاتي قبل إظهار النموذج..."
                                                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                                                />
                                                <div className="flex justify-end">
                                                  <button
                                                    onClick={() => toggleSolutionReveal(hw.id)}
                                                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                                                  >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>مفتاح إظهار الإجابة والتعليل</span>
                                                  </button>
                                                </div>
                                              </div>
                                            )}

                                            {/* Model Answer Box */}
                                            {visible && (
                                              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                                                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-slate-800 font-medium leading-relaxed">
                                                  <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                    الإجابة النموذجية:
                                                  </span>
                                                  {hw.modelAnswer}
                                                </div>

                                                {/* Comparison Table if exists */}
                                                {hw.comparisonTable && (
                                                  <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                                                    <table className="w-full text-right text-xs">
                                                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                                                        <tr>
                                                          {hw.comparisonTable.headers.map((h, i) => (
                                                            <th key={i} className="p-2.5 border-l border-slate-200 last:border-l-0">{h}</th>
                                                          ))}
                                                        </tr>
                                                      </thead>
                                                      <tbody className="divide-y divide-slate-100 bg-white">
                                                        {hw.comparisonTable.rows.map((r, ri) => (
                                                          <tr key={ri} className="hover:bg-slate-50">
                                                            {r.map((c, ci) => (
                                                              <td key={ci} className="p-2.5 border-l border-slate-100 last:border-l-0 font-medium text-slate-800">{c}</td>
                                                            ))}
                                                          </tr>
                                                        ))}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                )}

                                                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 font-medium">
                                                  <span className="font-bold text-amber-900 block mb-0.5 flex items-center gap-1">
                                                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                                    التعليل المنهجي والاستدلالي:
                                                  </span>
                                                  {hw.rationale}
                                                </div>

                                                {hw.reasoningPath && (
                                                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2 text-[11px] font-mono font-bold text-indigo-900">
                                                    مسار الاستدلال: {hw.reasoningPath}
                                                  </div>
                                                )}

                                                <div className="flex justify-between items-center pt-1 text-[11px]">
                                                  <button
                                                    onClick={() => onAskAi(`أريد شرحاً مفصلاً لسؤال الأداء المنزلي [${hw.id}]:\n${hw.question}\n\nالحل: ${hw.modelAnswer}`, `سؤال الأسبوع ${week.weekNumber} - ${hw.id}`)}
                                                    className="text-blue-700 hover:underline flex items-center gap-1 font-bold"
                                                  >
                                                    <Sparkles className="w-3 h-3 text-blue-600" />
                                                    اسأل المستشار الذكي حول هذا السؤال
                                                  </button>
                                                  <button
                                                    onClick={() => toggleSolutionReveal(hw.id)}
                                                    className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-bold"
                                                  >
                                                    <EyeOff className="w-3.5 h-3.5" />
                                                    <span>إخفاء الإجابة</span>
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}

                    {/* ----------------- SECTION 2: WEEKLY EVALUATION (التقييم الأسبوعي - الفترة الثالثة) ----------------- */}
                    {showEvaluationSection && (
                      <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-2 pb-2 border-b-2 border-emerald-400">
                          <GraduationCap className="w-5 h-5 text-emerald-600" />
                          <h3 className="text-base sm:text-lg font-black text-slate-900">
                            ثانياً: قسم التقييمات الأسبوعية (الفترة الثالثة) — الأسبوع {week.weekNumber}
                          </h3>
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full mr-auto">
                            النماذج الثلاثة: أ، ب، ج
                          </span>
                        </div>

                        {/* Model Tabs Selector within Week */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-600">اختر نموذج التقييم:</span>
                          {(['all', 'أ', 'ب', 'ج'] as const).map((mName) => (
                            <button
                              key={mName}
                              onClick={() => setSelectedModel(mName)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                selectedModel === mName
                                  ? 'bg-emerald-600 text-white shadow-xs font-black'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {mName === 'all' ? 'جميع النماذج الثلاثة (أ + ب + ج)' : `نموذج (${mName})`}
                            </button>
                          ))}
                        </div>

                        {/* Iterate over Weekly Evaluation Models (أ, ب, ج) */}
                        <div className="space-y-6">
                          {week.weeklyEvaluation.models
                            .filter(m => selectedModel === 'all' || m.modelName === selectedModel)
                            .map((model) => (
                              <article 
                                key={model.modelName} 
                                className="bg-emerald-50/30 rounded-3xl border border-emerald-200 p-5 sm:p-7 shadow-xs space-y-6"
                              >
                                <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3 flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center font-mono">
                                      {model.modelName}
                                    </span>
                                    <h4 className="text-sm sm:text-base font-black text-emerald-950">
                                      التقييم الأسبوعي (الأسبوع {week.weekNumber}) — نموذج ({model.modelName})
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <SourceProvenanceBadge
                                      origin="MINISTRY_OFFICIAL"
                                      sourceTitle={`كراسة تقييمات الوزارة — الأسبوع ${week.weekNumber}`}
                                      unitId={selectedUnitNumber}
                                      compact={true}
                                    />
                                  </div>
                                </div>

                                {/* Part 1: Multiple Choice Questions */}
                                <div className="space-y-4">
                                  <div className="text-xs font-black text-blue-900 flex items-center gap-1.5 uppercase tracking-wide">
                                    <CheckSquare className="w-4 h-4 text-blue-600" />
                                    <span>أولاً: اختر الإجابة الصحيحة (Multiple Choice)</span>
                                  </div>

                                  <div className="space-y-4">
                                    {model.mcqQuestions.map((mcq) => {
                                      const selectedOpt = userMcqAnswers[mcq.id];
                                      const hasAnswered = selectedOpt !== undefined;
                                      const isCorrect = selectedOpt === mcq.correctIndex;
                                      const visible = isSolutionVisible(mcq.id) || hasAnswered;

                                      return (
                                        <div key={mcq.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
                                          <div className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                                            {mcq.questionNumber ? `${mcq.questionNumber}) ` : ''}{mcq.text}
                                          </div>

                                          {/* Options grid */}
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                            {mcq.options.map((opt, optIdx) => {
                                              const isSelected = selectedOpt === optIdx;
                                              const isOptionCorrect = optIdx === mcq.correctIndex;

                                              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                                              if (visible) {
                                                if (isOptionCorrect) {
                                                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-500';
                                                } else if (isSelected && !isOptionCorrect) {
                                                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                                                }
                                              } else if (isSelected) {
                                                btnStyle = 'bg-blue-50 border-blue-400 text-blue-950 font-bold';
                                              }

                                              return (
                                                <button
                                                  key={optIdx}
                                                  onClick={() => handleSelectMcqOption(mcq.id, optIdx)}
                                                  className={`p-3 rounded-xl border text-right text-xs transition-all flex items-start gap-2 ${btnStyle}`}
                                                >
                                                  <span className="w-5 h-5 rounded-md bg-white/80 border border-slate-300 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                                    {opt.charAt(0)}
                                                  </span>
                                                  <span className="leading-relaxed">{opt}</span>
                                                </button>
                                              );
                                            })}
                                          </div>

                                          {/* Explanation and Rationale Box */}
                                          {visible && (
                                            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                                              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-950 font-medium">
                                                <span className="font-bold text-emerald-900 block mb-0.5">
                                                  الإجابة الصحيحة: ({mcq.correctLetter}) — التفسير الوزاري:
                                                </span>
                                                {mcq.explanation}
                                              </div>
                                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-amber-950 font-medium">
                                                <span className="font-bold text-amber-900 block mb-0.5">التعليل المنهجي:</span>
                                                {mcq.rationale}
                                              </div>
                                              <div className="flex justify-end pt-1">
                                                <button
                                                  onClick={() => toggleSolutionReveal(mcq.id)}
                                                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-xs font-bold"
                                                >
                                                  <EyeOff className="w-3.5 h-3.5" />
                                                  <span>إخفاء الإجابة</span>
                                                </button>
                                              </div>
                                            </div>
                                          )}

                                          {!visible && (
                                            <button
                                              onClick={() => toggleSolutionReveal(mcq.id)}
                                              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                                            >
                                              <Eye className="w-3.5 h-3.5" />
                                              <span>مفتاح إظهار الإجابة الصحيحة والتفسير</span>
                                            </button>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Part 2: Written Questions (أجب عما يلي) */}
                                <div className="space-y-4 pt-3 border-t border-emerald-200">
                                  <div className="text-xs font-black text-indigo-900 flex items-center gap-1.5 uppercase tracking-wide">
                                    <PenTool className="w-4 h-4 text-indigo-600" />
                                    <span>ثانياً: أجب عما يلي (الأسئلة المقالية والتحليلية)</span>
                                  </div>

                                  <div className="space-y-4">
                                    {model.writtenQuestions
                                      .filter(wq => !searchQuery || wq.text.includes(searchQuery) || wq.modelAnswer.includes(searchQuery))
                                      .map((wq) => {
                                        const visible = isSolutionVisible(wq.id);

                                        return (
                                          <div key={wq.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
                                            <div className="flex items-start justify-between gap-2">
                                              <div className="flex items-start gap-2.5">
                                                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs flex items-center justify-center font-mono shrink-0 mt-0.5">
                                                  {wq.number}
                                                </span>
                                                <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                                                  {wq.text}
                                                </h5>
                                              </div>
                                              <span className="text-[10px] text-slate-400 font-mono shrink-0">{wq.id}</span>
                                            </div>

                                            {/* Practice Mode Scratchpad (Default Active) */}
                                            {!visible && (
                                              <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-200">
                                                <textarea
                                                  rows={2}
                                                  value={studentDrafts[wq.id] || ''}
                                                  onChange={(e) => setStudentDrafts({ ...studentDrafts, [wq.id]: e.target.value })}
                                                  placeholder="اكتب صياغة حلك ومبرراتك هنا للتدريب الذاتي قبل كشف النموذج..."
                                                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                                                />
                                                <div className="flex justify-end">
                                                  <button
                                                    onClick={() => toggleSolutionReveal(wq.id)}
                                                    className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors"
                                                  >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>مفتاح إظهار الإجابة النموذجية والتعليل</span>
                                                  </button>
                                                </div>
                                              </div>
                                            )}

                                            {/* Model Answer and Rationale */}
                                            {visible && (
                                              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                                                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                                                  <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                    الإجابة النموذجية المشتقة:
                                                  </span>
                                                  {wq.modelAnswer}
                                                </div>

                                                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 font-medium">
                                                  <span className="font-bold text-amber-900 block mb-0.5 flex items-center gap-1">
                                                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                                    التعليل المنهجي والاستدلالي:
                                                  </span>
                                                  {wq.rationale}
                                                </div>

                                                {wq.reasoningPath && (
                                                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2 text-[11px] font-mono font-bold text-indigo-900">
                                                    مسار الاستدلال: {wq.reasoningPath}
                                                  </div>
                                                )}

                                                <div className="flex justify-between items-center pt-1 text-[11px]">
                                                  <button
                                                    onClick={() => onAskAi(`أريد شرحاً تفصيلياً لسؤال التقييم الأسبوعي [${wq.id}]:\n${wq.text}\n\nالإجابة:\n${wq.modelAnswer}`, `سؤال التقييم الأسبوعي ${wq.id}`)}
                                                    className="text-indigo-700 hover:underline flex items-center gap-1 font-bold"
                                                  >
                                                    <Sparkles className="w-3 h-3 text-indigo-600" />
                                                    اسأل المستشار الذكي حول هذا السؤال
                                                  </button>
                                                  <button
                                                    onClick={() => toggleSolutionReveal(wq.id)}
                                                    className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-bold"
                                                  >
                                                    <EyeOff className="w-3.5 h-3.5" />
                                                    <span>إخفاء الإجابة</span>
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </article>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
