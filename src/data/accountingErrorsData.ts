export type ErrorImpactOnBalance = 'NO_EFFECT' | 'AFFECTS_BALANCE';

export type AccountingErrorCategory = 
  | 'PRINCIPLE'          // خطأ فني (مبدئي)
  | 'COMMISSION_NAMING'   // خطأ في اسم الحساب (توجيه)
  | 'AMOUNT_EXCESS'       // خطأ في المبلغ بالزيادة
  | 'AMOUNT_DEFICIT'      // خطأ في المبلغ بالنقص
  | 'OMISSION'            // خطأ السهو أو الحذف الكلي
  | 'DUPLICATION'         // خطأ التكرار
  | 'POSTING_ONE_SIDED'   // ترحيل طرف واحد (يؤثر على الميزان)
  | 'SUSPENSE_BALANCING'; // خطأ الحساب المعلق وترصيد اليومية

export interface JournalEntrySide {
  accountName: string;
  debit: number;
  credit: number;
}

export interface JournalEntrySpec {
  date: string;
  explanation: string;
  rows: JournalEntrySide[];
}

export interface AccountingErrorCase {
  id: string;
  code: string;
  title: string;
  unitRef: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  transactionDescription: string;
  erroneousTransaction: {
    recordedEntryText: string;
    date: string;
    entry: JournalEntrySpec;
    natureOfMistake: string;
  };
  classification: {
    category: AccountingErrorCategory;
    categoryLabel: string;
    impactOnBalance: ErrorImpactOnBalance;
    impactLabel: string;
    pedagogicalExplanation: string;
  };
  correctEntrySpec: JournalEntrySpec;
  // Solutions
  extendedMethod: {
    step1Cancellation: JournalEntrySpec;
    step2Establishment: JournalEntrySpec;
    reasoning: string;
  };
  shortMethod: {
    adjustingEntry: JournalEntrySpec;
    reasoning: string;
    accountsAffected: string[];
    accountsIntact: string[];
  };
  suspenseImpact?: {
    suspenseBalanceBefore: number;
    suspenseSideBefore: 'مدين' | 'دائن';
    suspenseBalanceAfter: number;
    closingExplanation: string;
  };
  ministerialTip: string;
}

export const ACCOUNTING_ERROR_CATEGORIES: { id: AccountingErrorCategory; label: string; impact: ErrorImpactOnBalance; description: string }[] = [
  {
    id: 'PRINCIPLE',
    label: 'خطأ فني (مبدئي)',
    impact: 'NO_EFFECT',
    description: 'مخالفة المبادئ المحاسبية المتعارف عليها، مثل الخلط بين المصروف الإيرادي والمصروف الرأسمالي (مثال: تسجيل شراء أصل ثابت كمشتريات بضاعة).'
  },
  {
    id: 'COMMISSION_NAMING',
    label: 'خطأ في اسم الحساب (توجيه كتابي)',
    impact: 'NO_EFFECT',
    description: 'تسجيل العملية في حساب شخصي خاطئ من نفس الطبيعة (مثال: مدين حساب محمد بدلاً من محمود، أو مبيعات بدلاً من إيراد عقار).'
  },
  {
    id: 'AMOUNT_EXCESS',
    label: 'خطأ في المبلغ بالزيادة',
    impact: 'NO_EFFECT',
    description: 'تسجيل طرفي القيد بمبلغ متساوٍ أكبر من القيمة الحقيقية للعملية (مثال: كتابة 50,000 بدلاً من 5,000 لكلا الطرفين).'
  },
  {
    id: 'AMOUNT_DEFICIT',
    label: 'خطأ في المبلغ بالنقصان',
    impact: 'NO_EFFECT',
    description: 'تسجيل طرفي القيد بمبلغ متساوٍ أقل من القيمة الحقيقية للعملية (مثال: كتابة 1,200 بدلاً من 12,000 لكلا الطرفين).'
  },
  {
    id: 'OMISSION',
    label: 'خطأ السهو أو الحذف الكلي',
    impact: 'NO_EFFECT',
    description: 'إغفال قيد العملية بالكامل في دفتر اليومية، مما يجعل الدفاتر غير معبرة لكن الميزان يظل متوازناً عددياً.'
  },
  {
    id: 'DUPLICATION',
    label: 'خطأ التكرار',
    impact: 'NO_EFFECT',
    description: 'تسجيل العملية بكامل قيدها الصحيح مرتين متتاليتين في دفتر اليومية.'
  },
  {
    id: 'POSTING_ONE_SIDED',
    label: 'خطأ ترحيل أحادي أو جزئي',
    impact: 'AFFECTS_BALANCE',
    description: 'ترحيل طرف واحد من اليومية للأستاذ وإغفال الطرف الآخر، مما يؤدي فوراً لاختلال توازن ميزان المراجعة وتوسيط الحساب المعلق.'
  },
  {
    id: 'SUSPENSE_BALANCING',
    label: 'خطأ تجميع أو نقل رصيد ميزان المراجعة',
    impact: 'AFFECTS_BALANCE',
    description: 'خطأ حسابي في جمع أعمدة اليومية أو نقل أرصدة الأستاذ للميزان، يعالج مؤقتاً عبر الحساب المعلق حتى تصحيحه.'
  }
];

