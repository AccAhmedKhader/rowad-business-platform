export interface CapstoneEnterprise {
  id: string;
  name: string;
  legalForm: string;
  sector: 'COMMERCIAL' | 'SERVICE' | 'HYBRID';
  description: string;
  academicYear: string;
  initialCapital: number;
  taxRegistrationNumber: string;
  commercialRegister: string;
  bankAccount: string;
  accountingSystem: string;
}

export interface CapstoneTransaction {
  id: string;
  date: string;
  title: string;
  documentType: 'فاتورة بيع' | 'فاتورة شراء' | 'إيصال استلام نقدية' | 'إذن صرف نقدية' | 'شيك مصرفي' | 'إشعار خصم/إضافة';
  documentNumber: string;
  amount: number;
  details: string;
  debitAccount: string;
  creditAccount: string;
  jreJustification: string;
}

export interface CapstoneAdjustingEntry {
  id: string;
  targetAccount: string;
  category: 'مقدمات' | 'مستحقات' | 'إهلاك' | 'مخصصات' | 'أخطاء';
  description: string;
  unadjustedAmount: number;
  adjustmentAmount: number;
  adjustedAmount: number;
  entryDebit: string;
  entryCredit: string;
  explanation: string;
}

export interface CapstoneProjectDefinition {
  enterprise: CapstoneEnterprise;
  openingBalances: Array<{ account: string; debit: number; credit: number; type: 'ASSET' | 'LIABILITY' | 'EQUITY' }>;
  transactions: CapstoneTransaction[];
  adjustingEntries: CapstoneAdjustingEntry[];
  financialRatios: Array<{
    name: string;
    category: 'السيولة' | 'الربحية' | 'النشاط' | 'الرفع المالي';
    formula: string;
    calculatedValue: string;
    benchmark: string;
    interpretation: string;
  }>;
}

