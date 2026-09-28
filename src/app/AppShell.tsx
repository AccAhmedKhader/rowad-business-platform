import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header, ActiveTab } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { MobileNavigation } from '../components/MobileNavigation';
import { MethodologyReportModal } from '../components/MethodologyReportModal';
import { StudentDashboardModal } from '../components/StudentDashboardModal';
import { TeacherDashboardModal } from '../components/TeacherDashboardModal';
import { ContentAnalyticsModal } from '../components/ContentAnalyticsModal';
import { AccountingGlossaryModal } from '../components/AccountingGlossaryModal';
import { PlatformBooksModal } from '../components/PlatformBooksModal';
import { AuthModal } from '../components/AuthModal';
import { ThanaweyaStudentBar } from '../components/ThanaweyaStudentBar';
import { useAuth } from '../context/AuthContext';
import { PlatformRole } from '../types';
import { pathToLegacyTab, LEGACY_TAB_TO_PATH } from '../routing/legacyNavigationAdapter';
import { apiClient } from '../api/apiClient';
import { useFocusMode } from '../context/FocusModeContext';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';
import { SupportedAnalysisUnitId } from '../data/masterCurriculumAnalysis';
import { PanelRight } from 'lucide-react';

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isFocusMode, setIsFocusMode, toggleFocusMode, fontSize, increaseFontSize, decreaseFontSize } = useFocusMode();

  // Derive active tab from current URL
  const activeTab: ActiveTab = pathToLegacyTab(location.pathname);

  const setActiveTab = (tab: ActiveTab) => {
    const targetPath = LEGACY_TAB_TO_PATH[tab] || '/';
    navigate(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [selectedUnit, setSelectedUnit] = useState<SupportedAnalysisUnitId>('unit-1');
  const { user, role, isAuthModalOpen, setIsAuthModalOpen, quickSwitchRole } = useAuth();
  const { 
    isSidebarCollapsed, 
    toggleSidebarCollapse, 
    openMobileDrawer,
    closeMobileDrawer,
    isMobileDrawerOpen 
  } = useCurriculumFilter();

  // Global keyboard shortcut Ctrl+B / Cmd+B for sidebar toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebarCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebarCollapse]);

  // Navigation & Modal states
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState<boolean>(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState<boolean>(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState<boolean>(false);
  const [isBooksModalOpen, setIsBooksModalOpen] = useState<boolean>(false);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);

  const [completedExercisesCount, setCompletedExercisesCount] = useState<number>(14);

  // Sync progress from backend with local cache fallback (Resolving ISS-02)
  useEffect(() => {
    let isMounted = true;
    try {
      const saved = localStorage.getItem('eb_acc_progress');
      if (saved) {
        setCompletedExercisesCount(Number(saved) || 14);
      }
    } catch {}

    const fetchServerProgress = async () => {
      try {
        const res = await apiClient.request('/api/progress/student');
        if (isMounted && res && res.success) {
          const serverAttempts = typeof res.totalAttempts === 'number' ? res.totalAttempts : 0;
          const serverCompletedLessons = typeof res.completedLessonsCount === 'number' ? res.completedLessonsCount : 0;
          const totalProgress = Math.max(14, serverAttempts + serverCompletedLessons);
          setCompletedExercisesCount(totalProgress);
          try {
            localStorage.setItem('eb_acc_progress', String(totalProgress));
          } catch {}
        }
      } catch {
        // Fallback gracefully to cached localStorage
      }
    };

    fetchServerProgress();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleCompleteExercise = () => {
    setCompletedExercisesCount(prev => {
      const next = prev + 1;
      try {
        localStorage.setItem('eb_acc_progress', String(next));
      } catch {}
      return next;
    });
  };

  const handleOpenGlossaryTerm = (termId: string) => {
    setSelectedGlossaryTermId(termId);
    setIsGlossaryModalOpen(true);
  };

  const handleRoleChange = async (newRole: PlatformRole) => {
    if (quickSwitchRole) {
      await quickSwitchRole(newRole);
    }
  };

  const handleNavigateToLessonById = (lessonId: string) => {
    const map: Record<string, string> = {
      'lesson-1': '/curriculum/unit-1/lessons/lesson-1',
      'lesson-2': '/curriculum/unit-1/lessons/lesson-2',
      'lesson-3': '/curriculum/unit-1/lessons/lesson-3',
      'lesson-4': '/curriculum/unit-1/lessons/lesson-4',
      'lesson-5': '/curriculum/unit-1/lessons/lesson-5',
      'lesson-6': '/curriculum/unit-1/lessons/lesson-6',
      'u2-lesson-1': '/curriculum/unit-2/lessons/lesson-1',
      'u2-lesson-2': '/curriculum/unit-2/lessons/lesson-2',
      'u2-lesson-3': '/curriculum/unit-2/lessons/lesson-3',
      'u2-lesson-4': '/curriculum/unit-2/lessons/lesson-4',
      'u2-lesson-5': '/curriculum/unit-2/lessons/lesson-5',
      'u2-lesson-6': '/curriculum/unit-2/lessons/lesson-6'
    };
    const target = map[lessonId] || '/curriculum/unit-1/lessons/lesson-1';
    navigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPrintView = location.pathname === '/print';

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1D1D1B] font-serif flex flex-col selection:bg-[#C4A484] selection:text-[#1D1D1B]">
      {/* Top Navbar */}
      {!isPrintView && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenAnalysisReport={(unitId) => {
            if (unitId) setSelectedUnit(unitId);
            setIsAnalysisModalOpen(true);
          }}
          onOpenStudentDashboard={() => setIsStudentModalOpen(true)}
          onOpenTeacherDashboard={() => setIsTeacherModalOpen(true)}
          onOpenContentAnalytics={() => setIsContentModalOpen(true)}
          onOpenGlossary={() => {
            setSelectedGlossaryTermId(null);
            setIsGlossaryModalOpen(true);
          }}
          onOpenBooksModal={() => setIsBooksModalOpen(true)}
          completedExercisesCount={completedExercisesCount}
          totalExercisesCount={50}
          currentRole={role}
          setCurrentRole={handleRoleChange}
        />
      )}

      {/* Thanaweya Amma Student Motivation & Theme Bar */}
      {!isPrintView && !isFocusMode && (
        <ThanaweyaStudentBar
          completedExercisesCount={completedExercisesCount}
          totalExercisesCount={50}
        />
      )}

      {/* Main Container: Flex Row wrapping Docked Sidebar and Main Area */}
      <div className="flex-1 flex w-full relative">
        {/* Units & Lessons Sidebar (Docked on desktop, drawer on mobile) */}
        {!isPrintView && (
          <Sidebar
            isMobileDrawerOpen={isSidebarOpen || isMobileDrawerOpen}
            onMobileClose={() => {
              setIsSidebarOpen(false);
              closeMobileDrawer();
            }}
          />
        )}

        {/* Floating Quick Tab to expand Sidebar when collapsed on desktop */}
        {!isPrintView && isSidebarCollapsed && (
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            title="فرد قائمة الوحدات والدروس (Ctrl+B)"
            className="hidden lg:flex fixed right-0 top-32 z-30 bg-[#1D1D1B] text-[#F9F7F2] hover:bg-[#333333] border-l-0 border-y border-r-2 border-[#C4A484] shadow-md py-3 px-2 rounded-l-md items-center gap-1 cursor-pointer transition-all duration-200 hover:pr-3 group"
          >
            <PanelRight className="w-4 h-4 text-[#C4A484] group-hover:scale-110 transition-transform" />
            <span className="[writing-mode:vertical-rl] text-[11px] font-bold tracking-widest text-[#F9F7F2]/90 font-serif">
              الوحدات والدروس
            </span>
            <span className="text-[9px] font-mono text-[#C4A484] [writing-mode:vertical-rl] pt-1 opacity-75">
              Ctrl+B
            </span>
          </button>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 min-w-0 pb-16 md:pb-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'sidebar-collapsed-layout' : ''
        }`}>
          {children || (
            <Outlet
              context={{
                onCompleteExercise: handleCompleteExercise,
                onOpenGlossaryTerm: handleOpenGlossaryTerm,
                onOpenBooksModal: () => setIsBooksModalOpen(true),
                completedExercisesCount,
                isFocusMode,
                setIsFocusMode,
                toggleFocusMode
              }}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      {!isPrintView && !isFocusMode && (
        <footer className="border-t border-[#1D1D1B]/15 bg-[#1D1D1B] text-[#F9F7F2] py-8 px-4 text-center text-xs space-y-2 mt-12">
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-[#C4A484] text-sm">
              منهج المحاسبة المالية المعتمد — البكالوريا المصرية (EB)
            </span>
          </div>
          <p className="text-[#F9F7F2]/60 max-w-xl mx-auto">
            منظومة تعليمية وتقويمية متقدمة مطابقة لنموذج البكالوريا v2.0 ومبنية على معايير الجودة والاعتماد الأكاديمي القياسي.
          </p>
          <div className="pt-2 text-[10px] text-[#F9F7F2]/40 font-mono">
            Production Foundation v2.0 • Real Router Navigation • Clean URL Slugs • Single-Source Curriculum Registry
          </div>
        </footer>
      )}

      {/* Mobile Bottom Navigation Bar */}
      {!isPrintView && !isFocusMode && (
        <MobileNavigation onOpenSidebar={() => setIsSidebarOpen(true)} />
      )}

      {/* Shared Modals */}
      <AccountingGlossaryModal
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
        initialTermId={selectedGlossaryTermId}
        onOpenPrintGlossary={() => {
          navigate('/print?edition=glossary');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToLesson={(lessonIdx, unitId, lessonId) => {
          if (unitId && lessonId) {
            navigate(`/curriculum/${unitId}/lessons/${lessonId}`);
          } else {
            const u = lessonIdx >= 6 ? 'unit-2' : 'unit-1';
            const lNum = lessonIdx >= 6 ? lessonIdx - 5 : lessonIdx + 1;
            navigate(`/curriculum/${u}/lessons/lesson-${lNum}`);
          }
        }}
      />

      <MethodologyReportModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        initialUnitId={selectedUnit}
      />

      <StudentDashboardModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        userFullName={user?.full_name || 'طالب EB'}
        onNavigateToLesson={handleNavigateToLessonById}
      />

      <TeacherDashboardModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />

      <ContentAnalyticsModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
      />

      <PlatformBooksModal
        isOpen={isBooksModalOpen}
        onClose={() => setIsBooksModalOpen(false)}
        onOpenGlossary={() => {
          setSelectedGlossaryTermId(null);
          setIsGlossaryModalOpen(true);
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
