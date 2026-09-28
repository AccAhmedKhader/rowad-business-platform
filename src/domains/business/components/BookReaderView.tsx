import React, { useState, useEffect } from 'react';
import { UnitData } from '../types';
import { 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  BookOpen,
  Scale,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronUp,
  Layers,
  Lightbulb,
  GraduationCap,
  Maximize2,
  Minimize2,
  Tv,
  PanelRightClose,
  PanelRightOpen,
  ZoomIn,
  ZoomOut,
  Compass,
  Briefcase,
  HelpCircle,
  Link2
} from 'lucide-react';
import { PedagogicalStationsView } from './PedagogicalStationsView';
import { PresentationToolbar, PresentationScale } from './PresentationToolbar';
import { TextbookLessonEnrichment } from './TextbookLessonEnrichment';
import { PhilosophyAndCurriculumMapView } from './PhilosophyAndCurriculumMapView';
import { IntegrativeCasesView } from './IntegrativeCasesView';
import { SmartReviewBankView } from './SmartReviewBankView';
import { FinalConnectingCardView } from './FinalConnectingCardView';

export type ReaderSection = 'lessons' | 'philosophy' | 'cases' | 'reviewBank' | 'finalConnecting';

interface BookReaderViewProps {
  unit: UnitData;
  onSelectNextUnit: () => void;
  onSelectPrevUnit: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onOpenJreModal: (unit: UnitData) => void;
  onAskAiAboutUnit: (unitTitle: string, question: string) => void;
  isAutoFillPage?: boolean;
  onToggleAutoFillPage?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  presentationScale?: PresentationScale;
  onChangeScale?: (scale: PresentationScale) => void;
}

