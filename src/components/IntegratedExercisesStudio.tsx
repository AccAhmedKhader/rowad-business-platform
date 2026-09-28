import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, BookOpen, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight,
  Sparkles, RefreshCw, Calculator, PenTool, Scale, FileText, Check, X,
  HelpCircle, Eye, EyeOff, Award, Clock, Layers, ShieldCheck, ChevronDown,
  ChevronUp, ExternalLink, Filter, Workflow as WorkflowIcon
} from 'lucide-react';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';

export interface ExerciseStep {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  hint: string;
  standardReference: string; // Egyptian Accounting Standard or Ministerial Guideline
  type: 'journal_entry' | 'numeric_calculation' | 'account_classification' | 'multiple_choice';
  // Expected answers
  expectedDebitAccount?: string;
  expectedCreditAccount?: string;
  expectedAmount?: number;
  expectedNumericValue?: number;
  expectedOptionIndex?: number;
  options?: string[];
  explanation: string;
  points: number;
}

export interface AppliedCaseStudy {
  id: string;
  unitId: string;
  unitTitle: string;
  title: string;
  organizationName: string;
  activityType: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم / شامل';
  estimatedMinutes: number;
  caseDescription: string;
  sourceDocuments: Array<{
    id: string;
    title: string;
    docNumber: string;
    date: string;
    details: string;
    amount: number;
  }>;
  openingBalances?: Array<{
    accountName: string;
    amount: number;
    type: 'debit' | 'credit';
  }>;
  steps: ExerciseStep[];
  jrePrompt: string;
}

