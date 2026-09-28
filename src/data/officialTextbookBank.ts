export interface TraceableQuestion {
  id: string;
  lessonId: string;
  unitId: string;
  learningObjectiveId?: string;
  concept: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced' | 'challenge';
  questionType: 'mcq' | 'true_false' | 'fill_blank' | 'concept' | 'applied' | 'case' | 'analytical' | 'jre' | 't_account' | 'essay';
  type?: string;
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation?: string;
  distractors?: string[];
  tags?: string[];
  sourceMapping?: {
    source_document: string;
    source_page: number;
    concept: string;
  };
  sourceType?: 'official_textbook' | 'training_bank_generated' | 'official_source_content' | string;
  sourceQuestionId?: string;
  sourcePage?: number;
  sourceDocument?: string;
  caseType?: 'unsolved_training' | 'official_JRE_case' | string;
  isSolvedExample?: boolean;
  rubricTotal?: number;
  rubricId?: string;
  originalId?: string;
  skillCode?: string;
  subLo?: string;
  bloomLevel?: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation' | string;
  commonMisconception?: string;
  expectedReasoning?: string;
  distractorRationale?: { option: string; rationale: string; isCorrect?: boolean }[];
  usageMode?: 'training_only' | 'unit_assessment' | 'baccalaureate_simulation';
  marks?: number;
  rubric?: string | { criteria?: { label: string; marks: number }[]; totalMarks?: number; [key: string]: any };
  modelAnswer?: string;
  replacesQuestionId?: string;
  [key: string]: any;
}

/**
 * أسئلة كتاب الوزارة الكاملة المعتمدة (373 سؤالاً موزعة على الوحدات 1-10)
 */
export const bank373Questions: TraceableQuestion[] = [
  {
    "id": "b373-u1-001",
    "sourceQuestionId": "b373-u1-001",
    "originalId": "b373-u1-001",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س1 السؤال الجوهري للوحدة الأولى",
    "difficulty": "basic",
    "questionType": "analytical",
    "bloomLevel": "comprehension",
    "question": "ما المحاسبة؟ ولماذا تُعد لغة الأعمال؟ وكيف تُحول البيانات المالية إلى معلومات نافذة لاتخاذ القرارات؟",
    "correctAnswer": "المحاسبة هي نظام معلومات متكامل يقوم بتحديد، وسجل، وتلخيص، وتوصيل الأحداث الاقتصادية للمنشأة إلى المستفيدين في صورة قوائم مالية. وتُعد لغة الأعمال لأنها توفر الوسيلة الموحدة التي تترجم الأنشطة إلى أرقام مالية قابلة للمقارنة والتقييم.",
    "modelAnswer": "المحاسبة هي نظام معلومات متكامل يقوم بتحديد، وسجل، وتلخيص، وتوصيل الأحداث الاقتصادية للمنشأة إلى المستفيدين في صورة قوائم مالية. وتُعد لغة الأعمال لأنها توفر الوسيلة الموحدة التي تترجم الأنشطة إلى أرقام مالية قابلة للمقارنة والتقييم.",
    "explanation": "تعتمد المحاسبة على تحويل المدخلات (المستندات) عبر عمليات المعالجة (القيد والترحيل) إلى مخرجات (قوائم مالية) لتوفير المساءلة الشفافة للمستثمرين والدائنين والإدارة.",
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "س1 السؤال الجوهري للوحدة الأولى"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "الافتتاحية — مفهوم المحاسبة وأهدافها.",
      "سؤال مقالي تحليلي رئيسي."
    ]
  },
  {
    "id": "b373-u1-002",
    "sourceQuestionId": "b373-u1-002",
    "originalId": "b373-u1-002",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س2 دراسة حالة أمل ومحل الملابس",
    "difficulty": "intermediate",
    "questionType": "case",
    "bloomLevel": "application",
    "question": "افتتحت أمل محلاً لبيع الملابس واعتمدت على ذاكرتها دون تسجيل المعاملات. وفي نهاية الشهر عجزت عن معرفة أرباحها الحقيقية ومديونيات العملاء. كيف يُساعدها المحاسب؟",
    "correctAnswer": "يُساعدها المحاسب بتأسيس نظام محاسبي منتظم يقيد المعاملات فور حدوثها في دفتر اليومية، ويرحلها إلى الأستاذ، ويستخرج قائمة الدخل وقائمة المركز المالي للوقوف على الأرباح الصادقة والديون المستحقة.",
    "modelAnswer": "يُساعدها المحاسب بتأسيس نظام محاسبي منتظم يقيد المعاملات فور حدوثها في دفتر اليومية، ويرحلها إلى الأستاذ، ويستخرج قائمة الدخل وقائمة المركز المالي للوقوف على الأرباح الصادقة والديون المستحقة.",
    "explanation": "الذاكرة البشرية لا تضمن الدقة وتتعرض للنسيان والخلط بين الأموال الشخصية وأموال المشروع (خرق مبدأ الاستقلالية)، والسجلات المنتظمة توفر غطاءً قانونياً ورقابياً.",
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 12,
      "concept": "س2 دراسة حالة أمل ومحل الملابس"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "التطبيق الميداني لحاجات المحاسبة في المشروعات الصغرى.",
      "دراسة حالة سياقية."
    ]
  },
  {
    "id": "b373-u1-003",
    "sourceQuestionId": "b373-u1-003",
    "originalId": "b373-u1-003",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س3 فكر كمحاسب (1)",
    "difficulty": "basic",
    "questionType": "analytical",
    "bloomLevel": "comprehension",
    "question": "لماذا يُصر المحاسبون على وجود فاتورة أو إيصال لكل عملية مالية؟",
    "correctAnswer": "لضمان القابلية للتحقق والموضوعية؛ فالمستند هو الدليل المادي المباشر الذي يثبت وقوع المعاملة بحجمها التاريخي الحقيقي ويمنع التلاعب.",
    "modelAnswer": "لضمان القابلية للتحقق والموضوعية؛ فالمستند هو الدليل المادي المباشر الذي يثبت وقوع المعاملة بحجمها التاريخي الحقيقي ويمنع التلاعب.",
    "explanation": "تطبيق لمبدأ الموضوعية والقياس المالي الموثوق المعتمد في المعايير المحاسبية الموحدة.",
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 13,
      "concept": "س3 فكر كمحاسب (1)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "أهمية المستندات المؤيدة للمعاملات.",
      "سؤال تفكير نقدي."
    ]
  },
  {
    "id": "b373-u1-004",
    "sourceQuestionId": "b373-u1-004",
    "originalId": "b373-u1-004",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س4 اختبر معلوماتك (1)",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "صنف المستفيدين التاليين إلى مستخدمين داخليين وخارجيين: (المستثمرون، مدير الإنتاج، البنوك، مصلحة الضرائب، رئيس مجلس الإدارة).",
    "correctAnswer": "- **مستخدمون داخليون:** مدير الإنتاج، رئيس مجلس الإدارة.\n  - **مستخدمون خارجيون:** المستثمرون، البنوك، مصلحة الضرائب.",
    "modelAnswer": "- **مستخدمون داخليون:** مدير الإنتاج، رئيس مجلس الإدارة.\n  - **مستخدمون خارجيون:** المستثمرون، البنوك، مصلحة الضرائب.",
    "explanation": "الداخليون يستخدمون التقارير الإدارية للتخطيط والرقابة، بينما الخارجيون يستخدمون القوائم المالية العامة لتقييم المخاطر وتحديد الالتزامات.",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 14,
      "concept": "س4 اختبر معلوماتك (1)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "الأطراف المستفيدة من المعلومات المحاسبية.",
      "أسئلة تصنيف واختبار استيعاب."
    ]
  },
  {
    "id": "b373-u1-005",
    "sourceQuestionId": "b373-u1-005",
    "originalId": "b373-u1-005",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س5 مفهوم الشخصية المعنوية المستقلة",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "ما المقصود بفرض الوحدة المحاسبية المستقلة؟ وما أثره على معاملات المالك الشخصية؟",
    "correctAnswer": "يقضي بأن للمنشأة شخصية معنوية مستقلة تماماً عن شخصية مالكها. وتُفصل كافة المعاملات الشخصية للمالك وتُسجل كمحسوبات أو إضافات لرأس المال ولا تخلط بمصروفات النشاط.",
    "modelAnswer": "يقضي بأن للمنشأة شخصية معنوية مستقلة تماماً عن شخصية مالكها. وتُفصل كافة المعاملات الشخصية للمالك وتُسجل كمحسوبات أو إضافات لرأس المال ولا تخلط بمصروفات النشاط.",
    "explanation": "خلط مصروفات المالك الشخصية مع مصروفات المشروع يزيّف أرباح النشاط الحقيقية ويخل بصحة المركز المالي.",
    "sourceType": "official_textbook",
    "sourcePage": 15,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 15,
      "concept": "س5 مفهوم الشخصية المعنوية المستقلة"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "المبادئ والفروض المحاسبية الأساسية.",
      "أسئلة المفاهيم والتعليلات."
    ]
  },
  {
    "id": "b373-u1-006",
    "sourceQuestionId": "b373-u1-006",
    "originalId": "b373-u1-006",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س6 فرض الاستمرارية",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "كيف يؤثر فرض استمرارية المنشأة على تقييم الأصول غير المتداولة؟",
    "correctAnswer": "يفترض الفرض أن المنشأة مستمرة في نشاطها لمدا زمن ممتد؛ ولذا تقيم الأصول غير المتداولة بالتكلفة التاريخية مطروحاً منها مجمع الإهلاك، ولا تقيم بأسعار التصفية الجبرية.",
    "modelAnswer": "يفترض الفرض أن المنشأة مستمرة في نشاطها لمدا زمن ممتد؛ ولذا تقيم الأصول غير المتداولة بالتكلفة التاريخية مطروحاً منها مجمع الإهلاك، ولا تقيم بأسعار التصفية الجبرية.",
    "explanation": "لولا فرض الاستمرارية لوجب إعادة تقييم جميع الأصول بسعر التصفية الفوري بنهاية كل سنة مالية.",
    "sourceType": "official_textbook",
    "sourcePage": 16,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 16,
      "concept": "س6 فرض الاستمرارية"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "الفروض المحاسبية.",
      "سؤال مفهومي وتعليلي."
    ]
  },
  {
    "id": "b373-u1-007",
    "sourceQuestionId": "b373-u1-007",
    "originalId": "b373-u1-007",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س7 فرض وحدة القياس النقدي",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "ما القيد الوارد على فرض وحدة القياس النقدي في الظروف التضخمية؟",
    "correctAnswer": "يفترض أن وحدة النقود ثابته القيمة، ولكن التضخم يضعف القوة الشرائية، مما يجعل تجميع أصول اشتُريت في سنوات مختلفة بقيمها الاسمية التاريخية غير يعكس القوة الشرائية الحقيقية.",
    "modelAnswer": "يفترض أن وحدة النقود ثابته القيمة، ولكن التضخم يضعف القوة الشرائية، مما يجعل تجميع أصول اشتُريت في سنوات مختلفة بقيمها الاسمية التاريخية غير يعكس القوة الشرائية الحقيقية.",
    "explanation": "المحاسبة المالية الموحدة تعتمد الثبات المالي الاسمي لتسهيل القياس والموضوعية وتفادي الذاتية في التقدير.",
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 17,
      "concept": "س7 فرض وحدة القياس النقدي"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "الفروض المحاسبية.",
      "سؤال مناقشة وتحليل."
    ]
  },
  {
    "id": "b373-u1-008",
    "sourceQuestionId": "b373-u1-008",
    "originalId": "b373-u1-008",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س8 مبدأ التكلفة التاريخية",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "عرف مبدأ التكلفة التاريخية، واذكر مزيته الرئيسية.",
    "correctAnswer": "هو إثبات الأصول والخدمات المشتراة بـ القيمة الفعلية المدفوعة وقت اقتنائها. ومزيته الرئيسية هي الموضوعية وإمكانية التحقق المستندي التام دون اجتهاد شخصي.",
    "modelAnswer": "هو إثبات الأصول والخدمات المشتراة بـ القيمة الفعلية المدفوعة وقت اقتنائها. ومزيته الرئيسية هي الموضوعية وإمكانية التحقق المستندي التام دون اجتهاد شخصي.",
    "explanation": "يوفر مبدأ التكلفة التاريخية الثبات والاستقرار للسجلات المالية ويمنع التلاعب بالقوائم المالية.",
    "sourceType": "official_textbook",
    "sourcePage": 18,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 18,
      "concept": "س8 مبدأ التكلفة التاريخية"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "المبادئ المحاسبية.",
      "سؤال مفهومي أساسي."
    ]
  },
  {
    "id": "b373-u1-009",
    "sourceQuestionId": "b373-u1-009",
    "originalId": "b373-u1-009",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س9 التكلفة التاريخية مقابل القيمة السوقية",
    "difficulty": "advanced",
    "questionType": "concept",
    "bloomLevel": "analysis",
    "question": "اشترت شركة قطعة أرض بمبلغ 500,000ج، وبعد سنة ارتفعت قيمتها السوقية إلى 800,000ج. كيف تُسجل بالأوراق المالية؟",
    "correctAnswer": "تظل مسجلة في الدفاتر والقوائم المالية بمبلغ 500,000 جنيه (التكلفة التاريخية)، ولا تُعدل قيمتها بناءً على التقييم السوقي.",
    "modelAnswer": "تظل مسجلة في الدفاتر والقوائم المالية بمبلغ 500,000 جنيه (التكلفة التاريخية)، ولا تُعدل قيمتها بناءً على التقييم السوقي.",
    "explanation": "تطبيق لمبدأ التكلفة التاريخية ومبدأ التحقق؛ فالربح لا يعترف به إلا عند البيع الفعلي والتنازل عن الأصل.",
    "sourceType": "official_textbook",
    "sourcePage": 19,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 19,
      "concept": "س9 التكلفة التاريخية مقابل القيمة السوقية"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "المبادئ المحاسبية.",
      "سؤال مقارنة وتقييم."
    ]
  },
  {
    "id": "b373-u1-010",
    "sourceQuestionId": "b373-u1-010",
    "originalId": "b373-u1-010",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س10 معادلة الميزانية الرئيسية",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "صغ المعادلة المحاسبية الأساسية في أنصع صورها، وعرف مكوناتها الثلاثة.",
    "correctAnswer": "$$\\mathbf{\\text{الأصول} = \\text{الالتزامات} + \\text{حقوق الملكية}}$$\n  - **الأصول:** موارد اقتصادية مملوكة للمنشأة ويتوقع الحصول منها على منافع مستقبلية.\n  - **الالتزامات:** تعهدات وديون على المنشأة لصالح أطراف خارجية.\n  - **حقوق الملكية:** الحصة المتبقية للمالك في أصول المنشأة بعد خصم الالتزامات.",
    "modelAnswer": "$$\\mathbf{\\text{الأصول} = \\text{الالتزامات} + \\text{حقوق الملكية}}$$\n  - **الأصول:** موارد اقتصادية مملوكة للمنشأة ويتوقع الحصول منها على منافع مستقبلية.\n  - **الالتزامات:** تعهدات وديون على المنشأة لصالح أطراف خارجية.\n  - **حقوق الملكية:** الحصة المتبقية للمالك في أصول المنشأة بعد خصم الالتزامات.",
    "explanation": "تمثل هذه المعادلة التوازن الهيكلي المحاسبي المطلق لـ قائمة المركز المالي.",
    "sourceType": "official_textbook",
    "sourcePage": 20,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 20,
      "concept": "س10 معادلة الميزانية الرئيسية"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "معادلة المحاسبة الأساسية.",
      "قانون ومعادلة رياضية."
    ]
  },
  {
    "id": "b373-u1-011",
    "sourceQuestionId": "b373-u1-011",
    "originalId": "unified-u2-q27",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س11 حساب أصل ناقص وتكملة المعادلة",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إذا بلغت الالتزامات 40,000ج، وحقوق الملكية 60,000ج، فما إجمالي الأصول؟",
    "correctAnswer": "الأصول = 40,000 + 60,000 = **100,000 جنيه**.",
    "modelAnswer": "الأصول = 40,000 + 60,000 = **100,000 جنيه**.",
    "explanation": "تطبيق مباشر لجمع حقوق الخصوم والملكية لاستخراج التمويل الكلي لأصول المنشأة.",
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 21,
      "concept": "س11 حساب أصل ناقص وتكملة المعادلة"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تطبيقات معادلة المحاسبة.",
      "مسألة حسابية سريعة."
    ],
    "replacesQuestionId": "unified-u2-q27"
  },
  {
    "id": "b373-u1-012",
    "sourceQuestionId": "b373-u1-012",
    "originalId": "U8-Q12",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س12 حساب حق الملكية المجهول",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "بلغ إجمالي أصول منشأة 150,000ج، والالتزامات على المنشأة 50,000ج. احسب صافي حقوق الملكية.",
    "correctAnswer": "حقوق الملكية = 150,000 - 50,000 = **100,000 جنيه**.",
    "modelAnswer": "حقوق الملكية = 150,000 - 50,000 = **100,000 جنيه**.",
    "explanation": "صافي الملكية يمثل حقوق المالك الصافية بعد استبعاد مطالبات الدائنين الخارجيين.",
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 21,
      "concept": "س12 حساب حق الملكية المجهول"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تطبيقات معادلة المحاسبة.",
      "مسألة حسابية سريعة."
    ],
    "replacesQuestionId": "U8-Q12"
  },
  {
    "id": "b373-u1-013",
    "sourceQuestionId": "b373-u1-013",
    "originalId": "b373-u1-013",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س13 حساب الالتزام المجهول",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "بلغ إجمالي الأصول 220,000ج، وحقوق الملكية 180,000ج. احسب قيمة الالتزامات المستحقة على المنشأة.",
    "correctAnswer": "الالتزامات = 220,000 - 180,000 = **40,000 جنيه**.",
    "modelAnswer": "الالتزامات = 220,000 - 180,000 = **40,000 جنيه**.",
    "explanation": "يعكس الديون الخارجيّة المترتبة على اقتناء جزء من الأصول.",
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 22,
      "concept": "س13 حساب الالتزام المجهول"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تطبيقات معادلة المحاسبة.",
      "مسألة حسابية سريعة."
    ]
  },
  {
    "id": "b373-u1-014",
    "sourceQuestionId": "b373-u1-014",
    "originalId": "b373-u1-014",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س14 أثر المعاملات: الاستثمار النقدي في المشروع",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "أودع المالك 100,000ج نقداً كأول استثمار لتأسيس الشركة. كيف تؤثر هذه العملية في معادلة الميزانية؟",
    "correctAnswer": "زيادة أصل النقدية بمبلغ 100,000ج، وزيادة حقوق الملكية (رأس المال) بمبلغ 100,000ج مع بقاء المعادلة متوازنة.",
    "modelAnswer": "زيادة أصل النقدية بمبلغ 100,000ج، وزيادة حقوق الملكية (رأس المال) بمبلغ 100,000ج مع بقاء المعادلة متوازنة.",
    "explanation": "تدفق نقدي مدين يزود الأصول المتداولة يقابله حق رأسمالي دائن يزود حقوق الملكية.",
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 23,
      "concept": "س14 أثر المعاملات: الاستثمار النقدي في المشروع"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-015",
    "sourceQuestionId": "b373-u1-015",
    "originalId": "b373-u1-015",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س15 أثر المعاملات: شراء أصل نقداً",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "اشترت المنشأة معدات بمبلغ 20,000ج نقداً. بيّن أثر العملية على المعادلة.",
    "correctAnswer": "زيادة أصل (المعدات) بمبلغ 20,000ج، ونقص أصل آخر (النقدية) بمبلغ 20,000ج، دون تغيير في إجمالي الأصول أو الخصوم.",
    "modelAnswer": "زيادة أصل (المعدات) بمبلغ 20,000ج، ونقص أصل آخر (النقدية) بمبلغ 20,000ج، دون تغيير في إجمالي الأصول أو الخصوم.",
    "explanation": "معاملة تبادلية داخل جانب الأصول (تحول شكل الأصل من سيولة إلى أصل غير متداول).",
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 23,
      "concept": "س15 أثر المعاملات: شراء أصل نقداً"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-016",
    "sourceQuestionId": "b373-u1-016",
    "originalId": "b373-u1-016",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س16 أثر المعاملات: شراء أصل على الحساب (بالآجل)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "اشترت المنشأة بضاعة بمبلغ 30,000ج بالآجل من الموردين. احسب أثر المعاملة.",
    "correctAnswer": "زيادة أصل (المخزون/البضاعة) بمبلغ 30,000ج، وزيادة الالتزامات (الموردين/الدائنين) بمبلغ 30,000ج.",
    "modelAnswer": "زيادة أصل (المخزون/البضاعة) بمبلغ 30,000ج، وزيادة الالتزامات (الموردين/الدائنين) بمبلغ 30,000ج.",
    "explanation": "زيادة مزدوجة في جانبي المعادلة (الأصول والالتزامات) بنفس القيمة.",
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 24,
      "concept": "س16 أثر المعاملات: شراء أصل على الحساب (بالآجل)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-017",
    "sourceQuestionId": "b373-u1-017",
    "originalId": "b373-u1-017",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س17 أثر المعاملات: تقديم خدمة نقداً (إيراد)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "قدمت المنشأة خدمات استشارية للعملاء وحصلت 15,000ج نقداً. ما الأثر؟",
    "correctAnswer": "زيادة أصل (النقدية) بمبلغ 15,000ج، وزيادة حقوق الملكية (الإيرادات) بمبلغ 15,000ج.",
    "modelAnswer": "زيادة أصل (النقدية) بمبلغ 15,000ج، وزيادة حقوق الملكية (الإيرادات) بمبلغ 15,000ج.",
    "explanation": "الإيراد يزيد من صافي أرباح المنشأة وبالتالي يزود حقوق الملكية.",
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 24,
      "concept": "س17 أثر المعاملات: تقديم خدمة نقداً (إيراد)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-018",
    "sourceQuestionId": "b373-u1-018",
    "originalId": "b373-u1-018",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س18 أثر المعاملات: تقديم خدمة بالآجل",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "أدّت المنشأة خدمات لعميل بمبلغ 8,000ج على أن يُسدد الشهر القادم. ما الأثر؟",
    "correctAnswer": "زيادة أصل (المدينين/حسابات العملاء) بمبلغ 8,000ج، وزيادة حقوق الملكية (الإيرادات) بمبلغ 8,000ج.",
    "modelAnswer": "زيادة أصل (المدينين/حسابات العملاء) بمبلغ 8,000ج، وزيادة حقوق الملكية (الإيرادات) بمبلغ 8,000ج.",
    "explanation": "اعتراف بالإيراد فور التحقق وإتمام الخدمة تطبيقاً لـ أساس الاستحقاق.",
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 25,
      "concept": "س18 أثر المعاملات: تقديم خدمة بالآجل"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-019",
    "sourceQuestionId": "b373-u1-019",
    "originalId": "b373-u1-019",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س19 أثر المعاملات: سداد مصروفات تشغيلية نقداً",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "دفعت المنشأة 5,000ج نقداً أجور العاملين وإيجار المقر. ما الأثر؟",
    "correctAnswer": "نقص أصل (النقدية) بمبلغ 5,000ج، ونقص حقوق الملكية (المصروفات) بمبلغ 5,000ج.",
    "modelAnswer": "نقص أصل (النقدية) بمبلغ 5,000ج، ونقص حقوق الملكية (المصروفات) بمبلغ 5,000ج.",
    "explanation": "المصروفات تخصم من الإيرادات وتؤدي إلى تخفيض صافي ثروة المالك.",
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 25,
      "concept": "س19 أثر المعاملات: سداد مصروفات تشغيلية نقداً"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-020",
    "sourceQuestionId": "b373-u1-020",
    "originalId": "b373-u1-020",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س20 أثر المعاملات: سداد جزء من ديون الموردين",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "سددت المنشأة 10,000ج نقداً للموردين رصيد مستحق سابق. ما الأثر؟",
    "correctAnswer": "نقص أصل (النقدية) بمبلغ 10,000ج، ونقص الالتزامات (حساب الموردين) بمبلغ 10,000ج.",
    "modelAnswer": "نقص أصل (النقدية) بمبلغ 10,000ج، ونقص الالتزامات (حساب الموردين) بمبلغ 10,000ج.",
    "explanation": "انخفاض متوازٍ في جانب الأصول وجانب الالتزامات دون مساس بحقوق الملكية.",
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 26,
      "concept": "س20 أثر المعاملات: سداد جزء من ديون الموردين"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-021",
    "sourceQuestionId": "b373-u1-021",
    "originalId": "b373-u1-021",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س21 أثر المعاملات: تحصيل مبالغ مستحقة من العملاء",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "حصلت المنشأة 4,000ج نقداً من عميل سابق كان مسجلاً بالآجل. ما الأثر؟",
    "correctAnswer": "زيادة أصل (النقدية) بمبلغ 4,000ج، ونقص أصل آخر (حساب العملاء/المدينين) بمبلغ 4,000ج.",
    "modelAnswer": "زيادة أصل (النقدية) بمبلغ 4,000ج، ونقص أصل آخر (حساب العملاء/المدينين) بمبلغ 4,000ج.",
    "explanation": "تحول أصل غير نقدي (حق تحصيل) إلى أصل نقدي جاهز.",
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 26,
      "concept": "س21 أثر المعاملات: تحصيل مبالغ مستحقة من العملاء"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ]
  },
  {
    "id": "b373-u1-022",
    "sourceQuestionId": "b373-u1-022",
    "originalId": "eb-mcq-015",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س22 أثر المعاملات: المسحوبات الشخصية للمالك",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "سحب المالك 3,000ج نقداً لاستخدامه المنزلي الشخصي. ما الأثر؟",
    "correctAnswer": "نقص أصل (النقدية) بمبلغ 3,000ج، ونقص حقوق الملكية (حساب المسحوبات) بمبلغ 3,000ج.",
    "modelAnswer": "نقص أصل (النقدية) بمبلغ 3,000ج، ونقص حقوق الملكية (حساب المسحوبات) بمبلغ 3,000ج.",
    "explanation": "المسحوبات تخفض حقوق الملكية مباشرة وتفصل تماماً عن المصروفات التشغيلية.",
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 27,
      "concept": "س22 أثر المعاملات: المسحوبات الشخصية للمالك"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ],
    "replacesQuestionId": "eb-mcq-015"
  },
  {
    "id": "b373-u1-023",
    "sourceQuestionId": "b373-u1-023",
    "originalId": "eb2-mcq-003",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س23 أثر المعاملات: الاقتراض النقدي من البنك",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "اقترضت المنشأة 50,000ج من البنك وأودع المبلغ بحسابها الجاري. ما الأثر؟",
    "correctAnswer": "زيادة أصل (بنك/نقدية) بمبلغ 50,000ج، وزيادة الالتزامات (القروض البنكية) بمبلغ 50,000ج.",
    "modelAnswer": "زيادة أصل (بنك/نقدية) بمبلغ 50,000ج، وزيادة الالتزامات (القروض البنكية) بمبلغ 50,000ج.",
    "explanation": "تدفق نقدي وارد يزيد الأصول يرافقه التزام محدد الأجل على المنشأة.",
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 27,
      "concept": "س23 أثر المعاملات: الاقتراض النقدي من البنك"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تحليل أثر المعاملات على المعادلة.",
      "تحليل أثر معاملة."
    ],
    "replacesQuestionId": "eb2-mcq-003"
  },
  {
    "id": "b373-u1-024",
    "sourceQuestionId": "b373-u1-024",
    "originalId": "eb-tac-001",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س24 جدول التغيرات التراكمي للمعاملات (10 معاملات متتالية)",
    "difficulty": "advanced",
    "questionType": "applied",
    "bloomLevel": "analysis",
    "question": "بدأت منشأة نشاطها بـ 80,000ج نقدية كـ رأس مال، ثم اشترت أثاثاً بـ 10,000ج نقداً، وبضاعة بالآجل بـ 15,000ج، وباعت بضاعة نقداً بـ 12,000ج (تكلفتها 8,000ج)، ودفعت إيجاراً بـ 2,000ج. أعد جدول توازن المعادلة المحاسبية واستخرج الرصيد النهائى.",
    "correctAnswer": "- النقدية = 80,000 - 10,000 + 12,000 - 2,000 = **80,000 جنيه**.\n  - الأثاث = **10,000 جنيه**.\n  - البضاعة/المخزون = 15,000 - 8,000 = **7,000 جنيه**.\n  - **إجمالي الأصول** = 80,000 + 10,000 + 7,000 = **97,000 جنيه**.\n  - **الالتزامات (الموردين)** = **15,000 جنيه**.\n  - **حقوق الملكية** = 80,000 (رأس مال) + 4,000 (ربح بيع بضاعة) - 2,000 (إيجار) = **82,000 جنيه**.\n  - **توازن المعادلة:** الأصول (97,000ج) = الالتزامات (15,000ج) + حقوق الملكية (82,000ج).",
    "modelAnswer": "- النقدية = 80,000 - 10,000 + 12,000 - 2,000 = **80,000 جنيه**.\n  - الأثاث = **10,000 جنيه**.\n  - البضاعة/المخزون = 15,000 - 8,000 = **7,000 جنيه**.\n  - **إجمالي الأصول** = 80,000 + 10,000 + 7,000 = **97,000 جنيه**.\n  - **الالتزامات (الموردين)** = **15,000 جنيه**.\n  - **حقوق الملكية** = 80,000 (رأس مال) + 4,000 (ربح بيع بضاعة) - 2,000 (إيجار) = **82,000 جنيه**.\n  - **توازن المعادلة:** الأصول (97,000ج) = الالتزامات (15,000ج) + حقوق الملكية (82,000ج).",
    "explanation": "يثبت أن المعادلة تظل متوازنة تماماً عقب كل معاملة منفردة وعقب تجميع رصيد الفترات.",
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 28,
      "concept": "س24 جدول التغيرات التراكمي للمعاملات (10 معاملات متتالية)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "التطبيق المتكامل للمعادلة المحاسبية.",
      "مسألة جدولية متكاملة."
    ],
    "replacesQuestionId": "eb-tac-001"
  },
  {
    "id": "b373-u1-025",
    "sourceQuestionId": "b373-u1-025",
    "originalId": "eb-mcq-046",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س25 تمرين حسابي شامل (1): تجميع الأصول والخصوم",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "بلغت عناصر المنشأة: نقدية 25,000ج، مباني 100,000ج، عملاء 15,000ج، موردون 30,000ج، قروض 20,000ج. احسب رأس المال المتمم.",
    "correctAnswer": "- إجمالي الأصول = 25,000 + 100,000 + 15,000 = **140,000 جنيه**.\n  - إجمالي الالتزامات = 30,000 + 20,000 = **50,000 جنيه**.\n  - رأس المال = 140,000 - 50,000 = **90,000 جنيه**.",
    "modelAnswer": "- إجمالي الأصول = 25,000 + 100,000 + 15,000 = **140,000 جنيه**.\n  - إجمالي الالتزامات = 30,000 + 20,000 = **50,000 جنيه**.\n  - رأس المال = 140,000 - 50,000 = **90,000 جنيه**.",
    "explanation": "تطبيق القاعدة الرياضية لاستخراج المتمم الحسابي لصافي الحقوق.",
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 29,
      "concept": "س25 تمرين حسابي شامل (1): تجميع الأصول والخصوم"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تدريبات الوحدة الأولى.",
      "مسألة حسابية."
    ],
    "replacesQuestionId": "eb-mcq-046"
  },
  {
    "id": "b373-u1-026",
    "sourceQuestionId": "b373-u1-026",
    "originalId": "U5-Q21",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س26 تمرين حسابي شامل (2): أثر الأرباح على الملكية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "كان رأس المال أول الفترة 60,000ج، وبلغت الإيرادات 40,000ج والمصروفات 25,000ج والمسحوبات 5,000ج. احسب رأس المال نهاية الفترة.",
    "correctAnswer": "- صافي الربح = 40,000 - 25,000 = **15,000 جنيه**.\n  - رأس مال آخر الفترة = 60,000 + 15,000 - 5,000 = **70,000 جنيه**.",
    "modelAnswer": "- صافي الربح = 40,000 - 25,000 = **15,000 جنيه**.\n  - رأس مال آخر الفترة = 60,000 + 15,000 - 5,000 = **70,000 جنيه**.",
    "explanation": "صافي الربح يضاف للملكية والمسحوبات تخصم منها للوصول لرأس المال المعدل.",
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 29,
      "concept": "س26 تمرين حسابي شامل (2): أثر الأرباح على الملكية"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تدريبات الوحدة الأولى.",
      "مسألة حسابية."
    ],
    "replacesQuestionId": "U5-Q21"
  },
  {
    "id": "b373-u1-027",
    "sourceQuestionId": "b373-u1-027",
    "originalId": "b373-u1-027",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س27 تمرين استخراج التغير في الأصول",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "خلال السنة زادت الالتزامات بمبلغ 12,000ج وزادت حقوق الملكية بمبلغ 18,000ج. احسب التغير الصافي في إجمالي الأصول.",
    "correctAnswer": "التغير في الأصول = 12,000 + 18,000 = **زيادة بمبلغ 30,000 جنيه**.",
    "modelAnswer": "التغير في الأصول = 12,000 + 18,000 = **زيادة بمبلغ 30,000 جنيه**.",
    "explanation": "أي زيادة في جانب الخصوم والملكية قابابها حتما زيادة موازية في جانب الأصول.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س27 تمرين استخراج التغير في الأصول"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تدريبات الوحدة الأولى.",
      "مسألة حسابية."
    ]
  },
  {
    "id": "b373-u1-028",
    "sourceQuestionId": "b373-u1-028",
    "originalId": "b373-u1-028",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س28 تمرين استخراج التغير في الملكية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "زادت الأصول بمبلغ 45,000ج ونقصت الالتزامات بمبلغ 10,000ج. احسب التغير في حقوق الملكية.",
    "correctAnswer": "التغير في حقوق الملكية = 45,000 - (-10,000) = **زيادة بمبلغ 55,000 جنيه**.",
    "modelAnswer": "التغير في حقوق الملكية = 45,000 - (-10,000) = **زيادة بمبلغ 55,000 جنيه**.",
    "explanation": "زيادة الأصول وانخفاض الديون يصبان معاً في تعظيم ثروة مالك المنشأة.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س28 تمرين استخراج التغير في الملكية"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تدريبات الوحدة الأولى.",
      "مسألة حسابية."
    ]
  },
  {
    "id": "b373-u1-029",
    "sourceQuestionId": "b373-u1-029",
    "originalId": "b373-u1-029",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س29 أسئلة الاختيار من متعدد (1)",
    "difficulty": "basic",
    "questionType": "mcq",
    "bloomLevel": "knowledge",
    "question": "أي من البنود التالية يُعد أصلاً متداولاً؟",
    "correctAnswer": "النقدية بالبنك",
    "modelAnswer": "**(ج) النقدية بالبنك**.",
    "explanation": "النقدية أصل نقد متداول سريع السيولة، بينما المباني غير متداولة والموردون التزام ورأس المال حق ملكية.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س29 أسئلة الاختيار من متعدد (1)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة مفاهيم الوحدة الأولى.",
      "اختيار من متعدد."
    ],
    "options": [
      "المباني",
      "الموردون",
      "النقدية بالبنك",
      "رأس المال."
    ],
    "distractors": [
      "المباني",
      "الموردون",
      "رأس المال."
    ]
  },
  {
    "id": "b373-u1-030",
    "sourceQuestionId": "b373-u1-030",
    "originalId": "b373-u1-030",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س30 أسئلة الاختيار من متعدد (2)",
    "difficulty": "basic",
    "questionType": "mcq",
    "bloomLevel": "comprehension",
    "question": "شراء سيارة لاستخدام المنشأة نقداً يؤدي إلى:",
    "correctAnswer": "عدم تغير إجمالي الأصول",
    "modelAnswer": "**(ج) عدم تغير إجمالي الأصول**.",
    "explanation": "لأنه زيادة في أصل (السيارات) يرافقها نقص مساوٍ في أصل آخر (النقدية).",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س30 أسئلة الاختيار من متعدد (2)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة مفاهيم الوحدة الأولى.",
      "اختيار من متعدد."
    ],
    "options": [
      "زيادة الأصول والالتزامات",
      "زيادة الأصول ونقص حقوق الملكية",
      "عدم تغير إجمالي الأصول",
      "زيادة الأصول وحقوق الملكية."
    ],
    "distractors": [
      "زيادة الأصول والالتزامات",
      "زيادة الأصول ونقص حقوق الملكية",
      "زيادة الأصول وحقوق الملكية."
    ]
  },
  {
    "id": "b373-u1-031",
    "sourceQuestionId": "b373-u1-031",
    "originalId": "b373-u1-031",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س31 أسئلة الاختيار من متعدد (3)",
    "difficulty": "basic",
    "questionType": "mcq",
    "bloomLevel": "comprehension",
    "question": "تقديم خدمة لعميل على الحساب يؤدي إلى:",
    "correctAnswer": "زيادة الأصول وزيادة حقوق الملكية",
    "modelAnswer": "**(أ) زيادة الأصول وزيادة حقوق الملكية**.",
    "explanation": "يزود أصل العملاء/المدينين ويزود حقوق الملكية (الإيرادات).",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س31 أسئلة الاختيار من متعدد (3)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة مفاهيم الوحدة الأولى.",
      "اختيار من متعدد."
    ],
    "options": [
      "زيادة الأصول وزيادة حقوق الملكية",
      "زيادة الأصول وزيادة الالتزامات",
      "نقص الأصول وزيادة الملكية",
      "لا شيء مما سبق."
    ],
    "distractors": [
      "زيادة الأصول وزيادة الالتزامات",
      "نقص الأصول وزيادة الملكية",
      "لا شيء مما سبق."
    ]
  },
  {
    "id": "b373-u1-032",
    "sourceQuestionId": "b373-u1-032",
    "originalId": "b373-u1-032",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س32 أسئلة الاختيار من متعدد (4)",
    "difficulty": "basic",
    "questionType": "mcq",
    "bloomLevel": "knowledge",
    "question": "الفرض المحاسبي الذي يفصل معاملات المنشأة عن معاملات المالك هو:",
    "correctAnswer": "الوحدة المحاسبية المستقلة",
    "modelAnswer": "**(ب) الوحدة المحاسبية المستقلة**.",
    "explanation": "يستند لقاعدة الاستقلالية القانونية والمالية للكيان التجاري.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س32 أسئلة الاختيار من متعدد (4)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة مفاهيم الوحدة الأولى.",
      "اختيار من متعدد."
    ],
    "options": [
      "الاستمرارية",
      "الوحدة المحاسبية المستقلة",
      "التكلفة التاريخية",
      "القياس النقدي."
    ],
    "distractors": [
      "الاستمرارية",
      "التكلفة التاريخية",
      "القياس النقدي."
    ]
  },
  {
    "id": "b373-u1-033",
    "sourceQuestionId": "b373-u1-033",
    "originalId": "b373-u1-033",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س33 أسئلة الاختيار من متعدد (5)",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "إذا كان إجمالي الأصول 90,000ج والالتزامات ثلث الأصول، فإن حقوق الملكية تساوي:",
    "correctAnswer": "60,000ج",
    "modelAnswer": "**(ب) 60,000 جنيه**.",
    "explanation": "الالتزامات = 90,000 / 3 = 30,000ج؛ حقوق الملكية = 90,000 - 30,000 = 60,000 جنيه.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س33 أسئلة الاختيار من متعدد (5)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة مفاهيم الوحدة الأولى.",
      "اختيار من متعدد."
    ],
    "options": [
      "30,000ج",
      "60,000ج",
      "90,000ج",
      "120,000ج."
    ],
    "distractors": [
      "30,000ج",
      "90,000ج",
      "120,000ج."
    ]
  },
  {
    "id": "b373-u1-034",
    "sourceQuestionId": "b373-u1-034",
    "originalId": "b373-u1-034",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س34 أسئلة صح أم خطأ (1)",
    "difficulty": "basic",
    "questionType": "true_false",
    "bloomLevel": "knowledge",
    "question": "تُعد المصروفات أصلاً من أصول المنشأة. (صح / خطأ).",
    "correctAnswer": false,
    "modelAnswer": "**خطأ**. التصحيح: المصروفات تكاليف مستنفدة لتوليد الإيرادات وتخصم من حقوق الملكية.",
    "explanation": "الأصول تكاليف غير مستنفدة تدعم منافع مستقبلية، بينما المصروف منافع تم استهلاكها بالفعل.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س34 أسئلة صح أم خطأ (1)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة المفاهيم.",
      "صح أو خطأ مع التصحيح."
    ]
  },
  {
    "id": "b373-u1-035",
    "sourceQuestionId": "b373-u1-035",
    "originalId": "b373-u1-035",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "س35 أسئلة صح أم خطأ (2)",
    "difficulty": "basic",
    "questionType": "true_false",
    "bloomLevel": "comprehension",
    "question": "ينص مبدأ التكلفة التاريخية على تقييم الأصول بأسعار إعادة الشراء السوقية بنهاية السنة. (صح / خطأ).",
    "correctAnswer": false,
    "modelAnswer": "**خطأ**. التصحيح: ينص على تقييم الأصول بسعر اقتنائها الفعلي التاريخي المسجل بالمستندات.",
    "explanation": "تقييم الأصول بأسعار السوق يخرق مبادئ التكلفة التاريخية والموضوعية.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س35 أسئلة صح أم خطأ (2)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة المفاهيم.",
      "صح أو خطأ مع التصحيح."
    ]
  },
  {
    "id": "b373-u1-036",
    "sourceQuestionId": "b373-u1-036",
    "originalId": "b373-u1-036",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س36 أسئلة صح أم خطأ (3)",
    "difficulty": "basic",
    "questionType": "true_false",
    "bloomLevel": "comprehension",
    "question": "المسحوبات الشخصية تزيد من صافي حقوق الملكية في قائمة المركز المالي. (صح / خطأ).",
    "correctAnswer": false,
    "modelAnswer": "**خطأ**. التصحيح: المسحوبات الشخصية تخفض وتستقطع من حقوق الملكية.",
    "explanation": "لأنها تُمثل تدفقاً نقدياً خارجاً لصالح المالك شخصياً وتستبعد من حقوقه في المشروع.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س36 أسئلة صح أم خطأ (3)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة المفاهيم.",
      "صح أو خطأ مع التصحيح."
    ]
  },
  {
    "id": "b373-u1-037",
    "sourceQuestionId": "b373-u1-037",
    "originalId": "b373-u1-037",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س37 أسئلة صح أم خطأ (4)",
    "difficulty": "basic",
    "questionType": "true_false",
    "bloomLevel": "knowledge",
    "question": "المستثمرون والبنوك يُعدون من المستخدمين الداخليين للقوائم المالية. (صح / خطأ).",
    "correctAnswer": false,
    "modelAnswer": "**خطأ**. التصحيح: يُعدون من المستخدمين الخارجيين.",
    "explanation": "لا يشاركون في الإدارة اليومية ويحللون القوائم الخارجية لاتخاذ القرارات الاستثمارية والائتمانية.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س37 أسئلة صح أم خطأ (4)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة المفاهيم.",
      "صح أو خطأ مع التصحيح."
    ]
  },
  {
    "id": "b373-u1-038",
    "sourceQuestionId": "b373-u1-038",
    "originalId": "b373-u1-038",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "س38 أسئلة صح أم خطأ (5)",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "bloomLevel": "application",
    "question": "سداد التزام للموردين نقداً يؤدي إلى نقص الأصول ونقص الالتزامات بذات المبلغ. (صح / خطأ).",
    "correctAnswer": true,
    "modelAnswer": "**صواب (صح)**.",
    "explanation": "ينخفض أصل النقدية وينخفض التزام الموردين بذات القيمة مع بقاء المعادلة متوازنة.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س38 أسئلة صح أم خطأ (5)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "مراجعة المفاهيم.",
      "صح أو خطأ مع التصحيح."
    ]
  },
  {
    "id": "b373-u1-039",
    "sourceQuestionId": "b373-u1-039",
    "originalId": "b373-u1-039",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س39 تحديد نوع الحساب (أصل، التزام، ملكية، إيراد، مصروف)",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "صنف البنود التالية: (1) الأثاث (2) أجور العاملين (3) إيراد الاستشارات (4) القروض البنكية (5) أوراق الدفع (6) رأس المال.",
    "correctAnswer": "1. الأثاث = **أصل غير متداول**.\n  2. أجور العاملين = **مصروف تشغيلي**.\n  3. إيراد الاستشارات = **إيراد نشاط**.\n  4. القروض البنكية = **التزام غير متداول/متداول**.\n  5. أوراق الدفع = **التزام متداول**.\n  6. رأس المال = **حقوق ملكية**.",
    "modelAnswer": "1. الأثاث = **أصل غير متداول**.\n  2. أجور العاملين = **مصروف تشغيلي**.\n  3. إيراد الاستشارات = **إيراد نشاط**.\n  4. القروض البنكية = **التزام غير متداول/متداول**.\n  5. أوراق الدفع = **التزام متداول**.\n  6. رأس المال = **حقوق ملكية**.",
    "explanation": "تصنيف الحسابات يمثل الخطوة الأولى قبل قيود اليومية وإعداد القوائم.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س39 تحديد نوع الحساب (أصل، التزام، ملكية، إيراد، مصروف)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تصنيف الحسابات.",
      "سؤال تصنيف."
    ]
  },
  {
    "id": "b373-u1-040",
    "sourceQuestionId": "b373-u1-040",
    "originalId": "b373-u1-040",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "س40 التفرقة بين الأصل المتداول وغير المتداول",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "ما المعيار الأساسي للتفرقة بين الأصل المتداول والأصل غير المتداول؟",
    "correctAnswer": "**معيار الفترة المالية (السنة) والسيولة**؛ فالأصل المتداول ينقد أو يستهلك أو يباع خلال سنة مالية واحدة أو دورة تشغيلية أيهما أطول (كالنقدية والبضاعة)، بينما الأصل غير المتداول يقتنى بهدف الاستخدام المستمر لأكثر من سنة (كالآلات والمباني).",
    "modelAnswer": "**معيار الفترة المالية (السنة) والسيولة**؛ فالأصل المتداول ينقد أو يستهلك أو يباع خلال سنة مالية واحدة أو دورة تشغيلية أيهما أطول (كالنقدية والبضاعة)، بينما الأصل غير المتداول يقتنى بهدف الاستخدام المستمر لأكثر من سنة (كالآلات والمباني).",
    "explanation": "العرض بـ قائمة المركز المالي يفرض تبويب الأصول حسب سيولتها ورغبة المنشأة في الاقتناء.",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "س40 التفرقة بين الأصل المتداول وغير المتداول"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "تصنيف الأصول.",
      "سؤال مفاهيمي."
    ]
  },
  {
    "id": "b373-u1-041",
    "sourceQuestionId": "b373-u1-041",
    "originalId": "b373-u1-041",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-4",
    "concept": "س41 المقال المحاسبي الشامل لـ الوحدة الأولى (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة التالية في مقال محاسبي محكم: **\"هل يضمن الاتساق الداخلي والتوازن العددي لمعادلة الميزانية وميزان المراجعة التمثيل الصادق والعدالة الكاملة للقوائم المالية، أم أنه مجرد اختبار شكلي للتوازن الحسابي؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالاتساق الداخلي والتوازن العددي لمعادلة الميزانية وميزان المراجعة شرط ضروري وأساسي ولكنه غير كافٍ بمفرده لضمان التمثيل الصادق والعدالة الكاملة للقوائم المالية؛ فهو اختبار شكلي للتوازن الحسابي فقط.\n\n2. التفسير والتعليل (4 درجات):\nلأن التوازن الحسابي يثبت فقط أن إجمالي الأرصدة المدينة يطابق إجمالي الأرصدة الدائنة وفقاً لقواعد القيد المزدوج؛ ولكنه لا يضمن الخلو من الأخطاء التي لا تخل بالتوازن (مثل حذف معاملة بالكامل، أو القيد بحساب خاطئ، أو الأخطاء التكافؤية)، ولا يضمن تطبيق المعايير والمبادئ المحاسبية بحيادية.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الأولى (4 درجات):\n• مبدأ التكلفة التاريخية: إثبات الأرض بمبلغ 500,000ج بينما قيمتها السوقية 800,000ج يحقق التوازن العددي تماماً، ولكنه لا يعكس القيمة الجارية للثروة.\n• فرض الوحدة المحاسبية: إذا قيد المالك مصروفه الشخصي ضمن مصروفات المنشأة، فإن المعادلة تظل متوازنة حسابياً، ولكن القوائم المالية تفقد تمثيلها الصادق لتضخيم المصروفات وتخفيض الربح.\n• سهو قيد عملية: عدم تسجيل فاتورة مبيعات آثرت بـ 10,000ج يبقي المعادلة متوازنة، ولكنه يخفي أصلاً وإيراداً حقيقياً.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المراجعين التنازليين أن التوازن العددي هو المعيار الأول والأخير للمصداقية بدعوى منع الاختلاسات الحسابية؛ والرد المحاسبي أن التوازن الحسابي قد يخفي تحريفات وتدليسات جوهرية لا تظهر بمجرد النظر للأرقام، وأن التمثيل الصادق يتطلب الفحص المستندي والالتزام بالأخلاقيات والمبادئ.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن العددي يمثل الهيكل الرياضي الخارجي للمحاسبة، بينما يمثل التمثيل الصادق جوهرها ومضمونها؛ والعدالة الكاملة للقوائم المالية تجتمع متى ما اقترن التوازن الرياضي بالالتزام الصارم بالشفافية، والحيطة والحذر، والموضوعية المستندية.\n```\n\n---\n\n## 📘 الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالاتساق الداخلي والتوازن العددي لمعادلة الميزانية وميزان المراجعة شرط ضروري وأساسي ولكنه غير كافٍ بمفرده لضمان التمثيل الصادق والعدالة الكاملة للقوائم المالية؛ فهو اختبار شكلي للتوازن الحسابي فقط.\n\n2. التفسير والتعليل (4 درجات):\nلأن التوازن الحسابي يثبت فقط أن إجمالي الأرصدة المدينة يطابق إجمالي الأرصدة الدائنة وفقاً لقواعد القيد المزدوج؛ ولكنه لا يضمن الخلو من الأخطاء التي لا تخل بالتوازن (مثل حذف معاملة بالكامل، أو القيد بحساب خاطئ، أو الأخطاء التكافؤية)، ولا يضمن تطبيق المعايير والمبادئ المحاسبية بحيادية.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الأولى (4 درجات):\n• مبدأ التكلفة التاريخية: إثبات الأرض بمبلغ 500,000ج بينما قيمتها السوقية 800,000ج يحقق التوازن العددي تماماً، ولكنه لا يعكس القيمة الجارية للثروة.\n• فرض الوحدة المحاسبية: إذا قيد المالك مصروفه الشخصي ضمن مصروفات المنشأة، فإن المعادلة تظل متوازنة حسابياً، ولكن القوائم المالية تفقد تمثيلها الصادق لتضخيم المصروفات وتخفيض الربح.\n• سهو قيد عملية: عدم تسجيل فاتورة مبيعات آثرت بـ 10,000ج يبقي المعادلة متوازنة، ولكنه يخفي أصلاً وإيراداً حقيقياً.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المراجعين التنازليين أن التوازن العددي هو المعيار الأول والأخير للمصداقية بدعوى منع الاختلاسات الحسابية؛ والرد المحاسبي أن التوازن الحسابي قد يخفي تحريفات وتدليسات جوهرية لا تظهر بمجرد النظر للأرقام، وأن التمثيل الصادق يتطلب الفحص المستندي والالتزام بالأخلاقيات والمبادئ.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن العددي يمثل الهيكل الرياضي الخارجي للمحاسبة، بينما يمثل التمثيل الصادق جوهرها ومضمونها؛ والعدالة الكاملة للقوائم المالية تجتمع متى ما اقترن التوازن الرياضي بالالتزام الصارم بالشفافية، والحيطة والحذر، والموضوعية المستندية.\n```\n\n---\n\n## 📘 الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nالاتساق الداخلي والتوازن العددي لمعادلة الميزانية وميزان المراجعة شرط ضروري وأساسي ولكنه غير كافٍ بمفرده لضمان التمثيل الصادق والعدالة الكاملة للقوائم المالية؛ فهو اختبار شكلي للتوازن الحسابي فقط.\n\n2. التفسير والتعليل (4 درجات):\nلأن التوازن الحسابي يثبت فقط أن إجمالي الأرصدة المدينة يطابق إجمالي الأرصدة الدائنة وفقاً لقواعد القيد المزدوج؛ ولكنه لا يضمن الخلو من الأخطاء التي لا تخل بالتوازن (مثل حذف معاملة بالكامل، أو القيد بحساب خاطئ، أو الأخطاء التكافؤية)، ولا يضمن تطبيق المعايير والمبادئ المحاسبية بحيادية.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الأولى (4 درجات):\n• مبدأ التكلفة التاريخية: إثبات الأرض بمبلغ 500,000ج بينما قيمتها السوقية 800,000ج يحقق التوازن العددي تماماً، ولكنه لا يعكس القيمة الجارية للثروة.\n• فرض الوحدة المحاسبية: إذا قيد المالك مصروفه الشخصي ضمن مصروفات المنشأة، فإن المعادلة تظل متوازنة حسابياً، ولكن القوائم المالية تفقد تمثيلها الصادق لتضخيم المصروفات وتخفيض الربح.\n• سهو قيد عملية: عدم تسجيل فاتورة مبيعات آثرت بـ 10,000ج يبقي المعادلة متوازنة، ولكنه يخفي أصلاً وإيراداً حقيقياً.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المراجعين التنازليين أن التوازن العددي هو المعيار الأول والأخير للمصداقية بدعوى منع الاختلاسات الحسابية؛ والرد المحاسبي أن التوازن الحسابي قد يخفي تحريفات وتدليسات جوهرية لا تظهر بمجرد النظر للأرقام، وأن التمثيل الصادق يتطلب الفحص المستندي والالتزام بالأخلاقيات والمبادئ.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن العددي يمثل الهيكل الرياضي الخارجي للمحاسبة، بينما يمثل التمثيل الصادق جوهرها ومضمونها؛ والعدالة الكاملة للقوائم المالية تجتمع متى ما اقترن التوازن الرياضي بالالتزام الصارم بالشفافية، والحيطة والحذر، والموضوعية المستندية.\n```\n\n---\n\n## 📘 الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 31,
      "concept": "س41 المقال المحاسبي الشامل لـ الوحدة الأولى (JRE)"
    },
    "tags": [
      "الوحدة الأولى: أساسيات المحاسبة وتحليل المعاملات المالية (ص 11 – 34)",
      "قضية التفسير المحاسبي الجوهرية (سُلم التقييم الرسمي من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u2-042",
    "sourceQuestionId": "b373-u2-042",
    "originalId": "b373-u2-042",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س42 السؤال الجوهري للوحدة الثانية",
    "difficulty": "basic",
    "questionType": "analytical",
    "bloomLevel": "comprehension",
    "question": "ما قاعدة القيد المزدوج؟ وكيف تضمن بقاء معادلة الميزانية متوازنة بعد كل معاملة؟",
    "correctAnswer": "ينص القيد المزدوج على أن لكل معاملة مالية طرفين متساويين في القيمة ومختلفين في الاتجاه: طرف مدين (خذ/استلم المنافع) وطرف دائن (أعطى/قدم المنافع)، بحيث إجمالي المبالغ المدينة يساوي إجمالي المبالغ الدائنة تماماً.",
    "modelAnswer": "ينص القيد المزدوج على أن لكل معاملة مالية طرفين متساويين في القيمة ومختلفين في الاتجاه: طرف مدين (خذ/استلم المنافع) وطرف دائن (أعطى/قدم المنافع)، بحيث إجمالي المبالغ المدينة يساوي إجمالي المبالغ الدائنة تماماً.",
    "explanation": "التساوي بين جانب المدين والدائن في كل قيد يضمن رياضياً بقاء المعادلة المحاسبية متوازنة في أي لحظة.",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 35,
      "concept": "س42 السؤال الجوهري للوحدة الثانية"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "الافتتاحية — قواعد القيد المزدوج.",
      "سؤال مقالي تحليلي."
    ]
  },
  {
    "id": "b373-u2-043",
    "sourceQuestionId": "b373-u2-043",
    "originalId": "b373-u2-043",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س43 حالة ورشة طارق للإلكترونيات",
    "difficulty": "intermediate",
    "questionType": "case",
    "bloomLevel": "application",
    "question": "كان طارق يسجل مقبوضاته ومدفوعاته فقط، وتراكمت لديه قطع غيار مشتراة بالآجل وديون لدى العملاء دون متابعة. كيف ينظم القيد المزدوج أعمال ورشته؟",
    "correctAnswer": "ينظم القيد المزدوج أعماله بفتح حسابات أستاذ مستقلة للأصول والالتزامات والمبيعات والمشتريات، مما يتيح الترحيل التلقائي لكل معاملة وتحديد رصيد كل عميل ومورد بدقة.",
    "modelAnswer": "ينظم القيد المزدوج أعماله بفتح حسابات أستاذ مستقلة للأصول والالتزامات والمبيعات والمشتريات، مما يتيح الترحيل التلقائي لكل معاملة وتحديد رصيد كل عميل ومورد بدقة.",
    "explanation": "القيد المفرد يغفل طرف المعاملة غير النقدي، بينما القيد المزدوج يربط الحركة النقدية بالحقوق والالتزامات المترتبة عليها.",
    "sourceType": "official_textbook",
    "sourcePage": 36,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 36,
      "concept": "س43 حالة ورشة طارق للإلكترونيات"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "التطبيق الميداني للقيد المزدوج.",
      "دراسة حالة سياقية."
    ]
  },
  {
    "id": "b373-u2-044",
    "sourceQuestionId": "b373-u2-044",
    "originalId": "b373-u2-044",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س44 طبيعة الحسابات (الأصول والمصروفات)",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "ما الطبيعة الأصلية لحسابات الأصول والمصروفات؟ وكيف تؤثر الزيادة والنقصان فيها؟",
    "correctAnswer": "طبيعتها الأصلية **مدينة**. والزيادة فيها تجعل الحساب **مديناً**، والنقصان يجعله **دائناً**.",
    "modelAnswer": "طبيعتها الأصلية **مدينة**. والزيادة فيها تجعل الحساب **مديناً**، والنقصان يجعله **دائناً**.",
    "explanation": "الأصول والمصروفات تمثل استخدامات وتطبيقات الأموال في المنشأة.",
    "sourceType": "official_textbook",
    "sourcePage": 37,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 37,
      "concept": "س44 طبيعة الحسابات (الأصول والمصروفات)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "طبيعة الحسابات.",
      "سؤال مفاهيمي أساسي."
    ]
  },
  {
    "id": "b373-u2-045",
    "sourceQuestionId": "b373-u2-045",
    "originalId": "b373-u2-045",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س45 طبيعة الحسابات (الالتزامات والملكية والإيرادات)",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "ما الطبيعة الأصلية لحسابات الالتزامات وحقوق الملكية والإيرادات؟ وكيف تؤثر الزيادة والنقصان فيها؟",
    "correctAnswer": "طبيعتها الأصلية **دائنة**. والزيادة فيها تجعل الحساب **دائناً**، والنقصان يجعله **مديناً**.",
    "modelAnswer": "طبيعتها الأصلية **دائنة**. والزيادة فيها تجعل الحساب **دائناً**، والنقصان يجعله **مديناً**.",
    "explanation": "تمثل مصادر تمويل أصول وموارد المنشأة.",
    "sourceType": "official_textbook",
    "sourcePage": 38,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 38,
      "concept": "س45 طبيعة الحسابات (الالتزامات والملكية والإيرادات)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "طبيعة الحسابات.",
      "سؤال مفاهيمي أساسي."
    ]
  },
  {
    "id": "b373-u2-046",
    "sourceQuestionId": "b373-u2-046",
    "originalId": "b373-u2-046",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س46 شكل حساب الأستاذ (T-Account)",
    "difficulty": "basic",
    "questionType": "t_account",
    "bloomLevel": "comprehension",
    "question": "صمم شكل حساب الأستاذ على هيئة (T) وحدد المكونات الأساسية لجانبيه المدين والدائن.",
    "correctAnswer": "- **الجانب الأيمن (منه / المدين):** يُسجل فيه المبالغ المدينة والعمليات التي تزيد الأصول/المصروفات أو تخفض الخصوم.\n  - **الجانب الأيسر (له / الدائن):** يُسجل فيه المبالغ الدائنة والعمليات التي تزيد الخصوم/الإيرادات/الملكية أو تخفض الأصول.",
    "modelAnswer": "- **الجانب الأيمن (منه / المدين):** يُسجل فيه المبالغ المدينة والعمليات التي تزيد الأصول/المصروفات أو تخفض الخصوم.\n  - **الجانب الأيسر (له / الدائن):** يُسجل فيه المبالغ الدائنة والعمليات التي تزيد الخصوم/الإيرادات/الملكية أو تخفض الأصول.",
    "explanation": "الحساب T هو أداة التجميع الأساسية لكل عنصر من عناصر القوائم المالية.",
    "sourceType": "official_textbook",
    "sourcePage": 39,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 39,
      "concept": "س46 شكل حساب الأستاذ (T-Account)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "دفتر الأستاذ العام.",
      "هيكل وشكل محاسبي."
    ]
  },
  {
    "id": "b373-u2-047",
    "sourceQuestionId": "b373-u2-047",
    "originalId": "b373-u2-047",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س47 القيد البسيط مقابل القيد المركب",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "قارن بين القيد المحاسبي البسيط والقيد المحاسبي المركب مع إعطاء مثال لكل منهما.",
    "correctAnswer": "- **القيد البسيط:** يتكون من طرف مدين واحد وطرف دائن واحد (مثل: من حـ/ النقدية إلى حـ/ رأس المال).\n  - **القيد المركب:** يتكون من أكثر من حساب في أسر الطرفين أو كلاهما (مثل: من مذكورين حـ/ النقدية وحـ/ البنك إلى حـ/ المبيعات).",
    "modelAnswer": "- **القيد البسيط:** يتكون من طرف مدين واحد وطرف دائن واحد (مثل: من حـ/ النقدية إلى حـ/ رأس المال).\n  - **القيد المركب:** يتكون من أكثر من حساب في أسر الطرفين أو كلاهما (مثل: من مذكورين حـ/ النقدية وحـ/ البنك إلى حـ/ المبيعات).",
    "explanation": "القيد المركب يجمع المعاملات المتعددة الناشئة عن حدث اقتصادي واحد في قيد متكامل.",
    "sourceType": "official_textbook",
    "sourcePage": 40,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 40,
      "concept": "س47 القيد البسيط مقابل القيد المركب"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "سؤال مفهومي ومقارنة."
    ]
  },
  {
    "id": "b373-u2-048",
    "sourceQuestionId": "b373-u2-048",
    "originalId": "b373-u2-048",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س48 خطوات الدورة المحاسبية",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "رتب الخطوات الأربع الأولى للدورة المحاسبية بترتيبها الزمني الصحيح.",
    "correctAnswer": "1) تحليل المعاملات والمستندات 2) التسجيل في دفتر اليومية العامة 3) الترحيل إلى حسابات الأستاذ العامة 4) إعداد ميزان المراجعة قبل التسويات.",
    "modelAnswer": "1) تحليل المعاملات والمستندات 2) التسجيل في دفتر اليومية العامة 3) الترحيل إلى حسابات الأستاذ العامة 4) إعداد ميزان المراجعة قبل التسويات.",
    "explanation": "تسلسل منطقي يضمن تدفق البيانات دون إغفال أو ازدواج.",
    "sourceType": "official_textbook",
    "sourcePage": 41,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 41,
      "concept": "س48 خطوات الدورة المحاسبية"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "الدورة المحاسبية الكاملة.",
      "خطوات متسلسلة."
    ]
  },
  {
    "id": "b373-u2-049",
    "sourceQuestionId": "b373-u2-049",
    "originalId": "b373-u2-049",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س49 قيد اليومية: بدء النشاط التجاري",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أودع المالك 150,000ج في بنك المنشأة لتأسيس النشاط. اكتب قيد اليومية.",
    "correctAnswer": "- 150,000 من حـ/ البنك\n  - 150,000 إلى حـ/ رأس المال\n  - *(إثبات بدء النشاط وتأسيس رأس المال)*",
    "modelAnswer": "- 150,000 من حـ/ البنك\n  - 150,000 إلى حـ/ رأس المال\n  - *(إثبات بدء النشاط وتأسيس رأس المال)*",
    "explanation": "البنك أصل زاد فهو مدين، ورأس المال حق ملكية زاد فهو دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 42,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 42,
      "concept": "س49 قيد اليومية: بدء النشاط التجاري"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-050",
    "sourceQuestionId": "b373-u2-050",
    "originalId": "b373-u2-050",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س50 قيد اليومية: شراء أثاث نقداً",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اشترت المنشأة أثاثاً بمبلغ 12,000ج نقداً. اكتب قيد اليومية.",
    "correctAnswer": "- 12,000 من حـ/ الأثاث\n  - 12,000 إلى حـ/ الخزينة (النقدية)\n  - *(شراء أثاث سداداً نقداً)*",
    "modelAnswer": "- 12,000 من حـ/ الأثاث\n  - 12,000 إلى حـ/ الخزينة (النقدية)\n  - *(شراء أثاث سداداً نقداً)*",
    "explanation": "الأثاث أصل غير متداول زاد فهو مدين، والخزينة أصل متداول نقص فهو دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 42,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 42,
      "concept": "س50 قيد اليومية: شراء أثاث نقداً"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-051",
    "sourceQuestionId": "b373-u2-051",
    "originalId": "b373-u2-051",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س51 قيد اليومية: شراء بضاعة بالآجل",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اشترت المنشأة بضاعة بمبلغ 25,000ج من الشركة المصرية على الحساب. اكتب قيد اليومية.",
    "correctAnswer": "- 25,000 من حـ/ المشتريات\n  - 25,000 إلى حـ/ الموردين (الشركة المصرية)\n  - *(شراء بضاعة بالآجل)*",
    "modelAnswer": "- 25,000 من حـ/ المشتريات\n  - 25,000 إلى حـ/ الموردين (الشركة المصرية)\n  - *(شراء بضاعة بالآجل)*",
    "explanation": "المشتريات طبيعتها مدينة وزادت، والموردون التزام زاد فهو دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 43,
      "concept": "س51 قيد اليومية: شراء بضاعة بالآجل"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-052",
    "sourceQuestionId": "b373-u2-052",
    "originalId": "b373-u2-052",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س52 قيد اليومية: بيع بضاعة نقداً",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "باعت المنشأة بضاعة بمبلغ 18,000ج وحصلت المبلغ نقداً. اكتب قيد اليومية.",
    "correctAnswer": "- 18,000 من حـ/ الخزينة (النقدية)\n  - 18,000 إلى حـ/ المبيعات\n  - *(بيع بضاعة تحصيلاً نقداً)*",
    "modelAnswer": "- 18,000 من حـ/ الخزينة (النقدية)\n  - 18,000 إلى حـ/ المبيعات\n  - *(بيع بضاعة تحصيلاً نقداً)*",
    "explanation": "الخزينة أصل زاد فهو مدين، والمبيعات إيراد طبيعته دائنة وزاد فهو دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 43,
      "concept": "س52 قيد اليومية: بيع بضاعة نقداً"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-053",
    "sourceQuestionId": "b373-u2-053",
    "originalId": "b373-u2-053",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س53 قيد اليومية: بيع بضاعة بالآجل",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "باعت المنشأة بضاعة بمبلغ 14,000ج للعميل سعيد بالآجل. اكتب قيد اليومية.",
    "correctAnswer": "- 14,000 من حـ/ العملاء (سعيد)\n  - 14,000 إلى حـ/ المبيعات\n  - *(بيع بضاعة بالآجل للعميل سعيد)*",
    "modelAnswer": "- 14,000 من حـ/ العملاء (سعيد)\n  - 14,000 إلى حـ/ المبيعات\n  - *(بيع بضاعة بالآجل للعميل سعيد)*",
    "explanation": "العملاء أصل زاد فهو مدين، والمبيعات إيراد دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 44,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 44,
      "concept": "س53 قيد اليومية: بيع بضاعة بالآجل"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-054",
    "sourceQuestionId": "b373-u2-054",
    "originalId": "b373-u2-054",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س54 قيد اليومية: سداد أجور العاملين",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "سددت المنشأة 6,000ج نقداً أجور العاملين عن الشهر. اكتب قيد اليومية.",
    "correctAnswer": "- 6,000 من حـ/ مصروف الأجور والمرتبات\n  - 6,000 إلى حـ/ الخزينة\n  - *(سداد الأجور والمرتبات نقداً)*",
    "modelAnswer": "- 6,000 من حـ/ مصروف الأجور والمرتبات\n  - 6,000 إلى حـ/ الخزينة\n  - *(سداد الأجور والمرتبات نقداً)*",
    "explanation": "مصروف الأجور طبيعته مدينة وزاد، والخزينة أصل نقص فهو دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 44,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 44,
      "concept": "س54 قيد اليومية: سداد أجور العاملين"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-055",
    "sourceQuestionId": "b373-u2-055",
    "originalId": "b373-u2-055",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س55 قيد اليومية: سداد مستحقات الموردين",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "سددت المنشأة 10,000ج بشيك للمورد (الشركة المصرية). اكتب قيد اليومية.",
    "correctAnswer": "- 10,000 من حـ/ الموردين (الشركة المصرية)\n  - 10,000 إلى حـ/ البنك\n  - *(سداد مستحق للموردين بشيك)*",
    "modelAnswer": "- 10,000 من حـ/ الموردين (الشركة المصرية)\n  - 10,000 إلى حـ/ البنك\n  - *(سداد مستحق للموردين بشيك)*",
    "explanation": "الموردون التزام انخفض فهو مدين، والبنك أصل انخفض فهو دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 45,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 45,
      "concept": "س55 قيد اليومية: سداد مستحقات الموردين"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-056",
    "sourceQuestionId": "b373-u2-056",
    "originalId": "b373-u2-056",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س56 قيد اليومية: تحصيل مستحقات العملاء",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "حصلت المنشأة 8,000ج نقداً من العميل سعيد سداداً لرصيده. اكتب قيد اليومية.",
    "correctAnswer": "- 8,000 من حـ/ الخزينة\n  - 8,000 إلى حـ/ العملاء (سعيد)\n  - *(تحصيل المستحق على العميل سعيد)*",
    "modelAnswer": "- 8,000 من حـ/ الخزينة\n  - 8,000 إلى حـ/ العملاء (سعيد)\n  - *(تحصيل المستحق على العميل سعيد)*",
    "explanation": "الخزينة أصل زاد فهو مدين، والعملاء أصل انخفض فهو دائن.",
    "sourceType": "official_textbook",
    "sourcePage": 45,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 45,
      "concept": "س56 قيد اليومية: تحصيل مستحقات العملاء"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-057",
    "sourceQuestionId": "b373-u2-057",
    "originalId": "eb-mcq-015",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س57 قيد اليومية: سحب المالك مبالغ نقدية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "سحب المالك 4,000ج نقداً من الخزينة لاستخدامه الشخصي. اكتب قيد اليومية.",
    "correctAnswer": "- 4,000 من حـ/ المسحوبات الشخصية\n  - 4,000 إلى حـ/ الخزينة\n  - *(إثبات مسحوبات المالك النقدية)*",
    "modelAnswer": "- 4,000 من حـ/ المسحوبات الشخصية\n  - 4,000 إلى حـ/ الخزينة\n  - *(إثبات مسحوبات المالك النقدية)*",
    "explanation": "المسحوبات حساب مدين ينقص حقوق الملكية، والخزينة أصل انخفض.",
    "sourceType": "official_textbook",
    "sourcePage": 46,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 46,
      "concept": "س57 قيد اليومية: سحب المالك مبالغ نقدية"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ],
    "replacesQuestionId": "eb-mcq-015"
  },
  {
    "id": "b373-u2-058",
    "sourceQuestionId": "b373-u2-058",
    "originalId": "b373-u2-058",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س58 قيد اليومية: سحب المالك بضاعة بالتكلفة",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "سحب المالك بضاعة لاستخدامه الشخصي تكلفتها 2,000ج. اكتب قيد اليومية.",
    "correctAnswer": "- 2,000 من حـ/ المسحوبات الشخصية\n  - 2,000 إلى حـ/ المشتريات\n  - *(إثبات مسحوبات بضاعة بسعر التكلفة)*",
    "modelAnswer": "- 2,000 من حـ/ المسحوبات الشخصية\n  - 2,000 إلى حـ/ المشتريات\n  - *(إثبات مسحوبات بضاعة بسعر التكلفة)*",
    "explanation": "المسحوبات مدينة، والمشتريات تخفض بسعر التكلفة ف تجعل دائنة.",
    "sourceType": "official_textbook",
    "sourcePage": 46,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 46,
      "concept": "س58 قيد اليومية: سحب المالك بضاعة بالتكلفة"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قيود اليومية العامة.",
      "صياغة قيد يومية."
    ]
  },
  {
    "id": "b373-u2-059",
    "sourceQuestionId": "b373-u2-059",
    "originalId": "unified-u1-q15",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س59 قيد اليومية المركب: شراء أصل بسداد جزئي",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اشترت المنشأة سيارة بمبلغ 80,000ج، دفعت 30,000ج نقداً والباقي على الحساب. اكتب قيد اليومية المركب.",
    "correctAnswer": "- 80,000 من حـ/ السيارات\n  - إلى مذكورين:\n    - 30,000 حـ/ الخزينة\n    - 50,000 حـ/ الدائنين (شركة السيارات)\n  - *(شراء سيارة سداد جزء نقداً والباقي بالآجل)*",
    "modelAnswer": "- 80,000 من حـ/ السيارات\n  - إلى مذكورين:\n    - 30,000 حـ/ الخزينة\n    - 50,000 حـ/ الدائنين (شركة السيارات)\n  - *(شراء سيارة سداد جزء نقداً والباقي بالآجل)*",
    "explanation": "جانب المدين يحمل بقيمة الأصل الكلية (80,000ج)، والدائن يوزع بين الخزينة والالتزام المتولد.",
    "sourceType": "official_textbook",
    "sourcePage": 47,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 47,
      "concept": "س59 قيد اليومية المركب: شراء أصل بسداد جزئي"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "القيود المركبة.",
      "قيد يومية مركب."
    ],
    "replacesQuestionId": "unified-u1-q15"
  },
  {
    "id": "b373-u2-060",
    "sourceQuestionId": "b373-u2-060",
    "originalId": "eb-mcq-046",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س60 قيد اليومية المركب: بيع بضاعة بتحصيل جزئي",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "باعت المنشأة بضاعة بمبلغ 50,000ج، حصلت 20,000ج نقداً والاقي بشيك. اكتب القيد.",
    "correctAnswer": "- من مذكورين:\n    - 20,000 حـ/ الخزينة\n    - 30,000 حـ/ البنك\n  - 50,000 إلى حـ/ المبيعات\n  - *(بيع بضاعة تحصيلاً نقداً وبشيك)*",
    "modelAnswer": "- من مذكورين:\n    - 20,000 حـ/ الخزينة\n    - 30,000 حـ/ البنك\n  - 50,000 إلى حـ/ المبيعات\n  - *(بيع بضاعة تحصيلاً نقداً وبشيك)*",
    "explanation": "الخزينة والبنك أصلان زادا فيكونان مدينين في قيد مركب مدين.",
    "sourceType": "official_textbook",
    "sourcePage": 47,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 47,
      "concept": "س60 قيد اليومية المركب: بيع بضاعة بتحصيل جزئي"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "القيود المركبة.",
      "قيد يومية مركب."
    ],
    "replacesQuestionId": "eb-mcq-046"
  },
  {
    "id": "b373-u2-061",
    "sourceQuestionId": "b373-u2-061",
    "originalId": "b373-u2-061",
    "lessonId": "u2-lesson-3",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-3",
    "concept": "س61 كيفية ترصيد حساب الأستاذ",
    "difficulty": "basic",
    "questionType": "t_account",
    "bloomLevel": "comprehension",
    "question": "اشرح خطوات ترصيد حساب الأستاذ T، وكيف يُحدد ما إذا كان الرصيد مديناً أم دائناً.",
    "correctAnswer": "1) نجمع الجانب المدين ونجمع الجانب الدائن 2) نضع الإجمالي الأكبر في خانتي المجموع بالجانبين 3) نطرح الجانب الأصغر من الأكبر 4) المتمم الحسابي يوضع في الجانب الأصغر كـ **رصيد مرحل** ثم يرحل إلى الجانب الأكبر في بداية الفترة التالية كـ **رصيد منقول** يحمل اسم الجانب الأكبر.",
    "modelAnswer": "1) نجمع الجانب المدين ونجمع الجانب الدائن 2) نضع الإجمالي الأكبر في خانتي المجموع بالجانبين 3) نطرح الجانب الأصغر من الأكبر 4) المتمم الحسابي يوضع في الجانب الأصغر كـ **رصيد مرحل** ثم يرحل إلى الجانب الأكبر في بداية الفترة التالية كـ **رصيد منقول** يحمل اسم الجانب الأكبر.",
    "explanation": "الرصيد يتبع دائماً الجانب ذو المجموع المالي الأكبر.",
    "sourceType": "official_textbook",
    "sourcePage": 48,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 48,
      "concept": "س61 كيفية ترصيد حساب الأستاذ"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "ترصيد حسابات الأستاذ.",
      "إجراءات الترصيد."
    ]
  },
  {
    "id": "b373-u2-062",
    "sourceQuestionId": "b373-u2-062",
    "originalId": "b373-u2-062",
    "lessonId": "u2-lesson-3",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-3",
    "concept": "س62 ترصيد حساب الخزينة",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "بلغت المقبوضات بحساب الخزينة 50,000ج والمدفوعات 35,000ج. احسب الرصيد المرحل والمنقول ونوعه.",
    "correctAnswer": "المجموع الأكبر = 50,000ج. المتمم في الجانب الدائن = 15,000ج رصيد مرحل. **الرصيد المنقول = 15,000 جنيه (رصيد مدين)**.",
    "modelAnswer": "المجموع الأكبر = 50,000ج. المتمم في الجانب الدائن = 15,000ج رصيد مرحل. **الرصيد المنقول = 15,000 جنيه (رصيد مدين)**.",
    "explanation": "لأن المقبوضات المدينة أكبر من المدفوعات الدائنة بمبلغ 15,000 جنيه.",
    "sourceType": "official_textbook",
    "sourcePage": 49,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 49,
      "concept": "س62 ترصيد حساب الخزينة"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "تطبيق ترصيد الأستاذ.",
      "مسألة ترصيد T."
    ]
  },
  {
    "id": "b373-u2-063",
    "sourceQuestionId": "b373-u2-063",
    "originalId": "b373-u2-063",
    "lessonId": "u2-lesson-3",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-3",
    "concept": "س63 ترصيد حساب الموردين",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "بلغت المشتريات الآجلة بالجانب الدائن لحساب المورد 40,000ج، والمدفوعات له بالجانب المدين 15,000ج. احسب الرصيد.",
    "correctAnswer": "**الرصيد المنقول = 25,000 جنيه (رصيد دائن)**.",
    "modelAnswer": "**الرصيد المنقول = 25,000 جنيه (رصيد دائن)**.",
    "explanation": "التزام متبقٍ دائن لصالح المورد لم يُسدد بعد.",
    "sourceType": "official_textbook",
    "sourcePage": 49,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 49,
      "concept": "س63 ترصيد حساب الموردين"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "تطبيق ترصيد الأستاذ.",
      "مسألة ترصيد T."
    ]
  },
  {
    "id": "b373-u2-064",
    "sourceQuestionId": "b373-u2-064",
    "originalId": "b373-u2-064",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س64 فائدة دفتر اليومية العامة",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "ما الوظيفة الرئيسية لدفتر اليومية العامة؟",
    "correctAnswer": "التسجيل التاريخي الزمني الشامل والتفصيلي لكافة المعاملات المالية بالمنشأة موثقة بشرح مختصر ورقم المستند المؤيد.",
    "modelAnswer": "التسجيل التاريخي الزمني الشامل والتفصيلي لكافة المعاملات المالية بالمنشأة موثقة بشرح مختصر ورقم المستند المؤيد.",
    "explanation": "يمثل السجل الأولي للبيانات المحاسبية قبل تبويبها بـ دفتر الأستاذ.",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 50,
      "concept": "س64 فائدة دفتر اليومية العامة"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "الدفاتر المحاسبية.",
      "سؤال مفهومي."
    ]
  },
  {
    "id": "b373-u2-065",
    "sourceQuestionId": "b373-u2-065",
    "originalId": "b373-u2-065",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س65 فائدة دفتر الأستاذ العام",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "ما الوظيفة الرئيسية لدفتر الأستاذ العام؟",
    "correctAnswer": "التبويب والتلخيص النوعي للمعاملات؛ حيث يفرد لكل عنصر (أصل، التزام، إيراد، مصروف) حساباً مستقلاً لإظهار رصيده الصافي.",
    "modelAnswer": "التبويب والتلخيص النوعي للمعاملات؛ حيث يفرد لكل عنصر (أصل، التزام، إيراد، مصروف) حساباً مستقلاً لإظهار رصيده الصافي.",
    "explanation": "يوفر البيانات النهائية اللازمة لإعداد ميزان المراجعة والقوائم المالية.",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 50,
      "concept": "س65 فائدة دفتر الأستاذ العام"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "الدفاتر المحاسبية.",
      "سؤال مفهومي."
    ]
  },
  {
    "id": "b373-u2-066",
    "sourceQuestionId": "b373-u2-066",
    "originalId": "b373-u2-066",
    "lessonId": "u2-lesson-3",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-3",
    "concept": "س66 أخطاء الترحيل الشائعة",
    "difficulty": "basic",
    "questionType": "analytical",
    "bloomLevel": "comprehension",
    "question": "اذكر خطأين قد يحدثان أثناء ترحيل القيود من اليومية إلى الأستاذ.",
    "correctAnswer": "1) ترحيل المبلغ إلى الجانب العكسي (ترحيل المدين كـ دائن) 2) ترحيل رقم خاطئ أو تكرار ترحيل القيد مرتين.",
    "modelAnswer": "1) ترحيل المبلغ إلى الجانب العكسي (ترحيل المدين كـ دائن) 2) ترحيل رقم خاطئ أو تكرار ترحيل القيد مرتين.",
    "explanation": "هذه الأخطاء تؤدي لخارج توازن ميزان المراجعة بالأرصدة وتتطلب مراجعة كشوف الترحيل.",
    "sourceType": "official_textbook",
    "sourcePage": 51,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 51,
      "concept": "س66 أخطاء الترحيل الشائعة"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "الترحيل للأستاذ.",
      "سؤال تحليلي."
    ]
  },
  {
    "id": "b373-u2-067",
    "sourceQuestionId": "b373-u2-067",
    "originalId": "b373-u2-067",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س67 (عملية 1)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "بدء النشاط بـ 200,000ج بالبنك",
    "correctAnswer": "من حـ/ البنك 200,000 إلى حـ/ رأس المال 200,000**.",
    "modelAnswer": "من حـ/ البنك 200,000 إلى حـ/ رأس المال 200,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س67 (عملية 1)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-068",
    "sourceQuestionId": "b373-u2-068",
    "originalId": "b373-u2-068",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س68 (عملية 2)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "شراء عقار بـ 120,000ج بشيك",
    "correctAnswer": "من حـ/ العقارات 120,000 إلى حـ/ البنك 120,000**.",
    "modelAnswer": "من حـ/ العقارات 120,000 إلى حـ/ البنك 120,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س68 (عملية 2)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-069",
    "sourceQuestionId": "b373-u2-069",
    "originalId": "b373-u2-069",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س69 (عملية 3)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "شراء بضاعة بـ 30,000ج نقداً",
    "correctAnswer": "من حـ/ المشتريات 30,000 إلى حـ/ الخزينة 30,000**.",
    "modelAnswer": "من حـ/ المشتريات 30,000 إلى حـ/ الخزينة 30,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س69 (عملية 3)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-070",
    "sourceQuestionId": "b373-u2-070",
    "originalId": "b373-u2-070",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س70 (عملية 4)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "شراء أثاث بـ 15,000ج بالآجل من شركة السلام",
    "correctAnswer": "من حـ/ الأثاث 15,000 إلى حـ/ الدائنين 15,000**.",
    "modelAnswer": "من حـ/ الأثاث 15,000 إلى حـ/ الدائنين 15,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س70 (عملية 4)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-071",
    "sourceQuestionId": "b373-u2-071",
    "originalId": "eb-mcq-020",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س71 (عملية 5)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "بيع بضاعة بـ 25,000ج نقداً",
    "correctAnswer": "من حـ/ الخزينة 25,000 إلى حـ/ المبيعات 25,000**.",
    "modelAnswer": "من حـ/ الخزينة 25,000 إلى حـ/ المبيعات 25,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س71 (عملية 5)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ],
    "replacesQuestionId": "eb-mcq-020"
  },
  {
    "id": "b373-u2-072",
    "sourceQuestionId": "b373-u2-072",
    "originalId": "b373-u2-072",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س72 (عملية 6)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "بيع بضاعة بـ 40,000ج بالآجل للعميل الأمل",
    "correctAnswer": "من حـ/ العملاء 40,000 إلى حـ/ المبيعات 40,000**.",
    "modelAnswer": "من حـ/ العملاء 40,000 إلى حـ/ المبيعات 40,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س72 (عملية 6)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-073",
    "sourceQuestionId": "b373-u2-073",
    "originalId": "b373-u2-073",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س73 (عملية 7)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "سداد إيجار المحل 4,000ج بشيك",
    "correctAnswer": "من حـ/ مصروف الإيجار 4,000 إلى حـ/ البنك 4,000**.",
    "modelAnswer": "من حـ/ مصروف الإيجار 4,000 إلى حـ/ البنك 4,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س73 (عملية 7)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-074",
    "sourceQuestionId": "b373-u2-074",
    "originalId": "b373-u2-074",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س74 (عملية 8)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "سداد أجور 6,000ج نقداً",
    "correctAnswer": "من حـ/ مصروف الأجور 6,000 إلى حـ/ الخزينة 6,000**.",
    "modelAnswer": "من حـ/ مصروف الأجور 6,000 إلى حـ/ الخزينة 6,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س74 (عملية 8)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-075",
    "sourceQuestionId": "b373-u2-075",
    "originalId": "b373-u2-075",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س75 (عملية 9)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "تحصيل 20,000ج من العميل الأمل بشيك",
    "correctAnswer": "من حـ/ البنك 20,000 إلى حـ/ العملاء 20,000**.",
    "modelAnswer": "من حـ/ البنك 20,000 إلى حـ/ العملاء 20,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س75 (عملية 9)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-076",
    "sourceQuestionId": "b373-u2-076",
    "originalId": "b373-u2-076",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س76 (عملية 10)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "سداد 10,000ج لشركة السلام بشيك",
    "correctAnswer": "من حـ/ الدائنين 10,000 إلى حـ/ البنك 10,000**.",
    "modelAnswer": "من حـ/ الدائنين 10,000 إلى حـ/ البنك 10,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س76 (عملية 10)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-077",
    "sourceQuestionId": "b373-u2-077",
    "originalId": "b373-u2-077",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س77 (عملية 11)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "سحب المالك 3,000ج نقداً",
    "correctAnswer": "من حـ/ المسحوبات 3,000 إلى حـ/ الخزينة 3,000**.",
    "modelAnswer": "من حـ/ المسحوبات 3,000 إلى حـ/ الخزينة 3,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س77 (عملية 11)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-078",
    "sourceQuestionId": "b373-u2-078",
    "originalId": "b373-u2-078",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س78 (عملية 12)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "حصول على قرض بنكي 50,000ج أودع بالبنك",
    "correctAnswer": "من حـ/ البنك 50,000 إلى حـ/ القروض 50,000**.",
    "modelAnswer": "من حـ/ البنك 50,000 إلى حـ/ القروض 50,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س78 (عملية 12)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-079",
    "sourceQuestionId": "b373-u2-079",
    "originalId": "b373-u2-079",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س79 (عملية 13)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "شراء مهمات مكتبية بـ 2,000ج نقداً",
    "correctAnswer": "من حـ/ المهمات 2,000 إلى حـ/ الخزينة 2,000**.",
    "modelAnswer": "من حـ/ المهمات 2,000 إلى حـ/ الخزينة 2,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س79 (عملية 13)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-080",
    "sourceQuestionId": "b373-u2-080",
    "originalId": "b373-u2-080",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س80 (عملية 14)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "رد بضاعة مباعة من العميل 3,000ج",
    "correctAnswer": "من حـ/ مردودات المبيعات 3,000 إلى حـ/ العملاء 3,000**.",
    "modelAnswer": "من حـ/ مردودات المبيعات 3,000 إلى حـ/ العملاء 3,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س80 (عملية 14)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-081",
    "sourceQuestionId": "b373-u2-081",
    "originalId": "b373-u2-081",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س81 (عملية 15)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "رد بضاعة مشتراة للمورد 2,000ج",
    "correctAnswer": "من حـ/ الدائنين 2,000 إلى حـ/ مردودات المشتريات 2,000**.",
    "modelAnswer": "من حـ/ الدائنين 2,000 إلى حـ/ مردودات المشتريات 2,000**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س81 (عملية 15)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ]
  },
  {
    "id": "b373-u2-082",
    "sourceQuestionId": "b373-u2-082",
    "originalId": "eb-tac-001",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "concept": "س82 (عملية 16)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "bloomLevel": "application",
    "question": "ترصيد حساب البنك والخزينة بعد 15 عملية:\n  - **رصيد البنك المنقول:** (200,000 + 20,000 + 50,000) - (120,000 + 4,000 + 10,000) = **136,000 جنيه (مدين)**.\n  - **رصيد الخزينة المنقول:** (25,000) - (30,000 + 6,000 + 3,000 + 2,000) = **عجز / سحب على المكشوف بنقص 16,000 جنيه**.\n\n---",
    "correctAnswer": "ترصيد حساب البنك والخزينة بعد 15 عملية:\n  - **رصيد البنك المنقول:** (200,000 + 20,000 + 50,000) - (120,000 + 4,000 + 10,000) = **136,000 جنيه (مدين)**.\n  - **رصيد الخزينة المنقول:** (25,000) - (30,000 + 6,000 + 3,000 + 2,000) = **عجز / سحب على المكشوف بنقص 16,000 جنيه**.\n\n---",
    "modelAnswer": "ترصيد حساب البنك والخزينة بعد 15 عملية:\n  - **رصيد البنك المنقول:** (200,000 + 20,000 + 50,000) - (120,000 + 4,000 + 10,000) = **136,000 جنيه (مدين)**.\n  - **رصيد الخزينة المنقول:** (25,000) - (30,000 + 6,000 + 3,000 + 2,000) = **عجز / سحب على المكشوف بنقص 16,000 جنيه**.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية المجمعة للوحدة الثانية. (ص 52 – 54)",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 52,
      "concept": "س82 (عملية 16)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "المسائل الحسابية المجمعة للوحدة الثانية.",
      "مسائل وسلسلة قيود يومية وترصيد حسابات."
    ],
    "replacesQuestionId": "eb-tac-001"
  },
  {
    "id": "b373-u2-083",
    "sourceQuestionId": "b373-u2-083",
    "originalId": "b373-u2-083",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س83",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الحسابات ذات الطبيعة المدينة هي:",
    "correctAnswer": "الأصول والمصروفات",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س83"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ],
    "options": [
      "الالتزامات والإيرادات",
      "الأصول والمصروفات",
      "رأس المال والالتزامات",
      "الإيرادات والأصول."
    ],
    "distractors": [
      "الالتزامات والإيرادات",
      "رأس المال والالتزامات",
      "الإيرادات والأصول."
    ]
  },
  {
    "id": "b373-u2-084",
    "sourceQuestionId": "b373-u2-084",
    "originalId": "b373-u2-084",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س84",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "جعل حساب الموردين مدينًا يعني:",
    "correctAnswer": "تخفيض الالتزام",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س84"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ],
    "options": [
      "زيادة الالتزام",
      "تخفيض الالتزام",
      "شراء بضاعة بالآجل",
      "لا شيء مما سبق."
    ],
    "distractors": [
      "زيادة الالتزام",
      "شراء بضاعة بالآجل",
      "لا شيء مما سبق."
    ]
  },
  {
    "id": "b373-u2-085",
    "sourceQuestionId": "b373-u2-085",
    "originalId": "b373-u2-085",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س85",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "القيد الذي يشتمل على أكثر من حساب في جانب واحد يسمى:",
    "correctAnswer": "قيداً مركباً",
    "modelAnswer": "الإجابة (ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س85"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ],
    "options": [
      "قيداً بسيطاً",
      "قيداً مرادفا",
      "قيداً مركباً",
      "قيد تسوية."
    ],
    "distractors": [
      "قيداً بسيطاً",
      "قيداً مرادفا",
      "قيد تسوية."
    ]
  },
  {
    "id": "b373-u2-086",
    "sourceQuestionId": "b373-u2-086",
    "originalId": "b373-u2-086",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س86",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الترحيل هو نقل القيود من:",
    "correctAnswer": "اليومية إلى الأستاذ",
    "modelAnswer": "الإجابة (ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س86"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ],
    "options": [
      "الأستاذ إلى اليومية",
      "المستندات إلى الأستاذ",
      "اليومية إلى الأستاذ",
      "ميزان المراجعة إلى اليومية."
    ],
    "distractors": [
      "الأستاذ إلى اليومية",
      "المستندات إلى الأستاذ",
      "ميزان المراجعة إلى اليومية."
    ]
  },
  {
    "id": "b373-u2-087",
    "sourceQuestionId": "b373-u2-087",
    "originalId": "b373-u2-087",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س87",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "رصيد حساب المبيعات ينتهي دائماً في ميزان المراجعة بـ:",
    "correctAnswer": "رصيد دائن",
    "modelAnswer": "الإجابة (ب)**.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س87"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ],
    "options": [
      "رصيد مدين",
      "رصيد دائن",
      "رصيد صفري",
      "حساب معلق."
    ],
    "distractors": [
      "رصيد مدين",
      "رصيد صفري",
      "حساب معلق."
    ]
  },
  {
    "id": "b373-u2-088",
    "sourceQuestionId": "b373-u2-088",
    "originalId": "b373-u2-088",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س88",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "زيادة حساب المصروفات تجعله دائناً في دفتر اليومية. (صح / خطأ).",
    "correctAnswer": "خطأ (تجعله مديناً)**.",
    "modelAnswer": "خطأ (تجعله مديناً)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س88"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u2-089",
    "sourceQuestionId": "b373-u2-089",
    "originalId": "b373-u2-089",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س89",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "يرحل الرصيد المرحل في حساب الأستاذ ليصبح رصيداً منقولاً في بداية الفترة التالية بنفس اسم جانبه الأصلي. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س89"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u2-090",
    "sourceQuestionId": "b373-u2-090",
    "originalId": "b373-u2-090",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "concept": "س90",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تسديد مبلغ للمورد يجعل حساب المورد مديناً وحساب النقدية دائناً. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.\n\n---",
    "modelAnswer": "صواب (صح)**.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 54)",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 54,
      "concept": "س90"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u2-091",
    "sourceQuestionId": "b373-u2-091",
    "originalId": "b373-u2-091",
    "lessonId": "u2-lesson-4",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-4",
    "concept": "س91 المقال المحاسبي الشامل لـ الوحدة الثانية (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة المحاسبية التالية في مقال تحليلي متكامل: **\"هل يضمن التوازن العددي المتطابق بين الجانبين المدين والدائن في حسابات الأستاذ خلو السجلات من الأخطاء والتلاعب، أم أن التوازن قد يكون غطاءً لغش واختلاسات مستترة؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالتوازن العددي المتطابق بين الجانبين المدين والدائن في حسابات الأستاذ لا يضمن إطلاقاً خلو السجلات من الأخطاء والتلاعب؛ بل قد يكون التوازن العددي غطاءً كاملاً لخطأ جوهري أو عمليات اختلاس وتزييف مستترة.\n\n2. التفسير والتعليل (4 درجات):\nلأن القيد المزدوج يضمن فقط الموازنة الرياضية (كل مبلغ مدين يقابله مبلغ دائن مساوٍ)؛ فتسجيل قيد وهمي بمبلغ 50,000ج مدين كـ مصروف ودائن كـ نقدية يمنح توازناً رياضياً مطلقاً لحسابات الأستاذ وميزان المراجعة، ولكنه يخفي تزوير واختلاس أصل من أصول المنشأة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثانية (4 درجات):\n• أخطاء السهو الكلي: الحذف التام لمعاملة بيع نقدية بـ 20,000ج يترك الدفاتر متوازنة 100%، ولكنه يخفي إيراداً ونقدية حقيقية.\n• الترحيل للحساب الخاطئ: ترحيل مبلغ 10,000ج لـ حساب العميل (أ) بدلاً من (ب) يحافظ على التوازن العددي التام، ولكنه يخل بصحة وحقوق الحسابات التفصيلية للعملاء.\n• الأخطاء التكافؤية المتبادلة: زيادة المشتريات بـ 1,000ج وزيادة المبيعات بـ 1,000ج بالخطأ يترك الدفاتر متوازنة تماماً رغم وجود خطأين مزدوجين.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يتوهّم بعض المحاسبين المبتدئين أن استخراج رصيد متوازن بحسابات الأستاذ T يُمثل برهاناً قاطعاً على سلامة الدورة المحاسبية؛ والرد العلمى والمهني أن التوازن هو الحد الأدنى الشكلي، وأن كشف التلاعب يتطلب الرقابة الداخلية والمطابقة المستندية الدورية والتفتيش المفاجئ.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن العددي لحسابات الأستاذ شرط شكلي أول، ولا تكتمل موثوقية النظام المحاسبي إلا بالمزاوجة بين التوازن الحسابي الرياضي والمراجعة المستندية الموضوعية والرقابة الأخلاقية على الأداء.\n```\n\n---\n\n## 📘 الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالتوازن العددي المتطابق بين الجانبين المدين والدائن في حسابات الأستاذ لا يضمن إطلاقاً خلو السجلات من الأخطاء والتلاعب؛ بل قد يكون التوازن العددي غطاءً كاملاً لخطأ جوهري أو عمليات اختلاس وتزييف مستترة.\n\n2. التفسير والتعليل (4 درجات):\nلأن القيد المزدوج يضمن فقط الموازنة الرياضية (كل مبلغ مدين يقابله مبلغ دائن مساوٍ)؛ فتسجيل قيد وهمي بمبلغ 50,000ج مدين كـ مصروف ودائن كـ نقدية يمنح توازناً رياضياً مطلقاً لحسابات الأستاذ وميزان المراجعة، ولكنه يخفي تزوير واختلاس أصل من أصول المنشأة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثانية (4 درجات):\n• أخطاء السهو الكلي: الحذف التام لمعاملة بيع نقدية بـ 20,000ج يترك الدفاتر متوازنة 100%، ولكنه يخفي إيراداً ونقدية حقيقية.\n• الترحيل للحساب الخاطئ: ترحيل مبلغ 10,000ج لـ حساب العميل (أ) بدلاً من (ب) يحافظ على التوازن العددي التام، ولكنه يخل بصحة وحقوق الحسابات التفصيلية للعملاء.\n• الأخطاء التكافؤية المتبادلة: زيادة المشتريات بـ 1,000ج وزيادة المبيعات بـ 1,000ج بالخطأ يترك الدفاتر متوازنة تماماً رغم وجود خطأين مزدوجين.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يتوهّم بعض المحاسبين المبتدئين أن استخراج رصيد متوازن بحسابات الأستاذ T يُمثل برهاناً قاطعاً على سلامة الدورة المحاسبية؛ والرد العلمى والمهني أن التوازن هو الحد الأدنى الشكلي، وأن كشف التلاعب يتطلب الرقابة الداخلية والمطابقة المستندية الدورية والتفتيش المفاجئ.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن العددي لحسابات الأستاذ شرط شكلي أول، ولا تكتمل موثوقية النظام المحاسبي إلا بالمزاوجة بين التوازن الحسابي الرياضي والمراجعة المستندية الموضوعية والرقابة الأخلاقية على الأداء.\n```\n\n---\n\n## 📘 الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nالتوازن العددي المتطابق بين الجانبين المدين والدائن في حسابات الأستاذ لا يضمن إطلاقاً خلو السجلات من الأخطاء والتلاعب؛ بل قد يكون التوازن العددي غطاءً كاملاً لخطأ جوهري أو عمليات اختلاس وتزييف مستترة.\n\n2. التفسير والتعليل (4 درجات):\nلأن القيد المزدوج يضمن فقط الموازنة الرياضية (كل مبلغ مدين يقابله مبلغ دائن مساوٍ)؛ فتسجيل قيد وهمي بمبلغ 50,000ج مدين كـ مصروف ودائن كـ نقدية يمنح توازناً رياضياً مطلقاً لحسابات الأستاذ وميزان المراجعة، ولكنه يخفي تزوير واختلاس أصل من أصول المنشأة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثانية (4 درجات):\n• أخطاء السهو الكلي: الحذف التام لمعاملة بيع نقدية بـ 20,000ج يترك الدفاتر متوازنة 100%، ولكنه يخفي إيراداً ونقدية حقيقية.\n• الترحيل للحساب الخاطئ: ترحيل مبلغ 10,000ج لـ حساب العميل (أ) بدلاً من (ب) يحافظ على التوازن العددي التام، ولكنه يخل بصحة وحقوق الحسابات التفصيلية للعملاء.\n• الأخطاء التكافؤية المتبادلة: زيادة المشتريات بـ 1,000ج وزيادة المبيعات بـ 1,000ج بالخطأ يترك الدفاتر متوازنة تماماً رغم وجود خطأين مزدوجين.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يتوهّم بعض المحاسبين المبتدئين أن استخراج رصيد متوازن بحسابات الأستاذ T يُمثل برهاناً قاطعاً على سلامة الدورة المحاسبية؛ والرد العلمى والمهني أن التوازن هو الحد الأدنى الشكلي، وأن كشف التلاعب يتطلب الرقابة الداخلية والمطابقة المستندية الدورية والتفتيش المفاجئ.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن العددي لحسابات الأستاذ شرط شكلي أول، ولا تكتمل موثوقية النظام المحاسبي إلا بالمزاوجة بين التوازن الحسابي الرياضي والمراجعة المستندية الموضوعية والرقابة الأخلاقية على الأداء.\n```\n\n---\n\n## 📘 الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 55,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 55,
      "concept": "س91 المقال المحاسبي الشامل لـ الوحدة الثانية (JRE)"
    },
    "tags": [
      "الوحدة الثانية: نظام القيد المزدوج ودورة حسابات الأستاذ T (ص 35 – 58)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة الثانية (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u3-092",
    "sourceQuestionId": "b373-u3-092",
    "originalId": "b373-u3-092",
    "lessonId": "lesson-3-1",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.1",
    "concept": "س92 السؤال الجوهري للوحدة الثالثة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "لماذا تلجأ المنشآت الكبيرة إلى تقسيم دفتر اليومية العامة إلى دفاتر يومية مساعدة متخصصة؟",
    "correctAnswer": "لتوزيع العمل بين المحاسبين، وتقليل الاختناق في قيد المعاملات المتكررة ذات الحجم الكافي (كالمبيعات والمشتريات الآجلة)، وإحكام الرقابة الداخلية وتسهيل عملية الترحيل الإجمالي.",
    "modelAnswer": "لتوزيع العمل بين المحاسبين، وتقليل الاختناق في قيد المعاملات المتكررة ذات الحجم الكافي (كالمبيعات والمشتريات الآجلة)، وإحكام الرقابة الداخلية وتسهيل عملية الترحيل الإجمالي.",
    "explanation": "قيد المعاملات المتشابهة في سجل متخصص يوفر الوقت ويمنع تضخم دفتر اليومية العامة.",
    "sourceType": "official_textbook",
    "sourcePage": 59,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 59,
      "concept": "س92 السؤال الجوهري للوحدة الثالثة"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "الافتتاحية — دفاتر اليومية المساعدة.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u3-093",
    "sourceQuestionId": "b373-u3-093",
    "originalId": "b373-u3-093",
    "lessonId": "lesson-3-1",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.1",
    "concept": "س93 دفاتر اليومية المساعدة الأربعة الرئيسية",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "اذكر دفاتر اليومية المساعدة الأربعة الرئيسية ومجال اختصاص كل منها.",
    "correctAnswer": "1. **يومية المبيعات الآجلة:** تقيد فيها جميع المبيعات البضاعة بالآجل فقط.\n  2. **يومية المشتريات الآجلة:** تقيد فيها جميع مشتريات البضاعة بالآجل فقط.\n  3. **يومية مردودات المبيعات:** تقيد فيها البضاعة المردودة من العملاء.\n  4. **يومية مردودات المشتريات:** تقيد فيها البضاعة المردودة إلى الموردين.",
    "modelAnswer": "1. **يومية المبيعات الآجلة:** تقيد فيها جميع المبيعات البضاعة بالآجل فقط.\n  2. **يومية المشتريات الآجلة:** تقيد فيها جميع مشتريات البضاعة بالآجل فقط.\n  3. **يومية مردودات المبيعات:** تقيد فيها البضاعة المردودة من العملاء.\n  4. **يومية مردودات المشتريات:** تقيد فيها البضاعة المردودة إلى الموردين.",
    "explanation": "تقتصر هذه الدفاتر على العمليات الآجلة للبضاعة، بينما العمليات النقدية تفرد في دفتر النقدية.",
    "sourceType": "official_textbook",
    "sourcePage": 60,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 60,
      "concept": "س93 دفاتر اليومية المساعدة الأربعة الرئيسية"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "اليوميات المساعدة المتخصصة.",
      "سؤال تصنيف ومفاهيم."
    ]
  },
  {
    "id": "b373-u3-094",
    "sourceQuestionId": "b373-u3-094",
    "originalId": "b373-u3-094",
    "lessonId": "lesson-3-1",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.1",
    "concept": "س94 المستندات المؤيدة لكل دفتر مساعد",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "اربط كل دفتر مساعد بالمستند المؤيد له: (فاتورة المبيعات الصادرة، فاتورة الشراء الواردة، إشعار دائن صادر، إشعار مدين صادر).",
    "correctAnswer": "- فاتورة مبيعات صادرة \\\\(\\rightarrow\\\\) **يومية المبيعات الآجلة**.\n  - فاتورة شراء واردة \\\\(\\rightarrow\\\\) **يومية المشتريات الآجلة**.\n  - إشعار دائن صادر للعميل \\\\(\\rightarrow\\\\) **يومية مردودات المبيعات**.\n  - إشعار مدين صادر للمورد \\\\(\\rightarrow\\\\) **يومية مردودات المشتريات**.",
    "modelAnswer": "- فاتورة مبيعات صادرة \\\\(\\rightarrow\\\\) **يومية المبيعات الآجلة**.\n  - فاتورة شراء واردة \\\\(\\rightarrow\\\\) **يومية المشتريات الآجلة**.\n  - إشعار دائن صادر للعميل \\\\(\\rightarrow\\\\) **يومية مردودات المبيعات**.\n  - إشعار مدين صادر للمورد \\\\(\\rightarrow\\\\) **يومية مردودات المشتريات**.",
    "explanation": "المستند هو المرجع القانوني والمستندي لإثبات الحركة في الدفتر المساعد.",
    "sourceType": "official_textbook",
    "sourcePage": 61,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 61,
      "concept": "س94 المستندات المؤيدة لكل دفتر مساعد"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المستندات الدالة.",
      "ربط المستند بالدفتر."
    ]
  },
  {
    "id": "b373-u3-095",
    "sourceQuestionId": "b373-u3-095",
    "originalId": "b373-u3-095",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س95 دفتر النقدية ذو الخانات الثلاث",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "ما الخانات الثلاث الرئيسية في كل جانب من جانبي دفتر النقدية ذي الخانات الثلاث؟",
    "correctAnswer": "- **جانب المقبوضات (المدين):** الخزينة، البنك، الخصم المسموح به.\n  - **جانب المدفوعات (الدائن):** الخزينة، البنك، الخصم المكتسب.",
    "modelAnswer": "- **جانب المقبوضات (المدين):** الخزينة، البنك، الخصم المسموح به.\n  - **جانب المدفوعات (الدائن):** الخزينة، البنك، الخصم المكتسب.",
    "explanation": "يجمع الحركة النقدية والبنكية والتسويات الخصمية المباشرة في دفتر واحد يعمل كـ يومية وحساب أستاذ للنقدية معاً.",
    "sourceType": "official_textbook",
    "sourcePage": 62,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 62,
      "concept": "س95 دفتر النقدية ذو الخانات الثلاث"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفتر النقدية المساعد.",
      "شرح مكونات دفتر النقدية."
    ]
  },
  {
    "id": "b373-u3-096",
    "sourceQuestionId": "b373-u3-096",
    "originalId": "b373-u3-096",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س96 الخصم التجاري مقابل الخصم النقدي",
    "difficulty": "advanced",
    "questionType": "concept",
    "bloomLevel": "analysis",
    "question": "قارن بين الخصم التجاري والخصم النقدي من حيث المعالجة المحاسبية والتسجيل بالدفاتر.",
    "correctAnswer": "- **الخصم التجاري:** خصم يمنح فوراً وقت البيع/الشراء لتشجيع التعامل، **ولا يظهر بالدفاتر**؛ حيث تسجل المعاملة بالصافي مباشرة.\n  - **الخصم النقدي (خصم تعجيل الدفع):** خصم معلق بشرط السداد خلال مهلة زمنية، **ويثبت بالدفاتر** (خصم مسموح به مدين للائع، وخصم مكتسب دائن للمشتري) عند السداد الفعلي.",
    "modelAnswer": "- **الخصم التجاري:** خصم يمنح فوراً وقت البيع/الشراء لتشجيع التعامل، **ولا يظهر بالدفاتر**؛ حيث تسجل المعاملة بالصافي مباشرة.\n  - **الخصم النقدي (خصم تعجيل الدفع):** خصم معلق بشرط السداد خلال مهلة زمنية، **ويثبت بالدفاتر** (خصم مسموح به مدين للائع، وخصم مكتسب دائن للمشتري) عند السداد الفعلي.",
    "explanation": "الخصم النقدي يعالج كـ مصروف/إيراد مالي يرتبط بالتعجيل النقدي وليس بسعر البضاعة الأولي.",
    "sourceType": "official_textbook",
    "sourcePage": 63,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 63,
      "concept": "س96 الخصم التجاري مقابل الخصم النقدي"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "أنواع الخصومات التجارية.",
      "سؤال مقارنة محاسبية."
    ]
  },
  {
    "id": "b373-u3-097",
    "sourceQuestionId": "b373-u3-097",
    "originalId": "b373-u3-097",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س97 حساب الخصم المسموح به",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "ما طبيعة حساب الخصم المسموح به؟ وأين يظهر في القوائم المالية؟",
    "correctAnswer": "طبيعته **مدينة (مصروف مالي)**، ويظهر في قائمة الدخل مطروحاً من إجمالي المبيعات أو ضمن المصروفات المالية للوصول لـ صافي المبيعات.",
    "modelAnswer": "طبيعته **مدينة (مصروف مالي)**، ويظهر في قائمة الدخل مطروحاً من إجمالي المبيعات أو ضمن المصروفات المالية للوصول لـ صافي المبيعات.",
    "explanation": "تضحية مالية يتحملها البائع لتشجيع التحصيل السريع.",
    "sourceType": "official_textbook",
    "sourcePage": 64,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 64,
      "concept": "س97 حساب الخصم المسموح به"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "الخصم النقدي.",
      "طبيعة الحساب."
    ]
  },
  {
    "id": "b373-u3-098",
    "sourceQuestionId": "b373-u3-098",
    "originalId": "b373-u3-098",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س98 حساب الخصم المكتسب",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "ما طبيعة حساب الخصم المكتسب؟ وأين يظهر في القوائم المالية؟",
    "correctAnswer": "طبيعته **دائنة (إيراد مالي)**، ويظهر في قائمة الدخل مضافاً للإيرادات الأخرى أو مطروحاً من إجمالي المشتريات للوصول لـ صافي المشتريات.",
    "modelAnswer": "طبيعته **دائنة (إيراد مالي)**، ويظهر في قائمة الدخل مضافاً للإيرادات الأخرى أو مطروحاً من إجمالي المشتريات للوصول لـ صافي المشتريات.",
    "explanation": "كسب مالي يحققه المشتري لتعجيل سداد ديونه قبل موعدها.",
    "sourceType": "official_textbook",
    "sourcePage": 64,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 64,
      "concept": "س98 حساب الخصم المكتسب"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "الخصم النقدي.",
      "طبيعة الحساب."
    ]
  },
  {
    "id": "b373-u3-099",
    "sourceQuestionId": "b373-u3-099",
    "originalId": "U3-Q16",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س99 (ص 65)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "اشترت منشأة بضاعة بمبلغ 20,000ج بخصم تجاري 10%. احسب القيمة المسجلة بيومية المشتريات.",
    "correctAnswer": "الخصم التجاري = $20,000 \\times 10\\% = 2,000\\text{ج}$. **الصافي المسجل = $20,000 - 2,000 = \\mathbf{18,000 \\text{ جنيه}}$**.",
    "modelAnswer": "الخصم التجاري = $20,000 \\times 10\\% = 2,000\\text{ج}$. **الصافي المسجل = $20,000 - 2,000 = \\mathbf{18,000 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق على دفاتر اليومية المساعدة والخصومات. (ص 65)",
    "sourceType": "official_textbook",
    "sourcePage": 65,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 65,
      "concept": "س99 (ص 65)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "تطبيق على دفاتر اليومية المساعدة والخصومات.",
      "مسائل رياضية ومحاسبية."
    ],
    "replacesQuestionId": "U3-Q16"
  },
  {
    "id": "b373-u3-100",
    "sourceQuestionId": "b373-u3-100",
    "originalId": "b373-u3-100",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س100 (ص 66)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "باعت منشأة بضاعة بـ 30,000ج بخصم تجاري 5% وخصم نقدي 2% إذا تم السداد خلال 10 أيام. احسب القيمة المسجلة بيومية المبيعات الآجلة.",
    "correctAnswer": "الخصم التجاري = $30,000 \\times 5\\% = 1,500\\text{ج}$. **الصافي المسجل باليومية = $30,000 - 1,500 = \\mathbf{28,500 \\text{ جنيه}}$** (الخصم النقدي يعالج عند السداد لاحقاً).",
    "modelAnswer": "الخصم التجاري = $30,000 \\times 5\\% = 1,500\\text{ج}$. **الصافي المسجل باليومية = $30,000 - 1,500 = \\mathbf{28,500 \\text{ جنيه}}$** (الخصم النقدي يعالج عند السداد لاحقاً).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق على دفاتر اليومية المساعدة والخصومات. (ص 66)",
    "sourceType": "official_textbook",
    "sourcePage": 66,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 66,
      "concept": "س100 (ص 66)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "تطبيق على دفاتر اليومية المساعدة والخصومات.",
      "مسائل رياضية ومحاسبية."
    ]
  },
  {
    "id": "b373-u3-101",
    "sourceQuestionId": "b373-u3-101",
    "originalId": "b373-u3-101",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س101 (ص 67)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "سدد العميل السابق المسجل بـ 28,500ج رصيده خلال مهلة الخصم النقدي (2%). احسب الخصم المسموح به والمبلغ المحصل نقداً.",
    "correctAnswer": "الخصم المسموح به = $28,500 \\times 2\\% = \\mathbf{570 \\text{ جنيه}}$. **المبلغ المحصل بالخزينة = $28,500 - 570 = \\mathbf{27,930 \\text{ جنيه}}$**.",
    "modelAnswer": "الخصم المسموح به = $28,500 \\times 2\\% = \\mathbf{570 \\text{ جنيه}}$. **المبلغ المحصل بالخزينة = $28,500 - 570 = \\mathbf{27,930 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق على دفاتر اليومية المساعدة والخصومات. (ص 67)",
    "sourceType": "official_textbook",
    "sourcePage": 67,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 67,
      "concept": "س101 (ص 67)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "تطبيق على دفاتر اليومية المساعدة والخصومات.",
      "مسائل رياضية ومحاسبية."
    ]
  },
  {
    "id": "b373-u3-102",
    "sourceQuestionId": "b373-u3-102",
    "originalId": "b373-u3-102",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س102 (ص 68)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "سددت المنشأة للمورد رصيداً قدره 15,000ج بشيك واستفادت من خصم نقدي تعجيل دفع قدره 3%. احسب الخصم المكتسب والمبلغ المدفوع بشيك.",
    "correctAnswer": "الخصم المكتسب = $15,000 \\times 3\\% = \\mathbf{450 \\text{ جنيه}}$. **المبلغ المدفوع من البنك = $15,000 - 450 = \\mathbf{14,550 \\text{ جنيه}}$**.",
    "modelAnswer": "الخصم المكتسب = $15,000 \\times 3\\% = \\mathbf{450 \\text{ جنيه}}$. **المبلغ المدفوع من البنك = $15,000 - 450 = \\mathbf{14,550 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق على دفاتر اليومية المساعدة والخصومات. (ص 68)",
    "sourceType": "official_textbook",
    "sourcePage": 68,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 68,
      "concept": "س102 (ص 68)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "تطبيق على دفاتر اليومية المساعدة والخصومات.",
      "مسائل رياضية ومحاسبية."
    ]
  },
  {
    "id": "b373-u3-103",
    "sourceQuestionId": "b373-u3-103",
    "originalId": "b373-u3-103",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س103 (ص 69)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "ردت المنشأة بضاعة غير مطابقة للمواصفات للمورد قيمتها 4,000ج كانت مشتراة بالآجل. اذكر الدفتر المساعد والمستند.",
    "correctAnswer": "تسجل بـ **يومية مردودات المشتريات** بناءً على **إشعار مدين صادر**.",
    "modelAnswer": "تسجل بـ **يومية مردودات المشتريات** بناءً على **إشعار مدين صادر**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق على دفاتر اليومية المساعدة والخصومات. (ص 69)",
    "sourceType": "official_textbook",
    "sourcePage": 69,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 69,
      "concept": "س103 (ص 69)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "تطبيق على دفاتر اليومية المساعدة والخصومات.",
      "مسائل رياضية ومحاسبية."
    ]
  },
  {
    "id": "b373-u3-104",
    "sourceQuestionId": "b373-u3-104",
    "originalId": "b373-u3-104",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س104 (ص 69)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "رد عميل بضاعة للمنشأة بـ 2,500ج. اذكر الدفتر المساعد والمستند.",
    "correctAnswer": "تسجل بـ **يومية مردودات المبيعات** بناءً على **إشعار دائن صادر للعميل**.",
    "modelAnswer": "تسجل بـ **يومية مردودات المبيعات** بناءً على **إشعار دائن صادر للعميل**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق على دفاتر اليومية المساعدة والخصومات. (ص 69)",
    "sourceType": "official_textbook",
    "sourcePage": 69,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 69,
      "concept": "س104 (ص 69)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "تطبيق على دفاتر اليومية المساعدة والخصومات.",
      "مسائل رياضية ومحاسبية."
    ]
  },
  {
    "id": "b373-u3-105",
    "sourceQuestionId": "b373-u3-105",
    "originalId": "b373-u3-105",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س105 (ص 69)",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "تم شراء آلة جديدة للمنشأة بمبلغ 50,000ج بالآجل. هل تسجل بيومية المشتريات الآجلة؟ ولماذا؟",
    "correctAnswer": "لا تسجل بيومية المشتريات الآجلة**؛ لأنها أصل غير متداول وليس بضاعة بغرض البيع. وتسجل في **اليومية العامة** بقيد فرعي.\n\n---",
    "modelAnswer": "لا تسجل بيومية المشتريات الآجلة**؛ لأنها أصل غير متداول وليس بضاعة بغرض البيع. وتسجل في **اليومية العامة** بقيد فرعي.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق على دفاتر اليومية المساعدة والخصومات. (ص 69)",
    "sourceType": "official_textbook",
    "sourcePage": 69,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 69,
      "concept": "س105 (ص 69)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "تطبيق على دفاتر اليومية المساعدة والخصومات.",
      "مسائل رياضية ومحاسبية."
    ]
  },
  {
    "id": "b373-u3-106",
    "sourceQuestionId": "b373-u3-106",
    "originalId": "b373-u3-106",
    "lessonId": "lesson-3-3",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.3",
    "concept": "س106 (ص 70)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما الفرق بين دفتر الأستاذ العام ودفتري الأستاذ المساعد (أستاذ العملاء وأستاذ الموردين)؟",
    "correctAnswer": "الأستاذ العام يحوي حسابات مراقبة إجمالية، بينما الأستاذ المساعد يحوي حسابات فرعية تفصيلية لكل عميل أو مورد منفرد.",
    "modelAnswer": "الأستاذ العام يحوي حسابات مراقبة إجمالية، بينما الأستاذ المساعد يحوي حسابات فرعية تفصيلية لكل عميل أو مورد منفرد.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: دفاتر الأستاذ الفرعية والترحيل الإجمالي. (ص 70)",
    "sourceType": "official_textbook",
    "sourcePage": 70,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 70,
      "concept": "س106 (ص 70)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفاتر الأستاذ الفرعية والترحيل الإجمالي.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-107",
    "sourceQuestionId": "b373-u3-107",
    "originalId": "b373-u3-107",
    "lessonId": "lesson-3-3",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.3",
    "concept": "س107 (ص 71)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "كيف يتم الترحيل من يومية المبيعات الآجلة؟",
    "correctAnswer": "يرحل **المجموع الكلي الشهري** لـ يومية المبيعات إلى الجانب الدائن لحساب مراقبة المبيعات بالأستاذ العام، بينما ترحل المبالغ الفردية يومياً إلى الجانب المدين بحساب كل عميل بـ دفتر أستاذ العملاء.",
    "modelAnswer": "يرحل **المجموع الكلي الشهري** لـ يومية المبيعات إلى الجانب الدائن لحساب مراقبة المبيعات بالأستاذ العام، بينما ترحل المبالغ الفردية يومياً إلى الجانب المدين بحساب كل عميل بـ دفتر أستاذ العملاء.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: دفاتر الأستاذ الفرعية والترحيل الإجمالي. (ص 71)",
    "sourceType": "official_textbook",
    "sourcePage": 71,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 71,
      "concept": "س107 (ص 71)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفاتر الأستاذ الفرعية والترحيل الإجمالي.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-108",
    "sourceQuestionId": "b373-u3-108",
    "originalId": "b373-u3-108",
    "lessonId": "lesson-3-3",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.3",
    "concept": "س108 (ص 72)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "كيف يتم الترحيل من يومية المشتريات الآجلة؟",
    "correctAnswer": "يرحل **المجموع الكلي الشهري** لـ يومية المشتريات إلى الجانب المدين لحساب مراقبة المشتريات بالأستاذ العام، وترحل المبالغ الفردية يومياً لـ الجانب الدائن بحساب كل مورد بـ دفتر أستاذ الموردين.",
    "modelAnswer": "يرحل **المجموع الكلي الشهري** لـ يومية المشتريات إلى الجانب المدين لحساب مراقبة المشتريات بالأستاذ العام، وترحل المبالغ الفردية يومياً لـ الجانب الدائن بحساب كل مورد بـ دفتر أستاذ الموردين.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: دفاتر الأستاذ الفرعية والترحيل الإجمالي. (ص 72)",
    "sourceType": "official_textbook",
    "sourcePage": 72,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 72,
      "concept": "س108 (ص 72)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفاتر الأستاذ الفرعية والترحيل الإجمالي.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-109",
    "sourceQuestionId": "b373-u3-109",
    "originalId": "b373-u3-109",
    "lessonId": "lesson-3-3",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.3",
    "concept": "س109 (ص 73)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إجمالي يومية المبيعات الآجلة 80,000ج، ومردوداتها 5,000ج. احسب صافي المبيعات الآجلة.",
    "correctAnswer": "الصافي = $80,000 - 5,000 = \\mathbf{75,000 \\text{ جنيه}}$.",
    "modelAnswer": "الصافي = $80,000 - 5,000 = \\mathbf{75,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: دفاتر الأستاذ الفرعية والترحيل الإجمالي. (ص 73)",
    "sourceType": "official_textbook",
    "sourcePage": 73,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 73,
      "concept": "س109 (ص 73)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفاتر الأستاذ الفرعية والترحيل الإجمالي.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-110",
    "sourceQuestionId": "b373-u3-110",
    "originalId": "b373-u3-110",
    "lessonId": "lesson-3-3",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.3",
    "concept": "س110 (ص 73)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إجمالي يومية المشتريات الآجلة 60,000ج، ومردوداتها 4,000ج. احسب صافي المشتريات الآجلة.",
    "correctAnswer": "الصافي = $60,000 - 4,000 = \\mathbf{56,000 \\text{ جنيه}}$.",
    "modelAnswer": "الصافي = $60,000 - 4,000 = \\mathbf{56,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: دفاتر الأستاذ الفرعية والترحيل الإجمالي. (ص 73)",
    "sourceType": "official_textbook",
    "sourcePage": 73,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 73,
      "concept": "س110 (ص 73)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفاتر الأستاذ الفرعية والترحيل الإجمالي.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-111",
    "sourceQuestionId": "b373-u3-111",
    "originalId": "b373-u3-111",
    "lessonId": "lesson-3-3",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.3",
    "concept": "س111 (ص 74)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ماذا يحدث إذا رحل محاسب فاتورة مبيعات لعميل بـ أستاذ العملاء ونسي ترحيل المجموع الكلي بحساب المراقبة بالأستاذ العام؟",
    "correctAnswer": "ينشأ عدم مطابقة وخلاف بين مجموع أرصدة حسابات العملاء الفردية ورصيد حساب مراقبة المبيعات بالأستاذ العام.",
    "modelAnswer": "ينشأ عدم مطابقة وخلاف بين مجموع أرصدة حسابات العملاء الفردية ورصيد حساب مراقبة المبيعات بالأستاذ العام.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: دفاتر الأستاذ الفرعية والترحيل الإجمالي. (ص 74)",
    "sourceType": "official_textbook",
    "sourcePage": 74,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 74,
      "concept": "س111 (ص 74)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفاتر الأستاذ الفرعية والترحيل الإجمالي.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-112",
    "sourceQuestionId": "b373-u3-112",
    "originalId": "b373-u3-112",
    "lessonId": "lesson-3-3",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.3",
    "concept": "س112 (ص 74)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما قاعدة إعداد جدول مطابقة أستاذ العملاء بنهاية الفترة؟",
    "correctAnswer": "نجمع الأرصدة المدينة لكافة حسابات العملاء الفردية بـ دفتر الأستاذ المساعد، ويجب أن يتطابق المجموع تماماً مع رصيد حساب مراقبة المبيعات (العملاء) بـ دفتر الأستاذ العام.\n\n---",
    "modelAnswer": "نجمع الأرصدة المدينة لكافة حسابات العملاء الفردية بـ دفتر الأستاذ المساعد، ويجب أن يتطابق المجموع تماماً مع رصيد حساب مراقبة المبيعات (العملاء) بـ دفتر الأستاذ العام.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: دفاتر الأستاذ الفرعية والترحيل الإجمالي. (ص 74)",
    "sourceType": "official_textbook",
    "sourcePage": 74,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 74,
      "concept": "س112 (ص 74)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "دفاتر الأستاذ الفرعية والترحيل الإجمالي.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-113",
    "sourceQuestionId": "b373-u3-113",
    "originalId": "b373-u3-113",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س113 (ص 75)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إعداد يومية المبيعات الآجلة لـ 3 عمليات: (عميل أحمد 5,000ج، عميل حسن 8,000ج، عميل علي 12,000ج).",
    "correctAnswer": "مجموع يومية المبيعات الآجلة = 5,000 + 8,000 + 12,000 = **25,000 جنيه**.",
    "modelAnswer": "مجموع يومية المبيعات الآجلة = 5,000 + 8,000 + 12,000 = **25,000 جنيه**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س113 (ص 75)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-114",
    "sourceQuestionId": "b373-u3-114",
    "originalId": "b373-u3-114",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س114 (ص 76)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إعداد يومية المشتريات الآجلة لـ 3 عمليات: (مورد النيل 10,000ج، مورد الأهرام 15,000ج، مورد الشرق 20,000ج).",
    "correctAnswer": "مجموع يومية المشتريات الآجلة = 10,000 + 15,000 + 20,000 = **45,000 جنيه**.",
    "modelAnswer": "مجموع يومية المشتريات الآجلة = 10,000 + 15,000 + 20,000 = **45,000 جنيه**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 76)",
    "sourceType": "official_textbook",
    "sourcePage": 76,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 76,
      "concept": "س114 (ص 76)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-115",
    "sourceQuestionId": "b373-u3-115",
    "originalId": "b373-u3-115",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س115 (ص 77)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "قيد إجمالي الترحيل ليومية المبيعات الآجلة (25,000ج).\n  * **القيد:** 25,000 من حـ/ مراقبة العملاء إلى حـ/ المبيعات (25,000ج).",
    "correctAnswer": "قيد إجمالي الترحيل ليومية المبيعات الآجلة (25,000ج).\n  * **القيد:** 25,000 من حـ/ مراقبة العملاء إلى حـ/ المبيعات (25,000ج).",
    "modelAnswer": "قيد إجمالي الترحيل ليومية المبيعات الآجلة (25,000ج).\n  * **القيد:** 25,000 من حـ/ مراقبة العملاء إلى حـ/ المبيعات (25,000ج).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 77)",
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "س115 (ص 77)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-116",
    "sourceQuestionId": "b373-u3-116",
    "originalId": "b373-u3-116",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س116 (ص 77)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "قيد إجمالي الترحيل ليومية المشتريات الآجلة (45,000ج).\n  * **القيد:** 45,000 من حـ/ المشتريات إلى حـ/ مراقبة الموردين (45,000ج).",
    "correctAnswer": "قيد إجمالي الترحيل ليومية المشتريات الآجلة (45,000ج).\n  * **القيد:** 45,000 من حـ/ المشتريات إلى حـ/ مراقبة الموردين (45,000ج).",
    "modelAnswer": "قيد إجمالي الترحيل ليومية المشتريات الآجلة (45,000ج).\n  * **القيد:** 45,000 من حـ/ المشتريات إلى حـ/ مراقبة الموردين (45,000ج).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 77)",
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "س116 (ص 77)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-117",
    "sourceQuestionId": "b373-u3-117",
    "originalId": "b373-u3-117",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س117 (ص 78)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ترصيد جانب المقبوضات بدفتر النقدية: خزينة 30,000ج، بنك 70,000ج، خصم مسموح به 1,500ج.",
    "correctAnswer": "إجمالي النقدية المتدفقة = 30,000 + 70,000 = **100,000 جنيه**، والخصم المسموح به **1,500 جنيه (مصروف)**.",
    "modelAnswer": "إجمالي النقدية المتدفقة = 30,000 + 70,000 = **100,000 جنيه**، والخصم المسموح به **1,500 جنيه (مصروف)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 78)",
    "sourceType": "official_textbook",
    "sourcePage": 78,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 78,
      "concept": "س117 (ص 78)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-118",
    "sourceQuestionId": "b373-u3-118",
    "originalId": "b373-u3-118",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س118 (ص 79)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ترصيد جانب المدفوعات بدفتر النقدية: خزينة 18,000ج، بنك 40,000ج، خصم مكتسب 2,000ج.",
    "correctAnswer": "إجمالي النقدية المدفوعة = 18,000 + 40,000 = **58,000 جنيه**، والخصم المكتسب **2,000 جنيه (إيراد)**.",
    "modelAnswer": "إجمالي النقدية المدفوعة = 18,000 + 40,000 = **58,000 جنيه**، والخصم المكتسب **2,000 جنيه (إيراد)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 79)",
    "sourceType": "official_textbook",
    "sourcePage": 79,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 79,
      "concept": "س118 (ص 79)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-119",
    "sourceQuestionId": "b373-u3-119",
    "originalId": "eb-tac-001",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س119 (ص 80)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "رصيد الخزينة النهائي من دفتر النقدية (مقبوضات 30,000 - مدفوعات 18,000).",
    "correctAnswer": "الرصيد المنقول = **12,000 جنيه (مدين)**.",
    "modelAnswer": "الرصيد المنقول = **12,000 جنيه (مدين)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 80)",
    "sourceType": "official_textbook",
    "sourcePage": 80,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 80,
      "concept": "س119 (ص 80)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "eb-tac-001"
  },
  {
    "id": "b373-u3-120",
    "sourceQuestionId": "b373-u3-120",
    "originalId": "U5-Q21",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س120 (ص 80)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "رصيد البنك النهائي من دفتر النقدية (مقبوضات 70,000 - مدفوعات 40,000).",
    "correctAnswer": "الرصيد المنقول = **30,000 جنيه (مدين)**.",
    "modelAnswer": "الرصيد المنقول = **30,000 جنيه (مدين)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 80)",
    "sourceType": "official_textbook",
    "sourcePage": 80,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 80,
      "concept": "س120 (ص 80)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U5-Q21"
  },
  {
    "id": "b373-u3-121",
    "sourceQuestionId": "b373-u3-121",
    "originalId": "b373-u3-121",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س121",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "تسجل المبيعات النقدية في:",
    "correctAnswer": "دفتر النقدية جانب المقبوضات",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س121"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "يومية المبيعات الآجلة",
      "دفتر النقدية جانب المقبوضات",
      "اليومية العامة",
      "يومية المشتريات."
    ],
    "distractors": [
      "يومية المبيعات الآجلة",
      "اليومية العامة",
      "يومية المشتريات."
    ]
  },
  {
    "id": "b373-u3-122",
    "sourceQuestionId": "b373-u3-122",
    "originalId": "b373-u3-122",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س122",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "المستند المؤيد لإثبات عملية بيع آجل هو:",
    "correctAnswer": "فاتورة مبيعات صادرة",
    "modelAnswer": "الإجابة (ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س122"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "فاتورة شراء واردة",
      "إشعار مدين",
      "فاتورة مبيعات صادرة",
      "إيصال استلام نقدية."
    ],
    "distractors": [
      "فاتورة شراء واردة",
      "إشعار مدين",
      "إيصال استلام نقدية."
    ]
  },
  {
    "id": "b373-u3-123",
    "sourceQuestionId": "b373-u3-123",
    "originalId": "b373-u3-123",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س123",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الخصم التجاري:",
    "correctAnswer": "لا يظهر بالدفاتر ويسجل بالصافي",
    "modelAnswer": "الإجابة (ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س123"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "يسجل بحساب مستقل",
      "يظهر في قائمة الدخل كـ مصروف",
      "لا يظهر بالدفاتر ويسجل بالصافي",
      "يمنح عند تعجيل السداد."
    ],
    "distractors": [
      "يسجل بحساب مستقل",
      "يظهر في قائمة الدخل كـ مصروف",
      "يمنح عند تعجيل السداد."
    ]
  },
  {
    "id": "b373-u3-124",
    "sourceQuestionId": "b373-u3-124",
    "originalId": "b373-u3-124",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س124",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الخصم المسموح به يظهر في دفتر النقدية بجانب:",
    "correctAnswer": "المقبوضات",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س124"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "المدفوعات",
      "المقبوضات",
      "التسويات المعلقة",
      "لا يظهر بالنقدية."
    ],
    "distractors": [
      "المدفوعات",
      "التسويات المعلقة",
      "لا يظهر بالنقدية."
    ]
  },
  {
    "id": "b373-u3-125",
    "sourceQuestionId": "b373-u3-125",
    "originalId": "b373-u3-125",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س125",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "حساب مراقبة العملاء يفتح بـ:",
    "correctAnswer": "دفتر الأستاذ العام",
    "modelAnswer": "الإجابة (ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س125"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "دفتر أستاذ العملاء الفرعي",
      "دفتر اليومية العامة",
      "دفتر الأستاذ العام",
      "دفتر النقدية."
    ],
    "distractors": [
      "دفتر أستاذ العملاء الفرعي",
      "دفتر اليومية العامة",
      "دفتر النقدية."
    ]
  },
  {
    "id": "b373-u3-126",
    "sourceQuestionId": "b373-u3-126",
    "originalId": "b373-u3-126",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س126",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تسجل مشتريات الأصول الثابتة بالآجل في يومية المشتريات الآجلة. (صح / خطأ).",
    "correctAnswer": "خطأ (تسجل باليومية العامة)**.",
    "modelAnswer": "خطأ (تسجل باليومية العامة)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س126"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-127",
    "sourceQuestionId": "b373-u3-127",
    "originalId": "b373-u3-127",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س127",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الخصم المكتسب يُعد إيراداً مالياً للمنشأة نتيجة تعجيل سداد ديونها. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س127"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-128",
    "sourceQuestionId": "b373-u3-128",
    "originalId": "b373-u3-128",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س128",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "يومية مردودات المبيعات تقيد البضاعة المردودة من العملاء. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س128"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-129",
    "sourceQuestionId": "b373-u3-129",
    "originalId": "b373-u3-129",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س129",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "يرحل المجموع الكلي ليومية المبيعات الآجلة إلى حساب مراقبة المبيعات بالأستاذ العام. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س129"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-130",
    "sourceQuestionId": "b373-u3-130",
    "originalId": "b373-u3-130",
    "lessonId": "lesson-3-2",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.2",
    "concept": "س130",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الخصم النقدي يثبت بالدفاتر وقت البيع مباشرة دون انتظار السداد. (صح / خطأ).",
    "correctAnswer": "خطأ (يثبت عند السداد الفعلي خلال المهلة)**.\n\n---",
    "modelAnswer": "خطأ (يثبت عند السداد الفعلي خلال المهلة)**.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: المسائل الحسابية الشاملة لليوميات المساعدة والنقدية. (ص 75 – 83)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س130"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "المسائل الحسابية الشاملة لليوميات المساعدة والنقدية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-131",
    "sourceQuestionId": "b373-u3-131",
    "originalId": "b373-u3-131",
    "lessonId": "lesson-3-1",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.1",
    "concept": "س131",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اذكر فائدتين استخدام حسابات المراقبة الإجمالية في كشف الاختلاسات.",
    "correctAnswer": "1) يوفر رصيداً حظرياً محايداً يقارن بمجموع الحسابات الفردية 2) يمنع تواطؤ محاسب الأستاذ المساعد مع العملاء بتعديل الأرصدة الفردية.",
    "modelAnswer": "1) يوفر رصيداً حظرياً محايداً يقارن بمجموع الحسابات الفردية 2) يمنع تواطؤ محاسب الأستاذ المساعد مع العملاء بتعديل الأرصدة الفردية.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 84)",
    "sourceType": "official_textbook",
    "sourcePage": 84,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 84,
      "concept": "س131"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-132",
    "sourceQuestionId": "b373-u3-132",
    "originalId": "b373-u3-132",
    "lessonId": "lesson-3-1",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.1",
    "concept": "س132",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "كيف تعالج الديون المعدومة في حساب مراقبة العملاء؟",
    "correctAnswer": "تجعل في الجانب الدائن لحساب مراقبة العملاء لتخفيض إجمالي مديونيات العملاء بقيمتها.",
    "modelAnswer": "تجعل في الجانب الدائن لحساب مراقبة العملاء لتخفيض إجمالي مديونيات العملاء بقيمتها.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 84)",
    "sourceType": "official_textbook",
    "sourcePage": 84,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 84,
      "concept": "س132"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-133",
    "sourceQuestionId": "b373-u3-133",
    "originalId": "b373-u3-133",
    "lessonId": "lesson-3-1",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.1",
    "concept": "س133",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما أثر الخصم المسموح به على حساب مراقبة العملاء؟",
    "correctAnswer": "يظهر في الجانب الدائن لحساب مراقبة العملاء لأنه يحط ويخفض من إجمالي الديون المطالب بها العملاء.\n\n---",
    "modelAnswer": "يظهر في الجانب الدائن لحساب مراقبة العملاء لأنه يحط ويخفض من إجمالي الديون المطالب بها العملاء.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 84)",
    "sourceType": "official_textbook",
    "sourcePage": 84,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 84,
      "concept": "س133"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u3-134",
    "sourceQuestionId": "b373-u3-134",
    "originalId": "b373-u3-134",
    "lessonId": "lesson-3-4",
    "unitId": "unit-3",
    "learningObjectiveId": "LO-U3.4",
    "concept": "س134 المقال المحاسبي الشامل لـ الوحدة الثالثة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة المحاسبية التالية في مقال تحليلي متكامل: **\"هل يؤدي تقسيم النظام المحاسبي واستخدام دفاتر اليومية المساعدة المتخصصة وحسابات المراقبة إلى تعزيز الرقابة الداخلية وإحكام المصداقية، أم أنه يخلق تعقيداً إدارياً وتكراراً لا يعكس القيمة الجوهرية للمعاملات؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nتقسيم النظام المحاسبي إلى دفاتر يومية مساعدة متخصصة وحسابات مراقبة إجمالية يؤدي بشكل قاطع إلى تعزيز الرقابة الداخلية وإحكام المصداقية وتسهيل العمل الإداري، وليس مجرد تعقيد أو تكرار لا قيمة له.\n\n2. التفسير والتعليل (4 درجات):\nلأن المنشآت متوسطة وكبيرة الحجم تنفذ آلاف المعاملات الآجلة والنقدية يومياً؛ فقيد كل عملية منفردة بـ اليومية العامة يسبب اختناقاً وتوقفاً للدورة المحاسبية. وتتيح اليوميات المساعدة توزيع العمل بين عدة محاسبين، مع إحكام السيطرة عبر \"حسابات المراقبة الإجمالية\" التي تعمل كميزان مطابقة داخلي مستقل.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثالثة (4 درجات):\n• فصل المهام والرقابة: محاسب أستاذ العملاء الفرعي يقيد حسابات الأفراد، بينما يرحل محاسب آخر الإجمالي لحساب مراقبة العملاء بـ الأستاذ العام، مما يمنع التلاعب وتعديل الأرصدة.\n• كشف أخطاء الترحيل: مطابقة مجموع جدول أستاذ العملاء الفردي مع رصيد حساب المراقبة الإجمالي تكشف فوراً أي سهو أو خطأ في قيد فواتير المبيعات.\n• تنظيم الخصومات: دفتر النقدية ذو الخانات الثلاث يثبت الخصم المسموح به والخصم المكتسب عند لحظة التحصيل/السداد بدقة مستندية متناهية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى أصحاب المشروعات الصغيرة أن الدفاتر المساعدة تمثل عبئاً وتكراراً لقلة المعاملات؛ والرد المحاسبي أن هذا الطرح يصح فقط في المنشآت الفردية الصغرى، بينما تحول الدفاتر المساعدة إلى ضرورة تنظيمية وحتمية رقابية فور نمو المشروع وتعدد العملاء والموردين.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن دفاتر اليومية المساعدة وحسابات المراقبة هي العمود الفقري لـ نظم الرقابة الداخلية الحديثة، وتوفر التوازن الأمثل بين الكفاءة التشغيلية والدقة المحاسبية والموضوعية المستندية.\n```\n\n---\n\n## 📘 الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nتقسيم النظام المحاسبي إلى دفاتر يومية مساعدة متخصصة وحسابات مراقبة إجمالية يؤدي بشكل قاطع إلى تعزيز الرقابة الداخلية وإحكام المصداقية وتسهيل العمل الإداري، وليس مجرد تعقيد أو تكرار لا قيمة له.\n\n2. التفسير والتعليل (4 درجات):\nلأن المنشآت متوسطة وكبيرة الحجم تنفذ آلاف المعاملات الآجلة والنقدية يومياً؛ فقيد كل عملية منفردة بـ اليومية العامة يسبب اختناقاً وتوقفاً للدورة المحاسبية. وتتيح اليوميات المساعدة توزيع العمل بين عدة محاسبين، مع إحكام السيطرة عبر \"حسابات المراقبة الإجمالية\" التي تعمل كميزان مطابقة داخلي مستقل.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثالثة (4 درجات):\n• فصل المهام والرقابة: محاسب أستاذ العملاء الفرعي يقيد حسابات الأفراد، بينما يرحل محاسب آخر الإجمالي لحساب مراقبة العملاء بـ الأستاذ العام، مما يمنع التلاعب وتعديل الأرصدة.\n• كشف أخطاء الترحيل: مطابقة مجموع جدول أستاذ العملاء الفردي مع رصيد حساب المراقبة الإجمالي تكشف فوراً أي سهو أو خطأ في قيد فواتير المبيعات.\n• تنظيم الخصومات: دفتر النقدية ذو الخانات الثلاث يثبت الخصم المسموح به والخصم المكتسب عند لحظة التحصيل/السداد بدقة مستندية متناهية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى أصحاب المشروعات الصغيرة أن الدفاتر المساعدة تمثل عبئاً وتكراراً لقلة المعاملات؛ والرد المحاسبي أن هذا الطرح يصح فقط في المنشآت الفردية الصغرى، بينما تحول الدفاتر المساعدة إلى ضرورة تنظيمية وحتمية رقابية فور نمو المشروع وتعدد العملاء والموردين.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن دفاتر اليومية المساعدة وحسابات المراقبة هي العمود الفقري لـ نظم الرقابة الداخلية الحديثة، وتوفر التوازن الأمثل بين الكفاءة التشغيلية والدقة المحاسبية والموضوعية المستندية.\n```\n\n---\n\n## 📘 الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nتقسيم النظام المحاسبي إلى دفاتر يومية مساعدة متخصصة وحسابات مراقبة إجمالية يؤدي بشكل قاطع إلى تعزيز الرقابة الداخلية وإحكام المصداقية وتسهيل العمل الإداري، وليس مجرد تعقيد أو تكرار لا قيمة له.\n\n2. التفسير والتعليل (4 درجات):\nلأن المنشآت متوسطة وكبيرة الحجم تنفذ آلاف المعاملات الآجلة والنقدية يومياً؛ فقيد كل عملية منفردة بـ اليومية العامة يسبب اختناقاً وتوقفاً للدورة المحاسبية. وتتيح اليوميات المساعدة توزيع العمل بين عدة محاسبين، مع إحكام السيطرة عبر \"حسابات المراقبة الإجمالية\" التي تعمل كميزان مطابقة داخلي مستقل.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثالثة (4 درجات):\n• فصل المهام والرقابة: محاسب أستاذ العملاء الفرعي يقيد حسابات الأفراد، بينما يرحل محاسب آخر الإجمالي لحساب مراقبة العملاء بـ الأستاذ العام، مما يمنع التلاعب وتعديل الأرصدة.\n• كشف أخطاء الترحيل: مطابقة مجموع جدول أستاذ العملاء الفردي مع رصيد حساب المراقبة الإجمالي تكشف فوراً أي سهو أو خطأ في قيد فواتير المبيعات.\n• تنظيم الخصومات: دفتر النقدية ذو الخانات الثلاث يثبت الخصم المسموح به والخصم المكتسب عند لحظة التحصيل/السداد بدقة مستندية متناهية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى أصحاب المشروعات الصغيرة أن الدفاتر المساعدة تمثل عبئاً وتكراراً لقلة المعاملات؛ والرد المحاسبي أن هذا الطرح يصح فقط في المنشآت الفردية الصغرى، بينما تحول الدفاتر المساعدة إلى ضرورة تنظيمية وحتمية رقابية فور نمو المشروع وتعدد العملاء والموردين.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن دفاتر اليومية المساعدة وحسابات المراقبة هي العمود الفقري لـ نظم الرقابة الداخلية الحديثة، وتوفر التوازن الأمثل بين الكفاءة التشغيلية والدقة المحاسبية والموضوعية المستندية.\n```\n\n---\n\n## 📘 الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 85,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 85,
      "concept": "س134 المقال المحاسبي الشامل لـ الوحدة الثالثة (JRE)"
    },
    "tags": [
      "الوحدة الثالثة: دفاتر اليومية المساعدة وحسابات المراقبة الإجمالية (ص 59 – 88)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة الثالثة (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u4-135",
    "sourceQuestionId": "b373-u4-135",
    "originalId": "b373-u4-135",
    "lessonId": "lesson-4-1",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.1",
    "concept": "س135 السؤال الجوهري للوحدة الرابعة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "ما ميزان المراجعة؟ وما الغرض من إعداده؟ وهل يتضمن إعداده إثبات الصحة المطلقة للحسابات؟",
    "correctAnswer": "ميزان المراجعة كشف يضم جميع أسماء وحسابات الأستاذ العام بأرصدتها أو بمجاميعها المدينة والدائنة في تاريخ معين. والغرض منه اختبار التوازن الحسابي والتأكد من إعمال القيد المزدوج. ولا يثبت الصحة المطلقة لاحتمال وجود أخطاء لا تؤثر على توازنه.",
    "modelAnswer": "ميزان المراجعة كشف يضم جميع أسماء وحسابات الأستاذ العام بأرصدتها أو بمجاميعها المدينة والدائنة في تاريخ معين. والغرض منه اختبار التوازن الحسابي والتأكد من إعمال القيد المزدوج. ولا يثبت الصحة المطلقة لاحتمال وجود أخطاء لا تؤثر على توازنه.",
    "explanation": "أداة فحص واختبار توازن وسيطة تسبق إعداد القوائم المالية.",
    "sourceType": "official_textbook",
    "sourcePage": 89,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 89,
      "concept": "س135 السؤال الجوهري للوحدة الرابعة"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الافتتاحية — ميزان المراجعة.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u4-136",
    "sourceQuestionId": "b373-u4-136",
    "originalId": "b373-u4-136",
    "lessonId": "lesson-4-1",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.1",
    "concept": "س136 دراسة حالة مكتبة سامح والأخطاء المحاسبية",
    "difficulty": "intermediate",
    "questionType": "case",
    "bloomLevel": "application",
    "question": "أعد سامح ميزان المراجعة لـ مكتبته ووجد مجموع الجانب المدين أكبر من الدائن بـ 1,800ج، فاكتشف خطأ في ترحيل فاتورة وشراء أصل مسجل كـ مصروف. كيف تعالج هذه الأخطاء؟",
    "correctAnswer": "تعالج بـ فتح **الحساب المعلق** المؤقت بمبلغ الفرق (1,800ج) لإعادة توازن الميزان شكلياً، ثم إجراء قيود تصحيح الأخطاء باليومية العامة وإقفال الحساب المعلق.",
    "modelAnswer": "تعالج بـ فتح **الحساب المعلق** المؤقت بمبلغ الفرق (1,800ج) لإعادة توازن الميزان شكلياً، ثم إجراء قيود تصحيح الأخطاء باليومية العامة وإقفال الحساب المعلق.",
    "explanation": "الحساب المعلق أداة موازنة مؤقتة تمنع تعطيل إعداد التقرير المالي أثناء تتبع الأخطاء.",
    "sourceType": "official_textbook",
    "sourcePage": 90,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 90,
      "concept": "س136 دراسة حالة مكتبة سامح والأخطاء المحاسبية"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "التطبيق الميداني لأخطاء ميزان المراجعة.",
      "دراسة حالة سياقية."
    ]
  },
  {
    "id": "b373-u4-137",
    "sourceQuestionId": "b373-u4-137",
    "originalId": "b373-u4-137",
    "lessonId": "lesson-4-1",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.1",
    "concept": "س137 ميزان المراجعة بالمجاميع مقابل ميزان المراجعة بالأرصدة",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "قارن بين ميزان المراجعة بالمجاميع وميزان المراجعة بالأرصدة وأيهما أوسع استخداماً.",
    "correctAnswer": "- **بالمجاميع:** يتضمن مجموع المبالغ المدينة والدائنة لكل حساب بـ دفتر الأستاذ.\n  - **بالأرصدة:** يتضمن الصافي فقط (الرصيد المدين أو الدائن) لكل حساب، وهو الأكثر شيوعاً واستخداماً لأنه يغذي القوائم المالية مباشرة.",
    "modelAnswer": "- **بالمجاميع:** يتضمن مجموع المبالغ المدينة والدائنة لكل حساب بـ دفتر الأستاذ.\n  - **بالأرصدة:** يتضمن الصافي فقط (الرصيد المدين أو الدائن) لكل حساب، وهو الأكثر شيوعاً واستخداماً لأنه يغذي القوائم المالية مباشرة.",
    "explanation": "توازن ميزان المجاميع يتبعه حتماً توازن ميزان الأرصدة.",
    "sourceType": "official_textbook",
    "sourcePage": 91,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 91,
      "concept": "س137 ميزان المراجعة بالمجاميع مقابل ميزان المراجعة بالأرصدة"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "أنواع ميزان المراجعة.",
      "سؤال مقارنة."
    ]
  },
  {
    "id": "b373-u4-138",
    "sourceQuestionId": "b373-u4-138",
    "originalId": "U4-Q09",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س138 (ص 92)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "اذكر الأخطاء التي **لا تؤثر** على توازن ميزان المراجعة.",
    "correctAnswer": "1) أخطاء السهو والحذف الكلي 2) أخطاء الارتكاب المتبادلة في الحسابات 3) الأخطاء الفنية (أخطاء المبادئ) 4) الأخطاء التكافؤية (المكافئة).",
    "modelAnswer": "1) أخطاء السهو والحذف الكلي 2) أخطاء الارتكاب المتبادلة في الحسابات 3) الأخطاء الفنية (أخطاء المبادئ) 4) الأخطاء التكافؤية (المكافئة).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 92)",
    "sourceType": "official_textbook",
    "sourcePage": 92,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 92,
      "concept": "س138 (ص 92)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U4-Q09"
  },
  {
    "id": "b373-u4-139",
    "sourceQuestionId": "b373-u4-139",
    "originalId": "U4-Q09",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س139 (ص 93)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "اذكر الأخطاء التي **تؤثر** على توازن ميزان المراجعة.",
    "correctAnswer": "1) أخطاء الجمع والترصيد بحسابات الأستاذ 2) ترحيل طرف واحد من القيد وإغفال الطرف الآخر 3) ترحيل مبلغ مختلف في أحد الجانبين 4) نقل رصيد حساب بـ الجانب العكسي في ميزان المراجعة.",
    "modelAnswer": "1) أخطاء الجمع والترصيد بحسابات الأستاذ 2) ترحيل طرف واحد من القيد وإغفال الطرف الآخر 3) ترحيل مبلغ مختلف في أحد الجانبين 4) نقل رصيد حساب بـ الجانب العكسي في ميزان المراجعة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 93)",
    "sourceType": "official_textbook",
    "sourcePage": 93,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 93,
      "concept": "س139 (ص 93)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U4-Q09"
  },
  {
    "id": "b373-u4-140",
    "sourceQuestionId": "b373-u4-140",
    "originalId": "b373-u4-140",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س140 (ص 94)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "ما المقصود بـ **أخطاء المبادئ (الأخطاء الفنية)**؟ وهل تخل بتوازن ميزان المراجعة؟",
    "correctAnswer": "هي الأخطاء الناجمة عن خرق المبادئ المحاسبية المعترف بها (مثل تسجيل شراء أصل غير متداول كـ مصروف تشغيلي). ولا تخل بالتوازن العددي لميزان المراجعة.",
    "modelAnswer": "هي الأخطاء الناجمة عن خرق المبادئ المحاسبية المعترف بها (مثل تسجيل شراء أصل غير متداول كـ مصروف تشغيلي). ولا تخل بالتوازن العددي لميزان المراجعة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 94)",
    "sourceType": "official_textbook",
    "sourcePage": 94,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 94,
      "concept": "س140 (ص 94)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-141",
    "sourceQuestionId": "b373-u4-141",
    "originalId": "b373-u4-141",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س141 (ص 94)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "ما المقصود بـ **الأخطاء التكافؤية (المكافئة)**؟",
    "correctAnswer": "هي أخطاء مساوية في القيمة والمعاكسة في الاتجاه تقع في حسابين مختلفين بحيث يلغي أحد الخطأين أثر الخطأ الآخر تماماً على التوازن.",
    "modelAnswer": "هي أخطاء مساوية في القيمة والمعاكسة في الاتجاه تقع في حسابين مختلفين بحيث يلغي أحد الخطأين أثر الخطأ الآخر تماماً على التوازن.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 94)",
    "sourceType": "official_textbook",
    "sourcePage": 94,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 94,
      "concept": "س141 (ص 94)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-142",
    "sourceQuestionId": "b373-u4-142",
    "originalId": "b373-u4-142",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س142 (ص 95)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "ما المقصود بـ **أخطاء الحذف والسهو الكلي**؟",
    "correctAnswer": "عدم قيد العملية المالية بالكامل في دفتر اليومية العامة، وبالتالي عدم ترحيلها إطلاقاً لحسابات الأستاذ.",
    "modelAnswer": "عدم قيد العملية المالية بالكامل في دفتر اليومية العامة، وبالتالي عدم ترحيلها إطلاقاً لحسابات الأستاذ.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 95)",
    "sourceType": "official_textbook",
    "sourcePage": 95,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 95,
      "concept": "س142 (ص 95)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-143",
    "sourceQuestionId": "b373-u4-143",
    "originalId": "b373-u4-143",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س143 (ص 95)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "ما المقصود بـ **أخطاء الحذف الجزئي**؟",
    "correctAnswer": "قيد العملية باليومية ولكن مع ترحيل طرف واحد فقط للأستاذ وإغفال الطرف الثاني، مما يؤثر فوراً على توازن ميزان المراجعة.",
    "modelAnswer": "قيد العملية باليومية ولكن مع ترحيل طرف واحد فقط للأستاذ وإغفال الطرف الثاني، مما يؤثر فوراً على توازن ميزان المراجعة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 95)",
    "sourceType": "official_textbook",
    "sourcePage": 95,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 95,
      "concept": "س143 (ص 95)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-144",
    "sourceQuestionId": "b373-u4-144",
    "originalId": "b373-u4-144",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س144 (ص 96)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "ما أثر قيد سداد مصروف الصيانة (1,000ج) بـ 10,000ج في جانبي المدين والدائن معاً؟",
    "correctAnswer": "لا يخل بتوازن ميزان المراجعة (خطأ كمي متساوي بالجانبين)، ولكنه يضخم المصروفات ويخفض الربح بـ 9,000ج بالباطل.",
    "modelAnswer": "لا يخل بتوازن ميزان المراجعة (خطأ كمي متساوي بالجانبين)، ولكنه يضخم المصروفات ويخفض الربح بـ 9,000ج بالباطل.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 96)",
    "sourceType": "official_textbook",
    "sourcePage": 96,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 96,
      "concept": "س144 (ص 96)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-145",
    "sourceQuestionId": "b373-u4-145",
    "originalId": "b373-u4-145",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س145 (ص 96)",
    "difficulty": "basic",
    "questionType": "applied",
    "bloomLevel": "knowledge",
    "question": "ما أثر نقل رصيد حساب البنك المدين (15,000ج) كـ رصيد دائن في ميزان المراجعة؟",
    "correctAnswer": "يؤثر على التوازن وينشأ عنه فرق في الميزان يساوي **ضعف المبلغ (30,000 جنيه)** لصالح الجانب الدائن.\n\n---",
    "modelAnswer": "يؤثر على التوازن وينشأ عنه فرق في الميزان يساوي **ضعف المبلغ (30,000 جنيه)** لصالح الجانب الدائن.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تصنيف الأخطاء المحاسبية. (ص 96)",
    "sourceType": "official_textbook",
    "sourcePage": 96,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 96,
      "concept": "س145 (ص 96)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "تصنيف الأخطاء المحاسبية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-146",
    "sourceQuestionId": "b373-u4-146",
    "originalId": "b373-u4-146",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س146 (ص 97)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "قارن بين الطريقة المباشرة (الُمطوّلة) والطريقة غير المباشرة (المختصرة) في تصحيح الأخطاء.",
    "correctAnswer": "- **المطولة:** إلغاء القيد الخاطئ بالكامل بقيد عكسي، ثم كتابة القيد الصحيح من جديد (في قيدين).\n    - **المختصرة:** تعديل الحسابات المخطئة مباشرة بالفرق أو بالتحويل بقيد يومية واحد.",
    "modelAnswer": "- **المطولة:** إلغاء القيد الخاطئ بالكامل بقيد عكسي، ثم كتابة القيد الصحيح من جديد (في قيدين).\n    - **المختصرة:** تعديل الحسابات المخطئة مباشرة بالفرق أو بالتحويل بقيد يومية واحد.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 97)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س146 (ص 97)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-147",
    "sourceQuestionId": "b373-u4-147",
    "originalId": "b373-u4-147",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س147 (ص 98)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تم قيد شراء أثاث بمبلغ 5,000ج نقداً بـ قيد خاطئ: (من حـ/ السيارات إلى حـ/ الخزينة 5,000ج). صحح القيد بـ **الطريقة المختصرة**.\n  * **قيد التصحيح المختصر:** 5,000 من حـ/ الأثاث إلى حـ/ السيارات (5,000ج).",
    "correctAnswer": "تم قيد شراء أثاث بمبلغ 5,000ج نقداً بـ قيد خاطئ: (من حـ/ السيارات إلى حـ/ الخزينة 5,000ج). صحح القيد بـ **الطريقة المختصرة**.\n  * **قيد التصحيح المختصر:** 5,000 من حـ/ الأثاث إلى حـ/ السيارات (5,000ج).",
    "modelAnswer": "تم قيد شراء أثاث بمبلغ 5,000ج نقداً بـ قيد خاطئ: (من حـ/ السيارات إلى حـ/ الخزينة 5,000ج). صحح القيد بـ **الطريقة المختصرة**.\n  * **قيد التصحيح المختصر:** 5,000 من حـ/ الأثاث إلى حـ/ السيارات (5,000ج).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 98)",
    "sourceType": "official_textbook",
    "sourcePage": 98,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 98,
      "concept": "س147 (ص 98)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-148",
    "sourceQuestionId": "b373-u4-148",
    "originalId": "b373-u4-148",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س148 (ص 98)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "نفس العملية السابقة، صحح القيد بـ **الطريقة المطولة**.\n  * **قيد الإلغاء:** 5,000 من حـ/ الخزينة إلى حـ/ السيارات (5,000ج).\n  * **القيد الصحيح:** 5,000 من حـ/ الأثاث إلى حـ/ الخزينة (5,000ج).",
    "correctAnswer": "نفس العملية السابقة، صحح القيد بـ **الطريقة المطولة**.\n  * **قيد الإلغاء:** 5,000 من حـ/ الخزينة إلى حـ/ السيارات (5,000ج).\n  * **القيد الصحيح:** 5,000 من حـ/ الأثاث إلى حـ/ الخزينة (5,000ج).",
    "modelAnswer": "نفس العملية السابقة، صحح القيد بـ **الطريقة المطولة**.\n  * **قيد الإلغاء:** 5,000 من حـ/ الخزينة إلى حـ/ السيارات (5,000ج).\n  * **القيد الصحيح:** 5,000 من حـ/ الأثاث إلى حـ/ الخزينة (5,000ج).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 98)",
    "sourceType": "official_textbook",
    "sourcePage": 98,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 98,
      "concept": "س148 (ص 98)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-149",
    "sourceQuestionId": "b373-u4-149",
    "originalId": "b373-u4-149",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س149 (ص 99)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تم قيد سداد أجور 3,000ج نقداً بـ مبلغ خاطئ (30,000ج) بالطرفين. صحح الخطأ بقيد واحد.\n  * **قيد التصحيح:** 27,000 من حـ/ الخزينة إلى حـ/ مصروف الأجور (27,000ج) لخفض المبلغ الخاطئ.",
    "correctAnswer": "تم قيد سداد أجور 3,000ج نقداً بـ مبلغ خاطئ (30,000ج) بالطرفين. صحح الخطأ بقيد واحد.\n  * **قيد التصحيح:** 27,000 من حـ/ الخزينة إلى حـ/ مصروف الأجور (27,000ج) لخفض المبلغ الخاطئ.",
    "modelAnswer": "تم قيد سداد أجور 3,000ج نقداً بـ مبلغ خاطئ (30,000ج) بالطرفين. صحح الخطأ بقيد واحد.\n  * **قيد التصحيح:** 27,000 من حـ/ الخزينة إلى حـ/ مصروف الأجور (27,000ج) لخفض المبلغ الخاطئ.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 99)",
    "sourceType": "official_textbook",
    "sourcePage": 99,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 99,
      "concept": "س149 (ص 99)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-150",
    "sourceQuestionId": "b373-u4-150",
    "originalId": "b373-u4-150",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س150 (ص 99)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تم قيد تحصيل 4,000ج من العميل علي بمبلغ 400ج بالطرفين. صحح الخطأ.\n  * **قيد التصحيح:** 3,600 من حـ/ الخزينة إلى حـ/ العملاء (علي) (3,600ج) لإثبات الزيادة المتبقية.",
    "correctAnswer": "تم قيد تحصيل 4,000ج من العميل علي بمبلغ 400ج بالطرفين. صحح الخطأ.\n  * **قيد التصحيح:** 3,600 من حـ/ الخزينة إلى حـ/ العملاء (علي) (3,600ج) لإثبات الزيادة المتبقية.",
    "modelAnswer": "تم قيد تحصيل 4,000ج من العميل علي بمبلغ 400ج بالطرفين. صحح الخطأ.\n  * **قيد التصحيح:** 3,600 من حـ/ الخزينة إلى حـ/ العملاء (علي) (3,600ج) لإثبات الزيادة المتبقية.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 99)",
    "sourceType": "official_textbook",
    "sourcePage": 99,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 99,
      "concept": "س150 (ص 99)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-151",
    "sourceQuestionId": "b373-u4-151",
    "originalId": "b373-u4-151",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س151 (ص 100)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اشترت المنشأة آلة بـ 20,000ج نقداً وسجلت بالخطأ كـ مصروف صيانة آلات. صحح خطأ المبدأ هذا.\n  * **قيد التصحيح المختصر:** 20,000 من حـ/ الآلات إلى حـ/ مصروف الصيانة (20,000ج).",
    "correctAnswer": "اشترت المنشأة آلة بـ 20,000ج نقداً وسجلت بالخطأ كـ مصروف صيانة آلات. صحح خطأ المبدأ هذا.\n  * **قيد التصحيح المختصر:** 20,000 من حـ/ الآلات إلى حـ/ مصروف الصيانة (20,000ج).",
    "modelAnswer": "اشترت المنشأة آلة بـ 20,000ج نقداً وسجلت بالخطأ كـ مصروف صيانة آلات. صحح خطأ المبدأ هذا.\n  * **قيد التصحيح المختصر:** 20,000 من حـ/ الآلات إلى حـ/ مصروف الصيانة (20,000ج).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 100)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س151 (ص 100)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-152",
    "sourceQuestionId": "b373-u4-152",
    "originalId": "b373-u4-152",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س152 (ص 100)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "سحب المالك 2,500ج نقداً لاستخدامه الشخصي وسجلت بالخطأ كـ مصروفات إدارية عمومية. صحح الخطأ.\n  * **قيد التصحيح:** 2,500 من حـ/ المسحوبات الشخصية إلى حـ/ المصروفات الإدارية (2,500ج).",
    "correctAnswer": "سحب المالك 2,500ج نقداً لاستخدامه الشخصي وسجلت بالخطأ كـ مصروفات إدارية عمومية. صحح الخطأ.\n  * **قيد التصحيح:** 2,500 من حـ/ المسحوبات الشخصية إلى حـ/ المصروفات الإدارية (2,500ج).",
    "modelAnswer": "سحب المالك 2,500ج نقداً لاستخدامه الشخصي وسجلت بالخطأ كـ مصروفات إدارية عمومية. صحح الخطأ.\n  * **قيد التصحيح:** 2,500 من حـ/ المسحوبات الشخصية إلى حـ/ المصروفات الإدارية (2,500ج).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 100)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س152 (ص 100)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-153",
    "sourceQuestionId": "b373-u4-153",
    "originalId": "b373-u4-153",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س153 (ص 101)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تم قيد شراء بضاعة بالآجل 8,000ج من المورد حسن بالخطأ كـ مبيعات آجل للعميل حسن. صحح القيد.\n  * **قيد التصحيح المركب:**\n    - من مذكورين: 8,000 حـ/ المشتريات ، 8,000 حـ/ المبيعات\n    - إلى مذكورين: 8,000 حـ/ العملاء (حسن) ، 8,000 حـ/ الموردين (حسن).",
    "correctAnswer": "تم قيد شراء بضاعة بالآجل 8,000ج من المورد حسن بالخطأ كـ مبيعات آجل للعميل حسن. صحح القيد.\n  * **قيد التصحيح المركب:**\n    - من مذكورين: 8,000 حـ/ المشتريات ، 8,000 حـ/ المبيعات\n    - إلى مذكورين: 8,000 حـ/ العملاء (حسن) ، 8,000 حـ/ الموردين (حسن).",
    "modelAnswer": "تم قيد شراء بضاعة بالآجل 8,000ج من المورد حسن بالخطأ كـ مبيعات آجل للعميل حسن. صحح القيد.\n  * **قيد التصحيح المركب:**\n    - من مذكورين: 8,000 حـ/ المشتريات ، 8,000 حـ/ المبيعات\n    - إلى مذكورين: 8,000 حـ/ العملاء (حسن) ، 8,000 حـ/ الموردين (حسن).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 101)",
    "sourceType": "official_textbook",
    "sourcePage": 101,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 101,
      "concept": "س153 (ص 101)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-154",
    "sourceQuestionId": "b373-u4-154",
    "originalId": "U4-Q17",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س154 (ص 101)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما وظيفة **الحساب المعلق (Suspense Account)** ومتى يتم إقفاله؟",
    "correctAnswer": "حساب مؤقت يفتح بمبلغ الفرق بين جانبي ميزان المراجعة للوصول التوازن الشكلي، ويقفل حتماً وبشكل كامل بمجرد اكتشاف الأخطاء وإجراء قيود التصحيح.",
    "modelAnswer": "حساب مؤقت يفتح بمبلغ الفرق بين جانبي ميزان المراجعة للوصول التوازن الشكلي، ويقفل حتماً وبشكل كامل بمجرد اكتشاف الأخطاء وإجراء قيود التصحيح.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 101)",
    "sourceType": "official_textbook",
    "sourcePage": 101,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 101,
      "concept": "س154 (ص 101)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U4-Q17"
  },
  {
    "id": "b373-u4-155",
    "sourceQuestionId": "b373-u4-155",
    "originalId": "b373-u4-155",
    "lessonId": "lesson-4-3",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.3",
    "concept": "س155 (ص 101)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إذا كان الجانب المدين لميزان المراجعة 100,000ج والجانب الدائن 96,000ج، فكيف يفتح الحساب المعلق؟",
    "correctAnswer": "يفتح الحساب المعلق بـ **رصيد دائن قدره 4,000 جنيه** بـ الجانب الدائن لميزان المراجعة لتتساوى الخانتان عند 100,000 جنيه.\n\n---",
    "modelAnswer": "يفتح الحساب المعلق بـ **رصيد دائن قدره 4,000 جنيه** بـ الجانب الدائن لميزان المراجعة لتتساوى الخانتان عند 100,000 جنيه.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: الطرق المحاسبية لتصحيح الأخطاء باليومية. (ص 101)",
    "sourceType": "official_textbook",
    "sourcePage": 101,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 101,
      "concept": "س155 (ص 101)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "الطرق المحاسبية لتصحيح الأخطاء باليومية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-156",
    "sourceQuestionId": "b373-u4-156",
    "originalId": "b373-u4-156",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س156",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اكتشف خطأ عدم ترحيل 1,500ج مبيعات لحساب العميل.",
    "correctAnswer": "1,500 من حـ/ العملاء إلى حـ/ الحساب المعلق (1,500ج)**.",
    "modelAnswer": "1,500 من حـ/ العملاء إلى حـ/ الحساب المعلق (1,500ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س156"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-157",
    "sourceQuestionId": "b373-u4-157",
    "originalId": "b373-u4-157",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س157",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اكتشف ترحيل مصروف إيجار 2,000ج مرتين بالجانب المدين.",
    "correctAnswer": "2,000 من حـ/ الحساب المعلق إلى حـ/ مصروف الإيجار (2,000ج)**.",
    "modelAnswer": "2,000 من حـ/ الحساب المعلق إلى حـ/ مصروف الإيجار (2,000ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س157"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-158",
    "sourceQuestionId": "b373-u4-158",
    "originalId": "b373-u4-158",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س158",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اكتشف جمع الجانب المدين لحساب النقدية بأقل من حقيقته بـ 500ج.",
    "correctAnswer": "500 من حـ/ النقدية إلى حـ/ الحساب المعلق (500ج)**.",
    "modelAnswer": "500 من حـ/ النقدية إلى حـ/ الحساب المعلق (500ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س158"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-159",
    "sourceQuestionId": "b373-u4-159",
    "originalId": "b373-u4-159",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س159",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إثبات إقفال الحساب المعلق عند زوال جميع الأخطاء الصافية",
    "correctAnswer": "يصبح رصيد الحساب المعلق **صفراً**.",
    "modelAnswer": "يصبح رصيد الحساب المعلق **صفراً**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س159"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-160",
    "sourceQuestionId": "b373-u4-160",
    "originalId": "b373-u4-160",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س160 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "(ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102-104)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س160 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-161",
    "sourceQuestionId": "b373-u4-161",
    "originalId": "b373-u4-161",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س161 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "(ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102-104)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س161 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-162",
    "sourceQuestionId": "b373-u4-162",
    "originalId": "b373-u4-162",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س162 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "(ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102-104)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س162 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-163",
    "sourceQuestionId": "b373-u4-163",
    "originalId": "b373-u4-163",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س163 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "(ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102-104)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س163 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-164",
    "sourceQuestionId": "b373-u4-164",
    "originalId": "b373-u4-164",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س164 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "(ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102-104)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س164 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-165",
    "sourceQuestionId": "b373-u4-165",
    "originalId": "b373-u4-165",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س165 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "(ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية (مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102-104)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س165 (ص 102-104) — قيود تصحيح وتطبيقات معلقة متتالية"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-166",
    "sourceQuestionId": "b373-u4-166",
    "originalId": "b373-u4-166",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س166",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "ميزان المراجعة الذي يظهر الأرصدة الصافية للحسابات هو:",
    "correctAnswer": "ميزان الأرصدة",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س166"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "ميزان المجاميع",
      "ميزان الأرصدة",
      "الحساب المعلق",
      "قائمة المركز المالي."
    ],
    "distractors": [
      "ميزان المجاميع",
      "الحساب المعلق",
      "قائمة المركز المالي."
    ]
  },
  {
    "id": "b373-u4-167",
    "sourceQuestionId": "b373-u4-167",
    "originalId": "b373-u4-167",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س167",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الخطأ الناجم عن قيد شراء سيارة كـ مصروف هو خطأ:",
    "correctAnswer": "فني / مبادئ",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س167"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "سهو وحذف",
      "فني / مبادئ",
      "كتابي",
      "تكافؤي."
    ],
    "distractors": [
      "سهو وحذف",
      "كتابي",
      "تكافؤي."
    ]
  },
  {
    "id": "b373-u4-168",
    "sourceQuestionId": "b373-u4-168",
    "originalId": "b373-u4-168",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س168",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "إذا رحل حساب أصل مديناً بـ 4,000ج بـ الجانب الدائن بميزان المراجعة، ينشأ فرق قدره:",
    "correctAnswer": "8,000ج",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س168"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "4,000ج",
      "8,000ج",
      "صفر",
      "2,000ج."
    ],
    "distractors": [
      "4,000ج",
      "صفر",
      "2,000ج."
    ]
  },
  {
    "id": "b373-u4-169",
    "sourceQuestionId": "b373-u4-169",
    "originalId": "b373-u4-169",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س169",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الحساب المعلق يُعد حساباً:",
    "correctAnswer": "مؤقتاً يقفل بعد تصحيح الأخطاء",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س169"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "دائماً بـ المركز المالي",
      "مؤقتاً يقفل بعد تصحيح الأخطاء",
      "إيراداً أستثنائياً",
      "حـ/ أرباح وخسائر."
    ],
    "distractors": [
      "دائماً بـ المركز المالي",
      "إيراداً أستثنائياً",
      "حـ/ أرباح وخسائر."
    ]
  },
  {
    "id": "b373-u4-170",
    "sourceQuestionId": "b373-u4-170",
    "originalId": "b373-u4-170",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س170",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الخطأ الذي لا يؤثر على توازن الميزان هو:",
    "correctAnswer": "الحذف الكلي للمعاملة",
    "modelAnswer": "الإجابة (أ)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س170"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "الحذف الكلي للمعاملة",
      "جمع حساب الأستاذ خطأ",
      "ترحيل طرف واحد",
      "نقل رصيد خطأ."
    ],
    "distractors": [
      "جمع حساب الأستاذ خطأ",
      "ترحيل طرف واحد",
      "نقل رصيد خطأ."
    ]
  },
  {
    "id": "b373-u4-171",
    "sourceQuestionId": "b373-u4-171",
    "originalId": "e1-q4",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س171",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "توازن ميزان المراجعة دليل قاطع ونهائي على عدم وجود أي خطأ محاسبي بالدفاتر. (صح / خطأ).",
    "correctAnswer": "خطأ (لا يثبت الصحة المطلقة)**.",
    "modelAnswer": "خطأ (لا يثبت الصحة المطلقة)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س171"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "e1-q4"
  },
  {
    "id": "b373-u4-172",
    "sourceQuestionId": "b373-u4-172",
    "originalId": "b373-u4-172",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س172",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الطريقة المختصرة لتصحيح الأخطاء تتطلب قيدين باليومية العامة. (صح / خطأ).",
    "correctAnswer": "خطأ (تتطلب قيداً واحداً فقط)**.",
    "modelAnswer": "خطأ (تتطلب قيداً واحداً فقط)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س172"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-173",
    "sourceQuestionId": "b373-u4-173",
    "originalId": "b373-u4-173",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س173",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحساب المعلق يفتح بـ قيمة الفرق بين جانبي ميزان المراجعة. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س173"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-174",
    "sourceQuestionId": "b373-u4-174",
    "originalId": "b373-u4-174",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س174",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "خطأ المبدأ ينشأ عن عدم التفرقة بين المصروفات الرأسمالية والمصروفات الإيرادية. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س174"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-175",
    "sourceQuestionId": "b373-u4-175",
    "originalId": "b373-u4-175",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س175",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "خطأ الحذف الجزئي لا يؤثر على توازن ميزان المراجعة. (صح / خطأ).",
    "correctAnswer": "خطأ (يؤثر على التوازن فوراً)**.",
    "modelAnswer": "خطأ (يؤثر على التوازن فوراً)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س175"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-176",
    "sourceQuestionId": "b373-u4-176",
    "originalId": "b373-u4-176",
    "lessonId": "lesson-4-2",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.2",
    "concept": "س176",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تصحيح خطأ قيد حساب عميل مكان عميل آخر يغير إجمالي ميزان المراجعة. (صح / خطأ).",
    "correctAnswer": "خطأ (لا يغير الإجمالي)**.\n\n---",
    "modelAnswer": "خطأ (لا يغير الإجمالي)**.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ. (ص 102 – 106)",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "س176"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "مسائل تطبيقية شاملة واختيارات واختبارات صح/خطأ.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u4-177",
    "sourceQuestionId": "b373-u4-177",
    "originalId": "b373-u4-177",
    "lessonId": "lesson-4-4",
    "unitId": "unit-4",
    "learningObjectiveId": "LO-U4.4",
    "concept": "س177 المقال المحاسبي الشامل لـ الوحدة الرابعة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة التالية في مقال تحليلي متكامل: **\"هل يُمثل تصحيح الأخطاء المحاسبية وفتح الحساب المعلق لاستعادة توازن ميزان المراجعة إعادة الحقيقة الاقتصادية الصادقة للقوائم المالية، أم أنه تسوية شكلية قد تخفي خللاً أعمق في بيئة الرقابة الداخلية؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nتصحيح الأخطاء المحاسبية هو الإجراء الفني الوحيد اللازم لإعادة الحقيقة الاقتصادية للقوائم المالية؛ بينما يُعد فتح الحساب المعلق تسوية شكلية ومؤقتة تفرضه ضرورة التوازن الحسابي، وتكرار ظهوره مؤشر خطر على وجود خلل أعمق في بيئة الرقابة الداخلية.\n\n2. التفسير والتعليل (4 درجات):\nلأن ميزان المراجعة المتوازن شكلياً عبر \"حساب معلق\" لا يقدم قوائم مالية صادقة، وتأجيل التصحيح يؤدي لتضخيم أو تخفيض الأرباح والأصول بالباطل. وتأتي قيود التصحيح (سواء المختصرة أو المطولة) لإلغاء الأثر الفاسد للأخطاء وتوجيه المبالغ لحساباتها الاقتصادية الصحيحة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الرابعة (4 درجات):\n• أخطاء المبادئ: قيد شراء آلة بـ 20,000ج كـ مصروف صيانة يترك ميزان المراجعة متوازناً، ولكنه يخفض أصول المنشأة بـ 20,000ج ويخرم أرباح السنة بنفس المبلغ، ولا يصلح ذلك إلا بـ قيد تصحيح المبدأ.\n• الحساب المعلق: فتح حساب معلق بـ 4,000ج يضمن فقط عدم تعطل الدورة المحاسبية، ولكنه يمنع إصدار القوائم المالية حتى تتبعه وإقفاله التام ليصبح رصيده صفراً.\n• أخطاء الترحيل والسهو: الحذف الجزئي أو الكلي يغير النتائج المالية، وقيد التصحيح يعيد الاعتراف بالحقوق المستحقة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد ينظر بعض الموظفين الإداريين لـ الحساب المعلق كـ حل دائم لإنهاء العمل وإغلاق الدفاتر شكلياً؛ والرد المحاسبي والرقابي أن بقاء أي رصيد بالحساب المعلق ينفي صفة النزاهة والتمثيل الصادق عن القوائم، وتكرار الأخطاء يستوجب إعادة هيكلة الكادر الرقابي والمحاسبي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن الشكلي بميزان المراجعة عبر الحساب المعلق هو محطة فنية أولوية مؤقتة، ولا تتحقق المصداقية الاقتصادية الصادقة إلا بـ التصحيح الشامل للأخطاء وإقفال الحساب المعلق تماماً لتفادي تضليل متخذي القرار.\n```\n\n---\n\n## 📘 الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nتصحيح الأخطاء المحاسبية هو الإجراء الفني الوحيد اللازم لإعادة الحقيقة الاقتصادية للقوائم المالية؛ بينما يُعد فتح الحساب المعلق تسوية شكلية ومؤقتة تفرضه ضرورة التوازن الحسابي، وتكرار ظهوره مؤشر خطر على وجود خلل أعمق في بيئة الرقابة الداخلية.\n\n2. التفسير والتعليل (4 درجات):\nلأن ميزان المراجعة المتوازن شكلياً عبر \"حساب معلق\" لا يقدم قوائم مالية صادقة، وتأجيل التصحيح يؤدي لتضخيم أو تخفيض الأرباح والأصول بالباطل. وتأتي قيود التصحيح (سواء المختصرة أو المطولة) لإلغاء الأثر الفاسد للأخطاء وتوجيه المبالغ لحساباتها الاقتصادية الصحيحة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الرابعة (4 درجات):\n• أخطاء المبادئ: قيد شراء آلة بـ 20,000ج كـ مصروف صيانة يترك ميزان المراجعة متوازناً، ولكنه يخفض أصول المنشأة بـ 20,000ج ويخرم أرباح السنة بنفس المبلغ، ولا يصلح ذلك إلا بـ قيد تصحيح المبدأ.\n• الحساب المعلق: فتح حساب معلق بـ 4,000ج يضمن فقط عدم تعطل الدورة المحاسبية، ولكنه يمنع إصدار القوائم المالية حتى تتبعه وإقفاله التام ليصبح رصيده صفراً.\n• أخطاء الترحيل والسهو: الحذف الجزئي أو الكلي يغير النتائج المالية، وقيد التصحيح يعيد الاعتراف بالحقوق المستحقة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد ينظر بعض الموظفين الإداريين لـ الحساب المعلق كـ حل دائم لإنهاء العمل وإغلاق الدفاتر شكلياً؛ والرد المحاسبي والرقابي أن بقاء أي رصيد بالحساب المعلق ينفي صفة النزاهة والتمثيل الصادق عن القوائم، وتكرار الأخطاء يستوجب إعادة هيكلة الكادر الرقابي والمحاسبي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن الشكلي بميزان المراجعة عبر الحساب المعلق هو محطة فنية أولوية مؤقتة، ولا تتحقق المصداقية الاقتصادية الصادقة إلا بـ التصحيح الشامل للأخطاء وإقفال الحساب المعلق تماماً لتفادي تضليل متخذي القرار.\n```\n\n---\n\n## 📘 الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nتصحيح الأخطاء المحاسبية هو الإجراء الفني الوحيد اللازم لإعادة الحقيقة الاقتصادية للقوائم المالية؛ بينما يُعد فتح الحساب المعلق تسوية شكلية ومؤقتة تفرضه ضرورة التوازن الحسابي، وتكرار ظهوره مؤشر خطر على وجود خلل أعمق في بيئة الرقابة الداخلية.\n\n2. التفسير والتعليل (4 درجات):\nلأن ميزان المراجعة المتوازن شكلياً عبر \"حساب معلق\" لا يقدم قوائم مالية صادقة، وتأجيل التصحيح يؤدي لتضخيم أو تخفيض الأرباح والأصول بالباطل. وتأتي قيود التصحيح (سواء المختصرة أو المطولة) لإلغاء الأثر الفاسد للأخطاء وتوجيه المبالغ لحساباتها الاقتصادية الصحيحة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الرابعة (4 درجات):\n• أخطاء المبادئ: قيد شراء آلة بـ 20,000ج كـ مصروف صيانة يترك ميزان المراجعة متوازناً، ولكنه يخفض أصول المنشأة بـ 20,000ج ويخرم أرباح السنة بنفس المبلغ، ولا يصلح ذلك إلا بـ قيد تصحيح المبدأ.\n• الحساب المعلق: فتح حساب معلق بـ 4,000ج يضمن فقط عدم تعطل الدورة المحاسبية، ولكنه يمنع إصدار القوائم المالية حتى تتبعه وإقفاله التام ليصبح رصيده صفراً.\n• أخطاء الترحيل والسهو: الحذف الجزئي أو الكلي يغير النتائج المالية، وقيد التصحيح يعيد الاعتراف بالحقوق المستحقة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد ينظر بعض الموظفين الإداريين لـ الحساب المعلق كـ حل دائم لإنهاء العمل وإغلاق الدفاتر شكلياً؛ والرد المحاسبي والرقابي أن بقاء أي رصيد بالحساب المعلق ينفي صفة النزاهة والتمثيل الصادق عن القوائم، وتكرار الأخطاء يستوجب إعادة هيكلة الكادر الرقابي والمحاسبي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التوازن الشكلي بميزان المراجعة عبر الحساب المعلق هو محطة فنية أولوية مؤقتة، ولا تتحقق المصداقية الاقتصادية الصادقة إلا بـ التصحيح الشامل للأخطاء وإقفال الحساب المعلق تماماً لتفادي تضليل متخذي القرار.\n```\n\n---\n\n## 📘 الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 107,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 107,
      "concept": "س177 المقال المحاسبي الشامل لـ الوحدة الرابعة (JRE)"
    },
    "tags": [
      "الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء المحاسبية (ص 89 – 110)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة الرابعة (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u5-178",
    "sourceQuestionId": "b373-u5-178",
    "originalId": "b373-u5-178",
    "lessonId": "lesson-5-1",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.1",
    "concept": "س178 السؤال الجوهري للوحدة الخامسة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "ما الهدف النهائي للدورة المحاسبية؟ وكيف تُترجم التسويات الجردية المبادئ المحاسبية إلى صور مالية عادلة وصادقة؟",
    "correctAnswer": "الهدف النهائي هو إعداد القوائم المالية خالية من التحريف. وتعمل التسويات الجردية على تطبيق أساس الاستحقاق ومبدأ مقابلة الإيرادات بالمصروفات لربط نتائج الفترة بأداء تلك الفترة حكراً وتحديد المركز المالي الصادق.",
    "modelAnswer": "الهدف النهائي هو إعداد القوائم المالية خالية من التحريف. وتعمل التسويات الجردية على تطبيق أساس الاستحقاق ومبدأ مقابلة الإيرادات بالمصروفات لربط نتائج الفترة بأداء تلك الفترة حكراً وتحديد المركز المالي الصادق.",
    "explanation": "تحول الحركات النقدية المجردة إلى قياس استحقاقي عادل لثروة وربح المنشأة.",
    "sourceType": "official_textbook",
    "sourcePage": 111,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 111,
      "concept": "س178 السؤال الجوهري للوحدة الخامسة"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "الافتتاحية — القوائم المالية والتسويات.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u5-179",
    "sourceQuestionId": "b373-u5-179",
    "originalId": "b373-u5-179",
    "lessonId": "lesson-5-1",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.1",
    "concept": "س179 قائمة الدخل (Income Statement)",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "عرف قائمة الدخل، واذكر المعادلتين الفرعيتين لاستخراج مجمل الربح وصافي الربح.",
    "correctAnswer": "قائمة مالية تقيس أداء ونتيجة نشاط المنشأة من ربح أو خسارة عن فترة مالية محددة.\n  - **مجمل الربح = صافي إيراد المبيعات − تكلفة المبيعات**.\n  - **صافي الربح = مجمل الربح − المصروفات التشغيلية + الإيرادات الأخرى**.",
    "modelAnswer": "قائمة مالية تقيس أداء ونتيجة نشاط المنشأة من ربح أو خسارة عن فترة مالية محددة.\n  - **مجمل الربح = صافي إيراد المبيعات − تكلفة المبيعات**.\n  - **صافي الربح = مجمل الربح − المصروفات التشغيلية + الإيرادات الأخرى**.",
    "explanation": "قائمة الدخل قائمة موقوتة عن فترة زمنيّة ممتدة (عن السنة المالية المنتهية في...).",
    "sourceType": "official_textbook",
    "sourcePage": 112,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 112,
      "concept": "س179 قائمة الدخل (Income Statement)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "القوائم المالية.",
      "تعريف ومكونات."
    ]
  },
  {
    "id": "b373-u5-180",
    "sourceQuestionId": "b373-u5-180",
    "originalId": "b373-u5-180",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س180 معادلة صافي المبيعات وصافي المشتريات",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "اكتب القانون الرياضي لكل من: 1) صافي المبيعات 2) صافي المشتريات 3) تكلفة البضاعة المباعة.",
    "correctAnswer": "1. **صافي المبيعات = إجمالي المبيعات − مردودات ومسموحات المبيعات − الخصم المسموح به**.\n  2. **صافي المشتريات = إجمالي المشتريات + مصاريف نقل المشتريات − مردودات ومسموحات المشتريات − الخصم المكتسب**.\n  3. **تكلفة المبيعات = مخزون أول المدة + صافي المشتريات − مخزون آخر المدة**.",
    "modelAnswer": "1. **صافي المبيعات = إجمالي المبيعات − مردودات ومسموحات المبيعات − الخصم المسموح به**.\n  2. **صافي المشتريات = إجمالي المشتريات + مصاريف نقل المشتريات − مردودات ومسموحات المشتريات − الخصم المكتسب**.\n  3. **تكلفة المبيعات = مخزون أول المدة + صافي المشتريات − مخزون آخر المدة**.",
    "explanation": "معادلات أساسية للتدرج الحسابي داخل قائمة الدخل ذات الخطوات المتعددة.",
    "sourceType": "official_textbook",
    "sourcePage": 113,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 113,
      "concept": "س180 معادلة صافي المبيعات وصافي المشتريات"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "معادلات قائمة الدخل.",
      "معادلة رياضية."
    ]
  },
  {
    "id": "b373-u5-181",
    "sourceQuestionId": "b373-u5-181",
    "originalId": "b373-u5-181",
    "lessonId": "lesson-5-1",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.1",
    "concept": "س181 قائمة المركز المالي (الميزانية العمومية)",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "عرف قائمة المركز المالي، واذكر الأقسام الأربعة الرئيسية المكونة لهيكلها.",
    "correctAnswer": "تقرير مالي يظهر الوضع المالي الصافي للمنشأة (ما لها وما عليها) في لحظة وتاريخ معين محدد. أقسامها: 1) الأصول غير المتداولة 2) الأصول المتداولة 3) الالتزامات (متداولة وغير متداولة) 4) حقوق الملكية.",
    "modelAnswer": "تقرير مالي يظهر الوضع المالي الصافي للمنشأة (ما لها وما عليها) في لحظة وتاريخ معين محدد. أقسامها: 1) الأصول غير المتداولة 2) الأصول المتداولة 3) الالتزامات (متداولة وغير متداولة) 4) حقوق الملكية.",
    "explanation": "صوّرة مالية لحظية متوقفة (في تاريخ...).",
    "sourceType": "official_textbook",
    "sourcePage": 114,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 114,
      "concept": "س181 قائمة المركز المالي (الميزانية العمومية)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "القوائم المالية.",
      "تعريف وتبويب."
    ]
  },
  {
    "id": "b373-u5-182",
    "sourceQuestionId": "b373-u5-182",
    "originalId": "b373-u5-182",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س182 الأساس النقدي مقابل أساس الاستحقاق",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "قارن بين الأساس النقدي وأساس الاستحقاق، وبيّن أيهما معتمد في المحاسبة المالية الموحدة.",
    "correctAnswer": "- **الأساس النقدي:** يعترف بالإيرادات عند تحصيلها نقداً، والمصروفات عند سدادها نقداً بغض النظر عن الفترة التي تخصها.\n  - **أساس الاستحقاق:** يعترف بالإيرادات عند تحققها واكتسابها، والمصروفات عند تحملها واستحقاقها ارتبطت بسداد أو تحصيل نقدي أم لا. وهو الأساس **المعتمد والملزم**.",
    "modelAnswer": "- **الأساس النقدي:** يعترف بالإيرادات عند تحصيلها نقداً، والمصروفات عند سدادها نقداً بغض النظر عن الفترة التي تخصها.\n  - **أساس الاستحقاق:** يعترف بالإيرادات عند تحققها واكتسابها، والمصروفات عند تحملها واستحقاقها ارتبطت بسداد أو تحصيل نقدي أم لا. وهو الأساس **المعتمد والملزم**.",
    "explanation": "أساس الاستحقاق هو الوحيد الذي يحقق مبدأ المقابلة الدقيق.",
    "sourceType": "official_textbook",
    "sourcePage": 115,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 115,
      "concept": "س182 الأساس النقدي مقابل أساس الاستحقاق"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "الأسس المحاسبية.",
      "سؤال مقارنة."
    ]
  },
  {
    "id": "b373-u5-183",
    "sourceQuestionId": "b373-u5-183",
    "originalId": "b373-u5-183",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س183 (ص 116)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما المقصود بـ **المصروف المستحق**؟ وكيف يعالج في قائمة الدخل وقائمة المركز المالي؟",
    "correctAnswer": "مصروف يخص الفترة الحالية ولم يُسدد نقداً حتى نهاية السنة. يضاف للمصروفات بـ **قائمة الدخل** (تطبيق للاستحقاق)، ويثبت كـ **التزام متداول بـ قائمة المركز المالي**.",
    "modelAnswer": "مصروف يخص الفترة الحالية ولم يُسدد نقداً حتى نهاية السنة. يضاف للمصروفات بـ **قائمة الدخل** (تطبيق للاستحقاق)، ويثبت كـ **التزام متداول بـ قائمة المركز المالي**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 116)",
    "sourceType": "official_textbook",
    "sourcePage": 116,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 116,
      "concept": "س183 (ص 116)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-184",
    "sourceQuestionId": "b373-u5-184",
    "originalId": "b373-u5-184",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س184 (ص 117)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما المقصود بـ **المصروف المقدم**؟ وكيف يعالج بـ القوائم المالية؟",
    "correctAnswer": "مصروف سُدد نقداً مسبقاً ولكنه يخص فترات مالية قادمة. يطرح المبلغ الخصم من المدفوعات ليظهر فقط ما يخص السنة بـ **قائمة الدخل**، والجزء المتبقي يثبت كـ **أصل متداول بـ قائمة المركز المالي**.",
    "modelAnswer": "مصروف سُدد نقداً مسبقاً ولكنه يخص فترات مالية قادمة. يطرح المبلغ الخصم من المدفوعات ليظهر فقط ما يخص السنة بـ **قائمة الدخل**، والجزء المتبقي يثبت كـ **أصل متداول بـ قائمة المركز المالي**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 117)",
    "sourceType": "official_textbook",
    "sourcePage": 117,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 117,
      "concept": "س184 (ص 117)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-185",
    "sourceQuestionId": "b373-u5-185",
    "originalId": "b373-u5-185",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س185 (ص 118)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما المقصود بـ **الإيراد المستحق**؟ وكيف يعالج بـ القوائم المالية؟",
    "correctAnswer": "إيراد تحققت واكتسبته المنشأة خلال الفترة ولم يُحصل نقداً بعد. يضاف لإيرادات السنة بـ **قائمة الدخل**، ويثبت كـ **أصل متداول (مدينين/حقوق تحصيل) بـ قائمة المركز المالي**.",
    "modelAnswer": "إيراد تحققت واكتسبته المنشأة خلال الفترة ولم يُحصل نقداً بعد. يضاف لإيرادات السنة بـ **قائمة الدخل**، ويثبت كـ **أصل متداول (مدينين/حقوق تحصيل) بـ قائمة المركز المالي**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 118)",
    "sourceType": "official_textbook",
    "sourcePage": 118,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 118,
      "concept": "س185 (ص 118)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-186",
    "sourceQuestionId": "b373-u5-186",
    "originalId": "b373-u5-186",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س186 (ص 119)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما المقصود بـ **الإيراد المقدم (غير المحقق)**؟ وكيف يعالج بـ القوائم المالية؟",
    "correctAnswer": "إيراد حصلته المنشأة نقداً مقدماً عن خدمات أو بضائع لم تؤدها بعد. يطرح من المحصل ليظهر بالدخـل ما يخص السنة فقط، ويظهر الباقي كـ **التزام متداول بـ قائمة المركز المالي**.",
    "modelAnswer": "إيراد حصلته المنشأة نقداً مقدماً عن خدمات أو بضائع لم تؤدها بعد. يطرح من المحصل ليظهر بالدخـل ما يخص السنة فقط، ويظهر الباقي كـ **التزام متداول بـ قائمة المركز المالي**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 119)",
    "sourceType": "official_textbook",
    "sourcePage": 119,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 119,
      "concept": "س186 (ص 119)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-187",
    "sourceQuestionId": "b373-u5-187",
    "originalId": "b373-u5-187",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س187 (ص 120)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "بلغت الأجور المدفوعة نقداً 50,000ج، وهناك أجور شهر ديسمبر (5,000ج) لم تسدد بعد. احسب مصروف الأجور بالدخل وأثره بـ المركز المالي.",
    "correctAnswer": "مصروف الأجور بـ قائمة الدخل = $50,000 + 5,000 = \\mathbf{55,000 \\text{ جنيه}}$. يظهر **التزام أجور مستحقة بـ 5,000 جنيه بـ الالتزامات المتداولة**.",
    "modelAnswer": "مصروف الأجور بـ قائمة الدخل = $50,000 + 5,000 = \\mathbf{55,000 \\text{ جنيه}}$. يظهر **التزام أجور مستحقة بـ 5,000 جنيه بـ الالتزامات المتداولة**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 120)",
    "sourceType": "official_textbook",
    "sourcePage": 120,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 120,
      "concept": "س187 (ص 120)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-188",
    "sourceQuestionId": "b373-u5-188",
    "originalId": "b373-u5-188",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س188 (ص 120)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "بلغت مدفوعات الإيجار بالدفاتر 24,000ج عن سنتين قادمتين تبدأ من أول يناير. احسب مصروف الإيجار السنوي وأثر المتبقي.",
    "correctAnswer": "إيجار السنة بـ قائمة الدخل = $24,000 \\div 2 = \\mathbf{12,000 \\text{ جنيه}}$. يظهر **إيجار مقدم بـ 12,000 جنيه كـ أصل متداول بـ المركز المالي**.",
    "modelAnswer": "إيجار السنة بـ قائمة الدخل = $24,000 \\div 2 = \\mathbf{12,000 \\text{ جنيه}}$. يظهر **إيجار مقدم بـ 12,000 جنيه كـ أصل متداول بـ المركز المالي**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 120)",
    "sourceType": "official_textbook",
    "sourcePage": 120,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 120,
      "concept": "س188 (ص 120)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-189",
    "sourceQuestionId": "b373-u5-189",
    "originalId": "b373-u5-189",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س189 (ص 121)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إيراد أوراق مالية محصل بالبنك 8,000ج، وهناك إيراد أوراق مالية مستحق لم يحصل بـ 2,000ج. احسب إيراد الدخل والأصل.",
    "correctAnswer": "الإيراد المعتمد بـ قائمة الدخل = $8,000 + 2,000 = \\mathbf{10,000 \\text{ جنيه}}$. يظهر **إيراد مستحق بـ 2,000 جنيه كـ أصل متداول بـ المركز المالي**.",
    "modelAnswer": "الإيراد المعتمد بـ قائمة الدخل = $8,000 + 2,000 = \\mathbf{10,000 \\text{ جنيه}}$. يظهر **إيراد مستحق بـ 2,000 جنيه كـ أصل متداول بـ المركز المالي**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 121)",
    "sourceType": "official_textbook",
    "sourcePage": 121,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 121,
      "concept": "س189 (ص 121)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-190",
    "sourceQuestionId": "b373-u5-190",
    "originalId": "b373-u5-190",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س190 (ص 121)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "حصلت المنشأة 30,000ج إيراد عقار مؤجر للغير عن 15 شهراً بواقع 2,000ج شهرياً. احسب الإيراد السنوي والالتزام.",
    "correctAnswer": "إيراد العقار بـ قائمة الدخل (12 شهراً) = $12 \\times 2,000 = \\mathbf{24,000 \\text{ جنيه}}$. يظهر **إيراد عقار مقدم بـ 6,000 جنيه (عن 3 أشهر) كـ التزام متداول**.",
    "modelAnswer": "إيراد العقار بـ قائمة الدخل (12 شهراً) = $12 \\times 2,000 = \\mathbf{24,000 \\text{ جنيه}}$. يظهر **إيراد عقار مقدم بـ 6,000 جنيه (عن 3 أشهر) كـ التزام متداول**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 121)",
    "sourceType": "official_textbook",
    "sourcePage": 121,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 121,
      "concept": "س190 (ص 121)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-191",
    "sourceQuestionId": "b373-u5-191",
    "originalId": "b373-u5-191",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س191 (ص 122)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "كيف يعالج مخزون آخر المدة في القوائم المالية؟",
    "correctAnswer": "يظهر بـ **قائمة الدخل** مخصوماً ضمن حساب تكلفة المبيعات، ويظهر بنفس القيمة كـ **أصل متداول بـ قائمة المركز المالي**.",
    "modelAnswer": "يظهر بـ **قائمة الدخل** مخصوماً ضمن حساب تكلفة المبيعات، ويظهر بنفس القيمة كـ **أصل متداول بـ قائمة المركز المالي**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 122)",
    "sourceType": "official_textbook",
    "sourcePage": 122,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 122,
      "concept": "س191 (ص 122)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-192",
    "sourceQuestionId": "b373-u5-192",
    "originalId": "b373-u5-192",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س192 (ص 122)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما قاعدة تقويم مخزون آخر المدة بنهاية السنة؟",
    "correctAnswer": "يقوم بـ **التكلفة أو الصافي القابل للتحقق (السوق) أيهما أقل**، تطبيقاً لمبدأ الحيطة والحذر.\n\n---",
    "modelAnswer": "يقوم بـ **التكلفة أو الصافي القابل للتحقق (السوق) أيهما أقل**، تطبيقاً لمبدأ الحيطة والحذر.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: التسويات الجردية بنهاية السنة. (ص 122)",
    "sourceType": "official_textbook",
    "sourcePage": 122,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 122,
      "concept": "س192 (ص 122)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "التسويات الجردية بنهاية السنة.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-193",
    "sourceQuestionId": "b373-u5-193",
    "originalId": "b373-u5-193",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س193",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب صافي إيراد المبيعات.",
    "correctAnswer": "$200,000 - 10,000 - 5,000 = \\mathbf{185,000 \\text{ جنيه}}$.",
    "modelAnswer": "$200,000 - 10,000 - 5,000 = \\mathbf{185,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س193"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-194",
    "sourceQuestionId": "b373-u5-194",
    "originalId": "b373-u5-194",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س194",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب صافي المشتريات.",
    "correctAnswer": "$100,000 + 4,000 - 6,000 - 3,000 = \\mathbf{95,000 \\text{ جنيه}}$.",
    "modelAnswer": "$100,000 + 4,000 - 6,000 - 3,000 = \\mathbf{95,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س194"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-195",
    "sourceQuestionId": "b373-u5-195",
    "originalId": "b373-u5-195",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س195",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب تكلفة المبيعات (البضاعة المباعة).",
    "correctAnswer": "$20,000 (\\text{أول}) + 95,000 (\\text{صافي المشتريات}) - 15,000 (\\text{آخر}) = \\mathbf{100,000 \\text{ جنيه}}$.",
    "modelAnswer": "$20,000 (\\text{أول}) + 95,000 (\\text{صافي المشتريات}) - 15,000 (\\text{آخر}) = \\mathbf{100,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س195"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-196",
    "sourceQuestionId": "b373-u5-196",
    "originalId": "b373-u5-196",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س196",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب مجمل الربح.",
    "correctAnswer": "$185,000 (\\text{صافي المبيعات}) - 100,000 (\\text{تكلفة المبيعات}) = \\mathbf{85,000 \\text{ جنيه}}$.",
    "modelAnswer": "$185,000 (\\text{صافي المبيعات}) - 100,000 (\\text{تكلفة المبيعات}) = \\mathbf{85,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س196"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-197",
    "sourceQuestionId": "b373-u5-197",
    "originalId": "b373-u5-197",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س197",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب المصروفات التشغيلية الكلية.",
    "correctAnswer": "$30,000 (\\text{أجور}) + 12,000 (\\text{إيجار}) = \\mathbf{42,000 \\text{ جنيه}}$.",
    "modelAnswer": "$30,000 (\\text{أجور}) + 12,000 (\\text{إيجار}) = \\mathbf{42,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س197"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-198",
    "sourceQuestionId": "b373-u5-198",
    "originalId": "b373-u5-198",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س198",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب صافي الربح النهائي بـ قائمة الدخل.",
    "correctAnswer": "$85,000 (\\text{مجمل الربح}) - 42,000 (\\text{مصروفات}) = \\mathbf{43,000 \\text{ جنيه}}$.",
    "modelAnswer": "$85,000 (\\text{مجمل الربح}) - 42,000 (\\text{مصروفات}) = \\mathbf{43,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س198"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-199",
    "sourceQuestionId": "b373-u5-199",
    "originalId": "eb-mcq-034",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س199",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب إجمالي الأصول غير المتداولة بـ المركز المالي.",
    "correctAnswer": "150,000 جنيه**.",
    "modelAnswer": "150,000 جنيه**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س199"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "eb-mcq-034"
  },
  {
    "id": "b373-u5-200",
    "sourceQuestionId": "b373-u5-200",
    "originalId": "eb-mcq-034",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س200",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب إجمالي الأصول المتداولة بـ المركز المالي.",
    "correctAnswer": "$15,000 (\\text{مخزون آخر}) + 40,000 (\\text{خزينة وبنك}) + 25,000 (\\text{عملاء}) = \\mathbf{80,000 \\text{ جنيه}}$.",
    "modelAnswer": "$15,000 (\\text{مخزون آخر}) + 40,000 (\\text{خزينة وبنك}) + 25,000 (\\text{عملاء}) = \\mathbf{80,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س200"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "eb-mcq-034"
  },
  {
    "id": "b373-u5-201",
    "sourceQuestionId": "b373-u5-201",
    "originalId": "b373-u5-201",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س201",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "احسب إجمالي الأصول الكلي بـ المركز المالي.",
    "correctAnswer": "$150,000 + 80,000 = \\mathbf{230,000 \\text{ جنيه}}$.",
    "modelAnswer": "$150,000 + 80,000 = \\mathbf{230,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س201"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-202",
    "sourceQuestionId": "b373-u5-202",
    "originalId": "b373-u5-202",
    "lessonId": "lesson-5-3",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.3",
    "concept": "س202",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تحقق من توازن جانب الخصوم وحقوق الملكية.",
    "correctAnswer": "الالتزامات المتداولة (موردون) = $35,000\\text{ج}$. حقوق الملكية المعدلة = $182,000 (\\text{رأس مال}) + 43,000 (\\text{صافي ربح}) = 225,000\\text{ج}$. الإجمالي = $35,000 + 225,000 = \\mathbf{230,000 \\text{ جنيه}}$ (متوازن تماماً عند 230,000ج).\n\n---",
    "modelAnswer": "الالتزامات المتداولة (موردون) = $35,000\\text{ج}$. حقوق الملكية المعدلة = $182,000 (\\text{رأس مال}) + 43,000 (\\text{صافي ربح}) = 225,000\\text{ج}$. الإجمالي = $35,000 + 225,000 = \\mathbf{230,000 \\text{ جنيه}}$ (متوازن تماماً عند 230,000ج).\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: تطبيق مجمع لإعداد القوائم المالية. (ص 123 – 127)",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "س202"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "تطبيق مجمع لإعداد القوائم المالية.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-203",
    "sourceQuestionId": "b373-u5-203",
    "originalId": "b373-u5-203",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س203",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "تظهر مصروفات الأجور المستحقة بنهاية السنة في:",
    "correctAnswer": "أ و ج معاً.",
    "modelAnswer": "الإجابة (د)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س203"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "قائمة الدخل فقط",
      "قائمة المركز المالي أصل",
      "قائمة المركز المالي التزام",
      "أ و ج معاً."
    ],
    "distractors": [
      "قائمة الدخل فقط",
      "قائمة المركز المالي أصل",
      "قائمة المركز المالي التزام"
    ]
  },
  {
    "id": "b373-u5-204",
    "sourceQuestionId": "b373-u5-204",
    "originalId": "b373-u5-204",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س204",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "يقيم مخزون آخر المدة بالقوائم المالية على أساس:",
    "correctAnswer": "التكلفة أو الصافي القابل للتحقق أيهما أقل",
    "modelAnswer": "الإجابة (ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س204"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "التكلفة التاريخية فقط",
      "سعر السوق فقط",
      "التكلفة أو الصافي القابل للتحقق أيهما أقل",
      "التكلفة زائد 10%."
    ],
    "distractors": [
      "التكلفة التاريخية فقط",
      "سعر السوق فقط",
      "التكلفة زائد 10%."
    ]
  },
  {
    "id": "b373-u5-205",
    "sourceQuestionId": "b373-u5-205",
    "originalId": "b373-u5-205",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س205",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الخصم المسموح به يظهر في قائمة الدخل مطروحاً من:",
    "correctAnswer": "المبيعات",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س205"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "المشتريات",
      "المبيعات",
      "الإيجار",
      "أرباح العام."
    ],
    "distractors": [
      "المشتريات",
      "الإيجار",
      "أرباح العام."
    ]
  },
  {
    "id": "b373-u5-206",
    "sourceQuestionId": "b373-u5-206",
    "originalId": "b373-u5-206",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س206",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "الأصول المتداولة تضم البنود التالية ما عدا:",
    "correctAnswer": "السيارات",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س206"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "النقدية",
      "السيارات",
      "المخزون",
      "المدينين."
    ],
    "distractors": [
      "النقدية",
      "المخزون",
      "المدينين."
    ]
  },
  {
    "id": "b373-u5-207",
    "sourceQuestionId": "b373-u5-207",
    "originalId": "b373-u5-207",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س207",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "المصروف المدفوع مقدماً يظهر بـ الميزانية كـ:",
    "correctAnswer": "أصل متداول",
    "modelAnswer": "الإجابة (ب)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س207"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "التزام متداول",
      "أصل متداول",
      "حق ملكية",
      "إيراد آخر."
    ],
    "distractors": [
      "التزام متداول",
      "حق ملكية",
      "إيراد آخر."
    ]
  },
  {
    "id": "b373-u5-208",
    "sourceQuestionId": "b373-u5-208",
    "originalId": "b373-u5-208",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س208",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "bloomLevel": "application",
    "question": "صافي الربح يرحل في نهاية الدورة المحاسبية ليضاف إلى:",
    "correctAnswer": "رأس المال بـ الميزانية",
    "modelAnswer": "الإجابة (ج)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س208"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ],
    "options": [
      "الموردين",
      "أوراق الدفع",
      "رأس المال بـ الميزانية",
      "الأصول غير المتداولة."
    ],
    "distractors": [
      "الموردين",
      "أوراق الدفع",
      "الأصول غير المتداولة."
    ]
  },
  {
    "id": "b373-u5-209",
    "sourceQuestionId": "b373-u5-209",
    "originalId": "b373-u5-209",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س209 — اختيارات واختبارات القوائم",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اختيارات واختبارات القوائم",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س209 — اختيارات واختبارات القوائم"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-210",
    "sourceQuestionId": "b373-u5-210",
    "originalId": "b373-u5-210",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س210 — اختيارات واختبارات القوائم",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اختيارات واختبارات القوائم",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س210 — اختيارات واختبارات القوائم"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-211",
    "sourceQuestionId": "b373-u5-211",
    "originalId": "b373-u5-211",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س211 — اختيارات واختبارات القوائم",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اختيارات واختبارات القوائم",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س211 — اختيارات واختبارات القوائم"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-212",
    "sourceQuestionId": "b373-u5-212",
    "originalId": "b373-u5-212",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س212 — اختيارات واختبارات القوائم",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اختيارات واختبارات القوائم",
    "correctAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "modelAnswer": "تطبيق محاسبي معتمد ضمن اختيارات واختبارات القوائم (اختبار مهارات إعداد القوائم والتسويات.)",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س212 — اختيارات واختبارات القوائم"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-213",
    "sourceQuestionId": "b373-u5-213",
    "originalId": "b373-u5-213",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س213",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الأساس النقدي هو الأساس المعتمد قانوناً ومحاسبياً بـ المعايير الموحدة. (صح / خطأ).",
    "correctAnswer": "خطأ (أساس الاستحقاق هو المعتمد)**.",
    "modelAnswer": "خطأ (أساس الاستحقاق هو المعتمد)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س213"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-214",
    "sourceQuestionId": "b373-u5-214",
    "originalId": "b373-u5-214",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س214",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الإيراد المستحق يمثل أصلاً متداولاً للمنشأة يظهر بـ الميزانية. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س214"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-215",
    "sourceQuestionId": "b373-u5-215",
    "originalId": "b373-u5-215",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س215",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تظهر مردودات المشتريات مطروحة من إجمالي المبيعات بـ قائمة الدخل. (صح / خطأ).",
    "correctAnswer": "خطأ (تطرح من المشتريات)**.",
    "modelAnswer": "خطأ (تطرح من المشتريات)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س215"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-216",
    "sourceQuestionId": "b373-u5-216",
    "originalId": "b373-u5-216",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س216",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تكلفة البضاعة المباعة تساوي مخزون أول المدة + صافي المشتريات − مخزون آخر المدة. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س216"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-217",
    "sourceQuestionId": "b373-u5-217",
    "originalId": "b373-u5-217",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س217",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "المصروف المستحق يخفض صافي ربح الفترة الحالية بـ قائمة الدخل. (صح / خطأ).",
    "correctAnswer": "صواب (صح)**.",
    "modelAnswer": "صواب (صح)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س217"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-218",
    "sourceQuestionId": "b373-u5-218",
    "originalId": "b373-u5-218",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س218",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "قائمة المركز المالي هي تقرير عن فترة زمنية ممتدة. (صح / خطأ).",
    "correctAnswer": "خطأ (تقرير لحظي في تاريخ معين)**.",
    "modelAnswer": "خطأ (تقرير لحظي في تاريخ معين)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س218"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-219",
    "sourceQuestionId": "b373-u5-219",
    "originalId": "b373-u5-219",
    "lessonId": "lesson-5-2",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.2",
    "concept": "س219",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الخصم المكتسب يضاف لصافي المبيعات بـ قائمة الدخل. (صح / خطأ).",
    "correctAnswer": "خطأ (يخصم من المشتريات)**.\n\n---",
    "modelAnswer": "خطأ (يخصم من المشتريات)**.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس: اختبار مهارات إعداد القوائم والتسويات. (ص 128 – 131)",
    "sourceType": "official_textbook",
    "sourcePage": 128,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 128,
      "concept": "س219"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "اختبار مهارات إعداد القوائم والتسويات.",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u5-220",
    "sourceQuestionId": "b373-u5-220",
    "originalId": "b373-u5-220",
    "lessonId": "lesson-5-4",
    "unitId": "unit-5",
    "learningObjectiveId": "LO-U5.4",
    "concept": "س220 المقال المحاسبي الشامل لـ الوحدة الخامسة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة المحاسبية التالية في مقال تحليلي محكم: **\"هل تؤدي التسويات الجردية المعتمدة بنهاية الفترة وتطبيقات أساس الاستحقاق إلى إظهار الصورة المادية الموضوعية المطلقة لأرباح المنشأة وثروتها الصافية، أم أنها تدخل قدراً من التقدير والاجتهاد المهني الشخصي يمس حياد القوائم المالية؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالتسويات الجردية وتطبيقات أساس الاستحقاق حتمية محاسبية لإعداد قوائم مالية عادلة وموثوقة، ولكنها تبتعد عن \"الموضوعية المادية المطلقة\" وتدخل قدراً مستندياً مقبولاً من التقدير والاجتهاد المهني الشخصي دون أن يمس ذلك بالضرورة حياد القوائم متى ما التزمت بالسياسات المحاسبية الموحدة.\n\n2. التفسير والتعليل (4 درجات):\nلأن الاعتماد على الحركة النقدية الخالصة (الأساس النقدي) يضلل متخذ القرار ويظهر أرباحاً وهمية؛ وتأتي التسويات الجردية لربط الإيرادات والمصروفات بفترتها الاستحقاقية الصافية، مع الاعتماد على اجتهادات وتقديرات موضوعية لتحديد الآجال والنسب والمستحقات ومخزون آخر المدة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الخامسة (4 درجات):\n• تقويم مخزون آخر المدة: تطبيق قاعدة (التكلفة أو السوق أيهما أقل) يستند لمبدأ الحيطة والحذر والتقدير الفعلي لـ صافي القيمة التحصيلية القابلة للتحقق.\n• المصروفات والإيرادات المستحقة: إضافة أجور شهر ديسمبر غير المدفوعة (5,000ج) بـ قائمة الدخل هو اجتهاد استحقاقي يعكس العبء الفعلي للنشاط عن السنة وليس المدفوع نقداً.\n• المصروفات المقدمة: معالجة الإيجار المقدم كـ أصل متداول يحفظ ثروة المالك ويمنع تخفيض أرباح السنة بـ نفقات سنوات قادمة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد ينادي بعض النقاد الماليين بـ إلغاء التسويات والاعتماد الحصري على التدفق النقدي الفعلي بدعوى منع التلاعب؛ والرد العلمي المحاسبي أن تجريد القوائم المالية من أساس الاستحقاق يحول قائمة الدخل إلى مجرد كشف خزينة ويحرم القوائم من القدرة على التنبؤ وبناء قرارات الاستثمار.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التسويات الجردية هي الجسر الرابط بين البيانات النقدية والواقع الاقتصادي الصادق، والاجتهاد المهني المعتمد فيها هو قدر إيجابي منظم يرفع كفاءة وموثوقية التقرير المالي متى ما شُفِع بالإفصاح والاتساق والحياد.\n```\n\n---\n\n## 📘 الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالتسويات الجردية وتطبيقات أساس الاستحقاق حتمية محاسبية لإعداد قوائم مالية عادلة وموثوقة، ولكنها تبتعد عن \"الموضوعية المادية المطلقة\" وتدخل قدراً مستندياً مقبولاً من التقدير والاجتهاد المهني الشخصي دون أن يمس ذلك بالضرورة حياد القوائم متى ما التزمت بالسياسات المحاسبية الموحدة.\n\n2. التفسير والتعليل (4 درجات):\nلأن الاعتماد على الحركة النقدية الخالصة (الأساس النقدي) يضلل متخذ القرار ويظهر أرباحاً وهمية؛ وتأتي التسويات الجردية لربط الإيرادات والمصروفات بفترتها الاستحقاقية الصافية، مع الاعتماد على اجتهادات وتقديرات موضوعية لتحديد الآجال والنسب والمستحقات ومخزون آخر المدة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الخامسة (4 درجات):\n• تقويم مخزون آخر المدة: تطبيق قاعدة (التكلفة أو السوق أيهما أقل) يستند لمبدأ الحيطة والحذر والتقدير الفعلي لـ صافي القيمة التحصيلية القابلة للتحقق.\n• المصروفات والإيرادات المستحقة: إضافة أجور شهر ديسمبر غير المدفوعة (5,000ج) بـ قائمة الدخل هو اجتهاد استحقاقي يعكس العبء الفعلي للنشاط عن السنة وليس المدفوع نقداً.\n• المصروفات المقدمة: معالجة الإيجار المقدم كـ أصل متداول يحفظ ثروة المالك ويمنع تخفيض أرباح السنة بـ نفقات سنوات قادمة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد ينادي بعض النقاد الماليين بـ إلغاء التسويات والاعتماد الحصري على التدفق النقدي الفعلي بدعوى منع التلاعب؛ والرد العلمي المحاسبي أن تجريد القوائم المالية من أساس الاستحقاق يحول قائمة الدخل إلى مجرد كشف خزينة ويحرم القوائم من القدرة على التنبؤ وبناء قرارات الاستثمار.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التسويات الجردية هي الجسر الرابط بين البيانات النقدية والواقع الاقتصادي الصادق، والاجتهاد المهني المعتمد فيها هو قدر إيجابي منظم يرفع كفاءة وموثوقية التقرير المالي متى ما شُفِع بالإفصاح والاتساق والحياد.\n```\n\n---\n\n## 📘 الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nالتسويات الجردية وتطبيقات أساس الاستحقاق حتمية محاسبية لإعداد قوائم مالية عادلة وموثوقة، ولكنها تبتعد عن \"الموضوعية المادية المطلقة\" وتدخل قدراً مستندياً مقبولاً من التقدير والاجتهاد المهني الشخصي دون أن يمس ذلك بالضرورة حياد القوائم متى ما التزمت بالسياسات المحاسبية الموحدة.\n\n2. التفسير والتعليل (4 درجات):\nلأن الاعتماد على الحركة النقدية الخالصة (الأساس النقدي) يضلل متخذ القرار ويظهر أرباحاً وهمية؛ وتأتي التسويات الجردية لربط الإيرادات والمصروفات بفترتها الاستحقاقية الصافية، مع الاعتماد على اجتهادات وتقديرات موضوعية لتحديد الآجال والنسب والمستحقات ومخزون آخر المدة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الخامسة (4 درجات):\n• تقويم مخزون آخر المدة: تطبيق قاعدة (التكلفة أو السوق أيهما أقل) يستند لمبدأ الحيطة والحذر والتقدير الفعلي لـ صافي القيمة التحصيلية القابلة للتحقق.\n• المصروفات والإيرادات المستحقة: إضافة أجور شهر ديسمبر غير المدفوعة (5,000ج) بـ قائمة الدخل هو اجتهاد استحقاقي يعكس العبء الفعلي للنشاط عن السنة وليس المدفوع نقداً.\n• المصروفات المقدمة: معالجة الإيجار المقدم كـ أصل متداول يحفظ ثروة المالك ويمنع تخفيض أرباح السنة بـ نفقات سنوات قادمة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد ينادي بعض النقاد الماليين بـ إلغاء التسويات والاعتماد الحصري على التدفق النقدي الفعلي بدعوى منع التلاعب؛ والرد العلمي المحاسبي أن تجريد القوائم المالية من أساس الاستحقاق يحول قائمة الدخل إلى مجرد كشف خزينة ويحرم القوائم من القدرة على التنبؤ وبناء قرارات الاستثمار.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التسويات الجردية هي الجسر الرابط بين البيانات النقدية والواقع الاقتصادي الصادق، والاجتهاد المهني المعتمد فيها هو قدر إيجابي منظم يرفع كفاءة وموثوقية التقرير المالي متى ما شُفِع بالإفصاح والاتساق والحياد.\n```\n\n---\n\n## 📘 الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 132,
    "sourceDocument": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 132,
      "concept": "س220 المقال المحاسبي الشامل لـ الوحدة الخامسة (JRE)"
    },
    "tags": [
      "الوحدة الخامسة: القوائم المالية للمنشأة الفردية والتسويات الجردية (ص 111 – 135)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة الخامسة (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u6-221",
    "sourceQuestionId": "b373-u6-221",
    "originalId": "b373-u6-221",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س221 السؤال الجوهري للوحدة السادسة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "كيف يستطيع المحاسبون إعادة تكوين معلومات مالية موثوقة عند غياب القيد المزدوج وتوافر سجلات غير مكتملة؟",
    "correctAnswer": "يستطيع المحاسبون إعادة تكوين البيانات عبر ثلاثة أساليب متكاملة: 1) تطبيق معادلة التغير في صافي الملكية/رأس المال لاستخراج الربح 2) فتح حسابات المراقبة الإجمالية لمطابقة العملاء والموردين 3) إعداد مذكرة تسوية البنك لتعديل النقدية وضبط السيولة الصادقة.",
    "modelAnswer": "يستطيع المحاسبون إعادة تكوين البيانات عبر ثلاثة أساليب متكاملة: 1) تطبيق معادلة التغير في صافي الملكية/رأس المال لاستخراج الربح 2) فتح حسابات المراقبة الإجمالية لمطابقة العملاء والموردين 3) إعداد مذكرة تسوية البنك لتعديل النقدية وضبط السيولة الصادقة.",
    "explanation": "تحويل البيانات الجزئية المستندية إلى قوائم مالية معتمدة وفق المعايير.",
    "sourceType": "official_textbook",
    "sourcePage": 1,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 1,
      "concept": "س221 السؤال الجوهري للوحدة السادسة"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "الافتتاحية — السجلات غير المكتملة.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u6-222",
    "sourceQuestionId": "b373-u6-222",
    "originalId": "b373-u6-222",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س222 دراسة حالة ورشة سمير",
    "difficulty": "intermediate",
    "questionType": "case",
    "bloomLevel": "application",
    "question": "فقد سمير بعض إيصالات التحصيل، وتشتت المشتريات، وظهرت رسوم بنكية غير مسجلة وشيكات معلقة. كيف يُساعده المحاسب؟",
    "correctAnswer": "بجمع الأصول والخصوم أول وآخر الفترة لحساب رأس المال والربح الصافي، وإعداد حساب مراقبة المشتريات لمطابقة الموردين، وإجراء تسوية البنك لتحديد السيولة الفضلى.",
    "modelAnswer": "بجمع الأصول والخصوم أول وآخر الفترة لحساب رأس المال والربح الصافي، وإعداد حساب مراقبة المشتريات لمطابقة الموردين، وإجراء تسوية البنك لتحديد السيولة الفضلى.",
    "explanation": "تطبيق أساليب الجرد الفعلي واستخراج النتائج المتممة عند غياب القيد المزدوج المنتظم.",
    "sourceType": "official_textbook",
    "sourcePage": 2,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 2,
      "concept": "س222 دراسة حالة ورشة سمير"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "السجلات المفقودة بالورش والمتاجر الصغرى.",
      "دراسة حالة ميدانية."
    ]
  },
  {
    "id": "b373-u6-223",
    "sourceQuestionId": "b373-u6-223",
    "originalId": "b373-u6-223",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س223 اختبر معلوماتك: أهمية التسويات والمراقبة",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "comprehension",
    "question": "لماذا تُعد تسويات البنك وحسابات المراقبة مهمة لدقة المعلومات المالية؟",
    "correctAnswer": "لأنها أدوات مطابقة وتدقيق داخلي تكشف أخطاء السهو والترحيل، وتمنع الاختلاس والغش، وتضمن صحة القوائم المالية.",
    "modelAnswer": "لأنها أدوات مطابقة وتدقيق داخلي تكشف أخطاء السهو والترحيل، وتمنع الاختلاس والغش، وتضمن صحة القوائم المالية.",
    "explanation": "إحكام الرقابة المحاسبية الذاتية المتقاطعة على حسابات الأستاذ بـ دفتر النقدية.",
    "sourceType": "official_textbook",
    "sourcePage": 2,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 2,
      "concept": "س223 اختبر معلوماتك: أهمية التسويات والمراقبة"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "أهمية نظم الرقابة.",
      "سؤال مفهومي."
    ]
  },
  {
    "id": "b373-u6-224",
    "sourceQuestionId": "b373-u6-224",
    "originalId": "b373-u6-224",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س224 (ص 3)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "لماذا تحتفظ بعض المنشآت بسجلات غير مكتملة؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "لصغر حجم المشروع، ومحدودية المعرفة المحاسبية للمالك، وتجنب تكاليف النظم المهنية للقيد المزدوج.",
    "modelAnswer": "لصغر حجم المشروع، ومحدودية المعرفة المحاسبية للمالك، وتجنب تكاليف النظم المهنية للقيد المزدوج.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 3)",
    "sourceType": "official_textbook",
    "sourcePage": 3,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 3,
      "concept": "س224 (ص 3)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-225",
    "sourceQuestionId": "b373-u6-225",
    "originalId": "b373-u6-225",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س225 (ص 4)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "لماذا يُعد القيد المزدوج أكثر موثوقية من القيد المفرد؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "لأنه يثبت أثرين متساويين لكل معاملة، ويسمح باختبار التوازن بميزان المراجعة، ويحقق الشمول.",
    "modelAnswer": "لأنه يثبت أثرين متساويين لكل معاملة، ويسمح باختبار التوازن بميزان المراجعة، ويحقق الشمول.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 4)",
    "sourceType": "official_textbook",
    "sourcePage": 4,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 4,
      "concept": "س225 (ص 4)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-226",
    "sourceQuestionId": "b373-u6-226",
    "originalId": "b373-u6-226",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س226 (ص 6)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "قارن بين القيد المفرد والقيد المزدوج بجدول.",
    "correctAnswer": "المفرد:** يركز على حركة النقدية وموثوقيته منخفضة. **المزدوج:** يثبت كافة الطرفين وموثوقيته عالية وعلمية.\n\n---",
    "modelAnswer": "المفرد:** يركز على حركة النقدية وموثوقيته منخفضة. **المزدوج:** يثبت كافة الطرفين وموثوقيته عالية وعلمية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 6)",
    "sourceType": "official_textbook",
    "sourcePage": 6,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 6,
      "concept": "س226 (ص 6)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-227",
    "sourceQuestionId": "b373-u6-227",
    "originalId": "b373-u6-227",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س227 (ص 7)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "صغ معادلة استخراج صافي الربح من السجلات غير المكتملة.\n  * **المعادلة:** $$\\mathbf{\\text{صافي الربح} = \\text{رأس المال آخر الفترة} - \\text{رأس المال أول الفترة} + \\text{المسحوبات الشخصية} - \\text{رأس المال الإضافي}}.$$",
    "correctAnswer": "صغ معادلة استخراج صافي الربح من السجلات غير المكتملة.\n  * **المعادلة:** $$\\mathbf{\\text{صافي الربح} = \\text{رأس المال آخر الفترة} - \\text{رأس المال أول الفترة} + \\text{المسحوبات الشخصية} - \\text{رأس المال الإضافي}}.$$",
    "modelAnswer": "صغ معادلة استخراج صافي الربح من السجلات غير المكتملة.\n  * **المعادلة:** $$\\mathbf{\\text{صافي الربح} = \\text{رأس المال آخر الفترة} - \\text{رأس المال أول الفترة} + \\text{المسحوبات الشخصية} - \\text{رأس المال الإضافي}}.$$",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 7)",
    "sourceType": "official_textbook",
    "sourcePage": 7,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 7,
      "concept": "س227 (ص 7)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-228",
    "sourceQuestionId": "b373-u6-228",
    "originalId": "b373-u6-228",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س228 (ص 7)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إلى ماذا تشير عادة زيادة رأس مال آخر الفترة مقارنة بأول الفترة؟",
    "correctAnswer": "تشير إلى تحقيق أرباح تشغيلية صافية أُعيد استثمارها في النشاط، أو ضخ استثمارات إضافية جديدة.",
    "modelAnswer": "تشير إلى تحقيق أرباح تشغيلية صافية أُعيد استثمارها في النشاط، أو ضخ استثمارات إضافية جديدة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 7)",
    "sourceType": "official_textbook",
    "sourcePage": 7,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 7,
      "concept": "س228 (ص 7)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-229",
    "sourceQuestionId": "b373-u6-229",
    "originalId": "U6-Q16",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س229 (ص 8 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "نقدية أول 12,000ج، مخزون 6,000ج، معدات 8,000ج، موردون 5,000ج. نقدية آخر 9,000ج، مخزون 6,000ج، معدات 7,000ج، موردون 12,000ج. مسحوبات 3,000ج وإضافي 2,000ج. احسب نتيجة السنة.",
    "correctAnswer": "- رأس مال أول = $(12,000 + 6,000 + 8,000) - 5,000 = \\mathbf{21,000 \\text{ جنيه}}$.\n    - رأس مال آخر = $(9,000 + 6,000 + 7,000) - 12,000 = \\mathbf{10,000 \\text{ جنيه}}$.\n    - **صافي النتيجة** = $10,000 - 21,000 + 3,000 - 2,000 = \\mathbf{-10,000 \\text{ جنيه (صافي خسارة)}}$.",
    "modelAnswer": "- رأس مال أول = $(12,000 + 6,000 + 8,000) - 5,000 = \\mathbf{21,000 \\text{ جنيه}}$.\n    - رأس مال آخر = $(9,000 + 6,000 + 7,000) - 12,000 = \\mathbf{10,000 \\text{ جنيه}}$.\n    - **صافي النتيجة** = $10,000 - 21,000 + 3,000 - 2,000 = \\mathbf{-10,000 \\text{ جنيه (صافي خسارة)}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 8 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 8,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 8,
      "concept": "س229 (ص 8 - مسألة 1)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q16"
  },
  {
    "id": "b373-u6-230",
    "sourceQuestionId": "b373-u6-230",
    "originalId": "b373-u6-230",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س230 (ص 9 - مسألة 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "رأس مال أول 30,000ج، آخر 42,000ج، مسحوبات 5,000ج، إضافي 4,000ج. احسب الربح.",
    "correctAnswer": "صافي الربح = $42,000 - 30,000 + 5,000 - 4,000 = \\mathbf{13,000 \\text{ جنيه}}$.",
    "modelAnswer": "صافي الربح = $42,000 - 30,000 + 5,000 - 4,000 = \\mathbf{13,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 9 - مسألة 2)",
    "sourceType": "official_textbook",
    "sourcePage": 9,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 9,
      "concept": "س230 (ص 9 - مسألة 2)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-231",
    "sourceQuestionId": "b373-u6-231",
    "originalId": "U6-Q11",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س231 (ص 9 - مسألة 3)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "رأس مال أول 50,000ج، مسحوبات 4,000ج، ربح 20,000ج. احسب رأس مال آخر ونسبة الزيادة.",
    "correctAnswer": "رأس مال آخر = $50,000 + 20,000 - 4,000 = \\mathbf{66,000 \\text{ جنيه}}$. نسبة الزيادة = $\\left(\\frac{16,000}{50,000}\\right) \\times 100 = \\mathbf{32\\%}$.",
    "modelAnswer": "رأس مال آخر = $50,000 + 20,000 - 4,000 = \\mathbf{66,000 \\text{ جنيه}}$. نسبة الزيادة = $\\left(\\frac{16,000}{50,000}\\right) \\times 100 = \\mathbf{32\\%}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 9 - مسألة 3)",
    "sourceType": "official_textbook",
    "sourcePage": 9,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 9,
      "concept": "س231 (ص 9 - مسألة 3)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q11"
  },
  {
    "id": "b373-u6-232",
    "sourceQuestionId": "b373-u6-232",
    "originalId": "b373-u6-232",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س232 (ص 9)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "متى يتساوى رأس مال آخر المدة مع أول المدة؟",
    "correctAnswer": "عندما تتعادل الأرباح الصافية المحققة تماماً مع المسحوبات الشخصية للمالك في ظل عدم وجود أي رأس مال إضافي.\n\n---",
    "modelAnswer": "عندما تتعادل الأرباح الصافية المحققة تماماً مع المسحوبات الشخصية للمالك في ظل عدم وجود أي رأس مال إضافي.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 9)",
    "sourceType": "official_textbook",
    "sourcePage": 9,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 9,
      "concept": "س232 (ص 9)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-233",
    "sourceQuestionId": "b373-u6-233",
    "originalId": "U6-Q13",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س233 (ص 10)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما الغرض الرئيسي من فتح حساب المراقبة في دفتر الأستاذ العام؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "اختبار واختراق صحة إجمالي أرصدة الحسابات الفرعية بالدفاتر المساعدة ومطابقتها.",
    "modelAnswer": "اختبار واختراق صحة إجمالي أرصدة الحسابات الفرعية بالدفاتر المساعدة ومطابقتها.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 10)",
    "sourceType": "official_textbook",
    "sourcePage": 10,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 10,
      "concept": "س233 (ص 10)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q13"
  },
  {
    "id": "b373-u6-234",
    "sourceQuestionId": "b373-u6-234",
    "originalId": "U6-Q14",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س234 (ص 11)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ماذا يمثل الرصيد الختامي لمراقبة المبيعات؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "يمثل إجمالي مديونيات العملاء المستحقة بنهاية الفترة (أصل متداول).",
    "modelAnswer": "يمثل إجمالي مديونيات العملاء المستحقة بنهاية الفترة (أصل متداول).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 11)",
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 11,
      "concept": "س234 (ص 11)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q14"
  },
  {
    "id": "b373-u6-235",
    "sourceQuestionId": "b373-u6-235",
    "originalId": "U6-Q16",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س235 (ص 12 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "عملاء أول 4,000ج، مبيعات آجل 10,000ج، تحصيل 7,000ج، خصم مسموح 500ج، مردودات مبيعات 1,500ج. أعد حساب المراقبة T.",
    "correctAnswer": "الجانب المدين = $4,000 + 10,000 = 14,000\\text{ج}$. الجانب الدائن = $7,000 + 500 + 1,500 = 9,000\\text{ج}$. **الرصيد الختامي = $14,000 - 9,000 = \\mathbf{5,000 \\text{ جنيه (مدين)}}$**.",
    "modelAnswer": "الجانب المدين = $4,000 + 10,000 = 14,000\\text{ج}$. الجانب الدائن = $7,000 + 500 + 1,500 = 9,000\\text{ج}$. **الرصيد الختامي = $14,000 - 9,000 = \\mathbf{5,000 \\text{ جنيه (مدين)}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 12 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 12,
      "concept": "س235 (ص 12 - مسألة 1)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q16"
  },
  {
    "id": "b373-u6-236",
    "sourceQuestionId": "b373-u6-236",
    "originalId": "U6-Q17",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س236 (ص 12 - مسألة 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "موردون أول 6,000ج، مشتريات آجل 14,000ج، مدفوع 9,000ج، خصم مكتسب 1,000ج، مردودات مشتريات 2,000ج. أعد حساب المراقبة T.",
    "correctAnswer": "الجانب الدائن = $6,000 + 14,000 = 20,000\\text{ج}$. الجانب المدين = $9,000 + 1,000 + 2,000 = 12,000\\text{ج}$. **الرصيد الختامي = $20,000 - 12,000 = \\mathbf{8,000 \\text{ جنيه (دائن)}}$**.",
    "modelAnswer": "الجانب الدائن = $6,000 + 14,000 = 20,000\\text{ج}$. الجانب المدين = $9,000 + 1,000 + 2,000 = 12,000\\text{ج}$. **الرصيد الختامي = $20,000 - 12,000 = \\mathbf{8,000 \\text{ جنيه (دائن)}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 12 - مسألة 2)",
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 12,
      "concept": "س236 (ص 12 - مسألة 2)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q17"
  },
  {
    "id": "b373-u6-237",
    "sourceQuestionId": "b373-u6-237",
    "originalId": "b373-u6-237",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س237 (ص 13)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "اذكر سببين لاختلاف رصيد حساب المراقبة عن إجمالي الحسابات الفردية. \\\\(\\rightarrow\\\\)",
    "correctAnswer": "1) أخطاء الترحيل الكتابية لـ أحد الحسابات الفرعية 2) السهو عن قيد فاتورة فرعية بالدفتر المساعد.",
    "modelAnswer": "1) أخطاء الترحيل الكتابية لـ أحد الحسابات الفرعية 2) السهو عن قيد فاتورة فرعية بالدفتر المساعد.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 13)",
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 13,
      "concept": "س237 (ص 13)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-238",
    "sourceQuestionId": "b373-u6-238",
    "originalId": "b373-u6-238",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س238 (ص 13)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "كيفية معالجة الديون المعدومة في حساب مراقبة المبيعات. \\\\(\\rightarrow\\\\)",
    "correctAnswer": "توضع بـ الجانب الدائن لحساب المراقبة لتخفيض إجمالي مديونية العملاء.\n\n---",
    "modelAnswer": "توضع بـ الجانب الدائن لحساب المراقبة لتخفيض إجمالي مديونية العملاء.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 13)",
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 13,
      "concept": "س238 (ص 13)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-239",
    "sourceQuestionId": "b373-u6-239",
    "originalId": "b373-u6-239",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س239 (ص 14)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "هل تصحح تسوية البنك الأخطاء أم تفسر الفروق؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "تفسر الفروق والتوقيتات فقط** بين دفتر النقدية وكشف البنك؛ بينما تصحيح الأخطاء يتطلب قيود تعديل بدفتر النقدية بالمنشأة.",
    "modelAnswer": "تفسر الفروق والتوقيتات فقط** بين دفتر النقدية وكشف البنك؛ بينما تصحيح الأخطاء يتطلب قيود تعديل بدفتر النقدية بالمنشأة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س239 (ص 14)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-240",
    "sourceQuestionId": "b373-u6-240",
    "originalId": "b373-u6-240",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س240 (ص 14)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما المقصود بـ \"الإيداعات بالطريق\" وكيف تعالج للتسوية؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "مبالغ أودعت وسجلت بدفتر النقدية ولم تظهر بكشف البنك بعد؛ وتضاف لرصيد كشف البنك بمذكرة التسوية.",
    "modelAnswer": "مبالغ أودعت وسجلت بدفتر النقدية ولم تظهر بكشف البنك بعد؛ وتضاف لرصيد كشف البنك بمذكرة التسوية.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س240 (ص 14)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-241",
    "sourceQuestionId": "b373-u6-241",
    "originalId": "b373-u6-241",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س241 (ص 14)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما المقصود بـ \"الشيكات المعلقة الصادرة\" وكيف تعالج؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "شيكات حررتها المنشأة للموردين ولم تقدم للصرف بعد؛ وتطرح من رصيد كشف البنك (أو تضاف للدفاتر).",
    "modelAnswer": "شيكات حررتها المنشأة للموردين ولم تقدم للصرف بعد؛ وتطرح من رصيد كشف البنك (أو تضاف للدفاتر).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س241 (ص 14)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-242",
    "sourceQuestionId": "b373-u6-242",
    "originalId": "U6-Q25",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س242",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تحديث دفتر النقدية = $6,000 - 300 - 700 = \\mathbf{5,000 \\text{ جنيه (الرصيد المعدل)}}$.",
    "correctAnswer": "تحديث دفتر النقدية = $6,000 - 300 - 700 = \\mathbf{5,000 \\text{ جنيه (الرصيد المعدل)}}$.",
    "modelAnswer": "تحديث دفتر النقدية = $6,000 - 300 - 700 = \\mathbf{5,000 \\text{ جنيه (الرصيد المعدل)}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14 – 16)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س242"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q25"
  },
  {
    "id": "b373-u6-243",
    "sourceQuestionId": "b373-u6-243",
    "originalId": "U6-Q26",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س243",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مذكرة تسوية البنك = $5,000 (\\text{دفتر معدل}) + 1,200 (\\text{شيكات معلقة}) - 1,800 (\\text{إيداعات بالطريق}) = \\mathbf{4,400 \\text{ جنيه (رصيد كشف البنك)}}$.",
    "correctAnswer": "مذكرة تسوية البنك = $5,000 (\\text{دفتر معدل}) + 1,200 (\\text{شيكات معلقة}) - 1,800 (\\text{إيداعات بالطريق}) = \\mathbf{4,400 \\text{ جنيه (رصيد كشف البنك)}}$.",
    "modelAnswer": "مذكرة تسوية البنك = $5,000 (\\text{دفتر معدل}) + 1,200 (\\text{شيكات معلقة}) - 1,800 (\\text{إيداعات بالطريق}) = \\mathbf{4,400 \\text{ جنيه (رصيد كشف البنك)}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14 – 16)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س243"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q26"
  },
  {
    "id": "b373-u6-244",
    "sourceQuestionId": "b373-u6-244",
    "originalId": "U6-Q27",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س244",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "رأس المال أول = $30,000 - 10,000 = \\mathbf{20,000 \\text{ج}}$، آخر = $38,000 - 12,000 = \\mathbf{26,000 \\text{ج}}$.",
    "correctAnswer": "رأس المال أول = $30,000 - 10,000 = \\mathbf{20,000 \\text{ج}}$، آخر = $38,000 - 12,000 = \\mathbf{26,000 \\text{ج}}$.",
    "modelAnswer": "رأس المال أول = $30,000 - 10,000 = \\mathbf{20,000 \\text{ج}}$، آخر = $38,000 - 12,000 = \\mathbf{26,000 \\text{ج}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14 – 16)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س244"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q27"
  },
  {
    "id": "b373-u6-245",
    "sourceQuestionId": "b373-u6-245",
    "originalId": "U6-Q28",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س245",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "صافي ربح كريم = $26,000 - 20,000 + 5,000 - 3,000 = \\mathbf{8,000 \\text{ جنيه}}$.",
    "correctAnswer": "صافي ربح كريم = $26,000 - 20,000 + 5,000 - 3,000 = \\mathbf{8,000 \\text{ جنيه}}$.",
    "modelAnswer": "صافي ربح كريم = $26,000 - 20,000 + 5,000 - 3,000 = \\mathbf{8,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14 – 16)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س245"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q28"
  },
  {
    "id": "b373-u6-246",
    "sourceQuestionId": "b373-u6-246",
    "originalId": "b373-u6-246",
    "lessonId": "lesson-6-1",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.1",
    "concept": "س246",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الأهمية الرقابية لتسوية كريم = تكشف أخطاء السهو وتضمن السيطرة المحكمة على سيولة المشروع.\n\n---",
    "correctAnswer": "الأهمية الرقابية لتسوية كريم = تكشف أخطاء السهو وتضمن السيطرة المحكمة على سيولة المشروع.\n\n---",
    "modelAnswer": "الأهمية الرقابية لتسوية كريم = تكشف أخطاء السهو وتضمن السيطرة المحكمة على سيولة المشروع.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 14 – 16)",
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 14,
      "concept": "س246"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u6-247",
    "sourceQuestionId": "b373-u6-247",
    "originalId": "b373-u6-247",
    "lessonId": "lesson-6-4",
    "unitId": "unit-6",
    "learningObjectiveId": "LO-U6.4",
    "concept": "س247 المقال المحاسبي الشامل لـ الوحدة السادسة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة التالية بـ مقال تحليلي محكم: **\"عندما تكون السجلات المالية غير مكتملة، هل ينبغي اعتبار المعلومات المحاسبية المعاد تكوينها مقاييس موثوقة تماماً للأداء المالي، أم أنها مجرد تقديرات مستنيرة قائمة على أدلة جزئية؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالمعلومات المحاسبية المعاد تكوينها عند غياب القيد المزدوج تُمثل \"تقديرات مستنيرة مفيدة\" توفر موثوقية عملية معقولة لتسيير المشروع والرفع الضريبي، وليست مقاييس يقينية مطلقة.\n\n2. التفسير والتعليل (4 درجات):\nلأن غياب القيد المزدوج يفرض استخدام أدلة مستندية جزئية ومقارنات جردية؛ وتأتي الأساليب المتاحة (معادلة رأس المال، حسابات المراقبة، تسوية البنك) لبناء مركز مالي تقديري عادل يمنع الانهيار المالي دون إلغاء تام للذاتية.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة السادسة (4 درجات):\n• معادلة التغير في رأس المال: نجحت في استخراج صافي ربح منشأة كريم (8,000ج) بتتبع التغير بـ صافي الثروة معدلة بـ المسحوبات والإضافات.\n• حسابات المراقبة: ضبطت إجمالي مديونيات العملاء والموردين ومكنت من اكتشاف الأخطاء الفردية.\n• تسوية البنك: عدلت رصيد النقدية الدفتري لكريم من 6,000ج إلى 5,000ج وفسرت الفروق بـ الشيكات المعلقة والإيداعات بالطريق.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المراجعين الأكاديميين رفض القوائم المعاد تكوينها بدعوى عدم استنادها لـ ميزان مراجعة متوازن قيدياً؛ والرد المحاسبي العملي أن رفضها يعني حرمان المنشآت الصغرى من المساءلة المالية، وأن الحسابات المعاد تكوينها هي خطوة انتقالية ضرورية لنظام القيد المزدوج المنتظم.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن البيانات المعاد تكوينها هي أداة حماية ورقابة ضرورية للمنشآت الصغرى، وتصل إلى أعلى مستويات المصداقية بالتحول التدريجي المخطط لنظام القيد المزدوج الشامل.\n```\n\n---\n\n## 📘 الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالمعلومات المحاسبية المعاد تكوينها عند غياب القيد المزدوج تُمثل \"تقديرات مستنيرة مفيدة\" توفر موثوقية عملية معقولة لتسيير المشروع والرفع الضريبي، وليست مقاييس يقينية مطلقة.\n\n2. التفسير والتعليل (4 درجات):\nلأن غياب القيد المزدوج يفرض استخدام أدلة مستندية جزئية ومقارنات جردية؛ وتأتي الأساليب المتاحة (معادلة رأس المال، حسابات المراقبة، تسوية البنك) لبناء مركز مالي تقديري عادل يمنع الانهيار المالي دون إلغاء تام للذاتية.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة السادسة (4 درجات):\n• معادلة التغير في رأس المال: نجحت في استخراج صافي ربح منشأة كريم (8,000ج) بتتبع التغير بـ صافي الثروة معدلة بـ المسحوبات والإضافات.\n• حسابات المراقبة: ضبطت إجمالي مديونيات العملاء والموردين ومكنت من اكتشاف الأخطاء الفردية.\n• تسوية البنك: عدلت رصيد النقدية الدفتري لكريم من 6,000ج إلى 5,000ج وفسرت الفروق بـ الشيكات المعلقة والإيداعات بالطريق.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المراجعين الأكاديميين رفض القوائم المعاد تكوينها بدعوى عدم استنادها لـ ميزان مراجعة متوازن قيدياً؛ والرد المحاسبي العملي أن رفضها يعني حرمان المنشآت الصغرى من المساءلة المالية، وأن الحسابات المعاد تكوينها هي خطوة انتقالية ضرورية لنظام القيد المزدوج المنتظم.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن البيانات المعاد تكوينها هي أداة حماية ورقابة ضرورية للمنشآت الصغرى، وتصل إلى أعلى مستويات المصداقية بالتحول التدريجي المخطط لنظام القيد المزدوج الشامل.\n```\n\n---\n\n## 📘 الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nالمعلومات المحاسبية المعاد تكوينها عند غياب القيد المزدوج تُمثل \"تقديرات مستنيرة مفيدة\" توفر موثوقية عملية معقولة لتسيير المشروع والرفع الضريبي، وليست مقاييس يقينية مطلقة.\n\n2. التفسير والتعليل (4 درجات):\nلأن غياب القيد المزدوج يفرض استخدام أدلة مستندية جزئية ومقارنات جردية؛ وتأتي الأساليب المتاحة (معادلة رأس المال، حسابات المراقبة، تسوية البنك) لبناء مركز مالي تقديري عادل يمنع الانهيار المالي دون إلغاء تام للذاتية.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة السادسة (4 درجات):\n• معادلة التغير في رأس المال: نجحت في استخراج صافي ربح منشأة كريم (8,000ج) بتتبع التغير بـ صافي الثروة معدلة بـ المسحوبات والإضافات.\n• حسابات المراقبة: ضبطت إجمالي مديونيات العملاء والموردين ومكنت من اكتشاف الأخطاء الفردية.\n• تسوية البنك: عدلت رصيد النقدية الدفتري لكريم من 6,000ج إلى 5,000ج وفسرت الفروق بـ الشيكات المعلقة والإيداعات بالطريق.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المراجعين الأكاديميين رفض القوائم المعاد تكوينها بدعوى عدم استنادها لـ ميزان مراجعة متوازن قيدياً؛ والرد المحاسبي العملي أن رفضها يعني حرمان المنشآت الصغرى من المساءلة المالية، وأن الحسابات المعاد تكوينها هي خطوة انتقالية ضرورية لنظام القيد المزدوج المنتظم.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن البيانات المعاد تكوينها هي أداة حماية ورقابة ضرورية للمنشآت الصغرى، وتصل إلى أعلى مستويات المصداقية بالتحول التدريجي المخطط لنظام القيد المزدوج الشامل.\n```\n\n---\n\n## 📘 الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 17,
      "concept": "س247 المقال المحاسبي الشامل لـ الوحدة السادسة (JRE)"
    },
    "tags": [
      "الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية (الجزء الثاني ص 1 – 20)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة السادسة (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u7-248",
    "sourceQuestionId": "b373-u7-248",
    "originalId": "b373-u7-248",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س248 السؤال الجوهري للوحدة السابعة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "كيف يقيس المحاسبون قيمة الأصول عبر الزمن؟ ومتى نثبت الخسائر المتوقعة؟ وكيف ينشأ ربح أو خسارة بيع الأصل؟",
    "correctAnswer": "يقيسون القيمة بتوزيع التكلفة التاريخية كـ مصروف إهلاك على العمر الإنتاجي. ونثبت الخسائر المتوقعة (المخصصات) فور احتمال وقوعها تطبيقاً للحيطة والحذر. وينشأ ربح/خسارة البيع بمقارنة الثمن النقدي المحصل بـ القيمة الدفترية المتبقية.",
    "modelAnswer": "يقيسون القيمة بتوزيع التكلفة التاريخية كـ مصروف إهلاك على العمر الإنتاجي. ونثبت الخسائر المتوقعة (المخصصات) فور احتمال وقوعها تطبيقاً للحيطة والحذر. وينشأ ربح/خسارة البيع بمقارنة الثمن النقدي المحصل بـ القيمة الدفترية المتبقية.",
    "explanation": "تطبيق متكامل لمبادئ المقابلة والحيطة والحذر والتكلفة التاريخية.",
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 21,
      "concept": "س248 السؤال الجوهري للوحدة السابعة"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "الافتتاحية — التسويات غير المتداولة.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u7-249",
    "sourceQuestionId": "b373-u7-249",
    "originalId": "b373-u7-249",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س249 حالة شركة توصيل مها",
    "difficulty": "intermediate",
    "questionType": "case",
    "bloomLevel": "application",
    "question": "خفّض المحاسب قيمة دراجات شركة مها رغم عملها الجيد، وأثبت خسارة متوقعة لـ تأخر العملاء، وظهر ربح عند بيع دراجة. فسر هذه التغيرات الثلاثة.",
    "correctAnswer": "1) تخفيض الدراجات هو مصروف إهلاك يوزع نفقتها على الفترات المستفيدة 2) إثبات الخسارة هو مخصص ديون مشكوك فيها لحماية أصل العملاء 3) ربح بيع الدراجة نتج لأن سعر بيعها كان أعلى من قيمتها الدفترية المتبقية.",
    "modelAnswer": "1) تخفيض الدراجات هو مصروف إهلاك يوزع نفقتها على الفترات المستفيدة 2) إثبات الخسارة هو مخصص ديون مشكوك فيها لحماية أصل العملاء 3) ربح بيع الدراجة نتج لأن سعر بيعها كان أعلى من قيمتها الدفترية المتبقية.",
    "explanation": "تطبيق لمعايير تقييم الأصول والاستبعاد.",
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 22,
      "concept": "س249 حالة شركة توصيل مها"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "إهلاك أصول وبيع دراجة نارية ومخصص ديون.",
      "دراسة حالة سياقية."
    ]
  },
  {
    "id": "b373-u7-250",
    "sourceQuestionId": "b373-u7-250",
    "originalId": "b373-u7-250",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س250 (ص 23)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "عرف الإهلاك ولماذا لا يطابق القيمة السوقية؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "هو التوزيع المنتظم لتكلفة الأصل على عمره الإنتاجي، ولا يطابق السوق لأنه توزيع تكاليفي وليس إعادة تقييم سوقي.",
    "modelAnswer": "هو التوزيع المنتظم لتكلفة الأصل على عمره الإنتاجي، ولا يطابق السوق لأنه توزيع تكاليفي وليس إعادة تقييم سوقي.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 23)",
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 23,
      "concept": "س250 (ص 23)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-251",
    "sourceQuestionId": "b373-u7-251",
    "originalId": "b373-u7-251",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س251 (ص 24)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "قارن بين القسط الثابت والقسط المتناقص.",
    "correctAnswer": "الثابت:** يحمل السنوات بأقساط متساوية. **المتناقص:** يحمل السنوات الأولى بأقساط أعلى تتناقص تدريجياً.",
    "modelAnswer": "الثابت:** يحمل السنوات بأقساط متساوية. **المتناقص:** يحمل السنوات الأولى بأقساط أعلى تتناقص تدريجياً.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 24)",
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 24,
      "concept": "س251 (ص 24)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-252",
    "sourceQuestionId": "b373-u7-252",
    "originalId": "b373-u7-252",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س252 (ص 25)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أي الطريقتين تعطي ربحاً أقل بالسنوات الأولى؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "طريقة القسط المتناقص لأن مصروفها يكون أكبر بالسنوات الأولى.",
    "modelAnswer": "طريقة القسط المتناقص لأن مصروفها يكون أكبر بالسنوات الأولى.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 25)",
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 25,
      "concept": "س252 (ص 25)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-253",
    "sourceQuestionId": "b373-u7-253",
    "originalId": "U7-Q04",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س253 (ص 26 - مسألة 1 قسط ثابت)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "آلة تكلفتها 12,000ج، تخريدية 2,000ج، عمرها 5 سنوات. احسب القابل للإهلاك والإهلاك السنوي والقيمة الدفترية بعد 3 سنوات.",
    "correctAnswer": "القابل للإهلاك = $12,000 - 2,000 = \\mathbf{10,000 \\text{ جنيه}}$. الإهلاك السنوي = $10,000 \\div 5 = \\mathbf{2,000 \\text{ جنيه/سنة}}$. القيمة الدفترية بعد 3 سنوات = $12,000 - (3 \\times 2,000) = \\mathbf{6,000 \\text{ جنيه}}$.",
    "modelAnswer": "القابل للإهلاك = $12,000 - 2,000 = \\mathbf{10,000 \\text{ جنيه}}$. الإهلاك السنوي = $10,000 \\div 5 = \\mathbf{2,000 \\text{ جنيه/سنة}}$. القيمة الدفترية بعد 3 سنوات = $12,000 - (3 \\times 2,000) = \\mathbf{6,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 26 - مسألة 1 قسط ثابت)",
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 26,
      "concept": "س253 (ص 26 - مسألة 1 قسط ثابت)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U7-Q04"
  },
  {
    "id": "b373-u7-254",
    "sourceQuestionId": "b373-u7-254",
    "originalId": "b373-u7-254",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س254 (ص 26 - مسألة 2 قسط ثابت)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "شاحنة تكلفتها 20,000ج، تخريدية 4,000ج، عمرها 4 سنوات. احسب مجمع الإهلاك والقيمة الدفترية بعد سنتين.",
    "correctAnswer": "الإهلاك السنوي = $(20,000 - 4,000) \\div 4 = 4,000\\text{ج}$. مجمع الإهلاك = $4,000 \\times 2 = \\mathbf{8,000 \\text{ جنيه}}$. القيمة الدفترية = $20,000 - 8,000 = \\mathbf{12,000 \\text{ جنيه}}$.",
    "modelAnswer": "الإهلاك السنوي = $(20,000 - 4,000) \\div 4 = 4,000\\text{ج}$. مجمع الإهلاك = $4,000 \\times 2 = \\mathbf{8,000 \\text{ جنيه}}$. القيمة الدفترية = $20,000 - 8,000 = \\mathbf{12,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 26 - مسألة 2 قسط ثابت)",
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 26,
      "concept": "س254 (ص 26 - مسألة 2 قسط ثابت)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-255",
    "sourceQuestionId": "b373-u7-255",
    "originalId": "U7-Q06",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س255 (ص 27 - مسألة 3 قسط متناقص)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أصل تكلفته 15,000ج ومعدل إهلاكه المتناقص 10%. احسب إهلاك السنة الأولى والثانية والقيمة الدفترية.",
    "correctAnswer": "إهلاك سنة 1 = $15,000 \\times 10\\% = \\mathbf{1,500 \\text{ جنيه}}$. دفتري نهاية 1 = $13,500\\text{ج}$. إهلاك سنة 2 = $13,500 \\times 10\\% = \\mathbf{1,350 \\text{ جنيه}}$. دفتري نهاية 2 = $13,500 - 1,350 = \\mathbf{12,150 \\text{ جنيه}}$.",
    "modelAnswer": "إهلاك سنة 1 = $15,000 \\times 10\\% = \\mathbf{1,500 \\text{ جنيه}}$. دفتري نهاية 1 = $13,500\\text{ج}$. إهلاك سنة 2 = $13,500 \\times 10\\% = \\mathbf{1,350 \\text{ جنيه}}$. دفتري نهاية 2 = $13,500 - 1,350 = \\mathbf{12,150 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 27 - مسألة 3 قسط متناقص)",
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 27,
      "concept": "س255 (ص 27 - مسألة 3 قسط متناقص)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U7-Q06"
  },
  {
    "id": "b373-u7-256",
    "sourceQuestionId": "b373-u7-256",
    "originalId": "b373-u7-256",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س256 (ص 27 - مسألة 4 قسط متناقص)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "آلة تكلفتها 25,000ج ومعدلها 20%. احسب إهلاك السنوات الثلاث الأولى والقيمة الدفترية.",
    "correctAnswer": "سنة 1 = $25,000 \\times 20\\% = \\mathbf{5,000 \\text{ج}}$ (دفتري 20,000ج). سنة 2 = $20,000 \\times 20\\% = \\mathbf{4,000 \\text{ج}}$ (دفتري 16,000ج). سنة 3 = $16,000 \\times 20\\% = \\mathbf{3,200 \\text{ج}}$. القيمة الدفترية نهاية سنة 3 = $16,000 - 3,200 = \\mathbf{12,800 \\text{ جنيه}}$.",
    "modelAnswer": "سنة 1 = $25,000 \\times 20\\% = \\mathbf{5,000 \\text{ج}}$ (دفتري 20,000ج). سنة 2 = $20,000 \\times 20\\% = \\mathbf{4,000 \\text{ج}}$ (دفتري 16,000ج). سنة 3 = $16,000 \\times 20\\% = \\mathbf{3,200 \\text{ج}}$. القيمة الدفترية نهاية سنة 3 = $16,000 - 3,200 = \\mathbf{12,800 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 27 - مسألة 4 قسط متناقص)",
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 27,
      "concept": "س256 (ص 27 - مسألة 4 قسط متناقص)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-257",
    "sourceQuestionId": "b373-u7-257",
    "originalId": "U7-Q04",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س257 (ص 28 - مسألة يونس)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "معدات 10,000ج، تخريدية صفر، عمر 5 سنوات. احسب إهلاك سنة 1 بالقسط الثابت والمتناقص (20%).",
    "correctAnswer": "القسط الثابت = $10,000 \\div 5 = \\mathbf{2,000 \\text{ جنيه}}$. القسط المتناقص (20%) = $10,000 \\times 20\\% = \\mathbf{2,000 \\text{ جنيه}}$. متساويان بالكامل بـ السنة الأولى.",
    "modelAnswer": "القسط الثابت = $10,000 \\div 5 = \\mathbf{2,000 \\text{ جنيه}}$. القسط المتناقص (20%) = $10,000 \\times 20\\% = \\mathbf{2,000 \\text{ جنيه}}$. متساويان بالكامل بـ السنة الأولى.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 28 - مسألة يونس)",
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 28,
      "concept": "س257 (ص 28 - مسألة يونس)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U7-Q04"
  },
  {
    "id": "b373-u7-258",
    "sourceQuestionId": "b373-u7-258",
    "originalId": "b373-u7-258",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س258 (ص 28-29)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "correctAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "modelAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 28-29)",
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 28,
      "concept": "س258 (ص 28-29)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-259",
    "sourceQuestionId": "b373-u7-259",
    "originalId": "b373-u7-259",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س259 (ص 28-29)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "correctAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "modelAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 28-29)",
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 28,
      "concept": "س259 (ص 28-29)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-260",
    "sourceQuestionId": "b373-u7-260",
    "originalId": "b373-u7-260",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س260 (ص 28-29)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "correctAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "modelAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 28-29)",
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 28,
      "concept": "س260 (ص 28-29)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-261",
    "sourceQuestionId": "b373-u7-261",
    "originalId": "b373-u7-261",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س261 (ص 28-29)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "correctAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "modelAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 28-29)",
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 28,
      "concept": "س261 (ص 28-29)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-262",
    "sourceQuestionId": "b373-u7-262",
    "originalId": "b373-u7-262",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س262 (ص 28-29)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "correctAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "modelAnswer": "أسئلة علل وتحديات الإهلاك للمركبات والمباني والآلات.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 28-29)",
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 28,
      "concept": "س262 (ص 28-29)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-263",
    "sourceQuestionId": "b373-u7-263",
    "originalId": "b373-u7-263",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س263 (ص 30)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما القيمة الدفترية للأصل وكيف تحسب عند الاستبعاد؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "هي الصافي المتبقي بالدفاتر = التكلفة التاريخية − مجمع الإهلاك حتى تاريخ البيع.",
    "modelAnswer": "هي الصافي المتبقي بالدفاتر = التكلفة التاريخية − مجمع الإهلاك حتى تاريخ البيع.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 30)",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 30,
      "concept": "س263 (ص 30)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-264",
    "sourceQuestionId": "b373-u7-264",
    "originalId": "U7-Q11",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س264 (ص 31 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تكلفة 15,000ج، مجمع إهلاك 9,000ج، سعر بيع 5,000ج. احسب النتيجة وصور الحساب T.",
    "correctAnswer": "دفتري = $15,000 - 9,000 = 6,000\\text{ج}$. النتيجة = $5,000 - 6,000 = \\mathbf{-1,000 \\text{ جنيه (خسارة استبعاد)}}$.",
    "modelAnswer": "دفتري = $15,000 - 9,000 = 6,000\\text{ج}$. النتيجة = $5,000 - 6,000 = \\mathbf{-1,000 \\text{ جنيه (خسارة استبعاد)}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 31 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 31,
      "concept": "س264 (ص 31 - مسألة 1)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U7-Q11"
  },
  {
    "id": "b373-u7-265",
    "sourceQuestionId": "b373-u7-265",
    "originalId": "U7-Q10",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س265 (ص 32 - مسألة 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تكلفة 25,000ج، مجمع إهلاك 15,000ج، سعر بيع 12,000ج. احسب النتيجة وصور الحساب T.",
    "correctAnswer": "دفتري = $25,000 - 15,000 = 10,000\\text{ج}$. النتيجة = $12,000 - 10,000 = \\mathbf{+2,000 \\text{ جنيه (ربح استبعاد)}}$.",
    "modelAnswer": "دفتري = $25,000 - 15,000 = 10,000\\text{ج}$. النتيجة = $12,000 - 10,000 = \\mathbf{+2,000 \\text{ جنيه (ربح استبعاد)}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 32 - مسألة 2)",
    "sourceType": "official_textbook",
    "sourcePage": 32,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 32,
      "concept": "س265 (ص 32 - مسألة 2)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U7-Q10"
  },
  {
    "id": "b373-u7-266",
    "sourceQuestionId": "b373-u7-266",
    "originalId": "b373-u7-266",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س266 (ص 32)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "القيود المحاسبية لإغلاق مجمع الإهلاك والتكلفة وإثبات الثمن والنتيجة.\n\n---",
    "correctAnswer": "القيود المحاسبية لإغلاق مجمع الإهلاك والتكلفة وإثبات الثمن والنتيجة.\n\n---",
    "modelAnswer": "القيود المحاسبية لإغلاق مجمع الإهلاك والتكلفة وإثبات الثمن والنتيجة.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 32)",
    "sourceType": "official_textbook",
    "sourcePage": 32,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 32,
      "concept": "س266 (ص 32)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-267",
    "sourceQuestionId": "b373-u7-267",
    "originalId": "b373-u7-267",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س267 (ص 32)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "القيود المحاسبية لإغلاق مجمع الإهلاك والتكلفة وإثبات الثمن والنتيجة.\n\n---",
    "correctAnswer": "القيود المحاسبية لإغلاق مجمع الإهلاك والتكلفة وإثبات الثمن والنتيجة.\n\n---",
    "modelAnswer": "القيود المحاسبية لإغلاق مجمع الإهلاك والتكلفة وإثبات الثمن والنتيجة.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 32)",
    "sourceType": "official_textbook",
    "sourcePage": 32,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 32,
      "concept": "س267 (ص 32)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-268",
    "sourceQuestionId": "b373-u7-268",
    "originalId": "b373-u7-268",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س268 (ص 33)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما الفرق بين المخصص والدين المعدوم؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "المخصص خسارة متوقعة محتملة، بينما الدين المعدوم خسارة محققة فعلياً تُشطب فوراً.",
    "modelAnswer": "المخصص خسارة متوقعة محتملة، بينما الدين المعدوم خسارة محققة فعلياً تُشطب فوراً.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 33)",
    "sourceType": "official_textbook",
    "sourcePage": 33,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 33,
      "concept": "س268 (ص 33)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-269",
    "sourceQuestionId": "b373-u7-269",
    "originalId": "b373-u7-269",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س269 (ص 35 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "عملاء 8,000ج، نسبة المخصص 5%. احسب المخصص والصافي بـ الميزانية.",
    "correctAnswer": "المخصص = $8,000 \\times 5\\% = \\mathbf{400 \\text{ جنيه}}$. صافي العملاء بـ الميزانية = $8,000 - 400 = \\mathbf{7,600 \\text{ جنيه}}$.",
    "modelAnswer": "المخصص = $8,000 \\times 5\\% = \\mathbf{400 \\text{ جنيه}}$. صافي العملاء بـ الميزانية = $8,000 - 400 = \\mathbf{7,600 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 35 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 35,
      "concept": "س269 (ص 35 - مسألة 1)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-270",
    "sourceQuestionId": "b373-u7-270",
    "originalId": "b373-u7-270",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س270 (ص 35 - مسألة 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مخصص قديم 300ج، مخصص جديد 500ج. احسب التغير وأثره على الربح.",
    "correctAnswer": "التغير = $500 - 300 = \\mathbf{+200 \\text{ جنيه (زيادة)}}$. تسجل كـ مصروف بالدخل وتخفض صافي الربح بـ 200 جنيه.",
    "modelAnswer": "التغير = $500 - 300 = \\mathbf{+200 \\text{ جنيه (زيادة)}}$. تسجل كـ مصروف بالدخل وتخفض صافي الربح بـ 200 جنيه.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 35 - مسألة 2)",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 35,
      "concept": "س270 (ص 35 - مسألة 2)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-271",
    "sourceQuestionId": "b373-u7-271",
    "originalId": "b373-u7-271",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س271 (ص 35 - مسألة 3)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "عملاء 20,000ج، نسبة المخصص 10%. احسب المخصص والصافي.",
    "correctAnswer": "المخصص = $20,000 \\times 10\\% = \\mathbf{2,000 \\text{ جنيه}}$. صافي العملاء = $\\mathbf{18,000 \\text{ جنيه}}$.",
    "modelAnswer": "المخصص = $20,000 \\times 10\\% = \\mathbf{2,000 \\text{ جنيه}}$. صافي العملاء = $\\mathbf{18,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 35 - مسألة 3)",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 35,
      "concept": "س271 (ص 35 - مسألة 3)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-272",
    "sourceQuestionId": "b373-u7-272",
    "originalId": "b373-u7-272",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س272 (ص 35)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أثر انخفاض المخصص المطلوب على قائمة الدخل (يظهر كـ إيراد آخر يزود الربح).\n\n---",
    "correctAnswer": "أثر انخفاض المخصص المطلوب على قائمة الدخل (يظهر كـ إيراد آخر يزود الربح).\n\n---",
    "modelAnswer": "أثر انخفاض المخصص المطلوب على قائمة الدخل (يظهر كـ إيراد آخر يزود الربح).\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 35)",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 35,
      "concept": "س272 (ص 35)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-273",
    "sourceQuestionId": "b373-u7-273",
    "originalId": "b373-u7-273",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س273 (ص 35)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أثر انخفاض المخصص المطلوب على قائمة الدخل (يظهر كـ إيراد آخر يزود الربح).\n\n---",
    "correctAnswer": "أثر انخفاض المخصص المطلوب على قائمة الدخل (يظهر كـ إيراد آخر يزود الربح).\n\n---",
    "modelAnswer": "أثر انخفاض المخصص المطلوب على قائمة الدخل (يظهر كـ إيراد آخر يزود الربح).\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 35)",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 35,
      "concept": "س273 (ص 35)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-274",
    "sourceQuestionId": "b373-u7-274",
    "originalId": "b373-u7-274",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س274",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إهلاك المعدات السنوي = $40,000 \\div 5 = \\mathbf{8,000 \\text{ جنيه/سنة}}$.",
    "correctAnswer": "إهلاك المعدات السنوي = $40,000 \\div 5 = \\mathbf{8,000 \\text{ جنيه/سنة}}$.",
    "modelAnswer": "إهلاك المعدات السنوي = $40,000 \\div 5 = \\mathbf{8,000 \\text{ جنيه/سنة}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 36 – 37)",
    "sourceType": "official_textbook",
    "sourcePage": 36,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 36,
      "concept": "س274"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-275",
    "sourceQuestionId": "b373-u7-275",
    "originalId": "U7-Q19",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س275",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "نتيجة استبعاد الآلة = دفتري $10,000 - 6,000 = 4,000\\text{ج}$. ربح البيع = $5,000 - 4,000 = \\mathbf{1,000 \\text{ جنيه (ربح استبعاد)}}$.",
    "correctAnswer": "نتيجة استبعاد الآلة = دفتري $10,000 - 6,000 = 4,000\\text{ج}$. ربح البيع = $5,000 - 4,000 = \\mathbf{1,000 \\text{ جنيه (ربح استبعاد)}}$.",
    "modelAnswer": "نتيجة استبعاد الآلة = دفتري $10,000 - 6,000 = 4,000\\text{ج}$. ربح البيع = $5,000 - 4,000 = \\mathbf{1,000 \\text{ جنيه (ربح استبعاد)}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 36 – 37)",
    "sourceType": "official_textbook",
    "sourcePage": 36,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 36,
      "concept": "س275"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U7-Q19"
  },
  {
    "id": "b373-u7-276",
    "sourceQuestionId": "b373-u7-276",
    "originalId": "b373-u7-276",
    "lessonId": "lesson-7-1",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.1",
    "concept": "س276",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "المخصص الجديد = $12,000 \\times 5\\% = 600\\text{ج}$. زيادة المخصص = $600 - 400 = \\mathbf{200 \\text{ جنيه (مصروف يخفض الربح)}}$.\n\n---",
    "correctAnswer": "المخصص الجديد = $12,000 \\times 5\\% = 600\\text{ج}$. زيادة المخصص = $600 - 400 = \\mathbf{200 \\text{ جنيه (مصروف يخفض الربح)}}$.\n\n---",
    "modelAnswer": "المخصص الجديد = $12,000 \\times 5\\% = 600\\text{ج}$. زيادة المخصص = $600 - 400 = \\mathbf{200 \\text{ جنيه (مصروف يخفض الربح)}}$.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 36 – 37)",
    "sourceType": "official_textbook",
    "sourcePage": 36,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 36,
      "concept": "س276"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u7-277",
    "sourceQuestionId": "b373-u7-277",
    "originalId": "b373-u7-277",
    "lessonId": "lesson-7-4",
    "unitId": "unit-7",
    "learningObjectiveId": "LO-U7.4",
    "concept": "س277 المقال المحاسبي الشامل لـ الوحدة السابعة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة التالية في مقال تحليلي محكم: **\"هل تحسن التسويات المتعلقة بالإهلاك والمخصصات واستبعاد الأصول دقة وموثوقية القوائم المالية، أم أنها تدخل إليها قدراً من الذاتية والحكم الشخصي يقلل من يقين الأرقام؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالتسويات المتعلقة بالإهلاك والمخصصات واستبعاد الأصول تحسن دقة وموثوقية القوائم المالية بدرجة جوهرية، وتجعلها تعبر عن الواقع الاقتصادي الصادق، رغم أنها تدخل قدراً من الذاتية والحكم المهني الشخصي المنظم.\n\n2. التفسير والتعليل (4 درجات):\nلأن إعداد القوائم دون تسويات يضخم الأرباح والأصول بالباطل؛ وتعمل التسويات على تطبيق مبادئ المقابلة والحيطة والحذر للتعبير عن القيمة التحصيلية الحقيقية وتوزيع التكاليف، مع الاعتماد على تقديرات وافترضات مستقبلية لحساب هذه التسويات.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة السابعة (4 درجات):\n• الإهلاك: حساب القسط الثابت أو المتناقص يوزع تكلفة الأصل لمنع تحميل سنة الشراء بكامل النفقة، ولكنه يعتمد على تقدير شخصي للعمر الإنتاجي والقيمة التخريدية.\n• استبعاد الأصول: يحذف الأصل ومجمعه وتظهر نتيجة البيع بدقة عبر مقارنة سعر البيع بالقيمة الدفترية (كما في حالة حسن بـ ربح 1,000ج).\n• المخصصات: تكوين مخصص الديون المشكوك فيها (زيادة 200ج لحسن) يثبت الخسائر المتوقعة مبكراً تطبيقا للحيطة والحذر، ولكنه يستند لنسب تقديرية اجتهادية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض النقاد الماليين أن التقديرات المتبعة في الإهلاك والمخصصات تفتح باباً لـ الهندسة المالية وتعديل الأرباح؛ والرد المحاسبي أن الذاتية الموجهة بمعايير واضحة وسياسات ثابتة أفضل بآلاف المرات من \"الموثوقية الزائفة\" المترتبة على التجاهل التام للإهلاك والديون المشكوك فيها.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التسويات المحاسبية ضرورة حتمية لتحقيق التمثيل الصادق والعدالة المالية، وتصل إلى أعلى درجات المصداقية عند الالتزام بالثبات في السياسات والإفصاح التام عن التقديرات المحاسبية المتبعة.\n```\n\n---\n\n## 📘 الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nالتسويات المتعلقة بالإهلاك والمخصصات واستبعاد الأصول تحسن دقة وموثوقية القوائم المالية بدرجة جوهرية، وتجعلها تعبر عن الواقع الاقتصادي الصادق، رغم أنها تدخل قدراً من الذاتية والحكم المهني الشخصي المنظم.\n\n2. التفسير والتعليل (4 درجات):\nلأن إعداد القوائم دون تسويات يضخم الأرباح والأصول بالباطل؛ وتعمل التسويات على تطبيق مبادئ المقابلة والحيطة والحذر للتعبير عن القيمة التحصيلية الحقيقية وتوزيع التكاليف، مع الاعتماد على تقديرات وافترضات مستقبلية لحساب هذه التسويات.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة السابعة (4 درجات):\n• الإهلاك: حساب القسط الثابت أو المتناقص يوزع تكلفة الأصل لمنع تحميل سنة الشراء بكامل النفقة، ولكنه يعتمد على تقدير شخصي للعمر الإنتاجي والقيمة التخريدية.\n• استبعاد الأصول: يحذف الأصل ومجمعه وتظهر نتيجة البيع بدقة عبر مقارنة سعر البيع بالقيمة الدفترية (كما في حالة حسن بـ ربح 1,000ج).\n• المخصصات: تكوين مخصص الديون المشكوك فيها (زيادة 200ج لحسن) يثبت الخسائر المتوقعة مبكراً تطبيقا للحيطة والحذر، ولكنه يستند لنسب تقديرية اجتهادية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض النقاد الماليين أن التقديرات المتبعة في الإهلاك والمخصصات تفتح باباً لـ الهندسة المالية وتعديل الأرباح؛ والرد المحاسبي أن الذاتية الموجهة بمعايير واضحة وسياسات ثابتة أفضل بآلاف المرات من \"الموثوقية الزائفة\" المترتبة على التجاهل التام للإهلاك والديون المشكوك فيها.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التسويات المحاسبية ضرورة حتمية لتحقيق التمثيل الصادق والعدالة المالية، وتصل إلى أعلى درجات المصداقية عند الالتزام بالثبات في السياسات والإفصاح التام عن التقديرات المحاسبية المتبعة.\n```\n\n---\n\n## 📘 الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nالتسويات المتعلقة بالإهلاك والمخصصات واستبعاد الأصول تحسن دقة وموثوقية القوائم المالية بدرجة جوهرية، وتجعلها تعبر عن الواقع الاقتصادي الصادق، رغم أنها تدخل قدراً من الذاتية والحكم المهني الشخصي المنظم.\n\n2. التفسير والتعليل (4 درجات):\nلأن إعداد القوائم دون تسويات يضخم الأرباح والأصول بالباطل؛ وتعمل التسويات على تطبيق مبادئ المقابلة والحيطة والحذر للتعبير عن القيمة التحصيلية الحقيقية وتوزيع التكاليف، مع الاعتماد على تقديرات وافترضات مستقبلية لحساب هذه التسويات.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة السابعة (4 درجات):\n• الإهلاك: حساب القسط الثابت أو المتناقص يوزع تكلفة الأصل لمنع تحميل سنة الشراء بكامل النفقة، ولكنه يعتمد على تقدير شخصي للعمر الإنتاجي والقيمة التخريدية.\n• استبعاد الأصول: يحذف الأصل ومجمعه وتظهر نتيجة البيع بدقة عبر مقارنة سعر البيع بالقيمة الدفترية (كما في حالة حسن بـ ربح 1,000ج).\n• المخصصات: تكوين مخصص الديون المشكوك فيها (زيادة 200ج لحسن) يثبت الخسائر المتوقعة مبكراً تطبيقا للحيطة والحذر، ولكنه يستند لنسب تقديرية اجتهادية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض النقاد الماليين أن التقديرات المتبعة في الإهلاك والمخصصات تفتح باباً لـ الهندسة المالية وتعديل الأرباح؛ والرد المحاسبي أن الذاتية الموجهة بمعايير واضحة وسياسات ثابتة أفضل بآلاف المرات من \"الموثوقية الزائفة\" المترتبة على التجاهل التام للإهلاك والديون المشكوك فيها.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التسويات المحاسبية ضرورة حتمية لتحقيق التمثيل الصادق والعدالة المالية، وتصل إلى أعلى درجات المصداقية عند الالتزام بالثبات في السياسات والإفصاح التام عن التقديرات المحاسبية المتبعة.\n```\n\n---\n\n## 📘 الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 38,
    "sourceDocument": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 38,
      "concept": "س277 المقال المحاسبي الشامل لـ الوحدة السابعة (JRE)"
    },
    "tags": [
      "الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول غير المتداولة (الجزء الثاني ص 21 – 39)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة السابعة (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u8-278",
    "sourceQuestionId": "b373-u8-278",
    "originalId": "b373-u8-278",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س278 السؤال الجوهري للوحدة الثامنة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "كيف يُوزع الربح بعدالة بين الشركاء في شركات الأشخاص مع تفاوت رؤوس الأموال والجهد المباشر للإدارة؟",
    "correctAnswer": "بـ إبرام اتفاقية شراكة تحدد نسبة توزيع الأرباح والخسائر، وتتضمن تسويات عادلة: فائدة على رأس المال لمكافأة التفاوت الاستثماري، ورواتب/مكافآت للشركاء المديرين لمكافأة التفاوت في الجهد الإداري، ثم توزيع الربح المتبقي بالنسبة.",
    "modelAnswer": "بـ إبرام اتفاقية شراكة تحدد نسبة توزيع الأرباح والخسائر، وتتضمن تسويات عادلة: فائدة على رأس المال لمكافأة التفاوت الاستثماري، ورواتب/مكافآت للشركاء المديرين لمكافأة التفاوت في الجهد الإداري، ثم توزيع الربح المتبقي بالنسبة.",
    "explanation": "إعمال آليات التوزيع العادل لمنع النزاعات بين الملاك.",
    "sourceType": "official_textbook",
    "sourcePage": 40,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 40,
      "concept": "س278 السؤال الجوهري للوحدة الثامنة"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "الافتتاحية — أرباح وتسويات الشراكة.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u8-279",
    "sourceQuestionId": "b373-u8-279",
    "originalId": "b373-u8-279",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س279 حالة مقهى عمر ولينا ويوسف",
    "difficulty": "intermediate",
    "questionType": "concept",
    "bloomLevel": "application",
    "question": "استثمر عمر 100,000ج ولينا 50,000ج، ويعمل عمر بدوام كامل ولينا بدوام جزئي، وبلغ الربح 60,000ج. ثم رغب يوسف بـ الانضمام بعد نمو المقهى. كيف يعالج التوزيع والشهرة؟",
    "correctAnswer": "1) يخصص لعمر راتب لقاء دوامه الكامل وفائدة للشريكين على رأس المال، ويقسم المتبقي بالنسبة 2) تقيم الشهرة النامية وتوزع على عمر ولينا فقط قبل دخول يوسف تعويضاً لهما عن جهدهما السابق.",
    "modelAnswer": "1) يخصص لعمر راتب لقاء دوامه الكامل وفائدة للشريكين على رأس المال، ويقسم المتبقي بالنسبة 2) تقيم الشهرة النامية وتوزع على عمر ولينا فقط قبل دخول يوسف تعويضاً لهما عن جهدهما السابق.",
    "explanation": "حماية حقوق الشركاء المؤسسين ورعاية شروط عقد الشراكة.",
    "sourceType": "official_textbook",
    "sourcePage": 41,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 41,
      "concept": "س279 حالة مقهى عمر ولينا ويوسف"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "التوزيع العادل والشهرة عند انضمام شريك.",
      "دراسة حالة ميدانية."
    ]
  },
  {
    "id": "b373-u8-280",
    "sourceQuestionId": "b373-u8-280",
    "originalId": "b373-u8-280",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س280 (ص 42)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما عناصر اتفاقية الشراكة الأربعة الرئيسية؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "1) نسبة الأرباح والخسائر 2) فائدة رأس المال 3) رواتب الشركاء 4) شروط المسحوبات والحساب الجاري.",
    "modelAnswer": "1) نسبة الأرباح والخسائر 2) فائدة رأس المال 3) رواتب الشركاء 4) شروط المسحوبات والحساب الجاري.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 42)",
    "sourceType": "official_textbook",
    "sourcePage": 42,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 42,
      "concept": "س280 (ص 42)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-281",
    "sourceQuestionId": "b373-u8-281",
    "originalId": "b373-u8-281",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س281 (ص 42)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ماذا يحدث إذا لم تتضمن اتفاقية الشراكة نسبة محددة؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "تقسم الأرباح والخسائر **بالتساوي تماماً** بين جميع الشركاء بقوة القانون.",
    "modelAnswer": "تقسم الأرباح والخسائر **بالتساوي تماماً** بين جميع الشركاء بقوة القانون.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 42)",
    "sourceType": "official_textbook",
    "sourcePage": 42,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 42,
      "concept": "س281 (ص 42)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-282",
    "sourceQuestionId": "b373-u8-282",
    "originalId": "b373-u8-282",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س282 (ص 43 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح 45,000ج يوزع بين علي وعمر بنسبة (2 : 1). احسب نصيب كل منهما.",
    "correctAnswer": "علي = $\\left(\\frac{2}{3}\\right) \\times 45,000 = \\mathbf{30,000 \\text{ جنيه}}$. عمر = $\\left(\\frac{1}{3}\\right) \\times 45,000 = \\mathbf{15,000 \\text{ جنيه}}$.",
    "modelAnswer": "علي = $\\left(\\frac{2}{3}\\right) \\times 45,000 = \\mathbf{30,000 \\text{ جنيه}}$. عمر = $\\left(\\frac{1}{3}\\right) \\times 45,000 = \\mathbf{15,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 43 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 43,
      "concept": "س282 (ص 43 - مسألة 1)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-283",
    "sourceQuestionId": "b373-u8-283",
    "originalId": "b373-u8-283",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س283 (ص 43 - مسألة 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح 36,000ج يوزع بالتساوي بين سارة وسما.",
    "correctAnswer": "نصيب سارة = نصيب سما = $36,000 \\div 2 = \\mathbf{18,000 \\text{ جنيه لكل منهما}}$.",
    "modelAnswer": "نصيب سارة = نصيب سما = $36,000 \\div 2 = \\mathbf{18,000 \\text{ جنيه لكل منهما}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 43 - مسألة 2)",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 43,
      "concept": "س283 (ص 43 - مسألة 2)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-284",
    "sourceQuestionId": "b373-u8-284",
    "originalId": "b373-u8-284",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س284 (ص 43 - مسألة 3)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح 60,000ج بين 3 شركاء بنسبة (3 : 2 : 1).",
    "correctAnswer": "الشريك 1 = $\\mathbf{30,000\\text{ج}}$، الشريك 2 = $\\mathbf{20,000\\text{ج}}$، الشريك 3 = $\\mathbf{10,000\\text{ج}}$.",
    "modelAnswer": "الشريك 1 = $\\mathbf{30,000\\text{ج}}$، الشريك 2 = $\\mathbf{20,000\\text{ج}}$، الشريك 3 = $\\mathbf{10,000\\text{ج}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 43 - مسألة 3)",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 43,
      "concept": "س284 (ص 43 - مسألة 3)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-285",
    "sourceQuestionId": "b373-u8-285",
    "originalId": "b373-u8-285",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س285 (ص 43 - مسألة 4)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "خسارة 25,000ج بنسبة (4 : 1).",
    "correctAnswer": "الشريك الأول يتحمل = $\\mathbf{20,000 \\text{ جنيه خسارة}}$، الثاني يتحمل = $\\mathbf{5,000 \\text{ جنيه خسارة}}$.",
    "modelAnswer": "الشريك الأول يتحمل = $\\mathbf{20,000 \\text{ جنيه خسارة}}$، الثاني يتحمل = $\\mathbf{5,000 \\text{ جنيه خسارة}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 43 - مسألة 4)",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 43,
      "concept": "س285 (ص 43 - مسألة 4)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-286",
    "sourceQuestionId": "b373-u8-286",
    "originalId": "b373-u8-286",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س286 (ص 43)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "correctAnswer": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "modelAnswer": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 43)",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 43,
      "concept": "س286 (ص 43)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-287",
    "sourceQuestionId": "b373-u8-287",
    "originalId": "b373-u8-287",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س287 (ص 43)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "correctAnswer": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "modelAnswer": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 43)",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 43,
      "concept": "س287 (ص 43)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-288",
    "sourceQuestionId": "b373-u8-288",
    "originalId": "b373-u8-288",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س288 (ص 43)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "correctAnswer": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "modelAnswer": "مسائل النسبة ومبررات التفاوت في الحصص.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 43)",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 43,
      "concept": "س288 (ص 43)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-289",
    "sourceQuestionId": "b373-u8-289",
    "originalId": "b373-u8-289",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س289 (ص 44)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "لماذا لا تعد رواتب الشركاء من المصروفات التشغيلية للمنشأة؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "لأن الشريك مالك وليس موظفاً أجيراً، فراتبه توزيع داخلي للربح وليس نفقة تنقص الأرباح.",
    "modelAnswer": "لأن الشريك مالك وليس موظفاً أجيراً، فراتبه توزيع داخلي للربح وليس نفقة تنقص الأرباح.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 44)",
    "sourceType": "official_textbook",
    "sourcePage": 44,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 44,
      "concept": "س289 (ص 44)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-290",
    "sourceQuestionId": "b373-u8-290",
    "originalId": "eb-tac-001",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س290 (ص 46 - مسألة فائدة)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح 40,000ج، رأس مال أ 80,000ج، رأس مال ب 40,000ج، فائدة 10%، متبقي بالتساوي (1 : 1). احسب النهائي.",
    "correctAnswer": "فائدة أ = 8,000ج، فائدة ب = 4,000ج. متبقي الربح = $40,000 - 12,000 = 28,000\\text{ج}$ (لكل شريك 14,000ج). **إجمالي أ = $8,000 + 14,000 = \\mathbf{22,000 \\text{ جنيه}}$**. **إجمالي ب = $4,000 + 14,000 = \\mathbf{18,000 \\text{ جنيه}}$**.",
    "modelAnswer": "فائدة أ = 8,000ج، فائدة ب = 4,000ج. متبقي الربح = $40,000 - 12,000 = 28,000\\text{ج}$ (لكل شريك 14,000ج). **إجمالي أ = $8,000 + 14,000 = \\mathbf{22,000 \\text{ جنيه}}$**. **إجمالي ب = $4,000 + 14,000 = \\mathbf{18,000 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 46 - مسألة فائدة)",
    "sourceType": "official_textbook",
    "sourcePage": 46,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 46,
      "concept": "س290 (ص 46 - مسألة فائدة)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "eb-tac-001"
  },
  {
    "id": "b373-u8-291",
    "sourceQuestionId": "b373-u8-291",
    "originalId": "b373-u8-291",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س291 (ص 47 - مسألة راتب)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح 50,000ج، راتب أ 8,000ج، متبقي بنسبة (3 : 2).",
    "correctAnswer": "المتبقي = $50,000 - 8,000 = 42,000\\text{ج}$. نصيب أ متبقي = 25,200ج، نصيب ب متبقي = 16,800ج. **إجمالي أ = $8,000 + 25,200 = \\mathbf{33,200 \\text{ جنيه}}$**. **إجمالي ب = $\\mathbf{16,800 \\text{ جنيه}}$**.",
    "modelAnswer": "المتبقي = $50,000 - 8,000 = 42,000\\text{ج}$. نصيب أ متبقي = 25,200ج، نصيب ب متبقي = 16,800ج. **إجمالي أ = $8,000 + 25,200 = \\mathbf{33,200 \\text{ جنيه}}$**. **إجمالي ب = $\\mathbf{16,800 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 47 - مسألة راتب)",
    "sourceType": "official_textbook",
    "sourcePage": 47,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 47,
      "concept": "س291 (ص 47 - مسألة راتب)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-292",
    "sourceQuestionId": "b373-u8-292",
    "originalId": "b373-u8-292",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س292 (ص 47 - مسألة تراكمية)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح 70,000ج، رأس مال أ 100,000ج، رأس مال ب 50,000ج، فائدة 10%، راتب ب 10,000ج، متبقي بنسبة (2 : 1).",
    "correctAnswer": "تسويات = فائدة أ 10,000ج + فائدة ب 5,000ج + راتب ب 10,000ج = 25,000ج. متبقي الربح = $70,000 - 25,000 = 45,000\\text{ج}$ (أ 30,000ج ، ب 15,000ج). **إجمالي أ = $10,000 + 30,000 = \\mathbf{40,000 \\text{ جنيه}}$**. **إجمالي ب = $5,000 + 10,000 + 15,000 = \\mathbf{30,000 \\text{ جنيه}}$**.",
    "modelAnswer": "تسويات = فائدة أ 10,000ج + فائدة ب 5,000ج + راتب ب 10,000ج = 25,000ج. متبقي الربح = $70,000 - 25,000 = 45,000\\text{ج}$ (أ 30,000ج ، ب 15,000ج). **إجمالي أ = $10,000 + 30,000 = \\mathbf{40,000 \\text{ جنيه}}$**. **إجمالي ب = $5,000 + 10,000 + 15,000 = \\mathbf{30,000 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 47 - مسألة تراكمية)",
    "sourceType": "official_textbook",
    "sourcePage": 47,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 47,
      "concept": "س292 (ص 47 - مسألة تراكمية)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-293",
    "sourceQuestionId": "b373-u8-293",
    "originalId": "b373-u8-293",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س293 (ص 48)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "correctAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "modelAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 48)",
    "sourceType": "official_textbook",
    "sourcePage": 48,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 48,
      "concept": "س293 (ص 48)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-294",
    "sourceQuestionId": "b373-u8-294",
    "originalId": "b373-u8-294",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س294 (ص 48)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "correctAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "modelAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 48)",
    "sourceType": "official_textbook",
    "sourcePage": 48,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 48,
      "concept": "س294 (ص 48)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-295",
    "sourceQuestionId": "b373-u8-295",
    "originalId": "b373-u8-295",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س295 (ص 48)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "correctAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "modelAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 48)",
    "sourceType": "official_textbook",
    "sourcePage": 48,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 48,
      "concept": "س295 (ص 48)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-296",
    "sourceQuestionId": "b373-u8-296",
    "originalId": "b373-u8-296",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س296 (ص 48)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "correctAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "modelAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 48)",
    "sourceType": "official_textbook",
    "sourcePage": 48,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 48,
      "concept": "س296 (ص 48)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-297",
    "sourceQuestionId": "b373-u8-297",
    "originalId": "b373-u8-297",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س297 (ص 48)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "correctAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "modelAnswer": "مسائل التسويات التطبيقية الشاملة والتحدي الامتحاني.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 48)",
    "sourceType": "official_textbook",
    "sourcePage": 48,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 48,
      "concept": "س297 (ص 48)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-298",
    "sourceQuestionId": "b373-u8-298",
    "originalId": "b373-u8-298",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س298 (ص 49)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ماذا تمثل الشهرة في شركات الأشخاص ومتى تحسب؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "تمثل السمعة التجارية والأصول غير الملموسة المحققة لأرباح غير عادية، وتحسب عند تعديل العقد وانضمام أو انسحاب شريك.",
    "modelAnswer": "تمثل السمعة التجارية والأصول غير الملموسة المحققة لأرباح غير عادية، وتحسب عند تعديل العقد وانضمام أو انسحاب شريك.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 49)",
    "sourceType": "official_textbook",
    "sourcePage": 49,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 49,
      "concept": "س298 (ص 49)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-299",
    "sourceQuestionId": "b373-u8-299",
    "originalId": "b373-u8-299",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س299 (ص 50 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "شهرة 30,000ج تقسم بين أ وب بنسبة (2 : 1).",
    "correctAnswer": "نصيب أ = $\\mathbf{20,000 \\text{ جنيه}}$، نصيب ب = $\\mathbf{10,000 \\text{ جنيه}}$.",
    "modelAnswer": "نصيب أ = $\\mathbf{20,000 \\text{ جنيه}}$، نصيب ب = $\\mathbf{10,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 50 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 50,
      "concept": "س299 (ص 50 - مسألة 1)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-300",
    "sourceQuestionId": "b373-u8-300",
    "originalId": "b373-u8-300",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س300 (ص 50 - مسألة 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "شهرة 24,000ج بين 3 شركاء بنسبة (3 : 2 : 1).",
    "correctAnswer": "الشريك 1 = $\\mathbf{12,000\\text{ج}}$، الشريك 2 = $\\mathbf{8,000\\text{ج}}$، الشريك 3 = $\\mathbf{4,000\\text{ج}}$.",
    "modelAnswer": "الشريك 1 = $\\mathbf{12,000\\text{ج}}$، الشريك 2 = $\\mathbf{8,000\\text{ج}}$، الشريك 3 = $\\mathbf{4,000\\text{ج}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 50 - مسألة 2)",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 50,
      "concept": "س300 (ص 50 - مسألة 2)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-301",
    "sourceQuestionId": "b373-u8-301",
    "originalId": "b373-u8-301",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س301 (ص 50 - مسألة 3)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "شهرة 40,000ج تقسم بالتساوي بين أ وب قبل انضمام ج. لماذا لا يحصل ج على نصيب؟",
    "correctAnswer": "نصيب أ = ب = $\\mathbf{20,000 \\text{ جنيه لكل منهما}}$. لا يحصل ج على نصيب لأن الشهرة بنيت بجهود أ وب قبل دخوله.",
    "modelAnswer": "نصيب أ = ب = $\\mathbf{20,000 \\text{ جنيه لكل منهما}}$. لا يحصل ج على نصيب لأن الشهرة بنيت بجهود أ وب قبل دخوله.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 50 - مسألة 3)",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 50,
      "concept": "س301 (ص 50 - مسألة 3)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-302",
    "sourceQuestionId": "b373-u8-302",
    "originalId": "b373-u8-302",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س302 (ص 50)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الشهرة عند انسحاب شريك وتسويتها بحسابه الجاري.\n\n---",
    "correctAnswer": "الشهرة عند انسحاب شريك وتسويتها بحسابه الجاري.\n\n---",
    "modelAnswer": "الشهرة عند انسحاب شريك وتسويتها بحسابه الجاري.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 50)",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 50,
      "concept": "س302 (ص 50)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-303",
    "sourceQuestionId": "b373-u8-303",
    "originalId": "b373-u8-303",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س303 (ص 50)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الشهرة عند انسحاب شريك وتسويتها بحسابه الجاري.\n\n---",
    "correctAnswer": "الشهرة عند انسحاب شريك وتسويتها بحسابه الجاري.\n\n---",
    "modelAnswer": "الشهرة عند انسحاب شريك وتسويتها بحسابه الجاري.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 50)",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 50,
      "concept": "س303 (ص 50)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-304",
    "sourceQuestionId": "b373-u8-304",
    "originalId": "b373-u8-304",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س304",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إجمالي التسويات المباشرة = فائدة حسن 15,000ج + فائدة مريم 9,000ج + راتب حسن 15,000ج = **39,000 جنيه**.",
    "correctAnswer": "إجمالي التسويات المباشرة = فائدة حسن 15,000ج + فائدة مريم 9,000ج + راتب حسن 15,000ج = **39,000 جنيه**.",
    "modelAnswer": "إجمالي التسويات المباشرة = فائدة حسن 15,000ج + فائدة مريم 9,000ج + راتب حسن 15,000ج = **39,000 جنيه**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 51 – 53)",
    "sourceType": "official_textbook",
    "sourcePage": 51,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 51,
      "concept": "س304"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-305",
    "sourceQuestionId": "b373-u8-305",
    "originalId": "b373-u8-305",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س305",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "متبقي الربح وتوزيعه = $120,000 - 39,000 = 81,000\\text{ج}$. نصيب حسن متبقي = 54,000ج، نصيب مريم متبقي = 27,000ج.",
    "correctAnswer": "متبقي الربح وتوزيعه = $120,000 - 39,000 = 81,000\\text{ج}$. نصيب حسن متبقي = 54,000ج، نصيب مريم متبقي = 27,000ج.",
    "modelAnswer": "متبقي الربح وتوزيعه = $120,000 - 39,000 = 81,000\\text{ج}$. نصيب حسن متبقي = 54,000ج، نصيب مريم متبقي = 27,000ج.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 51 – 53)",
    "sourceType": "official_textbook",
    "sourcePage": 51,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 51,
      "concept": "س305"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-306",
    "sourceQuestionId": "b373-u8-306",
    "originalId": "b373-u8-306",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س306",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "التوزيع النهائي والأستفادة = **إجمالي حسن = $15,000 + 15,000 + 54,000 = \\mathbf{84,000 \\text{ جنيه}}$**. **إجمالي مريم = $9,000 + 27,000 = \\mathbf{36,000 \\text{ جنيه}}$**.",
    "correctAnswer": "التوزيع النهائي والأستفادة = **إجمالي حسن = $15,000 + 15,000 + 54,000 = \\mathbf{84,000 \\text{ جنيه}}$**. **إجمالي مريم = $9,000 + 27,000 = \\mathbf{36,000 \\text{ جنيه}}$**.",
    "modelAnswer": "التوزيع النهائي والأستفادة = **إجمالي حسن = $15,000 + 15,000 + 54,000 = \\mathbf{84,000 \\text{ جنيه}}$**. **إجمالي مريم = $9,000 + 27,000 = \\mathbf{36,000 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 51 – 53)",
    "sourceType": "official_textbook",
    "sourcePage": 51,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 51,
      "concept": "س306"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-307",
    "sourceQuestionId": "b373-u8-307",
    "originalId": "b373-u8-307",
    "lessonId": "lesson-8-1",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.1",
    "concept": "س307",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "توزيع الشهرة = نصيب حسن = $60,000 \\times \\left(\\frac{2}{3}\\right) = \\mathbf{40,000 \\text{ جنيه}}$، نصيب مريم = $\\mathbf{20,000 \\text{ جنيه}}$. يوسف = **صفر**.\n\n---",
    "correctAnswer": "توزيع الشهرة = نصيب حسن = $60,000 \\times \\left(\\frac{2}{3}\\right) = \\mathbf{40,000 \\text{ جنيه}}$، نصيب مريم = $\\mathbf{20,000 \\text{ جنيه}}$. يوسف = **صفر**.\n\n---",
    "modelAnswer": "توزيع الشهرة = نصيب حسن = $60,000 \\times \\left(\\frac{2}{3}\\right) = \\mathbf{40,000 \\text{ جنيه}}$، نصيب مريم = $\\mathbf{20,000 \\text{ جنيه}}$. يوسف = **صفر**.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 51 – 53)",
    "sourceType": "official_textbook",
    "sourcePage": 51,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 51,
      "concept": "س307"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u8-308",
    "sourceQuestionId": "b373-u8-308",
    "originalId": "b373-u8-308",
    "lessonId": "lesson-8-4",
    "unitId": "unit-8",
    "learningObjectiveId": "LO-U8.4",
    "concept": "س308 المقال المحاسبي الشامل لـ الوحدة الثامنة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة المحاسبية التالية في مقال تحليلي محكم: **\"هل تضمن عقود اتفاقيات الشراكة العدالة الكاملة في توزيع الأرباح والخسائر بين الشركاء، أم تُنتج نتائج قد تظل غير متساوية وتثير تحفضات في نظر بعض الشركاء؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nتضمن عقود واتفاقيات الشراكة قدراً عالياً ومقبولاً من العدالة والإنصاف التنظيمي والمحاسبي، لكنها قد تنتج نتائج غير متساوية بـ قيم الأرقام المطلقة بسبب التفاوت الفعلي بـ رأس المال والجهد والسمعة النامية.\n\n2. التفسير والتعليل (4 درجات):\nلأن اتفاقية الشراكة تضع قواعد مسبقة تمنع النزاع؛ فتُعوض التفاوت في رأس المال بـ (فائدة رأس المال)، وتُعوض التفاوت في الإدارة بـ (رواتب الشركاء)، وتُحافظ على الحقوق التراكمية عند انضمام شريك بـ (تقويم الشهرة) وتوزيع الربح المتبقي بالنسبة المحددة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثامنة (4 درجات):\n• التسويات المباشرة (حالة حسن ومريم): مكافأة حسن براتب (15,000ج) وفائدة (15,000ج) أنصفت عمله الإداري المباشر ورأسماله الأكبر قبل تقسيم المتبقي (81,000ج).\n• معالجة الشهرة: تخصيص كامل الشهرة (60,000ج) لحسن ومريم بنسبة (2 : 1) ومنع يوسف منها أنصف الحقوق التاريخية للشركاء القدامى.\n• استخدام الحسابات الجارية: يمنع تآكل رأس المال الأصلي ويضمن متابعة المسحوبات والأرباح بدقة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض الشركاء أن النتائج غير عادلة بسبب جمود العقود وثبات النسب مع تغير ظروف السوق وتفاوت التضحيات؛ والرد المحاسبي أن العقد المكتوب هو الإطار الوحيد الحامي للحقوق، ومسألة العدالة تُستكمل بـ مراجعة وتعديل العقد دورياً بالتراضي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن عقود الشراكة هي الأداة المثلى لتحقيق العدالة المحاسبية والحد من النزاعات، وتزداد فاعليتها بالشفافية، والالتزام بالتسويات الجردية، وتحديث بنود الشراكة عند تغيير الشركاء.\n```\n\n---\n\n## 📘 الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nتضمن عقود واتفاقيات الشراكة قدراً عالياً ومقبولاً من العدالة والإنصاف التنظيمي والمحاسبي، لكنها قد تنتج نتائج غير متساوية بـ قيم الأرقام المطلقة بسبب التفاوت الفعلي بـ رأس المال والجهد والسمعة النامية.\n\n2. التفسير والتعليل (4 درجات):\nلأن اتفاقية الشراكة تضع قواعد مسبقة تمنع النزاع؛ فتُعوض التفاوت في رأس المال بـ (فائدة رأس المال)، وتُعوض التفاوت في الإدارة بـ (رواتب الشركاء)، وتُحافظ على الحقوق التراكمية عند انضمام شريك بـ (تقويم الشهرة) وتوزيع الربح المتبقي بالنسبة المحددة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثامنة (4 درجات):\n• التسويات المباشرة (حالة حسن ومريم): مكافأة حسن براتب (15,000ج) وفائدة (15,000ج) أنصفت عمله الإداري المباشر ورأسماله الأكبر قبل تقسيم المتبقي (81,000ج).\n• معالجة الشهرة: تخصيص كامل الشهرة (60,000ج) لحسن ومريم بنسبة (2 : 1) ومنع يوسف منها أنصف الحقوق التاريخية للشركاء القدامى.\n• استخدام الحسابات الجارية: يمنع تآكل رأس المال الأصلي ويضمن متابعة المسحوبات والأرباح بدقة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض الشركاء أن النتائج غير عادلة بسبب جمود العقود وثبات النسب مع تغير ظروف السوق وتفاوت التضحيات؛ والرد المحاسبي أن العقد المكتوب هو الإطار الوحيد الحامي للحقوق، ومسألة العدالة تُستكمل بـ مراجعة وتعديل العقد دورياً بالتراضي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن عقود الشراكة هي الأداة المثلى لتحقيق العدالة المحاسبية والحد من النزاعات، وتزداد فاعليتها بالشفافية، والالتزام بالتسويات الجردية، وتحديث بنود الشراكة عند تغيير الشركاء.\n```\n\n---\n\n## 📘 الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nتضمن عقود واتفاقيات الشراكة قدراً عالياً ومقبولاً من العدالة والإنصاف التنظيمي والمحاسبي، لكنها قد تنتج نتائج غير متساوية بـ قيم الأرقام المطلقة بسبب التفاوت الفعلي بـ رأس المال والجهد والسمعة النامية.\n\n2. التفسير والتعليل (4 درجات):\nلأن اتفاقية الشراكة تضع قواعد مسبقة تمنع النزاع؛ فتُعوض التفاوت في رأس المال بـ (فائدة رأس المال)، وتُعوض التفاوت في الإدارة بـ (رواتب الشركاء)، وتُحافظ على الحقوق التراكمية عند انضمام شريك بـ (تقويم الشهرة) وتوزيع الربح المتبقي بالنسبة المحددة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة الثامنة (4 درجات):\n• التسويات المباشرة (حالة حسن ومريم): مكافأة حسن براتب (15,000ج) وفائدة (15,000ج) أنصفت عمله الإداري المباشر ورأسماله الأكبر قبل تقسيم المتبقي (81,000ج).\n• معالجة الشهرة: تخصيص كامل الشهرة (60,000ج) لحسن ومريم بنسبة (2 : 1) ومنع يوسف منها أنصف الحقوق التاريخية للشركاء القدامى.\n• استخدام الحسابات الجارية: يمنع تآكل رأس المال الأصلي ويضمن متابعة المسحوبات والأرباح بدقة.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض الشركاء أن النتائج غير عادلة بسبب جمود العقود وثبات النسب مع تغير ظروف السوق وتفاوت التضحيات؛ والرد المحاسبي أن العقد المكتوب هو الإطار الوحيد الحامي للحقوق، ومسألة العدالة تُستكمل بـ مراجعة وتعديل العقد دورياً بالتراضي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن عقود الشراكة هي الأداة المثلى لتحقيق العدالة المحاسبية والحد من النزاعات، وتزداد فاعليتها بالشفافية، والالتزام بالتسويات الجردية، وتحديث بنود الشراكة عند تغيير الشركاء.\n```\n\n---\n\n## 📘 الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 54,
    "sourceDocument": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 54,
      "concept": "س308 المقال المحاسبي الشامل لـ الوحدة الثامنة (JRE)"
    },
    "tags": [
      "الوحدة الثامنة: حسابات الشراكة وشركات الأشخاص (الجزء الثاني ص 40 – 57)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة الثامنة (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u9-309",
    "sourceQuestionId": "b373-u9-309",
    "originalId": "b373-u9-309",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س309 السؤال الجوهري للوحدة التاسعة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "كيف تقاس نتائج المنظمات ذات الأغراض المختلفة عندما لا يكون الربح هو الهدف؟ وكيف تعكس المحاسبة إدارة الموارد؟",
    "correctAnswer": "تقاس أهداف النجاح بحسب غرض المنظمة؛ فالشركات تقاس بالربح والتوزيعات النقدية للمساهمين، بينما تقاس المنظمات غير الهادفة للربح بـ مدى فاعلية الخدمات المقدمة للمجتمع وتحقيق الفائض المالي الموجه للتوسع الخدمي لا للتوزيع الشخصي.",
    "modelAnswer": "تقاس أهداف النجاح بحسب غرض المنظمة؛ فالشركات تقاس بالربح والتوزيعات النقدية للمساهمين، بينما تقاس المنظمات غير الهادفة للربح بـ مدى فاعلية الخدمات المقدمة للمجتمع وتحقيق الفائض المالي الموجه للتوسع الخدمي لا للتوزيع الشخصي.",
    "explanation": "المحاسبة أداة قياس مرنة تطوع القوائم والتقارير لتطابق الأهداف الإنشائية للكيانات.",
    "sourceType": "official_textbook",
    "sourcePage": 58,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 58,
      "concept": "س309 السؤال الجوهري للوحدة التاسعة"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "الافتتاحية — أهداف المنظمات القوائمية.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u9-310",
    "sourceQuestionId": "b373-u9-310",
    "originalId": "b373-u9-310",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س310 دراسة حالة نور والكيانين المختلفين",
    "difficulty": "intermediate",
    "questionType": "case",
    "bloomLevel": "application",
    "question": "لاحظت نور شركة تكنولوجيا تبيع أسهمًا للمستثمرين وتعلن ربحاً وتوزع أرباحاً، ونادياً رياضياً يجمع اشتراكات وتبرعات ويحسب فائضاً. فسر اختلاف القوائم والمستفيدين.",
    "correctAnswer": "الشركة تستهدف تعظيم ثروة المساهمين فتقيس الربح بـ قائمة الدخل وتخصصه، بينما النادي يستهدف خدمة الأعضاء فيعد حساب المقبوضات والمدفوعات وحساب الإيرادات والمصروفات لاستخراج الفائض وإعادت استثماره.",
    "modelAnswer": "الشركة تستهدف تعظيم ثروة المساهمين فتقيس الربح بـ قائمة الدخل وتخصصه، بينما النادي يستهدف خدمة الأعضاء فيعد حساب المقبوضات والمدفوعات وحساب الإيرادات والمصروفات لاستخراج الفائض وإعادت استثماره.",
    "explanation": "اختلاف الغرض يغير التبويب المحاسبي المعتمد ووسيلة قياس الأداء.",
    "sourceType": "official_textbook",
    "sourcePage": 58,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 58,
      "concept": "س310 دراسة حالة نور والكيانين المختلفين"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "التطبيق الميداني لفرق الهدف بين الشركات والجمعيات.",
      "دراسة حالة سياقية."
    ]
  },
  {
    "id": "b373-u9-311",
    "sourceQuestionId": "b373-u9-311",
    "originalId": "b373-u9-311",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س311 (ص 61)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "عرف الشركة ذات المسئولية المحدودة والمسئولية المحدودة للمساهم. \\\\(\\rightarrow\\\\)",
    "correctAnswer": "كيان مستقل يملكه مساهمون، وتتحدد مسئولية المساهم بمقدار استثماره بالأسهم دون مساس بثروته الشخصية.",
    "modelAnswer": "كيان مستقل يملكه مساهمون، وتتحدد مسئولية المساهم بمقدار استثماره بالأسهم دون مساس بثروته الشخصية.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 61)",
    "sourceType": "official_textbook",
    "sourcePage": 61,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 61,
      "concept": "س311 (ص 61)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-312",
    "sourceQuestionId": "b373-u9-312",
    "originalId": "b373-u9-312",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س312 (ص 61)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "صغ قانون حساب رأس مال الأسهم.",
    "correctAnswer": "القانون:** $$\\mathbf{\\text{رأس مال الأسهم} = \\text{عدد الأسهم} \\times \\text{القيمة الاسمية للسهم}}.$$",
    "modelAnswer": "القانون:** $$\\mathbf{\\text{رأس مال الأسهم} = \\text{عدد الأسهم} \\times \\text{القيمة الاسمية للسهم}}.$$",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 61)",
    "sourceType": "official_textbook",
    "sourcePage": 61,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 61,
      "concept": "س312 (ص 61)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-313",
    "sourceQuestionId": "b373-u9-313",
    "originalId": "b373-u9-313",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س313 (ص 63 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إصدار 5,000 سهم بقيمة اسمية 20ج للسهم. احسب رأس مال الأسهم.",
    "correctAnswer": "$5,000 \\times 20 = \\mathbf{100,000 \\text{ جنيه}}$.",
    "modelAnswer": "$5,000 \\times 20 = \\mathbf{100,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 63 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 63,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 63,
      "concept": "س313 (ص 63 - مسألة 1)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-314",
    "sourceQuestionId": "b373-u9-314",
    "originalId": "b373-u9-314",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س314 (ص 63 - مسألة 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح شركة 80,000ج وتوزيعات 30,000ج. احسب المبلغ الموزع والاحتياطي.",
    "correctAnswer": "التوزيعات النقدية = $\\mathbf{30,000 \\text{ جنيه}}$. الاحتياطي المتبقي = $80,000 - 30,000 = \\mathbf{50,000 \\text{ جنيه}}$.",
    "modelAnswer": "التوزيعات النقدية = $\\mathbf{30,000 \\text{ جنيه}}$. الاحتياطي المتبقي = $80,000 - 30,000 = \\mathbf{50,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 63 - مسألة 2)",
    "sourceType": "official_textbook",
    "sourcePage": 63,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 63,
      "concept": "س314 (ص 63 - مسألة 2)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-315",
    "sourceQuestionId": "b373-u9-315",
    "originalId": "U6-Q27",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س315 (ص 63 - مسألة 3)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "شركة لديها 10,000 سهم وتوزيعات السهم 2 جنيهات. احسب إجمالي التوزيعات.",
    "correctAnswer": "$10,000 \\times 2 = \\mathbf{20,000 \\text{ جنيه}}$.",
    "modelAnswer": "$10,000 \\times 2 = \\mathbf{20,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 63 - مسألة 3)",
    "sourceType": "official_textbook",
    "sourcePage": 63,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 63,
      "concept": "س315 (ص 63 - مسألة 3)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U6-Q27"
  },
  {
    "id": "b373-u9-316",
    "sourceQuestionId": "b373-u9-316",
    "originalId": "U5-Q10",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س316 (ص 63 - مسألة 4)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "رأس مال أسهم 200,000ج، ربح 60,000ج، توزيعات 25,000ج. احسب الاحتياطيات ونسبة الربح الموزع.",
    "correctAnswer": "الاحتياطيات = $60,000 - 25,000 = \\mathbf{35,000 \\text{ جنيه}}$. نسبة الموزع = $\\left(\\frac{25,000}{60,000}\\right) \\times 100 = \\mathbf{41.67\\%}$.",
    "modelAnswer": "الاحتياطيات = $60,000 - 25,000 = \\mathbf{35,000 \\text{ جنيه}}$. نسبة الموزع = $\\left(\\frac{25,000}{60,000}\\right) \\times 100 = \\mathbf{41.67\\%}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 63 - مسألة 4)",
    "sourceType": "official_textbook",
    "sourcePage": 63,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 63,
      "concept": "س316 (ص 63 - مسألة 4)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U5-Q10"
  },
  {
    "id": "b373-u9-317",
    "sourceQuestionId": "b373-u9-317",
    "originalId": "b373-u9-317",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س317 (ص 64)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "correctAnswer": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "modelAnswer": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 64)",
    "sourceType": "official_textbook",
    "sourcePage": 64,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 64,
      "concept": "س317 (ص 64)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-318",
    "sourceQuestionId": "b373-u9-318",
    "originalId": "b373-u9-318",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س318 (ص 64)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "correctAnswer": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "modelAnswer": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 64)",
    "sourceType": "official_textbook",
    "sourcePage": 64,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 64,
      "concept": "س318 (ص 64)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-319",
    "sourceQuestionId": "b373-u9-319",
    "originalId": "b373-u9-319",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س319 (ص 64)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "correctAnswer": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "modelAnswer": "مسائل المقارنة والتوزيعات الشاملة بين الشركة (أ) والشركة (ب).\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 64)",
    "sourceType": "official_textbook",
    "sourcePage": 64,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 64,
      "concept": "س319 (ص 64)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-320",
    "sourceQuestionId": "b373-u9-320",
    "originalId": "b373-u9-320",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س320 (ص 65)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ما المقصود بالأرباح المحتجزة وأين تظهر؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "هي الأرباح الصافية المتراكمة غير الموزعة المتبقية بالشركة لتأمين النمو، وتظهر بـ حقوق الملكية بـ المركز المالي.",
    "modelAnswer": "هي الأرباح الصافية المتراكمة غير الموزعة المتبقية بالشركة لتأمين النمو، وتظهر بـ حقوق الملكية بـ المركز المالي.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 65)",
    "sourceType": "official_textbook",
    "sourcePage": 65,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 65,
      "concept": "س320 (ص 65)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-321",
    "sourceQuestionId": "b373-u9-321",
    "originalId": "unified-u2-q27",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س321 (ص 66 - مسألة)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إيرادات 80,000ج، مصروفات 50,000ج، توزيعات 10,000ج. احسب الربح والأرباح المحتجزة.",
    "correctAnswer": "صافي الربح = $80,000 - 50,000 = \\mathbf{30,000 \\text{ جنيه}}$. الأرباح المحتجزة = $30,000 - 10,000 = \\mathbf{20,000 \\text{ جنيه}}$.",
    "modelAnswer": "صافي الربح = $80,000 - 50,000 = \\mathbf{30,000 \\text{ جنيه}}$. الأرباح المحتجزة = $30,000 - 10,000 = \\mathbf{20,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 66 - مسألة)",
    "sourceType": "official_textbook",
    "sourcePage": 66,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 66,
      "concept": "س321 (ص 66 - مسألة)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "unified-u2-q27"
  },
  {
    "id": "b373-u9-322",
    "sourceQuestionId": "b373-u9-322",
    "originalId": "U8-Q12",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س322 (ص 68 - مسألة ميزانية)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "أصول غير متداولة 150,000ج، أصول متداولة 50,000ج، خصوم 60,000ج، رأس مال أسهم 100,000ج. احسب الاحتياطيات.",
    "correctAnswer": "حقوق الملكية الكلية = $(150,000 + 50,000) - 60,000 = 140,000\\text{ج}$. **الاحتياطيات بـ الميزانية = $140,000 - 100,000 = \\mathbf{40,000 \\text{ جنيه}}$**.",
    "modelAnswer": "حقوق الملكية الكلية = $(150,000 + 50,000) - 60,000 = 140,000\\text{ج}$. **الاحتياطيات بـ الميزانية = $140,000 - 100,000 = \\mathbf{40,000 \\text{ جنيه}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 68 - مسألة ميزانية)",
    "sourceType": "official_textbook",
    "sourcePage": 68,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 68,
      "concept": "س322 (ص 68 - مسألة ميزانية)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ],
    "replacesQuestionId": "U8-Q12"
  },
  {
    "id": "b373-u9-323",
    "sourceQuestionId": "b373-u9-323",
    "originalId": "b373-u9-323",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س323 (ص 69)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "نسب التوزيع والاحتجاز التنافسية للشركات.\n\n---",
    "correctAnswer": "نسب التوزيع والاحتجاز التنافسية للشركات.\n\n---",
    "modelAnswer": "نسب التوزيع والاحتجاز التنافسية للشركات.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 69)",
    "sourceType": "official_textbook",
    "sourcePage": 69,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 69,
      "concept": "س323 (ص 69)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-324",
    "sourceQuestionId": "b373-u9-324",
    "originalId": "b373-u9-324",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س324 (ص 69)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "نسب التوزيع والاحتجاز التنافسية للشركات.\n\n---",
    "correctAnswer": "نسب التوزيع والاحتجاز التنافسية للشركات.\n\n---",
    "modelAnswer": "نسب التوزيع والاحتجاز التنافسية للشركات.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 69)",
    "sourceType": "official_textbook",
    "sourcePage": 69,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 69,
      "concept": "س324 (ص 69)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-325",
    "sourceQuestionId": "b373-u9-325",
    "originalId": "b373-u9-325",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س325 (ص 70)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "عرف حساب المقبوضات والمدفوعات وما أساسه؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "ملخص نقدي شامل لكافة المقبوضات والمدفوعات الفعلية خلال الفترة، ويعتمد على **الأساس النقدي الخالص**.",
    "modelAnswer": "ملخص نقدي شامل لكافة المقبوضات والمدفوعات الفعلية خلال الفترة، ويعتمد على **الأساس النقدي الخالص**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 70)",
    "sourceType": "official_textbook",
    "sourcePage": 70,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 70,
      "concept": "س325 (ص 70)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-326",
    "sourceQuestionId": "b373-u9-326",
    "originalId": "b373-u9-326",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س326 (ص 71 - مسألة 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مقبوضات اشتراكات 15,000ج وتبرعات 5,000ج. مدفوعات إيجار 6,000ج ومعدات 4,000ج. احسب الرصيد النقدي الختامي.",
    "correctAnswer": "إجمالي المقبوضات = 20,000ج، إجمالي المدفوعات = 10,000ج. **الرصيد النقدي الختامي = $20,000 - 10,000 = \\mathbf{10,000 \\text{ جنيه (مدين)}}$**.",
    "modelAnswer": "إجمالي المقبوضات = 20,000ج، إجمالي المدفوعات = 10,000ج. **الرصيد النقدي الختامي = $20,000 - 10,000 = \\mathbf{10,000 \\text{ جنيه (مدين)}}$**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 71 - مسألة 1)",
    "sourceType": "official_textbook",
    "sourcePage": 71,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 71,
      "concept": "س326 (ص 71 - مسألة 1)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-327",
    "sourceQuestionId": "b373-u9-327",
    "originalId": "b373-u9-327",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س327 (ص 74)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "عرف حساب الإيرادات والمصروفات وما أساسه؟ \\\\(\\rightarrow\\\\)",
    "correctAnswer": "حساب ختامي استحقاقي يختص بالفترة المالية فقط لقياس الأداء وإظهار الفائض أو العجز، ويعتمد **أساس الاستحقاق**.",
    "modelAnswer": "حساب ختامي استحقاقي يختص بالفترة المالية فقط لقياس الأداء وإظهار الفائض أو العجز، ويعتمد **أساس الاستحقاق**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 74)",
    "sourceType": "official_textbook",
    "sourcePage": 74,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 74,
      "concept": "س327 (ص 74)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-328",
    "sourceQuestionId": "b373-u9-328",
    "originalId": "b373-u9-328",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س328 (ص 75 - مسألة النادي المجتمعي)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مقبوضات اشتراكات 40,000ج (منها 5,000ج للسنة التالية)، تبرعات 10,000ج، مدفوعات إيجار 15,000ج، رواتب 20,000ج، معدات 5,000ج، مصروفات غير مدفوعة مستحقة 3,000ج. احسب الفائض.",
    "correctAnswer": "- الإيراد المعدل الاستحقاقي = $(40,000 - 5,000) + 10,000 = \\mathbf{45,000 \\text{ جنيه}}$.\n    - المصروف التشغيلي المعدل = $(15,000 + 20,000) + 3,000 = \\mathbf{38,000 \\text{ جنيه}}$ (شراء المعدات 5,000ج أصل رأسمالي يستبعد).\n    - **صافي الفائض الاستحقاقي** = $45,000 - 38,000 = \\mathbf{7,000 \\text{ جنيه (فائض حقيقي)}}$.",
    "modelAnswer": "- الإيراد المعدل الاستحقاقي = $(40,000 - 5,000) + 10,000 = \\mathbf{45,000 \\text{ جنيه}}$.\n    - المصروف التشغيلي المعدل = $(15,000 + 20,000) + 3,000 = \\mathbf{38,000 \\text{ جنيه}}$ (شراء المعدات 5,000ج أصل رأسمالي يستبعد).\n    - **صافي الفائض الاستحقاقي** = $45,000 - 38,000 = \\mathbf{7,000 \\text{ جنيه (فائض حقيقي)}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 75 - مسألة النادي المجتمعي)",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "س328 (ص 75 - مسألة النادي المجتمعي)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-329",
    "sourceQuestionId": "b373-u9-329",
    "originalId": "b373-u9-329",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س329 (ص 76-77)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "correctAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "modelAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 76-77)",
    "sourceType": "official_textbook",
    "sourcePage": 76,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 76,
      "concept": "س329 (ص 76-77)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-330",
    "sourceQuestionId": "b373-u9-330",
    "originalId": "b373-u9-330",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س330 (ص 76-77)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "correctAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "modelAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 76-77)",
    "sourceType": "official_textbook",
    "sourcePage": 76,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 76,
      "concept": "س330 (ص 76-77)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-331",
    "sourceQuestionId": "b373-u9-331",
    "originalId": "b373-u9-331",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س331 (ص 76-77)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "correctAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "modelAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 76-77)",
    "sourceType": "official_textbook",
    "sourcePage": 76,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 76,
      "concept": "س331 (ص 76-77)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-332",
    "sourceQuestionId": "b373-u9-332",
    "originalId": "b373-u9-332",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س332 (ص 76-77)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "correctAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "modelAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 76-77)",
    "sourceType": "official_textbook",
    "sourcePage": 76,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 76,
      "concept": "س332 (ص 76-77)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-333",
    "sourceQuestionId": "b373-u9-333",
    "originalId": "b373-u9-333",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س333 (ص 76-77)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "correctAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "modelAnswer": "تمارين التعديلات الجردية للاشتراكات والمصروفات المستحقة والمقدمة.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 76-77)",
    "sourceType": "official_textbook",
    "sourcePage": 76,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 76,
      "concept": "س333 (ص 76-77)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-334",
    "sourceQuestionId": "b373-u9-334",
    "originalId": "b373-u9-334",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س334",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "قارن بجدول بين حساب المقبوضات والمدفوعات وحساب الإيرادات والمصروفات.\n  * **الجدول:** المقبوضات والمدفوعات (أساس نقدي / حركة تدفقات / لا يعرض الأداء). الإيرادات والمصروفات (أساس استحقاق / تسويات جردية / يعرض الفائض أو العجز الصادق).",
    "correctAnswer": "قارن بجدول بين حساب المقبوضات والمدفوعات وحساب الإيرادات والمصروفات.\n  * **الجدول:** المقبوضات والمدفوعات (أساس نقدي / حركة تدفقات / لا يعرض الأداء). الإيرادات والمصروفات (أساس استحقاق / تسويات جردية / يعرض الفائض أو العجز الصادق).",
    "modelAnswer": "قارن بجدول بين حساب المقبوضات والمدفوعات وحساب الإيرادات والمصروفات.\n  * **الجدول:** المقبوضات والمدفوعات (أساس نقدي / حركة تدفقات / لا يعرض الأداء). الإيرادات والمصروفات (أساس استحقاق / تسويات جردية / يعرض الفائض أو العجز الصادق).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 77 – 78)",
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "س334"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-335",
    "sourceQuestionId": "b373-u9-335",
    "originalId": "b373-u9-335",
    "lessonId": "lesson-9-1",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.1",
    "concept": "س335",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تصنيف بنود اشتراكات مقدمة، شراء آلات، وتبرعات محصلة بـ القوائم غير الهادفة للربح.\n\n---",
    "correctAnswer": "تصنيف بنود اشتراكات مقدمة، شراء آلات، وتبرعات محصلة بـ القوائم غير الهادفة للربح.\n\n---",
    "modelAnswer": "تصنيف بنود اشتراكات مقدمة، شراء آلات، وتبرعات محصلة بـ القوائم غير الهادفة للربح.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 77 – 78)",
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "س335"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u9-336",
    "sourceQuestionId": "b373-u9-336",
    "originalId": "b373-u9-336",
    "lessonId": "lesson-9-6",
    "unitId": "unit-9",
    "learningObjectiveId": "LO-U9.6",
    "concept": "س336 المقال المحاسبي الشامل لـ الوحدة التاسعة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة المحاسبية التالية في مقال تحليلي محكم: **\"هل يُقاس النجاح المالي للكيانات على وجه أفضل بالربح كمقياس معيارى مطلق، أم بمدى فاعلية المنظمة في تحقيق غرضها الإنشائي المعتمد بـ عقدها؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nلا يُقاس النجاح المالي على وجه أفضل بالربح وحده كمعيار مطلق لكافة المنشآت؛ بل يُقاس النجاح بمدى فاعلية المنظمة في تحقيق غرضها المنسجم مع طبيعة تأسيسها وعقدها الرسمي.\n\n2. التفسير والتعليل (4 درجات):\nلأن طبيعة الغرض تحدد معايير القياس؛ فالشركات المحدودة تُنشأ لتعظيم ثروة المساهمين فتُقاس بالربح والتوزيعات والنمو، بينما تُنشأ المنظمات غير الهادفة للربح لتقديم خدمات مجتمعية فتقاس كفاءتها بحجم الأثر الخدمي وتحقيق الفائض المالي المستدام.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة التاسعة (4 درجات):\n• الشركات المحدودة: نجاحها يتجلى في كفاءة تخصيص الربح بين التوزيعات (مثل توزيع 24,000ج لحالة الشركة) ودعم الاحتياطيات (72,000ج) لضمان النمو.\n• المنظمات غير الهادفة للربح: نجاح النادي المجتمعي يقاس بتحقيق \"فائض حقيقي\" (7,000ج) عبر حساب الإيرادات والمصروفات المعدل استحقاقياً، لاستثماره في توسيع الخدمات لا لتوزيعه كأرباح شخصية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى البعض أن الربح هو المقياس الوحيد الموثوق والدقيق لجميع أنواع الكيانات؛ والرد المحاسبي أن تطبيق معيار الربح على المنظمات الخدمية يجردها من فلسفتها المجتمعية، والتقييم العادل يتطلب قياس الفائض المالي بالتوازي مع الأثر الاجتماعي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن المحاسبة نظام مرن يعكس غرض المنظمة؛ وعليه يكون الربح مقياس النجاح الأمثل للشركات التجاريّة، بينما يكون \"حجم الأثر والخدمة والفائض المستدام\" مقياس النجاح الأصدق للمنظمات غير الهادفة للربح.\n```\n\n---\n\n## 📘 الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nلا يُقاس النجاح المالي على وجه أفضل بالربح وحده كمعيار مطلق لكافة المنشآت؛ بل يُقاس النجاح بمدى فاعلية المنظمة في تحقيق غرضها المنسجم مع طبيعة تأسيسها وعقدها الرسمي.\n\n2. التفسير والتعليل (4 درجات):\nلأن طبيعة الغرض تحدد معايير القياس؛ فالشركات المحدودة تُنشأ لتعظيم ثروة المساهمين فتُقاس بالربح والتوزيعات والنمو، بينما تُنشأ المنظمات غير الهادفة للربح لتقديم خدمات مجتمعية فتقاس كفاءتها بحجم الأثر الخدمي وتحقيق الفائض المالي المستدام.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة التاسعة (4 درجات):\n• الشركات المحدودة: نجاحها يتجلى في كفاءة تخصيص الربح بين التوزيعات (مثل توزيع 24,000ج لحالة الشركة) ودعم الاحتياطيات (72,000ج) لضمان النمو.\n• المنظمات غير الهادفة للربح: نجاح النادي المجتمعي يقاس بتحقيق \"فائض حقيقي\" (7,000ج) عبر حساب الإيرادات والمصروفات المعدل استحقاقياً، لاستثماره في توسيع الخدمات لا لتوزيعه كأرباح شخصية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى البعض أن الربح هو المقياس الوحيد الموثوق والدقيق لجميع أنواع الكيانات؛ والرد المحاسبي أن تطبيق معيار الربح على المنظمات الخدمية يجردها من فلسفتها المجتمعية، والتقييم العادل يتطلب قياس الفائض المالي بالتوازي مع الأثر الاجتماعي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن المحاسبة نظام مرن يعكس غرض المنظمة؛ وعليه يكون الربح مقياس النجاح الأمثل للشركات التجاريّة، بينما يكون \"حجم الأثر والخدمة والفائض المستدام\" مقياس النجاح الأصدق للمنظمات غير الهادفة للربح.\n```\n\n---\n\n## 📘 الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nلا يُقاس النجاح المالي على وجه أفضل بالربح وحده كمعيار مطلق لكافة المنشآت؛ بل يُقاس النجاح بمدى فاعلية المنظمة في تحقيق غرضها المنسجم مع طبيعة تأسيسها وعقدها الرسمي.\n\n2. التفسير والتعليل (4 درجات):\nلأن طبيعة الغرض تحدد معايير القياس؛ فالشركات المحدودة تُنشأ لتعظيم ثروة المساهمين فتُقاس بالربح والتوزيعات والنمو، بينما تُنشأ المنظمات غير الهادفة للربح لتقديم خدمات مجتمعية فتقاس كفاءتها بحجم الأثر الخدمي وتحقيق الفائض المالي المستدام.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة التاسعة (4 درجات):\n• الشركات المحدودة: نجاحها يتجلى في كفاءة تخصيص الربح بين التوزيعات (مثل توزيع 24,000ج لحالة الشركة) ودعم الاحتياطيات (72,000ج) لضمان النمو.\n• المنظمات غير الهادفة للربح: نجاح النادي المجتمعي يقاس بتحقيق \"فائض حقيقي\" (7,000ج) عبر حساب الإيرادات والمصروفات المعدل استحقاقياً، لاستثماره في توسيع الخدمات لا لتوزيعه كأرباح شخصية.\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى البعض أن الربح هو المقياس الوحيد الموثوق والدقيق لجميع أنواع الكيانات؛ والرد المحاسبي أن تطبيق معيار الربح على المنظمات الخدمية يجردها من فلسفتها المجتمعية، والتقييم العادل يتطلب قياس الفائض المالي بالتوازي مع الأثر الاجتماعي.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن المحاسبة نظام مرن يعكس غرض المنظمة؛ وعليه يكون الربح مقياس النجاح الأمثل للشركات التجاريّة، بينما يكون \"حجم الأثر والخدمة والفائض المستدام\" مقياس النجاح الأصدق للمنظمات غير الهادفة للربح.\n```\n\n---\n\n## 📘 الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 78,
    "sourceDocument": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 78,
      "concept": "س336 المقال المحاسبي الشامل لـ الوحدة التاسعة (JRE)"
    },
    "tags": [
      "الوحدة التاسعة: الشركات ذات المسئولية المحدودة والمنظمات غير الهادفة للربح (الجزء الثاني ص 58 – 80)",
      "قضية التفسير المحاسبي الجوهرية لـ الوحدة التاسعة (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد."
    ]
  },
  {
    "id": "b373-u10-337",
    "sourceQuestionId": "b373-u10-337",
    "originalId": "b373-u10-337",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س337 السؤال الجوهري للوحدة العاشرة",
    "difficulty": "basic",
    "questionType": "essay",
    "bloomLevel": "comprehension",
    "question": "هل يستطيع التحليل المالي توجيه القرارات الاستثمارية توجيهاً آلياً حتمياً، أم يحتاج دائمًا لتفسير يتجاوز الأرقام؟",
    "correctAnswer": "لا يستطيع التحليل توجيه القرارات آلياً؛ فالأرقام توفر مؤشرات تاريخية، لكن القرار الصائب يتطلب تفسير النسب في سياقها، وفهم الطرق المحاسبية المتبعة، والنظر بـ المخاطر وظروف المنافسة الخارجية.",
    "modelAnswer": "لا يستطيع التحليل توجيه القرارات آلياً؛ فالأرقام توفر مؤشرات تاريخية، لكن القرار الصائب يتطلب تفسير النسب في سياقها، وفهم الطرق المحاسبية المتبعة، والنظر بـ المخاطر وظروف المنافسة الخارجية.",
    "explanation": "النسب المالية وسائل تشخيص واستشعار وليست قرارات نهائية مجردة.",
    "sourceType": "official_textbook",
    "sourcePage": 81,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 81,
      "concept": "س337 السؤال الجوهري للوحدة العاشرة"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "الافتتاحية — التحليل المالي وتفسير القوائم.",
      "سؤال مقالي رئيسي."
    ]
  },
  {
    "id": "b373-u10-338",
    "sourceQuestionId": "b373-u10-338",
    "originalId": "b373-u10-338",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س338 دراسة حالة أمير والمفاضلة بين الشركتين أ وب",
    "difficulty": "intermediate",
    "questionType": "case",
    "bloomLevel": "application",
    "question": "كُلّف أمير باختيار إحدى شركتين رابحتين للحصول على استثمار، وطلبت الإدارة تفسير معاني الأرقام. فحص أمير الأبعاد الثلاثة واكتشف اختلافات. كيف يوجه قرار الإدارة؟",
    "correctAnswer": "يوجه القرار بـ ربط أرقام الربحية (هامش مجمل وصافي الربح) بـ مستويات السيولة (نسبة التداول ورأس المال العامل) وبـ كفاءة التشغيل (دوران المخزون) لتحديد الشركة ذات النمو الأكثر أماناً واستقراراً.",
    "modelAnswer": "يوجه القرار بـ ربط أرقام الربحية (هامش مجمل وصافي الربح) بـ مستويات السيولة (نسبة التداول ورأس المال العامل) وبـ كفاءة التشغيل (دوران المخزون) لتحديد الشركة ذات النمو الأكثر أماناً واستقراراً.",
    "explanation": "التقييم المالي الشامل المعتمد على القراءة المتقاطعة للنسب المالية.",
    "sourceType": "official_textbook",
    "sourcePage": 81,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 81,
      "concept": "س338 دراسة حالة أمير والمفاضلة بين الشركتين أ وب"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "تحليل أبعاد الربحية والسيولة والكفاءة.",
      "دراسة حالة سياقية."
    ]
  },
  {
    "id": "b373-u10-339",
    "sourceQuestionId": "b373-u10-339",
    "originalId": "b373-u10-339",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س339 (ص 84)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "صغ قانون هامش مجمل الربح وهامش صافي الربح.",
    "correctAnswer": "$$\\mathbf{\\text{هامش مجمل الربح}} = \\left(\\frac{\\text{مجمل الربح}}{\\text{المبيعات}}\\right) \\times 100 \\quad, \\quad \\mathbf{\\text{هامش صافي الربح}} = \\left(\\frac{\\text{صافي الربح}}{\\text{المبيعات}}\\right) \\times 100.$$",
    "modelAnswer": "$$\\mathbf{\\text{هامش مجمل الربح}} = \\left(\\frac{\\text{مجمل الربح}}{\\text{المبيعات}}\\right) \\times 100 \\quad, \\quad \\mathbf{\\text{هامش صافي الربح}} = \\left(\\frac{\\text{صافي الربح}}{\\text{المبيعات}}\\right) \\times 100.$$",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 84)",
    "sourceType": "official_textbook",
    "sourcePage": 84,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 84,
      "concept": "س339 (ص 84)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-340",
    "sourceQuestionId": "b373-u10-340",
    "originalId": "b373-u10-340",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س340 (ص 85 - مسألة ربحية)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الشركة أ (مبيعات 200,000ج، تكلفة 120,000ج، مصروفات 50,000ج). الشركة ب (مبيعات 180,000ج، تكلفة 90,000ج، مصروفات 60,000ج). احسب النسب.",
    "correctAnswer": "- **الشركة أ:** مجمل ربح = 80,000ج (هامش 40%). صافي ربح = 30,000ج (هامش 15%).\n    - **الشركة ب:** مجمل ربح = 90,000ج (هامش 50%). صافي ربح = 30,000ج (هامش 16.7%).",
    "modelAnswer": "- **الشركة أ:** مجمل ربح = 80,000ج (هامش 40%). صافي ربح = 30,000ج (هامش 15%).\n    - **الشركة ب:** مجمل ربح = 90,000ج (هامش 50%). صافي ربح = 30,000ج (هامش 16.7%).",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 85 - مسألة ربحية)",
    "sourceType": "official_textbook",
    "sourcePage": 85,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 85,
      "concept": "س340 (ص 85 - مسألة ربحية)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-341",
    "sourceQuestionId": "b373-u10-341",
    "originalId": "b373-u10-341",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س341 (ص 87)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "صغ قانون نسبة التداول ورأس المال العامل.",
    "correctAnswer": "$$\\mathbf{\\text{نسبة التداول}} = \\frac{\\text{الأصول المتداولة}}{\\text{الالتزامات المتداولة}} \\quad, \\quad \\mathbf{\\text{رأس المال العامل}} = \\text{الأصول المتداولة} - \\text{الالتزامات المتداولة}.$$",
    "modelAnswer": "$$\\mathbf{\\text{نسبة التداول}} = \\frac{\\text{الأصول المتداولة}}{\\text{الالتزامات المتداولة}} \\quad, \\quad \\mathbf{\\text{رأس المال العامل}} = \\text{الأصول المتداولة} - \\text{الالتزامات المتداولة}.$$",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 87)",
    "sourceType": "official_textbook",
    "sourcePage": 87,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 87,
      "concept": "س341 (ص 87)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-342",
    "sourceQuestionId": "b373-u10-342",
    "originalId": "b373-u10-342",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س342 (ص 88 - مسألة سيولة)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الشركة أ (أصول متداولة 80,000ج، التزامات متداولة 70,000ج). الشركة ب (أصول متداولة 60,000ج، التزامات متداولة 30,000ج). احسب السيولة.",
    "correctAnswer": "- **الشركة أ:** نسبة تداول = $\\frac{80,000}{70,000} = \\mathbf{1.14 \\text{ مرة}}$. رأس مال عامل = $\\mathbf{10,000 \\text{ جنيه}}$.\n    - **الشركة ب:** نسبة تداول = $\\frac{60,000}{30,000} = \\mathbf{2.00 \\text{ مرة}}$. رأس مال عامل = $\\mathbf{30,000 \\text{ جنيه}}$.\n    - **التفسير:** **الشركة (ب) أكثر أماناً وسيولة بدرجة قاطعة (2:1)**.",
    "modelAnswer": "- **الشركة أ:** نسبة تداول = $\\frac{80,000}{70,000} = \\mathbf{1.14 \\text{ مرة}}$. رأس مال عامل = $\\mathbf{10,000 \\text{ جنيه}}$.\n    - **الشركة ب:** نسبة تداول = $\\frac{60,000}{30,000} = \\mathbf{2.00 \\text{ مرة}}$. رأس مال عامل = $\\mathbf{30,000 \\text{ جنيه}}$.\n    - **التفسير:** **الشركة (ب) أكثر أماناً وسيولة بدرجة قاطعة (2:1)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 88 - مسألة سيولة)",
    "sourceType": "official_textbook",
    "sourcePage": 88,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 88,
      "concept": "س342 (ص 88 - مسألة سيولة)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-343",
    "sourceQuestionId": "b373-u10-343",
    "originalId": "b373-u10-343",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س343 (ص 90)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "صغ قانون معدل دوران المخزون وفترة الاحتفاظ بالمخزون.",
    "correctAnswer": "$$\\mathbf{\\text{دوران المخزون}} = \\frac{\\text{تكلفة المبيعات}}{\\text{المخزون}} \\quad, \\quad \\mathbf{\\text{فترة الاحتفاظ (بالأيام)}} = \\left(\\frac{\\text{المخزون}}{\\text{تكلفة المبيعات}}\\right) \\times 365.$$",
    "modelAnswer": "$$\\mathbf{\\text{دوران المخزون}} = \\frac{\\text{تكلفة المبيعات}}{\\text{المخزون}} \\quad, \\quad \\mathbf{\\text{فترة الاحتفاظ (بالأيام)}} = \\left(\\frac{\\text{المخزون}}{\\text{تكلفة المبيعات}}\\right) \\times 365.$$",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 90)",
    "sourceType": "official_textbook",
    "sourcePage": 90,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 90,
      "concept": "س343 (ص 90)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-344",
    "sourceQuestionId": "b373-u10-344",
    "originalId": "b373-u10-344",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س344 (ص 91 - مسألة كفاءة)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الشركة أ (تكلفة مبيعات 120,000ج، مخزون 40,000ج). الشركة ب (تكلفة مبيعات 90,000ج، مخزون 20,000ج). احسب الكفاءة.",
    "correctAnswer": "- **الشركة أ:** دوران المخزون = $\\frac{120,000}{40,000} = \\mathbf{3 \\text{ مرات}}$. فترة الاحتفاظ = $\\mathbf{121.7 \\text{ يوماً}}$.\n    - **الشركة ب:** دوران المخزون = $\\frac{90,000}{20,000} = \\mathbf{4.5 \\text{ مرة}}$. فترة الاحتفاظ = $\\mathbf{81.1 \\text{ يوماً}}$.\n    - **التفسير:** **الشركة (ب) أسرع وأكثر كفاءة بـ تصريف المخزون بـ 81 يوماً**.",
    "modelAnswer": "- **الشركة أ:** دوران المخزون = $\\frac{120,000}{40,000} = \\mathbf{3 \\text{ مرات}}$. فترة الاحتفاظ = $\\mathbf{121.7 \\text{ يوماً}}$.\n    - **الشركة ب:** دوران المخزون = $\\frac{90,000}{20,000} = \\mathbf{4.5 \\text{ مرة}}$. فترة الاحتفاظ = $\\mathbf{81.1 \\text{ يوماً}}$.\n    - **التفسير:** **الشركة (ب) أسرع وأكثر كفاءة بـ تصريف المخزون بـ 81 يوماً**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 91 - مسألة كفاءة)",
    "sourceType": "official_textbook",
    "sourcePage": 91,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 91,
      "concept": "س344 (ص 91 - مسألة كفاءة)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-345",
    "sourceQuestionId": "b373-u10-345",
    "originalId": "b373-u10-345",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س345 (ص 92-93)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "correctAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "modelAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 92-93)",
    "sourceType": "official_textbook",
    "sourcePage": 92,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 92,
      "concept": "س345 (ص 92-93)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-346",
    "sourceQuestionId": "b373-u10-346",
    "originalId": "b373-u10-346",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س346 (ص 92-93)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "correctAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "modelAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 92-93)",
    "sourceType": "official_textbook",
    "sourcePage": 92,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 92,
      "concept": "س346 (ص 92-93)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-347",
    "sourceQuestionId": "b373-u10-347",
    "originalId": "b373-u10-347",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س347 (ص 92-93)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "correctAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "modelAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 92-93)",
    "sourceType": "official_textbook",
    "sourcePage": 92,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 92,
      "concept": "س347 (ص 92-93)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-348",
    "sourceQuestionId": "b373-u10-348",
    "originalId": "b373-u10-348",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س348 (ص 92-93)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "correctAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "modelAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 92-93)",
    "sourceType": "official_textbook",
    "sourcePage": 92,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 92,
      "concept": "س348 (ص 92-93)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-349",
    "sourceQuestionId": "b373-u10-349",
    "originalId": "b373-u10-349",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س349 (ص 92-93)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "correctAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "modelAnswer": "حد حدود النسب الماليّة والحالة الشاملة المتكاملة للمفاضلة بين الشركتين أ وب.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 92-93)",
    "sourceType": "official_textbook",
    "sourcePage": 92,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 92,
      "concept": "س349 (ص 92-93)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-350",
    "sourceQuestionId": "b373-u10-350",
    "originalId": "b373-u10-350",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س350 (الفحص السريع 1)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الغرض من قائمة الدخل",
    "correctAnswer": "قياس نتيجة أداء النشاط المالي الصافي من ربح أو خسارة عن الفترة.",
    "modelAnswer": "قياس نتيجة أداء النشاط المالي الصافي من ربح أو خسارة عن الفترة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س350 (الفحص السريع 1)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-351",
    "sourceQuestionId": "b373-u10-351",
    "originalId": "b373-u10-351",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س351 (الفحص السريع 2)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الفرق بين المصروف الرأسمالي والإيرادي",
    "correctAnswer": "الرأسمالي يزود الطاقة الإنتاجية للأصل ويكبتل بالمركز المالي، والإيرادي نفقة دورية صيانة تدرج بالدخل.",
    "modelAnswer": "الرأسمالي يزود الطاقة الإنتاجية للأصل ويكبتل بالمركز المالي، والإيرادي نفقة دورية صيانة تدرج بالدخل.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س351 (الفحص السريع 2)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-352",
    "sourceQuestionId": "b373-u10-352",
    "originalId": "b373-u10-352",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س352 (الفحص السريع 3)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "سبب احتساب الإهلاك",
    "correctAnswer": "توزيع تكلفة الأصل غير المتداول على سنوات عمره الإنتاجي تطبيقا للمقابلة.",
    "modelAnswer": "توزيع تكلفة الأصل غير المتداول على سنوات عمره الإنتاجي تطبيقا للمقابلة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س352 (الفحص السريع 3)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-353",
    "sourceQuestionId": "b373-u10-353",
    "originalId": "b373-u10-353",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س353 (الفحص السريع 4)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "فائدة حسابات المراقبة",
    "correctAnswer": "إحكام السيطرة والرقابة الإجمالية على حسابات الأستاذ الفرعية وتوفير مطابقة محايدة.",
    "modelAnswer": "إحكام السيطرة والرقابة الإجمالية على حسابات الأستاذ الفرعية وتوفير مطابقة محايدة.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س353 (الفحص السريع 4)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-354",
    "sourceQuestionId": "b373-u10-354",
    "originalId": "b373-u10-354",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س354 (الفحص السريع 5)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "سبب مخصص الديون المشكوك فيها",
    "correctAnswer": "التحوط ضد الخسائر المتوقعة بعجز بعض العملاء تطبيقا للحيطة والحذر.",
    "modelAnswer": "التحوط ضد الخسائر المتوقعة بعجز بعض العملاء تطبيقا للحيطة والحذر.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س354 (الفحص السريع 5)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-355",
    "sourceQuestionId": "b373-u10-355",
    "originalId": "b373-u10-355",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س355 (مسألة القوائم ص 98)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "مبيعات 250,000ج، تكلفة 150,000ج، مصروفات 60,000ج. احسب مجمل وصافي الربح.",
    "correctAnswer": "مجمل الربح = **100,000ج**، صافي الربح = **40,000ج**.",
    "modelAnswer": "مجمل الربح = **100,000ج**، صافي الربح = **40,000ج**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س355 (مسألة القوائم ص 98)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-356",
    "sourceQuestionId": "b373-u10-356",
    "originalId": "b373-u10-356",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س356 (مسألة الإهلاك ص 98)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "تكلفة 30,000ج، تخريدية 6,000ج، عمر 6 سنوات. احسب القيمة الدفترية بعد سنتين.",
    "correctAnswer": "القابل للإهلاك = 24,000ج، الإهلاك السنوي = 4,000ج، الدفتري بعد سنتين = $30,000 - 8,000 = \\mathbf{22,000 \\text{ جنيه}}$.",
    "modelAnswer": "القابل للإهلاك = 24,000ج، الإهلاك السنوي = 4,000ج، الدفتري بعد سنتين = $30,000 - 8,000 = \\mathbf{22,000 \\text{ جنيه}}$.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س356 (مسألة الإهلاك ص 98)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-357",
    "sourceQuestionId": "b373-u10-357",
    "originalId": "b373-u10-357",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س357 (مسألة الشركات ص 99)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "ربح 120,000ج، توزيعات 50,000ج. احسب الاحتياطي ونسبة التوزيع.",
    "correctAnswer": "أرباح محتجزة = **70,000ج**، نسبة التوزيع = **41.67%**.",
    "modelAnswer": "أرباح محتجزة = **70,000ج**، نسبة التوزيع = **41.67%**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س357 (مسألة الشركات ص 99)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-358",
    "sourceQuestionId": "b373-u10-358",
    "originalId": "b373-u10-358",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س358 (مسألة النسب المجمعة ص 99)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "إيرادات 200,000ج، مجمل ربح 80,000ج، صافي ربح 40,000ج، أصول متداولة 100,000ج، التزامات متداولة 50,000ج. احسب النسب.",
    "correctAnswer": "هامش مجمل = **40%**، هامش صافي = **20%**، نسبة التداول = **2:1 (مرتان)**.",
    "modelAnswer": "هامش مجمل = **40%**، هامش صافي = **20%**، نسبة التداول = **2:1 (مرتان)**.",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 97 – 102)",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "س358 (مسألة النسب المجمعة ص 99)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-359",
    "sourceQuestionId": "b373-u10-359",
    "originalId": "b373-u10-359",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س359 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س359 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-360",
    "sourceQuestionId": "b373-u10-360",
    "originalId": "b373-u10-360",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س360 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س360 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-361",
    "sourceQuestionId": "b373-u10-361",
    "originalId": "b373-u10-361",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س361 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س361 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-362",
    "sourceQuestionId": "b373-u10-362",
    "originalId": "b373-u10-362",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س362 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س362 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-363",
    "sourceQuestionId": "b373-u10-363",
    "originalId": "b373-u10-363",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س363 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س363 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-364",
    "sourceQuestionId": "b373-u10-364",
    "originalId": "b373-u10-364",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س364 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س364 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-365",
    "sourceQuestionId": "b373-u10-365",
    "originalId": "b373-u10-365",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س365 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س365 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-366",
    "sourceQuestionId": "b373-u10-366",
    "originalId": "b373-u10-366",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س366 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س366 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-367",
    "sourceQuestionId": "b373-u10-367",
    "originalId": "b373-u10-367",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س367 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س367 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-368",
    "sourceQuestionId": "b373-u10-368",
    "originalId": "b373-u10-368",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س368 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س368 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-369",
    "sourceQuestionId": "b373-u10-369",
    "originalId": "b373-u10-369",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س369 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س369 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-370",
    "sourceQuestionId": "b373-u10-370",
    "originalId": "b373-u10-370",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س370 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س370 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-371",
    "sourceQuestionId": "b373-u10-371",
    "originalId": "b373-u10-371",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س371 (ص 100-102)",
    "difficulty": "intermediate",
    "questionType": "applied",
    "bloomLevel": "application",
    "question": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "correctAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "modelAnswer": "الحالات الميدانية الشاملة وتحديات المفاضلة الفورية.\n\n---",
    "explanation": "ضمن التطبيقات والمسائل المعتمدة لدرس:  (ص 100-102)",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "س371 (ص 100-102)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "",
      "تطبيقي / حسابي"
    ]
  },
  {
    "id": "b373-u10-372",
    "sourceQuestionId": "b373-u10-372",
    "originalId": "b373-u10-372",
    "lessonId": "lesson-10-1",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.1",
    "concept": "س372 مسرد المصطلحات المحاسبية الرسمي المعتمد (17 مصطلحاً)",
    "difficulty": "basic",
    "questionType": "concept",
    "bloomLevel": "knowledge",
    "question": "مسرد المصطلحات المحاسبية الرسمي المعتمد (17 مصطلحاً)",
    "correctAnswer": "1. **Accounting Equation (المعادلة المحاسبية):** $\\text{الأصول} = \\text{الالتزامات} + \\text{حقوق الملكية}$.\n  2. **Double-Entry System (نظام القيد المزدوج):** نظام يثبت طرفين متساويين (مدين ودائن) لكل معاملة مالية.\n  3. **Trial Balance (ميزان المراجعة):** كشف يجمع أسماء وأرصدة الحسابات لاختبار التوازن الرياضي.\n  4. **Accrual Basis (أساس الاستحقاق):** اعتراف بالإيراد والمصروف فور الاستحقاق ارتبط بدفع نقدي أم لا.\n  5. **Income Statement (قائمة الدخل):** تقرير يقيس نتيجة أداء النشاط من ربح أو خسارة عن فترة زمنية.\n  6. **Statement of Financial Position (قائمة المركز المالي/الميزانية):** بيان مالي يظهر أصول المنشأة والتزاماتها وحقوق ملكيتها في تاريخ معين.\n  7. **Depreciation (الإهلاك):** التوزيع المنتظم لتكلفة الأصل غير المتداول على سنوات عمره الإنتاجي.\n  8. **Provision for Doubtful Debts (مخصص الديون المشكوك فيها):** احتياطي يجنب للتحوط ضد خسائر عدم تحصيل بعض الديون.\n  9. **Control Accounts (حسابات المراقبة):** حسابات إجمالية تفرد بالأستاذ العام لمطابقة مجموع السجلات الفرعية.\n  10. **Bank Reconciliation Statement (مذكرة تسوية البنك):** كشف يفسر الفروق بين رصيد النقدية بالدفاتر ورصيد كشف الحساب البنكي.\n  11. **Partnership Agreement (اتفاقية الشراكة):** عقد قانوني يحدد قواعد توزيع الأرباح والمسحوبات والرواتب بين الشركاء.\n  12. **Goodwill (الشهرة):** أصل غير ملموس يعكس السمعة والقوة الإيرادية الفائقة للمنشأة.\n  13. **Retained Earnings (الأرباح المحتجزة):** جزء الأرباح الصافية غير الموزع والمحتفظ به لدعم النمو.\n  14. **Limited Liability (المسئولية المحدودة):** تحديد مسئولية المساهم بمقدار حصته في الأسهم دون المساس بأمواله الشخصية.\n  15. **Receipts and Payments Account (حساب المقبوضات والمدفوعات):** ملخص حركة النقدية الخالصة بـ الكيانات غير الهادفة للربح.\n  16. **Income and Expenditure Account (حساب الإيرادات والمصروفات):** حساب ختامي استحقاقي يظهر الفائض أو العجز المالي بالمنظمات الخدمية.\n  17. **Current Ratio (نسبة التداول):** نسبة تقيس السيولة والقدرة على سداد الديون قصيرة الأجل (الأصول المتداولة / الالتزامات المتداولة).\n\n---",
    "modelAnswer": "1. **Accounting Equation (المعادلة المحاسبية):** $\\text{الأصول} = \\text{الالتزامات} + \\text{حقوق الملكية}$.\n  2. **Double-Entry System (نظام القيد المزدوج):** نظام يثبت طرفين متساويين (مدين ودائن) لكل معاملة مالية.\n  3. **Trial Balance (ميزان المراجعة):** كشف يجمع أسماء وأرصدة الحسابات لاختبار التوازن الرياضي.\n  4. **Accrual Basis (أساس الاستحقاق):** اعتراف بالإيراد والمصروف فور الاستحقاق ارتبط بدفع نقدي أم لا.\n  5. **Income Statement (قائمة الدخل):** تقرير يقيس نتيجة أداء النشاط من ربح أو خسارة عن فترة زمنية.\n  6. **Statement of Financial Position (قائمة المركز المالي/الميزانية):** بيان مالي يظهر أصول المنشأة والتزاماتها وحقوق ملكيتها في تاريخ معين.\n  7. **Depreciation (الإهلاك):** التوزيع المنتظم لتكلفة الأصل غير المتداول على سنوات عمره الإنتاجي.\n  8. **Provision for Doubtful Debts (مخصص الديون المشكوك فيها):** احتياطي يجنب للتحوط ضد خسائر عدم تحصيل بعض الديون.\n  9. **Control Accounts (حسابات المراقبة):** حسابات إجمالية تفرد بالأستاذ العام لمطابقة مجموع السجلات الفرعية.\n  10. **Bank Reconciliation Statement (مذكرة تسوية البنك):** كشف يفسر الفروق بين رصيد النقدية بالدفاتر ورصيد كشف الحساب البنكي.\n  11. **Partnership Agreement (اتفاقية الشراكة):** عقد قانوني يحدد قواعد توزيع الأرباح والمسحوبات والرواتب بين الشركاء.\n  12. **Goodwill (الشهرة):** أصل غير ملموس يعكس السمعة والقوة الإيرادية الفائقة للمنشأة.\n  13. **Retained Earnings (الأرباح المحتجزة):** جزء الأرباح الصافية غير الموزع والمحتفظ به لدعم النمو.\n  14. **Limited Liability (المسئولية المحدودة):** تحديد مسئولية المساهم بمقدار حصته في الأسهم دون المساس بأمواله الشخصية.\n  15. **Receipts and Payments Account (حساب المقبوضات والمدفوعات):** ملخص حركة النقدية الخالصة بـ الكيانات غير الهادفة للربح.\n  16. **Income and Expenditure Account (حساب الإيرادات والمصروفات):** حساب ختامي استحقاقي يظهر الفائض أو العجز المالي بالمنظمات الخدمية.\n  17. **Current Ratio (نسبة التداول):** نسبة تقيس السيولة والقدرة على سداد الديون قصيرة الأجل (الأصول المتداولة / الالتزامات المتداولة).\n\n---",
    "explanation": "1. **Accounting Equation (المعادلة المحاسبية):** $\\text{الأصول} = \\text{الالتزامات} + \\text{حقوق الملكية}$.\n  2. **Double-Entry System (نظام القيد المزدوج):** نظام يثبت طرفين متساويين (مدين ودائن) لكل معاملة مالية.\n  3. **Trial Balance (ميزان المراجعة):** كشف يجمع أسماء وأرصدة الحسابات لاختبار التوازن الرياضي.\n  4. **Accrual Basis (أساس الاستحقاق):** اعتراف بالإيراد والمصروف فور الاستحقاق ارتبط بدفع نقدي أم لا.\n  5. **Income Statement (قائمة الدخل):** تقرير يقيس نتيجة أداء النشاط من ربح أو خسارة عن فترة زمنية.\n  6. **Statement of Financial Position (قائمة المركز المالي/الميزانية):** بيان مالي يظهر أصول المنشأة والتزاماتها وحقوق ملكيتها في تاريخ معين.\n  7. **Depreciation (الإهلاك):** التوزيع المنتظم لتكلفة الأصل غير المتداول على سنوات عمره الإنتاجي.\n  8. **Provision for Doubtful Debts (مخصص الديون المشكوك فيها):** احتياطي يجنب للتحوط ضد خسائر عدم تحصيل بعض الديون.\n  9. **Control Accounts (حسابات المراقبة):** حسابات إجمالية تفرد بالأستاذ العام لمطابقة مجموع السجلات الفرعية.\n  10. **Bank Reconciliation Statement (مذكرة تسوية البنك):** كشف يفسر الفروق بين رصيد النقدية بالدفاتر ورصيد كشف الحساب البنكي.\n  11. **Partnership Agreement (اتفاقية الشراكة):** عقد قانوني يحدد قواعد توزيع الأرباح والمسحوبات والرواتب بين الشركاء.\n  12. **Goodwill (الشهرة):** أصل غير ملموس يعكس السمعة والقوة الإيرادية الفائقة للمنشأة.\n  13. **Retained Earnings (الأرباح المحتجزة):** جزء الأرباح الصافية غير الموزع والمحتفظ به لدعم النمو.\n  14. **Limited Liability (المسئولية المحدودة):** تحديد مسئولية المساهم بمقدار حصته في الأسهم دون المساس بأمواله الشخصية.\n  15. **Receipts and Payments Account (حساب المقبوضات والمدفوعات):** ملخص حركة النقدية الخالصة بـ الكيانات غير الهادفة للربح.\n  16. **Income and Expenditure Account (حساب الإيرادات والمصروفات):** حساب ختامي استحقاقي يظهر الفائض أو العجز المالي بالمنظمات الخدمية.\n  17. **Current Ratio (نسبة التداول):** نسبة تقيس السيولة والقدرة على سداد الديون قصيرة الأجل (الأصول المتداولة / الالتزامات المتداولة).\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 111,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 111,
      "concept": "س372 مسرد المصطلحات المحاسبية الرسمي المعتمد (17 مصطلحاً)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "المسرد المعجمي المحاسبي الرسمي لكتاب الوزارة الموحد.",
      "مصطلحات وتعريفات معتمدة بـ اللغة العربية والإنجليزية."
    ]
  },
  {
    "id": "b373-u10-373",
    "sourceQuestionId": "b373-u10-373",
    "originalId": "b373-u10-373",
    "lessonId": "lesson-10-5",
    "unitId": "unit-10",
    "learningObjectiveId": "LO-U10.5",
    "concept": "س373 المقال المحاسبي الختامي لـ المنهج الكامل والوحدة العاشرة (JRE)",
    "difficulty": "advanced",
    "questionType": "jre",
    "bloomLevel": "synthesis",
    "question": "ناقش العبارة التالية في مقال تحليلي محكم: **\"هل يمكن أن يوفر التحليل المالي القائم على النسب المالية أساساً موثوقاً وقاطعاً لاتخاذ القرار الاستثماري، أم ينبغي دائماً تفسير النسب بحذر واقترانها بالظروف الاقتصادية والسياسات المحاسبية المتبعة؟\"**",
    "correctAnswer": "```text\n1. القرار/الحكم (4 درجات):\nيوفر التحليل المالي القائم على النسب الماليّة إطاراً تحليلياً موثوقاً ومفيداً للغاية لتوجيه قرارات الاستثمار، ولكنه لا يوفر يقينًا مطلقاً بمفرده، مما يفرض دائماً تفسير نتائجه بحذر واقترانه بـ التقييم الشامل للسياسات المحاسبية المتبعة والظروف الاقتصادية الخارجية.\n\n2. التفسير والتعليل (4 درجات):\nلأن النسب المالية تحول الأرقام المطلقة المشتتة إلى مقاييس أداء مئوية معيارية تسمح بمقارنة الربحية والسيولة والكفاءة بين الشركات والسنوات؛ ولكن هذه النسب تستند لأرقام تاريخية وتتأثر بالخيارات والتقديرات المحاسبية كـ أساليب الإهلاك، وتقويم المخزون، ونسب المخصصات المعتمدة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة العاشرة والمنهج الموحد (4 درجات):\n• الربحية: أظهر التحليل التفوق القاطع للشركة (ب) بـ هامش صافي ربح (18.2%) مقابل (12%) للشركة (أ).\n• السيولة: أنقذت نسبة التداول المستثمر من خدعة الربح الظاهري، فكشفت ضعف سيولة الشركة (أ) بـ (1.11 مرة) مقابل أمان الشركة (ب) بـ (2.00 مرة).\n• الكفاءة: أثبت دوران المخزون كفاءة الشركة (ب) بتصريف بضاعتها في 110 أيام مقابل 170 يوماً للشركة (أ).\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المحللين الحسابيين أن النسب المالية كافية بمفردها لاتخاذ القرار بدعوى اتساق أرقام القوائم المعرفية؛ والرد المحاسبي والمهني أن التساوي الحسابي لا يعني السلامة المطلقة من أخطاء التقدير، والنسب تختزل بيانات معقدة وتغفل ظروف المنافسة وجودة الإدارة وسعة الأصول المعنوية كـ الشهرة.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التحليل المالي أداة لا غنى عنها لترشيد القرارات المالية، وتصل لمداها الأقصى من المصداقية عند الدمج بين قراءة النسب الماليّة وفحص السياسات المحاسبية المتبعة وتقييم البيئة الاقتصادية الشاملة للمنشأة.\n```\n\n---",
    "modelAnswer": "```text\n1. القرار/الحكم (4 درجات):\nيوفر التحليل المالي القائم على النسب الماليّة إطاراً تحليلياً موثوقاً ومفيداً للغاية لتوجيه قرارات الاستثمار، ولكنه لا يوفر يقينًا مطلقاً بمفرده، مما يفرض دائماً تفسير نتائجه بحذر واقترانه بـ التقييم الشامل للسياسات المحاسبية المتبعة والظروف الاقتصادية الخارجية.\n\n2. التفسير والتعليل (4 درجات):\nلأن النسب المالية تحول الأرقام المطلقة المشتتة إلى مقاييس أداء مئوية معيارية تسمح بمقارنة الربحية والسيولة والكفاءة بين الشركات والسنوات؛ ولكن هذه النسب تستند لأرقام تاريخية وتتأثر بالخيارات والتقديرات المحاسبية كـ أساليب الإهلاك، وتقويم المخزون، ونسب المخصصات المعتمدة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة العاشرة والمنهج الموحد (4 درجات):\n• الربحية: أظهر التحليل التفوق القاطع للشركة (ب) بـ هامش صافي ربح (18.2%) مقابل (12%) للشركة (أ).\n• السيولة: أنقذت نسبة التداول المستثمر من خدعة الربح الظاهري، فكشفت ضعف سيولة الشركة (أ) بـ (1.11 مرة) مقابل أمان الشركة (ب) بـ (2.00 مرة).\n• الكفاءة: أثبت دوران المخزون كفاءة الشركة (ب) بتصريف بضاعتها في 110 أيام مقابل 170 يوماً للشركة (أ).\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المحللين الحسابيين أن النسب المالية كافية بمفردها لاتخاذ القرار بدعوى اتساق أرقام القوائم المعرفية؛ والرد المحاسبي والمهني أن التساوي الحسابي لا يعني السلامة المطلقة من أخطاء التقدير، والنسب تختزل بيانات معقدة وتغفل ظروف المنافسة وجودة الإدارة وسعة الأصول المعنوية كـ الشهرة.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التحليل المالي أداة لا غنى عنها لترشيد القرارات المالية، وتصل لمداها الأقصى من المصداقية عند الدمج بين قراءة النسب الماليّة وفحص السياسات المحاسبية المتبعة وتقييم البيئة الاقتصادية الشاملة للمنشأة.\n```\n\n---",
    "explanation": "```text\n1. القرار/الحكم (4 درجات):\nيوفر التحليل المالي القائم على النسب الماليّة إطاراً تحليلياً موثوقاً ومفيداً للغاية لتوجيه قرارات الاستثمار، ولكنه لا يوفر يقينًا مطلقاً بمفرده، مما يفرض دائماً تفسير نتائجه بحذر واقترانه بـ التقييم الشامل للسياسات المحاسبية المتبعة والظروف الاقتصادية الخارجية.\n\n2. التفسير والتعليل (4 درجات):\nلأن النسب المالية تحول الأرقام المطلقة المشتتة إلى مقاييس أداء مئوية معيارية تسمح بمقارنة الربحية والسيولة والكفاءة بين الشركات والسنوات؛ ولكن هذه النسب تستند لأرقام تاريخية وتتأثر بالخيارات والتقديرات المحاسبية كـ أساليب الإهلاك، وتقويم المخزون، ونسب المخصصات المعتمدة.\n\n3. الاستدلال بالأدلة المحاسبية من الوحدة العاشرة والمنهج الموحد (4 درجات):\n• الربحية: أظهر التحليل التفوق القاطع للشركة (ب) بـ هامش صافي ربح (18.2%) مقابل (12%) للشركة (أ).\n• السيولة: أنقذت نسبة التداول المستثمر من خدعة الربح الظاهري، فكشفت ضعف سيولة الشركة (أ) بـ (1.11 مرة) مقابل أمان الشركة (ب) بـ (2.00 مرة).\n• الكفاءة: أثبت دوران المخزون كفاءة الشركة (ب) بتصريف بضاعتها في 110 أيام مقابل 170 يوماً للشركة (أ).\n\n4. عرض الرأي المعارض والرد عليه (4 درجات):\nقد يرى بعض المحللين الحسابيين أن النسب المالية كافية بمفردها لاتخاذ القرار بدعوى اتساق أرقام القوائم المعرفية؛ والرد المحاسبي والمهني أن التساوي الحسابي لا يعني السلامة المطلقة من أخطاء التقدير، والنسب تختزل بيانات معقدة وتغفل ظروف المنافسة وجودة الإدارة وسعة الأصول المعنوية كـ الشهرة.\n\n5. الخاتمة المبررة (4 درجات):\nأخلص إلى أن التحليل المالي أداة لا غنى عنها لترشيد القرارات المالية، وتصل لمداها الأقصى من المصداقية عند الدمج بين قراءة النسب الماليّة وفحص السياسات المحاسبية المتبعة وتقييم البيئة الاقتصادية الشاملة للمنشأة.\n```\n\n---",
    "sourceType": "official_textbook",
    "sourcePage": 94,
    "sourceDocument": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 94,
      "concept": "س373 المقال المحاسبي الختامي لـ المنهج الكامل والوحدة العاشرة (JRE)"
    },
    "tags": [
      "الوحدة العاشرة: تحليل القوائم المالية واختبارات ليلة الامتحان ومسرد المصطلحات (الجزء الثاني ص 81 – 114)",
      "قضية التفسير المحاسبي الجوهرية للوحدة العاشرة والترخيص النهائي (من 20 درجة).",
      "مقال التفسير المحاسبي JRE المعتمد المكتمل."
    ]
  }
];

/**
 * أسئلة الوحدة الأولى المعتمدة لكتاب الوزارة (112 سؤالاً رسمياً)
 */
export const unit1OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "eb-mcq-001",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "تعريف المحاسبة المالية ونظام المعلومات",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "يُعرف نظام المعلومات المالي الذي يختص بتحديد وقياس وتسجيل وتبويب وتلخيص العمليات المالية وعرضها في شكل تقارير بـ:",
    "options": [
      "إدارة الأعمال",
      "المحاسبة المالية",
      "علم الاقتصاد الجزئي",
      "التدقيق اللوجستي"
    ],
    "correctAnswer": "المحاسبة المالية",
    "explanation": "المحاسبة المالية هي لغة الأعمال ونظام المعلومات المعني بتوثيق الأحداث المالية وإعداد القوائم للأطراف المستفيدة.",
    "tags": [
      "تعريف المحاسبة",
      "مفاهيم أساسية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "knowledge",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "ماهية المحاسبة"
    }
  },
  {
    "id": "eb-mcq-002",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "المستخدمون الخارجيون للمعلومات المحاسبية",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "أي من الأطراف التالية يُعد مستخدماً خارجياً لمعلومات القوائم المالية للمنشأة؟",
    "options": [
      "مدير العمليات والإنتاج",
      "رئيس مجلس الإدارة",
      "مصلحة الضرائب والبنوك المقرضة",
      "المشرف المالي الداخلي"
    ],
    "correctAnswer": "مصلحة الضرائب والبنوك المقرضة",
    "explanation": "المستخدمون الخارجيون هم أطراف خارج الهيكل التنفيذي للمنشأة كالمستثمرين والمقرضين والأجهزة الرقابية والضريبية.",
    "tags": [
      "مستخدمو المحاسبة",
      "أطراف خارجية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "مستخدمو القوائم المالية"
    }
  },
  {
    "id": "eb-mcq-003",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ الحيطة والحذر (التحفظ المحاسبي)",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "الأخذ في الحسبان كافة الخسائر والالتزامات المحتملة فور توقعها مع عدم الاعتراف بالأرباح إلا عند تحققها فعلياً يجسد مبدأ:",
    "options": [
      "المقابلة",
      "الحيطة والحذر",
      "الثبات والاتساق",
      "التكلفة التاريخية"
    ],
    "correctAnswer": "الحيطة والحذر",
    "explanation": "مبدأ الحيطة والحذر يحمي مستخدمي القوائم من التفاؤل غير المبرر بتسجيل الخسائر المتوقعة وتأجيل الأرباح غير المحققة.",
    "tags": [
      "المبادئ المحاسبية",
      "التحفظ"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "مبدأ الحيطة والحذر"
    }
  },
  {
    "id": "eb-mcq-004",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ المقابلة (Matching Principle)",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "تحميل الفترة المحاسبية بجميع المصروفات التي ساهمت في توليد إيرادات نفس الفترة يمثل تطبيقاً لمبدأ:",
    "options": [
      "المقابلة",
      "الوحدة النقدية",
      "الإفصاح الشامل",
      "الدورية"
    ],
    "correctAnswer": "المقابلة",
    "explanation": "مبدأ المقابلة هو حجر الزاوية لتحديد صافي ربح أو خسارة الفترة بعدالة من خلال مقارنة إيرادات الفترة بمصروفاتها المرتبطة.",
    "tags": [
      "المبادئ المحاسبية",
      "المقابلة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "مبدأ المقابلة"
    }
  },
  {
    "id": "eb-mcq-005",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-4",
    "concept": "أساس الاستحقاق مقابل الأساس النقدي",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "وفقاً لأساس الاستحقاق المحاسبي، يتم إثبات إيراد تقديم الخدمة عند:",
    "options": [
      "تحصيل النقدية من العميل وإيداعها بالخزينة",
      "إتمام تقديم الخدمة للعميل واكتساب الحق في الإيراد",
      "نهاية العام المالي فقط",
      "توقيع العقد الابتدائي"
    ],
    "correctAnswer": "إتمام تقديم الخدمة للعميل واكتساب الحق في الإيراد",
    "explanation": "أساس الاستحقاق يعترف بالإيراد عند واقعة الأداء والاكتساب بصرف النظر عن تاريخ استلام النقدية.",
    "tags": [
      "أسس القياس",
      "أساس الاستحقاق"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "أساس الاستحقاق"
    }
  },
  {
    "id": "eb-mcq-006",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ التكلفة التاريخية",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "تسجيل الأصول في الدفاتر بالقيمة الفعلية التي تم سدادها وقت الشراء دون تعديلها بتغيرات القيمة السوقية يُعزى إلى:",
    "options": [
      "مبدأ التكلفة التاريخية",
      "مبدأ الاستمرار",
      "مبدأ الأهمية النسبية",
      "مبدأ الثبات"
    ],
    "correctAnswer": "مبدأ التكلفة التاريخية",
    "explanation": "التكلفة التاريخية توفر قياساً موضوعياً وقابلاً للتحقق عبر المستندات والفواتير الأصلية المعززة للشراء.",
    "tags": [
      "المبادئ المحاسبية",
      "التكلفة التاريخية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "التكلفة التاريخية"
    }
  },
  {
    "id": "eb-mcq-007",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ الإفصاح التام",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "إظهار كافة المعلومات والبيانات الجوهرية المؤثرة في قرارات مستخدمي القوائم المالية عبر الإيضاحات المتممة يمثل:",
    "options": [
      "مبدأ الإفصاح التام",
      "فرض الشخصية المعنوية",
      "مبدأ التكلفة التاريخية",
      "أساس النقدية"
    ],
    "correctAnswer": "مبدأ الإفصاح التام",
    "explanation": "الإفصاح التام يضمن توفير كافة الحقائق المادية في متن القوائم أو الإيضاحات المرفقة لمنع تضليل متخذ القرار.",
    "tags": [
      "المبادئ المحاسبية",
      "الإفصاح"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 11,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 11,
      "concept": "الإفصاح التام"
    }
  },
  {
    "id": "eb-mcq-008",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ الثبات (الاتساق)",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "التزام المنشأة بتطبيق نفس السياسات والطرق المحاسبية من فترة مالية لأخرى يهدف إلى تحقيق:",
    "options": [
      "قابلية القوائم المالية للمقارنة عبر الفترات",
      "زيادة السيولة النقدية بالخزينة",
      "تقليل الالتزامات الضريبية فقط",
      "تسريع إقفال الدفاتر اليومية"
    ],
    "correctAnswer": "قابلية القوائم المالية للمقارنة عبر الفترات",
    "explanation": "مبدأ الثبات يتيح المقارنة الزمنية الدقيقة لنتائج أعمال المنشأة دون تشويه ناتج عن تغيير متكرر في السياسات.",
    "tags": [
      "المبادئ المحاسبية",
      "الثبات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 12,
      "concept": "مبدأ الثبات"
    }
  },
  {
    "id": "eb-mcq-009",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "فرض الشخصية المعنوية المستقلة",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "فصل المعاملات المالية الشخصية لصاحب المنشأة عن المعاملات المالية الخاصة بنشاط المنشأة يستند إلى:",
    "options": [
      "فرض الشخصية المعنوية المستقلة",
      "فرض الاستمرار",
      "مبدأ الوحدة النقدية",
      "مبدأ التكلفة البديلة"
    ],
    "correctAnswer": "فرض الشخصية المعنوية المستقلة",
    "explanation": "المنشأة شخصية اعتبارية مستقلة ذمة مالية خاصة بها تفصل أصولها والتزاماتها عن الذمة الشخصية لمالكها.",
    "tags": [
      "الفروض المحاسبية",
      "الشخصية المعنوية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 12,
      "concept": "الشخصية المعنوية"
    }
  },
  {
    "id": "eb-mcq-010",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "فرض الاستمرار",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "تقويم الأصول الثابتة بالتكلفة التاريخية مطروحاً منها مجمع الإهلاك بدلاً من قيم التصفية الفورية يعتمد على فرض:",
    "options": [
      "الاستمرار (Going Concern)",
      "الدورية السنوية",
      "التحقق النقدي",
      "الشخصية الفردية"
    ],
    "correctAnswer": "الاستمرار (Going Concern)",
    "explanation": "بافتراض بقاء المنشأة ومواصلة نشاطها في المستقبل المنظور، لا يتم تقويم الأصول بأسعار التصفية الجبرية.",
    "tags": [
      "الفروض المحاسبية",
      "الاستمرار"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 12,
      "concept": "فرض الاستمرار"
    }
  },
  {
    "id": "eb-mcq-011",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-1",
    "concept": "المعادلة المحاسبية الأساسية",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "الصياغة الجبرية السليمة لمعادلة الميزانية (المعادلة المحاسبية) هي:",
    "options": [
      "الأصول = الخصوم + حقوق الملكية",
      "الأصول = الخصوم - حقوق الملكية",
      "الخصوم = الأصول + حقوق الملكية",
      "حقوق الملكية = الأصول + الخصوم"
    ],
    "correctAnswer": "الأصول = الخصوم + حقوق الملكية",
    "explanation": "المعادلة تعبر عن توازن استخدامات الأموال (الأصول) مع مصادر تمويلها (الخصوم وحقوق الملكية).",
    "tags": [
      "المعادلة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 15,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 15,
      "concept": "معادلة الميزانية"
    }
  },
  {
    "id": "eb-mcq-012",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-2",
    "concept": "حساب الخصوم من المعادلة المحاسبية",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "إذا كانت إجمالي أصول منشأة تبلغ 850,000 جنيه وحقوق ملكيتها 500,000 جنيه، فإن قيمة الخصوم تساوي:",
    "options": [
      "350,000 جنيه",
      "1,350,000 جنيه",
      "500,000 جنيه",
      "250,000 جنيه"
    ],
    "correctAnswer": "350,000 جنيه",
    "explanation": "الخصوم = الأصول - حقوق الملكية = 850,000 - 500,000 = 350,000 جنيه.",
    "tags": [
      "المعادلة المحاسبية",
      "حسابات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 15,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 15,
      "concept": "تطبيق المعادلة"
    }
  },
  {
    "id": "eb-mcq-013",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-3",
    "concept": "أثر شراء أصل بجزء نقدي والباقي على الحساب",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "قامت منشأة بشراء آلات بمبلغ 200,000 جنيه، سددت 80,000 جنيه نقداً والباقي على الحساب. ما أثر ذلك على طرفي المعادلة؟",
    "options": [
      "زيادة الأصول بـ 120,000 وزيادة الخصوم بـ 120,000",
      "زيادة الأصول بـ 200,000 وزيادة الخصوم بـ 200,000",
      "زيادة الأصول بـ 120,000 وزيادة حقوق الملكية بـ 120,000",
      "نقص الأصول بـ 80,000 وزيادة الخصوم بـ 120,000"
    ],
    "correctAnswer": "زيادة الأصول بـ 120,000 وزيادة الخصوم بـ 120,000",
    "explanation": "صافي الأصول = (+200,000 آلات - 80,000 نقدية) = +120,000 جنيه، يقابله زيادة الخصوم (دائنون) بـ +120,000 جنيه.",
    "tags": [
      "أثر العمليات",
      "المعادلة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 15,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 15,
      "concept": "أثر العمليات المالية"
    }
  },
  {
    "id": "eb-mcq-014",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-3",
    "concept": "أثر سداد التزام نقداً على المعادلة",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "سداد منشأة لمبلغ 40,000 جنيه نقداً لأحد الموردين (الدائنين) يؤدي إلى:",
    "options": [
      "نقص في الأصول ونقص في الخصوم بنفس المبلغ",
      "نقص في الأصول وزيادة في الخصوم",
      "زيادة في الأصول ونقص في حقوق الملكية",
      "لا يتغير إجمالي طرفي المعادلة"
    ],
    "correctAnswer": "نقص في الأصول ونقص في الخصوم بنفس المبلغ",
    "explanation": "تنقص النقدية (أصل) بـ 40,000 جنيه وينقص حساب الدائنين (خصم) بـ 40,000 جنيه متحافظاً على التوازن.",
    "tags": [
      "سداد الديون",
      "المعادلة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 15,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 15,
      "concept": "سداد الخصوم"
    }
  },
  {
    "id": "eb-mcq-015",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-3",
    "concept": "أثر المسحوبات الشخصية على المعادلة",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "سحب صاحب المنشأة مبلغ 15,000 جنيه نقداً لاستخدامه الشخصي يترتب عليه:",
    "options": [
      "نقص الأصول ونقص حقوق الملكية",
      "نقص الأصول وزيادة الخصوم",
      "نقص الأصول وزيادة المصروفات الإدارية",
      "زيادة الأصول ونقص حقوق الملكية"
    ],
    "correctAnswer": "نقص الأصول ونقص حقوق الملكية",
    "explanation": "المسحوبات ليست مصروفاً للمنشأة بل تخفيض مباشر لحقوق الملكية (رأس المال) مقترناً بنقص النقدية (الأصول).",
    "tags": [
      "المسحوبات",
      "حقوق الملكية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 15,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 15,
      "concept": "المسحوبات الشخصية"
    },
    "sourceQuestionId": "b373-u1-022",
    "replacesQuestionId": "b373-u1-022",
    "notes": "Updated with official textbook question b373-u1-022"
  },
  {
    "id": "eb-mcq-016",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-4",
    "concept": "استنتاج صافي الربح من تغير حقوق الملكية",
    "difficulty": "advanced",
    "questionType": "mcq",
    "question": "إذا كان رأس المال أول المدة 400,000 جنيه، ورأس المال آخر المدة 550,000 جنيه، وكانت مسحوبات المالك 30,000 جنيه ولا توجد استثمارات إضافية، فإن صافي ربح الفترة يبلغ:",
    "options": [
      "180,000 جنيه",
      "120,000 جنيه",
      "150,000 جنيه",
      "210,000 جنيه"
    ],
    "correctAnswer": "180,000 جنيه",
    "explanation": "حقوق الملكية آخر المدة = أول المدة + صافي الربح - المسحوبات -> 550,000 = 400,000 + الربح - 30,000 -> صافي الربح = 550,000 - 370,000 = 180,000 جنيه.",
    "tags": [
      "صافي الربح",
      "حقوق الملكية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 15,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 15,
      "concept": "معادلة حقوق الملكية"
    }
  },
  {
    "id": "eb-mcq-017",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-1",
    "concept": "قاعدة القيد المزدوج",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "تنص قاعدة القيد المزدوج على أن كل معاملة مالية لها طرفان متساويان في القيمة:",
    "options": [
      "أحدهما مدين والآخر دائن",
      "كلاهما مدين دائماً",
      "كلاهما دائن دائماً",
      "أحدهما نقدي والآخر عيني دون قيد"
    ],
    "correctAnswer": "أحدهما مدين والآخر دائن",
    "explanation": "القيد المزدوج يلزم أن يكون الطرف الآخذ (المدين) مساوياً للطرف العاطي (الدائن) لضمان التوازن المحاسبي المستمر.",
    "tags": [
      "القيد المزدوج",
      "المدين والدائن"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 19,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 19,
      "concept": "نظرية القيد المزدوج"
    }
  },
  {
    "id": "eb-mcq-018",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-2",
    "concept": "طبيعة حسابات الأصول والمصروفات",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "حسابات الأصول والمصروفات ذات طبيعة مدينة، وبالتالي فإنها:",
    "options": [
      "تزيد بجعلها مدينة وتنتقص بجعلها دائنة",
      "تزيد بجعلها دائنة وتنتقص بجعلها مدينة",
      "تكون دائنة في جميع الأحوال",
      "لا تتأثر بالقيود اليومية"
    ],
    "correctAnswer": "تزيد بجعلها مدينة وتنتقص بجعلها دائنة",
    "explanation": "القاعدة الذهبية: الزيادة في الحساب تكون في نفس جانب طبيعته (مدين يزيد مديناً، دائن يزيد دائناً).",
    "tags": [
      "طبيعة الحسابات",
      "المدين والدائن"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 19,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 19,
      "concept": "قواعد المدين والدائن"
    }
  },
  {
    "id": "eb-mcq-019",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-3",
    "concept": "إثبات قيد الشراء الآجل للبضاعة",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "عند شراء بضاعة بمبلغ 70,000 جنيه على الحساب من المورد 'الأهرام'، يكون الطرف الدائن للقيد هو:",
    "options": [
      "حساب المشتريات",
      "حساب الموردين (الأهرام)",
      "حساب الخزينة",
      "حساب المبيعات"
    ],
    "correctAnswer": "حساب الموردين (الأهرام)",
    "explanation": "المشتريات أصل/مصروف يزيد فيكون مديناً، وحساب الموردين (خصم) يزيد فيكون دائناً.",
    "tags": [
      "قيود اليومية",
      "المشتريات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 19,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 19,
      "concept": "قيود الشراء"
    }
  },
  {
    "id": "eb-mcq-020",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-3",
    "concept": "إثبات قيد بيع البضاعة نقداً",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "بيع بضاعة بمبلغ 95,000 جنيه نقداً يُسجل بالقيد:",
    "options": [
      "من حـ/ النقدية بالخزينة إلى حـ/ المبيعات",
      "من حـ/ المبيعات إلى حـ/ النقدية بالخزينة",
      "من حـ/ المدينين إلى حـ/ المبيعات",
      "من حـ/ المشتريات إلى حـ/ النقدية"
    ],
    "correctAnswer": "من حـ/ النقدية بالخزينة إلى حـ/ المبيعات",
    "explanation": "النقدية (أصل) زادت فتكون مدينة، والمبيعات (إيراد) زادت فتكون دائنة.",
    "tags": [
      "قيود اليومية",
      "المبيعات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 19,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 19,
      "concept": "قيود المبيعات"
    },
    "sourceQuestionId": "b373-u2-071",
    "replacesQuestionId": "b373-u2-071",
    "notes": "Updated with official textbook question b373-u2-071"
  },
  {
    "id": "eb-mcq-021",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-4",
    "concept": "القيد المركب",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "القيد المحاسبي الذي يتضمن أكثر من حساب في أحد طرفيه أو كلاهما يُسمى:",
    "options": [
      "قيداً بسيطاً",
      "قيداً مركباً",
      "قيداً عكسياً",
      "قيد تسوية"
    ],
    "correctAnswer": "قيداً مركباً",
    "explanation": "القيد المركب يحتوي على كلمة 'مذكورين' في الطرف المدين أو الدائن لتعدد الحسابات المتأثرة بالمعاملة.",
    "tags": [
      "أنواع القيود",
      "القيد المركب"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 19,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 19,
      "concept": "القيد المركب"
    }
  },
  {
    "id": "eb-mcq-022",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-1",
    "concept": "الترحيل لدفتر الأستاذ",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "العملية التي يتم بموجبها نقل أطراف قيود اليومية إلى حساباتها الخاصة في دفتر الأستاذ تُسمى:",
    "options": [
      "الترصيد",
      "الترحيل (Posting)",
      "المطابقة",
      "الجرد السنوي"
    ],
    "correctAnswer": "الترحيل (Posting)",
    "explanation": "الترحيل هو نقل الأرقام المدينة والدائنة من دفتر اليومية العامة إلى صفحات الحسابات الفردية بدفتر الأستاذ.",
    "tags": [
      "دفتر الأستاذ",
      "الترحيل"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 23,
      "concept": "الترحيل للأستاذ"
    }
  },
  {
    "id": "eb-mcq-023",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-2",
    "concept": "حساب رصيد الحساب (T-Account)",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "إذا كان مجموع الجانب المدين لحساب البنك 350,000 جنيه ومجموع الجانب الدائن 210,000 جنيه، فإن رصيد الحساب هو:",
    "options": [
      "رصيد مدين قدره 140,000 جنيه",
      "رصيد دائن قدره 140,000 جنيه",
      "رصيد مدين قدره 560,000 جنيه",
      "رصيد متوازن صفري"
    ],
    "correctAnswer": "رصيد مدين قدره 140,000 جنيه",
    "explanation": "الرصيد يتبع الجانب الأكبر: 350,000 مدين - 210,000 دائن = 140,000 جنيه رصيد مدين.",
    "tags": [
      "الترصيد",
      "حسابات الأستاذ"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 23,
      "concept": "ترصيد الحسابات"
    }
  },
  {
    "id": "eb-mcq-024",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-3",
    "concept": "وظيفة ميزان المراجعة",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "الهدف الجوهري من إعداد ميزان المراجعة قبل إعداد القوائم المالية هو:",
    "options": [
      "التحقق المبدئي من صحة التوازن الحسابي للدفاتر",
      "حساب الضرائب المستحقة بدقة",
      "تحديد مكافآت الإدارة التنفيذية",
      "تسجيل العمليات اليومية بالتفصيل"
    ],
    "correctAnswer": "التحقق المبدئي من صحة التوازن الحسابي للدفاتر",
    "explanation": "ميزان المراجعة كشف تجميعي لأرصدة ومجاميع الحسابات يبرهن على توازن جانبي القيد المزدوج رياضياً.",
    "tags": [
      "ميزان المراجعة",
      "الرقابة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 23,
      "concept": "ميزان المراجعة"
    }
  },
  {
    "id": "eb-mcq-025",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-4",
    "concept": "الأخطاء التي لا يكتشفها ميزان المراجعة",
    "difficulty": "advanced",
    "questionType": "mcq",
    "question": "أي من الأخطاء المحاسبية التالية لن يؤدي إلى الإخلال بتوازن ميزان المراجعة؟",
    "options": [
      "خطأ الحذف والسهو الكامل لقيد يومية بأكمله",
      "ترحيل مبلغ مدين فقط دون ترحيل الطرف الدائن",
      "تسجيل مبلغ مدين بـ 5,000 والدائن بـ 50,000",
      "إدراج رصيد مدين في الجانب الدائن بالميزان"
    ],
    "correctAnswer": "خطأ الحذف والسهو الكامل لقيد يومية بأكمله",
    "explanation": "عند إغفال المعاملة برمتها بطرفيها، يظل ميزان المراجعة متوازناً رقمياً رغم الخطأ في اكتمال السجلات.",
    "tags": [
      "أخطاء ميزان المراجعة",
      "الرقابة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 23,
      "concept": "أخطاء التوازن"
    }
  },
  {
    "id": "eb-mcq-026",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "حساب المتاجرة وتكلفة المبيعات",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "المعادلة المحاسبية لحساب تكلفة البضاعة المباعة في حساب المتاجرة هي:",
    "options": [
      "مخزون أول المدة + صافي المشتريات - مخزون آخر المدة",
      "المبيعات - المصروفات الإدارية",
      "مخزون آخر المدة + المبيعات - المشتريات",
      "صافي المشتريات + المصروفات العمومية"
    ],
    "correctAnswer": "مخزون أول المدة + صافي المشتريات - مخزون آخر المدة",
    "explanation": "تكلفة المبيعات = البضاعة المتاحة للبيع (مخزون أول + مشتريات) مطروحاً منها البضاعة المتبقية بالمخازن آخر المدة.",
    "tags": [
      "حساب المتاجرة",
      "تكلفة المبيعات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 27,
      "concept": "تكلفة البضاعة المباعة"
    }
  },
  {
    "id": "eb-mcq-027",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-2",
    "concept": "ترحيل مجمل الربح",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "الرصيد الدائن لحساب المتاجرة (مجمل الربح) يُرحل مباشرة إلى:",
    "options": [
      "الجانب الدائن لحساب الأرباح والخسائر",
      "الجانب المدين لحساب الأرباح والخسائر",
      "قائمة المركز المالي كخصم متداول",
      "حساب جاري المالك بالمدين"
    ],
    "correctAnswer": "الجانب الدائن لحساب الأرباح والخسائر",
    "explanation": "مجمل الربح هو الإيراد الإجمالي الرئيسي للنشاط التجاري فيُنقل للجانب الدائن بحساب الأرباح والخسائر لمقابلة المصروفات.",
    "tags": [
      "الحسابات الختامية",
      "مجمل الربح"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 27,
      "concept": "ترحيل مجمل الربح"
    }
  },
  {
    "id": "eb-mcq-028",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-3",
    "concept": "قائمة المركز المالي (الميزانية العمومية)",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "قائمة المركز المالي تختلف عن حسابات النتيجة في أنها:",
    "options": [
      "توضح المركز المالي للمنشأة في لحظة زمنية محددة وليس عن فترة منقضية",
      "تتضمن الإيرادات والمصروفات فقط",
      "تُقفل أرصدتها تماماً في نهاية العام",
      "تُعد شهرياً فقط للأغراض الضريبية"
    ],
    "correctAnswer": "توضح المركز المالي للمنشأة في لحظة زمنية محددة وليس عن فترة منقضية",
    "explanation": "الميزانية العمومية هي لقطة فوتوغرافية (Snapshot) لموجودات والتزامات المنشأة في تاريخ محدد (مثل 31 ديسمبر).",
    "tags": [
      "المركز المالي",
      "الميزانية العمومية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 27,
      "concept": "المركز المالي"
    }
  },
  {
    "id": "eb-mcq-029",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-1",
    "concept": "مفهوم سؤال JRE وسياقه",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "يتكون الاختصار الأكاديمي JRE في منظومة الامتحانات الحديثة من العناصر الثلاثة:",
    "options": [
      "الحكم المهني (Judgment)، التبرير المنطقي (Reasoning)، الأدلة الرقمية (Evidence)",
      "الجريدة اليومية، المراجعة، الفحص",
      "العدالة، المسؤولية، الكفاءة",
      "اليومية، الترصيد، التقييم"
    ],
    "correctAnswer": "الحكم المهني (Judgment)، التبرير المنطقي (Reasoning)، الأدلة الرقمية (Evidence)",
    "explanation": "نموذج JRE يقيس قدرة الطالب على اتخاذ موقف محاسبي سليم مدعماً بالمبادئ والأدلة الرقمية من الواقعة.",
    "tags": [
      "JRE",
      "التفكير النقدي"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "knowledge",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 31,
      "concept": "منهجية JRE"
    }
  },
  {
    "id": "eb-mcq-030",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-2",
    "concept": "معايير تقييم مقال JRE الرسمي",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "وفقاً لمصفوفة التقييم (Rubric) الرسمية لـ JRE (الدرجة الإجمالية 10 أو 20)، يتم منح أعلى وزن لـ:",
    "options": [
      "دقة الحكم وصحة التعليل المحاسبي المدعوم بالمبادئ",
      "عدد الكلمات المكتوبة في المقال",
      "نوع الخط المستخدم والتنسيق الخارجي",
      "تكرار نص السؤال في المقدمة"
    ],
    "correctAnswer": "دقة الحكم وصحة التعليل المحاسبي المدعوم بالمبادئ",
    "explanation": "المحك الأساسي في JRE هو الربط المحكم بين المشكلة والمبدأ المحاسبي وتأكيد النتيجة بالأرقام.",
    "tags": [
      "معايير التقييم",
      "Rubric"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 31,
      "concept": "مصفوفة تصحيح JRE"
    }
  },
  {
    "id": "eb-mcq-031",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "المستخدمون الداخليون للمعلومات المحاسبية",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "أي من الفئات التالية يُصنف كمستخدم داخلي للمعلومات المحاسبية؟",
    "options": [
      "إدارة التسويق والتخطيط بالمنشأة",
      "الموردون الخارجيون",
      "المستثمرون المحتملون بالبورصة",
      "المحللون الماليون المستقلون"
    ],
    "correctAnswer": "إدارة التسويق والتخطيط بالمنشأة",
    "explanation": "الإدارة الداخلية تحتاج البيانات المحاسبية لاتخاذ القرارات التشغيلية والتسعيرية والرقابية اليومية.",
    "tags": [
      "مستخدمو المحاسبة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 12,
      "concept": "المستخدمون الداخليون"
    }
  },
  {
    "id": "eb-mcq-032",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "فرض الوحدة النقدية وثبات القوة الشرائية",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "افتراض أن النقود هي وحدة القياس النمطية الشائعة مع إغفال التغيرات الطفيفة في قوتها الشرائية يُعرف بـ:",
    "options": [
      "فرض وحدة القياس النقدي",
      "مبدأ المقابلة",
      "فرض الدورية",
      "مبدأ الإفصاح المالي"
    ],
    "correctAnswer": "فرض وحدة القياس النقدي",
    "explanation": "وحدة النقد هي المقياس المشترك للتعبير عن الأحداث والعمليات غير المتجانسة في القوائم المالية.",
    "tags": [
      "الفروض المحاسبية",
      "الوحدة النقدية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 12,
      "concept": "وحدة القياس النقدي"
    }
  },
  {
    "id": "eb-mcq-033",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ الأهمية النسبية",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "معالجة شراء سلة مهملات أو دباسة مكتبية صغيرة بمبلغ 80 جنيهاً كمصروف فوري بدلاً من اعتبارها أصلاً ثابتاً يرجع إلى:",
    "options": [
      "مبدأ الأهمية النسبية (Materiality)",
      "مبدأ التكلفة التاريخية",
      "فرض الاستمرار",
      "مبدأ تحقق الإيراد"
    ],
    "correctAnswer": "مبدأ الأهمية النسبية (Materiality)",
    "explanation": "العناصر ضئيلة القيمة التي لا تؤثر على قرارات مستخدمي القوائم تُعالج بأبسط السبل المحاسبية توفيراً للجهد.",
    "tags": [
      "الأهمية النسبية",
      "المبادئ"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 12,
      "concept": "الأهمية النسبية"
    }
  },
  {
    "id": "eb-mcq-034",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-2",
    "concept": "الأصول المتداولة",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "أي من الحسابات التالية يُصنف ضمن الأصول المتداولة في قائمة المركز المالي؟",
    "options": [
      "المدينون (العملاء) وأوراق القبض",
      "المباني الإدارية والإنشائية",
      "رأس المال المدفوع",
      "القروض طويلة الأجل"
    ],
    "correctAnswer": "المدينون (العملاء) وأوراق القبض",
    "explanation": "الأصول المتداولة هي النقدية والأصول المتوقع تحويلها لنقدية أو استهلاكها خلال دورة تشغيلية واحدة أو سنة.",
    "tags": [
      "الأصول المتداولة",
      "تبويب الأصول"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 16,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 16,
      "concept": "تصنيف الأصول"
    },
    "sourceQuestionId": "b373-u5-199",
    "replacesQuestionId": "b373-u5-199",
    "notes": "Updated with official textbook question b373-u5-199"
  },
  {
    "id": "eb-mcq-035",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-2",
    "concept": "الخصوم المتداولة",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "أي من الالتزامات التالية يُعد التزاماً متداولاً قصير الأجل؟",
    "options": [
      "أوراق الدفع والموردون",
      "السندات المصدرة لعشر سنوات",
      "رأس مال الشركاء",
      "الأراضي المملوكة"
    ],
    "correctAnswer": "أوراق الدفع والموردون",
    "explanation": "الخصوم المتداولة هي الالتزامات واجبة الوفاء خلال فترة سنة مالية واحدة أو دورة النشاط العادية.",
    "tags": [
      "الخصوم المتداولة",
      "تبويب الخصوم"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 16,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 16,
      "concept": "تصنيف الخصوم"
    }
  },
  {
    "id": "eb-mcq-036",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-3",
    "concept": "أثر الاقتراض البنكي على المعادلة",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "حصلت منشأة على قرض بنكي قصير الأجل بمبلغ 150,000 جنيه أودعته في حسابها الجاري بالبنك. ما أثر هذه المعاملة؟",
    "options": [
      "زيادة الأصول وزيادة الخصوم بنفس القيمة",
      "زيادة الأصول وزيادة حقوق الملكية",
      "نقص الأصول ونقص الخصوم",
      "لا يطرأ أي تغيير على طرفي المعادلة"
    ],
    "correctAnswer": "زيادة الأصول وزيادة الخصوم بنفس القيمة",
    "explanation": "زاد أصل المنشأة (البنك) بـ 150,000 جنيه، وزادت التزاماتها للغير (القرض البنكي) بـ 150,000 جنيه.",
    "tags": [
      "أثر العمليات",
      "القروض"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 16,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 16,
      "concept": "أثر الاقتراض"
    }
  },
  {
    "id": "eb-mcq-037",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-2",
    "concept": "طبيعة حساب الإيرادات",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "حساب الإيرادات ذو طبيعة دائنة، وعند تحققه وتسجيله في الدفاتر فإنه يُجعل:",
    "options": [
      "دائناً",
      "مديناً",
      "صفرياً",
      "موقوفاً لحين السداد"
    ],
    "correctAnswer": "دائناً",
    "explanation": "الإيرادات تزيد من حقوق الملكية، وحقوق الملكية دائنة، لذلك تزداد الإيرادات بجعلها دائنة.",
    "tags": [
      "طبيعة الإيرادات",
      "المدين والدائن"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 20,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 20,
      "concept": "طبيعة الإيرادات"
    }
  },
  {
    "id": "eb-mcq-038",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-3",
    "concept": "قيد سداد المصروف نقداً",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "عند سداد إيجار مقر المنشأة بمبلغ 12,000 جنيه نقداً، فإن القيد المحاسبي الصحيح هو:",
    "options": [
      "من حـ/ مصروف الإيجار إلى حـ/ الخزينة",
      "من حـ/ الخزينة إلى حـ/ مصروف الإيجار",
      "من حـ/ الإيرادات إلى حـ/ الخزينة",
      "من حـ/ الموردين إلى حـ/ الإيجار"
    ],
    "correctAnswer": "من حـ/ مصروف الإيجار إلى حـ/ الخزينة",
    "explanation": "مصروف الإيجار (مدين) زاد فيكون مديناً، والخزينة (أصل) نقصت فتكون دائنة.",
    "tags": [
      "سداد المصروفات",
      "قيود اليومية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 20,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 20,
      "concept": "سداد المصروفات"
    }
  },
  {
    "id": "eb-mcq-039",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-3",
    "concept": "قيد تحصيل ديون من العملاء",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "حصلت المنشأة مبلغ 25,000 جنيه نقداً من العميل 'البركة' سداداً للمستحق عليه. الطرف المدين للقيد هو:",
    "options": [
      "حساب النقدية بالخزينة",
      "حساب العميل (البركة)",
      "حساب المبيعات",
      "حساب رأس المال"
    ],
    "correctAnswer": "حساب النقدية بالخزينة",
    "explanation": "النقدية أصل زاد فيكون مديناً، والعميل (أصل مدينين) نقص فيكون دائناً.",
    "tags": [
      "تحصيل الديون",
      "المدينون"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 20,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 20,
      "concept": "تحصيل المستحقات"
    }
  },
  {
    "id": "eb-mcq-040",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-2",
    "concept": "الرصيد المرحل والرصيد المنقول",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "الرصيد المتمم الحسابي الذي يوضع في الجانب الأصغر عند ترصيد حساب الأستاذ لمعادلة الطرفين يُسمى:",
    "options": [
      "رصيداً مرحلاً (Balance c/d)",
      "رصيداً منقولاً (Balance b/d)",
      "مجمل الربح",
      "صافي الربح"
    ],
    "correctAnswer": "رصيداً مرحلاً (Balance c/d)",
    "explanation": "الرصيد المرحل يوضع في الجانب الأصغر لتساوي مجموع العمودين، ثم يُنقل في بداية الفترة التالية إلى جانبه الأصلي كرصيد منقول.",
    "tags": [
      "الترصيد",
      "دفتر الأستاذ"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 24,
      "concept": "تقنيات الترصيد"
    }
  },
  {
    "id": "eb-mcq-041",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-2",
    "concept": "عناصر حساب الأرباح والخسائر",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "أي من البنود التالية يظهر في الجانب المدين لحساب الأرباح والخسائر؟",
    "options": [
      "مصروف إهلاك الآلات ورواتب الموظفين الإداريين",
      "إيراد المبيعات الإجمالي",
      "مجمل الربح المنقول من المتاجرة",
      "إيراد الأوراق المالية الدائن"
    ],
    "correctAnswer": "مصروف إهلاك الآلات ورواتب الموظفين الإداريين",
    "explanation": "الجانب المدين لحساب الأرباح والخسائر يشتمل على كافة المصروفات البيعية والإدارية والتمويلية والإهلاكات.",
    "tags": [
      "الأرباح والخسائر",
      "المصروفات التشغيلية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 27,
      "concept": "حساب الأرباح والخسائر"
    }
  },
  {
    "id": "eb-mcq-042",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-3",
    "concept": "حقوق الملكية في قائمة المركز المالي",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "في قائمة المركز المالي، تظهر حقوق الملكية في نهاية الفترة محتسبة كالآتي:",
    "options": [
      "رأس المال أول المدة + صافي الربح - المسحوبات",
      "رأس المال + الأصول المتداولة - الخصوم",
      "المبيعات - تكلفة المبيعات",
      "الأصول الثابتة - مجمع الإهلاك"
    ],
    "correctAnswer": "رأس المال أول المدة + صافي الربح - المسحوبات",
    "explanation": "صافي حقوق المالك في نهاية العام يعادل استثماره الأصلي مضافاً إليه ما حققه النشاط من أرباح ومطروحاً منه مسحوباته الشخصية.",
    "tags": [
      "حقوق الملكية",
      "الميزانية العمومية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 27,
      "concept": "حقوق الملكية"
    }
  },
  {
    "id": "eb-tf-001",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "طبيعة المعلومات المحاسبية والتقديرات",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "الأرقام والقوائم المحاسبية تعكس حقائق مطلقة ومجردة ولا تعتمد على أي تقديرات أو أحكام شخصية.",
    "correctAnswer": false,
    "explanation": "العبارة خاطئة؛ المحاسبة تعتمد على أحكام وتقديرات مهنية متعددة مثل تقدير العمر الإنتاجي للأصول، ونسب الديون المشكوك فيها.",
    "tags": [
      "طبيعة المحاسبة",
      "التقديرات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 13,
      "concept": "الأحكام المحاسبية"
    }
  },
  {
    "id": "eb-tf-002",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-4",
    "concept": "مقارنة الأساس النقدي وأساس الاستحقاق",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "question": "يُفضل استخدام أساس الاستحقاق في المنشآت الهادفة للربح لتحقيق المقابلة العادلة بين إيرادات الفترة ومصروفاتها.",
    "correctAnswer": true,
    "explanation": "العبارة صائبة؛ أساس الاستحقاق يعترف بالعمليات عند حدوثها واكتسابها بصرف النظر عن مواعيد التدفقات النقدية.",
    "tags": [
      "أساس الاستحقاق",
      "المقابلة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 13,
      "concept": "أساس الاستحقاق"
    }
  },
  {
    "id": "eb-tf-003",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-1",
    "concept": "مفهوم حقوق الملكية",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "حقوق الملكية تمثل أصلاً مادياً ملموساً موجوداً داخل خزينة المنشأة ومستقلاً عن التزاماتها.",
    "correctAnswer": false,
    "explanation": "العبارة خاطئة؛ حقوق الملكية تمثل حقاً معنوياً والتزاماً مالياً على المنشأة تجاه ملاكها (صافي الأصول).",
    "tags": [
      "حقوق الملكية",
      "المعادلة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 16,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "knowledge",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 16,
      "concept": "مفهوم حقوق الملكية"
    }
  },
  {
    "id": "eb-tf-004",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-3",
    "concept": "أثر سداد الالتزامات نقداً",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "سداد المنشأة لقرض بنكي نقداً يؤدي إلى تخفيض طرفي المعادلة المحاسبية بنفس المقدار متحافظاً على التوازن.",
    "correctAnswer": true,
    "explanation": "العبارة صائبة؛ ينقص أصل النقدية وينقص التزام القرض البنكي بذات القيمة.",
    "tags": [
      "سداد القروض",
      "المعادلة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 16,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 16,
      "concept": "سداد الالتزامات"
    }
  },
  {
    "id": "eb-tf-005",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-2",
    "concept": "نقص الحسابات الدائنة",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "الحسابات ذات الطبيعة الدائنة مثل الخصوم وحقوق الملكية تنقص بجعلها مدينة.",
    "correctAnswer": true,
    "explanation": "العبارة صائبة؛ النقص في أي حساب يُسجل دائماً في الجانب العكسي لطبيعته الأصلية.",
    "tags": [
      "المدين والدائن",
      "قواعد القيد"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 20,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 20,
      "concept": "قواعد القيد المزدوج"
    }
  },
  {
    "id": "eb-tf-006",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-4",
    "concept": "تأثير خطأ السهو على ميزان المراجعة",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "question": "خطأ السهو الكامل عن تسجيل عملية مالية يؤدي إلى إخلال توازن ميزان المراجعة وظهور فرق بين الجانبين.",
    "correctAnswer": false,
    "explanation": "العبارة خاطئة؛ السهو الكامل يسقط الطرفين المدين والدائن معاً، مما يبقي الميزان متوازناً رقمياً رغم نقص السجلات.",
    "tags": [
      "أخطاء ميزان المراجعة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 24,
      "concept": "أخطاء التوازن"
    }
  },
  {
    "id": "eb-tf-007",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "تبويب المصروفات في الحسابات الختامية",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "question": "المصروفات البيعية والإدارية مثل رواتب موظفي الإدارة تظهر في الجانب المدين لحساب المتاجرة.",
    "correctAnswer": false,
    "explanation": "العبارة خاطئة؛ حساب المتاجرة يختص بتكلفة البضاعة المباعة فقط، بينما تظهر الرواتب الإدارية في حساب الأرباح والخسائر.",
    "tags": [
      "الحسابات الختامية",
      "المتاجرة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 28,
      "concept": "حساب المتاجرة"
    }
  },
  {
    "id": "eb-tf-008",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-1",
    "concept": "الهدف من سؤال JRE",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "سؤال JRE في الامتحانات الحديثة يهدف إلى قياس الحفظ الآلي للقوانين دون الاهتمام بالتفكير والتحليل.",
    "correctAnswer": false,
    "explanation": "العبارة خاطئة؛ سؤال JRE صُمم خصيصاً لقياس التفكير النقدي والمساءلة المهنية والحكم المدعوم بالأدلة المحاسبية.",
    "tags": [
      "JRE",
      "التفكير النقدي"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 31,
      "concept": "أهداف JRE"
    }
  },
  {
    "id": "eb-tf-009",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ التكلفة التاريخية والتضخم",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "question": "مبدأ التكلفة التاريخية يتجاهل التغيرات في القوة الشرائية للنقود ويسجل الأصل بما دفع فيه فعلياً وقت اقتنائه.",
    "correctAnswer": true,
    "explanation": "العبارة صائبة؛ التكلفة التاريخية تضمن موضوعية الإثبات استناداً إلى المستندات الموثقة.",
    "tags": [
      "التكلفة التاريخية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 13,
      "concept": "التكلفة التاريخية"
    }
  },
  {
    "id": "eb-tf-010",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-3",
    "concept": "تأثير الإيرادات على حقوق الملكية",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "تحقيق المنشأة لإيرادات الخدمات يؤدي إلى زيادة الأصول وزيادة حقوق الملكية بالتوازي.",
    "correctAnswer": true,
    "explanation": "العبارة صائبة؛ الإيراد يزيد من النقدية أو المدينين (أصول) وينعكس كزيادة في صافي حقوق الملكية.",
    "tags": [
      "الإيرادات",
      "المعادلة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 16,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 16,
      "concept": "أثر الإيرادات"
    }
  },
  {
    "id": "eb-fill-001",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ الحيطة والحذر",
    "difficulty": "basic",
    "questionType": "fill_blank",
    "question": "يقضي مبدأ ..................... بالاعتراف الفوري بجميع الخسائر المتوقعة وتأجيل تسجيل الأرباح حتى تتحقق فعلياً.",
    "correctAnswer": "الحيطة والحذر",
    "explanation": "مبدأ الحيطة والحذر (التحفظ) هو الدرع الواقي ضد تضخيم الأرباح والموجودات في القوائم المالية.",
    "tags": [
      "المبادئ المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 13,
      "concept": "الحيطة والحذر"
    }
  },
  {
    "id": "eb-fill-002",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-1",
    "concept": "عناصر المعادلة المحاسبية",
    "difficulty": "basic",
    "questionType": "fill_blank",
    "question": "المعادلة المحاسبية تنص على: الأصول = ..................... + حقوق الملكية.",
    "correctAnswer": "الخصوم",
    "explanation": "الخصوم (التزامات المنشأة تجاه الغير) تمثل أحد المصدرين الأساسيين لتمويل أصول المنشأة.",
    "tags": [
      "المعادلة المحاسبية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 17,
      "concept": "معادلة الميزانية"
    }
  },
  {
    "id": "eb-fill-003",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-2",
    "concept": "طبيعة حسابات المصروفات",
    "difficulty": "basic",
    "questionType": "fill_blank",
    "question": "تعتبر حسابات المصروفات ذات طبيعة ..................... وبالتالي فإن زيادتها تُسجل في نفس الجانب.",
    "correctAnswer": "مدينة",
    "explanation": "المصروفات استخدام للموارد واستنزاف لحقوق الملكية فتأخذ الطبيعة المدينة وتزيد بالمدين.",
    "tags": [
      "طبيعة الحسابات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 20,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 20,
      "concept": "طبيعة المصروفات"
    }
  },
  {
    "id": "eb-fill-004",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-3",
    "concept": "كشف ميزان المراجعة",
    "difficulty": "intermediate",
    "questionType": "fill_blank",
    "question": "يُعد ..................... كشفاً أو قائمة بجميع أرصدة ومجاميع حسابات دفتر الأستاذ للتحقق من التوازن الحسابي.",
    "correctAnswer": "ميزان المراجعة",
    "explanation": "ميزان المراجعة هو نقطة الوصل الرقابية بين التسجيل والترحيل وإعداد القوائم المالية الختامية.",
    "tags": [
      "ميزان المراجعة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 24,
      "concept": "ميزان المراجعة"
    }
  },
  {
    "id": "eb-fill-005",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "نتيجة حساب المتاجرة",
    "difficulty": "intermediate",
    "questionType": "fill_blank",
    "question": "الفرق الإيجابي بين صافي المبيعات وتكلفة البضاعة المباعة في حساب المتاجرة يُسمى .....................",
    "correctAnswer": "مجمل الربح",
    "explanation": "مجمل الربح (Gross Profit) يعبر عن كفاءة التسعير والنشاط التجاري المباشر قبل طرح المصروفات التشغيلية.",
    "tags": [
      "حساب المتاجرة",
      "مجمل الربح"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 28,
      "concept": "مجمل الربح"
    }
  },
  {
    "id": "eb-app-001",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-4",
    "concept": "حساب رأس المال الختامي",
    "difficulty": "intermediate",
    "questionType": "applied",
    "question": "بدأت منشأة نشاطها برأس مال قدره 300,000 جنيه، وحققت صافي ربح خلال العام قدره 85,000 جنيه، وكانت مسحوبات صاحب المنشأة 20,000 جنيه. احسب رصيد حقوق الملكية في نهاية العام.",
    "correctAnswer": "365,000 جنيه",
    "explanation": "حقوق الملكية الختامية = 300,000 + 85,000 - 20,000 = 365,000 جنيه.",
    "tags": [
      "تطبيقات عددية",
      "حقوق الملكية"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 17,
      "concept": "حساب حقوق الملكية"
    }
  },
  {
    "id": "eb-app-002",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "حساب تكلفة البضاعة المباعة ومجمل الربح",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "توفرت لديك البيانات التالية: مخزون أول المدة 40,000 جنيه، المشتريات خلال العام 160,000 جنيه، ومخزون آخر المدة 50,000 جنيه، والمبيعات 250,000 جنيه. احسب تكلفة المبيعات ومجمل الربح.",
    "correctAnswer": "تكلفة المبيعات = 150,000 جنيه، ومجمل الربح = 100,000 جنيه",
    "explanation": "تكلفة المبيعات = 40,000 + 160,000 - 50,000 = 150,000 جنيه. مجمل الربح = 250,000 - 150,000 = 100,000 جنيه.",
    "tags": [
      "تطبيقات عددية",
      "تكلفة المبيعات"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 28,
      "concept": "تكلفة المبيعات"
    }
  },
  {
    "id": "eb-jre-001",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-1",
    "concept": "مقال JRE حول تأجيل تسجيل المصروفات",
    "difficulty": "challenge",
    "questionType": "jre",
    "question": "قامت شركة بتأجيل تسجيل فاتورة استهلاك كهرباء بمبلغ 60,000 جنيه مستحقة عن شهر ديسمبر إلى العام التالي لرفع صافي أرباح العام الحالي. قيم هذا التصرف محاسبياً مستخدماً منهجية (الحكم، التعليل، الأدلة).",
    "correctAnswer": "تصرف غير سليم محاسبياً يخالف مبدأ المقابلة وأساس الاستحقاق",
    "explanation": "1. الحكم (Judgment): الإجراء خاطئ ومخالف للمعايير. 2. التعليل (Reasoning): الكهرباء استُهلكت في توليد إيرادات ديسمبر فيجب تحميلها على نفس الفترة وفق مبدأ المقابلة. 3. الأدلة (Evidence): تأجيل الـ 60 ألف يضخم أرباح العام الحالي ويشوه المركز المالي.",
    "tags": [
      "JRE",
      "أساس الاستحقاق",
      "المقابلة"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 32,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "synthesis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 32,
      "concept": "قضية استحقاق المصروفات"
    }
  },
  {
    "id": "eb-jre-002",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-2",
    "concept": "مقال JRE حول إعادة تقييم الأراضي بالسوق",
    "difficulty": "challenge",
    "questionType": "jre",
    "question": "اشترت منشأة قطعة أرض بمبلغ 500,000 جنيه، وبعد عامين ارتفعت قيمتها السوقية إلى 1,200,000 جنيه. أصر المحاسب على زيادة قيمتها بالدفاتر وتسجيل ربح بـ 700,000 جنيه. قيم الموقف بمنهجية JRE.",
    "correctAnswer": "تصرف خاطئ يخالف مبدأ التكلفة التاريخية والحيطة والحذر",
    "explanation": "1. الحكم: مخالف للمعايير. 2. التعليل: مبدأ التكلفة التاريخية يلزم بقاء الأرض بـ 500 ألف، ومبدأ الحيطة والحذر يمنع الاعتراف بأرباح إعادة التقييم غير المحققة بيعاً. 3. الدليل: لم تحدث واقعة بيع فعلية ونقدية محققة.",
    "tags": [
      "JRE",
      "التكلفة التاريخية",
      "الحيطة والحذر"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 32,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "synthesis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 32,
      "concept": "قضية تقييم الأصول"
    }
  },
  {
    "id": "eb-tac-001",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-2",
    "concept": "محاكاة وترصيد حساب النقدية بالخزينة",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "question": "بدأت الخزينة برصيد 50,000 جنيه. تمت العمليات: تحصيل مبيعات 30,000 نقداً، سداد إيجار 8,000 نقداً، سداد للمورد 12,000 نقداً. حدد الرصيد النهائي للخزينة وطبيعته.",
    "correctAnswer": "رصيد مدين قدره 60,000 جنيه",
    "explanation": "الجانب المدين = 50,000 + 30,000 = 80,000 جنيه. الجانب الدائن = 8,000 + 12,000 = 20,000 جنيه. الرصيد النهائي = 80,000 - 20,000 = 60,000 جنيه رصيد مدين.",
    "tags": [
      "T-Account",
      "حساب الخزينة",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 24,
      "concept": "حساب الخزينة T-Account"
    },
    "sourceQuestionId": "b373-u1-024",
    "replacesQuestionId": "b373-u1-024",
    "notes": "Updated with official textbook question b373-u1-024"
  },
  {
    "id": "eb-mcq-043",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-1",
    "concept": "الفرق بين المحاسبة ومسك الدفاتر",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "أي من العبارات التالية تعبر بدقة عن العلاقة الجوهرية بين مسك الدفاتر والمحاسبة المالية؟",
    "options": [
      "مسك الدفاتر هو المرحلة التنفيذية لتسجيل المعاملات بينما المحاسبة تشمل التحليل والتفسير والتقرير",
      "المحاسبة ومسك الدفاتر مصطلحان متطابقان تماماً ولا يوجد أي فرق وظيفي بينهما",
      "مسك الدفاتر يقتصر على المنشآت الكبيرة بينما المحاسبة للمنشآت الصغيرة",
      "المحاسبة تسبق مسك الدفاتر زمنياً في الدورة المحاسبية"
    ],
    "correctAnswer": "مسك الدفاتر هو المرحلة التنفيذية لتسجيل المعاملات بينما المحاسبة تشمل التحليل والتفسير والتقرير",
    "explanation": "مسك الدفاتر هو الجانب الإجرائي الروتيني لتسجيل المعاملات وتبويبها، في حين تمثل المحاسبة النظام الشامل الذي يشمل التصميم والتحليل وتفسير القوائم المالية لاتخاذ القرارات.",
    "tags": [
      "مسك الدفاتر",
      "مفاهيم أساسية",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 13,
      "concept": "المحاسبة ومسك الدفاتر"
    }
  },
  {
    "id": "eb-mcq-044",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "مبدأ الموضوعية والتحقق",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "يُلزم مبدأ الموضوعية في المحاسبة المالية بأن تكون جميع البيانات المالية المسجلة بالدفاتر:",
    "options": [
      "مبنية على تقديرات شخصية مرنة لمدير الحسابات",
      "معززة بمستندات وإثباتات ثبوتية مستقلة قابلة للتحقق والمراجعة",
      "مسجلة بأعلى قيمة بيعية متوقعة في السوق",
      "مقتصرة على المعاملات النقدية فقط دون الآجلة"
    ],
    "correctAnswer": "معززة بمستندات وإثباتات ثبوتية مستقلة قابلة للتحقق والمراجعة",
    "explanation": "يتطلب مبدأ الموضوعية استناد القياس والتسجيل المحاسبي إلى أدلة ومستندات موضوعية خالية من التحيز الشخصي مثل الفواتير والعقود والإيصالات المعتمدة.",
    "tags": [
      "المبادئ المحاسبية",
      "الموضوعية",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 13,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 13,
      "concept": "مبدأ الموضوعية"
    }
  },
  {
    "id": "eb-tf-011",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-2",
    "concept": "فرض استقلالية الوحدة الاقتصادية",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "question": "قيام صاحب المنشأة الفردية بسداد إيجار مسكنه الخاص من خزينة المنشأة وتسجيله كـ 'مصروف إيجار عام للمنشأة' يعد تصرفاً محاسبياً سليماً لا يتعارض مع الفروض المحاسبية.",
    "correctAnswer": false,
    "explanation": "هذا تصرف خاطئ يخالف فرض الشخصية المعنوية المستقلة؛ حيث يجب معالجة هذه المبالغ كـ 'مسحوبات شخصية' تخفض حقوق الملكية ولا تدرج كمصروف لنشاط المنشأة.",
    "tags": [
      "الفروض المحاسبية",
      "الشخصية المعنوية",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 14,
      "concept": "استقلالية الوحدة الاقتصادية"
    }
  },
  {
    "id": "eb-tf-012",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "فرض الاستمرارية ومبدأ التكلفة التاريخية",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "question": "يُعد فرض استمرار المنشأة (Going Concern) الأساس المنطقي الرئيسي لتقييم الأصول الثابتة بالتكلفة التاريخية مطروحاً منها مجمع الإهلاك بدلاً من قيمتها التصفوية الجارية.",
    "correctAnswer": true,
    "explanation": "بافتراض استمرار المنشأة في مزاولة نشاطها لمدى زمني غير محدد، لا تكون المنشأة بحاجة لتقييم أصولها بأسعار التصفية الفورية، مما يبرر استخدام التكلفة التاريخية وتوزيع تكلفة الأصل على فترات عمره الإنتاجي.",
    "tags": [
      "الفروض المحاسبية",
      "الاستمرارية",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 14,
      "concept": "فرض الاستمرارية"
    }
  },
  {
    "id": "eb-case-001",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "تقييم الحيطة والحذر والأهمية النسبية في حالة قضائية",
    "difficulty": "advanced",
    "questionType": "case",
    "question": "رفعت إحدى الشركات المنافسة دعوى قضائية ضد شركة 'الأمل' تطالبها بتعويض قدره 200,000 جنيه، وأكد المستشار القانوني للشركة أن احتمالية خسارة القضية وسداد المبلغ مؤكدة بنسبة 90%. أوصى المدير المالي بعدم إثبات أي قيد أو إفصاح لتفادي خفض الأرباح. قيم موقف المدير المالي محاسبياً.",
    "correctAnswer": "موقف غير سليم؛ يلزم تكوين مخصص والإفصاح عن الالتزام المحتمل وفقاً لمبدأ الحيطة والحذر والإفصاح التام",
    "explanation": "وفقاً لمبدأ الحيطة والحذر، يجب الاعتراف بالخسائر والالتزامات المحتملة الحدوث بصورة مرجحة وتكوين مخصص لها، والإفصاح عنها بالقوائم المالية تحقيقاً للشفافية وتجنباً لتضليل المستثمرين.",
    "tags": [
      "حالات عملية",
      "الحيطة والحذر",
      "الإفصاح",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 14,
      "concept": "تطبيقات الحيطة والحذر"
    }
  },
  {
    "id": "eb-ana-001",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-4",
    "concept": "مقارنة أثر أساس الاستحقاق والأساس النقدي على صافي الدخل",
    "difficulty": "advanced",
    "questionType": "analytical",
    "question": "حققت منشأة مبيعات خدمات خلال عام 2025 بمبلغ 350,000 جنيه (حصل منها 200,000 جنيه نقداً والباقي آجل)، وبلغت مصروفات العام 180,000 جنيه (سدد منها 120,000 جنيه نقداً والباقي مستحق). احسب الفرق بين صافي ربح المنشأة وفق أساس الاستحقاق وصافي الربح وفق الأساس النقدي.",
    "correctAnswer": "صافي ربح أساس الاستحقاق = 170,000 جنيه، وصافي ربح الأساس النقدي = 80,000 جنيه، والفرق = 90,000 جنيه زيادة لصالح الاستحقاق",
    "explanation": "أساس الاستحقاق: الإيرادات (350,000) - المصروفات (180,000) = 170,000 جنيه. الأساس النقدي: المقبوضات (200,000) - المدفوعات (120,000) = 80,000 جنيه. الفرق بينهما = 170,000 - 80,000 = 90,000 جنيه.",
    "tags": [
      "تحليل محاسبي",
      "أساس الاستحقاق",
      "الأساس النقدي",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 14,
      "concept": "مقارنة أسس القياس"
    }
  },
  {
    "id": "eb-applied-003",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-3",
    "concept": "حساب مصروف الإهلاك وتطبيق مبدأ المقابلة",
    "difficulty": "intermediate",
    "questionType": "applied",
    "question": "اشترت منشأة آلة إنتاجية في 1/1/2025 بتكلفة 120,000 جنيه، وقدر عمرها الإنتاجي بـ 5 سنوات بقيمة تخريدية متوقعة 20,000 جنيه. وتتبع المنشأة طريقة القسط الثابت. احسب قسط الإهلاك السنوي الواجب تحميله على قائمة الدخل لعام 2025 تطبيقاً لمبدأ المقابلة.",
    "correctAnswer": "20,000 جنيه",
    "explanation": "قسط الإهلاك السنوي = (تكلفة الأصل - قيمة الخردة) ÷ العمر الإنتاجي = (120,000 - 20,000) ÷ 5 = 100,000 ÷ 5 = 20,000 جنيه سنوياً، ويحمل كمصروف لمقابلة إيرادات الإنتاج.",
    "tags": [
      "مسائل تطبيقية",
      "الإهلاك",
      "مبدأ المقابلة",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 14,
      "concept": "الإهلاك ومبدأ المقابلة"
    }
  },
  {
    "id": "eb-applied-004",
    "lessonId": "lesson-1",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-1-4",
    "concept": "تسوية الإيرادات المقدمة والمستحقة وفق أساس الاستحقاق",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "بلغت المبالغ المحصلة من العملاء مقابل عقود صيانة سنوية خلال العام 60,000 جنيه سجلت بالكامل كإيراد صيانة. وفي نهاية العام تبين أن ما يخص الفترة من أعمال صيانة منجزة فعلياً قيمته 45,000 جنيه فقط. حدد قيمة إيراد الصيانة المحقق بقائمة الدخل ورصيد الإيراد المقدم بقائمة المركز المالي.",
    "correctAnswer": "إيراد الصيانة المحقق = 45,000 جنيه، والإيراد المقدم (التزام) = 15,000 جنيه",
    "explanation": "يدرج ما يخص الفترة فعلياً (45,000 جنيه) في قائمة الدخل كإيراد محقق، ويحول الجزء المتبقي غير المكتسب (60,000 - 45,000 = 15,000 جنيه) إلى خصوم متداولة كـ 'إيراد صيانة مقدم' بالمركز المالي.",
    "tags": [
      "مسائل تطبيقية",
      "التسويات الجردية",
      "أساس الاستحقاق",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 14,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 14,
      "concept": "تسوية الإيرادات المقدمة"
    }
  },
  {
    "id": "eb-mcq-045",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-1",
    "concept": "البنية الجبرية لمعادلة الميزانية الموسعة",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "أي من الصيغ التالية تمثل الصورة الموسعة الصحيحة لمعادلة الميزانية المحاسبية؟",
    "options": [
      "الأصول = الخصوم + رأس المال + الإيرادات - المصروفات - المسحوبات",
      "الأصول + الخصوم = رأس المال + الإيرادات - المصروفات",
      "الأصول = الخصوم - رأس المال + المسحوبات",
      "الأصول = الخصوم + رأس المال - الإيرادات + المصروفات"
    ],
    "correctAnswer": "الأصول = الخصوم + رأس المال + الإيرادات - المصروفات - المسحوبات",
    "explanation": "حقوق الملكية تتكون من (رأس المال + الأرباح المحتجزة/الإيرادات - المصروفات - المسحوبات الشخصية)، مما يجعل المعادلة: الأصول = الخصوم + رأس المال + الإيرادات - المصروفات - المسحوبات.",
    "tags": [
      "معادلة الميزانية",
      "الصيغة الموسعة",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 17,
      "concept": "المعادلة المحاسبية الموسعة"
    }
  },
  {
    "id": "eb-mcq-046",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-2",
    "concept": "تحليل أثر شراء أصل بجزء نقدي وجزء آجل",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "اشترت المنشأة أجهزة حاسب آلي بمبلغ 50,000 جنيه، سددت منها 20,000 جنيه نقداً والباقي على الحساب. ما هو الأثر الصافي لهذه العملية على إجمالي الأصول وإجمالي الخصوم؟",
    "options": [
      "زيادة الأصول بمبلغ 30,000 جنيه وزيادة الخصوم بمبلغ 30,000 جنيه",
      "زيادة الأصول بمبلغ 50,000 جنيه وزيادة الخصوم بمبلغ 50,000 جنيه",
      "نقص الأصول بمبلغ 20,000 جنيه ونقص الخصوم بمبلغ 20,000 جنيه",
      "لا يتغير إجمالي الأصول وتزيد الخصوم بمبلغ 30,000 جنيه"
    ],
    "correctAnswer": "زيادة الأصول بمبلغ 30,000 جنيه وزيادة الخصوم بمبلغ 30,000 جنيه",
    "explanation": "تزيد الأصول بأجهزة الحاسب (+50,000) وتنقص بالنقدية (-20,000)، فيكون صافي الزيادة بالأصول +30,000 جنيه، ويقابله زيادة في الخصوم (الموردون) بمبلغ +30,000 جنيه، فيظل التوازن قائماً.",
    "tags": [
      "تحليل العمليات",
      "أثر المعاملات",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 17,
      "concept": "أثر العمليات المركبة"
    },
    "sourceQuestionId": "b373-u1-025",
    "replacesQuestionId": "b373-u1-025",
    "notes": "Updated with official textbook question b373-u1-025"
  },
  {
    "id": "eb-mcq-047",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-4",
    "concept": "أثر سداد دين للموردين نقداً",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "سداد المنشأة لمبلغ 15,000 جنيه نقداً لأحد الموردين سداداً لمستحقات سابقة يؤدي إلى:",
    "options": [
      "نقص في أصل (النقدية) ونقص في التزام (الموردين) بنفس القيمة",
      "نقص في أصل (النقدية) وزيادة في المصروفات",
      "زيادة في أصل ونقص في أصل آخر دون تأثر الخصوم",
      "نقص في الخصوم وزيادة في حقوق الملكية"
    ],
    "correctAnswer": "نقص في أصل (النقدية) ونقص في التزام (الموردين) بنفس القيمة",
    "explanation": "سداد الالتزام لا يعد مصروفا جديدا بل إبراء لذمة مالية سابقة، فيترتب عليه نقص النقدية بالخزينة (أصل) ونقص رصيد حساب الدائنين/الموردين (خصوم) بمبلغ 15,000 جنيه.",
    "tags": [
      "تحليل العمليات",
      "سداد الالتزامات",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 17,
      "concept": "أثر سداد الديون"
    }
  },
  {
    "id": "eb-tf-013",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-2",
    "concept": "أثر العمليات التبادلية بين الأصول",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "تحصيل منشأة لمبلغ 25,000 جنيه نقداً من أحد العملاء المدينين يؤدي إلى زيادة إجمالي أصول المنشأة بمبلغ 25,000 جنيه.",
    "correctAnswer": false,
    "explanation": "هذه العملية تمثل تغيراً في هيكل الأصول فقط (زيادة النقدية ونقص المدينين بنفس القيمة 25,000 جنيه)، وبالتالي يظل إجمالي الأصول ثابتاً دون أي زيادة إجمالية.",
    "tags": [
      "معادلة الميزانية",
      "تبادل الأصول",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 17,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 17,
      "concept": "العمليات التبادلية للأصول"
    }
  },
  {
    "id": "eb-applied-005",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-1",
    "concept": "استنتاج المجهول في معادلة الميزانية",
    "difficulty": "intermediate",
    "questionType": "applied",
    "question": "إذا علمت أن أصول منشأة 'الوفاء' في بداية العام بلغت 420,000 جنيه والتزاماتها 160,000 جنيه. وخلال العام زادت الأصول بمقدار 80,000 جنيه وانخفضت الخصوم بمقدار 30,000 جنيه. احسب رصيد حقوق الملكية في نهاية العام.",
    "correctAnswer": "370,000 جنيه",
    "explanation": "الأصول في نهاية العام = 420,000 + 80,000 = 500,000 جنيه. الخصوم في نهاية العام = 160,000 - 30,000 = 130,000 جنيه. حقوق الملكية في نهاية العام = الأصول - الخصوم = 500,000 - 130,000 = 370,000 جنيه.",
    "tags": [
      "مسائل تطبيقية",
      "معادلة الميزانية",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 18,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 18,
      "concept": "حساب عناصر المعادلة"
    }
  },
  {
    "id": "eb-applied-006",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-3",
    "concept": "حساب صافي الربح من التغير في حقوق الملكية",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "بدأت منشأة العام برأس مال 200,000 جنيه، وفي نهاية العام بلغت الأصول 550,000 جنيه والخصوم 180,000 جنيه. فإذا علمت أن صاحب المنشأة قام بضخ استثمارات إضافية خلال العام قدرها 50,000 جنيه وسحب نقدية لاستخدامه الشخصي بلغت 20,000 جنيه. احسب صافي ربح المنشأة المحقق عن العام.",
    "correctAnswer": "140,000 جنيه",
    "explanation": "حقوق الملكية نهاية العام = 550,000 - 180,000 = 370,000 جنيه. الزيادة في حقوق الملكية = 370,000 - 200,000 = 170,000 جنيه. صافي الربح = الزيادة في حقوق الملكية - الاستثمارات الإضافية + المسحوبات = 170,000 - 50,000 + 20,000 = 140,000 جنيه.",
    "tags": [
      "مسائل تطبيقية",
      "حقوق الملكية",
      "صافي الربح",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 18,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 18,
      "concept": "تغيرات حقوق الملكية والأرباح"
    }
  },
  {
    "id": "eb-applied-007",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-2",
    "concept": "تحليل معادلة الميزانية لسلسلة عمليات متتالية",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "تمت العمليات التالية: 1) إيداع 100,000 جنيه بالبنك كرأس مال. 2) شراء بضاعة بـ 40,000 جنيه بشيك. 3) بيع نصف البضاعة بمبلغ 35,000 جنيه على الحساب. احسب إجمالي قيمة الأصول وحقوق الملكية بعد إتمام العمليات الثلاث.",
    "correctAnswer": "إجمالي الأصول = 115,000 جنيه، وحقوق الملكية = 115,000 جنيه",
    "explanation": "الأصول: بنك (60,000) + بضاعة متبقية (20,000) + مدينون (35,000) = 115,000 جنيه. الخصوم = 0. حقوق الملكية: رأس المال (100,000) + ربح بيع البضاعة (35,000 - 20,000 = 15,000) = 115,000 جنيه. التوازن = 115,000 = 115,000.",
    "tags": [
      "مسائل تطبيقية",
      "أثر العمليات",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 18,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 18,
      "concept": "سلسلة العمليات وتوازن المعادلة"
    }
  },
  {
    "id": "eb-case-002",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-2",
    "concept": "تقييم أثر توزيعات الأرباح على توازن المعادلة",
    "difficulty": "advanced",
    "questionType": "case",
    "question": "قرر مجلس إدارة شركة تجارية توزيع أرباح نقدية على المساهمين بمبلغ 80,000 جنيه، وتم السداد بشيك بنكي. اقترح محاسب الشركة قيد العملية بخصم المبلغ مباشرة من إيرادات النشاط الجاري. قيم اقتراح المحاسب وحدد الأثر الدقيق على معادلة الميزانية.",
    "correctAnswer": "اقتراح خاطئ؛ توزيعات الأرباح ليست مصروفا جاريا بل توزيع لحقوق الملكية، والأثر هو نقص الأصول (البنك) ونقص حقوق الملكية (الأرباح المحتجزة) بـ 80,000 جنيه",
    "explanation": "توزيعات الأرباح تخفض حقوق الملكية مباشرة ولا تدرج في قائمة الدخل كمصروف لأنها ليست تكلفة توليد إيراد، ويترتب عليها نقص البنك (أصل) ونقص الأرباح المحتجزة (حقوق ملكية).",
    "tags": [
      "حالات عملية",
      "توزيعات الأرباح",
      "حقوق الملكية",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 18,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 18,
      "concept": "توزيع الأرباح وحقوق الملكية"
    }
  },
  {
    "id": "eb-ana-002",
    "lessonId": "lesson-2",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-2-4",
    "concept": "تحليل أخطاء تبويب العمليات على معادلة الميزانية",
    "difficulty": "challenge",
    "questionType": "analytical",
    "question": "قامت منشأة بشراء آلة إنتاجية بمبلغ 90,000 جنيه نقداً، وقام المحاسب بتسجيلها خطأً كـ 'مصروف صيانة عامة'. وضح أثر هذا الخطأ المحاسبي على: 1) إجمالي الأصول، 2) صافي ربح الفترة، 3) حقوق الملكية بنهاية العام.",
    "correctAnswer": "يترتب على الخطأ: نقص الأصول بـ 90,000 جنيه، ونقص صافي الربح بـ 90,000 جنيه، ونقص حقوق الملكية بـ 90,000 جنيه",
    "explanation": "تسجيل الأصل الرأسمالي كمصروف إيرادي يؤدي إلى تضخيم المصروفات وبالتالي تخفيض صافي الربح وحقوق الملكية بـ 90,000 جنيه، وحرمان قائمة المركز المالي من إظهار أصل ثابت حقيقي بنفس القيمة.",
    "tags": [
      "تحليل أخطاء",
      "الأصول الثابتة",
      "المصروفات الرأسمالية",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 18,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 18,
      "concept": "أثر أخطاء التبويب على المعادلة"
    }
  },
  {
    "id": "eb-mcq-048",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-1",
    "concept": "طبيعة الحسابات وقواعد المدين والدائن",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "وفقاً لقواعد القيد المزدوج، ما هي المجموعة التي تتميز جميع عناصرها بطبيعة حسابات 'مدينة' وتزداد بجعلها مدينة؟",
    "options": [
      "الأصول والمصروفات والمسحوبات",
      "الخصوم وحقوق الملكية والإيرادات",
      "الأصول والإيرادات ورأس المال",
      "الخصوم والمصروفات ورأس المال"
    ],
    "correctAnswer": "الأصول والمصروفات والمسحوبات",
    "explanation": "الحسابات ذات الطبيعة المدينة الأصلية هي الأصول والمصروفات والمسحوبات؛ تزيد في الجانب المدين وتنقص في الجانب الدائن.",
    "tags": [
      "القيد المزدوج",
      "قواعد المدين والدائن",
      "Bloom:Remember"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 21,
      "concept": "طبيعة الحسابات المحاسبية"
    }
  },
  {
    "id": "eb-mcq-049",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-2",
    "concept": "القيد اليومي للمبيعات الآجلة مع ضريبة القيمة المضافة",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "باعت منشأة بضاعة على الحساب للعميل 'سمير' بمبلغ 40,000 جنيه، مع إضافة ضريبة قيمة مضافة بنسبة 14%. ما هو الطرف الدائن الصحيح لقيد اليومية؟",
    "options": [
      "إلى مذكورين: حـ/ المبيعات (40,000) وحـ/ جاري القيمة المضافة (5,600)",
      "حـ/ العملاء - سمير بمبلغ 45,600 جنيه",
      "حـ/ المبيعات فقط بمبلغ 45,600 جنيه",
      "إلى حـ/ البنك بمبلغ 40,000 جنيه"
    ],
    "correctAnswer": "إلى مذكورين: حـ/ المبيعات (40,000) وحـ/ جاري القيمة المضافة (5,600)",
    "explanation": "القيد الصحيح: من حـ/ العملاء (45,600) إلى مذكورين: حـ/ المبيعات (40,000) وحـ/ مصلحة الضرائب - ضريبة القيمة المضافة الدائنة (5,600).",
    "tags": [
      "قيود اليومية",
      "ضريبة القيمة المضافة",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 21,
      "concept": "قيود المبيعات والضرائب"
    }
  },
  {
    "id": "eb-mcq-050",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-3",
    "concept": "المعالجة المحاسبية للخصم التجاري والخصم النقدي",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "اشترت المنشأة بضاعة قيمتها الاسمية 50,000 جنيه بخصم تجاري 10% وبشروط سداد 2/10 صافي 30 يوماً. ما هي القيمة التي تسجل بها المشتريات بدفتر اليومية في تاريخ الشراء؟",
    "options": [
      "45,000 جنيه (القيمة بعد الخصم التجاري)",
      "50,000 جنيه (القيمة الإجمالية)",
      "44,100 جنيه (بعد خصم الـ 2%)",
      "40,000 جنيه"
    ],
    "correctAnswer": "45,000 جنيه (القيمة بعد الخصم التجاري)",
    "explanation": "الخصم التجاري (50,000 × 10% = 5,000) يستبعد فوراً ولا يظهر بالدفاتر، وتسجل المشتريات بالصافي (45,000 جنيه). أما الخصم النقدي فيثبت فقط عند السداد خلال مهلة الخصم.",
    "tags": [
      "الخصم التجاري",
      "الخصم النقدي",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 21,
      "concept": "معالجة الخصومات التجارية"
    }
  },
  {
    "id": "eb-tf-014",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-1",
    "concept": "مبدأ توازن قيد اليومية",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "في القيد اليومي المركب، يجوز أن يتضمن القيد أكثر من حساب في الجانب المدين بشرط أن يتساوى مجموع المبالغ المدينة تماماً مع مجموع المبالغ الدائنة.",
    "correctAnswer": true,
    "explanation": "نظرية القيد المزدوج تشترط حتمية التساوي الرياضي بين إجمالي الطرف المدين وإجمالي الطرف الدائن في أي قيد، سواء كان قيداً بسيطاً أو مركباً.",
    "tags": [
      "القيد المزدوج",
      "القيود المركبة",
      "Bloom:Remember"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 21,
      "concept": "توازن القيود المحاسبية"
    }
  },
  {
    "id": "eb-applied-008",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-3",
    "concept": "إثبات سداد مشتريات مع الاستفادة من خصم تعجيل الدفع",
    "difficulty": "intermediate",
    "questionType": "applied",
    "question": "اشترت شركة بضاعة على الحساب في 1 مارس بمبلغ 60,000 جنيه بشروط (3/10 صافي 30). قامت الشركة بسداد المستحق عليها بشيك في 8 مارس. صغ قيد اليومية الخاص بعملية السداد موضحاً المبالغ.",
    "correctAnswer": "من حـ/ الموردين (60,000) إلى مذكورين: حـ/ البنك (58,200) وحـ/ الخصم المكتسب (1,800)",
    "explanation": "تم السداد خلال 7 أيام (أقل من 10 أيام)، فيستحق الخصم النقدي = 60,000 × 3% = 1,800 جنيه. القيد: 60,000 من حـ/ الموردين، إلى مذكورين: 58,200 حـ/ البنك، 1,800 حـ/ الخصم المكتسب.",
    "tags": [
      "مسائل تطبيقية",
      "الخصم المكتسب",
      "قيود السداد",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 21,
      "concept": "قيود الخصم المكتسب"
    }
  },
  {
    "id": "eb-applied-009",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-2",
    "concept": "قيد مردودات المبيعات وإشعار الخصم",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "قام العميل 'طارق' برد بضاعة غير مطابقة للمواصفات كانت قد بيعت له على الحساب بمبلغ 8,000 جنيه. صغ قيد اليومية اللازم لإثبات مردودات المبيعات في دفاتر المنشأة.",
    "correctAnswer": "8,000 من حـ/ مردودات ومسموحات المبيعات ، 8,000 إلى حـ/ العملاء (طارق)",
    "explanation": "حساب مردودات المبيعات مدين بطبيعته لأنه يخفض إيراد المبيعات، ويجعل حساب العميل دائناً لخفض المديونية المستحقة عليه بمبلغ 8,000 جنيه.",
    "tags": [
      "مسائل تطبيقية",
      "مردودات المبيعات",
      "قيود اليومية",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 22,
      "concept": "قيود مردودات المبيعات"
    }
  },
  {
    "id": "eb-applied-010",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-4",
    "concept": "المعالجة المحاسبية للأوراق التجارية (الكمبيالات)",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "باعت منشأة بضاعة بمبلغ 30,000 جنيه وحصلت على كمبيالة تستحق السداد بعد 3 أشهر. صغ قيد استلام الكمبيالة، ثم صغ قيد تحصيل قيمتها نقداً في تاريخ الاستحقاق.",
    "correctAnswer": "عند الاستلام: من حـ/ أوراق القبض إلى حـ/ المبيعات (30,000). وعند التحصيل: من حـ/ الخزينة إلى حـ/ أوراق القبض (30,000)",
    "explanation": "عند البيع بسند إذني يثبت الأصل 'أوراق القبض' مديناً، وعند تحصيل القيمة في موعد الاستحقاق تزيد الخزينة (مدينة) وتقفل ورقة القبض بجعلها دائنة.",
    "tags": [
      "مسائل تطبيقية",
      "أوراق القبض",
      "الكمبيالات",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 22,
      "concept": "معالجة الأوراق التجارية"
    }
  },
  {
    "id": "eb-case-003",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-3",
    "concept": "المفاضلة المالية بين الاستفادة من الخصم النقدي والاقتراض البنكي",
    "difficulty": "challenge",
    "questionType": "case",
    "question": "اشترت شركة بضاعة بـ 100,000 جنيه بشروط (2/10 صافي 30). الشركة لا تمتلك نقدية في اليوم العاشر ولكن يمكنها الاقتراض من البنك بفائدة شهرية 1% لسداد الفاتورة واقتناص الخصم. قيم هذا القرار مالياً وقدم توصيتك المحاسبية.",
    "correctAnswer": "يوصى بالاقتراض وسداد الفاتورة فوراً؛ لأن قيمة الخصم المكتسب (2,000 جنيه) تفوق تكلفة فائدة القرض عن فترة الـ 20 يوماً المتبقية (حوالي 653 جنيهاً)",
    "explanation": "الاستفادة من الخصم توفر 2,000 جنيه (2%). تكلفة الاقتراض لمدة 20 يوماً = 98,000 × 1% × (20/30) ≈ 653 جنيهاً. الصافي المحقق لصالح الشركة = 2,000 - 653 = 1,347 جنيهاً، مما يبرر الاقتراض اقتصادياً.",
    "tags": [
      "حالات عملية",
      "الخصم النقدي",
      "القرارات المالية",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 22,
      "concept": "الجدوى الاقتصادية للخصم النقدي"
    }
  },
  {
    "id": "eb-ana-003",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-1",
    "concept": "تحليل الأخطاء في توجيه قيود المصروفات الرأسمالية والإيرادية",
    "difficulty": "advanced",
    "questionType": "analytical",
    "question": "قامت منشأة بإجراء عمرة شاملة لمحرك إحدى شاحنات النقل بمبلغ 40,000 جنيه أدت إلى زيادة عمرها الإنتاجي 4 سنوات. قام المحاسب بقيد العملية: (40,000 من حـ/ مصروفات صيانة الشاحنات إلى حـ/ البنك). حلل الخطأ المحاسبي وحدد قيد التصحيح اللازم.",
    "correctAnswer": "الخطأ هو اعتبار المصروف إيرادياً بينما هو مصروف رأسمالي يطيل عمر الأصل؛ وقيد التصحيح: 40,000 من حـ/ السيارات (الشاحنات) ، 40,000 إلى حـ/ مصروفات صيانة الشاحنات",
    "explanation": "المصروف الذي يزيد الطاقة الإنتاجية أو يطيل العمر الإنتاجي للأصل يعد مصروفاً رأسمالياً يضاف إلى تكلفة الأصل الثابت ولا يحمل كمصروف جاري على قائمة الدخل.",
    "tags": [
      "تحليل أخطاء",
      "المصروفات الرأسمالية",
      "تصحيح القيود",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 22,
      "concept": "التفرقة بين المصروف الرأسمالي والإيرادي"
    }
  },
  {
    "id": "eb-jre-003",
    "lessonId": "lesson-3",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-3-2",
    "concept": "مبررات الفصل المحاسبي بين المسحوبات النقدية والعينية",
    "difficulty": "challenge",
    "questionType": "jre",
    "question": "سحب مالك المنشأة بضاعة لاستخدامه المنزلي تكلفتها 6,000 جنيه وسعر بيعها للجمهور 7,500 جنيه، وسجلها المحاسب مديناً لحساب المسحوبات بسعر البيع ودائناً لحساب المبيعات. صغ مقالاً تبريرياً نقدياً (JRE) يحلل سلامة هذا الإجراء وفقاً لأسس تقييم المسحوبات.",
    "correctAnswer": "الحكم: الإجراء غير سليم ويفضل تقييمها بالتكلفة بجعل المشتريات دائنة؛ التعليل: المالك لا يشتري من منشأته بربح تجاري؛ الأدلة: تسجيلها بسعر البيع يضخم المبيعات بأرباح وهمية غير محققة مع أطراف خارجية",
    "explanation": "منهجية JRE: 1. الحكم: تقييم المسحوبات بسعر البيع يؤدي للاعتراف بأرباح وهمية مع الذات. 2. التعليل: الأصل في المسحوبات العينية أن تقيم بسعر التكلفة بجعل حـ/ المشتريات دائناً لإلغاء تكلفة البضاعة المسحوبة. 3. الأدلة: تطبيق مبدأ الحيطة والحذر ومفهوم الكيان المستقل يمنع توليد أرباح من معاملات المالك غير التجارية.",
    "tags": [
      "JRE",
      "المسحوبات العينية",
      "تقييم المسحوبات",
      "Bloom:Create"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "synthesis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 22,
      "concept": "تقييم المسحوبات العينية"
    }
  },
  {
    "id": "eb-mcq-051",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-1",
    "concept": "وظيفة دفتر الأستاذ العام",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "ما هي الوظيفة الأساسية لعملية الترحيل إلى دفتر الأستاذ العام في الدورة المحاسبية؟",
    "options": [
      "تجميع وتبويب وتلخيص كافة المعاملات الخاصة بكل حساب مستقل لتحديد رصيده الصافي",
      "إثبات العمليات المالية وفق تسلسلها الزمني اليومي",
      "إعداد الإقرارات الضريبية الشهرية",
      "استخراج أسعار بيع المنتجات في السوق"
    ],
    "correctAnswer": "تجميع وتبويب وتلخيص كافة المعاملات الخاصة بكل حساب مستقل لتحديد رصيده الصافي",
    "explanation": "دفتر الأستاذ هو سجل التبويب النهائي؛ يقوم بتجميع كافة الحركات المدينة والدائنة المتعلقة بحساب معين لإظهار مركزه ورصيده في أي لحظة.",
    "tags": [
      "دفتر الأستاذ",
      "الترحيل والتبويب",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 25,
      "concept": "أهمية دفتر الأستاذ"
    }
  },
  {
    "id": "eb-mcq-052",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-3",
    "concept": "حدود ميزان المراجعة والأخطاء التي لا يكشفها",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "أي من الأخطاء المحاسبية التالية لن يؤدي إلى حدوث أي خلل في توازن ميزان المراجعة (يتساوى الجانبان رغم وجود الخطأ)؟",
    "options": [
      "ترحيل قيد يومية صحيح بالكامل إلى حساب شخصي آخر بالخطأ (خطأ في التوجيه)",
      "ترحيل مبلغ مدين 5,000 جنيه إلى الجانب المدين كـ 500 جنيه فقط",
      "إثبات جانب مدين في القيد دون إثبات الجانب الدائن",
      "إدراج رصيد حساب أوراق الدفع ضمن الأرصدة المدينة بميزان المراجعة"
    ],
    "correctAnswer": "ترحيل قيد يومية صحيح بالكامل إلى حساب شخصي آخر بالخطأ (خطأ في التوجيه)",
    "explanation": "خطأ التوجيه المحاسبي يرحل مبالغ متساوية تماماً في الجانبين المدين والدائن، ولذلك يتوازن ميزان المراجعة حسابياً ولا يستطيع كشف هذا الخطأ النوعي.",
    "tags": [
      "ميزان المراجعة",
      "أخطاء التوجيه",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 25,
      "concept": "الأخطاء التي لا تؤثر على توازن الميزان"
    }
  },
  {
    "id": "eb-tf-015",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-2",
    "concept": "قاعدة تحديد طبيعة الرصيد في حساب T",
    "difficulty": "basic",
    "questionType": "true_false",
    "question": "إذا كان مجموع الجانب المدين في حساب 'البنك' 150,000 جنيه ومجموع الجانب الدائن 90,000 جنيه، فإن الحساب يظهر رصيداً دائناً منقولاً قدره 60,000 جنيه.",
    "correctAnswer": false,
    "explanation": "الرصيد مدين قدره 60,000 جنيه لأن الجانب المدين أكبر من الجانب الدائن بمقدار 60,000 جنيه، وطبيعة رصيد الحساب تتبع الجانب الأكبر.",
    "tags": [
      "حساب T",
      "الترصيد",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 25,
      "concept": "قواعد ترصيد الحسابات"
    }
  },
  {
    "id": "eb-t_account-002",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-1",
    "concept": "إعداد وترصيد حساب العملاء (المدينين)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "question": "أظهرت حركة حساب العميل 'الأمانة': رصيد أول المدة مدين 20,000 جنيه، مبيعات آجلة خلال الشهر 55,000 جنيه، مردودات مبيعات 5,000 جنيه، سداد نقدي 40,000 جنيه، ورقة قبض مقبولة 10,000 جنيه. رصد حساب T للعميل وحدد رصيده النهائي.",
    "correctAnswer": "رصيد مدين قدره 20,000 جنيه",
    "explanation": "الجانب المدين = 20,000 (أول المدة) + 55,000 (مبيعات) = 75,000 جنيه. الجانب الدائن = 5,000 (مردودات) + 40,000 (سداد) + 10,000 (أوراق قبض) = 55,000 جنيه. الرصيد المرحل = 75,000 - 55,000 = 20,000 جنيه رصيد مدين.",
    "tags": [
      "T-Account",
      "حساب العملاء",
      "الترصيد",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 25,
      "concept": "ترصيد حسابات العملاء"
    }
  },
  {
    "id": "eb-t_account-003",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-1",
    "concept": "ترصيد حساب الموردين (الدائنين)",
    "difficulty": "intermediate",
    "questionType": "t_account",
    "question": "بدأ حساب شركة 'النور' للمهمات برصيد دائن 30,000 جنيه. وتمت العمليات: شراء مهمات على الحساب بـ 45,000 جنيه، رد مهمات تالفة بـ 5,000 جنيه، سداد بشيك بـ 50,000 جنيه مع الحصول على خصم مكتسب 2,000 جنيه. احسب الرصيد النهائي لحساب المورد في دفتر الأستاذ.",
    "correctAnswer": "رصيد دائن قدره 18,000 جنيه",
    "explanation": "الجانب الدائن = 30,000 + 45,000 = 75,000 جنيه. الجانب المدين = 5,000 (مردودات) + 50,000 (شيك) + 2,000 (خصم) = 57,000 جنيه. الرصيد الدائن المتبقي = 75,000 - 57,000 = 18,000 جنيه دائن.",
    "tags": [
      "T-Account",
      "حساب الموردين",
      "الترصيد",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 26,
      "concept": "ترصيد حسابات الموردين"
    }
  },
  {
    "id": "eb-applied-011",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-4",
    "concept": "إعداد ميزان المراجعة بالأرصدة وتحديد المجهول",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "استخرجت الأرصدة التالية: خزينة 30,000، بضاعة 50,000، عملاء 40,000، سيارات 120,000، موردون 45,000، أوراق دفع 15,000، مبيعات 160,000، مشتريات 90,000، مصروفات عمومية 20,000. إذا علمت أن ميزان المراجعة متوازن، احسب قيمة رأس المال.",
    "correctAnswer": "130,000 جنيه",
    "explanation": "الأرصدة المدينة = 30,000 (خزينة) + 50,000 (بضاعة) + 40,000 (عملاء) + 120,000 (سيارات) + 90,000 (مشتريات) + 20,000 (مصروفات) = 350,000 جنيه. الأرصدة الدائنة = 45,000 (موردون) + 15,000 (أوراق دفع) + 160,000 (مبيعات) + رأس المال = 220,000 + رأس المال. رأس المال = 350,000 - 220,000 = 130,000 جنيه.",
    "tags": [
      "مسائل تطبيقية",
      "ميزان المراجعة",
      "رأس المال",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 26,
      "concept": "إعداد ميزان المراجعة بالأرصدة"
    }
  },
  {
    "id": "eb-ana-004",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-3",
    "concept": "تحليل أثر أخطاء ميزان المراجعة وفرق الترصيد",
    "difficulty": "challenge",
    "questionType": "analytical",
    "question": "عند إعداد ميزان المراجعة، بلغ مجموع الجانب المدين 425,000 جنيه والجانب الدائن 417,800 جنيه. وعند الفحص اكتشف: 1) إغفال ترحيل مصروف صيانة مدين بـ 3,600 جنيه، 2) تسجيل رصيد عميل مدين بـ 7,200 جنيه كـ 2,700 جنيه بالخطأ (خطأ تبديل أرقام)، 3) إدراج إيراد فوائد دائن بـ 6,300 جنيه ضمن الجانب المدين. أثبت الحسابات وصحح التوازن.",
    "correctAnswer": "بعد التصحيح: الجانب المدين المعدل = 426,800 جنيه، الجانب الدائن المعدل = 426,800 جنيه، ويتطابق الميزان تماماً",
    "explanation": "المدين المعدل: 425,000 + 3,600 (مصروف سقط) + 4,500 (تصحيح خطأ العميل: 7,200-2,700) - 6,300 (استبعاد الإيراد الموضوع خطأ بالمدين) = 426,800 جنيه. الدائن المعدل: 417,800 + 6,300 (إضافة الإيراد لمكانه الدائن الصحيح) + 2,700 = 426,800 جنيه.",
    "tags": [
      "تحليل أخطاء",
      "ميزان المراجعة",
      "تصحيح الفروق",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 26,
      "concept": "معالجة فروق ميزان المراجعة"
    }
  },
  {
    "id": "eb-case-004",
    "lessonId": "lesson-4",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-4-4",
    "concept": "تقييم الاعتماد على ميزان المراجعة كأساس وحيد للرقابة",
    "difficulty": "advanced",
    "questionType": "case",
    "question": "اكتفى المراجع الداخلي لشركة 'الصفوة' بفحص توازن ميزان المراجعة في نهاية العام وأصدر تقريراً يؤكد خلو الدفاتر تماماً من أي أخطاء أو اختلاسات استناداً إلى تطابق مجموع المدين والدائن. قيم هذا التقرير مبيناً أوجه القصور المهني.",
    "correctAnswer": "تقرير معيب مهنياً؛ لأن ميزان المراجعة يثبت التوازن الحسابي فقط ولا يكشف الأخطاء المتكافئة، أو أخطاء الحذف الكامل، أو أخطاء التوجيه، أو قيود التزوير المتوازنة",
    "explanation": "توازن ميزان المراجعة دليل ضروري ولكنه غير كافٍ على صحة الحسابات؛ حيث توجد فئات واسعة من الأخطاء لا تؤثر على التوازن مثل السهو التام، وتكرار القيد، وخطأ التوجيه المحاسبي، والأخطاء التعويضية.",
    "tags": [
      "حالات عملية",
      "ميزان المراجعة",
      "الرقابة الداخلية",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 26,
      "concept": "كفاية ميزان المراجعة في الرقابة"
    }
  },
  {
    "id": "eb-mcq-053",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "حساب مجمل الربح في قائمة الدخل",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "في قائمة الدخل للمنشآت التجارية، يتم الوصول إلى 'مجمل الربح' من خلال المعادلة:",
    "options": [
      "صافي المبيعات - تكلفة البضاعة المباعة",
      "إجمالي الإيرادات - إجمالي المصروفات التشغيلية",
      "صافي المبيعات - المصروفات الإدارية والعمومية",
      "تكلفة البضاعة المباعة + بضاعة آخر المدة"
    ],
    "correctAnswer": "صافي المبيعات - تكلفة البضاعة المباعة",
    "explanation": "مجمل الربح (Gross Profit) يمثل فائض إيراد النشاط التجاري المباشر (صافي المبيعات) عن التكلفة المباشرة للبضاعة التي تم بيعها (تكلفة المبيعات).",
    "tags": [
      "قائمة الدخل",
      "مجمل الربح",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 28,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 28,
      "concept": "حساب مجمل الربح"
    }
  },
  {
    "id": "eb-mcq-054",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-2",
    "concept": "تبويب الأصول المتداولة في المركز المالي",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "أي من العناصر التالية يبوب حصراً ضمن مجموعة 'الأصول المتداولة' في قائمة المركز المالي للمنشأة؟",
    "options": [
      "الخزينة، العملاء، بضاعة آخر المدة، المصروفات المقدمة",
      "المباني، الشهرة، الأثاث، الآلات",
      "القروض طويلة الأجل، الموردون، السحب على المكشوف",
      "رأس المال، الاحتياطيات، الأرباح المحتجزة"
    ],
    "correctAnswer": "الخزينة، العملاء، بضاعة آخر المدة، المصروفات المقدمة",
    "explanation": "الأصول المتداولة تشمل النقدية والأصول الأخرى المتوقع تحويلها إلى نقدية أو بيعها أو استهلاكها خلال دورة تشغيلية واحدة أو سنة مالية أيهما أطول.",
    "tags": [
      "قائمة المركز المالي",
      "الأصول المتداولة",
      "Bloom:Understand"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 29,
      "concept": "تبويب الأصول المتداولة"
    }
  },
  {
    "id": "eb-tf-016",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-2",
    "concept": "التفرقة بين الالتزامات المتداولة وغير المتداولة",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "question": "يدرج الجزء الجاري استحقاقه وسداده خلال العام القادم من قرض بنكي طويل الأجل ضمن 'الالتزامات المتداولة' بقائمة المركز المالي.",
    "correctAnswer": true,
    "explanation": "طبقاً لمعايير العرض المحاسبي، يعاد تبويب أي قسط من الالتزامات طويلة الأجل يستحق سداده خلال الـ 12 شهراً القادمة كالتزام متداول.",
    "tags": [
      "قائمة المركز المالي",
      "الالتزامات المتداولة",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 29,
      "concept": "تبويب الالتزامات المتداولة"
    }
  },
  {
    "id": "eb-applied-012",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "حساب تكلفة البضاعة المباعة ومجمل الربح",
    "difficulty": "intermediate",
    "questionType": "applied",
    "question": "توافرت البيانات: بضاعة أول المدة 40,000 جنيه، المشتريات 180,000 جنيه، مصروفات نقل المشتريات 10,000 جنيه، مردودات المشتريات 15,000 جنيه، بضاعة آخر المدة 35,000 جنيه، والمبيعات 300,000 جنيه ومردوداتها 20,000 جنيه. احسب تكلفة البضاعة المباعة ومجمل الربح.",
    "correctAnswer": "تكلفة البضاعة المباعة = 180,000 جنيه، ومجمل الربح = 100,000 جنيه",
    "explanation": "صافي المشتريات = 180,000 + 10,000 - 15,000 = 175,000 جنيه. تكلفة البضاعة المتاحة للبيع = 40,000 + 175,000 = 215,000 جنيه. تكلفة البضاعة المباعة = 215,000 - 35,000 = 180,000 جنيه. صافي المبيعات = 300,000 - 20,000 = 280,000 جنيه. مجمل الربح = 280,000 - 180,000 = 100,000 جنيه.",
    "tags": [
      "مسائل تطبيقية",
      "تكلفة المبيعات",
      "مجمل الربح",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 29,
      "concept": "معادلة تكلفة المبيعات"
    }
  },
  {
    "id": "eb-applied-013",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "إعداد قائمة الدخل واستخراج صافي الربح التشغيلي والنهائي",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "إذا كان مجمل الربح 120,000 جنيه، وبلغت المصروفات البيعية والتسويقية 30,000 جنيه، والمصروفات الإدارية والعمومية 40,000 جنيه، وإيراد استثمارات أوراق مالية 15,000 جنيه، وفوائد قروض مدينة 5,000 جنيه. احسب صافي ربح النشاط التشغيلي وصافي الربح النهائي للعام.",
    "correctAnswer": "صافي الربح التشغيلي = 50,000 جنيه، وصافي الربح النهائي = 60,000 جنيه",
    "explanation": "صافي الربح التشغيلي = مجمل الربح (120,000) - المصروفات البيعية والإدارية (30,000 + 40,000) = 50,000 جنيه. صافي الربح النهائي = 50,000 + إيراد استثمارات (15,000) - فوائد مدينة (5,000) = 60,000 جنيه.",
    "tags": [
      "مسائل تطبيقية",
      "قائمة الدخل",
      "صافي الربح التشغيلي",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 29,
      "concept": "هيكل قائمة الدخل"
    }
  },
  {
    "id": "eb-applied-014",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-2",
    "concept": "استخراج إجمالي حقوق الملكية بالمركز المالي",
    "difficulty": "advanced",
    "questionType": "applied",
    "question": "تضمنت دفاتر شركة في نهاية العام: رأس المال في بداية العام 300,000 جنيه، صافي أرباح العام المحققة 95,000 جنيه، احتياطي نظامي مستقطع 10,000 جنيه، مسحوبات شخصية للمالك 25,000 جنيه. احسب إجمالي حقوق الملكية الواجب إدراجها بقائمة المركز المالي.",
    "correctAnswer": "370,000 جنيه",
    "explanation": "حقوق الملكية = رأس المال (300,000) + صافي أرباح العام (95,000) - المسحوبات الشخصية (25,000) = 370,000 جنيه. (الاحتياطي النظامي هو مجرد تبويب واحتجاز داخلي ضمن حقوق الملكية ولا يغير إجماليها).",
    "tags": [
      "مسائل تطبيقية",
      "حقوق الملكية",
      "قائمة المركز المالي",
      "Bloom:Apply"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "application",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "حقوق الملكية بالمركز المالي"
    }
  },
  {
    "id": "eb-case-005",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-3",
    "concept": "تقييم سيولة المنشأة ورأس المال العامل",
    "difficulty": "advanced",
    "questionType": "case",
    "question": "بلغت الأصول المتداولة لشركة 150,000 جنيه (منها 90,000 مخزون بطيء الحركة) والتزاماتها المتداولة 120,000 جنيه مستحقة السداد خلال شهرين. اعتبر المدير المالي أن الشركة في وضع سيولة آمن وممتاز لأن رأس المال العامل موجب (+30,000). قيم موقف المدير المالي محاسبياً ونقدياً.",
    "correctAnswer": "تقييم مضلل؛ لأن نسبة السيولة السريعة (بدون المخزون) = (150,000 - 90,000) ÷ 120,000 = 0.5 فقط، مما يهدد المنشأة بمخاطر عجز سداد فوري",
    "explanation": "رأس المال العامل الموجب لا يضمن وحده السيولة الفورية؛ فالأصول النقدية وشبه النقدية تبلغ 60,000 جنيه فقط بينما الالتزامات الفورية 120,000 جنيه، مما يعني عجزاً نقدياً وشيكاً إذا تعذر تصريف المخزون سريعاً.",
    "tags": [
      "حالات عملية",
      "رأس المال العامل",
      "نسب السيولة",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "تقييم السيولة ورأس المال العامل"
    }
  },
  {
    "id": "eb-ana-005",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-2",
    "concept": "تحليل أثر تسعير بضاعة آخر المدة على القوائم المالية",
    "difficulty": "challenge",
    "questionType": "analytical",
    "question": "قامت شركة بتقييم بضاعة آخر المدة بمبلغ 70,000 جنيه بدلاً من قيمتها الحقيقية 50,000 جنيه (تضخيم المخزون بـ 20,000 جنيه). حلل أثر هذا التقييم الخاطئ بدقة على: 1) تكلفة البضاعة المباعة، 2) مجمل الربح، 3) إجمالي الأصول بقائمة المركز المالي.",
    "correctAnswer": "يؤدي إلى: تخفيض تكلفة البضاعة المباعة بـ 20,000 جنيه، وتضخيم مجمل الربح بـ 20,000 جنيه، وتضخيم الأصول المتداولة بـ 20,000 جنيه",
    "explanation": "بضاعة آخر المدة تطرح من تكلفة البضاعة المتاحة للبيع؛ فتضخيمها يقلل تكلفة المبيعات بصورة مصطنعة، مما يرفع مجمل وصافي الربح ويضخم الأصول وحقوق الملكية بالمركز المالي.",
    "tags": [
      "تحليل أخطاء",
      "بضاعة آخر المدة",
      "تأثير التقييم",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "أثر أخطاء المخزون على القوائم"
    }
  },
  {
    "id": "eb-jre-004",
    "lessonId": "lesson-5",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-5-1",
    "concept": "مقال JRE حول تحميل نفقات التسويق كأصل مؤجل",
    "difficulty": "challenge",
    "questionType": "jre",
    "question": "أطلقت منشأة حملة إعلانية كبرى بمبلغ 120,000 جنيه للترويج لمنتج جديد، وقرر المحاسب رسملة هذا المبلغ بالكامل كـ 'أصل غير ملموس' يستهلك على 5 سنوات بهدف عدم التأثير سلباً على أرباح السنة الحالية. صغ مقالاً تبريرياً (JRE) لتقييم هذه المعالجة.",
    "correctAnswer": "الحكم: معالجة غير سليمة محاسبياً؛ التعليل: نفقات الدعاية لا تولد منافع مستقبلية مؤكدة يمكن السيطرة عليها كأصل؛ الأدلة: معايير المحاسبة تلزم بالاعتراف بمصروفات الإعلان كمصروف فترة فور تكبدها",
    "explanation": "1. الحكم: رسملة الإعلان مخالفة للمعايير. 2. التعليل: الإعلان مصروف إيرادي دوري يهدف لتنشيط المبيعات ولا يتوافر فيه شرط الأصل غير الملموس. 3. الأدلة: تطبيق مبدأ التحفظ والحيطة والحذر يلزم بتحميله فوراً على قائمة الدخل لعام الإنفاق.",
    "tags": [
      "JRE",
      "رسملة المصروفات",
      "نفقات الإعلان",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 30,
      "concept": "معالجة نفقات الدعاية والإعلان"
    }
  },
  {
    "id": "eb-mcq-055",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-1",
    "concept": "أركان ومنهجية التبرير المحاسبي JRE",
    "difficulty": "basic",
    "questionType": "mcq",
    "question": "تتكون منهجية التبرير المحاسبي المدعوم بالأدلة (JRE) من ثلاثة أركان رئيسية متسلسلة هي:",
    "options": [
      "الحكم المهني (Judgment)، التعليل المنطقي (Reasoning)، الأدلة المعيارية (Evidence)",
      "الجدول الزمني، التسجيل بالدفاتر، الاستنتاج النهائي",
      "القيد المحاسبي، الترحيل للأستاذ، إعداد الميزان",
      "التخمين المالي، مقارنة الأسعار، اتخاذ القرار"
    ],
    "correctAnswer": "الحكم المهني (Judgment)، التعليل المنطقي (Reasoning)، الأدلة المعيارية (Evidence)",
    "explanation": "إطار JRE المعتمد في البكالوريا المصرية يرتكز على إصدار الحكم الصريح، ثم تقديم التعليل المستند للمبادئ المحاسبية، وتدعيمه بالأدلة الرقمية والمعيارية الملموسة.",
    "tags": [
      "JRE",
      "منهجية التبرير",
      "أركان JRE",
      "Bloom:Remember"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 32,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "comprehension",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 32,
      "concept": "هيكل منهجية JRE"
    }
  },
  {
    "id": "eb-mcq-056",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-2",
    "concept": "جودة الأدلة في تقييم المخصصات في مقال JRE",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "عند كتابة مقال JRE لتقييم قرار تكوين مخصص ديون مشكوك في تحصيلها، ما هو الدليل المحاسبي الأقوى الذي يجب أن يسوقه المحلل لدعم موقفه؟",
    "options": [
      "التحليل العمري للديون ونسب التعثر التاريخية الموثقة للعملاء ومبدأ الحيطة والحذر",
      "الرغبة في تقليل الضرائب فقط بأي وسيلة",
      "الشعور العام لمدير المبيعات بعدم وفاء العملاء",
      "حجم رأس مال الشركة المسجل بالسجل التجاري"
    ],
    "correctAnswer": "التحليل العمري للديون ونسب التعثر التاريخية الموثقة للعملاء ومبدأ الحيطة والحذر",
    "explanation": "الأدلة في منهجية JRE يجب أن تكون موضوعية ومبنية على وقائع رقمية قابلة للتحقق (جدول أعمار الديون) ومعايير محاسبية معتمدة (التحفظ والمقابلة).",
    "tags": [
      "JRE",
      "الأدلة الموضوعية",
      "مخصص الديون",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 33,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 33,
      "concept": "توثيق الأدلة في JRE"
    }
  },
  {
    "id": "eb-mcq-057",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-1",
    "concept": "كشف المغالطات المحاسبية في مقالات التبرير",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "question": "استند محاسب في تبرير عدم تسجيل فاتورة شراء بضاعة وردت للمخازن في 30 ديسمبر إلى عدم استلام الفاتورة الورقية الأصلية من المورد حتى 5 يناير. ما هو المبدأ المحاسبي الذي يدحض هذا التبرير ويعد دليلاً على خطأ المحاسب؟",
    "options": [
      "مبدأ تغليب الجوهر الاقتصادي على الشكل القانوني وأساس الاستحقاق",
      "مبدأ التكلفة التاريخية",
      "مبدأ الوحدة النقدية الثابتة",
      "فرض الشخصية المعنوية"
    ],
    "correctAnswer": "مبدأ تغليب الجوهر الاقتصادي على الشكل القانوني وأساس الاستحقاق",
    "explanation": "الجوهر الاقتصادي والاستحقاق يفرضان إثبات واقعة الشراء واستلام البضاعة بالمخازن وإدراج الالتزام فور حدوث الواقعة المادية دون انتظار المستند الشكلي.",
    "tags": [
      "JRE",
      "الجوهر الاقتصادي",
      "أساس الاستحقاق",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 33,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 33,
      "concept": "الجوهر الاقتصادي في مقالات JRE"
    }
  },
  {
    "id": "eb-case-006",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-2",
    "concept": "سيناريو متكامل لمقال JRE حول الاعتراف بالإيراد قبل التسليم",
    "difficulty": "challenge",
    "questionType": "case",
    "question": "أبرمت منشأة عقداً لبيع بضاعة بقيمة 500,000 جنيه واستلمت شيكاً بكامل القيمة في 28 ديسمبر 2025 على أن يتم تصنيع وتسليم البضاعة في فبراير 2026. قام المدير المالي بالاعتراف بكامل الـ 500,000 جنيه كإيراد مبيعات لعام 2025 لصرف مكافآت الأداء. صغ تقييماً متكاملاً للموقف.",
    "correctAnswer": "تصرف غير سليم وتضليلي؛ لأن واقعة الأداء وانتقال المخاطر والمنافع للعميل لم تتم في 2025، ويجب تسجيل المبلغ كـ (عملاء - دفعات مقدمة / التزام) وليس إيراداً",
    "explanation": "الحكم: الاعتراف بالإيراد خاطئ ومخالف للمعيار. التعليل: لا يعترف بإيراد البيع إلا عند استيفاء التزام الأداء وتسليم السلع وانتقال السيطرة للعميل. الدليل: البضاعة لم تصنع ولم تسلم، والنقدية المستلمة التزام واجب الإدراج بالمركز المالي كإيراد غير مكتسب.",
    "tags": [
      "حالات عملية",
      "JRE",
      "تحقق الإيراد",
      "Bloom:Evaluate"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 33,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "evaluation",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 33,
      "concept": "تقييم تحقق الإيراد JRE"
    }
  },
  {
    "id": "eb-jre-005",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-2",
    "concept": "صياغة مرافعة محاسبية JRE حول التغيير غير المبرر في طرق تقييم المخزون",
    "difficulty": "challenge",
    "questionType": "jre",
    "question": "حولت شركة طريقة تقييم مخزونها من المتوسط المرجح إلى الوارد أولاً صادر أولاً (FIFO) في سنة شهدت تضخماً حاداً بالأسعار، مما رفع قيمة بضاعة آخر المدة وأظهر أرباحاً قياسية دون الإفصاح عن أثر التغيير. صغ مقال JRE ثلاثي الأركان يفند هذا التصرف.",
    "correctAnswer": "1. الحكم: تصرف مخل بموثوقية القوائم. 2. التعليل: خرق مبدأ الثبات والاتساق والإفصاح التام. 3. الأدلة: الأرباح الناتجة وهمية وتضخمية بسبب تغير السياسة المحاسبية دون إفصاح مالي مقارن",
    "explanation": "الحكم: التصرف يخالف مبادئ الشفافية والاتساق. التعليل: تغيير السياسة المحاسبية بغرض إظهار أرباح صورية يفقد القوائم ميزة المقارنة الموثوقة عبر الفترات. الأدلة: عدم الإفصاح عن فروق التقييم البالغة ملايين الجنيهات يحجب الحقيقة الاقتصادية عن المستثمرين والدائنين.",
    "tags": [
      "JRE",
      "الثبات والاتساق",
      "تقييم المخزون",
      "Bloom:Create"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 34,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "synthesis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 34,
      "concept": "مرافعة JRE حول سياسات المخزون"
    }
  },
  {
    "id": "eb-t_account-004",
    "lessonId": "lesson-6",
    "unitId": "unit-1",
    "learningObjectiveId": "obj-6-1",
    "concept": "محاكاة حساب الأستاذ المساعد وتسوية خلاف في مقال JRE",
    "difficulty": "advanced",
    "questionType": "t_account",
    "question": "أظهر حساب المورد 'الأصيل' بدفاتر المنشأة رصيداً دائناً 80,000 جنيه، بينما أظهر كشف حساب المورد الوارد من طرفه رصيداً مستحقاً 115,000 جنيه. وعند المطابقة تبين: 1) شيك مسدد بـ 25,000 جنيه لم يقدمه المورد للصرف، 2) بضاعة مشتراة بـ 10,000 جنيه سجلت بدفاتر المنشأة ولم تسجل بدفاتر المورد. بين الحساب المرجح وأثر التسوية.",
    "correctAnswer": "الرصيد المطابق الفعلي لكلا الطرفين بعد التسوية = 90,000 جنيه",
    "explanation": "كشف حساب المورد (115,000) - شيك بالطريق (25,000) = 90,000 جنيه. حساب الأستاذ بالمنشأة (80,000) + بضاعة بالطريق/تعديل (10,000) = 90,000 جنيه رصيد متطابق تماماً بعد إزالة الفروق التوقيتية.",
    "tags": [
      "T-Account",
      "تسوية الحسابات",
      "JRE",
      "Bloom:Analyze"
    ],
    "sourceType": "official_textbook",
    "sourcePage": 34,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "bloomLevel": "analysis",
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 34,
      "concept": "مطابقة كشوف الحسابات JRE"
    }
  }
];

/**
 * أسئلة الوحدة الثانية المعتمدة لكتاب الوزارة (18 سؤالاً رسمياً تم نقلها من unit2Questions)
 */
export const unit2OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "eb2-mcq-001",
    "sourceQuestionId": "U2-Q01",
    "originalId": "U2-Q01",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "subLo": "LO-U2.1",
    "concept": "أساس قاعدة القيد المزدوج",
    "difficulty": "basic",
    "bloomLevel": "knowledge",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "تنص قاعدة القيد المزدوج في المحاسبة المالية على أن كل معاملة مالية:",
    "options": [
      "تُسجل مرتين في نهاية كل سنة مالية",
      "تُحدث أثرًا متكافئًا في حسابين على الأقل يحافظ على توازن المعادلة المحاسبية",
      "تزيد دائمًا من أرباح المنشأة ورصيد نقدية الخزينة",
      "تتطلب موافقة كتابية مسبقة من مصلحة الضرائب قبل قيدها"
    ],
    "correctAnswer": "تُحدث أثرًا متكافئًا في حسابين على الأقل يحافظ على توازن المعادلة المحاسبية",
    "explanation": "قاعدة القيد المزدوج تقتضي تسجيل كل حدث مالي بطرفين متكافئين على الأقل لضمان استمرار توازن معادلة المركز المالي.",
    "tags": [
      "القيد المزدوج",
      "المعادلة المحاسبية",
      "فهم",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 35,
      "concept": "قاعدة القيد المزدوج"
    }
  },
  {
    "id": "eb2-mcq-002",
    "sourceQuestionId": "U2-Q02",
    "originalId": "U2-Q02",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "subLo": "LO-U2.1",
    "concept": "الأنماط الخمسة لتأثير العمليات",
    "difficulty": "intermediate",
    "bloomLevel": "comprehension",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 36,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "قامت منشأة بسداد 25,000 جنيه نقدًا لأحد الموردين. هذه المعاملة تصنف ضمن أي نمط من الأنماط الخمسة؟",
    "options": [
      "زيادة أصل ونقص أصل آخر",
      "نقص أصل ونقص خصوم",
      "زيادة أصل وزيادة خصوم",
      "نقص أصل ونقص حقوق ملكية"
    ],
    "correctAnswer": "نقص أصل ونقص خصوم",
    "explanation": "تنقص النقدية (أصل) وينقص رصيد الموردين (خصم) بنفس القيمة تماماً، وهو النمط الثالث.",
    "tags": [
      "الأنماط الخمسة",
      "أثر المعاملات",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 36,
      "concept": "الأنماط الخمسة"
    }
  },
  {
    "id": "eb2-mcq-003",
    "sourceQuestionId": "b373-u1-023",
    "originalId": "U2-Q03",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "subLo": "LO-U2.1",
    "concept": "الفرق بين التدفق النقدي والربح",
    "difficulty": "intermediate",
    "bloomLevel": "analysis",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 37,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "اقترضت شركة مبلغ 150,000 جنيه من البنك وأودعته في حسابها الجاري. ما الأثر المالي الفوري لهذه العملية؟",
    "options": [
      "تحقيق أرباح غير تشغيلية قدرها 150,000 جنيه",
      "زيادة الأصول وزيادة الخصوم بنفس المبلغ دون توليد أي أرباح",
      "زيادة الأصول وحقوق الملكية",
      "نقص حقوق الملكية وزيادة الالتزامات"
    ],
    "correctAnswer": "زيادة الأصول وزيادة الخصوم بنفس المبلغ دون توليد أي أرباح",
    "explanation": "القرض تمويل خارجي يزيد النقدية بالبنك (أصل) ويقابله التزام سداد للبنك (خصم)؛ ولا علاقة له بالأرباح.",
    "tags": [
      "التدفق النقدي",
      "القروض",
      "المفاهيم الخاطئة",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 37,
      "concept": "نقدية القروض مقابل الأرباح"
    },
    "replacesQuestionId": "b373-u1-023",
    "notes": "Updated with official textbook question b373-u1-023"
  },
  {
    "id": "eb2-tf-001",
    "sourceQuestionId": "U2-Q04",
    "originalId": "U2-Q04",
    "lessonId": "u2-lesson-1",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-1",
    "subLo": "LO-U2.1",
    "concept": "حتمية توازن المعادلة",
    "difficulty": "basic",
    "bloomLevel": "comprehension",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 38,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "شراء أثاث للمكتب نقدًا يغير إجمالي الأصول في قائمة المركز المالي للمنشأة.",
    "correctAnswer": false,
    "explanation": "خطأ؛ المعاملة تبادل داخل الأصول (زيادة أثاث ونقص نقدية بنفس القيمة)، فيظل إجمالي الأصول ثابتاً تماماً دون تغيير.",
    "tags": [
      "تبادل الأصول",
      "المعادلة المحاسبية",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 38,
      "concept": "أثر التبادل داخل الأصول"
    }
  },
  {
    "id": "eb2-mcq-004",
    "sourceQuestionId": "U2-Q05",
    "originalId": "U2-Q05",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "subLo": "LO-U2.2",
    "concept": "طبيعة حسابات المصروفات",
    "difficulty": "basic",
    "bloomLevel": "knowledge",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 39,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "تُسجل المصروفات مدينة عند حدوثها وزيادتها لأنها:",
    "options": [
      "تزيد من أصول المنشأة السائلة",
      "تعتبر التزاماً مستحقاً للغير",
      "تُحدث تخفيضاً في حقوق الملكية ذات الطبيعة الدائنة",
      "تزيد من قيمة رأس المال المستثمر"
    ],
    "correctAnswer": "تُحدث تخفيضاً في حقوق الملكية ذات الطبيعة الدائنة",
    "explanation": "بما أن حقوق الملكية دائنة بطبيعتها، فإن أي عنصر يخفضها (كالمصروفات والمسحوبات) يجب أن يأخذ الاتجاه المقابل وهو المدين.",
    "tags": [
      "المدين والدائن",
      "المصروفات",
      "حقوق الملكية",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 39,
      "concept": "طبيعة المصروفات"
    }
  },
  {
    "id": "eb2-mcq-005",
    "sourceQuestionId": "U2-Q06",
    "originalId": "U2-Q06",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "subLo": "LO-U2.2",
    "concept": "تصنيف المدينين والدائنين",
    "difficulty": "intermediate",
    "bloomLevel": "comprehension",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 40,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "أي العبارات الآتية تصف الفرق بين حساب 'المدينين' وحساب 'الدائنين' بدقة؟",
    "options": [
      "المدينون خصم والدائنون أصل",
      "المدينون أصل يمثل أموالاً للمنشأة بذمة العملاء، والدائنون خصم يمثل التزاماً على المنشأة للموردين",
      "كلاهما خصوم على المنشأة تزداد في الجانب الدائن",
      "المدينون يعبرون عن خسارة محققة والدائنون يعبرون عن ربح مؤكد"
    ],
    "correctAnswer": "المدينون أصل يمثل أموالاً للمنشأة بذمة العملاء، والدائنون خصم يمثل التزاماً على المنشأة للموردين",
    "explanation": "المدينون (العملاء) أصل متداول، بينما الدائنون (الموردون) خصم متداول التزام سداد على الشركة.",
    "tags": [
      "تصنيف الحسابات",
      "المدينون والدائنون",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 40,
      "concept": "تصنيف حسابات العملاء والموردين"
    }
  },
  {
    "id": "eb2-mcq-006",
    "sourceQuestionId": "U2-Q07",
    "originalId": "U2-Q07",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "subLo": "LO-U2.2",
    "concept": "المعادلة الموسعة للملكية",
    "difficulty": "intermediate",
    "bloomLevel": "application",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 41,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "المعادلة المحاسبية الموسعة لحقوق الملكية تُصاغ رياضياً بالشكل التالي:",
    "options": [
      "حقوق الملكية = رأس المال + الإيرادات − المصروفات − المسحوبات",
      "حقوق الملكية = رأس المال − الإيرادات + المصروفات",
      "حقوق الملكية = الأصول + الخصوم + الإيرادات",
      "حقوق الملكية = النقدية + المبيعات − الديون"
    ],
    "correctAnswer": "حقوق الملكية = رأس المال + الإيرادات − المصروفات − المسحوبات",
    "explanation": "الإيرادات تزيد حقوق الملكية، بينما المصروفات والمسحوبات الشخصية تخفضها.",
    "tags": [
      "المعادلة الموسعة",
      "حقوق الملكية",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 41,
      "concept": "معادلة حقوق الملكية الموسعة"
    }
  },
  {
    "id": "eb2-tf-002",
    "sourceQuestionId": "U2-Q08",
    "originalId": "U2-Q08",
    "lessonId": "u2-lesson-2",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-2",
    "subLo": "LO-U2.2",
    "concept": "حركة سداد الالتزامات",
    "difficulty": "basic",
    "bloomLevel": "comprehension",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 42,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "عند سداد دين مستحق لأحد الموردين، يُسجل حساب الموردين دائنًا لأنهم أصحاب الدين.",
    "correctAnswer": false,
    "explanation": "خطأ؛ حساب الموردين خصم دائن، وعند سداده ينقص التزامه فيُسجل مديناً، والنقدية تنقص فتسجل دائنة.",
    "tags": [
      "سداد الديون",
      "المدين والدائن",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 42,
      "concept": "قيد سداد الموردين"
    }
  },
  {
    "id": "eb2-mcq-007",
    "sourceQuestionId": "U2-Q09",
    "originalId": "U2-Q09",
    "lessonId": "u2-lesson-3",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-3",
    "subLo": "LO-U2.3",
    "concept": "الفرق بين اليومية والأستاذ",
    "difficulty": "basic",
    "bloomLevel": "comprehension",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 43,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "يتميز دفتر الأستاذ العام عن دفتر اليومية العامة بأنه:",
    "options": [
      "يسجل المعاملات بترتيب زمني تاريخي فقط",
      "يجمع الحركات المالية بصورة موضوعية مستقلة لكل حساب لاستخراج رصيده",
      "سجل غير إلزامي يمكن الاستغناء عنه بالكامل",
      "يختص بتسجيل العمليات النقدية فقط دون الآجلة"
    ],
    "correctAnswer": "يجمع الحركات المالية بصورة موضوعية مستقلة لكل حساب لاستخراج رصيده",
    "explanation": "اليومية تسجل المعاملات تاريخياً، بينما الأستاذ يبوبها ويجمعها في حسابات T لاستخراج الأرصدة.",
    "tags": [
      "دفتر الأستاذ",
      "دفتر اليومية",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 43,
      "concept": "وظيفة دفتر الأستاذ"
    }
  },
  {
    "id": "eb2-mcq-008",
    "sourceQuestionId": "U2-Q10",
    "originalId": "U2-Q10",
    "lessonId": "u2-lesson-3",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-3",
    "subLo": "LO-U2.3",
    "concept": "حساب رصيد الأستاذ T",
    "difficulty": "intermediate",
    "bloomLevel": "application",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 44,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "إذا بلغ مجموع الجانب المدين لحساب البنك 180,000 جنيه، ومجموع الجانب الدائن 125,000 جنيه، فإن رصيد البنك هو:",
    "options": [
      "55,000 جنيه رصيد مدين",
      "55,000 جنيه رصيد دائن",
      "305,000 جنيه رصيد مدين",
      "125,000 جنيه رصيد مقفل"
    ],
    "correctAnswer": "55,000 جنيه رصيد مدين",
    "explanation": "الرصيد = 180,000 - 125,000 = 55,000 جنيه، ويتبع الجانب الأكبر وهو الجانب المدين.",
    "tags": [
      "ترصيد الحسابات",
      "حساب البنك",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 44,
      "concept": "استخراج الأرصدة"
    }
  },
  {
    "id": "eb2-tf-003",
    "sourceQuestionId": "U2-Q11",
    "originalId": "U2-Q11",
    "lessonId": "u2-lesson-3",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-3",
    "subLo": "LO-U2.3",
    "concept": "قاعدة الترحيل للأستاذ",
    "difficulty": "basic",
    "bloomLevel": "knowledge",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 45,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "عند ترحيل قيد يومية، يُرحل الطرف المدين إلى الجانب الأيمن من حساب الأستاذ الخاص به دون أي تبديل.",
    "correctAnswer": true,
    "explanation": "صحيح؛ الجانب الأيمن لحساب الأستاذ هو الجانب المدين، وينقل إليه الرقم المدين من قيد اليومية تماماً.",
    "tags": [
      "الترحيل",
      "الأستاذ T",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 45,
      "concept": "خطوات الترحيل"
    }
  },
  {
    "id": "eb2-mcq-009",
    "sourceQuestionId": "U2-Q12",
    "originalId": "U2-Q12",
    "lessonId": "u2-lesson-4",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-4",
    "subLo": "LO-U2.4",
    "concept": "خطأ التوجيه المحاسبي",
    "difficulty": "intermediate",
    "bloomLevel": "analysis",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 47,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "سجل محاسب فاتورة صيانة دورية لسيارات الشركة بـ 6,000 جنيه مدينًا في حساب 'السيارات' بدلًا من 'مصروف صيانة السيارات'. ما أثر ذلك على ميزان المراجعة والأرباح؟",
    "options": [
      "يختل توازن ميزان المراجعة بفرق 6,000 جنيه",
      "يتوازن ميزان المراجعة وتتضخم الأرباح بـ 6,000 جنيه",
      "يتوازن ميزان المراجعة وتقل الأرباح بـ 6,000 جنيه",
      "يختل توازن ميزان المراجعة بضعف المبلغ (12,000 جنيه)"
    ],
    "correctAnswer": "يتوازن ميزان المراجعة وتتضخم الأرباح بـ 6,000 جنيه",
    "explanation": "خطأ التوجيه لا يخل بالتوازن العددي للميزان، لكن استبعاد المصروف يرفع الربح الصافي بشكل مضلل ويزيف الأصول.",
    "tags": [
      "خطأ التوجيه",
      "رسملة المصروفات",
      "ميزان المراجعة",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 47,
      "concept": "أخطاء التوجيه المحاسبي"
    }
  },
  {
    "id": "eb2-mcq-010",
    "sourceQuestionId": "U2-Q13",
    "originalId": "U2-Q13",
    "lessonId": "u2-lesson-4",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-4",
    "subLo": "LO-U2.4",
    "concept": "السهو الجزئي وأثره على التوازن",
    "difficulty": "intermediate",
    "bloomLevel": "analysis",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 48,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "أظهر ميزان المراجعة فرقًا مقداره 14,000 جنيه حيث كان الجانب الدائن أكبر من الجانب المدين. أي من الآتي يمثل التفسير المنطقي المحتمل لهذا الخلل؟",
    "options": [
      "نسيان تسجيل فاتورة بيع بضاعة بالكامل",
      "ترحيل طرف دائن بقيمة 14,000 جنيه وإغفال ترحيل الطرف المدين المقابل",
      "تسجيل شراء معدات في حساب الأثاث بنفس القيمة",
      "خطأ في تقدير العمر الإنتاجي للآلات"
    ],
    "correctAnswer": "ترحيل طرف دائن بقيمة 14,000 جنيه وإغفال ترحيل الطرف المدين المقابل",
    "explanation": "السهو الجزئي (ترحيل من طرف واحد) يظهر فرقاً يعادل قيمة الطرف المنسي تماماً لصالح الجانب الآخر.",
    "tags": [
      "السهو الجزئي",
      "فروق الميزان",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 48,
      "concept": "كشف أسباب فروق الميزان"
    }
  },
  {
    "id": "eb2-tf-004",
    "sourceQuestionId": "U2-Q14",
    "originalId": "U2-Q14",
    "lessonId": "u2-lesson-4",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-4",
    "subLo": "LO-U2.4",
    "concept": "الاتساق الداخلي مقابل التمثيل الصادق",
    "difficulty": "basic",
    "bloomLevel": "evaluation",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 50,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "توازن ميزان المراجعة يثبت صحة الحسابات الرياضية الداخلية ولكنه لا يضمن التمثيل الصادق للواقع الاقتصادي.",
    "correctAnswer": true,
    "explanation": "صحيح؛ التوازن يختبر التكافؤ العددي للقيد المزدوج، بينما التمثيل الصادق يتطلب صحة التوجيه واكتمال المستندات.",
    "tags": [
      "الاتساق الداخلي",
      "التمثيل الصادق",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 50,
      "concept": "حدود ميزان المراجعة"
    }
  },
  {
    "id": "eb2-mcq-011",
    "sourceQuestionId": "U2-Q15",
    "originalId": "U2-Q15",
    "lessonId": "u2-lesson-5",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-5",
    "subLo": "LO-U2.5",
    "concept": "ترابط حلقات الدورة المحاسبية",
    "difficulty": "intermediate",
    "bloomLevel": "application",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 51,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "في الدورة المحاسبية لمنشأة النور، بلغت المقبوضات النقدية الإجمالية 210,000 جنيه والمدفوعات 83,000 جنيه. ما الرصيد الذي يظهر به حساب النقدية في ميزان المراجعة؟",
    "options": [
      "127,000 جنيه في عمود الأرصدة المدينة",
      "127,000 جنيه في عمود الأرصدة الدائنة",
      "293,000 جنيه في عمود الأرصدة المدينة",
      "83,000 جنيه في عمود الأرصدة الدائنة"
    ],
    "correctAnswer": "127,000 جنيه في عمود الأرصدة المدينة",
    "explanation": "الرصيد الصافي = 210,000 - 83,000 = 127,000 جنيه، ويظهر في عمود الأرصدة المدينة لأن النقدية أصل.",
    "tags": [
      "الدورة المحاسبية",
      "رصيد النقدية",
      "منشأة النور",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 51,
      "concept": "أرصدة منشأة النور"
    }
  },
  {
    "id": "eb2-mcq-012",
    "sourceQuestionId": "U2-Q16",
    "originalId": "U2-Q16",
    "lessonId": "u2-lesson-5",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-5",
    "subLo": "LO-U2.5",
    "concept": "إجمالي ميزان مراجعة منشأة النور",
    "difficulty": "advanced",
    "bloomLevel": "analysis",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 53,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "بلغ إجمالي ميزان مراجعة منشأة النور التجارية في 31 مارس 255,000 جنيه لكل جانب. ماذا يعني هذا التوازن؟",
    "options": [
      "أن صافي ربح المنشأة لشهر مارس بلغ 255,000 جنيه",
      "أن جميع العمليات سُجلت بمبالغ متكافئة وتم ترحيلها وترصيدها بدقة حسابية تامة",
      "أن رصيد النقدية بالخزينة يساوي 255,000 جنيه",
      "أن المنشأة معفية من تقديم إقرارات ضريبية"
    ],
    "correctAnswer": "أن جميع العمليات سُجلت بمبالغ متكافئة وتم ترحيلها وترصيدها بدقة حسابية تامة",
    "explanation": "مجموع ميزان المراجعة هو مجرد حاصل جمع الأرصدة للتحقق من التكافؤ العددي للقيد المزدوج ولا يمثل الأرباح.",
    "tags": [
      "ميزان المراجعة",
      "دلالة التوازن",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 53,
      "concept": "تفسير ميزان النور"
    }
  },
  {
    "id": "eb2-mcq-013",
    "sourceQuestionId": "U2-Q17",
    "originalId": "U2-Q17",
    "lessonId": "u2-lesson-6",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-6",
    "subLo": "LO-U2.6",
    "concept": "التحقيق المالي الاستقصائي ورسملة المصروفات",
    "difficulty": "advanced",
    "bloomLevel": "evaluation",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 55,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "في التحقيق المالي حول شركة 'ألفا'، تبيّن أن الشركة قامت برسملة 40,000 جنيه مصروفات تسويق وتضمين 30,000 جنيه مبيعات وهمية وإغفال 15,000 جنيه فواتير خوادم. إذا كان الربح المعلن 120,000 جنيه، فما الربح الحقيقي المعدل؟",
    "options": [
      "35,000 جنيه",
      "120,000 جنيه",
      "75,000 جنيه",
      "90,000 جنيه"
    ],
    "correctAnswer": "35,000 جنيه",
    "explanation": "الربح الحقيقي = 120,000 المعلن − 30,000 مبيعات وهمية − 40,000 مصروفات تسويق مخصومة − 15,000 مصروفات خوادم = 35,000 جنيه فقط.",
    "tags": [
      "تحقيق مالي",
      "الربح الحقيقي",
      "شركة ألفا",
      "الوحدة الثانية"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 55,
      "concept": "كشف أرباح شركة ألفا"
    }
  },
  {
    "id": "eb2-jre-001",
    "sourceQuestionId": "U2-Q18",
    "originalId": "U2-Q18",
    "lessonId": "u2-lesson-6",
    "unitId": "unit-2",
    "learningObjectiveId": "obj-2-6",
    "subLo": "LO-U2.6",
    "concept": "صياغة مرافعة استقصائية JRE حول التضليل المستتر خلف الميزان المتوازن",
    "difficulty": "challenge",
    "bloomLevel": "synthesis",
    "questionType": "jre",
    "sourceType": "official_textbook",
    "sourcePage": 58,
    "sourceDocument": "Accuonting-Ar-EB-Part1.pdf",
    "question": "نشرت شركة إعلاناً تزعم فيه: 'ميزان مراجعتنا متوازن بالمليارات، مما يثبت نزاهة أرباحنا وعدم وجود أي مخالفات'. صغ مقالاً استقصائياً مدعوماً بالأدلة (JRE) يفند هذه الخدعة ويوضح الركائز الثلاث للتمثيل الصادق.",
    "correctAnswer": "1. الحكم: التوازن ليس شهادة نزاهة. 2. التعليل: عجز الميزان عن كشف رسملة المصروفات والسهو الكلي. 3. الأدلة: الربح يقاس بالمطابقة المستندية والتدفق النقدي التشغيلي لا بمطابقة أرقام الميزان.",
    "explanation": "الحكم الصريح يدحض ادعاء الشركة. الشرح يوضح كيف تخترق أخطاء التوجيه والرسملة ميزان المراجعة دون أن تخل به. والتوصية تطالب بالفحص المستندي المستقل.",
    "tags": [
      "JRE",
      "تحقيق استقصائي",
      "التمثيل الصادق",
      "الوحدة الثانية",
      "Bloom:Create"
    ],
    "sourceMapping": {
      "source_document": "Accuonting-Ar-EB-Part1.pdf",
      "source_page": 58,
      "concept": "تقرير التحقيق المالي JRE"
    }
  }
];

/**
 * أسئلة الوحدة الثالثة المعتمدة لكتاب الوزارة (35 سؤالاً رسمياً بعد استبعاد المستبدل)
 */
export const unit3OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "U3-Q01",
    "sourceQuestionId": "U3-Q01",
    "originalId": "U3-Q01",
    "unitId": "unit-3",
    "lessonId": "lesson-3-1",
    "learningObjectiveId": "LO-U3.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 61,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 61,
      "concept": "الدفاتر المساعدة والرقابة المحاسبية"
    },
    "concept": "الدفاتر المساعدة والرقابة المحاسبية",
    "question": "وفقاً للكتاب، ما السبب الجوهري لعدم كفاية دفتر اليومية العام مع نمو حجم الأعمال؟",
    "options": [
      "أ) عدم قانونيته للشركات الكبيرة",
      "ب) الكفاءة تزيد دون التأثير على الرقابة عند التخصص، بعكس الازدحام الذي يقلل من الرقابة",
      "جـ) إلغاء قاعدة الازدواج المحاسبي",
      "د) ارتفاع تكلفة الأوراق المستخدمة فيه"
    ],
    "correctAnswer": "ب) الكفاءة تزيد دون التأثير على الرقابة عند التخصص، بعكس الازدحام الذي يقلل من الرقابة",
    "distractors": [
      "أ) عدم قانونيته للشركات الكبيرة",
      "جـ) إلغاء قاعدة الازدواج المحاسبي",
      "د) ارتفاع تكلفة الأوراق المستخدمة فيه"
    ],
    "explanation": "الكفاءة ليست مجرد راحة، بل هي وسيلة للرقابة. تُقلل دفاتر اليومية المساعدة من التكرار من خلال تنظيم المعاملات حسب النوع.",
    "tags": [
      "الوحدة الثالثة",
      "الدفاتر المساعدة",
      "الرقابة المحاسبية"
    ]
  },
  {
    "id": "U3-Q02",
    "sourceQuestionId": "U3-Q02",
    "originalId": "U3-Q02",
    "unitId": "unit-3",
    "lessonId": "lesson-3-1",
    "learningObjectiveId": "LO-U3.1",
    "skillCode": "S2",
    "bloomLevel": "comprehension",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 61,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 61,
      "concept": "مخاطر ازدحام دفتر اليومية العام"
    },
    "concept": "مخاطر ازدحام دفتر اليومية العام",
    "question": "حدد المخاطر الأربعة المذكورة صراحة في الكتاب نتيجة ازدحام دفتر اليومية العام:",
    "options": [
      "أ) التزوير، السرقة، الإهمال، التأخير",
      "ب) السهو (الإغفال)، التكرار، أخطاء الترحيل، التأخير في تحديث الحسابات",
      "جـ) ضعف السيولة، تعدد العملات، خطأ الصرف، التضخم",
      "د) نقص الموظفين، غياب المدير، تعطل الأجهزة، الإضراب"
    ],
    "correctAnswer": "ب) السهو (الإغفال)، التكرار، أخطاء الترحيل، التأخير في تحديث الحسابات",
    "distractors": [
      "أ) التزوير، السرقة، الإهمال، التأخير",
      "جـ) ضعف السيولة، تعدد العملات، خطأ الصرف، التضخم",
      "د) نقص الموظفين، غياب المدير، تعطل الأجهزة، الإضراب"
    ],
    "explanation": "ذكر الكتاب صراحة في الصفحة 61 أن ازدحام دفتر اليومية العام يؤدي إلى السهو والتكرار وأخطاء الترحيل والتأخير في تحديث الحسابات.",
    "tags": [
      "الوحدة الثالثة",
      "مخاطر اليومية العامة",
      "الرقابة"
    ]
  },
  {
    "id": "U3-Q03",
    "sourceQuestionId": "U3-Q03",
    "originalId": "U3-Q03",
    "unitId": "unit-3",
    "lessonId": "lesson-3-1",
    "learningObjectiveId": "LO-U3.2",
    "skillCode": "S1",
    "bloomLevel": "comprehension",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 62,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 62,
      "concept": "علاقة الدفاتر المساعدة بالقيد المزدوج"
    },
    "concept": "علاقة الدفاتر المساعدة بالقيد المزدوج",
    "question": "دفاتر اليومية المساعدة تُغني عن قاعدة القيد المزدوج.",
    "options": [
      "صح",
      "خطأ"
    ],
    "correctAnswer": "خطأ",
    "explanation": "دفاتر اليومية المساعدة لا تُغني عن قاعدة القيد المزدوج، بل تُعدّ المعاملات لتسجيلها وفق نظام القيد المزدوج نفسه.",
    "tags": [
      "الوحدة الثالثة",
      "القيد المزدوج",
      "الدفاتر المساعدة"
    ]
  },
  {
    "id": "U3-Q04",
    "sourceQuestionId": "U3-Q04",
    "originalId": "U3-Q04",
    "unitId": "unit-3",
    "lessonId": "lesson-3-1",
    "learningObjectiveId": "LO-U3.2",
    "skillCode": "S2",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 62,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 62,
      "concept": "تعريف دفاتر اليومية المساعدة"
    },
    "concept": "تعريف دفاتر اليومية المساعدة",
    "question": "ما هي دفاتر اليومية المساعدة كما عرّفها الكتاب؟",
    "options": [
      "أ) دفاتر بديلة لدفتر الأستاذ",
      "ب) أول مكان تُسجَّل فيه المعاملات، اعتماداً على المستندات الأصلية",
      "جـ) نسخة احتياطية من دفتر اليومية العام",
      "د) دفتر خاص بالمراجع الخارجي فقط"
    ],
    "correctAnswer": "ب) أول مكان تُسجَّل فيه المعاملات، اعتماداً على المستندات الأصلية",
    "distractors": [
      "أ) دفاتر بديلة لدفتر الأستاذ",
      "جـ) نسخة احتياطية من دفتر اليومية العام",
      "د) دفتر خاص بالمراجع الخارجي فقط"
    ],
    "explanation": "دفاتر اليومية المساعدة هي أول مكان تُسجَّل فيه المعاملات، وتعتمد على المستندات الأصلية مثل الفواتير وإشعارات الخصم والإيصالات.",
    "tags": [
      "الوحدة الثالثة",
      "تعريف الدفاتر المساعدة",
      "المستندات الأصلية"
    ]
  },
  {
    "id": "U3-Q05",
    "sourceQuestionId": "U3-Q05",
    "originalId": "U3-Q05",
    "unitId": "unit-3",
    "lessonId": "lesson-3-1",
    "learningObjectiveId": "LO-U3.3",
    "skillCode": "S2",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 62,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 62,
      "concept": "تصنيف المعاملات حسب الدفاتر المساعدة"
    },
    "concept": "تصنيف المعاملات حسب الدفاتر المساعدة",
    "question": "حدد أي دفتر مساعد تُسجَّل فيه كل معاملة: (أ) مبيعات آجلة للبضاعة، (ب) مشتريات آجلة للبضاعة، (جـ) مرتجعات عملاء، (د) معاملة نقدية.",
    "correctAnswer": "(أ) دفتر يومية المبيعات الآجلة، (ب) دفتر يومية المشتريات الآجلة، (جـ) دفتر مردودات المبيعات، (د) دفتر النقدية",
    "modelAnswer": "(أ) دفتر يومية المبيعات الآجلة، (ب) دفتر يومية المشتريات الآجلة، (جـ) دفتر مردودات المبيعات، (د) دفتر النقدية",
    "explanation": "(أ) دفتر يومية المبيعات الآجلة، (ب) دفتر يومية المشتريات الآجلة، (جـ) دفتر مردودات المبيعات، (د) دفتر النقدية — مطابقة تماماً لقائمة الأمثلة الأربعة في نص الكتاب ص62.",
    "tags": [
      "الوحدة الثالثة",
      "تصنيف المعاملات",
      "الدفاتر المساعدة"
    ]
  },
  {
    "id": "U3-Q06",
    "sourceQuestionId": "U3-Q06",
    "originalId": "U3-Q06",
    "unitId": "unit-3",
    "lessonId": "lesson-3-1",
    "learningObjectiveId": "LO-U3.1",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "case",
    "sourceType": "official_textbook",
    "sourcePage": 60,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 60,
      "concept": "دراسة حالة حسن لتوزيع المواد الغذائية"
    },
    "concept": "دراسة حالة حسن لتوزيع المواد الغذائية",
    "question": "استناداً إلى موقف افتتاحي الوحدة (حسن، محل توزيع مواد غذائية): وسّع نشاطه فبلغ 40 عملية بيع آجل و25 عملية شراء آجل يومياً، وأصبح دفتر اليومية العام مزدحماً. ما الحل الذي قدّمه محاسبه، وما الذي لم يتغيّر رغم الحل؟",
    "correctAnswer": "الحل هو تقديم دفاتر يومية مساعدة (مبيعات، مشتريات، مردودات، مصروفات نثرية). والذي لم يتغيّر: حجم المعاملات نفسه لم يتغيّر، لكن النظام هو الذي تغيّر.",
    "modelAnswer": "الحل: تقديم دفاتر يومية مساعدة متخصصة. الذي لم يتغير: حجم المعاملات ولكن نظام التسجيل والتبويب هو الذي تغير.",
    "explanation": "الحل هو تقديم دفاتر يومية مساعدة متخصصة. والذي لم يتغير هو حجم المعاملات ولكن النظام المحاسبي وطريقة تنظيمه هي التي تغيرت.",
    "tags": [
      "الوحدة الثالثة",
      "حالة حسن",
      "كفاءة النظام"
    ]
  },
  {
    "id": "U3-Q07",
    "sourceQuestionId": "U3-Q07",
    "originalId": "U3-Q07",
    "unitId": "unit-3",
    "lessonId": "lesson-3-2",
    "learningObjectiveId": "LO-U3.4",
    "skillCode": "S1",
    "bloomLevel": "comprehension",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 63,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 63,
      "concept": "نطاق دفتر يومية المبيعات"
    },
    "concept": "نطاق دفتر يومية المبيعات",
    "question": "ماذا لا يسجل دفتر يومية المبيعات وفق نص الكتاب؟",
    "options": [
      "أ) بيع بضاعة آجل لعميل",
      "ب) بيع نقدي للبضاعة، وبيع الأصول الثابتة",
      "جـ) فاتورة مبيعات آجلة صادرة لعميل جديد",
      "د) بيع بضاعة آجل لعميل قديم بفاتورة جديدة"
    ],
    "correctAnswer": "ب) بيع نقدي للبضاعة، وبيع الأصول الثابتة",
    "distractors": [
      "أ) بيع بضاعة آجل لعميل",
      "جـ) فاتورة مبيعات آجلة صادرة لعميل جديد",
      "د) بيع بضاعة آجل لعميل قديم بفاتورة جديدة"
    ],
    "explanation": "يسجل فقط المبيعات الآجلة للبضائع بغرض إعادة البيع، ولا يسجل فيه المبيعات النقدية ولا بيع الأصول الثابتة.",
    "tags": [
      "الوحدة الثالثة",
      "دفتر المبيعات",
      "المبيعات الآجلة"
    ]
  },
  {
    "id": "U3-Q08",
    "sourceQuestionId": "U3-Q08",
    "originalId": "U3-Q08",
    "unitId": "unit-3",
    "lessonId": "lesson-3-2",
    "learningObjectiveId": "LO-U3.5",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 64,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 64,
      "concept": "مراحل ترحيل دفتر يومية المبيعات"
    },
    "concept": "مراحل ترحيل دفتر يومية المبيعات",
    "question": "دفتر يومية مبيعات لشهر أبريل: كريم 12,000، سلمى 8,000، عمر 10,000. صف خطوتي الترحيل بالكامل كما وردتا في الكتاب.",
    "correctAnswer": "(1) يُحمَّل حساب كل عميل على حدة في الجانب المدين (كريم 12,000، سلمى 8,000، عمر 10,000). (2) يُقيَّد إجمالي المبيعات (30,000) في الجانب الدائن لحساب المبيعات دفعة واحدة.",
    "modelAnswer": "1) ترحيل فردي: حساب كريم مدين 12,000، حساب سلمى مدين 8,000، حساب عمر مدين 10,000. 2) ترحيل إجمالي: حساب المبيعات دائن 30,000.",
    "explanation": "الترحيل يتم على مرحلتين: ترحيل فردي لحساب كل عميل مديناً، وترحيل إجمالي دفتر المبيعات لحساب المبيعات دائناً.",
    "tags": [
      "الوحدة الثالثة",
      "ترحيل المبيعات",
      "دفتر الأستاذ"
    ]
  },
  {
    "id": "U3-Q09",
    "sourceQuestionId": "U3-Q09",
    "originalId": "U3-Q09",
    "unitId": "unit-3",
    "lessonId": "lesson-3-2",
    "learningObjectiveId": "LO-U3.5",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 65,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 65,
      "concept": "قيد إجمالي المبيعات في الأستاذ العام"
    },
    "concept": "قيد إجمالي المبيعات في الأستاذ العام",
    "question": "في مثال الكتاب (دفتر مبيعات بإجمالي 30,000 لثلاثة عملاء)، كيف يظهر القيد في دفتر الأستاذ العام – حساب المبيعات؟",
    "options": [
      "أ) ثلاثة قيود منفصلة بقيمة كل عميل في الجانب الدائن",
      "ب) قيد واحد فقط بإجمالي 30,000 في الجانب الدائن، مصدره إجمالي العملاء",
      "جـ) قيد واحد بإجمالي 30,000 في الجانب المدين",
      "د) لا يُقيَّد شيء في حساب المبيعات"
    ],
    "correctAnswer": "ب) قيد واحد فقط بإجمالي 30,000 في الجانب الدائن، مصدره إجمالي العملاء",
    "distractors": [
      "أ) ثلاثة قيود منفصلة بقيمة كل عميل في الجانب الدائن",
      "جـ) قيد واحد بإجمالي 30,000 في الجانب المدين",
      "د) لا يُقيَّد شيء في حساب المبيعات"
    ],
    "explanation": "في دفتر الأستاذ العام يُقيد إجمالي دفتر المبيعات كقيد إجمالي واحد في الجانب الدائن بمبلغ 30,000 من حساب إجمالي العملاء.",
    "tags": [
      "الوحدة الثالثة",
      "حساب المبيعات",
      "الترحيل الإجمالي"
    ]
  },
  {
    "id": "U3-Q10",
    "sourceQuestionId": "U3-Q10",
    "originalId": "U3-Q10",
    "unitId": "unit-3",
    "lessonId": "lesson-3-2",
    "learningObjectiveId": "LO-U3.4",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 66,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 66,
      "concept": "نطاق دفتر يومية المشتريات"
    },
    "concept": "نطاق دفتر يومية المشتريات",
    "question": "دفتر يومية المشتريات يسجل المشتريات الآجلة للبضاعة بغرض إعادة البيع، ولا يُسجَّل فيه:",
    "options": [
      "أ) شراء بضاعة آجل من مورد جديد",
      "ب) المشتريات النقدية وشراء الأصول الثابتة",
      "جـ) شراء بضاعة آجل مدعوم بفاتورة شراء",
      "د) شراء بضاعة بغرض إعادة البيع"
    ],
    "correctAnswer": "ب) المشتريات النقدية وشراء الأصول الثابتة",
    "distractors": [
      "أ) شراء بضاعة آجل من مورد جديد",
      "جـ) شراء بضاعة آجل مدعوم بفاتورة شراء",
      "د) شراء بضاعة بغرض إعادة البيع"
    ],
    "explanation": "يسجل دفتر يومية المشتريات المشتريات الآجلة للبضائع فقط، وتُستبعد المشتريات النقدية وشراء الأصول الثابتة.",
    "tags": [
      "الوحدة الثالثة",
      "دفتر المشتريات",
      "المشتريات الآجلة"
    ]
  },
  {
    "id": "U3-Q11",
    "sourceQuestionId": "U3-Q11",
    "originalId": "U3-Q11",
    "unitId": "unit-3",
    "lessonId": "lesson-3-2",
    "learningObjectiveId": "LO-U3.5",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 67,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 67,
      "concept": "ترحيل دفتر يومية المشتريات"
    },
    "concept": "ترحيل دفتر يومية المشتريات",
    "question": "دفتر يومية مشتريات: شركة النيل 15,000، شركة دلتا للتجارة 20,000. بيّن القيد الكامل بعد الترحيل (حساب المشتريات وحسابي الدائنين).",
    "correctAnswer": "حساب المشتريات مدين بإجمالي 35,000 (إلى إجمالي الموردين/الدائنين)؛ حساب الدائنين – شركة النيل دائن 15,000 (مشتريات)؛ حساب الدائنين – شركة دلتا للتجارة دائن 20,000 (مشتريات).",
    "modelAnswer": "المشتريات مدين 35,000؛ الدائنين - شركة النيل دائن 15,000؛ الدائنين - شركة دلتا دائن 20,000.",
    "explanation": "ترحيل المشتريات: ترحيل إجمالي إلى الجانب المدين من حساب المشتريات، وترحيل فردي لكل مورد في الجانب الدائن لحسابه.",
    "tags": [
      "الوحدة الثالثة",
      "ترحيل المشتريات",
      "حسابات الموردين"
    ]
  },
  {
    "id": "U3-Q12",
    "sourceQuestionId": "U3-Q12",
    "originalId": "U3-Q12",
    "unitId": "unit-3",
    "lessonId": "lesson-3-2",
    "learningObjectiveId": "LO-U3.5",
    "skillCode": "S4",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "case",
    "sourceType": "official_textbook",
    "sourcePage": 65,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 65,
      "concept": "المقارنة الهيكلية لترحيل الدفاتر المساعدة"
    },
    "concept": "المقارنة الهيكلية لترحيل الدفاتر المساعدة",
    "question": "ما وجه التشابه الهيكلي بين طريقة ترحيل دفتر المبيعات ودفتر المشتريات كما وردا في الكتاب، من حيث الفردي والإجمالي؟",
    "correctAnswer": "كلاهما يُرحَّل على مرحلتين: الأشخاص (عملاء/موردون) بمبالغهم الفردية في الجانب المطابق لطبيعة حسابهم، والحساب الاسمي (مبيعات/مشتريات) بالإجمالي الكامل مرة واحدة فقط في الجانب المقابل.",
    "modelAnswer": "التشابه الهيكلي: الترحيل الفردي للأشخاص والترحيل الإجمالي للحساب الاسمي.",
    "explanation": "كلا الدفترين يعتمدان مبدأ الرقابة المزدوجة عبر الترحيل الفردي للحسابات الشخصية والترحيل الإجمالي للحسابات الاسمية.",
    "tags": [
      "الوحدة الثالثة",
      "المقارنة الهيكلية",
      "الرقابة المزدوجة"
    ]
  },
  {
    "id": "U3-Q13",
    "sourceQuestionId": "U3-Q13",
    "originalId": "U3-Q13",
    "unitId": "unit-3",
    "lessonId": "lesson-3-3",
    "learningObjectiveId": "LO-U3.7",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 68,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 68,
      "concept": "مستند مردودات المبيعات"
    },
    "concept": "مستند مردودات المبيعات",
    "question": "المستند الرسمي الذي يدعم كل عملية في دفتر مردودات المبيعات هو:",
    "options": [
      "أ) فاتورة مبيعات",
      "ب) إشعار دائن يُصدر للعميل",
      "جـ) إشعار مدين يُرسَل للعميل",
      "د) سند قبض نقدي"
    ],
    "correctAnswer": "ب) إشعار دائن يُصدر للعميل",
    "distractors": [
      "أ) فاتورة مبيعات",
      "جـ) إشعار مدين يُرسَل للعميل",
      "د) سند قبض نقدي"
    ],
    "explanation": "يتم دعم كل عملية رد للبضاعة المباعة بإشعار دائن للبضاعة المباعة يُصدر للعميل.",
    "tags": [
      "الوحدة الثالثة",
      "مردودات المبيعات",
      "إشعار دائن"
    ]
  },
  {
    "id": "U3-Q14",
    "sourceQuestionId": "U3-Q14",
    "originalId": "U3-Q14",
    "unitId": "unit-3",
    "lessonId": "lesson-3-3",
    "learningObjectiveId": "LO-U3.7",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 69,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 69,
      "concept": "قيد ترحيل مردودات المبيعات"
    },
    "concept": "قيد ترحيل مردودات المبيعات",
    "question": "كريم أرجع بضاعة بقيمة 2,000 (إشعار دائن 201). بيّن قيد الترحيل الكامل من دفتر مردودات المبيعات.",
    "correctAnswer": "حساب مردودات المبيعات مدين 2,000 (العملاء المدينين)؛ حساب المدينين – كريم دائن 2,000 (مردودات المبيعات).",
    "modelAnswer": "من حـ/ مردودات المبيعات 2,000 إلى حـ/ المدينين (كريم) 2,000.",
    "explanation": "يترتب على القيد تخفيض إيراد المبيعات بجعل مردودات المبيعات مدينة، وخفض مديونية العميل بجعله دائناً.",
    "tags": [
      "الوحدة الثالثة",
      "ترحيل مردودات المبيعات",
      "إشعار دائن"
    ]
  },
  {
    "id": "U3-Q15",
    "sourceQuestionId": "U3-Q15",
    "originalId": "U3-Q15",
    "unitId": "unit-3",
    "lessonId": "lesson-3-3",
    "learningObjectiveId": "LO-U3.7",
    "skillCode": "S4",
    "bloomLevel": "comprehension",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 70,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 70,
      "concept": "مستند مردودات المشتريات"
    },
    "concept": "مستند مردودات المشتريات",
    "question": "عند إرجاع بضاعة إلى مورد، المستند المستخدم هو:",
    "options": [
      "أ) إشعار دائن",
      "ب) إشعار مدين يُرسَل إلى المورد",
      "جـ) فاتورة شراء",
      "د) سند صرف نقدي"
    ],
    "correctAnswer": "ب) إشعار مدين يُرسَل إلى المورد",
    "distractors": [
      "أ) إشعار دائن",
      "جـ) فاتورة شراء",
      "د) سند صرف نقدي"
    ],
    "explanation": "كل عملية رد بضاعة مشتراة إلى المورد تكون مدعومة بإشعار مدين يتم إرساله إلى المورد.",
    "tags": [
      "الوحدة الثالثة",
      "مردودات المشتريات",
      "إشعار مدين"
    ]
  },
  {
    "id": "U3-Q17",
    "sourceQuestionId": "U3-Q17",
    "originalId": "U3-Q17",
    "unitId": "unit-3",
    "lessonId": "lesson-3-3",
    "learningObjectiveId": "LO-U3.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "case",
    "sourceType": "official_textbook",
    "sourcePage": 71,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 71,
      "concept": "حساب الخصم النقدي وتسجيله"
    },
    "concept": "حساب الخصم النقدي وتسجيله",
    "question": "اشترت منشأة بضاعة بالأجل بقيمة 60,000، وشروط السداد خصم 10% إذا تم السداد خلال أسبوع، وسدَّدت خلال المهلة. (1) ما قيمة الخصم؟ (2) ما المبلغ المسدَّد فعلياً؟ (3) باسم ماذا يُسجَّل هذا الخصم عند المشتري وعند البائع؟",
    "correctAnswer": "(1) قيمة الخصم = 6,000 جنيه. (2) المبلغ المسدد فعلياً = 54,000 جنيه. (3) يُسجل عند المشتري باسم خصم مكتسب (إيراد)، وعند البائع باسم خصم مسموح به (مصروف).",
    "modelAnswer": "1) 6,000 جنيه. 2) 54,000 جنيه. 3) خصم مكتسب عند المشتري، وخصم مسموح به عند البائع.",
    "explanation": "الخصم النقدي مشروط بالسداد المبكر ويُسجل عند تحققه: خصم مكتسب في دفاتر المشتري وخصم مسموح به في دفاتر البائع.",
    "tags": [
      "الوحدة الثالثة",
      "الخصم النقدي",
      "الخصم المكتسب",
      "الخصم المسموح به"
    ]
  },
  {
    "id": "U3-Q18",
    "sourceQuestionId": "U3-Q18",
    "originalId": "U3-Q18",
    "unitId": "unit-3",
    "lessonId": "lesson-3-3",
    "learningObjectiveId": "LO-U3.6",
    "skillCode": "S5",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 71,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 71,
      "concept": "طبيعة الخصم التجاري"
    },
    "concept": "طبيعة الخصم التجاري",
    "question": "الخصم التجاري خصم مشروط يعتمد على حدث مستقبلي.",
    "options": [
      "صح",
      "خطأ"
    ],
    "correctAnswer": "خطأ",
    "explanation": "الخصم التجاري غير مشروط ومحدد وقت الفاتورة مباشرة، بينما الخصم النقدي هو المشروط بحدث مستقبلي وهو السداد المبكر.",
    "tags": [
      "الوحدة الثالثة",
      "الخصم التجاري",
      "الخصم النقدي"
    ]
  },
  {
    "id": "U3-Q19",
    "sourceQuestionId": "U3-Q19",
    "originalId": "U3-Q19",
    "unitId": "unit-3",
    "lessonId": "lesson-3-4",
    "learningObjectiveId": "LO-U3.8",
    "skillCode": "S1",
    "bloomLevel": "comprehension",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 73,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 73,
      "concept": "ازدواجية دور دفتر النقدية"
    },
    "concept": "ازدواجية دور دفتر النقدية",
    "question": "ما الذي يجعل دفتر النقدية مميزاً عن دفتر يومية المبيعات أو المشتريات وفق نص الكتاب؟",
    "options": [
      "أ) لا يحتاج إلى مستندات أصلية",
      "ب) يجمع بين دور دفتر اليومية ودور حساب الأستاذ في آن واحد",
      "جـ) لا يُرحَّل إلى دفتر الأستاذ إطلاقاً",
      "د) يُلغي استخدام دفتر اليومية العام تماماً"
    ],
    "correctAnswer": "ب) يجمع بين دور دفتر اليومية ودور حساب الأستاذ في آن واحد",
    "distractors": [
      "أ) لا يحتاج إلى مستندات أصلية",
      "جـ) لا يُرحَّل إلى دفتر الأستاذ إطلاقاً",
      "د) يُلغي استخدام دفتر اليومية العام تماماً"
    ],
    "explanation": "دفتر النقدية أحد دفاتر اليومية الأصلية ولكنه أيضاً حساب أستاذ للنقد والبنك، مما يقلل التكرار ويزيد الرقابة.",
    "tags": [
      "الوحدة الثالثة",
      "دفتر النقدية",
      "ازدواجية الدور"
    ]
  },
  {
    "id": "U3-Q20",
    "sourceQuestionId": "U3-Q20",
    "originalId": "U3-Q20",
    "unitId": "unit-3",
    "lessonId": "lesson-3-4",
    "learningObjectiveId": "LO-U3.9",
    "skillCode": "S4",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 74,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 74,
      "concept": "أعمدة دفتر النقدية ذي الثلاثة أعمدة"
    },
    "concept": "أعمدة دفتر النقدية ذي الثلاثة أعمدة",
    "question": "أعمدة دفتر النقدية ذي الثلاثة أعمدة هي:",
    "options": [
      "أ) النقدية، البنك، المرتجعات",
      "ب) النقدية، البنك، الخصم",
      "جـ) النقدية، البنك، الرصيد الافتتاحي",
      "د) المقبوضات، المدفوعات، الأرصدة"
    ],
    "correctAnswer": "ب) النقدية، البنك، الخصم",
    "distractors": [
      "أ) النقدية، البنك، المرتجعات",
      "جـ) النقدية، البنك، الرصيد الافتتاحي",
      "د) المقبوضات، المدفوعات، الأرصدة"
    ],
    "explanation": "يحتوي دفتر النقدية ذو الثلاثة أعمدة على أعمدة: النقدية، البنك، الخصم في كل من جانبي المقبوضات والمدفوعات.",
    "tags": [
      "الوحدة الثالثة",
      "دفتر النقدية ذو الثلاثة أعمدة",
      "أعمدة النقدية"
    ]
  },
  {
    "id": "U3-Q21",
    "sourceQuestionId": "U3-Q21",
    "originalId": "U3-Q21",
    "unitId": "unit-3",
    "lessonId": "lesson-3-4",
    "learningObjectiveId": "LO-U3.9",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "ترصيد دفتر النقدية ذي الثلاثة أعمدة"
    },
    "concept": "ترصيد دفتر النقدية ذي الثلاثة أعمدة",
    "question": "من المثال المحلول الرسمي (مايو): رصيد افتتاحي نقدية 20,000 وبنك 50,000؛ استلام 10,000 من كريم نقداً مع خصم 500؛ سداد 15,000 للمورد بشيك مع خصم مكتسب 1,000؛ دفع رواتب 6,000 نقداً. ما رصيد النقدية آخر المدة؟",
    "correctAnswer": "رصيد النقدية آخر المدة = 23,500 جنيه.",
    "modelAnswer": "رصيد النقدية آخر المدة = 20,000 + 9,500 - 6,000 = 23,500 جنيه.",
    "explanation": "جانب المقبوضات نقدية = 20,000 + 9,500 = 29,500. جانب المدفوعات نقدية = 6,000 (رواتب) + 23,500 (رصيد متمم آخر المدة).",
    "tags": [
      "الوحدة الثالثة",
      "ترصيد دفتر النقدية",
      "رصيد النقدية"
    ]
  },
  {
    "id": "U3-Q22",
    "sourceQuestionId": "U3-Q22",
    "originalId": "U3-Q22",
    "unitId": "unit-3",
    "lessonId": "lesson-3-4",
    "learningObjectiveId": "LO-U3.9",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 75,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 75,
      "concept": "عمود الخصم في جانب المدفوعات"
    },
    "concept": "عمود الخصم في جانب المدفوعات",
    "question": "في نفس المثال، عمود الخصم بجانب المدفوعات (سداد المورد بشيك مع خصم 1,000) يمثل:",
    "options": [
      "أ) خصماً تجارياً",
      "ب) خصماً مكتسباً",
      "جـ) خصماً مسموحاً به",
      "د) خصماً إجبارياً"
    ],
    "correctAnswer": "ب) خصماً مكتسباً",
    "distractors": [
      "أ) خصماً تجارياً",
      "جـ) خصماً مسموحاً به",
      "د) خصماً إجبارياً"
    ],
    "explanation": "السداد للمورد مع الحصول على خصم يمثل خصماً مكتسباً (إيراد للمنشأة) ويُدرج في عمود الخصم بجانب المدفوعات.",
    "tags": [
      "الوحدة الثالثة",
      "الخصم المكتسب",
      "دفتر النقدية"
    ]
  },
  {
    "id": "U3-Q23",
    "sourceQuestionId": "U3-Q23",
    "originalId": "U3-Q23",
    "unitId": "unit-3",
    "lessonId": "lesson-3-4",
    "learningObjectiveId": "LO-U3.9",
    "skillCode": "S4",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 76,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 76,
      "concept": "دفتر المصروفات النثرية وترحيله"
    },
    "concept": "دفتر المصروفات النثرية وترحيله",
    "question": "في أول مايو تم سداد مصروفات نثرية: بريد 500، أدوات مكتبية 800، انتقال 200. أين تُسجَّل، وكيف تُرحَّل؟",
    "correctAnswer": "تُسجَّل في دفتر المصروفات النثرية بأعمدته التحليلية (الإجمالي 1,500 جنيه)، ويُرحَّل إجمالي كل عمود إلى حساب المصروف المعني في نهاية الفترة، ولا تُرحل كل عملية منفردة.",
    "modelAnswer": "تسجل في دفتر المصروفات النثرية بإجمالي 1,500 جنيه، ويرحل إجمالي كل عمود تحليلي لحسابه في الأستاذ العام.",
    "explanation": "تُسجل المدفوعات النثرية في دفتر المصروفات النثرية التحليلي، ويُرحل إجمالي كل عمود لحساب المصروف الخاص به لمنع ازدحام اليومية العامة.",
    "tags": [
      "الوحدة الثالثة",
      "المصروفات النثرية",
      "الترحيل التحليلي"
    ]
  },
  {
    "id": "U3-Q24",
    "sourceQuestionId": "U3-Q24",
    "originalId": "U3-Q24",
    "unitId": "unit-3",
    "lessonId": "lesson-3-4",
    "learningObjectiveId": "LO-U3.8",
    "skillCode": "S5",
    "bloomLevel": "evaluation",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 73,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 73,
      "concept": "شمولية دفتر النقدية للخصومات"
    },
    "concept": "شمولية دفتر النقدية للخصومات",
    "question": "يجمع دفتر النقدية بين المقبوضات والمدفوعات، بما في ذلك الخصومات.",
    "options": [
      "صح",
      "خطأ"
    ],
    "correctAnswer": "صح",
    "explanation": "دفتر النقدية ذو الثلاثة أعمدة يسجل جميع المقبوضات والمدفوعات النقدية والبنكية مع أعمدة الخصم المسموح به والمكتسب.",
    "tags": [
      "الوحدة الثالثة",
      "دفتر النقدية",
      "الخصومات"
    ]
  },
  {
    "id": "U3-Q25",
    "sourceQuestionId": "U3-Q25",
    "originalId": "U3-Q25",
    "unitId": "unit-3",
    "lessonId": "lesson-3-5",
    "learningObjectiveId": "LO-U3.10",
    "skillCode": "S6",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "unsolved_training",
    "isSolvedExample": false,
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "حساب العميل رامي في حالة فريدة"
    },
    "concept": "حساب العميل رامي في حالة فريدة",
    "question": "من معاملات فريدة للتجارة: 3 يونيو مبيعات آجلة لرامي 18,000، 7 يونيو أعاد رامي بضاعة بقيمة 3,000. أعدّ قيد ترحيل حساب رامي الشخصي فقط (دون باقي الحسابات)، ثم بيّن رصيده الصافي.",
    "correctAnswer": "حساب رامي مدين بـ 18,000 (دفتر المبيعات)، ودائن بـ 3,000 (دفتر مردودات المبيعات)، فيصبح الرصيد الصافي مديناً بـ 15,000 جنيه.",
    "modelAnswer": "حساب رامي: مدين 18,000 ودائن 3,000. الرصيد الصافي = 15,000 مدين.",
    "explanation": "الترحيل الفردي للعميل رامي: 18,000 مدين في 3 يونيو، و3,000 دائن في 7 يونيو، والرصيد النهائي 15,000 مدين.",
    "tags": [
      "الوحدة الثالثة",
      "حالة فريدة",
      "حساب رامي",
      "تدريب غير محلول"
    ]
  },
  {
    "id": "U3-Q26",
    "sourceQuestionId": "U3-Q26",
    "originalId": "U3-Q26",
    "unitId": "unit-3",
    "lessonId": "lesson-3-5",
    "learningObjectiveId": "LO-U3.10",
    "skillCode": "S8",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "unsolved_training",
    "isSolvedExample": false,
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "تسوية حساب سلمى في حالة فريدة"
    },
    "concept": "تسوية حساب سلمى في حالة فريدة",
    "question": "18 يونيو مبيعات آجلة لسلمى 12,000، 28 يونيو استلام شيك من سلمى 11,500 مع منح خصم 500. صف القيد الكامل لتسوية حساب سلمى بالكامل.",
    "correctAnswer": "حساب سلمى مدين بـ 12,000؛ وعند التحصيل يُسجل في جانب المقبوضات بدفتر النقدية: بنك 11,500 وخصم مسموح به 500 مقابل إقفال حساب سلمى بالكامل (12,000 دائن) فيصبح رصيدها صفراً.",
    "modelAnswer": "قيد التحصيل: من مذكورين: حـ/ البنك 11,500 وحـ/ الخصم المسموح به 500 إلى حـ/ العملاء (سلمى) 12,000. الرصيد = صفر.",
    "explanation": "يتم إقفال حساب العميل سلمى بالكامل عبر مجموع الشيك المستلم والخصم المسموح به (11,500 + 500 = 12,000).",
    "tags": [
      "الوحدة الثالثة",
      "حالة فريدة",
      "حساب سلمى",
      "تسوية الحساب"
    ]
  },
  {
    "id": "U3-Q27",
    "sourceQuestionId": "U3-Q27",
    "originalId": "U3-Q27",
    "unitId": "unit-3",
    "lessonId": "lesson-3-5",
    "learningObjectiveId": "LO-U3.10",
    "skillCode": "S7",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "unsolved_training",
    "isSolvedExample": false,
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "توجيه معاملات حالة فريدة للدفاتر المساعدة"
    },
    "concept": "توجيه معاملات حالة فريدة للدفاتر المساعدة",
    "question": "حدد لكل معاملة من معاملات فريدة للتجارة التالية الدفتر المساعد الصحيح: (أ) مبيعات نقدية 8,000 في 12 يونيو، (ب) دفع رواتب 5,000 نقداً في 15 يونيو، (جـ) إعادة بضاعة لشركة النيل 2,000 (إشعار مدين) في 25 يونيو.",
    "correctAnswer": "(أ) دفتر النقدية (جانب المقبوضات)، (ب) دفتر النقدية (جانب المدفوعات)، (جـ) دفتر مردودات المشتريات.",
    "modelAnswer": "(أ) دفتر النقدية - مقبوضات، (ب) دفتر النقدية - مدفوعات، (جـ) دفتر مردودات المشتريات.",
    "explanation": "معيار التصنيف هو طبيعة العملية وسدادها: المبيعات النقدية في دفتر النقدية، ودفع الرواتب في دفتر النقدية، وإرجاع البضاعة للمورد في دفتر مردودات المشتريات.",
    "tags": [
      "الوحدة الثالثة",
      "حالة فريدة",
      "توجيه المعاملات"
    ]
  },
  {
    "id": "U3-Q28",
    "sourceQuestionId": "U3-Q28",
    "originalId": "U3-Q28",
    "unitId": "unit-3",
    "lessonId": "lesson-3-5",
    "learningObjectiveId": "LO-U3.10",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "applied",
    "caseType": "unsolved_training",
    "isSolvedExample": false,
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "حساب شركة دلتا في حالة فريدة"
    },
    "concept": "حساب شركة دلتا في حالة فريدة",
    "question": "5 يونيو مشتريات آجلة من شركة دلتا 25,000، 10 يونيو سداد لشركة دلتا بشيك 20,000 مع الحصول على خصم 2,000. بيّن كيف تتم تسوية حساب شركة دلتا بالكامل.",
    "correctAnswer": "شركة دلتا دائنة بـ 25,000، وعند السداد: بنك 20,000 + خصم مكتسب 2,000 = 22,000 في الجانب المدين، ويتبقى رصيد مستحق لشركة دلتا قدره 3,000 جنيه دائن.",
    "modelAnswer": "شركة دلتا: دائن 25,000، ومدين 22,000 (20,000 بنك + 2,000 خصم مكتسب)، الرصيد المتبقي = 3,000 دائن.",
    "explanation": "لم يتم سداد الفاتورة بالكامل، حيث إن مجموع المسدد بشيك والخصم (22,000) يقل عن قيمة الشراء (25,000) بمقدار 3,000 جنيه مستحقة.",
    "tags": [
      "الوحدة الثالثة",
      "حالة فريدة",
      "حساب دلتا",
      "تسوية جزئية"
    ]
  },
  {
    "id": "U3-Q29",
    "sourceQuestionId": "U3-Q29",
    "originalId": "U3-Q29",
    "unitId": "unit-3",
    "lessonId": "lesson-3-5",
    "learningObjectiveId": "LO-U3.10",
    "skillCode": "S2",
    "bloomLevel": "comprehension",
    "difficulty": "intermediate",
    "questionType": "true_false",
    "caseType": "unsolved_training",
    "isSolvedExample": false,
    "sourceType": "official_textbook",
    "sourcePage": 77,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 77,
      "concept": "قاعدة التسجيل في دفتر المشتريات لمورد جديد"
    },
    "concept": "قاعدة التسجيل في دفتر المشتريات لمورد جديد",
    "question": "معاملة (22 يونيو: مشتريات بضاعة من شركة النيل 10,000) تُسجَّل في دفتر اليومية العام مباشرة لأنها مشتريات جديدة من مورد جديد.",
    "options": [
      "صح",
      "خطأ"
    ],
    "correctAnswer": "خطأ",
    "explanation": "معيار التسجيل في دفتر يومية المشتريات هو كون المعاملة شراء آجل للبضاعة بغرض إعادة البيع، بصرف النظر عن كون المورد جديداً أو قديماً.",
    "tags": [
      "الوحدة الثالثة",
      "حالة فريدة",
      "قاعدة المشتريات"
    ]
  },
  {
    "id": "U3-Q30",
    "sourceQuestionId": "U3-Q30",
    "originalId": "U3-Q30",
    "unitId": "unit-3",
    "lessonId": "lesson-3-5",
    "learningObjectiveId": "LO-U3.11",
    "skillCode": "S5",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "unsolved_training",
    "isSolvedExample": false,
    "sourceType": "official_textbook",
    "sourcePage": 81,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 81,
      "concept": "بنود المراجعة النهائية لحالة فريدة"
    },
    "concept": "بنود المراجعة النهائية لحالة فريدة",
    "question": "وفق المراجعة النهائية الرسمية لحالة فريدة (ص81)، اذكر بندين من بنود التحقق التي يجب على الطالب مراجعتها قبل اعتبار الحل نهائياً.",
    "correctAnswer": "1) التأكد من أن كل حساب فردي متوازن بشكل منطقي. 2) التأكد من أن الإجماليات رُحِّلت مرة واحدة فقط إلى الحسابات غير الفردية (المبيعات، المشتريات، المردودات).",
    "modelAnswer": "1) توازن الحسابات الفردية منطقياً. 2) ترحيل الإجماليات مرة واحدة فقط إلى الحسابات الاسمية.",
    "explanation": "حدد الكتاب 4 بنود للتحقق: توازن الحسابات الفردية، ترحيل الإجماليات مرة واحدة، تعبير حسابات الخصم عن الإجماليات، ومطابقة أرصدة النقدية والبنك.",
    "tags": [
      "الوحدة الثالثة",
      "حالة فريدة",
      "المراجعة النهائية"
    ]
  },
  {
    "id": "U3-Q31",
    "sourceQuestionId": "U3-Q31",
    "originalId": "U3-Q31",
    "unitId": "unit-3",
    "lessonId": "lesson-3-6",
    "learningObjectiveId": "LO-U3.11",
    "skillCode": "S12",
    "bloomLevel": "evaluation",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "caseType": "official_JRE_case",
    "rubricTotal": 20,
    "sourceType": "official_textbook",
    "sourcePage": 82,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 82,
      "concept": "إشكالية JRE للوحدة الثالثة"
    },
    "concept": "إشكالية JRE للوحدة الثالثة",
    "question": "السؤال الجوهري الذي يطرحه القسم السادس من الكتاب الرسمي هو:",
    "options": [
      "أ) هل الدفاتر المساعدة مفيدة أم لا؟",
      "ب) هل يؤدي استخدام دفاتر اليومية المساعدة المتخصصة إلى تعزيز الرقابة، أم يؤدي إلى تحديات جديدة؟",
      "جـ) هل يمكن الاستغناء عن دفتر اليومية العام تماماً؟",
      "د) ما الفرق بين اليومية العامة والأستاذ العام؟"
    ],
    "correctAnswer": "ب) هل يؤدي استخدام دفاتر اليومية المساعدة المتخصصة إلى تعزيز الرقابة، أم يؤدي إلى تحديات جديدة؟",
    "distractors": [
      "أ) هل الدفاتر المساعدة مفيدة أم لا؟",
      "جـ) هل يمكن الاستغناء عن دفتر اليومية العام تماماً؟",
      "د) ما الفرق بين اليومية العامة والأستاذ العام؟"
    ],
    "explanation": "يركز القسم السادس على تقييم أثر التخصص على الرقابة المحاسبية والتحديات المصاحبة له في التنسيق والمطابقة.",
    "tags": [
      "الوحدة الثالثة",
      "JRE",
      "السؤال الجوهري",
      "حالة بلال"
    ]
  },
  {
    "id": "U3-Q32",
    "sourceQuestionId": "U3-Q32",
    "originalId": "U3-Q32",
    "unitId": "unit-3",
    "lessonId": "lesson-3-6",
    "learningObjectiveId": "LO-U3.10",
    "skillCode": "S10",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "official_JRE_case",
    "rubricTotal": 20,
    "sourceType": "official_textbook",
    "sourcePage": 84,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 84,
      "concept": "حساب المورد منصور في حالة بلال"
    },
    "concept": "حساب المورد منصور في حالة بلال",
    "question": "من حالة محلات بلال: شراء بضاعة على الحساب من محلات منصور 50,000 (1 مارس)، ورد جزء منها بقيمة 5,000 (7 مارس). ما المبلغ المستحق لمحلات منصور بعد هذه المردودات؟",
    "correctAnswer": "المبلغ المستحق لمحلات منصور = 50,000 − 5,000 = 45,000 جنيه.",
    "modelAnswer": "المبلغ المستحق لمحلات منصور = 50,000 - 5,000 = 45,000 جنيه.",
    "explanation": "يتم تخفيض المديونية المستحقة للمورد منصور بقيمة مردودات المشتريات: 50,000 − 5,000 = 45,000 جنيه.",
    "tags": [
      "الوحدة الثالثة",
      "حالة بلال",
      "محلات منصور",
      "مردودات المشتريات"
    ]
  },
  {
    "id": "U3-Q33",
    "sourceQuestionId": "U3-Q33",
    "originalId": "U3-Q33",
    "unitId": "unit-3",
    "lessonId": "lesson-3-6",
    "learningObjectiveId": "LO-U3.10",
    "skillCode": "S13",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "official_JRE_case",
    "rubricTotal": 20,
    "sourceType": "official_textbook",
    "sourcePage": 85,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 85,
      "concept": "مستحقات العملاء في حالة بلال"
    },
    "concept": "مستحقات العملاء في حالة بلال",
    "question": "باقي حالة محلات بلال: بيع بضاعة على الحساب لمحلات جبريل 25,000 (15 مارس)، ورد جزء منها بقيمة 3,000 (18 مارس)؛ وبيع لمحلات جمال 30,000 (20 مارس)، ورد منها 2,500 (25 مارس). ما إجمالي المبلغ المستحق لمحلات بلال من عملائه معاً؟",
    "correctAnswer": "إجمالي المبلغ المستحق لمحلات بلال = 22,000 (جبريل) + 27,500 (جمال) = 49,500 جنيه.",
    "modelAnswer": "جبريل = 22,000 وجمال = 27,500. إجمالي المستحق لمحلات بلال = 49,500 جنيه.",
    "explanation": "رصيد جبريل = 25,000 − 3,000 = 22,000. رصيد جمال = 30,000 − 2,500 = 27,500. الإجمالي = 49,500 جنيه.",
    "tags": [
      "الوحدة الثالثة",
      "حالة بلال",
      "مستحقات العملاء",
      "جبريل وجمال"
    ]
  },
  {
    "id": "U3-Q34",
    "sourceQuestionId": "U3-Q34",
    "originalId": "U3-Q34",
    "unitId": "unit-3",
    "lessonId": "lesson-3-6",
    "learningObjectiveId": "LO-U3.11",
    "skillCode": "S12",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "official_JRE_case",
    "rubricTotal": 20,
    "sourceType": "official_textbook",
    "sourcePage": 88,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 88,
      "concept": "مفهوم الرقابة المزدوجة في حالة بلال"
    },
    "concept": "مفهوم الرقابة المزدوجة في حالة بلال",
    "question": "وفق تحليل الكتاب الرسمي لحالة بلال، السبب المباشر لزيادة مستوى الرقابة عند استخدام الدفاتر المساعدة (مقارنة باليومية العامة وحدها) هو:",
    "options": [
      "أ) تقليل عدد المعاملات الفعلية",
      "ب) ظهور نوع من الرقابة المزدوجة حيث يُراجَع كل دفتر مساعد على حدة قبل ترحيل إجماليه لليومية العامة",
      "جـ) إلغاء الحاجة لأي مراجعة لاحقة",
      "د) سرعة تسجيل العمليات دون تدقيق"
    ],
    "correctAnswer": "ب) ظهور نوع من الرقابة المزدوجة حيث يُراجَع كل دفتر مساعد على حدة قبل ترحيل إجماليه لليومية العامة",
    "distractors": [
      "أ) تقليل عدد المعاملات الفعلية",
      "جـ) إلغاء الحاجة لأي مراجعة لاحقة",
      "د) سرعة تسجيل العمليات دون تدقيق"
    ],
    "explanation": "ينشأ نوع من الرقابة المزدوجة بفحص الدفاتر المساعدة ثم فحص قيود الإجماليات في اليومية العامة مما يحقق رقابة على مستويين.",
    "tags": [
      "الوحدة الثالثة",
      "حالة بلال",
      "الرقابة المزدوجة"
    ]
  },
  {
    "id": "U3-Q35",
    "sourceQuestionId": "U3-Q35",
    "originalId": "U3-Q35",
    "unitId": "unit-3",
    "lessonId": "lesson-3-6",
    "learningObjectiveId": "LO-U3.11",
    "skillCode": "S14",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "official_JRE_case",
    "rubricTotal": 20,
    "sourceType": "official_textbook",
    "sourcePage": 82,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 82,
      "concept": "هيكل حجة JRE وتحديات التنسيق"
    },
    "concept": "هيكل حجة JRE وتحديات التنسيق",
    "question": "وفق إطار كتابة JRE الرسمي (5 أقسام: مقدمة، حجة1، حجة2، رد على المعارض، خاتمة)، ما التركيز الإرشادي المطلوب تحديداً في قسم الحجة 2؟",
    "correctAnswer": "التركيز الإرشادي في الحجة 2 هو مناقشة تحديات التنسيق: كيف قد تؤدي كثرة الدفاتر المساعدة إلى تشتت أو تكرار أو صعوبة في المطابقة.",
    "modelAnswer": "مناقشة تحديات التنسيق: أعباء كثرة الدفاتر ومخاطر التشتت وأهمية الانضباط في المطابقة.",
    "explanation": "يتناول قسم الحجة 2 في إطار JRE المعتمد إبراز تحديات التنسيق وأعباء المطابقة بين عدة دفاتر منفصلة.",
    "tags": [
      "الوحدة الثالثة",
      "JRE",
      "إطار الكتابة",
      "تحديات التنسيق"
    ]
  },
  {
    "id": "U3-Q36",
    "sourceQuestionId": "U3-Q36",
    "originalId": "U3-Q36",
    "unitId": "unit-3",
    "lessonId": "lesson-3-6",
    "learningObjectiveId": "LO-U3.11",
    "skillCode": "S15",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "case",
    "caseType": "official_JRE_case",
    "rubricTotal": 20,
    "rubricId": "U03-JRE-RUBRIC-01",
    "sourceType": "official_textbook",
    "sourcePage": 82,
    "sourceDocument": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 82,
      "concept": "تقييم JRE المتكامل لحالة بلال"
    },
    "concept": "تقييم JRE المتكامل لحالة بلال",
    "question": "بصفتك مستشاراً محاسبياً، اكتب فقرة (وفق روبرك الكتاب الرسمي من 20 درجة U03-JRE-RUBRIC-01) تُجيب: هل يؤدي تقسيم الدفاتر إلى دفاتر متخصصة إلى تحسين الرقابة أم إضعافها في النهاية؟ مستنداً إلى حالة محلات بلال.",
    "correctAnswer": "نموذج الإجابة: يُمثل تقسيم الدفاتر إلى دفاتر يومية مساعدة متخصصة تطويراً حقيقياً للرقابة الداخلية من خلال الرقابة المزدوجة، حيث يُفحص كل دفتر مساعد بمفرده قبل ترحيل الإجماليات إلى اليومية العامة كما تجلى في حالة محلات بلال، مع مراعاة أن كفاءة هذا النظام مشروطة بانضباط التنسيق الدوري والمطابقة المستمرة بين الدفاتر المساعدة ودفتر الأستاذ العام.",
    "modelAnswer": "مقال JRE متكامل: 1) إطار فكري 4 درجات. 2) تحليل عميق 4 درجات. 3) استخدام الأدلة 4 درجات. 4) تنظيم وترابط 4 درجات. 5) حكم واستنتاج مبرر 4 درجات. الإجمالي = 20 درجة.",
    "explanation": "مقال تقييمي متكامل يربط بين إطار الرقابة المزدوجة وأدلة حالة بلال، مصحح وفق الروبرك الرسمي U03-JRE-RUBRIC-01 بإجمالي 20 درجة عبر المعايير الخمسة.",
    "tags": [
      "الوحدة الثالثة",
      "JRE المقالي",
      "حالة بلال",
      "روبرك 20 درجة"
    ]
  }
];

/**
 * أسئلة الوحدة الرابعة المعتمدة لكتاب الوزارة (38 سؤالاً رسمياً بعد استبعاد المستبدل)
 */
export const unit4OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "U4-Q01",
    "sourceQuestionId": "U4-Q01",
    "originalId": "U4-Q01",
    "unitId": "unit-4",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U4.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 89,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 89,
      "concept": "تعريف ميزان المراجعة"
    },
    "concept": "تعريف ميزان المراجعة",
    "question": "ما هو التعريف المحاسبي الدقيق لميزان المراجعة؟",
    "options": [
      "أ) قائمة تُعد في نهاية الفترة المحاسبية تحتوي على جميع حسابات الأستاذ وأرصدتها في عمودين للتحقق من الدقة الحسابية",
      "ب) قائمة مالية ختامية تُحدد صافي ربح أو خسارة المنشأة خلال السنة المالية",
      "جـ) سجل قانوني إلزامي تُقيد فيه المعاملات المالية أولاً بأول حسب تسلسلها الزمني",
      "د) كشف تفصيلي يوضح الأصول الثابتة ومجمعات إهلاكها في تاريخ محدد"
    ],
    "correctAnswer": "أ) قائمة تُعد في نهاية الفترة المحاسبية تحتوي على جميع حسابات الأستاذ وأرصدتها في عمودين للتحقق من الدقة الحسابية",
    "distractors": [
      "ب) قائمة مالية ختامية تُحدد صافي ربح أو خسارة المنشأة خلال السنة المالية",
      "جـ) سجل قانوني إلزامي تُقيد فيه المعاملات المالية أولاً بأول حسب تسلسلها الزمني",
      "د) كشف تفصيلي يوضح الأصول الثابتة ومجمعات إهلاكها في تاريخ محدد"
    ],
    "explanation": "ميزان المراجعة هو قائمة أو كشف يُعد في نهاية الفترة المحاسبية يضم جميع أرصدة حسابات الأستاذ في عمودين (مدين ودائن) لاختبار الدقة الحسابية والتساوي.",
    "tags": [
      "الوحدة الرابعة",
      "ميزان المراجعة",
      "التعريف والأهداف"
    ]
  },
  {
    "id": "U4-Q02",
    "sourceQuestionId": "U4-Q02",
    "originalId": "U4-Q02",
    "unitId": "unit-4",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U4.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 90,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 90,
      "concept": "أهداف ميزان المراجعة"
    },
    "concept": "أهداف ميزان المراجعة",
    "question": "أي مما يلي يُعد من الأهداف الثلاثة الرئيسية لإعداد ميزان المراجعة؟",
    "options": [
      "أ) تحديد المركز المالي النهائي وحقوق الملكية للمنشأة",
      "ب) التحقق من الدقة الحسابية والتأكد من تساوي إجمالي المدين والدائن وتقديم قائمة منظمة تمهيداً للقوائم المالية",
      "جـ) ضمان عدم وجود أي أخطاء سهو أو أخطاء توجيه محاسبي في الدفاتر",
      "د) حساب الضريبة المستحقة على أرباح النشاط التجاري"
    ],
    "correctAnswer": "ب) التحقق من الدقة الحسابية والتأكد من تساوي إجمالي المدين والدائن وتقديم قائمة منظمة تمهيداً للقوائم المالية",
    "distractors": [
      "أ) تحديد المركز المالي النهائي وحقوق الملكية للمنشأة",
      "جـ) ضمان عدم وجود أي أخطاء سهو أو أخطاء توجيه محاسبي في الدفاتر",
      "د) حساب الضريبة المستحقة على أرباح النشاط التجاري"
    ],
    "explanation": "أهداف ميزان المراجعة هي: 1) التحقق من الدقة الحسابية، 2) التأكد من تساوي المدين والدائن، 3) تلخيص أرصدة الأستاذ تمهيداً لإعداد القوائم المالية.",
    "tags": [
      "الوحدة الرابعة",
      "ميزان المراجعة",
      "الأهداف"
    ]
  },
  {
    "id": "U4-Q03",
    "sourceQuestionId": "U4-Q03",
    "originalId": "U4-Q03",
    "unitId": "unit-4",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U4.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 91,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 91,
      "concept": "الغرض وحدود ميزان المراجعة"
    },
    "concept": "حدود ميزان المراجعة",
    "question": "ما الغرض الرئيسي من إعداد ميزان المراجعة وما حدوده الجوهرية؟",
    "options": [
      "أ) الغرض إثبات صحة توجيه العمليات، وحدوده عدم إمكانية تصحيح الأخطاء",
      "ب) الغرض التحقق من التساوي الحسابي، وحدوده أن التساوي لا يثبت صحة توجيه العمليات أو اكتمالها",
      "جـ) الغرض حصر أصول المنشأة، وحدوده عدم شموله للخصوم",
      "د) الغرض مراجعة التزام المحاسب بالقوانين الضريبية فقط"
    ],
    "correctAnswer": "ب) الغرض التحقق من التساوي الحسابي، وحدوده أن التساوي لا يثبت صحة توجيه العمليات أو اكتمالها",
    "distractors": [
      "أ) الغرض إثبات صحة توجيه العمليات، وحدوده عدم إمكانية تصحيح الأخطاء",
      "جـ) الغرض حصر أصول المنشأة، وحدوده عدم شموله للخصوم",
      "د) الغرض مراجعة التزام المحاسب بالقوانين الضريبية فقط"
    ],
    "explanation": "الغرض الرئيسي هو التحقق من الدقة الحسابية وتساوي جانبي القيد، ولكن هذا التساوي لا يضمن خلو الحسابات من أخطاء التوجيه أو السهو.",
    "tags": [
      "الوحدة الرابعة",
      "حدود الميزان",
      "التساوي الحسابي"
    ]
  },
  {
    "id": "U4-Q04",
    "sourceQuestionId": "U4-Q04",
    "originalId": "U4-Q04",
    "unitId": "unit-4",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U4.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 92,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 92,
      "concept": "إعداد الميزان قبل القوائم المالية"
    },
    "concept": "إعداد الميزان قبل القوائم المالية",
    "question": "لماذا يتم إعداد ميزان المراجعة قبل إعداد القوائم المالية؟",
    "options": [
      "أ) للتحقق من التوازن الحسابي وتجميع الأرصدة كخطوة رقابية تمهيدية لاكتشاف أي خلل في الترحيل قبل إعداد القوائم",
      "ب) لأن القانون يشترط تقديم ميزان المراجعة للمساهمين بدلاً من الميزانية العمومية",
      "جـ) لحساب الضرائب المستحقة وإقفال حسابات الأصول نهائياً",
      "د) لأن إعداد القوائم المالية يلغي الحاجة إلى دفتر الأستاذ العام"
    ],
    "correctAnswer": "أ) للتحقق من التوازن الحسابي وتجميع الأرصدة كخطوة رقابية تمهيدية لاكتشاف أي خلل في الترحيل قبل إعداد القوائم",
    "distractors": [
      "ب) لأن القانون يشترط تقديم ميزان المراجعة للمساهمين بدلاً من الميزانية العمومية",
      "جـ) لحساب الضرائب المستحقة وإقفال حسابات الأصول نهائياً",
      "د) لأن إعداد القوائم المالية يلغي الحاجة إلى دفتر الأستاذ العام"
    ],
    "explanation": "يُعد ميزان المراجعة خطوة وسيطة ومرحلة رقابية تضمن على الأقل الاتساق الحسابي وتوفر ملخصاً منظماً يُسهّل استخراج القوائم المالية.",
    "tags": [
      "الوحدة الرابعة",
      "القوائم المالية",
      "التسلسل المحاسبي"
    ]
  },
  {
    "id": "U4-Q05",
    "sourceQuestionId": "U4-Q05",
    "originalId": "U4-Q05",
    "unitId": "unit-4",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U4.2",
    "skillCode": "S2",
    "bloomLevel": "analysis",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 94,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 94,
      "concept": "الأخطاء المؤثرة على التوازن"
    },
    "concept": "الأخطاء المؤثرة على التوازن",
    "question": "أي من الأخطاء التالية يؤدي بالضرورة إلى عدم توازن ميزان المراجعة (خطأ مؤثر)؟",
    "options": [
      "أ) تسجيل شراء معدات كمشتريات بضاعة",
      "ب) إثبات عملية بيع في الجانب الدائن لحساب النقدية دون تسجيل أي طرف مدين",
      "جـ) بيع بضاعة للعميل كريم وتسجيلها في حساب العميل سمير",
      "د) السهو الكامل عن قيد فاتورة كهرباء بالدفاتر"
    ],
    "correctAnswer": "ب) إثبات عملية بيع في الجانب الدائن لحساب النقدية دون تسجيل أي طرف مدين",
    "distractors": [
      "أ) تسجيل شراء معدات كمشتريات بضاعة",
      "جـ) بيع بضاعة للعميل كريم وتسجيلها في حساب العميل سمير",
      "د) السهو الكامل عن قيد فاتورة كهرباء بالدفاتر"
    ],
    "explanation": "التسجيل من جانب واحد يخل بتماثل القيد المزدوج مباشرة، مما يجعل أحد الجانبين أكبر من الآخر وبالتالي لا يتوازن الميزان.",
    "tags": [
      "الوحدة الرابعة",
      "الأخطاء المؤثرة",
      "التسجيل من جانب واحد"
    ]
  },
  {
    "id": "U4-Q06",
    "sourceQuestionId": "U4-Q06",
    "originalId": "U4-Q06",
    "unitId": "unit-4",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U4.2",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 95,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 95,
      "concept": "أثر التسجيل من جانب واحد"
    },
    "concept": "أثر التسجيل من جانب واحد",
    "question": "إذا تم تسجيل مصروف قدره 5,000 ج في الجانب المدين فقط دون تسجيل الطرف الدائن، فما هو الأثر على ميزان المراجعة؟",
    "options": [
      "أ) يتساوى الجانبان ولكن تنقص الأرباح بمقدار 5,000 ج",
      "ب) يزيد إجمالي الجانب المدين عن إجمالي الجانب الدائن بمقدار 5,000 ج",
      "جـ) يزيد إجمالي الجانب الدائن عن الجانب المدين بمقدار 5,000 ج",
      "د) يظهر فرق مقداره 10,000 ج بين الجانبين"
    ],
    "correctAnswer": "ب) يزيد إجمالي الجانب المدين عن إجمالي الجانب الدائن بمقدار 5,000 ج",
    "distractors": [
      "أ) يتساوى الجانبان ولكن تنقص الأرباح بمقدار 5,000 ج",
      "جـ) يزيد إجمالي الجانب الدائن عن الجانب المدين بمقدار 5,000 ج",
      "د) يظهر فرق مقداره 10,000 ج بين الجانبين"
    ],
    "explanation": "تسجيل المبلغ في المدين دون الدائن يجعل مجموع الأرصدة المدينة أكبر من الدائنة بقيمة المبلغ نفسه (5,000 ج).",
    "tags": [
      "الوحدة الرابعة",
      "أثر الخطأ",
      "التوازن"
    ]
  },
  {
    "id": "U4-Q07",
    "sourceQuestionId": "U4-Q07",
    "originalId": "U4-Q07",
    "unitId": "unit-4",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U4.2",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 96,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 96,
      "concept": "الترحيل بمبالغ غير متساوية"
    },
    "concept": "الترحيل بمبالغ غير متساوية",
    "question": "تم ترحيل عملية شراء معدات بمبلغ 15,000 ج إلى حساب المعدات، بينما رُحلت إلى حساب النقدية دائناً بمبلغ 21,000 ج. ما هو الفرق بين جانبي ميزان المراجعة؟",
    "options": [
      "أ) 36,000 ج والجانب المدين أكبر",
      "ب) 6,000 ج والجانب الدائن أكبر من الجانب المدين",
      "جـ) 6,000 ج والجانب المدين أكبر من الجانب الدائن",
      "د) يتوازن الميزان لأن الخطأ يخص نفس المعاملة"
    ],
    "correctAnswer": "ب) 6,000 ج والجانب الدائن أكبر من الجانب المدين",
    "distractors": [
      "أ) 36,000 ج والجانب المدين أكبر",
      "جـ) 6,000 ج والجانب المدين أكبر من الجانب الدائن",
      "د) يتوازن الميزان لأن الخطأ يخص نفس المعاملة"
    ],
    "explanation": "الدائن = 21,000 والمدين = 15,000، الفرق = 21,000 - 15,000 = 6,000 ج لصالح الجانب الدائن.",
    "tags": [
      "الوحدة الرابعة",
      "فرق الميزان",
      "ترحيل غير متساوٍ"
    ]
  },
  {
    "id": "U4-Q08",
    "sourceQuestionId": "U4-Q08",
    "originalId": "U4-Q08",
    "unitId": "unit-4",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U4.2",
    "skillCode": "S2",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 97,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 97,
      "concept": "مضاعفة الخطأ عند النقل العكسي"
    },
    "concept": "مضاعفة الخطأ عند النقل العكسي",
    "question": "لماذا يؤدي وضع رصيد مدين في عمود الأرصدة الدائنة بميزان المراجعة إلى توليد فرق يعادل ضعف قيمة الخطأ؟",
    "options": [
      "أ) لأن النظام يفرض غرامة محاسبية مضاعفة",
      "ب) لأن العمود الصحيح (المدين) ينقصه المبلغ، والعمود الخطأ (الدائن) يزيده نفس المبلغ، فيتضاعف الفارق بينهما",
      "جـ) لأن القيد المزدوج يتطلب ضرب الأرقام في 2 دائماً",
      "د) لأن الخطأ يتكرر تلقائياً في دفتر اليومية المساعدة"
    ],
    "correctAnswer": "ب) لأن العمود الصحيح (المدين) ينقصه المبلغ، والعمود الخطأ (الدائن) يزيده نفس المبلغ، فيتضاعف الفارق بينهما",
    "distractors": [
      "أ) لأن النظام يفرض غرامة محاسبية مضاعفة",
      "جـ) لأن القيد المزدوج يتطلب ضرب الأرقام في 2 دائماً",
      "د) لأن الخطأ يتكرر تلقائياً في دفتر اليومية المساعدة"
    ],
    "explanation": "نقصان جانب بـ X وزيادة الجانب الآخر بـ X يجعل الفرق الكلي بين الجانبين = 2X (ضعف قيمة الخطأ).",
    "tags": [
      "الوحدة الرابعة",
      "مضاعفة الخطأ",
      "النقل العكسي"
    ]
  },
  {
    "id": "U4-Q10",
    "sourceQuestionId": "U4-Q10",
    "originalId": "U4-Q10",
    "unitId": "unit-4",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U4.3",
    "skillCode": "S3",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 98,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 98,
      "concept": "خطأ السهو الكامل"
    },
    "concept": "خطأ السهو الكامل",
    "question": "لماذا لا يؤثر خطأ السهو الكامل عن تسجيل معاملة على توازن ميزان المراجعة؟",
    "options": [
      "أ) لأن المعاملة تلغي نفسها تلقائياً في نهاية السنة",
      "ب) لأن السهو يعني عدم تسجيل طرفي القيد (المدين والدائن) معاً، فيظل التساوي قائماً رغم نقص الحسابات",
      "جـ) لأن الحساب المعلق يتولى تسجيل السهو فوراً",
      "د) لأن السهو يخص المبيعات النقدية فقط"
    ],
    "correctAnswer": "ب) لأن السهو يعني عدم تسجيل طرفي القيد (المدين والدائن) معاً، فيظل التساوي قائماً رغم نقص الحسابات",
    "distractors": [
      "أ) لأن المعاملة تلغي نفسها تلقائياً في نهاية السنة",
      "جـ) لأن الحساب المعلق يتولى تسجيل السهو فوراً",
      "د) لأن السهو يخص المبيعات النقدية فقط"
    ],
    "explanation": "بما أن كِلا الطرفين لم يدخلا الدفاتر إطلاقاً، لم يحدث أي خلل بين إجمالي المدين وإجمالي الدائن، وبالتالي يظل الميزان متوازناً.",
    "tags": [
      "الوحدة الرابعة",
      "السهو الكامل",
      "الأخطاء غير المؤثرة"
    ]
  },
  {
    "id": "U4-Q11",
    "sourceQuestionId": "U4-Q11",
    "originalId": "U4-Q11",
    "unitId": "unit-4",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U4.3",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 99,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 99,
      "concept": "خطأ في الحساب الشخصي"
    },
    "concept": "خطأ في الحساب الشخصي",
    "question": "تم تسجيل بيع بضاعة للعميل أحمد بمبلغ 6,000 ج في حساب العميل خالد. ما هو أثر هذا الخطأ؟",
    "options": [
      "أ) عدم توازن ميزان المراجعة بفرق 6,000 ج",
      "ب) عدم توازن ميزان المراجعة بفرق 12,000 ج",
      "جـ) يظل ميزان المراجعة متوازناً، ولكن أرصدة العملاء الفردية تكون غير صحيحة",
      "د) تتأثر قائمة الدخل وينخفض صافي الربح بمقدار 6,000 ج"
    ],
    "correctAnswer": "جـ) يظل ميزان المراجعة متوازناً، ولكن أرصدة العملاء الفردية تكون غير صحيحة",
    "distractors": [
      "أ) عدم توازن ميزان المراجعة بفرق 6,000 ج",
      "ب) عدم توازن ميزان المراجعة بفرق 12,000 ج",
      "د) تتأثر قائمة الدخل وينخفض صافي الربح بمقدار 6,000 ج"
    ],
    "explanation": "هذا خطأ في الحساب الشخصي (Commission)؛ إجمالي المدينين وإجمالي المبيعات صحيح، والميزان متوازن، ولكن التوزيع الفرعي بين العملاء خاطئ.",
    "tags": [
      "الوحدة الرابعة",
      "خطأ شخصي",
      "الأستاذ المساعد"
    ]
  },
  {
    "id": "U4-Q12",
    "sourceQuestionId": "U4-Q12",
    "originalId": "U4-Q12",
    "unitId": "unit-4",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U4.3",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 100,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 100,
      "concept": "أثر خطأ التوجيه المحاسبي"
    },
    "concept": "خطأ التوجيه المحاسبي",
    "question": "تم تسجيل شراء أثاث بمبلغ 25,000 ج نقداً ضمن حساب المشتريات. ما هو التأثير الجوهري على القوائم المالية؟",
    "options": [
      "أ) لا يوجد أي تأثير لأن النقدية نقصت بنفس القيمة",
      "ب) ميزان المراجعة لا يتوازن بفارق 25,000 ج",
      "جـ) تظهر الأصول بأقل من حقيقتها وتزيد المصروفات فيقل صافي الربح المشوه للمركز المالي",
      "د) تزيد الأصول ويقل رأس المال بصورة غير مبررة"
    ],
    "correctAnswer": "جـ) تظهر الأصول بأقل من حقيقتها وتزيد المصروفات فيقل صافي الربح المشوه للمركز المالي",
    "distractors": [
      "أ) لا يوجد أي تأثير لأن النقدية نقصت بنفس القيمة",
      "ب) ميزان المراجعة لا يتوازن بفارق 25,000 ج",
      "د) تزيد الأصول ويقل رأس المال بصورة غير مبررة"
    ],
    "explanation": "تحميل مصروف برأسمال أصل يقلل الأصول في الميزانية ويزيد تكلفة النشاط في قائمة الدخل مما يخفض الربح المحاسبي بصورة غير سليمة.",
    "tags": [
      "الوحدة الرابعة",
      "خطأ توجيه",
      "تشويه القوائم"
    ]
  },
  {
    "id": "U4-Q13",
    "sourceQuestionId": "U4-Q13",
    "originalId": "U4-Q13",
    "unitId": "unit-4",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U4.3",
    "skillCode": "S3",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 101,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 101,
      "concept": "تعريف الأخطاء المتقابلة"
    },
    "concept": "الأخطاء المتقابلة",
    "question": "ما هي الأخطاء المتقابلة (المتكافئة / Compensating Errors)؟",
    "options": [
      "أ) أخطاء تحدث عند ترحيل الأرصدة في بداية كل شهر",
      "ب) خطآن مستقلان أو أكثر يلغي أثر أحدهما أثر الآخر في التوازن الحسابي",
      "جـ) أخطاء تنتج حصراً عن تقلبات أسعار الصرف",
      "د) أخطاء يتم تصحيحها تلقائياً بدون قيد يومية"
    ],
    "correctAnswer": "ب) خطآن مستقلان أو أكثر يلغي أثر أحدهما أثر الآخر في التوازن الحسابي",
    "distractors": [
      "أ) أخطاء تحدث عند ترحيل الأرصدة في بداية كل شهر",
      "جـ) أخطاء تنتج حصراً عن تقلبات أسعار الصرف",
      "د) أخطاء يتم تصحيحها تلقائياً بدون قيد يومية"
    ],
    "explanation": "الأخطاء المتكافئة هي أخطاء متفرقة يعوض أحدها الآخر في القيمة العددية، فيظل الميزان متوازناً بالصدفة رغم وجود الخلل.",
    "tags": [
      "الوحدة الرابعة",
      "أخطاء متقابلة",
      "تعريف"
    ]
  },
  {
    "id": "U4-Q14",
    "sourceQuestionId": "U4-Q14",
    "originalId": "U4-Q14",
    "unitId": "unit-4",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U4.3",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 101,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 101,
      "concept": "خطورة الأخطاء المتقابلة"
    },
    "concept": "خطورة الأخطاء المتقابلة",
    "question": "لماذا تعتبر الأخطاء المتقابلة من أشد أنواع الأخطاء المحاسبية خطورة؟",
    "options": [
      "أ) لأنها تؤدي دائماً إلى إفلاس المنشأة فورياً",
      "ب) لأنها تعطي إحساساً زائفاً بصحة الأرصدة وتختفي وراء التوازن الحسابي مما يصعب اكتشافها",
      "جـ) لأنها تمنع طباعة ميزان المراجعة إلكترونياً",
      "د) لأنها تجعل الحساب المعلق دائناً ومديناً في نفس الوقت"
    ],
    "correctAnswer": "ب) لأنها تعطي إحساساً زائفاً بصحة الأرصدة وتختفي وراء التوازن الحسابي مما يصعب اكتشافها",
    "distractors": [
      "أ) لأنها تؤدي دائماً إلى إفلاس المنشأة فورياً",
      "جـ) لأنها تمنع طباعة ميزان المراجعة إلكترونياً",
      "د) لأنها تجعل الحساب المعلق دائناً ومديناً في نفس الوقت"
    ],
    "explanation": "خطورتها تكمن في خفائها وعدم إعطاء أي مؤشر تحذيري في ميزان المراجعة، فتضلل متخذي القرار ببيانات مشوهة متوازنة ظاهرياً.",
    "tags": [
      "الوحدة الرابعة",
      "الأخطاء الخفية",
      "التقييم النقدي"
    ]
  },
  {
    "id": "U4-Q15",
    "sourceQuestionId": "U4-Q15",
    "originalId": "U4-Q15",
    "unitId": "unit-4",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U4.3",
    "skillCode": "S3",
    "bloomLevel": "understanding",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "عدم كفاية التساوي الحسابي"
    },
    "concept": "عدم كفاية التساوي الحسابي",
    "question": "وفقاً للفكر المحاسبي السليم، لماذا لا يضمن التساوي الحسابي في ميزان المراجعة الدقة المحاسبية؟",
    "options": [
      "أ) لأن ميزان المراجعة يختبر التساوي الشكلي فقط، ولا يضمن صحة التبويب أو شمولية المعاملات أو سلامة التقديرات",
      "ب) لأن دفاتر المحاسبة يتم تدميرها بعد إعداد الميزان",
      "جـ) لأن ميزان المراجعة لا يشمل حسابات الإيرادات والمصروفات",
      "د) لأن التوازن يعني بالضرورة وجود تلاعب مقصود"
    ],
    "correctAnswer": "أ) لأن ميزان المراجعة يختبر التساوي الشكلي فقط، ولا يضمن صحة التبويب أو شمولية المعاملات أو سلامة التقديرات",
    "distractors": [
      "ب) لأن دفاتر المحاسبة يتم تدميرها بعد إعداد الميزان",
      "جـ) لأن ميزان المراجعة لا يشمل حسابات الإيرادات والمصروفات",
      "د) لأن التوازن يعني بالضرورة وجود تلاعب مقصود"
    ],
    "explanation": "التساوي شرط لازم ولكنه غير كافٍ للدقة؛ فالأخطاء النوعية كالسهو والخطأ في التوجيه والأخطاء المتقابلة تظل كامنة رغم التوازن.",
    "tags": [
      "الوحدة الرابعة",
      "التساوي الحسابي",
      "الدقة المحاسبية"
    ]
  },
  {
    "id": "U4-Q16",
    "sourceQuestionId": "U4-Q16",
    "originalId": "U4-Q16",
    "unitId": "unit-4",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U4.3",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 102,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 102,
      "concept": "مقارنة خطأ التوجيه والتسجيل بالجانب الخطأ"
    },
    "concept": "مقارنة الأخطاء",
    "question": "ما الفرق الجوهري بين خطأ التوجيه المحاسبي وخطأ التسجيل في الجانب الخطأ؟",
    "options": [
      "أ) خطأ التوجيه يؤثر على التوازن ويستخدم حساب معلق، بينما التسجيل في الجانب الخطأ لا يؤثر",
      "ب) كلاهما يؤثر على التوازن بنفس النسبة ويحتاج حساب معلق",
      "جـ) خطأ التوجيه لا يؤثر على التوازن وتصحيحه مباشر، بينما التسجيل في الجانب الخطأ يخل بالتوازن ويضاعف الفرق ويحتاج حساب معلق",
      "د) خطأ التوجيه غير قابل للتصحيح إطلاقاً"
    ],
    "correctAnswer": "جـ) خطأ التوجيه لا يؤثر على التوازن وتصحيحه مباشر، بينما التسجيل في الجانب الخطأ يخل بالتوازن ويضاعف الفرق ويحتاج حساب معلق",
    "distractors": [
      "أ) خطأ التوجيه يؤثر على التوازن ويستخدم حساب معلق، بينما التسجيل في الجانب الخطأ لا يؤثر",
      "ب) كلاهما يؤثر على التوازن بنفس النسبة ويحتاج حساب معلق",
      "د) خطأ التوجيه غير قابل للتصحيح إطلاقاً"
    ],
    "explanation": "خطأ التوجيه يحافظ على طرفين متساويين فيصحح مباشرة بين الحسابين، بينما التسجيل في الجانب المعاكس يسبب فرقاً مضاعفاً ويستوجب الحساب المعلق.",
    "tags": [
      "الوحدة الرابعة",
      "مقارنة الأخطاء",
      "الحساب المعلق"
    ]
  },
  {
    "id": "U4-Q18",
    "sourceQuestionId": "U4-Q18",
    "originalId": "U4-Q18",
    "unitId": "unit-4",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U4.4",
    "skillCode": "S4",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 103,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 103,
      "concept": "شروط فتح الحساب المعلق"
    },
    "concept": "شروط فتح الحساب المعلق",
    "question": "متى يحق للمحاسب فتح حساب معلق في ميزان المراجعة؟",
    "options": [
      "أ) عند عدم تطابق الإجماليات، مع تعذر اكتشاف السبب فوراً، ووجود ضرورة لإعداد القوائم دون تأخير",
      "ب) بمجرد حدوث أي خطأ سهو في التسجيل",
      "جـ) عند رغبة الإدارة في إخفاء بعض المصروفات",
      "د) في نهاية كل شهر بشكل إلزامي روتيني"
    ],
    "correctAnswer": "أ) عند عدم تطابق الإجماليات، مع تعذر اكتشاف السبب فوراً، ووجود ضرورة لإعداد القوائم دون تأخير",
    "distractors": [
      "ب) بمجرد حدوث أي خطأ سهو في التسجيل",
      "جـ) عند رغبة الإدارة في إخفاء بعض المصروفات",
      "د) في نهاية كل شهر بشكل إلزامي روتيني"
    ],
    "explanation": "يُشترط لفتحه: عدم التساوي، والجهل المؤقت بمصدر الفرق، والحاجة لتقارير مرحلية عاجلة.",
    "tags": [
      "الوحدة الرابعة",
      "شروط الفتح",
      "الحساب المعلق"
    ]
  },
  {
    "id": "U4-Q19",
    "sourceQuestionId": "U4-Q19",
    "originalId": "U4-Q19",
    "unitId": "unit-4",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U4.4",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 104,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 104,
      "concept": "تحديد جانب الحساب المعلق"
    },
    "concept": "تحديد جانب الحساب المعلق",
    "question": "إذا كان إجمالي الأرصدة المدينة 180,000 ج وإجمالي الأرصدة الدائنة 175,000 ج، ففي أي جانب يوضع الحساب المعلق وبأي قيمة؟",
    "options": [
      "أ) في الجانب المدين بقيمة 5,000 ج",
      "ب) في الجانب الدائن بقيمة 5,000 ج لسد الفجوة",
      "جـ) في الجانب الدائن بقيمة 10,000 ج",
      "د) لا يُفتح حساب معلق لأن الفرق أقل من 10%"
    ],
    "correctAnswer": "ب) في الجانب الدائن بقيمة 5,000 ج لسد الفجوة",
    "distractors": [
      "أ) في الجانب المدين بقيمة 5,000 ج",
      "جـ) في الجانب الدائن بقيمة 10,000 ج",
      "د) لا يُفتح حساب معلق لأن الفرق أقل من 10%"
    ],
    "explanation": "القاعدة الذهبية: يُدرج الحساب المعلق دائماً في 'الجانب الأقل'؛ الدائن (175,000) أقل من المدين بمقدار 5,000 ج فيوضع في الدائن.",
    "tags": [
      "الوحدة الرابعة",
      "الجانب الأقل",
      "حساب الفرق"
    ]
  },
  {
    "id": "U4-Q20",
    "sourceQuestionId": "U4-Q20",
    "originalId": "U4-Q20",
    "unitId": "unit-4",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U4.4",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 104,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 104,
      "concept": "حالة شركة النجاح"
    },
    "concept": "حالة شركة النجاح",
    "question": "في ميزان مراجعة شركة النجاح، بلغ إجمالي المدين 320,000 ج وإجمالي الدائن 305,000 ج. أين يُدرج الحساب المعلق؟",
    "options": [
      "أ) في الجانب المدين بمبلغ 15,000 ج ليصبح المجموع 335,000 ج",
      "ب) في الجانب الدائن بمبلغ 15,000 ج ليصبح المجموع المتوازن 320,000 ج",
      "جـ) في الجانب الدائن بمبلغ 30,000 ج",
      "د) يُوزع مناصفة بين الجانبين (7,500 ج لكل جانب)"
    ],
    "correctAnswer": "ب) في الجانب الدائن بمبلغ 15,000 ج ليصبح المجموع المتوازن 320,000 ج",
    "distractors": [
      "أ) في الجانب المدين بمبلغ 15,000 ج ليصبح المجموع 335,000 ج",
      "جـ) في الجانب الدائن بمبلغ 30,000 ج",
      "د) يُوزع مناصفة بين الجانبين (7,500 ج لكل جانب)"
    ],
    "explanation": "الفرق = 320,000 - 305,000 = 15,000 ج. يوضع في الجانب الدائن (الأقل) لتحقيق التساوي المؤقت عند 320,000 ج.",
    "tags": [
      "الوحدة الرابعة",
      "شركة النجاح",
      "ميزان معلق"
    ]
  },
  {
    "id": "U4-Q21",
    "sourceQuestionId": "U4-Q21",
    "originalId": "U4-Q21",
    "unitId": "unit-4",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U4.4",
    "skillCode": "S4",
    "bloomLevel": "understanding",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 105,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 105,
      "concept": "محدودية الحساب المعلق"
    },
    "concept": "محدودية الحساب المعلق",
    "question": "لماذا لا يعتبر استخدام الحساب المعلق حلاً نهائياً لعدم توازن ميزان المراجعة؟",
    "options": [
      "أ) لأنه إجراء تسوية شكلي ومؤقت، ووجوده يعني أن هناك أخطاء مجهولة لم تُصحح بعد ويجب إقفاله تماماً",
      "ب) لأن مصلحة الضرائب ترفض الحسابات التي لا تحتوي على حساب معلق",
      "جـ) لأنه يمنع المحاسب من فتح دفاتر العام الجديد",
      "د) لأنه حساب وهمي لا قيمة رقمية له"
    ],
    "correctAnswer": "أ) لأنه إجراء تسوية شكلي ومؤقت، ووجوده يعني أن هناك أخطاء مجهولة لم تُصحح بعد ويجب إقفاله تماماً",
    "distractors": [
      "ب) لأن مصلحة الضرائب ترفض الحسابات التي لا تحتوي على حساب معلق",
      "جـ) لأنه يمنع المحاسب من فتح دفاتر العام الجديد",
      "د) لأنه حساب وهمي لا قيمة رقمية له"
    ],
    "explanation": "الحساب المعلق مجرد 'سد فجوة مؤقت'؛ ولا تكتمل الدقة المحاسبية إلا بكشف مسببات الفرق وتسجيل قيود تصحيحية تُصفّره.",
    "tags": [
      "الوحدة الرابعة",
      "الحساب المعلق",
      "إجراء مؤقت"
    ]
  },
  {
    "id": "U4-Q22",
    "sourceQuestionId": "U4-Q22",
    "originalId": "U4-Q22",
    "unitId": "unit-4",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U4.4",
    "skillCode": "S4",
    "bloomLevel": "understanding",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 105,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 105,
      "concept": "إقفال الحساب المعلق"
    },
    "concept": "إقفال الحساب المعلق",
    "question": "كيف يتم إقفال الحساب المعلق نهائياً في نهاية الدورة المحاسبية؟",
    "options": [
      "أ) بحذفه يدوياً من ميزان المراجعة دون قيود",
      "ب) عن طريق إجراء قيود تصحيحية تجعل الحساب المعلق مديناً أو دائناً حتى يصبح رصيده صفراً",
      "جـ) بتحويل رصيده بالكامل إلى حساب الأرباح والخسائر كإيرادات أخرى",
      "د) بترحيله إلى ميزانية العام القادم كالتزام دائم"
    ],
    "correctAnswer": "ب) عن طريق إجراء قيود تصحيحية تجعل الحساب المعلق مديناً أو دائناً حتى يصبح رصيده صفراً",
    "distractors": [
      "أ) بحذفه يدوياً من ميزان المراجعة دون قيود",
      "جـ) بتحويل رصيده بالكامل إلى حساب الأرباح والخسائر كإيرادات أخرى",
      "د) بترحيله إلى ميزانية العام القادم كالتزام دائم"
    ],
    "explanation": "مع كل خطأ مؤثر يتم تصحيحه بقيد، يُعدل الحساب المعلق حتى تتطابق قيوده مع رصيده الافتتاحي فيقفل ويصبح صفراً.",
    "tags": [
      "الوحدة الرابعة",
      "إقفال الحساب المعلق",
      "التصفير"
    ]
  },
  {
    "id": "U4-Q23",
    "sourceQuestionId": "U4-Q23",
    "originalId": "U4-Q23",
    "unitId": "unit-4",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 106,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 106,
      "concept": "قيد تصحيح تسجيل من جانب واحد"
    },
    "concept": "قيد تصحيح طرف مفقود",
    "question": "تم تسجيل مصروف 5,000 ج كمدين بشكل صحيح، ولكن لم يُسجل الطرف الدائن (النقدية). ما قيد التصحيح المناسب؟",
    "options": [
      "أ) من حـ/ النقدية إلى حـ/ المصروف 5,000 ج",
      "ب) من حـ/ الحساب المعلق (5,000) إلى حـ/ النقدية (5,000)",
      "جـ) من حـ/ المصروف (5,000) إلى حـ/ الحساب المعلق (5,000)",
      "د) من حـ/ النقدية (10,000) إلى حـ/ الحساب المعلق (10,000)"
    ],
    "correctAnswer": "ب) من حـ/ الحساب المعلق (5,000) إلى حـ/ النقدية (5,000)",
    "distractors": [
      "أ) من حـ/ النقدية إلى حـ/ المصروف 5,000 ج",
      "جـ) من حـ/ المصروف (5,000) إلى حـ/ الحساب المعلق (5,000)",
      "د) من حـ/ النقدية (10,000) إلى حـ/ الحساب المعلق (10,000)"
    ],
    "explanation": "المصروف مسجل بالفعل؛ ما ينقص هو الطرف الدائن (النقدية). لذا نجعل النقدية دائناً بـ 5,000 ج ومقابلها الحساب المعلق مديناً.",
    "tags": [
      "الوحدة الرابعة",
      "قيود التصحيح",
      "طرف مفقود"
    ]
  },
  {
    "id": "U4-Q24",
    "sourceQuestionId": "U4-Q24",
    "originalId": "U4-Q24",
    "unitId": "unit-4",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 107,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 107,
      "concept": "قيد تصحيح التسجيل بالجانب العكسي"
    },
    "concept": "تصحيح التسجيل العكسي",
    "question": "تم تسجيل إيراد خدمات 3,000 ج في الجانب المدين بدلاً من الدائن. ما هو قيد التصحيح اللازم؟",
    "options": [
      "أ) من حـ/ الحساب المعلق إلى حـ/ الإيراد بمبلغ 3,000 ج",
      "ب) من حـ/ الحساب المعلق إلى حـ/ الإيراد بمبلغ 6,000 ج",
      "جـ) من حـ/ الإيراد إلى حـ/ الحساب المعلق بمبلغ 6,000 ج",
      "د) من حـ/ النقدية إلى حـ/ الإيراد بمبلغ 3,000 ج"
    ],
    "correctAnswer": "ب) من حـ/ الحساب المعلق إلى حـ/ الإيراد بمبلغ 6,000 ج",
    "distractors": [
      "أ) من حـ/ الحساب المعلق إلى حـ/ الإيراد بمبلغ 3,000 ج",
      "جـ) من حـ/ الإيراد إلى حـ/ الحساب المعلق بمبلغ 6,000 ج",
      "د) من حـ/ النقدية إلى حـ/ الإيراد بمبلغ 3,000 ج"
    ],
    "explanation": "الإيراد سُجل مديناً خطأً بـ 3,000، لتصحيحه نحتاج جعله دائناً بـ 3,000 لإلغاء الخطأ + 3,000 لإثبات الرصيد الدائن = 6,000 ج دائن للإيراد ومدين للمعلق.",
    "tags": [
      "الوحدة الرابعة",
      "الجانب العكسي",
      "قيد التصحيح"
    ]
  },
  {
    "id": "U4-Q25",
    "sourceQuestionId": "U4-Q25",
    "originalId": "U4-Q25",
    "unitId": "unit-4",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 107,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 107,
      "concept": "قيد تصحيح خطأ التوجيه المحاسبي"
    },
    "concept": "قيد تصحيح خطأ التوجيه",
    "question": "تم تسجيل شراء أثاث بمبلغ 30,000 ج نقداً ضمن حساب المشتريات. ما هو قيد التصحيح الصحيح؟",
    "options": [
      "أ) من حـ/ الحساب المعلق إلى حـ/ المشتريات 30,000 ج",
      "ب) من حـ/ الأثاث (30,000) إلى حـ/ المشتريات (30,000)",
      "جـ) من حـ/ المشتريات (30,000) إلى حـ/ الأثاث (30,000)",
      "د) من حـ/ الأثاث (30,000) إلى حـ/ الحساب المعلق (30,000)"
    ],
    "correctAnswer": "ب) من حـ/ الأثاث (30,000) إلى حـ/ المشتريات (30,000)",
    "distractors": [
      "أ) من حـ/ الحساب المعلق إلى حـ/ المشتريات 30,000 ج",
      "جـ) من حـ/ المشتريات (30,000) إلى حـ/ الأثاث (30,000)",
      "د) من حـ/ الأثاث (30,000) إلى حـ/ الحساب المعلق (30,000)"
    ],
    "explanation": "خطأ التوجيه لا يؤثر على التوازن، فيتم تصحيحه مباشرة بإلغاء حساب المشتريات (دائن) وإثبات الأصل الصحيح الأثاث (مدين) دون وساطة المعلق.",
    "tags": [
      "الوحدة الرابعة",
      "تصحيح مباشر",
      "أثاث ومشتريات"
    ]
  },
  {
    "id": "U4-Q26",
    "sourceQuestionId": "U4-Q26",
    "originalId": "U4-Q26",
    "unitId": "unit-4",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 108,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 108,
      "concept": "قيد تصحيح الحساب الشخصي"
    },
    "concept": "قيد تصحيح الحساب الشخصي",
    "question": "تم تسجيل بيع بضاعة للعميل محمد في حساب العميل أحمد بمبلغ 6,000 ج بالآجل. ما قيد التصحيح؟",
    "options": [
      "أ) من حـ/ أحمد إلى حـ/ محمد 6,000 ج",
      "ب) من حـ/ محمد (6,000) إلى حـ/ أحمد (6,000)",
      "جـ) من حـ/ محمد إلى حـ/ الحساب المعلق 6,000 ج",
      "د) من حـ/ المبيعات إلى حـ/ محمد 6,000 ج"
    ],
    "correctAnswer": "ب) من حـ/ محمد (6,000) إلى حـ/ أحمد (6,000)",
    "distractors": [
      "أ) من حـ/ أحمد إلى حـ/ محمد 6,000 ج",
      "جـ) من حـ/ محمد إلى حـ/ الحساب المعلق 6,000 ج",
      "د) من حـ/ المبيعات إلى حـ/ محمد 6,000 ج"
    ],
    "explanation": "نجعل حساب محمد مديناً بمستحقاته الصحيحة، وحساب أحمد دائناً لإلغاء المديونية الخاطئة المسجلة عليه.",
    "tags": [
      "الوحدة الرابعة",
      "حساب شخصي",
      "تصحيح مباشر"
    ]
  },
  {
    "id": "U4-Q27",
    "sourceQuestionId": "U4-Q27",
    "originalId": "U4-Q27",
    "unitId": "unit-4",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 108,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 108,
      "concept": "قيد تصحيح السهو"
    },
    "concept": "قيد تصحيح السهو",
    "question": "تم إغفال تسجيل فاتورة مصروفات صيانة بمبلغ 4,000 ج على الحساب للدائنين بالكامل. ما هو قيد التصحيح؟",
    "options": [
      "أ) من حـ/ الحساب المعلق إلى حـ/ مصروفات الصيانة 4,000 ج",
      "ب) من حـ/ مصروفات الصيانة (4,000) إلى حـ/ الدائنون (4,000)",
      "جـ) من حـ/ الدائنون إلى حـ/ مصروفات الصيانة 4,000 ج",
      "د) من حـ/ مصروفات الصيانة إلى حـ/ النقدية 4,000 ج"
    ],
    "correctAnswer": "ب) من حـ/ مصروفات الصيانة (4,000) إلى حـ/ الدائنون (4,000)",
    "distractors": [
      "أ) من حـ/ الحساب المعلق إلى حـ/ مصروفات الصيانة 4,000 ج",
      "جـ) من حـ/ الدائنون إلى حـ/ مصروفات الصيانة 4,000 ج",
      "د) من حـ/ مصروفات الصيانة إلى حـ/ النقدية 4,000 ج"
    ],
    "explanation": "بما أن المعاملة سقطت بالكامل، فإن قيد التصحيح هو إثبات المعاملة الأصلية بطرفيها المدين والدائن بصورة طبيعية دون وساطة المعلق.",
    "tags": [
      "الوحدة الرابعة",
      "تصحيح السهو",
      "قيد مباشر"
    ]
  },
  {
    "id": "U4-Q28",
    "sourceQuestionId": "U4-Q28",
    "originalId": "U4-Q28",
    "unitId": "unit-4",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 109,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 109,
      "concept": "معيار استخدام الحساب المعلق في التصحيح"
    },
    "concept": "معيار استخدام الحساب المعلق",
    "question": "متى يُستخدم الحساب المعلق في قيد التصحيح، ومتى لا يُستخدم؟",
    "options": [
      "أ) يُستخدم عندما تزيد قيمة الخطأ عن 10,000 ج فقط",
      "ب) يُستخدم عندما يكون الخطأ مؤثراً على توازن ميزان المراجعة، ولا يُستخدم إذا كان الخطأ غير مؤثر على التوازن",
      "جـ) يُستخدم في أخطاء السهو، ولا يُستخدم في أخطاء الترحيل",
      "د) يُستخدم فقط في الشركات المساهمة ولا يُستخدم في المنشآت الفردية"
    ],
    "correctAnswer": "ب) يُستخدم عندما يكون الخطأ مؤثراً على توازن ميزان المراجعة، ولا يُستخدم إذا كان الخطأ غير مؤثر على التوازن",
    "distractors": [
      "أ) يُستخدم عندما تزيد قيمة الخطأ عن 10,000 ج فقط",
      "جـ) يُستخدم في أخطاء السهو، ولا يُستخدم في أخطاء الترحيل",
      "د) يُستخدم فقط في الشركات المساهمة ولا يُستخدم في المنشآت الفردية"
    ],
    "explanation": "الحساب المعلق يُعالج أطراف القيود غير المتوازنة فقط؛ أما الأخطاء المتوازنة طرفاها متكافئان فيصححان مباشرة بحساباتهما المعنية.",
    "tags": [
      "الوحدة الرابعة",
      "قاعدة المعلق",
      "المعيار الحاكم"
    ]
  },
  {
    "id": "U4-Q29",
    "sourceQuestionId": "U4-Q29",
    "originalId": "U4-Q29",
    "unitId": "unit-4",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 109,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 109,
      "concept": "ميزان المراجعة المعدل"
    },
    "concept": "ميزان المراجعة المعدل",
    "question": "بعد تصحيح الأخطاء، ما هو إجمالي جانبي ميزان المراجعة المعدل إذا كانت الأرصدة: النقدية 31,000، المعدات 100,000، البضاعة 40,000، المدينون 30,000، مصروف الإيجار 12,000، المشتريات 43,000، الدائنون 46,000، رأس المال 120,000، المبيعات 90,000؟",
    "options": [
      "أ) 252,000 ج",
      "ب) 257,000 ج",
      "جـ) 256,000 ج لكلا الجانبين المدين والدائن",
      "د) 260,000 ج"
    ],
    "correctAnswer": "جـ) 256,000 ج لكلا الجانبين المدين والدائن",
    "distractors": [
      "أ) 252,000 ج",
      "ب) 257,000 ج",
      "د) 260,000 ج"
    ],
    "explanation": "مجموع المدين: 31,000 + 100,000 + 40,000 + 30,000 + 12,000 + 43,000 = 256,000 ج. مجموع الدائن: 46,000 + 120,000 + 90,000 = 256,000 ج. توازن كامل.",
    "tags": [
      "الوحدة الرابعة",
      "الميزان المعدل",
      "إجمالي متوازن"
    ]
  },
  {
    "id": "U4-Q30",
    "sourceQuestionId": "U4-Q30",
    "originalId": "U4-Q30",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.4",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 110,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 110,
      "concept": "دراسة حالة زيد - فتح المعلق"
    },
    "concept": "دراسة حالة زيد للتجارة",
    "question": "في دراسة حالة شركة زيد للتجارة، كان إجمالي المدين 252,000 ج وإجمالي الدائن 257,000 ج. في أي جانب تم إدراج الحساب المعلق وبأي قيمة؟",
    "options": [
      "أ) في الجانب الدائن بقيمة 5,000 ج",
      "ب) في الجانب المدين بقيمة 5,000 ج لأن إجمالي الدائن أكبر من إجمالي المدين",
      "جـ) في الجانب المدين بقيمة 10,000 ج",
      "د) لم يتم فتح حساب معلق"
    ],
    "correctAnswer": "ب) في الجانب المدين بقيمة 5,000 ج لأن إجمالي الدائن أكبر من إجمالي المدين",
    "distractors": [
      "أ) في الجانب الدائن بقيمة 5,000 ج",
      "جـ) في الجانب المدين بقيمة 10,000 ج",
      "د) لم يتم فتح حساب معلق"
    ],
    "explanation": "الدائن = 257,000 والمدين = 252,000. الجانب الأقل هو المدين، فيوضع الحساب المعلق في الجانب المدين بقيمة الفرق (5,000 ج).",
    "tags": [
      "الوحدة الرابعة",
      "حالة زيد",
      "الحساب المعلق"
    ]
  },
  {
    "id": "U4-Q31",
    "sourceQuestionId": "U4-Q31",
    "originalId": "U4-Q31",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 110,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 110,
      "concept": "حالة زيد - تصحيح الخطأ 1"
    },
    "concept": "حالة زيد - الخطأ الأول",
    "question": "في حالة زيد، تم تسجيل بيع آجل بقيمة 5,000 ج في حساب المبيعات فقط. ما قيد التصحيح؟",
    "options": [
      "أ) من حـ/ المبيعات إلى حـ/ المدينون 5,000 ج",
      "ب) من حـ/ المدينون (5,000) إلى حـ/ الحساب المعلق (5,000)",
      "جـ) من حـ/ الحساب المعلق إلى حـ/ المدينون 5,000 ج",
      "د) من حـ/ النقدية إلى حـ/ الحساب المعلق 5,000 ج"
    ],
    "correctAnswer": "ب) من حـ/ المدينون (5,000) إلى حـ/ الحساب المعلق (5,000)",
    "distractors": [
      "أ) من حـ/ المبيعات إلى حـ/ المدينون 5,000 ج",
      "جـ) من حـ/ الحساب المعلق إلى حـ/ المدينون 5,000 ج",
      "د) من حـ/ النقدية إلى حـ/ الحساب المعلق 5,000 ج"
    ],
    "explanation": "المبيعات سُجلت بالفعل طرفاً دائناً، والطرف المدين (المدينون) سقط. يُثبت المدينون مديناً ويُقفل المعلق بجعله دائناً بـ 5,000 ج.",
    "tags": [
      "الوحدة الرابعة",
      "حالة زيد",
      "قيد تصحيح"
    ]
  },
  {
    "id": "U4-Q32",
    "sourceQuestionId": "U4-Q32",
    "originalId": "U4-Q32",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 110,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 110,
      "concept": "حالة زيد - تصحيح الخطأ 2"
    },
    "concept": "حالة زيد - الخطأ الثاني",
    "question": "في حالة زيد، تم تسجيل شراء معدات بقيمة 20,000 ج كمشتريات. ما قيد التصحيح المناسب؟",
    "options": [
      "أ) من حـ/ المشتريات إلى حـ/ المعدات 20,000 ج",
      "ب) من حـ/ المعدات (20,000) إلى حـ/ المشتريات (20,000)",
      "جـ) من حـ/ المعدات إلى حـ/ الحساب المعلق 20,000 ج",
      "د) من حـ/ الحساب المعلق إلى حـ/ المشتريات 20,000 ج"
    ],
    "correctAnswer": "ب) من حـ/ المعدات (20,000) إلى حـ/ المشتريات (20,000)",
    "distractors": [
      "أ) من حـ/ المشتريات إلى حـ/ المعدات 20,000 ج",
      "جـ) من حـ/ المعدات إلى حـ/ الحساب المعلق 20,000 ج",
      "د) من حـ/ الحساب المعلق إلى حـ/ المشتريات 20,000 ج"
    ],
    "explanation": "تصحيح مباشر لإلغاء المشتريات وإثبات المعدات دون تأثير على الحساب المعلق لأنه خطأ توجيه محاسبي متوازن.",
    "tags": [
      "الوحدة الرابعة",
      "حالة زيد",
      "معدات ومشتريات"
    ]
  },
  {
    "id": "U4-Q33",
    "sourceQuestionId": "U4-Q33",
    "originalId": "U4-Q33",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 110,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 110,
      "concept": "حالة زيد - تصحيح الخطأ 3"
    },
    "concept": "حالة زيد - الخطأ الثالث",
    "question": "في حالة زيد، تم تسجيل إيجار 4,000 ج مديناً بشكل صحيح، لكن أُثبت دائناً في حساب الدائنين بدلاً من النقدية. ما قيد التصحيح؟",
    "options": [
      "أ) من حـ/ النقدية إلى حـ/ الدائنين 4,000 ج",
      "ب) من حـ/ الدائنين (4,000) إلى حـ/ النقدية (4,000)",
      "جـ) من حـ/ مصروف الإيجار إلى حـ/ الحساب المعلق 4,000 ج",
      "د) من حـ/ الدائنين إلى حـ/ الحساب المعلق 4,000 ج"
    ],
    "correctAnswer": "ب) من حـ/ الدائنين (4,000) إلى حـ/ النقدية (4,000)",
    "distractors": [
      "أ) من حـ/ النقدية إلى حـ/ الدائنين 4,000 ج",
      "جـ) من حـ/ مصروف الإيجار إلى حـ/ الحساب المعلق 4,000 ج",
      "د) من حـ/ الدائنين إلى حـ/ الحساب المعلق 4,000 ج"
    ],
    "explanation": "مصروف الإيجار سليم، المشكلة في الدائنين (دائن خطأ) والنقدية (لم تسجل دائنة). القيد يلغي الدائنين بجعلهم مديناً ويثبت النقدية دائنة.",
    "tags": [
      "الوحدة الرابعة",
      "حالة زيد",
      "خطأ الحساب"
    ]
  },
  {
    "id": "U4-Q34",
    "sourceQuestionId": "U4-Q34",
    "originalId": "U4-Q34",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 110,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 110,
      "concept": "حالة زيد - تصحيح الخطأ 4"
    },
    "concept": "حالة زيد - الخطأ الرابع",
    "question": "في حالة زيد، تم إغفال شراء آجل بقيمة 3,000 ج بالكامل. ما قيد التصحيح؟",
    "options": [
      "أ) من حـ/ المشتريات (3,000) إلى حـ/ الدائنون (3,000)",
      "ب) من حـ/ الدائنون إلى حـ/ المشتريات 3,000 ج",
      "جـ) من حـ/ المشتريات إلى حـ/ الحساب المعلق 3,000 ج",
      "د) من حـ/ الحساب المعلق إلى حـ/ الدائنون 3,000 ج"
    ],
    "correctAnswer": "أ) من حـ/ المشتريات (3,000) إلى حـ/ الدائنون (3,000)",
    "distractors": [
      "ب) من حـ/ الدائنون إلى حـ/ المشتريات 3,000 ج",
      "جـ) من حـ/ المشتريات إلى حـ/ الحساب المعلق 3,000 ج",
      "د) من حـ/ الحساب المعلق إلى حـ/ الدائنون 3,000 ج"
    ],
    "explanation": "قيد إثبات مباشر للسهو بكامل أطرافه: المشتريات مدينة والدائنون دائنون بـ 3,000 ج.",
    "tags": [
      "الوحدة الرابعة",
      "حالة زيد",
      "سهو"
    ]
  },
  {
    "id": "U4-Q35",
    "sourceQuestionId": "U4-Q35",
    "originalId": "U4-Q35",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 110,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 110,
      "concept": "حالة زيد - رصيد النقدية المعدل"
    },
    "concept": "حالة زيد - رصيد النقدية المعدل",
    "question": "في ميزان المراجعة المعدل لشركة زيد، كم أصبح رصيد النقدية بعد كافة التصحيحات (الرصيد الأصلي 35,000 ج مدين)؟",
    "options": [
      "أ) 39,000 ج مدين",
      "ب) 35,000 ج مدين",
      "جـ) 31,000 ج مدين (بسبب تخفيضها بـ 4,000 ج قيد الإيجار)",
      "د) 27,000 ج مدين"
    ],
    "correctAnswer": "جـ) 31,000 ج مدين (بسبب تخفيضها بـ 4,000 ج قيد الإيجار)",
    "distractors": [
      "أ) 39,000 ج مدين",
      "ب) 35,000 ج مدين",
      "د) 27,000 ج مدين"
    ],
    "explanation": "الرصيد الأصلي كان 35,000 ج مدين، وعند إثبات سداد الإيجار بقيد التصحيح (3) جاءت النقدية دائنة بـ 4,000 ج، فيصبح الرصيد المعدل = 35,000 - 4,000 = 31,000 ج مدين.",
    "tags": [
      "الوحدة الرابعة",
      "حالة زيد",
      "رصيد النقدية"
    ]
  },
  {
    "id": "U4-Q36",
    "sourceQuestionId": "U4-Q36",
    "originalId": "U4-Q36",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.2",
    "skillCode": "S2",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 110,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 110,
      "concept": "حالة زيد - تحليل أثر الأخطاء"
    },
    "concept": "حالة زيد - تصنيف الأخطاء الأربعة",
    "question": "من بين الأخطاء الأربعة المكتشفة في حالة زيد للتجارة، ما هو الخطأ الوحيد الذي كان سبباً في عدم توازن ميزان المراجعة؟",
    "options": [
      "أ) الخطأ 2: شراء المعدات كمشتريات",
      "ب) الخطأ 3: إثبات الإيجار في حساب الدائنين بدلاً من النقدية",
      "جـ) الخطأ 4: إغفال شراء أجل بـ 3,000 بالكامل",
      "د) الخطأ 1: تسجيل عملية بيع آجل بقيمة 5,000 ج في حساب المبيعات فقط"
    ],
    "correctAnswer": "د) الخطأ 1: تسجيل عملية بيع آجل بقيمة 5,000 ج في حساب المبيعات فقط",
    "distractors": [
      "أ) الخطأ 2: شراء المعدات كمشتريات",
      "ب) الخطأ 3: إثبات الإيجار في حساب الدائنين بدلاً من النقدية",
      "جـ) الخطأ 4: إغفال شراء أجل بـ 3,000 بالكامل"
    ],
    "explanation": "الخطأ 1 تسجيل من جانب واحد وهو الوحيد المؤثر على التوازن ومصدر الفارق 5,000 ج، بينما الأخطاء 2 و 3 و 4 متوازنة الطرفين ولا تؤثر على المجموع.",
    "tags": [
      "الوحدة الرابعة",
      "حالة زيد",
      "تشخيص الأخطاء"
    ]
  },
  {
    "id": "U4-Q37",
    "sourceQuestionId": "U4-Q37",
    "originalId": "U4-Q37",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.6",
    "skillCode": "S6",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 111,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 111,
      "concept": "JRE01: التوازن لا يساوي المصداقية"
    },
    "concept": "JRE01: التوازن لا يساوي المصداقية",
    "question": "ناقش العبارة التالية: 'ميزان المراجعة المتوازن يضمن عدم وجود أخطاء في الحسابات.' هل توافق على هذه العبارة؟ وضح إجابتك بأدلة محاسبية.",
    "options": [
      "أ) أوافق، لأن تساوي المدين والدائن برهان قاطع على صحة جميع العمليات المحاسبية",
      "ب) لا أوافق؛ لأن الميزان يثبت الاتساق الحسابي فقط، ولا يكشف الأخطاء الخفية كخطأ التوجيه المحاسبي، السهو الكامل، والأخطاء المتقابلة",
      "جـ) أوافق، بشرط أن يكون الحساب المعلق رصيده دائناً",
      "د) لا أوافق، لأن ميزان المراجعة لا يعتد به قانونياً في مصر"
    ],
    "correctAnswer": "ب) لا أوافق؛ لأن الميزان يثبت الاتساق الحسابي فقط، ولا يكشف الأخطاء الخفية كخطأ التوجيه المحاسبي، السهو الكامل، والأخطاء المتقابلة",
    "distractors": [
      "أ) أوافق، لأن تساوي المدين والدائن برهان قاطع على صحة جميع العمليات المحاسبية",
      "جـ) أوافق، بشرط أن يكون الحساب المعلق رصيده دائناً",
      "د) لا أوافق، لأن ميزان المراجعة لا يعتد به قانونياً في مصر"
    ],
    "explanation": "الإجابة النموذجية ترفض العبارة بوضوح وتشرح أن التساوي يضمن التوازن العددي للقيد المزدوج، لكنه يعجز عن كشف الأخطاء التي تحافظ على هذا التماثل الشكلي.",
    "rubric": {
      "criteria": [
        {
          "label": "رفض العبارة بوضوح",
          "marks": 1
        },
        {
          "label": "توضيح أن التوازن يثبت الاتساق الحسابي فقط",
          "marks": 1
        },
        {
          "label": "ذكر مثالين على أخطاء لا يكشفها التوازن (سهو، توجيه)",
          "marks": 1
        },
        {
          "label": "تقديم استنتاج مهني صحيح ومعلل",
          "marks": 1
        }
      ],
      "totalMarks": 4
    },
    "tags": [
      "الوحدة الرابعة",
      "JRE01",
      "تقييم التوازن"
    ]
  },
  {
    "id": "U4-Q38",
    "sourceQuestionId": "U4-Q38",
    "originalId": "U4-Q38",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 112,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 112,
      "concept": "JRE02: تصحيح الأخطاء والمصداقية"
    },
    "concept": "JRE02: تصحيح الأخطاء والمصداقية",
    "question": "قضية تقييمية (JRE02): 'هل تصحيح الأخطاء المحاسبية يعيد المصداقية للقوائم المالية، أم أنه يعيد فقط التوازن الحسابي؟' ناقش مدعماً رأيك بالأدلة.",
    "options": [
      "أ) يعيد المصداقية التامة فورياً لأن التوازن يحل جميع المشاكل المالية تلقائياً",
      "ب) التصحيح يعيد التوازن والدقة العددية للأرصدة، ولكن المصداقية الكاملة تتطلب التزاماً بالمعايير والتقديرات العادلة والرقابة لمنع الأخطاء المنهجية",
      "جـ) لا يعيد التوازن ولا المصداقية بل يجب إلغاء الدفاتر بالكامل والبدء من جديد",
      "د) يعيد المصداقية فقط إذا كانت الأخطاء أقل من 5% من رأس المال"
    ],
    "correctAnswer": "ب) التصحيح يعيد التوازن والدقة العددية للأرصدة، ولكن المصداقية الكاملة تتطلب التزاماً بالمعايير والتقديرات العادلة والرقابة لمنع الأخطاء المنهجية",
    "distractors": [
      "أ) يعيد المصداقية التامة فورياً لأن التوازن يحل جميع المشاكل المالية تلقائياً",
      "جـ) لا يعيد التوازن ولا المصداقية بل يجب إلغاء الدفاتر بالكامل والبدء من جديد",
      "د) يعيد المصداقية فقط إذا كانت الأخطاء أقل من 5% من رأس المال"
    ],
    "explanation": "التصحيح يعالج الأثر العددي للأخطاء المكتشفة، ولكن التمثيل الصادق والمصداقية يعتمدان على سلامة السياسات المحاسبية وجودة التقديرات ونزاهة الإدارة.",
    "rubric": {
      "criteria": [
        {
          "label": "الإطار الفكري والتمييز بين الدقة العددية والمصداقية",
          "marks": 2
        },
        {
          "label": "التحليل العميق لحدود التصحيح الآلي",
          "marks": 2
        },
        {
          "label": "استخدام أدلة وأمثلة من واقع دراسة حالة الوحدة",
          "marks": 2
        },
        {
          "label": "التنظيم والترابط المنطقي للحجة",
          "marks": 2
        },
        {
          "label": "الرأي المهني والاستنتاج النهائي المتوازن",
          "marks": 2
        }
      ],
      "totalMarks": 10
    },
    "tags": [
      "الوحدة الرابعة",
      "JRE02",
      "المصداقية والتمثيل الصادق"
    ]
  },
  {
    "id": "U4-Q39",
    "sourceQuestionId": "U4-Q39",
    "originalId": "U4-Q39",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 113,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 113,
      "concept": "JRE03: شركة الأمل التجارية"
    },
    "concept": "JRE03: شركة الأمل التجارية",
    "question": "قضية شركة الأمل التجارية (ميزان متوازن عند 1,000,000 ج): اكتُشف إهلاك 5% بدلاً من 10% على آلات 200 ألف، عدم تكوين مخصص ديون معدومة 5% من مدينين 100 ألف، زيادة مخزون آخر المدة 20 ألف، وفاتورة مشتريات 15 ألف لم تسجل. ما هو الأثر الصافي لهذه الأخطاء على أرباح الشركة؟",
    "options": [
      "أ) الأرباح سليمة تماماً لأن ميزان المراجعة متوازن",
      "ب) الأرباح مبالغ فيها (مضخمة) بمقدار 50,000 ج، والأصول مضخمة بمقدار 35,000 ج",
      "جـ) الأرباح منخفضة بمقدار 35,000 ج بسبب المخصصات",
      "د) انخفاض الأصول بمقدار 50,000 ج"
    ],
    "correctAnswer": "ب) الأرباح مبالغ فيها (مضخمة) بمقدار 50,000 ج، والأصول مضخمة بمقدار 35,000 ج",
    "distractors": [
      "أ) الأرباح سليمة تماماً لأن ميزان المراجعة متوازن",
      "جـ) الأرباح منخفضة بمقدار 35,000 ج بسبب المخصصات",
      "د) انخفاض الأصول بمقدار 50,000 ج"
    ],
    "explanation": "تضخيم الأرباح: نقص إهلاك 10,000 + عدم تكوين مخصص 5,000 + زيادة مخزون 20,000 + عدم تسجيل مشتريات 15,000 = 50,000 ج تضخيم للأرباح! وتضخيم الأصول: 10,000 + 5,000 + 20,000 = 35,000 ج.",
    "rubric": {
      "criteria": [
        {
          "label": "حساب أثر نقص قسط الإهلاك على الربح والأصول (10,000 ج)",
          "marks": 2
        },
        {
          "label": "حساب أثر إغفال مخصص الديون المشكوك فيها (5,000 ج)",
          "marks": 2
        },
        {
          "label": "حساب أثر خطأ تقييم المخزون الختامي (20,000 ج)",
          "marks": 2
        },
        {
          "label": "حساب أثر السهو عن فاتورة المشتريات (15,000 ج)",
          "marks": 2
        },
        {
          "label": "استنتاج إجمالي تشويه الأرباح (50,000 ج) والمركز المالي",
          "marks": 2
        }
      ],
      "totalMarks": 10
    },
    "tags": [
      "الوحدة الرابعة",
      "JRE03",
      "شركة الأمل",
      "تشويه الأرباح"
    ]
  },
  {
    "id": "U4-Q40",
    "sourceQuestionId": "U4-Q40",
    "originalId": "U4-Q40",
    "unitId": "unit-4",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U4.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 114,
    "sourceDocument": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
      "source_page": 114,
      "concept": "التحليل الشامل لحدود ميزان المراجعة"
    },
    "concept": "الموقف العملي والتحليل الشامل",
    "question": "حلل الموقف المهني: 'ميزان المراجعة أداة مفيدة ولكنها غير كافية لضمان دقة القوائم المالية'. ما هي أهم آليات الرقابة التكميلية المطلوبة؟",
    "options": [
      "أ) مراجعة المستندات الأصلية، المصادقات مع العملاء والموردين، الجرد الفعلي للمخزون، واختبار التقديرات المحاسبية",
      "ب) مضاعفة أرقام ميزان المراجعة كل 6 أشهر فقط",
      "جـ) إلغاء القيد المزدوج والاعتماد على الكشوفات البنكية فقط",
      "د) الاكتفاء بفتح حساب معلق دائم لكل فرع"
    ],
    "correctAnswer": "أ) مراجعة المستندات الأصلية، المصادقات مع العملاء والموردين، الجرد الفعلي للمخزون، واختبار التقديرات المحاسبية",
    "distractors": [
      "ب) مضاعفة أرقام ميزان المراجعة كل 6 أشهر فقط",
      "جـ) إلغاء القيد المزدوج والاعتماد على الكشوفات البنكية فقط",
      "د) الاكتفاء بفتح حساب معلق دائم لكل فرع"
    ],
    "explanation": "بما أن ميزان المراجعة لا يكشف السهو أو الأخطاء في التوجيه أو الحسابات الفرعية، فلابد من إجراءات رقابة موضوعية تكميلية مثل الجرد الفعلي والمصادقات الخارجية وفحص المستندات.",
    "tags": [
      "الوحدة الرابعة",
      "الرقابة الداخلية",
      "الموقف العملي"
    ]
  }
];

/**
 * أسئلة الوحدة الخامسة المعتمدة لكتاب الوزارة (34 سؤالاً رسمياً بعد استبعاد المستبدل)
 */
export const unit5OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "U5-Q01",
    "sourceQuestionId": "U5-Q01",
    "originalId": "U5-Q01",
    "unitId": "unit-5",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U5.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 116,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 116,
      "concept": "تعريف حساب المتاجرة"
    },
    "concept": "تعريف حساب المتاجرة",
    "question": "ما هو التعريف المحاسبي الدقيق لحساب المتاجرة؟",
    "options": [
      "أ) حساب ختامي يقارن صافي المبيعات بتكلفة البضاعة المباعة لتحديد مجمل الربح أو مجمل الخسارة",
      "ب) قائمة مالية توضح أصول والتزامات المنشأة في لحظة زمنية محددة",
      "جـ) سجل قانوني تُثبت فيه المصروفات التشغيلية والإدارية والرواتب فقط",
      "د) كشف لتسوية الحساب المعلق بين الأرصدة المدينة والدائنة"
    ],
    "correctAnswer": "أ) حساب ختامي يقارن صافي المبيعات بتكلفة البضاعة المباعة لتحديد مجمل الربح أو مجمل الخسارة",
    "distractors": [
      "ب) قائمة مالية توضح أصول والتزامات المنشأة في لحظة زمنية محددة",
      "جـ) سجل قانوني تُثبت فيه المصروفات التشغيلية والإدارية والرواتب فقط",
      "د) كشف لتسوية الحساب المعلق بين الأرصدة المدينة والدائنة"
    ],
    "explanation": "حساب المتاجرة هو حساب ختامي يقابل صافي إيراد المبيعات بتكلفة البضاعة المباعة فقط، والفرق بينهما يمثل مجمل الربح أو مجمل الخسارة.",
    "tags": [
      "الوحدة الخامسة",
      "حساب المتاجرة",
      "مجمل الربح"
    ]
  },
  {
    "id": "U5-Q02",
    "sourceQuestionId": "U5-Q02",
    "originalId": "U5-Q02",
    "unitId": "unit-5",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U5.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 117,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 117,
      "concept": "معالجة مخزون آخر المدة"
    },
    "concept": "معالجة مخزون آخر المدة",
    "question": "في حساب المتاجرة، مخزون آخر المدة يُعامل محاسبيًا بأنه:",
    "options": [
      "أ) يُطرح من البضاعة المتاحة للبيع للوصول إلى تكلفة البضاعة المباعة",
      "ب) يُضاف إلى تكلفة البضاعة المباعة لزيادة التكاليف",
      "جـ) يُخصم مباشرة من مجمل الربح كمصروف تشغيلي",
      "د) يُهمل في حساب المتاجرة ويظهر في الأرباح والخسائر فقط"
    ],
    "correctAnswer": "أ) يُطرح من البضاعة المتاحة للبيع للوصول إلى تكلفة البضاعة المباعة",
    "distractors": [
      "ب) يُضاف إلى تكلفة البضاعة المباعة لزيادة التكاليف",
      "جـ) يُخصم مباشرة من مجمل الربح كمصروف تشغيلي",
      "د) يُهمل في حساب المتاجرة ويظهر في الأرباح والخسائر فقط"
    ],
    "explanation": "مخزون آخر المدة يمثل بضاعة لم تُبع بعد، فيُطرح من البضاعة المتاحة للبيع للوصول لتكلفة البضاعة التي بيعت فعلياً فقط، ويظهر كأصل متداول في المركز المالي.",
    "tags": [
      "الوحدة الخامسة",
      "مخزون آخر المدة",
      "المقابلة"
    ]
  },
  {
    "id": "U5-Q03",
    "sourceQuestionId": "U5-Q03",
    "originalId": "U5-Q03",
    "unitId": "unit-5",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U5.1",
    "skillCode": "S1",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 118,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 118,
      "concept": "حساب تكلفة البضاعة المباعة"
    },
    "concept": "حساب تكلفة البضاعة المباعة",
    "question": "إذا كان مخزون أول المدة 45,000 جنيه، وصافي المشتريات 180,000 جنيه، ومخزون آخر المدة 35,000 جنيه، فما هي تكلفة البضاعة المباعة؟",
    "options": [
      "أ) 190,000 جنيه",
      "ب) 160,000 جنيه",
      "جـ) 225,000 جنيه",
      "د) 260,000 جنيه"
    ],
    "correctAnswer": "أ) 190,000 جنيه",
    "distractors": [
      "ب) 160,000 جنيه",
      "جـ) 225,000 جنيه",
      "د) 260,000 جنيه"
    ],
    "explanation": "تكلفة البضاعة المباعة = مخزون أول (45,000) + المشتريات (180,000) − مخزون آخر (35,000) = 225,000 − 35,000 = 190,000 جنيه.",
    "tags": [
      "الوحدة الخامسة",
      "حسابات تكلفة المبيعات",
      "تطبيق رقمي"
    ]
  },
  {
    "id": "U5-Q04",
    "sourceQuestionId": "U5-Q04",
    "originalId": "U5-Q04",
    "unitId": "unit-5",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U5.1",
    "skillCode": "S1",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 119,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 119,
      "concept": "حساب مجمل الربح"
    },
    "concept": "حساب مجمل الربح",
    "question": "مخزون أول المدة 90,000 ج، المشتريات 300,000 ج، مخزون آخر المدة 60,000 ج، والمبيعات 420,000 ج. كم يبلغ مجمل الربح؟",
    "options": [
      "أ) 90,000 جنيه",
      "ب) 60,000 جنيه",
      "جـ) 120,000 جنيه",
      "د) 330,000 جنيه"
    ],
    "correctAnswer": "أ) 90,000 جنيه",
    "distractors": [
      "ب) 60,000 جنيه",
      "جـ) 120,000 جنيه",
      "د) 330,000 جنيه"
    ],
    "explanation": "تكلفة البضاعة المباعة = 90,000 + 300,000 − 60,000 = 330,000 جنيه. مجمل الربح = 420,000 − 330,000 = 90,000 جنيه.",
    "tags": [
      "الوحدة الخامسة",
      "مجمل الربح",
      "مسألة رقمية"
    ]
  },
  {
    "id": "U5-Q05",
    "sourceQuestionId": "U5-Q05",
    "originalId": "U5-Q05",
    "unitId": "unit-5",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U5.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 117,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 117,
      "concept": "صافي المبيعات وصافي المشتريات"
    },
    "concept": "معادلة صافي المشتريات",
    "question": "المعادلة المحاسبية المعتمدة لاستخراج صافي المشتريات هي:",
    "options": [
      "أ) المشتريات + مصروفات النقل للداخل − مردودات المشتريات − مسموحات المشتريات",
      "ب) المشتريات − مصروفات النقل للداخل + مردودات المشتريات",
      "جـ) المشتريات + مخزون أول المدة − مخزون آخر المدة",
      "د) المشتريات + مردودات المبيعات − الخصم المكتسب"
    ],
    "correctAnswer": "أ) المشتريات + مصروفات النقل للداخل − مردودات المشتريات − مسموحات المشتريات",
    "distractors": [
      "ب) المشتريات − مصروفات النقل للداخل + مردودات المشتريات",
      "جـ) المشتريات + مخزون أول المدة − مخزون آخر المدة",
      "د) المشتريات + مردودات المبيعات − الخصم المكتسب"
    ],
    "explanation": "صافي المشتريات يتضمن ثمن المشتريات مضافاً إليه تكلفة نقلها للداخل ومطروحاً منه أي مردودات أو مسموحات ممنوحة من الموردين.",
    "tags": [
      "الوحدة الخامسة",
      "صافي المشتريات",
      "معادلات"
    ]
  },
  {
    "id": "U5-Q06",
    "sourceQuestionId": "U5-Q06",
    "originalId": "U5-Q06",
    "unitId": "unit-5",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U5.1",
    "skillCode": "S1",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 120,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 120,
      "concept": "أثر التغير في تقييم مخزون آخر المدة"
    },
    "concept": "أثر زيادة مخزون آخر المدة",
    "question": "إذا زاد تقييم مخزون آخر المدة بمقدار 8,000 جنيه مع ثبات باقي المعطيات، فماذا يحدث لتكلفة البضاعة المباعة ولمجمل الربح؟",
    "options": [
      "أ) تنخفض تكلفة البضاعة المباعة بـ 8,000 ج، ويرتفع مجمل الربح بـ 8,000 ج",
      "ب) ترتفع تكلفة البضاعة المباعة بـ 8,000 ج، وينخفض مجمل الربح بـ 8,000 ج",
      "جـ) لا تتغير تكلفة البضاعة المباعة ويرتفع صافي الربح فقط",
      "د) يرتفع مجمل الربح وتكلفة البضاعة المباعة معاً بـ 8,000 ج"
    ],
    "correctAnswer": "أ) تنخفض تكلفة البضاعة المباعة بـ 8,000 ج، ويرتفع مجمل الربح بـ 8,000 ج",
    "distractors": [
      "ب) ترتفع تكلفة البضاعة المباعة بـ 8,000 ج، وينخفض مجمل الربح بـ 8,000 ج",
      "جـ) لا تتغير تكلفة البضاعة المباعة ويرتفع صافي الربح فقط",
      "د) يرتفع مجمل الربح وتكلفة البضاعة المباعة معاً بـ 8,000 ج"
    ],
    "explanation": "لأن مخزون آخر المدة يُطرح من البضاعة المتاحة للبيع؛ فزيادته تعني استبعاد جزء أكبر من التكاليف وترحيلها كأصل للمستقبل، مما يخفض تكلفة المبيعات ويزيد مجمل الربح.",
    "tags": [
      "الوحدة الخامسة",
      "تقييم المخزون",
      "تحليل الأثر"
    ]
  },
  {
    "id": "U5-Q07",
    "sourceQuestionId": "U5-Q07",
    "originalId": "U5-Q07",
    "unitId": "unit-5",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U5.2",
    "skillCode": "S2",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "الفرق بين مجمل الربح وصافي الربح"
    },
    "concept": "الفرق بين مجمل وصافي الربح",
    "question": "ما الفارق الجوهري بين مجمل الربح وصافي الربح؟",
    "options": [
      "أ) مجمل الربح يقيس نتيجة تجارة البضائع فقط، بينما صافي الربح يقيس النتيجة النهائية بعد خصم كافة المصروفات التشغيلية",
      "ب) مجمل الربح يُحسب على الأساس النقدي بينما صافي الربح يُحسب على أساس الاستحقاق",
      "جـ) مجمل الربح يشمل إهلاك الأصول الثابتة بينما صافي الربح يستبعدها",
      "د) لا يوجد فرق بينهما؛ كلاهما يمثل النتيجة الصافية للمشروع"
    ],
    "correctAnswer": "أ) مجمل الربح يقيس نتيجة تجارة البضائع فقط، بينما صافي الربح يقيس النتيجة النهائية بعد خصم كافة المصروفات التشغيلية",
    "distractors": [
      "ب) مجمل الربح يُحسب على الأساس النقدي بينما صافي الربح يُحسب على أساس الاستحقاق",
      "جـ) مجمل الربح يشمل إهلاك الأصول الثابتة بينما صافي الربح يستبعدها",
      "د) لا يوجد فرق بينهما؛ كلاهما يمثل النتيجة الصافية للمشروع"
    ],
    "explanation": "مجمل الربح ناتج عن المبيعات ناقص تكلفة البضاعة المباعة في حساب المتاجرة، وصافي الربح هو ما يتبقى بعد خصم الإيجار والرواتب والتأمين وباقي المصروفات التشغيلية.",
    "tags": [
      "الوحدة الخامسة",
      "حساب الأرباح والخسائر",
      "صافي الربح"
    ]
  },
  {
    "id": "U5-Q08",
    "sourceQuestionId": "U5-Q08",
    "originalId": "U5-Q08",
    "unitId": "unit-5",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U5.2",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 124,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 124,
      "concept": "حساب نتيجة النشاط"
    },
    "concept": "نتيجة النشاط عند زيادة المصروفات التشغيلية",
    "question": "إذا كان مجمل الربح 60,000 جنيه، وكانت المصروفات التشغيلية 75,000 جنيه، فما هي نتيجة النشاط؟",
    "options": [
      "أ) صافي خسارة 15,000 جنيه",
      "ب) صافي ربح 15,000 جنيه",
      "جـ) مجمل خسارة 15,000 جنيه",
      "د) توازن تام ولا توجد نتيجة"
    ],
    "correctAnswer": "أ) صافي خسارة 15,000 جنيه",
    "distractors": [
      "ب) صافي ربح 15,000 جنيه",
      "جـ) مجمل خسارة 15,000 جنيه",
      "د) توازن تام ولا توجد نتيجة"
    ],
    "explanation": "صافي الربح أو الخسارة = مجمل الربح − المصروفات التشغيلية = 60,000 − 75,000 = (15,000) أي صافي خسارة قدرها 15,000 جنيه.",
    "tags": [
      "الوحدة الخامسة",
      "صافي الخسارة",
      "حساب الأرباح والخسائر"
    ]
  },
  {
    "id": "U5-Q09",
    "sourceQuestionId": "U5-Q09",
    "originalId": "U5-Q09",
    "unitId": "unit-5",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U5.2",
    "skillCode": "S2",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 125,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 125,
      "concept": "العلاقة بين صافي الربح والنقدية"
    },
    "concept": "فروق الربح المحاسبي والسيولة",
    "question": "لماذا لا يعني تحقيق المنشأة لصافي ربح مرتفع بالضرورة توفر نقدية كافية في خزينتها؟",
    "options": [
      "أ) لأن الربح يُحسب وفق أساس الاستحقاق ويتضمن مبيعات آجلة وبنوداً غير نقدية كالإهلاك",
      "ب) لأن البنوك تخصم نصف الأرباح تلقائياً في نهاية العام",
      "جـ) لأن صافي الربح يُحول بالكامل لحساب الأستاذ العام ولا يُصرف نقداً",
      "د) لأن إجمالي الأصول لا بد أن يساوي إجمالي الالتزامات دائماً"
    ],
    "correctAnswer": "أ) لأن الربح يُحسب وفق أساس الاستحقاق ويتضمن مبيعات آجلة وبنوداً غير نقدية كالإهلاك",
    "distractors": [
      "ب) لأن البنوك تخصم نصف الأرباح تلقائياً في نهاية العام",
      "جـ) لأن صافي الربح يُحول بالكامل لحساب الأستاذ العام ولا يُصرف نقداً",
      "د) لأن إجمالي الأصول لا بد أن يساوي إجمالي الالتزامات دائماً"
    ],
    "explanation": "صافي الربح مقياس محاسبي للأداء وفق الاستحقاق وقد يتضمن إيرادات لم تُحصل نقداً أو مصروفات دُفعت في فترات سابقة أو بنوداً غير نقدية، فالربح يختلف عن التدفق النقدي.",
    "tags": [
      "الوحدة الخامسة",
      "الاستحقاق",
      "النقدية والربح"
    ]
  },
  {
    "id": "U5-Q11",
    "sourceQuestionId": "U5-Q11",
    "originalId": "U5-Q11",
    "unitId": "unit-5",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U5.2",
    "skillCode": "S2",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 123,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 123,
      "concept": "بداية حساب الأرباح والخسائر"
    },
    "concept": "بداية حساب الأرباح والخسائر",
    "question": "لماذا يبدأ حساب الأرباح والخسائر برصيد مجمل الربح المنقول من حساب المتاجرة؟",
    "options": [
      "أ) لأنه يكمل قياس الأداء بخصم المصروفات التشغيلية التي لا ترتبط مباشرة ببيع وشراء البضاعة",
      "ب) لتأكيد أن المبيعات دائنة والمشتريات مدينة فقط",
      "جـ) لأن القوانين التجارية تمنع إعداد حساب الأرباح والخسائر منفرداً",
      "د) ليتمكن من سداد المسحوبات الشخصية لصاحب المنشأة"
    ],
    "correctAnswer": "أ) لأنه يكمل قياس الأداء بخصم المصروفات التشغيلية التي لا ترتبط مباشرة ببيع وشراء البضاعة",
    "distractors": [
      "ب) لتأكيد أن المبيعات دائنة والمشتريات مدينة فقط",
      "جـ) لأن القوانين التجارية تمنع إعداد حساب الأرباح والخسائر منفرداً",
      "د) ليتمكن من سداد المسحوبات الشخصية لصاحب المنشأة"
    ],
    "explanation": "يبدأ حساب الأرباح والخسائر بمجمل الربح المرحل من المتاجرة لخصم سائر الأعباء الإدارية والتشغيلية واستخراج صافي الربح الكلي.",
    "tags": [
      "الوحدة الخامسة",
      "تسلسل القوائم",
      "حساب الأرباح والخسائر"
    ]
  },
  {
    "id": "U5-Q12",
    "sourceQuestionId": "U5-Q12",
    "originalId": "U5-Q12",
    "unitId": "unit-5",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U5.2",
    "skillCode": "S2",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 127,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 127,
      "concept": "تحليل تباين السيولة لمنشأتين"
    },
    "concept": "تساوي الأرباح واختلاف النقدية",
    "question": "حققت منشأتان نفس صافي الربح (50,000 جنيه)، ولكن المنشأة الأولى لديها سيولة نقدية عالية جداً والثانية تعاني من نقص نقدي حاد. ما التفسير المحاسبي السليم؟",
    "options": [
      "أ) قد تكون مبيعات المنشأة الثانية معظمها آجلة لم تُحصل بعد، أو سددت ديوناً سابقة أو اشترت أصولاً نقداً",
      "ب) المنشأة الثانية قامت بتسجيل مصروفات وهمية خفضت نقدها",
      "جـ) ميزان المراجعة للمنشأة الثانية غير متوازن حسابياً بالضرورة",
      "د) المنشأة الأولى تتبع الأساس النقدي بينما الثانية تتبع الاستحقاق"
    ],
    "correctAnswer": "أ) قد تكون مبيعات المنشأة الثانية معظمها آجلة لم تُحصل بعد، أو سددت ديوناً سابقة أو اشترت أصولاً نقداً",
    "distractors": [
      "ب) المنشأة الثانية قامت بتسجيل مصروفات وهمية خفضت نقدها",
      "جـ) ميزان المراجعة للمنشأة الثانية غير متوازن حسابياً بالضرورة",
      "د) المنشأة الأولى تتبع الأساس النقدي بينما الثانية تتبع الاستحقاق"
    ],
    "explanation": "تراكم المبيعات الآجلة (مدينون)، أو استخدام النقدية في سداد التزامات سابقة أو شراء أصول، أو سحوبات صاحب المنشأة النقدية كلها أمور تستنزف النقد دون أن تؤثر في حساب صافي الربح.",
    "tags": [
      "الوحدة الخامسة",
      "فكر كمحاسب",
      "السيولة والأرباح"
    ]
  },
  {
    "id": "U5-Q13",
    "sourceQuestionId": "U5-Q13",
    "originalId": "U5-Q13",
    "unitId": "unit-5",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U5.3",
    "skillCode": "S3",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 129,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 129,
      "concept": "أثر المصروف المستحق"
    },
    "concept": "أثر المصروف المستحق على القوائم",
    "question": "إثبات قيد تسوية لمصروف مستحق لم يُدفع حتى نهاية الفترة يؤدي إلى:",
    "options": [
      "أ) زيادة المصروف وانخفاض الربح، وزيادة الالتزامات المتداولة في المركز المالي",
      "ب) زيادة المصروف والربح، وزيادة الأصول المتداولة",
      "جـ) انخفاض المصروف والالتزام، وزيادة النقدية",
      "د) تخفيض رأس المال دون أي تأثير على الالتزامات"
    ],
    "correctAnswer": "أ) زيادة المصروف وانخفاض الربح، وزيادة الالتزامات المتداولة في المركز المالي",
    "distractors": [
      "ب) زيادة المصروف والربح، وزيادة الأصول المتداولة",
      "جـ) انخفاض المصروف والالتزام، وزيادة النقدية",
      "د) تخفيض رأس المال دون أي تأثير على الالتزامات"
    ],
    "explanation": "المصروف المستحق عبء يخص الفترة (يزيد المصروفات فيقل الربح) وهو دين مستحق للغير لم يُدفع بعد (يزيد الالتزامات المتداولة).",
    "tags": [
      "الوحدة الخامسة",
      "تسويات",
      "مصروف مستحق"
    ]
  },
  {
    "id": "U5-Q14",
    "sourceQuestionId": "U5-Q14",
    "originalId": "U5-Q14",
    "unitId": "unit-5",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U5.3",
    "skillCode": "S3",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 130,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 130,
      "concept": "طبيعة المصروف المدفوع مقدماً"
    },
    "concept": "لماذا المصروف المدفوع مقدماً أصل",
    "question": "علل: يُعامل المصروف المدفوع مقدماً كأصل متداول في قائمة المركز المالي لا كمصروف كامل؟",
    "options": [
      "أ) لأنه يمثل منفعة اقتصادية مستقبلية مدفوعة لم تُستهلك بعد وتخص فترات قادمة",
      "ب) لأن المنشأة تستطيع بيعه في السوق التجاري وتحويله لبضاعة",
      "جـ) لأنه دين مستحق على المنشأة يجب سداده نقداً للموردين",
      "د) لأن ميزان المراجعة يشترط تسجيل كافة المدفوعات في عمود الأصول"
    ],
    "correctAnswer": "أ) لأنه يمثل منفعة اقتصادية مستقبلية مدفوعة لم تُستهلك بعد وتخص فترات قادمة",
    "distractors": [
      "ب) لأن المنشأة تستطيع بيعه في السوق التجاري وتحويله لبضاعة",
      "جـ) لأنه دين مستحق على المنشأة يجب سداده نقداً للموردين",
      "د) لأن ميزان المراجعة يشترط تسجيل كافة المدفوعات في عمود الأصول"
    ],
    "explanation": "المصروف المدفوع مقدماً حق ومنفعة تملكها المنشأة في المستقبل (كتأمين أو إيجار قادم)، لذلك يُدرج أصلاً متداولاً وتتحول قيمته لمصروف عند حلول فترته.",
    "tags": [
      "الوحدة الخامسة",
      "مدفوع مقدماً",
      "أصل متداول"
    ]
  },
  {
    "id": "U5-Q15",
    "sourceQuestionId": "U5-Q15",
    "originalId": "U5-Q15",
    "unitId": "unit-5",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U5.3",
    "skillCode": "S3",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 132,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 132,
      "concept": "حساب قسط الإهلاك"
    },
    "concept": "حساب إهلاك سيارات النقل",
    "question": "سيارة نقل تكلفتها 240,000 جنيه، ونسبة إهلاكها السنوي 15%. كم يبلغ مصروف الإهلاك السنوي الواجب إثباته؟",
    "options": [
      "أ) 36,000 جنيه",
      "ب) 24,000 جنيه",
      "جـ) 15,000 جنيه",
      "د) 48,000 جنيه"
    ],
    "correctAnswer": "أ) 36,000 جنيه",
    "distractors": [
      "ب) 24,000 جنيه",
      "جـ) 15,000 جنيه",
      "د) 48,000 جنيه"
    ],
    "explanation": "مصروف الإهلاك = التكلفة × نسبة الإهلاك = 240,000 × 15% = 36,000 جنيه.",
    "tags": [
      "الوحدة الخامسة",
      "الإهلاك",
      "حساب قسط سنوي"
    ]
  },
  {
    "id": "U5-Q16",
    "sourceQuestionId": "U5-Q16",
    "originalId": "U5-Q16",
    "unitId": "unit-5",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U5.3",
    "skillCode": "S3",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 133,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 133,
      "concept": "عرض الإهلاك في قائمة المركز المالي"
    },
    "concept": "عرض الإهلاك ومجمع الإهلاك",
    "question": "كيف يظهر أثر الإهلاك السنوي في قائمة المركز المالي للمنشأة؟",
    "options": [
      "أ) من خلال طرح مجمع الإهلاك المتراكم من تكلفة الأصل غير المتداول لعرضه بصافي القيمة",
      "ب) كالتزام متداول يضاف إلى أرصدة الدائنين",
      "جـ) كخصم مباشر من رصيد النقدية بالخزينة",
      "د) لا يظهر في قائمة المركز المالي نهائياً بل في الأرباح والخسائر فقط"
    ],
    "correctAnswer": "أ) من خلال طرح مجمع الإهلاك المتراكم من تكلفة الأصل غير المتداول لعرضه بصافي القيمة",
    "distractors": [
      "ب) كالتزام متداول يضاف إلى أرصدة الدائنين",
      "جـ) كخصم مباشر من رصيد النقدية بالخزينة",
      "د) لا يظهر في قائمة المركز المالي نهائياً بل في الأرباح والخسائر فقط"
    ],
    "explanation": "الأصل غير المتداول يظهر بتكلفته التاريخية مطروحاً منه مجمع الإهلاك، ليعكس صافي قيمته الدفترية المتبقية.",
    "tags": [
      "الوحدة الخامسة",
      "مجمع الإهلاك",
      "عرض المركز المالي"
    ]
  },
  {
    "id": "U5-Q17",
    "sourceQuestionId": "U5-Q17",
    "originalId": "U5-Q17",
    "unitId": "unit-5",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U5.3",
    "skillCode": "S3",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 134,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 134,
      "concept": "المعالجة المحاسبية للديون المعدومة"
    },
    "concept": "قيد إثبات الدين المعدوم",
    "question": "عميل مدين بمبلغ 6,500 جنيه تأكد عدم قدرته على السداد نهائياً لإفلاسه. ما القيد المحاسبي الصحيح للتسوية؟",
    "options": [
      "أ) من حـ/ مصروف الديون المعدومة (6,500) إلى حـ/ المدينين (6,500)",
      "ب) من حـ/ المدينين (6,500) إلى حـ/ مصروف الديون المعدومة (6,500)",
      "جـ) من حـ/ الخزينة (6,500) إلى حـ/ الديون المعدومة (6,500)",
      "د) من حـ/ رأس المال (6,500) إلى حـ/ الخزينة (6,500)"
    ],
    "correctAnswer": "أ) من حـ/ مصروف الديون المعدومة (6,500) إلى حـ/ المدينين (6,500)",
    "distractors": [
      "ب) من حـ/ المدينين (6,500) إلى حـ/ مصروف الديون المعدومة (6,500)",
      "جـ) من حـ/ الخزينة (6,500) إلى حـ/ الديون المعدومة (6,500)",
      "د) من حـ/ رأس المال (6,500) إلى حـ/ الخزينة (6,500)"
    ],
    "explanation": "تطبيقاً لمبدأ الحيطة والحذر، يُحمل المبلغ كمصروف خسارة (مدين) ويُشطب مباشرة من حساب المدينين بتخفيضه (دائن).",
    "tags": [
      "الوحدة الخامسة",
      "الديون المعدومة",
      "قيود اليومية"
    ]
  },
  {
    "id": "U5-Q18",
    "sourceQuestionId": "U5-Q18",
    "originalId": "U5-Q18",
    "unitId": "unit-5",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U5.3",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "analytical",
    "sourceType": "official_textbook",
    "sourcePage": 135,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 135,
      "concept": "اكتشف الخطأ في التأمين المدفوع مقدماً"
    },
    "concept": "خطأ تحميل كامل التأمين",
    "question": "سجل محاسب كامل مبلغ تأمين مدفوع عن عامين كمصروف يخص السنة الحالية فقط. ما هو وجه الخطأ وما التصحيح السليم؟",
    "options": [
      "أ) الخطأ: تحميل الفترة بمصروف يخص فترات قادمة مما يخفض أرباحها؛ والتصحيح: خصم نصيب السنة فقط وإثبات الباقي تأميناً مقدماً كأصل متداول",
      "ب) الخطأ: عدم تسجيل ضريبة القيمة المضافة؛ والتصحيح: سداد القيمة نقداً",
      "جـ) الخطأ: تسجيل التأمين في حساب المتاجرة؛ والتصحيح: تحويله إلى حساب المشتريات",
      "د) لا يوجد خطأ ما دام المبلغ سُدد نقداً بالكامل خلال السنة"
    ],
    "correctAnswer": "أ) الخطأ: تحميل الفترة بمصروف يخص فترات قادمة مما يخفض أرباحها؛ والتصحيح: خصم نصيب السنة فقط وإثبات الباقي تأميناً مقدماً كأصل متداول",
    "distractors": [
      "ب) الخطأ: عدم تسجيل ضريبة القيمة المضافة؛ والتصحيح: سداد القيمة نقداً",
      "جـ) الخطأ: تسجيل التأمين في حساب المتاجرة؛ والتصحيح: تحويله إلى حساب المشتريات",
      "د) لا يوجد خطأ ما دام المبلغ سُدد نقداً بالكامل خلال السنة"
    ],
    "explanation": "مبدأ المقابلة وأساس الاستحقاق يقضيان بفصل ما يخص السنة الحالية كمصروف، واعتبار ما يخص الفترات القادمة أصلاً متداولاً (تأمين مدفوع مقدماً).",
    "tags": [
      "الوحدة الخامسة",
      "اكتشف الخطأ",
      "التأمين المقدم"
    ]
  },
  {
    "id": "U5-Q19",
    "sourceQuestionId": "U5-Q19",
    "originalId": "U5-Q19",
    "unitId": "unit-5",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U5.4",
    "skillCode": "S4",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 138,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 138,
      "concept": "الغرض من قائمة المركز المالي"
    },
    "concept": "الغرض من قائمة المركز المالي",
    "question": "ما الغرض الرئيسي من إعداد قائمة المركز المالي؟",
    "options": [
      "أ) بيان أصول المنشأة والتزاماتها وحقوق ملكية صاحبها في تاريخ محدد (لحظة زمنية)",
      "ب) بيان المبيعات وتكلفة البضاعة المباعة عن سنة كاملة",
      "جـ) تسجيل القيود اليومية المحاسبية وترحيلها للأستاذ",
      "د) حساب نسبة الضريبة المستحقة على أرباح الشركاء"
    ],
    "correctAnswer": "أ) بيان أصول المنشأة والتزاماتها وحقوق ملكية صاحبها في تاريخ محدد (لحظة زمنية)",
    "distractors": [
      "ب) بيان المبيعات وتكلفة البضاعة المباعة عن سنة كاملة",
      "جـ) تسجيل القيود اليومية المحاسبية وترحيلها للأستاذ",
      "د) حساب نسبة الضريبة المستحقة على أرباح الشركاء"
    ],
    "explanation": "قائمة المركز المالي تمثل صورة فوتوغرافية في تاريخ معين تبيّن ما تملكه المنشأة وما عليها وحقوق المالك وفق المعادلة: الأصول = الالتزامات + حقوق الملكية.",
    "tags": [
      "الوحدة الخامسة",
      "المركز المالي",
      "التعريف والأهداف"
    ]
  },
  {
    "id": "U5-Q20",
    "sourceQuestionId": "U5-Q20",
    "originalId": "U5-Q20",
    "unitId": "unit-5",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U5.4",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 139,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 139,
      "concept": "حساب حقوق الملكية في اختبر نفسك"
    },
    "concept": "تطبيق المعادلة المحاسبية",
    "question": "إذا كانت الأصول المتداولة 120,000 جنيه، والأصول غير المتداولة (صافي) 200,000 جنيه، والالتزامات المتداولة 70,000 جنيه، فكم تبلغ حقوق الملكية؟",
    "options": [
      "أ) 250,000 جنيه",
      "ب) 320,000 جنيه",
      "جـ) 190,000 جنيه",
      "د) 390,000 جنيه"
    ],
    "correctAnswer": "أ) 250,000 جنيه",
    "distractors": [
      "ب) 320,000 جنيه",
      "جـ) 190,000 جنيه",
      "د) 390,000 جنيه"
    ],
    "explanation": "إجمالي الأصول = 120,000 + 200,000 = 320,000 جنيه. حقوق الملكية = الأصول − الالتزامات = 320,000 − 70,000 = 250,000 جنيه.",
    "tags": [
      "الوحدة الخامسة",
      "المعادلة المحاسبية",
      "حقوق الملكية"
    ]
  },
  {
    "id": "U5-Q22",
    "sourceQuestionId": "U5-Q22",
    "originalId": "U5-Q22",
    "unitId": "unit-5",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U5.4",
    "skillCode": "S4",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 140,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 140,
      "concept": "معادلة رأس المال في حالة الخسارة"
    },
    "concept": "رأس المال في حالة الخسارة",
    "question": "في حالة تحقيق المنشأة لصافي خسارة، فإن معادلة حساب رأس المال آخر الفترة تصبح:",
    "options": [
      "أ) رأس المال أول الفترة − صافي الخسارة − المسحوبات",
      "ب) رأس المال أول الفترة + صافي الخسارة − المسحوبات",
      "جـ) رأس المال أول الفترة + صافي الخسارة + المسحوبات",
      "د) صافي الخسارة − المسحوبات الشخصية"
    ],
    "correctAnswer": "أ) رأس المال أول الفترة − صافي الخسارة − المسحوبات",
    "distractors": [
      "ب) رأس المال أول الفترة + صافي الخسارة − المسحوبات",
      "جـ) رأس المال أول الفترة + صافي الخسارة + المسحوبات",
      "د) صافي الخسارة − المسحوبات الشخصية"
    ],
    "explanation": "صافي الخسارة مثل المسحوبات تماماً؛ كلاهما ينقص حقوق الملكية ويمثل تآكلاً في رأس المال المستثمر في المشروع.",
    "tags": [
      "الوحدة الخامسة",
      "صافي الخسارة",
      "رأس المال"
    ]
  },
  {
    "id": "U5-Q23",
    "sourceQuestionId": "U5-Q23",
    "originalId": "U5-Q23",
    "unitId": "unit-5",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U5.4",
    "skillCode": "S4",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 142,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 142,
      "concept": "أسباب عدم توازن قائمة المركز المالي"
    },
    "concept": "فحص أسباب عدم التوازن",
    "question": "أظهرت قائمة مركز مالي إجمالي أصول 410,000 ج وإجمالي التزامات وحقوق ملكية 400,000 ج بفارق 10,000 ج. أي مما يلي يُعد سبباً محتملاً لهذا الخلل؟",
    "options": [
      "أ) نسيان إدراج تسوية جردية لمصروف مستحق أو خطأ في معادلة رأس المال بإغفال صافي الربح أو المسحوبات",
      "ب) توازن ميزان المراجعة قبل إعداد القائمة",
      "جـ) بيع بضاعة نقداً خلال العام وتحقيق مجمل ربح",
      "د) تسجيل أصل غير متداول بصافي قيمته الدفترية"
    ],
    "correctAnswer": "أ) نسيان إدراج تسوية جردية لمصروف مستحق أو خطأ في معادلة رأس المال بإغفال صافي الربح أو المسحوبات",
    "distractors": [
      "ب) توازن ميزان المراجعة قبل إعداد القائمة",
      "جـ) بيع بضاعة نقداً خلال العام وتحقيق مجمل ربح",
      "د) تسجيل أصل غير متداول بصافي قيمته الدفترية"
    ],
    "explanation": "عدم توازن القائمة ينجم عادة عن خطأ في حساب رأس المال، أو نسيان إحدى التسويات كالمستحق أو المقدم، أو خطأ في جمع أحد الجانبين.",
    "tags": [
      "الوحدة الخامسة",
      "عدم التوازن",
      "فحص المركز المالي"
    ]
  },
  {
    "id": "U5-Q24",
    "sourceQuestionId": "U5-Q24",
    "originalId": "U5-Q24",
    "unitId": "unit-5",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U5.4",
    "skillCode": "S4",
    "bloomLevel": "evaluation",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 143,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 143,
      "concept": "دلالة التوازن الحسابي"
    },
    "concept": "دلالة التوازن الحسابي للمركز المالي",
    "question": "لماذا لا يكفي توازن قائمة المركز المالي حسابياً كدليل قاطع على دقة وصحة جميع الأرقام؟",
    "options": [
      "أ) لأن الأخطاء قد تتقابل وتخفي بعضها البعض، كما أن القائمة تتأثر بالتقديرات الشخصية للمحاسب",
      "ب) لأن قائمة المركز المالي لا تخضع لقاعدة القيد المزدوج",
      "جـ) لأن الأصول المتداولة لا تتساوى مع الالتزامات المتداولة",
      "د) لأن مصلحة الضرائب لا تعتمد القوائم المتوازنة"
    ],
    "correctAnswer": "أ) لأن الأخطاء قد تتقابل وتخفي بعضها البعض، كما أن القائمة تتأثر بالتقديرات الشخصية للمحاسب",
    "distractors": [
      "ب) لأن قائمة المركز المالي لا تخضع لقاعدة القيد المزدوج",
      "جـ) لأن الأصول المتداولة لا تتساوى مع الالتزامات المتداولة",
      "د) لأن مصلحة الضرائب لا تعتمد القوائم المتوازنة"
    ],
    "explanation": "التوازن الحسابي يثبت فقط تساوي الأطراف، ولكنه قد يخفي أخطاء سهو أو أخطاء توجيه متقابلة، فضلاً عن اعتماده على تقديرات الإهلاك والمخصصات.",
    "tags": [
      "الوحدة الخامسة",
      "دلالة التوازن",
      "تفكير نقدي"
    ]
  },
  {
    "id": "U5-Q25",
    "sourceQuestionId": "U5-Q25",
    "originalId": "U5-Q25",
    "unitId": "unit-5",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U5.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 146,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 146,
      "concept": "حساب هامش مجمل الربح"
    },
    "concept": "حساب هامش مجمل الربح",
    "question": "منشأة بلغ مجمل ربحها 170,000 جنيه وصافي مبيعاتها 400,000 جنيه. كم يبلغ هامش مجمل الربح؟",
    "options": [
      "أ) 42.5%",
      "ب) 17.5%",
      "جـ) 25.0%",
      "د) 50.0%"
    ],
    "correctAnswer": "أ) 42.5%",
    "distractors": [
      "ب) 17.5%",
      "جـ) 25.0%",
      "د) 50.0%"
    ],
    "explanation": "هامش مجمل الربح = (مجمل الربح ÷ صافي المبيعات) × 100 = (170,000 ÷ 400,000) × 100 = 42.5%.",
    "tags": [
      "الوحدة الخامسة",
      "النسب المالية",
      "هامش مجمل الربح"
    ]
  },
  {
    "id": "U5-Q26",
    "sourceQuestionId": "U5-Q26",
    "originalId": "U5-Q26",
    "unitId": "unit-5",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U5.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 147,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 147,
      "concept": "حساب هامش صافي الربح"
    },
    "concept": "حساب هامش صافي الربح",
    "question": "إذا كان صافي ربح المنشأة 70,000 جنيه وصافي مبيعاتها 400,000 جنيه، فما هو هامش صافي الربح وما تفسيره؟",
    "options": [
      "أ) 17.5%، ويعني أن كل جنيه مبيعات يحقق 17.5 قرشاً كصافي ربح نهائي بعد كافة المصروفات",
      "ب) 42.5%، ويعني أن المنشأة تحقق أرباحاً استثنائية",
      "جـ) 2.3%، ويعني أن المنشأة تحقق خسائر غير معلنة",
      "د) 5.7 : 1، كنسبة سيولة نقدية"
    ],
    "correctAnswer": "أ) 17.5%، ويعني أن كل جنيه مبيعات يحقق 17.5 قرشاً كصافي ربح نهائي بعد كافة المصروفات",
    "distractors": [
      "ب) 42.5%، ويعني أن المنشأة تحقق أرباحاً استثنائية",
      "جـ) 2.3%، ويعني أن المنشأة تحقق خسائر غير معلنة",
      "د) 5.7 : 1، كنسبة سيولة نقدية"
    ],
    "explanation": "هامش صافي الربح = (70,000 ÷ 400,000) × 100 = 17.5%، ويفسر بأن المتبقي للمشروع من كل جنيه مبيعات هو 17.5 قرشاً.",
    "tags": [
      "الوحدة الخامسة",
      "النسب المالية",
      "هامش صافي الربح"
    ]
  },
  {
    "id": "U5-Q27",
    "sourceQuestionId": "U5-Q27",
    "originalId": "U5-Q27",
    "unitId": "unit-5",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U5.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 148,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 148,
      "concept": "حساب نسبة التداول"
    },
    "concept": "حساب نسبة التداول",
    "question": "منشأة تبلغ أصولها المتداولة 200,000 جنيه، والتزاماتها المتداولة 100,000 جنيه. كم تبلغ نسبة التداول؟",
    "options": [
      "أ) 2 : 1",
      "ب) 1 : 2",
      "جـ) 50%",
      "د) 3 : 1"
    ],
    "correctAnswer": "أ) 2 : 1",
    "distractors": [
      "ب) 1 : 2",
      "جـ) 50%",
      "د) 3 : 1"
    ],
    "explanation": "نسبة التداول = الأصول المتداولة ÷ الالتزامات المتداولة = 200,000 ÷ 100,000 = 2 : 1، وتدل على قدرة مريحة لسداد الديون العاجلة.",
    "tags": [
      "الوحدة الخامسة",
      "نسبة التداول",
      "السيولة"
    ]
  },
  {
    "id": "U5-Q28",
    "sourceQuestionId": "U5-Q28",
    "originalId": "U5-Q28",
    "unitId": "unit-5",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U5.5",
    "skillCode": "S5",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 149,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 149,
      "concept": "تفسير تباين هوامش الربحية"
    },
    "concept": "تفسير تباين هوامش الربحية",
    "question": "إذا كان لدى منشأة تجارية هامش مجمل ربح مرتفع (50%) وهامش صافي ربح منخفض جداً (5%)، فما التفسير التحليلي لهذا التباين؟",
    "options": [
      "أ) المنشأة تدير التسعير وشراء البضاعة بكفاءة ممتازة، ولكن مصروفاتها التشغيلية والإدارية مرتفعة جداً وتستنزف معظم مجمل الربح",
      "ب) المنشأة تعرضت لسرقة بضائع من مخازنها في نهاية العام",
      "جـ) نسبة التداول في المنشأة غير متوازنة مع الأصول غير المتداولة",
      "د) المبيعات تمت بالكامل نقداً دون أي بيع آجل"
    ],
    "correctAnswer": "أ) المنشأة تدير التسعير وشراء البضاعة بكفاءة ممتازة، ولكن مصروفاتها التشغيلية والإدارية مرتفعة جداً وتستنزف معظم مجمل الربح",
    "distractors": [
      "ب) المنشأة تعرضت لسرقة بضائع من مخازنها في نهاية العام",
      "جـ) نسبة التداول في المنشأة غير متوازنة مع الأصول غير المتداولة",
      "د) المبيعات تمت بالكامل نقداً دون أي بيع آجل"
    ],
    "explanation": "الفجوة الكبيرة بين هامش مجمل الربح وصافي الربح تشير فوراً إلى تضخم المصروفات التشغيلية (كالإيجارات أو الأجور أو الفوائد أو الإهلاك).",
    "tags": [
      "الوحدة الخامسة",
      "تحليل القوائم",
      "تفسير النسب"
    ]
  },
  {
    "id": "U5-Q29",
    "sourceQuestionId": "U5-Q29",
    "originalId": "U5-Q29",
    "unitId": "unit-5",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U5.5",
    "skillCode": "S5",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 150,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 150,
      "concept": "ترتيب خطوات الحل في الامتحان"
    },
    "concept": "الخطوة الأولى في حل المسألة الشاملة",
    "question": "عند البدء في حل مسألة شاملة تحتوي على ميزان مراجعة وتسويات جردية إضافية في الامتحان، ما هي الخطوة الأولى التي يجب إنجازها؟",
    "options": [
      "أ) قراءة التسويات الجردية أولاً وتحديد أثر كل تسوية على المصروف/الإيراد وعلى الأصل/الالتزام",
      "ب) رسم قائمة المركز المالي وتفريغ أرقام ميزان المراجعة مباشرة",
      "جـ) حساب رأس المال آخر الفترة بالمعادلة التقريبية",
      "د) حساب نسبة التداول ومقارنتها بالأعوام السابقة"
    ],
    "correctAnswer": "أ) قراءة التسويات الجردية أولاً وتحديد أثر كل تسوية على المصروف/الإيراد وعلى الأصل/الالتزام",
    "distractors": [
      "ب) رسم قائمة المركز المالي وتفريغ أرقام ميزان المراجعة مباشرة",
      "جـ) حساب رأس المال آخر الفترة بالمعادلة التقريبية",
      "د) حساب نسبة التداول ومقارنتها بالأعوام السابقة"
    ],
    "explanation": "البدء بقراءة وتحديد أثر التسويات يضمن تعديل كافة أرقام المصروفات والأصول بدقة قبل استخدامها في حساب المتاجرة والأرباح والخسائر والمركز المالي.",
    "tags": [
      "الوحدة الخامسة",
      "الترتيب الامتحاني",
      "التطبيق المتكامل"
    ]
  },
  {
    "id": "U5-Q30",
    "sourceQuestionId": "U5-Q30",
    "originalId": "U5-Q30",
    "unitId": "unit-5",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U5.5",
    "skillCode": "S5",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 151,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 151,
      "concept": "شجرة قرار التسويات"
    },
    "concept": "شجرة قرار التسويات السريعة",
    "question": "وفق شجرة قرار التسويات الجردية: إذا كان هناك مبلغ سُدد نقدًا ولكن جزءًا منه يخص فترات قادمة، فإن المعالجة تكون:",
    "options": [
      "أ) مصروف مدفوع مقدماً يظهر كأصل متداول في قائمة المركز المالي ويُخصم من مصروف الفترة",
      "ب) مصروف مستحق يظهر كالتزام متداول",
      "جـ) دين معدوم يُخصم مباشرة من حساب المدينين",
      "د) إهلاك سنوي يُطرح من الأصول غير المتداولة"
    ],
    "correctAnswer": "أ) مصروف مدفوع مقدماً يظهر كأصل متداول في قائمة المركز المالي ويُخصم من مصروف الفترة",
    "distractors": [
      "ب) مصروف مستحق يظهر كالتزام متداول",
      "جـ) دين معدوم يُخصم مباشرة من حساب المدينين",
      "د) إهلاك سنوي يُطرح من الأصول غير المتداولة"
    ],
    "explanation": "المبلغ المدفوع عن فترات قادمة هو منفعة مستقبلية تمثل أصلاً متداولاً يُستبعد من تكاليف الفترة الحالية تطبيقاً لمبدأ المقابلة.",
    "tags": [
      "الوحدة الخامسة",
      "شجرة القرار",
      "التسويات"
    ]
  },
  {
    "id": "U5-Q31",
    "sourceQuestionId": "U5-Q31",
    "originalId": "U5-Q31",
    "unitId": "unit-5",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U5.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 154,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 154,
      "concept": "قضية JRE المحورية"
    },
    "concept": "هل القوائم نسخة حرفية أم تفسير منظم؟",
    "question": "في ضوء مهارة التفسير المدعوم بالأدلة JRE: هل تُعد القوائم المالية صورة حرفية طبق الأصل للواقع الاقتصادي؟",
    "options": [
      "أ) لا، بل هي تفسير منظم ومفيد تحكمه القواعد المحاسبية ولكن تتأثر أرقامه بالتقديرات والسياسات المهنية كالإهلاك والديون والمخزون",
      "ب) نعم، لأن القيد المزدوج يضمن تمثيل كل حدث بدقة رياضية مطلقة لا تحتمل أي تقدير",
      "جـ) نعم، لأن ميزان المراجعة يمنع حدوث أي اختلافات في تقييم الأصول",
      "د) لا، لأن القوائم المالية لا تعتمد على أي مستندات أو سجلات رسمية"
    ],
    "correctAnswer": "أ) لا، بل هي تفسير منظم ومفيد تحكمه القواعد المحاسبية ولكن تتأثر أرقامه بالتقديرات والسياسات المهنية كالإهلاك والديون والمخزون",
    "distractors": [
      "ب) نعم، لأن القيد المزدوج يضمن تمثيل كل حدث بدقة رياضية مطلقة لا تحتمل أي تقدير",
      "جـ) نعم، لأن ميزان المراجعة يمنع حدوث أي اختلافات في تقييم الأصول",
      "د) لا، لأن القوائم المالية لا تعتمد على أي مستندات أو سجلات رسمية"
    ],
    "explanation": "القوائم المالية تقدم تمثيلاً منظماً ومفيداً لاتخاذ القرار، ولكنها تعتمد على أحكام وتقديرات مهنية (العمر الإنتاجي، الديون المشكوك فيها، تقييم المخزون)، فهي تفسير وليست نسخة حرفية مجردة.",
    "tags": [
      "الوحدة الخامسة",
      "JRE",
      "تفكير نقدي"
    ]
  },
  {
    "id": "U5-Q32",
    "sourceQuestionId": "U5-Q32",
    "originalId": "U5-Q32",
    "unitId": "unit-5",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U5.6",
    "skillCode": "S6",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 155,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 155,
      "concept": "دراسة حالة وهم الربح في النادي"
    },
    "concept": "استنتاج دراسة حالة وهم الربح",
    "question": "في دراسة حالة النادي التجاري، حُسب الربح المبدئي بـ 80,000 ج، لكن تبيّن إهمال إيجار مستحق 15 ألف، وإهلاك 20 ألف، ودين معدوم 12 ألف. ما الاستنتاج المحاسبي المستفاد؟",
    "options": [
      "أ) الربح الحقيقي يقل كثيراً عن 80,000 ج؛ ولا يمكن قياس الأداء السليم إلا بعد إجراء التسويات الجردية الشاملة",
      "ب) النادي حقق نجاحاً ممتازاً لأن المبيعات غطت المشتريات والمصروفات النقدية",
      "جـ) الإيجار المستحق يرفع من أرباح النادي لعدم سداده نقداً",
      "د) الدين المعدوم لا يؤثر على الأرباح إلا بعد اتخاذ الإجراءات القضائية"
    ],
    "correctAnswer": "أ) الربح الحقيقي يقل كثيراً عن 80,000 ج؛ ولا يمكن قياس الأداء السليم إلا بعد إجراء التسويات الجردية الشاملة",
    "distractors": [
      "ب) النادي حقق نجاحاً ممتازاً لأن المبيعات غطت المشتريات والمصروفات النقدية",
      "جـ) الإيجار المستحق يرفع من أرباح النادي لعدم سداده نقداً",
      "د) الدين المعدوم لا يؤثر على الأرباح إلا بعد اتخاذ الإجراءات القضائية"
    ],
    "explanation": "إهمال التسويات يخلق وهماً بالربحية العالية؛ فقياس الأداء لا يكتمل إلا بتحميل الفترة بجميع استحقاقاتها من التزامات واستهلاكات.",
    "tags": [
      "الوحدة الخامسة",
      "دراسة حالة",
      "وهم الربح"
    ]
  },
  {
    "id": "U5-Q33",
    "sourceQuestionId": "U5-Q33",
    "originalId": "U5-Q33",
    "unitId": "unit-5",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U5.6",
    "skillCode": "S6",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 156,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 156,
      "concept": "دراسة حالة شركة النور"
    },
    "concept": "أثر تقديرات المدقق في شركة النور",
    "question": "في دراسة حالة شركة النور للتجارة، هبط صافي الربح من 120,000 ج إلى 98,000 ج (بانخفاض 22,000 ج) بعد مراجعة المدقق. ما الدليل الذي يثبته هذا المثال؟",
    "options": [
      "أ) أن الربح المحاسبي المعلن قد يتغير جوهرياً بمجرد تعديل التقديرات المحاسبية (كالإهلاك والديون والمخزون) دون أي تغير في النشاط أو التدفق النقدي",
      "ب) أن الشركة ارتكبت أخطاء حسابية في الجمع والطرح",
      "جـ) أن تقييم المخزون لا يؤثر نهائياً على صافي الربح",
      "د) أن الشركة تحولت إلى الإفلاس التام نتيجة تدقيق الحسابات"
    ],
    "correctAnswer": "أ) أن الربح المحاسبي المعلن قد يتغير جوهرياً بمجرد تعديل التقديرات المحاسبية (كالإهلاك والديون والمخزون) دون أي تغير في النشاط أو التدفق النقدي",
    "distractors": [
      "ب) أن الشركة ارتكبت أخطاء حسابية في الجمع والطرح",
      "جـ) أن تقييم المخزون لا يؤثر نهائياً على صافي الربح",
      "د) أن الشركة تحولت إلى الإفلاس التام نتيجة تدقيق الحسابات"
    ],
    "explanation": "تعديل تقدير الإهلاك بـ 10,000 والديون بـ 7,000 والمخزون بـ 5,000 خفض الربح بـ 22,000 ج بالكامل بسبب اختلاف التقديرات فقط دون أي تغير في حجم المبيعات الفعلي.",
    "tags": [
      "الوحدة الخامسة",
      "شركة النور",
      "أثر التقديرات"
    ]
  },
  {
    "id": "U5-Q34",
    "sourceQuestionId": "U5-Q34",
    "originalId": "U5-Q34",
    "unitId": "unit-5",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U5.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "jre",
    "sourceType": "official_textbook",
    "sourcePage": 157,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 157,
      "concept": "سلّم تقدير إجابة JRE"
    },
    "concept": "معايير سلّم تقدير مرافعة JRE",
    "question": "وفق سلّم التقدير المعتمد لإجابة JRE (10 درجات)، ما العنصر الذي يستحق (2 - 3 درجات) ويجب أن يتضمن أدلة من دراستي الحالة؟",
    "options": [
      "أ) الحجة المعارضة المبرزة لأثر التقديرات الشخصية والسياسات المحاسبية على الأرباح المعلنة",
      "ب) كتابة العنوان وأرقام الصفحات",
      "جـ) رسم جدول ميزان المراجعة ذي العمودين",
      "د) كتابة نص المعادلة المحاسبية فقط دون أي تعليق"
    ],
    "correctAnswer": "أ) الحجة المعارضة المبرزة لأثر التقديرات الشخصية والسياسات المحاسبية على الأرباح المعلنة",
    "distractors": [
      "ب) كتابة العنوان وأرقام الصفحات",
      "جـ) رسم جدول ميزان المراجعة ذي العمودين",
      "د) كتابة نص المعادلة المحاسبية فقط دون أي تعليق"
    ],
    "explanation": "الحجة المعارضة (2-3 درجات) تتطلب بيان أثر التقديرات (كالإهلاك والديون المعدومة وتقييم المخزون) وتدعيمها بأمثلة عددية من دراسة حالة النادي أو شركة النور.",
    "tags": [
      "الوحدة الخامسة",
      "سلّم التقدير",
      "JRE"
    ]
  },
  {
    "id": "U5-Q35",
    "sourceQuestionId": "U5-Q35",
    "originalId": "U5-Q35",
    "unitId": "unit-5",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U5.6",
    "skillCode": "S6",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 158,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 158,
      "concept": "أثر السهو في تسجيل مصروف مستحق"
    },
    "concept": "أثر إهمال تسجيل مصروف مستحق",
    "question": "نسي محاسب تسجيل مصروف إيجار مستحق قدره 7,000 جنيه عند إعداد القوائم المالية. ما الأثر المزدوج لهذا السهو على الربح والمركز المالي؟",
    "options": [
      "أ) سيظهر صافي الربح أعلى من الحقيقي بـ 7,000 ج، وتظهر الالتزامات أقل من الحقيقية بـ 7,000 ج",
      "ب) سيظهر صافي الربح أقل بـ 7,000 ج وتظهر الأصول أعلى بـ 7,000 ج",
      "جـ) ستنخفض النقدية بالخزينة بـ 7,000 ج دون تأثر الأرباح",
      "د) لن يتأثر أي حساب لأن الإيجار لم يُدفع نقدًا بعد"
    ],
    "correctAnswer": "أ) سيظهر صافي الربح أعلى من الحقيقي بـ 7,000 ج، وتظهر الالتزامات أقل من الحقيقية بـ 7,000 ج",
    "distractors": [
      "ب) سيظهر صافي الربح أقل بـ 7,000 ج وتظهر الأصول أعلى بـ 7,000 ج",
      "جـ) ستنخفض النقدية بالخزينة بـ 7,000 ج دون تأثر الأرباح",
      "د) لن يتأثر أي حساب لأن الإيجار لم يُدفع نقدًا بعد"
    ],
    "explanation": "عدم إثبات المصروف يخفض إجمالي المصروفات فيظهر الربح متضخماً، وعدم إثبات الالتزام المستحق يظهر التزامات المنشأة ناقصة، مما يضلل مستخدمي القوائم.",
    "tags": [
      "الوحدة الخامسة",
      "فكر كمحاسب",
      "أثر السهو في التسويات"
    ]
  },
  {
    "id": "U5-Q36",
    "sourceQuestionId": "U5-Q36",
    "originalId": "U5-Q36",
    "unitId": "unit-5",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U5.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 159,
    "sourceDocument": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الخامسة_-_القوائم_المالية_للمنشأة_الفردية_-_بكالوريا.pdf",
      "source_page": 159,
      "concept": "الحكم النهائي المبرر في JRE"
    },
    "concept": "الخاتمة الناضجة لمرافعة JRE",
    "question": "ما الصياغة الأكثر نضجاً وتوازناً لخاتمة مرافعة محاسبية JRE حول موثوقية القوائم المالية؟",
    "options": [
      "أ) القوائم المالية تمثل الواقع المالي تمثيلاً منظماً ومفيداً لاتخاذ القرار وفق قواعد منضبطة، ولكنها تفعل ذلك من خلال سياسات وتقديرات مهنية، فهي أداة مهمة شريطة فهم افتراضاتها وحدودها",
      "ب) القوائم المالية غير جديرة بالثقة نهائياً ويجب التخلي عنها لصالح السجلات غير الرسمية",
      "جـ) القوائم المالية دقيقة تماماً بنسبة 100% ولا يمكن أن يعتريها أي تحيز أو اختلاف تقديري",
      "د) توازن ميزان المراجعة يكفي بمفرده بديلاً عن إعداد القوائم المالية"
    ],
    "correctAnswer": "أ) القوائم المالية تمثل الواقع المالي تمثيلاً منظماً ومفيداً لاتخاذ القرار وفق قواعد منضبطة، ولكنها تفعل ذلك من خلال سياسات وتقديرات مهنية، فهي أداة مهمة شريطة فهم افتراضاتها وحدودها",
    "distractors": [
      "ب) القوائم المالية غير جديرة بالثقة نهائياً ويجب التخلي عنها لصالح السجلات غير الرسمية",
      "جـ) القوائم المالية دقيقة تماماً بنسبة 100% ولا يمكن أن يعتريها أي تحيز أو اختلاف تقديري",
      "د) توازن ميزان المراجعة يكفي بمفرده بديلاً عن إعداد القوائم المالية"
    ],
    "explanation": "الخاتمة المتوازنة تجمع بين الاعتراف بفائدة وموثوقية القوائم الهيكلية، وبين الوعي النقدي بحدودها وتأثرها بالتقديرات المهنية للأحداث.",
    "tags": [
      "الوحدة الخامسة",
      "خاتمة JRE",
      "تقييم ناضج"
    ]
  }
];

/**
 * أسئلة الوحدة السادسة المعتمدة لكتاب الوزارة (27 سؤالاً رسمياً بعد استبعاد المستبدل)
 */
export const unit6OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "U6-Q01",
    "sourceQuestionId": "U6-Q01",
    "originalId": "U6-Q01",
    "unitId": "unit-6",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U6.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 161,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 161,
      "concept": "تعريف نظام القيد المفرد"
    },
    "concept": "تعريف نظام القيد المفرد",
    "question": "ما هو المفهوم المحاسبي لنظام القيد المفرد (السجلات غير المكتملة)؟",
    "options": [
      "أ) أسلوب تسجيل يركز عادةً على المقبوضات والمدفوعات النقدية دون الاحتفاظ بسجلات تفصيلية كاملة للطرفين المتكافئين",
      "ب) نظام محاسبي متكامل يسجل طرفين متساويين لكل معاملة مالية",
      "جـ) طريقة إلكترونية متقدمة لإعداد القوائم المالية عبر ميزان المراجعة",
      "د) سجل خاص بحسابات البنوك والاعتمادات المستندية فقط"
    ],
    "correctAnswer": "أ) أسلوب تسجيل يركز عادةً على المقبوضات والمدفوعات النقدية دون الاحتفاظ بسجلات تفصيلية كاملة للطرفين المتكافئين",
    "distractors": [
      "ب) نظام محاسبي متكامل يسجل طرفين متساويين لكل معاملة مالية",
      "جـ) طريقة إلكترونية متقدمة لإعداد القوائم المالية عبر ميزان المراجعة",
      "د) سجل خاص بحسابات البنوك والاعتمادات المستندية فقط"
    ],
    "explanation": "نظام القيد المفرد يركز على التدفقات النقدية الداخلة والخارجة ويهمل تتبع الحسابات الفردية الآجلة والمخزون مما يجعله سجلاً غير مكتمل.",
    "tags": [
      "الوحدة السادسة",
      "القيد المفرد",
      "السجلات غير المكتملة"
    ]
  },
  {
    "id": "U6-Q02",
    "sourceQuestionId": "U6-Q02",
    "originalId": "U6-Q02",
    "unitId": "unit-6",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U6.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 162,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 162,
      "concept": "المقارنة بين القيد المفرد والمزدوج"
    },
    "concept": "المقارنة بين القيد المفرد والمزدوج",
    "question": "من حيث التحقق من الدقة الحسابية، ما وجه الاختلاف الجوهري بين القيد المزدوج والقيد المفرد؟",
    "options": [
      "أ) القيد المزدوج يسهل التحقق منه عبر ميزان المراجعة لتساوي الطرفين، بينما يتعذر ذلك في القيد المفرد",
      "ب) القيد المفرد يوفر ميزان مراجعة أسبوعي أدق",
      "جـ) كلاهما يعتمد بالكامل على ميزان المراجعة بالأرصدة",
      "د) لا يوجد أي فرق بين النظامين في وسائل التحقق"
    ],
    "correctAnswer": "أ) القيد المزدوج يسهل التحقق منه عبر ميزان المراجعة لتساوي الطرفين، بينما يتعذر ذلك في القيد المفرد",
    "distractors": [
      "ب) القيد المفرد يوفر ميزان مراجعة أسبوعي أدق",
      "جـ) كلاهما يعتمد بالكامل على ميزان المراجعة بالأرصدة",
      "د) لا يوجد أي فرق بين النظامين في وسائل التحقق"
    ],
    "explanation": "في القيد المزدوج يضمن توازن المدين والدائن إمكانية إعداد ميزان المراجعة، بينما في القيد المفرد يغيب هذا التوازن الآلي لعدم ثبوت الطرفين.",
    "tags": [
      "الوحدة السادسة",
      "ميزان المراجعة",
      "التحقق الرقابي"
    ]
  },
  {
    "id": "U6-Q03",
    "sourceQuestionId": "U6-Q03",
    "originalId": "U6-Q03",
    "unitId": "unit-6",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U6.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 163,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 163,
      "concept": "دوافع استخدام القيد المفرد"
    },
    "concept": "دوافع استخدام القيد المفرد",
    "question": "لجوء المنشآت الصغيرة لاستخدام نظام القيد المفرد يرجع في الغالب إلى قلة التكلفة وبساطة النشاط ومحدودية المعرفة المحاسبية، وليس بالضرورة نية الاحتيال.",
    "options": [
      "صواب",
      "خطأ"
    ],
    "correctAnswer": "صواب",
    "distractors": [
      "خطأ"
    ],
    "explanation": "صغر حجم النشاط وتجنب تكلفة الأنظمة المعقدة وسهولة متابعة النقدية هي الأسباب العملية الرئيسية وراء استخدام القيد المفرد.",
    "tags": [
      "الوحدة السادسة",
      "القيد المفرد",
      "دوافع الاستخدام"
    ]
  },
  {
    "id": "U6-Q04",
    "sourceQuestionId": "U6-Q04",
    "originalId": "U6-Q04",
    "unitId": "unit-6",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U6.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 164,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 164,
      "concept": "السجلات المفقودة في القيد المفرد"
    },
    "concept": "السجلات المفقودة في القيد المفرد",
    "question": "أي من السجلات المحاسبية التالية يكون مفقوداً في العادة لدى منشأة تعتمد نظام القيد المفرد؟",
    "options": [
      "أ) دفتر أستاذ العملاء والموردين وسجلات المخزون التفصيلية",
      "ب) دفتر النقدية والخزينة اليومي",
      "جـ) فواتير المشتريات النقدية",
      "د) إيصالات استلام النقدية"
    ],
    "correctAnswer": "أ) دفتر أستاذ العملاء والموردين وسجلات المخزون التفصيلية",
    "distractors": [
      "ب) دفتر النقدية والخزينة اليومي",
      "جـ) فواتير المشتريات النقدية",
      "د) إيصالات استلام النقدية"
    ],
    "explanation": "المنشآت المعتمدة على القيد المفرد تحتفظ عادة بالنقدية وبعض الإيصالات ولكنها تفتقر لدفاتر أستاذ مساعدة للمدينين والدائنين والمخزون.",
    "tags": [
      "الوحدة السادسة",
      "السجلات المفقودة"
    ]
  },
  {
    "id": "U6-Q05",
    "sourceQuestionId": "U6-Q05",
    "originalId": "U6-Q05",
    "unitId": "unit-6",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U6.1",
    "skillCode": "S1",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 165,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 165,
      "concept": "محدودية الرقابة النقدية المنفردة"
    },
    "concept": "محدودية الرقابة النقدية المنفردة",
    "question": "لماذا لا تعد متابعة حركة النقدية وحدها كافية لقياس ربحية المنشأة الفردية؟",
    "options": [
      "أ) لأن النقدية لا تعكس العمليات الآجلة ومخزون البضاعة والالتزامات المستحقة",
      "ب) لأن النقدية تتغير كل يوم بينما الربح لا يتغير",
      "جـ) لأن البنوك لا تعترف بالمعاملات النقدية",
      "د) لأن النقدية تعبر عن حقوق الملكية فقط دون الأصول"
    ],
    "correctAnswer": "أ) لأن النقدية لا تعكس العمليات الآجلة ومخزون البضاعة والالتزامات المستحقة",
    "distractors": [
      "ب) لأن النقدية تتغير كل يوم بينما الربح لا يتغير",
      "جـ) لأن البنوك لا تعترف بالمعاملات النقدية",
      "د) لأن النقدية تعبر عن حقوق الملكية فقط دون الأصول"
    ],
    "explanation": "الربح الحقيقي يخضع لأساس الاستحقاق والتغير في صافي حقوق الملكية، بينما النقدية تتأثر بالقروض والمسحوبات والمبيعات النقدية فقط.",
    "tags": [
      "الوحدة السادسة",
      "الربحية والنقدية"
    ]
  },
  {
    "id": "U6-Q06",
    "sourceQuestionId": "U6-Q06",
    "originalId": "U6-Q06",
    "unitId": "unit-6",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U6.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 166,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 166,
      "concept": "استمرارية المحاسبة عند نقص السجلات"
    },
    "concept": "استمرارية المحاسبة عند نقص السجلات",
    "question": "عندما تفقد المنشأة بعض سجلاتها المحاسبية، تتوقف العملية المحاسبية تماماً ويتعذر تحديد نتيجة النشاط أو المركز المالي بأي شكل.",
    "options": [
      "صواب",
      "خطأ"
    ],
    "correctAnswer": "خطأ",
    "distractors": [
      "صواب"
    ],
    "explanation": "المحاسبة لا تتوقف عند نقص السجلات؛ بل تتحول إلى عملية 'إعادة بناء' منظمة تعتمد على أدلة غير مباشرة وأدوات رقابية كمعادلة رأس المال وحسابات المراقبة.",
    "tags": [
      "الوحدة السادسة",
      "إعادة البناء المحاسبي"
    ]
  },
  {
    "id": "U6-Q07",
    "sourceQuestionId": "U6-Q07",
    "originalId": "U6-Q07",
    "unitId": "unit-6",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U6.2",
    "skillCode": "S2",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 169,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 169,
      "concept": "معادلة استخراج رأس المال"
    },
    "concept": "معادلة استخراج رأس المال",
    "question": "كيف يُحسب رأس المال للمنشأة في أي تاريخ زمني محدد؟",
    "options": [
      "أ) رأس المال = إجمالي الأصول − إجمالي الخصوم",
      "ب) رأس المال = إجمالي الأصول + إجمالي الخصوم",
      "جـ) رأس المال = المبيعات النقدية − المشتريات",
      "د) رأس المال = رصيد البنك + المسحوبات الشخصية"
    ],
    "correctAnswer": "أ) رأس المال = إجمالي الأصول − إجمالي الخصوم",
    "distractors": [
      "ب) رأس المال = إجمالي الأصول + إجمالي الخصوم",
      "جـ) رأس المال = المبيعات النقدية − المشتريات",
      "د) رأس المال = رصيد البنك + المسحوبات الشخصية"
    ],
    "explanation": "معادلة المركز المالي الأساسية تنص على أن حقوق الملكية (رأس المال) تساوي الأصول مطروحاً منها الخصوم المستحقة للغير.",
    "tags": [
      "الوحدة السادسة",
      "معادلة رأس المال"
    ]
  },
  {
    "id": "U6-Q08",
    "sourceQuestionId": "U6-Q08",
    "originalId": "U6-Q08",
    "unitId": "unit-6",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U6.2",
    "skillCode": "S2",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 170,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 170,
      "concept": "معادلة صافي الربح في السجلات غير المكتملة"
    },
    "concept": "معادلة صافي الربح في السجلات غير المكتملة",
    "question": "ما هي المعادلة المعتمدة لحساب صافي الربح من التغير في رأس المال؟",
    "options": [
      "أ) صافي الربح = رأس المال آخر الفترة − رأس المال أول الفترة + المسحوبات − رأس المال الإضافي",
      "ب) صافي الربح = رأس المال أول الفترة − رأس المال آخر الفترة − المسحوبات + رأس المال الإضافي",
      "جـ) صافي الربح = الأصول آخر الفترة − الأصول أول الفترة",
      "د) صافي الربح = المسحوبات + رأس المال الإضافي"
    ],
    "correctAnswer": "أ) صافي الربح = رأس المال آخر الفترة − رأس المال أول الفترة + المسحوبات − رأس المال الإضافي",
    "distractors": [
      "ب) صافي الربح = رأس المال أول الفترة − رأس المال آخر الفترة − المسحوبات + رأس المال الإضافي",
      "جـ) صافي الربح = الأصول آخر الفترة − الأصول أول الفترة",
      "د) صافي الربح = المسحوبات + رأس المال الإضافي"
    ],
    "explanation": "صافي الربح = (رأس المال آخر − رأس المال أول) + المسحوبات (لأنها خفضت رأس المال دون أن تكون خسارة) − رأس المال الإضافي (لأنه مال خارجي).",
    "tags": [
      "الوحدة السادسة",
      "معادلة صافي الربح"
    ]
  },
  {
    "id": "U6-Q09",
    "sourceQuestionId": "U6-Q09",
    "originalId": "U6-Q09",
    "unitId": "unit-6",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U6.2",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 171,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 171,
      "concept": "تطبيق حساب رأس المال والربح"
    },
    "concept": "تطبيق حساب رأس المال والربح",
    "question": "إذا كان رأس المال أول الفترة 21,000 ج، وآخر الفترة 22,000 ج، وبلغت المسحوبات 3,000 ج، ورأس المال الإضافي 2,000 ج، فإن صافي ربح الفترة يساوي:",
    "options": [
      "أ) 2,000 جنيه",
      "ب) 4,000 جنيه",
      "جـ) 1,000 جنيه",
      "د) 6,000 جنيه"
    ],
    "correctAnswer": "أ) 2,000 جنيه",
    "distractors": [
      "ب) 4,000 جنيه",
      "جـ) 1,000 جنيه",
      "د) 6,000 جنيه"
    ],
    "explanation": "صافي الربح = 22,000 − 21,000 + 3,000 − 2,000 = 1,000 + 3,000 − 2,000 = 2,000 جنيه.",
    "tags": [
      "الوحدة السادسة",
      "مسألة حسابية",
      "صافي الربح"
    ]
  },
  {
    "id": "U6-Q10",
    "sourceQuestionId": "U6-Q10",
    "originalId": "U6-Q10",
    "unitId": "unit-6",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U6.2",
    "skillCode": "S2",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 172,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 172,
      "concept": "علة معاملة المسحوبات ورأس المال الإضافي"
    },
    "concept": "علة معاملة المسحوبات ورأس المال الإضافي",
    "question": "لماذا يُطرح رأس المال الإضافي في معادلة استنتاج صافي الربح؟",
    "options": [
      "أ) لأنه تمويل خارجي ضخه المالك من ماله الخاص ولا يمثل ربحاً ناتجاً عن كفاءة النشاط التجاري",
      "ب) لأنه مصروف إداري يجب خصمه من الإيرادات",
      "جـ) لأنه يمثل التزاماً متداولاً على المنشأة للموردين",
      "د) لأن ميزان المراجعة يتطلب طرحه لإلغاء التوازن"
    ],
    "correctAnswer": "أ) لأنه تمويل خارجي ضخه المالك من ماله الخاص ولا يمثل ربحاً ناتجاً عن كفاءة النشاط التجاري",
    "distractors": [
      "ب) لأنه مصروف إداري يجب خصمه من الإيرادات",
      "جـ) لأنه يمثل التزاماً متداولاً على المنشأة للموردين",
      "د) لأن ميزان المراجعة يتطلب طرحه لإلغاء التوازن"
    ],
    "explanation": "رأس المال الإضافي رفع رصيد آخر المدة دون أن يكون ناتجاً عن بيع البضاعة أو تحقيق إيرادات، فطرحه ضروري لعزل قرارات المالك التمويلية عن نتيجة النشاط.",
    "tags": [
      "الوحدة السادسة",
      "رأس المال الإضافي"
    ]
  },
  {
    "id": "U6-Q12",
    "sourceQuestionId": "U6-Q12",
    "originalId": "U6-Q12",
    "unitId": "unit-6",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U6.2",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 174,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 174,
      "concept": "استخراج رأس المال من بيانات الأصول والخصوم"
    },
    "concept": "استخراج رأس المال من بيانات الأصول والخصوم",
    "question": "أصول أول الفترة 40,000 ج وخصومها 12,000 ج. أصول آخر الفترة 55,000 ج وخصومها 16,000 ج. المسحوبات 6,000 ج ورأس المال الإضافي 3,000 ج. صافي الربح يساوي:",
    "options": [
      "أ) 14,000 جنيه",
      "ب) 11,000 جنيه",
      "جـ) 17,000 جنيه",
      "د) 8,000 جنيه"
    ],
    "correctAnswer": "أ) 14,000 جنيه",
    "distractors": [
      "ب) 11,000 جنيه",
      "جـ) 17,000 جنيه",
      "د) 8,000 جنيه"
    ],
    "explanation": "رأس المال أول = 40,000 − 12,000 = 28,000 ج. رأس المال آخر = 55,000 − 16,000 = 39,000 ج. صافي الربح = 39,000 − 28,000 + 6,000 − 3,000 = 11,000 + 3,000 = 14,000 جنيه.",
    "tags": [
      "الوحدة السادسة",
      "مسألة مركبة",
      "صافي الربح"
    ]
  },
  {
    "id": "U6-Q15",
    "sourceQuestionId": "U6-Q15",
    "originalId": "U6-Q15",
    "unitId": "unit-6",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U6.3",
    "skillCode": "S3",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 178,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 178,
      "concept": "موضع الخصم المسموح به"
    },
    "concept": "موضع الخصم المسموح به",
    "question": "يوضع الخصم المسموح به في الجانب المدين لحساب مراقبة دفتر أستاذ المبيعات لأنه يمثل خسارة ومصروفاً للمنشأة.",
    "options": [
      "صواب",
      "خطأ"
    ],
    "correctAnswer": "خطأ",
    "distractors": [
      "صواب"
    ],
    "explanation": "خطأ؛ لأن الخصم المسموح به يخفض من رصيد ديون العملاء، ولذا يوضع في الجانب الدائن لحساب مراقبة المبيعات.",
    "tags": [
      "الوحدة السادسة",
      "الخصم المسموح به",
      "مراقبة المبيعات"
    ]
  },
  {
    "id": "U6-Q18",
    "sourceQuestionId": "U6-Q18",
    "originalId": "U6-Q18",
    "unitId": "unit-6",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U6.3",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 181,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 181,
      "concept": "تفسير فروق حساب المراقبة"
    },
    "concept": "تفسير فروق حساب المراقبة",
    "question": "إذا لم يتطابق رصيد حساب مراقبة المشتريات مع مجموع أرصدة كشف الموردين الفردية، فما هو التفسير المحاسبي الأرجح؟",
    "options": [
      "أ) وجود أخطاء كتابية مثل إغفال ترحيل فاتورة، أو خطأ في نقل مبلغ، أو ترحيل للجانب العكسي",
      "ب) إفلاس المنشأة وتوقف نشاطها التجاري",
      "جـ) تغير سعر الصرف الرسمي في البنك المركزي",
      "د) تطابق دفاتر النقدية مع كشف البنك تلقائياً"
    ],
    "correctAnswer": "أ) وجود أخطاء كتابية مثل إغفال ترحيل فاتورة، أو خطأ في نقل مبلغ، أو ترحيل للجانب العكسي",
    "distractors": [
      "ب) إفلاس المنشأة وتوقف نشاطها التجاري",
      "جـ) تغير سعر الصرف الرسمي في البنك المركزي",
      "د) تطابق دفاتر النقدية مع كشف البنك تلقائياً"
    ],
    "explanation": "فروق المطابقة بين حساب المراقبة الإجمالي والأستاذ المساعد تنشأ عادة عن أخطاء ترحيل أو سهو مكتبي يستوجب المراجعة والتصحيح.",
    "tags": [
      "الوحدة السادسة",
      "أخطاء الترحيل",
      "المطابقة الدفترية"
    ]
  },
  {
    "id": "U6-Q19",
    "sourceQuestionId": "U6-Q19",
    "originalId": "U6-Q19",
    "unitId": "unit-6",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U6.4",
    "skillCode": "S4",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 185,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 185,
      "concept": "فروق التوقيت البنكية"
    },
    "concept": "فروق التوقيت البنكية",
    "question": "ما المقصود بـ 'الشيكات الصادرة التي لم تُقدَّم للصرف بعد'؟",
    "options": [
      "أ) شيكات حررتها المنشأة للموردين وخصمتها من دفاترها ولكن المستفيدين لم يقدموها للبنك حتى تاريخ الكشف",
      "ب) شيكات استلمتها المنشأة من العملاء ورفضها البنك لعدم كفاية الرصيد",
      "جـ) شيكات مزورة أوقفتها إدارة البنك",
      "د) شيكات ألغتها المنشأة قبل تسليمها"
    ],
    "correctAnswer": "أ) شيكات حررتها المنشأة للموردين وخصمتها من دفاترها ولكن المستفيدين لم يقدموها للبنك حتى تاريخ الكشف",
    "distractors": [
      "ب) شيكات استلمتها المنشأة من العملاء ورفضها البنك لعدم كفاية الرصيد",
      "جـ) شيكات مزورة أوقفتها إدارة البنك",
      "د) شيكات ألغتها المنشأة قبل تسليمها"
    ],
    "explanation": "الشيكات غير المصروفة هي فروق توقيت؛ المنشأة سجلت السداد وخفضت دفترها، لكن البنك لم يخصمها بعد لعدم حضور المستفيد.",
    "tags": [
      "الوحدة السادسة",
      "شيكات غير مصروفة",
      "تسوية البنك"
    ]
  },
  {
    "id": "U6-Q20",
    "sourceQuestionId": "U6-Q20",
    "originalId": "U6-Q20",
    "unitId": "unit-6",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U6.4",
    "skillCode": "S4",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 186,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 186,
      "concept": "وظيفة مذكرة تسوية البنك"
    },
    "concept": "وظيفة مذكرة تسوية البنك",
    "question": "مذكرة تسوية البنك تصحح القيود والأخطاء تلقائياً في دفتر النقدية بمجرد كتابتها.",
    "options": [
      "صواب",
      "خطأ"
    ],
    "correctAnswer": "خطأ",
    "distractors": [
      "صواب"
    ],
    "explanation": "مذكرة التسوية جدول تفسيري فقط، ولا تصحح الدفاتر بحد ذاتها؛ بل يلزم تسجيل قيود يومية وتحديث دفتر النقدية بالعمليات غير المثبتة.",
    "tags": [
      "الوحدة السادسة",
      "مذكرة تسوية البنك",
      "الرقابة"
    ]
  },
  {
    "id": "U6-Q21",
    "sourceQuestionId": "U6-Q21",
    "originalId": "U6-Q21",
    "unitId": "unit-6",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U6.4",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 187,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 187,
      "concept": "تحديث دفتر النقدية"
    },
    "concept": "تحديث دفتر النقدية",
    "question": "رصيد دفتر النقدية قبل التعديل 5,000 ج. أظهر كشف البنك: مصروفات بنكية 200 ج، وخصم مباشر لفاتورة كهرباء 800 ج. الرصيد المعدل لدفتر النقدية هو:",
    "options": [
      "أ) 4,000 جنيه",
      "ب) 6,000 جنيه",
      "جـ) 4,800 جنيه",
      "د) 5,200 جنيه"
    ],
    "correctAnswer": "أ) 4,000 جنيه",
    "distractors": [
      "ب) 6,000 جنيه",
      "جـ) 4,800 جنيه",
      "د) 5,200 جنيه"
    ],
    "explanation": "الرصيد المعدل = 5,000 − 200 (مصروفات بنكية) − 800 (خصم مباشر) = 4,000 جنيه.",
    "tags": [
      "الوحدة السادسة",
      "تحديث دفتر النقدية"
    ]
  },
  {
    "id": "U6-Q22",
    "sourceQuestionId": "U6-Q22",
    "originalId": "U6-Q22",
    "unitId": "unit-6",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U6.4",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 188,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 188,
      "concept": "معادلة مذكرة تسوية البنك"
    },
    "concept": "معادلة مذكرة تسوية البنك",
    "question": "إذا كان الرصيد المعدل لدفتر النقدية 4,000 ج، وإيداعات بالطريق 2,000 ج، وشيكات لم تقدم للصرف 1,500 ج، فإن الرصيد طبقاً لكشف البنك هو:",
    "options": [
      "أ) 3,500 جنيه",
      "ب) 4,500 جنيه",
      "جـ) 7,500 جنيه",
      "د) 500 جنيه"
    ],
    "correctAnswer": "أ) 3,500 جنيه",
    "distractors": [
      "ب) 4,500 جنيه",
      "جـ) 7,500 جنيه",
      "د) 500 جنيه"
    ],
    "explanation": "رصيد كشف البنك = الرصيد المعدل (4,000) − إيداعات بالطريق (2,000) + شيكات لم تقدم (1,500) = 3,500 جنيه.",
    "tags": [
      "الوحدة السادسة",
      "مذكرة تسوية البنك"
    ]
  },
  {
    "id": "U6-Q23",
    "sourceQuestionId": "U6-Q23",
    "originalId": "U6-Q23",
    "unitId": "unit-6",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U6.4",
    "skillCode": "S4",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 189,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 189,
      "concept": "الترتيب الإلزامي لخطوتي التسوية"
    },
    "concept": "الترتيب الإلزامي لخطوتي التسوية",
    "question": "لماذا يجب تحديث وتعديل دفتر النقدية أولاً قبل البدء بإعداد مذكرة تسوية البنك؟",
    "options": [
      "أ) لتسجيل العمليات التي علم بها البنك ونفذها أولاً ليصبح رصيد الدفتر ممثلاً للواقع قبل تفسير فروق التوقيت",
      "ب) لأن البنك يرفض استلام المذكرة إلا إذا كان الدفتر مختوماً",
      "جـ) لجعل رصيد الدفتر مساوياً لصفر",
      "د) لحذف حسابات الموردين من الأستاذ العام"
    ],
    "correctAnswer": "أ) لتسجيل العمليات التي علم بها البنك ونفذها أولاً ليصبح رصيد الدفتر ممثلاً للواقع قبل تفسير فروق التوقيت",
    "distractors": [
      "ب) لأن البنك يرفض استلام المذكرة إلا إذا كان الدفتر مختوماً",
      "جـ) لجعل رصيد الدفتر مساوياً لصفر",
      "د) لحذف حسابات الموردين من الأستاذ العام"
    ],
    "explanation": "التحديث يضمن اكتمال قيود المنشأة بالبنود التي خصمها البنك كالمصروفات وأوامر الدفع، ثم تأتي المذكرة لتفسير فروق التوقيت العالقة.",
    "tags": [
      "الوحدة السادسة",
      "خطوات التسوية"
    ]
  },
  {
    "id": "U6-Q24",
    "sourceQuestionId": "U6-Q24",
    "originalId": "U6-Q24",
    "unitId": "unit-6",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U6.4",
    "skillCode": "S4",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 190,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 190,
      "concept": "تدريب تسوية النقدية والبنك"
    },
    "concept": "تدريب تسوية النقدية والبنك",
    "question": "رصيد الدفتر قبل التعديل 10,000 ج، مصروفات بنكية 250 ج، خصم مباشر 750 ج، شيكات لم تقدم للصرف 2,000 ج، إيداعات بالطريق 1,200 ج. رصيد كشف البنك يساوي:",
    "options": [
      "أ) 9,800 جنيه",
      "ب) 9,000 جنيه",
      "جـ) 8,200 جنيه",
      "د) 10,800 جنيه"
    ],
    "correctAnswer": "أ) 9,800 جنيه",
    "distractors": [
      "ب) 9,000 جنيه",
      "جـ) 8,200 جنيه",
      "د) 10,800 جنيه"
    ],
    "explanation": "الرصيد المعدل = 10,000 − 250 − 750 = 9,000 ج. رصيد كشف البنك = 9,000 − 1,200 + 2,000 = 9,800 جنيه.",
    "tags": [
      "الوحدة السادسة",
      "تسوية البنك",
      "مسألة حسابية"
    ]
  },
  {
    "id": "U6-Q29",
    "sourceQuestionId": "U6-Q29",
    "originalId": "U6-Q29",
    "unitId": "unit-6",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U6.5",
    "skillCode": "S5",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 197,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 197,
      "concept": "حالة أشرف: صافي الربح الشامل"
    },
    "concept": "حالة أشرف: صافي الربح الشامل",
    "question": "في منشأة أشرف: رأس المال أول الفترة 60,000 ج، وآخر الفترة 78,000 ج، والمسحوبات 25,000 ج، ورأس المال الإضافي 16,000 ج. صافي ربح السنة هو:",
    "options": [
      "أ) 27,000 جنيه",
      "ب) 18,000 جنيه",
      "جـ) 35,000 جنيه",
      "د) 21,000 جنيه"
    ],
    "correctAnswer": "أ) 27,000 جنيه",
    "distractors": [
      "ب) 18,000 جنيه",
      "جـ) 35,000 جنيه",
      "د) 21,000 جنيه"
    ],
    "explanation": "صافي الربح = 78,000 − 60,000 + 25,000 − 16,000 = 18,000 + 9,000 = 27,000 جنيه.",
    "tags": [
      "الوحدة السادسة",
      "منشأة أشرف",
      "تطبيق متكامل"
    ]
  },
  {
    "id": "U6-Q30",
    "sourceQuestionId": "U6-Q30",
    "originalId": "U6-Q30",
    "unitId": "unit-6",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U6.5",
    "skillCode": "S5",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 198,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 198,
      "concept": "الأهمية الرقابية لتسوية البنك في التطبيق المتكامل"
    },
    "concept": "الأهمية الرقابية لتسوية البنك في التطبيق المتكامل",
    "question": "ما الأثر الرقابي المباشر لإجراء تسوية البنك ضمن التطبيق المتكامل للمنشأة الصغيرة؟",
    "options": [
      "أ) حماية السيولة واكتشاف فروق التوقيت والأخطاء البنكية والدفترية وتأكيد سلامة رصيد النقدية الظاهر بالأصول",
      "ب) ضمان مضاعفة الأرباح التشغيلية بنسبة 50%",
      "جـ) إلغاء جميع الديون المعدومة",
      "د) منع المالك من إجراء أي مسحوبات شخصية"
    ],
    "correctAnswer": "أ) حماية السيولة واكتشاف فروق التوقيت والأخطاء البنكية والدفترية وتأكيد سلامة رصيد النقدية الظاهر بالأصول",
    "distractors": [
      "ب) ضمان مضاعفة الأرباح التشغيلية بنسبة 50%",
      "جـ) إلغاء جميع الديون المعدومة",
      "د) منع المالك من إجراء أي مسحوبات شخصية"
    ],
    "explanation": "تسوية البنك هي أداة رقابية مستقلة للتحقق من سلامة الأصول النقدية وكشف أي تلاعب أو سهو قبل إدراج النقدية في المركز المالي.",
    "tags": [
      "الوحدة السادسة",
      "الرقابة الداخلية",
      "تسوية البنك"
    ]
  },
  {
    "id": "U6-Q31",
    "sourceQuestionId": "U6-Q31",
    "originalId": "U6-Q31",
    "unitId": "unit-6",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U6.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 202,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 202,
      "concept": "القضية المركزية لـ JRE الوحدة السادسة"
    },
    "concept": "القضية المركزية لـ JRE الوحدة السادسة",
    "question": "ما هو التساؤل الجوهري الذي يعالجه مقال التفسير والحكم المدعوم بالأدلة (JRE) في الوحدة السادسة؟",
    "options": [
      "أ) هل تعد المعلومات المحاسبية المعاد تكوينها مقاييس موثوقة للأداء والمركز المالي، أم تظل مجرد تقديرات مستنيرة؟",
      "ب) ما هي ألوان الدفاتر المستخدمة في المحاسبة الحكومية؟",
      "جـ) كيف نطبع كشوف الحسابات باللغة الإنجليزية؟",
      "د) هل يجوز إلغاء مصلحة الضرائب والبنوك التجارية؟"
    ],
    "correctAnswer": "أ) هل تعد المعلومات المحاسبية المعاد تكوينها مقاييس موثوقة للأداء والمركز المالي، أم تظل مجرد تقديرات مستنيرة؟",
    "distractors": [
      "ب) ما هي ألوان الدفاتر المستخدمة في المحاسبة الحكومية؟",
      "جـ) كيف نطبع كشوف الحسابات باللغة الإنجليزية؟",
      "د) هل يجوز إلغاء مصلحة الضرائب والبنوك التجارية؟"
    ],
    "explanation": "قضية JRE المحورية تختبر الوعي النقدي للمحاسب: هل الأرقام المستنتجة من سجلات ناقصة مقبولة وموثوقة أم أنها تقديرات تقريبية محكومة بحدود البيانات.",
    "tags": [
      "الوحدة السادسة",
      "JRE",
      "القضية المركزية"
    ]
  },
  {
    "id": "U6-Q32",
    "sourceQuestionId": "U6-Q32",
    "originalId": "U6-Q32",
    "unitId": "unit-6",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U6.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 203,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 203,
      "concept": "الحجة المؤيدة لموثوقية المعلومات المعاد تكوينها"
    },
    "concept": "الحجة المؤيدة لموثوقية المعلومات المعاد تكوينها",
    "question": "أي من الحجج التالية تدعم علمياً موثوقية الأرقام المالية المستخرجة بطرق إعادة التكوين؟",
    "options": [
      "أ) استنادها لأساليب رياضية منضبطة كمعادلة رأس المال، وأدوات رقابية إجمالية كحسابات المراقبة وتسوية البنك المستقلة",
      "ب) لأن المحاسب لا يخطئ أبداً",
      "جـ) لأن المنشأة الصغيرة لا تدفع ضرائب",
      "د) لأنها لا تتطلب أي مستندات أو فواتير"
    ],
    "correctAnswer": "أ) استنادها لأساليب رياضية منضبطة كمعادلة رأس المال، وأدوات رقابية إجمالية كحسابات المراقبة وتسوية البنك المستقلة",
    "distractors": [
      "ب) لأن المحاسب لا يخطئ أبداً",
      "جـ) لأن المنشأة الصغيرة لا تدفع ضرائب",
      "د) لأنها لا تتطلب أي مستندات أو فواتير"
    ],
    "explanation": "موثوقية المعلومات المعاد تكوينها تنبع من قوة المنهجية الرياضية والرقابية التي تتبعها، وعزل التدفقات الشخصية ومطابقة النقدية خارجياً مع البنك.",
    "tags": [
      "الوحدة السادسة",
      "JRE",
      "الحجة المؤيدة"
    ]
  },
  {
    "id": "U6-Q33",
    "sourceQuestionId": "U6-Q33",
    "originalId": "U6-Q33",
    "unitId": "unit-6",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U6.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 204,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 204,
      "concept": "الحجة الناقدة لحدود السجلات غير المكتملة"
    },
    "concept": "الحجة الناقدة لحدود السجلات غير المكتملة",
    "question": "ما هو القيد الجوهري الذي يستند إليه الرأي الناقد لموثوقية الحسابات المعاد تكوينها؟",
    "options": [
      "أ) غياب ميزان المراجعة الذاتي، والاعتماد على سجلات جزئية قد تتضمن أخطاء خفية وافتراضات شخصية تختلف باختلاف المحاسب",
      "ب) أن القيد المزدوج لا يستخدم في البنوك العالمية",
      "جـ) أن النقدية لا قيمة لها في القياس المحاسبي",
      "د) زيادة تكلفة الحاسب الآلي"
    ],
    "correctAnswer": "أ) غياب ميزان المراجعة الذاتي، والاعتماد على سجلات جزئية قد تتضمن أخطاء خفية وافتراضات شخصية تختلف باختلاف المحاسب",
    "distractors": [
      "ب) أن القيد المزدوج لا يستخدم في البنوك العالمية",
      "جـ) أن النقدية لا قيمة لها في القياس المحاسبي",
      "د) زيادة تكلفة الحاسب الآلي"
    ],
    "explanation": "الرأي الناقد يبرز أن نقص البيانات يجبر المحاسب على استخدام تقديرات شخصية لا ترقى إلى مستوى اليقين والمطابقة الدفترية الكاملة للقيد المزدوج.",
    "tags": [
      "الوحدة السادسة",
      "JRE",
      "الحجة المضادة"
    ]
  },
  {
    "id": "U6-Q34",
    "sourceQuestionId": "U6-Q34",
    "originalId": "U6-Q34",
    "unitId": "unit-6",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U6.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 205,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 205,
      "concept": "الحكم النهائي المتوازن في JRE"
    },
    "concept": "الحكم النهائي المتوازن في JRE",
    "question": "ما هو الحكم المحاسبي النهائي الأكثر نضجاً وتوازناً لمقال JRE الوحدة السادسة؟",
    "options": [
      "أ) المعلومات مفيدة وموثوقة بدرجة معقولة عملياً لاتخاذ القرار إذا طُبقت الأدوات الرقابية بدقة، ولكنها تظل تقديرات مستنيرة محكومة بنقص البيانات",
      "ب) المعلومات باطلة تماماً ومحرمة نظاماً ولا يجوز الاستناد إليها",
      "جـ) المعلومات دقيقة بنسبة 100% ومطابقة تماماً لأي نظام قيد مزدوج عالمي",
      "د) الأرباح المحسوبة لا تمثل إلا النقدية الموجودة في جيب المالك"
    ],
    "correctAnswer": "أ) المعلومات مفيدة وموثوقة بدرجة معقولة عملياً لاتخاذ القرار إذا طُبقت الأدوات الرقابية بدقة، ولكنها تظل تقديرات مستنيرة محكومة بنقص البيانات",
    "distractors": [
      "ب) المعلومات باطلة تماماً ومحرمة نظاماً ولا يجوز الاستناد إليها",
      "جـ) المعلومات دقيقة بنسبة 100% ومطابقة تماماً لأي نظام قيد مزدوج عالمي",
      "د) الأرباح المحسوبة لا تمثل إلا النقدية الموجودة في جيب المالك"
    ],
    "explanation": "الحكم المتوازن يعترف بفائدتها العملية للمنشآت الصغيرة وموثوقيتها النسبية المقبولة مع عدم إغفال قيودها التقديرية والتوصية بالتحول للقيد المزدوج.",
    "tags": [
      "الوحدة السادسة",
      "JRE",
      "الحكم المبرر"
    ]
  },
  {
    "id": "U6-Q35",
    "sourceQuestionId": "U6-Q35",
    "originalId": "U6-Q35",
    "unitId": "unit-6",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U6.6",
    "skillCode": "S6",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 206,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 206,
      "concept": "سلّم درجات مقال JRE"
    },
    "concept": "سلّم درجات مقال JRE",
    "question": "كم تبلغ الدرجة الإجمالية المخصصة لسلّم تقييم مقال الحكم والاستدلال (JRE) في الوحدة السادسة؟",
    "options": [
      "أ) 20 درجة موزعة بالتساوي على 5 معايير تقويمية (4 درجات لكل معيار)",
      "ب) 10 درجات مقسمة على سؤالين",
      "جـ) 100 درجة للمقال وحده",
      "د) 5 درجات فقط كبونص اختياري"
    ],
    "correctAnswer": "أ) 20 درجة موزعة بالتساوي على 5 معايير تقويمية (4 درجات لكل معيار)",
    "distractors": [
      "ب) 10 درجات مقسمة على سؤالين",
      "جـ) 100 درجة للمقال وحده",
      "د) 5 درجات فقط كبونص اختياري"
    ],
    "explanation": "سلّم التقدير المعتمد للوحدة السادسة يحدد 20 درجة كاملة موزعة على: الإطار الفكري (4)، التحليل (4)، الأدلة (4)، التنظيم والحجة المضادة (4)، والاستنتاج (4).",
    "tags": [
      "الوحدة السادسة",
      "سلّم التقدير",
      "JRE"
    ]
  },
  {
    "id": "U6-Q36",
    "sourceQuestionId": "U6-Q36",
    "originalId": "U6-Q36",
    "unitId": "unit-6",
    "lessonId": "lesson-6",
    "learningObjectiveId": "LO-U6.6",
    "skillCode": "S6",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "jre",
    "sourceType": "official_textbook",
    "sourcePage": 207,
    "sourceDocument": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السادسة_السجلات_غير_المكتملة_بكالوريا.pdf",
      "source_page": 207,
      "concept": "شروط توثيق الحسابات المعاد تكوينها"
    },
    "concept": "شروط توثيق الحسابات المعاد تكوينها",
    "question": "لكي تصبح المعلومات المالية المعاد تكوينها من سجلات ناقصة مقبولة لدى البنوك ومصلحة الضرائب، ما هي أهم الضوابط المستندية المطلوبة؟",
    "options": [
      "أ) تدعيم الأصول والخصوم بمستندات جرد وفواتير رسمية، وإرفاق مذكرة تسوية البنك مع كشف الحساب، وإعداد حسابات المراقبة للمطابقة",
      "ب) التعهد الشفهي من صاحب المنشأة دون أي مستند",
      "جـ) إلغاء جميع حسابات المدينين والموردين السابقة",
      "د) دفع رسوم إضافية للبنك لتجاوز التدقيق"
    ],
    "correctAnswer": "أ) تدعيم الأصول والخصوم بمستندات جرد وفواتير رسمية، وإرفاق مذكرة تسوية البنك مع كشف الحساب، وإعداد حسابات المراقبة للمطابقة",
    "distractors": [
      "ب) التعهد الشفهي من صاحب المنشأة دون أي مستند",
      "جـ) إلغاء جميع حسابات المدينين والموردين السابقة",
      "د) دفع رسوم إضافية للبنك لتجاوز التدقيق"
    ],
    "explanation": "التوثيق الرسمي يتطلب أدلة موضوعية تعزز ثقة الجهات الخارجية: محاضر جرد، تسوية بنك مستقلة، ومطابقة إجمالية بحسابات المراقبة.",
    "tags": [
      "الوحدة السادسة",
      "JRE",
      "التوثيق والاعتماد"
    ]
  }
];

/**
 * أسئلة الوحدة السابعة المعتمدة لكتاب الوزارة (20 سؤالاً رسمياً بعد استبعاد المستبدل)
 */
export const unit7OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "U7-Q01",
    "sourceQuestionId": "U7-Q01",
    "originalId": "U7-Q01",
    "unitId": "unit-7",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U7.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 21,
      "concept": "المفهوم المحاسبي للإهلاك"
    },
    "concept": "المفهوم المحاسبي للإهلاك",
    "question": "ما هو المفهوم المحاسبي الدقيق للإهلاك وفق معايير المحاسبة؟",
    "options": [
      "أ) التوزيع المنظم والعقلاني لتكلفة الأصل القابل للإهلاك على سنوات عمره الإنتاجي",
      "ب) الانخفاض الفعلي اللحظي في القيمة السوقية للأصل المعروض للبيع",
      "جـ) تجنيب مبالغ نقدية سائلة في حساب بنكي مستقل لشراء أصل بديل",
      "د) خسارة رأسمالية نقدية مباشرة تخصم من رصيد الخزينة"
    ],
    "correctAnswer": "أ) التوزيع المنظم والعقلاني لتكلفة الأصل القابل للإهلاك على سنوات عمره الإنتاجي",
    "distractors": [
      "ب) الانخفاض الفعلي اللحظي في القيمة السوقية للأصل المعروض للبيع",
      "جـ) تجنيب مبالغ نقدية سائلة في حساب بنكي مستقل لشراء أصل بديل",
      "د) خسارة رأسمالية نقدية مباشرة تخصم من رصيد الخزينة"
    ],
    "explanation": "الإهلاك هو توزيع محاسبي لتكلفة الأصل على فترات الاستفادة منه لتطبيق مبدأ المقابلة، ولا يعبر عن سعر السوق اللحظي ولا يرتبط بتدفق نقدي خارج (M07-01 و M07-02).",
    "tags": [
      "الوحدة السابعة",
      "الإهلاك",
      "مفهوم الإهلاك",
      "كتاب المدرسة ص 21"
    ]
  },
  {
    "id": "U7-Q02",
    "sourceQuestionId": "U7-Q02",
    "originalId": "U7-Q02",
    "unitId": "unit-7",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U7.1",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "true_false",
    "sourceType": "official_textbook",
    "sourcePage": 21,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 21,
      "concept": "طبيعة مصروف الإهلاك غير النقدية"
    },
    "concept": "طبيعة مصروف الإهلاك غير النقدية",
    "question": "صح أم خطأ: يمثل مصروف الإهلاك تدفقاً نقدياً خارجاً يؤدي إلى خفض رصيد النقدية بالبنك أو الخزينة فور إثباته في الدفاتر.",
    "options": [
      "أ) صح",
      "ب) خطأ"
    ],
    "correctAnswer": "ب) خطأ",
    "distractors": [
      "أ) صح"
    ],
    "explanation": "خطأ، لأن الإهلاك مصروف محاسبي دفتري غير نقدي (Non-cash expense) يخفض صافي الربح الدفتري دون أي خروج فعلي للأموال السائلة من المنشأة.",
    "tags": [
      "الوحدة السابعة",
      "الإهلاك",
      "مصروف غير نقدي",
      "كتاب المدرسة ص 21"
    ]
  },
  {
    "id": "U7-Q03",
    "sourceQuestionId": "U7-Q03",
    "originalId": "U7-Q03",
    "unitId": "unit-7",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U7.2",
    "skillCode": "S1",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 22,
      "concept": "المبلغ القابل للإهلاك"
    },
    "concept": "المبلغ القابل للإهلاك",
    "question": "اشترت منشأة آلة بتكلفة 25,000 ج.م وقدرت قيمتها التخريدية في نهاية عمرها الإنتاجي بمبلغ 5,000 ج.م. ما هو المبلغ القابل للإهلاك؟",
    "options": [
      "أ) 20,000 ج.م",
      "ب) 25,000 ج.م",
      "جـ) 30,000 ج.م",
      "د) 5,000 ج.م"
    ],
    "correctAnswer": "أ) 20,000 ج.م",
    "distractors": [
      "ب) 25,000 ج.م",
      "جـ) 30,000 ج.م",
      "د) 5,000 ج.م"
    ],
    "explanation": "المبلغ القابل للإهلاك = التكلفة الأصلية − القيمة التخريدية = 25,000 − 5,000 = 20,000 ج.م.",
    "tags": [
      "الوحدة السابعة",
      "القسط الثابت",
      "المبلغ القابل للإهلاك",
      "كتاب المدرسة ص 22"
    ]
  },
  {
    "id": "U7-Q05",
    "sourceQuestionId": "U7-Q05",
    "originalId": "U7-Q05",
    "unitId": "unit-7",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U7.3",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 23,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 23,
      "concept": "حساب قسط الإهلاك السنوي دون خردة"
    },
    "concept": "حساب قسط الإهلاك السنوي دون خردة",
    "question": "اشترت منشأة أثاثاً بمبلغ 20,000 ج.م وعمره الإنتاجي المقدر 4 سنوات دون أي قيمة تخريدية. كم يبلغ مصروف الإهلاك السنوي بطريقة القسط الثابت؟",
    "options": [
      "أ) 5,000 ج.م",
      "ب) 4,000 ج.م",
      "جـ) 10,000 ج.م",
      "د) 2,500 ج.م"
    ],
    "correctAnswer": "أ) 5,000 ج.م",
    "distractors": [
      "ب) 4,000 ج.م",
      "جـ) 10,000 ج.م",
      "د) 2,500 ج.م"
    ],
    "explanation": "الإهلاك السنوي = 20,000 ÷ 4 = 5,000 ج.م سنوياً.",
    "tags": [
      "الوحدة السابعة",
      "القسط الثابت",
      "حساب سنوي",
      "كتاب المدرسة ص 23"
    ]
  },
  {
    "id": "U7-Q07",
    "sourceQuestionId": "U7-Q07",
    "originalId": "U7-Q07",
    "unitId": "unit-7",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U7.4",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 24,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 24,
      "concept": "حساب معدل وإهلاك القسط المتناقص"
    },
    "concept": "حساب معدل وإهلاك القسط المتناقص",
    "question": "أصل تكلفته 50,000 ج.م وعمره الإنتاجي 5 سنوات. إذا طُبقت طريقة القسط المتناقص بمعدل (100% ÷ العمر الإنتاجي)، فكم يكون إهلاك السنة الثانية؟",
    "options": [
      "أ) 8,000 ج.م",
      "ب) 10,000 ج.م",
      "جـ) 6,400 ج.م",
      "د) 40,000 ج.م"
    ],
    "correctAnswer": "أ) 8,000 ج.م",
    "distractors": [
      "ب) 10,000 ج.م",
      "جـ) 6,400 ج.م",
      "د) 40,000 ج.م"
    ],
    "explanation": "معدل الإهلاك = 100% ÷ 5 = 20%. إهلاك السنة الأولى = 20% × 50,000 = 10,000 ج.م. القيمة الدفترية بداية السنة الثانية = 50,000 − 10,000 = 40,000 ج.م. إهلاك السنة الثانية = 20% × 40,000 = 8,000 ج.م.",
    "tags": [
      "الوحدة السابعة",
      "القسط المتناقص",
      "معدل الإهلاك",
      "كتاب المدرسة ص 24"
    ]
  },
  {
    "id": "U7-Q08",
    "sourceQuestionId": "U7-Q08",
    "originalId": "U7-Q08",
    "unitId": "unit-7",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U7.4",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 25,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 25,
      "concept": "مقارنة أثر الإهلاك على الربح"
    },
    "concept": "مقارنة أثر الإهلاك على الربح",
    "question": "كيف تؤثر طريقة القسط المتناقص على صافي أرباح المنشأة في السنوات الأولى لعمر الأصل مقارنة بطريقة القسط الثابت؟",
    "options": [
      "أ) ينتج عنها صافي ربح أقل في السنوات الأولى بسبب كبر مبلغ مصروف الإهلاك",
      "ب) ينتج عنها صافي ربح أكبر في السنوات الأولى لأن الإهلاك يتناقص",
      "جـ) لا تؤثر إطلاقاً على صافي الربح لأن الإهلاك مصروف غير نقدي",
      "د) تعطي نفس صافي الربح تماماً في كل سنة بالتطابق"
    ],
    "correctAnswer": "أ) ينتج عنها صافي ربح أقل في السنوات الأولى بسبب كبر مبلغ مصروف الإهلاك",
    "distractors": [
      "ب) ينتج عنها صافي ربح أكبر في السنوات الأولى لأن الإهلاك يتناقص",
      "جـ) لا تؤثر إطلاقاً على صافي الربح لأن الإهلاك مصروف غير نقدي",
      "د) تعطي نفس صافي الربح تماماً في كل سنة بالتطابق"
    ],
    "explanation": "في السنوات الأولى، يكون قسط الإهلاك بطريقة القسط المتناقص أعلى من القسط الثابت؛ وبما أن المصروف أعلى فإن صافي الربح يكون أقل.",
    "tags": [
      "الوحدة السابعة",
      "أثر الإهلاك على الربح",
      "تحليل القوائم",
      "كتاب المدرسة ص 25"
    ]
  },
  {
    "id": "U7-Q09",
    "sourceQuestionId": "U7-Q09",
    "originalId": "U7-Q09",
    "unitId": "unit-7",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U7.5",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 26,
      "concept": "تحديد نتيجة استبعاد الأصل"
    },
    "concept": "تحديد نتيجة استبعاد الأصل",
    "question": "متى تحقق المنشأة ربحاً محاسبياً عند بيع أو استبعاد أصل غير متداول؟",
    "options": [
      "أ) عندما يكون سعر البيع المحصل أكبر من القيمة الدفترية للأصل",
      "ب) عندما يكون سعر البيع أكبر من التكلفة التاريخية الأصلية للأصل",
      "جـ) عندما يتم تحصيل ثمن البيع نقداً بالكامل في الخزينة",
      "د) بمجرد بيع أي أصل بغض النظر عن قيمته الدفترية"
    ],
    "correctAnswer": "أ) عندما يكون سعر البيع المحصل أكبر من القيمة الدفترية للأصل",
    "distractors": [
      "ب) عندما يكون سعر البيع أكبر من التكلفة التاريخية الأصلية للأصل",
      "جـ) عندما يتم تحصيل ثمن البيع نقداً بالكامل في الخزينة",
      "د) بمجرد بيع أي أصل بغض النظر عن قيمته الدفترية"
    ],
    "explanation": "نتيجة الاستبعاد تتحدد بمقارنة سعر البيع بالقيمة الدفترية (التكلفة − مجمع الإهلاك)؛ فإذا زاد سعر البيع عن القيمة الدفترية تحقق ربح استبعاد (M07-04 و M07-05).",
    "tags": [
      "الوحدة السابعة",
      "استبعاد الأصول",
      "ربح الاستبعاد",
      "كتاب المدرسة ص 26"
    ]
  },
  {
    "id": "U7-Q12",
    "sourceQuestionId": "U7-Q12",
    "originalId": "U7-Q12",
    "unitId": "unit-7",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U7.6",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 27,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 27,
      "concept": "بنية حساب استبعاد الأصول"
    },
    "concept": "بنية حساب استبعاد الأصول",
    "question": "في حساب استبعاد الأصول بدفتر الأستاذ، أين يظهر مجمع إهلاك الأصل المستبعد لغرض إقفاله؟",
    "options": [
      "أ) في الجانب الدائن لحساب الاستبعاد بمبلغ مجمع الإهلاك",
      "ب) في الجانب المدين لحساب الاستبعاد بالتكلفة التاريخية",
      "جـ) يظل في حساب المجمع بالميزانية ولا يقفل",
      "د) في الجانب المدين لحساب النقدية"
    ],
    "correctAnswer": "أ) في الجانب الدائن لحساب الاستبعاد بمبلغ مجمع الإهلاك",
    "distractors": [
      "ب) في الجانب المدين لحساب الاستبعاد بالتكلفة التاريخية",
      "جـ) يظل في حساب المجمع بالميزانية ولا يقفل",
      "د) في الجانب المدين لحساب النقدية"
    ],
    "explanation": "يقفل مجمع الإهلاك (الذي هو دائن بطبيعته) بجعله مديناً، ويكون حساب الاستبعاد دائناً بمبلغ المجمع.",
    "tags": [
      "الوحدة السابعة",
      "حساب الاستبعاد",
      "إقفال مجمع الإهلاك",
      "كتاب المدرسة ص 27"
    ]
  },
  {
    "id": "U7-Q13",
    "sourceQuestionId": "U7-Q13",
    "originalId": "U7-Q13",
    "unitId": "unit-7",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U7.7",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 29,
      "concept": "المبدأ المحاسبي الحاكم للمخصصات"
    },
    "concept": "المبدأ المحاسبي الحاكم للمخصصات",
    "question": "ما هو المبدأ المحاسبي الأساسي الذي يوجب تكوين مخصص للديون المشكوك في تحصيلها؟",
    "options": [
      "أ) مبدأ الحيطة والحذر (التحفظ المحاسبي)",
      "ب) مبدأ التكلفة التاريخية المطلقة",
      "جـ) فرض الاستمرارية فقط دون غيره",
      "د) مبدأ تحقق الإيراد المؤكد"
    ],
    "correctAnswer": "أ) مبدأ الحيطة والحذر (التحفظ المحاسبي)",
    "distractors": [
      "ب) مبدأ التكلفة التاريخية المطلقة",
      "جـ) فرض الاستمرارية فقط دون غيره",
      "د) مبدأ تحقق الإيراد المؤكد"
    ],
    "explanation": "يوجب مبدأ الحيطة والحذر الاعتراف الفوري بالخسائر المتوقعة (كالديون المشكوك فيها) ومنع تضخيم الأصول والأرباح.",
    "tags": [
      "الوحدة السابعة",
      "المخصصات",
      "الحيطة والحذر",
      "كتاب المدرسة ص 29"
    ]
  },
  {
    "id": "U7-Q14",
    "sourceQuestionId": "U7-Q14",
    "originalId": "U7-Q14",
    "unitId": "unit-7",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U7.7",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 29,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 29,
      "concept": "الفرق بين المشكوك فيه والمعدوم"
    },
    "concept": "الفرق بين المشكوك فيه والمعدوم",
    "question": "ما هو الفرق الجوهري الدقيق بين الدين المشكوك في تحصيله والدين المعدوم؟",
    "options": [
      "أ) المشكوك فيه خسارة متوقعة محتملة تستوجب مخصصاً، بينما المعدوم خسارة مؤكدة تشطب من الدفاتر",
      "ب) المشكوك فيه يخص الموردين، بينما المعدوم يخص العملاء",
      "جـ) المشكوك فيه يسدد نقداً فوراً، بينما المعدوم يسدد بشيك آجل",
      "د) لا يوجد أي فرق بينهما فهما اسمان لنفس المعنى تماماً"
    ],
    "correctAnswer": "أ) المشكوك فيه خسارة متوقعة محتملة تستوجب مخصصاً، بينما المعدوم خسارة مؤكدة تشطب من الدفاتر",
    "distractors": [
      "ب) المشكوك فيه يخص الموردين، بينما المعدوم يخص العملاء",
      "جـ) المشكوك فيه يسدد نقداً فوراً، بينما المعدوم يسدد بشيك آجل",
      "د) لا يوجد أي فرق بينهما فهما اسمان لنفس المعنى تماماً"
    ],
    "explanation": "الدين المشكوك فيه احتمال عدم تحصيل فقط ويظل العميل في الدفاتر مع تكوين مخصص؛ أما المعدوم فتأكدت استحالة تحصيله فيشطب رصيده نهائياً (M07-08).",
    "tags": [
      "الوحدة السابعة",
      "ديون مشكوك فيها",
      "ديون معدومة",
      "كتاب المدرسة ص 29"
    ]
  },
  {
    "id": "U7-Q15",
    "sourceQuestionId": "U7-Q15",
    "originalId": "U7-Q15",
    "unitId": "unit-7",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U7.8",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 30,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 30,
      "concept": "حساب المخصص وصافي العملاء"
    },
    "concept": "حساب المخصص وصافي العملاء",
    "question": "بلغ رصيد حسابات العملاء 10,000 ج.م، وتقرر تكوين مخصص ديون مشكوك فيها بنسبة 5%. كم يبلغ صافي رصيد العملاء المعروض بالمركز المالي؟",
    "options": [
      "أ) 9,500 ج.م",
      "ب) 10,500 ج.م",
      "جـ) 500 ج.م",
      "د) 10,000 ج.م"
    ],
    "correctAnswer": "أ) 9,500 ج.م",
    "distractors": [
      "ب) 10,500 ج.م",
      "جـ) 500 ج.م",
      "د) 10,000 ج.م"
    ],
    "explanation": "المخصص الجديد = 5% × 10,000 = 500 ج.م. صافي رصيد العملاء بالميزانية = 10,000 − 500 = 9,500 ج.م.",
    "tags": [
      "الوحدة السابعة",
      "مخصص الديون",
      "صافي العملاء",
      "كتاب المدرسة ص 30"
    ]
  },
  {
    "id": "U7-Q16",
    "sourceQuestionId": "U7-Q16",
    "originalId": "U7-Q16",
    "unitId": "unit-7",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U7.8",
    "skillCode": "S3",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 31,
      "concept": "أثر زيادة المخصص على الربح"
    },
    "concept": "أثر زيادة المخصص على الربح",
    "question": "كان مخصص الديون المشكوك فيها القديم بالدفاتر 400 ج.م، والمخصص الجديد المطلوب تكوينه 600 ج.م. ما هو الأثر على قائمة الدخل وصافي الربح؟",
    "options": [
      "أ) يسجل مصروف قدره 200 ج.م مما يخفض صافي الربح بمقدار 200 ج.م",
      "ب) يسجل إيراد قدره 200 ج.م مما يرفع صافي الربح بمقدار 200 ج.م",
      "جـ) يسجل مصروف قدره 600 ج.م يخفض صافي الربح بالكامل",
      "د) لا يؤثر إطلاقاً على قائمة الدخل ويظهر فقط في الميزانية"
    ],
    "correctAnswer": "أ) يسجل مصروف قدره 200 ج.م مما يخفض صافي الربح بمقدار 200 ج.م",
    "distractors": [
      "ب) يسجل إيراد قدره 200 ج.م مما يرفع صافي الربح بمقدار 200 ج.م",
      "جـ) يسجل مصروف قدره 600 ج.م يخفض صافي الربح بالكامل",
      "د) لا يؤثر إطلاقاً على قائمة الدخل ويظهر فقط في الميزانية"
    ],
    "explanation": "التغير = 600 − 400 = 200 ج.م زيادة في المخصص. الزيادة تعالج كمصروف في قائمة الدخل وتخفض صافي الربح بمقدار الفرق (200 ج.م).",
    "tags": [
      "الوحدة السابعة",
      "زيادة المخصص",
      "قائمة الدخل",
      "كتاب المدرسة ص 31"
    ]
  },
  {
    "id": "U7-Q17",
    "sourceQuestionId": "U7-Q17",
    "originalId": "U7-Q17",
    "unitId": "unit-7",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U7.8",
    "skillCode": "S3",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 31,
      "concept": "أثر انخفاض المخصص على الربح"
    },
    "concept": "أثر انخفاض المخصص على الربح",
    "question": "كان مخصص الديون المشكوك فيها القديم بالدفاتر 600 ج.م، وتبيّن أن المخصص الجديد المطلوب هو 400 ج.م فقط. كيف يعالج هذا الفرق؟",
    "options": [
      "أ) يسجل كإيراد (مخصصات انتفى الغرض منها) قدره 200 ج.م مما يزيد صافي الربح بـ 200 ج.م",
      "ب) يسجل كمصروف خسارة قدره 200 ج.م يخفض صافي الربح",
      "جـ) تحذف الـ 200 ج.م دون أي قيد في قائمة الدخل",
      "د) تدفع الـ 200 ج.م نقداً للعملاء"
    ],
    "correctAnswer": "أ) يسجل كإيراد (مخصصات انتفى الغرض منها) قدره 200 ج.م مما يزيد صافي الربح بـ 200 ج.م",
    "distractors": [
      "ب) يسجل كمصروف خسارة قدره 200 ج.م يخفض صافي الربح",
      "جـ) تحذف الـ 200 ج.م دون أي قيد في قائمة الدخل",
      "د) تدفع الـ 200 ج.م نقداً للعملاء"
    ],
    "explanation": "التغير = 400 − 600 = −200 ج.م انخفاض. انخفاض المخصص يعالج كإيراد في قائمة الدخل مما يرفع صافي ربح الفترة بـ 200 ج.م (M07-09).",
    "tags": [
      "الوحدة السابعة",
      "انخفاض المخصص",
      "إيراد انتفاء غرض",
      "كتاب المدرسة ص 31"
    ]
  },
  {
    "id": "U7-Q18",
    "sourceQuestionId": "U7-Q18",
    "originalId": "U7-Q18",
    "unitId": "unit-7",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U7.9",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 33,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 33,
      "concept": "تسوية إهلاك معدات منشأة حسن"
    },
    "concept": "تسوية إهلاك معدات منشأة حسن",
    "question": "في حالة منشأة حسن التجارية، بلغت تكلفة المعدات 40,000 ج.م وتهلك بالقسط الثابت على 5 سنوات دون قيمة تخريدية. كم يبلغ مصروف إهلاكها السنوي؟",
    "options": [
      "أ) 8,000 ج.م",
      "ب) 5,000 ج.م",
      "جـ) 10,000 ج.م",
      "د) 4,000 ج.م"
    ],
    "correctAnswer": "أ) 8,000 ج.م",
    "distractors": [
      "ب) 5,000 ج.م",
      "جـ) 10,000 ج.م",
      "د) 4,000 ج.م"
    ],
    "explanation": "مصروف الإهلاك السنوي لمعدات منشأة حسن = 40,000 ÷ 5 = 8,000 ج.م سنوياً.",
    "tags": [
      "الوحدة السابعة",
      "منشأة حسن",
      "إهلاك المعدات",
      "كتاب المدرسة ص 33"
    ]
  },
  {
    "id": "U7-Q20",
    "sourceQuestionId": "U7-Q20",
    "originalId": "U7-Q20",
    "unitId": "unit-7",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U7.9",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 34,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 34,
      "concept": "مخصص عملاء منشأة حسن"
    },
    "concept": "مخصص عملاء منشأة حسن",
    "question": "بلغ رصيد العملاء في منشأة حسن 12,000 ج.م ونسبة المخصص المطلوب 5% وكان المخصص السابق 400 ج.م. ما هو الأثر على قائمة الدخل؟",
    "options": [
      "أ) مصروف قدره 200 ج.م يخفض الربح",
      "ب) مصروف قدره 600 ج.م يخفض الربح",
      "جـ) إيراد قدره 200 ج.م يرفع الربح",
      "د) لا يؤثر على قائمة الدخل"
    ],
    "correctAnswer": "أ) مصروف قدره 200 ج.م يخفض الربح",
    "distractors": [
      "ب) مصروف قدره 600 ج.م يخفض الربح",
      "جـ) إيراد قدره 200 ج.م يرفع الربح",
      "د) لا يؤثر على قائمة الدخل"
    ],
    "explanation": "المخصص الجديد = 5% × 12,000 = 600 ج.م. التغير = 600 − 400 = 200 ج.م زيادة تسجل كمصروف يخفض صافي الربح.",
    "tags": [
      "الوحدة السابعة",
      "منشأة حسن",
      "مخصص الديون",
      "كتاب المدرسة ص 34"
    ]
  },
  {
    "id": "U7-Q21",
    "sourceQuestionId": "U7-Q21",
    "originalId": "U7-Q21",
    "unitId": "unit-7",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U7.9",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "advanced",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 35,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 35,
      "concept": "صافي الأثر ومقارنة أثر التسويات في منشأة حسن"
    },
    "concept": "صافي الأثر ومقارنة أثر التسويات في منشأة حسن",
    "question": "في حالة منشأة حسن التجارية: ما هو العنصر صاحب الأثر الأكبر على الإطلاق على صافي الربح، وما هو صافي الأثر المالي للتسويات الثلاث مجتمعة؟",
    "options": [
      "أ) الأكبر أثراً هو مصروف الإهلاك (8,000 ج.م)، وصافي الأثر هو انخفاض الربح بمقدار 7,200 ج.م",
      "ب) الأكبر أثراً هو ربح الاستبعاد (1,000 ج.م)، وصافي الأثر هو زيادة الربح بمقدار 7,200 ج.م",
      "جـ) الأكبر أثراً هو المخصص (200 ج.م)، وصافي الأثر هو انخفاض الربح بمقدار 8,000 ج.م",
      "د) جميع التسويات متساوية الأثر تماماً بمبلغ 2,400 ج.م لكل منها"
    ],
    "correctAnswer": "أ) الأكبر أثراً هو مصروف الإهلاك (8,000 ج.م)، وصافي الأثر هو انخفاض الربح بمقدار 7,200 ج.م",
    "distractors": [
      "ب) الأكبر أثراً هو ربح الاستبعاد (1,000 ج.م)، وصافي الأثر هو زيادة الربح بمقدار 7,200 ج.م",
      "جـ) الأكبر أثراً هو المخصص (200 ج.م)، وصافي الأثر هو انخفاض الربح بمقدار 8,000 ج.م",
      "د) جميع التسويات متساوية الأثر تماماً بمبلغ 2,400 ج.م لكل منها"
    ],
    "explanation": "الإهلاك = مصروف 8,000 ج (الأكبر أثراً)، ربح الاستبعاد = إيراد 1,000 ج، زيادة المخصص = مصروف 200 ج. صافي الأثر = −8,000 + 1,000 − 200 = −7,200 ج.م (انخفاض في صافي الربح).",
    "tags": [
      "الوحدة السابعة",
      "منشأة حسن",
      "مقارنة الأثر",
      "كتاب المدرسة ص 35"
    ]
  },
  {
    "id": "U7-Q22",
    "sourceQuestionId": "U7-Q22",
    "originalId": "U7-Q22",
    "unitId": "unit-7",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U7.10",
    "skillCode": "S1",
    "bloomLevel": "understanding",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 36,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 36,
      "concept": "حجج إثبات ضرورة التسويات"
    },
    "concept": "حجج إثبات ضرورة التسويات",
    "question": "ما هي الحجة المحاسبية الرئيسية المؤيدة لضرورة إجراء تسويات الإهلاك والمخصصات رغم اعتمادها على التقدير؟",
    "options": [
      "أ) تمنع تضخيم الأرباح والأصول في السنوات الأولى وتطبق مبدأي المقابلة والحيطة والحذر",
      "ب) تضمن أن كل رقم في القوائم المالية مطابق 100% لفواتير ورقية دون أي اجتهاد",
      "جـ) تخفض دائماً التزامات المنشأة الضريبية إلى الصفر المطلق قانونياً",
      "د) تجعل القوائم المالية تتجاهل العوامل الاقتصادية المستقبلية تماماً"
    ],
    "correctAnswer": "أ) تمنع تضخيم الأرباح والأصول في السنوات الأولى وتطبق مبدأي المقابلة والحيطة والحذر",
    "distractors": [
      "ب) تضمن أن كل رقم في القوائم المالية مطابق 100% لفواتير ورقية دون أي اجتهاد",
      "جـ) تخفض دائماً التزامات المنشأة الضريبية إلى الصفر المطلق قانونياً",
      "د) تجعل القوائم المالية تتجاهل العوامل الاقتصادية المستقبلية تماماً"
    ],
    "explanation": "بدون الإهلاك تتضخم أرباح السنوات الأولى وتتحمل سنة الشراء وحدها، وبدون المخصص يظهر العملاء بقيمة وهمية تخالف الحيطة والحذر.",
    "tags": [
      "الوحدة السابعة",
      "JRE",
      "الحجة المؤيدة",
      "كتاب المدرسة ص 36"
    ]
  },
  {
    "id": "U7-Q23",
    "sourceQuestionId": "U7-Q23",
    "originalId": "U7-Q23",
    "unitId": "unit-7",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U7.10",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 37,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 37,
      "concept": "الحجة النقدية ومخاطر التقدير"
    },
    "concept": "الحجة النقدية ومخاطر التقدير",
    "question": "ما هو الخطر الرقابي الأبرز الذي يثيره المعارضون لاعتماد التسويات المحاسبية على التقديرات الشخصية؟",
    "options": [
      "أ) مخاطر إدارة الأرباح والتأثير عليها لتحقيق مصالح شخصية وصعوبة المقارنة بين الشركات",
      "ب) إلغاء دفاتر الأستاذ العام وموازين المراجعة نهائياً من المنشأة",
      "جـ) عدم إمكانية استخدام أجهزة الحاسب الآلي في تسجيل القيود المحاسبية",
      "د) زيادة النقدية الفعلية بالخزينة بشكل غير محسوب"
    ],
    "correctAnswer": "أ) مخاطر إدارة الأرباح والتأثير عليها لتحقيق مصالح شخصية وصعوبة المقارنة بين الشركات",
    "distractors": [
      "ب) إلغاء دفاتر الأستاذ العام وموازين المراجعة نهائياً من المنشأة",
      "جـ) عدم إمكانية استخدام أجهزة الحاسب الآلي في تسجيل القيود المحاسبية",
      "د) زيادة النقدية الفعلية بالخزينة بشكل غير محسوب"
    ],
    "explanation": "المرونة في تقدير الأعمار ونسب الديون المشكوك فيها قد تفتح باباً للتحيز وإدارة الأرباح (Earnings Management) وتصعب المقارنة بين الشركات.",
    "tags": [
      "الوحدة السابعة",
      "JRE",
      "الحجة المعارضة",
      "كتاب المدرسة ص 37"
    ]
  },
  {
    "id": "U7-Q24",
    "sourceQuestionId": "U7-Q24",
    "originalId": "U7-Q24",
    "unitId": "unit-7",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U7.10",
    "skillCode": "S4",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 37,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 37,
      "concept": "الحكم المتوازن وضوابط التسويات"
    },
    "concept": "الحكم المتوازن وضوابط التسويات",
    "question": "وفق نموذج كتاب المدرسة الرسمي لمقال JRE، ما هي الشروط الثلاثة التي تجعل التسويات المعتمدة على التقدير مقبولة وموثوقة لمتخذي القرارات؟",
    "options": [
      "أ) الإفصاح عن الطرق والافتراضات + الثبات في التطبيق + الاستناد لخبرة وتقدير عقلاني معقول",
      "ب) السداد النقدي الكامل + موافقة جميع العملاء + إلغاء الديون المعدومة",
      "جـ) تطبيق القسط الثابت فقط + منع بيع الأصول الثابتة + إلغاء المخصصات",
      "د) مضاعفة نسب الإهلاك سنوياً + تغيير السياسات كل سنة + سرية البيانات"
    ],
    "correctAnswer": "أ) الإفصاح عن الطرق والافتراضات + الثبات في التطبيق + الاستناد لخبرة وتقدير عقلاني معقول",
    "distractors": [
      "ب) السداد النقدي الكامل + موافقة جميع العملاء + إلغاء الديون المعدومة",
      "جـ) تطبيق القسط الثابت فقط + منع بيع الأصول الثابتة + إلغاء المخصصات",
      "د) مضاعفة نسب الإهلاك سنوياً + تغيير السياسات كل سنة + سرية البيانات"
    ],
    "explanation": "التسويات لا تلغي الموثوقية بل ترفع الملاءمة شريطة: 1. الإفصاح الشفاف في الإيضاحات، 2. الثبات المحاسبي لضمان المقارنة، 3. الاستناد لخبرات وسجلات تاريخية معقولة.",
    "tags": [
      "الوحدة السابعة",
      "JRE",
      "الحكم المتوازن",
      "شروط القبول",
      "كتاب المدرسة ص 37"
    ]
  },
  {
    "id": "U7-Q25",
    "sourceQuestionId": "U7-Q25",
    "originalId": "U7-Q25",
    "unitId": "unit-7",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U7.10",
    "skillCode": "S4",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 38,
    "sourceDocument": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_السابعة_الإهلاك_والمخصصات_واستبعاد_الأصول_بكالوريا.pdf",
      "source_page": 38,
      "concept": "سلّم تصحيح الـ 20 درجة لمقال JRE"
    },
    "concept": "سلّم تصحيح الـ 20 درجة لمقال JRE",
    "question": "كيف يتوزع سلّم التقييم الرسمي المعتمد لمقال JRE (الـ 20 درجة) في اختبارات البكالوريا؟",
    "options": [
      "أ) 4 درجات لفهم القضية + 6 درجات للأدلة (مؤيدة ومضادة) + 4 درجات للتحليل والمقارنة + 4 درجات للحكم المتوازن + درجتان للوضوح والتنظيم",
      "ب) 10 درجات للأرقام الحسابية + 10 درجات للخط والإملاء",
      "جـ) 20 درجة لترجيح رأي واحد فقط دون ذكر أي حجة معارضة",
      "د) 5 درجات لكل تعريف محاسبي مجرد من السرد والتحليل"
    ],
    "correctAnswer": "أ) 4 درجات لفهم القضية + 6 درجات للأدلة (مؤيدة ومضادة) + 4 درجات للتحليل والمقارنة + 4 درجات للحكم المتوازن + درجتان للوضوح والتنظيم",
    "distractors": [
      "ب) 10 درجات للأرقام الحسابية + 10 درجات للخط والإملاء",
      "جـ) 20 درجة لترجيح رأي واحد فقط دون ذكر أي حجة معارضة",
      "د) 5 درجات لكل تعريف محاسبي مجرد من السرد والتحليل"
    ],
    "explanation": "التوزيع الرسمي لسلم الـ 20 درجة: فهم القضية (4)، الأدلة (6)، التحليل والمقارنة (4)، الحكم والتبرير (4)، والوضوح والتنظيم (2).",
    "tags": [
      "الوحدة السابعة",
      "JRE",
      "سلّم الـ 20 درجة",
      "كتاب المدرسة ص 38"
    ]
  }
];

/**
 * أسئلة الوحدة الثامنة المعتمدة لكتاب الوزارة (13 سؤالاً رسمياً بعد استبعاد المستبدل)
 */
export const unit8OfficialQuestions: TraceableQuestion[] = [
  {
    "id": "U8-Q01",
    "sourceQuestionId": "U8-Q01",
    "originalId": "U8-Q01",
    "unitId": "unit-8",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U8.1",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 3,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 3,
      "concept": "المسؤولية التضامنية غير المحدودة"
    },
    "concept": "المسؤولية التضامنية غير المحدودة",
    "question": "ماذا تعني المسؤولية التضامنية وغير المحدودة للشريك في شركة التضامن؟",
    "options": [
      "أ) مسؤوليته تقتصر حصراً على ما دفعه في رأس مال الشركة دون زيادة",
      "ب) مسؤوليته شخصية وتضامنية وتمتد إلى كامل أمواله وممتلكاته الخاصة لسداد ديون الشركة",
      "جـ) إعفاؤه التام من أي التزامات عند إفلاس الشركة أو تصفيتها",
      "د) مسؤوليته تحددها نسبة مساهمة أصواته في الجمعية العمومية فقط"
    ],
    "correctAnswer": "ب) مسؤوليته شخصية وتضامنية وتمتد إلى كامل أمواله وممتلكاته الخاصة لسداد ديون الشركة",
    "distractors": [
      "أ) مسؤوليته تقتصر حصراً على ما دفعه في رأس مال الشركة دون زيادة",
      "جـ) إعفاؤه التام من أي التزامات عند إفلاس الشركة أو تصفيتها",
      "د) مسؤوليته تحددها نسبة مساهمة أصواته في الجمعية العمومية فقط"
    ],
    "explanation": "في شركة التضامن، يكون جميع الشركاء مسؤولين بالتضامن والانفراد عن ديون الشركة في أموالهم الخاصة في حال عجز أصول الشركة عن السداد.",
    "tags": [
      "الوحدة الثامنة",
      "شركة التضامن",
      "المسؤولية غير المحدودة",
      "كتاب المدرسة"
    ]
  },
  {
    "id": "U8-Q02",
    "sourceQuestionId": "U8-Q02",
    "originalId": "U8-Q02",
    "unitId": "unit-8",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U8.2",
    "skillCode": "S1",
    "bloomLevel": "comprehension",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 7,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 7,
      "concept": "قاعدة سكوت عقد الشراكة عن الخسائر"
    },
    "concept": "قاعدة سكوت عقد الشراكة عن الخسائر",
    "question": "إذا حدد عقد الشراكة نسبة توزيع الأرباح بين شريكين بـ 3 : 2 وسكت العقد تماماً عن نسبة توزيع الخسائر، فكيف توزع الخسائر؟",
    "options": [
      "أ) توزع بالتساوي بين الشريكين إجبارياً",
      "ب) توزع بنفس نسبة توزيع الأرباح (3 : 2)",
      "جـ) يتحملها الشريك المدير بمفرده كمسؤولية تشغيلية",
      "د) تعلق الخسائر في حساب معلق دون تحميلها للشركاء"
    ],
    "correctAnswer": "ب) توزع بنفس نسبة توزيع الأرباح (3 : 2)",
    "distractors": [
      "أ) توزع بالتساوي بين الشريكين إجبارياً",
      "جـ) يتحملها الشريك المدير بمفرده كمسؤولية تشغيلية",
      "د) تعلق الخسائر في حساب معلق دون تحميلها للشركاء"
    ],
    "explanation": "وفقاً لأحكام القانون والمحاسبة، إذا سكت العقد عن الخسائر فإنها توزع بذات النسبة المقررة لتوزيع الأرباح.",
    "tags": [
      "الوحدة الثامنة",
      "عقد الشراكة",
      "توزيع الخسائر"
    ]
  },
  {
    "id": "U8-Q03",
    "sourceQuestionId": "U8-Q03",
    "originalId": "U8-Q03",
    "unitId": "unit-8",
    "lessonId": "lesson-1",
    "learningObjectiveId": "LO-U8.3",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 12,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 12,
      "concept": "إعداد قيد توزيع صافي الربح"
    },
    "concept": "إعداد قيد توزيع صافي الربح",
    "question": "حققت شركة تضامن صافي ربح 90,000 ج.م، ونسبة توزيع الأرباح بين الشريكين س و ص هي 2 : 1. ما هو القيد المحاسبي لإثبات توزيع الأرباح؟",
    "options": [
      "أ) من حـ/ رأس المال 90,000 إلى حـ/ الصندوق",
      "ب) من حـ/ توزيع الأرباح والخسائر 90,000 إلى مذكورين: 60,000 حـ/ جاري الشريك س، 30,000 حـ/ جاري الشريك ص",
      "جـ) من مذكورين حـ/ جاري س وحـ/ جاري ص إلى حـ/ توزيع الأرباح والخسائر",
      "د) من حـ/ الأرباح والخسائر 90,000 إلى حـ/ البنك 90,000"
    ],
    "correctAnswer": "ب) من حـ/ توزيع الأرباح والخسائر 90,000 إلى مذكورين: 60,000 حـ/ جاري الشريك س، 30,000 حـ/ جاري الشريك ص",
    "distractors": [
      "أ) من حـ/ رأس المال 90,000 إلى حـ/ الصندوق",
      "جـ) من مذكورين حـ/ جاري س وحـ/ جاري ص إلى حـ/ توزيع الأرباح والخسائر",
      "د) من حـ/ الأرباح والخسائر 90,000 إلى حـ/ البنك 90,000"
    ],
    "explanation": "يقفل حساب توزيع الأرباح والخسائر بجعله مديناً وإيداع حصص الشركاء في الجانب الدائن من حساباتهم الجارية (س = 90,000 × 2/3 = 60,000 ج.م، ص = 90,000 × 1/3 = 30,000 ج.م).",
    "tags": [
      "الوحدة الثامنة",
      "قيد التوزيع",
      "حساب التوزيع"
    ]
  },
  {
    "id": "U8-Q04",
    "sourceQuestionId": "U8-Q04",
    "originalId": "U8-Q04",
    "unitId": "unit-8",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U8.4",
    "skillCode": "S1",
    "bloomLevel": "comprehension",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 18,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 18,
      "concept": "طبيعة فائدة رأس المال"
    },
    "concept": "طبيعة فائدة رأس المال",
    "question": "ما هي الطبيعة المحاسبية الدقيقة لفائدة رأس المال في شركات التضامن؟",
    "options": [
      "أ) مصروف تشغيلي يخصم في حساب الأرباح والخسائر (قائمة الدخل)",
      "ب) توزيع واقتسام لصافي الربح يظهر في الجانب المدين لحساب توزيع الأرباح والخسائر",
      "جـ) إيراد تشغيلي يظهر في الجانب الدائن لقائمة الدخل",
      "د) التزام متداول يظهر ضمن الخصوم قصيرة الأجل بالميزانية"
    ],
    "correctAnswer": "ب) توزيع واقتسام لصافي الربح يظهر في الجانب المدين لحساب توزيع الأرباح والخسائر",
    "distractors": [
      "أ) مصروف تشغيلي يخصم في حساب الأرباح والخسائر (قائمة الدخل)",
      "جـ) إيراد تشغيلي يظهر في الجانب الدائن لقائمة الدخل",
      "د) التزام متداول يظهر ضمن الخصوم قصيرة الأجل بالميزانية"
    ],
    "explanation": "فائدة رأس المال ليست مصروفاً للمنشأة بل تخصيص وتوزيع للأرباح المحققة لعلاج تفاوت حصص رؤوس الأموال بين الشركاء.",
    "tags": [
      "الوحدة الثامنة",
      "فائدة رأس المال",
      "حساب التوزيع"
    ]
  },
  {
    "id": "U8-Q05",
    "sourceQuestionId": "U8-Q05",
    "originalId": "U8-Q05",
    "unitId": "unit-8",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U8.6",
    "skillCode": "S3",
    "bloomLevel": "analysis",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 26,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 26,
      "concept": "المقارنة بين فائدة رأس المال وفائدة القرض"
    },
    "concept": "المقارنة بين فائدة رأس المال وفائدة القرض",
    "question": "كيف تختلف المعالجة المحاسبية لفائدة قرض الشريك عن فائدة رأس المال؟",
    "options": [
      "أ) فائدة القرض مصروف بقائمة الدخل يستحق حتى مع الخسارة، بينما فائدة رأس المال توزيع للربح بحساب التوزيع",
      "ب) كلاهما مصروف تشغيلي يخصم بقائمة الدخل",
      "جـ) كلاهما يظهر في الجانب الدائن لحساب التوزيع",
      "د) فائدة القرض لا تستحق إلا إذا حققت الشركة أرباحاً طائلة"
    ],
    "correctAnswer": "أ) فائدة القرض مصروف بقائمة الدخل يستحق حتى مع الخسارة، بينما فائدة رأس المال توزيع للربح بحساب التوزيع",
    "distractors": [
      "ب) كلاهما مصروف تشغيلي يخصم بقائمة الدخل",
      "جـ) كلاهما يظهر في الجانب الدائن لحساب التوزيع",
      "د) فائدة القرض لا تستحق إلا إذا حققت الشركة أرباحاً طائلة"
    ],
    "explanation": "قرض الشريك يعامل كدين من طرف خارجي وفائدته عبء على الإيرادات بقائمة الدخل، أما فائدة رأس المال فهي عائد ملكية يوزع بحساب التوزيع فقط.",
    "tags": [
      "الوحدة الثامنة",
      "فائدة القرض",
      "فائدة رأس المال"
    ]
  },
  {
    "id": "U8-Q06",
    "sourceQuestionId": "U8-Q06",
    "originalId": "U8-Q06",
    "unitId": "unit-8",
    "lessonId": "lesson-2",
    "learningObjectiveId": "LO-U8.5",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 22,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 22,
      "concept": "حساب الراتب المستحق للشريك المدير"
    },
    "concept": "حساب الراتب المستحق للشريك المدير",
    "question": "ينص العقد على راتب سنوي للشريك المدير قدره 36,000 ج.م. أظهرت السجلات أنه سحب نقداً خلال العام مبلغ 30,000 ج.م فقط. كيف تسجل هذه العملية في نهاية العام؟",
    "options": [
      "أ) يسجل الراتب المسحوب فقط 30,000 ج.م بحساب التوزيع ويهمل الباقي",
      "ب) يثبت الراتب السنوي كاملاً 36,000 ج.م بمدين حساب التوزيع، ويرحل المتبقي 6,000 ج.م إلى دائن جاري الشريك كراتب مستحق",
      "جـ) يعتبر المبلغ المتبقي 6,000 ج.م إيراداً للشركة في قائمة الدخل",
      "د) يطرح الراتب كاملاً من رصيد رأس مال الشريك"
    ],
    "correctAnswer": "ب) يثبت الراتب السنوي كاملاً 36,000 ج.م بمدين حساب التوزيع، ويرحل المتبقي 6,000 ج.م إلى دائن جاري الشريك كراتب مستحق",
    "distractors": [
      "أ) يسجل الراتب المسحوب فقط 30,000 ج.م بحساب التوزيع ويهمل الباقي",
      "جـ) يعتبر المبلغ المتبقي 6,000 ج.م إيراداً للشركة في قائمة الدخل",
      "د) يطرح الراتب كاملاً من رصيد رأس مال الشريك"
    ],
    "explanation": "استحقاق الشريك بموجب العقد هو 36,000 ج.م تظهر في مدين حساب التوزيع، والجزء غير المسحوب (6,000 ج.م) يضاف لحسابه الجاري الدائن كحق له على الشركة.",
    "tags": [
      "الوحدة الثامنة",
      "رواتب الشركاء",
      "الراتب المستحق"
    ]
  },
  {
    "id": "U8-Q07",
    "sourceQuestionId": "U8-Q07",
    "originalId": "U8-Q07",
    "unitId": "unit-8",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U8.7",
    "skillCode": "S1",
    "bloomLevel": "knowledge",
    "difficulty": "basic",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 31,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 31,
      "concept": "طريقة رأس المال الثابت"
    },
    "concept": "طريقة رأس المال الثابت",
    "question": "ما هي ميزة تطبيق طريقة رأس المال الثابت في شركات التضامن؟",
    "options": [
      "أ) إبقاء حصص رأس المال التعاقدية ثابتة وفصل المعاملات الدورية في الحسابات الجارية دون حاجة لتعديل العقد وتوثيقه سنوياً",
      "ب) إلغاء الحاجة لدفاتر اليومية والأستاذ العام",
      "جـ) إعفاء الشركاء من المسؤولية التضامنية غير المحدودة",
      "د) تحويل الشركة تلقائياً إلى شركة مساهمة مقيدة بالبورصة"
    ],
    "correctAnswer": "أ) إبقاء حصص رأس المال التعاقدية ثابتة وفصل المعاملات الدورية في الحسابات الجارية دون حاجة لتعديل العقد وتوثيقه سنوياً",
    "distractors": [
      "ب) إلغاء الحاجة لدفاتر اليومية والأستاذ العام",
      "جـ) إعفاء الشركاء من المسؤولية التضامنية غير المحدودة",
      "د) تحويل الشركة تلقائياً إلى شركة مساهمة مقيدة بالبورصة"
    ],
    "explanation": "طريقة رأس المال الثابت تفصل رأس المال المسجل قانونياً عن الحركات الدورية (أرباح، مسحوبات، فوائد) التي تسجل بالحسابات الجارية.",
    "tags": [
      "الوحدة الثامنة",
      "رأس المال الثابت",
      "الحساب الجاري"
    ]
  },
  {
    "id": "U8-Q08",
    "sourceQuestionId": "U8-Q08",
    "originalId": "U8-Q08",
    "unitId": "unit-8",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U8.8",
    "skillCode": "S2",
    "bloomLevel": "comprehension",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 36,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 36,
      "concept": "بنود الجانب المدين للحساب الجاري"
    },
    "concept": "بنود الجانب المدين للحساب الجاري",
    "question": "أي من العناصر التالية يثبت دائماً في الجانب المدين للحساب الجاري للشريك؟",
    "options": [
      "أ) فائدة رأس المال المستحقة",
      "ب) المسحوبات النقدية وفائدة المسحوبات وحصة الشريك في الخسائر",
      "جـ) راتب الإدارة المستحق للشريك",
      "د) حصة الشريك في صافي الأرباح السنوية"
    ],
    "correctAnswer": "ب) المسحوبات النقدية وفائدة المسحوبات وحصة الشريك في الخسائر",
    "distractors": [
      "أ) فائدة رأس المال المستحقة",
      "جـ) راتب الإدارة المستحق للشريك",
      "د) حصة الشريك في صافي الأرباح السنوية"
    ],
    "explanation": "الجانب المدين للحساب الجاري يمثل التزامات على الشريك تجاه الشركة أو تخفيضاً لحقوقه مثل المسحوبات وفوائدها والخسائر.",
    "tags": [
      "الوحدة الثامنة",
      "مدين الجاري",
      "المسحوبات"
    ]
  },
  {
    "id": "U8-Q09",
    "sourceQuestionId": "U8-Q09",
    "originalId": "U8-Q09",
    "unitId": "unit-8",
    "lessonId": "lesson-3",
    "learningObjectiveId": "LO-U8.9",
    "skillCode": "S3",
    "bloomLevel": "application",
    "difficulty": "intermediate",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 40,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 40,
      "concept": "عرض حقوق الشريك بالمركز المالي"
    },
    "concept": "عرض حقوق الشريك بالمركز المالي",
    "question": "شريك رأس ماله 200,000 ج.م، ورصيد حسابه الجاري الختامي مدين بمبلغ 25,000 ج.م. ما هو صافي حقوق هذا الشريك في قائمة المركز المالي؟",
    "options": [
      "أ) 225,000 ج.م",
      "ب) 175,000 ج.م",
      "جـ) 200,000 ج.م",
      "د) 25,000 ج.م"
    ],
    "correctAnswer": "ب) 175,000 ج.م",
    "distractors": [
      "أ) 225,000 ج.م",
      "جـ) 200,000 ج.م",
      "د) 25,000 ج.م"
    ],
    "explanation": "صافي حقوق الشريك = رأس المال الثابت − الرصيد الجاري المدين = 200,000 − 25,000 = 175,000 ج.م.",
    "tags": [
      "الوحدة الثامنة",
      "حقوق الملكية",
      "الميزانية العمومية"
    ]
  },
  {
    "id": "U8-Q10",
    "sourceQuestionId": "U8-Q10",
    "originalId": "U8-Q10",
    "unitId": "unit-8",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U8.10",
    "skillCode": "S2",
    "bloomLevel": "comprehension",
    "difficulty": "intermediate",
    "questionType": "mcq",
    "sourceType": "official_textbook",
    "sourcePage": 46,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 46,
      "concept": "توزيع أرباح إعادة التقدير"
    },
    "concept": "توزيع أرباح إعادة التقدير",
    "question": "عند انضمام شريك جديد، على من توزع أرباح حساب إعادة التقدير وبأي نسبة؟",
    "options": [
      "أ) على الشركاء القدامى فقط بنسبة توزيع الأرباح والخسائر القديمة السائدة قبل الانضمام",
      "ب) على جميع الشركاء بما فيهم الجديد بنسبة الأرباح الجديدة",
      "جـ) على الشريك الجديد حصراً لتعويضه عن مخاطر الدخول",
      "د) تقفل في الأرباح المحتجزة ولا توزع"
    ],
    "correctAnswer": "أ) على الشركاء القدامى فقط بنسبة توزيع الأرباح والخسائر القديمة السائدة قبل الانضمام",
    "distractors": [
      "ب) على جميع الشركاء بما فيهم الجديد بنسبة الأرباح الجديدة",
      "جـ) على الشريك الجديد حصراً لتعويضه عن مخاطر الدخول",
      "د) تقفل في الأرباح المحتجزة ولا توزع"
    ],
    "explanation": "أرباح إعادة التقدير تمثل نمواً في قيم الأصول تكونت بفضل مجهود الشركاء القدامى في الفترات السابقة، فتوزع عليهم فقط بنسبهم السابقة.",
    "tags": [
      "الوحدة الثامنة",
      "إعادة التقدير",
      "انضمام شريك"
    ]
  },
  {
    "id": "U8-Q11",
    "sourceQuestionId": "U8-Q11",
    "originalId": "U8-Q11",
    "unitId": "unit-8",
    "lessonId": "lesson-4",
    "learningObjectiveId": "LO-U8.11",
    "skillCode": "S2",
    "bloomLevel": "application",
    "difficulty": "advanced",
    "questionType": "applied",
    "sourceType": "official_textbook",
    "sourcePage": 52,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 52,
      "concept": "قيد إثبات الشهرة للشركاء القدامى"
    },
    "concept": "قيد إثبات الشهرة للشركاء القدامى",
    "question": "اتفق الشريكان أ و ب (نسبة الأرباح 1 : 1) على تقدير الشهرة بمبلغ 40,000 ج.م وإثباتها بالدفاتر قبل انضمام شريك ثالث. ما هو القيد؟",
    "options": [
      "أ) من حـ/ البنك 40,000 إلى حـ/ الشهرة 40,000",
      "ب) من حـ/ الشهرة 40,000 إلى مذكورين: 20,000 حـ/ رأس مال أ، 20,000 حـ/ رأس مال ب",
      "جـ) من مذكورين حـ/ رأس مال أ وحـ/ رأس مال ب إلى حـ/ الشهرة",
      "د) من حـ/ الشهرة 40,000 إلى حـ/ الأرباح والخسائر 40,000"
    ],
    "correctAnswer": "ب) من حـ/ الشهرة 40,000 إلى مذكورين: 20,000 حـ/ رأس مال أ، 20,000 حـ/ رأس مال ب",
    "distractors": [
      "أ) من حـ/ البنك 40,000 إلى حـ/ الشهرة 40,000",
      "جـ) من مذكورين حـ/ رأس مال أ وحـ/ رأس مال ب إلى حـ/ الشهرة",
      "د) من حـ/ الشهرة 40,000 إلى حـ/ الأرباح والخسائر 40,000"
    ],
    "explanation": "إثبات الشهرة ينشئ أصلاً غير ملموس في الجانب المدين (حـ/ الشهرة) ويزيد رؤوس أموال الشركاء القدامى في الجانب الدائن بنسبة أرباحهم السابقة.",
    "tags": [
      "الوحدة الثامنة",
      "الشهرة التجارية",
      "قيد الشهرة"
    ]
  },
  {
    "id": "U8-Q13",
    "sourceQuestionId": "U8-Q13",
    "originalId": "U8-Q13",
    "unitId": "unit-8",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U8.13",
    "skillCode": "S4",
    "bloomLevel": "synthesis",
    "difficulty": "challenge",
    "questionType": "case",
    "sourceType": "official_textbook",
    "sourcePage": 65,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 65,
      "concept": "حساب التوزيع الشامل والربح المتبقي"
    },
    "concept": "حساب التوزيع الشامل والربح المتبقي",
    "question": "شركة تضامن أرباحها بعد خصم فوائد القروض 100,000 ج.م. بلغت فوائد رأس المال للشركاء 30,000 ج.م، وراتب الشريك المدير 20,000 ج.م، وفوائد المسحوبات المحسوبة على الشركاء 2,000 ج.م. ما هو الرصيد المتبقي القابل للتوزيع بين الشركاء؟",
    "options": [
      "أ) 52,000 ج.م",
      "ب) 50,000 ج.م",
      "جـ) 48,000 ج.م",
      "د) 72,000 ج.م"
    ],
    "correctAnswer": "أ) 52,000 ج.م",
    "distractors": [
      "ب) 50,000 ج.م",
      "جـ) 48,000 ج.م",
      "د) 72,000 ج.م"
    ],
    "explanation": "إجمالي الأرباح المتاحة = 100,000 (صافي ربح) + 2,000 (فائدة مسحوبات) = 102,000 ج.م. الرصيد المتبقي = 102,000 − (30,000 + 20,000) = 52,000 ج.م.",
    "tags": [
      "الوحدة الثامنة",
      "تطبيق متكامل",
      "حساب التوزيع"
    ]
  },
  {
    "id": "U8-Q14",
    "sourceQuestionId": "U8-Q14",
    "originalId": "U8-Q14",
    "unitId": "unit-8",
    "lessonId": "lesson-5",
    "learningObjectiveId": "LO-U8.14",
    "skillCode": "S4",
    "bloomLevel": "evaluation",
    "difficulty": "challenge",
    "questionType": "jre",
    "sourceType": "official_textbook",
    "sourcePage": 72,
    "sourceDocument": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
    "sourceMapping": {
      "source_document": "الوحدة_الثامنة_محاسبة_شركات_الأشخاص_والتضامن_بكالوريا.pdf",
      "source_page": 72,
      "concept": "مقال JRE: عدالة التوزيع بين الشريك المالي والإداري"
    },
    "concept": "مقال JRE: عدالة التوزيع بين الشريك المالي والإداري",
    "question": "طلب الشريك الممول إلغاء راتب الشريك المدير واحتساب فائدة 15% على رأس المال بدعوى أن رأس المال هو المحرك الأساسي للأرباح. صغ مقال تفسير مدعوم بالأدلة (JRE) وفق الأركان الأربعة يحدد الموقف المحاسبي السليم.",
    "options": [
      "أ) قبول طلب الممول فوراً لأن رأس المال هو الأهم دائماً",
      "ب) صياغة مقال JRE متكامل: 1. الحكم برفض إلغاء الراتب ووضع سقف لفائدة رأس المال، 2. التفسير بمبدأ المقابلة وتوازن عناصر الإنتاج، 3. الدليل الرقمي باحتساب أثر الفائدة والراتب على السيولة، 4. تفنيد الرأي المعارض ببيان مخاطر انسحاب الشريك المدير وتصفية الشركة",
      "جـ) الاكتفاء برأي إنشائي دون استخدام أرقام أو تفنيد",
      "د) تحويل الشركة إلى منشأة فردية دون اتفاق"
    ],
    "correctAnswer": "ب) صياغة مقال JRE متكامل: 1. الحكم برفض إلغاء الراتب ووضع سقف لفائدة رأس المال، 2. التفسير بمبدأ المقابلة وتوازن عناصر الإنتاج، 3. الدليل الرقمي باحتساب أثر الفائدة والراتب على السيولة، 4. تفنيد الرأي المعارض ببيان مخاطر انسحاب الشريك المدير وتصفية الشركة",
    "distractors": [
      "أ) قبول طلب الممول فوراً لأن رأس المال هو الأهم دائماً",
      "جـ) الاكتفاء برأي إنشائي دون استخدام أرقام أو تفنيد",
      "د) تحويل الشركة إلى منشأة فردية دون اتفاق"
    ],
    "explanation": "مقال JRE يتطلب الالتزام الصارم بالأركان الأربعة: الحكم المالي الصريح، التفسير المحاسبي المدعوم بالمبادئ، الدليل الحسابي الرقمي، وتفنيد الرأي المعارض.",
    "tags": [
      "الوحدة الثامنة",
      "مقال JRE",
      "سلم الـ 20 درجة"
    ]
  }
];

/**
 * بنك كتاب الوزارة المعتمد الشامل (Official Textbook Bank)
 * يضم الـ 373 سؤالاً الجديد بالإضافة إلى الأسئلة الرسمية المعتمدة للوحدات 1-8.
 */
export const officialTextbookBank: TraceableQuestion[] = [
  ...bank373Questions,
  ...unit1OfficialQuestions,
  ...unit2OfficialQuestions,
  ...unit3OfficialQuestions,
  ...unit4OfficialQuestions,
  ...unit5OfficialQuestions,
  ...unit6OfficialQuestions,
  ...unit7OfficialQuestions,
  ...unit8OfficialQuestions
];

export const officialTextbookBankSummary = {
  totalQuestions: officialTextbookBank.length,
  bank373Count: bank373Questions.length,
  unit1Count: unit1OfficialQuestions.length,
  unit2Count: unit2OfficialQuestions.length,
  unit3Count: unit3OfficialQuestions.length,
  unit4Count: unit4OfficialQuestions.length,
  unit5Count: unit5OfficialQuestions.length,
  unit6Count: unit6OfficialQuestions.length,
  unit7Count: unit7OfficialQuestions.length,
  unit8Count: unit8OfficialQuestions.length,
  totalUnits: 10,
  sourceType: "official_textbook",
  traceabilityRate: "100% Verified against Egyptian Baccalaureate Official Textbooks"
};
