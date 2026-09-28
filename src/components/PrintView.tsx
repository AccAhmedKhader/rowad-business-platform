import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Printer, ArrowRight, BookOpen, Layers, CheckCircle2, 
  FileText, Award, Scale, HelpCircle, ShieldCheck, Bookmark, Check,
  QrCode, Sparkles, Clock, Target, Copyright, ExternalLink
} from 'lucide-react';
import { allLessons, getLessonsForUnit, availableUnits } from '../data/lessonsData';
import { expandedQuestionBank } from '../data/expandedQuestionBank';
import { comprehensiveExams } from '../data/examsData';
import { BookCover } from './print/BookCover';
import { BookTableOfContents } from './print/BookTableOfContents';
import { PrintLessonContent } from './print/PrintLessonContent';
import { PrintToolbar } from './print/PrintToolbar';
import { PrintGlossaryBooklet } from './print/PrintGlossaryBooklet';
import { PrintAssessmentsBook } from './print/PrintAssessmentsBook';
import { WeeklyCurriculumPacingView } from './teacher/WeeklyCurriculumPacingView';

interface PrintViewProps {
  onBack: () => void;
}

export type ExportEdition = 'student' | 'teacher' | 'answers' | 'qbank' | 'exams' | 'glossary' | 'assessments';
export type FontSizeScale = 'compact' | 'normal' | 'large' | 'xlarge';