export const APPLIED_CASE_STUDIES: AppliedCaseStudy[] = [
  {
    id: 'case-u1-u2-fayrouz',
    unitId: 'unit-2',
    unitTitle: 'الوحدتان 1 و 2: الدورة المستندية والقيد المزدوج ومعادلة المركز المالي',
    title: 'تأسيس وبدء النشاط التجاري لمنشأة الفيروز للتوزيع',
    organizationName: 'منشأة الفيروز للتجارة والتوزيع',
    activityType: 'تجارة تجزئة وجملة للمنتجات الغذائية',
    difficulty: 'مبتدئ',
    estimatedMinutes: 20,
    caseDescription: 'بدأ التاجر أحمد الفيروز نشاطه التجاري في أول يناير 2026 برأس مال نقدي أودعه في البنك، ثم قام بشراء تجهيزات وأثاث بشيك، وشراء بضاعة على الحساب من شركة النور، ثم حقق مبيعات نقدية وبالآجل وسدد جزءاً من الديون المستحقة.',
    sourceDocuments: [
      {
        id: 'doc-1',
        title: 'إشعار توريد وإيداع بنكي رقم 1042',
        docNumber: 'إيداع بنك 1042',
        date: '2026/01/01',
        details: 'إيداع رأس المال المبدئي في الحساب الجاري للمنشأة لدى البنك الأهلي المصري',
        amount: 250000
      },
      {
        id: 'doc-2',
        title: 'فاتورة شراء أثاث وتجهيزات مكتبية رقم 550',
        docNumber: 'فاتورة أثاث 550',
        date: '2026/01/05',
        details: 'شراء مكاتب وأجهزة كمبيوتر للمعرض وسداد القيمة بشيك بنكي رقم 701',
        amount: 35000
      },
      {
        id: 'doc-3',
        title: 'فاتورة شراء بضاعة بالآجل رقم 8821',
        docNumber: 'فاتورة شراء 8821',
        date: '2026/01/10',
        details: 'شراء بضاعة على الحساب من شركة النور للتوريدات بشروط دفع 30 يوماً',
        amount: 60000
      },
      {
        id: 'doc-4',
        title: 'فاتورة بيع بضاعة نقدية رقم 101',
        docNumber: 'فاتورة بيع 101',
        date: '2026/01/15',
        details: 'بيع بضاعة نقدية وتسليم القيمة فوراً إلى خزينة المنشأة',
        amount: 45000
      }
    ],
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'إثبات قيد إيداع رأس المال في البنك',
        instruction: 'سجل قيد اليومية اللازم لإثبات استثمار المالك بمبلغ 250,000 ج.م في الحساب البنكي للمنشأة بتاريخ 2026/01/01.',
        hint: 'البنك أصل زاد فهو مدين، ورأس المال حق ملكية زاد فهو دائن.',
        standardReference: 'معيار المحاسبة المصري رقم (1): الشخصية المعنوية المستقلة للمنشأة وإثبات رأس المال.',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب البنك (Bank)',
        expectedCreditAccount: 'حساب رأس المال (Capital)',
        expectedAmount: 250000,
        explanation: 'الطرف المدين: حساب البنك (أصل زاد بمبلغ 250,000 ج)، والطرف الدائن: حساب رأس المال (حقوق ملكية زادت بنفس المبلغ، فتحقق التوازن).',
        points: 15
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'إثبات شراء أثاث وتجهيزات بشيك بنكي',
        instruction: 'سجل قيد شراء أثاث وتجهيزات بمبلغ 35,000 ج.م بشيك مصرفي مسحوب على البنك بتاريخ 2026/01/05.',
        hint: 'الأثاث أصل ثابت زاد (مدين)، والبنك أصل متداول نقص (دائن) - تغيير نوعي في الأصول دون تغير إجمالي الميزانية.',
        standardReference: 'معيار المحاسبة المصري رقم (10): الأصول الثابتة وإهلاكها (التكلفة التاريخية).',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب الأثاث والتجهيزات (Furniture)',
        expectedCreditAccount: 'حساب البنك (Bank)',
        expectedAmount: 35000,
        explanation: 'الطرف المدين: حساب الأثاث (أصل زاد بـ 35,000 ج)، والطرف الدائن: حساب البنك (أصل نقص بـ 35,000 ج). العملية تمثل تغييراً نوعياً في تركيبة الأصول دون المساس بإجمالي المركز المالي.',
        points: 15
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'إثبات شراء بضاعة بالآجل من شركة النور',
        instruction: 'سجل قيد شراء بضاعة على الحساب بمبلغ 60,000 ج.م من المورد شركة النور بتاريخ 2026/01/10 وفق نظام الجرد الدوري.',
        hint: 'المشتريات تكلفة تشغيلية مدينة، والموردون التزام زاد فهو دائن.',
        standardReference: 'معيار المحاسبة المصري رقم (2): المخزون والمعالجة بنظام الجرد الدوري.',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب المشتريات (Purchases)',
        expectedCreditAccount: 'حساب الموردين / الدائنون (شركة النور)',
        expectedAmount: 60000,
        explanation: 'الطرف المدين: حساب المشتريات (حساب مدين بطبيعته يمثل كلفة البضاعة المشتراة)، والطرف الدائن: حساب الموردين (التزام تداول زاد على المنشأة بـ 60,000 ج).',
        points: 15
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'حساب رصيد حساب البنك التراكمي',
        instruction: 'بعد إجراء العمليات السابقة (إيداع 250,000 ج وسداد شيك أثاث 35,000 ج)، احسب رصيد حساب البنك الدفتري بالجنيه المصري.',
        hint: 'رصيد البنك = حركات الجانب المدين (المقبوضات) − حركات الجانب الدائن (المدفوعات).',
        standardReference: 'أصول إعداد دفتر الأستاذ العام وترصيد حسابات الأصول.',
        type: 'numeric_calculation',
        expectedNumericValue: 215000,
        explanation: 'رصيد البنك = 250,000 ج (إيداع مدين) − 35,000 ج (سداد دائن) = 215,000 ج.م رصيد مدين مرحل.',
        points: 15
      }
    ],
    jrePrompt: 'ناقش أثر المعاملات الأربعة أعلاه على معادلة المركز المالي لمنشأة الفيروز، مبيناً لماذا لا يؤدي شراء الأثاث نقداً إلى تغيير في صافي حقوق الملكية، مدعماً رأيك بالمعايير الرقابية المحاسبية المعتمدة.'
  },
  {
    id: 'case-u4-nasr-suspense',
    unitId: 'unit-4',
    unitTitle: 'الوحدة 4: ميزان المراجعة وكشف وتصحيح الأخطاء والحساب المعلق',
    title: 'كشف وتصحيح أخطاء ميزان المراجعة وإقفال الحساب المعلق - محلات النصر',
    organizationName: 'محلات النصر التجارية للأدوات الكهربائية',
    activityType: 'تجارة توريدات وتجهيزات كهربائية',
    difficulty: 'متوسط',
    estimatedMinutes: 25,
    caseDescription: 'عند إعداد ميزان المراجعة بالأرصدة في 2026/12/31 تبين أن مجموع الأرصدة المدينة بلغ 432,000 ج.م بينما مجموع الأرصدة الدائنة بلغ 420,000 ج.م بفرق قدره 12,000 ج.م. تم فتح حساب معلق بمقدار الفرق لحين الفحص. وبالتدقيق في السجلات تم اكتشاف ثلاثة أخطاء محاسبية جوهرية.',
    sourceDocuments: [
      {
        id: 'doc-tb',
        title: 'كشف ميزان المراجعة الأولي غير المتوازن',
        docNumber: 'ميزان مراجعة 31-12',
        date: '2026/12/31',
        details: 'الجانب المدين: 432,000 ج | الجانب الدائن: 420,000 ج | الفرق: 12,000 ج عجز في الدائن.',
        amount: 12000
      },
      {
        id: 'doc-err1',
        title: 'مذكرة تدقيق الخطأ الأول (ترحيل عكسي)',
        docNumber: 'تقرير فحص أ-1',
        date: '2026/12/31',
        details: 'فاتورة شراء أثاث بمبلغ 6,000 ج سُجلت صحيحة باليومية ولكن عند الترحيل لدفتر الأستاذ رُحلت في الجانب الدائن لحساب الأثاث بدلاً من الجانب المدين.',
        amount: 6000
      },
      {
        id: 'doc-err2',
        title: 'مذكرة تدقيق الخطأ الثاني (إغفال ترحيل)',
        docNumber: 'تقرير فحص أ-2',
        date: '2026/12/31',
        details: 'عملية بيع نقدي بمبلغ 3,000 ج رُحلت لحساب الصندوق ولم تُرحل إطلاقاً لحساب المبيعات في دفتر الأستاذ.',
        amount: 3000
      },
      {
        id: 'doc-err3',
        title: 'مذكرة تدقيق الخطأ الثالث (خطأ في الرقم المسجل)',
        docNumber: 'تقرير فحص أ-3',
        date: '2026/12/31',
        details: 'سداد مصروف صيانة بمبلغ 3,500 ج نقداً رُحل لحساب مصروف الصيانة بمبلغ 500 ج فقط.',
        amount: 3000
      }
    ],
    steps: [
      {
        id: 'step-n1',
        stepNumber: 1,
        title: 'تحديد طبيعة رصيد الحساب المعلق الافتتاحي',
        instruction: 'نظراً لأن الجانب الدائن في ميزان المراجعة كان أقل من الجانب المدين بمقدار 12,000 ج.م، فما هي الطبيعة المحاسبية لمبلغ الـ 12,000 ج.م عند إدراجه في الحساب المعلق بميزان المراجعة المبدئي؟',
        hint: 'الحساب المعلق يوضع في الجانب الأقل ليتحقق التوازن الحسابي المؤقت.',
        standardReference: 'أصول إعداد ميزان المراجعة ومعالجة الفروق غير المكتشفة في الحساب المعلق (Suspense Account).',
        type: 'multiple_choice',
        options: [
          'رصيد دائن مؤقت بمبلغ 12,000 ج.م لتعويض النقص في الجانب الدائن',
          'رصيد مدين مؤقت بمبلغ 12,000 ج.م لتعويض النقص في الجانب المدين',
          'يُطرح من رأس المال مباشرة ولا يفتح حساب معلق',
          'يُقفل فوراً في حساب الأرباح والخسائر'
        ],
        expectedOptionIndex: 0,
        explanation: 'الحساب المعلق يوضع دائماً في الجانب الذي يعاني من العجز لتسوية الميزان مؤقتاً، وبما أن الجانب الدائن كان أقل بـ 12,000 ج، فإن رصيد الحساب المعلق دائن بـ 12,000 ج.م.',
        points: 10
      },
      {
        id: 'step-n2',
        stepNumber: 2,
        title: 'قيد تصحيح ترحيل الأثاث في الجانب الخطأ (الخطأ الأول)',
        instruction: 'عند ترحيل 6,000 ج للجانب الدائن للأثاث خطأً، كم يبلغ المبلغ اللازم لجعل حساب الأثاث مديناً به لتصحيح الخطأ وإلغاء أثره على الحساب المعلق؟',
        hint: 'تصحيح الترحيل في الجانب العكسي يتطلب مضاعفة المبلغ (6000 لإلغاء الدائن + 6000 لإثبات المدين = 12000 ج).',
        standardReference: 'قاعدة الفرق الزوجي في ميزان المراجعة وتصحيح أخطاء دفتر الأستاذ.',
        type: 'numeric_calculation',
        expectedNumericValue: 12000,
        explanation: 'خطأ الترحيل في الجانب العكسي يُحدث فرقاً يعادل ضعف المبلغ (6,000 × 2 = 12,000 ج.م)، ولذلك يُجعل حساب الأثاث مديناً بمبلغ 12,000 ج مقابل الحساب المعلق.',
        points: 20
      },
      {
        id: 'step-n3',
        stepNumber: 3,
        title: 'قيد تصحيح إغفال ترحيل المبيعات (الخطأ الثاني)',
        instruction: 'سجل قيد التصحيح لإثبات ترحيل المبيعات المغفلة بمبلغ 3,000 ج.م إلى دفتر الأستاذ بواسطة الحساب المعلق.',
        hint: 'المبيعات بطبيعتها دائنة وقد أُغفلت، لذا يجب جعلها دائنة بمبلغ 3000 ج والطرف المدين هو الحساب المعلق.',
        standardReference: 'معالجة السهو والإغفال الجزئي لأحد طرفي القيد.',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب معلق (Suspense Account)',
        expectedCreditAccount: 'حساب المبيعات (Sales)',
        expectedAmount: 3000,
        explanation: 'قيد التصحيح: من حـ/ المعلق (3,000 ج) إلى حـ/ المبيعات (3,000 ج). يثبت المبيعات كإيراد مستحق دائن ويخفض الحساب المعلق بمقدار 3,000 ج.',
        points: 20
      },
      {
        id: 'step-n4',
        stepNumber: 4,
        title: 'التحقق من تصفير الحساب المعلق',
        instruction: 'بعد معالجة وتصحيح الأخطاء الثلاثة بالكامل، كم يجب أن يبلغ الرصيد النهائي للحساب المعلق (Suspense Account) في نهاية السنة؟',
        hint: 'الهدف الجوهري من تصحيح الأخطاء هو أن يصبح رصيد الحساب المعلق مساوياً للصفر.',
        standardReference: 'قواعد إقفال الحسابات الانتقالية والمؤقتة بنهاية الفترة المالية.',
        type: 'numeric_calculation',
        expectedNumericValue: 0,
        explanation: 'يجب أن يصبح رصيد الحساب المعلق 0 ج.م تماماً بعد استيفاء جميع الأخطاء واكتشافها وتصحيحها في الدفاتر.',
        points: 15
      }
    ],
    jrePrompt: 'اكتب مقال تفسير محاسبي احترافي (JRE) تحلل فيه أثر فتح الحساب المعلق وتصحيح الأخطاء على مصداقية القوائم المالية لمؤسسة النصر، موضحاً لماذا يعتبر الترحيل العكسي خطراً رقابياً جسيماً يضلل متخذ القرار.'
  },
  {
    id: 'case-u5-farida-adjustments',
    unitId: 'unit-5',
    unitTitle: 'الوحدة 5: التسويات الجردية الأربعة والقوائم المالية الختامية',
    title: 'التسويات الجردية الشاملة وتحديد الأرباح - منشأة فريدة للملابس',
    organizationName: 'منشأة فريدة للملابس والمنسوجات الجاهزة',
    activityType: 'تصنيع وتوزيع الملبوسات الجاهزة',
    difficulty: 'متقدم / شامل',
    estimatedMinutes: 30,
    caseDescription: 'ظهرت أرصدة منشأة فريدة في 2026/12/31 قبل التسويات: إيجار مدفوع 18,000 ج، رواتب مسددة 36,000 ج، إيرادات استشارات وتصميم محصلة 50,000 ج، إيراد عقار مؤجر للغير محصل 30,000 ج، مبيعات 280,000 ج، مشتريات 140,000 ج، مخزون أول المدة 30,000 ج. وعند الجرد الفعلي تبين: 1) الإيجار السنوي الفعلي 12,000 ج، 2) الرواتب الشهرية 3,500 ج، 3) إيراد الاستشارات المكتسب حتى نهاية السنة 60,000 ج، 4) إيراد العقار يخص 15 شهراً، 5) قُدّرت بضاعة آخر المدة بمبلغ 45,000 ج تكلفة وبمبلغ 40,000 ج سعر سوق.',
    sourceDocuments: [
      {
        id: 'doc-u5-rent',
        title: 'عقد إيجار المقر السنوي',
        docNumber: 'عقد إيجار 2026',
        date: '2026/01/01',
        details: 'الإيجار السنوي المتفق عليه يبلغ 12,000 ج.م، في حين أن المسدد بالدفاتر 18,000 ج.م.',
        amount: 18000
      },
      {
        id: 'doc-u5-salaries',
        title: 'كشف رواتب العاملين لشهر ديسمبر',
        docNumber: 'كشف أجور 12-2026',
        date: '2026/12/31',
        details: 'الرواتب الشهرية للموظفين 3,500 ج (السنوي المستحق = 3,500 × 12 = 42,000 ج)، والمسدد نقداً 36,000 ج.',
        amount: 36000
      },
      {
        id: 'doc-u5-inv',
        title: 'محضر جرد المخزون السلعي الفعلي في 31 ديسمبر',
        docNumber: 'محضر جرد 2026/99',
        date: '2026/12/31',
        details: 'البضاعة المتبقية بالمخازن: سعر التكلفة 45,000 ج، سعر السوق وصافي القيمة الاستردادية 40,000 ج.',
        amount: 40000
      }
    ],
    steps: [
      {
        id: 'step-f1',
        stepNumber: 1,
        title: 'تسوية مصروف الإيجار المدفوع مقدماً',
        instruction: 'المسدد كإيجار 18,000 ج.م بينما الإيجار السنوي الفعلي 12,000 ج.م. احسب قيمة الإيجار المدفوع مقدماً الذي يخص العام القادم وسجل قيد التسوية الجردية.',
        hint: 'الإيجار المقدم = 18,000 − 12,000 = 6,000 ج.م. يثبت كأصل متداول مدين (أرصدة مدينة أخرى) ويخفض به مصروف الإيجار الدائن.',
        standardReference: 'معيار المحاسبة المصري رقم (1): مبدأ الاستحقاق والمقابلة بين الإيرادات والمصروفات.',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب مصروف إيجار مقدم (Prepaid Rent)',
        expectedCreditAccount: 'حساب مصروف إيجار المعرض (Rent)',
        expectedAmount: 6000,
        explanation: 'قيد التسوية: من حـ/ مصروف إيجار مقدم (6,000 ج) إلى حـ/ مصروف الإيجار (6,000 ج). يُظهر الأصل المتداول بالميزانية ويحمل قائمة الدخل بالتكلفة الحقيقية 12,000 ج.',
        points: 20
      },
      {
        id: 'step-f2',
        stepNumber: 2,
        title: 'تسوية الأجور والرواتب المستحقة',
        instruction: 'الرواتب السنوية المستحقة 42,000 ج.م (3,500 × 12) والمسدد منها فقط 36,000 ج.م. احسب الرواتب المستحقة وسجل قيد التسوية الجردية.',
        hint: 'الرواتب المستحقة = 42,000 − 36,000 = 6,000 ج.م. تثبت كالتزام متداول دائن مقابل زيادة مصروف الرواتب المدين.',
        standardReference: 'أساس الاستحقاق المحاسبي وإثبات الالتزامات قصيرة الأجل.',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب مصروف الرواتب والأجور (Salaries)',
        expectedCreditAccount: 'حساب أجور ورواتب مستحقة (Accrued Salaries)',
        expectedAmount: 6000,
        explanation: 'قيد التسوية: من حـ/ مصروف الرواتب (6,000 ج) إلى حـ/ رواتب مستحقة (6,000 ج). يحقق مبدأ الاستحقاق بإثبات التزام تداول قدره 6,000 ج بالميزانية.',
        points: 20
      },
      {
        id: 'step-f3',
        stepNumber: 3,
        title: 'تحديد قيمة بضاعة آخر المدة المعتمدة في القوائم',
        instruction: 'طبقاً لمعيار المحاسبة المصري رقم (2) ومبدأ الحيطة والحذر، ما هي القيمة التي يُقوّم بها مخزون آخر المدة بالقوائم المالية إذا كانت التكلفة 45,000 ج.م وسعر السوق 40,000 ج.م؟',
        hint: 'يُقوّم المخزون بالتكلفة أو صافي القيمة البيعية (سعر السوق) أيهما أقل.',
        standardReference: 'معيار المحاسبة المصري رقم (2): تقييم المخزون بالتكلفة أو صافي القيمة القابلة للتحقق أيهما أقل (Lower of Cost or Net Realizable Value).',
        type: 'numeric_calculation',
        expectedNumericValue: 40000,
        explanation: 'القيمة المعتمدة هي 40,000 ج.م لأنها السعر الأقل بين التكلفة وسعر السوق، تحسباً لأي خسائر محتملة تطبيقاً لمبدأ الحيطة والحذر.',
        points: 15
      },
      {
        id: 'step-f4',
        stepNumber: 4,
        title: 'حساب تكلفة البضاعة المباعة (COGS)',
        instruction: 'احسب تكلفة البضاعة المباعة لمنشأة فريدة، علماً بأن: مخزون أول المدة 30,000 ج، المشتريات 140,000 ج، وبضاعة آخر المدة المعتمدة 40,000 ج.',
        hint: 'تكلفة البضاعة المباعة = مخزون أول المدة + صافي المشتريات − مخزون آخر المدة.',
        standardReference: 'معادلة تكلفة المبيعات في حساب المتاجرة وقائمة الدخل وفق المعايير المصرية.',
        type: 'numeric_calculation',
        expectedNumericValue: 130000,
        explanation: 'تكلفة المبيعات = 30,000 + 140,000 − 40,000 = 130,000 ج.م.',
        points: 15
      }
    ],
    jrePrompt: 'حلل الأثر المالي والقانوني لإغفال إجراء تسوية الإيجار المقدم والرواتب المستحقة، مبيناً كيف يؤدي إغفال التسوية إلى تشويه صافي الربح وتضليل الإدارة ومصلحة الضرائب.'
  },
  {
    id: 'case-u6-bank-reconciliation',
    unitId: 'unit-6',
    unitTitle: 'الوحدة 6: الرقابة النقدية، مذكرة تسوية البنك والسجلات غير المكتملة',
    title: 'إعداد مذكرة تسوية البنك وتصحيح دفتر النقدية - منشأة كريم',
    organizationName: 'مؤسسة كريم للاستيراد والتصدير',
    activityType: 'تجارة توريدات عامة واستيراد',
    difficulty: 'متوسط',
    estimatedMinutes: 25,
    caseDescription: 'في 2026/12/31 بلغ رصيد حساب البنك بدفتر النقدية لدى المنشأة 45,000 ج.م، في حين أظهر كشف الحساب الوارد من البنك رصيداً دائناً قدره 52,200 ج.م. وعند المقارنة تبين: 1) شيكات أصدرتها المنشأة لموردين بمبلغ 14,000 ج.م لم يتقدم أصحابها لصرفها، 2) إيداعات أرسلتها المنشأة في 12/30 بمبلغ 8,000 ج.م أضيفت في يناير، 3) خصم البنك مصروفات مصرفية 700 ج لم تسجل بالدفاتر، 4) حصل البنك كمبيالة لصالح المنشأة بمبلغ 1,900 ج لم تسجل بالدفاتر.',
    sourceDocuments: [
      {
        id: 'doc-bank-cash',
        title: 'رصيد حـ/ البنك بدفتر النقدية للمنشأة',
        docNumber: 'دفتر نقدية 12/2026',
        date: '2026/12/31',
        details: 'الرصيد الدفتري المسجل قبل التعديل = 45,000 ج.م مدين.',
        amount: 45000
      },
      {
        id: 'doc-bank-stmt',
        title: 'كشف حساب البنك الأهلي المصري',
        docNumber: 'كشف بنك 99201',
        date: '2026/12/31',
        details: 'رصيد كشف الحساب البنكي = 52,200 ج.م دائن لصالح العميل.',
        amount: 52200
      }
    ],
    steps: [
      {
        id: 'step-b1',
        stepNumber: 1,
        title: 'حساب رصيد البنك المعدل بالدفاتر',
        instruction: 'احسب رصيد دفتر النقدية بعد تعديله بالمعاملات التي أثبتها البنك ولم تثبتها المنشأة (إضافة الكمبيالة المحصلة 1,900 ج وخصم المصروفات البنكية 700 ج).',
        hint: 'الرصيد المعدل = 45,000 + 1,900 (كمبيالة محصلة) − 700 (مصاريف بنكية).',
        standardReference: 'إجراءات الرقابة الداخلية على النقدية والمطابقة الدورية.',
        type: 'numeric_calculation',
        expectedNumericValue: 46200,
        explanation: 'رصيد دفتر النقدية المعدل = 45,000 + 1,900 − 700 = 46,200 ج.م وهو الرصيد الصحيح الفعلي.',
        points: 20
      },
      {
        id: 'step-b2',
        stepNumber: 2,
        title: 'مطابقة مذكرة تسوية البنك مع كشف الحساب',
        instruction: 'من واقع رصيد كشف البنك (52,200 ج): أضف الإيداعات بالطريق (8,000 ج) واطرح الشيكات التي لم تصرف (14,000 ج). احسب رصيد كشف البنك المعدل.',
        hint: 'رصيد كشف البنك المعدل = 52,200 + 8,000 (إيداعات بالطريق) − 14,000 (شيكات لم تقدم للصرف).',
        standardReference: 'إعداد مذكرة تسوية البنك (Bank Reconciliation Statement).',
        type: 'numeric_calculation',
        expectedNumericValue: 46200,
        explanation: 'رصيد كشف البنك المعدل = 52,200 + 8,000 − 14,000 = 46,200 ج.م، وبذلك يتطابق مع رصيد دفتر النقدية المعدل بنسبة 100%.',
        points: 20
      },
      {
        id: 'step-b3',
        stepNumber: 3,
        title: 'قيد إثبات تحصيل الكمبيالة بالبنك في دفاتر المنشأة',
        instruction: 'سجل قيد اليومية لإثبات قيام البنك بتحصيل كمبيالة (أوراق قبض) لصالح المنشأة بمبلغ 1,900 ج.م وإضافتها للحساب الجاري.',
        hint: 'البنك زاد فهو مدين، وأوراق القبض أصل نقص فهو دائن.',
        standardReference: 'معالجة تحصيل وإيداع الأوراق التجارية في الحسابات البنكية.',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب البنك (Bank)',
        expectedCreditAccount: 'حساب أوراق القبض (Notes Receivable)',
        expectedAmount: 1900,
        explanation: 'من حـ/ البنك (1,900 ج) إلى حـ/ أوراق القبض (1,900 ج). يثبت دخول السيولة في البنك وإلغاء ورقة القبض المحصلة.',
        points: 20
      }
    ],
    jrePrompt: 'وضح في تقرير رقابي مهني موجه للإدارة المالية كيف تعمل مذكرة تسوية البنك كأداة رقابية حاسمة لمنع الاختلاس والتلاعب النقدي وحماية أصول المنشأة السائلة.'
  },
  {
    id: 'case-u1-nile-documentary-cycle',
    unitId: 'unit-1',
    unitTitle: 'الوحدة 1: الإطار العام للمحاسبة والدورة المستندية ومصادر القيد',
    title: 'فحص المستندات الثبوتية والرقابة المستندية - شركة النيل للتوريدات',
    organizationName: 'شركة النيل للتجارة والتوريدات الحديثة',
    activityType: 'تجارة توريدات عامة وتوزيع تجزئة',
    difficulty: 'مبتدئ',
    estimatedMinutes: 15,
    caseDescription: 'قامت شركة النيل بتنفيذ حزمة عمليات خلال الأسبوع الأول من بدء النشاط: استلام نقدية من عميل بموجب إيصال استلام، شراء مهمات مكتبية بموجب فاتورة معتمدة، وسداد مصروف صيانة بموجب إذن صرف نقدية. المطلوب فحص المستندات وتحديد التوجيه المحاسبي الصحيح.',
    sourceDocuments: [
      {
        id: 'doc-u1-receipt',
        title: 'إيصال استلام نقدية رقم 201',
        docNumber: 'إيصال نقدية 201',
        date: '2026/01/02',
        details: 'استلام دفعة نقدية من العميل شركة الأمل لحسابه الجاري بمبلغ 15,000 ج.م.',
        amount: 15000
      },
      {
        id: 'doc-u1-inv',
        title: 'فاتورة شراء مهمات وأدوات كتابية رقم 881',
        docNumber: 'فاتورة مهمات 881',
        date: '2026/01/04',
        details: 'شراء أدوات ومطبوعات مكتبية نقداً بمبلغ 4,500 ج.م بموجب إذن صرف خزينة معتمد.',
        amount: 4500
      }
    ],
    steps: [
      {
        id: 'step-u1-1',
        stepNumber: 1,
        title: 'تحديد المستند المؤيد للتحصيل النقدي',
        instruction: 'ما هو المستند المحاسبي الأصلي الواجب استخدامه كأصل ثبوتي لإثبات دخول النقدية إلى الخزينة في دفتر اليومية؟',
        hint: 'المستند الثبوتي لتحصيل النقدية هو إيصال استلام النقدية موقعاً ومعتمداً.',
        standardReference: 'الدورة المستندية وقواعد الرقابة الداخلية على المقبوضات النقدية.',
        type: 'multiple_choice',
        options: [
          'إيصال استلام نقدية معتمد وموقع من أمين الخزينة',
          'أمر شراء داخلي صادر من قسم المشتريات',
          'محضر جرد المخزون الفعلي السنوي',
          'كشف حساب بنكي مرسل بنهاية الشهر'
        ],
        expectedOptionIndex: 0,
        explanation: 'إيصال استلام النقدية (Cash Receipt Voucher) هو السند الثبوتي الرسمي الدال على قبض النقدية في الخزينة.',
        points: 15
      },
      {
        id: 'step-u1-2',
        stepNumber: 2,
        title: 'قيد إثبات تحصيل 15,000 ج من العميل نقداً',
        instruction: 'سجل قيد اليومية لإثبات تحصيل مبلغ 15,000 ج.م نقداً من العميل شركة الأمل لحسابه بتاريخ 2026/01/02.',
        hint: 'الخزينة (الصندوق) أصل زاد فهو مدين، والعملاء أصل نقص فهو دائن.',
        standardReference: 'معيار المحاسبة المصري رقم (1): الاعتراف بالمعاملات النقدية وتوثيق الدورة المستندية.',
        type: 'journal_entry',
        expectedDebitAccount: 'حساب الصندوق / الخزينة (Cash)',
        expectedCreditAccount: 'حساب العملاء / المدينون (شركة الأمل)',
        expectedAmount: 15000,
        explanation: 'الطرف المدين: حساب الخزينة (زيادة نقدية 15,000 ج)، والطرف الدائن: حساب العملاء (تخفيض مستحقات المنشأة لدى العميل بنفس المبلغ).',
        points: 20
      }
    ],
    jrePrompt: 'ناقش في تقرير رقابي موجز أهمية الدورة المستندية ومبدأ الموضوعية والمستند المؤيد، مبيناً لماذا يحظر القانون المصري وقواعد الرقابة المالية تسجيل أي قيد بيومية المنشأة بدون مستند رسمي معتمد.'
  },
  {
    id: 'case-u3-al-amany-compound-entries',
    unitId: 'unit-3',
    unitTitle: 'الوحدة 3: التسجيل في دفتر اليومية والترحيل لدفتر الأستاذ والترصيد',
    title: 'قيود اليومية المركبة وترحيل الأستاذ - مؤسسة الأماني للتجهيزات',
    organizationName: 'مؤسسة الأماني للأثاث والتجهيزات الحديثة',
    activityType: 'تجارة تجهيزات مكتبية وأثاث',
    difficulty: 'متوسط',
    estimatedMinutes: 20,
    caseDescription: 'قامت مؤسسة الأماني ببيع بضاعة بمبلغ 70,000 ج.م بموجب فاتورة بيع، حصلت المنشأة 30,000 ج نقداً فوراً، وحررت كمبيالة (أوراق قبض) بالباقي 40,000 ج تستحق بعد 60 يوماً.',
    sourceDocuments: [
      {
        id: 'doc-u3-sale',
        title: 'فاتورة بيع بضاعة رقم 902',
        docNumber: 'فاتورة بيع 902',
        date: '2026/02/10',
        details: 'بيع بضاعة لإحدى الشركات بمبلغ 70,000 ج: تم قبض 30,000 ج نقداً وقبول كمبيالة بالباقي 40,000 ج.',
        amount: 70000
      }
    ],
    steps: [
      {
        id: 'step-u3-1',
        stepNumber: 1,
        title: 'حساب إجمالي الجانب المدين للقيد المركب',
        instruction: 'في القيد المركب لعملية البيع السابقة، كم يبلغ مجموع الأطراف المدينة المتمثلة في (النقدية المقبوضة + أوراق القبض) بالجنيه المصري؟',
        hint: 'الجانب المدين = 30,000 ج نقدية + 40,000 ج أوراق قبض = 70,000 ج.م.',
        standardReference: 'توازن القيد المحاسبي المركب وتطابق طرفيه وفق نظرية القيد المزدوج.',
        type: 'numeric_calculation',
        expectedNumericValue: 70000,
        explanation: 'إجمالي الجانب المدين = 30,000 (صندوق) + 40,000 (أوراق قبض) = 70,000 ج.م، وهو ما يعادل تماماً إجمالي المبيعات بالطرف الدائن.',
        points: 20
      },
      {
        id: 'step-u3-2',
        stepNumber: 2,
        title: 'إثبات قيد المبيعات الدائن',
        instruction: 'سجل الطرف الدائن لقيد عملية البيع بمبلغ 70,000 ج.م موضحاً الحساب المناسب وفق مبدأ تحقق الإيراد.',
        hint: 'المبيعات حساب إيراد بطبيعته دائن بمبلغ العملية الإجمالي.',
        standardReference: 'معيار المحاسبة المصري رقم (11): الإيراد والاعتراف بمبيعات البضائع.',
        type: 'journal_entry',
        expectedDebitAccount: 'من مذكورين (الصندوق وأوراق القبض)',
        expectedCreditAccount: 'حساب المبيعات (Sales)',
        expectedAmount: 70000,
        explanation: 'الطرف الدائن هو حساب المبيعات بمبلغ 70,000 ج.م، والطرف المدين يمثل حسابين أصول (نقدية 30,000 ج وأوراق قبض 40,000 ج).',
        points: 20
      }
    ],
    jrePrompt: 'حلل الأثر المالي لعمليات البيع الآجل المصحوبة بكمبيالات (أوراق قبض) على هيكل السيولة والمركز المالي للمنشأة، موضحاً الفرق بين المدينين العاديين وحملة الأوراق التجارية من حيث الأمان القانوني وسرعة التسييل.'
  },
  {
    id: 'case-u7-helal-financial-statements',
    unitId: 'unit-7',
    unitTitle: 'الوحدة 7: الحسابات والقوائم المالية الختامية للمنشآت التجارية',
    title: 'إعداد حساب المتاجرة وتحديد مجمل وصافي الربح - منشأة الهلال',
    organizationName: 'منشأة الهلال للمنتجات الاستهلاكية',
    activityType: 'تجارة تجزئة وجملة',
    difficulty: 'متقدم / شامل',
    estimatedMinutes: 25,
    caseDescription: 'في 2026/12/31 توفرت البيانات التالية لمنشأة الهلال: المبيعات 300,000 ج، مردودات المبيعات 10,000 ج، المشتريات 160,000 ج، مصروفات نقل مشتريات 5,000 ج، مخزون أول المدة 25,000 ج، مخزون آخر المدة 35,000 ج، ومصروفات عمومية 40,000 ج. المطلوب حساب مجمل الربح وصافي الربح.',
    sourceDocuments: [
      {
        id: 'doc-u7-trial',
        title: 'ميزان المراجعة بعد التسويات الجردية لمنشأة الهلال',
        docNumber: 'ميزان مراجعة ختامي 2026',
        date: '2026/12/31',
        details: 'صافي المبيعات 290,000 ج | تكلفة البضاعة المتاحة للبيع 190,000 ج | مخزون آخر المدة 35,000 ج.',
        amount: 290000
      }
    ],
    steps: [
      {
        id: 'step-u7-1',
        stepNumber: 1,
        title: 'حساب تكلفة البضاعة المباعة (COGS)',
        instruction: 'احسب تكلفة البضاعة المباعة: مخزون أول المدة (25,000) + صافي المشتريات ومصروفاتها (165,000) − مخزون آخر المدة (35,000).',
        hint: 'تكلفة المبيعات = 25,000 + 165,000 − 35,000 = 155,000 ج.م.',
        standardReference: 'أصول إعداد حساب المتاجرة وقائمة الدخل للمنشآت التجارية.',
        type: 'numeric_calculation',
        expectedNumericValue: 155000,
        explanation: 'تكلفة البضاعة المباعة = 25,000 + 165,000 − 35,000 = 155,000 ج.م.',
        points: 20
      },
      {
        id: 'step-u7-2',
        stepNumber: 2,
        title: 'حساب مجمل الربح (Gross Profit)',
        instruction: 'احسب مجمل الربح: صافي المبيعات (290,000 ج) − تكلفة البضاعة المباعة (155,000 ج).',
        hint: 'مجمل الربح = 290,000 − 155,000 = 135,000 ج.م.',
        standardReference: 'معيار المحاسبة المصري رقم (1): عرض القوائم المالية وحساب نتائج النشاط.',
        type: 'numeric_calculation',
        expectedNumericValue: 135000,
        explanation: 'مجمل الربح = 290,000 − 155,000 = 135,000 ج.م، وهو يمثل فائض النشاط التجاري قبل خصم المصروفات التشغيلية والعمومية.',
        points: 20
      },
      {
        id: 'step-u7-3',
        stepNumber: 3,
        title: 'حساب صافي الربح النهائي (Net Profit)',
        instruction: 'احسب صافي الربح النهائي بعد خصم المصروفات الإدارية والعمومية البالغة 40,000 ج.م من مجمل الربح (135,000 ج).',
        hint: 'صافي الربح = مجمل الربح 135,000 − المصروفات العمومية 40,000 = 95,000 ج.م.',
        standardReference: 'إعداد حساب الأرباح والخسائر وقائمة الدخل الرسمية.',
        type: 'numeric_calculation',
        expectedNumericValue: 95000,
        explanation: 'صافي الربح = 135,000 − 40,000 = 95,000 ج.م يُرحل إلى قائمة المركز المالي ليزيد حقوق الملكية (رأس المال).',
        points: 20
      }
    ],
    jrePrompt: 'اكتب تقريراً تحليلياً شاملاً لمالك المنشأة تفسر فيه كيفية انتقال نتيجة النشاط من حساب المتاجرة إلى حساب الأرباح والخسائر، ثم أثر صافي الربح النهائي على بند حقوق الملكية في قائمة المركز المالي.'
  }
];

