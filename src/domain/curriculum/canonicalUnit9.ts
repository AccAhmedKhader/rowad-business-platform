import { UnitSpec } from './CurriculumModel';

export const CANONICAL_UNIT_9: UnitSpec = {
  id: "unit-9",
  unitNumber: 9,
  subjectCode: "ACC.U9",
  titleAr: "الوحدة التاسعة: محاسبة شركات الأموال (المساهمة)",
  descriptionAr: "تكوين رأس المال والأسهم النقدية • الاكتتاب في الأسهم على أقساط ومعالجة المتأخرين • الاكتتاب بزيادة وعلاوة الإصدار • إصدار السندات وعلاوة وخصم الإصدار • توزيع الأرباح والاحتياطيات • التطبيق الشامل وهيكل التمويل (JRE 9)",
  totalNominalMarks: 100,
  questionIds: [
    'unified-u9-q01',
    'unified-u9-q02',
    'unified-u9-q03',
    'unified-u9-q04',
    'unified-u9-q05',
    'unified-u9-q06',
    'unified-u9-q07',
    'unified-u9-q08',
    'unified-u9-q09',
    'unified-u9-q10',
    'unified-u9-q11',
    'unified-u9-q12',
    'unified-u9-q13',
    'unified-u9-q14',
    'unified-u9-q15',
    'unified-u9-q16',
    'unified-u9-q17',
    'unified-u9-q18',
    'unified-u9-q19',
    'unified-u9-q20',
    'unified-u9-q21',
    'unified-u9-q22',
    'unified-u9-q23',
    'unified-u9-q24',
    'unified-u9-q25',
    'unified-u9-q26',
    'unified-u9-q27',
    'unified-u9-q28',
    'unified-u9-q29',
    'unified-u9-q30',
    'unified-u9-q31',
    'unified-u9-q32',
    'unified-u9-q33',
    'unified-u9-q34',
    'unified-u9-q35',
    'unified-u9-q36'
  ],
  lessons: [
    {
      id: "lesson-1",
      hasExercises: true,
      questionIds: ['unified-u9-q01', 'unified-u9-q02', 'unified-u9-q03', 'unified-u9-q04', 'unified-u9-q05', 'unified-u9-q06'],
      lessonNumber: 1,
      unitId: "unit-9",
      titleAr: "طبيعة الشركات المساهمة وتكوين رأس المال",
      subtitleAr: "خصائص شركات الأموال، الأسهم العادية والممتازة، وإصدار الأسهم نقداً دفعة واحدة",
      textbookPages: [1, 14],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-9-1-1",
          code: "LO-U9.1",
          lessonId: "lesson-1",
          titleAr: "يشرح الخصائص الجوهرية للشركات المساهمة ويميز بين رأس المال المرخص به والمصدر والمدفوع.",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "basic",
          weightPercentage: 5,
          bookPageRef: 3,
          primaryMisconceptions: [
            "الاعتقاد بأن رأس المال المرخص به يُسجل بقيد محاسبي في دفاتر اليومية."
          ],
          conceptIds: ["concept-u9-corporation-nature"],
          isJRERequired: false
        },
        {
          id: "obj-9-1-2",
          code: "LO-U9.2",
          lessonId: "lesson-1",
          titleAr: "يقارن بين الأسهم العادية والأسهم الممتازة من حيث حقوق التصويت، أولوية الأرباح، وتصفية الأصول.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "intermediate",
          weightPercentage: 5,
          bookPageRef: 7,
          primaryMisconceptions: [
            "اعتبار الأسهم الممتازة جزءاً من الالتزامات والديون بدلاً من حقوق الملكية."
          ],
          conceptIds: ["concept-u9-share-classes"],
          isJRERequired: false
        },
        {
          id: "obj-9-1-3",
          code: "LO-U9.3",
          lessonId: "lesson-1",
          titleAr: "يسجل قيود اليومية لإصدار الأسهم النقدية دفعة واحدة بالقيمة الاسمية وتخصيصها للمكتتبين.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "basic",
          weightPercentage: 5,
          bookPageRef: 11,
          primaryMisconceptions: [
            "تسجيل قيد رأس المال مباشرة من حـ/ البنك دون توسيط حساب المكتتبين في الأسهم."
          ],
          conceptIds: ["concept-u9-lump-sum-issuance"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u9-corporation-nature", titleAr: "الخصائص القانونية والمالية لشركات المساهمة", relatedObjectiveIds: ["obj-9-1-1"] },
        { id: "concept-u9-share-classes", titleAr: "أنواع الأسهم ورأس المال المرخص والمصدر والمدفوع", relatedObjectiveIds: ["obj-9-1-2"] },
        { id: "concept-u9-lump-sum-issuance", titleAr: "قيود إصدار الأسهم دفعة واحدة بالقيمة الاسمية", relatedObjectiveIds: ["obj-9-1-3"] }
      ],
      skills: [
        { id: "skill-9-1-1", titleAr: "إجراء قيود الاكتتاب والإصدار للأسهم النقدية المسددة بالكامل", taxonomy: "Apply", relatedObjectiveIds: ["obj-9-1-3"] }
      ]
    },
    {
      id: "lesson-2",
      hasExercises: true,
      questionIds: ['unified-u9-q07', 'unified-u9-q08', 'unified-u9-q09', 'unified-u9-q10', 'unified-u9-q11', 'unified-u9-q12'],
      lessonNumber: 2,
      unitId: "unit-9",
      titleAr: "الاكتتاب على أقساط ومعالجة المساهمين المتأخرين",
      subtitleAr: "أقساط الأسهم (اكتتاب، تخصيص، أول، أخير) وبيع أسهم المساهم المتأخر وتسوية حسابه",
      textbookPages: [15, 30],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-9-2-1",
          code: "LO-U9.4",
          lessonId: "lesson-2",
          titleAr: "يثبت قيود طلب وتحصيل أقساط الأسهم (قسط الاكتتاب، قسط التخصيص، القسط الأول والأخير).",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 17,
          primaryMisconceptions: [
            "طلب قسط الاكتتاب بقيد طلب؛ بينما قسط الاكتتاب يُحصل فوراً في البنك قبل الإصدار."
          ],
          conceptIds: ["concept-u9-installments-accounting"],
          isJRERequired: false
        },
        {
          id: "obj-9-2-2",
          code: "LO-U9.5",
          lessonId: "lesson-2",
          titleAr: "يعالج محاسبياً تأخر بعض المساهمين عن سداد الأقساط وإثبات مبالغ المتأخرات في القيود والميزانية.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 6,
          bookPageRef: 22,
          primaryMisconceptions: [
            "تخفيض رأس المال فور تأخر المساهم بدلاً من إثبات المتأخرات في حساب القسط أو حـ/ مساهم متأخر."
          ],
          conceptIds: ["concept-u9-defaulting-shareholders"],
          isJRERequired: false
        },
        {
          id: "obj-9-2-3",
          code: "LO-U9.6",
          lessonId: "lesson-2",
          titleAr: "يسجل بيع أسهم المساهم المتأخر بالمزاد العلني وتسوية مصاريف البيع وفوائد التأخير ورد المتبقي له.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "advanced",
          weightPercentage: 7,
          bookPageRef: 27,
          primaryMisconceptions: [
            "مصادرة كامل حصيلة بيع الأسهم بدلاً من رد الفائض للمساهم المتأخر بعد سداد ديونه ومصاريفه."
          ],
          conceptIds: ["concept-u9-forfeited-shares-sale"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u9-installments-accounting", titleAr: "نظام الأقساط وطلب وتحصيل أقساط رأس المال", relatedObjectiveIds: ["obj-9-2-1"] },
        { id: "concept-u9-defaulting-shareholders", titleAr: "المعالجة المحاسبية لتأخر المساهمين عن السداد", relatedObjectiveIds: ["obj-9-2-2"] },
        { id: "concept-u9-forfeited-shares-sale", titleAr: "بيع أسهم المتأخرين والتسوية الشاملة لحساباتهم", relatedObjectiveIds: ["obj-9-2-3"] }
      ],
      skills: [
        { id: "skill-9-2-1", titleAr: "تسجيل قيود دورة الأقساط ومعالجة بيع أسهم المتأخر ورد الفائض", taxonomy: "Apply", relatedObjectiveIds: ["obj-9-2-1", "obj-9-2-2", "obj-9-2-3"] }
      ]
    },
    {
      id: "lesson-3",
      hasExercises: true,
      questionIds: ['unified-u9-q13', 'unified-u9-q14', 'unified-u9-q15', 'unified-u9-q16', 'unified-u9-q17', 'unified-u9-q18'],
      lessonNumber: 3,
      unitId: "unit-9",
      titleAr: "الاكتتاب بزيادة وعلاوة الإصدار ومصاريف التأسيس",
      subtitleAr: "تجاوز الاكتتاب، نسبة التخصيص، رد الزيادة أو حجزها للأقساط التالية، وعلاوة الإصدار والاحتياطي القانوني",
      textbookPages: [31, 46],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-9-3-1",
          code: "LO-U9.7",
          lessonId: "lesson-3",
          titleAr: "يحسب نسبة التخصيص عند تجاوز الاكتتاب لعدد الأسهم المطروحة ويفاضل بين رد الزيادة وحجزها.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 6,
          bookPageRef: 33,
          primaryMisconceptions: [
            "إصدار أسهم تتجاوز رأس المال المصدر المعتمد عند زيادة طلبات المكتتبين."
          ],
          conceptIds: ["concept-u9-oversubscription"],
          isJRERequired: false
        },
        {
          id: "obj-9-3-2",
          code: "LO-U9.8",
          lessonId: "lesson-3",
          titleAr: "يثبت علاوة الإصدار ويقفلها قانونياً في سداد مصاريف التأسيس وتحويل الباقي للاحتياطي القانوني.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 38,
          primaryMisconceptions: [
            "توزيع علاوة الإصدار كأرباح نقدية على المساهمين القدامى بدلاً من تحويلها للاحتياطي القانوني."
          ],
          conceptIds: ["concept-u9-share-premium"],
          isJRERequired: false
        },
        {
          id: "obj-9-3-3",
          code: "LO-U9.9",
          lessonId: "lesson-3",
          titleAr: "يعالج محاسبياً مصاريف التأسيس ورسوم الإصدار وإقفالها طبقاً للمعيار المحاسبي والتشريع المصري.",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 43,
          primaryMisconceptions: [
            "اعتبار مصاريف التأسيس أصلاً دائماً يظهر في الميزانية إلى ما لا نهاية دون إطفاء أو إقفال."
          ],
          conceptIds: ["concept-u9-incorporation-costs"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u9-oversubscription", titleAr: "تجاوز الاكتتاب، التخصيص النسبي، وحجز الزيادات", relatedObjectiveIds: ["obj-9-3-1"] },
        { id: "concept-u9-share-premium", titleAr: "علاوة الإصدار وضوابطها القانونية والمحاسبية", relatedObjectiveIds: ["obj-9-3-2"] },
        { id: "concept-u9-incorporation-costs", titleAr: "معالجة مصاريف التأسيس ورسوم الإصدار", relatedObjectiveIds: ["obj-9-3-3"] }
      ],
      skills: [
        { id: "skill-9-3-1", titleAr: "إجراء قيود التخصيص النسبي وتسوية علاوة الإصدار ومصاريف التأسيس", taxonomy: "Apply", relatedObjectiveIds: ["obj-9-3-1", "obj-9-3-2"] }
      ]
    },
    {
      id: "lesson-4",
      hasExercises: true,
      questionIds: ['unified-u9-q19', 'unified-u9-q20', 'unified-u9-q21', 'unified-u9-q22', 'unified-u9-q23', 'unified-u9-q24'],
      lessonNumber: 4,
      unitId: "unit-9",
      titleAr: "إصدار السندات والقروض طويلة الأجل",
      subtitleAr: "طبيعة السندات كأداة دين، إصدار السندات بالقيمة الاسمية أو بعلاوة أو خصم إصدار، وفوائد السندات",
      textbookPages: [47, 62],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-9-4-1",
          code: "LO-U9.10",
          lessonId: "lesson-4",
          titleAr: "يميز بين السهم كحصة ملكية والسند كأداة دين ويحدد الآثار المالية لكل منهما على هيكل التمويل.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "intermediate",
          weightPercentage: 5,
          bookPageRef: 49,
          primaryMisconceptions: [
            "اعتقاد أن فائدة السندات ترتبط بتحقيق الشركة لأرباح مثل توزيعات الأسهم."
          ],
          conceptIds: ["concept-u9-bonds-nature"],
          isJRERequired: false
        },
        {
          id: "obj-9-4-2",
          code: "LO-U9.11",
          lessonId: "lesson-4",
          titleAr: "يسجل قيود إصدار السندات بالقيمة الاسمية وبعلاوة إصدار أو بخصم إصدار ويفسر سبب حدوث الفارق.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 5,
          bookPageRef: 54,
          primaryMisconceptions: [
            "تسجيل قرض السندات بغير القيمة الاسمية الواجبة السداد عند الاستحقاق."
          ],
          conceptIds: ["concept-u9-bonds-issuance"],
          isJRERequired: false
        },
        {
          id: "obj-9-4-3",
          code: "LO-U9.12",
          lessonId: "lesson-4",
          titleAr: "يثبت استحقاق وسداد فائدة السندات الدورية في دفاتر الشركة ويقفلها كعبء تشغيلي في قائمة الدخل.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 5,
          bookPageRef: 59,
          primaryMisconceptions: [
            "إقفال فائدة السندات في حساب توزيع الأرباح بدلاً من قائمة الدخل كعنصر تكلفة تمويل."
          ],
          conceptIds: ["concept-u9-bonds-interest"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u9-bonds-nature", titleAr: "طبيعة قرض السندات والمقارنة التمويلية مع الأسهم", relatedObjectiveIds: ["obj-9-4-1"] },
        { id: "concept-u9-bonds-issuance", titleAr: "إصدار السندات بالقيمة الاسمية وبعلاوة أو خصم", relatedObjectiveIds: ["obj-9-4-2"] },
        { id: "concept-u9-bonds-interest", titleAr: "المعالجة المحاسبية لفائدة السندات وإقفالها بقائمة الدخل", relatedObjectiveIds: ["obj-9-4-3"] }
      ],
      skills: [
        { id: "skill-9-4-1", titleAr: "إجراء قيود إصدار السندات وتحميل فوائدها كأعباء تمويلية", taxonomy: "Apply", relatedObjectiveIds: ["obj-9-4-2", "obj-9-4-3"] }
      ]
    },
    {
      id: "lesson-5",
      hasExercises: true,
      questionIds: ['unified-u9-q25', 'unified-u9-q26', 'unified-u9-q27', 'unified-u9-q28', 'unified-u9-q29', 'unified-u9-q30'],
      lessonNumber: 5,
      unitId: "unit-9",
      titleAr: "توزيع الأرباح والاحتياطيات في شركات المساهمة",
      subtitleAr: "مشروع توزيع الأرباح، الاحتياطي القانوني والنظامي، الدفعة الأولى والثانية للمساهمين والعمال، ومكافأة الإدارة",
      textbookPages: [63, 76],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-9-5-1",
          code: "LO-U9.13",
          lessonId: "lesson-5",
          titleAr: "يطبق القواعد القانونية والتنظيمية لتوزيع الأرباح (الاحتياطي القانوني 5%، نصيب العاملين 10%، مكافأة الإدارة).",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 5,
          bookPageRef: 65,
          primaryMisconceptions: [
            "حساب مكافأة مجلس الإدارة قبل استقطاع الدفعة الأولى للمساهمين والعاملين (5% على الأقل)."
          ],
          conceptIds: ["concept-u9-dividends-legal-rules"],
          isJRERequired: false
        },
        {
          id: "obj-9-5-2",
          code: "LO-U9.14",
          lessonId: "lesson-5",
          titleAr: "يعد قائمة ومشروع توزيع الأرباح التفصيلي لشركة المساهمة ويرحل الأرباح المرحلة للعام القادم.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "advanced",
          weightPercentage: 5,
          bookPageRef: 70,
          primaryMisconceptions: [
            "حساب الاحتياطي القانوني بعد توزيع حصص المساهمين بدلاً من استقطاعه من صافي الربح مباشرة."
          ],
          conceptIds: ["concept-u9-appropriation-statement"],
          isJRERequired: false
        },
        {
          id: "obj-9-5-3",
          code: "LO-U9.15",
          lessonId: "lesson-5",
          titleAr: "يسجل قيود إثبات مشروع التوزيع وسداد الكوبونات النقدية للمساهمين ومستحقات العاملين والإدارة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 5,
          bookPageRef: 74,
          primaryMisconceptions: [
            "اعتبار مقترح توزيع الأرباح التزاماً فورياً قبل اعتماده من الجمعية العامة للمساهمين."
          ],
          conceptIds: ["concept-u9-dividend-entries"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u9-dividends-legal-rules", titleAr: "الضوابط القانونية لتوزيع الأرباح والاحتياطيات", relatedObjectiveIds: ["obj-9-5-1"] },
        { id: "concept-u9-appropriation-statement", titleAr: "إعداد قائمة مشروع توزيع الأرباح والخسائر", relatedObjectiveIds: ["obj-9-5-2"] },
        { id: "concept-u9-dividend-entries", titleAr: "قيود استحقاق وصرف توزيعات الأرباح النقدية", relatedObjectiveIds: ["obj-9-5-3"] }
      ],
      skills: [
        { id: "skill-9-5-1", titleAr: "إعداد جدول توزيع الأرباح وإجراء قيود صرف حصص المساهمين والعمال", taxonomy: "Apply", relatedObjectiveIds: ["obj-9-5-1", "obj-9-5-2", "obj-9-5-3"] }
      ]
    },
    {
      id: "lesson-6",
      hasExercises: true,
      questionIds: ['unified-u9-q31', 'unified-u9-q32', 'unified-u9-q33', 'unified-u9-q34', 'unified-u9-q35', 'unified-u9-q36'],
      lessonNumber: 6,
      unitId: "unit-9",
      titleAr: "التطبيق المتكامل وقرارات هيكل التمويل (JRE 9)",
      subtitleAr: "دراسة حالة متكاملة لشركة مساهمة، المفاضلة بين تمويل الأسهم والسندات، وصياغة مقال JRE",
      textbookPages: [77, 92],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-9-6-1",
          code: "LO-U9.16",
          lessonId: "lesson-6",
          titleAr: "يطبق دورة محاسبية متكاملة لشركة مساهمة من الاكتتاب حتى إعداد قائمة المركز المالي وقسم حقوق الملكية.",
          taxonomy: "Create",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 7,
          bookPageRef: 80,
          primaryMisconceptions: [
            "عرض قرض السندات ضمن بنود حقوق الملكية بدلاً من الالتزامات غير المتداولة."
          ],
          conceptIds: ["concept-u9-equity-presentation"],
          isJRERequired: false
        },
        {
          id: "obj-9-6-2",
          code: "LO-U9.17",
          lessonId: "lesson-6",
          titleAr: "يصيغ مقال الاستدلال والتفسير المحاسبي (JRE) للمفاضلة التمويلية بين الأسهم والسندات بأركانه الأربعة وسلّم الـ 20 درجة.",
          taxonomy: "Evaluate",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 8,
          bookPageRef: 88,
          primaryMisconceptions: [
            "إصدار حكم تمويلي سطحي دون مقارنة الملاءة المالية، تكلفة رأس المال، ومخاطر الرفع المالي."
          ],
          conceptIds: ["concept-u9-financing-jre"],
          isJRERequired: true
        }
      ],
      concepts: [
        { id: "concept-u9-equity-presentation", titleAr: "عرض حقوق الملكية والالتزامات التمويلية بالمركز المالي", relatedObjectiveIds: ["obj-9-6-1"] },
        { id: "concept-u9-financing-jre", titleAr: "صياغة مقال JRE لقرارات هيكل رأس المال والتمويل", relatedObjectiveIds: ["obj-9-6-2"] }
      ],
      skills: [
        { id: "skill-9-6-1", titleAr: "إعداد عرض حقوق الملكية وصياغة مقال JRE متكامل مع التحليل الرقمي", taxonomy: "Evaluate", relatedObjectiveIds: ["obj-9-6-1", "obj-9-6-2"] }
      ]
    }
  ]
};
