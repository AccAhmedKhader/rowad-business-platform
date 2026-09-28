import { UnitSpec } from './CurriculumModel';

export const CANONICAL_UNIT_7: UnitSpec = {
  id: "unit-7",
  unitNumber: 7,
  subjectCode: "ACC.U7",
  titleAr: "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول",
  descriptionAr: "طرق حساب الإهلاك (القسط الثابت والمتناقص) • استبعاد الأصول غير المتداولة وحساب الاستبعاد • المخصصات والديون المشكوك في تحصيلها • التطبيق المتكامل (منشأة حسن التجارية) • الحكم والاستدلال JRE وسلّم الـ 20 درجة",
  totalNominalMarks: 100,
  lessons: [
    {
      id: "lesson-1",
      lessonNumber: 1,
      unitId: "unit-7",
      titleAr: "الإهلاك وطرق حسابه (القسط الثابت والمتناقص)",
      subtitleAr: "مفهوم الإهلاك كتوزيع للتكلفة، عناصره الثلاثة، القسط الثابت، القسط المتناقص، ومقارنة أثرهما على الربح",
      textbookPages: [21, 25],
      nominalWeight: 25,
      objectives: [
        {
          id: "obj-7-1-1",
          code: "LO-U7.1",
          lessonId: "lesson-1",
          titleAr: "يشرح مفهوم الإهلاك كتوزيع محاسبي لتكلفة الأصل القابل للإهلاك ويميزه عن القيمة السوقية اللحظية.",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "basic",
          weightPercentage: 5,
          bookPageRef: 21,
          primaryMisconceptions: [
            "الاعتقاد أن الإهلاك يمثل انخفاضاً فعلياً في القيمة السوقية للأصل.",
            "اعتبار الإهلاك تدفقاً نقدياً خارجاً أو خسارة نقدية مباشرة."
          ],
          conceptIds: ["concept-u7-depreciation-nature"],
          isJRERequired: false
        },
        {
          id: "obj-7-1-2",
          code: "LO-U7.2",
          lessonId: "lesson-1",
          titleAr: "يحدد عناصر قياس الإهلاك (التكلفة التاريخية، العمر الإنتاجي، القيمة التخريدية) ويحسب المبلغ القابل للإهلاك.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "basic",
          weightPercentage: 5,
          bookPageRef: 22,
          primaryMisconceptions: [
            "نسيان استبعاد القيمة التخريدية عند حساب المبلغ القابل للإهلاك بطريقة القسط الثابت."
          ],
          conceptIds: ["concept-u7-depreciable-amount"],
          isJRERequired: false
        },
        {
          id: "obj-7-1-3",
          code: "LO-U7.3",
          lessonId: "lesson-1",
          titleAr: "يطبق طريقة القسط الثابت لحساب قسط الإهلاك السنوي ومجمع الإهلاك والقيمة الدفترية في أي سنة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 7,
          bookPageRef: 23,
          primaryMisconceptions: [
            "الخلط بين قسط الإهلاك السنوي (مصروف الفترة) ومجمع الإهلاك التراكمي في الميزانية."
          ],
          conceptIds: ["concept-u7-straight-line"],
          isJRERequired: false
        },
        {
          id: "obj-7-1-4",
          code: "LO-U7.4",
          lessonId: "lesson-1",
          titleAr: "يطبق طريقة القسط المتناقص لحساب قسط الإهلاك السنوي على أساس القيمة الدفترية في بداية كل سنة.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 8,
          bookPageRef: 24,
          primaryMisconceptions: [
            "حساب القسط المتناقص على التكلفة التاريخية بدلاً من القيمة الدفترية في بداية السنة.",
            "طرح القيمة التخريدية مسبقاً في طريقة القسط المتناقص خلافاً للقاعدة المحاسبية."
          ],
          conceptIds: ["concept-u7-reducing-balance"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u7-depreciation-nature", titleAr: "طبيعة الإهلاك وأسبابه ومبدأ المقابلة", relatedObjectiveIds: ["obj-7-1-1"] },
        { id: "concept-u7-depreciable-amount", titleAr: "عناصر القياس والمبلغ القابل للإهلاك", relatedObjectiveIds: ["obj-7-1-2"] },
        { id: "concept-u7-straight-line", titleAr: "طريقة القسط الثابت وحساباته", relatedObjectiveIds: ["obj-7-1-3"] },
        { id: "concept-u7-reducing-balance", titleAr: "طريقة القسط المتناقص والقيمة الدفترية", relatedObjectiveIds: ["obj-7-1-4"] }
      ],
      skills: [
        { id: "skill-7-1-1", titleAr: "حساب الإهلاك السنوي والقيمة الدفترية بالقسط الثابت والمتناقص", taxonomy: "Apply", relatedObjectiveIds: ["obj-7-1-3", "obj-7-1-4"] }
      ]
    },
    {
      id: "lesson-2",
      lessonNumber: 2,
      unitId: "unit-7",
      titleAr: "استبعاد الأصول غير المتداولة وحساب الاستبعاد",
      subtitleAr: "خطوات الاستبعاد الدفترية الأربع، حساب القيمة الدفترية، تحديد ربح أو خسارة الاستبعاد، وإعداد حساب الاستبعاد",
      textbookPages: [26, 28],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-7-2-1",
          code: "LO-U7.5",
          lessonId: "lesson-2",
          titleAr: "يحسب القيمة الدفترية للأصل المستبعد ويحدد ربح أو خسارة الاستبعاد بمقارنة سعر البيع بالقيمة الدفترية.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 10,
          bookPageRef: 26,
          primaryMisconceptions: [
            "مقارنة سعر البيع بالتكلفة الأصلية بدلاً من القيمة الدفترية لحساب الربح أو الخسارة.",
            "افتراض أن أي عملية بيع للأصل تعني بالضرورة تحقيق ربح."
          ],
          conceptIds: ["concept-u7-carrying-amount", "concept-u7-disposal-gain-loss"],
          isJRERequired: false
        },
        {
          id: "obj-7-2-2",
          code: "LO-U7.6",
          lessonId: "lesson-2",
          titleAr: "يعد حساب استبعاد الأصول ويسجل فيه التكلفة الدفترية ومجمع الإهلاك وثمن البيع وصافي النتيجة بالتوازن التام.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 10,
          bookPageRef: 27,
          primaryMisconceptions: [
            "نسيان إقفال مجمع إهلاك الأصل المستبعد في حساب الاستبعاد.",
            "وضع ربح الاستبعاد في الجانب الدائن بدلاً من الجانب المدين لحساب الاستبعاد عند التوازن (أو العكس)."
          ],
          conceptIds: ["concept-u7-disposal-account"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u7-carrying-amount", titleAr: "القيمة الدفترية وإقفال حسابات الأصل المستبعد", relatedObjectiveIds: ["obj-7-2-1"] },
        { id: "concept-u7-disposal-gain-loss", titleAr: "شروط تحقق ربح أو خسارة الاستبعاد", relatedObjectiveIds: ["obj-7-2-1"] },
        { id: "concept-u7-disposal-account", titleAr: "بنية وتوازن حساب الاستبعاد", relatedObjectiveIds: ["obj-7-2-2"] }
      ],
      skills: [
        { id: "skill-7-2-1", titleAr: "إعداد حساب الاستبعاد وتحديد أثره النهائي في قائمة الدخل", taxonomy: "Apply", relatedObjectiveIds: ["obj-7-2-2"] }
      ]
    },
    {
      id: "lesson-3",
      lessonNumber: 3,
      unitId: "unit-7",
      titleAr: "المخصصات والديون المشكوك في تحصيلها",
      subtitleAr: "مبدأ الحيطة والحذر، الفرق بين الدين المشكوك فيه والمعدوم، حساب المخصص وصافي العملاء، ومعالجة تغير المخصص",
      textbookPages: [29, 32],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-7-3-1",
          code: "LO-U7.7",
          lessonId: "lesson-3",
          titleAr: "يوضح مفهوم المخصص المحاسبي وفق مبدأ الحيطة والحذر ويميز بين الدين المشكوك في تحصيله والدين المعدوم.",
          taxonomy: "Understand",
          cognitiveDomain: "KNOWLEDGE",
          targetDifficulty: "basic",
          weightPercentage: 8,
          bookPageRef: 29,
          primaryMisconceptions: [
            "اعتبار مخصص الديون المشكوك فيها خروجاً نقدياً أو حساباً بنكياً مجنباً.",
            "الخلط بين الدين المشكوك فيه (خسارة محتملة) والدين المعدوم (خسارة مؤكدة مثبتة شطبها)."
          ],
          conceptIds: ["concept-u7-provision-prudence"],
          isJRERequired: false
        },
        {
          id: "obj-7-3-2",
          code: "LO-U7.8",
          lessonId: "lesson-3",
          titleAr: "يحسب مخصص الديون المشكوك فيها وصافي رصيد العملاء ويحدد الأثر على قائمة الدخل والربح عند زيادة أو انخفاض المخصص.",
          taxonomy: "Apply",
          cognitiveDomain: "APPLICATION",
          targetDifficulty: "intermediate",
          weightPercentage: 12,
          bookPageRef: 30,
          primaryMisconceptions: [
            "تحميل قائمة الدخل بكامل قيمة المخصص الجديد بدلاً من مقدار التغير (الفرق بين الجديد والقديم).",
            "اعتبار انخفاض المخصص خسارة بدلاً من اعتباره إيراداً (انتفاء غرض) يرفع صافي الربح."
          ],
          conceptIds: ["concept-u7-provision-adjustment", "concept-u7-net-receivables"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u7-provision-prudence", titleAr: "مبدأ الحيطة والحذر ومفهوم المخصص", relatedObjectiveIds: ["obj-7-3-1"] },
        { id: "concept-u7-provision-adjustment", titleAr: "تعديل المخصص وأثره كمصروف أو إيراد", relatedObjectiveIds: ["obj-7-3-2"] },
        { id: "concept-u7-net-receivables", titleAr: "صافي رصيد العملاء والعرض في المركز المالي", relatedObjectiveIds: ["obj-7-3-2"] }
      ],
      skills: [
        { id: "skill-7-3-1", titleAr: "حساب تسوية المخصص وصافي حسابات العملاء", taxonomy: "Apply", relatedObjectiveIds: ["obj-7-3-2"] }
      ]
    },
    {
      id: "lesson-4",
      lessonNumber: 4,
      unitId: "unit-7",
      titleAr: "التطبيق العملي المتكامل -- منشأة حسن التجارية",
      subtitleAr: "دمج تسويات الإهلاك والاستبعاد وتعديل المخصص في دورة واحدة، ومقارنة الأثر النسبي على صافي ربح المنشأة",
      textbookPages: [33, 35],
      nominalWeight: 20,
      objectives: [
        {
          id: "obj-7-4-1",
          code: "LO-U7.9",
          lessonId: "lesson-4",
          titleAr: "يدمج تسويات الإهلاك والاستبعاد والمخصص في مسألة عملية شاملة ويحلل الأثر التراكمي على الربح والمركز المالي.",
          taxonomy: "Analyze",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "advanced",
          weightPercentage: 20,
          bookPageRef: 33,
          primaryMisconceptions: [
            "التعامل مع كل تسوية في عزلة دون إدراك أثرها المزدوج على قائمتي الدخل والمركز المالي معاً.",
            "إغفال المقارنة بين التسويات لتحديد العامل الأكثر تأثيراً على نتائج الأعمال."
          ],
          conceptIds: ["concept-u7-integrated-case", "concept-u7-impact-comparison"],
          isJRERequired: false
        }
      ],
      concepts: [
        { id: "concept-u7-integrated-case", titleAr: "حالة منشأة حسن التجارية الشاملة", relatedObjectiveIds: ["obj-7-4-1"] },
        { id: "concept-u7-impact-comparison", titleAr: "مقارنة الآثار النسبية للتسويات على الأرباح", relatedObjectiveIds: ["obj-7-4-1"] }
      ],
      skills: [
        { id: "skill-7-4-1", titleAr: "إجراء التسويات الجردية المجمعة وحساب صافي الأثر المالي", taxonomy: "Analyze", relatedObjectiveIds: ["obj-7-4-1"] }
      ]
    },
    {
      id: "lesson-5",
      lessonNumber: 5,
      unitId: "unit-7",
      titleAr: "الحكم والاستدلال المحاسبي JRE وسلّم الـ 20 درجة",
      subtitleAr: "مناقشة قضية الدقة مقابل التقدير، بناء الحجة المؤيدة والمعارضة، وصياغة حكم مهني متوازن ومبرر بالأدلة",
      textbookPages: [36, 38],
      nominalWeight: 15,
      objectives: [
        {
          id: "obj-7-5-1",
          code: "LO-U7.10",
          lessonId: "lesson-5",
          titleAr: "يبني مقال JRE متوازناً يناقش أثر التقديرات المحاسبية في الإهلاك والمخصصات على موثوقية القوائم المالية وفق سلّم الـ 20 درجة.",
          taxonomy: "Evaluate",
          cognitiveDomain: "HIGHER_ORDER_ANALYSIS",
          targetDifficulty: "challenge",
          weightPercentage: 15,
          bookPageRef: 36,
          primaryMisconceptions: [
            "الاعتقاد بأن القوائم المالية إما أن تكون دقيقة تماماً أو مضللة تماماً بسبب وجود التقديرات.",
            "إغفال الحجة المضادة عند صياغة مقال JRE والاكتفاء برأي أحادي الجانب."
          ],
          conceptIds: ["concept-u7-jre-framework", "concept-u7-estimation-judgment"],
          isJRERequired: true
        }
      ],
      concepts: [
        { id: "concept-u7-jre-framework", titleAr: "إطار كتابة مقال التفسير المحاسبي المدعوم بالأدلة JRE", relatedObjectiveIds: ["obj-7-5-1"] },
        { id: "concept-u7-estimation-judgment", titleAr: "المفاضلة بين الدقة الموضوعية والتقدير المحاسبي المبرر", relatedObjectiveIds: ["obj-7-5-1"] }
      ],
      skills: [
        { id: "skill-7-5-1", titleAr: "صياغة حكم مالي متوازن مدعوم بالأدلة الرقمية ومفاهيم المعايير", taxonomy: "Evaluate", relatedObjectiveIds: ["obj-7-5-1"] }
      ]
    }
  ]
};
