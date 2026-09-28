import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  BookOpen, 
  Award, 
  HelpCircle, 
  Layers, 
  ArrowLeft, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  Building2, 
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  PenTool,
  Sliders,
  Check,
  Info
} from 'lucide-react';
import { 
  ACCOUNTING_ERROR_CASES, 
  ACCOUNTING_ERROR_CATEGORIES, 
  OFFICIAL_CORRECTION_RULES, 
  AccountingErrorCase, 
  AccountingErrorCategory, 
  ErrorImpactOnBalance 
} from '../../data/accountingErrorsData';
import confetti from 'canvas-confetti';

type ActiveTab = 'interactive_lab' | 'method_comparison' | 'classification_matrix' | 'legal_rules';

export const AccountingErrorsCorrectionLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('interactive_lab');
  
  // Case State
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const currentCase: AccountingErrorCase = ACCOUNTING_ERROR_CASES[currentCaseIndex];

  // Solver Steps: 1: Diagnosis, 2: Extended Method, 3: Short Method, 4: Ledger & Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Diagnosis user answers
  const [userImpactAnswer, setUserImpactAnswer] = useState<ErrorImpactOnBalance | null>(null);
  const [userCategoryAnswer, setUserCategoryAnswer] = useState<AccountingErrorCategory | null>(null);
  const [diagnosisFeedback, setDiagnosisFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Step 2: Extended method answers
  const [extendedStep1Debit, setExtendedStep1Debit] = useState<string>('');
  const [extendedStep1Credit, setExtendedStep1Credit] = useState<string>('');
  const [extendedStep1Amount, setExtendedStep1Amount] = useState<string>('');
  
  const [extendedStep2Debit, setExtendedStep2Debit] = useState<string>('');
  const [extendedStep2Credit, setExtendedStep2Credit] = useState<string>('');
  const [extendedStep2Amount, setExtendedStep2Amount] = useState<string>('');

  const [extendedFeedback, setExtendedFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showExtendedSolution, setShowExtendedSolution] = useState<boolean>(false);

  // Step 3: Short method answers
  const [shortDebit, setShortDebit] = useState<string>('');
  const [shortCredit, setShortCredit] = useState<string>('');
  const [shortAmount, setShortAmount] = useState<string>('');

  const [shortFeedback, setShortFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showShortSolution, setShowShortSolution] = useState<boolean>(false);

  // Global Score Tracker for the current case
  const [scoreDiagnosis, setScoreDiagnosis] = useState<number>(0); // max 5
  const [scoreExtended, setScoreExtended] = useState<number>(0);   // max 7
  const [scoreShort, setScoreShort] = useState<number>(0);         // max 8

  // Helper reset for switching cases
  const handleSelectCase = (index: number) => {
    setCurrentCaseIndex(index);
    setCurrentStep(1);
    setUserImpactAnswer(null);
    setUserCategoryAnswer(null);
    setDiagnosisFeedback(null);
    setExtendedStep1Debit('');
    setExtendedStep1Credit('');
    setExtendedStep1Amount('');
    setExtendedStep2Debit('');
    setExtendedStep2Credit('');
    setExtendedStep2Amount('');
    setExtendedFeedback(null);
    setShowExtendedSolution(false);
    setShortDebit('');
    setShortCredit('');
    setShortAmount('');
    setShortFeedback(null);
    setShowShortSolution(false);
    setScoreDiagnosis(0);
    setScoreExtended(0);
    setScoreShort(0);
  };

  // Check Step 1: Diagnosis
  const handleCheckDiagnosis = () => {
    if (!userImpactAnswer || !userCategoryAnswer) {
      alert('يرجى اختيار أثر الخطأ وتصنيفه أولاً قبل المتابعة.');
      return;
    }

    const isImpactCorrect = userImpactAnswer === currentCase.classification.impactOnBalance;
    const isCategoryCorrect = userCategoryAnswer === currentCase.classification.category;

    if (isImpactCorrect && isCategoryCorrect) {
      setDiagnosisFeedback({
        isCorrect: true,
        message: 'تشخيص محاسبي ممتاز ومطابق لنموذج الإجابة الوزاري 100%! ' + currentCase.classification.pedagogicalExplanation
      });
      setScoreDiagnosis(5);
      try {
        confetti({ particleCount: 30, spread: 60 });
      } catch {}
    } else {
      let errText = 'توجيه غير دقيق: ';
      if (!isImpactCorrect) {
        errText += `هذا الخطأ في واقعه (${currentCase.classification.impactLabel}). `;
      }
      if (!isCategoryCorrect) {
        errText += `التصنيف المحاسبي الصحيح هو (${currentCase.classification.categoryLabel}). `;
      }
      setDiagnosisFeedback({
        isCorrect: false,
        message: errText + currentCase.classification.pedagogicalExplanation
      });
      setScoreDiagnosis(2);
    }
  };

  // Check Step 2: Extended Method
  const handleCheckExtended = () => {
    // For OMISSION (Case 5), cancellation doesn't exist
    if (currentCase.classification.category === 'OMISSION') {
      const p2AmountNum = parseFloat(extendedStep2Amount) || 0;
      const targetCorrectAmount = currentCase.correctEntrySpec.rows[0]?.debit || 0;
      const isAmountClose = Math.abs(p2AmountNum - targetCorrectAmount) < 1;

      if (isAmountClose) {
        setExtendedFeedback({
          isCorrect: true,
          message: 'إجابة صحيحة! في أخطاء السهو الكلي لا يوجد قيد إلغاء، ويُكتفى بإثبات القيد الصحيح فور اكتشافه.'
        });
        setScoreExtended(7);
        try { confetti({ particleCount: 40, spread: 70 }); } catch {}
      } else {
        setExtendedFeedback({
          isCorrect: false,
          message: `المبلغ المطلوب إثباته في القيد هو ${targetCorrectAmount.toLocaleString()} جنيه.`
        });
        setScoreExtended(3);
      }
      return;
    }

    const p1AmountNum = parseFloat(extendedStep1Amount) || 0;
    const p2AmountNum = parseFloat(extendedStep2Amount) || 0;

    const cancelTarget = currentCase.extendedMethod.step1Cancellation.rows[0]?.debit || 0;
    const correctTarget = currentCase.extendedMethod.step2Establishment.rows[0]?.debit || 0;

    const isP1AmountOk = Math.abs(p1AmountNum - cancelTarget) < 1;
    const isP2AmountOk = Math.abs(p2AmountNum - correctTarget) < 1;

    if (isP1AmountOk && isP2AmountOk) {
      setExtendedFeedback({
        isCorrect: true,
        message: 'أحسنت! أعددت قيد الإلغاء وقيد الإثبات بصورة قانونية سليمة خالية من الشطب ومطابقة للدفاتر.'
      });
      setScoreExtended(7);
      try { confetti({ particleCount: 40, spread: 70 }); } catch {}
    } else {
      setExtendedFeedback({
        isCorrect: false,
        message: `يرجى تدقيق المبالغ: قيد الإلغاء يجب أن يكون بمبلغ القيد الخاطئ (${cancelTarget.toLocaleString()} ج)، وقيد الإثبات بمبلغ العملية الفعلي (${correctTarget.toLocaleString()} ج).`
      });
      setScoreExtended(3);
    }
  };

  // Check Step 3: Short Method
  const handleCheckShort = () => {
    const sAmountNum = parseFloat(shortAmount) || 0;
    const targetAdjAmount = currentCase.shortMethod.adjustingEntry.rows[0]?.debit || 0;
    const isAmountOk = Math.abs(sAmountNum - targetAdjAmount) < 1;

    if (isAmountOk) {
      setShortFeedback({
        isCorrect: true,
        message: 'ممتاز! صياغة القيد المختصر سليمة وسريعة، وحافظت على سلامة الحسابات الأخرى دون مساس.'
      });
      setScoreShort(8);
      try { confetti({ particleCount: 50, spread: 80 }); } catch {}
    } else {
      setShortFeedback({
        isCorrect: false,
        message: `مبلغ قيد التسوية المختصر الصحيح هو ${targetAdjAmount.toLocaleString()} جنيه. لاحظ التعليل المحاسبي.`
      });
      setScoreShort(4);
    }
  };

  const totalScore = scoreDiagnosis + scoreExtended + scoreShort;

  return (
    <div className="space-y-8 font-serif" dir="rtl">
      
      {/* Top Header Card */}
      <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#8A1F1D] text-white flex items-center justify-center font-bold">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-[#8A1F1D] text-white px-2 py-0.5">
                  الوحدة الرابعة: المنهج الوزاري المعتمد
                </span>
                <span className="text-[11px] font-mono text-[#1D1D1B]/60 font-bold">
                  وزارة التربية والتعليم والتعليم الفني
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1B] pt-1">
                مختبر تصحيح الأخطاء المحاسبية (Accounting Errors Correction Lab)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#F9F7F2] border border-[#1D1D1B]/20 px-3 py-1.5 text-[#1D1D1B]">
              المادة 11 ق.ت: منع الكشط والشطب
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            onClick={() => setActiveTab('interactive_lab')}
            className={`px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'interactive_lab'
                ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>المختبر التفاعلي لحل قضايا الأخطاء ({ACCOUNTING_ERROR_CASES.length} قضايا)</span>
          </button>

          <button
            onClick={() => setActiveTab('method_comparison')}
            className={`px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'method_comparison'
                ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>المقارنة المنهجية (المطولة vs المختصرة)</span>
          </button>

          <button
            onClick={() => setActiveTab('classification_matrix')}
            className={`px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'classification_matrix'
                ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>مصفوفة تصنيف الأخطاء والحساب المعلق</span>
          </button>

          <button
            onClick={() => setActiveTab('legal_rules')}
            className={`px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'legal_rules'
                ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>الدليل النظامي والقانوني المعتمد</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE ERROR SOLVING LAB */}
      {activeTab === 'interactive_lab' && (
        <div className="space-y-6">
          
          {/* Case Selector Ribbon */}
          <div className="bg-white border-2 border-[#1D1D1B] p-4 shadow-xs">
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-black text-[#1D1D1B] whitespace-nowrap pl-3 border-l border-[#1D1D1B]/20">
                اختر القضية المحاسبية:
              </span>
              <div className="flex items-center gap-2">
                {ACCOUNTING_ERROR_CASES.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCase(idx)}
                    className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      currentCaseIndex === idx
                        ? 'bg-[#8A1F1D] text-white shadow-xs'
                        : 'bg-[#F9F7F2] text-[#1D1D1B] border border-[#1D1D1B]/20 hover:border-[#1D1D1B]'
                    }`}
                  >
                    <span className="font-mono">{c.code}</span>
                    <span className="hidden md:inline">{c.title.slice(0, 26)}...</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left/Main Column: Case Narrative & Problem Solver (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Case Information & Erroneous Voucher */}
              <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-4 shadow-xs">
                <div className="flex items-start justify-between gap-4 border-b border-[#1D1D1B]/15 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
                        {currentCase.code}
                      </span>
                      <span className="text-xs text-gray-500 font-bold">
                        {currentCase.unitRef}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-900 font-bold">
                        مستوى الصعوبة: {currentCase.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-[#1D1D1B] pt-1">
                      {currentCase.title}
                    </h3>
                  </div>
                  
                  {/* Score Pill */}
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-gray-500 block">درجة القضية</span>
                    <span className="text-lg font-black text-[#8A1F1D]">{totalScore} / 20</span>
                  </div>
                </div>

                {/* Scenario Text */}
                <div className="p-3.5 bg-[#F9F7F2] border-r-4 border-[#8A1F1D] text-xs leading-relaxed text-[#1D1D1B]">
                  <span className="font-bold text-[#8A1F1D] block mb-1">الواقعة المالية الأصلية:</span>
                  <p className="font-serif font-medium">{currentCase.transactionDescription}</p>
                </div>

                {/* The Erroneous Journal Entry Voucher */}
                <div className="border-2 border-red-300 bg-red-50/40 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-900 font-black text-xs">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>قيد اليومية الخاطئ المسجل بالدفاتر:</span>
                    </div>
                    <span className="text-[11px] font-mono text-red-700 bg-white px-2 py-0.5 border border-red-200">
                      التاريخ: {currentCase.erroneousTransaction.date}
                    </span>
                  </div>

                  <p className="text-xs text-red-950 font-serif">
                    {currentCase.erroneousTransaction.recordedEntryText}
                  </p>

                  {/* Table of Entry */}
                  {currentCase.erroneousTransaction.entry.rows.length > 0 ? (
                    <table className="w-full text-xs text-right border-collapse bg-white border border-red-300">
                      <thead>
                        <tr className="bg-red-100 text-red-950 font-bold border-b border-red-300">
                          <th className="p-2">البيان (الحساب)</th>
                          <th className="p-2 text-center w-24">مدين (منه)</th>
                          <th className="p-2 text-center w-24">دائن (له)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-red-200 font-mono">
                        {currentCase.erroneousTransaction.entry.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            <td className="p-2 font-serif font-bold text-[#1D1D1B]">{row.accountName}</td>
                            <td className="p-2 text-center text-red-800 font-bold">
                              {row.debit > 0 ? row.debit.toLocaleString() : '-'}
                            </td>
                            <td className="p-2 text-center text-red-800 font-bold">
                              {row.credit > 0 ? row.credit.toLocaleString() : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-3 bg-white border border-dashed border-red-300 text-center text-xs text-red-800 font-bold">
                      (لم يُسجل أي قيد في الدفاتر - حالة سهو كلي Omission)
                    </div>
                  )}

                  <div className="text-[11px] text-red-900/80 italic">
                    <span className="font-bold">ملاحظة الفحص: </span>
                    {currentCase.erroneousTransaction.natureOfMistake}
                  </div>
                </div>
              </div>

              {/* Step Flow Tabs */}
              <div className="flex items-center gap-1 border-b-2 border-[#1D1D1B] bg-white p-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className={`flex-1 py-2 px-3 text-xs font-bold text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    currentStep === 1
                      ? 'bg-[#1D1D1B] text-white'
                      : 'bg-transparent text-[#1D1D1B] hover:bg-gray-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#C4A484] text-[#1D1D1B] text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>التشخيص والتصنيف الوزاري (5 د)</span>
                </button>

                <button
                  onClick={() => setCurrentStep(2)}
                  className={`flex-1 py-2 px-3 text-xs font-bold text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    currentStep === 2
                      ? 'bg-[#1D1D1B] text-white'
                      : 'bg-transparent text-[#1D1D1B] hover:bg-gray-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#C4A484] text-[#1D1D1B] text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>الطريقة المطولة (7 د)</span>
                </button>

                <button
                  onClick={() => setCurrentStep(3)}
                  className={`flex-1 py-2 px-3 text-xs font-bold text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    currentStep === 3
                      ? 'bg-[#1D1D1B] text-white'
                      : 'bg-transparent text-[#1D1D1B] hover:bg-gray-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#C4A484] text-[#1D1D1B] text-[10px] flex items-center justify-center font-bold">3</span>
                  <span>الطريقة المختصرة (8 د)</span>
                </button>

                <button
                  onClick={() => setCurrentStep(4)}
                  className={`flex-1 py-2 px-3 text-xs font-bold text-center transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    currentStep === 4
                      ? 'bg-[#1D1D1B] text-white'
                      : 'bg-transparent text-[#1D1D1B] hover:bg-gray-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#C4A484] text-[#1D1D1B] text-[10px] flex items-center justify-center font-bold">4</span>
                  <span>الأستاذ والتقرير النهائي</span>
                </button>
              </div>

              {/* STEP 1: MINISTERIAL DIAGNOSIS */}
              {currentStep === 1 && (
                <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-5 shadow-xs">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-[#1D1D1B] flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#8A1F1D]" />
                      <span>المحطة الأولى: تشخيص الخطأ المحاسبي وأثره على ميزان المراجعة</span>
                    </h4>
                    <p className="text-xs text-gray-600">
                      حدد الأثر على توازن ميزان المراجعة، ثم صنف الخطأ وفق المعايير الوزارية المقررة:
                    </p>
                  </div>

                  {/* Question 1: Impact on Balance */}
                  <div className="space-y-2 bg-[#F9F7F2] p-4 border border-[#1D1D1B]/15">
                    <label className="text-xs font-bold text-[#1D1D1B] block">
                      1. هل يؤثر هذا الخطأ على توازن ميزان المراجعة (يتطلب فتح حساب معلق)؟
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setUserImpactAnswer('NO_EFFECT')}
                        className={`p-3 text-right text-xs font-bold border-2 transition cursor-pointer flex items-center justify-between ${
                          userImpactAnswer === 'NO_EFFECT'
                            ? 'border-[#8A1F1D] bg-[#8A1F1D]/10 text-[#8A1F1D]'
                            : 'border-[#1D1D1B]/20 bg-white hover:border-[#1D1D1B]'
                        }`}
                      >
                        <div>
                          <div className="font-black">لا يؤثر على التوازن</div>
                          <span className="text-[10px] text-gray-500 font-normal">يتساوى المدين مع الدائن عددياً رغم الخطأ</span>
                        </div>
                        {userImpactAnswer === 'NO_EFFECT' && <CheckCircle2 className="w-4 h-4 text-[#8A1F1D]" />}
                      </button>

                      <button
                        onClick={() => setUserImpactAnswer('AFFECTS_BALANCE')}
                        className={`p-3 text-right text-xs font-bold border-2 transition cursor-pointer flex items-center justify-between ${
                          userImpactAnswer === 'AFFECTS_BALANCE'
                            ? 'border-[#8A1F1D] bg-[#8A1F1D]/10 text-[#8A1F1D]'
                            : 'border-[#1D1D1B]/20 bg-white hover:border-[#1D1D1B]'
                        }`}
                      >
                        <div>
                          <div className="font-black">يؤثر على التوازن</div>
                          <span className="text-[10px] text-gray-500 font-normal">اختلال التوازن ويستلزم فتح الحساب المعلق</span>
                        </div>
                        {userImpactAnswer === 'AFFECTS_BALANCE' && <CheckCircle2 className="w-4 h-4 text-[#8A1F1D]" />}
                      </button>
                    </div>
                  </div>

                  {/* Question 2: Category of Error */}
                  <div className="space-y-2 bg-[#F9F7F2] p-4 border border-[#1D1D1B]/15">
                    <label className="text-xs font-bold text-[#1D1D1B] block">
                      2. ما هو التصنيف العلمي الدقيق لهذا الخطأ؟
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {ACCOUNTING_ERROR_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setUserCategoryAnswer(cat.id)}
                          className={`p-2.5 text-right font-serif border transition cursor-pointer ${
                            userCategoryAnswer === cat.id
                              ? 'border-[#8A1F1D] bg-[#8A1F1D] text-white font-bold'
                              : 'border-[#1D1D1B]/20 bg-white text-[#1D1D1B] hover:border-[#1D1D1B]'
                          }`}
                        >
                          <div className="font-bold">{cat.label}</div>
                          <span className={`text-[10px] block line-clamp-1 ${userCategoryAnswer === cat.id ? 'text-white/80' : 'text-gray-500'}`}>
                            {cat.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Diagnosis Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleCheckDiagnosis}
                      className="px-5 py-2.5 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C4A484]" />
                      <span>تدقيق التشخيص ورصد الدرجة (5 درجات)</span>
                    </button>

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 border border-[#1D1D1B] text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
                    >
                      <span>الانتقال للطريقة المطولة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Feedback Banner */}
                  {diagnosisFeedback && (
                    <div className={`p-4 border-2 flex items-start gap-3 ${
                      diagnosisFeedback.isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-amber-500 bg-amber-50 text-amber-950'
                    }`}>
                      {diagnosisFeedback.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs space-y-1">
                        <div className="font-black text-sm">
                          {diagnosisFeedback.isCorrect ? 'إجابة معتمدة نموذجية (+5 درجات)' : 'ملاحظات تصحيح النموذج الوزاري'}
                        </div>
                        <p className="leading-relaxed font-serif">{diagnosisFeedback.message}</p>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* STEP 2: EXTENDED METHOD (Two Entries) */}
              {currentStep === 2 && (
                <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-[#1D1D1B] flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-[#8A1F1D]" />
                        <span>المحطة الثانية: التصحيح بالطريقة المطولة (The Extended Method)</span>
                      </h4>
                      <p className="text-xs text-gray-600">
                        تتكون من خطوتين إلزاميتين: قيد إلغاء القيد الخاطئ بالكامل، ثم قيد إثبات العملية الصحيحة.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowExtendedSolution(!showExtendedSolution)}
                      className="text-xs text-[#8A1F1D] font-bold underline hover:text-[#1D1D1B] cursor-pointer"
                    >
                      {showExtendedSolution ? 'إخفاء الحل النموذجي' : 'استعراض القيد الوزاري النموذجي'}
                    </button>
                  </div>

                  {/* Step 1 in Extended: Cancellation Entry */}
                  {currentCase.classification.category !== 'OMISSION' ? (
                    <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#1D1D1B]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-5 h-5 bg-[#1D1D1B] text-white flex items-center justify-center text-[10px] font-bold">أ</span>
                          <span>الخطوة 1: قيد إلغاء القيد الخاطئ (عكس طرفي القيد)</span>
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">عكس المدين دائناً والدائن مديناً</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[11px] font-bold text-gray-700 block mb-1">الطرف المدين (من حـ/):</label>
                          <input
                            type="text"
                            value={extendedStep1Debit}
                            onChange={e => setExtendedStep1Debit(e.target.value)}
                            placeholder={currentCase.extendedMethod.step1Cancellation.rows[0]?.accountName || 'اسم الحساب المدين'}
                            className="w-full p-2 border border-[#1D1D1B]/30 font-serif focus:ring-1 focus:ring-[#8A1F1D]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-gray-700 block mb-1">الطرف الدائن (إلى حـ/):</label>
                          <input
                            type="text"
                            value={extendedStep1Credit}
                            onChange={e => setExtendedStep1Credit(e.target.value)}
                            placeholder={currentCase.extendedMethod.step1Cancellation.rows[1]?.accountName || 'اسم الحساب الدائن'}
                            className="w-full p-2 border border-[#1D1D1B]/30 font-serif focus:ring-1 focus:ring-[#8A1F1D]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-gray-700 block mb-1">مبلغ قيد الإلغاء (جنيه):</label>
                          <input
                            type="number"
                            value={extendedStep1Amount}
                            onChange={e => setExtendedStep1Amount(e.target.value)}
                            placeholder="المبلغ بالأرقام"
                            className="w-full p-2 border border-[#1D1D1B]/30 font-mono focus:ring-1 focus:ring-[#8A1F1D]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-300 text-xs text-amber-900 font-bold">
                      💡 ملاحظة منهجية: في حالة السهو الكلي، لا توجد خطوة لإلغاء القيد، ويتم الانتقال مباشرة لإثبات القيد الصحيح.
                    </div>
                  )}

                  {/* Step 2 in Extended: Establishment Entry */}
                  <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1D1D1B]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-5 h-5 bg-[#8A1F1D] text-white flex items-center justify-center text-[10px] font-bold">ب</span>
                        <span>الخطوة 2: قيد إثبات العملية الصحيحة في اليومية</span>
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">القيد المحاسبي السليم</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">الطرف المدين الصحيح (من حـ/):</label>
                        <input
                          type="text"
                          value={extendedStep2Debit}
                          onChange={e => setExtendedStep2Debit(e.target.value)}
                          placeholder={currentCase.extendedMethod.step2Establishment.rows[0]?.accountName || 'اسم الحساب المدين'}
                          className="w-full p-2 border border-[#1D1D1B]/30 font-serif focus:ring-1 focus:ring-[#8A1F1D]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">الطرف الدائن الصحيح (إلى حـ/):</label>
                        <input
                          type="text"
                          value={extendedStep2Credit}
                          onChange={e => setExtendedStep2Credit(e.target.value)}
                          placeholder={currentCase.extendedMethod.step2Establishment.rows[1]?.accountName || 'اسم الحساب الدائن'}
                          className="w-full p-2 border border-[#1D1D1B]/30 font-serif focus:ring-1 focus:ring-[#8A1F1D]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">مبلغ العملية الصحيح (جنيه):</label>
                        <input
                          type="number"
                          value={extendedStep2Amount}
                          onChange={e => setExtendedStep2Amount(e.target.value)}
                          placeholder="المبلغ الصحيح"
                          className="w-full p-2 border border-[#1D1D1B]/30 font-mono focus:ring-1 focus:ring-[#8A1F1D]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions & Check */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleCheckExtended}
                      className="px-5 py-2.5 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C4A484]" />
                      <span>تدقيق الطريقة المطولة ورصد الدرجة (7 درجات)</span>
                    </button>

                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 border border-[#1D1D1B] text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
                    >
                      <span>الانتقال للطريقة المختصرة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Extended Feedback */}
                  {extendedFeedback && (
                    <div className={`p-4 border-2 flex items-start gap-3 ${
                      extendedFeedback.isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-amber-500 bg-amber-50 text-amber-950'
                    }`}>
                      {extendedFeedback.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs space-y-1">
                        <div className="font-black text-sm">
                          {extendedFeedback.isCorrect ? 'صياغة مطولة مكتملة الأركان' : 'تنبيه المراجع الخارجي'}
                        </div>
                        <p className="leading-relaxed font-serif">{extendedFeedback.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Model Solution Display */}
                  {showExtendedSolution && (
                    <div className="p-4 bg-[#F9F7F2] border-2 border-[#1D1D1B] space-y-3 text-xs">
                      <div className="font-black text-[#8A1F1D] flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>نموذج الإجابة الوزاري المعتمد (الطريقة المطولة):</span>
                      </div>
                      
                      {currentCase.extendedMethod.step1Cancellation.rows.length > 0 && (
                        <div className="bg-white p-3 border border-[#1D1D1B]/15 space-y-1">
                          <span className="font-bold text-[#1D1D1B] block">1. قيد إلغاء القيد الخاطئ:</span>
                          <div className="font-mono text-gray-800">
                            {currentCase.extendedMethod.step1Cancellation.rows.map((r, i) => (
                              <div key={i}>
                                {r.debit > 0 ? `من حـ/ ${r.accountName} بمبلغ ${r.debit.toLocaleString()} ج` : `إلى حـ/ ${r.accountName} بمبلغ ${r.credit.toLocaleString()} ج`}
                              </div>
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-500 italic block pt-1">
                            ({currentCase.extendedMethod.step1Cancellation.explanation})
                          </span>
                        </div>
                      )}

                      <div className="bg-white p-3 border border-[#1D1D1B]/15 space-y-1">
                        <span className="font-bold text-[#1D1D1B] block">2. قيد إثبات العملية الصحيحة:</span>
                        <div className="font-mono text-gray-800">
                          {currentCase.extendedMethod.step2Establishment.rows.map((r, i) => (
                            <div key={i}>
                              {r.debit > 0 ? `من حـ/ ${r.accountName} بمبلغ ${r.debit.toLocaleString()} ج` : `إلى حـ/ ${r.accountName} بمبلغ ${r.credit.toLocaleString()} ج`}
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-500 italic block pt-1">
                          ({currentCase.extendedMethod.step2Establishment.explanation})
                        </span>
                      </div>

                      <p className="text-gray-700 leading-relaxed font-serif pt-1 text-[11px]">
                        <span className="font-bold">التبرير المنطقي: </span>
                        {currentCase.extendedMethod.reasoning}
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* STEP 3: SHORT / DIRECT METHOD (Single Adjusting Entry) */}
              {currentStep === 3 && (
                <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-[#1D1D1B] flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#8A1F1D]" />
                        <span>المحطة الثالثة: التصحيح بالطريقة المختصرة (The Short Method)</span>
                      </h4>
                      <p className="text-xs text-gray-600">
                        قيد تسوية مباشر واحد يعالج الحسابات المتأثرة دون المساس بالحسابات السليمة.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowShortSolution(!showShortSolution)}
                      className="text-xs text-[#8A1F1D] font-bold underline hover:text-[#1D1D1B] cursor-pointer"
                    >
                      {showShortSolution ? 'إخفاء القيد المختصر' : 'استعراض القيد المختصر المعتمد'}
                    </button>
                  </div>

                  {/* Educational Insight for Short Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50 border border-emerald-300 space-y-1">
                      <span className="font-black text-emerald-950 block">الحسابات السليمة (التي لا تُمس):</span>
                      <ul className="list-disc list-inside text-emerald-900 font-serif space-y-0.5 text-[11px]">
                        {currentCase.shortMethod.accountsIntact.map((acc, i) => (
                          <li key={i}>{acc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-300 space-y-1">
                      <span className="font-black text-amber-950 block">الحسابات الواجب تصويبها وتعديلها:</span>
                      <ul className="list-disc list-inside text-amber-900 font-serif space-y-0.5 text-[11px]">
                        {currentCase.shortMethod.accountsAffected.map((acc, i) => (
                          <li key={i}>{acc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* User Entry Form for Short Method */}
                  <div className="p-4 bg-[#F9F7F2] border-2 border-[#1D1D1B] space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1D1D1B]">
                      <span>إجراء قيد التسوية المختصر (قيد واحد فقط):</span>
                      <span className="text-[10px] text-gray-500 font-mono">دفتر اليومية العامة</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">الطرف المدين (من حـ/):</label>
                        <input
                          type="text"
                          value={shortDebit}
                          onChange={e => setShortDebit(e.target.value)}
                          placeholder={currentCase.shortMethod.adjustingEntry.rows[0]?.accountName || 'اسم الحساب'}
                          className="w-full p-2 border border-[#1D1D1B]/30 font-serif focus:ring-1 focus:ring-[#8A1F1D]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">الطرف الدائن (إلى حـ/):</label>
                        <input
                          type="text"
                          value={shortCredit}
                          onChange={e => setShortCredit(e.target.value)}
                          placeholder={currentCase.shortMethod.adjustingEntry.rows[1]?.accountName || 'اسم الحساب'}
                          className="w-full p-2 border border-[#1D1D1B]/30 font-serif focus:ring-1 focus:ring-[#8A1F1D]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">مبلغ قيد التسوية (جنيه):</label>
                        <input
                          type="number"
                          value={shortAmount}
                          onChange={e => setShortAmount(e.target.value)}
                          placeholder="المبلغ الصافي"
                          className="w-full p-2 border border-[#1D1D1B]/30 font-mono focus:ring-1 focus:ring-[#8A1F1D]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions & Check */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleCheckShort}
                      className="px-5 py-2.5 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C4A484]" />
                      <span>تدقيق الطريقة المختصرة ورصد الدرجة (8 درجات)</span>
                    </button>

                    <button
                      onClick={() => setCurrentStep(4)}
                      className="px-4 py-2 border border-[#1D1D1B] text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
                    >
                      <span>عرض أثر الأستاذ والميزان</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Short Method Feedback */}
                  {shortFeedback && (
                    <div className={`p-4 border-2 flex items-start gap-3 ${
                      shortFeedback.isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-amber-500 bg-amber-50 text-amber-950'
                    }`}>
                      {shortFeedback.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs space-y-1">
                        <div className="font-black text-sm">
                          {shortFeedback.isCorrect ? 'قيد مختصر مثالي وعالي الاحترافية' : 'توجيه تصحيحي'}
                        </div>
                        <p className="leading-relaxed font-serif">{shortFeedback.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Show Short Solution */}
                  {showShortSolution && (
                    <div className="p-4 bg-[#F9F7F2] border-2 border-[#1D1D1B] space-y-3 text-xs">
                      <div className="font-black text-[#8A1F1D] flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>القيد المختصر المعتمد من مستشار المادة:</span>
                      </div>

                      <div className="bg-white p-3 border border-[#1D1D1B]/15 space-y-2">
                        <div className="font-mono text-gray-900 font-bold text-sm">
                          {currentCase.shortMethod.adjustingEntry.rows.map((r, i) => (
                            <div key={i}>
                              {r.debit > 0 ? `من حـ/ ${r.accountName} : ${r.debit.toLocaleString()} ج` : `إلى حـ/ ${r.accountName} : ${r.credit.toLocaleString()} ج`}
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-gray-600 italic">
                          شرح القيد: {currentCase.shortMethod.adjustingEntry.explanation}
                        </div>
                      </div>

                      <p className="text-gray-800 leading-relaxed font-serif text-[11px]">
                        <span className="font-bold text-[#8A1F1D]">التعليل العلمي: </span>
                        {currentCase.shortMethod.reasoning}
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* STEP 4: LEDGER & FINAL EVALUATION REPORT */}
              {currentStep === 4 && (
                <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
                    <div>
                      <h4 className="text-sm font-black text-[#1D1D1B] flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#8A1F1D]" />
                        <span>المحطة الرابعة: ترحيل الأستاذ العام وتقرير التقييم النهائي</span>
                      </h4>
                      <p className="text-xs text-gray-600">
                        متابعة انعكاس القيد التصحيحي على تصفير الأخطاء واستعادة التوازن والمصداقية.
                      </p>
                    </div>

                    <div className="bg-[#1D1D1B] text-[#C4A484] px-4 py-2 text-center font-mono font-black text-sm">
                      المجموع النهائي: {totalScore} / 20
                    </div>
                  </div>

                  {/* Suspense Account impact (if any) */}
                  {currentCase.suspenseImpact && (
                    <div className="p-4 bg-emerald-50 border-2 border-emerald-400 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold text-emerald-950">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>حالة الحساب المعلق (Suspense Account Ledger):</span>
                        </span>
                        <span className="font-mono bg-white px-2 py-0.5 border border-emerald-300">
                          الرصيد بعد التصحيح: {currentCase.suspenseImpact.suspenseBalanceAfter} ج (تم الإقفال)
                        </span>
                      </div>
                      <p className="text-emerald-900 leading-relaxed font-serif text-[11px]">
                        {currentCase.suspenseImpact.closingExplanation}
                      </p>
                    </div>
                  )}

                  {/* Score Breakdown Table */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs text-[#1D1D1B]">تفصيل توزيع درجات القضية المحاسبية:</h5>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs">
                      <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20">
                        <span className="text-gray-600 block text-[11px]">التشخيص والتصنيف</span>
                        <span className="text-base font-black font-mono text-[#8A1F1D]">{scoreDiagnosis} / 5</span>
                      </div>
                      <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20">
                        <span className="text-gray-600 block text-[11px]">الطريقة المطولة</span>
                        <span className="text-base font-black font-mono text-[#8A1F1D]">{scoreExtended} / 7</span>
                      </div>
                      <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20">
                        <span className="text-gray-600 block text-[11px]">الطريقة المختصرة</span>
                        <span className="text-base font-black font-mono text-[#8A1F1D]">{scoreShort} / 8</span>
                      </div>
                    </div>
                  </div>

                  {/* Ministerial Tip for Exams */}
                  <div className="p-4 bg-amber-50 border-r-4 border-amber-600 text-xs text-amber-950 space-y-1">
                    <span className="font-black block flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>نصيحة واضع الامتحان الوزاري:</span>
                    </span>
                    <p className="font-serif leading-relaxed text-[11px]">
                      {currentCase.ministerialTip}
                    </p>
                  </div>

                  {/* Navigation to Next Case */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        const nextIdx = (currentCaseIndex + 1) % ACCOUNTING_ERROR_CASES.length;
                        handleSelectCase(nextIdx);
                      }}
                      className="px-5 py-2.5 bg-[#1D1D1B] hover:bg-[#8A1F1D] text-white text-xs font-extrabold flex items-center gap-2 cursor-pointer"
                    >
                      <span>الانتقال للقضية التالية ({ACCOUNTING_ERROR_CASES[(currentCaseIndex + 1) % ACCOUNTING_ERROR_CASES.length].code})</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleSelectCase(currentCaseIndex)}
                      className="px-4 py-2 border border-[#1D1D1B] text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة محاولة القضية الحالية</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Right Column: Case Summary & Ministerial Cheatsheet (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Card 1: Official Rulebook Card */}
              <div className="bg-white border-2 border-[#1D1D1B] p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#1D1D1B] border-b border-[#1D1D1B]/15 pb-2">
                  <ShieldCheck className="w-4 h-4 text-[#8A1F1D]" />
                  <span>الأساس القانوني والمهني لمنع الكشط</span>
                </div>
                <div className="text-[11px] leading-relaxed text-[#1D1D1B]/80 font-serif space-y-2">
                  <p className="font-bold text-[#8A1F1D]">
                    {OFFICIAL_CORRECTION_RULES.legalFoundation.law}:
                  </p>
                  <p className="bg-[#F9F7F2] p-2.5 border-r-2 border-[#8A1F1D] text-gray-800">
                    "{OFFICIAL_CORRECTION_RULES.legalFoundation.ruleText}"
                  </p>
                </div>
              </div>

              {/* Card 2: Golden Rules of Correction */}
              <div className="bg-white border-2 border-[#1D1D1B] p-5 space-y-3 shadow-xs text-xs">
                <div className="flex items-center gap-2 font-black text-[#1D1D1B] border-b border-[#1D1D1B]/15 pb-2">
                  <Sparkles className="w-4 h-4 text-[#C4A484]" />
                  <span>القواعد الذهبية لتصحيح الأخطاء:</span>
                </div>

                <div className="space-y-2 text-[11px] font-serif text-gray-800">
                  <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                    <span className="font-bold text-[#8A1F1D] block">1. خطأ في اسم الحساب:</span>
                    نعكس الحساب الخطأ ليصبح في الطرف المقابل، ونثبت الحساب الصحيح، ويبقى الحساب النقدي سليم.
                  </div>

                  <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                    <span className="font-bold text-[#8A1F1D] block">2. خطأ الزيادة في المبلغ:</span>
                    نعكس القيد بالفرق فقط (المسجل - الصحيح) لتخفيض التضخم.
                  </div>

                  <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                    <span className="font-bold text-[#8A1F1D] block">3. خطأ النقص في المبلغ:</span>
                    نكرر نفس أطراف القيد بالفرق المتبقي (الصحيح - المسجل) دون عكس!
                  </div>

                  <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                    <span className="font-bold text-[#8A1F1D] block">4. الحساب المعلق (Suspense):</span>
                    يُقفل بجعله في الطرف المعاكس لرصيده الأصلي مع إثبات الطرف الحقيقي المنسي.
                  </div>
                </div>
              </div>

              {/* Card 3: Quick Case Index */}
              <div className="bg-[#F9F7F2] border-2 border-[#1D1D1B] p-4 space-y-2 text-xs">
                <span className="font-black text-[#1D1D1B] block border-b border-[#1D1D1B]/20 pb-1">
                  فهرس الحالات التدريبية المعتمدة:
                </span>
                <div className="space-y-1.5 pt-1">
                  {ACCOUNTING_ERROR_CASES.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCase(i)}
                      className={`w-full text-right p-2 text-[11px] font-bold transition flex items-center justify-between ${
                        currentCaseIndex === i
                          ? 'bg-[#1D1D1B] text-[#C4A484]'
                          : 'bg-white hover:bg-gray-100 text-gray-700 border border-[#1D1D1B]/10'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono">{c.code}</span>
                        <span className="truncate max-w-[170px]">{c.title}</span>
                      </div>
                      {currentCaseIndex === i && <ChevronLeft className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: METHODOLOGY COMPARISON ENGINE */}
      {activeTab === 'method_comparison' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-[#1D1D1B]/15 pb-4">
            <h3 className="text-lg font-black text-[#1D1D1B]">
              المقارنة المنهجية التطبيقية: الطريقة المطولة مقابل الطريقة المختصرة
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              اعتمدت وزارة التربية والتعليم كلا الطريقتين في تصحيح الأخطاء المحاسبية في الدفاتر التجارية الرسمية، ولكل طريقة ميزاتها واستخداماتها الامتحانية والمهنية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Extended Method Column */}
            <div className="border-2 border-[#1D1D1B] bg-[#F9F7F2] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1D1D1B]/20 pb-3">
                <span className="font-black text-sm text-[#8A1F1D]">الطريقة المطولة (The Extended Method)</span>
                <span className="text-[10px] font-mono font-bold bg-[#8A1F1D] text-white px-2 py-0.5">قيدين في اليومية</span>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#1D1D1B] block">خطوات التنفيذ المنهجية:</span>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-800 font-serif leading-relaxed">
                  <li>
                    <strong className="text-[#8A1F1D]">قيد إلغاء:</strong> يتم إلغاء القيد الخاطئ تماماً بعكس أطرافه (المدين يصبح دائناً والدائن يصبح مديناً بنفس المبلغ المسجل به خطأ).
                  </li>
                  <li>
                    <strong className="text-[#8A1F1D]">قيد إثبات:</strong> يتم إثبات القيد الصحيح كما كان ينبغي أن يُقيد في اليومية منذ البداية.
                  </li>
                </ol>
              </div>

              <div className="p-3 bg-white border border-[#1D1D1B]/15 space-y-2 text-xs">
                <span className="font-bold text-emerald-900 block">المزايا والخصائص:</span>
                <p className="text-gray-700 text-[11px] leading-relaxed font-serif">
                  واضحة تماماً للمراجعين الخارجيين ومأموري الضرائب، حيث يستطيع أي شخص تتبع واقعة إلغاء القيد الفاسد أولاً ثم نشأة القيد الصحيح ثانياً.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#1D1D1B]/15 space-y-2 text-xs">
                <span className="font-bold text-red-900 block">العيوب:</span>
                <p className="text-gray-700 text-[11px] leading-relaxed font-serif">
                  تستهلك صفحات إضافية في دفتر اليومية العام ودفاتر الأستاذ، وتتطلب وقتاً أطول في التسجيل والترحيل.
                </p>
              </div>
            </div>

            {/* Short Method Column */}
            <div className="border-2 border-[#1D1D1B] bg-white p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1D1D1B]/20 pb-3">
                <span className="font-black text-sm text-[#1D1D1B]">الطريقة المختصرة (The Short / Direct Method)</span>
                <span className="text-[10px] font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5">قيد تسوية واحد</span>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#1D1D1B] block">خطوات التنفيذ المنهجية:</span>
                <p className="text-gray-800 font-serif leading-relaxed text-[11px]">
                  يتم تحديد الحساب الصحيح والحساب الخاطئ، وإجراء قيد تسوية مباشر واحد يصحح الحساب المتأثر فقط، مع ترك الحسابات السليمة دون أي مساس أو تكرار.
                </p>
              </div>

              <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-2 text-xs">
                <span className="font-bold text-emerald-900 block">المزايا والخصائص:</span>
                <p className="text-gray-700 text-[11px] leading-relaxed font-serif">
                  سريعة جداً، تختصر 50% من الجهد والدفاتر، وهي الطريقة الأكثر استخداماً في الحياة العملية والمحاسبة الإلكترونية وفي أغلب أسئلة الامتحانات الوزارية.
                </p>
              </div>

              <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-2 text-xs">
                <span className="font-bold text-amber-900 block">العيوب والمحاذير:</span>
                <p className="text-gray-700 text-[11px] leading-relaxed font-serif">
                  تتطلب تركيزاً محاسبياً دقيقاً، لأن أي خطأ في حساب صافي الفرق قد يولد خطأً جديداً في الدفاتر.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLASSIFICATION MATRIX */}
      {activeTab === 'classification_matrix' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-[#1D1D1B]/15 pb-4">
            <h3 className="text-lg font-black text-[#1D1D1B]">
              مصفوفة تصنيف الأخطاء المحاسبية وعلاقتها بميزان المراجعة والحساب المعلق
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              تُقسم الأخطاء في الفكر المحاسبي الوزاري إلى مجموعتين رئيسيتين: أخطاء لا تؤثر على توازن ميزان المراجعة، وأخطاء تؤثر على توازنه.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Section A: No Effect on Balance */}
            <div className="border-2 border-[#1D1D1B] p-5 bg-[#F9F7F2] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#1D1D1B]/20 pb-2 font-black text-sm text-[#1D1D1B]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>أولاً: أخطاء لا تؤثر على توازن ميزان المراجعة (لا تستخدم المعلق)</span>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3 border border-[#1D1D1B]/15 space-y-1">
                  <span className="font-bold text-[#8A1F1D]">1. أخطاء الحذف أو السهو الكلي (Errors of Omission):</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    إغفال قيد عملية مالية برمتها في دفتر اليومية، فيتوازن الميزان دون أن يعكس المعاملة.
                  </p>
                </div>

                <div className="bg-white p-3 border border-[#1D1D1B]/15 space-y-1">
                  <span className="font-bold text-[#8A1F1D]">2. الأخطاء الفنية أو المبدئية (Errors of Principle):</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    مخالفة المبادئ المحاسبية (مثل الخلط بين المصروف الإيرادي والرأسمالي كشراء آلة وقيدها كمشتريات).
                  </p>
                </div>

                <div className="bg-white p-3 border border-[#1D1D1B]/15 space-y-1">
                  <span className="font-bold text-[#8A1F1D]">3. أخطاء التوجيه في أسماء الحسابات (Errors of Commission):</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    قيد العملية في حساب شخصي خاطئ بنفس الجانب والمبلغ (مثل قيد سداد العميل علي في حساب العميل عمر).
                  </p>
                </div>

                <div className="bg-white p-3 border border-[#1D1D1B]/15 space-y-1">
                  <span className="font-bold text-[#8A1F1D]">4. الأخطاء المعوضة أو المتكافئة (Compensating Errors):</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    خطأ في حساب يعوضه تماماً خطأ آخر مساوٍ له في حساب آخر بالطرف المقابل.
                  </p>
                </div>
              </div>
            </div>

            {/* Section B: Affects Balance */}
            <div className="border-2 border-[#1D1D1B] p-5 bg-white space-y-4">
              <div className="flex items-center gap-2 border-b border-[#1D1D1B]/20 pb-2 font-black text-sm text-[#8A1F1D]">
                <AlertTriangle className="w-4 h-4 text-[#8A1F1D]" />
                <span>ثانياً: أخطاء تؤثر على توازن ميزان المراجعة (تستوجب الحساب المعلق)</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15 space-y-1">
                  <span className="font-bold text-[#1D1D1B]">1. ترحيل طرف واحد فقط إلى دفتر الأستاذ:</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    ترحيل الجانب المدين للقيد وإغفال ترحيل الجانب الدائن لحسابه المختص، فيحدث فرق مساوٍ لمبلغ العملية.
                  </p>
                </div>

                <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15 space-y-1">
                  <span className="font-bold text-[#1D1D1B]">2. ترحيل أحد الطرفين بمبلغ يختلف عن الآخر:</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    تسجيل المدين بـ 15,000 والدائن بـ 1,500 فيحدث اختلال قدره 13,500 جنيه.
                  </p>
                </div>

                <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15 space-y-1">
                  <span className="font-bold text-[#1D1D1B]">3. أخطاء جمع وترصيد حسابات الأستاذ أو اليومية:</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    خطأ حسابي في جمع الجانب المدين أو الدائن في أحد الحسابات أو نقل رصيده للميزان برقم معكوس أو خاطئ.
                  </p>
                </div>

                <div className="p-3 bg-red-50 border border-red-300 text-[11px] text-red-950 font-bold space-y-1">
                  <span>🚨 تنبيه وزاري حاسم:</span>
                  <p className="font-normal font-serif">
                    يُفتح "الحساب المعلق" كحساب وسيط لمعادلة الفرق في ميزان المراجعة مؤقتاً، ولا يجوز إطلاقاً استخدامه لتصحيح الأخطاء التي لا تؤثر على توازن الميزان!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LEGAL RULES & MINISTERIAL CHEATSHEET */}
      {activeTab === 'legal_rules' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2 border-b border-[#1D1D1B]/15 pb-4">
            <h3 className="text-lg font-black text-[#1D1D1B]">
              الدليل القانوني والنظامي لإمساك الدفاتر وتصحيح الأخطاء
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              المستند القانوني لقواعد التدقيق المالي المعتمدة في جمهورية مصر العربية وفق أحكام القانون التجاري.
            </p>
          </div>

          <div className="space-y-4 text-xs font-serif leading-relaxed">
            <div className="p-4 bg-[#F9F7F2] border-r-4 border-[#8A1F1D] space-y-2">
              <h4 className="font-black text-sm text-[#1D1D1B]">
                نص المادة 11 من القانون التجاري المصري رقم 17 لسنة 1999:
              </h4>
              <p className="text-gray-800 text-xs italic">
                «يجب أن تكون الدفاتر التجارية خالية من أي قشط أو شطب أو حك أو تحشير أو فراغ أو كتابة في الحواشي أو بين السطور، وإذا وقع خطأ وجب تصحيحه بقيد عكسي أو قيد تسوية في دفتر اليومية.»
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 border border-[#1D1D1B]/20 bg-white space-y-2">
                <span className="font-black text-xs text-[#8A1F1D] block">الأثر الضريبي والقانوني:</span>
                <p className="text-[11px] text-gray-600">
                  وجود أي كشط أو شطب مادي في الدفاتر يعطي مصلحة الضرائب الحق في إهدار الدفاتر التجارية واعتبارها غير منتظمة، وتحديد الأرباح جزافياً.
                </p>
              </div>

              <div className="p-4 border border-[#1D1D1B]/20 bg-white space-y-2">
                <span className="font-black text-xs text-[#8A1F1D] block">الأثر على مصداقية القوائم:</span>
                <p className="text-[11px] text-gray-600">
                  التصحيح بالقيود المحاسبية يوثق الشفافية ويمنع التلاعب المالي، ويضمن إمكانية تتبع الأثر التاريخي للأرصدة من قبل المراجع القانوني.
                </p>
              </div>

              <div className="p-4 border border-[#1D1D1B]/20 bg-white space-y-2">
                <span className="font-black text-xs text-[#8A1F1D] block">المعايير المصرية المقابلة:</span>
                <p className="text-[11px] text-gray-600">
                  يتسق التصحيح الدفتري مع معيار المحاسبة المصري رقم (5) الخاص بالسياسات المحاسبية والتغيرات في التقديرات المحاسبية والأخطاء.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