export const PrintView: React.FC<PrintViewProps> = ({ onBack }) => {
  const [searchParams] = useSearchParams();
  const urlEdition = searchParams.get('edition') as ExportEdition | null;
  const urlUnit = searchParams.get('unit');
  const urlLesson = searchParams.get('lesson');
  const urlModule = searchParams.get('module');
  const urlSolutions = searchParams.get('solutions');
  const urlCover = searchParams.get('cover');
  const urlScale = searchParams.get('scale') as FontSizeScale | null;
  const urlDocTitle = searchParams.get('docTitle');

  const resolvedEdition: ExportEdition = 
    urlModule === 'qbank' ? 'qbank' :
    urlModule === 'exams' ? 'exams' :
    urlModule === 'glossary' ? 'glossary' :
    urlModule === 'answers' ? 'answers' :
    urlModule === 'assessments' ? 'assessments' :
    urlEdition && ['student', 'teacher', 'answers', 'qbank', 'exams', 'glossary', 'assessments'].includes(urlEdition)
      ? urlEdition
      : 'student';

  const [selectedEdition, setSelectedEdition] = useState<ExportEdition>(resolvedEdition);
  const [selectedUnit, setSelectedUnit] = useState<string>(urlUnit || 'all');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(urlLesson || null);
  const [showSolutions, setShowSolutions] = useState<boolean>(urlSolutions !== null ? urlSolutions === 'true' : true);
  const [showCoverAndToc, setShowCoverAndToc] = useState<boolean>(urlCover !== null ? urlCover === 'true' : true);
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>(
    urlScale && ['compact', 'normal', 'large', 'xlarge'].includes(urlScale)
      ? urlScale
      : 'normal'
  );

  // Set document.title dynamically when exporting to PDF so the default file name is clean
  React.useEffect(() => {
    if (urlDocTitle) {
      document.title = urlDocTitle;
    } else if (selectedUnit === 'cover-only') {
      document.title = 'غلاف_كتاب_المحاسبة_المالية_المعتمد_بكالوريا_2027';
    } else if (selectedUnit !== 'all') {
      const uNum = parseInt(selectedUnit.replace('unit-', ''), 10);
      const unitMeta = availableUnits.find(u => u.unitNumber === uNum);
      const uTitle = unitMeta?.shortTitle || `الوحدة_${uNum}`;
      document.title = `المحاسبة_المالية_${uTitle.replace(/\s+/g, '_')}_2027`;
    } else {
      document.title = 'كتاب_المحاسبة_المالية_الشامل_المعتمد_بكالوريا_2027';
    }
  }, [urlDocTitle, selectedUnit]);

  // Auto-print effect when launched in a standalone window with ?autoprint=true
  React.useEffect(() => {
    if (searchParams.get('autoprint') === 'true') {
      const timer = setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print failed:', e);
        }
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Global Ctrl+P / Cmd+P shortcut handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        try {
          window.print();
        } catch (err) {
          console.warn('Direct print error:', err);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine lessons to render based on selected unit
  const activeLessons = selectedUnit === 'cover-only'
    ? []
    : selectedUnit === 'all' 
    ? allLessons 
    : getLessonsForUnit(selectedUnit);

  // Active units list
  const activeUnitsList = selectedUnit === 'cover-only'
    ? []
    : selectedUnit === 'all'
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    : [parseInt(selectedUnit.replace('unit-', ''), 10)];

  // Text scaling class mapping - calibrated for long study sessions & textbook readability
  const scaleClass = 
    fontSizeScale === 'compact' ? 'text-[15px] leading-[1.8]' :
    fontSizeScale === 'large' ? 'text-[20px] leading-[2.05]' :
    fontSizeScale === 'xlarge' ? 'text-[22.5px] leading-[2.2]' :
    'text-[17.5px] leading-[1.9]';

  return (
    <div className="bg-[#EAE6DF] min-h-screen py-6 font-serif">
      
      {/* 1. Top Print Controls Header (Hidden during actual print) */}
      <PrintToolbar
        onBack={onBack}
        selectedEdition={selectedEdition}
        onSelectEdition={setSelectedEdition}
        selectedUnit={selectedUnit}
        onSelectUnit={setSelectedUnit}
        showSolutions={showSolutions}
        onToggleSolutions={() => setShowSolutions(prev => !prev)}
        showCoverAndToc={showCoverAndToc}
        onToggleCoverAndToc={() => setShowCoverAndToc(prev => !prev)}
        fontSizeScale={fontSizeScale}
        onChangeFontSize={setFontSizeScale}
      />

      {/* 2. Master Printable Book Canvas (A4 Publication Standard) */}
      <main className={`max-w-[950px] mx-auto bg-[#FFFFFF] p-6 sm:p-14 shadow-2xl border-2 border-[#0C1E36]/30 text-[#1D1D1B] space-y-12 ${scaleClass}`}>
        
        {/* Cover Page (Grand Luxury Edition) */}
        {(showCoverAndToc || selectedUnit === 'cover-only') && (
          <BookCover 
            selectedUnitId={selectedUnit}
            editionTitle={
              selectedEdition === 'student' ? 'نسخة الطالب المتكاملة — الإصدار الأكاديمي المعتمد' :
              selectedEdition === 'teacher' ? 'نسخة المعلم الإرشادية وخطط التدريس النموذجية' :
              selectedEdition === 'assessments' ? 'كتاب الأداءات والتقييمات المدرسية المعتمدة (ص ۳ - ۸٤)' :
              selectedEdition === 'glossary' ? 'معجم المصطلحات والمفاهيم المحاسبية — الإصدار المعجمي المطبوع المعتمد' :
              selectedEdition === 'qbank' ? 'كتيب بنك الأسئلة الموحد (أسئلة معتمدة ومصنفة)' :
              selectedEdition === 'exams' ? 'كتيب الامتحانات والمحاكاة الرسمية للبكالوريا' :
              'كتيب الإجابات النموذجية وسلالم التحكيم الوزارية'
            }
          />
        )}

        {/* Table of Contents Structured by Units */}
        {showCoverAndToc && selectedUnit !== 'cover-only' && selectedEdition !== 'glossary' && (
          <BookTableOfContents 
            selectedUnitId={selectedUnit}
            onSelectUnit={(uId) => setSelectedUnit(uId)}
          />
        )}

        {/* Master Weekly Pacing & Pedagogical Distribution Guide (Dedicated to Teacher Edition) */}
        {selectedEdition === 'teacher' && selectedUnit !== 'cover-only' && (
          <section className="space-y-6 page-break-after border-4 border-[#1E3A8A] bg-[#FFFFFF] p-6 sm:p-8 shadow-md">
            <WeeklyCurriculumPacingView isPrintMode={true} />
          </section>
        )}

        {/* 3. Core Lessons Content (When Edition is Student or Teacher) */}
        {(selectedEdition === 'student' || selectedEdition === 'teacher') && (
          <div className="space-y-12">
            {activeUnitsList.map((unitNumber) => {
              const currentUnitId = `unit-${unitNumber}`;
              const unitLessons = getLessonsForUnit(currentUnitId);
              const unitMeta = availableUnits.find(u => u.unitNumber === unitNumber);

              return (
                <section key={currentUnitId} className="space-y-10">
                  
                  {/* Unit Separator Header Page (Top-tier commercial book divider) */}
                  <div className="border-4 border-[#0C1E36] bg-[#FAF8F5] p-8 sm:p-10 text-center space-y-5 page-break-after shadow-md">
                    <div className="flex items-center justify-between border-b-2 border-[#C5A059] pb-3 text-xs font-mono">
                      <span className="bg-[#0C1E36] text-[#C5A059] px-3 py-1 font-bold">
                        UNIT {unitNumber} OF 10 • المنهج الوزاري المعتمد
                      </span>
                      <span className="text-[#781D28] font-bold">
                        الوزن النسبي بالامتحان: {unitNumber === 10 ? '14%' : '10%'}
                      </span>
                    </div>

                    <div className="space-y-2 py-4">
                      <span className="text-xs font-bold text-[#8A5D00] uppercase tracking-widest font-mono block">
                        CURRICULUM MODULE
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#0C1E36] leading-tight">
                        {unitMeta?.title || `الوحدة ${unitNumber}`}
                      </h2>

                      {unitMeta?.subtitle && (
                        <p className="text-sm sm:text-base font-bold text-[#781D28] max-w-2xl mx-auto font-sans">
                          {unitMeta.subtitle}
                        </p>
                      )}
                    </div>

                    {unitMeta?.bigIdea && (
                      <div className="bg-[#FFFFFF] p-4 sm:p-5 border-2 border-[#C5A059] max-w-2xl mx-auto text-xs sm:text-sm text-[#1D1D1B] leading-relaxed font-sans shadow-2xs">
                        <strong className="block text-[#0C1E36] mb-1 font-serif text-sm">
                          💡 الفكرة الكبرى للوحدة (Big Idea):
                        </strong>
                        <p className="text-[#1D1D1B]/90">{unitMeta.bigIdea}</p>
                      </div>
                    )}

                    <div className="pt-3 text-xs text-[#0C1E36] flex flex-wrap items-center justify-center gap-6 font-mono border-t border-[#0C1E36]/15">
                      <span>عدد الدروس: {unitLessons.length} دروس كاملة</span>
                      <span>•</span>
                      <span>دليل استدلال JRE (20 درجة)</span>
                      <span>•</span>
                      <span>تطبيقات ودورة مستندية</span>
                    </div>

                    {/* Separator Footer Legal Bar */}
                    <div className="text-[10px] text-[#1D1D1B]/60 font-sans pt-2">
                      جميع الحقوق محفوظة © سلسلة المحاسبة المالية ببساطة وإتقان • إيداع دار الكتب: 14280 / 2026
                    </div>
                  </div>

                  {/* Lessons Loop for this Unit (supports full unit or individual lesson) */}
                  {(selectedLesson
                    ? unitLessons.filter(l => l.id === selectedLesson || (l as any).lessonId === selectedLesson || String(l.order) === selectedLesson)
                    : unitLessons
                  ).map((lesson, lIdx) => (
                    <PrintLessonContent
                      key={lesson.id}
                      lesson={lesson}
                      showSolutions={showSolutions}
                      isTeacherEdition={selectedEdition === 'teacher'}
                      unitTitle={unitMeta?.shortTitle || `الوحدة ${unitNumber}`}
                      lessonIndex={lIdx + 1}
                    />
                  ))}

                </section>
              );
            })}
          </div>
        )}

        {/* Dedicated Glossary Booklet Edition */}
        {selectedEdition === 'glossary' && selectedUnit !== 'cover-only' && (
          <PrintGlossaryBooklet 
            selectedUnitId={selectedUnit} 
            showSolutions={showSolutions} 
          />
        )}

        {/* Dedicated Ministry Assessments Book Edition */}
        {selectedEdition === 'assessments' && selectedUnit !== 'cover-only' && (
          <PrintAssessmentsBook
            selectedUnitId={selectedUnit}
            showSolutions={showSolutions}
          />
        )}

        {/* 4. Question Bank Edition */}
        {(selectedEdition === 'qbank' || selectedEdition === 'answers') && selectedUnit !== 'cover-only' && (
          <div className="space-y-8">
            <div className="border-b-4 border-[#0C1E36] pb-5 bg-[#FAF8F5] p-6 border-2 border-[#0C1E36]">
              <span className="text-sm font-mono text-[#8A5D00] font-bold uppercase tracking-widest block">
                COMPREHENSIVE QUESTION BANK
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#0C1E36] mt-1">
                {selectedEdition === 'qbank' ? 'بنك الأسئلة الشامل الموثق' : 'دليل الإجابات وسلالم التصحيح النموذجية'}
              </h2>
              <p className="text-sm sm:text-base text-[#1D1D1B]/85 mt-2 font-sans leading-relaxed">
                أسئلة مصنفة وفق مستويات بلوم المعرفية (تذكر، فهم، تطبيق، تحليل، استدلال) مع الإحالة المباشرة لكتاب الوزارة
              </p>
            </div>

            <div className="space-y-6">
              {expandedQuestionBank.map((q, idx) => (
                <div key={q.id} className="border-2 border-[#0C1E36]/20 p-5 sm:p-6 space-y-3.5 bg-[#FFFFFF] page-break-inside-avoid shadow-xs">
                  <div className="flex flex-wrap justify-between items-center gap-2 font-bold border-b border-[#0C1E36]/10 pb-2.5 text-[#0C1E36]">
                    <span className="font-serif text-base sm:text-lg">
                      #{idx + 1} — {q.concept} ({q.difficulty === 'basic' ? 'مستوى أساسي' : q.difficulty === 'intermediate' ? 'مستوى متوسط' : 'مستوى متقدم/تحدي'})
                    </span>
                    <span className="font-mono text-xs sm:text-sm bg-[#FAF8F5] px-3 py-1 border border-[#C5A059] font-bold">
                      كتاب الوزارة ص {q.sourceMapping.source_page}
                    </span>
                  </div>

                  <p className="font-medium text-base sm:text-lg text-[#1D1D1B] leading-relaxed font-serif">
                    {q.question}
                  </p>
                  
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm sm:text-base">
                      {q.options.map((opt, i) => (
                        <div key={i} className="p-3 bg-[#FAF8F5] border border-[#0C1E36]/15 flex items-center gap-2">
                          <span className="font-bold font-mono text-[#0C1E36] bg-[#FFFFFF] w-6 h-6 flex items-center justify-center border border-[#0C1E36]/20 shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="leading-normal">{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {showSolutions && (
                    <div className="bg-[#F0FDF4] border-r-4 border-emerald-700 p-4 text-[#14532D] space-y-2 mt-3 shadow-xs">
                      <div className="font-bold text-sm sm:text-base font-serif">
                        ✓ الإجابة الصحيحة المعتمدة: {String(q.correctAnswer)}
                      </div>
                      <div className="text-sm sm:text-base leading-relaxed text-[#14532D]/95">
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Question Bank Copyright Footnote */}
            <div className="pt-4 border-t-2 border-[#0C1E36] text-center text-xs text-[#1D1D1B]/80 font-mono">
              جميع حقوق بنك الأسئلة محفوظة © 2026/2027 دار التميز للنشر • إيداع دار الكتب 14280 / 2026 • ISBN: 978-977-08-4120-1
            </div>
          </div>
        )}

        {/* 5. Comprehensive Exams Edition */}
        {selectedEdition === 'exams' && (
          <div className="space-y-12">
            <div className="border-b-4 border-[#0C1E36] pb-5 bg-[#FAF8F5] p-6 border-2 border-[#0C1E36]">
              <span className="text-sm font-mono text-[#8A5D00] font-bold uppercase tracking-widest block">
                OFFICIAL EXAM SIMULATIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#0C1E36] mt-1">
                نماذج الامتحانات والمحاكاة الرسمية للبكالوريا المصرية
              </h2>
              <p className="text-sm sm:text-base text-[#1D1D1B]/85 mt-2 font-sans leading-relaxed">
                مطابقة بنسبة 100% لمواصفات الورقة الامتحانية وتوزيع درجات وزارة التربية والتعليم والمركز القومي للامتحانات
              </p>
            </div>

            {comprehensiveExams.map((exam) => (
              <div key={exam.id} className="border-2 border-[#0C1E36] p-6 sm:p-10 space-y-8 page-break-after bg-[#FFFFFF] shadow-sm">
                
                {/* Official Exam Cover Sheet Simulator */}
                <div className="text-center border-2 border-[#0C1E36] pb-5 space-y-3 bg-[#FAF8F5] p-6">
                  <div className="flex justify-between items-center text-sm font-serif font-bold text-[#0C1E36] border-b border-[#0C1E36]/20 pb-2.5">
                    <span>جمهورية مصر العربية — وزارة التربية والتعليم</span>
                    <span>امتحان شهادة البكالوريا المصرية 2027</span>
                  </div>

                  <span className="text-xs font-mono bg-[#0C1E36] text-[#C5A059] px-3 py-1 font-bold uppercase inline-block">
                    MINISTRY EXAM BLUEPRINT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#0C1E36] mt-1">{exam.title}</h3>
                  <p className="text-sm sm:text-base text-[#781D28] font-bold">{exam.subtitle}</p>
                  
                  {/* Student Data Box (Simulator) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 text-xs sm:text-sm text-[#1D1D1B] border-t border-[#0C1E36]/15">
                    <div className="p-2 bg-[#FFFFFF] border border-[#0C1E36]/20 text-right">اسم الطالب: ................</div>
                    <div className="p-2 bg-[#FFFFFF] border border-[#0C1E36]/20 text-right">رقم الجلوس: ................</div>
                    <div className="p-2 bg-[#FFFFFF] border border-[#0C1E36]/20 text-right">المدرسة: ....................</div>
                    <div className="p-2 bg-[#FFFFFF] border border-[#0C1E36]/20 text-right">الإدارة: ....................</div>
                  </div>

                  <div className="text-sm text-[#0C1E36] flex items-center justify-center gap-6 pt-2 font-mono font-bold">
                    <span>زمن الإجابة: {exam.timeAllowedMinutes} دقيقة</span>
                    <span>•</span>
                    <span>الدرجة الكلية: {exam.totalMarks} درجة</span>
                  </div>
                </div>

                <div className="space-y-8">
                  {exam.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-4 page-break-inside-avoid">
                      <div className="flex items-center justify-between bg-[#FAF8F5] p-3.5 border-r-4 border-[#0C1E36] font-bold text-sm sm:text-base">
                        <span className="text-[#0C1E36] font-serif">{sec.title}</span>
                        <span className="text-[#781D28] font-mono font-bold bg-[#FFFFFF] px-2.5 py-0.5 border border-[#781D28]/30">{sec.marks} درجات</span>
                      </div>

                      <div className="space-y-4 pr-2">
                        {sec.questions.map((q, qIdx) => (
                          <div key={q.id} className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#0C1E36]/15 space-y-3">
                            <div className="flex justify-between items-start gap-3 font-bold text-[#0C1E36] text-sm sm:text-base">
                              <span className="leading-relaxed">س ({qIdx + 1}): {q.prompt}</span>
                              <span className="font-mono text-[#781D28] shrink-0 bg-[#FFF5F5] px-2 py-0.5 border border-[#781D28]/20">({q.marks} درجات)</span>
                            </div>

                            {q.options && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm sm:text-base">
                                {q.options.map((opt, oi) => (
                                  <div key={oi} className="p-3 bg-[#FAF8F5] border border-[#0C1E36]/10 leading-relaxed flex items-center gap-2">
                                    <span className="font-bold font-mono bg-[#FFFFFF] w-6 h-6 flex items-center justify-center border border-[#0C1E36]/20 shrink-0">
                                      {oi + 1}
                                    </span>
                                    <span>{opt}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {showSolutions && (q as any).modelAnswer && (
                              <div className="bg-[#F0FDF4] p-4 border-r-4 border-emerald-700 text-[#14532D] text-sm sm:text-base mt-3 shadow-xs space-y-1">
                                <strong className="font-bold text-emerald-950 font-serif block">نموذج الإجابة وسلم الدرجات الوزاري: </strong>
                                <span className="leading-relaxed block">{(q as any).modelAnswer}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exam Sheet Legal Copyright Footer */}
                <div className="pt-4 border-t-2 border-[#0C1E36] text-center text-xs text-[#1D1D1B]/75 font-mono">
                  نموذج محاكاة رسمي © 2026/2027 دار التميز للنشر • إيداع دار الكتب: 14280 / 2026 • يُحظر النسخ
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. Grand Back Cover & Publishing Blurb (El-Moasser & Al-Emtehan Standard) */}
        {showCoverAndToc && (
          <footer className="border-4 border-[#0C1E36] bg-[#0C1E36] text-[#FDFCF7] p-8 sm:p-12 text-center space-y-6 page-break-after shadow-2xl relative overflow-hidden">
            {/* Background Seal */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
              <ShieldCheck className="w-[500px] h-[500px] text-[#C5A059]" />
            </div>

            <div className="relative z-10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block bg-[#1A2D47] px-4 py-1 max-w-xs mx-auto border border-[#C5A059]/40">
                OFFICIAL NATIONAL COMPLIANCE
              </span>
              <h3 className="text-3xl sm:text-4xl font-black font-serif text-[#FFFFFF]">
                المحاسبة المالية ببساطة وإتقان — المرجع الشامل الأول
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DCC4] max-w-2xl mx-auto font-sans leading-relaxed">
                تم هذا المصنف التعليمي بحمد الله وتوفيقه ليكون النموذج الأرقى في إعداد طلاب البكالوريا المصرية (EB)، والجمع بين متعة الفهم ودقة التطبيق وضمان أعلى الدرجات في الامتحانات الوزارية وسؤال مقال الاستدلال JRE.
              </p>
            </div>

            {/* Back Cover Pillars */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-right max-w-3xl mx-auto">
              <div className="bg-[#1A2D47] p-3 border border-[#C5A059]/40 space-y-1">
                <strong className="text-[#C5A059] block">✓ المنهج الكامل:</strong>
                <p className="text-[11px] text-[#E8DCC4]/90">10 وحدات و 58 درساً شاملة الشرح والتطبيقات.</p>
              </div>
              <div className="bg-[#1A2D47] p-3 border border-[#C5A059]/40 space-y-1">
                <strong className="text-[#C5A059] block">✓ ضمان الـ 20 درجة:</strong>
                <p className="text-[11px] text-[#E8DCC4]/90">تدريب متكامل على مقال الاستدلال المحاسبي JRE.</p>
              </div>
              <div className="bg-[#1A2D47] p-3 border border-[#C5A059]/40 space-y-1">
                <strong className="text-[#C5A059] block">✓ بنك الأسئلة والمحاكاة:</strong>
                <p className="text-[11px] text-[#E8DCC4]/90">أكثر من 300 سؤال ونماذج امتحانات مطابقة للوزارة.</p>
              </div>
            </div>

            {/* Barcode, ISBN, Deposit & Legal Credentials */}
            <div className="relative z-10 pt-4 border-t-2 border-[#C5A059]/50 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8DCC4] gap-4 font-mono">
              <div className="text-right space-y-0.5">
                <div className="font-bold text-[#FFFFFF]">دار التميز للنشر والتقنيات التعليمية • القاهرة</div>
                <div>رقم الإيداع بدار الكتب والوثائق المصرية: 14280 / 2026</div>
                <div>الترقيم الدولي الموحد (ISBN): 978-977-08-4120-1</div>
              </div>

              <div className="flex items-center gap-2 bg-[#1A2D47] p-2 border border-[#C5A059]/40">
                <QrCode className="w-8 h-8 text-[#C5A059]" />
                <div className="text-[9px] text-right font-bold">
                  <div className="text-[#FFFFFF]">VERIFIED EDITION</div>
                  <div className="text-[#C5A059]">جميع الحقوق محفوظة © 2027</div>
                </div>
              </div>
            </div>
          </footer>
        )}

      </main>

    </div>
  );
};
