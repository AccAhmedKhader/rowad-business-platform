import { UnitSpec } from './CurriculumModel';

export const CANONICAL_UNIT_5: UnitSpec = {
  id: "unit-5",
  unitNumber: 5,
  subjectCode: "ACC.U5",
  titleAr: "الوحدة الخامسة: القوائم المالية للمنشأة الفردية",
  descriptionAr: "حساب المتاجرة ومجمل الربح • حساب الأرباح والخسائر وصافي الربح • تسويات نهاية الفترة • قائمة المركز المالي ورأس المال آخر الفترة • تحليل النسب والتطبيق المتكامل • التفسير المدعوم بالأدلة JRE",
  totalNominalMarks: 100,
  lessons: [
    {
      id: "lesson-1",
      lessonNumber: 1,
      unitId: "unit-5",
      titleAr: "حساب المتاجرة ومجمل الربح",
      subtitleAr: "صافي المبيعات، صافي المشتريات، البضاعة المتاحة للبيع، وتكلفة البضاعة المباعة",
      textbookPages: [116, 122],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-5-1-1",
          code: "LO-U5.1",
          lessonId: "lesson-1",
          titleAr: "يحسب صافي المبيعات وصافي المشتريات وتكلفة البضاعة المباعة ويعد حساب المتاجرة لاستخراج مجمل الربح.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "basic",
          weightPercentage: 10,
          bookPageRef: 116,
          primaryMisconceptions: [
            "طرح المشتريات مباشرة من المبيعات دون معالجة مخزون أول وآخر المدة.",
            "اعتبار مخزون آخر المدة مصروفًا بدلاً من أصل متداول."
          ],
          conceptIds: ["concept-u5-trading-account", "concept-u5-cogs"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u5-trading-account", titleAr: "حساب المتاجرة ومجمل الربح", relatedObjectiveIds: ["obj-5-1-1"] },
        { id: "concept-u5-cogs", titleAr: "تكلفة البضاعة المباعة ومعالجة المخزون", relatedObjectiveIds: ["obj-5-1-1"] }
      ],
      skills: [
        { id: "skill-5-1-1", titleAr: "إعداد حساب المتاجرة ذي العمودين والعرض الرأسي", taxonomy: "Apply", relatedObjectiveIds: ["obj-5-1-1"] }
      ]
    },
    {
      id: "lesson-2",
      lessonNumber: 2,
      unitId: "unit-5",
      titleAr: "حساب الأرباح والخسائر وصافي الربح",
      subtitleAr: "المصروفات التشغيلية، الفرق بين مجمل وصافي الربح، واستخراج النتيجة النهائية للنشاط",
      textbookPages: [123, 128],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-5-2-1",
          code: "LO-U5.2",
          lessonId: "lesson-2",
          titleAr: "يفرّق بين مجمل الربح وصافي الربح ويعد حساب الأرباح والخسائر ويفسر عدم تطابق الربح المحاسبي مع النقدية.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "intermediate",
          weightPercentage: 10,
          bookPageRef: 123,
          primaryMisconceptions: [
            "اعتبار مجمل الربح هو صافي الربح دون خصم المصروفات التشغيلية والإدارية.",
            "مطابقة صافي الربح المحاسبي مع النقدية المتاحة في الخزينة أو البنك."
          ],
          conceptIds: ["concept-u5-pl-account", "concept-u5-operating-expenses"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u5-pl-account", titleAr: "حساب الأرباح والخسائر وصافي الربح", relatedObjectiveIds: ["obj-5-2-1"] },
        { id: "concept-u5-operating-expenses", titleAr: "المصروفات التشغيلية والبنود غير النقدية", relatedObjectiveIds: ["obj-5-2-1"] }
      ],
      skills: [
        { id: "skill-5-2-1", titleAr: "استخراج صافي الربح وإعداد قائمة الدخل التشغيلية", taxonomy: "Apply", relatedObjectiveIds: ["obj-5-2-1"] }
      ]
    },
    {
      id: "lesson-3",
      lessonNumber: 3,
      unitId: "unit-5",
      titleAr: "تسويات نهاية الفترة",
      subtitleAr: "أساس الاستحقاق ومبدأ المقابلة: المصروف المستحق، المدفوع مقدمًا، الإهلاك، والديون المعدومة",
      textbookPages: [129, 137],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-5-3-1",
          code: "LO-U5.3",
          lessonId: "lesson-3",
          titleAr: "يعالج التسويات الجردية الأربعة ويوضح أثر كل تسوية على حساب الأرباح والخسائر وقائمة المركز المالي.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 12,
          bookPageRef: 129,
          primaryMisconceptions: [
            "تسجيل المصروف المستحق كأصل بدلاً من التزام متداول.",
            "خصم كامل المصروف المدفوع مقدماً على الفترة الحالية دون فصل المنافع المستقبلية.",
            "اعتبار الإهلاك غير حقيقي لعدم وجود تدفق نقدي خارج عند تسجيله."
          ],
          conceptIds: ["concept-u5-accruals-prepayments", "concept-u5-depreciation-bad-debts"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u5-accruals-prepayments", titleAr: "المصروفات المستحقة والمدفوعة مقدماً", relatedObjectiveIds: ["obj-5-3-1"] },
        { id: "concept-u5-depreciation-bad-debts", titleAr: "الإهلاك ومجمع الإهلاك والديون المعدومة", relatedObjectiveIds: ["obj-5-3-1"] }
      ],
      skills: [
        { id: "skill-5-3-1", titleAr: "صياغة قيود التسوية الجردية وتحديد أثرها المزدوج", taxonomy: "Apply", relatedObjectiveIds: ["obj-5-3-1"] }
      ]
    },
    {
      id: "lesson-4",
      lessonNumber: 4,
      unitId: "unit-5",
      titleAr: "قائمة المركز المالي ورأس المال آخر الفترة",
      subtitleAr: "المعادلة المحاسبية، تصنيف الأصول والالتزامات، والتحقق المنهجي من توازن القائمة",
      textbookPages: [138, 145],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-5-4-1",
          code: "LO-U5.4",
          lessonId: "lesson-4",
          titleAr: "يحسب رأس المال آخر الفترة ويعد قائمة المركز المالي ويتحقق من توازنها ويكتشف أسباب عدم التوازن.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 12,
          bookPageRef: 138,
          primaryMisconceptions: [
            "تعديل رقم عشوائي لإجبار القائمة على التوازن الحسابي.",
            "عرض الأصول الثابتة بالتكلفة التاريخية دون خصم مجمع الإهلاك المتراكم."
          ],
          conceptIds: ["concept-u5-balance-sheet", "concept-u5-ending-capital"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u5-balance-sheet", titleAr: "قائمة المركز المالي والمعادلة المحاسبية", relatedObjectiveIds: ["obj-5-4-1"] },
        { id: "concept-u5-ending-capital", titleAr: "حساب رأس المال آخر الفترة وتعديلاته", relatedObjectiveIds: ["obj-5-4-1"] }
      ],
      skills: [
        { id: "skill-5-4-1", titleAr: "إعداد قائمة المركز المالي وفحص أسباب عدم التوازن", taxonomy: "Analyze", relatedObjectiveIds: ["obj-5-4-1"] }
      ]
    },
    {
      id: "lesson-5",
      lessonNumber: 5,
      unitId: "unit-5",
      titleAr: "تحليل النسب والتطبيق المتكامل",
      subtitleAr: "هامش مجمل الربح، هامش صافي الربح، نسبة التداول، وترتيب خطوات الحل في الامتحان",
      textbookPages: [146, 153],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-5-5-1",
          code: "LO-U5.5",
          lessonId: "lesson-5",
          titleAr: "يحسب ويفسر هوامش الربحية ونسبة التداول ويطبق خطوات الحل المتكامل وشجرة قرار التسويات في الامتحان.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "advanced",
          weightPercentage: 10,
          bookPageRef: 146,
          primaryMisconceptions: [
            "الاكتفاء بحساب النسبة كرقم مجرد دون تقديم تفسير تحليلي لسياق أداء المنشأة.",
            "مقارنة الأرقام المطلقة بدلاً من النسب المئوية بين منشآت مختلفة الحجم."
          ],
          conceptIds: ["concept-u5-financial-ratios", "concept-u5-integrated-exam-workflow"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u5-financial-ratios", titleAr: "النسب المالية: الربحية والسيولة والتداول", relatedObjectiveIds: ["obj-5-5-1"] },
        { id: "concept-u5-integrated-exam-workflow", titleAr: "خريطة الحل المتكامل وشجرة قرار التسويات", relatedObjectiveIds: ["obj-5-5-1"] }
      ],
      skills: [
        { id: "skill-5-5-1", titleAr: "تحليل وتفسير هوامش الربحية والسيولة التداولية", taxonomy: "Evaluate", relatedObjectiveIds: ["obj-5-5-1"] }
      ]
    },
    {
      id: "lesson-6",
      lessonNumber: 6,
      unitId: "unit-5",
      titleAr: "التفسير المدعوم بالأدلة JRE",
      subtitleAr: "هل تعكس القوائم المالية الواقع الاقتصادي بعدالة أم تقدم تفسيرًا تحكمه السياسات والتقديرات المحاسبية؟",
      textbookPages: [154, 160],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-5-6-1",
          code: "LO-U5.6",
          lessonId: "lesson-6",
          titleAr: "يبني مرافعة نقدية محاسبية متوازنة (JRE) تقيّم حدود وعدالة القوائم المالية استناداً لدراستي حالة وهم الربح وشركة النور.",
          taxonomy: "Evaluate",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 10,
          bookPageRef: 154,
          primaryMisconceptions: [
            "الاعتقاد بأن القوائم المالية نسخة حرفية مطلقة ومجردة من أي تقدير مهني أو افتراضات سياسية.",
            "إغفال أثر التقديرات (كالإهلاك والمخصصات وتقييم المخزون) على صافي الربح المعلن."
          ],
          conceptIds: ["concept-u5-jre-representation-vs-estimates"],
          isJRERequired: true
        }
      ],
      concepts: [
        { id: "concept-u5-jre-representation-vs-estimates", titleAr: "الواقع الاقتصادي مقابل السياسات والتقديرات المحاسبية", relatedObjectiveIds: ["obj-5-6-1"] }
      ],
      skills: [
        { id: "skill-5-6-1", titleAr: "بناء حجة JRE متوازنة مدعومة بالأدلة المحاسبية وفق سلّم التقدير", taxonomy: "Evaluate", relatedObjectiveIds: ["obj-5-6-1"] }
      ]
    }
  ]
};
