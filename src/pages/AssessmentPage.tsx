import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Layers, Award, ArrowLeft, BookOpen, CheckCircle2, Filter, X, FileText } from 'lucide-react';
import { QuestionBankViewer } from '../components/QuestionBankViewer';
import { UnitReviewViewer } from '../components/UnitReviewViewer';
import { ExamSimulator } from '../components/ExamSimulator';
import { MinistryAssessmentsViewer } from '../components/MinistryAssessmentsViewer';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';

export const AssessmentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const {
    selectedUnitId: globalUnitId,
    selectedLessonId: globalLessonId,
    clearFilters: clearGlobalFilters,
    isSidebarCollapsed
  } = useCurriculumFilter();

  const activeSubTab = path.includes('/ministry-assessments')
    ? 'ministry'
    : path.includes('/question-bank')
    ? 'qbank'
    : path.includes('/unit-tests')
    ? 'tests'
    : path.includes('/mock-exams')
    ? 'exams'
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
              <span className="text-[#C4A484] font-bold">تصفية التقييم والأسئلة بحسب القائمة الجانبية:</span>
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
            <span>عرض كل أسئلة المنهج</span>
          </button>
        </div>
      )}

      {/* Subnavigation Bar */}
      <div className="bg-white border-2 border-[#1D1D1B] p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#1D1D1B] text-[#C4A484] text-xs font-bold px-2.5 py-1">
            منظومة التقويم والقياس المعياري
          </span>
          <span className="text-xs text-[#1D1D1B]/70 font-bold hidden sm:inline">
            المراجعات والتقييمات وبنك الأسئلة ونماذج الامتحانات المحاكية
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* 1. أولاً: المراجعة */}
          <NavLink
            to="/assessment/unit-tests"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'tests'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Layers className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>المراجعة (المراجعات التركيبية الشاملة)</span>
          </NavLink>

          {/* 2. ثانياً: التقييمات */}
          <NavLink
            to="/assessment/ministry-assessments"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'ministry'
                  ? 'bg-[#8A1F1D] text-white border-2 border-[#8A1F1D]'
                  : 'bg-[#FFF5F5] text-[#8A1F1D] hover:bg-[#8A1F1D]/10 border border-[#8A1F1D]/30'
              }`
            }
          >
            <FileText className="w-3.5 h-3.5 text-rose-300" />
            <span>التقييمات (الأداءات والتقييمات المدرسية المعتمدة)</span>
          </NavLink>

          {/* 3. ثالثاً: بنك الأسئلة */}
          <NavLink
            to="/assessment/question-bank"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'qbank'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>بنك الأسئلة (بنك الأسئلة الشامل)</span>
          </NavLink>

          {/* 4. رابعاً: الامتحانات */}
          <NavLink
            to="/assessment/mock-exams"
            className={({ isActive }) => 
              `px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive || activeSubTab === 'exams'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Award className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>الامتحانات (الامتحانات المحاكية الرسمية)</span>
          </NavLink>
        </div>
      </div>

      {/* Render Component based on Sub-Route */}
      {activeSubTab === 'tests' && <UnitReviewViewer />}

      {activeSubTab === 'ministry' && <MinistryAssessmentsViewer />}

      {activeSubTab === 'qbank' && <QuestionBankViewer />}

      {activeSubTab === 'exams' && <ExamSimulator />}

      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#1D1D1B]">
                منظومة التقويم والتحقق المعياري (100% تغطية)
              </h2>
              <p className="text-sm text-[#1D1D1B]/70 leading-relaxed">
                تتكامل عناصر التقويم بترتيب منهجي متدرج (المراجعة، التقييمات، بنك الأسئلة، الامتحانات) لضمان قياس الفهم العميق والقدرة على حل المشكلات المحاسبية بدقة وموضوعية.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {/* 1. المراجعة */}
              <div 
                onClick={() => navigate('/assessment/unit-tests')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-5 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="w-9 h-9 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors">
                    1. المراجعة الشاملة
                  </h3>
                  <span className="text-[10px] font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">أولاً</span>
                </div>
                <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
                  دراسات حالة مركبة، خرائط ذهنية، أسئلة الصواب والخطأ التفسيرية، ومراجعات المفاهيم والروابط المحاسبية.
                </p>
                <div className="flex items-center text-xs font-bold text-[#1D1D1B] gap-1 group-hover:gap-2 transition-all">
                  <span>فتح المراجعات</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 2. التقييمات */}
              <div 
                onClick={() => navigate('/assessment/ministry-assessments')}
                className="bg-[#FFFDF7] border-2 border-[#8A1F1D] p-5 space-y-3 hover:bg-[#FFF5F5] transition cursor-pointer group shadow-2xs"
              >
                <div className="w-9 h-9 bg-[#8A1F1D] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#8A1F1D]">
                    2. التقييمات والأداءات
                  </h3>
                  <span className="text-[10px] font-bold bg-[#8A1F1D] text-white px-1.5 py-0.5">ثانياً</span>
                </div>
                <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
                  تفريغ شامل لكافة الأنشطة الصفية والواجبات والتقييمات الأسبوعية وتدريبات الشهر (ص۳-۸٤ • الوحدات ۱ إلى ٥).
                </p>
                <div className="flex items-center text-xs font-bold text-[#8A1F1D] gap-1 group-hover:gap-2 transition-all">
                  <span>فتح بنك التقييمات والأداءات</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 3. بنك الأسئلة */}
              <div 
                onClick={() => navigate('/assessment/question-bank')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-5 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="w-9 h-9 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors">
                    3. بنك الأسئلة المعتمد
                  </h3>
                  <span className="text-[10px] font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">ثالثاً</span>
                </div>
                <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
                  أسئلة مقننة معيارياً تغطي مستويات بلوم الستة لكافة وحدات المنهج (1 إلى 10) مع تصحيح فوري وتبرير محاسبي.
                </p>
                <div className="flex items-center text-xs font-bold text-[#1D1D1B] gap-1 group-hover:gap-2 transition-all">
                  <span>فتح بنك الأسئلة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 4. الامتحانات */}
              <div 
                onClick={() => navigate('/assessment/mock-exams')}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-5 space-y-3 hover:border-[#1D1D1B] transition cursor-pointer group"
              >
                <div className="w-9 h-9 bg-[#8A1F1D] text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors">
                    4. الامتحانات المحاكية
                  </h3>
                  <span className="text-[10px] font-bold bg-[#8A1F1D] text-white px-1.5 py-0.5">رابعاً</span>
                </div>
                <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
                  نماذج امتحانات شاملة مطابقة لمواصفات الورقة الامتحانية الرسمية للوزارة مع نظام مؤقت ومؤشرات تفصيلية.
                </p>
                <div className="flex items-center text-xs font-bold text-[#1D1D1B] gap-1 group-hover:gap-2 transition-all">
                  <span>دخول الامتحانات</span>
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
