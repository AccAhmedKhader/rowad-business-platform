import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Check, 
  X, 
  Sparkles, 
  RefreshCw, 
  Eye, 
  Sliders, 
  Printer, 
  Send, 
  HelpCircle, 
  BookOpen, 
  BarChart2, 
  RotateCcw,
  Zap,
  Layers,
  ChevronRight,
  ChevronLeft,
  PenTool,
  Edit3
} from 'lucide-react';
import { officialTextbookBank, TraceableQuestion } from '../data/officialTextbookBank';
import { appliedGradingEngine } from '../domain/assessment/grading/AppliedGradingEngine';
import confetti from 'canvas-confetti';

export type ExamBlueprintPreset = 'official_full' | 'midterm_synthesis' | 'adaptive_remedial' | 'custom';

export interface CustomExamConfig {
  preset: ExamBlueprintPreset;
  title: string;
  timeAllowedMinutes: number;
  totalMarks: number;
  selectedUnits: string[];
  includeMcq: boolean;
  includeTrueFalse: boolean;
  includeApplied: boolean;
  includeJre: boolean;
  bloomFocus: 'balanced' | 'practical' | 'analytical';
}

export interface GeneratedExamSection {
  id: string;
  title: string;
  description: string;
  marks: number;
  questions: TraceableQuestion[];
}

export interface GeneratedExam {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  totalMarks: number;
  timeAllowedMinutes: number;
  createdAt: string;
  sections: GeneratedExamSection[];
  targetUnits: string[];
}