export const BookReaderView: React.FC<BookReaderViewProps> = ({
  unit,
  onSelectNextUnit,
  onSelectPrevUnit,
  hasPrev,
  hasNext,
  onOpenJreModal,
  onAskAiAboutUnit,
  isAutoFillPage = true,
  onToggleAutoFillPage,
  isFullscreen = false,
  onToggleFullscreen,
  presentationScale = 'large',
  onChangeScale
}) => {
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [readerSection, setReaderSection] = useState<ReaderSection>('lessons');
  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const handleSetPresentationScale = (scale: PresentationScale) => {
    if (onChangeScale) {
      onChangeScale(scale);
    }
  };

  // Reset active lesson index and section when unit changes
  useEffect(() => {
    setActiveLessonIndex(0);
    setReaderSection('lessons');
    setIsCaseStudyExpanded(false);
  }, [unit.id]);

  const activeLesson = unit.lessons[activeLessonIndex] || unit.lessons[0];
  const totalLessons = unit.lessons.length;

  const goToNextLesson = () => {
    if (activeLessonIndex < totalLessons - 1) {
      setActiveLessonIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hasNext) {
      onSelectNextUnit();
    }
  };

  const goToPrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hasPrev) {
      onSelectPrevUnit();
    }
  };

  const sectionTabs: { id: ReaderSection; label: string; icon: any; count?: string }[] = [
    { id: 'lessons', label: 'شرح الدروس الـ 4 والمحطات', icon: BookOpen, count: `${totalLessons} دروس` },
    { id: 'philosophy', label: 'فلسفة الكتاب وخريطة المنهج', icon: Compass },
    { id: 'cases', label: 'التطبيق التكاملي (3 حالات)', icon: Briefcase, count: '3 حالات' },
    { id: 'reviewBank', label: 'بنك المراجعة الذكي', icon: HelpCircle, count: '8 أسئلة' },
    { id: 'finalConnecting', label: 'الحكم والاستدلال وبطاقة الربط', icon: Scale, count: 'JRE' }
  ];

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Unit Header Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-700">
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {unit.badge}
              </span>
              <span className="text-xs bg-slate-800/80 text-slate-300 font-bold px-2.5 py-1 rounded-full border border-slate-700">
                {unit.englishTitle}
              </span>
              <span className="text-xs bg-indigo-900/60 text-indigo-200 font-bold px-2.5 py-1 rounded-full border border-indigo-700/50">
                {totalLessons} دروس مقررة
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Cairo'] tracking-tight">
              {unit.title}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {unit.overview}
            </p>
          </div>

          {/* Unit Switcher Controls & AI Advisor Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => onAskAiAboutUnit(unit.title, `أريد مراجعة وتلخيصًا للدرس "${activeLesson?.title}" من الوحدة "${unit.title}"`)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>معلم الذكاء الاصطناعي</span>
            </button>

            <div className="flex items-center justify-between bg-slate-800/90 rounded-xl p-1 border border-slate-700">
              <button
                onClick={onSelectPrevUnit}
                disabled={!hasPrev}
                className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  hasPrev ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'opacity-40 text-slate-500 cursor-not-allowed'
                }`}
                title="الوحدة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
                <span className="hidden sm:inline">السابقة</span>
              </button>
              
              <span className="text-xs font-mono font-bold text-amber-400 px-3">
                {unit.number} / 10
              </span>

              <button
                onClick={onSelectNextUnit}
                disabled={!hasNext}
                className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  hasNext ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'opacity-40 text-slate-500 cursor-not-allowed'
                }`}
                title="الوحدة التالية"
              >
                <span className="hidden sm:inline">التالية</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Big Idea Banner */}
        <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-start gap-3 bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/20 text-xs">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-slate-200 leading-relaxed">
            <strong className="text-amber-300 font-bold ml-1">الفكرة الكبرى للوحدة:</strong>
            {unit.bigIdea}
          </div>
        </div>
      </div>

      {/* Main Responsive Grid Layout: Sidebar for Lessons + Main Lesson Canvas */}
      <div className={`grid grid-cols-1 ${isSidebarCollapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-6 items-start w-full transition-all duration-300`}>
        
        {/* =========================================================================
            Right Sidebar: Lessons Index Navigation (قائمة الدروس الجانبية)
            ========================================================================= */}
        {!isSidebarCollapsed && (
          <aside className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-20 order-2 lg:order-1 animate-in fade-in duration-200">
            
            {/* Textbook Sections Navigation Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 font-['Cairo']">
                    أقسام الشرح المعتمد
                  </h3>
                </div>
                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  title="طي الفهرس لملء عرض الصفحة بالدرس"
                >
                  <PanelRightClose className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {sectionTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = readerSection === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setReaderSection(tab.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-right p-2.5 rounded-2xl text-xs transition-all flex items-center justify-between border ${
                        isActive
                          ? 'bg-amber-500 border-amber-600 text-slate-950 font-black shadow-xs'
                          : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200/70 text-slate-700 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                        <span className="font-['Cairo']">{tab.label}</span>
                      </div>
                      {tab.count && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                          isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-200/80 text-slate-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lessons List Card (Visible when in lessons view or for direct access) */}
            {readerSection === 'lessons' && (
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 font-['Cairo']">
                      فهرس دروس الوحدة
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-mono">
                    {totalLessons} دروس
                  </span>
                </div>

                <div className="space-y-2">
                  {unit.lessons.map((lesson, idx) => {
                    const isCurrent = activeLessonIndex === idx;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLessonIndex(idx);
                          setReaderSection('lessons');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-right p-3 rounded-2xl text-xs transition-all flex items-start gap-3 border ${
                          isCurrent
                            ? 'bg-amber-500 border-amber-500 text-slate-950 font-black shadow-sm shadow-amber-500/20 ring-2 ring-amber-400/40'
                            : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200/80 text-slate-700'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-mono font-black shrink-0 mt-0.5 shadow-xs ${
                          isCurrent ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {lesson.lessonNumber}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="leading-snug font-bold line-clamp-2 font-['Cairo']">
                            {lesson.title}
                          </div>
                          {lesson.subtitle && (
                            <div className={`text-[10px] mt-0.5 truncate ${
                              isCurrent ? 'text-slate-900/80' : 'text-slate-500'
                            }`}>
                              {lesson.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Official Learning Outcomes (LOs) */}
            <div className="bg-emerald-50/70 rounded-3xl p-4 sm:p-5 border border-emerald-200 shadow-xs space-y-2.5">
              <h4 className="text-xs font-black text-emerald-950 flex items-center gap-2 font-['Cairo']">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>مخرجات التعلم المعتمدة (LOs)</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-900/90 leading-relaxed">
                {unit.learningOutcomes.map((lo, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{lo}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* JRE Lab Shortcut Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 sm:p-5 rounded-3xl border border-purple-200 space-y-2.5 shadow-xs">
              <h4 className="text-xs font-black text-purple-950 flex items-center gap-2 font-['Cairo']">
                <Scale className="w-4 h-4 text-purple-700 shrink-0" />
                <span>مختبر الحكم والاستدلال (JRE)</span>
              </h4>
              <p className="text-[11px] text-purple-800 leading-relaxed">
                تدرب على سؤال المقال والتقييم للوحدة وفق سلم الـ 20 درجة التدريبي من تصميم المنصة.
              </p>
              <button
                onClick={() => onOpenJreModal(unit)}
                className="w-full py-2.5 px-3 bg-purple-700 hover:bg-purple-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>فتح مختبر JRE للوحدة</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </aside>
        )}

        {/* =========================================================================
            Main Column: Active Lesson & Continuous 17 Pedagogical Stations
            ========================================================================= */}
        <main className={`${isSidebarCollapsed ? 'lg:col-span-1 w-full' : 'lg:col-span-8 xl:col-span-9'} space-y-6 order-1 lg:order-2 transition-all duration-300`}>
          
          {/* Presentation & Display Screen Controls Toolbar */}
          <PresentationToolbar
            title={
              readerSection === 'lessons' ? 'شاشة عرض الدرس' :
              readerSection === 'philosophy' ? 'فلسفة الكتاب وخريطة المنهج' :
              readerSection === 'cases' ? 'التطبيق التكاملي الواقعي' :
              readerSection === 'reviewBank' ? 'بنك المراجعة الذكي' : 'الحكم والاستدلال وبطاقة الربط'
            }
            badge={isAutoFillPage ? 'ملء تلقائي للصفحة (100%)' : 'العرض القياسي'}
            isAutoFillPage={isAutoFillPage}
            onToggleAutoFillPage={onToggleAutoFillPage}
            isFullscreen={isFullscreen}
            onToggleFullscreen={onToggleFullscreen}
            presentationScale={presentationScale}
            onChangeScale={handleSetPresentationScale}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            sidebarToggleLabel={isSidebarCollapsed ? 'إظهار الفهرس' : 'توسيع عرض الدرس (100%)'}
          />

          {/* Quick Horizontal Section Tabs Bar */}
          <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {sectionTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = readerSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setReaderSection(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-amber-500 border-amber-600 text-slate-950 font-black shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                  <span className="font-['Cairo']">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Render Sections Based on readerSection */}
          {readerSection === 'philosophy' && (
            <PhilosophyAndCurriculumMapView unit={unit} scale={presentationScale} />
          )}

          {readerSection === 'cases' && (
            <IntegrativeCasesView unit={unit} scale={presentationScale} onAskAiAboutCase={onAskAiAboutUnit} />
          )}

          {readerSection === 'reviewBank' && (
            <SmartReviewBankView unit={unit} scale={presentationScale} onAskAi={onAskAiAboutUnit} />
          )}

          {readerSection === 'finalConnecting' && (
            <FinalConnectingCardView unit={unit} scale={presentationScale} onOpenJreModal={onOpenJreModal} />
          )}

          {readerSection === 'lessons' && (
            <div className="space-y-6">
              {/* Quick Horizontal Lessons Bar when Sidebar is Collapsed */}
              {isSidebarCollapsed && (
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <span className="text-xs font-black text-slate-600 shrink-0 ml-1 font-['Cairo']">
                    دروس الوحدة ({totalLessons}):
                  </span>
                  {unit.lessons.map((lsn, idx) => {
                    const isCurrent = activeLessonIndex === idx;
                    return (
                      <button
                        key={lsn.id}
                        onClick={() => {
                          setActiveLessonIndex(idx);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 border ${
                          isCurrent
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-xs font-black'
                            : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isCurrent ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {lsn.lessonNumber}
                        </span>
                        <span>{lsn.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              
              {/* Active Lesson Header Badge Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                      {activeLesson.lessonNumber}
                    </span>
                    <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                      الدرس رقم {activeLesson.lessonNumber} من {totalLessons}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-50 text-amber-900 font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>المحطات الـ 17 المعتمدة (5 مراحل)</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cairo']">
                    {activeLesson.title}
                  </h2>
                  {activeLesson.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      {activeLesson.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* =========================================================================
                  PRIMARY VIEW: All 17 Pedagogical Stations displayed immediately front-and-center
                  ========================================================================= */}
              <PedagogicalStationsView 
                lesson={activeLesson}
                unit={unit}
                onOpenJreModal={onOpenJreModal}
                presentationScale={presentationScale}
              />

              {/* Collapsible Unit Case Study Card */}
              <div className="bg-amber-50/70 rounded-3xl border border-amber-200/70 overflow-hidden shadow-xs transition-all">
                <button
                  onClick={() => setIsCaseStudyExpanded(!isCaseStudyExpanded)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-right hover:bg-amber-100/40 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black uppercase text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                          دراسة الحالة التأسيسية للوحدة
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 font-['Cairo'] mt-0.5">
                        {unit.caseStudy.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-amber-800 text-xs font-bold shrink-0">
                    <span className="hidden sm:inline">
                      {isCaseStudyExpanded ? 'طي دراسة الحالة' : 'قراءة دراسة الحالة'}
                    </span>
                    {isCaseStudyExpanded ? (
                      <ChevronUp className="w-5 h-5 text-amber-700" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-amber-700" />
                    )}
                  </div>
                </button>

                {isCaseStudyExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-amber-200/50 space-y-5 animate-in fade-in duration-200">
                    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-amber-100 shadow-2xs">
                      <p className={`whitespace-pre-line text-slate-800 ${
                        presentationScale === 'xlarge'
                          ? 'text-xl sm:text-2xl leading-[2.1]'
                          : presentationScale === 'large'
                          ? 'text-lg sm:text-xl leading-[1.95]'
                          : 'text-base sm:text-lg leading-[1.85]'
                      }`}>
                        {unit.caseStudy.story}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-amber-100/70 rounded-2xl border border-amber-200 space-y-2.5">
                        <h4 className="font-bold text-amber-950 flex items-center gap-2 font-['Cairo'] text-sm sm:text-base">
                          <span>❓</span>
                          <span>أسئلة المناقشة الاستكشافية للوحدة:</span>
                        </h4>
                        <ul className={`space-y-2 text-amber-950 list-disc list-inside font-medium ${
                          presentationScale === 'xlarge'
                            ? 'text-lg sm:text-xl leading-relaxed'
                            : presentationScale === 'large'
                            ? 'text-base sm:text-lg leading-relaxed'
                            : 'text-sm sm:text-base leading-relaxed'
                        }`}>
                          {unit.caseStudy.discussionQuestions.map((dq, idx) => (
                            <li key={idx} className="leading-relaxed">{dq}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 bg-indigo-50/80 rounded-2xl border border-indigo-200 space-y-2.5">
                        <h4 className="font-bold text-indigo-950 flex items-center gap-2 font-['Cairo'] text-sm sm:text-base">
                          <span>💡</span>
                          <span>التحليل الإداري الاستراتيجي للواقعة:</span>
                        </h4>
                        <p className={`text-indigo-950 font-medium ${
                          presentationScale === 'xlarge'
                            ? 'text-lg sm:text-xl leading-relaxed'
                            : presentationScale === 'large'
                            ? 'text-base sm:text-lg leading-relaxed'
                            : 'text-sm sm:text-base leading-relaxed'
                        }`}>
                          {unit.caseStudy.analysis}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Textbook Lesson Enrichment: Prior Context, Analysis Tool, Behavioral Dimension, Curriculum Links, Traps, Tiered Training, Summary */}
              <TextbookLessonEnrichment lesson={activeLesson} scale={presentationScale} />

              {/* Bottom Next/Previous Navigation Buttons */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={goToPrevLesson}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>
                    {activeLessonIndex > 0 ? `الدرس السابق: ${unit.lessons[activeLessonIndex - 1]?.title}` : 'الوحدة السابقة'}
                  </span>
                </button>

                <div className="text-center">
                  <span className="text-xs text-slate-500 font-bold block">
                    محتوى تعليمي ومفاهيمي مستقل لمرحلة البكالوريا 2026/2027
                  </span>
                </div>

                <button
                  onClick={goToNextLesson}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>
                    {activeLessonIndex < totalLessons - 1 ? `الدرس التالي: ${unit.lessons[activeLessonIndex + 1]?.title}` : 'الوحدة التالية'}
                  </span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
