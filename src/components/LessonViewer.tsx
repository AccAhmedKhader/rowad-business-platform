import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BookOpen, Clock, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, 
  Lightbulb, AlertTriangle, Scale, Brain, HelpCircle, Check, X, 
  ArrowLeft, ArrowRight, ArrowRightLeft, Layers, FileSpreadsheet, Eye, EyeOff, Award, BookA,
  Printer, Network, PenTool, PanelRight, Target
} from 'lucide-react';
import { LessonContent, SolvedExample, QuickCheckQuestion, LessonQuiz } from '../types';
import { curriculumRegistry } from '../domain/curriculum/CurriculumRegistry';
import { accountingGlossary } from '../data/accountingGlossaryData';
import { useFocusMode } from '../context/FocusModeContext';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';
import { sanitizeMathContent } from '../utils/sanitizeMath';
import { PrintToPdfModal } from './print/PrintToPdfModal';
import { MindMapView } from './MindMapView';
import { getLessonMindMap } from '../data/mindMaps';
import { useTheme } from '../context/ThemeContext';

const allLessons: LessonContent[] = curriculumRegistry.getAllLessonsContent();

interface LessonViewerProps {
  currentLessonIndex: number;
  setCurrentLessonIndex: (index: number) => void;
  onCompleteExercise: () => void;
  onOpenGlossaryTerm?: (termId: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  currentLessonIndex,
  setCurrentLessonIndex,
  onCompleteExercise,
  onOpenGlossaryTerm
}) => {
  const { isFocusMode, toggleFocusMode, fontSize, increaseFontSize, decreaseFontSize } = useFocusMode();
  const { isModernThanaweya } = useTheme();
  const { isSidebarCollapsed, toggleSidebarCollapse, openMobileDrawer } = useCurriculumFilter();
  const lesson: LessonContent = curriculumRegistry.getLessonContentByIndex(currentLessonIndex) || allLessons[0] || ({} as LessonContent);
  const [activeTab, setActiveTab] = useState<'intro' | 'study' | 'examples' | 'cases' | 'misconceptions' | 'summary' | 'quiz' | 'map'>('intro');
  const [isMindMapOpen, setIsMindMapOpen] = useState<boolean>(false);
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);

  const getTabClass = (tabId: string, colorVariant: 'blue' | 'amber' | 'indigo' | 'purple' | 'rose' | 'emerald') => {
    if (activeTab === tabId) {
      if (isModernThanaweya) {
        const colorMap = {
          blue: 'bg-blue-600 text-white shadow-xs font-bold rounded-lg',
          amber: 'bg-amber-500 text-white shadow-xs font-bold rounded-lg',
          indigo: 'bg-indigo-600 text-white shadow-xs font-bold rounded-lg',
          purple: 'bg-purple-600 text-white shadow-xs font-bold rounded-lg',
          rose: 'bg-rose-600 text-white shadow-xs font-bold rounded-lg',
          emerald: 'bg-emerald-600 text-white shadow-xs font-bold rounded-lg'
        };
        return `${tabBtnClass} ${colorMap[colorVariant]}`;
      }
      return `${tabBtnClass} bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs`;
    }
    return `${tabBtnClass} text-[#1D1D1B]/70 hover:bg-[#F9F7F2] border-transparent rounded-lg`;
  };

  // جعل مقدمة الدرس هي الصفحة الافتتاحية الرئيسية للدرس عند الانتقال بين الدروس
  useEffect(() => {
    setActiveTab('intro');
    setPendingSectionId(null);
  }, [lesson.id]);

  // إغلاق نافذة خريطة الدرس بمفتاح الهروب Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMindMapOpen) {
        setIsMindMapOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMindMapOpen]);

  // بعد فتح تبويب الشرح، انتقل إلى القسم الذي اختاره الطالب من الخريطة
  useEffect(() => {
    if (activeTab !== 'study' || !pendingSectionId) return;
    const el = document.getElementById(`lesson-section-${pendingSectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.setAttribute('tabindex', '-1');
      (el as HTMLElement).focus({ preventScroll: true });
    }
    setPendingSectionId(null);
  }, [activeTab, pendingSectionId]);

  const openSectionFromMap = (sectionId: string) => {
    setIsMindMapOpen(false);
    setPendingSectionId(sectionId);
    setActiveTab('study');
  };
  
  // Interactive quiz & quick check states
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [id: string]: string }>({});
  const [appliedAnswers, setAppliedAnswers] = useState<{ [id: string]: string }>({});
  const [revealedSolutions, setRevealedSolutions] = useState<{ [id: string]: boolean }>({});
  const [revealedSteps, setRevealedSteps] = useState<{ [exampleId: string]: boolean }>({});
  const [revealedDiagnostic, setRevealedDiagnostic] = useState<{ [id: string]: boolean }>({});

  const toggleRevealDiagnostic = (id: string) => {
    setRevealedDiagnostic(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAnswer = (qId: string, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
    onCompleteExercise();
  };

  const toggleRevealStep = (id: string) => {
    setRevealedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRevealSolution = (id: string) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setActiveTab('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setActiveTab('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dynamic typography scale classes proportional to screen size and user font preference
  const titleClass = fontSize === 'huge'
    ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F9F7F2] font-serif leading-tight'
    : fontSize === 'xlarge'
    ? 'text-3xl sm:text-4xl md:text-5xl font-black text-[#F9F7F2] font-serif leading-tight'
    : 'text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-[#F9F7F2] font-serif leading-tight';

  const subtitleClass = fontSize === 'huge' || fontSize === 'xlarge'
    ? 'text-lg sm:text-xl md:text-2xl text-[#F9F7F2]/90 mt-2.5 font-serif leading-relaxed'
    : 'text-base sm:text-lg md:text-xl text-[#F9F7F2]/85 mt-2 font-serif leading-relaxed';

  const sectionHeadingClass = fontSize === 'huge'
    ? 'text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D1D1B] font-serif leading-snug'
    : fontSize === 'xlarge'
    ? 'text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1D1D1B] font-serif leading-snug'
    : 'text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D1D1B] font-serif leading-snug';

  const bodyTextClass = fontSize === 'huge'
    ? 'text-xl sm:text-2xl text-[#1D1D1B]/95 leading-[2.1] font-serif'
    : fontSize === 'xlarge'
    ? 'text-lg sm:text-xl text-[#1D1D1B]/90 leading-[2] font-serif'
    : fontSize === 'large'
    ? 'text-base sm:text-lg md:text-xl text-[#1D1D1B]/90 leading-[1.9] font-serif'
    : 'text-base sm:text-lg text-[#1D1D1B]/90 leading-[1.8] font-serif';

  const subHeadingClass = fontSize === 'huge' || fontSize === 'xlarge'
    ? 'text-lg sm:text-xl font-bold text-[#1D1D1B] font-serif'
    : 'text-base sm:text-lg font-bold text-[#1D1D1B] font-serif';

  const tableHeaderClass = 'p-3.5 sm:p-4 text-sm sm:text-base font-bold border-l border-[#1D1D1B]/40 last:border-l-0 text-center font-serif';

  const tableCellClass = 'p-3.5 sm:p-4 text-sm sm:text-base border-l border-[#1D1D1B]/10 last:border-l-0 leading-relaxed font-serif';

  const stepCardClass = 'p-4 sm:p-5 text-sm sm:text-base md:text-lg bg-[#F9F7F2] border border-[#1D1D1B]/10 leading-relaxed';

  const tabBtnClass = 'px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold transition flex items-center gap-2 whitespace-nowrap border cursor-pointer';

  return (
    <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 md:px-8 lg:px-10 py-5 space-y-8 transition-all duration-300">
      
      {/* Refined Breadcrumb & Reading Controls Toolbar (Zero Clutter) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 border border-[#1D1D1B]/15 shadow-2xs">
        <nav aria-label="مسار الدرس" className="flex items-center gap-1.5 text-xs sm:text-sm font-serif flex-wrap">
          <Link 
            to="/curriculum" 
            className="text-[#1D1D1B]/60 hover:text-[#1D1D1B] font-bold transition flex items-center gap-1"
          >
            <span>المنهج</span>
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-[#1D1D1B]/40" />
          <Link 
            to={`/curriculum/${lesson.unitId}`} 
            className="text-[#1D1D1B]/70 hover:text-[#1D1D1B] font-bold transition"
          >
            {lesson.unitId === 'unit-10' ? 'الوحدة العاشرة: التحليل المالي' : 
             lesson.unitId === 'unit-9' ? 'الوحدة التاسعة: شركات الأموال' : 
             lesson.unitId === 'unit-8' ? 'الوحدة الثامنة: شركات التضامن' : 
             lesson.unitId === 'unit-7' ? 'الوحدة السابعة: الإهلاك والمخصصات' : 
             lesson.unitId === 'unit-6' ? 'الوحدة السادسة: السجلات ونظم الرقابة' : 
             lesson.unitId === 'unit-5' ? 'الوحدة الخامسة: القوائم المالية' : 
             lesson.unitId === 'unit-4' ? 'الوحدة الرابعة: ميزان المراجعة' : 
             lesson.unitId === 'unit-3' ? 'الوحدة الثالثة: الدفاتر المساعدة' : 
             lesson.unitId === 'unit-2' ? 'الوحدة الثانية: التسجيل المحاسبي' : 
             'الوحدة الأولى: أساسيات المحاسبة'}
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-[#1D1D1B]/40" />
          <span className="font-bold text-[#1D1D1B] bg-[#F9F7F2] px-2.5 py-0.5 border border-[#1D1D1B]/10">
            الدرس {lesson.lessonNumber}: {lesson.title}
          </span>
        </nav>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Responsive Font Size Scaling */}
          <div className="flex items-center gap-1 bg-[#F9F7F2] border border-[#1D1D1B]/20 px-2.5 py-1 text-xs">
            <span className="text-[#1D1D1B]/70 font-serif font-bold ml-1">حجم الخط:</span>
            <button
              type="button"
              onClick={decreaseFontSize}
              disabled={fontSize === 'normal'}
              className="px-2 py-0.5 bg-white border border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition font-mono font-bold cursor-pointer"
              title="تصغير حجم الخط"
            >
              A-
            </button>
            <span className="font-serif text-[11px] font-bold px-1.5 text-[#1D1D1B] min-w-[65px] text-center">
              {fontSize === 'normal' ? 'عادي' : fontSize === 'large' ? 'كبير' : fontSize === 'xlarge' ? 'كبير جداً' : 'أقصى تكبير'}
            </span>
            <button
              type="button"
              onClick={increaseFontSize}
              disabled={fontSize === 'huge'}
              className="px-2 py-0.5 bg-white border border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition font-mono font-bold cursor-pointer"
              title="تكبير حجم الخط"
            >
              A+
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                openMobileDrawer();
              } else {
                toggleSidebarCollapse();
              }
            }}
            title={isSidebarCollapsed ? "فتح قائمة الوحدات والدروس (Ctrl+B)" : "طي القائمة الجانبية (Ctrl+B)"}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold text-[#1D1D1B] bg-[#F9F7F2] hover:bg-[#1D1D1B] hover:text-[#F9F7F2] border border-[#1D1D1B]/20 transition cursor-pointer group"
          >
            <Layers className="w-3.5 h-3.5 text-[#C4A484] group-hover:text-[#C4A484]" />
            <span>فهرس الوحدات والدروس</span>
            <span className="text-[10px] text-[#1D1D1B]/50 group-hover:text-[#C4A484] font-mono hidden sm:inline">
              Ctrl+B
            </span>
          </button>
        </div>
      </div>

      {/* Lesson Hero Banner (اسم الوحدة وعنوان الدرس) */}
      <div className={`p-5 sm:p-7 shadow-sm space-y-4 relative overflow-hidden ${
        isModernThanaweya
          ? 'bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl border border-blue-800/60'
          : 'bg-[#1D1D1B] text-[#F9F7F2] rounded-none border border-[#1D1D1B]'
      }`}>
        {isModernThanaweya && (
          <>
            <div className="absolute -left-10 -top-10 w-44 h-44 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-10 -bottom-10 w-60 h-28 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />
          </>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-3 py-1 uppercase tracking-wider ${
              isModernThanaweya
                ? 'bg-blue-600 text-white rounded-lg shadow-xs font-sans'
                : 'bg-[#C4A484] text-[#1D1D1B]'
            }`}>
              {lesson.unitId === 'unit-10' ? 'الوحدة العاشرة' : lesson.unitId === 'unit-9' ? 'الوحدة التاسعة' : lesson.unitId === 'unit-8' ? 'الوحدة الثامنة' : lesson.unitId === 'unit-7' ? 'الوحدة السابعة' : lesson.unitId === 'unit-6' ? 'الوحدة السادسة' : lesson.unitId === 'unit-5' ? 'الوحدة الخامسة' : lesson.unitId === 'unit-4' ? 'الوحدة الرابعة' : lesson.unitId === 'unit-3' ? 'الوحدة الثالثة' : lesson.unitId === 'unit-2' ? 'الوحدة الثانية' : 'الوحدة الأولى'} • الدرس {lesson.lessonNumber} من {allLessons.filter(l => l.unitId === lesson.unitId).length || 6}
            </span>
            {lesson.subLo && (
              <span className={`text-xs font-bold px-2.5 py-1 border font-mono ${
                isModernThanaweya
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 rounded-lg'
                  : 'bg-[#FFFFFF]/10 text-[#C4A484] border-[#C4A484]/40'
              }`}>
                🎯 {lesson.subLo}
              </span>
            )}
            <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 border ${
              isModernThanaweya
                ? 'bg-white/10 text-slate-200 border-white/15 rounded-lg'
                : 'bg-[#FFFFFF]/10 text-[#F9F7F2]/75 border-[#F9F7F2]/20'
            }`}>
              <Clock className={`w-3.5 h-3.5 ${isModernThanaweya ? 'text-amber-300' : 'text-[#C4A484]'}`} />
              <span>{lesson.estimatedMinutes} دقيقة مذاكرة</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {/* Mind Map Quick Action Button */}
            {getLessonMindMap(lesson.id) && (
              <button
                type="button"
                onClick={() => setIsMindMapOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/25 text-[#F9F7F2] border border-[#C4A484]/60 hover:border-[#C4A484] font-bold text-xs transition cursor-pointer shadow-xs"
                title="فتح خريطة الدرس الذهنية عند الحاجة"
                id="lesson-header-mindmap-btn"
              >
                <Network className="w-3.5 h-3.5 text-[#C4A484]" />
                <span>خريطة الدرس</span>
              </button>
            )}

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C4A484] hover:bg-[#b5926e] text-[#1D1D1B] font-bold text-xs transition cursor-pointer shadow-xs border border-[#C4A484]"
              title="تصدير هذا الدرس أو الوحدة الحالية إلى ملف PDF بجودة طباعة A4"
              id="lesson-export-pdf-top-btn"
            >
              <Printer className="w-3.5 h-3.5 text-[#1D1D1B]" />
              <span className="hidden sm:inline">تصدير PDF</span>
            </button>
            <button
              onClick={handlePrevLesson}
              disabled={currentLessonIndex === 0}
              className="p-1.5 sm:p-2 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 disabled:opacity-30 disabled:cursor-not-allowed transition border border-[#F9F7F2]/20"
              title="الدرس السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextLesson}
              disabled={currentLessonIndex === allLessons.length - 1}
              className="p-1.5 sm:p-2 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 disabled:opacity-30 disabled:cursor-not-allowed transition border border-[#F9F7F2]/20"
              title="الدرس التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <h2 className={titleClass}>
            {lesson.title}
          </h2>
          <p className={subtitleClass}>
            {lesson.subtitle}
          </p>
        </div>
      </div>

      {/* Internal Lesson Navigation Tabs - Elevated Directly Below Unit/Lesson Header */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 border-b border-[#1D1D1B]/15 bg-white px-2 py-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('intro')}
            className={getTabClass('intro', 'blue')}
            id="lesson-tab-intro"
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>مقدمة الدرس</span>
          </button>

          <button
            onClick={() => setActiveTab('study')}
            className={getTabClass('study', 'amber')}
            id="lesson-tab-study"
          >
            <BookOpen className="w-4 h-4 text-amber-200" />
            <span>الشرح والمفاهيم ({(lesson.sections || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('examples')}
            className={getTabClass('examples', 'indigo')}
            id="lesson-tab-examples"
          >
            <Layers className="w-4 h-4 text-indigo-200" />
            <span>الأسئلة المحلولة ({(lesson.solvedExamples || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={getTabClass('cases', 'purple')}
            id="lesson-tab-cases"
          >
            <Brain className="w-4 h-4 text-purple-200" />
            <span>فكر كمحاسب</span>
          </button>

          {lesson.misconceptions && (lesson.misconceptions || []).length > 0 && (
            <button
              onClick={() => setActiveTab('misconceptions')}
              className={getTabClass('misconceptions', 'rose')}
              id="lesson-tab-misconceptions"
            >
              <AlertTriangle className="w-4 h-4 text-rose-200" />
              <span>فخ الامتحان والأخطاء ({(lesson.misconceptions || []).length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('summary')}
            className={getTabClass('summary', 'amber')}
            id="lesson-tab-summary"
          >
            <Clock className="w-4 h-4 text-amber-200" />
            <span>خلاصة الدرس</span>
          </button>

          {lesson.lessonQuiz && (
            <button
              onClick={() => setActiveTab('quiz')}
              className={getTabClass('quiz', 'emerald')}
              id="lesson-tab-quiz"
            >
              <Award className="w-4 h-4 text-emerald-200" />
              <span>اختبر فهمك{lesson.lessonQuiz.totalMarks ? ` (${lesson.lessonQuiz.totalMarks} درجة)` : ''}</span>
            </button>
          )}
        </div>

        {/* Dedicated Mind Map Action Button */}
        {getLessonMindMap(lesson.id) && (
          <button
            type="button"
            onClick={() => setIsMindMapOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#1D1D1B] bg-[#F9F7F2] hover:bg-[#1D1D1B] hover:text-[#F9F7F2] border border-[#1D1D1B]/20 transition cursor-pointer whitespace-nowrap shrink-0 group shadow-2xs"
            title="فتح خريطة الدرس الشاملة عند الحاجة"
            id="lesson-tab-open-mindmap"
          >
            <Network className="w-3.5 h-3.5 text-[#C4A484] group-hover:text-[#C4A484]" />
            <span>خريطة الدرس</span>
          </button>
        )}
      </div>

      {/* TAB 0: LESSON INTRODUCTION (الصفحة الرئيسية للدرس) */}
      {activeTab === 'intro' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* 1. Real-World Hook Story & Practical Scenario */}
          {lesson.realWorldIntroduction && (
            <div className={`p-6 sm:p-8 shadow-xs space-y-4 ${
              isModernThanaweya
                ? 'bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/60 border border-indigo-200/80 rounded-2xl'
                : 'bg-[#FFFFFF] border-2 border-[#1D1D1B]'
            }`}>
              <div className="flex items-center justify-between gap-3 border-b border-indigo-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 flex items-center justify-center font-bold ${
                    isModernThanaweya
                      ? 'rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-xs'
                      : 'bg-[#C4A484] text-[#1D1D1B]'
                  }`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`font-extrabold text-base sm:text-lg font-serif ${
                      isModernThanaweya ? 'text-indigo-950' : 'text-[#1D1D1B]'
                    }`}>
                      قصة البداية والواقع العملي (من واقع الشركات والحياة الاقتصادية)
                    </h3>
                    <p className={`text-xs ${isModernThanaweya ? 'text-indigo-800/70' : 'text-[#1D1D1B]/65'}`}>
                      مدخل واقعي يربط المفهوم النظري بالتطبيق الفعلي في سوق العمل
                    </p>
                  </div>
                </div>
                <span className={`text-[11px] font-mono px-2.5 py-1 font-bold ${
                  isModernThanaweya
                    ? 'bg-indigo-100 text-indigo-800 rounded-lg border border-indigo-300'
                    : 'bg-[#F9F7F2] text-[#1D1D1B] border border-[#1D1D1B]/20'
                }`}>
                  المدخل التطبيقي
                </span>
              </div>

              <div className={`p-4 sm:p-5 space-y-3 ${
                isModernThanaweya
                  ? 'bg-white/90 border-r-4 border-indigo-500 rounded-xl shadow-2xs'
                  : 'bg-[#F9F7F2] border-r-4 border-[#C4A484]'
              }`}>
                <p className={`${isFocusMode ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base'} text-slate-800 leading-relaxed font-serif`}>
                  {lesson.realWorldIntroduction.hookStory}
                </p>
                {lesson.realWorldIntroduction.connectionToLesson && (
                  <div className="pt-3 border-t border-slate-100 flex items-start gap-2">
                    <span className="text-amber-500 font-bold text-base shrink-0">💡</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 font-serif leading-relaxed">
                      الربط بالمحاسبة والهدف التعليمي: {lesson.realWorldIntroduction.connectionToLesson}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Targeted Learning Outcomes & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`md:col-span-2 p-5 sm:p-6 shadow-xs space-y-3 ${
              isModernThanaweya
                ? 'card-learning-outcomes rounded-2xl'
                : 'bg-[#FFFFFF] border-2 border-[#1D1D1B]'
            }`}>
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Target className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-emerald-950 text-sm sm:text-base font-serif">
                    مخرجات التعلم المعتمدة (Learning Outcomes):
                  </h4>
                </div>
                <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  LOs
                </span>
              </div>
              {lesson.subLoDescription ? (
                <div className="p-3.5 bg-white/90 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed font-serif">
                  <strong className="text-emerald-700 block mb-1">المخرج المعتمد من كتاب الوزارة:</strong>
                  {lesson.subLoDescription}
                </div>
              ) : null}
              {lesson.whatYouWillLearn && lesson.whatYouWillLearn.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-emerald-900 block">ستتمكن بعد دراسة هذا الدرس من:</span>
                  <ul className="space-y-2">
                    {lesson.whatYouWillLearn.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-serif">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-black shadow-2xs">✓</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Metrics & Launch Card */}
            <div className={`p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 ${
              isModernThanaweya
                ? 'bg-white border border-slate-200/90 rounded-2xl'
                : 'bg-[#F9F7F2] border-2 border-[#1D1D1B]'
            }`}>
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>بيانات ومؤشرات الدرس</span>
                  <span className="text-[10px] text-blue-600 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                    دفعة 2027
                  </span>
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">مدة المذاكرة:</span>
                    <strong className="text-sm font-mono text-slate-900">{lesson.estimatedMinutes} دقيقة</strong>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">محاور الشرح:</span>
                    <strong className="text-sm font-mono text-slate-900">{(lesson.sections || []).length} محاور</strong>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">أسئلة محلولة:</span>
                    <strong className="text-sm font-mono text-slate-900">{(lesson.solvedExamples || []).length} مسائل</strong>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">اختبار الإتقان:</span>
                    <strong className="text-sm font-mono text-emerald-600 font-bold">
                      {lesson.lessonQuiz?.totalMarks ? `${lesson.lessonQuiz.totalMarks} درجة` : 'متوفر'}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('study')}
                  className={`w-full py-2.5 px-4 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                    isModernThanaweya
                      ? 'bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs'
                      : 'bg-[#1D1D1B] text-[#F9F7F2] hover:bg-[#333330]'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-blue-200" />
                  <span>بدء الشرح والمفاهيم</span>
                </button>
                {getLessonMindMap(lesson.id) && (
                  <button
                    type="button"
                    onClick={() => setIsMindMapOpen(true)}
                    className={`w-full py-2 px-4 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                      isModernThanaweya
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl border border-slate-300'
                        : 'bg-white text-[#1D1D1B] hover:bg-[#F9F7F2] border border-[#1D1D1B]/30'
                    }`}
                  >
                    <Network className="w-3.5 h-3.5 text-blue-600" />
                    <span>استعراض خريطة الدرس</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3. Lesson Outline & Topic Sections */}
          <div className={`p-5 sm:p-6 shadow-xs space-y-4 ${
            isModernThanaweya
              ? 'bg-white border border-slate-200/90 rounded-2xl'
              : 'bg-[#FFFFFF] border-2 border-[#1D1D1B]'
          }`}>
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isModernThanaweya ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-[#C4A484]'
                }`}>
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base font-serif">
                  محاور الدرس والشرح الأكاديمي ({(lesson.sections || []).length} أقسام):
                </h4>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline font-serif">
                اضغط على أي محور للانتقال المباشر لشرحه
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(lesson.sections || []).map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => openSectionFromMap(sec.id)}
                  className={`p-3.5 transition cursor-pointer group flex flex-col justify-between space-y-2 shadow-2xs hover:shadow-xs ${
                    isModernThanaweya
                      ? 'bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-100'
                      : 'bg-[#F9F7F2] hover:bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold font-mono block ${
                      isModernThanaweya ? 'text-blue-600' : 'text-[#C4A484] group-hover:text-[#1D1D1B]'
                    }`}>
                      المحور 0{idx + 1}
                    </span>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-900 font-serif leading-snug">
                      {sec.title}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-blue-600 pt-2 border-t border-slate-200/80">
                    <span>انتقل للشرح</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Interactive Glossary Terms Snapshot */}
          {(() => {
            const lessonTerms = accountingGlossary.filter(g => 
              g.relatedLessonId === lesson.id || 
              g.lessonId === lesson.id ||
              (lesson.id.startsWith('u2-lesson-') && g.relatedLessonId === lesson.id.replace('u2-lesson-', 'lesson-2-')) ||
              (lesson.id.startsWith('lesson-2-') && g.relatedLessonId === lesson.id.replace('lesson-2-', 'u2-lesson-'))
            );
            if (lessonTerms.length === 0) return null;
            return (
              <div className="bg-[#FDFCF7] border-2 border-[#1D1D1B] p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1D1D1B]/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <BookA className="w-4 h-4 text-[#C4A484]" />
                    <h4 className="font-extrabold text-[#1D1D1B] text-xs sm:text-sm font-serif">
                      المصطلحات والمفاهيم المحورية في هذا الدرس ({lessonTerms.length} مصطلحات):
                    </h4>
                  </div>
                  <span className="text-[11px] text-[#1D1D1B]/60">اضغط على أي مصطلح للاطلاع على شرحه المعتمد</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {lessonTerms.map(term => (
                    <button
                      key={term.id}
                      onClick={() => onOpenGlossaryTerm && onOpenGlossaryTerm(term.id)}
                      className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#1D1D1B] text-[#1D1D1B] hover:text-[#F9F7F2] border border-[#1D1D1B]/25 hover:border-[#1D1D1B] text-xs font-bold transition flex items-center gap-1.5 group cursor-pointer shadow-2xs"
                    >
                      <span>{term.term}</span>
                      <span className="text-[10px] text-[#1D1D1B]/50 group-hover:text-[#C4A484] font-mono">({term.termEn})</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: MIND MAP (إذا فتحت من تبويب مباشر) */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-3 border border-[#1D1D1B]/15 shadow-2xs">
            <span className="font-bold text-sm text-[#1D1D1B] font-serif">خريطة الدرس الذهنية</span>
            <button
              onClick={() => setActiveTab('intro')}
              className="px-3 py-1 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold hover:bg-[#333330] transition cursor-pointer"
            >
              العودة للدرس ⬅
            </button>
          </div>
          <MindMapView
            lessonId={lesson.id}
            onOpenSection={openSectionFromMap}
            onOpenQuestions={() => setActiveTab('quiz')}
            showHeader={false}
            className="pt-2"
          />
        </div>
      )}

      {/* TAB 1: STUDY & SECTIONS */}
      {activeTab === 'study' && (
        <div className="space-y-8">
          
          {/* Interactive Accounting Glossary Terms Card */}
          {(() => {
            const lessonTerms = accountingGlossary.filter(g => 
              g.relatedLessonId === lesson.id || 
              g.lessonId === lesson.id ||
              (lesson.id.startsWith('u2-lesson-') && g.relatedLessonId === lesson.id.replace('u2-lesson-', 'lesson-2-')) ||
              (lesson.id.startsWith('lesson-2-') && g.relatedLessonId === lesson.id.replace('lesson-2-', 'u2-lesson-'))
            );
            if (lessonTerms.length === 0) return null;
            return (
              <div className="bg-[#FDFCF7] border-2 border-[#1D1D1B] p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1D1D1B]/15 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-bold">
                      <BookA className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#1D1D1B] text-xs sm:text-sm font-serif">
                        قاموس المصطلحات والمبادئ المحورية في هذا الدرس:
                      </h4>
                      <p className="text-[11px] text-[#1D1D1B]/70">
                        اضغط على أي مصطلح لعرض تعريفه الأكاديمي، مثاله العملي، والتنبيهات المنهجية فوراً
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono bg-[#1D1D1B] text-[#F9F7F2] px-2 py-0.5 font-bold">
                    {lessonTerms.length} مصطلحات أساسية
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {lessonTerms.map(term => (
                    <button
                      key={term.id}
                      onClick={() => onOpenGlossaryTerm && onOpenGlossaryTerm(term.id)}
                      className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#1D1D1B] text-[#1D1D1B] hover:text-[#F9F7F2] border border-[#1D1D1B]/25 hover:border-[#1D1D1B] text-xs font-bold transition flex items-center gap-1.5 group cursor-pointer shadow-2xs"
                    >
                      <span className="w-1.5 h-1.5 bg-[#C4A484] group-hover:bg-[#F9F7F2]" />
                      <span>{term.term}</span>
                      <span className="text-[10px] text-[#1D1D1B]/50 group-hover:text-[#F9F7F2]/70 font-mono">
                        ({term.termEn})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Learning Objectives Pill Box */}
          {((lesson.whatYouWillLearn && lesson.whatYouWillLearn.length > 0) || (lesson.learningOutcomes && lesson.learningOutcomes.length > 0) || (lesson.objectives && lesson.objectives.length > 0)) && (
            <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 rounded-none p-4 sm:p-5 shadow-xs">
              <h4 className="font-bold text-[#1D1D1B] text-sm mb-2 flex items-center gap-2 font-serif">
                <CheckCircle2 className="w-4 h-4 text-[#C4A484]" />
                <span>ما ستتعلمه وتتقنه في هذا الدرس:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lesson.whatYouWillLearn || lesson.learningOutcomes || lesson.objectives || []).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#1D1D1B]/80 font-medium">
                    <span className="w-1.5 h-1.5 bg-[#C4A484] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sections List */}
          <div className="space-y-6">
            {(lesson.sections || []).map((section, sIdx) => (
              <div 
                key={section.id || sIdx} 
                id={section.id ? `lesson-section-${section.id}` : undefined}
                className="bg-[#FFFFFF] border border-[#1D1D1B]/15 rounded-none p-5 sm:p-8 shadow-xs space-y-5 scroll-mt-24 focus:outline-none"
              >
                <div className="border-b border-[#1D1D1B]/10 pb-3 flex items-center justify-between">
                  <h3 className={sectionHeadingClass}>
                    {section.title}
                  </h3>
                  <span className={`font-mono text-[#1D1D1B]/50 ${isFocusMode ? 'text-sm' : 'text-[11px]'}`}>§ {sIdx + 1}</span>
                </div>

                {/* Simplified vs Scientific Definitions */}
                {(section.simplifiedDefinition || section.scientificDefinition) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.simplifiedDefinition && (
                      <div className="bg-[#F9F7F2] border border-[#1D1D1B]/10 p-4 sm:p-5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#1D1D1B] font-bold font-serif">
                          <Lightbulb className="w-4 h-4 text-[#C4A484]" />
                          <span className={subHeadingClass}>المفهوم ببساطة (الفكرة الجوهرية):</span>
                        </div>
                        <p className={bodyTextClass}>
                          {section.simplifiedDefinition}
                        </p>
                      </div>
                    )}

                    {section.scientificDefinition && (
                      <div className="bg-[#FFFFFF] border border-[#1D1D1B]/20 p-4 sm:p-5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#1D1D1B] font-bold font-serif">
                          <BookOpen className="w-4 h-4 text-[#1D1D1B]" />
                          <span className={subHeadingClass}>التعريف العلمي الدقيق (معايير المحاسبة):</span>
                        </div>
                        <p className={bodyTextClass}>
                          {section.scientificDefinition}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Why We Study This */}
                {section.whyWeStudyThis && (
                  <div className="bg-[#F9F7F2] border-r-4 border-[#C4A484] p-4 sm:p-5 text-[#1D1D1B] space-y-1">
                    <span className={`font-bold block font-serif ${subHeadingClass}`}>🎯 لماذا ندرس هذا المفهوم وكيف يؤثر على المنشأة؟</span>
                    <p className={bodyTextClass}>{section.whyWeStudyThis}</p>
                  </div>
                )}

                {/* Deep Markdown / Conceptual & Technical Content */}
                {section.content && (
                  <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 sm:p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2.5 text-[#1D1D1B] font-bold font-serif">
                        <BookOpen className="w-5 h-5 text-[#C4A484] shrink-0" />
                        <span className={`font-extrabold ${subHeadingClass}`}>
                          {section.contentTitle ? `📖 ${section.contentTitle}:` : '📖 الشرح التفصيلي والتأصيل المحاسبي للمفهوم:'}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#1D1D1B]/75 bg-[#F9F7F2] px-3 py-1 border border-[#1D1D1B]/15 font-serif flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4A484]"></span>
                        قواعد وضوابط معتمدة
                      </span>
                    </div>

                    <div className={`text-[#1D1D1B]/90 font-serif leading-relaxed ${bodyTextClass}`}>
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1D1D1B] mt-7 mb-3.5 pb-2 border-b-2 border-[#1D1D1B]/15 font-serif">
                              {children}
                            </h2>
                          ),
                          h2: ({ children }) => (
                            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1D1D1B] mt-6 mb-3 pb-1.5 border-b border-[#1D1D1B]/15 font-serif">
                              {children}
                            </h3>
                          ),
                          h3: ({ children }) => (
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#1D1D1B] mt-5 mb-2.5 flex items-center gap-2 font-serif">
                              <span className="w-2.5 h-2.5 bg-[#C4A484] inline-block shrink-0"></span>
                              <span>{children}</span>
                            </h4>
                          ),
                          h4: ({ children }) => (
                            <h5 className="text-sm sm:text-base md:text-lg font-bold text-[#C4A484] mt-4 mb-2 font-serif">
                              {children}
                            </h5>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4 last:mb-0 leading-[1.85] font-serif">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-extrabold text-[#1D1D1B]">{children}</strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-2 my-3.5 pr-2 text-[#1D1D1B]/90 font-serif">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside space-y-2.5 my-3.5 pr-2 text-[#1D1D1B]/90 font-serif font-bold">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-[1.85]">
                              <span className="font-normal">{children}</span>
                            </li>
                          ),
                          blockquote: ({ children }) => (
                            <div className="bg-[#F9F7F2] border-r-4 border-[#C4A484] p-4 sm:p-6 my-4 text-base sm:text-lg md:text-xl text-[#1D1D1B] font-serif not-italic leading-relaxed shadow-2xs">
                              {children}
                            </div>
                          ),
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-5 border border-[#1D1D1B]/20 shadow-2xs">
                              <table className="w-full text-right border-collapse text-sm sm:text-base">
                                {children}
                              </table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-[#1D1D1B] text-[#F9F7F2] font-bold font-serif">
                              {children}
                            </thead>
                          ),
                          th: ({ children }) => (
                            <th className="p-3.5 sm:p-4 border-l border-[#1D1D1B]/40 last:border-l-0 text-center font-serif text-sm sm:text-base">
                              {children}
                            </th>
                          ),
                          tbody: ({ children }) => (
                            <tbody className="divide-y divide-[#1D1D1B]/10 bg-[#FFFFFF]">
                              {children}
                            </tbody>
                          ),
                          tr: ({ children }) => (
                            <tr className="hover:bg-[#F9F7F2]/70 transition-colors">
                              {children}
                            </tr>
                          ),
                          td: ({ children }) => (
                            <td className="p-3.5 sm:p-4 border-l border-[#1D1D1B]/10 last:border-l-0 font-serif text-right text-sm sm:text-base leading-relaxed">
                              {children}
                            </td>
                          ),
                          hr: () => <hr className="my-5 border-[#1D1D1B]/15" />,
                          code: ({ children }) => (
                            <code className="bg-[#F9F7F2] border border-[#1D1D1B]/20 px-2 py-0.5 text-xs sm:text-sm font-mono font-bold text-[#1D1D1B]">
                              {children}
                            </code>
                          )
                        }}
                      >
                        {sanitizeMathContent(section.content)}
                      </Markdown>
                    </div>
                  </div>
                )}

                {/* How to Apply */}
                {section.howToApply && section.howToApply.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className={`font-bold text-[#1D1D1B] flex items-center gap-2 font-serif ${subHeadingClass}`}>
                      <span>⚙️ خطوات التطبيق والحل المحاسبي السليم:</span>
                    </h4>
                    <div className="space-y-2">
                      {section.howToApply.map((step, stepIdx) => (
                        <div key={stepIdx} className={`flex items-start gap-3 ${stepCardClass}`}>
                          <span className="font-bold text-[#1D1D1B] shrink-0 font-serif">{stepIdx + 1}.</span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Insight */}
                {section.keyInsight && (
                  <div className="bg-[#1D1D1B] text-[#F9F7F2] p-4 sm:p-5 border border-[#1D1D1B] space-y-1.5">
                    <span className={`text-[#C4A484] font-bold block font-serif ${subHeadingClass}`}>💡 {section.keyInsight.title}</span>
                    <p className="font-mono text-xs sm:text-sm text-[#C4A484]">{section.keyInsight.mnemonicOrRule}</p>
                    <p className={`text-[#F9F7F2]/85 font-serif ${bodyTextClass}`}>{section.keyInsight.explanation}</p>
                  </div>
                )}

                {/* Micro Example */}
                {section.microExample && (
                  <div className="bg-[#F9F7F2] border border-[#1D1D1B]/15 p-4 sm:p-5 text-[#1D1D1B] flex items-start gap-2.5">
                    <span className={`font-bold shrink-0 font-serif ${subHeadingClass}`}>📌 مثال تطبيقي سريع:</span>
                    <span className={bodyTextClass}>{section.microExample}</span>
                  </div>
                )}

                {/* Comparison Table if exists */}
                {section.comparison && (
                  <div className="space-y-2.5 mt-4">
                    <h5 className={`font-bold text-[#1D1D1B] flex items-center gap-2 font-serif ${subHeadingClass}`}>
                      <Scale className="w-4 h-4 text-[#C4A484]" />
                      <span>{section.comparison.title}</span>
                    </h5>
                    <div className="overflow-x-auto border-2 border-[#1D1D1B] shadow-xs">
                      <table className="w-full text-right border-collapse">
                        <thead className="bg-[#1D1D1B] text-[#F9F7F2] font-bold">
                          <tr>
                            {(section.comparison.headers || []).map((h, i) => (
                              <th 
                                key={i} 
                                className={`${tableHeaderClass} ${i === 0 ? 'text-right' : 'text-center'}`}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1D1D1B]/15 bg-[#FFFFFF]">
                          {(section.comparison.rows || []).map((row, rIdx) => {
                            const headersCount = (section.comparison?.headers || []).length;
                            const rawCells: (string | undefined)[] = [
                              row.aspect,
                              row.col1,
                              row.col2,
                              row.col3,
                              row.col4,
                              row.col5 ?? row.extra
                            ];
                            const cells = rawCells.slice(0, Math.max(headersCount, 3));

                            return (
                              <tr 
                                key={rIdx} 
                                className={`transition-colors ${rIdx % 2 === 1 ? 'bg-[#FAF8F5]' : 'bg-[#FFFFFF]'} hover:bg-[#F3EFE6]`}
                              >
                                {cells.map((cellText, cIdx) => {
                                  const text = cellText || '';
                                  const isFirstCol = cIdx === 0;

                                  return (
                                    <td 
                                      key={cIdx} 
                                      className={`${tableCellClass} ${
                                        isFirstCol 
                                          ? 'font-bold text-[#1D1D1B] text-right bg-[#FAF8F5]/80' 
                                          : cIdx === 1 
                                            ? 'text-right text-[#1D1D1B]/85' 
                                            : 'text-center text-[#1D1D1B]'
                                      }`}
                                    >
                                      {text}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Caution Box */}
                {section.caution && (
                  <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[#1D1D1B] font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-[#C4A484]" />
                      <span className={subHeadingClass}>⚠️ انتبه: {section.caution.title}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="bg-[#F9F7F2] p-3.5 sm:p-4 border border-[#1D1D1B]/15">
                        <span className={`font-bold text-[#1D1D1B] block mb-1 ${subHeadingClass}`}>الخطأ الشائع:</span>
                        <p className={bodyTextClass}>{section.caution.commonMistake}</p>
                        <p className={`text-[#1D1D1B] font-bold mt-1.5 font-serif ${isFocusMode ? 'text-xs sm:text-sm' : 'text-[11px]'}`}>السبب: {section.caution.whyWrong}</p>
                      </div>
                      <div className="bg-[#F9F7F2] p-3.5 sm:p-4 border border-[#1D1D1B]/15">
                        <span className={`font-bold text-[#1D1D1B] block mb-1 ${subHeadingClass}`}>التصرف الصحيح المحاسبي:</span>
                        <p className={bodyTextClass}>{section.caution.correctWay}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Quick Check Practice */}
          {lesson.quickChecks && lesson.quickChecks.length > 0 && (
            <div className="bg-[#1D1D1B] text-[#F9F7F2] rounded-none p-6 sm:p-8 space-y-6 shadow-xs border border-[#1D1D1B]">
              <div className="flex items-center justify-between border-b border-[#1D1D1B]/40 pb-4">
                <div>
                  <span className="text-[#C4A484] text-xs font-bold uppercase tracking-wider block mb-1">تدريب ذاتي فوري</span>
                  <h3 className={`font-extrabold text-[#F9F7F2] font-serif ${sectionHeadingClass}`}>✏️ تدرب سريعاً واختبر فهمك للدرس</h3>
                </div>
                <span className={`border border-[#C4A484] text-[#C4A484] font-bold px-3 py-1 ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                  {lesson.quickChecks.length} أسئلة
                </span>
              </div>

              <div className="space-y-4">
                {lesson.quickChecks.map((qc, qIdx) => {
                  const userAns = selectedAnswers[qc.id];
                  const isAnswered = userAns !== undefined;
                  const isCorrect = userAns === qc.correctAnswer;

                  return (
                    <div key={qc.id || qIdx} className="bg-[#FFFFFF]/5 border border-[#F9F7F2]/15 p-5 sm:p-6 space-y-3.5">
                      <div className={`flex items-center justify-between text-[#F9F7F2]/60 ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                        <span className="font-serif">السؤال {qIdx + 1}</span>
                        <span className="text-[#C4A484]">مستوى الصعوبة: {qc.level}</span>
                      </div>

                      <p className={`font-semibold text-[#F9F7F2] leading-relaxed font-serif ${subHeadingClass}`}>
                        {qc.question}
                      </p>

                      {qc.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          {qc.options.map((opt, optIdx) => {
                            const isSelected = userAns === opt;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectAnswer(qc.id, opt)}
                                className={`p-3.5 font-medium text-right transition border flex items-center justify-between cursor-pointer ${
                                  isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'
                                } ${
                                  isSelected
                                    ? isCorrect
                                      ? 'bg-[#C4A484] text-[#1D1D1B] border-[#C4A484] font-bold'
                                      : 'bg-[#1D1D1B] text-[#F9F7F2] border-white/60 font-bold'
                                    : 'bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#F9F7F2] border-[#F9F7F2]/20'
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && (
                                  isCorrect ? <Check className="w-4 h-4 text-[#1D1D1B]" /> : <X className="w-4 h-4 text-white" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {isAnswered && (
                        <div className={`p-4 border ${
                          isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'
                        } ${
                          isCorrect ? 'bg-[#FFFFFF]/10 text-[#C4A484] border-[#C4A484]/40' : 'bg-[#FFFFFF]/10 text-white border-white/40'
                        }`}>
                          <div className="font-bold mb-1 font-serif">
                            {isCorrect ? '✨ إجابة صحيحة ومتقنة!' : `❌ إجابة غير دقيقة. الإجابة الصحيحة هي: [${qc.correctAnswer}]`}
                          </div>
                          <p className="opacity-90 leading-relaxed">{qc.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: SOLVED EXAMPLES */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/15 p-4 text-xs text-[#1D1D1B] flex items-center justify-between font-serif">
            <span>💡 تعرض هذه الأمثلة طريقة التفكير المحاسبي خطوة بخطوة مع التعليل المعياري.</span>
            <span className="font-bold border border-[#1D1D1B] bg-[#FFFFFF] px-2 py-0.5">{(lesson.solvedExamples || []).length} أمثلة متدرجة</span>
          </div>

          {(lesson.solvedExamples || []).map((ex, exIdx) => {
            const isRevealed = revealedSteps[ex.id];

            return (
              <div key={ex.id || exIdx} className="bg-[#FFFFFF] border border-[#1D1D1B]/15 rounded-none p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1D1D1B]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-[#1D1D1B] text-[#C4A484] font-bold text-xs flex items-center justify-center font-serif">
                      {exIdx + 1}
                    </span>
                    <h3 className={subHeadingClass}>
                      {ex.title}
                    </h3>
                  </div>
                  <span className={`border border-[#1D1D1B]/30 bg-[#F9F7F2] text-[#1D1D1B] px-3 py-0.5 font-bold ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                    مستوى: {ex.level}
                  </span>
                </div>

                {/* Scenario */}
                <div className="bg-[#F9F7F2] p-4 sm:p-5 border border-[#1D1D1B]/10 space-y-2">
                  <span className={`font-bold text-[#1D1D1B]/60 uppercase tracking-wider block ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>نص المسألة والبيانات المعطاة:</span>
                  <p className={`${bodyTextClass} whitespace-pre-line`}>
                    {ex.scenario}
                  </p>
                </div>

                {/* Required */}
                {ex.required && ex.required.length > 0 && (
                  <div className="bg-[#FFFFFF] border-r-4 border-[#C4A484] p-4 sm:p-5 border-y border-l border-[#1D1D1B]/10">
                    <span className={`font-bold block mb-1.5 font-serif ${subHeadingClass}`}>المطلوب:</span>
                    <ul className={`list-disc list-inside space-y-1 font-medium ${bodyTextClass}`}>
                      {ex.required.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}

                {/* Thinking Method */}
                {ex.thinkingMethod && (
                  <div className={`bg-[#F9F7F2] p-3.5 sm:p-4 border border-[#1D1D1B]/10 ${bodyTextClass}`}>
                    <strong className="text-[#1D1D1B] font-serif">🧠 طريقة التفكير المحاسبي الذكي:</strong> {ex.thinkingMethod}
                  </div>
                )}

                {/* Toggle Reveal Button */}
                <button
                  onClick={() => toggleRevealStep(ex.id)}
                  className={`w-full py-3 bg-[#F9F7F2] hover:bg-[#1D1D1B] hover:text-[#F9F7F2] text-[#1D1D1B] font-bold transition flex items-center justify-center gap-2 border border-[#1D1D1B]/20 cursor-pointer ${isFocusMode ? 'text-sm sm:text-base' : 'text-xs'}`}
                >
                  {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{isRevealed ? 'إخفاء خطوات الحل التفصيلي' : 'إظهار الحل النموذجي خطوة بخطوة'}</span>
                </button>

                {/* Steps Accordion */}
                {isRevealed && (
                  <div className="space-y-3 pt-2 border-t border-[#1D1D1B]/10">
                    <div className="space-y-2.5">
                      {(ex.steps || []).map((step) => (
                        <div key={step.stepNumber} className={`p-4 border border-[#1D1D1B]/10 space-y-2 ${stepCardClass}`}>
                          <div className="flex items-center gap-2 font-bold text-[#1D1D1B] font-serif">
                            <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center text-xs">
                              {step.stepNumber}
                            </span>
                            <span>{step.description}</span>
                          </div>
                          {step.calculation && (
                            <div className={`font-mono bg-[#FFFFFF] p-2.5 border border-[#1D1D1B]/20 text-[#1D1D1B] ${isFocusMode ? 'text-sm sm:text-base' : 'text-xs'}`}>
                              {step.calculation}
                            </div>
                          )}
                          <p className={`text-[#1D1D1B]/70 leading-relaxed font-serif ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>{step.note}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#1D1D1B] text-[#F9F7F2] p-5 space-y-1.5 mt-4 border border-[#1D1D1B]">
                      <div className="text-xs font-bold text-[#C4A484] uppercase tracking-wider">النتيجة النهائية:</div>
                      <div className={`font-extrabold font-serif ${isFocusMode ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base'}`}>{ex.finalResult}</div>
                      {ex.accountingJustification && (
                        <div className={`text-[#F9F7F2]/80 pt-1.5 border-t border-[#F9F7F2]/20 font-serif ${isFocusMode ? 'text-sm sm:text-base' : 'text-xs'}`}>
                          ⚖️ <strong>التعليل المحاسبي:</strong> {ex.accountingJustification}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: CASES & THINK LIKE AN ACCOUNTANT */}
      {activeTab === 'cases' && (
        <div className="space-y-8">
          
          {/* Progressive Skills Ladder (الفهم • التطبيق • التحليل • الحكم) as shown in 9.png */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-amber-600 text-xs font-bold block">بناء المهارات تدريجياً</span>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base font-serif">
                    تدريب متدرج (الفهم • التطبيق • التحليل • الحكم)
                  </h4>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                سلّم بلوم المعرفي المعتمد للثانوية العامة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* 1. الفهم */}
              <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 space-y-2 hover:shadow-xs transition">
                <div className="flex items-center justify-between">
                  <span className="badge-level-understanding px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                    مستوى الفهم
                  </span>
                  <span className="text-[10px] text-sky-700 font-bold font-mono">01. الاستيعاب</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                  اشرح المفهوم المحاسبي بدقة وميّز بين أطراف المعاملة المالية وطبيعة الحسابات المعنية.
                </p>
              </div>

              {/* 2. التطبيق */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2 hover:shadow-xs transition">
                <div className="flex items-center justify-between">
                  <span className="badge-level-application px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                    مستوى التطبيق
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold font-mono">02. الممارسة</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                  صغ قيد اليومية المزدوج بدقة وحدد الطرف المدين والدائن وفق المبدأ المحاسبي الحاكم.
                </p>
              </div>

              {/* 3. التحليل */}
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2 hover:shadow-xs transition">
                <div className="flex items-center justify-between">
                  <span className="badge-level-analysis px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                    مستوى التحليل
                  </span>
                  <span className="text-[10px] text-purple-700 font-bold font-mono">03. الاستنتاج</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                  فسّر أثر القيد على توازن معادلة الميزانية وعلى قائمة الدخل وقائمة المركز المالي للمنشأة.
                </p>
              </div>

              {/* 4. الحكم والتقييم */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2 hover:shadow-xs transition">
                <div className="flex items-center justify-between">
                  <span className="badge-level-judgment px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                    مستوى الحكم
                  </span>
                  <span className="text-[10px] text-rose-700 font-bold font-mono">04. التقييم (JRE)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                  ناقش صحة المعالجة المحاسبية وقدّم حكماً مهنياً مدعوماً بالدليل المعياري وقواعد الحيطة والحذر.
                </p>
              </div>
            </div>
          </div>

          {/* Think Like an Accountant */}
          {lesson.thinkLikeAnAccountantQuestions && lesson.thinkLikeAnAccountantQuestions.length > 0 && (
            <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center gap-3 border-b border-[#1D1D1B]/10 pb-4">
                <div className="p-3 bg-[#1D1D1B] text-[#C4A484]">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={sectionHeadingClass}>
                    🧠 فكر كمحاسب (Think Like an Accountant)
                  </h3>
                  <p className={`text-[#1D1D1B]/60 ${isFocusMode ? 'text-sm' : 'text-xs'}`}>تحليل مالي ومساءلة مهنية رفيعة</p>
                </div>
              </div>

              <div className="space-y-4">
                {lesson.thinkLikeAnAccountantQuestions.map((tla, tlaIdx) => {
                  const isSolRevealed = revealedSolutions[tla.id];

                  return (
                    <div key={tla.id || tlaIdx} className="bg-[#F9F7F2] border border-[#1D1D1B]/15 p-5 sm:p-6 space-y-3.5">
                      <h4 className={`font-bold text-[#1D1D1B] font-serif ${subHeadingClass}`}>{tla.title ? `${tla.title}: ` : ''}{tla.question}</h4>
                      <p className={`bg-[#FFFFFF] p-4 border border-[#1D1D1B]/10 font-serif ${bodyTextClass}`}>
                        <strong>السيناريو الواقعي:</strong> {tla.scenario}
                      </p>

                      {tla.guidingQuestions && tla.guidingQuestions.length > 0 && (
                        <div className={`space-y-1 text-[#1D1D1B] ${isFocusMode ? 'text-sm sm:text-base' : 'text-xs'}`}>
                          <span className="font-bold block font-serif">أسئلة استرشادية للتفكير:</span>
                          <ul className="list-disc list-inside space-y-1 text-[#1D1D1B]/80">
                            {tla.guidingQuestions.map((g, i) => <li key={i}>{g}</li>)}
                          </ul>
                        </div>
                      )}

                      <button
                        onClick={() => toggleRevealSolution(tla.id)}
                        className={`px-4 py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] font-bold transition border border-[#1D1D1B] cursor-pointer ${isFocusMode ? 'text-sm sm:text-base' : 'text-xs'}`}
                      >
                        {isSolRevealed ? 'إخفاء الرأي المهني النموذجي' : 'عرض الرأي المهني النموذجي'}
                      </button>

                      {isSolRevealed && (
                        <div className="bg-[#FFFFFF] p-4 sm:p-5 border border-[#1D1D1B]/20 space-y-2">
                          <strong className={`text-[#1D1D1B] block font-serif ${subHeadingClass}`}>الإجابة والاستنتاج المهني:</strong>
                          <p className={bodyTextClass}>{tla.idealAnswer || tla.expertInsight}</p>
                          {(tla.accountingPrinciple || tla.principle) && (
                            <span className={`text-[#C4A484] block pt-2 border-t border-[#1D1D1B]/10 font-bold ${isFocusMode ? 'text-xs sm:text-sm' : 'text-[11px]'}`}>
                              📌 المبدأ المحاسبي الحاكم: {tla.accountingPrinciple || tla.principle}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Case Study */}
          {lesson.realWorldCase && (
            <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 rounded-none p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center gap-3 border-b border-[#1D1D1B]/10 pb-3">
                <div className="p-2.5 bg-[#1D1D1B] text-[#C4A484]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={sectionHeadingClass}>
                    {lesson.realWorldCase.title}
                  </h3>
                  <p className={`text-[#1D1D1B]/60 ${isFocusMode ? 'text-sm' : 'text-xs'}`}>حالة عملية متكاملة من واقع السوق المصري</p>
                </div>
              </div>

              <div className={`bg-[#F9F7F2] p-4 sm:p-5 whitespace-pre-line border border-[#1D1D1B]/10 font-serif ${bodyTextClass}`}>
                {lesson.realWorldCase.businessContext}
              </div>

              {lesson.realWorldCase.transactions && lesson.realWorldCase.transactions.length > 0 && (
                <div className="space-y-2">
                  <span className={`font-bold text-[#1D1D1B] font-serif ${subHeadingClass}`}>المعاملات المالية التي تمت:</span>
                  <div className="space-y-1.5">
                    {lesson.realWorldCase.transactions.map((t, idx) => (
                      <div key={idx} className={`bg-[#F9F7F2] p-3 flex items-center justify-between border border-[#1D1D1B]/10 ${bodyTextClass}`}>
                        <span className="font-semibold text-[#1D1D1B]">{t.date}: {t.description}</span>
                        {t.amount && <span className="font-mono font-bold text-[#1D1D1B]">{t.amount.toLocaleString()} ج</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Solution */}
              {lesson.realWorldCase.solution && (
                <div className="bg-[#FFFFFF] border-r-4 border-[#C4A484] border-y border-l border-[#1D1D1B]/15 p-4 sm:p-5 space-y-2">
                  <span className={`font-bold text-[#1D1D1B] block font-serif ${subHeadingClass}`}>الحل والتحليل المحاسبي النهائي:</span>
                  <ul className={`list-disc list-inside space-y-1 font-serif ${bodyTextClass}`}>
                    {(lesson.realWorldCase.solution.analysisNotes || []).map((n, i) => (
                      <li key={i} className="leading-relaxed">{n}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* TAB: MISCONCEPTIONS (Master Template) */}
      {activeTab === 'misconceptions' && lesson.misconceptions && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-900 via-red-900 to-rose-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-rose-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>التحصين ضد الأخطاء الشائعة • بنك التصحيح المعتمد</span>
            </div>
            <h3 className={`font-extrabold text-white text-base sm:text-xl font-serif ${sectionHeadingClass}`}>
              فخ الامتحان (مغالطات شائعة وتصحيحها المعتمد)
            </h3>
            <p className={`${bodyTextClass} text-rose-100/90`}>
              تحليل دقيق لأبرز المفاهيم المغلوطة التي تسبب خسارة الدرجات في الامتحانات، مع الصواب المحاسبي المعتمد وسؤال تشخيصي لاختبار الفهم.
            </p>
          </div>

          <div className="space-y-4">
            {lesson.misconceptions.map((m) => (
              <div
                key={m.id}
                className="bg-white border border-rose-200/90 rounded-2xl shadow-xs overflow-hidden"
              >
                {/* Header row with ID and Sub-LO */}
                <div className="bg-rose-50/60 border-b border-rose-100 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-700 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded-md">
                      {m.id}
                    </span>
                    <span className={`font-serif font-bold text-rose-900 ${isFocusMode ? 'text-sm' : 'text-xs'}`}>
                      ⚠️ فخ امتحاني ومفهوم مغلوط
                    </span>
                  </div>
                  {m.subLo && (
                    <span className={`font-mono text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-300 ${isFocusMode ? 'text-sm' : 'text-xs'}`}>
                      🎯 {m.subLo}
                    </span>
                  )}
                </div>

                {/* Error vs Correct Comparison */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* The Common Error */}
                  <div className="bg-rose-50/60 border border-rose-200/90 rounded-xl p-4 sm:p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="badge-trap-error px-2.5 py-0.5 rounded-full text-xs font-bold">
                        خطأ شائع
                      </span>
                      <span className="text-rose-600 text-xs font-bold">✕ احذر</span>
                    </div>
                    <p className={`${bodyTextClass} text-rose-950 font-semibold leading-relaxed font-serif`}>
                      {m.error}
                    </p>
                  </div>

                  {/* The Accounting Correction */}
                  <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-xl p-4 sm:p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="badge-trap-correct px-2.5 py-0.5 rounded-full text-xs font-bold">
                        التصحيح المعتمد
                      </span>
                      <span className="text-emerald-700 text-xs font-bold">✓ الصواب</span>
                    </div>
                    <p className={`${bodyTextClass} font-semibold text-emerald-950 leading-relaxed font-serif`}>
                      {m.correct}
                    </p>
                  </div>
                </div>

                {/* Diagnostic Question Section */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold uppercase tracking-wider">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>السؤال التشخيصي الميداني:</span>
                    </div>
                    <p className={`${bodyTextClass} font-semibold text-slate-800`}>
                      {m.diagnosticQuestion}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleRevealDiagnostic(m.id)}
                    className={`self-start sm:self-center shrink-0 px-4 py-2 font-bold rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-900 hover:text-white transition cursor-pointer shadow-2xs ${isFocusMode ? 'text-sm' : 'text-xs'}`}
                  >
                    {revealedDiagnostic[m.id] ? 'إخفاء التفسير' : 'عرض المعيار المحاسبي'}
                  </button>
                </div>

                {/* Revealed Diagnostic Guidance */}
                {revealedDiagnostic[m.id] && (
                  <div className="bg-slate-900 text-white p-5 sm:p-6 border-t border-slate-800 space-y-2 font-serif leading-relaxed animate-fadeIn">
                    <div className={`text-emerald-400 font-bold flex items-center gap-2 ${subHeadingClass}`}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>طريقة التفكير المحاسبي السليم لحل هذا السؤال:</span>
                    </div>
                    <p className={`${bodyTextClass} text-slate-200`}>
                      {m.correct} احرص دائماً على صياغة الإجابة بالربط المباشر بين المبدأ المحاسبي (مثل الحيطة والحذر أو المقابلة أو الاستحقاق) وأثره على الأرقام الدفترية.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ONE-MINUTE SUMMARY */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="card-lesson-summary p-6 sm:p-8 space-y-2">
            <div className="flex items-center gap-2 text-amber-100 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <span>الكبسولة الذهبية لليلة الامتحان • الصف الثاني الثانوي</span>
            </div>
            <h3 className={`font-extrabold text-white text-base sm:text-xl md:text-2xl font-serif ${sectionHeadingClass}`}>
              ⚡ خلاصة الدرس {lesson.lessonNumber} في جملة حاسمة
            </h3>
            <p className="text-amber-50 text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium">
              «{lesson.subtitle || 'إتقان المحاسبة المالية يقوم على استيعاب الطرف المدين والدائن والأثر الحتمي المتبادل على القوائم المالية.'}»
            </p>
          </div>

          {!lesson.inOneMinuteSummary ? (
            <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-6 text-center text-[#1D1D1B]/70 font-serif">
              <span>خلاصة كبسولة هذا الدرس يتم إعدادها لتغطية المفاهيم المحورية ليلة الامتحان.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Definitions */}
              {lesson.inOneMinuteSummary?.coreDefinitions && lesson.inOneMinuteSummary.coreDefinitions.length > 0 && (
                <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 sm:p-6 space-y-3">
                  <h4 className={`font-bold text-[#1D1D1B] flex items-center gap-2 font-serif ${subHeadingClass}`}>
                    <BookOpen className="w-4 h-4 text-[#C4A484]" />
                    <span>المفاهيم الجوهرية (التعريف الدقيق):</span>
                  </h4>
                  <div className="space-y-2">
                    {lesson.inOneMinuteSummary.coreDefinitions.map((d, i) => (
                      <div key={i} className={`bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 ${bodyTextClass}`}>
                        <strong className="text-[#1D1D1B] block mb-0.5 font-serif">{d.term}:</strong>
                        <span className="text-[#1D1D1B]/70">{d.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Rules */}
              {lesson.inOneMinuteSummary?.coreRules && lesson.inOneMinuteSummary.coreRules.length > 0 && (
                <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 sm:p-6 space-y-3">
                  <h4 className={`font-bold text-[#1D1D1B] flex items-center gap-2 font-serif ${subHeadingClass}`}>
                    <Scale className="w-4 h-4 text-[#C4A484]" />
                    <span>القواعد الحسابية والمحاسبية الحاكمة:</span>
                  </h4>
                  <ul className="space-y-2 text-[#1D1D1B]">
                    {lesson.inOneMinuteSummary.coreRules.map((r, i) => (
                      <li key={i} className={`bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 flex items-start gap-2 ${bodyTextClass}`}>
                        <span className="text-[#C4A484] font-bold">✓</span>
                        <span className="font-serif">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vital Relationships */}
              {lesson.inOneMinuteSummary?.vitalRelationships && lesson.inOneMinuteSummary.vitalRelationships.length > 0 && (
                <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 sm:p-6 space-y-3">
                  <h4 className={`font-bold text-[#1D1D1B] flex items-center gap-2 font-serif ${subHeadingClass}`}>
                    <ArrowRightLeft className="w-4 h-4 text-[#C4A484]" />
                    <span>العلاقات والمعادلات الجوهرية:</span>
                  </h4>
                  <ul className="space-y-2 text-[#1D1D1B]">
                    {lesson.inOneMinuteSummary.vitalRelationships.map((vr, i) => (
                      <li key={i} className={`bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 flex items-start gap-2 ${bodyTextClass}`}>
                        <span className="text-[#C4A484] font-bold">↔</span>
                        <span className="font-serif font-medium">{vr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Traps */}
              {lesson.inOneMinuteSummary?.commonTraps && lesson.inOneMinuteSummary.commonTraps.length > 0 && (
                <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 sm:p-6 space-y-3">
                  <h4 className={`font-bold text-[#1D1D1B] flex items-center gap-2 font-serif ${subHeadingClass}`}>
                    <AlertTriangle className="w-4 h-4 text-[#C4A484]" />
                    <span>احذر من هذه الأفخاخ الشائعة في الامتحانات:</span>
                  </h4>
                  <ul className="space-y-2 text-[#1D1D1B]">
                    {lesson.inOneMinuteSummary.commonTraps.map((t, i) => (
                      <li key={i} className={`bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 flex items-start gap-2 ${bodyTextClass}`}>
                        <span className="text-[#1D1D1B] font-bold">✕</span>
                        <span className="font-serif">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cheatsheet */}
              {lesson.inOneMinuteSummary?.solutionCheatsheet && lesson.inOneMinuteSummary.solutionCheatsheet.length > 0 && (
                <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 sm:p-6 space-y-3">
                  <h4 className={`font-bold text-[#1D1D1B] flex items-center gap-2 font-serif ${subHeadingClass}`}>
                    <Sparkles className="w-4 h-4 text-[#C4A484]" />
                    <span>خريطة الحل السريع:</span>
                  </h4>
                  <div className="space-y-2 text-[#1D1D1B]">
                    {Array.isArray(lesson.inOneMinuteSummary.solutionCheatsheet) ? lesson.inOneMinuteSummary.solutionCheatsheet.map((c, i) => (
                      <div key={i} className={`bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 font-mono text-[#1D1D1B] font-medium ${bodyTextClass}`}>
                        {c}
                      </div>
                    )) : (
                      <div className={`bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 font-mono text-[#1D1D1B] font-medium ${bodyTextClass}`}>
                        {lesson.inOneMinuteSummary.solutionCheatsheet}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* TAB 5: LESSON QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 rounded-none p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1D1D1B]/10 pb-4">
            <div>
              <span className={`border border-[#1D1D1B] bg-[#F9F7F2] text-[#1D1D1B] font-bold px-3 py-1 uppercase tracking-wider ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                التقييم الختامي للدرس
              </span>
              <h3 className={`font-extrabold text-[#1D1D1B] font-serif mt-2 ${sectionHeadingClass}`}>
                {lesson.lessonQuiz.title}
              </h3>
            </div>
            <div className={`flex items-center gap-3 text-[#1D1D1B] bg-[#F9F7F2] px-4 py-2 border border-[#1D1D1B]/15 font-serif ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
              <span>⏱️ {lesson.lessonQuiz.durationMinutes} دقيقة</span>
              <span>•</span>
              <span className="font-bold text-[#1D1D1B]">🏆 {lesson.lessonQuiz.totalMarks} درجة</span>
            </div>
          </div>

          {/* Quiz MCQs */}
          {lesson.lessonQuiz.mcqs && lesson.lessonQuiz.mcqs.length > 0 && (
            <div className="space-y-4">
              <h4 className={`font-bold text-[#1D1D1B] font-serif ${subHeadingClass}`}>أولاً: أسئلة الاختيار من متعدد</h4>
              {lesson.lessonQuiz.mcqs.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isAnswered = userAns !== undefined;
                const targetAnswer = q.correctAnswer !== undefined 
                  ? q.correctAnswer 
                  : (q.options && (q as any).correctIndex !== undefined ? q.options[(q as any).correctIndex] : undefined);
                const isCorrect = userAns === targetAnswer;

                return (
                  <div key={q.id || idx} className="border border-[#1D1D1B]/15 p-4 sm:p-5 space-y-3.5 bg-[#F9F7F2]">
                    <p className={`font-semibold text-[#1D1D1B] font-serif ${subHeadingClass}`}>
                      {idx + 1}. {q.question}
                    </p>
                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`p-3 text-right border transition cursor-pointer ${
                              isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'
                            } ${
                              userAns === opt
                                ? isCorrect
                                  ? 'bg-[#C4A484] text-[#1D1D1B] border-[#C4A484] font-bold'
                                  : 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] font-bold'
                                : 'bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/15'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {isAnswered && (
                      <div className={`text-[#1D1D1B]/80 bg-[#FFFFFF] p-3 border border-[#1D1D1B]/15 font-serif ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                        💡 <strong>التفسير:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* True / False */}
          {lesson.lessonQuiz.trueFalse && lesson.lessonQuiz.trueFalse.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#1D1D1B]/10">
              <h4 className={`font-bold text-[#1D1D1B] font-serif ${subHeadingClass}`}>ثانياً: أسئلة الصواب والخطأ مع التعليل</h4>
              {lesson.lessonQuiz.trueFalse.map((tf, idx) => {
                const userAns = selectedAnswers[tf.id];
                const isAnswered = userAns !== undefined;
                const targetBool = tf.correctAnswer !== undefined ? tf.correctAnswer : (tf as any).isTrue;

                return (
                  <div key={tf.id} className="border border-[#1D1D1B]/15 p-4 sm:p-5 space-y-3.5 bg-[#F9F7F2]">
                    <p className={`font-semibold text-[#1D1D1B] font-serif ${subHeadingClass}`}>
                      {idx + 1}. {tf.question || (tf as any).statement}
                    </p>
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => handleSelectAnswer(tf.id, 'true')}
                        className={`px-4 py-2.5 font-bold border transition cursor-pointer ${
                          isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'
                        } ${
                          userAns === 'true'
                            ? targetBool === true ? 'bg-[#C4A484] text-[#1D1D1B] border-[#C4A484]' : 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                            : 'bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/15'
                        }`}
                      >
                        ✓ عبارة صائبة
                      </button>
                      <button
                        onClick={() => handleSelectAnswer(tf.id, 'false')}
                        className={`px-4 py-2.5 font-bold border transition cursor-pointer ${
                          isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'
                        } ${
                          userAns === 'false'
                            ? targetBool === false ? 'bg-[#C4A484] text-[#1D1D1B] border-[#C4A484]' : 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                            : 'bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/15'
                        }`}
                      >
                        ✕ عبارة خاطئة
                      </button>
                    </div>
                    {isAnswered && (
                      <div className={`text-[#1D1D1B]/80 bg-[#FFFFFF] p-3 border border-[#1D1D1B]/15 font-serif ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                        💡 <strong>التعليل والبيان:</strong> {tf.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Applied & Case Questions */}
          {lesson.lessonQuiz.appliedQuestions && lesson.lessonQuiz.appliedQuestions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#1D1D1B]/10">
              <h4 className={`font-bold text-[#1D1D1B] font-serif ${subHeadingClass}`}>ثالثاً: المسائل التطبيقية وسؤال الإتقان</h4>
              {lesson.lessonQuiz.appliedQuestions.map((app, idx) => {
                const qKey = app.id || `app-${idx}`;
                const isSol = revealedSolutions[qKey];
                const studentAns = appliedAnswers[qKey] || '';
                const wordCount = studentAns.trim().split(/\s+/).filter(Boolean).length;

                return (
                  <div key={idx} className="border border-[#1D1D1B]/15 p-4 sm:p-5 space-y-3.5 bg-[#F9F7F2]">
                    <div className={`flex items-center justify-between text-[#1D1D1B]/60 ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                      <span className="font-bold text-[#1D1D1B] font-serif">مسألة تطبيقية ({app.markAllocation} درجات)</span>
                    </div>
                    <p className={`font-medium whitespace-pre-line font-serif ${bodyTextClass}`}>{app.prompt}</p>
                    
                    {/* Interactive Answer Workspace */}
                    <div className="space-y-2 pt-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2.5 border border-[#1D1D1B]/15 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[#1D1D1B]">
                          <PenTool className="w-3.5 h-3.5 text-[#8A1F1D]" />
                          <span>مساحة الحل وصياغة القيود المحاسبية</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[#1D1D1B]/80 font-bold">
                          <span>{wordCount} كلمة</span>
                          <span>•</span>
                          <span>{studentAns.length} حرف</span>
                        </div>
                      </div>

                      <textarea
                        rows={8}
                        value={studentAns}
                        onChange={e => setAppliedAnswers(prev => ({ ...prev, [qKey]: e.target.value }))}
                        placeholder="اكتب خطوات الحل، العمليات الحسابية، وقيود اليومية بالتفصيل قبل التحقق من نموذج الحل..."
                        className={`w-full p-4 bg-white border-2 border-[#1D1D1B]/25 focus:border-[#8A1F1D] focus:outline-hidden leading-relaxed font-serif min-h-[160px] resize-y shadow-inner ${bodyTextClass}`}
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => toggleRevealSolution(qKey)}
                        className={`px-4 py-2 bg-[#FFFFFF] hover:bg-[#1D1D1B] hover:text-[#F9F7F2] text-[#1D1D1B] font-bold transition border border-[#1D1D1B]/20 cursor-pointer ${isFocusMode ? 'text-xs sm:text-sm' : 'text-xs'}`}
                      >
                        {isSol ? 'إخفاء الإجابة النموذجية' : 'عرض الإجابة النموذجية وتوزيع الدرجات'}
                      </button>

                      {studentAns.trim().length > 0 && !isSol && (
                        <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>تم تسجيل مسوّدتك، اضغط لعرض النموذج والمقارنة الذاتية</span>
                        </span>
                      )}
                    </div>

                    {isSol && (
                      <div className="space-y-2">
                        {studentAns.trim().length > 0 && (
                          <div className="bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-900 font-serif flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span>قارن بين حلك المسجل أعلاه وبين نموذج الإجابة وتوزيع الدرجات المعتمد أدناه:</span>
                          </div>
                        )}
                        <div className={`bg-[#FFFFFF] p-4 border border-[#1D1D1B]/20 text-[#1D1D1B] whitespace-pre-line leading-relaxed font-mono ${bodyTextClass}`}>
                          {app.modelAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* Bottom Lesson Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1D1D1B]/15">
        <button
          onClick={handlePrevLesson}
          disabled={currentLessonIndex === 0}
          className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs sm:text-sm font-bold text-[#1D1D1B] disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الدرس السابق</span>
        </button>

        <span className="text-xs text-[#1D1D1B]/70 font-serif">
          الدرس {lesson.lessonNumber} ({lesson.unitId === 'unit-10' ? 'الوحدة العاشرة' : lesson.unitId === 'unit-9' ? 'الوحدة التاسعة' : lesson.unitId === 'unit-8' ? 'الوحدة الثامنة' : lesson.unitId === 'unit-7' ? 'الوحدة السابعة' : lesson.unitId === 'unit-6' ? 'الوحدة السادسة' : lesson.unitId === 'unit-5' ? 'الوحدة الخامسة' : lesson.unitId === 'unit-4' ? 'الوحدة الرابعة' : lesson.unitId === 'unit-3' ? 'الوحدة الثالثة' : lesson.unitId === 'unit-2' ? 'الوحدة الثانية' : 'الوحدة الأولى'}) • الدرس {currentLessonIndex + 1} من {allLessons.length}
        </span>

        <button
          onClick={handleNextLesson}
          disabled={currentLessonIndex === allLessons.length - 1}
          className="px-4 py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 border border-[#1D1D1B]"
        >
          <span>الدرس التالي</span>
          <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
        </button>
      </div>

      {/* Print to PDF Modal */}
      <PrintToPdfModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        defaultUnitId={lesson.unitId}
        defaultLessonId={lesson.id}
      />

      {/* Mind Map Modal Overlay (فتح خريطة الدرس عند الحاجة) */}
      {isMindMapOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1D1D1B]/80 backdrop-blur-xs font-serif animate-in fade-in duration-200"
          onClick={() => setIsMindMapOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lesson-mindmap-dialog-title"
        >
          <div 
            className="bg-[#F9F7F2] border-2 border-[#1D1D1B] w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1D1D1B] text-[#F9F7F2] p-4 flex items-center justify-between border-b border-[#C4A484]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-bold">
                  <Network className="w-4 h-4 text-[#1D1D1B]" />
                </div>
                <div>
                  <h3 id="lesson-mindmap-dialog-title" className="font-extrabold text-sm sm:text-base">
                    خريطة الدرس الذهنية: {lesson.title}
                  </h3>
                  <p className="text-xs text-[#F9F7F2]/70">
                    خريطة العلاقات والمفاهيم والقواعد الجوهرية للدرس (انقر على أي عقدة للانتقال)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMindMapOpen(false)}
                className="px-3 py-1.5 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/25 text-[#F9F7F2] border border-[#F9F7F2]/20 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              >
                <X className="w-4 h-4" />
                <span>إغلاق (Esc)</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <MindMapView
                lessonId={lesson.id}
                onOpenSection={(sectionId) => {
                  setIsMindMapOpen(false);
                  openSectionFromMap(sectionId);
                }}
                onOpenQuestions={() => {
                  setIsMindMapOpen(false);
                  setActiveTab('quiz');
                }}
                showHeader={true}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
