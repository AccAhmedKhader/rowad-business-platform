import { UnitSpec } from './CurriculumModel';

export const CANONICAL_UNIT_6: UnitSpec = {
  id: "unit-6",
  unitNumber: 6,
  subjectCode: "ACC.U6",
  titleAr: "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية",
  descriptionAr: "فهم السجلات غير المكتملة والقيد المفرد • إعادة تكوين الربح من التغير في رأس المال • حسابات المراقبة (المبيعات والمشتريات) • تسوية البنك وتحديث دفتر النقدية • التطبيق المتكامل (كريم وأشرف) • التفسير والاستدلال المدعوم بالأدلة JRE وسلّم الـ 20 درجة",
  totalNominalMarks: 100,
  lessons: [
    {
      id: "lesson-1",
      lessonNumber: 1,
      unitId: "unit-6",
      titleAr: "فهم السجلات غير المكتملة ونظام القيد المفرد مقابل القيد المزدوج",
      subtitleAr: "خصائص القيد المفرد، المقارنة من خمس زوايا، أسباب الاستخدام، والحاجة لإعادة التكوين",
      textbookPages: [161, 168],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-6-1-1",
          code: "LO-U6.1",
          lessonId: "lesson-1",
          titleAr: "يميز خصائص نظام القيد المفرد ومشكلاته ويقارنه بنظام القيد المزدوج من خمس زوايا ويفسر أسباب استخدامه في المنشآت الصغيرة.",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "basic",
          weightPercentage: 10,
          bookPageRef: 161,
          primaryMisconceptions: [
            "الاعتقاد أن متابعة النقدية وحدها كافية لقياس الأداء الحقيقي والربحية للمنشأة.",
            "افتراض أن استخدام القيد المفرد يعني دائماً وجود نية احتيال بدلاً من عوامل تشغيلية كبساطة الحجم والتكلفة."
          ],
          conceptIds: ["concept-u6-single-entry", "concept-u6-incomplete-records"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u6-single-entry", titleAr: "نظام القيد المفرد مقابل القيد المزدوج", relatedObjectiveIds: ["obj-6-1-1"] },
        { id: "concept-u6-incomplete-records", titleAr: "السجلات غير المكتملة وغياب ميزان المراجعة", relatedObjectiveIds: ["obj-6-1-1"] }
      ],
      skills: [
        { id: "skill-6-1-1", titleAr: "تشخيص حالة السجلات وتحديد البيانات المفقودة والأدوات البديلة", taxonomy: "Understand", relatedObjectiveIds: ["obj-6-1-1"] }
      ]
    },
    {
      id: "lesson-2",
      lessonNumber: 2,
      unitId: "unit-6",
      titleAr: "إعادة تكوين الربح من التغير في رأس المال",
      subtitleAr: "معادلة رأس المال، عزل أثر المسحوبات ورأس المال الإضافي، واستنتاج صافي الربح أو الخسارة",
      textbookPages: [169, 175],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-6-2-1",
          code: "LO-U6.2",
          lessonId: "lesson-2",
          titleAr: "يحسب رأس المال أول وآخر الفترة ويستنتج صافي الربح أو الخسارة مع عزل أثر المسحوبات ورأس المال الإضافي.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 12,
          bookPageRef: 169,
          primaryMisconceptions: [
            "طرح المسحوبات وإضافة رأس المال الإضافي في معادلة الربح (عكس الإشارات).",
            "إغفال الخصوم عند حساب رأس المال واعتباره مساوياً للأصول."
          ],
          conceptIds: ["concept-u6-capital-equation", "concept-u6-profit-reconstruction"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u6-capital-equation", titleAr: "معادلة رأس المال والمركز المالي", relatedObjectiveIds: ["obj-6-2-1"] },
        { id: "concept-u6-profit-reconstruction", titleAr: "إعادة تكوين الربح وعزل حركات المالك", relatedObjectiveIds: ["obj-6-2-1"] }
      ],
      skills: [
        { id: "skill-6-2-1", titleAr: "حساب رأس المال في تاريخين واستخراج صافي ربح النشاط", taxonomy: "Apply", relatedObjectiveIds: ["obj-6-2-1"] }
      ]
    },
    {
      id: "lesson-3",
      lessonNumber: 3,
      unitId: "unit-6",
      titleAr: "حسابات المراقبة (مراقبة المبيعات ومراقبة المشتريات)",
      subtitleAr: "أداة الرقابة الإجمالية على دفاتر الأستاذ المساعدة، بنية الحسابين، وتفسير الرصيد الختامي",
      textbookPages: [176, 184],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-6-3-1",
          code: "LO-U6.3",
          lessonId: "lesson-3",
          titleAr: "يعد حساب مراقبة المبيعات وحساب مراقبة المشتريات ويفسر رصيدهما الختامي ويكتشف أسباب عدم التطابق مع الحسابات الفردية.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 12,
          bookPageRef: 176,
          primaryMisconceptions: [
            "وضع الخصم المسموح به في الجانب المدين لحساب مراقبة المبيعات بدلاً من الدائن.",
            "افتراض أن عدم التطابق يعني دائماً اختلاساً بدلاً من أخطاء ترحيل أو سهو كتابي."
          ],
          conceptIds: ["concept-u6-sales-control", "concept-u6-purchases-control"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u6-sales-control", titleAr: "حساب مراقبة دفتر أستاذ المبيعات (العملاء)", relatedObjectiveIds: ["obj-6-3-1"] },
        { id: "concept-u6-purchases-control", titleAr: "حساب مراقبة دفتر أستاذ المشتريات (الموردين)", relatedObjectiveIds: ["obj-6-3-1"] }
      ],
      skills: [
        { id: "skill-6-3-1", titleAr: "إعداد حسابات المراقبة بالأستاذ العام ومطابقة الأرصدة الإجمالية", taxonomy: "Apply", relatedObjectiveIds: ["obj-6-3-1"] }
      ]
    },
    {
      id: "lesson-4",
      lessonNumber: 4,
      unitId: "unit-6",
      titleAr: "تسوية البنك وتحديث دفتر النقدية",
      subtitleAr: "أسباب الفروق النقدية، فروق التوقيت مقابل الأخطاء، وخطوتا التحديث والتسوية",
      textbookPages: [185, 192],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-6-4-1",
          code: "LO-U6.4",
          lessonId: "lesson-4",
          titleAr: "يحدث دفتر النقدية ويعد مذكرة تسوية البنك ويميز بين فروق التوقيت والأخطاء ويفسر دور المذكرة كأداة تفسيرية رقابية.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 12,
          bookPageRef: 185,
          primaryMisconceptions: [
            "الاعتقاد أن مذكرة تسوية البنك تصحح الأخطاء تلقائياً بدلاً من تحديث دفتر النقدية بالقيود.",
            "الخلط بين الشيكات غير المقدمة للصرف والإيداعات بالطريق في الجمع والطرح."
          ],
          conceptIds: ["concept-u6-cashbook-update", "concept-u6-bank-reconciliation"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u6-cashbook-update", titleAr: "تحديث دفتر النقدية بالعمليات والمصروفات البنكية", relatedObjectiveIds: ["obj-6-4-1"] },
        { id: "concept-u6-bank-reconciliation", titleAr: "مذكرة تسوية البنك ومعالجة فروق التوقيت", relatedObjectiveIds: ["obj-6-4-1"] }
      ],
      skills: [
        { id: "skill-6-4-1", titleAr: "إجراء تسوية البنك ثنائية الخطوات بدقة وربطها بالرقابة الداخلية", taxonomy: "Apply", relatedObjectiveIds: ["obj-6-4-1"] }
      ]
    },
    {
      id: "lesson-5",
      lessonNumber: 5,
      unitId: "unit-6",
      titleAr: "تطبيق عملي متكامل (دراسة حالتي كريم وأشرف)",
      subtitleAr: "الدمج الشامل لأدوات الرقابة الثلاث: تسوية النقدية، المركز المالي، وإعادة تكوين الربح",
      textbookPages: [193, 201],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-6-5-1",
          code: "LO-U6.5",
          lessonId: "lesson-5",
          titleAr: "يدمج الأدوات الثلاث (التسوية، المراقبة، رأس المال) في حل دراسة حالة متكاملة ويقدم تحليلاً شاملاً للأداء والسيولة.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "advanced",
          weightPercentage: 10,
          bookPageRef: 193,
          primaryMisconceptions: [
            "البدء بحساب الربح قبل تعديل النقدية وتسوية البنك مما يربك التسلسل الحسابي.",
            "الارتباك بين رصيد النقدية قبل التعديل والرصيد المعدل عند حساب الأصول."
          ],
          conceptIds: ["concept-u6-integrated-case", "concept-u6-internal-control-chain"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u6-integrated-case", titleAr: "التسلسل المنهجي لحل قضايا السجلات غير المكتملة", relatedObjectiveIds: ["obj-6-5-1"] },
        { id: "concept-u6-internal-control-chain", titleAr: "منظومة الرقابة الداخلية وحماية السيولة", relatedObjectiveIds: ["obj-6-5-1"] }
      ],
      skills: [
        { id: "skill-6-5-1", titleAr: "حل المسائل المركبة متعددة المراحل بكفاءة وثقة", taxonomy: "Analyze", relatedObjectiveIds: ["obj-6-5-1"] }
      ]
    },
    {
      id: "lesson-6",
      lessonNumber: 6,
      unitId: "unit-6",
      titleAr: "الحكم والاستدلال المدعوم بالأدلة (JRE) وإتقان مقال الموثوقية",
      subtitleAr: "هل المعلومات المحاسبية المعاد تكوينها موثوقة كتمثيل عادل للأداء، أم مجرد تقديرات مستنيرة؟",
      textbookPages: [202, 210],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-6-6-1",
          code: "LO-U6.6",
          lessonId: "lesson-6",
          titleAr: "يبني مقال حكم واستدلال متوازن (JRE) يقيّم موثوقية المعلومات المعاد تكوينها مقابل مخاطر التقدير وفق سلّم التقدير المعتمد (20 درجة).",
          taxonomy: "Evaluate",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 10,
          bookPageRef: 202,
          primaryMisconceptions: [
            "الانحياز المطلق لأحد الرأيين دون عرض الحجة المضادة وتفنيدها.",
            "إغفال الأثر الإيجابي للأساليب المنهجية (معادلة رأس المال، حسابات المراقبة، تسوية البنك) في دعم الموثوقية."
          ],
          conceptIds: ["concept-u6-jre-reliability-vs-estimates"],
          isJRERequired: true
        }
      ],
      concepts: [
        { id: "concept-u6-jre-reliability-vs-estimates", titleAr: "موثوقية المعلومات المعاد تكوينها مقابل مخاطر التقديرات", relatedObjectiveIds: ["obj-6-6-1"] }
      ],
      skills: [
        { id: "skill-6-6-1", titleAr: "بناء مقال استدلالي متكامل الأركان الخمسة ومحقق لسلّم الـ 20 درجة", taxonomy: "Evaluate", relatedObjectiveIds: ["obj-6-6-1"] }
      ]
    }
  ]
};
