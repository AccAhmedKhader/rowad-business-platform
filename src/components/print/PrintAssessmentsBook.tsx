import React from 'react';
import { 
  Award, BookOpen, CheckCircle2, ShieldCheck, Sparkles, 
  Layers, Scale, Target, HelpCircle, FileText, Check, AlertCircle
} from 'lucide-react';
import { ALL_MINISTRY_ASSESSMENTS, MinistryAssessmentItem } from '../../data/ministryAssessmentsData';

interface PrintAssessmentsBookProps {
  selectedUnitId?: string; // 'all' or 'unit-1', etc.
  showSolutions?: boolean;
}

export const PrintAssessmentsBook: React.FC<PrintAssessmentsBookProps> = ({
  selectedUnitId = 'all',
  showSolutions = true
}) => {
  // Filter items based on selected unit
  const filteredItems = ALL_MINISTRY_ASSESSMENTS.filter((item) => {
    if (!selectedUnitId || selectedUnitId === 'all') return true;
    return item.official_unit_id === selectedUnitId;
  });

  // Group items by official unit
  const unitGroups: { unitId: string; unitTitle: string; items: MinistryAssessmentItem[] }[] = [];
  
  const unitOrder = ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5'];
  
  unitOrder.forEach((uId) => {
    const unitItems = filteredItems.filter((i) => i.official_unit_id === uId);
    if (unitItems.length > 0) {
      const unitTitle = unitItems[0].official_unit || `الوحدة ${uId.replace('unit-', '')}`;
      unitGroups.push({
        unitId: uId,
        unitTitle,
        items: unitItems
      });
    }
  });

  // Include any other units that might not match unit-1 to unit-5
  const otherItems = filteredItems.filter((i) => !unitOrder.includes(i.official_unit_id));
  if (otherItems.length > 0) {
    const otherUnits = Array.from(new Set(otherItems.map(i => i.official_unit_id)));
    otherUnits.forEach((uId) => {
      const uItems = otherItems.filter(i => i.official_unit_id === uId);
      unitGroups.push({
        unitId: uId,
        unitTitle: uItems[0]?.official_unit || uId,
        items: uItems
      });
    });
  }

  return (
    <div className="space-y-12">
      {/* 1. Grand Book Opening Header */}
      <div className="border-4 border-[#0C1E36] bg-[#FAF8F5] p-6 sm:p-8 space-y-4 shadow-sm text-center">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#C5A059] pb-3 text-xs sm:text-sm font-bold font-serif text-[#0C1E36]">
          <span>جمهورية مصر العربية — وزارة التربية والتعليم والتعليم الفني</span>
          <span className="font-mono text-[#8A5D00]">MINISTRY ACCREDITED ASSESSMENTS BOOK</span>
          <span>شهادة البكالوريا المصرية (EB) 2026/2027</span>
        </div>

        <div className="py-2 space-y-2">
          <span className="inline-block px-4 py-1 bg-[#0C1E36] text-[#C5A059] text-xs font-mono font-bold tracking-widest uppercase">
            الكتاب المدرسي المعتمد للأداءات والتقييمات — ص ۳ إلى ص ٨٤
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#0C1E36] leading-tight">
            كتاب الأداءات والتقييمات المدرسية المعتمدة
          </h2>
          <p className="text-sm sm:text-base text-[#781D28] font-bold max-w-3xl mx-auto leading-relaxed">
            التفريغ الرسمي الشامل لكافة الأنشطة الصفية، الواجبات المنزلية، والتقييمات الأسبوعية الثلاثية (أ، ب، ج) واختبارات الشهور، موثقة بنواتج التعلم الوزارية ومفاتيح الحلول الدقيقة.
          </p>
        </div>

        {/* Statistical Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#0C1E36]/15 text-xs sm:text-sm font-bold">
          <div className="bg-[#FFFFFF] p-2.5 border border-[#0C1E36]/20 space-y-0.5">
            <span className="text-[#8A5D00] block text-[11px] font-mono">إجمالي المفردات:</span>
            <span className="text-lg text-[#0C1E36] font-black">{filteredItems.length} مفردة معتمدة</span>
          </div>
          <div className="bg-[#FFFFFF] p-2.5 border border-[#0C1E36]/20 space-y-0.5">
            <span className="text-[#8A5D00] block text-[11px] font-mono">نطاق الصفحات:</span>
            <span className="text-lg text-[#0C1E36] font-black">ص ۳ إلى ص ٨٤</span>
          </div>
          <div className="bg-[#FFFFFF] p-2.5 border border-[#0C1E36]/20 space-y-0.5">
            <span className="text-[#8A5D00] block text-[11px] font-mono">تغطية الوحدات:</span>
            <span className="text-lg text-[#0C1E36] font-black">الوحدات 1 إلى 5 كاملة</span>
          </div>
          <div className="bg-[#FFFFFF] p-2.5 border border-[#0C1E36]/20 space-y-0.5">
            <span className="text-[#8A5D00] block text-[11px] font-mono">حالة الحلول:</span>
            <span className="text-lg text-[#14532D] font-black">
              {showSolutions ? 'مرفق نماذج الإجابة والسلالم' : 'نسخة الطالب (تدريب بدون حلول)'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Units Loop */}
      {unitGroups.map(({ unitId, unitTitle, items }) => (
        <section key={unitId} className="space-y-8 page-break-after">
          
          {/* Unit Separator Header */}
          <div className="border-4 border-[#0C1E36] bg-[#FAF8F5] p-6 sm:p-8 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b-2 border-[#C5A059] pb-2 text-xs font-mono">
              <span className="bg-[#0C1E36] text-[#C5A059] px-3 py-1 font-bold">
                {unitId.toUpperCase()} • تفريغ كتاب الأداءات المعتمد
              </span>
              <span className="text-[#781D28] font-bold">
                عدد المفردات بالوحدة: {items.length} مفرداً
              </span>
            </div>

            <div className="py-2">
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#0C1E36] leading-snug">
                {unitTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/80 mt-1">
                تغطي الأنشطة الصفية والمهام الأدائية والتقييمات الأسبوعية المرتبطة بهذه الوحدة طبقاً لكتاب الوزارة.
              </p>
            </div>
          </div>

          {/* Assessment Items Grid */}
          <div className="space-y-6">
            {items.map((item, idx) => {
              const isMCQ = item.options && item.options.length > 0;
              const hasTable = item.tables && item.tables.rows && item.tables.rows.length > 0;

              return (
                <article 
                  key={item.question_id || idx}
                  className="p-5 sm:p-6 bg-[#FFFFFF] border-2 border-[#0C1E36]/30 shadow-xs space-y-4 page-break-inside-avoid"
                >
                  {/* Item Meta Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FAF8F5] p-2.5 border-r-4 border-[#C5A059] text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold px-2 py-0.5 bg-[#0C1E36] text-[#FFFFFF]">
                        {item.question_id}
                      </span>
                      <span className="px-2 py-0.5 bg-[#781D28] text-[#FFFFFF] font-bold">
                        كتاب الوزارة ص {item.source_page}
                      </span>
                      <span className={`px-2 py-0.5 font-bold ${
                        item.source_type === 'أدائي' 
                          ? 'bg-[#E0F2FE] text-[#0369A1] border border-[#0369A1]/30' 
                          : 'bg-[#FEF3C7] text-[#92400E] border border-[#92400E]/30'
                      }`}>
                        {item.source_type === 'أدائي' ? 'أداء صفي / منزلي' : 'تقييم أسبوعي'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-sans text-[11px] text-[#1D1D1B]/80">
                      {item.week && item.week !== 'غير مذكور صراحة' && (
                        <span className="bg-[#FFFFFF] px-2 py-0.5 border border-[#0C1E36]/20 font-bold">
                          الأسبوع: {item.week}
                        </span>
                      )}
                      {item.period && (
                        <span className="bg-[#FFFFFF] px-2 py-0.5 border border-[#0C1E36]/20">
                          {item.period}
                        </span>
                      )}
                      <span className="bg-[#FFFFFF] px-2 py-0.5 border border-[#0C1E36]/20 font-bold text-[#781D28]">
                        بلوم: {item.bloom || 'تطبيق'}
                      </span>
                      <span className="bg-[#FFFFFF] px-2 py-0.5 border border-[#0C1E36]/20 font-bold text-[#0F4C5C]">
                        الصعوبة: {item.difficulty || 'متوسط'}
                      </span>
                    </div>
                  </div>

                  {/* Context & Lesson Subtitle */}
                  {(item.official_lesson || item.official_concept) && (
                    <div className="text-xs text-[#0C1E36]/75 font-sans flex flex-wrap items-center gap-2 border-b border-[#0C1E36]/10 pb-2">
                      {item.official_lesson && <span>الدرس: <strong>{item.official_lesson}</strong></span>}
                      {item.official_lesson && item.official_concept && <span>•</span>}
                      {item.official_concept && <span>المفهوم: <strong>{item.official_concept}</strong></span>}
                    </div>
                  )}

                  {/* Targeted Learning Outcome LO */}
                  {item.LO && (
                    <div className="bg-[#F0FDF4] border-r-2 border-emerald-600 px-3 py-1.5 text-xs text-[#14532D] font-sans flex items-start gap-1.5">
                      <Target className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-700" />
                      <div>
                        <strong>ناتج التعلم المستهدف: </strong>
                        <span>{item.LO}</span>
                      </div>
                    </div>
                  )}

                  {/* Question Text Prompt */}
                  <div className="text-sm sm:text-base text-[#1D1D1B] font-serif leading-relaxed whitespace-pre-line pt-1">
                    {item.question_text}
                  </div>

                  {/* Optional Table */}
                  {hasTable && (
                    <div className="overflow-x-auto my-3 border border-[#0C1E36]/20">
                      <table className="w-full text-right text-xs sm:text-sm border-collapse font-sans">
                        {item.tables!.headers && (
                          <thead className="bg-[#0C1E36] text-[#FFFFFF]">
                            <tr>
                              {item.tables!.headers.map((h, hi) => (
                                <th key={hi} className="p-2 border border-[#0C1E36]/30 font-bold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {item.tables!.rows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F5]'}>
                              {row.map((cell, ci) => (
                                <td key={ci} className="p-2 border border-[#0C1E36]/15">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Optional Multiple Choice Options */}
                  {isMCQ && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm">
                      {item.options!.map((opt, oi) => (
                        <div 
                          key={oi} 
                          className="p-2.5 bg-[#FAF8F5] border border-[#0C1E36]/15 leading-relaxed flex items-center gap-2"
                        >
                          <span className="font-bold font-mono bg-[#FFFFFF] w-6 h-6 flex items-center justify-center border border-[#0C1E36]/20 shrink-0 text-[#0C1E36]">
                            {opt.label || String.fromCharCode(65 + oi)}
                          </span>
                          <span className="text-[#1D1D1B]">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Required statement */}
                  {item.required && (
                    <div className="bg-[#FFFBEB] border-r-2 border-[#D97706] p-2.5 text-xs text-[#92400E] font-sans">
                      <strong>📌 المطلوب: </strong>
                      <span>{item.required}</span>
                    </div>
                  )}

                  {/* Model Solution & Scoring Rubric */}
                  {showSolutions && item.answer && (
                    <div className="bg-[#F0FDF4] border-r-4 border-emerald-700 p-4 text-[#14532D] space-y-2.5 mt-3 shadow-xs font-sans">
                      <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base font-serif text-emerald-950">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>نموذج الإجابة وسلم الدرجات الوزاري:</span>
                      </div>

                      <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-[#14532D]">
                        {item.answer}
                      </div>

                      {/* Solution Path Steps */}
                      {item.solution_path && item.solution_path.length > 0 && (
                        <div className="pt-2 border-t border-emerald-700/20 space-y-1">
                          <strong className="text-xs font-bold text-emerald-900 block font-serif">
                            خطوات ومسار الحل النموذجي:
                          </strong>
                          <ol className="list-decimal list-inside text-xs space-y-0.5 text-emerald-900/90">
                            {item.solution_path.map((step, si) => (
                              <li key={si} className="leading-relaxed">{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Theoretical Reasoning / Justification */}
                      {item.reasoning && (
                        <div className="pt-2 border-t border-emerald-700/20 text-xs text-emerald-900/90 leading-relaxed">
                          <strong className="font-bold text-emerald-950">التبرير المحاسبي المعياري: </strong>
                          <span>{item.reasoning}</span>
                        </div>
                      )}

                      {/* Calculation Audit */}
                      {item.calculation_audit && (
                        <div className="pt-1.5 text-xs font-mono bg-emerald-100/60 p-2 rounded-xs border border-emerald-300 text-emerald-950">
                          <strong>المعادلة: </strong>{item.calculation_audit.formula} = <strong>{item.calculation_audit.result}</strong>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Unit End Bar */}
          <div className="pt-4 border-t-2 border-[#0C1E36] text-center text-xs text-[#1D1D1B]/80 font-mono">
            نهاية مفردات {unitTitle} • كتاب الأداءات والتقييمات المدرسية المعتمدة • دار التميز للنشر • إيداع دار الكتب: 14280 / 2026
          </div>
        </section>
      ))}

      {/* 3. Grand Assessments Book Final Legal Strip */}
      <div className="p-6 bg-[#0C1E36] text-[#FFFFFF] text-center space-y-2 border-4 border-[#C5A059] shadow-md">
        <h4 className="font-bold font-serif text-base sm:text-lg text-[#C5A059]">
          تم بحمد الله تفريغ كتاب الأداءات والتقييمات المدرسية المعتمد ص ۳ - ۸٤ كاملاً
        </h4>
        <p className="text-xs text-[#E8DCC4] max-w-xl mx-auto leading-relaxed">
          جميع المفردات مستوفاة وفقاً لأحدث الطبعات المعتمدة لوزارة التربية والتعليم والتعليم الفني المصرية لشهادة البكالوريا (EB).
        </p>
        <div className="text-[11px] text-[#C5A059]/80 font-mono pt-1">
          رقم الإيداع بدار الكتب: 14280 / 2026 • ISBN: 978-977-08-4120-1 • يُحظر الاقتباس التجاري دون إذن كتابي
        </div>
      </div>
    </div>
  );
};