export const capstoneProjects: CapstoneProjectDefinition[] = [
  {
    enterprise: {
      id: 'cap-nile-commercial',
      name: 'منشأة النيل للتجارة والتوريدات الفردية',
      legalForm: 'منشأة فردية تجارية خاضعة للقانون التجاري المصري',
      sector: 'COMMERCIAL',
      description: 'منشأة متخصصة في بيع وتوزيع الأدوات المكتبية والأجهزة الإلكترونية بالقاهرة الكبرى، تطبق نظام الجرد الدوري واليوميات المساعدة والدورة المستندية الكاملة.',
      academicYear: '2026/2027 • الفصل الدراسي الأول',
      initialCapital: 350000,
      taxRegistrationNumber: '541-892-310',
      commercialRegister: '184920 - جنوب القاهرة',
      bankAccount: 'البنك الأهلي المصري - فرع قصر النيل (ح/ 01029384756)',
      accountingSystem: 'نظام القيد المزدوج • الدورة المستندية الكاملة • معايير المحاسبة المصرية (EAS)'
    },
    openingBalances: [
      { account: 'الخزينة (صندوق المنشأة)', debit: 60000, credit: 0, type: 'ASSET' },
      { account: 'البنك الأهلي المصري (حساب جاري)', debit: 120000, credit: 0, type: 'ASSET' },
      { account: 'بضاعة أول المدة (مخزون مكتبي وإلكتروني)', debit: 80000, credit: 0, type: 'ASSET' },
      { account: 'سيارة نقل وتوزيع بضاعة', debit: 90000, credit: 0, type: 'ASSET' },
      { account: 'أثاث وتجهيزات المعرض والمكتب', debit: 40000, credit: 0, type: 'ASSET' },
      { account: 'الموردون (شركة الأهرام للورق)', debit: 0, credit: 40000, type: 'LIABILITY' },
      { account: 'رأس مال صاحب المنشأة', debit: 0, credit: 350000, type: 'EQUITY' }
    ],
    transactions: [
      {
        id: 'tx-1',
        date: '2026-10-02',
        title: 'شراء بضاعة على الحساب بشروط ائتمانية (2/10 صافي 30)',
        documentType: 'فاتورة شراء',
        documentNumber: 'PUR-8821',
        amount: 50000,
        details: 'شراء شحنة طابعات ومستلزمات كمبيوتر من شركة القاهرة للتكنولوجيا بمبلغ 50,000 ج.م بخصم نقدي مشروط 2% إذا تم السداد خلال 10 أيام.',
        debitAccount: 'حساب المشتريات (50,000 ج.م)',
        creditAccount: 'حساب الموردين - شركة القاهرة للتكنولوجيا (50,000 ج.م)',
        jreJustification: 'طبقا للمبدأ المحاسبي لإثبات المشتريات، لا يسجل الخصم النقدي إلا عند تحقق واقعة السداد في المهلة المحددة، ويثبت الالتزام بكامل القيمة الاسمية للفاتورة.'
      },
      {
        id: 'tx-2',
        date: '2026-10-05',
        title: 'بيع بضاعة نقداً وبشيك مصرفي لعميل تجاري',
        documentType: 'فاتورة بيع',
        documentNumber: 'INV-1042',
        amount: 70000,
        details: 'بيع بضاعة بمبلغ 70,000 ج.م، تم تحصيل 30,000 ج.م نقداً وأودعت بالخزينة، والباقي 40,000 ج.م بموجب شيك مسحوب على بنك مصر أودع فورا بحساب المنشأة.',
        debitAccount: 'من مذكورين: ح/ الخزينة (30,000) و ح/ البنك (40,000)',
        creditAccount: 'إلى ح/ المبيعات (70,000 ج.م)',
        jreJustification: 'تحقق الإيراد بتسليم البضاعة وانتقال الملكية والمخاطر للمشتري، وتوزع التدفق النقدي بين الخزينة والبنك طبقاً لقسائم الإيداع.'
      },
      {
        id: 'tx-3',
        date: '2026-10-10',
        title: 'سداد المستحق لشركة القاهرة للتكنولوجيا واستحقاق الخصم المكتسب',
        documentType: 'إذن صرف نقدية',
        documentNumber: 'PAY-0312',
        amount: 50000,
        details: 'سداد قيمة الفاتورة PUR-8821 بشيك مصرفي خلال مهلة الخصم (8 أيام من الشراء)، حيث بلغ الخصم 2% = 1,000 ج.م، وصافي المسدد 49,000 ج.م.',
        debitAccount: 'حساب الموردين - شركة القاهرة (50,000 ج.م)',
        creditAccount: 'إلى مذكورين: ح/ البنك (49,000) و ح/ الخصم المكتسب (1,000)',
        jreJustification: 'يمثل الخصم المكتسب إيرادا تمويليا ناتجا عن سرعة السداد وتعجيل الدفع ويخفض التكلفة النقدية الفعلية المسددة من البنك.'
      },
      {
        id: 'tx-4',
        date: '2026-10-15',
        title: 'رد جزء من المبيعات لعدم مطابقة المواصفات (مردودات مبيعات)',
        documentType: 'إشعار خصم/إضافة',
        documentNumber: 'CN-004',
        amount: 5000,
        details: 'رد العميل بضاعة تالفة قيمتها 5,000 ج.م تم رد قيمتها للمشتري نقداً من الخزينة بموجب إذن صرف معتمد.',
        debitAccount: 'حساب مردودات ومسموحات المبيعات (5,000 ج.م)',
        creditAccount: 'حساب الخزينة (5,000 ج.م)',
        jreJustification: 'حساب مردودات المبيعات هو حساب مدين عكسي (Contra-Revenue) يخفض إجمالي المبيعات للوصول إلى صافي المبيعات.'
      },
      {
        id: 'tx-5',
        date: '2026-10-20',
        title: 'سداد مصروف صيانة دورية للسيارات ومصروف إيجار المعرض',
        documentType: 'إذن صرف نقدية',
        documentNumber: 'PAY-0345',
        amount: 14000,
        details: 'سداد 4,000 ج.م صيانة دورية لسيارات النقل (مصروف إيرادي) و 10,000 ج.م إيجار مقر المعرض نقداً عن شهري أكتوبر ونوفمبر.',
        debitAccount: 'من مذكورين: ح/ صيانة سيارات (4,000) و ح/ إيجار المعرض (10,000)',
        creditAccount: 'إلى ح/ الخزينة (14,000 ج.م)',
        jreJustification: 'الصيانة الدورية مصروف إيرادي يخص الفترة ولا يضيف طاقة إنتاجية للأصل، وإيجار المعرض عبء تشغيلي واجب الإثبات.'
      },
      {
        id: 'tx-6',
        date: '2026-10-28',
        title: 'شراء جهاز كمبيوتر خادم مركزي جديد بشيك بنكي (مصروف رأسمالي)',
        documentType: 'شيك مصرفي',
        documentNumber: 'CHQ-99021',
        amount: 25000,
        details: 'شراء سيرفر مركزي حديث لربط فروع التوزيع بمبلغ 25,000 ج.م بشيك مسحوب على البنك الأهلي المصري متضمناً مصاريف التركيب والتشغيل.',
        debitAccount: 'حساب أجهزة ومعدات إلكترونية (25,000 ج.م)',
        creditAccount: 'حساب البنك (25,000 ج.م)',
        jreJustification: 'يعد شراء السيرفر ومصاريف تركيبه نفقة رأسمالية تضاف لتكلفة الأصل الثابت لكونها تخدم فترات مالية مستقبلية متعددة.'
      }
    ],
    adjustingEntries: [
      {
        id: 'adj-1',
        targetAccount: 'حساب إيجار المعرض',
        category: 'مقدمات',
        description: 'اتضح أن مبلغ الإيجار المسدد (10,000 ج.م) يخص شهري أكتوبر ونوفمبر بالتساوي، وبذلك يخص شهر نوفمبر 5,000 ج.م مصروف مقدم.',
        unadjustedAmount: 10000,
        adjustmentAmount: 5000,
        adjustedAmount: 5000,
        entryDebit: 'ح/ الإيجار المدفوع مقدماً (5,000 ج.م)',
        entryCredit: 'ح/ مصروف الإيجار (5,000 ج.م)',
        explanation: 'تطبيق مبدأ مقابلة الإيرادات بالمصروفات والفترة المحاسبية لعزل ما يخص الفترات القادمة كأصل متداول.'
      },
      {
        id: 'adj-2',
        targetAccount: 'حساب مرتبات العاملين',
        category: 'مستحقات',
        description: 'المرتبات الشهرية للعاملين تبلغ 12,000 ج.م، ولم تسدد مرتبات الأسبوع الأخير من الشهر وقدرها 3,000 ج.م.',
        unadjustedAmount: 9000,
        adjustmentAmount: 3000,
        adjustedAmount: 12000,
        entryDebit: 'ح/ مصروف مرتبات العاملين (3,000 ج.م)',
        entryCredit: 'ح/ المرتبات المستحقة (3,000 ج.م)',
        explanation: 'إثبات العبء الكامل للفترة المالية كأساس استحقاق وتكوين التزام قصير الأجل على المنشأة.'
      },
      {
        id: 'adj-3',
        targetAccount: 'إهلاك الأصول الثابتة (سيارات النقل)',
        category: 'إهلاك',
        description: 'تقدر نسبة إهلاك سيارات النقل بواقع 20% سنوياً بطريقة القسط الثابت، وما يخص الشهر هو 1,500 ج.م.',
        unadjustedAmount: 0,
        adjustmentAmount: 1500,
        adjustedAmount: 1500,
        entryDebit: 'ح/ مصروف إهلاك سيارات النقل (1,500 ج.م)',
        entryCredit: 'ح/ مجمع إهلاك سيارات النقل (1,500 ج.م)',
        explanation: 'توزيع التكلفة التاريخية للسيارة على مدار عمرها الإنتاجي وإظهارها بالصافي الدفتري في المركز المالي.'
      },
      {
        id: 'adj-4',
        targetAccount: 'مخصص الديون المشكوك في تحصيلها',
        category: 'مخصصات',
        description: 'تقرر تكوين مخصص ديون مشكوك في تحصيلها بنسبة 5% من رصيد العملاء القائم البالغ 20,000 ج.م بمبلغ 1,000 ج.م.',
        unadjustedAmount: 0,
        adjustmentAmount: 1000,
        adjustedAmount: 1000,
        entryDebit: 'ح/ مصروف ديون مشكوك في تحصيلها (1,000 ج.م)',
        entryCredit: 'ح/ مخصص الديون المشكوك في تحصيلها (1,000 ج.م)',
        explanation: 'تطبيق مبدأ الحيطة والحذر (التحفظ المحاسبي) لمواجهة أية خسائر محتملة في تحصيل المستحقات.'
      }
    ],
    financialRatios: [
      {
        name: 'نسبة التداول (Current Ratio)',
        category: 'السيولة',
        formula: 'الأصول المتداولة ÷ الالتزامات المتداولة',
        calculatedValue: '2.85 مرة',
        benchmark: '2.0 : 1',
        interpretation: 'موقف سيولة قوي وممتاز؛ تمتلك المنشأة 2.85 جنيهاً من الأصول السائلة لتغطية كل جنيه واحد من الديون قصيرة الأجل.'
      },
      {
        name: 'نسبة السيولة السريعة (Quick Ratio)',
        category: 'السيولة',
        formula: '(الأصول المتداولة - المخزون) ÷ الالتزامات المتداولة',
        calculatedValue: '1.92 مرة',
        benchmark: '1.0 : 1',
        interpretation: 'المنشأة قادرة على سداد ديونها العاجلة دون الحاجة لانتظار تصريف أو بيع بضاعة المخزون.'
      },
      {
        name: 'هامش مجمل الربح (Gross Profit Margin)',
        category: 'الربحية',
        formula: '(مجمل الربح ÷ صافي المبيعات) × 100',
        calculatedValue: '36.9%',
        benchmark: '30% - 40%',
        interpretation: 'كفاءة تسعيرية مرتفعة وقدرة جيدة على تغطية تكلفة البضاعة المباعة مع تحقيق هامش أمان كاف.'
      },
      {
        name: 'هامش صافي الربح (Net Profit Margin)',
        category: 'الربحية',
        formula: '(صافي الربح ÷ صافي المبيعات) × 100',
        calculatedValue: '18.4%',
        benchmark: '12% - 15%',
        interpretation: 'مستوى ربحية مرتفع يعكس ترشيد المصروفات التشغيلية وضبط النفقات الإدارية والعمومية.'
      },
      {
        name: 'العائد على حقوق الملكية (ROE)',
        category: 'الربحية',
        formula: '(صافي الربح ÷ حقوق الملكية) × 100',
        calculatedValue: '14.2%',
        benchmark: '10% - 12%',
        interpretation: 'عائد مجزٍ على أموال صاحب المنشأة المستثمرة يفوق معدلات الفائدة البنكية السائدة.'
      },
      {
        name: 'نسبة المديونية لحقوق الملكية (Debt to Equity)',
        category: 'الرفع المالي',
        formula: 'إجمالي الالتزامات ÷ حقوق الملكية',
        calculatedValue: '0.22',
        benchmark: 'أقل من 0.50',
        interpretation: 'هيكل مالي متحفظ وآمن يعتمد بشكل أساسي على التمويل الذاتي بدون مخاطر ائتمانية حرجة.'
      }
    ]
  }
];

