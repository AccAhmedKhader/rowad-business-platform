import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, BookOpen, Filter, Search, Award, 
  Sparkles, CheckCircle2, AlertCircle, ChevronDown, ChevronUp,
  Download, Printer, FileText, ArrowRight, Layers
} from 'lucide-react';
import { masterWeeklyPacing, WeeklyPacingItem } from '../../data/teacherPedagogyData';

interface WeeklyCurriculumPacingViewProps {
  onSelectLesson?: (lessonId: string) => void;
  isPrintMode?: boolean;
}

export const WeeklyCurriculumPacingView: React.FC<WeeklyCurriculumPacingViewProps> = ({
  onSelectLesson,
  isPrintMode = false
}) => {
  const [selectedSemester, setSelectedSemester] = useState<'ALL' | 'الفصل الدراسي الأول' | 'الفصل الدراسي الثاني'>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const months = useMemo(() => {
    const list = Array.from(new Set(masterWeeklyPacing.map(p => p.month)));
    return list;
  }, []);

  const filteredPacing = useMemo(() => {
    return masterWeeklyPacing.filter(item => {
      const matchSemester = selectedSemester === 'ALL' || item.semester === selectedSemester;
      const matchMonth = selectedMonth === 'ALL' || item.month === selectedMonth;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        item.lessonTitle.toLowerCase().includes(q) ||
        item.unitTitle.toLowerCase().includes(q) ||
        item.focalConcept.toLowerCase().includes(q) ||
        item.recommendedStrategy.toLowerCase().includes(q) ||
        item.assessmentMilestone.toLowerCase().includes(q);

      return matchSemester && matchMonth && matchSearch;
    });
  }, [selectedSemester, selectedMonth, searchQuery]);

  return (
    <div className={`space-y-6 ${isPrintMode ? 'p-0 text-xs' : 'font-serif'}`}>
      {/* Header Banner */}
      <div className="bg-[#1E3A8A] text-[#F9F7F2] p-5 sm:p-6 border-b-4 border-[#C5A059] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-300" />
              <span className="text-xs uppercase font-mono tracking-widest text-[#C4A484] font-bold">
                TEACHER PACING & SYLLABUS DISTRIBUTION
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif">
              خريطة توزيع المنهج الزمني بالأسابيع (32 أسبوعاً دراسياً)
            </h2>
            <p className="text-xs sm:text-sm text-[#F9F7F2]/80 max-w-2xl font-sans">
              التوزيع الأكاديمي المعتمد لشهادة البكالوريا المصرية (EB) — يشمل الحصص الأسبوعية، نواتج التعلم، نقاط تركيز المعلم، الأساليب التدريسية، والأداءات الوزارية.
            </p>
          </div>

          <div className="bg-[#FFFFFF]/10 border border-white/20 p-3 text-center sm:text-right shrink-0">
            <span className="text-[11px] text-amber-300 font-bold block">إجمالي زمن التدريس</span>
            <span className="text-xl font-bold font-mono text-white">128 حصة • 5,760 دقيقة</span>
            <span className="text-[10px] text-white/70 block mt-0.5">بواقع 4 حصص أسبوعياً</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Hidden during actual print) */}
      {!isPrintMode && (
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Semester Tabs */}
            <div className="flex items-center gap-1 bg-[#F9F7F2] p-1 border border-[#1D1D1B]/20">
              <button
                onClick={() => setSelectedSemester('ALL')}
                className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedSemester === 'ALL'
                    ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                    : 'text-[#1D1D1B]/70 hover:text-[#1D1D1B]'
                }`}
              >
                العام كاملاً (32 أسبوعاً)
              </button>
              <button
                onClick={() => setSelectedSemester('الفصل الدراسي الأول')}
                className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedSemester === 'الفصل الدراسي الأول'
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-[#1D1D1B]/70 hover:text-[#1D1D1B]'
                }`}
              >
                الفصل الدراسي الأول (الوحدات 1 - 5)
              </button>
              <button
                onClick={() => setSelectedSemester('الفصل الدراسي الثاني')}
                className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedSemester === 'الفصل الدراسي الثاني'
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-[#1D1D1B]/70 hover:text-[#1D1D1B]'
                }`}
              >
                الفصل الدراسي الثاني (الوحدات 6 - 10)
              </button>
            </div>

            {/* Month Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[#1D1D1B]/70">تصفية بالشهر:</label>
              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="bg-[#F9F7F2] border border-[#1D1D1B]/30 px-3 py-1.5 text-xs font-bold text-[#1D1D1B] focus:outline-none"
              >
                <option value="ALL">جميع الشهور</option>
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#1D1D1B]/40 absolute right-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث في الدروس أو الأساليب..."
                className="w-full pl-3 pr-8 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/30 text-xs text-[#1D1D1B] placeholder:text-[#1D1D1B]/40 focus:outline-none focus:border-[#1D1D1B]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Weekly Table (Publication & Screen Ready) */}
      <div className="overflow-x-auto border-2 border-[#1D1D1B] shadow-2xs bg-[#FFFFFF]">
        <table className="w-full text-right border-collapse text-xs sm:text-sm">
          <thead className="bg-[#1D1D1B] text-[#F9F7F2] font-serif font-bold">
            <tr>
              <th className="p-3 border-l border-white/20 text-center w-16">الأسبوع</th>
              <th className="p-3 border-l border-white/20 text-center w-20">الشهر</th>
              <th className="p-3 border-l border-white/20 w-1/4">الوحدة والدرس المقرر</th>
              <th className="p-3 border-l border-white/20 text-center w-20">الحصص</th>
              <th className="p-3 border-l border-white/20 w-1/4">محور تركيز المعلم (يركز على إيه؟)</th>
              <th className="p-3 border-l border-white/20">أسلوب واستراتيجية التدريس المقترحة</th>
              <th className="p-3 text-center w-36">الأداء الوزاري وكتاب الطالب</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D1D1B]/15">
            {filteredPacing.map((item, idx) => {
              const isExpanded = expandedWeek === item.weekNumber;
              const isReviewWeek = item.weekNumber === 16 || item.weekNumber === 28 || item.weekNumber >= 29;

              return (
                <React.Fragment key={item.weekNumber}>
                  <tr 
                    className={`transition-colors cursor-pointer ${
                      isReviewWeek 
                        ? 'bg-[#FEF3C7]/40 hover:bg-[#FEF3C7]' 
                        : idx % 2 === 1 
                          ? 'bg-[#FAF8F5] hover:bg-[#F3EFE6]' 
                          : 'bg-[#FFFFFF] hover:bg-[#F3EFE6]'
                    }`}
                    onClick={() => setExpandedWeek(isExpanded ? null : item.weekNumber)}
                  >
                    {/* Week Number */}
                    <td className="p-3 border-l border-[#1D1D1B]/10 text-center font-mono font-bold bg-[#1D1D1B]/5">
                      <span className="block text-sm font-black text-[#1E3A8A]">
                        {item.weekNumber}
                      </span>
                      <span className="text-[10px] text-[#1D1D1B]/60">
                        {item.weekNumber <= 16 ? 'فصل 1' : 'فصل 2'}
                      </span>
                    </td>

                    {/* Month */}
                    <td className="p-3 border-l border-[#1D1D1B]/10 text-center font-bold text-[#1D1D1B]">
                      {item.month}
                    </td>

                    {/* Unit & Lesson */}
                    <td className="p-3 border-l border-[#1D1D1B]/10 space-y-1">
                      <span className="text-[10px] font-bold text-[#8A1F1D] block">
                        {item.unitTitle}
                      </span>
                      <div className="font-bold text-[#1D1D1B] leading-snug">
                        {item.lessonTitle}
                      </div>
                      <div className="text-[11px] text-[#1D1D1B]/70 flex flex-wrap gap-1 pt-0.5">
                        {item.targetLOs.map((lo, i) => (
                          <span key={i} className="bg-[#1E3A8A]/10 text-[#1E3A8A] px-1.5 py-0.2 rounded-xs font-mono text-[10px]">
                            {lo}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Periods */}
                    <td className="p-3 border-l border-[#1D1D1B]/10 text-center font-mono font-bold">
                      <span className="text-sm text-[#1D1D1B]">{item.periodsCount} حصص</span>
                      <span className="block text-[10px] text-[#1D1D1B]/60">{item.totalMinutes} د</span>
                    </td>

                    {/* Focal Concept */}
                    <td className="p-3 border-l border-[#1D1D1B]/10 leading-relaxed font-sans text-xs">
                      <strong className="text-[#0C1E36] block mb-0.5 font-serif">🎯 التركيز الجوهري:</strong>
                      <span className="text-[#1D1D1B]/90">{item.focalConcept}</span>
                    </td>

                    {/* Teaching Method */}
                    <td className="p-3 border-l border-[#1D1D1B]/10 leading-relaxed font-sans text-xs space-y-1">
                      <strong className="text-[#1E3A8A] block font-serif">🛠️ الأسلوب النشط:</strong>
                      <span className="text-[#1D1D1B]/85">{item.recommendedStrategy}</span>
                      {!isPrintMode && (
                        <div className="pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectLesson) onSelectLesson(item.lessonId);
                            }}
                            className="text-[11px] text-[#1E3A8A] font-bold hover:underline inline-flex items-center gap-1"
                          >
                            <span>عرض الخطة التفصيلية للدرس</span>
                            <ArrowRight className="w-3 h-3 rotate-180" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Assessment & Pages */}
                    <td className="p-3 text-center space-y-1">
                      <span className="inline-block bg-[#8A1F1D]/10 text-[#8A1F1D] text-[11px] font-bold px-2 py-0.5 border border-[#8A1F1D]/20">
                        {item.assessmentMilestone}
                      </span>
                      <span className="block font-mono text-[10px] text-[#1D1D1B]/60">
                        {item.textbookPageRef}
                      </span>
                    </td>
                  </tr>

                  {/* Expanded Weekly Drawer */}
                  {isExpanded && !isPrintMode && (
                    <tr className="bg-[#EFF6FF] border-b-2 border-[#1E3A8A]">
                      <td colSpan={7} className="p-4 sm:p-5 text-right space-y-3 font-sans">
                        <div className="flex items-center justify-between border-b border-[#1E3A8A]/20 pb-2">
                          <span className="font-bold text-[#1E3A8A] text-sm font-serif flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#C5A059]" />
                            <span>توجيهات التوجيه الفني المركزي للأسبوع {item.weekNumber} — {item.lessonTitle}</span>
                          </span>
                          <span className="text-xs font-mono text-[#1E3A8A]">مرجع كتاب الوزارة: {item.textbookPageRef}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="bg-white p-3 border border-[#1E3A8A]/20 shadow-2xs space-y-1">
                            <strong className="text-[#1E3A8A] font-bold font-serif block">📌 المهام الميدانية للمعلم:</strong>
                            <p className="text-[#1D1D1B]/80 leading-relaxed">
                              التأكد من إشراك كافة الطلاب في التدريب الصفي الموجه، وعدم الانتقال للدرس التالي إلا بعد إتقان نواتج التعلم الأساسية بمعدل إتقان صفي 80% على الأقل.
                            </p>
                          </div>
                          <div className="bg-white p-3 border border-[#1E3A8A]/20 shadow-2xs space-y-1">
                            <strong className="text-[#8A1F1D] font-bold font-serif block">⚠️ الفخ المحتمل للطلاب:</strong>
                            <p className="text-[#1D1D1B]/80 leading-relaxed">
                              خلط الطلاب بين الدورة المستندية والترحيل الدفتري، والاعتماد على حفظ أشكال القيود بدلاً من تحليل المديونية والدائنية وفق طبيعة الحساب.
                            </p>
                          </div>
                          <div className="bg-white p-3 border border-[#1E3A8A]/20 shadow-2xs space-y-1">
                            <strong className="text-[#14532D] font-bold font-serif block">📝 الواجب والتقييم الأسبوعي:</strong>
                            <p className="text-[#1D1D1B]/80 leading-relaxed">
                              تطبيق التقييم الأسبوعي بنماذجه الثلاثة (أ، ب، ج) ورصد الدرجات في دفتر أعمال السنة، وتخصيص ربع ساعة علاجية للطلاب المتعثرين.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Notes for the Pacing Guide */}
      <div className="bg-[#FAF8F5] border border-[#1D1D1B]/20 p-4 text-xs text-[#1D1D1B]/80 leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <strong className="text-[#1D1D1B] font-bold">تعليمات التوجيه الفني العام للتربية والتعليم (2025 / 2026):</strong>
          <span className="block mt-0.5">
            يُراعى تخصيص 15 دقيقة أسبوعياً لمعالجة المفاهيم البديلة وصعوبات التعلم، ويُحظر تجاوز الأسابيع الزمنية المخصصة لكل وحدة لضمان إتمام المنهاج قبل موعد المحاكاة الرسمية.
          </span>
        </div>
        <div className="font-mono text-[11px] text-[#1E3A8A] font-bold shrink-0">
          اعتماد رسمي: التوجيه العام للمحاسبة
        </div>
      </div>
    </div>
  );
};
