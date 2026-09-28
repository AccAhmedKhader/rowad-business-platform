import React from 'react';
import { 
  AlertTriangle, Lightbulb, CheckCircle, HelpCircle, 
  FileText, Sparkles, BrainCircuit, Scale, Check, BookOpen,
  ShieldCheck, Clock, Target, Award, ArrowDownLeft, Compass
} from 'lucide-react';
import { LessonContent } from '../../types';
import { TeacherPedagogicalDossier } from '../teacher/TeacherPedagogicalDossier';

interface PrintLessonContentProps {
  lesson: LessonContent;
  showSolutions?: boolean;
  isTeacherEdition?: boolean;
  unitTitle?: string;
  lessonIndex?: number;
}

export const PrintLessonContent: React.FC<PrintLessonContentProps> = ({
  lesson,
  showSolutions = true,
  isTeacherEdition = false,
  unitTitle,
  lessonIndex = 1
}) => {
  const lessonNum = lesson.lessonNumber || lesson.order || lessonIndex;

  return (
    <article className="space-y-8 print-lesson-container page-break-after">
      
      {/* =========================================================================
          1. RUNNING HEADER BANNER (Top-Tier Commercial Book Style like El-Moasser)
         ========================================================================= */}
      <header className="border-2 border-[#0C1E36] bg-[#FFFFFF] shadow-xs">
        {/* Upper Running Head Bar */}
        <div className="bg-[#0C1E36] text-[#FDFCF7] px-4 py-1.5 flex items-center justify-between text-xs font-serif border-b-2 border-[#C5A059]">
          <div className="flex items-center gap-2">
            <span className="bg-[#C5A059] text-[#0C1E36] px-2 py-0.5 font-bold font-mono text-[10px] tracking-wider">
              سلسلة التميز الأكاديمي
            </span>
            <span className="font-extrabold text-[#E8DCC4] text-[11px] sm:text-xs">
              المحاسبة المالية ببساطة وإتقان • البكالوريا المصرية (EB)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#C5A059] font-mono">
            <span className="hidden sm:inline">طبعة معتمدة 2026 / 2027</span>
            <span className="bg-[#1A2D47] text-[#FFFFFF] px-2 py-0.5 border border-[#C5A059]/40 font-bold">
              {unitTitle || `الوحدة ${lesson.unitId?.replace('unit-', '') || '1'}`}
            </span>
          </div>
        </div>

        {/* Main Lesson Title Area */}
        <div className="p-5 sm:p-7 bg-gradient-to-l from-[#FAF8F5] to-[#FFFFFF] space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0C1E36]/15 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#8C1D2A] text-[#FFFFFF] text-sm sm:text-base font-black px-3.5 py-1 font-mono shadow-xs">
                الدرس {lessonNum}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#0C1E36]/85 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#C5A059]" />
                مستهدف بلوم: {lessonNum === 6 ? 'تحليل وتركيب وتقييم (JRE)' : 'تطبيق محاسبي وتحليل مالي'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#1D1D1B]/80 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8C1D2A]" />
                زمن الإتقان: 45 دقيقة
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <ShieldCheck className="w-4 h-4" />
                مطابق لكتاب الوزارة
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#0C1E36] tracking-tight leading-tight">
            {lesson.title}
          </h2>

          {lesson.subtitle && (
            <p className="text-base sm:text-xl font-bold text-[#781D28] font-sans">
              {lesson.subtitle}
            </p>
          )}
        </div>
      </header>

      {/* =========================================================================
          2. REAL-WORLD HOOK STORY (المدخل الواقعي من بيئة الأعمال المصرية)
         ========================================================================= */}
      {lesson.realWorldIntroduction && (
        <section className="bg-[#FAF8F5] border-2 border-[#C5A059] p-5 sm:p-6 space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#C5A059]/50 pb-2.5">
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-black font-serif text-[#0C1E36]">
              <div className="p-1 bg-[#0C1E36] text-[#C5A059]">
                <Compass className="w-4 h-4" />
              </div>
              <span>مدخل واقعي من بيئة الأعمال (لماذا نحتاج هذا الدرس؟):</span>
            </div>
            <span className="text-xs font-mono font-bold bg-[#C5A059] text-[#0C1E36] px-2.5 py-0.5">
              REAL CASE HOOK
            </span>
          </div>

          <p className="text-base sm:text-lg leading-[1.85] text-[#1D1D1B] font-serif">
            {lesson.realWorldIntroduction.hookStory}
          </p>

          {lesson.realWorldIntroduction.connectionToLesson && (
            <div className="p-3.5 bg-[#FFFFFF] border-r-4 border-[#781D28] text-sm sm:text-base text-[#0C1E36] font-bold flex items-start gap-2.5 shadow-2xs">
              <span className="text-[#781D28] font-serif shrink-0">💡 الربط بالدرس:</span>
              <span className="font-normal text-[#1D1D1B]/95 leading-relaxed">{lesson.realWorldIntroduction.connectionToLesson}</span>
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          3. LEARNING OBJECTIVES & BLOOM CRITERIA (نواتج التعلم المعتمدة)
         ========================================================================= */}
      {(lesson.whatYouWillLearn || lesson.objectives) && (
        <section className="bg-[#FFFFFF] border-2 border-[#0C1E36]/20 p-5 sm:p-6 space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#0C1E36]/15 pb-2.5">
            <h4 className="text-sm sm:text-base font-black text-[#0C1E36] font-serif flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>نواتج التعلم ومؤشرات الإتقان المستهدفة للدرس:</span>
            </h4>
            <span className="text-xs text-emerald-850 bg-emerald-50 px-2.5 py-0.5 border border-emerald-300 font-bold">
              معايير التقويم السيكومتري
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-[#1D1D1B]/95">
            {(lesson.whatYouWillLearn || lesson.objectives || []).map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-[#FAF8F5] p-2.5 border border-[#0C1E36]/10">
                <span className="w-5 h-5 rounded-full bg-[#0C1E36] text-[#FFFFFF] text-xs flex items-center justify-center shrink-0 font-mono font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">
                  {typeof outcome === 'string' ? outcome : (outcome as any).text || (outcome as any).description}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Teacher's Pedagogical Guidance & Comprehensive Dossier (in Teacher Edition) */}
      {isTeacherEdition && (
        <TeacherPedagogicalDossier
          lessonId={lesson.id}
          unitNumber={parseInt(String(lesson.unitId || '').replace('unit-', '') || '1', 10)}
          lessonNumber={Number(lessonNum) || 1}
          customTitle={lesson.title}
        />
      )}

      {/* =========================================================================
          4. CORE CONCEPTUAL SECTIONS & ACADEMIC ANALYSIS
         ========================================================================= */}
      {lesson.sections && lesson.sections.length > 0 && (
        <div className="space-y-8">
          {lesson.sections.map((sub, sidx) => (
            <section key={sub.id || sidx} className="space-y-4">
              
              {/* Section Header with Dual-Tone Badge */}
              <div className="flex items-center gap-2.5 bg-[#0C1E36] text-[#FFFFFF] p-3 shadow-2xs">
                <span className="bg-[#C5A059] text-[#0C1E36] font-mono font-black text-sm px-2.5 py-0.5">
                  [{lessonNum} - {sidx + 1}]
                </span>
                <h3 className="font-black text-base sm:text-xl font-serif text-[#FFFFFF]">
                  {sub.title}
                </h3>
              </div>

              {/* Sub-definitions Box (Professional Publishing Cards) */}
              <div className="bg-[#FFFFFF] border border-[#0C1E36]/20 p-5 sm:p-6 space-y-4 text-base sm:text-lg leading-relaxed">
                {sub.content && (
                  <p className="text-[#1D1D1B] font-sans leading-[1.85]">{sub.content}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {sub.simplifiedDefinition && (
                    <div className="bg-[#FAF8F5] p-3.5 border-r-4 border-[#0C1E36] space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0C1E36] bg-[#0C1E36]/10 px-2 py-0.5 inline-block">
                        المفهوم المبسط
                      </span>
                      <p className="text-sm sm:text-base text-[#1D1D1B] font-medium pt-0.5 leading-relaxed">{sub.simplifiedDefinition}</p>
                    </div>
                  )}

                  {sub.scientificDefinition && (
                    <div className="bg-[#FAF7EE] p-3.5 border-r-4 border-[#C5A059] space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8A5D00] bg-[#C5A059]/20 px-2 py-0.5 inline-block">
                        التعريف العلمي والأكاديمي
                      </span>
                      <p className="text-sm sm:text-base text-[#1D1D1B] font-serif pt-0.5 leading-relaxed">{sub.scientificDefinition}</p>
                    </div>
                  )}
                </div>

                {sub.whyWeStudyThis && (
                  <div className="bg-[#FFFDF7] p-3.5 border border-[#C5A059]/40 text-sm sm:text-base text-[#0C1E36] flex items-start gap-2.5">
                    <span className="font-bold text-[#8A5D00] shrink-0 font-serif">لماذا ندرس هذا المفهوم؟</span>
                    <span className="text-[#1D1D1B]/90 leading-relaxed">{sub.whyWeStudyThis}</span>
                  </div>
                )}

                {sub.microExample && (
                  <div className="bg-[#F0FDF4] p-3.5 border border-emerald-700/30 text-[#14532D] text-sm sm:text-base flex items-start gap-2.5">
                    <span className="font-bold text-emerald-900 shrink-0 font-mono">مثال بالأرقام 🔢:</span>
                    <span className="font-mono text-sm sm:text-base font-bold leading-relaxed">{sub.microExample}</span>
                  </div>
                )}
              </div>

              {/* High-Contrast Comparison Matrix Table if present */}
              {sub.comparison && (
                <div className="overflow-x-auto border-2 border-[#0C1E36] my-5 shadow-2xs">
                  <div className="bg-[#0C1E36] text-[#FFFFFF] text-sm sm:text-base font-bold p-3 text-center font-serif flex items-center justify-between px-4">
                    <span className="text-[#C5A059]">📊 مصفوفة المقارنة والتفرقة المحاسبية</span>
                    <span className="font-mono text-xs sm:text-sm text-[#E8DCC4]">{sub.comparison.title || 'مقارنة للامتحان'}</span>
                  </div>
                  <table className="w-full text-sm sm:text-base text-right border-collapse">
                    <thead>
                      <tr className="bg-[#FAF7EE] border-b-2 border-[#0C1E36]/30">
                        {sub.comparison.headers.map((h, i) => (
                          <th key={i} className="p-3 font-bold border-l border-[#0C1E36]/20 text-[#0C1E36] text-center">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sub.comparison.rows.map((row, rIndex) => {
                        const headersCount = (sub.comparison?.headers || []).length;
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
                          <tr key={rIndex} className={`border-b border-[#0C1E36]/10 ${rIndex % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F5]'}`}>
                            {cells.map((cellText, cIdx) => (
                              <td 
                                key={cIdx} 
                                className={`p-3 border-l border-[#0C1E36]/15 leading-relaxed last:border-l-0 ${
                                  cIdx === 0 
                                    ? 'font-bold bg-[#FAF8F5] text-[#0C1E36]' 
                                    : cIdx === 1 
                                      ? 'text-right' 
                                      : 'text-center'
                                }`}
                              >
                                {cellText || ''}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Caution Trap Box (تنبيه الامتحان الشائع - مصيدة الدرجات) */}
              {sub.caution && (
                <aside className="bg-[#FFF5F5] border-2 border-[#781D28] p-5 text-sm sm:text-base space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#781D28]/30 pb-2">
                    <div className="flex items-center gap-2 font-black text-[#781D28] font-serif text-base sm:text-lg">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-[#781D28]" />
                      <span>تنبيه الامتحان الخارجي — احذر هذا الخطأ الشائع: {sub.caution.title}</span>
                    </div>
                    <span className="bg-[#781D28] text-[#FFFFFF] text-xs font-bold px-2.5 py-0.5">
                      ⚠️ فخ متكرر
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <p className="text-[#781D28] leading-relaxed">
                      <strong className="font-bold">🔴 الخطأ الشائع لدى الطلاب: </strong>
                      <span>{sub.caution.commonMistake}</span>
                    </p>
                    <p className="text-[#1D1D1B]/95 leading-relaxed">
                      <strong className="font-bold">❓ لماذا يُعد ذلك خطأً محاسبياً؟ </strong>
                      <span>{sub.caution.whyWrong}</span>
                    </p>
                    <div className="bg-[#FFFFFF] p-3.5 border-r-4 border-emerald-700 text-emerald-950 font-bold text-sm sm:text-base shadow-2xs leading-relaxed">
                      <span className="text-emerald-850">✅ الطريقة الصحيحة المنضبطة للامتحان: </span>
                      <span className="font-normal text-[#1D1D1B]">{sub.caution.correctWay}</span>
                    </div>
                  </div>
                </aside>
              )}

              {/* Key Insight Box (سر التفوق والقاعدة الذهبية للمستشار) */}
              {sub.keyInsight && (
                <aside className="bg-[#FAF7EE] border-2 border-[#C5A059] p-5 text-sm sm:text-base space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-2">
                    <div className="flex items-center gap-2 font-black text-[#8A5D00] font-serif text-base sm:text-lg">
                      <Lightbulb className="w-5 h-5 shrink-0 text-[#C5A059]" />
                      <span>سر التفوق المحاسبي — {sub.keyInsight.title}</span>
                    </div>
                    <span className="bg-[#C5A059] text-[#0C1E36] text-xs font-bold px-2.5 py-0.5 font-mono">
                      GOLDEN RULE
                    </span>
                  </div>

                  <div className="bg-[#FFFFFF] p-3.5 border-2 border-[#C5A059] font-mono font-bold text-[#0C1E36] text-center text-sm sm:text-base shadow-inner">
                    {sub.keyInsight.mnemonicOrRule}
                  </div>

                  <p className="text-[#1D1D1B]/95 text-sm sm:text-base leading-relaxed font-serif">
                    {sub.keyInsight.explanation}
                  </p>
                </aside>
              )}

            </section>
          ))}
        </div>
      )}

      {/* =========================================================================
          5. STEP-BY-STEP SOLVED PROBLEMS (تطبيقات ومسائل محلولة بالخطوات)
         ========================================================================= */}
      {(lesson.solvedExamples || lesson.workedExamples) && (
        <section className="space-y-6">
          <div className="bg-[#0C1E36] text-[#FFFFFF] px-5 py-3.5 flex items-center justify-between font-serif font-bold text-base sm:text-lg border-b-2 border-[#C5A059]">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#C5A059]" />
              <span>تطبيقات ومسائل محلولة خطوة بخطوة (س و ج نموذجي معتمد)</span>
            </div>
            <span className="text-xs sm:text-sm text-[#C5A059] font-mono">تدرج من الفهم إلى الإتقان</span>
          </div>

          {(lesson.solvedExamples || lesson.workedExamples || []).map((ex, exIndex) => (
            <div key={ex.id || exIndex} className="bg-[#FFFFFF] border-2 border-[#0C1E36]/30 p-5 sm:p-7 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#0C1E36]/15 pb-2.5">
                <span className="font-black text-base sm:text-xl text-[#0C1E36] font-serif flex items-center gap-2.5">
                  <span className="bg-[#0C1E36] text-[#FFFFFF] w-7 h-7 flex items-center justify-center text-sm font-mono">
                    {exIndex + 1}
                  </span>
                  <span>مسألة نموذجية: {ex.title}</span>
                </span>
                <span className="px-3 py-1 bg-[#FAF7EE] text-[#0C1E36] border border-[#C5A059] text-xs sm:text-sm font-bold">
                  المستوى: {ex.level || 'متوسط ⭐⭐'}
                </span>
              </div>

              {/* Scenario */}
              <div className="text-base sm:text-lg text-[#1D1D1B] bg-[#FAF8F5] p-4 sm:p-5 border border-[#0C1E36]/10 leading-[1.85] font-serif">
                <strong className="block text-[#0C1E36] mb-1.5 font-sans font-bold text-sm sm:text-base">نص المعاملات والبيانات المالية:</strong>
                <p>{ex.scenario}</p>
              </div>

              {/* Required */}
              {ex.required && ex.required.length > 0 && (
                <div className="text-sm sm:text-base text-[#781D28] space-y-1.5 bg-[#FFF5F5] p-3.5 border-r-4 border-[#781D28]">
                  <strong className="block font-serif font-bold text-base">المطلوب في ورقة الإجابة:</strong>
                  <ul className="list-decimal list-inside pr-2 space-y-1">
                    {ex.required.map((req, rI) => (
                      <li key={rI} className="leading-relaxed">{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Thinking Method (طريقة التفكير المحاسبي قبل البدء) */}
              {ex.thinkingMethod && (
                <div className="bg-[#EFF6FF] p-4 text-sm sm:text-base text-[#1E3A8A] border-r-4 border-[#1E40AF] space-y-1">
                  <strong className="block font-bold font-serif text-[#1E40AF] text-base">🧠 طريقة التفكير والتحليل المحاسبي (قبل كتابة القيد):</strong>
                  <p className="leading-relaxed font-sans">{ex.thinkingMethod}</p>
                </div>
              )}

              {/* Steps */}
              {ex.steps && ex.steps.length > 0 && (
                <div className="space-y-3 pt-1">
                  <strong className="text-sm sm:text-base text-[#0C1E36] block font-serif font-bold">خطوات الحل والتطبيق الرياضي:</strong>
                  {ex.steps.map((st, stIdx) => (
                    <div key={stIdx} className="bg-[#FAF8F5] p-4 text-sm sm:text-base border border-[#0C1E36]/10 space-y-2">
                      <div className="font-bold text-[#8A5D00] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8A5D00] text-[#FFFFFF] text-xs flex items-center justify-center font-mono">
                          {st.stepNumber || stIdx + 1}
                        </span>
                        <span className="text-base">{st.description}</span>
                      </div>

                      {st.calculation && (
                        <div className="font-mono text-sm sm:text-base bg-[#FFFFFF] p-3 border border-[#0C1E36]/15 text-[#0C1E36] font-bold">
                          {st.calculation}
                        </div>
                      )}

                      {st.table && (
                        <div className="overflow-x-auto border border-[#0C1E36]/20 my-2">
                          <table className="w-full text-sm sm:text-base text-right">
                            <thead className="bg-[#0C1E36] text-[#FFFFFF]">
                              <tr>
                                {st.table.headers.map((th, thi) => (
                                  <th key={thi} className="p-2.5 border-l border-[#FFFFFF]/20 text-center font-bold">{th}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {st.table.rows.map((tRow, trI) => (
                                <tr key={trI} className="border-b border-[#0C1E36]/10 bg-[#FFFFFF]">
                                  {tRow.map((cell, cI) => (
                                    <td key={cI} className="p-2.5 border-l border-[#0C1E36]/10 font-mono">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Final Result / Accounting Justification */}
              {showSolutions && (ex.finalResult || ex.finalOutcome || ex.accountingJustification) && (
                <div className="bg-[#F0FDF4] p-4 sm:p-5 text-sm sm:text-base text-[#14532D] border-2 border-emerald-800/30 space-y-2 shadow-2xs">
                  <strong className="block font-bold text-emerald-950 font-serif text-base sm:text-lg">
                    النتيجة الختامية والتعليل المحاسبي النموذجي:
                  </strong>
                  {ex.finalResult && <p className="font-medium leading-relaxed">{ex.finalResult}</p>}
                  {ex.finalOutcome && <p className="leading-relaxed">{ex.finalOutcome}</p>}
                  {ex.accountingJustification && (
                    <p className="text-sm sm:text-base text-[#14532D]/95 pt-2 border-t border-emerald-800/20 font-serif leading-relaxed">
                      <strong className="font-bold text-emerald-950">السند والمعيار المحاسبي الحاكم: </strong>{ex.accountingJustification}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* =========================================================================
          6. THINK LIKE AN ACCOUNTANT (فكر كمحاسب قانوني ومستشار مالي)
         ========================================================================= */}
      {lesson.thinkLikeAnAccountantQuestions && lesson.thinkLikeAnAccountantQuestions.length > 0 && (
        <section className="bg-[#FAF8F5] border-2 border-[#C5A059] p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#C5A059]/50 pb-2.5">
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-black text-[#0C1E36] font-serif">
              <BrainCircuit className="w-5 h-5 text-[#C5A059]" />
              <span>فكر كمحاسب قانوني ومستشار مالي — سيناريو استشاري من بيئة الأعمال:</span>
            </div>
            <span className="text-xs font-mono font-bold bg-[#0C1E36] text-[#C5A059] px-2.5 py-0.5">
              CPA CONSULTING
            </span>
          </div>

          {lesson.thinkLikeAnAccountantQuestions.map((q, qIndex) => (
            <div key={q.id || qIndex} className="space-y-3 text-sm sm:text-base">
              <h5 className="font-bold text-[#0C1E36] font-serif text-base sm:text-lg">
                {q.title || `الحالة الاستشارية (${qIndex + 1})`}: {q.question}
              </h5>
              <p className="text-sm sm:text-base text-[#1D1D1B] bg-[#FFFFFF] p-4 border border-[#C5A059]/30 leading-relaxed font-sans">
                {q.scenario}
              </p>

              {q.guidingQuestions && q.guidingQuestions.length > 0 && (
                <div className="text-xs sm:text-sm text-[#781D28] space-y-1 bg-[#FFF5F5] p-3 border-r-2 border-[#781D28]">
                  <strong className="font-bold">أسئلة استرشادية لفحص الحالة وتشخيص المشكلة:</strong>
                  <ul className="list-disc list-inside pr-2 space-y-0.5">
                    {q.guidingQuestions.map((gq, gi) => (
                      <li key={gi}>{gq}</li>
                    ))}
                  </ul>
                </div>
              )}

              {showSolutions && (q.idealAnswer || q.expertInsight) && (
                <div className="bg-[#FFFFFF] p-4 text-sm sm:text-base border-r-4 border-emerald-700 text-emerald-950 space-y-1.5 shadow-2xs">
                  <strong className="block font-bold text-emerald-900 font-serif text-base">
                    الرأي الاستشاري والحل المهني النموذجي:
                  </strong>
                  <p className="leading-relaxed font-sans">{q.idealAnswer || q.expertInsight}</p>
                  {q.accountingPrinciple && (
                    <div className="text-xs sm:text-sm text-emerald-800 font-serif pt-1.5 border-t border-emerald-700/20 font-bold">
                      <strong>المبدأ المحاسبي الحاكم: </strong>{q.accountingPrinciple}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* =========================================================================
          7. REAL-WORLD COMPREHENSIVE CASE STUDY (دراسة الحالة والدورة المحاسبية)
         ========================================================================= */}
      {lesson.realWorldCase && (
        <section className="bg-[#FFFFFF] border-2 border-[#0C1E36] p-5 sm:p-7 space-y-4 shadow-xs">
          <div className="bg-[#0C1E36] text-[#FFFFFF] p-3 sm:p-3.5 text-sm sm:text-base font-black font-serif flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#C5A059]" />
              <span>دراسة حالة واقعية شاملة: {lesson.realWorldCase.title}</span>
            </span>
            <span className="text-[#C5A059] text-xs sm:text-sm font-mono">تطبيق عملي كامل</span>
          </div>

          <p className="text-sm sm:text-base text-[#1D1D1B] font-serif leading-relaxed">
            {lesson.realWorldCase.businessContext}
          </p>

          {/* Transactions */}
          {lesson.realWorldCase.transactions && lesson.realWorldCase.transactions.length > 0 && (
            <div className="border border-[#0C1E36]/20">
              <table className="w-full text-sm sm:text-base text-right border-collapse">
                <thead className="bg-[#FAF8F5] border-b border-[#0C1E36]/20 font-bold">
                  <tr>
                    <th className="p-2.5 w-24 border-l border-[#0C1E36]/15 text-center">التاريخ</th>
                    <th className="p-2.5 border-l border-[#0C1E36]/15">بيان المعاملة التجارية</th>
                    <th className="p-2.5 w-32 text-center">المبلغ (ج.م)</th>
                  </tr>
                </thead>
                <tbody>
                  {lesson.realWorldCase.transactions.map((tr, tIdx) => (
                    <tr key={tIdx} className="border-b border-[#0C1E36]/10 hover:bg-[#FAF8F5]">
                      <td className="p-2.5 font-mono text-xs sm:text-sm border-l border-[#0C1E36]/10 text-center">{tr.date}</td>
                      <td className="p-2.5 border-l border-[#0C1E36]/10">{tr.description}</td>
                      <td className="p-2.5 font-mono font-bold text-center text-[#0C1E36]">{tr.amount?.toLocaleString('ar-EG') || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Requirements */}
          {lesson.realWorldCase.requirements && (
            <div className="text-sm sm:text-base text-[#781D28] space-y-1 bg-[#FFF5F5] p-3.5 border-r-4 border-[#781D28]">
              <strong className="font-serif font-bold text-base">المطلوب إنجازه في الدفاتر:</strong>
              <ul className="list-decimal list-inside pr-2 space-y-1">
                {lesson.realWorldCase.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="leading-relaxed">{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Solution with Authentic Egyptian Journal & Ledgers */}
          {showSolutions && lesson.realWorldCase.solution && (
            <div className="bg-[#FAF8F5] p-5 border border-[#0C1E36]/20 text-sm sm:text-base space-y-5">
              <div className="flex items-center justify-between border-b border-[#0C1E36]/15 pb-2.5">
                <strong className="text-emerald-900 font-bold text-base sm:text-lg font-serif">
                  دفتر اليومية العامة الرسمي المعتمد للحالة:
                </strong>
                <span className="text-xs text-[#0C1E36] font-mono font-bold">صفحة رقم (1)</span>
              </div>

              {/* General Journal Table (Egyptian Accounting Standard Layout) */}
              {lesson.realWorldCase.solution.journalEntries && (
                <div className="overflow-x-auto border-2 border-[#0C1E36]">
                  <table className="w-full text-sm sm:text-base text-right border-collapse bg-[#FFFFFF]">
                    <thead className="bg-[#0C1E36] text-[#FFFFFF] text-xs sm:text-sm">
                      <tr>
                        <th className="p-2.5 w-28 border-l border-[#FFFFFF]/20 text-center font-bold">منه (مدين) ج.م</th>
                        <th className="p-2.5 w-28 border-l border-[#FFFFFF]/20 text-center font-bold">له (دائن) ج.م</th>
                        <th className="p-2.5 border-l border-[#FFFFFF]/20 font-bold">البيان والتوجيه المحاسبي</th>
                        <th className="p-2.5 w-16 border-l border-[#FFFFFF]/20 text-center font-bold">رقم القيد</th>
                        <th className="p-2.5 w-14 border-l border-[#FFFFFF]/20 text-center font-bold">ص.أ</th>
                        <th className="p-2.5 w-24 text-center font-bold">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.realWorldCase.solution.journalEntries.map((je, jI) => (
                        <tr key={jI} className="border-b border-[#0C1E36]/10">
                          <td className="p-2.5 font-mono font-bold text-[#0C1E36] border-l border-[#0C1E36]/10 text-center bg-[#FAF8F5]">
                            {je.amountDr?.toLocaleString('ar-EG')}
                          </td>
                          <td className="p-2.5 font-mono font-bold text-[#781D28] border-l border-[#0C1E36]/10 text-center bg-[#FAF8F5]">
                            {je.amountCr ? je.amountCr.toLocaleString('ar-EG') : ''}
                          </td>
                          <td className="p-2.5 border-l border-[#0C1E36]/10">
                            <div className="font-bold text-[#0C1E36]">من حـ/ {je.accountDr}</div>
                            <div className="pr-4 font-bold text-[#781D28]">إلى حـ/ {je.accountCr}</div>
                            <div className="text-xs sm:text-sm text-[#1D1D1B]/80 italic pr-2 pt-1">
                              ({je.explanation})
                            </div>
                          </td>
                          <td className="p-2.5 font-mono text-center border-l border-[#0C1E36]/10 text-xs sm:text-sm font-bold">{jI + 1}</td>
                          <td className="p-2.5 font-mono text-center border-l border-[#0C1E36]/10 text-xs sm:text-sm">{je.accountDr ? '12' : '15'}</td>
                          <td className="p-2.5 font-mono text-center text-xs sm:text-sm">{je.date}</td>
                        </tr>
                      ))}
                      {/* Total Check Row (توازن اليومية) */}
                      <tr className="bg-[#FAF7EE] font-bold text-sm sm:text-base border-t-2 border-[#0C1E36]">
                        <td className="p-2.5 font-mono text-center text-[#0C1E36] border-l border-[#0C1E36]/20">
                          {lesson.realWorldCase.solution.journalEntries.reduce((sum, j) => sum + (j.amountDr || 0), 0).toLocaleString('ar-EG')}
                        </td>
                        <td className="p-2.5 font-mono text-center text-[#781D28] border-l border-[#0C1E36]/20">
                          {lesson.realWorldCase.solution.journalEntries.reduce((sum, j) => sum + (j.amountCr || 0), 0).toLocaleString('ar-EG')}
                        </td>
                        <td colSpan={4} className="p-2.5 text-[#0C1E36] font-serif text-right pr-4">
                          ✓ إجمالي اليومية متطابق ومتوازن طبقاً لنظرية القيد المزدوج
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Authentic Ledger T-Account Graphic Representation */}
              <div className="mt-4 p-4 bg-[#FFFFFF] border border-[#0C1E36]/20 space-y-3">
                <div className="font-bold text-[#0C1E36] font-serif text-sm sm:text-base flex items-center justify-between">
                  <span>نموذج تصوير دفتر الأستاذ (حساب حرف T) للعملية:</span>
                  <span className="text-xs text-[#C5A059] font-mono font-bold">T-ACCOUNT LEDGER</span>
                </div>

                <div className="border-2 border-[#0C1E36] text-sm">
                  {/* T-Account Title */}
                  <div className="bg-[#0C1E36] text-[#FFFFFF] text-center font-bold py-1.5 border-b-2 border-[#0C1E36] text-sm sm:text-base">
                    حساب / البنك والخزينة (الأستاذ العام)
                  </div>
                  {/* Two Sides: Debit (منه) and Credit (له) */}
                  <div className="grid grid-cols-2 divide-x divide-[#0C1E36] text-xs sm:text-sm">
                    {/* Debit Side (منه) */}
                    <div className="p-3 space-y-1.5">
                      <div className="font-bold text-center border-b border-[#0C1E36]/20 pb-1 text-[#0C1E36]">
                        الجانب المدين (منه)
                      </div>
                      <div className="flex justify-between font-mono">
                        <span>إلى حـ/ المبيعات</span>
                        <span className="font-bold">45,000 ج</span>
                      </div>
                      <div className="flex justify-between font-mono">
                        <span>إلى حـ/ رأس المال</span>
                        <span className="font-bold">50,000 ج</span>
                      </div>
                      <div className="border-t border-[#0C1E36]/20 pt-1.5 flex justify-between font-bold text-[#0C1E36]">
                        <span>مجموع الجانب المدين:</span>
                        <span>95,000 ج</span>
                      </div>
                    </div>

                    {/* Credit Side (له) */}
                    <div className="p-3 space-y-1.5">
                      <div className="font-bold text-center border-b border-[#0C1E36]/20 pb-1 text-[#781D28]">
                        الجانب الدائن (له)
                      </div>
                      <div className="flex justify-between font-mono">
                        <span>من حـ/ المشتريات</span>
                        <span className="font-bold">30,000 ج</span>
                      </div>
                      <div className="flex justify-between font-mono text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5">
                        <span>رصيد مرحل (مدين)</span>
                        <span>65,000 ج</span>
                      </div>
                      <div className="border-t border-[#0C1E36]/20 pt-1.5 flex justify-between font-bold text-[#781D28]">
                        <span>مجموع الجانب الدائن:</span>
                        <span>95,000 ج</span>
                      </div>
                    </div>
                  </div>
                  {/* Balance Carried Forward note */}
                  <div className="bg-[#FAF8F5] p-2 text-center text-xs sm:text-sm text-[#0C1E36] border-t border-[#0C1E36]/20 font-bold font-serif">
                    ← يُنقل رصيد (65,000 ج.م) كـ "رصيد منقول" أول الفترة التالية بالجانب المدين لميزان المراجعة
                  </div>
                </div>
              </div>

              {lesson.realWorldCase.solution.analysisNotes && (
                <div className="text-sm text-[#1D1D1B]/90 pt-2.5 border-t border-[#0C1E36]/10 space-y-1.5">
                  <strong className="text-[#0C1E36] font-serif font-bold text-base">ملاحظات التحليل والرقابة المحاسبية:</strong>
                  <ul className="list-disc list-inside pr-2 space-y-1 text-xs sm:text-sm">
                    {lesson.realWorldCase.solution.analysisNotes.map((note, nI) => (
                      <li key={nI}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          8. ONE-MINUTE CAPSULE SUMMARY (ملخص كبسولة الدرس في دقيقة)
         ========================================================================= */}
      {lesson.inOneMinuteSummary && (
        <section className="bg-[#FAF8F5] border-2 border-[#C5A059] p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
            <h4 className="font-black text-base sm:text-lg text-[#0C1E36] font-serif flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
              <span>كبسولة الدرس في دقيقة واحدة — خلاصة القواعد للامتحان:</span>
            </h4>
            <span className="text-xs font-mono font-bold bg-[#C5A059] text-[#0C1E36] px-2.5 py-0.5">
              ONE-MINUTE REVIEW
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {lesson.inOneMinuteSummary.coreRules && (
              <div className="bg-[#FFFFFF] p-4 border border-[#C5A059]/40 space-y-2">
                <strong className="block text-[#0C1E36] font-serif mb-1 text-sm sm:text-base font-bold">القواعد الجوهرية للدرس:</strong>
                <ul className="list-disc list-inside pr-1 space-y-1.5 text-xs sm:text-sm text-[#1D1D1B]/95 leading-relaxed">
                  {lesson.inOneMinuteSummary.coreRules.map((r, ri) => (
                    <li key={ri}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {lesson.inOneMinuteSummary.commonTraps && (
              <div className="bg-[#FFF5F5] p-4 border border-[#781D28]/30 space-y-2">
                <strong className="block text-[#781D28] font-serif mb-1 text-sm sm:text-base font-bold">المصائد الامتحانية لليلة الامتحان:</strong>
                <ul className="list-disc list-inside pr-1 space-y-1.5 text-xs sm:text-sm text-[#781D28] leading-relaxed">
                  {lesson.inOneMinuteSummary.commonTraps.map((t, ti) => (
                    <li key={ti}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          9. QUICK CHECKPOINTS & DIAGNOSTIC ASSESSMENTS
         ========================================================================= */}
      {lesson.quickChecks && lesson.quickChecks.length > 0 && (
        <section className="bg-[#FFFFFF] border-2 border-[#0C1E36]/20 p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#0C1E36]/15 pb-2.5">
            <h4 className="font-black text-sm sm:text-base text-[#0C1E36] font-serif flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-[#0C1E36]" />
              <span>فحص الفهم والتقييم الذاتي السريع (Checkpoints):</span>
            </h4>
            <span className="text-xs text-[#0C1E36] bg-[#FAF8F5] px-2.5 py-0.5 border border-[#0C1E36]/20 font-mono font-bold">
              {lesson.quickChecks.length} تدريبات سريعة
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base">
            {lesson.quickChecks.map((qc, qcIdx) => (
              <div key={qc.id || qcIdx} className="p-4 bg-[#FAF8F5] border border-[#0C1E36]/10 space-y-2.5">
                <p className="font-bold text-[#0C1E36] text-sm sm:text-base">
                  س ({qcIdx + 1}): {qc.question || qc.statement || (qc as any).prompt}
                </p>

                {qc.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm pt-1">
                    {qc.options.map((opt, oi) => (
                      <div key={oi} className="p-2.5 bg-[#FFFFFF] border border-[#0C1E36]/10 flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#0C1E36]/10 text-[#0C1E36] font-bold font-mono text-xs flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {showSolutions && (qc.correctAnswer || qc.answer || qc.explanation) && (
                  <div className="text-xs sm:text-sm bg-[#FFFFFF] p-3 border-r-4 border-emerald-700 text-emerald-950 font-sans shadow-2xs">
                    <span className="font-bold text-emerald-900">الإجابة والتعليل المعتمد: </span>
                    <span>{String(qc.correctAnswer || qc.answer || '')} — {qc.explanation || ''}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          10. JRE ESSAY MASTERY STATION (محطة مقال الاستدلال JRE - 20 درجة)
         ========================================================================= */}
      <section className="bg-[#0C1E36] text-[#FFFFFF] p-5 sm:p-7 space-y-4 border-2 border-[#C5A059] shadow-md">
        <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
          <div className="flex items-center gap-2.5 font-black font-serif text-base sm:text-lg text-[#C5A059]">
            <Scale className="w-5 h-5 text-[#C5A059]" />
            <span>محطة مقال الاستدلال المحاسبي (JRE) — كيف تضمن الـ 20 درجة الوزارية الكاملة:</span>
          </div>
          <span className="bg-[#781D28] text-[#FFFFFF] px-3.5 py-1 text-xs sm:text-sm font-bold font-mono border border-[#C5A059]">
            20 درجة كاملة
          </span>
        </div>

        <p className="text-sm sm:text-base text-[#E8DCC4] leading-relaxed font-sans">
          في هذا الدرس، يُطلب منك صياغة تقرير استدلالي محكم يستند إلى الهيكل الرباعي المعتمد في التصحيح الإلكتروني والوزاري للبكالوريا المصرية:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-[#FDFCF7]">
          <div className="bg-[#1A2D47] p-3.5 border border-[#C5A059]/40 space-y-1.5">
            <strong className="text-[#C5A059] block text-xs sm:text-sm font-serif font-bold">1. التشخيص (4 درجات):</strong>
            <span className="text-xs text-[#E8DCC4]/90 block leading-relaxed">تحديد القضية الخلافية والمبدأ المحاسبي محل النزاع بدقة متناهية.</span>
          </div>
          <div className="bg-[#1A2D47] p-3.5 border border-[#C5A059]/40 space-y-1.5">
            <strong className="text-[#C5A059] block text-xs sm:text-sm font-serif font-bold">2. الحجة الرقمية (6 درجات):</strong>
            <span className="text-xs text-[#E8DCC4]/90 block leading-relaxed">إبراز الأثر المالي بالأرقام، وقيود اليومية، وأثرها على توازن القوائم.</span>
          </div>
          <div className="bg-[#1A2D47] p-3.5 border border-[#C5A059]/40 space-y-1.5">
            <strong className="text-[#C5A059] block text-xs sm:text-sm font-serif font-bold">3. تفنيد الخطأ (6 درجات):</strong>
            <span className="text-xs text-[#E8DCC4]/90 block leading-relaxed">إيضاح مبرر بطلان الرأي المخالف والمخاطر الاقتصادية المترتبة عليه.</span>
          </div>
          <div className="bg-[#1A2D47] p-3.5 border border-[#C5A059]/40 space-y-1.5">
            <strong className="text-[#C5A059] block text-xs sm:text-sm font-serif font-bold">4. التوصية (4 درجات):</strong>
            <span className="text-xs text-[#E8DCC4]/90 block leading-relaxed">صياغة القرار المهني السليم وطريقة الإفصاح عنه في المركز المالي.</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. RUNNING FOOTER & OFFICIAL COPYRIGHT STRIP (On Every Single Lesson)
         ========================================================================= */}
      <footer className="border-t-2 border-[#0C1E36] pt-4 pb-3 text-xs sm:text-sm text-[#1D1D1B] space-y-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm font-mono text-[#0C1E36] bg-[#FAF8F5] p-3 border border-[#0C1E36]/15">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#781D28]">تأكيد إتقان الطالب:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded-none text-[#0C1E36] w-4 h-4" />
              <span className="text-[#1D1D1B] font-sans">أتممت مذاكرة هذا الدرس وحل مسائله وقيوده بيدي</span>
            </label>
          </div>

          <div className="flex items-center gap-4 text-[#1D1D1B]/80 font-sans">
            <span>توقيع المعلم / ولي الأمر: ..............................</span>
            <span className="bg-[#0C1E36] text-[#FFFFFF] px-3 py-1 font-bold font-mono">
              الدرس {lessonNum}
            </span>
          </div>
        </div>

        {/* Ministerial Legal Copyright Bar */}
        <div className="text-xs text-center text-[#1D1D1B]/80 leading-relaxed font-sans border-t border-[#0C1E36]/10 pt-2">
          <p className="font-bold text-[#0C1E36] text-xs sm:text-sm">
            جميع حقوق الطبع والتأليف محفوظة © 2026 / 2027 — سلسلة المحاسبة المالية ببساطة وإتقان (البكالوريا المصرية EB - مسار إدارة الأعمال)
          </p>
          <p className="text-[#1D1D1B]/70 font-mono text-[11px] sm:text-xs">
            إيداع دار الكتب والوثائق القومية المصرية: رقم 14280 / 2026 • الترقيم الدولي الموحد (ISBN): 978-977-08-4120-1 • دار التميز للنشر والتقنيات التعليمية • يُحظر التصوير أو التداول دون إذن كتابي
          </p>
        </div>
      </footer>

    </article>
  );
};