export const OFFICIAL_CORRECTION_RULES = {
  legalFoundation: {
    law: 'المادة (11) من القانون التجاري المصري رقم 17 لسنة 1999',
    ruleText: 'يجب أن تكون الدفاتر التجارية خالية من أي قشط أو شطب أو حك أو تحشير أو فراغ أو كتابة في الحواشي، ولذلك يُحظر تماماً تصحيح الأخطاء الدفترية مادياً وإنما تُصحح بموجب قيود محاسبية رسمية في دفتر اليومية العام.'
  },
  methodComparison: [
    {
      method: 'الطريقة المطولة (Extended Method)',
      entriesCount: 2,
      steps: [
        'الخطوة الأولى: إلغاء القيد الخاطئ بالكامل بجعل المدين دائناً والدائن مديناً بنفس مبالغ القيد الخطأ.',
        'الخطوة الثانية: إثبات القيد المحاسبي الصحيح كما كان يجب أن يسجل من البداية.'
      ],
      pros: 'أكثر وضوحاً وتفصيلاً، وتتيح للمراجع الخارجي تتبع ما حدث خطوة بخطوة وإثبات إلغاء الخطأ بوضوح.',
      cons: 'تستغرق وقتاً أطول وتضاعف عدد القيود في دفتر اليومية وحسابات الأستاذ.'
    },
    {
      method: 'الطريقة المختصرة (Short / Direct Method)',
      entriesCount: 1,
      steps: [
        'إجراء قيد تسوية وحيد يصحح الحساب الخاطئ ويحل محله الحساب الصحيح، مع إبقاء الحسابات السليمة دون تغيير.'
      ],
      pros: 'سريعة وموجزة ومطابقة للممارسات المهنية الحديثة واختبارات الوزارة وتوفر الجهد والدفاتر.',
      cons: 'تتطلب مهارة محاسبية أعلى لتحديد الفرق الصافي والحسابات المتأثرة بدقة دون ارتكاب خطأ جديد.'
    }
  ]
};

