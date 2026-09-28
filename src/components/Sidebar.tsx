import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Compass, Scale, Sparkles, Brain, Printer, 
  ChevronLeft, ChevronDown, CheckCircle2, Search, X, 
  PanelRightClose, PanelRightOpen, Layers, ChevronsUpDown, 
  ChevronsDownUp, BookA, Clock, Home, ArrowLeft, Dumbbell,
  Target
} from 'lucide-react';
import { curriculumRegistry } from '../domain/curriculum/CurriculumRegistry';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectLesson?: (lessonId: string) => void;
  onSelectUnit?: (unitId: string) => void;
  isMobileDrawerOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose,
  isMobileDrawerOpen: propMobileOpen,
  onMobileClose: propMobileClose
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const units = useMemo(() => curriculumRegistry.getUnits(), []);

  const { 
    selectedUnitId,
    selectedLessonId,
    selectUnit,
    selectLesson,
    clearFilters,
    isSidebarCollapsed, 
    toggleSidebarCollapse, 
    setSidebarCollapsed,
    isMobileDrawerOpen: contextMobileOpen,
    closeMobileDrawer,
    openMobileDrawer
  } = useCurriculumFilter();

  const { isModernThanaweya } = useTheme();

  const isTrainingActive = pathname.startsWith('/training');
  const isAssessmentActive = pathname.startsWith('/assessment');
  const isCurriculumActive = pathname.startsWith('/curriculum') || pathname === '/';

  const isMobileOpen = propMobileOpen !== undefined 
    ? propMobileOpen 
    : (contextMobileOpen);

  const handleCloseMobile = () => {
    if (propMobileClose) propMobileClose();
    if (onClose) onClose();
    closeMobileDrawer();
  };

  // State for expanded unit accordions (Set of expanded unit IDs)
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(['unit-1']));
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-expand the unit that matches the current URL or active filter
  useEffect(() => {
    if (selectedUnitId) {
      setExpandedUnits(prev => new Set(prev).add(selectedUnitId));
    }
    for (const unit of units) {
      if (pathname.includes(`/curriculum/${unit.id}`)) {
        setExpandedUnits(prev => {
          const next = new Set(prev);
          next.add(unit.id);
          return next;
        });
        break;
      }
    }
  }, [pathname, selectedUnitId, units]);

  // Handle selecting a unit depending on active tab
  const handleUnitClick = (unitId: string) => {
    selectUnit(unitId);
    if (isTrainingActive) {
      if (pathname === '/training' || pathname === '/training/') {
        navigate('/training/exercises');
      }
    } else if (isAssessmentActive) {
      if (pathname === '/assessment' || pathname === '/assessment/') {
        navigate('/assessment/question-bank');
      }
    } else {
      navigate(`/curriculum/${unitId}`);
    }
    if (window.innerWidth < 1024) handleCloseMobile();
  };

  // Handle selecting a lesson depending on active tab
  const handleLessonClick = (unitId: string, lessonId: string) => {
    selectLesson(unitId, lessonId);
    if (isTrainingActive) {
      if (pathname === '/training' || pathname === '/training/') {
        navigate('/training/exercises');
      }
    } else if (isAssessmentActive) {
      if (pathname === '/assessment' || pathname === '/assessment/') {
        navigate('/assessment/question-bank');
      }
    } else {
      navigate(`/curriculum/${unitId}/lessons/${lessonId}`);
    }
    if (window.innerWidth < 1024) handleCloseMobile();
  };

  // Toggle individual unit expansion
  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => {
      const next = new Set(prev);
      if (next.has(unitId)) {
        next.delete(unitId);
      } else {
        next.add(unitId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedUnits(new Set(units.map(u => u.id)));
  };

  const collapseAll = () => {
    setExpandedUnits(new Set());
  };

  // Filter units and lessons by search query
  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) return units;
    const q = searchQuery.trim().toLowerCase();

    return units.map(unit => {
      const unitMatches = unit.titleAr.toLowerCase().includes(q) || 
                          unit.id.toLowerCase().includes(q) ||
                          (unit.descriptionAr && unit.descriptionAr.toLowerCase().includes(q));
      
      const matchingLessons = unit.lessons.filter(l => 
        l.titleAr.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q) ||
        `الدرس ${l.lessonNumber}`.includes(q)
      );

      if (unitMatches) {
        return unit;
      }

      if (matchingLessons.length > 0) {
        return {
          ...unit,
          lessons: matchingLessons
        };
      }

      return null;
    }).filter(Boolean) as typeof units;
  }, [units, searchQuery]);

  // If user is actively searching, auto-expand matching units
  useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedUnits(new Set(filteredUnits.map(u => u.id)));
    }
  }, [searchQuery, filteredUnits]);

  const totalLessonsCount = useMemo(() => {
    return units.reduce((acc, u) => acc + u.lessons.length, 0);
  }, [units]);

  // Content JSX used in both desktop docked mode and mobile drawer mode
  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FAF9F5] font-serif select-none" dir="rtl">
      {/* Sidebar Header & Window Controls */}
      <div className="p-3.5 bg-[#161615] text-[#F9F7F2] border-b border-[#2C2C28] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-sm bg-[#C4A484] text-[#161615] flex items-center justify-center font-black shrink-0 shadow-xs">
            <Layers className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="font-black text-xs sm:text-sm tracking-tight text-[#F9F7F2] truncate flex items-center gap-1.5 font-serif">
              <span>فهرس الوحدات والدروس</span>
              <span className="bg-[#C4A484]/20 text-[#C4A484] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-xs border border-[#C4A484]/30">
                EB v2.0
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#F9F7F2]/65 truncate font-sans mt-0.5">
              10 وحدات معتمدة • {totalLessonsCount} درساً تفصيلياً
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Collapse/Close Desktop Docked */}
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            className="hidden lg:flex p-1.5 rounded-sm text-[#F9F7F2]/75 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="طي القائمة الجانبية لتوسيع مساحة القراءة (Ctrl+B)"
          >
            <PanelRightClose className="w-4 h-4 text-[#C4A484]" />
          </button>

          {/* Close Mobile Drawer */}
          <button
            type="button"
            onClick={handleCloseMobile}
            className="lg:hidden p-1.5 rounded-sm text-[#F9F7F2]/75 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="إغلاق القائمة"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Primary Core Pillars Navigation (Gate 9.5) */}
      <div className="p-3 bg-white border-b border-[#1D1D1B]/15 shrink-0 space-y-2">
        <div className="text-[11px] font-bold text-[#1D1D1B]/70 flex items-center justify-between">
          <span>الأقسام الرئيسية (المحاور الخمسة)</span>
        </div>
        <nav className="grid grid-cols-1 gap-1 text-xs font-serif" aria-label="أقسام المنصة الرئيسية">
          <NavLink
            to="/"
            onClick={() => {
              if (window.innerWidth < 1024) handleCloseMobile();
            }}
            className={({ isActive }) => 
              `px-2.5 py-1.5 rounded-sm flex items-center gap-2 transition ${
                isActive && pathname === '/'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] font-bold'
                  : 'text-[#1D1D1B] hover:bg-[#FAF9F5]'
              }`
            }
          >
            <Home className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>الرئيسية</span>
          </NavLink>
          <NavLink
            to="/curriculum"
            onClick={() => {
              if (window.innerWidth < 1024) handleCloseMobile();
            }}
            className={({ isActive }) => 
              `px-2.5 py-1.5 rounded-sm flex items-center gap-2 transition ${
                isActive || pathname.startsWith('/curriculum')
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] font-bold'
                  : 'text-[#1D1D1B] hover:bg-[#FAF9F5]'
              }`
            }
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>المنهج والوحدات</span>
          </NavLink>
          <NavLink
            to="/training"
            onClick={() => {
              if (window.innerWidth < 1024) handleCloseMobile();
            }}
            className={({ isActive }) => 
              `px-2.5 py-1.5 rounded-sm flex items-center gap-2 transition ${
                isActive || pathname.startsWith('/training')
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] font-bold'
                  : 'text-[#1D1D1B] hover:bg-[#FAF9F5]'
              }`
            }
          >
            <Dumbbell className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>التدريب والمحاكيات</span>
          </NavLink>
          <NavLink
            to="/assessment"
            onClick={() => {
              if (window.innerWidth < 1024) handleCloseMobile();
            }}
            className={({ isActive }) => 
              `px-2.5 py-1.5 rounded-sm flex items-center gap-2 transition ${
                isActive || pathname.startsWith('/assessment')
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] font-bold'
                  : 'text-[#1D1D1B] hover:bg-[#FAF9F5]'
              }`
            }
          >
            <Target className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>التقييم والامتحانات</span>
          </NavLink>
          <NavLink
            to="/my-path"
            onClick={() => {
              if (window.innerWidth < 1024) handleCloseMobile();
            }}
            className={({ isActive }) => 
              `px-2.5 py-1.5 rounded-sm flex items-center gap-2 transition ${
                isActive || pathname.startsWith('/my-path')
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] font-bold'
                  : 'text-[#1D1D1B] hover:bg-[#FAF9F5]'
              }`
            }
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>مساري (الإتقان التكيفي)</span>
          </NavLink>
        </nav>
      </div>

      {/* Live Search & Filter Bar */}
      <div className="p-3 bg-white border-b border-[#1D1D1B]/15 shrink-0 space-y-2.5 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الوحدات أو أسماء الدروس..."
            className="w-full bg-[#FAF9F5] border border-[#1D1D1B]/20 rounded-sm pr-8 pl-7 py-2 text-xs sm:text-sm text-[#1D1D1B] placeholder:text-[#1D1D1B]/40 focus:outline-none focus:border-[#1D1D1B] focus:bg-white focus:ring-1 focus:ring-[#1D1D1B] transition font-sans"
          />
          <Search className="w-4 h-4 text-[#1D1D1B]/50 absolute right-2.5 top-2.5 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 top-2.5 text-[#1D1D1B]/40 hover:text-[#1D1D1B] cursor-pointer"
              title="مسح البحث"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Toolbar: Expand / Collapse All */}
        <div className="flex items-center justify-between text-[11px] text-[#1D1D1B]/70 px-0.5">
          <span className="font-bold font-sans text-[#1D1D1B]/70">
            {searchQuery.trim() ? (
              <span className="text-[#8A1F1D] font-bold">
                نتائج البحث ({filteredUnits.length} وحدة)
              </span>
            ) : (
              <span>هيكل المنهج المعتمد ({filteredUnits.length} وحدات)</span>
            )}
          </span>

          <div className="flex items-center gap-2 font-sans">
            <button
              type="button"
              onClick={expandAll}
              className="px-2 py-0.5 rounded-xs bg-[#FAF9F5] hover:bg-[#1D1D1B] hover:text-white border border-[#1D1D1B]/15 text-[#1D1D1B] flex items-center gap-1 cursor-pointer font-bold transition text-[10px]"
              title="فرد جميع فروع الوحدات"
            >
              <ChevronsUpDown className="w-3 h-3 text-[#C4A484]" />
              <span>فرد الكل</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2 py-0.5 rounded-xs bg-[#FAF9F5] hover:bg-[#1D1D1B] hover:text-white border border-[#1D1D1B]/15 text-[#1D1D1B] flex items-center gap-1 cursor-pointer font-bold transition text-[10px]"
              title="طي جميع فروع الوحدات"
            >
              <ChevronsDownUp className="w-3 h-3 text-[#1D1D1B]/60" />
              <span>طي الكل</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mode Switcher: Link Sidebar with Curriculum, Training, and Assessment */}
        <div className="bg-[#FAF9F5] p-2 rounded-sm border border-[#1D1D1B]/15 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold font-sans text-[#1D1D1B]/70 px-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A484] inline-block animate-pulse"></span>
              وجهة الفلترة والتنقل:
            </span>
            {selectedUnitId && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[#8A1F1D] hover:underline font-bold text-[9px] cursor-pointer"
                title="إلغاء التصفية وعرض كل المحتوى"
              >
                إلغاء التصفية
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-1 text-[11px] font-bold text-center font-serif">
            <button
              type="button"
              onClick={() => {
                if (!isCurriculumActive) {
                  navigate(selectedUnitId ? `/curriculum/${selectedUnitId}` : '/curriculum');
                }
              }}
              title="تصفح شروحات ومفاهيم المنهج"
              className={`py-1.5 px-1 rounded-xs flex items-center justify-center gap-1 transition cursor-pointer ${
                isCurriculumActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-2xs ring-1 ring-[#C4A484]'
                  : 'bg-white text-[#1D1D1B] hover:bg-[#F2ECE0] border border-[#1D1D1B]/15'
              }`}
            >
              <BookOpen className="w-3 h-3 text-[#C4A484]" />
              <span>المنهج</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isTrainingActive) {
                  navigate('/training/exercises');
                }
              }}
              title="فلترة التدريبات والمحاكاة على الوحدة المختارة"
              className={`py-1.5 px-1 rounded-xs flex items-center justify-center gap-1 transition cursor-pointer ${
                isTrainingActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-2xs ring-1 ring-[#C4A484]'
                  : 'bg-white text-[#1D1D1B] hover:bg-[#F2ECE0] border border-[#1D1D1B]/15'
              }`}
            >
              <Dumbbell className="w-3 h-3 text-[#C4A484]" />
              <span>التدريب</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isAssessmentActive) {
                  navigate('/assessment/question-bank');
                }
              }}
              title="فلترة بنك الأسئلة والتقييم على الوحدة المختارة"
              className={`py-1.5 px-1 rounded-xs flex items-center justify-center gap-1 transition cursor-pointer ${
                isAssessmentActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-2xs ring-1 ring-[#C4A484]'
                  : 'bg-white text-[#1D1D1B] hover:bg-[#F2ECE0] border border-[#1D1D1B]/15'
              }`}
            >
              <Target className="w-3 h-3 text-[#C4A484]" />
              <span>التقييم</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Accordion List of Units & Lessons */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-[#1D1D1B]/20">
        {filteredUnits.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#1D1D1B]/60 space-y-2">
            <p>لا توجد دروس أو وحدات مطابقة للبحث.</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-3 py-1.5 bg-[#1D1D1B] text-white text-xs font-bold transition"
            >
              عرض كامل الوحدات
            </button>
          </div>
        ) : (
          filteredUnits.map((unit, uIdx) => {
            const isExpanded = expandedUnits.has(unit.id);
            const isSelectedUnit = selectedUnitId === unit.id;
            const isCurrentUnit = isSelectedUnit || pathname.includes(`/curriculum/${unit.id}`);
            const unitNumber = uIdx + 1;

            return (
              <div 
                key={unit.id}
                className={`rounded-sm overflow-hidden border transition-all duration-200 bg-white ${
                  isSelectedUnit
                    ? 'border-[#1D1D1B] shadow-xs ring-2 ring-[#C4A484]'
                    : isCurrentUnit 
                    ? 'border-[#1D1D1B] shadow-xs ring-1 ring-[#C4A484]/60' 
                    : 'border-[#1D1D1B]/15 hover:border-[#1D1D1B]/35 shadow-2xs'
                }`}
              >
                {/* Unit Accordion Trigger Header */}
                <div
                  className={`w-full px-3.5 py-3 flex items-center justify-between text-right transition ${
                    isSelectedUnit
                      ? 'bg-[#C4A484]/20 text-[#1D1D1B]'
                      : isCurrentUnit 
                      ? 'bg-[#1D1D1B]/5 text-[#1D1D1B]' 
                      : 'bg-white text-[#1D1D1B] hover:bg-[#FAF9F5]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleUnitClick(unit.id)}
                    className="flex items-center gap-2.5 min-w-0 flex-1 pl-2 text-right cursor-pointer group"
                    title={isTrainingActive ? `فلترة التدريب على ${unit.titleAr}` : isAssessmentActive ? `فلترة التقييم على ${unit.titleAr}` : `الانتقال إلى ${unit.titleAr}`}
                  >
                    <span className={`w-6 h-6 rounded-xs flex items-center justify-center text-xs font-black shrink-0 font-sans shadow-2xs ${
                      isSelectedUnit
                        ? 'bg-[#1D1D1B] text-[#C4A484]'
                        : isCurrentUnit 
                        ? 'bg-[#1D1D1B] text-[#F9F7F2]' 
                        : 'bg-[#C4A484]/25 text-[#1D1D1B] border border-[#C4A484]/50 group-hover:bg-[#C4A484]/40'
                    }`}>
                      {unitNumber}
                    </span>
                    <div className="truncate min-w-0">
                      <span className="truncate leading-snug font-bold font-serif text-xs sm:text-[13px] text-[#1D1D1B] group-hover:text-[#8A1F1D] block">
                        {unit.titleAr}
                      </span>
                      {isSelectedUnit && (
                        <span className="text-[10px] font-sans font-bold text-[#8A1F1D] flex items-center gap-1">
                          ● الوحدة المحددة حالياً
                        </span>
                      )}
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleUnit(unit.id)}
                      className="p-1 rounded-xs hover:bg-[#1D1D1B]/10 text-[#1D1D1B]/70 flex items-center gap-1 text-[10px] font-sans font-bold cursor-pointer"
                      title={isExpanded ? 'طي دروس الوحدة' : 'عرض دروس الوحدة'}
                    >
                      <span className="bg-[#FAF9F5] px-1.5 py-0.5 rounded-xs border border-[#1D1D1B]/15">
                        {unit.lessons.length}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#C4A484]' : 'text-[#1D1D1B]/40'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Unit Body */}
                {isExpanded && (
                  <div className="border-t border-[#1D1D1B]/10 divide-y divide-[#1D1D1B]/10 bg-[#FAF9F5] p-1.5 space-y-1">
                    {/* Link: Unit Comprehensive Map & Outcomes */}
                    <button
                      type="button"
                      onClick={() => {
                        selectUnit(unit.id);
                        navigate(`/curriculum/${unit.id}`);
                        if (window.innerWidth < 1024) handleCloseMobile();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold rounded-xs transition text-[#1D1D1B]/75 hover:bg-[#F0EBE1] hover:text-[#1D1D1B] cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-[#C4A484]" />
                        <span>خريطة الوحدة الشاملة ومخرجاتها</span>
                      </div>
                      <ArrowLeft className="w-3 h-3 text-[#1D1D1B]/40" />
                    </button>

                    {/* Lessons List */}
                    <div className="pt-1 space-y-1">
                      {unit.lessons.map((lesson, lIdx) => {
                        const lessonPath = `/curriculum/${unit.id}/lessons/${lesson.id}`;
                        const isSelectedLesson = selectedLessonId === lesson.id && selectedUnitId === unit.id;
                        const isCurrentLesson = isSelectedLesson || pathname === lessonPath;
                        const lessonNumber = lIdx + 1;

                        return (
                          <div
                            key={lesson.id}
                            className={`flex flex-col p-2.5 text-xs transition group border ${
                              isModernThanaweya
                                ? isCurrentLesson
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-md rounded-xl border-amber-600 ring-2 ring-amber-400/40'
                                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200/90 rounded-xl shadow-2xs'
                                : isSelectedLesson
                                ? 'bg-[#1D1D1B] text-[#F9F7F2] font-bold shadow-xs border-[#C4A484] ring-1 ring-[#C4A484] rounded-xs'
                                : isCurrentLesson
                                ? 'bg-[#1D1D1B] text-[#F9F7F2] font-bold shadow-xs border-[#1D1D1B] rounded-xs'
                                : 'bg-white text-[#1D1D1B]/85 hover:bg-[#F2ECE0] border-transparent rounded-xs'
                            }`}
                          >
                            {/* Main Lesson Title Click (Filters or Navigates) */}
                            <div 
                              onClick={() => handleLessonClick(unit.id, lesson.id)}
                              className="flex items-start gap-2.5 cursor-pointer select-none"
                              title={isTrainingActive ? `فلترة التدريب على الدرس ${lessonNumber}` : isAssessmentActive ? `فلترة الأسئلة على الدرس ${lessonNumber}` : `عرض الدرس ${lessonNumber}`}
                            >
                              <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5 font-sans shadow-2xs ${
                                isModernThanaweya
                                  ? isCurrentLesson
                                    ? 'bg-white text-amber-700'
                                    : 'bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800'
                                  : isCurrentLesson 
                                  ? 'bg-[#C4A484] text-[#1D1D1B]' 
                                  : 'bg-[#1D1D1B]/10 text-[#1D1D1B] group-hover:bg-[#1D1D1B]/20'
                              }`}>
                                {lessonNumber}
                              </span>

                              <div className="flex-1 min-w-0">
                                <div className="line-clamp-2 leading-snug font-serif text-xs sm:text-[13px]">
                                  {lesson.titleAr}
                                </div>
                                {lesson.textbookPages && (
                                  <div className={`text-[10px] font-sans flex items-center gap-1 mt-1 ${
                                    isModernThanaweya
                                      ? isCurrentLesson ? 'text-amber-100' : 'text-slate-500'
                                      : isCurrentLesson ? 'text-[#C4A484]' : 'text-[#1D1D1B]/55'
                                  }`}>
                                    <BookOpen className="w-3 h-3" />
                                    <span>الكتاب ص {lesson.textbookPages[0]}–{lesson.textbookPages[1]}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Quick Action Pills: [شرح | تدريب | تقييم] */}
                            <div className={`flex items-center justify-end gap-1.5 mt-2 pt-1.5 border-t ${
                              isModernThanaweya && isCurrentLesson ? 'border-white/20' : 'border-[#1D1D1B]/10'
                            }`}>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectLesson(unit.id, lesson.id);
                                  navigate(`/curriculum/${unit.id}/lessons/${lesson.id}`);
                                  if (window.innerWidth < 1024) handleCloseMobile();
                                }}
                                title="عرض شرح ومفاهيم الدرس"
                                className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition cursor-pointer ${
                                  isModernThanaweya
                                    ? isCurrentLesson
                                      ? 'bg-white text-amber-700 shadow-2xs font-extrabold'
                                      : 'bg-slate-100 text-slate-700 hover:bg-amber-500 hover:text-white'
                                    : isCurriculumActive && isCurrentLesson
                                    ? 'bg-[#C4A484] text-[#1D1D1B]'
                                    : isCurrentLesson
                                    ? 'bg-white/15 text-[#F9F7F2] hover:bg-white/25'
                                    : 'bg-[#FAF9F5] text-[#1D1D1B]/80 hover:bg-[#1D1D1B] hover:text-white border border-[#1D1D1B]/15'
                                }`}
                              >
                                <BookOpen className="w-3 h-3" />
                                <span>شرح</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectLesson(unit.id, lesson.id);
                                  navigate('/training/exercises');
                                  if (window.innerWidth < 1024) handleCloseMobile();
                                }}
                                title="تصفية تمارين وتطبيقات هذا الدرس"
                                className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition cursor-pointer ${
                                  isModernThanaweya
                                    ? isCurrentLesson
                                      ? 'bg-amber-700/50 text-white hover:bg-amber-700/70 border border-white/20'
                                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                                    : isTrainingActive && isCurrentLesson
                                    ? 'bg-[#C4A484] text-[#1D1D1B]'
                                    : isCurrentLesson
                                    ? 'bg-white/15 text-[#F9F7F2] hover:bg-white/25'
                                    : 'bg-[#FAF9F5] text-[#1D1D1B]/80 hover:bg-[#1D1D1B] hover:text-white border border-[#1D1D1B]/15'
                                }`}
                              >
                                <Dumbbell className="w-3 h-3" />
                                <span>تدريب</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectLesson(unit.id, lesson.id);
                                  navigate('/assessment/question-bank');
                                  if (window.innerWidth < 1024) handleCloseMobile();
                                }}
                                title="تصفية بنك الأسئلة على هذا الدرس"
                                className={`px-2 py-0.5 rounded-xs text-[10px] font-bold flex items-center gap-1 transition cursor-pointer ${
                                  isAssessmentActive && isCurrentLesson
                                    ? 'bg-[#C4A484] text-[#1D1D1B]'
                                    : isCurrentLesson
                                    ? 'bg-white/15 text-[#F9F7F2] hover:bg-white/25'
                                    : 'bg-[#FAF9F5] text-[#1D1D1B]/80 hover:bg-[#1D1D1B] hover:text-white border border-[#1D1D1B]/15'
                                }`}
                              >
                                <Target className="w-3 h-3 text-[#C4A484]" />
                                <span>تقييم</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    {/* Sidebar Quick Footer Hub */}
    <div className="p-3 bg-[#FAF8F3] border-t border-[#1D1D1B]/15 text-xs shrink-0 flex items-center justify-between text-[#1D1D1B]/80 font-sans">
      <NavLink
        to="/curriculum"
        onClick={() => {
          if (window.innerWidth < 1024) handleCloseMobile();
        }}
        className="hover:text-[#1D1D1B] font-bold flex items-center gap-1.5"
      >
        <Home className="w-3.5 h-3.5 text-[#C4A484]" />
        <span>نظرة عامة</span>
      </NavLink>

      <span className="text-[#1D1D1B]/30">•</span>

      <NavLink
        to="/print"
        onClick={() => {
          if (window.innerWidth < 1024) handleCloseMobile();
        }}
        className="hover:text-[#1D1D1B] font-bold flex items-center gap-1.5"
      >
        <Printer className="w-3.5 h-3.5 text-[#C4A484]" />
        <span>طباعة PDF</span>
      </NavLink>
    </div>
  </div>
);

  return (
    <>
      {/* 1. Desktop Docked Sidebar (Controlled via isSidebarCollapsed) */}
      <aside 
        id="app-units-sidebar-dock"
        aria-label="قائمة الوحدات والدروس"
        className={`hidden lg:block shrink-0 sticky top-[57px] h-[calc(100vh-57px)] border-l border-[#1D1D1B]/15 bg-[#FAF9F5] transition-all duration-300 overflow-hidden z-20 shadow-xs ${
          isSidebarCollapsed 
            ? 'w-0 border-l-0 opacity-0 pointer-events-none' 
            : 'w-84 sm:w-88 opacity-100'
        }`}
      >
        <div className="w-84 sm:w-88 h-full">
          {sidebarContent}
        </div>
      </aside>

      {/* 2. Mobile Responsive Slide-Over Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden font-serif" dir="rtl">
          {/* Backdrop */}
          <div 
            onClick={handleCloseMobile}
            className="absolute inset-0 bg-[#1D1D1B]/60 backdrop-blur-xs transition-opacity duration-300"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-8">
            <div className="w-screen max-w-xs sm:max-w-sm bg-[#F9F7F2] border-l-2 border-[#1D1D1B] shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-250">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
