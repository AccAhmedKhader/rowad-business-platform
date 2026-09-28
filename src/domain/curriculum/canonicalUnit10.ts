import { UnitSpec } from './CurriculumModel';

export const CANONICAL_UNIT_10: UnitSpec = {
  id: "unit-10",
  unitNumber: 10,
  subjectCode: "ACC.U10",
  titleAr: "الوحدة العاشرة: تحليل القوائم المالية وتفسيرها",
  descriptionAr: "نسب الربحية والسيولة والكفاءة • المقارنة واتخاذ القرار • القيود ومحددات التحليل • الحكم والاستدلال JRE",
  totalNominalMarks: 100,
  reviewItemIds: [
    "u10-outcome-1", "u10-outcome-2", "u10-outcome-3", "u10-outcome-4", "u10-outcome-5", "u10-outcome-6",
    "u10-step-1", "u10-step-2", "u10-step-3", "u10-step-4", "u10-step-5", "u10-step-6",
    "u10-case-step-1", "u10-case-step-2", "u10-case-step-3", "u10-case-step-4",
    "err-10-1", "err-10-2", "err-10-3", "err-10-4",
    "JRE-U10-CASE-1"
  ],
  questionIds: [
    'U10-Q-001',
    'U10-Q-002',
    'U10-Q-003',
    'U10-Q-004',
    'U10-Q-005',
    'U10-Q-006',
    'U10-Q-007',
    'U10-Q-008',
    'U10-Q-009',
    'U10-Q-010',
    'U10-Q-011',
    'U10-Q-012',
    'U10-Q-013',
    'U10-Q-014',
    'U10-Q-015',
    'U10-Q-016',
    'U10-Q-017',
    'U10-Q-018',
    'U10-Q-019',
    'U10-Q-020',
    'U10-Q-021',
    'U10-Q-022',
    'U10-Q-023',
    'U10-Q-024',
    'U10-Q-025',
    'U10-Q-026',
    'U10-Q-027',
    'U10-Q-028',
    'U10-Q-029',
    'U10-Q-030',
    'U10-Q-031',
    'U10-Q-032',
    'U10-Q-033',
    'U10-Q-034',
    'U10-Q-035',
    'U10-Q-036'
  ],
  lessons: [
    {
      id: "lesson-1",
      lessonNumber: 1,
      unitId: "unit-10",
      titleAr: "مقدمة في التحليل المالي ودعم اتخاذ القرار",
      subtitleAr: "التحليل المالي كأداة لدعم القرار، والتمييز بين الحساب والتفسير والحكم",
      textbookPages: [93, 105],
      nominalWeight: 15,
      hasExercises: true,
      questionIds: ['U10-Q-001', 'U10-Q-007', 'U10-Q-008', 'U10-Q-009', 'U10-Q-010', 'U10-Q-011'],
      objectives: [
        {
          id: "obj-10-1-1",
          code: "LO-U10.1",
          lessonId: "lesson-1",
          titleAr: "يوضح مفهوم التحليل المالي وأهميته لمختلف فئات المستفيدين الداخليين والخارجيين (مستثمرون، دائنون، إدارة).",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 94,
          primaryMisconceptions: [
            "اعتقاد أن التحليل المالي مجرد حسابات آلية للأرقام وليس عملية تفسير مهني لدعم القرار."
          ],
          conceptIds: ["concept-u10-intro-purpose"],
          isJRERequired: false
        },
        {
          id: "obj-10-1-2",
          code: "LO-U10.2",
          lessonId: "lesson-1",
          titleAr: "يميز بدقة بين المستويات الثلاثة: الاستخراج الحسابي للنسب، التفسير المحاسبي لدلالاتها، وإصدار الحكم الاستثماري أو الإداري.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 8,
          bookPageRef: 98,
          primaryMisconceptions: [
            "الاكتفاء بحساب النسبة دون بيان دلالتها المحاسبية أو اتخاذ قرار مبرر بناءً عليها."
          ],
          conceptIds: ["concept-u10-three-levels"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u10-intro-purpose", titleAr: "مفهوم التحليل المالي وأهدافه لمستخدمي القوائم", relatedObjectiveIds: ["obj-10-1-1"] },
        { id: "concept-u10-three-levels", titleAr: "المستويات الثلاثة: الحساب، التفسير، والحكم", relatedObjectiveIds: ["obj-10-1-2"] }
      ],
      skills: [
        { id: "skill-10-1-1", titleAr: "التمييز بين الحساب الآلي والتفسير الدلالي وصياغة التوصيات الإدارية", taxonomy: "Analyze", relatedObjectiveIds: ["obj-10-1-1", "obj-10-1-2"] }
      ]
    },
    {
      id: "lesson-2",
      lessonNumber: 2,
      unitId: "unit-10",
      titleAr: "تحليل الربحية والتحكم بالتكاليف",
      subtitleAr: "هامش مجمل الربح وهامش صافي الربح وتفسير الفجوة بينهما",
      textbookPages: [106, 120],
      nominalWeight: 15,
      hasExercises: true,
      questionIds: ['U10-Q-002', 'U10-Q-012', 'U10-Q-013', 'U10-Q-014', 'U10-Q-015', 'U10-Q-016'],
      objectives: [
        {
          id: "obj-10-2-1",
          code: "LO-U10.3",
          lessonId: "lesson-2",
          titleAr: "يحسب هامش مجمل الربح بدقة ويفسر دلالته على كفاءة التسعير والتحكم في تكلفة البضاعة المباعة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 108,
          primaryMisconceptions: [
            "قسمة مجمل الربح على إجمالي التكاليف بدلاً من صافي المبيعات (الإيرادات)."
          ],
          conceptIds: ["concept-u10-gross-margin"],
          isJRERequired: false
        },
        {
          id: "obj-10-2-2",
          code: "LO-U10.4",
          lessonId: "lesson-2",
          titleAr: "يحسب هامش صافي الربح ويفسر الفجوة بينه وبين هامش مجمل الربح مع تحليل عبء المصروفات التشغيلية والإدارية.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 8,
          bookPageRef: 114,
          primaryMisconceptions: [
            "إغفال أثر المصروفات الإدارية والبيعية عند تبرير انخفاض صافي الربح رغم ارتفاع مجمل الربح."
          ],
          conceptIds: ["concept-u10-net-margin"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u10-gross-margin", titleAr: "هامش مجمل الربح وكفاءة التسعير وتكلفة المبيعات", relatedObjectiveIds: ["obj-10-2-1"] },
        { id: "concept-u10-net-margin", titleAr: "هامش صافي الربح وتحليل عبء المصروفات التشغيلية", relatedObjectiveIds: ["obj-10-2-2"] }
      ],
      skills: [
        { id: "skill-10-2-1", titleAr: "حساب مؤشرات الربحية وتحليل أسباب التباين بين الهامش الإجمالي والصافي", taxonomy: "Analyze", relatedObjectiveIds: ["obj-10-2-1", "obj-10-2-2"] }
      ]
    },
    {
      id: "lesson-3",
      lessonNumber: 3,
      unitId: "unit-10",
      titleAr: "تحليل السيولة والأمان المالي قصير الأجل",
      subtitleAr: "نسبة التداول ورأس المال العامل والمفاضلة بين المؤشر المطلق والنسبي",
      textbookPages: [121, 135],
      nominalWeight: 20,
      hasExercises: true,
      questionIds: ['U10-Q-003', 'U10-Q-017', 'U10-Q-018', 'U10-Q-019', 'U10-Q-020', 'U10-Q-021'],
      objectives: [
        {
          id: "obj-10-3-1",
          code: "LO-U10.5",
          lessonId: "lesson-3",
          titleAr: "يحسب نسبة التداول بدقة ويقيم قدرة المنشأة على تغطية التزاماتها قصيرة الأجل من أصولها المتداولة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 10,
          bookPageRef: 123,
          primaryMisconceptions: [
            "خلط الأصول والالتزامات غير المتداولة (طويلة الأجل) ضمن حساب نسبة التداول."
          ],
          conceptIds: ["concept-u10-current-ratio"],
          isJRERequired: false
        },
        {
          id: "obj-10-3-2",
          code: "LO-U10.6",
          lessonId: "lesson-3",
          titleAr: "يحسب رأس المال العامل ويقارن بين دلالة المقياس المطلق (الجنيهات) والمقياس النسبي (نسبة التداول) عند المفاضلة بين الشركات.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 10,
          bookPageRef: 128,
          primaryMisconceptions: [
            "الاعتقاد بأن كبر حجم رأس المال العامل المطلق يعني حتماً أماناً مالياً أعلى دون النظر لنسبة التداول وحجم الالتزامات."
          ],
          conceptIds: ["concept-u10-working-capital"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u10-current-ratio", titleAr: "نسبة التداول وتغطية الديون قصيرة الأجل", relatedObjectiveIds: ["obj-10-3-1"] },
        { id: "concept-u10-working-capital", titleAr: "رأس المال العامل: مقارنة المقياس المطلق والنسبي", relatedObjectiveIds: ["obj-10-3-2"] }
      ],
      skills: [
        { id: "skill-10-3-1", titleAr: "حساب مؤشرات السيولة وتقييم المخاطر المالية قصيرة الأجل بدقة وموثوقية", taxonomy: "Analyze", relatedObjectiveIds: ["obj-10-3-1", "obj-10-3-2"] }
      ]
    },
    {
      id: "lesson-4",
      lessonNumber: 4,
      unitId: "unit-10",
      titleAr: "تحليل الكفاءة وإدارة المخزون السلعي",
      subtitleAr: "معدل دوران المخزون، فترة الاحتفاظ بالأيام، وتكلفة الركود",
      textbookPages: [136, 150],
      nominalWeight: 20,
      hasExercises: true,
      questionIds: ['U10-Q-004', 'U10-Q-022', 'U10-Q-023', 'U10-Q-024', 'U10-Q-025', 'U10-Q-026'],
      objectives: [
        {
          id: "obj-10-4-1",
          code: "LO-U10.7",
          lessonId: "lesson-4",
          titleAr: "يحسب معدل دوران المخزون باستخدام تكلفة المبيعات ويفسر سرعة تصريف المخزون وتفادي تجميد السيولة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 10,
          bookPageRef: 138,
          primaryMisconceptions: [
            "استخدام المبيعات بسعر البيع في بسط معدل دوران المخزون بدلاً من تكلفة المبيعات."
          ],
          conceptIds: ["concept-u10-inventory-turnover"],
          isJRERequired: false
        },
        {
          id: "obj-10-4-2",
          code: "LO-U10.8",
          lessonId: "lesson-4",
          titleAr: "يحسب فترة الاحتفاظ بالمخزون بالأيام ويوضح العلاقة العكسية بين معدل الدوران وفترة التخزين ومخاطر تقادم البضاعة.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 10,
          bookPageRef: 144,
          primaryMisconceptions: [
            "ظن أن طول فترة الاحتفاظ بالمخزون يعكس قوة المنشأة، في حين أنه يشير غالباً لبطء التصريف وتراكم المخزون."
          ],
          conceptIds: ["concept-u10-days-in-inventory"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u10-inventory-turnover", titleAr: "معدل دوران المخزون على أساس تكلفة المبيعات", relatedObjectiveIds: ["obj-10-4-1"] },
        { id: "concept-u10-days-in-inventory", titleAr: "فترة الاحتفاظ بالمخزون ومخاطر الركود والتقادم", relatedObjectiveIds: ["obj-10-4-2"] }
      ],
      skills: [
        { id: "skill-10-4-1", titleAr: "حساب مؤشرات إدارة المخزون وتقييم كفاءة دورة التشغيل ورأس المال المستثمر", taxonomy: "Analyze", relatedObjectiveIds: ["obj-10-4-1", "obj-10-4-2"] }
      ]
    },
    {
      id: "lesson-5",
      lessonNumber: 5,
      unitId: "unit-10",
      titleAr: "المقارنة واتخاذ القرار وقيود التحليل المالي",
      subtitleAr: "المقارنة متعددة المؤشرات بين المنشآت ومحددات القوائم المالية المحاسبية",
      textbookPages: [151, 165],
      nominalWeight: 15,
      hasExercises: true,
      questionIds: ['U10-Q-005', 'U10-Q-027', 'U10-Q-028', 'U10-Q-029', 'U10-Q-030', 'U10-Q-031'],
      objectives: [
        {
          id: "obj-10-5-1",
          code: "LO-U10.9",
          lessonId: "lesson-5",
          titleAr: "يقارن بين منشأتين متنافستين باستخدام حزمة نسب متكاملة (ربحية، سيولة، كفاءة) لتحديد نقاط القوة والضعف المالية.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 7,
          bookPageRef: 153,
          primaryMisconceptions: [
            "إصدار حكم عام وشامل على المنشأة بالاعتماد على نسبة مالية واحدة بمعزل عن باقي الحزمة."
          ],
          conceptIds: ["concept-u10-comparative-package"],
          isJRERequired: false
        },
        {
          id: "obj-10-5-2",
          code: "LO-U10.10",
          lessonId: "lesson-5",
          titleAr: "يحدد ويناقش القيود الجوهرية للتحليل المالي (بيانات تاريخية، اختلاف السياسات المحاسبية، أثر التضخم، الجوانب غير المالية).",
          taxonomy: "Evaluate",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 8,
          bookPageRef: 159,
          primaryMisconceptions: [
            "التعامل مع النسب المالية كأدوات تنبؤ يقينية معصومة دون اعتبار لقيود السياسات المحاسبية والتغير في القوة الشرائية."
          ],
          conceptIds: ["concept-u10-analysis-limitations"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u10-comparative-package", titleAr: "التحليل المقارن باستخدام حزمة النسب المتكاملة", relatedObjectiveIds: ["obj-10-5-1"] },
        { id: "concept-u10-analysis-limitations", titleAr: "محددات وقيود التحليل المالي المحاسبية والنوعية", relatedObjectiveIds: ["obj-10-5-2"] }
      ],
      skills: [
        { id: "skill-10-5-1", titleAr: "إجراء مقارنات مالية متعددة الأبعاد وتقييم القيود الحاكمة للنتائج", taxonomy: "Evaluate", relatedObjectiveIds: ["obj-10-5-1", "obj-10-5-2"] }
      ]
    },
    {
      id: "lesson-6",
      lessonNumber: 6,
      unitId: "unit-10",
      titleAr: "الحكم والاستدلال المحاسبي المبرر (JRE 10)",
      subtitleAr: "تقييم قرار استثماري مقارن، سلّم الـ 20 درجة، وصياغة مقال JRE متوازن",
      textbookPages: [166, 180],
      nominalWeight: 15,
      hasExercises: true,
      questionIds: ['U10-Q-006', 'U10-Q-032', 'U10-Q-033', 'U10-Q-034', 'U10-Q-035', 'U10-Q-036'],
      objectives: [
        {
          id: "obj-10-6-1",
          code: "LO-U10.11",
          lessonId: "lesson-6",
          titleAr: "يقيّم موثوقية النسب المالية في اتخاذ القرارات الاستثمارية ويفند أوهام اليقين الرياضي المطلق للأرقام.",
          taxonomy: "Evaluate",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 7,
          bookPageRef: 168,
          primaryMisconceptions: [
            "اعتبار أن تفوق شركة في هامش الربح كافٍ للاستثمار فيها دون فحص السيولة أو قيود القوائم المالية."
          ],
          conceptIds: ["concept-u10-reliability-assessment"],
          isJRERequired: true
        },
        {
          id: "obj-10-6-2",
          code: "LO-U10.12",
          lessonId: "lesson-6",
          titleAr: "يصيغ مقال الاستدلال والتفسير المحاسبي (JRE) بأركانه الأربعة وسلّم الـ 20 درجة مدعماً بأدلة رقمية ومبرزاً القيود المحاسبية.",
          taxonomy: "Create",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 8,
          bookPageRef: 174,
          primaryMisconceptions: [
            "صياغة رأي انطباعي دون تدعيمه بأدلة رقمية مقارنة واعتراف صريح بالمحددات والافتراضات البديلة."
          ],
          conceptIds: ["concept-u10-jre-essay-craft"],
          isJRERequired: true
        }
      ],
      concepts: [
        { id: "concept-u10-reliability-assessment", titleAr: "تقييم موثوقية النسب ودور المعطيات غير المالية", relatedObjectiveIds: ["obj-10-6-1"] },
        { id: "concept-u10-jre-essay-craft", titleAr: "صياغة مقال JRE متوازن وفق الأركان الأربعة وسلّم الـ 20 درجة", relatedObjectiveIds: ["obj-10-6-2"] }
      ],
      skills: [
        { id: "skill-10-6-1", titleAr: "صياغة مقال تفسير واستدلال مالي متقدم (JRE) بمستوى البكالوريا المصرية المتطورة", taxonomy: "Create", relatedObjectiveIds: ["obj-10-6-1", "obj-10-6-2"] }
      ]
    }
  ]
};
