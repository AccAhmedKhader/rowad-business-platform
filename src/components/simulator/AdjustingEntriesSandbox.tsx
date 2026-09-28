import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  HelpCircle, 
  Calculator, 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  FileSpreadsheet, 
  BookOpen, 
  ShieldCheck,
  Send,
  RotateCcw,
  Clock,
  Eye,
  Check
} from 'lucide-react';

export interface AdjustmentScenario {
  id: string;
  category: 'prepaid_expense' | 'accrued_expense' | 'accrued_revenue' | 'unearned_revenue' | 'doubtful_debts' | 'depreciation';
  titleAr: string;
  badgeAr: string;
  badgeColor: string;
  accountingStandard: string; // Egyptian Accounting Standard (EAS) reference
  conceptPrinciple: string; // مبدأ المحاسبة (الاستحقاق، المقابلة، الحيطة والحذر)
  situation: string;
  totalAmount: number;
  periodPortion: number; // ما يخص الفترة الحالية (قائمة الدخل)
  deferredPortion: number; // ما يخص الفترات القادمة (قائمة المركز المالي)
  entryDate: string;
  debitAccountName: string;
  creditAccountName: string;
  entryAmount: number;
  entryDescription: string;
  omissionImpact: {
    netIncomeEffect: 'OVERSTATED' | 'UNDERSTATED' | 'NO_EFFECT';
    netIncomeAmount: number;
    netIncomeExplanation: string;
    assetsEffect: 'OVERSTATED' | 'UNDERSTATED' | 'NO_EFFECT';
    assetsAmount: number;
    assetsExplanation: string;
    liabilitiesEffect: 'OVERSTATED' | 'UNDERSTATED' | 'NO_EFFECT';
    liabilitiesAmount: number;
    liabilitiesExplanation: string;
    equityEffect: 'OVERSTATED' | 'UNDERSTATED' | 'NO_EFFECT';
    equityAmount: number;
  };
  jreQuestion: string;
  jreModelAnswer: string;
}

