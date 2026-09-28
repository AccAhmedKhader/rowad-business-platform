import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, FileText, Layers, ShieldCheck, BookOpen, 
  Sparkles, Check, Download, Printer, Table, ArrowLeft, 
  Award, Eye, BarChart3, ChevronRight, CheckCheck
} from 'lucide-react';
import { 
  allUnitsAnalysisData, 
  masterCurriculumMatchingRows, 
  SupportedAnalysisUnitId 
} from '../data/masterCurriculumAnalysis';

interface MethodologyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUnitId?: SupportedAnalysisUnitId;
}

const UNIT_TABS_CONFIG: { id: SupportedAnalysisUnitId; num: number; title: string; pages: string }[] = [
  { id: 'unit-1', num: 1, title: 'الوحدة 1: المبادئ والمفاهيم', pages: 'ص 11 - 34' },
  { id: 'unit-2', num: 2, title: 'الوحدة 2: القيد المزدوج', pages: 'ص 35 - 78' },
  { id: 'unit-3', num: 3, title: 'الوحدة 3: الدفاتر المساعدة', pages: 'ص 59 - 88' },
  { id: 'unit-4', num: 4, title: 'الوحدة 4: ميزان المراجعة والأخطاء', pages: 'ص 89 - 120' },
  { id: 'unit-5', num: 5, title: 'الوحدة 5: القوائم الختامية والتسويات', pages: 'ص 116 - 155' },
  { id: 'unit-6', num: 6, title: 'الوحدة 6: السجلات غير المكتملة', pages: 'ص 161 - 208' },
  { id: 'unit-7', num: 7, title: 'الوحدة 7: الإهلاك والمخصصات', pages: 'ص 21 - 44' },
  { id: 'unit-8', num: 8, title: 'الوحدة 8: شركات الأشخاص والتضامن', pages: 'ص 1 - 65' },
  { id: 'unit-9', num: 9, title: 'الوحدة 9: شركات الأموال والمساهمة', pages: 'ص 1 - 78' },
  { id: 'unit-10', num: 10, title: 'الوحدة 10: تحليل القوائم المالية', pages: 'ص 93 - 172' }
];

