import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ArrowLeft, 
  Sparkles, 
  RotateCcw, 
  Check, 
  X, 
  HelpCircle, 
  Award, 
  Zap, 
  FileText,
  Clock,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export interface RemedialPrescriptionItem {
  id: string;
  unitId: string;
  unitTitle: string;
  lessonTitle: string;
  objectiveCode: string;
  misconceptionTitle: string;
  misconceptionDescription: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  textbookPageRef: string;
  microReviewNote: string;
  scaffoldedPractice: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  verificationCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  status: 'PENDING' | 'PRACTICE_COMPLETED' | 'MASTERED';
}

export const AdaptiveRemediationStudio: React.FC = () => {
  const navigate = useNavigate();

  // Active Remedial Prescriptions aligned with Egyptian Curriculum Diagnostic Needs
  const [prescriptions, setPrescriptions] = useState<RemedialPrescriptionItem[]>([
    {
      id: 'rem-1',
      unitId: 'unit-4',
      unitTitle: 'الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء',
      lessonTitle: 'الحساب المعلق (Suspense Account) وإقفاله',
      objectiveCode: 'EB-ACC-U4-O3',
      misconceptionTitle: 'الخلط في تحديد طبيعة رصيد الحساب المعلق وأثره على الميزان',
      misconceptionDescription: 'الاعتقاد الخاطئ بأن الحساب المعلق حساب دائم يظهر في القوائم المالية النهائية، أو فتح الحساب المعلق عند وجود خطأ متكافئ لا يؤثر على توازن الميزان.',
      severity: 'HIGH',
      textbookPageRef: 'الكتاب المدرسي ص 142 - 148',
      microReviewNote: 'الحساب المعلق حساب وسيط مؤقت يفتح فقط عندما لا يتوازن ميزان المراجعة نتيجة خطأ في طرف واحد. إذا كان الجانب المدين أكبر من الدائن، يوضع الفرق في الجانب الدائن للحساب المعلق ليحدث التوازن المؤقت، ويجب إقفاله تماماً قبل إعداد القوائم المالية.',
      scaffoldedPractice: {
        question: 'إذا بلغ مجموع الجانب المدين لميزان المراجعة 185,000 ج.م، ومجموع الجانب الدائن 179,000 ج.م، فكيف يثبت الحساب المعلق لجعل الميزان متوازناً مؤقتاً؟',
        options: [
          'يجعل الحساب المعلق مديناً بمبلغ 6,000 ج.م',
          'يجعل الحساب المعلق دائناً بمبلغ 6,000 ج.م',
          'لا يفتح حساب معلق وترحل الفروق لرأس المال فوراً',
          'يخفض الجانب المدين بمبلغ 6,000 ج.م بدون قيد'
        ],
        correctIndex: 1,
        explanation: 'الجانب الدائن أقل بـ 6,000 ج.م (185,000 - 179,000)، لذا يضاف الحساب المعلق في الجانب الدائن بمبلغ 6,000 ج.م ليتساوى المجموعان مؤقتاً لحين اكتشاف الخطأ.'
      },
      verificationCheck: {
        question: 'اكتشف لاحقاً أن مبيعات نقدية بمبلغ 6,000 ج.م سجلت في حـ/ الخزينة ولم تسجل في حـ/ المبيعات، ما هو قيد تصحيح الخطأ وإقفال الحساب المعلق؟',
        options: [
          'من حـ/ المبيعات (6000) إلى حـ/ الخزينة (6000)',
          'من حـ/ الحساب المعلق (6000) إلى حـ/ المبيعات (6000)',
          'من حـ/ الخزينة (6000) إلى حـ/ الحساب المعلق (6000)',
          'من حـ/ أرباح وخسائر (6000) إلى حـ/ المبيعات (6000)'
        ],
        correctIndex: 1,
        explanation: 'بما أن الحساب المعلق كان دائناً بالفرق، فعند تصحيح إثبات المبيعات الدائنة، يقفل الحساب المعلق بجعله مديناً: (من حـ/ الحساب المعلق إلى حـ/ المبيعات).'
      },
      status: 'PENDING'
    },
    {
      id: 'rem-2',
      unitId: 'unit-5',
      unitTitle: 'الوحدة الخامسة: التسويات الجردية والحسابات الختامية',
      lessonTitle: 'تسوية المصروفات المقدمة والمستحقة',
      objectiveCode: 'EB-ACC-U5-O2',
      misconceptionTitle: 'الخلط بين معالجة المصروف المقدم والمصروف المستحق في قائمة المركز المالي',
      misconceptionDescription: 'تصنيف المصروف المقدم كالتزام والمستحق كأصل، أو إدراج المبلغ الإجمالي المدفوع بدلاً من الجزء الذي يخص الفترة المالية فقط في قائمة الدخل.',
      severity: 'MEDIUM',
      textbookPageRef: 'الكتاب المدرسي ص 184 - 192',
      microReviewNote: 'وفق أساس الاستحقاق المحاسبي (Accrual Basis): قائمة الدخل تتحمل فقط بما يخص العام من مصروف. المصروف المدفوع مقدماً يمثل حقاً وخدمة مستقبلية للمنشأة (أرصدة مدينة أخرى / أصول متداولة)، بينما المصروف المستحق يمثل ديناً وواجباً عليها (أرصدة دائنة أخرى / التزامات متداولة).',
      scaffoldedPractice: {
        question: 'سددت المنشأة إيجاراً سنوياً في 1/7 قدره 24,000 ج.م عن سنة كاملة تنتهي في 30/6 من العام القادم. ما هو نصيب قائمة الدخل وما هو الرصيد الذي يظهر بقائمة المركز المالي في 31/12؟',
        options: [
          'قائمة الدخل: 24,000 ج.م مصروف | المركز المالي: صفر',
          'قائمة الدخل: 12,000 ج.م مصروف إيجار | المركز المالي: 12,000 ج.م إيجار مقدم (أصول متداولة)',
          'قائمة الدخل: 12,000 ج.م مصروف إيجار | المركز المالي: 12,000 ج.م إيجار مستحق (التزامات)',
          'قائمة الدخل: 6,000 ج.م مصروف إيجار | المركز المالي: 18,000 ج.م إيجار مقدم'
        ],
        correctIndex: 1,
        explanation: 'المدة من 1/7 حتى 31/12 = 6 أشهر. ما يخص العام = 24,000 × (6/12) = 12,000 ج.م يرحل لقائمة الدخل. والمتبقي 12,000 ج.م يعتبر إيجاراً مقدماً يظهر كأصل متداول.'
      },
      verificationCheck: {
        question: 'إذا تبين في نهاية العام أن هناك أجور عمال مستحقة عن شهر ديسمبر لم تسدد بعد بمبلغ 5,000 ج.م، فما هو قيد التسوية الجردية اللازم؟',
        options: [
          'من حـ/ الأجور المستحقة إلى حـ/ الخزينة (5,000)',
          'من حـ/ مصروف الأجور إلى حـ/ الأجور المستحقة (5,000)',
          'من حـ/ الخزينة إلى حـ/ مصروف الأجور (5,000)',
          'من حـ/ الأجور المستحقة إلى حـ/ الأرباح والخسائر (5,000)'
        ],
        correctIndex: 1,
        explanation: 'قيد إثبات عبء المصروف المستحق: يجعل حـ/ مصروف الأجور مديناً وحـ/ الأجور المستحقة دائناً كالتزام متداول.'
      },
      status: 'PENDING'
    },
    {
      id: 'rem-3',
      unitId: 'unit-1',
      unitTitle: 'الوحدة الأولى: الإطار المفاهيمي ومعادلة الميزانية',
      lessonTitle: 'المصروفات الإيرادية والمصروفات الرأسمالية',
      objectiveCode: 'EB-ACC-U1-O4',
      misconceptionTitle: 'تحميل مصروفات تحسين وتطوير الأصول الثابتة على حساب الأرباح والخسائر مباشرة',
      misconceptionDescription: 'عدم التمييز بين الصيانة الدورية العادية (إيرادي) وبين العمرات والتوسعات التي تزيد الطاقة الإنتاجية أو تطيل العمر الافتراضي للأصل (رأسمالي يجب رسملته).',
      severity: 'LOW',
      textbookPageRef: 'الكتاب المدرسي ص 44 - 49',
      microReviewNote: 'المصروف الرأسمالي هو نفقة تترتب عليها زيادة في الطاقة الإنتاجية للأصل أو إطالة عمره التشغيلي، ويضاف إلى تكلفة الأصل الثابت ويستهلك على مدار عمره. بينما المصروف الإيرادي هو نفقة دورية للمحافظة على كفاءة الأصل وتحمل على قائمة دخل الفترة.',
      scaffoldedPractice: {
        question: 'قامت منشأة بتركيب محرك جديد لآلة تصنيع بمبلغ 35,000 ج.م مما أدى لزيادة طاقتها الإنتاجية بنسبة 40%. كيف توجه هذه النفقة محاسبياً؟',
        options: [
          'تحمل بالكامل على حـ/ مصروفات الصيانة بقائمة الدخل',
          'ترسمل وتضاف إلى حـ/ الآلات وتستهلك على مدار العمر الإنتاجي',
          'تخصم مباشرة من رأس المال في قائمة التغير في حقوق الملكية',
          'تعتبر خسائر غير عادية'
        ],
        correctIndex: 1,
        explanation: 'بما أن النفقة أدت لزيادة الطاقة الإنتاجية بمقدار جوهري (40%)، فهي نفقة رأسمالية تضاف لحساب الأصل الثابت وتخضع للإهلاك.'
      },
      verificationCheck: {
        question: 'ما هو الأثر على القوائم المالية إذا سجلت المنشأة عن طريق الخطأ عمرة الآلة (35,000 ج.م) كمصروف صيانة دوري؟',
        options: [
          'تضخيم صافي الربح وتضخيم الأصول',
          'تخفيض صافي أرباح الفترة وتخفيض قيمة الأصول الثابتة بأقل من حقيقتها',
          'لا أثر على الإطلاق طالما دفعت النفقة نقداً',
          'تضخيم الالتزامات المتداولة'
        ],
        correctIndex: 1,
        explanation: 'تسجيل النفقة كمصروف إيرادي يقلل أرباح الفترة الحالية بـ 35,000 ج.م ويجعل الأصول الثابتة تظهر بقيمة أقل من الواقع (تكوين احتياطي سري غير مقصود).'
      },
      status: 'PENDING'
    }
  ]);

  // Track active interactive state for each prescription
  const [selectedAnswers, setSelectedAnswers] = useState<{ [pId: string]: { practice?: number; verification?: number } }>({});
  const [feedback, setFeedback] = useState<{ [pId: string]: { practiceOk?: boolean; verifyOk?: boolean; message?: string } }>({});
  const [activeStep, setActiveStep] = useState<{ [pId: string]: 'PRACTICE' | 'VERIFICATION' | 'DONE' }>({
    'rem-1': 'PRACTICE',
    'rem-2': 'PRACTICE',
    'rem-3': 'PRACTICE'
  });

  const handleSelectAnswer = (pId: string, type: 'practice' | 'verification', index: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [pId]: {
        ...prev[pId],
        [type]: index
      }
    }));
  };

  const handleVerifyAnswer = (prescription: RemedialPrescriptionItem, type: 'practice' | 'verification') => {
    const userChoice = selectedAnswers[prescription.id]?.[type];
    if (userChoice === undefined) return;

    if (type === 'practice') {
      const isCorrect = userChoice === prescription.scaffoldedPractice.correctIndex;
      setFeedback(prev => ({
        ...prev,
        [prescription.id]: {
          ...prev[prescription.id],
          practiceOk: isCorrect,
          message: isCorrect 
            ? 'إجابة صحيحة ومتقنة! انتقل الآن لاختبار التحقق النهائي لتأكيد معالجة الفجوة المعرفية.'
            : 'إجابة غير دقيقة. راجع الكبسولة المعرفية وأعد المحاولة مرة أخرى.'
        }
      }));

      if (isCorrect) {
        setActiveStep(prev => ({ ...prev, [prescription.id]: 'VERIFICATION' }));
        setPrescriptions(prev => prev.map(p => p.id === prescription.id ? { ...p, status: 'PRACTICE_COMPLETED' } : p));
      }
    } else {
      const isCorrect = userChoice === prescription.verificationCheck.correctIndex;
      setFeedback(prev => ({
        ...prev,
        [prescription.id]: {
          ...prev[prescription.id],
          verifyOk: isCorrect,
          message: isCorrect 
            ? 'رائع! تم اجتياز سؤال التحقق وترقية الكفاية بنجاح إلى حالة "إتقان تام".'
            : 'إجابة غير صحيحة لسؤال التحقق. راجع التعليل النموذجي وأعد المحاولة.'
        }
      }));

      if (isCorrect) {
        setActiveStep(prev => ({ ...prev, [prescription.id]: 'DONE' }));
        setPrescriptions(prev => prev.map(p => p.id === prescription.id ? { ...p, status: 'MASTERED' } : p));
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        } catch {
          // ignore in iframe
        }
      }
    }
  };

  const masteredCount = prescriptions.filter(p => p.status === 'MASTERED').length;

  return (
    <div className="space-y-8 font-serif" dir="rtl">
      
      {/* Studio Header Banner */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] p-6 sm:p-8 border-2 border-[#1D1D1B] space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#8A1F1D] text-white flex items-center justify-center font-black">
              <Brain className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#C4A484] text-[#1D1D1B] text-[11px] font-bold px-2.5 py-0.5">
                  المرحلة الرابعة للتطوير • التشخيص والعلاج التكيفي
                </span>
                <span className="text-xs text-[#C4A484] font-bold">
                  Adaptive Remediation & Intervention Hub
                </span>
              </div>
              <h2 className="text-2xl font-black mt-2">
                استوديو الوصفات والمسارات العلاجية التكيفية
              </h2>
              <p className="text-xs text-[#F9F7F2]/80 mt-1">
                تشخيص الفجوات والمفاهيم المحاسبية المربكة وتقديم تدريب علاجي مرحلي متدرج مدعوم بسند كتاب الوزارة الرسمي.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 border border-white/20 text-center shrink-0 min-w-[200px]">
            <span className="text-xs text-[#C4A484] font-bold block">حالة معالجة الفجوات</span>
            <div className="text-3xl font-mono font-black text-white mt-1">
              {masteredCount} <span className="text-lg text-[#C4A484]">/ {prescriptions.length}</span>
            </div>
            <span className="inline-block mt-2 px-3 py-0.5 text-[11px] font-bold bg-emerald-700 text-emerald-100">
              {masteredCount === prescriptions.length ? 'تم علاج جميع الفجوات ✓' : 'جلسة علاجية جارية'}
            </span>
          </div>
        </div>

        {/* Action highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/5 border border-white/10 p-3 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>تصحيح فوري معلل بالمعايير المحاسبية المصرية (EAS)</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#C4A484] shrink-0" />
            <span>توثيق دقيق لأرقام صفحات كتاب الوزارة ومخرجات التعلم</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <span>ربط فوري بالمحاكي المحاسبي لتطبيق المعالجة عملياً</span>
          </div>
        </div>
      </div>

      {/* Prescription Cards List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-[#1D1D1B] pb-2">
          <h3 className="font-extrabold text-lg text-[#1D1D1B] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#8A1F1D]" />
            <span>الوصفات العلاجية النشطة المشخصة للطالب ({prescriptions.length} وصفات مقننة):</span>
          </h3>
          <span className="text-xs text-[#1D1D1B]/70 font-mono">
            نظام التدخل التربوي الموجه (Targeted Educational Intervention)
          </span>
        </div>

        {prescriptions.map((prescription, pIdx) => {
          const step = activeStep[prescription.id];
          const currFeedback = feedback[prescription.id];
          const selectedAns = selectedAnswers[prescription.id];
          const isMastered = prescription.status === 'MASTERED';

          return (
            <div 
              key={prescription.id} 
              className={`bg-white border-2 transition shadow-xs ${
                isMastered ? 'border-emerald-800 bg-emerald-50/20' : 'border-[#1D1D1B]'
              }`}
            >
              
              {/* Header Bar */}
              <div className="p-5 border-b border-[#1D1D1B]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F9F7F2]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5 font-mono">
                      {prescription.objectiveCode}
                    </span>
                    <span className="text-[11px] font-bold bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 px-2 py-0.5">
                      {prescription.unitTitle}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 ${
                      prescription.severity === 'HIGH' ? 'bg-rose-100 text-rose-900 border border-rose-300' :
                      prescription.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}>
                      الأولوية: {prescription.severity === 'HIGH' ? 'حرجة للغاية' : prescription.severity === 'MEDIUM' ? 'متوسطة' : 'اعتيادية'}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#1D1D1B]">
                    الوصفة {pIdx + 1}: {prescription.lessonTitle}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-bold text-[#8A1F1D] flex items-center gap-1 bg-white px-3 py-1 border border-[#1D1D1B]/20">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{prescription.textbookPageRef}</span>
                  </div>
                  {isMastered && (
                    <span className="flex items-center gap-1 text-xs font-bold bg-emerald-700 text-white px-3 py-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>تم الإتقان ✓</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-6">
                
                {/* Diagnosed Misconception */}
                <div className="p-4 bg-rose-50/50 border border-rose-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>تشخيص الفجوة أو المفهوم الخاطئ (Diagnosed Misconception):</span>
                  </div>
                  <h5 className="font-bold text-sm text-[#1D1D1B]">{prescription.misconceptionTitle}</h5>
                  <p className="text-xs text-[#1D1D1B]/80 leading-relaxed">{prescription.misconceptionDescription}</p>
                </div>

                {/* Micro-Review Note */}
                <div className="p-4 bg-[#F9F7F2] border-r-4 border-[#C4A484] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#1D1D1B] font-bold text-xs">
                    <Brain className="w-4 h-4 text-[#8A1F1D]" />
                    <span>الكبسولة المعرفية المركزة (Micro-Review Capsule):</span>
                  </div>
                  <p className="text-xs text-[#1D1D1B] leading-relaxed font-sans">{prescription.microReviewNote}</p>
                </div>

                {/* Step 1: Scaffolded Practice Exercise */}
                {step === 'PRACTICE' && (
                  <div className="p-5 border border-[#1D1D1B]/20 bg-white space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1D1D1B]/10 pb-2">
                      <span className="text-xs font-bold text-[#8A1F1D]">
                        المرحلة الأولى: التدريب العلاجي المتدرج (Scaffolded Practice)
                      </span>
                      <span className="text-[11px] text-gray-500 font-mono">سؤال تفاعلي مدعوم</span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-[#1D1D1B] leading-relaxed">
                      {prescription.scaffoldedPractice.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {prescription.scaffoldedPractice.options.map((opt, oIdx) => {
                        const isSelected = selectedAns?.practice === oIdx;
                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleSelectAnswer(prescription.id, 'practice', oIdx)}
                            className={`p-3 text-xs border transition cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#1D1D1B] text-white border-[#1D1D1B] font-bold'
                                : 'bg-white hover:bg-gray-50 text-[#1D1D1B] border-gray-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#C4A484]" />}
                          </div>
                        );
                      })}
                    </div>

                    {currFeedback?.message && (
                      <div className={`p-3 text-xs border ${
                        currFeedback.practiceOk
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          : 'bg-rose-50 text-rose-900 border-rose-300'
                      }`}>
                        {currFeedback.message}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">اختر الإجابة ثم اضغط على التحقق</span>
                      <button
                        onClick={() => handleVerifyAnswer(prescription, 'practice')}
                        disabled={selectedAns?.practice === undefined}
                        className={`px-5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          selectedAns?.practice !== undefined
                            ? 'bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>التحقق من صحة الحل العلاجي</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* Step 2: Verification Check */}
                {step === 'VERIFICATION' && (
                  <div className="p-5 border-2 border-emerald-700 bg-white space-y-4">
                    <div className="flex items-center justify-between border-b border-emerald-700/20 pb-2">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>المرحلة الثانية: اختبار التحقق النهائي لترقية الإتقان (Verification Check)</span>
                      </span>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5">
                        الخطوة النهائية
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-[#1D1D1B] leading-relaxed">
                      {prescription.verificationCheck.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {prescription.verificationCheck.options.map((opt, oIdx) => {
                        const isSelected = selectedAns?.verification === oIdx;
                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleSelectAnswer(prescription.id, 'verification', oIdx)}
                            className={`p-3 text-xs border transition cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-emerald-900 text-white border-emerald-900 font-bold'
                                : 'bg-white hover:bg-gray-50 text-[#1D1D1B] border-gray-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#C4A484]" />}
                          </div>
                        );
                      })}
                    </div>

                    {currFeedback?.message && (
                      <div className={`p-3 text-xs border ${
                        currFeedback.verifyOk
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          : 'bg-rose-50 text-rose-900 border-rose-300'
                      }`}>
                        {currFeedback.message}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">سؤال لقياس استقرار المفهوم بعد المعالجة</span>
                      <button
                        onClick={() => handleVerifyAnswer(prescription, 'verification')}
                        disabled={selectedAns?.verification === undefined}
                        className={`px-5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          selectedAns?.verification !== undefined
                            ? 'bg-emerald-800 text-white hover:bg-emerald-900'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>اعتماد إتقان الكفاية المحاسبية</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* Step 3: Done & Mastered Banner */}
                {step === 'DONE' && (
                  <div className="p-5 bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-700 text-white flex items-center justify-center shrink-0">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-black text-sm text-emerald-900">
                          تم علاج هذه الفجوة المعرفية بنجاح واعتماد الإتقان التام!
                        </h5>
                        <p className="text-xs text-emerald-800 mt-0.5">
                          تم تحديث سجلك السيكومتري وترقية تصنيف الكفاية المحاسبية.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => navigate('/training/simulators')}
                        className="px-3 py-1.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>تطبيق عملي بالمحاكي</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