export const OFFICIAL_ADJUSTMENT_SCENARIOS: AdjustmentScenario[] = [
  {
    id: 'adj-prepaid-rent',
    category: 'prepaid_expense',
    titleAr: 'تسوية مصروف الإيجار المدفوع مقدماً (Prepaid Rent)',
    badgeAr: 'مصروف مدفوع مقدماً (أصل)',
    badgeColor: 'bg-blue-800 text-white',
    accountingStandard: 'معيار المحاسبة المصري رقم (1) - عرض القوائم المالية',
    conceptPrinciple: 'مبدأ الاستحقاق (Accrual Basis) ومبدأ مقابلة الإيرادات بالمصروفات',
    situation: 'في 2026/07/01 قامت المنشأة بسداد إيجار المعرض التجاري بمبلغ 36,000 ج.م نقداً لمدة سنة كاملة تنتهي في 2027/06/30، وسُجل المبلغ بالكامل وقت السداد في حساب مصروف الإيجار. عند نهاية السنة المالية في 2026/12/31 تبين أن ما يخص العام الحالي هو 6 أشهر فقط (18,000 ج)، بينما الـ 6 أشهر الأخرى (18,000 ج) تخص العام القادم.',
    totalAmount: 36000,
    periodPortion: 18000,
    deferredPortion: 18000,
    entryDate: '2026/12/31',
    debitAccountName: 'حساب مصروف إيجار مدفوع مقدماً (Prepaid Rent)',
    creditAccountName: 'حساب مصروف الإيجار (Rent Expense)',
    entryAmount: 18000,
    entryDescription: 'قيد تسوية: استبعاد الإيجار الذي يخص السنة القادمة وتثبيته كأصل متداول (أرصدة مدينة أخرى) وتخفيض مصروف الفترة',
    omissionImpact: {
      netIncomeEffect: 'UNDERSTATED',
      netIncomeAmount: 18000,
      netIncomeExplanation: 'إذا أُهمل القيد، يظل مصروف الإيجار مضخماً بـ 36,000 ج مما يؤدي إلى خفض وتشويه صافي ربح الفترة الحالية بـ 18,000 ج عن حقيقته.',
      assetsEffect: 'UNDERSTATED',
      assetsAmount: 18000,
      assetsExplanation: 'تنخفض الأصول لأن حساب (مصروف إيجار مقدم) لم يُسجل كأصل متداول ضمن الأرصدة المدينة الأخرى.',
      liabilitiesEffect: 'NO_EFFECT',
      liabilitiesAmount: 0,
      liabilitiesExplanation: 'لا تتأثر الالتزامات نظراً لأن العملية تمت تسويتها بين الأصول والمصروفات.',
      equityEffect: 'UNDERSTATED',
      equityAmount: 18000
    },
    jreQuestion: 'فسر محاسبياً كيف يؤدي إغفال قيد تسوية الإيجار المقدم إلى تضليل مستخدمي القوائم المالية وما المبدأ الحاكم للمعالجة؟',
    jreModelAnswer: 'طبقاً لمبدأ الاستحقاق ومبدأ المقابلة في الفكر المحاسبي، يجب أن تتحمل السنة المالية بما يخصها فقط من مصروفات الإيجار المنقضية (18,000 ج). إغفال التسوية يترتب عليه تضخيم المصروفات، مما يخفض صافي الأرباح وحقوق الملكية دون وجه حق ويخفي حق المنشأة المستقبلي في استغلال العقار كأصل متداول.'
  },
  {
    id: 'adj-accrued-salaries',
    category: 'accrued_expense',
    titleAr: 'تسوية الرواتب والأجور المستحقة (Accrued Salaries)',
    badgeAr: 'مصروف مستحق (التزام)',
    badgeColor: 'bg-rose-800 text-white',
    accountingStandard: 'معيار المحاسبة المصري رقم (1) ومفهوم الالتزام الحالي',
    conceptPrinciple: 'أساس الاستحقاق وتحميل الفترة بما يخصها من أعباء تشغيلية',
    situation: 'تبلغ رواتب العاملين الشهرية بالمنشأة 15,000 ج.م. خلال السنة المالية تم سداد رواتب 11 شهراً فقط بمجموع 165,000 ج.م، ولم تسدد رواتب شهر ديسمبر (15,000 ج.م) حتى تاريخ إقفال الحسابات في 2026/12/31.',
    totalAmount: 180000,
    periodPortion: 180000,
    deferredPortion: 15000,
    entryDate: '2026/12/31',
    debitAccountName: 'حساب مصروف الرواتب والأجور (Salaries Expense)',
    creditAccountName: 'حساب أجور ورواتب مستحقة (Accrued Salaries)',
    entryAmount: 15000,
    entryDescription: 'قيد تسوية: إثبات ما يخص شهر ديسمبر من رواتب كمصروف يخص الفترة وتثبيت التزام متداول على المنشأة للعاملين',
    omissionImpact: {
      netIncomeEffect: 'OVERSTATED',
      netIncomeAmount: 15000,
      netIncomeExplanation: 'إغفال القيد يجعل المصروفات المسجلة 165,000 ج بدلاً من 180,000 ج، مما يضخم صافي أرباح المنشأة بصورة وهمية بمقدار 15,000 ج.',
      assetsEffect: 'NO_EFFECT',
      assetsAmount: 0,
      assetsExplanation: 'لا تتأثر الأصول في تاريخ التسوية لأن المبلغ لم يُصرف نقداً بعد.',
      liabilitiesEffect: 'UNDERSTATED',
      liabilitiesAmount: 15000,
      liabilitiesExplanation: 'تنخفض الالتزامات لأن دين العاملين (أجور مستحقة) لم يدرج ضمن الخصوم المتداولة.',
      equityEffect: 'OVERSTATED',
      equityAmount: 15000
    },
    jreQuestion: 'ما التبعات المحاسبية والقانونية لإغفال إثبات الأجور المستحقة في نهاية الفترة المالية؟',
    jreModelAnswer: 'إغفال إثبات الأجور المستحقة يعد خرقاً لأساس الاستحقاق، وينجم عنه تضخيم غير واقعي لأرباح المنشأة بـ 15,000 ج وتصوير مركز مالي مضلل يخفي التزاماً واجب السداد للعمال، مما قد يؤدي لتوزيع أرباح صورية وإضرار بأموال الدائنين والمنشأة.'
  },
  {
    id: 'adj-accrued-revenue',
    category: 'accrued_revenue',
    titleAr: 'تسوية الإيرادات المستحقة غير المحصلة (Accrued Revenues)',
    badgeAr: 'إيراد مستحق (أصل)',
    badgeColor: 'bg-emerald-800 text-white',
    accountingStandard: 'معيار المحاسبة المصري رقم (48) - الإيراد من العقود مع العملاء',
    conceptPrinciple: 'مبدأ تحقق الإيراد وأساس الاستحقاق',
    situation: 'قامت المنشأة بتقديم خدمات استشارية ودراسات جدوى لإحدى الشركات بقيمة 22,000 ج.م خلال شهر ديسمبر وتم تسليم التقرير النهائي واعتماده، ولكن لم يتم تحصيل المبلغ أو إصدار المطالبة الرسمية حتى 2026/12/31.',
    totalAmount: 22000,
    periodPortion: 22000,
    deferredPortion: 0,
    entryDate: '2026/12/31',
    debitAccountName: 'حساب إيرادات استشارات مستحقة (Accrued Consulting Revenue)',
    creditAccountName: 'حساب إيرادات الاستشارات والخدمات (Consulting Revenue)',
    entryAmount: 22000,
    entryDescription: 'قيد تسوية: إثبات الإيراد المكتسب الذي تحقق خلال الفترة وتثبيت حق المنشأة كأصل متداول (أرصدة مدينة أخرى)',
    omissionImpact: {
      netIncomeEffect: 'UNDERSTATED',
      netIncomeAmount: 22000,
      netIncomeExplanation: 'إغفال القيد يؤدي إلى إسقاط 22,000 ج من إيرادات النشاط المتحققة، مما يخفض صافي ربح الفترة ويقلل العائد الاستثماري.',
      assetsEffect: 'UNDERSTATED',
      assetsAmount: 22000,
      assetsExplanation: 'تنخفض الأصول نظراً لعدم تسجيل المستحقات المالية لدى الغير في قائمة المركز المالي.',
      liabilitiesEffect: 'NO_EFFECT',
      liabilitiesAmount: 0,
      liabilitiesExplanation: 'لا توجد أية التزامات ناشئة عن تقديم الخدمة المنجزة.',
      equityEffect: 'UNDERSTATED',
      equityAmount: 22000
    },
    jreQuestion: 'لماذا يُلزم معيار الإيرادات المنشأة بالاعتراف بالإيراد رغم عدم استلام النقدية حتى تاريخ المركز المالي؟',
    jreModelAnswer: 'لأن جوهر الاعتراف بالإيراد يرتكز على إنجاز التزام الأداء وتقديم المنفعة الاقتصادية المتفق عليها للعميل. وبموجب أساس الاستحقاق، يُثبت الإيراد بمجرد تحققه بصرف النظر عن واقعة التحصيل النقدي، مع إثبات المطالبة كأصل متداول.'
  },
  {
    id: 'adj-unearned-revenue',
    category: 'unearned_revenue',
    titleAr: 'تسوية الإيرادات المحصلة مقدماً (Unearned Revenues)',
    badgeAr: 'إيراد مقدم (التزام)',
    badgeColor: 'bg-purple-800 text-white',
    accountingStandard: 'معيار المحاسبة المصري رقم (48) والالتزامات التعاقدية',
    conceptPrinciple: 'مبدأ تحقق الإيراد وعدم الاعتراف بالإيراد قبل تقديم الخدمة',
    situation: 'في 2026/10/01 حصلت المنشأة على مبلغ 48,000 ج.م نقداً مقابل عقد صيانة دورية سنوي يمتد من 2026/10/01 حتى 2027/09/30، وسُجل المبلغ بالكامل وقت التحصيل كإيراد خدمات. في 2026/12/31 تبين أن ما يخص الفترة الحالية هو 3 أشهر فقط (12,000 ج)، بينما الـ 9 أشهر المتبقية (36,000 ج) تخص السنة القادمة.',
    totalAmount: 48000,
    periodPortion: 12000,
    deferredPortion: 36000,
    entryDate: '2026/12/31',
    debitAccountName: 'حساب إيرادات خدمات الصيانة (Maintenance Revenue)',
    creditAccountName: 'حساب إيرادات خدمات محصلة مقدماً (Unearned Revenue)',
    entryAmount: 36000,
    entryDescription: 'قيد تسوية: تخفيض إيراد الفترة الحالية بما يخص السنة القادمة وإثبات المبلغ كالتزام متداول حتى تأدية الخدمة',
    omissionImpact: {
      netIncomeEffect: 'OVERSTATED',
      netIncomeAmount: 36000,
      netIncomeExplanation: 'إغفال القيد يجعل إيرادات الصيانة مضخمة بـ 48,000 ج، مما يضخم صافي الربح بمقدار 36,000 ج لم تكسبها المنشأة بعد.',
      assetsEffect: 'NO_EFFECT',
      assetsAmount: 0,
      assetsExplanation: 'النقدية سُجلت بالفعل بالكامل وقت التحصيل، فلا تغيير في الأصول.',
      liabilitiesEffect: 'UNDERSTATED',
      liabilitiesAmount: 36000,
      liabilitiesExplanation: 'تنخفض الالتزامات لأن التزام تأدية الخدمة للعملاء مستقبلاً لم يظهر كخصم متداول.',
      equityEffect: 'OVERSTATED',
      equityAmount: 36000
    },
    jreQuestion: 'ما السند المحاسبي لتصنيف الإيراد المحصل مقدماً كالتزام (خصم) وليس كإيراد أو حق ملكية؟',
    jreModelAnswer: 'يُصنف الإيراد المحصل مقدماً كالتزام لأن المنشأة استلمت مقابلاً نقدياً وتعهدت بتقديم خدمة مستقبلية. وطالما لم يُنجز التزام الأداء، فإن المبلغ يمثل ديناً في ذمة المنشأة لصالح العميل؛ إما أن تؤديه خدمة أو ترده نقداً إذا فُسخ العقد.'
  },
  {
    id: 'adj-doubtful-debts',
    category: 'doubtful_debts',
    titleAr: 'تسوية مخصص الديون المشكوك في تحصيلها (Allowance for Doubtful Accounts)',
    badgeAr: 'مخصص خسائر ائتمانية (أصل مقابل)',
    badgeColor: 'bg-amber-800 text-white',
    accountingStandard: 'معيار المحاسبة المصري رقم (47) - الأدوات المالية',
    conceptPrinciple: 'مبدأ الحيطة والحذر (Prudence) وإظهار الأصول بقيمتها القابلة للتحقق',
    situation: 'أظهر ميزان المراجعة قبل التسويات رصيد حساب العملاء / المدينين بمبلغ 200,000 ج.م. وبدراسة أعمار الديون والمركز المالي للعملاء، تقرر تكوين مخصص ديون مشكوك في تحصيلها بنسبة 5% من رصيد المدينين (10,000 ج.م) لمواجهة حالات الإعسار والتعثر المحتملة.',
    totalAmount: 200000,
    periodPortion: 10000,
    deferredPortion: 190000,
    entryDate: '2026/12/31',
    debitAccountName: 'حساب مصروف ديون مشكوك في تحصيلها (Bad Debt Expense)',
    creditAccountName: 'حساب مخصص ديون مشكوك في تحصيلها (Allowance for Doubtful Accounts)',
    entryAmount: 10000,
    entryDescription: 'قيد تسوية: تحميل الفترة بعبء الخسائر الائتمانية المتوقعة وتكوين حساب مخصص مقابل يخصم من المدينين في الميزانية',
    omissionImpact: {
      netIncomeEffect: 'OVERSTATED',
      netIncomeAmount: 10000,
      netIncomeExplanation: 'إغفال القيد يحرم قائمة الدخل من عبء الخسارة الائتمانية المحتملة، مما يضخم صافي الربح بـ 10,000 ج.',
      assetsEffect: 'OVERSTATED',
      assetsAmount: 10000,
      assetsExplanation: 'تظهر الأصول المتداولة (المدينون) بكامل قيمتها الاسمية (200,000 ج) دون استنزال المخصص، مما يضخم الأصول بأكثر من قيمتها الاستردادية المتوقعة.',
      liabilitiesEffect: 'NO_EFFECT',
      liabilitiesAmount: 0,
      liabilitiesExplanation: 'لا تأثير على الالتزامات.',
      equityEffect: 'OVERSTATED',
      equityAmount: 10000
    },
    jreQuestion: 'كيف يجسد مخصص الديون المشكوك في تحصيلها مبدأ الحيطة والحذر المحاسبي؟',
    jreModelAnswer: 'يفرض مبدأ الحيطة والحذر الأخذ في الحسبان جميع الخسائر المتوقعة بمجرد رجحان حدوثها، وعدم الاعتراف بالأرباح إلا عند تحققها الفعلي. تكوين المخصص يمنع تضخيم قيمة المدينين في الميزانية ويجنب المنشأة توزيع أرباح وهمية ناتجة عن ديون غير قابلة للتحصيل.'
  },
  {
    id: 'adj-depreciation',
    category: 'depreciation',
    titleAr: 'تسوية إهلاك الأصول الثابتة (Fixed Assets Depreciation)',
    badgeAr: 'إهلاك وتآكل دفتري (أصل مقابل)',
    badgeColor: 'bg-zinc-800 text-white',
    accountingStandard: 'معيار المحاسبة المصري رقم (10) - الأصول الثابتة وإهلاكاتها',
    conceptPrinciple: 'مبدأ المقابلة وتوزيع تكلفة الأصل على فترات الاستفادة الإنتاجية',
    situation: 'تمتلك المنشأة سيارات نقل بضائع بلغت تكلفتها التاريخية 300,000 ج.م وقيمتها التخريدية المقدرة في نهاية عمرها 30,000 ج.م، وعمرها الإنتاجي المقدر 5 سنوات. وفق طريقة القسط الثابت يبلغ قسط الإهلاك السنوي = (300,000 - 30,000) ÷ 5 = 54,000 ج.م سنوياً.',
    totalAmount: 300000,
    periodPortion: 54000,
    deferredPortion: 246000,
    entryDate: '2026/12/31',
    debitAccountName: 'حساب مصروف إهلاك سيارات (Depreciation Expense - Vehicles)',
    creditAccountName: 'حساب مجمع إهلاك سيارات (Accumulated Depreciation - Vehicles)',
    entryAmount: 54000,
    entryDescription: 'قيد تسوية: تحميل الفترة بنصيبها من استهلاك وتآكل السيارات وتكوين مجمع إهلاك تراكمي يخصم من الأصل بالميزانية',
    omissionImpact: {
      netIncomeEffect: 'OVERSTATED',
      netIncomeAmount: 54000,
      netIncomeExplanation: 'إغفال قيد الإهلاك يؤدي إلى عدم تحميل الفترة بنصيبها من تكلفة الطاقة الإنتاجية المستنفذة، مما يضخم صافي الربح بـ 54,000 ج.',
      assetsEffect: 'OVERSTATED',
      assetsAmount: 54000,
      assetsExplanation: 'تظهر الأصول الثابتة بتكلفتها التاريخية الكاملة دون طرح مجمع الإهلاك، مما يضخم الأصول بالميزانية.',
      liabilitiesEffect: 'NO_EFFECT',
      liabilitiesAmount: 0,
      liabilitiesExplanation: 'لا تأثير على الالتزامات.',
      equityEffect: 'OVERSTATED',
      equityAmount: 54000
    },
    jreQuestion: 'بين لماذا يعتبر الإهلاك توزيعاً للتكلفة وليس أداة لتقييم الأصل أو توفير نقدية؟',
    jreModelAnswer: 'المحاسبة المالية تتعامل مع الإهلاك كعملية توزيع عادل لتكلفة الأصل القابلة للإهلاك على مدار فترات الاستفادة منه تطبيقاً لمبدأ المقابلة. الإهلاك لا يهدف لبيان القيمة السوقية للسيارة ولا يولد تدفقات نقدية، بل هو مصروف غير نقدي يضمن مقابلة إيرادات كل عام بما استُهلك من أصول لتوليدها.'
  }
];

