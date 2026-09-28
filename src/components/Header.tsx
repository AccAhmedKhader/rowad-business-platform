import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Award, CheckCircle, Printer, FileText, Sparkles, 
  Scale, PenTool, Brain, Users, Database, Shield, LogIn, LogOut, 
  User as UserIcon, BookA, Menu, Home, MoreHorizontal, ChevronDown, Filter, Layers,
  Bookmark, Building2, Library, Palette
} from 'lucide-react';
import { PlatformRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

export type PrimaryNavTab = 'home' | 'curriculum' | 'training' | 'assessment' | 'library' | 'mypath';
export type ActiveTab = 'cover' | 'welcome' | 'map' | 'lessons' | 'simulator' | 'jre_workshop' | 'review' | 'qbank' | 'exams' | 'print' | 'library' | PrimaryNavTab;

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSidebar: () => void;
  onOpenAnalysisReport: (unitId?: 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5' | 'unit-6' | 'unit-7' | 'unit-8' | 'unit-9' | 'unit-10') => void;
  onOpenStudentDashboard: () => void;
  onOpenTeacherDashboard: () => void;
  onOpenContentAnalytics: () => void;
  onOpenGlossary?: () => void;
  onOpenBooksModal?: () => void;
  completedExercisesCount: number;
  totalExercisesCount: number;
  currentRole: PlatformRole;
  setCurrentRole: (role: PlatformRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSidebar,
  onOpenAnalysisReport,
  onOpenStudentDashboard,
  onOpenTeacherDashboard,
  onOpenContentAnalytics,
  onOpenGlossary,
  onOpenBooksModal,
  completedExercisesCount,
  totalExercisesCount,
  currentRole,
  setCurrentRole
}) => {
  const { user, isAuthenticated, logout, setIsAuthModalOpen } = useAuth();
  const { isFilterActive, isSidebarCollapsed, toggleSidebarCollapse, openMobileDrawer } = useCurriculumFilter();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const progressPercent = Math.min(100, Math.round((completedExercisesCount / (totalExercisesCount || 1)) * 100));

  // Determine active state for the 5 Primary Navigation elements
  const isHomeActive = activeTab === 'cover' || activeTab === 'home';
  const isCurriculumActive = ['welcome', 'map', 'lessons', 'curriculum'].includes(activeTab);
  const isTrainingActive = ['simulator', 'jre_workshop', 'training'].includes(activeTab);
  const isAssessmentActive = ['review', 'qbank', 'exams', 'assessment'].includes(activeTab);
  const isLibraryActive = activeTab === 'library';
  const isMyPathActive = activeTab === 'mypath';

  return (
    <header className="no-print sticky top-0 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1D1D1B]/15 shadow-xs font-serif">
      {/* Top Editorial Masthead Banner */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] px-4 py-2 text-xs font-medium flex flex-wrap items-center justify-between gap-2 border-b border-[#1D1D1B]">
        <div className="flex items-center gap-2">
          <span className="bg-[#C4A484] text-[#1D1D1B] font-bold px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
            البكالوريا المصرية EB v2.0
          </span>
          <span className="hidden sm:inline text-[#F9F7F2]/80 text-xs">
            الكتاب الخارجي والمنصة التفاعلية المعتمدة — المحاسبة المالية (10 وحدات معتمدة)
          </span>
        </div>

        {/* Auth State & Hub Modals */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 bg-[#FFFFFF]/10 border border-[#F9F7F2]/20 px-2.5 py-0.5 text-[11px]">
              <UserIcon className="w-3 h-3 text-[#C4A484]" />
              <span className="font-bold text-[#F9F7F2]">{user.full_name}</span>
              <span className="bg-[#C4A484] text-[#1D1D1B] text-[9px] font-bold px-1.5 py-0.2">
                {user.role}
              </span>
              <button
                onClick={logout}
                title="تسجيل الخروج"
                className="text-[#F9F7F2]/60 hover:text-rose-300 mr-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 bg-[#C4A484] hover:bg-[#b89574] text-[#1D1D1B] font-bold px-2.5 py-0.5 text-[11px] transition cursor-pointer"
            >
              <LogIn className="w-3 h-3" />
              <span>تسجيل الدخول / حساب طالب</span>
            </button>
          )}

          {/* Theme Switcher in Masthead */}
          <ThemeSwitcher variant="badge" />

          {/* Quick Hub Triggers */}
          {onOpenBooksModal && (
            <button
              onClick={onOpenBooksModal}
              className="flex items-center gap-1 bg-[#C4A484] hover:bg-[#b89574] text-[#1D1D1B] px-2.5 py-1 transition text-xs cursor-pointer font-bold shadow-xs"
              title="كتب المنصة والمطبوعات المعتمدة (الأداءات والتقييمات، الشرح، المعجم، بنك الأسئلة)"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>كتب المنصة</span>
            </button>
          )}

          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1 bg-[#C4A484]/20 hover:bg-[#C4A484]/30 border border-[#C4A484]/40 px-2 py-1 transition text-[#E8DCC4] text-xs cursor-pointer font-bold"
              title="قاموس المصطلحات والمبادئ المحاسبية"
            >
              <BookA className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>قاموس المصطلحات</span>
            </button>
          )}

          <button
            onClick={onOpenStudentDashboard}
            className="flex items-center gap-1 bg-[#F9F7F2]/10 hover:bg-[#F9F7F2]/20 border border-[#F9F7F2]/20 px-2 py-1 transition text-[#F9F7F2] text-xs cursor-pointer"
            title="لوحة إتقان الطالب والمسار التكيفي"
          >
            <Brain className="w-3.5 h-3.5 text-[#C4A484]" />
            <span className="hidden md:inline">لوحة الإتقان التكيفي</span>
          </button>

          {(currentRole === 'TEACHER' || currentRole === 'ADMIN') && (
            <button
              onClick={onOpenTeacherDashboard}
              className="flex items-center gap-1 bg-[#F9F7F2]/10 hover:bg-[#F9F7F2]/20 border border-[#F9F7F2]/20 px-2 py-1 transition text-[#F9F7F2] text-xs cursor-pointer"
              title="تحليلات المعلم والأداء الصفي"
            >
              <Users className="w-3.5 h-3.5 text-[#C4A484]" />
              <span className="hidden md:inline">لوحة المعلم</span>
            </button>
          )}

          {(currentRole === 'CONTENT_MANAGER' || currentRole === 'ADMIN') && (
            <button
              onClick={onOpenContentAnalytics}
              className="flex items-center gap-1 bg-[#F9F7F2]/10 hover:bg-[#F9F7F2]/20 border border-[#F9F7F2]/20 px-2 py-1 transition text-[#F9F7F2] text-xs cursor-pointer"
              title="إحصائيات بنك الأسئلة ومعايرة الصعوبة"
            >
              <Database className="w-3.5 h-3.5 text-[#C4A484]" />
              <span className="hidden md:inline">جودة المحتوى</span>
            </button>
          )}

          <button
            onClick={() => onOpenAnalysisReport()}
            className="flex items-center gap-1 bg-[#F9F7F2]/10 hover:bg-[#F9F7F2]/20 border border-[#F9F7F2]/20 px-2 py-1 transition text-[#F9F7F2] text-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#C4A484]" />
            <span className="hidden sm:inline">المطابقة (100%)</span>
          </button>

          <button
            onClick={() => setActiveTab('print')}
            className="flex items-center gap-1 bg-[#C4A484] hover:bg-[#b89574] text-[#1D1D1B] font-bold px-2.5 py-1 transition text-xs shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>تصدير وطباعة (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center shadow-xs border border-[#1D1D1B]/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl text-[#1D1D1B] tracking-tight">
                المحاسبة ببساطة وإتقان
              </h1>
              <span className="border border-[#1D1D1B] text-[#1D1D1B] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                الوحدات 1 إلى 10
              </span>
            </div>
            <p className="text-xs text-[#1D1D1B]/70 font-medium">
              منهاج المحاسبة المالية المعتمد (10 وحدات و 58 درساً) • محاكي الحسابات • ورشة JRE • بنك الأسئلة والتحقيق المالي
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="hidden lg:flex items-center gap-3 bg-[#FFFFFF] px-3.5 py-1.5 border border-[#1D1D1B]/15 shadow-xs">
          <Award className="w-4 h-4 text-[#C4A484]" />
          <div className="text-right">
            <div className="text-[11px] font-bold text-[#1D1D1B]/80">إتقان تدريبات الوحدة</div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 overflow-hidden">
                <div 
                  className="h-full bg-[#1D1D1B] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-[#1D1D1B] font-mono">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Exactly 5 Primary Items + Isolated More Menu */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {/* Units & Lessons Sidebar Toggle Button */}
          <button
            id="nav-primary-units-sidebar"
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                openMobileDrawer();
              } else {
                toggleSidebarCollapse();
              }
            }}
            title={isSidebarCollapsed ? "فرد قائمة الوحدات والدروس الجانبية (Ctrl+B)" : "طي قائمة الوحدات والدروس (Ctrl+B)"}
            className="px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer border border-[#1D1D1B] bg-[#1D1D1B] text-[#F9F7F2] hover:bg-[#333333] shadow-xs group"
          >
            <Layers className="w-3.5 h-3.5 text-[#C4A484] group-hover:scale-110 transition-transform" />
            <span>الوحدات والدروس</span>
            <span className="text-[10px] text-[#C4A484] font-mono hidden md:inline">
              {isSidebarCollapsed ? 'فرد' : 'طي'}
            </span>
          </button>

          <nav 
            aria-label="التنقل الرئيسي" 
            className="flex items-center gap-1.5"
          >
            <button
              id="nav-primary-home"
              onClick={() => setActiveTab('home')}
              aria-current={isHomeActive ? 'page' : undefined}
              className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isHomeActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                  : 'text-[#1D1D1B]/70 hover:bg-[#1D1D1B]/5 hover:text-[#1D1D1B]'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>الرئيسية</span>
            </button>

            <button
              id="nav-primary-curriculum"
              onClick={() => setActiveTab('curriculum')}
              aria-current={isCurriculumActive ? 'page' : undefined}
              className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isCurriculumActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                  : 'text-[#1D1D1B]/70 hover:bg-[#1D1D1B]/5 hover:text-[#1D1D1B]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>المنهج</span>
            </button>

            <button
              id="nav-primary-training"
              onClick={() => setActiveTab('training')}
              aria-current={isTrainingActive ? 'page' : undefined}
              className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isTrainingActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                  : 'text-[#1D1D1B]/70 hover:bg-[#1D1D1B]/5 hover:text-[#1D1D1B]'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>التدريب</span>
            </button>

            <button
              id="nav-primary-assessment"
              onClick={() => setActiveTab('assessment')}
              aria-current={isAssessmentActive ? 'page' : undefined}
              className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isAssessmentActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                  : 'text-[#1D1D1B]/70 hover:bg-[#1D1D1B]/5 hover:text-[#1D1D1B]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>التقييم</span>
            </button>

            <button
              id="nav-primary-mypath"
              onClick={() => setActiveTab('mypath')}
              aria-current={isMyPathActive ? 'page' : undefined}
              className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isMyPathActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                  : 'text-[#1D1D1B]/70 hover:bg-[#1D1D1B]/5 hover:text-[#1D1D1B]'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>مساري</span>
            </button>
          </nav>

          {/* Fast Theme Switcher */}
          <ThemeSwitcher variant="compact" />

          {/* More / Utility Menu (Section 9) - clearly separated from the 5 Primary items */}
          <div className="relative inline-block text-right">
            <button
              id="nav-utility-more"
              aria-label="المزيد والمرافق"
              aria-expanded={isMoreMenuOpen}
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="px-2.5 py-1.5 text-xs font-bold transition flex items-center gap-1 whitespace-nowrap cursor-pointer bg-[#F9F7F2] text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-[#C4A484]/20"
            >
              <MoreHorizontal className="w-3.5 h-3.5 text-[#1D1D1B]" />
              <span>المزيد</span>
              <ChevronDown className="w-3 h-3 text-[#1D1D1B]/60" />
            </button>

            {isMoreMenuOpen && (
              <div 
                className="absolute left-0 mt-1 w-56 bg-white border-2 border-[#1D1D1B] shadow-xl py-1 z-50 font-serif"
                role="menu"
                aria-orientation="vertical"
              >
                <button
                  onClick={() => { setIsMoreMenuOpen(false); toggleTheme(); }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-blue-800 bg-blue-50/70 hover:bg-blue-100/70 flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <Palette className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-extrabold">تبديل الثيم (عصري / كلاسيكي / ليلي)</span>
                </button>

                <button
                  onClick={() => { setIsMoreMenuOpen(false); onOpenSidebar(); }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] hover:bg-[#F9F7F2] flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <Menu className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>فهرس الوحدات والمحتوى</span>
                </button>

                <button
                  onClick={() => { setIsMoreMenuOpen(false); navigate('/business'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#0C1E36] bg-[#C4A484]/15 hover:bg-[#C4A484]/30 flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#0C1E36]" />
                  <span className="font-extrabold">إدارة الأعمال ببساطة وإتقان</span>
                </button>

                <button
                  onClick={() => { setIsMoreMenuOpen(false); setActiveTab('library'); }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] hover:bg-[#F9F7F2] flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <Library className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>المكتبة التعليمية ومصادر التعلم</span>
                </button>

                {onOpenBooksModal && (
                  <button
                    onClick={() => { setIsMoreMenuOpen(false); onOpenBooksModal(); }}
                    className="w-full text-right px-3 py-2 text-xs font-bold text-[#0C1E36] bg-[#C5A059]/15 hover:bg-[#C5A059]/30 flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                    role="menuitem"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0C1E36]" />
                    <span className="font-extrabold">كتب المنصة والمطبوعات المعتمدة</span>
                  </button>
                )}

                <button
                  onClick={() => { 
                    setIsMoreMenuOpen(false); 
                    navigate('/print?edition=assessments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 hover:bg-[#8A1F1D]/20 flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <FileText className="w-3.5 h-3.5 text-[#8A1F1D]" />
                  <span className="font-extrabold">كتاب الأداءات والتقييمات المدرسية (ص ۳-۸٤)</span>
                </button>

                {onOpenGlossary && (
                  <button
                    onClick={() => { setIsMoreMenuOpen(false); onOpenGlossary(); }}
                    className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] hover:bg-[#F9F7F2] flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                    role="menuitem"
                  >
                    <BookA className="w-3.5 h-3.5 text-[#C4A484]" />
                    <span>قاموس المصطلحات والمبادئ</span>
                  </button>
                )}

                <button
                  onClick={() => { 
                    setIsMoreMenuOpen(false); 
                    navigate('/training/capstone');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#8A1F1D] bg-[#8A1F1D]/5 hover:bg-[#8A1F1D]/15 flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#8A1F1D]" />
                  <span className="font-extrabold">مشروع التخرج وملف الإنجاز (Capstone)</span>
                </button>

                <button
                  onClick={() => { 
                    setIsMoreMenuOpen(false); 
                    navigate('/print?edition=glossary');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] bg-[#C4A484]/10 hover:bg-[#C4A484]/25 flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>كتيب المصطلحات الورقي المعتمد (A4 فاخر)</span>
                </button>

                <button
                  onClick={() => { setIsMoreMenuOpen(false); setActiveTab('print'); }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] hover:bg-[#F9F7F2] flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>تصدير وطباعة (PDF)</span>
                </button>

                <button
                  onClick={() => { setIsMoreMenuOpen(false); onOpenAnalysisReport(); }}
                  className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] hover:bg-[#F9F7F2] flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                  role="menuitem"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>تقارير المطابقة والمنهجية</span>
                </button>

                {(currentRole === 'TEACHER' || currentRole === 'ADMIN') && (
                  <button
                    onClick={() => { setIsMoreMenuOpen(false); onOpenTeacherDashboard(); }}
                    className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] hover:bg-[#F9F7F2] flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                    role="menuitem"
                  >
                    <Users className="w-3.5 h-3.5 text-[#C4A484]" />
                    <span>لوحة تحكم المعلم</span>
                  </button>
                )}

                {(currentRole === 'CONTENT_MANAGER' || currentRole === 'ADMIN') && (
                  <button
                    onClick={() => { setIsMoreMenuOpen(false); onOpenContentAnalytics(); }}
                    className="w-full text-right px-3 py-2 text-xs font-bold text-[#1D1D1B] hover:bg-[#F9F7F2] flex items-center gap-2 cursor-pointer border-b border-[#1D1D1B]/10"
                    role="menuitem"
                  >
                    <Database className="w-3.5 h-3.5 text-[#C4A484]" />
                    <span>تحليلات جودة المحتوى</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

