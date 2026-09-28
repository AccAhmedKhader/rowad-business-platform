import { UnitSpec } from './CurriculumModel';

export const CANONICAL_UNIT_8: UnitSpec = {
  id: "unit-8",
  unitNumber: 8,
  subjectCode: "ACC.U8",
  titleAr: "الوحدة الثامنة: محاسبة شركات الأشخاص والتضامن",
  descriptionAr: "اتفاقية الشراكة وتوزيع الأرباح والخسائر • فائدة رأس المال ورواتب ومكافآت الشركاء • الحسابات الجارية والتسويات الختامية • الشهرة وتغير الشركاء (انضمام وانفصال) • التطبيق المتكامل والحكم والاستدلال المحاسبي JRE",
  totalNominalMarks: 100,
  lessons: [
    {
      id: "lesson-1",
      lessonNumber: 1,
      unitId: "unit-8",
      titleAr: "اتفاقية الشراكة وتوزيع الأرباح والخسائر",
      subtitleAr: "الخصائص القانونية لشركات التضامن، بنود عقد الشراكة، وحساب توزيع الأرباح والخسائر",
      textbookPages: [1, 15],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-8-1-1",
          code: "LO-U8.1",
          lessonId: "lesson-1",
          titleAr: "يشرح الخصائص القانونية لشركة التضامن ويميز بين مسؤولية الشريك المتضامن غير المحدودة والمسؤولية المحدودة.",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "basic",
          weightPercentage: 5,
          bookPageRef: 3,
          primaryMisconceptions: [
            "الاعتقاد بأن مسؤولية الشريك المتضامن تقتصر على حصته في رأس مال الشركة."
          ],
          conceptIds: ["concept-u8-partnership-nature"],
          isJRERequired: false
        },
        {
          id: "obj-8-1-2",
          code: "LO-U8.2",
          lessonId: "lesson-1",
          titleAr: "يطبق قواعد عقد الشراكة وقواعد سكوت العقد لتوزيع الأرباح والخسائر بنسب متفق عليها أو بنسبة رأس المال.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 8,
          bookPageRef: 7,
          primaryMisconceptions: [
            "توزيع الخسائر بالتساوي رغم وجود اتفاق صريح على نسبة توزيع الأرباح."
          ],
          conceptIds: ["concept-u8-profit-distribution"],
          isJRERequired: false
        },
        {
          id: "obj-8-1-3",
          code: "LO-U8.3",
          lessonId: "lesson-1",
          titleAr: "يعد حساب توزيع الأرباح والخسائر (حساب التوزيع) ويسجل قيود إقفال وتوزيع الأرباح في الحسابات الجارية.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 12,
          primaryMisconceptions: [
            "إقفال صافي الربح مباشرة في حساب رأس المال الثابت بدلاً من حساب التوزيع والجاري."
          ],
          conceptIds: ["concept-u8-appropriation-acc"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u8-partnership-nature", titleAr: "طبيعة شركات الأشخاص والمسؤولية التضامنية", relatedObjectiveIds: ["obj-8-1-1"] },
        { id: "concept-u8-profit-distribution", titleAr: "قواعد ونسب توزيع الأرباح والخسائر", relatedObjectiveIds: ["obj-8-1-2"] },
        { id: "concept-u8-appropriation-acc", titleAr: "حساب توزيع الأرباح والخسائر وقيود الإقفال", relatedObjectiveIds: ["obj-8-1-3"] }
      ],
      skills: [
        { id: "skill-8-1-1", titleAr: "حساب حصص الأرباح والخسائر وإعداد قيد التوزيع", taxonomy: "Apply", relatedObjectiveIds: ["obj-8-1-2", "obj-8-1-3"] }
      ]
    },
    {
      id: "lesson-2",
      lessonNumber: 2,
      unitId: "unit-8",
      titleAr: "فائدة رأس المال ورواتب الشركاء",
      subtitleAr: "المعالجة المحاسبية لفائدة رأس المال، رواتب ومكافآت الإدارة، وفائدة المسحوبات",
      textbookPages: [16, 28],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-8-2-1",
          code: "LO-U8.4",
          lessonId: "lesson-2",
          titleAr: "يحسب فائدة رأس المال ويفسر اعتبارها توزيعاً للأرباح بحساب التوزيع وليست مصروفاً تشغيلياً بقائمة الدخل.",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 18,
          primaryMisconceptions: [
            "معاملة فائدة رأس المال كمصروف يخصم في حساب الأرباح والخسائر للوصول لصافي الربح."
          ],
          conceptIds: ["concept-u8-capital-interest"],
          isJRERequired: false
        },
        {
          id: "obj-8-2-2",
          code: "LO-U8.5",
          lessonId: "lesson-2",
          titleAr: "يعالج رواتب ومكافآت الشركاء القائمين بالإدارة ويميز بين الراتب المستحق والمسحوب فعلاً.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 6,
          bookPageRef: 22,
          primaryMisconceptions: [
            "إغفال إضافة الجزء غير المسحوب من الراتب إلى الجانب الدائن من الحساب الجاري للشريك."
          ],
          conceptIds: ["concept-u8-partner-salary"],
          isJRERequired: false
        },
        {
          id: "obj-8-2-3",
          code: "LO-U8.6",
          lessonId: "lesson-2",
          titleAr: "يميز بين فائدة قرض الشريك (مصروف تشغيلي بقائمة الدخل) وفائدة المسحوبات (إيراد توزيعي بحساب التوزيع).",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "advanced",
          weightPercentage: 7,
          bookPageRef: 26,
          primaryMisconceptions: [
            "إدراج فائدة قرض الشريك في حساب توزيع الأرباح بدلاً من حساب الأرباح والخسائر."
          ],
          conceptIds: ["concept-u8-loan-vs-drawings-interest"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u8-capital-interest", titleAr: "فائدة رأس المال وأسس العدالة التمويلية", relatedObjectiveIds: ["obj-8-2-1"] },
        { id: "concept-u8-partner-salary", titleAr: "رواتب ومكافآت إدارة الشركاء", relatedObjectiveIds: ["obj-8-2-2"] },
        { id: "concept-u8-loan-vs-drawings-interest", titleAr: "المقارنة بين فائدة القرض وفائدة المسحوبات", relatedObjectiveIds: ["obj-8-2-3"] }
      ],
      skills: [
        { id: "skill-8-2-1", titleAr: "حساب فوائد رأس المال والمسحوبات ومعالجة الرواتب بحساب التوزيع", taxonomy: "Apply", relatedObjectiveIds: ["obj-8-2-1", "obj-8-2-2", "obj-8-2-3"] }
      ]
    },
    {
      id: "lesson-3",
      lessonNumber: 3,
      unitId: "unit-8",
      titleAr: "التسويات بين الشركاء والحسابات الجارية",
      subtitleAr: "طريقة رأس المال الثابت، بنود الحساب الجاري، وترصيد وعرض حقوق الشركاء بالميزانية",
      textbookPages: [29, 42],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-8-3-1",
          code: "LO-U8.7",
          lessonId: "lesson-3",
          titleAr: "يطبق طريقة رأس المال الثابت ويفصل المعاملات الدورية في الحسابات الجارية المستقلة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "basic",
          weightPercentage: 5,
          bookPageRef: 31,
          primaryMisconceptions: [
            "تعديل رصيد رأس المال مباشرة بالأرباح والمسحوبات دون استخدام الحسابات الجارية."
          ],
          conceptIds: ["concept-u8-fixed-capital-method"],
          isJRERequired: false
        },
        {
          id: "obj-8-3-2",
          code: "LO-U8.8",
          lessonId: "lesson-3",
          titleAr: "يحدد بنود الجانب المدين والجانب الدائن للحساب الجاري ويرصد الحساب في نهاية الفترة المالية.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 8,
          bookPageRef: 36,
          primaryMisconceptions: [
            "وضع المسحوبات وفائدة المسحوبات في الجانب الدائن للحساب الجاري للشريك."
          ],
          conceptIds: ["concept-u8-current-account-ledger"],
          isJRERequired: false
        },
        {
          id: "obj-8-3-3",
          code: "LO-U8.9",
          lessonId: "lesson-3",
          titleAr: "يعرض حقوق الملكية للشركاء (رأس المال والأرصدة الجارية المدينة والدائنة) بقائمة المركز المالي.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 40,
          primaryMisconceptions: [
            "إغفال طرح الرصيد الجاري المدين من إجمالي حقوق الشركاء بالميزانية."
          ],
          conceptIds: ["concept-u8-balance-sheet-presentation"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u8-fixed-capital-method", titleAr: "طريقة رأس المال الثابت والحسابات الجارية", relatedObjectiveIds: ["obj-8-3-1"] },
        { id: "concept-u8-current-account-ledger", titleAr: "تصوير وترصيد الحسابات الجارية في دفتر الأستاذ", relatedObjectiveIds: ["obj-8-3-2"] },
        { id: "concept-u8-balance-sheet-presentation", titleAr: "عرض حقوق الشركاء في قائمة المركز المالي", relatedObjectiveIds: ["obj-8-3-3"] }
      ],
      skills: [
        { id: "skill-8-3-1", titleAr: "تصوير وترصيد الحساب الجاري للشريك وعرضه بالميزانية", taxonomy: "Apply", relatedObjectiveIds: ["obj-8-3-2", "obj-8-3-3"] }
      ]
    },
    {
      id: "lesson-4",
      lessonNumber: 4,
      unitId: "unit-8",
      titleAr: "الشهرة وتغير الشركاء (انضمام وانفصال شريك)",
      subtitleAr: "إعادة تقدير الأصول والخصوم، محاسبة الشهرة، وتسوية حقوق الشريك المنضم والمنفصل",
      textbookPages: [43, 60],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-8-4-1",
          code: "LO-U8.10",
          lessonId: "lesson-4",
          titleAr: "يعد حساب إعادة التقدير ويقفل أرباحه وخسائره في حسابات الشركاء القدامى فقط بنسبهم السابقة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "advanced",
          weightPercentage: 7,
          bookPageRef: 46,
          primaryMisconceptions: [
            "توزيع أرباح إعادة التقدير على الشريك الجديد فور انضمامه للشركة."
          ],
          conceptIds: ["concept-u8-revaluation-account"],
          isJRERequired: false
        },
        {
          id: "obj-8-4-2",
          code: "LO-U8.11",
          lessonId: "lesson-4",
          titleAr: "يثبت الشهرة التجارية كأصل غير ملموس ويوزعها على الشركاء القدامى بالدفاتر.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 6,
          bookPageRef: 52,
          primaryMisconceptions: [
            "اعتبار الشهرة التزاماً أو إثباتها دون تحديد نصيب كل شريك قديم."
          ],
          conceptIds: ["concept-u8-goodwill-treatment"],
          isJRERequired: false
        },
        {
          id: "obj-8-4-3",
          code: "LO-U8.12",
          lessonId: "lesson-4",
          titleAr: "يحسب مستحقات الشريك المنفصل أو المتوفى ويثبت سدادها نقداً أو تحويلها إلى قرض شريك منفصل.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "advanced",
          weightPercentage: 7,
          bookPageRef: 57,
          primaryMisconceptions: [
            "إلغاء مستحقات الشريك المنفصل عند عجز السيولة بدلاً من إثباتها كقرض التزام."
          ],
          conceptIds: ["concept-u8-retirement-settlement"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u8-revaluation-account", titleAr: "حساب إعادة التقدير وتوزيع الفروق الرأسمالية", relatedObjectiveIds: ["obj-8-4-1"] },
        { id: "concept-u8-goodwill-treatment", titleAr: "الشهرة التجارية ومعالجتها الدفترية", relatedObjectiveIds: ["obj-8-4-2"] },
        { id: "concept-u8-retirement-settlement", titleAr: "تسوية حقوق الشريك المنفصل وقرض الشريك", relatedObjectiveIds: ["obj-8-4-3"] }
      ],
      skills: [
        { id: "skill-8-4-1", titleAr: "إجراء قيود إعادة التقدير والشهرة وتسوية انضمام وانفصال الشريك", taxonomy: "Apply", relatedObjectiveIds: ["obj-8-4-1", "obj-8-4-2", "obj-8-4-3"] }
      ]
    },
    {
      id: "lesson-5",
      lessonNumber: 5,
      unitId: "unit-8",
      titleAr: "التطبيق المتكامل والحكم والاستدلال المحاسبي JRE",
      subtitleAr: "دراسة حالة شاملة لشركة تضامن، حساب التوزيع، وصياغة مقال JRE الرباعي",
      textbookPages: [61, 75],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-8-5-1",
          code: "LO-U8.13",
          lessonId: "lesson-5",
          titleAr: "يطبق دورة محاسبية متكاملة لحسابات شركة التضامن ويربط قياس الربح باقتسامه وتوزيعه دفترياً.",
          taxonomy: "Create",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 10,
          bookPageRef: 65,
          primaryMisconceptions: [
            "الخلط بين تسلسل إقفال فوائد القروض بقائمة الدخل وفوائد رأس المال بحساب التوزيع."
          ],
          conceptIds: ["concept-u8-comprehensive-cycle"],
          isJRERequired: false
        },
        {
          id: "obj-8-5-2",
          code: "LO-U8.14",
          lessonId: "lesson-5",
          titleAr: "يصيغ مقال الحكم والاستدلال المحاسبي (JRE) وفق الأركان الأربعة (حكم، تفسير، دليل رقمي، تفنيد معارض).",
          taxonomy: "Evaluate",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 10,
          bookPageRef: 72,
          primaryMisconceptions: [
            "كتابة مقال JRE إنشائياً دون استخراج دلالات رقمية وحسابية قاطعة."
          ],
          conceptIds: ["concept-u8-jre-scaffolding"],
          isJRERequired: true
        }
      ],
      concepts: [
        { id: "concept-u8-comprehensive-cycle", titleAr: "الدورة المحاسبية المتكاملة لشركة التضامن", relatedObjectiveIds: ["obj-8-5-1"] },
        { id: "concept-u8-jre-scaffolding", titleAr: "هيكل مقال التفسير المدعوم بالأدلة JRE في شركات الأشخاص", relatedObjectiveIds: ["obj-8-5-2"] }
      ],
      skills: [
        { id: "skill-8-5-1", titleAr: "حل الحالات المحاسبية المتكاملة وصياغة مقال الـ JRE المتكامل", taxonomy: "Evaluate", relatedObjectiveIds: ["obj-8-5-1", "obj-8-5-2"] }
      ]
    }
  ]
};