export interface CapstoneRubricCriterion {
  id: string;
  category: string;
  name: string;
  maxScore: number;
  indicators: string[];
}

export const capstoneRubric: CapstoneRubricCriterion[] = [
  {
    id: 'rub-1',
    category: 'التوثيق والدورة المستندية',
    name: 'صحة فحص وتدقيق المستندات المؤيدة للعمليات',
    maxScore: 15,
    indicators: [
      'التفرقة السليمة بين الفواتير والإيصالات وإشعارات التسوية',
      'تحديد أطراف العملية المحاسبية والمبالغ المعتمدة وفق شروط الدفع',
      'التحقق من صحة تواريخ الاستحقاق والخصم التجاري'
    ]
  },
  {
    id: 'rub-2',
    category: 'القيود والدفاتر المحاسبية',
    name: 'صياغة قيود اليومية والترحيل لدفاتر الأستاذ',
    maxScore: 25,
    indicators: [
      'تطبيق قاعدة القيد المزدوج بدقة تامة (تساوي الطرفين المدين والدائن)',
      'الترحيل الصحيح إلى حسابات الأستاذ العام وترصيدها بدقة',
      'إعداد ميزان المراجعة بالمجاميع والأرصدة وتفسير الفروق'
    ]
  },
  {
    id: 'rub-3',
    category: 'التسويات الجردية والرقابة',
    name: 'إعداد قيود التسويات ومعالجة الحساب المعلق',
    maxScore: 25,
    indicators: [
      'تحديد نصيب الفترة المالية من المصروفات والإيرادات (مقدمات ومستحقات)',
      'حساب الإهلاك بدقة وإثباته في مجمع الإهلاك المخصص',
      'معالجة أي خلل في توازن ميزان المراجعة وتصفية الحساب المعلق'
    ]
  },
  {
    id: 'rub-4',
    category: 'القوائم المالية والتحليل',
    name: 'إعداد قائمتي الدخل والمركز المالي والتحليل بالنسب',
    maxScore: 20,
    indicators: [
      'إعداد قائمة دخل متعددة الخطوات مبوبة بشكل سليم',
      'إعداد قائمة المركز المالي وفق التبويب المعياري للأصول والخصوم',
      'احتساب نسب السيولة والربحية والرفع المالي وتفسير دلالتها'
    ]
  },
  {
    id: 'rub-5',
    category: 'التفسير المحاسبي والعرض المهني',
    name: 'صياغة تقرير JRE والالتزام بالأعراف المهنية المصرية',
    maxScore: 15,
    indicators: [
      'تطبيق هيكلية JRE (حكم مهني + تعليل منطقي + مستند مؤيد)',
      'سلامة الصياغة اللغوية والمصطلحات المحاسبية المعتمدة',
      'التنظيم العام لملف الإنجاز الرقمي واستيفاء متطلبات التوجيه الفني'
    ]
  }
];