export const IntegratedExercisesStudio: React.FC = () => {
  const navigate = useNavigate();

  // Curriculum Filter Context
  const {
    selectedUnitId: globalUnitId,
    selectedLessonId: globalLessonId,
    clearFilters: clearGlobalFilters,
    isSidebarCollapsed
  } = useCurriculumFilter();

  // Filter State
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Filter cases dynamically by global curriculum selection
  const filteredCases = useMemo(() => {
    return APPLIED_CASE_STUDIES.filter(caseStudy => {
      if (globalUnitId) {
        const matchesUnit = 
          caseStudy.unitId === globalUnitId ||
          (globalUnitId === 'unit-1' && (caseStudy.unitId === 'unit-1' || caseStudy.id.includes('u1'))) ||
          (globalUnitId === 'unit-2' && (caseStudy.unitId === 'unit-2' || caseStudy.id.includes('u2'))) ||
          (globalUnitId === 'unit-3' && (caseStudy.unitId === 'unit-3' || caseStudy.id.includes('u3'))) ||
          (globalUnitId === 'unit-4' && (caseStudy.unitId === 'unit-4' || caseStudy.id.includes('u4'))) ||
          (globalUnitId === 'unit-5' && (caseStudy.unitId === 'unit-5' || caseStudy.id.includes('u5'))) ||
          (globalUnitId === 'unit-6' && (caseStudy.unitId === 'unit-6' || caseStudy.id.includes('u6'))) ||
          (globalUnitId === 'unit-7' && (caseStudy.unitId === 'unit-7' || caseStudy.id.includes('u7')));

        if (!matchesUnit) return false;
      }
      if (difficultyFilter !== 'all' && caseStudy.difficulty !== difficultyFilter) {
        return false;
      }
      return true;
    });
  }, [globalUnitId, difficultyFilter]);

  // State
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    filteredCases[0]?.id || APPLIED_CASE_STUDIES[0].id
  );
  const [activeViewTab, setActiveViewTab] = useState<'case_info' | 'step_solver' | 'review_model'>('step_solver');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Auto-switch to first available case when filters change
  useEffect(() => {
    if (filteredCases.length > 0) {
      const isAvailable = filteredCases.some(c => c.id === selectedCaseId);
      if (!isAvailable) {
        setSelectedCaseId(filteredCases[0].id);
        setCurrentStepIndex(0);
      }
    }
  }, [filteredCases, selectedCaseId]);
  
  // User Input State for Current Step
  const [userDebitAccount, setUserDebitAccount] = useState<string>('');
  const [userCreditAccount, setUserCreditAccount] = useState<string>('');
  const [userAmount, setUserAmount] = useState<string>('');
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);

  // Verification & Feedback State
  const [stepFeedback, setStepFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message: string;
    pointsEarned: number;
  }>({ status: 'idle', message: '', pointsEarned: 0 });

  const [showHint, setShowHint] = useState<boolean>(false);
  const [showModelSolution, setShowModelSolution] = useState<boolean>(false);

  // Score Tracker
  const [scores, setScores] = useState<Record<string, number>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const activeCase = APPLIED_CASE_STUDIES.find(c => c.id === selectedCaseId) || APPLIED_CASE_STUDIES[0];
  const currentStep = activeCase.steps[currentStepIndex] || activeCase.steps[0];

  const totalPossiblePoints = activeCase.steps.reduce((sum, s) => sum + s.points, 0);
  const currentEarnedPoints = activeCase.steps.reduce((sum, s) => sum + (scores[`${activeCase.id}-${s.id}`] || 0), 0);
  const progressPercent = Math.round((Object.keys(completedSteps).filter(k => k.startsWith(activeCase.id)).length / activeCase.steps.length) * 100);

  // Reset step inputs when step changes
  const handleSelectStep = (index: number) => {
    setCurrentStepIndex(index);
    setUserDebitAccount('');
    setUserCreditAccount('');
    setUserAmount('');
    setUserNumericInput('');
    setUserSelectedOption(null);
    setStepFeedback({ status: 'idle', message: '', pointsEarned: 0 });
    setShowHint(false);
    setShowModelSolution(false);
  };

  // Switch Case
  const handleSwitchCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentStepIndex(0);
    setUserDebitAccount('');
    setUserCreditAccount('');
    setUserAmount('');
    setUserNumericInput('');
    setUserSelectedOption(null);
    setStepFeedback({ status: 'idle', message: '', pointsEarned: 0 });
    setShowHint(false);
    setShowModelSolution(false);
  };

  // Evaluate User Answer
  const handleVerifyAnswer = () => {
    const stepKey = `${activeCase.id}-${currentStep.id}`;

    if (currentStep.type === 'journal_entry') {
      const enteredAmount = parseFloat(userAmount.replace(/,/g, ''));
      const isDebitMatch = Boolean(
        userDebitAccount.trim() && 
        (userDebitAccount.includes(currentStep.expectedDebitAccount?.split(' ')[0] || '') ||
         currentStep.expectedDebitAccount?.includes(userDebitAccount.trim()) ||
         userDebitAccount.includes(currentStep.expectedDebitAccount?.split('/')[0].trim() || ''))
      );
      const isCreditMatch = Boolean(
        userCreditAccount.trim() && 
        (userCreditAccount.includes(currentStep.expectedCreditAccount?.split(' ')[0] || '') ||
         currentStep.expectedCreditAccount?.includes(userCreditAccount.trim()) ||
         userCreditAccount.includes(currentStep.expectedCreditAccount?.split('/')[0].trim() || ''))
      );
      const isAmountMatch = !isNaN(enteredAmount) && enteredAmount === currentStep.expectedAmount;

      if (isDebitMatch && isCreditMatch && isAmountMatch) {
        setStepFeedback({
          status: 'correct',
          message: `إجابة صحيحة ومكتملة تماماً! الطرف المدين والدائن والمبلغ مطابقون لمعايير المحاسبة المصرية (+${currentStep.points} نقطة).`,
          pointsEarned: currentStep.points
        });
        setScores(prev => ({ ...prev, [stepKey]: currentStep.points }));
        setCompletedSteps(prev => ({ ...prev, [stepKey]: true }));
      } else {
        let errorHint = 'راجع أطراف القيد: ';
        if (!isDebitMatch) errorHint += 'الطرف المدين غير دقيق. ';
        if (!isCreditMatch) errorHint += 'الطرف الدائن غير دقيق. ';
        if (!isAmountMatch) errorHint += `المبلغ المتوقع هو ${currentStep.expectedAmount?.toLocaleString()} ج.م. `;

        setStepFeedback({
          status: 'incorrect',
          message: errorHint,
          pointsEarned: 0
        });
      }
    } else if (currentStep.type === 'numeric_calculation') {
      const parsed = parseFloat(userNumericInput.replace(/,/g, ''));
      if (!isNaN(parsed) && Math.abs(parsed - (currentStep.expectedNumericValue || 0)) < 0.01) {
        setStepFeedback({
          status: 'correct',
          message: `حساب دقيق وصحيح 100%! الناتج ${parsed.toLocaleString()} ج.م مطابق للمعايير (+${currentStep.points} نقطة).`,
          pointsEarned: currentStep.points
        });
        setScores(prev => ({ ...prev, [stepKey]: currentStep.points }));
        setCompletedSteps(prev => ({ ...prev, [stepKey]: true }));
      } else {
        setStepFeedback({
          status: 'incorrect',
          message: `الناتج المدخل (${userNumericInput}) غير صحيح. راجع خطوات الحساب أو اضغط على التلميح المحاسبي للمساعدة.`,
          pointsEarned: 0
        });
      }
    } else if (currentStep.type === 'multiple_choice') {
      if (userSelectedOption === currentStep.expectedOptionIndex) {
        setStepFeedback({
          status: 'correct',
          message: `اختيار سليم ومعلل محاسبياً! أحسنت (+${currentStep.points} نقطة).`,
          pointsEarned: currentStep.points
        });
        setScores(prev => ({ ...prev, [stepKey]: currentStep.points }));
        setCompletedSteps(prev => ({ ...prev, [stepKey]: true }));
      } else {
        setStepFeedback({
          status: 'incorrect',
          message: 'الاختيار غير صحيح. راجع المفهوم العلمي والقواعد المقررة.',
          pointsEarned: 0
        });
      }
    }
  };

  // Open in Live Simulator Bridge
  const handleOpenInSimulator = () => {
    navigate('/training/simulators', {
      state: {
        activeCaseId: activeCase.id,
        initialSubTab: 'pipeline'
      }
    });
  };

  // Bridge to JRE Workshop
  const handleOpenInJRE = () => {
    navigate('/training/jre', {
      state: {
        prefilledCaseTitle: activeCase.title,
        prefilledPrompt: activeCase.jrePrompt,
        prefilledOrg: activeCase.organizationName
      }
    });
  };

  return (
    <div className={`space-y-6 font-serif transition-all duration-300 ${
      isSidebarCollapsed ? 'w-full max-w-none px-2 sm:px-6' : ''
    }`} dir="rtl">
      {/* Global Curriculum Unit Filter Banner */}
      {globalUnitId && (
        <div className="bg-[#1D1D1B] text-[#F9F7F2] p-4 border-2 border-[#C4A484] flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-black rounded-xs shrink-0">
              <Filter className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#C4A484] font-bold">تصفية تلقائية بحسب القائمة الجانبية:</span>
                <span className="bg-white/20 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider">
                  {globalUnitId.toUpperCase()}
                </span>
                {globalLessonId && (
                  <span className="bg-[#C4A484] text-[#1D1D1B] px-2.5 py-0.5 text-xs font-mono font-bold">
                    الدرس: {globalLessonId}
                  </span>
                )}
                <span className="text-xs text-white/80 bg-white/10 px-2 py-0.5">
                  ({filteredCases.length} قضايا وتطبيقات متاحة)
                </span>
              </div>
              <p className="text-xs text-[#F9F7F2]/80 mt-1">
                يتم عرض الحالات المحاسبية والتطبيقات العملية الخاصة بالوحدة المحددة فقط لتحقيق أقصى تركيز دراسي.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearGlobalFilters}
            className="px-3.5 py-2 bg-[#8A1F1D] hover:bg-[#6e1917] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer rounded-xs"
          >
            <X className="w-4 h-4" />
            <span>عرض كل قضايا المنهج</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#8A1F1D] text-white text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                المرحلة الثانية • التدريبات التطبيقية وحالات الاختبار
              </span>
              <span className="bg-[#1D1D1B]/10 text-[#1D1D1B] text-xs font-bold px-2.5 py-0.5 border border-[#1D1D1B]/20">
                مقرر البكالوريا المصرية المعتمد
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1D1D1B]">
              مختبر التدريبات التطبيقية وحل القضايا المحاسبية الشاملة
            </h1>
            <p className="text-xs sm:text-sm text-[#1D1D1B]/70 max-w-4xl leading-relaxed">
              منصة تدريب تفاعلية لحل قضايا ومسائل المحاسبة المالية الميدانية خطوة بخطوة: من فحص المستند المؤيد، وصياغة قيود اليومية، إلى كشف الأخطاء وإقفال الحساب المعلق، وإجراء التسويات الجردية الأربعة، وصولاً إلى إعداد القوائم الختامية والتبرير المحاسبي JRE.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={handleOpenInSimulator}
              className="px-3.5 py-2 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <WorkflowIcon className="w-4 h-4 text-[#C4A484]" />
              <span>فتح في محاكي الدورة المحاسبية</span>
            </button>
            <button
              onClick={handleOpenInJRE}
              className="px-3.5 py-2 bg-[#1B4D2E] hover:bg-[#143d24] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <PenTool className="w-4 h-4 text-[#C4A484]" />
              <span>تطبيق مقال JRE (20 درجة)</span>
            </button>
          </div>
        </div>

        {/* Global Progress & Mastery Score Bar */}
        <div className="mt-5 pt-4 border-t border-[#1D1D1B]/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C4A484]" />
              <span className="font-bold text-[#1D1D1B]">مجموع النقاط المكتسبة:</span>
            </div>
            <span className="font-mono font-extrabold text-sm text-[#1D1D1B]">
              {currentEarnedPoints} / {totalPossiblePoints} نقطة
            </span>
          </div>

          <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-800" />
              <span className="font-bold text-[#1D1D1B]">نسبة إنجاز القضية:</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-200 h-2">
                <div className="bg-[#1B4D2E] h-2 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="font-mono font-bold text-xs">{progressPercent}%</span>
            </div>
          </div>

          <div className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <span className="font-bold text-[#1D1D1B]">الوقت التقديري للحل:</span>
            </div>
            <span className="font-bold text-xs text-[#1D1D1B]">
              {activeCase.estimatedMinutes} دقيقة امتحان
            </span>
          </div>
        </div>
      </div>

      {/* Case Selector and Case Navigation Ribbon */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Case List */}
        <div className="lg:col-span-1 space-y-3 font-serif">
          <div className="bg-white border-2 border-[#1D1D1B] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-2">
              <h3 className="font-extrabold text-sm text-[#1D1D1B] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C4A484]" />
                <span>قضايا البكالوريا المعتمدة ({filteredCases.length})</span>
              </h3>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[#1D1D1B]/70 font-bold">المستوى:</span>
              <button
                onClick={() => setDifficultyFilter('all')}
                className={`px-2 py-0.5 border cursor-pointer ${difficultyFilter === 'all' ? 'bg-[#1D1D1B] text-white' : 'bg-[#F9F7F2]'}`}
              >
                الكل
              </button>
              <button
                onClick={() => setDifficultyFilter('مبتدئ')}
                className={`px-2 py-0.5 border cursor-pointer ${difficultyFilter === 'مبتدئ' ? 'bg-[#1D1D1B] text-white' : 'bg-[#F9F7F2]'}`}
              >
                مبتدئ
              </button>
              <button
                onClick={() => setDifficultyFilter('متوسط')}
                className={`px-2 py-0.5 border cursor-pointer ${difficultyFilter === 'متوسط' ? 'bg-[#1D1D1B] text-white' : 'bg-[#F9F7F2]'}`}
              >
                متوسط
              </button>
              <button
                onClick={() => setDifficultyFilter('متقدم / شامل')}
                className={`px-2 py-0.5 border cursor-pointer ${difficultyFilter === 'متقدم / شامل' ? 'bg-[#1D1D1B] text-white' : 'bg-[#F9F7F2]'}`}
              >
                شامل
              </button>
            </div>

            {/* Case List Buttons */}
            <div className="space-y-2 pt-1">
              {filteredCases.length === 0 ? (
                <div className="p-4 text-center bg-[#F9F7F2] border border-dashed border-[#1D1D1B]/30 space-y-2">
                  <p className="text-xs font-bold text-[#1D1D1B]">لا توجد قضايا مطابقة للفلتر الحالي</p>
                  <button
                    type="button"
                    onClick={clearGlobalFilters}
                    className="text-[11px] text-[#8A1F1D] underline font-bold cursor-pointer hover:text-black"
                  >
                    عرض كل قضايا المنهج
                  </button>
                </div>
              ) : (
                filteredCases.map(c => {
                  const isSelected = c.id === selectedCaseId;
                  const caseStepsCompleted = c.steps.every(s => completedSteps[`${c.id}-${s.id}`]);

                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSwitchCase(c.id)}
                      className={`w-full text-right p-3 border transition cursor-pointer flex flex-col gap-1 ${
                        isSelected 
                          ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-sm' 
                          : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F0EEE6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 ${
                          isSelected ? 'bg-[#C4A484] text-[#1D1D1B]' : 'bg-[#1D1D1B]/10 text-[#1D1D1B]'
                        }`}>
                          {c.difficulty}
                        </span>
                        {caseStepsCompleted && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <span className="font-bold text-xs line-clamp-1 mt-0.5">{c.title}</span>
                      <span className={`text-[10px] line-clamp-1 ${isSelected ? 'text-[#F9F7F2]/75' : 'text-[#1D1D1B]/60'}`}>
                        {c.organizationName}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 text-xs space-y-2">
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1B4D2E]" />
              <span>منهجية التصحيح الوزارية:</span>
            </span>
            <p className="text-[#1D1D1B]/75 text-[11px] leading-relaxed">
              كل خطوة تُقيّم وفق معايير المحاسبة المصرية (EAS): صحة أطراف القيد، مطابقة المبالغ، وتفسير الأثر المالي في ميزان المراجعة وقائمة الدخل.
            </p>
          </div>
        </div>

        {/* Right 3 Cols: Active Case Workspace */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Active Case Header Card */}
          <div className="bg-white border-2 border-[#1D1D1B] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-3">
              <div>
                <span className="text-xs font-bold text-[#8A1F1D] block">
                  {activeCase.unitTitle}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1D1D1B] mt-0.5">
                  {activeCase.title}
                </h2>
                <span className="text-xs text-[#1D1D1B]/70 font-sans mt-0.5 block">
                  المنشأة: <strong>{activeCase.organizationName}</strong> • النشاط: {activeCase.activityType}
                </span>
              </div>

              {/* View Switcher: Documents vs Steps vs Model */}
              <div className="flex items-center gap-1 bg-[#F9F7F2] p-1 border border-[#1D1D1B]/20">
                <button
                  onClick={() => setActiveViewTab('step_solver')}
                  className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeViewTab === 'step_solver'
                      ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                      : 'text-[#1D1D1B] hover:bg-[#FFFFFF]'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>خطوات الحل التفاعلي ({activeCase.steps.length})</span>
                </button>

                <button
                  onClick={() => setActiveViewTab('case_info')}
                  className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeViewTab === 'case_info'
                      ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                      : 'text-[#1D1D1B] hover:bg-[#FFFFFF]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>المستندات والبيانات ({activeCase.sourceDocuments.length})</span>
                </button>
              </div>
            </div>

            {/* Brief Description */}
            <p className="text-xs text-[#1D1D1B]/80 leading-relaxed bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15">
              <strong>معطيات القضية: </strong>{activeCase.caseDescription}
            </p>
          </div>

          {/* TAB 1: SOURCE DOCUMENTS VIEW */}
          {activeViewTab === 'case_info' && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#1D1D1B] p-5 space-y-4">
                <h3 className="font-extrabold text-sm text-[#1D1D1B] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8A1F1D]" />
                  <span>ملف المستندات المؤيدة والمذكرات الرقابية للعمليات:</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCase.sourceDocuments.map((doc, idx) => (
                    <div key={doc.id} className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 space-y-2">
                      <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-2">
                        <span className="text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5">
                          <span className="w-5 h-5 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{doc.title}</span>
                        </span>
                        <span className="font-mono text-[11px] text-[#1D1D1B]/60">{doc.date}</span>
                      </div>
                      <p className="text-xs text-[#1D1D1B]/75 leading-relaxed">
                        {doc.details}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#1D1D1B]/10">
                        <span className="text-[11px] text-[#1D1D1B]/60 font-mono">رقم المرجع: {doc.docNumber}</span>
                        <span className="font-mono font-extrabold text-sm text-[#1D1D1B]">
                          {doc.amount.toLocaleString()} ج.م
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#1D1D1B]/15 flex justify-end">
                  <button
                    onClick={() => setActiveViewTab('step_solver')}
                    className="px-4 py-2 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>الانتقال لبدء حل الخطوة الأولى</span>
                    <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE STEP-BY-STEP SOLVER VIEW */}
          {activeViewTab === 'step_solver' && (
            <div className="space-y-4">
              
              {/* Step Navigation Tabs (Step 1, Step 2, ...) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {activeCase.steps.map((step, idx) => {
                  const isStepActive = idx === currentStepIndex;
                  const stepKey = `${activeCase.id}-${step.id}`;
                  const isDone = completedSteps[stepKey];

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSelectStep(idx)}
                      className={`px-3 py-2 text-xs font-bold transition border flex items-center gap-2 shrink-0 cursor-pointer ${
                        isStepActive 
                          ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs' 
                          : isDone
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#F0EEE6]'
                      }`}
                    >
                      <span>الخطوة {step.stepNumber}</span>
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="font-mono text-[10px] opacity-70">({step.points}ن)</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Step Detail and Interaction Box */}
              <div className="bg-white border-2 border-[#1D1D1B] p-5 sm:p-6 space-y-5">
                
                {/* Step Header */}
                <div className="border-b border-[#1D1D1B]/15 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#8A1F1D] uppercase">
                      الخطوة {currentStep.stepNumber} من {activeCase.steps.length} • {currentStep.type === 'journal_entry' ? 'قيد يومية' : currentStep.type === 'numeric_calculation' ? 'حساب مالي' : 'اختيار من متعدد'}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#1D1D1B] mt-0.5">
                      {currentStep.title}
                    </h3>
                  </div>
                  <span className="bg-[#1D1D1B]/10 text-[#1D1D1B] font-mono text-xs font-extrabold px-2.5 py-1 border border-[#1D1D1B]/20">
                    درجة السؤال: {currentStep.points} درجات
                  </span>
                </div>

                {/* Step Prompt Instruction */}
                <div className="bg-[#F9F7F2] border-r-4 border-r-[#8A1F1D] p-4 text-xs sm:text-sm text-[#1D1D1B] leading-relaxed font-serif">
                  <strong>المطلوب المحاسبي: </strong>{currentStep.instruction}
                </div>

                {/* INTERACTIVE INPUT FORM BASED ON TYPE */}
                <div className="bg-[#FFFFFF] border border-[#1D1D1B]/20 p-4 space-y-4">
                  
                  {/* Form Type 1: Journal Entry Input */}
                  {currentStep.type === 'journal_entry' && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5">
                        <PenTool className="w-3.5 h-3.5 text-[#C4A484]" />
                        <span>تحرير أطراف القيد المزدوج:</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#1D1D1B] block">
                            من حـ/ (الطرف المدين):
                          </label>
                          <input
                            type="text"
                            value={userDebitAccount}
                            onChange={(e) => setUserDebitAccount(e.target.value)}
                            placeholder="مثال: حساب البنك أو الأثاث..."
                            className="w-full px-3 py-2 text-xs border border-[#1D1D1B]/30 focus:border-[#1D1D1B] outline-none bg-white font-serif"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#1D1D1B] block">
                            إلى حـ/ (الطرف الدائن):
                          </label>
                          <input
                            type="text"
                            value={userCreditAccount}
                            onChange={(e) => setUserCreditAccount(e.target.value)}
                            placeholder="مثال: حساب رأس المال أو المبيعات..."
                            className="w-full px-3 py-2 text-xs border border-[#1D1D1B]/30 focus:border-[#1D1D1B] outline-none bg-white font-serif"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:w-1/2">
                        <label className="text-xs font-bold text-[#1D1D1B] block">
                          مبلغ القيد (المدين والدائن) بالجنيه المصري:
                        </label>
                        <input
                          type="number"
                          value={userAmount}
                          onChange={(e) => setUserAmount(e.target.value)}
                          placeholder="مثال: 250000"
                          className="w-full px-3 py-2 text-xs border border-[#1D1D1B]/30 focus:border-[#1D1D1B] outline-none bg-white font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Form Type 2: Numeric Calculation */}
                  {currentStep.type === 'numeric_calculation' && (
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-[#1D1D1B] block">
                        الناتج الحسابي الدقيق (بالجنيه المصري):
                      </label>
                      <div className="flex items-center gap-2 max-w-sm">
                        <input
                          type="number"
                          value={userNumericInput}
                          onChange={(e) => setUserNumericInput(e.target.value)}
                          placeholder="أدخل الناتج الحسابي..."
                          className="w-full px-3 py-2 text-xs border border-[#1D1D1B]/30 focus:border-[#1D1D1B] outline-none bg-white font-mono"
                        />
                        <span className="text-xs font-bold text-[#1D1D1B]/70 shrink-0">ج.م</span>
                      </div>
                    </div>
                  )}

                  {/* Form Type 3: Multiple Choice */}
                  {currentStep.type === 'multiple_choice' && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#1D1D1B] block mb-2">
                        اختر التحديد أو المعالجة المحاسبية السليمة:
                      </span>
                      <div className="space-y-2">
                        {currentStep.options?.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            onClick={() => setUserSelectedOption(optIdx)}
                            className={`p-3 border text-xs flex items-start gap-2.5 transition cursor-pointer ${
                              userSelectedOption === optIdx
                                ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                                : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F0EEE6]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="mcq-option"
                              checked={userSelectedOption === optIdx}
                              onChange={() => setUserSelectedOption(optIdx)}
                              className="mt-0.5"
                            />
                            <span className="leading-relaxed">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons: Verify / Hint / Model */}
                  <div className="pt-3 border-t border-[#1D1D1B]/15 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleVerifyAnswer}
                        className="px-4 py-2 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Check className="w-4 h-4 text-[#C4A484]" />
                        <span>تحقق من صحة الإجابة</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHint(!showHint)}
                        className="px-3 py-2 bg-[#F9F7F2] hover:bg-[#F0EEE6] text-[#1D1D1B] border border-[#1D1D1B]/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-[#C4A484]" />
                        <span>{showHint ? 'إخفاء التلميح' : 'تلميح محاسبي'}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowModelSolution(!showModelSolution)}
                      className="text-xs text-[#8A1F1D] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {showModelSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showModelSolution ? 'إخفاء الحل النموذجي' : 'عرض الحل النموذجي المعتمد'}</span>
                    </button>
                  </div>
                </div>

                {/* Instant Feedback Banner */}
                {stepFeedback.status !== 'idle' && (
                  <div className={`p-4 border font-serif ${
                    stepFeedback.status === 'correct'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}>
                    <div className="flex items-start gap-2">
                      {stepFeedback.status === 'correct' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-bold text-xs sm:text-sm">
                          {stepFeedback.status === 'correct' ? 'تقييم الإجابة: صحيحة ومتوافقة' : 'تقييم الإجابة: بحاجة إلى تصحيح'}
                        </div>
                        <div className="text-xs mt-0.5 leading-relaxed">{stepFeedback.message}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Accounting Hint Accordion */}
                {showHint && (
                  <div className="bg-[#FFF9EB] border border-amber-300 p-4 space-y-1.5 text-xs font-serif">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>السند المعياري والتلميح الإرشادي:</span>
                    </div>
                    <p className="text-amber-900 leading-relaxed">{currentStep.hint}</p>
                    <div className="text-[11px] text-amber-800/80 pt-1 border-t border-amber-200">
                      <strong>المرجع المعتمد: </strong>{currentStep.standardReference}
                    </div>
                  </div>
                )}

                {/* Model Solution Box */}
                {showModelSolution && (
                  <div className="bg-[#F9F7F2] border-2 border-[#1D1D1B] p-4 space-y-2 text-xs font-serif">
                    <div className="font-bold text-[#1D1D1B] flex items-center justify-between border-b border-[#1D1D1B]/15 pb-2">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>الحل النموذجي المعتمد (وفق نموذج إجابة الوزارة):</span>
                      </span>
                      <span className="text-[10px] text-[#8A1F1D] font-bold">دليل المعلم الرسمي</span>
                    </div>

                    <div className="text-[#1D1D1B] leading-relaxed pt-1 space-y-1">
                      {currentStep.type === 'journal_entry' && (
                        <div className="font-mono bg-white p-2.5 border border-[#1D1D1B]/15 space-y-1">
                          <div><strong>من حـ/ </strong>{currentStep.expectedDebitAccount} : {currentStep.expectedAmount?.toLocaleString()} ج.م</div>
                          <div><strong>إلى حـ/ </strong>{currentStep.expectedCreditAccount} : {currentStep.expectedAmount?.toLocaleString()} ج.م</div>
                        </div>
                      )}
                      {currentStep.type === 'numeric_calculation' && (
                        <div className="font-mono bg-white p-2.5 border border-[#1D1D1B]/15">
                          <strong>الناتج المعتمد: </strong>{currentStep.expectedNumericValue?.toLocaleString()} ج.م
                        </div>
                      )}
                      {currentStep.type === 'multiple_choice' && (
                        <div className="bg-white p-2.5 border border-[#1D1D1B]/15 font-bold text-emerald-900">
                          {currentStep.options?.[currentStep.expectedOptionIndex || 0]}
                        </div>
                      )}

                      <p className="text-xs text-[#1D1D1B]/80 pt-2">
                        <strong>الشرح والتفسير المحاسبي: </strong>{currentStep.explanation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Next / Prev Navigation */}
                <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={currentStepIndex === 0}
                    onClick={() => handleSelectStep(currentStepIndex - 1)}
                    className="px-3.5 py-2 bg-[#F9F7F2] hover:bg-[#F0EEE6] disabled:opacity-40 text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>الخطوة السابقة</span>
                  </button>

                  <span className="text-xs text-[#1D1D1B]/60 font-mono font-bold">
                    {currentStepIndex + 1} / {activeCase.steps.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentStepIndex === activeCase.steps.length - 1}
                    onClick={() => handleSelectStep(currentStepIndex + 1)}
                    className="px-3.5 py-2 bg-[#1D1D1B] hover:bg-[#333330] disabled:opacity-40 text-[#F9F7F2] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-xs"
                  >
                    <span>الخطوة التالية</span>
                    <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* JRE Bridge Section for this Case */}
          <div className="bg-[#FFFFFF] border-2 border-[#1B4D2E] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-serif">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#1B4D2E] text-white text-[10px] font-bold px-2 py-0.5">
                  امتحان البكالوريا • ورشة JRE
                </span>
                <span className="text-xs font-bold text-[#1B4D2E]">
                  سؤال مقال التفسير المالي (20 درجة وزارية)
                </span>
              </div>
              <p className="text-xs text-[#1D1D1B]/80 max-w-2xl leading-relaxed">
                {activeCase.jrePrompt}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenInJRE}
              className="px-4 py-2.5 bg-[#1B4D2E] hover:bg-[#143d24] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              <PenTool className="w-4 h-4 text-[#C4A484]" />
              <span>فتح ورشة المقال وكتابة التفسير</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