export const MethodologyReportModal: React.FC<MethodologyReportModalProps> = ({ 
  isOpen, 
  onClose,
  initialUnitId = 'unit-1'
}) => {
  const [selectedUnit, setSelectedUnit] = useState<SupportedAnalysisUnitId>(initialUnitId);
  const [activeViewMode, setActiveViewMode] = useState<'unit_detail' | 'master_matrix'>('unit_detail');

  // Keep state in sync if initialUnitId changes when opened
  useEffect(() => {
    if (isOpen && initialUnitId) {
      setSelectedUnit(initialUnitId);
    }
  }, [isOpen, initialUnitId]);

  if (!isOpen) return null;

  const currentAnalysis = allUnitsAnalysisData[selectedUnit] || allUnitsAnalysisData['unit-1'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFFFF] max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl border-2 border-[#1D1D1B] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#1D1D1B] text-[#F9F7F2] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#C4A484]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C4A484] text-[#1D1D1B] font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold font-serif">
                  تقرير التحليل المنهجي وجدول المطابقة الرسمية (100%) لكامل المنهاج
                </h3>
                <span className="bg-[#C4A484] text-[#1D1D1B] text-[10px] font-black px-2 py-0.5 uppercase tracking-wider font-mono">
                  10 وحدات معتمدة 100%
                </span>
              </div>
              <p className="text-xs text-[#F9F7F2]/80 font-serif mt-0.5">
                توثيق أكاديمي وتحليلي شامل لمطابقة محتوى المنصة مع كتاب وزارة التربية والتعليم للبكالوريا المصرية
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#F9F7F2] text-xs font-bold transition flex items-center gap-1.5 font-serif cursor-pointer"
              title="طباعة التقرير الرسمي"
            >
              <Printer className="w-4 h-4 text-[#C4A484]" />
              <span className="hidden sm:inline">طباعة التقرير</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#F9F7F2] transition cursor-pointer"
              aria-label="إغلاق التقرير"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher + Overall Metric Bar */}
        <div className="bg-[#1D1D1B]/95 text-[#F9F7F2] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#C4A484]/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#C4A484] font-bold font-serif">نمط العرض:</span>
            <div className="inline-flex bg-[#FFFFFF]/10 p-0.5 border border-[#C4A484]/30">
              <button
                onClick={() => setActiveViewMode('unit_detail')}
                className={`px-3 py-1 font-serif text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeViewMode === 'unit_detail'
                    ? 'bg-[#C4A484] text-[#1D1D1B]'
                    : 'text-[#F9F7F2]/80 hover:text-[#F9F7F2]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>التحليل التفصيلي للوحدة ({selectedUnit.replace('unit-', 'وحدة ')})</span>
              </button>
              <button
                onClick={() => setActiveViewMode('master_matrix')}
                className={`px-3 py-1 font-serif text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeViewMode === 'master_matrix'
                    ? 'bg-[#C4A484] text-[#1D1D1B]'
                    : 'text-[#F9F7F2]/80 hover:text-[#F9F7F2]'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>جدول المطابقة الشامل (10 / 10 وحدات)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-serif">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCheck className="w-4 h-4" />
              <span>مطابقة الوزارة: 100% (58 درساً)</span>
            </span>
            <span className="text-[#F9F7F2]/40 hidden md:inline">|</span>
            <span className="text-[#F9F7F2]/80 hidden md:inline">
              10 دراسات حالة استدلال JRE • أكثر من 460 تدريباً
            </span>
          </div>
        </div>

        {/* 10-Unit Navigation Pills (Always accessible) */}
        <div className="bg-[#F9F7F2] border-b border-[#1D1D1B]/15 px-3 sm:px-4 py-2.5 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          <span className="text-xs font-bold text-[#1D1D1B] font-serif shrink-0 ml-1">
            الوحدات الدراسية:
          </span>
          {UNIT_TABS_CONFIG.map((tab) => {
            const isSelected = selectedUnit === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedUnit(tab.id);
                  setActiveViewMode('unit_detail');
                }}
                className={`px-2.5 py-1 text-xs font-serif font-bold transition border shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#1D1D1B]/80 hover:bg-[#F9F7F2] hover:text-[#1D1D1B] border-[#1D1D1B]/20'
                }`}
                title={`${tab.title} (${tab.pages})`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono font-bold ${
                  isSelected ? 'bg-[#C4A484] text-[#1D1D1B]' : 'bg-[#1D1D1B]/10 text-[#1D1D1B]'
                }`}>
                  {tab.num}
                </span>
                <span>وحدة {tab.num}</span>
                <span className="text-[10px] opacity-70 font-mono hidden lg:inline">
                  ({tab.pages.replace('ص ', '')})
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8 text-[#1D1D1B] text-sm">
          
          {/* =========================================================================
              VIEW MODE 1: MASTER CURRICULUM OVERVIEW MATRIX (ALL 10 UNITS AT ONCE)
             ========================================================================= */}
          {activeViewMode === 'master_matrix' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-serif">
                <div className="bg-[#F9F7F2] p-3.5 border-2 border-[#1D1D1B]">
                  <span className="text-[#1D1D1B]/60 block font-bold">الوحدات المغطاة:</span>
                  <strong className="text-[#1D1D1B] text-base sm:text-lg font-mono">10 / 10 وحدات</strong>
                  <span className="text-[11px] text-emerald-800 font-bold block mt-0.5">كامل المنهج المقرر</span>
                </div>
                <div className="bg-[#F9F7F2] p-3.5 border-2 border-[#1D1D1B]">
                  <span className="text-[#1D1D1B]/60 block font-bold">إجمالي الدروس الرسمية:</span>
                  <strong className="text-[#1D1D1B] text-base sm:text-lg font-mono">58 درساً مفصلاً</strong>
                  <span className="text-[11px] text-emerald-800 font-bold block mt-0.5">مطابقة صفحات الوزارة</span>
                </div>
                <div className="bg-[#F9F7F2] p-3.5 border-2 border-[#1D1D1B]">
                  <span className="text-[#1D1D1B]/60 block font-bold">مقالات الاستدلال JRE:</span>
                  <strong className="text-[#1D1D1B] text-base sm:text-lg font-mono">10 دراسات حالة</strong>
                  <span className="text-[11px] text-emerald-800 font-bold block mt-0.5">وفق سلم الـ 20 درجة</span>
                </div>
                <div className="bg-[#F9F7F2] p-3.5 border-2 border-[#1D1D1B]">
                  <span className="text-[#1D1D1B]/60 block font-bold">نسبة المطابقة والاعتماد:</span>
                  <strong className="text-emerald-800 text-base sm:text-lg font-mono">100% كاملة</strong>
                  <span className="text-[11px] text-emerald-800 font-bold block mt-0.5">صفر ثغرات أو محذوفات</span>
                </div>
              </div>

              {/* Master Matching Table */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-[#1D1D1B] text-base flex items-center gap-2 font-serif">
                    <Table className="w-5 h-5 text-[#C4A484]" />
                    <span>جدول المطابقة المنهجية الشامل لمنهاج المحاسبة المالية (الوحدات 1 إلى 10)</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-300">
                    مصفوفة الاعتماد الرسمية الكاملة
                  </span>
                </div>

                <div className="overflow-x-auto border-2 border-[#1D1D1B]">
                  <table className="w-full text-xs text-right border-collapse">
                    <thead className="bg-[#1D1D1B] text-[#F9F7F2] font-serif">
                      <tr>
                        <th className="p-3 border border-[#1D1D1B] font-bold w-12 text-center">#</th>
                        <th className="p-3 border border-[#1D1D1B] font-bold">الوحدة والموضوع المحاسبي</th>
                        <th className="p-3 border border-[#1D1D1B] font-bold">مرجع كتاب الوزارة والصفحات</th>
                        <th className="p-3 border border-[#1D1D1B] text-center font-bold w-20">الدروس</th>
                        <th className="p-3 border border-[#1D1D1B] font-bold">دراسة حالة الاستدلال JRE</th>
                        <th className="p-3 border border-[#1D1D1B] text-center font-bold w-24">التدريبات</th>
                        <th className="p-3 border border-[#1D1D1B] text-center font-bold w-28">نسبة المطابقة</th>
                        <th className="p-3 border border-[#1D1D1B] text-center font-bold w-24">فحص تفصيلي</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D1D1B]/15 font-serif">
                      {masterCurriculumMatchingRows.map((row) => (
                        <tr key={row.unitId} className="hover:bg-[#F9F7F2] transition">
                          <td className="p-3 border border-[#1D1D1B]/15 text-center font-bold font-mono text-sm bg-[#F9F7F2]">
                            {row.unitNum}
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 font-bold text-[#1D1D1B] leading-relaxed">
                            {row.unitName}
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-[#1D1D1B]/80 font-mono text-[11px]">
                            {row.sourceReference} • <strong className="text-[#1D1D1B]">{row.pages}</strong>
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-center font-bold font-mono text-sm">
                            {row.lessonsCount}
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-[#1D1D1B]/90 font-medium">
                            {row.jreCaseTitle}
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-center font-bold font-mono text-sm text-[#1D1D1B]">
                            {row.totalExercises}+
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-center">
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 font-bold text-[11px]">
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span>{row.matchingPercentage}</span>
                            </span>
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-center">
                            <button
                              onClick={() => {
                                setSelectedUnit(row.unitId);
                                setActiveViewMode('unit_detail');
                              }}
                              className="px-2 py-1 bg-[#1D1D1B] hover:bg-[#C4A484] hover:text-[#1D1D1B] text-[#F9F7F2] font-bold text-[11px] transition cursor-pointer"
                              title="عرض تفاصيل مطابقة هذه الوحدة"
                            >
                              عرض الوحدة
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Master Curriculum Architecture Overview */}
              <div className="bg-[#1D1D1B] text-[#F9F7F2] p-5 border border-[#1D1D1B] space-y-3 font-serif">
                <h4 className="font-bold text-[#C4A484] text-base flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>معايير الاعتماد والتوثيق الأكاديمي لمنظومة البكالوريا المصرية</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#F9F7F2]/90 leading-relaxed">
                  <div className="bg-[#FFFFFF]/5 p-3.5 border border-[#C4A484]/30 space-y-1">
                    <strong className="text-[#C4A484] block font-bold text-sm">1. تغطية كتاب الوزارة 100%</strong>
                    <p>
                      تم مسح ومطابقة كافة المصطلحات، القوانين، القيود الدفترية، والحالات الدراسية الواردة في جزأي كتاب الوزارة دون استبعاد أي موضوع أو ترحيله.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF]/5 p-3.5 border border-[#C4A484]/30 space-y-1">
                    <strong className="text-[#C4A484] block font-bold text-sm">2. معايير البكالوريا الدولية (IB)</strong>
                    <p>
                      تمت صياغة نواتج التعلم ومقالات الاستدلال وفق مستويات بلوم ومصفوفة قياس المعايير الدولية، مما يضمن تدريب الطالب على مهارات التفكير النقدي العليا.
                    </p>
                  </div>
                  <div className="bg-[#FFFFFF]/5 p-3.5 border border-[#C4A484]/30 space-y-1">
                    <strong className="text-[#C4A484] block font-bold text-sm">3. مقياس التحكيم الرسمي (JRE 20)</strong>
                    <p>
                      لكل وحدة دراسية مقال استدلال تحكيمي كامل مدعوم بسلم الـ 20 درجة (التأطير، الحجة، الحجة المقابلة، الموازنة، والتوصية الرشيدة).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW MODE 2: DETAILED ANALYSIS FOR SELECTED UNIT (1 TO 10)
             ========================================================================= */}
          {activeViewMode === 'unit_detail' && (
            <div className="space-y-8">
              {/* Section 1: Official Data Card */}
              <div className="bg-[#F9F7F2] border-2 border-[#1D1D1B] p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-[#1D1D1B] text-base flex items-center gap-2 font-serif">
                    <ShieldCheck className="w-5 h-5 text-[#C4A484]" />
                    <span>1. بطاقة البيانات الرسمية والمصدر المعتمد</span>
                  </h4>
                  <button
                    onClick={() => setActiveViewMode('master_matrix')}
                    className="text-xs text-[#1D1D1B] hover:text-[#C4A484] font-bold font-serif flex items-center gap-1 cursor-pointer"
                  >
                    <span>عرض جدول كافة الوحدات (1 - 10)</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-serif">
                  <div className="bg-[#FFFFFF] p-3 border border-[#1D1D1B]/15">
                    <span className="text-[#1D1D1B]/60 block font-bold">اسم الوحدة:</span>
                    <strong className="text-[#1D1D1B] text-sm">{currentAnalysis.unitName}</strong>
                  </div>
                  <div className="bg-[#FFFFFF] p-3 border border-[#1D1D1B]/15">
                    <span className="text-[#1D1D1B]/60 block font-bold">المصدر المعتمد:</span>
                    <strong className="text-[#1D1D1B]">{currentAnalysis.sourceReference}</strong>
                  </div>
                  <div className="bg-[#FFFFFF] p-3 border border-[#1D1D1B]/15">
                    <span className="text-[#1D1D1B]/60 block font-bold">المستوى الدراسي:</span>
                    <strong className="text-[#1D1D1B]">{currentAnalysis.gradeLevel}</strong>
                  </div>
                  <div className="bg-[#FFFFFF] p-3 border border-[#1D1D1B]/15">
                    <span className="text-[#1D1D1B]/60 block font-bold">عدد الدروس المعتمدة:</span>
                    <strong className="text-[#1D1D1B]">{currentAnalysis.lessonsCount} دروس تفصيلية متدرجة</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Detailed Lessons Analysis */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#1D1D1B] text-base flex items-center gap-2 font-serif">
                  <Layers className="w-5 h-5 text-[#C4A484]" />
                  <span>2. التحليل المنهجي لدروس {currentAnalysis.unitName.split(':')[0]} (المفاهيم، المهارات، ونواتج التعلم)</span>
                </h4>
                <div className="space-y-4">
                  {currentAnalysis.lessons.map((lesson) => (
                    <div key={lesson.lessonNumber} className="border border-[#1D1D1B]/20 p-4 bg-[#FFFFFF] hover:border-[#1D1D1B] transition space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#1D1D1B]/10">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] text-xs font-bold flex items-center justify-center font-serif">
                            {lesson.lessonNumber}
                          </span>
                          <span className="font-bold text-sm text-[#1D1D1B] font-serif">
                            الدرس {lesson.lessonNumber}: {lesson.title}
                          </span>
                        </div>
                        <span className="text-xs bg-[#F9F7F2] text-[#1D1D1B] border border-[#1D1D1B]/20 px-2.5 py-0.5 font-mono font-bold">
                          كتاب الوزارة: {lesson.sourcePages}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
                        <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 space-y-1.5">
                          <span className="font-bold text-[#1D1D1B] block">المفاهيم الأساسية المستهدفة:</span>
                          <ul className="list-disc list-inside space-y-1 text-[#1D1D1B]/80 leading-relaxed">
                            {lesson.coreConcepts.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        </div>
                        <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10 space-y-1.5">
                          <span className="font-bold text-[#1D1D1B] block">نواتج التعلم المحددة:</span>
                          <ul className="list-disc list-inside space-y-1 text-[#1D1D1B]/80 leading-relaxed">
                            {lesson.targetLearningOutcomes.map((o, i) => <li key={i}>{o}</li>)}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1D1D1B]/10 text-[11px] text-[#1D1D1B]/70 font-serif">
                        <div>
                          <strong>المهارات المكتسبة:</strong> {lesson.acquiredSkills.join(' • ')}
                        </div>
                        <div>
                          <strong>مستوى الصعوبة:</strong> <span className="font-bold text-[#1D1D1B]">{lesson.difficultyLevel}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Relational Map */}
              <div className="bg-[#1D1D1B] text-[#F9F7F2] p-5 border border-[#1D1D1B] space-y-2">
                <h4 className="font-bold text-[#C4A484] text-base flex items-center gap-2 font-serif">
                  <Sparkles className="w-5 h-5" />
                  <span>3. خريطة العلاقة المنطقية بين موضوعات الوحدة</span>
                </h4>
                <p className="text-xs text-[#F9F7F2]/90 leading-relaxed font-serif">
                  {currentAnalysis.relationalMapDescription}
                </p>
              </div>

              {/* Section 4: Unit External Architecture & Tools */}
              {currentAnalysis.externalBookArchitecture && (
                <div className="space-y-3">
                  <h4 className="font-bold text-[#1D1D1B] text-base flex items-center gap-2 font-serif">
                    <BookOpen className="w-5 h-5 text-[#C4A484]" />
                    <span>4. المعمارية المنهجية الخارجية وأدوات التعلم التفاعلي</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif">
                    {currentAnalysis.externalBookArchitecture.map((sec, idx) => (
                      <div key={idx} className="bg-[#FFFFFF] p-3.5 border border-[#1D1D1B]/15 space-y-1 hover:border-[#1D1D1B] transition">
                        <strong className="text-[#1D1D1B] block font-bold text-sm">{sec.section}</strong>
                        <p className="text-[#1D1D1B]/80 leading-relaxed">{sec.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 5: 100% Content Matching Table for this Unit */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-[#1D1D1B] text-base flex items-center gap-2 font-serif">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>5. جدول مطابقة الكتاب الخارجي والمنصة مع كتاب الوزارة الرسمي (تغطية 100% معتمدة)</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                    جميع موضوعات الوحدة مطابقة 100%
                  </span>
                </div>

                <div className="overflow-x-auto border-2 border-[#1D1D1B]">
                  <table className="w-full text-xs text-right border-collapse">
                    <thead className="bg-[#1D1D1B] text-[#F9F7F2] font-serif">
                      <tr>
                        <th className="p-3 border border-[#1D1D1B] font-bold">عنصر كتاب الوزارة الرسمي</th>
                        <th className="p-3 border border-[#1D1D1B] font-bold">تواجده في الكتاب الخارجي والمنصة</th>
                        <th className="p-3 border border-[#1D1D1B] font-bold">مكان الشرح والتطبيق</th>
                        <th className="p-3 border border-[#1D1D1B] text-center font-bold w-28">عدد التدريبات</th>
                        <th className="p-3 border border-[#1D1D1B] text-center font-bold w-32">حالة التحقق</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D1D1B]/15 font-serif">
                      {currentAnalysis.contentMatchingMatrix.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#F9F7F2] transition">
                          <td className="p-3 border border-[#1D1D1B]/15 font-bold text-[#1D1D1B] leading-relaxed">
                            {item.sourceElement}
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-emerald-900 bg-emerald-50/50 font-medium">
                            {item.foundInExternalBook}
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-[#1D1D1B]/80 font-mono text-[11px]">
                            {item.bookSection}
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-center font-bold font-mono text-sm text-[#1D1D1B]">
                            {item.exercisesCount}+
                          </td>
                          <td className="p-3 border border-[#1D1D1B]/15 text-center">
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 font-bold text-[11px]">
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{item.verificationStatus}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F9F7F2] border-t-2 border-[#1D1D1B] p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#1D1D1B]/80 font-serif flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
            <span className="font-bold">
              معتمد وموثق بنسبة 100% وفق المنهج الرسمي لوزارة التربية والتعليم المصرية (كافة الوحدات العشر)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveViewMode(activeViewMode === 'master_matrix' ? 'unit_detail' : 'master_matrix')}
              className="px-4 py-2 bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] border border-[#1D1D1B]/30 text-xs font-bold transition font-serif cursor-pointer"
            >
              {activeViewMode === 'master_matrix' ? 'التحول للتفاصيل الفردية' : 'التحول للجدول الشامل'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#1D1D1B] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition font-serif cursor-pointer"
            >
              إغلاق التقرير والعودة للمنصة
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
