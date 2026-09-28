import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Scale, PenTool, Dumbbell, Sparkles, ArrowLeft, BookOpen, FileText, Building2, Award, Sliders, Filter, X } from 'lucide-react';
import { AccountingSimulator } from '../components/AccountingSimulator';
import { JRETalker } from '../components/JRETalker';
import { DocumentaryCycleSimulator } from '../components/DocumentaryCycleSimulator';
import { IntegratedExercisesStudio } from '../components/IntegratedExercisesStudio';
import { AccountingCapstoneStudio } from '../components/capstone/AccountingCapstoneStudio';
import { AccountingErrorsCorrectionLab } from '../components/accounting-errors/AccountingErrorsCorrectionLab';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';

export const TrainingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const {
    selectedUnitId: globalUnitId,
    selectedLessonId: globalLessonId,
    clearFilters: clearGlobalFilters,
    isSidebarCollapsed
  } = useCurriculumFilter();

  const activeSubTab = path.includes('/error-correction')
    ? 'error-correction'
    : path.includes('/documentary-cycle')
    ? 'documentary-cycle'
    : path.includes('/jre') 
    ? 'jre' 
    : path.includes('/simulators') 
    ? 'simulator' 
    : path.includes('/exercises') 
    ? 'exercises' 
    : path.includes('/capstone')
    ? 'capstone'
    : 'overview';

  return (
    <div className={`mx-auto py-6 space-y-6 font-serif transition-all duration-300 ${
      isSidebarCollapsed 
        ? 'w-full max-w-none px-4 sm:px-8 lg:px-12 text-base sm:text-lg' 
        : 'max-w-7xl px-4 text-sm sm:text-base'
    }`} dir="rtl">
      {/* Global Unit Filter Banner */}
      {globalUnitId && (
        <div className="bg-[#1D1D1B] text-[#F9F7F2] p-3.5 border-2 border-[#C4A484] flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-bold text-xs rounded-xs shrink-0">
              <Filter className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[#C4A484] font-bold">تصفية التدريبات بحسب القائمة الجانبية:</span>
              <span className="bg-white/20 px-2.5 py-0.5 font-mono font-bold">{globalUnitId.toUpperCase()}</span>
              {globalLessonId && (
                <span className="bg-[#C4A484] text-[#1D1D1B] px-2.5 py-0.5 font-mono font-bold">
                  درس: {globalLessonId}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={clearGlobalFilters}
            className="px-3 py-1 bg-[#8A1F1D] hover:bg-[#6e1917] text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer rounded-xs"
          >
            <X className="w-3.5 h-3.5" />
            <span>عرض كل محتوى التدريب</span>
          </button>
        </div>
      )}

      {/* Subnavigation Bar */}
      <div className="bg-white border-2 border-[#1D1D1B] p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#1D1D1B] text-[#C4A484] text-xs font-bold px-2.5 py-1">
            ورش العمل والمحاكاة التفاعلية
          </span>
          <span className="text-xs text-[#1D1D1B]/70 font-bold hidden sm:inline">
            التطبيق الميداني لمنهجية البكالوريا المصرية
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <NavLink
            to="/training/documentary-cycle"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'documentary-cycle'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <FileText className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>محاكي الدورة المستندية (مصادر القيد)</span>
          </NavLink>

          <NavLink
            to="/training/simulators"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'simulator'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Scale className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>المحاكي المحاسبي الشامل</span>
          </NavLink>

          <NavLink
            to="/training/jre"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'jre'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <PenTool className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>ورشة التفسير المحاسبي JRE</span>
          </NavLink>

          <NavLink
            to="/training/exercises"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'exercises'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Dumbbell className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>التدريبات التطبيقية المتكاملة</span>
          </NavLink>

          <NavLink
            to="/training/error-correction"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'error-correction'
                  ? 'bg-[#8A1F1D] text-white shadow-xs'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Scale className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>مختبر تصحيح الأخطاء (مطولة ومختصرة)</span>
          </NavLink>

          <NavLink
            to="/training/capstone"
            className={({ isActive }) => 
              `px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'capstone'
                  ? 'bg-[#1D1D1B] text-[#C4A484] shadow-xs'
                  : 'bg-[#C4A484]/20 text-[#1D1D1B] hover:bg-[#C4A484]/40 border border-[#C4A484]'
              }`
            }
          >
            <Building2 className="w-3.5 h-3.5 text-[#C4A484]" />
            <span className="font-extrabold">مشروع التخرج وملف الإنجاز (Capstone)</span>
          </NavLink>
        </div>
      </div>

      {/* Render Component based on Sub-Route */}
      {activeSubTab === 'documentary-cycle' && (
        <DocumentaryCycleSimulator 
          onNavigateToJournal={(seed) => {
            navigate('/training/simulators', { state: { seedTransaction: seed } });
          }} 
        />
      )}

      {activeSubTab === 'simulator' && <AccountingSimulator />}

      {activeSubTab === 'jre' && <JRETalker />}

      {activeSubTab === 'exercises' && <IntegratedExercisesStudio />}

      {activeSubTab === 'error-correction' && <AccountingErrorsCorrectionLab />}

      {activeSubTab === 'capstone' && <AccountingCapstoneStudio />}

      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#1D1D1B]">
                منظومة التدريب العملي والمحاكاة المحاسبية
              </h2>
              <p className="text-sm text-[#1D1D1B]/70 leading-relaxed">
                التسلسل التعليمي المعتمد: يبدأ من فحص المستند المؤيد في الدورة المستندية، ثم تسجيل القيود في دفتر اليومية وترحيلها لحسابات الأستاذ وميزان المراجعة، وصولاً إلى صياغة التفسير المحاسبي المدعوم بالأدلة (JRE)، وحل القضايا المحاسبية الشاملة الميدانية.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {/* Card 1: Documentary Cycle */}
              <div 
                onClick={() => navigate('/training/documentary-cycle')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-[#8A1F1D] text-white flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold bg-[#B45309]/15 text-[#B45309] border border-[#B45309]/30 px-1.5 py-0.5">إثرائي</span>
                </div>
                <h3 className="text-sm font-bold text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors">
                  محاكي الدورة المستندية
                </h3>
                <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                  فحص الفواتير وسندات القبض والصرف والشيكات واستخراج قيود اليومية.
                </p>
                <div className="flex items-center text-xs font-bold text-[#8A1F1D] gap-1 group-hover:gap-2 transition-all pt-1">
                  <span>فتح المستندات</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 2: Accounting Simulator */}
              <div 
                onClick={() => navigate('/training/simulators')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#1D1D1B]/10 px-1.5 py-0.5">خط أنابيب 1 - 7</span>
                </div>
                <h3 className="text-sm font-bold text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors">
                  المحاكي المحاسبي الشامل
                </h3>
                <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                  دفاتر اليومية، الأستاذ T، ميزان المراجعة، التسويات الجردية والقوائم المالية.
                </p>
                <div className="flex items-center text-xs font-bold text-[#1D1D1B] gap-1 group-hover:gap-2 transition-all pt-1">
                  <span>فتح المحاكي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 3: Applied Exercises Studio */}
              <div 
                onClick={() => navigate('/training/exercises')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-1.5 py-0.5">تدريبات عملية</span>
                </div>
                <h3 className="text-sm font-bold text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors">
                  استوديو التدريبات التطبيقية
                </h3>
                <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                  حل القضايا المعتمدة من كتاب الوزارة خطوة بخطوة مع تصحيح فوري ونقاط إتقان.
                </p>
                <div className="flex items-center text-xs font-bold text-[#8A1F1D] gap-1 group-hover:gap-2 transition-all pt-1">
                  <span>بدء حل القضايا</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 4: Accounting Errors Correction Lab (Phase 1) */}
              <div 
                onClick={() => navigate('/training/error-correction')}
                className="bg-white border-2 border-[#8A1F1D] p-4 space-y-3 hover:bg-[#8A1F1D]/5 transition cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-[#8A1F1D] text-white flex items-center justify-center font-black">
                    <Scale className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold bg-[#8A1F1D] text-white px-2 py-0.5">الوحدة 4: المرحلة 1</span>
                </div>
                <h3 className="text-sm font-black text-[#8A1F1D] group-hover:text-[#1D1D1B] transition-colors">
                  مختبر تصحيح الأخطاء المحاسبية
                </h3>
                <p className="text-[11px] text-[#1D1D1B]/80 leading-relaxed">
                  تدريب تفاعلي على الطريقتين المطولة والمختصرة، والحساب المعلق، والمادة 11 ق.ت لمنع الشطب.
                </p>
                <div className="flex items-center text-xs font-black text-[#8A1F1D] gap-1 group-hover:gap-2 transition-all pt-1">
                  <span>دخول المختبر</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 5: JRE Workshop */}
              <div 
                onClick={() => navigate('/training/jre')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-[#1B4D2E] text-white flex items-center justify-center">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#1B4D2E]/10 text-[#1B4D2E] px-1.5 py-0.5">20 درجة</span>
                </div>
                <h3 className="text-sm font-bold text-[#1D1D1B] group-hover:text-[#1B4D2E] transition-colors">
                  ورشة مقال التفسير JRE
                </h3>
                <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                  صياغة المقال المالي المنضبط وفق سلم التصحيح الوزاري المعتمد.
                </p>
                <div className="flex items-center text-xs font-bold text-[#1B4D2E] gap-1 group-hover:gap-2 transition-all pt-1">
                  <span>ورشة JRE</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 6: Capstone Enterprise Studio */}
              <div 
                onClick={() => navigate('/training/capstone')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-black">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">المرحلة 6</span>
                </div>
                <h3 className="text-sm font-black text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors">
                  مشروع التخرج وملف الإنجاز
                </h3>
                <p className="text-[11px] text-[#1D1D1B]/80 leading-relaxed">
                  محاكاة الدورة المحاسبية الكاملة لمنشأة واقعية مع تقرير التقييم والشهادة المعتمدة.
                </p>
                <div className="flex items-center text-xs font-bold text-[#1D1D1B] gap-1 group-hover:gap-2 transition-all pt-1">
                  <span>فتح استوديو المشروع</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