interface AdjustingEntriesSandboxProps {
  onApplyAdjustmentToLedger?: (entry: {
    debitAccount: string;
    creditAccount: string;
    amount: number;
    description: string;
    date: string;
  }) => void;
  onNavigateToJRE?: (questionPrompt: string) => void;
}

export const AdjustingEntriesSandbox: React.FC<AdjustingEntriesSandboxProps> = ({
  onApplyAdjustmentToLedger,
  onNavigateToJRE
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(OFFICIAL_ADJUSTMENT_SCENARIOS[0].id);
  const [appliedScenarios, setAppliedScenarios] = useState<Record<string, boolean>>({});
  const [showOmissionBreakdown, setShowOmissionBreakdown] = useState<boolean>(true);
  const [userCalculation, setUserCalculation] = useState<{ period: string; deferred: string }>({ period: '', deferred: '' });
  const [calcFeedback, setCalcFeedback] = useState<string | null>(null);

  const scenario = OFFICIAL_ADJUSTMENT_SCENARIOS.find(s => s.id === selectedScenarioId) || OFFICIAL_ADJUSTMENT_SCENARIOS[0];
  const isApplied = !!appliedScenarios[scenario.id];

  const handleApply = () => {
    if (onApplyAdjustmentToLedger) {
      onApplyAdjustmentToLedger({
        debitAccount: scenario.debitAccountName,
        creditAccount: scenario.creditAccountName,
        amount: scenario.entryAmount,
        description: scenario.entryDescription,
        date: scenario.entryDate
      });
    }
    setAppliedScenarios(prev => ({ ...prev, [scenario.id]: true }));
  };

  const handleCheckCalculation = () => {
    const pVal = Number(userCalculation.period);
    const dVal = Number(userCalculation.deferred);

    if (pVal === scenario.periodPortion && (scenario.deferredPortion === 0 || dVal === scenario.deferredPortion)) {
      setCalcFeedback('إجابة صحيحة ومطابقة للمعايير المحاسبية! تم احتساب نصيب الفترة والمبلغ المؤجل بدقة.');
    } else {
      setCalcFeedback(`راجع الحسبة: ما يخص الفترة الحالية هو ${scenario.periodPortion.toLocaleString()} ج.م، وما يخص الفترات اللاحقة هو ${scenario.deferredPortion.toLocaleString()} ج.م.`);
    }
  };

  return (
    <div className="space-y-6 font-serif" dir="rtl">
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#1D1D1B] text-[#C4A484] text-xs font-bold px-2.5 py-0.5">
              معمل التسويات الجردية الذكي
            </span>
            <span className="bg-[#8A1F1D] text-white text-xs font-bold px-2.5 py-0.5">
              الوحدة الخامسة • معايير المحاسبة المصرية (EAS)
            </span>
            <span className="bg-[#F9F7F2] text-[#1D1D1B] text-xs font-mono font-bold px-2 py-0.5 border border-[#1D1D1B]/20">
              {Object.keys(appliedScenarios).length} من 6 تسويات مُرحلة
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1D1D1B]">
            كاشف التسويات الجردية وتحليل أثر نسيان أو إهمال القيد (Omission Impact Analyzer)
          </h2>
          <p className="text-xs sm:text-sm text-[#1D1D1B]/70 leading-relaxed">
            وفق أساس الاستحقاق المحاسبي: تدرب على إثبات المصروفات والإيرادات المقدمة والمستحقة، ومخصص الديون المشكوك فيها، وإهلاك الأصول، مع فحص فوري لتأثير نسيان القيد على تضخيم أو تخفيض صافي الربح والميزانية.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => setShowOmissionBreakdown(!showOmissionBreakdown)}
            className="px-3.5 py-2 bg-[#F9F7F2] hover:bg-[#F0EEE6] border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Eye className="w-4 h-4 text-[#8A1F1D]" />
            <span>{showOmissionBreakdown ? 'إخفاء كاشف الأثر المالي' : 'إظهار كاشف الأثر المالي'}</span>
          </button>
        </div>
      </div>

      {/* Scenarios Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {OFFICIAL_ADJUSTMENT_SCENARIOS.map((s, idx) => {
          const isSelected = s.id === selectedScenarioId;
          const isDone = !!appliedScenarios[s.id];

          return (
            <button
              key={s.id}
              onClick={() => {
                setSelectedScenarioId(s.id);
                setUserCalculation({ period: '', deferred: '' });
                setCalcFeedback(null);
              }}
              className={`p-3 text-right border transition flex flex-col justify-between space-y-2 cursor-pointer relative ${
                isSelected 
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-sm' 
                  : 'bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20'
              }`}
            >
              {isDone && (
                <span className="absolute top-2 left-2 w-4 h-4 bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              )}
              <div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 inline-block mb-1 ${
                  isSelected ? 'bg-[#C4A484] text-[#1D1D1B]' : 'bg-[#1D1D1B]/10 text-[#1D1D1B]'
                }`}>
                  حالة {idx + 1}
                </span>
                <h4 className="text-xs font-extrabold line-clamp-2 leading-snug">
                  {s.titleAr.replace('تسوية ', '')}
                </h4>
              </div>
              <div className="text-[10px] opacity-75 font-mono pt-1 border-t border-current/10">
                {s.entryAmount.toLocaleString()} ج.م
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Detailed Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Main Column: Case Details, Calculations, and Journal Entry (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Situation & Principle Card */}
          <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 ${scenario.badgeColor}`}>
                  {scenario.badgeAr}
                </span>
                <span className="text-xs text-[#1D1D1B]/60 font-mono">
                  {scenario.entryDate}
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
                {scenario.conceptPrinciple}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-[#1D1D1B]">
                {scenario.titleAr}
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed bg-[#F9F7F2] p-4 border border-[#1D1D1B]/15">
                {scenario.situation}
              </p>
            </div>

            {/* Interactive Calculation Check */}
            <div className="pt-2 border-t border-[#1D1D1B]/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-[#8A1F1D]" />
                  <span>تمرين استخراج نصيب الفترة المحاسبية (تحقق ذاتي):</span>
                </span>
                <span className="text-[11px] text-[#1D1D1B]/60 font-mono">
                  إجمالي المبلغ: {scenario.totalAmount.toLocaleString()} ج.م
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#1D1D1B]/70 mb-1">
                    ما يخص العام الحالي (قائمة الدخل):
                  </label>
                  <input
                    type="number"
                    placeholder="مثال: 18000"
                    value={userCalculation.period}
                    onChange={(e) => setUserCalculation({ ...userCalculation, period: e.target.value })}
                    className="w-full p-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-mono font-bold focus:outline-hidden focus:border-[#1D1D1B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1D1D1B]/70 mb-1">
                    ما يخص الفترة القادمة (المركز المالي):
                  </label>
                  <input
                    type="number"
                    placeholder="مثال: 18000"
                    value={userCalculation.deferred}
                    onChange={(e) => setUserCalculation({ ...userCalculation, deferred: e.target.value })}
                    className="w-full p-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-mono font-bold focus:outline-hidden focus:border-[#1D1D1B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckCalculation}
                  className="px-3.5 py-1.5 bg-[#1D1D1B] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition cursor-pointer"
                >
                  تحقق من الحسبة المحاسبية
                </button>
                {calcFeedback && (
                  <span className={`text-xs font-bold ${calcFeedback.includes('صحيحة') ? 'text-emerald-800' : 'text-[#8A1F1D]'}`}>
                    {calcFeedback}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* The Standard Journal Entry Box */}
          <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-2.5">
              <span className="font-extrabold text-sm text-[#1D1D1B] flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#C4A484]" />
                <span>صيغة قيد اليومية الرسمية للتسوية (General Journal Entry):</span>
              </span>
              <span className="text-[11px] text-[#1D1D1B]/60 font-mono">
                بتاريخ {scenario.entryDate}
              </span>
            </div>

            {/* Formatted Double-Entry Table */}
            <div className="border border-[#1D1D1B]/20 overflow-hidden text-xs">
              <div className="bg-[#1D1D1B] text-[#F9F7F2] p-2.5 grid grid-cols-12 font-bold text-center">
                <span className="col-span-2 border-l border-white/20">مدين (ج.م)</span>
                <span className="col-span-2 border-l border-white/20">دائن (ج.م)</span>
                <span className="col-span-8 text-right pr-2">البيان والحسابات المتأثرة</span>
              </div>

              {/* Debit Line */}
              <div className="p-3 grid grid-cols-12 items-center bg-[#FFFFFF] border-b border-[#1D1D1B]/10">
                <span className="col-span-2 text-center font-mono font-bold text-emerald-800 text-sm">
                  {scenario.entryAmount.toLocaleString()}
                </span>
                <span className="col-span-2 text-center font-mono text-[#1D1D1B]/30">-</span>
                <div className="col-span-8 text-right pr-2">
                  <span className="text-[11px] text-[#1D1D1B]/50 font-bold ml-1">من حـ/</span>
                  <strong className="text-sm text-[#1D1D1B]">{scenario.debitAccountName}</strong>
                </div>
              </div>

              {/* Credit Line */}
              <div className="p-3 grid grid-cols-12 items-center bg-[#F9F7F2]">
                <span className="col-span-2 text-center font-mono text-[#1D1D1B]/30">-</span>
                <span className="col-span-2 text-center font-mono font-bold text-[#8A1F1D] text-sm">
                  {scenario.entryAmount.toLocaleString()}
                </span>
                <div className="col-span-8 text-right pr-6">
                  <span className="text-[11px] text-[#1D1D1B]/50 font-bold ml-1">إلى حـ/</span>
                  <strong className="text-sm text-[#1D1D1B]">{scenario.creditAccountName}</strong>
                </div>
              </div>

              {/* Explanation Note */}
              <div className="p-3 bg-[#FFFFFF] border-t border-[#1D1D1B]/10 text-xs text-[#1D1D1B]/70 italic">
                (شرح القيد: {scenario.entryDescription})
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#1D1D1B]/70">
                الحالة في الدفاتر: {isApplied ? (
                  <span className="text-emerald-800 font-bold">✓ تم ترحيل هذا القيد بنجاح لدفتر الأستاذ وميزان المراجعة</span>
                ) : (
                  <span className="text-[#8A1F1D] font-bold">● معلق بانتظار الترحيل الفعلي</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={isApplied}
                  className={`px-4 py-2 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs ${
                    isApplied 
                      ? 'bg-emerald-800 text-white cursor-default' 
                      : 'bg-[#1D1D1B] hover:bg-[#333333] text-[#F9F7F2]'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>مُرحّل لدفتر الأستاذ ✓</span>
                    </>
                  ) : (
                    <>
                      <Scale className="w-4 h-4 text-[#C4A484]" />
                      <span>ترحيل القيد لدفتر الأستاذ وميزان المراجعة</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Omission Impact Analysis & JRE Prompt (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Omission Impact Card */}
          {showOmissionBreakdown && (
            <div className="bg-[#FFFFFF] border-2 border-[#8A1F1D] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#8A1F1D]/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#8A1F1D]" />
                  <h3 className="font-extrabold text-sm text-[#1D1D1B]">
                    كاشف الأثر المالي لنسيان أو إهمال القيد
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-[#8A1F1D] text-white px-2 py-0.5">
                  Impact of Omission
                </span>
              </div>

              <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
                إذا أهمل المحاسب إعداد قيد التسوية هذا في 12/31، كيف ستتأثر أرقام القوائم المالية المعلنة؟
              </p>

              <div className="space-y-3">
                {/* 1. Net Income Impact */}
                <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1D1D1B]">أثر صافي الربح (Net Income):</span>
                    {scenario.omissionImpact.netIncomeEffect === 'OVERSTATED' ? (
                      <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>مضخم بـ +{scenario.omissionImpact.netIncomeAmount.toLocaleString()} ج (وهمي)</span>
                      </span>
                    ) : scenario.omissionImpact.netIncomeEffect === 'UNDERSTATED' ? (
                      <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>مخفض بـ -{scenario.omissionImpact.netIncomeAmount.toLocaleString()} ج (مغبون)</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-zinc-600">لا يتأثر</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#1D1D1B]/75 leading-relaxed">
                    {scenario.omissionImpact.netIncomeExplanation}
                  </p>
                </div>

                {/* 2. Assets Impact */}
                <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1D1D1B]">أثر إجمالي الأصول (Assets):</span>
                    {scenario.omissionImpact.assetsEffect === 'OVERSTATED' ? (
                      <span className="text-xs font-bold text-rose-800">مضخمة بـ +{scenario.omissionImpact.assetsAmount.toLocaleString()} ج</span>
                    ) : scenario.omissionImpact.assetsEffect === 'UNDERSTATED' ? (
                      <span className="text-xs font-bold text-amber-800">مخفضة بـ -{scenario.omissionImpact.assetsAmount.toLocaleString()} ج</span>
                    ) : (
                      <span className="text-xs font-bold text-zinc-600">لا تتأثر</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#1D1D1B]/75 leading-relaxed">
                    {scenario.omissionImpact.assetsExplanation}
                  </p>
                </div>

                {/* 3. Liabilities Impact */}
                <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1D1D1B]">أثر الالتزامات (Liabilities):</span>
                    {scenario.omissionImpact.liabilitiesEffect === 'OVERSTATED' ? (
                      <span className="text-xs font-bold text-rose-800">مضخمة بـ +{scenario.omissionImpact.liabilitiesAmount.toLocaleString()} ج</span>
                    ) : scenario.omissionImpact.liabilitiesEffect === 'UNDERSTATED' ? (
                      <span className="text-xs font-bold text-rose-800">مخفضة بـ -{scenario.omissionImpact.liabilitiesAmount.toLocaleString()} ج (إخفاء ديون)</span>
                    ) : (
                      <span className="text-xs font-bold text-zinc-600">لا تتأثر</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#1D1D1B]/75 leading-relaxed">
                    {scenario.omissionImpact.liabilitiesExplanation}
                  </p>
                </div>

                {/* 4. Equity Impact */}
                <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1D1D1B]">أثر حقوق الملكية (Equity):</span>
                    <span className="text-xs font-bold text-[#1D1D1B] font-mono">
                      {scenario.omissionImpact.equityEffect === 'OVERSTATED' ? 'تضخم مساوٍ لصافي الربح' : scenario.omissionImpact.equityEffect === 'UNDERSTATED' ? 'انخفاض مساوٍ لصافي الربح' : 'ثابت'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#1D1D1B]/60">
                    نظراً لأن صافي ربح العام يُقفل تلقائياً في حساب الأرباح المرحلة / جاري المالك بحقوق الملكية.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* JRE Justification Prompt Card */}
          <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8A1F1D]" />
                <h3 className="font-extrabold text-sm text-[#1D1D1B]">
                  سؤال التبرير المحاسبي الرسمي (JRE)
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-[#1B4D2E] text-white px-2 py-0.5">
                وزاري • 20 درجة
              </span>
            </div>

            <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-2">
              <p className="text-xs font-bold text-[#1D1D1B] leading-relaxed">
                {scenario.jreQuestion}
              </p>
              <div className="pt-2 border-t border-[#1D1D1B]/10 text-[11px] text-[#1D1D1B]/80 leading-relaxed">
                <strong className="text-[#8A1F1D] block mb-1">النموذج الإرشادي للتبرير (Evidence & Rationale):</strong>
                {scenario.jreModelAnswer}
              </div>
            </div>

            {onNavigateToJRE && (
              <button
                type="button"
                onClick={() => onNavigateToJRE(scenario.jreQuestion)}
                className="w-full py-2 bg-[#8A1F1D] hover:bg-[#701917] text-[#F9F7F2] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>الانتقال لورشة كتابة مقال التفسير JRE لهذه الحالة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