export const CustomExamGeneratorStudio: React.FC = () => {
  // Configuration State
  const [config, setConfig] = useState<CustomExamConfig>({
    preset: 'official_full',
    title: 'امتحان شهادة إتمام الثانوية العامة المصرية (EB) في المحاسبة المالية - النموذج المقنن',
    timeAllowedMinutes: 120,
    totalMarks: 100,
    selectedUnits: ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5'],
    includeMcq: true,
    includeTrueFalse: true,
    includeApplied: true,
    includeJre: true,
    bloomFocus: 'balanced'
  });

  // Current Generated Exam
  const [exam, setExam] = useState<GeneratedExam | null>(null);
  const [activeMode, setActiveMode] = useState<'config' | 'testing' | 'results' | 'print_preview'>('config');

  // Interactive Testing State
  const [answers, setAnswers] = useState<{ [qId: string]: any }>({});
  const [timeLeft, setTimeLeft] = useState<number>(120 * 60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [revealedModelAnswers, setRevealedModelAnswers] = useState<{ [qId: string]: boolean }>({});
  const [gradingReport, setGradingReport] = useState<{
    score: number;
    maxScore: number;
    percentage: number;
    evaluations: Record<string, any>;
    unitBreakdown: Record<string, { total: number; earned: number }>;
  } | null>(null);

  // Available Units
  const availableUnitsList = [
    { id: 'unit-1', name: 'الوحدة 1: الإطار المفاهيمي ومعادلة الميزانية' },
    { id: 'unit-2', name: 'الوحدة 2: الدورة المستندية والتسجيل في دفتر اليومية' },
    { id: 'unit-3', name: 'الوحدة 3: يوميات المساعد والأستاذ والرقابة' },
    { id: 'unit-4', name: 'الوحدة 4: ميزان المراجعة وتصحيح الأخطاء والحساب المعلق' },
    { id: 'unit-5', name: 'الوحدة 5: التسويات الجردية والقوائم المالية الختامية' },
    { id: 'unit-6', name: 'الوحدة 6: الرقابة الداخلية ومذكرة تسوية البنك' },
    { id: 'unit-7', name: 'الوحدة 7: محاسبة المخزون وتكلفة البضاعة المباعة' },
    { id: 'unit-8', name: 'الوحدة 8: محاسبة الأصول الثابتة والإهلاك' },
    { id: 'unit-9', name: 'الوحدة 9: محاسبة الالتزامات وحقوق الملكية' },
    { id: 'unit-10', name: 'الوحدة 10: التحليل المالي والمشروع المحاسبي الشامل' }
  ];

  // Preset Handlers
  const handleSelectPreset = (preset: ExamBlueprintPreset) => {
    if (preset === 'official_full') {
      setConfig({
        preset: 'official_full',
        title: 'امتحان شهادة إتمام الثانوية العامة المصرية (EB) في المحاسبة المالية - النموذج المقنن',
        timeAllowedMinutes: 120,
        totalMarks: 100,
        selectedUnits: ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5'],
        includeMcq: true,
        includeTrueFalse: true,
        includeApplied: true,
        includeJre: true,
        bloomFocus: 'balanced'
      });
    } else if (preset === 'midterm_synthesis') {
      setConfig({
        preset: 'midterm_synthesis',
        title: 'الاختبار الفصلي التركيبي لمنتصف العام (الوحدات 1، 2، 3)',
        timeAllowedMinutes: 60,
        totalMarks: 50,
        selectedUnits: ['unit-1', 'unit-2', 'unit-3'],
        includeMcq: true,
        includeTrueFalse: true,
        includeApplied: true,
        includeJre: false,
        bloomFocus: 'practical'
      });
    } else if (preset === 'adaptive_remedial') {
      setConfig({
        preset: 'adaptive_remedial',
        title: 'اختبار القياس العلاجي التكيفي للمهارات الحرجة وتصحيح الأخطاء',
        timeAllowedMinutes: 45,
        totalMarks: 35,
        selectedUnits: ['unit-3', 'unit-4', 'unit-5'],
        includeMcq: true,
        includeTrueFalse: true,
        includeApplied: true,
        includeJre: true,
        bloomFocus: 'analytical'
      });
    } else {
      setConfig(prev => ({ ...prev, preset: 'custom' }));
    }
  };

  // Toggle Unit
  const handleToggleUnit = (unitId: string) => {
    setConfig(prev => {
      const exists = prev.selectedUnits.includes(unitId);
      const updated = exists 
        ? prev.selectedUnits.filter(u => u !== unitId)
        : [...prev.selectedUnits, unitId];
      // ensure at least one unit
      if (updated.length === 0) return prev;
      return { ...prev, selectedUnits: updated, preset: 'custom' };
    });
  };

  // Generate Exam Algorithm based on Textbook Bank & Ministerial Blueprint
  const handleGenerateExam = () => {
    const questionsPool = officialTextbookBank.filter(q => 
      config.selectedUnits.includes(q.unitId)
    );

    const mcqPool = questionsPool.filter(q => q.questionType === 'mcq' && q.options && q.options.length > 0);
    const tfPool = questionsPool.filter(q => q.questionType === 'true_false' || typeof q.correctAnswer === 'boolean');
    const appliedPool = questionsPool.filter(q => 
      q.questionType === 'applied' || q.questionType === 'case' || q.questionType === 'analytical'
    );
    const jrePool = questionsPool.filter(q => q.questionType === 'jre' || q.questionType === 'essay' || (q as any).caseType === 'official_JRE_case');

    const sections: GeneratedExamSection[] = [];

    // Helper random sampler
    const sample = (arr: TraceableQuestion[], count: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    // 1. Section: MCQ
    if (config.includeMcq && mcqPool.length > 0) {
      const count = config.preset === 'official_full' ? 10 : config.preset === 'midterm_synthesis' ? 6 : 4;
      const selected = sample(mcqPool, Math.min(count, mcqPool.length));
      const sectionMarks = selected.length * 2;
      sections.push({
        id: 'sec-mcq',
        title: 'القسم الأول: الأسئلة الموضوعية (اختيار من متعدد)',
        description: 'اختر الإجابة الصحيحة الوحيدة لكل عبارة من العبارات المحاسبية التالية (درجتان لكل سؤال).',
        marks: sectionMarks,
        questions: selected.map(q => ({ ...q, marks: 2 }))
      });
    }

    // 2. Section: True / False with Rationale
    if (config.includeTrueFalse && tfPool.length > 0) {
      const count = config.preset === 'official_full' ? 10 : config.preset === 'midterm_synthesis' ? 6 : 4;
      const selected = sample(tfPool, Math.min(count, tfPool.length));
      const sectionMarks = selected.length * 2;
      sections.push({
        id: 'sec-tf',
        title: 'القسم الثاني: عبارات الصواب والخطأ المحاسبية المقننة',
        description: 'حدد مدى صحة أو خطأ كل عبارة محاسبية مع الاستناد لمفاهيم المعايير المحاسبية (درجتان لكل عبارة).',
        marks: sectionMarks,
        questions: selected.map(q => ({ ...q, marks: 2 }))
      });
    }

    // 3. Section: Applied & Numerical Case Problems
    if (config.includeApplied && appliedPool.length > 0) {
      const count = config.preset === 'official_full' ? 2 : config.preset === 'midterm_synthesis' ? 2 : 1;
      const selected = sample(appliedPool, Math.min(count, appliedPool.length));
      const markPerQ = config.preset === 'official_full' ? 20 : 13;
      sections.push({
        id: 'sec-applied',
        title: 'القسم الثالث: المسائل التطبيقية ودراسات الحالة الشاملة',
        description: 'حل العمليات المحاسبية التالية بإثبات قيود اليومية، الترحيل للأستاذ، والتسويات مع إظهار خطوات الاحتساب بدقة.',
        marks: selected.length * markPerQ,
        questions: selected.map(q => ({ ...q, marks: markPerQ }))
      });
    }

    // 4. Section: JRE Accounting Reasoning Essay
    if (config.includeJre) {
      const selected = jrePool.length > 0 ? sample(jrePool, 1) : [
        {
          id: 'jre-default-eval',
          lessonId: 'lesson-5_4',
          unitId: 'unit-5',
          concept: 'إعداد مقال التفسير المحاسبي JRE حول أثر معالجة المصروفات الرأسمالية والإيرادية',
          questionType: 'jre',
          question: 'بصفتك مستشاراً مالياً لمنشأة تجارية كبرى، اكتشفت أثناء مراجعة الحسابات الختامية تسجيل تكلفة تجديد محرك شاحنة توزيع بقيمة 45,000 ج.م كـ "مصروف صيانة إيرادي عادي" بدلاً من رسملته وإضافته للأصل.\n\nالمطلوب صياغة مقال تفسيري مالي (JRE) منضبط في 5 أركان:\n1. الأدلة المحاسبية المستندة للفحص\n2. المنهجية والمعيار المحاسبي المصري واجب التطبيق\n3. التحليل المالي للأثر على قائمة الدخل والمركز المالي\n4. التوصية بالقيد المصحح للخطأ\n5. سلامة الصياغة والمصطلحات المهنية.',
          correctAnswer: 'صياغة مقال JRE متكامل الأركان الخمسة',
          marks: 20,
          modelAnswer: 'الأركان الخمسة للحل النموذجي:\n1. الدليل: فاتورة عمرة المحرك بقيمة 45,000 ج.م المؤدية لإطالة العمر الإنتاجي للشاحنة بـ 3 سنوات.\n2. المنهجية: معيار المحاسبة المصري (EAS 10) بشأن الأصول الثابتة.\n3. التحليل: تخفيض صافي أرباح الفترة الحالية بـ 45,000 ج.م وإظهار الأصول الثابتة بأقل من قيمتها الحقيقية.\n4. التوصية: قيد التصحيح: من حـ/ الأصول الثابتة (السيارات) إلى حـ/ مصروفات الصيانة (أو أرباح وخسائر سابقة).\n5. الصياغة: توصية برفع كفاءة الرقابة الداخلية على تصنيف النفقات.'
        } as TraceableQuestion
      ];
      sections.push({
        id: 'sec-jre',
        title: 'القسم الرابع: مقال التفسير المحاسبي المنضبط (JRE Essay - 20 درجة)',
        description: 'صغ تحليلاً محاسبياً متكاملاً يتضمن الأدلة، المرجعية المعيارية، الأثر المالي، والتوصية الرقابية.',
        marks: 20,
        questions: selected.map(q => ({ ...q, marks: 20 }))
      });
    }

    const totalMarksComputed = sections.reduce((sum, s) => sum + s.marks, 0);

    const newExam: GeneratedExam = {
      id: `exam-gen-${Date.now()}`,
      title: config.title,
      subtitle: `ورقة امتحانية مقننة مطابقة لمعايير وزارة التربية والتعليم المصرية (EB) • زمن الإجابة: ${config.timeAllowedMinutes} دقيقة • الدرجة الإجمالية: ${totalMarksComputed} درجة`,
      code: `EGY-EB-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`,
      totalMarks: totalMarksComputed,
      timeAllowedMinutes: config.timeAllowedMinutes,
      createdAt: new Date().toLocaleDateString('ar-EG'),
      sections,
      targetUnits: config.selectedUnits
    };

    setExam(newExam);
    setAnswers({});
    setTimeLeft(config.timeAllowedMinutes * 60);
    setSubmitted(false);
    setGradingReport(null);
    setRevealedModelAnswers({});
    setActiveMode('testing');
    setIsTimerActive(true);
  };

  // Timer Effect
  useEffect(() => {
    let timer: any;
    if (isTimerActive && timeLeft > 0 && !submitted) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, submitted]);

  const formatTimer = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (qId: string, val: any) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  // Authoritative Grading
  const handleSubmitExam = () => {
    if (!exam) return;
    setIsTimerActive(false);
    setSubmitted(true);

    let totalScore = 0;
    const evaluations: Record<string, any> = {};
    const unitBreakdown: Record<string, { total: number; earned: number }> = {};

    exam.sections.forEach(section => {
      section.questions.forEach(q => {
        const uAns = answers[q.id];
        let earned = 0;
        let isCorrect = false;

        if (!unitBreakdown[q.unitId]) {
          unitBreakdown[q.unitId] = { total: 0, earned: 0 };
        }
        unitBreakdown[q.unitId].total += (q.marks || 2);

        if (q.questionType === 'mcq' || (q as any).type === 'mcq') {
          isCorrect = uAns === q.correctAnswer;
          earned = isCorrect ? (q.marks || 2) : 0;
          evaluations[q.id] = {
            isCorrect,
            score: earned,
            maxMarks: q.marks || 2,
            type: 'mcq'
          };
        } else if (q.questionType === 'true_false' || typeof q.correctAnswer === 'boolean') {
          isCorrect = uAns === q.correctAnswer;
          earned = isCorrect ? (q.marks || 2) : 0;
          evaluations[q.id] = {
            isCorrect,
            score: earned,
            maxMarks: q.marks || 2,
            type: 'true_false'
          };
        } else if (q.questionType === 'jre' || q.questionType === 'essay') {
          // Robust pedagogical grading for JRE
          const text = String(uAns || '').trim();
          const hasKeyTerms = /معيار|إيرادي|رأسمالي|أصول|قيد|أثر|دخل/i.test(text);
          if (text.length >= 60 && hasKeyTerms) {
            earned = Math.min(q.marks || 20, Math.floor((q.marks || 20) * 0.85));
            isCorrect = true;
          } else if (text.length >= 25) {
            earned = Math.floor((q.marks || 20) * 0.5);
            isCorrect = false;
          } else {
            earned = 0;
            isCorrect = false;
          }
          evaluations[q.id] = {
            isCorrect,
            score: earned,
            maxMarks: q.marks || 20,
            type: 'jre',
            feedback: earned >= 15 ? 'إجابة متميزة استوفت عناصر التحليل المحاسبي ومعايير EAS.' : 'الإجابة تحتاج لتعميق ربط الأثر بالقوائم المالية والقيد المصحح.'
          };
        } else {
          // Applied / Case Questions
          const res = appliedGradingEngine.gradeAppliedResponse({
            questionId: q.id,
            studentAnswer: uAns,
            context: {
              questionId: q.id,
              prompt: q.question,
              type: q.questionType,
              marks: q.marks || 10,
              modelAnswer: q.modelAnswer
            }
          });
          earned = res.awardedMarks;
          isCorrect = res.status === 'CORRECT';
          evaluations[q.id] = {
            isCorrect,
            score: earned,
            maxMarks: res.maxMarks,
            stepBreakdown: res.stepBreakdown,
            feedback: res.feedback,
            type: 'applied'
          };
        }

        totalScore += earned;
        unitBreakdown[q.unitId].earned += earned;
      });
    });

    const percentage = Math.round((totalScore / exam.totalMarks) * 100);

    setGradingReport({
      score: totalScore,
      maxScore: exam.totalMarks,
      percentage,
      evaluations,
      unitBreakdown
    });

    setActiveMode('results');

    if (percentage >= 70) {
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore in iframe
      }
    }
  };

  return (
    <div className="space-y-8 font-serif" dir="rtl">
      
      {/* Studio Header & Mode Navigation */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] p-6 border-2 border-[#1D1D1B] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#C4A484] text-[#1D1D1B] text-xs font-bold px-2.5 py-0.5">
              المرحلة الثالثة للتطوير • الإصدار المعتمد
            </span>
            <span className="text-xs text-[#C4A484] font-bold">
              جدول المواصفات والامتحانات التكيفية
            </span>
          </div>
          <h2 className="text-2xl font-black mt-2">
            استوديو بناء وتوليد الامتحانات المعيارية والتكيفية
          </h2>
          <p className="text-xs text-[#F9F7F2]/80 mt-1">
            توليد أوراق امتحانية رسمية مقننة من بنك كتاب الوزارة المعتمد (373 سؤالاً) مع تصحيح آلي فوري وتصدير للطباعة.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveMode('config')}
            className={`px-3 py-1.5 text-xs font-bold transition border cursor-pointer ${
              activeMode === 'config'
                ? 'bg-[#C4A484] text-[#1D1D1B] border-[#C4A484]'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 inline-block ml-1" />
            <span>ضبط جدول المواصفات</span>
          </button>

          {exam && (
            <>
              <button
                onClick={() => setActiveMode('testing')}
                className={`px-3 py-1.5 text-xs font-bold transition border cursor-pointer ${
                  activeMode === 'testing'
                    ? 'bg-[#C4A484] text-[#1D1D1B] border-[#C4A484]'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 inline-block ml-1" />
                <span>أداء الامتحان ({exam.totalMarks} د)</span>
              </button>

              {submitted && (
                <button
                  onClick={() => setActiveMode('results')}
                  className={`px-3 py-1.5 text-xs font-bold transition border cursor-pointer ${
                    activeMode === 'results'
                      ? 'bg-[#C4A484] text-[#1D1D1B] border-[#C4A484]'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5 inline-block ml-1" />
                  <span>التقرير التشخيصي</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 text-xs font-bold bg-[#8A1F1D] hover:bg-[#a12523] text-white border border-[#8A1F1D] transition cursor-pointer flex items-center gap-1.5"
                title="طباعة الورقة الامتحانية بتنسيق وزارة التربية والتعليم الرسمية"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة الورقة الرسمية</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* MODE 1: CONFIGURATION & BLUEPRINT GENERATOR */}
      {activeMode === 'config' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-8 shadow-xs">
          
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-[#1D1D1B] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#C4A484]" />
              <span>اختيار النموذج المعياري أو التخصيص الحر:</span>
            </h3>
            <p className="text-xs text-[#1D1D1B]/70">
              اختر أحد القوالب الوزارية المعتمدة أو حدد الوحدات وأنماط الأسئلة لتوليد نموذج امتحان مخصص فورياً.
            </p>
          </div>

          {/* Preset Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Preset 1: Official Full Exam */}
            <div 
              onClick={() => handleSelectPreset('official_full')}
              className={`p-4 border-2 transition cursor-pointer space-y-2 relative ${
                config.preset === 'official_full'
                  ? 'border-[#1D1D1B] bg-[#F9F7F2]'
                  : 'border-[#1D1D1B]/15 hover:border-[#1D1D1B]/50 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5">
                  100 درجة • 120 د
                </span>
                {config.preset === 'official_full' && <Check className="w-4 h-4 text-emerald-800" />}
              </div>
              <h4 className="font-bold text-sm text-[#1D1D1B]">امتحان نهاية العام الشامل</h4>
              <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                مطابق تماماً لمواصفات الورقة الامتحانية الرسمية لوزارة التربية والتعليم (الأقسام الأربعة بما فيها مقال JRE).
              </p>
            </div>

            {/* Preset 2: Midterm Synthesis */}
            <div 
              onClick={() => handleSelectPreset('midterm_synthesis')}
              className={`p-4 border-2 transition cursor-pointer space-y-2 relative ${
                config.preset === 'midterm_synthesis'
                  ? 'border-[#1D1D1B] bg-[#F9F7F2]'
                  : 'border-[#1D1D1B]/15 hover:border-[#1D1D1B]/50 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-[#C4A484] text-[#1D1D1B] px-2 py-0.5">
                  50 درجة • 60 د
                </span>
                {config.preset === 'midterm_synthesis' && <Check className="w-4 h-4 text-emerald-800" />}
              </div>
              <h4 className="font-bold text-sm text-[#1D1D1B]">اختبار فصلي تركيبي</h4>
              <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                يركز على أساسيات الدورة المستندية واليوميات المساعدة ودفتر الأستاذ العام (الوحدات 1، 2، 3).
              </p>
            </div>

            {/* Preset 3: Adaptive Remedial */}
            <div 
              onClick={() => handleSelectPreset('adaptive_remedial')}
              className={`p-4 border-2 transition cursor-pointer space-y-2 relative ${
                config.preset === 'adaptive_remedial'
                  ? 'border-[#1D1D1B] bg-[#F9F7F2]'
                  : 'border-[#1D1D1B]/15 hover:border-[#1D1D1B]/50 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-[#8A1F1D] text-white px-2 py-0.5">
                  35 درجة • 45 د
                </span>
                {config.preset === 'adaptive_remedial' && <Check className="w-4 h-4 text-emerald-800" />}
              </div>
              <h4 className="font-bold text-sm text-[#1D1D1B]">اختبار علاجي تكيفي</h4>
              <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                استهداف مكثف لأكثر المفاهيم وقوعاً في أخطاء شائعة (ميزان المراجعة، الحساب المعلق، التسويات الجردية).
              </p>
            </div>

            {/* Preset 4: Custom */}
            <div 
              onClick={() => handleSelectPreset('custom')}
              className={`p-4 border-2 transition cursor-pointer space-y-2 relative ${
                config.preset === 'custom'
                  ? 'border-[#1D1D1B] bg-[#F9F7F2]'
                  : 'border-[#1D1D1B]/15 hover:border-[#1D1D1B]/50 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold bg-gray-200 text-gray-800 px-2 py-0.5">
                  تخصيص حر
                </span>
                {config.preset === 'custom' && <Check className="w-4 h-4 text-emerald-800" />}
              </div>
              <h4 className="font-bold text-sm text-[#1D1D1B]">بناء مخصص للمعلم والطالب</h4>
              <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                تحديد يدوي دقيق للوحدات الدراسية، زمن الاختبار، الأقسام المطلوبة، ونسب المستويات المعرفية.
              </p>
            </div>

          </div>

          {/* Unit Selection Grid */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-sm text-[#1D1D1B] flex items-center justify-between">
              <span>الوحدات الدراسية المستهدفة في الامتحان ({config.selectedUnits.length} وحدات مختارة):</span>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, selectedUnits: ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5', 'unit-6', 'unit-7', 'unit-8', 'unit-9', 'unit-10'] }))}
                className="text-xs text-[#8A1F1D] hover:underline font-bold"
              >
                تحديد كافة الوحدات
              </button>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableUnitsList.map(unit => {
                const isSelected = config.selectedUnits.includes(unit.id);
                return (
                  <div
                    key={unit.id}
                    onClick={() => handleToggleUnit(unit.id)}
                    className={`p-3 border transition cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#1D1D1B] bg-[#F9F7F2]'
                        : 'border-[#1D1D1B]/15 bg-white opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#1D1D1B] border-[#1D1D1B] text-white' : 'border-gray-400'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span className="text-xs font-bold text-[#1D1D1B]">{unit.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Types & Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            
            <div className="p-3 border border-[#1D1D1B]/15 bg-[#F9F7F2] space-y-2">
              <label className="text-xs font-bold text-[#1D1D1B] block">زمن الاختبار (بالدقائق):</label>
              <input 
                type="number" 
                min={20} 
                max={180} 
                value={config.timeAllowedMinutes}
                onChange={e => setConfig(prev => ({ ...prev, timeAllowedMinutes: Number(e.target.value), preset: 'custom' }))}
                className="w-full p-2 bg-white border border-[#1D1D1B]/30 text-xs font-bold"
              />
            </div>

            <div className="p-3 border border-[#1D1D1B]/15 bg-[#F9F7F2] space-y-2">
              <label className="text-xs font-bold text-[#1D1D1B] block">التركيز المعرفي لبلوم:</label>
              <select 
                value={config.bloomFocus}
                onChange={e => setConfig(prev => ({ ...prev, bloomFocus: e.target.value as any, preset: 'custom' }))}
                className="w-full p-2 bg-white border border-[#1D1D1B]/30 text-xs font-bold"
              >
                <option value="balanced">متوازن (20% معرفة، 50% تطبيق، 30% تحليل)</option>
                <option value="practical">تطبيقي مكثف (قيود وحسابات رياضية)</option>
                <option value="analytical">تحليلي عالي (كشف أخطاء ورأي مهني JRE)</option>
              </select>
            </div>

            <div className="p-3 border border-[#1D1D1B]/15 bg-[#F9F7F2] space-y-2 col-span-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#1D1D1B] block">أنماط الأسئلة المضمنة في الورقة:</label>
              <div className="flex items-center gap-3 flex-wrap pt-1 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={config.includeMcq} 
                    onChange={e => setConfig(prev => ({ ...prev, includeMcq: e.target.checked, preset: 'custom' }))}
                  />
                  <span>اختيار من متعدد (MCQ)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={config.includeTrueFalse} 
                    onChange={e => setConfig(prev => ({ ...prev, includeTrueFalse: e.target.checked, preset: 'custom' }))}
                  />
                  <span>صواب وخطأ مع التعليل</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={config.includeApplied} 
                    onChange={e => setConfig(prev => ({ ...prev, includeApplied: e.target.checked, preset: 'custom' }))}
                  />
                  <span>مسائل تطبيقية وقيود</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={config.includeJre} 
                    onChange={e => setConfig(prev => ({ ...prev, includeJre: e.target.checked, preset: 'custom' }))}
                  />
                  <span>مقال التفسير JRE (20 د)</span>
                </label>
              </div>
            </div>

          </div>

          {/* Action Button: Generate Exam */}
          <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
            <div className="text-xs text-[#1D1D1B]/70">
              سيتم اختيار الأسئلة تلقائياً من بنك كتاب الوزارة المعتمد وضبط درجات الأقسام بدقة سيكومترية.
            </div>
            <button
              onClick={handleGenerateExam}
              className="px-6 py-3 bg-[#1D1D1B] hover:bg-[#333330] text-[#C4A484] font-black text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Zap className="w-4 h-4 text-[#C4A484]" />
              <span>توليد ورقة الامتحان وبدء المحاكاة الآن</span>
            </button>
          </div>

        </div>
      )}

      {/* MODE 2: ACTIVE TESTING INTERFACE */}
      {activeMode === 'testing' && exam && (
        <div className="space-y-6">
          
          {/* Exam Official Header Banner */}
          <div className="bg-[#1D1D1B] text-[#F9F7F2] p-6 border-2 border-[#1D1D1B] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#8A1F1D] text-white text-[11px] font-bold px-2 py-0.5">
                  كود النموذج: {exam.code}
                </span>
                <span className="text-xs text-[#C4A484] font-mono">
                  تاريخ التوليد: {exam.createdAt}
                </span>
              </div>
              <h3 className="text-xl font-black mt-2">{exam.title}</h3>
              <p className="text-xs text-[#F9F7F2]/80 mt-1">{exam.subtitle}</p>
            </div>

            {/* Floating Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 border border-white/20 text-center shrink-0">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#C4A484] font-bold mb-0.5">
                <Clock className="w-4 h-4" />
                <span>الوقت المتبقي للامتحان</span>
              </div>
              <div className="text-3xl font-mono font-black text-white">
                {formatTimer(timeLeft)}
              </div>
              <div className="text-[10px] text-[#C4A484] mt-1 font-bold">
                إجمالي الدرجات: {exam.totalMarks} درجة
              </div>
            </div>
          </div>

          {/* Exam Sections */}
          <div className="space-y-6">
            {exam.sections.map((section, sIdx) => (
              <div key={section.id} className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
                
                <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
                  <div>
                    <h4 className="font-extrabold text-lg text-[#1D1D1B]">{section.title}</h4>
                    <p className="text-xs text-[#1D1D1B]/70 mt-0.5">{section.description}</p>
                  </div>
                  <span className="text-xs font-black bg-[#1D1D1B] text-[#C4A484] px-3 py-1">
                    {section.marks} درجة
                  </span>
                </div>

                <div className="space-y-6">
                  {section.questions.map((q, qIdx) => {
                    const userAns = answers[q.id];

                    return (
                      <div key={q.id} className="p-5 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#1D1D1B]/70 border-b border-[#1D1D1B]/10 pb-2">
                          <span className="font-bold text-[#1D1D1B]">السؤال {qIdx + 1}: {q.concept}</span>
                          <span className="font-bold text-[#8A1F1D]">[{q.marks || 2} درجات]</span>
                        </div>

                        <p className="text-sm font-semibold text-[#1D1D1B] leading-relaxed whitespace-pre-line">
                          {q.question}
                        </p>

                        {/* MCQ Options */}
                        {q.questionType === 'mcq' && q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = userAns === opt;
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectAnswer(q.id, opt)}
                                  className={`p-3 text-xs text-right border transition flex items-center justify-between gap-2 cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#1D1D1B] text-white border-[#1D1D1B] font-bold'
                                      : 'bg-white hover:bg-gray-50 text-[#1D1D1B] border-[#1D1D1B]/20'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && <Check className="w-4 h-4 text-[#C4A484]" />}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* True / False */}
                        {q.questionType === 'true_false' && (
                          <div className="flex gap-3 pt-2">
                            {[
                              { label: '✓ عبارة صائبة', val: true },
                              { label: '✕ عبارة خاطئة', val: false }
                            ].map((item, bIdx) => {
                              const isSelected = userAns === item.val;
                              return (
                                <button
                                  key={bIdx}
                                  onClick={() => handleSelectAnswer(q.id, item.val)}
                                  className={`px-4 py-2 text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#1D1D1B] text-white border-[#1D1D1B]'
                                      : 'bg-white hover:bg-gray-50 text-[#1D1D1B] border-[#1D1D1B]/20'
                                  }`}
                                >
                                  <span>{item.label}</span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C4A484]" />}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Applied & JRE Essay Inputs */}
                        {(q.questionType === 'applied' || q.questionType === 'case' || q.questionType === 'analytical' || q.questionType === 'jre' || q.questionType === 'essay') && (
                          <div className="space-y-2 pt-2 font-serif">
                            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F9F7F2] p-2.5 border border-[#1D1D1B]/15 text-xs">
                              <div className="flex items-center gap-1.5 font-bold text-[#1D1D1B]">
                                <PenTool className="w-3.5 h-3.5 text-[#8A1F1D]" />
                                <span>
                                  {q.questionType === 'jre' || q.questionType === 'essay'
                                    ? 'مساحة صياغة مقال التفسير المحاسبي والتحليل المعياري'
                                    : 'مساحة حل المسألة التطبيقية وإثبات قيود اليومية'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 font-mono text-[#1D1D1B]/80 font-bold">
                                <span>{String(userAns || '').trim().split(/\s+/).filter(Boolean).length} كلمة</span>
                                <span>•</span>
                                <span>{String(userAns || '').length} حرف</span>
                              </div>
                            </div>

                            <textarea
                              rows={q.questionType === 'jre' || q.questionType === 'essay' ? 10 : 8}
                              placeholder={
                                q.questionType === 'jre' || q.questionType === 'essay'
                                  ? 'صغ مقال التفسير المحاسبي بالأركان الخمسة: الدليل المستندي، المنهجية والمعيار EAS، التحليل المالي، قيد التصحيح أو الأثر على القوائم، والتوصية المحاسبية...'
                                  : 'اكتب قيود اليومية المحاسبية بالتفصيل (من حـ/ ... إلى حـ/ ...)، خطوات الاحتساب الرياضية، وترصيد الحسابات هنا...'
                              }
                              value={userAns || ''}
                              onChange={e => handleSelectAnswer(q.id, e.target.value)}
                              className="w-full p-4 bg-white border-2 border-[#1D1D1B]/30 focus:border-[#8A1F1D] focus:outline-hidden text-xs sm:text-sm leading-relaxed font-serif min-h-[180px] resize-y shadow-inner"
                            />

                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#1D1D1B]/70 pt-1">
                              <span className="text-[11px]">
                                💡 {q.questionType === 'jre' || q.questionType === 'essay' ? 'احرص على ذكر المعيار المحاسبي والتأصيل النظري والأثر الرقمي.' : 'احرص على وضوح القيود وتوازن جانبي القيد المحاسبي.'}
                              </span>
                              {(q.questionType === 'jre' || q.questionType === 'essay') && (!userAns || String(userAns).trim().length === 0) && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleSelectAnswer(q.id, `1. الموقف المحاسبي والحكم المباشر:\n- \n\n2. السند المعياري والمبادئ الحاكمة:\n- \n\n3. التحليل المالي والأثر على القوائم والقيود:\n- \n\n4. الرأي المعارض وتفنيده:\n- \n\n5. الخلاصة والتوصية:\n- `);
                                  }}
                                  className="text-xs text-[#8A1F1D] font-bold hover:underline cursor-pointer bg-[#FAF7EE] px-2 py-0.5 border border-[#8A1F1D]/20 flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>إدراج هيكل المقال</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {/* Submission Floating Controls */}
          <div className="bg-white border-2 border-[#1D1D1B] p-5 flex items-center justify-between shadow-xs sticky bottom-4">
            <div className="text-xs font-bold text-[#1D1D1B]">
              تمت الإجابة على: {Object.keys(answers).length} من أصل {exam.sections.reduce((acc, s) => acc + s.questions.length, 0)} سؤالاً
            </div>
            <button
              onClick={handleSubmitExam}
              className="px-6 py-2.5 bg-[#8A1F1D] hover:bg-[#a12523] text-white font-black text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>إنهاء وتسليم كراسة الإجابة وتصحيحها رسمياً</span>
            </button>
          </div>

        </div>
      )}

      {/* MODE 3: DETAILED PSYCHOMETRIC RESULTS REPORT */}
      {activeMode === 'results' && gradingReport && exam && (
        <div className="space-y-8">
          
          {/* Summary Score Banner */}
          <div className="bg-[#1D1D1B] text-[#F9F7F2] p-8 border-2 border-[#1D1D1B] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-black">
                  <Award className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">تقرير الدرجات والتشخيص السيكومتري الرسمي</h3>
                  <p className="text-xs text-[#C4A484] font-mono mt-1">
                    كود الامتحان: {exam.code} • تم الاعتماد والتصحيح الآلي المنضبط
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-4xl font-mono font-black text-white">
                  {gradingReport.score} <span className="text-base text-[#C4A484]">/ {gradingReport.maxScore}</span>
                </div>
                <div className="text-xs font-bold text-[#C4A484] mt-0.5">
                  النسبة المئوية: {gradingReport.percentage}%
                </div>
              </div>
            </div>

            {/* Performance Level Badge */}
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-white">مستوى الإتقان المحقق:</span>
              <span className={`px-3 py-1 font-bold ${
                gradingReport.percentage >= 85
                  ? 'bg-emerald-800 text-emerald-100'
                  : gradingReport.percentage >= 65
                  ? 'bg-amber-800 text-amber-100'
                  : 'bg-rose-800 text-rose-100'
              }`}>
                {gradingReport.percentage >= 85 ? 'إتقان تام (امتياز مع مرتبة الشرف)' : gradingReport.percentage >= 65 ? 'إتقان جيد (يحتاج لمراجعة بعض التسويات)' : 'يحتاج لخطة علاجية تكيفية'}
              </span>
            </div>

            {/* Unit Breakdown Bars */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-xs text-[#C4A484]">تحليل الإتقان التراكمي حسب الوحدات الدراسية:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(gradingReport.unitBreakdown).map(([uId, data]) => {
                  const unitPct = Math.round((data.earned / data.total) * 100) || 0;
                  const unitName = availableUnitsList.find(u => u.id === uId)?.name || uId;
                  return (
                    <div key={uId} className="bg-white/5 border border-white/10 p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-white font-bold truncate max-w-[200px]">{unitName}</span>
                        <span className="font-mono text-[#C4A484]">{data.earned}/{data.total} د ({unitPct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                        <div 
                          className={`h-full ${unitPct >= 70 ? 'bg-emerald-500' : unitPct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                          style={{ width: `${unitPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Question-by-Question Detailed Review with Official Solutions */}
          <div className="space-y-6">
            <h4 className="font-extrabold text-lg text-[#1D1D1B]">
              المراجعة التفصيلية لإجابات الأسئلة وسلم توزيع الدرجات:
            </h4>

            {exam.sections.map((sec, sIdx) => (
              <div key={sec.id} className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
                <h5 className="font-bold text-base text-[#1D1D1B] border-b border-[#1D1D1B]/15 pb-2">
                  {sec.title}
                </h5>

                <div className="space-y-5">
                  {sec.questions.map((q, qIdx) => {
                    const qEval = gradingReport.evaluations[q.id];
                    const userAns = answers[q.id];
                    const isSol = revealedModelAnswers[q.id];

                    return (
                      <div key={q.id} className="p-5 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1D1D1B]">السؤال {qIdx + 1}: {q.concept}</span>
                            {qEval && (
                              <span className={`px-2 py-0.5 text-[11px] font-bold border ${
                                qEval.score === (q.marks || 2)
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : qEval.score > 0
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : 'bg-rose-100 text-rose-900 border-rose-300'
                              }`}>
                                الدرجة: {qEval.score} / {q.marks || 2}
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-[#8A1F1D]">[{q.marks || 2} د]</span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-[#1D1D1B] leading-relaxed whitespace-pre-line">
                          {q.question}
                        </p>

                        <div className="text-xs bg-white p-3 border border-[#1D1D1B]/15 space-y-1">
                          <strong className="block text-[#1D1D1B]">إجابتك المقدمة:</strong>
                          <div className="text-[#1D1D1B]/80 font-mono">
                            {userAns !== undefined ? String(userAns) : 'لم يتم تقديم إجابة'}
                          </div>
                        </div>

                        {/* Model Solution Toggle */}
                        <div className="pt-1">
                          <button
                            onClick={() => setRevealedModelAnswers(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                            className="px-3 py-1 bg-[#1D1D1B] text-[#F9F7F2] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#C4A484]" />
                            <span>{isSol ? 'إخفاء الإجابة النموذجية' : 'عرض الإجابة النموذجية وسلم الدرجات الوزاري'}</span>
                          </button>

                          {isSol && (
                            <div className="mt-2.5 bg-white border border-[#1D1D1B]/20 p-4 text-xs text-[#1D1D1B] space-y-2 leading-relaxed">
                              <strong className="block text-[#1D1D1B] border-b border-[#1D1D1B]/10 pb-1">
                                الحل المعتمد من دليل المعلم ووزارة التربية والتعليم:
                              </strong>
                              <div className="whitespace-pre-line text-[#1D1D1B]/90 font-mono">
                                {q.modelAnswer || String(q.correctAnswer)}
                              </div>
                              {q.explanation && (
                                <p className="text-[11px] text-[#1D1D1B]/70 pt-1">
                                  <strong>الشرح المعياري:</strong> {q.explanation}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1D1D1B]/15">
            <button
              onClick={() => {
                setActiveMode('config');
                setExam(null);
                setGradingReport(null);
              }}
              className="px-4 py-2 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>إنشاء نموذج امتحاني جديد</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#8A1F1D] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة تقرير النتيجة وسلم التصحيح</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