export const ACCOUNTING_ERROR_CASES: AccountingErrorCase[] = [
  {
    id: 'case-err-1',
    code: 'ERR-01',
    title: 'شراء أصل ثابت وقيده خطأ كمصروف إيرادي (المشتريات)',
    unitRef: 'الوحدة الرابعة - الدرس 5 (ص 108)',
    difficulty: 'مبتدئ',
    transactionDescription: 'اشترت المنشأة آلات ومعدات إنتاجية بمبلغ 30,000 جنيه نقداً لاستخدامها في النشاط الإنتاجي.',
    erroneousTransaction: {
      recordedEntryText: 'تم إثبات العملية خطأ في دفتر اليومية بجعل حساب المشتريات مديناً وحساب الخزينة دائناً.',
      date: '2026-03-10',
      entry: {
        date: '2026-03-10',
        explanation: 'من حـ/ المشتريات إلى حـ/ الخزينة - شراء بضاعة نقداً (قيد خاطئ)',
        rows: [
          { accountName: 'حـ/ المشتريات', debit: 30000, credit: 0 },
          { accountName: 'حـ/ الخزينة', debit: 0, credit: 30000 }
        ]
      },
      natureOfMistake: 'تم اعتبار شراء الأصل الثابت (مصروف رأسمالي) بمثابة شراء بضاعة تجارية (مصروف إيرادي)، مما يخالف الفروض والمبادئ المحاسبية.'
    },
    classification: {
      category: 'PRINCIPLE',
      categoryLabel: 'خطأ فني (مبدئي)',
      impactOnBalance: 'NO_EFFECT',
      impactLabel: 'لا يؤثر على توازن ميزان المراجعة',
      pedagogicalExplanation: 'الطرف المدين سُجل بـ 30,000 والطرف الدائن بـ 30,000، لذا تساوى جانبا الميزان عددياً، لكن القوائم المالية شُوِّهت (تضخم تكلفة المبيعات ونقص قيمة الأصول الثابتة بالمركز المالي).'
    },
    correctEntrySpec: {
      date: '2026-03-10',
      explanation: 'من حـ/ الآلات والمعدات إلى حـ/ الخزينة - شراء آلات إنتاجية نقداً',
      rows: [
        { accountName: 'حـ/ الآلات والمعدات', debit: 30000, credit: 0 },
        { accountName: 'حـ/ الخزينة', debit: 0, credit: 30000 }
      ]
    },
    extendedMethod: {
      step1Cancellation: {
        date: '2026-03-31',
        explanation: 'إلغاء القيد الخاطئ المؤرخ 10/3 بعكس طرفي القيد',
        rows: [
          { accountName: 'حـ/ الخزينة', debit: 30000, credit: 0 },
          { accountName: 'حـ/ المشتريات', debit: 0, credit: 30000 }
        ]
      },
      step2Establishment: {
        date: '2026-03-31',
        explanation: 'إثبات القيد الصحيح لشراء الآلات نقداً',
        rows: [
          { accountName: 'حـ/ الآلات والمعدات', debit: 30000, credit: 0 },
          { accountName: 'حـ/ الخزينة', debit: 0, credit: 30000 }
        ]
      },
      reasoning: 'في الخطوة الأولى ألغينا القيد الخاطئ فأصبحت المشتريات دائنة بـ 30,000 (تصفير الخطأ) والخزينة مدينة. وفي الخطوة الثانية أثبتنا الآلات مدينة والخزينة دائنة، فعادت الخزينة لوضعها الحقيقي.'
    },
    shortMethod: {
      adjustingEntry: {
        date: '2026-03-31',
        explanation: 'تصحيح خطأ قيد شراء آلات كمشتريات بقيد تسوية مباشر',
        rows: [
          { accountName: 'حـ/ الآلات والمعدات', debit: 30000, credit: 0 },
          { accountName: 'حـ/ المشتريات', debit: 0, credit: 30000 }
        ]
      },
      reasoning: 'طرف الخزينة سليم تماماً (دائن بـ 30,000)، الخطأ انحصر في جعل المشتريات مدينة بدلاً من الآلات. بالتالي نجعل حـ/ الآلات مديناً لإثباته، ونجعل حـ/ المشتريات دائناً لإلغائه وتخفيضه.',
      accountsAffected: ['حـ/ الآلات والمعدات (مدين)', 'حـ/ المشتريات (دائن)'],
      accountsIntact: ['حـ/ الخزينة (صحيحة لم تمس)']
    },
    ministerialTip: 'في امتحانات الثانوية التجارية، إذا طلب منك التصحيح بالطريقة المختصرة لا تقم بلمس الحساب السليم (الخزينة) أبداً، واكتفِ بمعالجة الحساب المدين الخاطئ والصحيح.'
  },
  {
    id: 'case-err-2',
    code: 'ERR-02',
    title: 'خطأ توجيه في اسم حساب العميل (سداد عميل قُيّد لعميل آخر)',
    unitRef: 'الوحدة الرابعة - الدرس 5 (ص 109)',
    difficulty: 'مبتدئ',
    transactionDescription: 'سدد العميل "محمود خليل" مبلغ 12,000 جنيه بشيك مسحوب على بنك مصر سداداً للمستحق عليه.',
    erroneousTransaction: {
      recordedEntryText: 'سجل المحاسب العملية بجعل حساب البنك مديناً وحساب العميل "أحمد خليل" دائناً بـ 12,000 جنيه.',
      date: '2026-04-05',
      entry: {
        date: '2026-04-05',
        explanation: 'من حـ/ البنك إلى حـ/ العملاء (أحمد خليل) - تحصيل بشيك (قيد خاطئ)',
        rows: [
          { accountName: 'حـ/ البنك', debit: 12000, credit: 0 },
          { accountName: 'حـ/ العملاء (أحمد خليل)', debit: 0, credit: 12000 }
        ]
      },
      natureOfMistake: 'خطأ كتابي ارتكابي في توجيه اسم العميل الدائن، مما يترتب عليه مطالبة محمود بمبلغ سدده، وتبرئة ذمة أحمد دون وجه حق.'
    },
    classification: {
      category: 'COMMISSION_NAMING',
      categoryLabel: 'خطأ في اسم الحساب (توجيه)',
      impactOnBalance: 'NO_EFFECT',
      impactLabel: 'لا يؤثر على توازن ميزان المراجعة',
      pedagogicalExplanation: 'الطرف المدين سليم (البنك) والطرف الدائن مسجل بنفس القيمة (12,000)، والميزان متوازن حسابياً رغم ظلم حسابات العملاء الفردية.'
    },
    correctEntrySpec: {
      date: '2026-04-05',
      explanation: 'من حـ/ البنك إلى حـ/ العملاء (محمود خليل) - تحصيل شيك سداداً للمستحق',
      rows: [
        { accountName: 'حـ/ البنك', debit: 12000, credit: 0 },
        { accountName: 'حـ/ العملاء (محمود خليل)', debit: 0, credit: 12000 }
      ]
    },
    extendedMethod: {
      step1Cancellation: {
        date: '2026-04-20',
        explanation: 'إلغاء القيد الخاطئ المؤرخ 5/4 بعكس القيد',
        rows: [
          { accountName: 'حـ/ العملاء (أحمد خليل)', debit: 12000, credit: 0 },
          { accountName: 'حـ/ البنك', debit: 0, credit: 12000 }
        ]
      },
      step2Establishment: {
        date: '2026-04-20',
        explanation: 'إثبات تحصيل الشيك لحساب العميل الحقيقي محمود خليل',
        rows: [
          { accountName: 'حـ/ البنك', debit: 12000, credit: 0 },
          { accountName: 'حـ/ العملاء (محمود خليل)', debit: 0, credit: 12000 }
        ]
      },
      reasoning: 'إلغاء قيد أحمد خليل يجعله مديناً بـ 12,000 فيعاد دينه الأصلي، وإثبات قيد محمود يجعله دائناً بـ 12,000 فتسوى ذمته.'
    },
    shortMethod: {
      adjustingEntry: {
        date: '2026-04-20',
        explanation: 'تصحيح خطأ قيد سداد العميل محمود بحساب أحمد بقيد تسوية مباشر',
        rows: [
          { accountName: 'حـ/ العملاء (أحمد خليل)', debit: 12000, credit: 0 },
          { accountName: 'حـ/ العملاء (محمود خليل)', debit: 0, credit: 12000 }
        ]
      },
      reasoning: 'حساب البنك سليم تماماً. نجعل العميل أحمد خليل مديناً لإلغاء ما نسب إليه خطأ، ونجعل العميل محمود خليل دائناً لإثبات سداده.',
      accountsAffected: ['حـ/ العملاء - أحمد خليل (مدين)', 'حـ/ العملاء - محمود خليل (دائن)'],
      accountsIntact: ['حـ/ البنك (سليم دون تعديل)']
    },
    ministerialTip: 'أخطاء أسماء الحسابات تكتشف عادة عند إرسال المصادقات الشهرية للعملاء، وتصحيحها بالمختصرة يتم بين الحسابين الشخصيين مباشرة.'
  },
  {
    id: 'case-err-3',
    code: 'ERR-03',
    title: 'قيد العملية بمبلغ أكبر من الحقيقي بالزيادة لكلا الطرفين',
    unitRef: 'الوحدة الرابعة - الدرس 5 (ص 110)',
    difficulty: 'متوسط',
    transactionDescription: 'سددت المنشأة مصروف صيانة وإصلاح سيارات بمبلغ 5,000 جنيه نقداً.',
    erroneousTransaction: {
      recordedEntryText: 'سجل المحاسب القيد بمبلغ 50,000 جنيه (بزيادة صفر في المبلغ لكلا الطرفين).',
      date: '2026-05-02',
      entry: {
        date: '2026-05-02',
        explanation: 'من حـ/ مصاريف الصيانة إلى حـ/ الخزينة - سداد نقداً (سجل خطأ بـ 50,000)',
        rows: [
          { accountName: 'حـ/ مصاريف الصيانة', debit: 50000, credit: 0 },
          { accountName: 'حـ/ الخزينة', debit: 0, credit: 50000 }
        ]
      },
      natureOfMistake: 'خطأ ارتكابي في كتابة الأرقام، ترتب عليه زيادة المصروفات بـ 45,000 ونقص رصيد الخزينة الدفتري بـ 45,000 دون مبرر.'
    },
    classification: {
      category: 'AMOUNT_EXCESS',
      categoryLabel: 'خطأ في المبلغ بالزيادة',
      impactOnBalance: 'NO_EFFECT',
      impactLabel: 'لا يؤثر على توازن ميزان المراجعة',
      pedagogicalExplanation: 'الطرفان كتبا بنفس المبلغ المتضخم (50,000)، وبالتالي ميزان المراجعة متوازن عددياً ولا يشير بمفرده لوجود هذا الخطأ الفادح.'
    },
    correctEntrySpec: {
      date: '2026-05-02',
      explanation: 'من حـ/ مصاريف الصيانة إلى حـ/ الخزينة - سداد مصاريف صيانة نقداً',
      rows: [
        { accountName: 'حـ/ مصاريف الصيانة', debit: 5000, credit: 0 },
        { accountName: 'حـ/ الخزينة', debit: 0, credit: 5000 }
      ]
    },
    extendedMethod: {
      step1Cancellation: {
        date: '2026-05-15',
        explanation: 'إلغاء القيد الخاطئ المتضخم المؤرخ 2/5 بعكس القيد',
        rows: [
          { accountName: 'حـ/ الخزينة', debit: 50000, credit: 0 },
          { accountName: 'حـ/ مصاريف الصيانة', debit: 0, credit: 50000 }
        ]
      },
      step2Establishment: {
        date: '2026-05-15',
        explanation: 'إثبات القيد الصحيح بمبلغه الفعلي 5,000 جنيه',
        rows: [
          { accountName: 'حـ/ مصاريف الصيانة', debit: 5000, credit: 0 },
          { accountName: 'حـ/ الخزينة', debit: 0, credit: 5000 }
        ]
      },
      reasoning: 'إلغاء الـ 50,000 بالكامل ثم إثبات الـ 5,000 الصحيحة يجعل الأرصدة الختامية دقيقة بنسبة 100%.'
    },
    shortMethod: {
      adjustingEntry: {
        date: '2026-05-15',
        explanation: 'تخفيض الزيادة غير الحقيقية في قيد مصاريف الصيانة (50,000 - 5,000 = 45,000)',
        rows: [
          { accountName: 'حـ/ الخزينة', debit: 45000, credit: 0 },
          { accountName: 'حـ/ مصاريف الصيانة', debit: 0, credit: 45000 }
        ]
      },
      reasoning: 'بما أن الحسابات صحيحة لكن المبلغ مسجل بزيادة 45,000، يتم إجراء قيد عكسي بمقدار الزيادة فقط لتخفيضها: الخزينة مدينة بـ 45,000 ومصاريف الصيانة دائنة بـ 45,000.',
      accountsAffected: ['حـ/ الخزينة (تخفيض النقص وإرجاع 45,000)', 'حـ/ مصاريف الصيانة (تخفيض التضخم بـ 45,000)'],
      accountsIntact: ['لا يوجد حسابات أخرى ملوثة']
    },
    ministerialTip: 'قاعدة ذهبية: عند تصحيح خطأ الزيادة بالطريقة المختصرة نقوم بعكس القيد بقيمة الفرق فقط (المسجل - الصحيح).'
  },
  {
    id: 'case-err-4',
    code: 'ERR-04',
    title: 'قيد العملية بمبلغ أقل من الحقيقي بالنقصان لكلا الطرفين',
    unitRef: 'الوحدة الرابعة - الدرس 5 (ص 111)',
    difficulty: 'متوسط',
    transactionDescription: 'باعت المنشأة بضاعة إلى العميل "شركة الأمل" على الحساب بمبلغ 24,000 جنيه.',
    erroneousTransaction: {
      recordedEntryText: 'سجل القيد في دفتر اليومية بمبلغ 2,400 جنيه من حـ/ العملاء إلى حـ/ المبيعات (سقط صفر).',
      date: '2026-06-12',
      entry: {
        date: '2026-06-12',
        explanation: 'من حـ/ العملاء (شركة الأمل) إلى حـ/ المبيعات - بيع على الحساب (سجل خطأ بـ 2,400)',
        rows: [
          { accountName: 'حـ/ العملاء (شركة الأمل)', debit: 2400, credit: 0 },
          { accountName: 'حـ/ المبيعات', debit: 0, credit: 2400 }
        ]
      },
      natureOfMistake: 'سجلت العملية بأقل من قيمتها بمقدار 21,600 جنيه، مما يؤدي لنقص المبيعات ونقص حقوق المنشأة لدى العميل.'
    },
    classification: {
      category: 'AMOUNT_DEFICIT',
      categoryLabel: 'خطأ في المبلغ بالنقصان',
      impactOnBalance: 'NO_EFFECT',
      impactLabel: 'لا يؤثر على توازن ميزان المراجعة',
      pedagogicalExplanation: 'سجل المدين بـ 2,400 والدائن بـ 2,400، لذا تساوى الطرفان عددياً دون أن ينبه الميزان إلى وجود نقص هائل في المبيعات.'
    },
    correctEntrySpec: {
      date: '2026-06-12',
      explanation: 'من حـ/ العملاء (شركة الأمل) إلى حـ/ المبيعات - بيع بضاعة بالأجل',
      rows: [
        { accountName: 'حـ/ العملاء (شركة الأمل)', debit: 24000, credit: 0 },
        { accountName: 'حـ/ المبيعات', debit: 0, credit: 24000 }
      ]
    },
    extendedMethod: {
      step1Cancellation: {
        date: '2026-06-25',
        explanation: 'إلغاء قيد المبيعات الخاطئ المسجل بالنقص',
        rows: [
          { accountName: 'حـ/ المبيعات', debit: 2400, credit: 0 },
          { accountName: 'حـ/ العملاء (شركة الأمل)', debit: 0, credit: 2400 }
        ]
      },
      step2Establishment: {
        date: '2026-06-25',
        explanation: 'إثبات مبيعات شركة الأمل بمبلغها الكامل الصحيح 24,000 جنيه',
        rows: [
          { accountName: 'حـ/ العملاء (شركة الأمل)', debit: 24000, credit: 0 },
          { accountName: 'حـ/ المبيعات', debit: 0, credit: 24000 }
        ]
      },
      reasoning: 'إلغاء القيد الناقص بالكامل ثم إثبات القيد الصحيح الكامل.'
    },
    shortMethod: {
      adjustingEntry: {
        date: '2026-06-25',
        explanation: 'قيد استكمال النقص في مبيعات شركة الأمل (24,000 - 2,400 = 21,600)',
        rows: [
          { accountName: 'حـ/ العملاء (شركة الأمل)', debit: 21600, credit: 0 },
          { accountName: 'حـ/ المبيعات', debit: 0, credit: 21600 }
        ]
      },
      reasoning: 'بما أن الحسابات صحيحة والمبلغ فقط أقل من الحقيقي، يجرى قيد إضافي بنفس الاتجاه (المدين مدين والدائن دائن) بمقدار الفرق المتبقي 21,600 جنيه.',
      accountsAffected: ['حـ/ العملاء (زيادة بالفرق 21,600)', 'حـ/ المبيعات (زيادة بالفرق 21,600)'],
      accountsIntact: ['القيد السابق ظل سارياً وأضيف إليه الفرق']
    },
    ministerialTip: 'قاعدة ذهبية: عند تصحيح خطأ النقص بالطريقة المختصرة لا نعكس القيد! بل نكرر نفس أطراف القيد الأصلي بمقدار الفرق (الصحيح - المسجل).'
  },
  {
    id: 'case-err-5',
    code: 'ERR-05',
    title: 'خطأ السهو أو الحذف الكلي لعملية شراء مهمات ومطبوعات',
    unitRef: 'الوحدة الرابعة - الدرس 5 (ص 112)',
    difficulty: 'مبتدئ',
    transactionDescription: 'سددت المنشأة فاتورة مطبوعات ومهمات مكتبية بمبلغ 3,500 جنيه نقداً لم يُجرَ لها أي قيد في الدفاتر إطلاقاً.',
    erroneousTransaction: {
      recordedEntryText: 'لم يسجل أي قيد في دفتر اليومية العامة (سقطت الفاتورة سهواً من المحاسب).',
      date: '2026-07-01',
      entry: {
        date: '2026-07-01',
        explanation: 'لا يوجد قيد (سقوط وسهو كلي)',
        rows: []
      },
      natureOfMistake: 'إغفال تام للعملية المالية ومستندها المؤيد، فظهر رصيد الخزينة بالدفاتر أكبر من الفعلي بـ 3,500 جنيه.'
    },
    classification: {
      category: 'OMISSION',
      categoryLabel: 'خطأ السهو أو الحذف الكلي',
      impactOnBalance: 'NO_EFFECT',
      impactLabel: 'لا يؤثر على توازن ميزان المراجعة',
      pedagogicalExplanation: 'لم يدخل أي رقم في المدين ولا في الدائن، وبالتالي ميزان المراجعة متوازن رغم إغفال المعاملة.'
    },
    correctEntrySpec: {
      date: '2026-07-15',
      explanation: 'من حـ/ الأدوات الكتابية والمهمات إلى حـ/ الخزينة - شراء مطبوعات نقداً',
      rows: [
        { accountName: 'حـ/ الأدوات الكتابية والمهمات', debit: 3500, credit: 0 },
        { accountName: 'حـ/ الخزينة', debit: 0, credit: 3500 }
      ]
    },
    extendedMethod: {
      step1Cancellation: {
        date: '2026-07-15',
        explanation: 'لا يوجد قيد إلغاء لعدم وجود قيد خاطئ مسجل أصلاً',
        rows: []
      },
      step2Establishment: {
        date: '2026-07-15',
        explanation: 'إثبات العملية المحذوفة فور اكتشافها',
        rows: [
          { accountName: 'حـ/ الأدوات الكتابية والمهمات', debit: 3500, credit: 0 },
          { accountName: 'حـ/ الخزينة', debit: 0, credit: 3500 }
        ]
      },
      reasoning: 'في حالة أخطاء السهو الكلي، تتطابق الطريقة المطولة مع الطريقة المختصرة لأنه لا يوجد قيد فاسد سابق لإلغائه.'
    },
    shortMethod: {
      adjustingEntry: {
        date: '2026-07-15',
        explanation: 'إثبات فاتورة المهمات والمطبوعات الساقطة سهواً',
        rows: [
          { accountName: 'حـ/ الأدوات الكتابية والمهمات', debit: 3500, credit: 0 },
          { accountName: 'حـ/ الخزينة', debit: 0, credit: 3500 }
        ]
      },
      reasoning: 'قيد إثبات فوري للعملية في تاريخ اكتشاف السهو.',
      accountsAffected: ['حـ/ الأدوات الكتابية والمهمات (مدين)', 'حـ/ الخزينة (دائن)'],
      accountsIntact: ['لم تتأثر حسابات سابقة']
    },
    ministerialTip: 'سؤال وزاري شهير: هل تختلف الطريقة المطولة عن المختصرة في تصحيح أخطاء السهو الكلي؟ الإجابة: لا تختلف، فكلاهما يكتفي بإثبات القيد الصحيح فقط.'
  },
  {
    id: 'case-err-6',
    code: 'ERR-06',
    title: 'خطأ أحادي مؤثر على التوازن وتصفير الحساب المعلق (Suspense Account)',
    unitRef: 'الوحدة الرابعة - الدرس 4 و 5 (ص 105 - 113)',
    difficulty: 'متقدم',
    transactionDescription: 'أظهر ميزان المراجعة في 31/12 فرقاً قدره 8,000 جنيه (الجانب المدين أكبر من الدائن بـ 8,000 بسبب عدم ترحيل مبيعات)، ففُتح حساب معلق بالجانب الدائن بـ 8,000 جنيه لتوازن الميزان مؤقتاً.',
    erroneousTransaction: {
      recordedEntryText: 'عند الفحص، تبين أن مبيعات نقدية بمبلغ 8,000 جنيه رُحلت لحساب الخزينة (مديناً) وأُغفل ترحيلها تماماً إلى حساب المبيعات بالأستاذ العام.',
      date: '2026-12-31',
      entry: {
        date: '2026-12-31',
        explanation: 'مبيعات نقدية قيدت باليومية ولكنها رُحلت للخزينة فقط دون حساب المبيعات',
        rows: [
          { accountName: 'حـ/ الخزينة', debit: 8000, credit: 0 }
        ]
      },
      natureOfMistake: 'ترحيل طرف واحد وإهمال الطرف الدائن (حـ/ المبيعات)، مما أدى لعدم توازن ميزان المراجعة وتوسيط الحساب المعلق دائناً بـ 8,000 جنيه لمعادلة الفرق مؤقتاً.'
    },
    classification: {
      category: 'POSTING_ONE_SIDED',
      categoryLabel: 'خطأ ترحيل أحادي (يؤثر على التوازن)',
      impactOnBalance: 'AFFECTS_BALANCE',
      impactLabel: 'يؤثر على توازن ميزان المراجعة (يستوجب الحساب المعلق)',
      pedagogicalExplanation: 'عدم ترحيل الطرف الدائن جعل مجموع الأرصدة الدائنة يقل عن المدينة بـ 8,000 جنيه، فاستلزم فتح حساب وسيط مؤقت في الجانب الدائن يسمى الحساب المعلق.'
    },
    correctEntrySpec: {
      date: '2026-12-31',
      explanation: 'ترحيل الطرف الدائن لحساب المبيعات وإقفال الحساب المعلق',
      rows: [
        { accountName: 'حـ/ الحساب المعلق', debit: 8000, credit: 0 },
        { accountName: 'حـ/ المبيعات', debit: 0, credit: 8000 }
      ]
    },
    extendedMethod: {
      step1Cancellation: {
        date: '2026-12-31',
        explanation: 'لا يطبق قيد إلغاء لأن القيد في اليومية كان سليماً والخطأ وقع في الترحيل للأستاذ فقط',
        rows: []
      },
      step2Establishment: {
        date: '2026-12-31',
        explanation: 'ترحيل مبلغ 8,000 إلى الجانب الدائن من حساب المبيعات وتصفير الحساب المعلق بجعله مديناً',
        rows: [
          { accountName: 'حـ/ الحساب المعلق', debit: 8000, credit: 0 },
          { accountName: 'حـ/ المبيعات', debit: 0, credit: 8000 }
        ]
      },
      reasoning: 'تصحيح الأخطاء التي فُتح لها حساب معلق يتم حصراً بقيد تسوية يحل فيه الحساب الحقيقي محل الحساب المعلق لإقفاله.'
    },
    shortMethod: {
      adjustingEntry: {
        date: '2026-12-31',
        explanation: 'إثبات مبيعات لم ترحل وإقفال رصيد الحساب المعلق الدائن بجعله مديناً',
        rows: [
          { accountName: 'حـ/ الحساب المعلق', debit: 8000, credit: 0 },
          { accountName: 'حـ/ المبيعات', debit: 0, credit: 8000 }
        ]
      },
      reasoning: 'بما أن الحساب المعلق كان دائناً بالفرق (8,000)، فإننا نجعله مديناً بـ 8,000 لإقفاله ليصبح رصيده صفراً، وفي نفس الوقت نثبت حـ/ المبيعات في جانبه الطبيعي الدائن بمبلغ 8,000 جنيه.',
      accountsAffected: ['حـ/ الحساب المعلق (أصبح صفراً)', 'حـ/ المبيعات (أثبتت الدائنية بـ 8,000)'],
      accountsIntact: ['حـ/ الخزينة (مرحلة وسليمة من البداية)']
    },
    suspenseImpact: {
      suspenseBalanceBefore: 8000,
      suspenseSideBefore: 'دائن',
      suspenseBalanceAfter: 0,
      closingExplanation: 'تم تصفير الحساب المعلق بالكامل فور اكتشاف الخطأ وإجراء القيد التصحيحي، واستعاد ميزان المراجعة توازنه الفعلي.'
    },
    ministerialTip: 'قاعدة امتحانية هامة: الحساب المعلق لا يُستخدم إطلاقاً إلا مع الأخطاء التي تؤثر على توازن ميزان المراجعة. يحظر استخدام الحساب المعلق لتصحيح الأخطاء الفنية أو السهو أو أسماء الحسابات!'
  }
];
