import React from 'react';
import { 
  BookOpen, 
  BookMarked,
  FileCheck2, 
  HelpCircle, 
  Scale, 
  BookA, 
  Bot, 
  Sparkles, 
  Award,
  GraduationCap,
  Maximize2,
  Minimize2,
  Tv,
  ZoomIn,
  Library,
  ShieldCheck
} from 'lucide-react';
import { PresentationScale } from './PresentationToolbar';
import { getUnitAssessmentData, getTotalAssessmentQuestionsCount } from '../data/unitAssessments/registry';
import { UserNavBadge } from './UserNavBadge';
import { useUser } from '../context/UserContext';

interface NavbarProps {
  activeTab: 'book' | 'textbook_questions' | 'assessments' | 'question_bank' | 'jre_lab' | 'glossary' | 'library' | 'my_progress' | 'governance';
  setActiveTab: (tab: 'book' | 'textbook_questions' | 'assessments' | 'question_bank' | 'jre_lab' | 'glossary' | 'library' | 'my_progress' | 'governance') => void;
  selectedUnitNumber: number;
  setSelectedUnitNumber: (num: number) => void;
  onOpenAiModal: () => void;
  onOpenPrivacyModal?: () => void;
  completedQuestionsCount: number;
  isAutoFillPage: boolean;
  onToggleAutoFillPage: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  presentationScale: PresentationScale;
  onChangeScale: (scale: PresentationScale) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedUnitNumber,
  setSelectedUnitNumber,
  onOpenAiModal,
  onOpenPrivacyModal,
  completedQuestionsCount,
  isAutoFillPage,
  onToggleAutoFillPage,
  isFullscreen,
  onToggleFullscreen,
  presentationScale,
  onChangeScale
}) => {
  const { unitLocks, user, isUnitAccessible } = useUser();
  const currentUnitAssessments = getUnitAssessmentData(selectedUnitNumber);
  const assessmentBadgeCount = currentUnitAssessments 
    ? currentUnitAssessments.stats.grandTotalQuestions 
    : getTotalAssessmentQuestionsCount();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          isAutoFillPage ? 'w-full px-2 sm:px-4' : 'max-w-7xl'
        }`}>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30 text-[11px]">
              البكالوريا المصرية 2027
            </span>
            <span className="hidden sm:inline text-slate-300">
              مبني على المصادر الوزارية المتاحة (كتاب الطالب وكراسات الأداءات والتقييمات 2026/2027)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            {onOpenPrivacyModal && (
              <button
                onClick={onOpenPrivacyModal}
                className="text-[11px] text-amber-300 hover:text-white underline cursor-pointer flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>سياسة الخصوصية والحوكمة</span>
              </button>
            )}
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>الأسئلة المنجزة: <strong className="text-amber-400">{completedQuestionsCount}</strong></span>
            </div>
            <span className="hidden md:inline bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-medium border border-emerald-400/20">
              حوكمة المحتوى مفعلة V2
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className={`mx-auto px-4 sm:px-6 transition-all duration-300 ${
        isAutoFillPage ? 'w-full' : 'max-w-7xl'
      }`}>
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-['Cairo']">
                  رواد الأعمال
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                  كتاب متمرس
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                إدارة الأعمال • الصف الثاني الثانوي
              </p>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'book'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm ring-2 ring-amber-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>الشرح</span>
            </button>

            <button
              onClick={() => setActiveTab('textbook_questions')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'textbook_questions'
                  ? 'bg-amber-600 text-white font-black shadow-sm ring-2 ring-amber-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookMarked className="w-4 h-4 shrink-0 text-amber-500" />
              <span>أسئلة كتاب المدرسة</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                activeTab === 'textbook_questions' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
              }`}>
                65
              </span>
            </button>

            <button
              onClick={() => setActiveTab('assessments')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'assessments'
                  ? 'bg-blue-600 text-white font-black shadow-sm ring-2 ring-blue-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4 shrink-0" />
              <span>الأداءات والتقييمات</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'assessments' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700 font-mono font-black'
              }`}>
                {assessmentBadgeCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('question_bank')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'question_bank'
                  ? 'bg-emerald-600 text-white font-black shadow-sm ring-2 ring-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>بنك الأسئلة</span>
            </button>

            <button
              onClick={() => setActiveTab('jre_lab')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'jre_lab'
                  ? 'bg-purple-600 text-white font-black shadow-sm ring-2 ring-purple-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span>مختبر JRE</span>
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'glossary'
                  ? 'bg-rose-600 text-white font-black shadow-sm ring-2 ring-rose-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookA className="w-4 h-4 shrink-0" />
              <span>قاموس المصطلحات</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'library'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-black shadow-md ring-2 ring-amber-400'
                  : 'text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80'
              }`}
            >
              <Library className="w-4 h-4 shrink-0 text-amber-600" />
              <span>المكتبة الشاملة</span>
            </button>

            <button
              onClick={() => setActiveTab('my_progress')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'my_progress'
                  ? 'bg-indigo-600 text-white font-black shadow-sm ring-2 ring-indigo-400'
                  : 'text-indigo-900 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/80'
              }`}
            >
              <GraduationCap className="w-4 h-4 shrink-0 text-indigo-600" />
              <span>مستواي (LMS)</span>
            </button>

            <button
              onClick={() => setActiveTab('governance')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'governance'
                  ? 'bg-slate-900 text-white font-black shadow-sm ring-2 ring-slate-700'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>حوكمة المحتوى</span>
            </button>
          </nav>

          {/* Actions: Unit Switcher & AI Tutor Button */}
          <div className="flex items-center gap-2">
            {/* Display Screen Auto-Fill Page Toggle */}
            <button
              onClick={onToggleAutoFillPage}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-2xs ${
                isAutoFillPage
                  ? 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100 ring-1 ring-amber-400/50'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isAutoFillPage ? 'إلغاء ملء العرض التلقائي (العودة للعرض المحصور)' : 'تفعيل الملء التلقائي لكامل عرض الشاشة'}
            >
              {isAutoFillPage ? (
                <Minimize2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              )}
              <span className="hidden lg:inline">
                {isAutoFillPage ? 'ملء تلقائي مفعّل' : 'ملء تلقائي للصفحة'}
              </span>
              <span className="lg:hidden text-[11px]">
                {isAutoFillPage ? 'ملء العرض' : 'توسيع'}
              </span>
            </button>

            {/* Interactive Screen Fullscreen Mode */}
            <button
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all text-xs flex items-center gap-1 shadow-2xs"
              title={isFullscreen ? 'الخروج من وضع ملء الشاشة' : 'شاشة العرض الكاملة (للسبورة الذكية والعرض بالفصل)'}
            >
              <Tv className="w-4 h-4 text-slate-700" />
              <span className="hidden xl:inline text-[11px] font-bold">شاشة العرض</span>
            </button>

            {/* Quick Presentation Font Scale Selector */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-[11px] font-bold shadow-2xs">
              <button
                onClick={() => onChangeScale('normal')}
                className={`px-2 py-1 rounded-md transition-all ${
                  presentationScale === 'normal'
                    ? 'bg-white text-slate-900 shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="خط عادي (100%)"
              >
                عادي
              </button>
              <button
                onClick={() => onChangeScale('large')}
                className={`px-2 py-1 rounded-md transition-all ${
                  presentationScale === 'large'
                    ? 'bg-white text-amber-950 shadow-2xs font-black ring-1 ring-amber-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="شاشة عرض واضحة (120%)"
              >
                شاشة عرض
              </button>
              <button
                onClick={() => onChangeScale('xlarge')}
                className={`px-2 py-1 rounded-md transition-all ${
                  presentationScale === 'xlarge'
                    ? 'bg-white text-amber-950 shadow-2xs font-black ring-1 ring-amber-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="قاعة كبيرة (140%)"
              >
                قاعة كبيرة
              </button>
            </div>

            {/* Quick Unit Selector */}
            <div className="relative">
              <select
                value={selectedUnitNumber}
                onChange={(e) => setSelectedUnitNumber(Number(e.target.value))}
                className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer"
                title="اختر الوحدة"
              >
                <optgroup label="الجزء الأول (الترم الأول)">
                  <option value={1}>الوحدة 1: مدخل إلى الأعمال وغايتها {!isUnitAccessible(1).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={2}>الوحدة 2: أنواع منظمات الأعمال {!isUnitAccessible(2).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={3}>الوحدة 3: أهداف المنظمات وأصحاب المصلحة {!isUnitAccessible(3).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={4}>الوحدة 4: البيئة الداخلية والخارجية {!isUnitAccessible(4).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={5}>الوحدة 5: الإدارة والقيادة {!isUnitAccessible(5).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                </optgroup>
                <optgroup label="الجزء الثاني (الترم الثاني)">
                  <option value={6}>الوحدة 6: التسويق {!isUnitAccessible(6).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={7}>الوحدة 7: إدارة العمليات والإنتاج {!isUnitAccessible(7).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={8}>الوحدة 8: إدارة الموارد البشرية {!isUnitAccessible(8).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={9}>الوحدة 9: التمويل وأداء الأعمال {!isUnitAccessible(9).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                  <option value={10}>الوحدة 10: الاستراتيجية وصنع القرار {!isUnitAccessible(10).isAccessible ? '🔒 (محجوبة)' : ''}</option>
                </optgroup>
              </select>
            </div>

            {/* World-Class User Nav Badge */}
            <UserNavBadge />

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm transition-all transform active:scale-95"
            >
              <Bot className="w-4 h-4 text-amber-200" />
              <span className="hidden sm:inline">مستشار رواد الأعمال الذكي</span>
              <span className="sm:hidden">المستشار</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-100 no-scrollbar items-center">
          <button
            onClick={() => setActiveTab('book')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'book' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>الشرح</span>
          </button>
          <button
            onClick={() => setActiveTab('textbook_questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'textbook_questions' ? 'bg-amber-600 text-white font-black shadow-xs' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>أسئلة الكتاب</span>
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'assessments' ? 'bg-blue-600 text-white font-black shadow-xs' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>الأداءات والتقييمات</span>
            <span className="bg-white/20 text-white text-[9px] px-1 rounded-full font-mono font-black">
              {assessmentBadgeCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('question_bank')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'question_bank' ? 'bg-emerald-600 text-white font-black shadow-xs' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>بنك الأسئلة</span>
          </button>
          <button
            onClick={() => setActiveTab('jre_lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'jre_lab' ? 'bg-purple-600 text-white font-black shadow-xs' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>مختبر JRE</span>
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'glossary' ? 'bg-rose-600 text-white font-black shadow-xs' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <BookA className="w-3.5 h-3.5" />
            <span>المصطلحات</span>
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'library' ? 'bg-amber-600 text-white font-black shadow-xs' : 'text-amber-900 bg-amber-50 border border-amber-200'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>المكتبة</span>
          </button>
          <button
            onClick={() => setActiveTab('my_progress')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'my_progress' ? 'bg-indigo-600 text-white font-black shadow-xs' : 'text-indigo-900 bg-indigo-50 border border-indigo-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>مستواي</span>
          </button>
          <button
            onClick={() => setActiveTab('governance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'governance' ? 'bg-slate-900 text-white font-black shadow-xs' : 'text-slate-700 bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>الحوكمة</span>
          </button>
        </div>

      </div>
    </header>
  );
};
