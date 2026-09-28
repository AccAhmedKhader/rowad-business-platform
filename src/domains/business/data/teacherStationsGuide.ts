import { TeacherPedagogicalStationGuide } from '../types';

/**
 * دليل المعلم ومساعد التعلم البيداغوجي للمحطات الـ 17
 * خاص بالمعلم فقط كمرجع توجيهي وإجابات نموذجية لتساؤلات محطات الدرس
 * النموذج التطبيقي الذهبي: الوحدة الأولى — الدرس الأول: فهم منظمة الأعمال من خلال القرارات (من الهواية إلى النشاط المنظم)
 */

export const UNIT1_LESSON1_TEACHER_STATIONS_GUIDE: TeacherPedagogicalStationGuide[] = [
  // ==========================================
  // 🧭 المرحلة الأولى: اليقظة الريادية والاستكشاف السياقي
  // ==========================================
  {
    stationNumber: 1,
    stationName: 'سؤال توجيهي واستثارة فكرية (The Core Inquiry)',
    inquiry: 'متى يتحول نشاط مريم من مجرد هواية إلى منظمة أعمال حقيقية؟ وما المؤشر الحاسم الذي يفصل بينهما؟',
    modelAnswer: 'يتحول النشاط من هواية إلى منظمة أعمال عندما يُمارس عن قصد واستمرارية لتقديم قيمة مضافة للآخرين، ويتضمن عملية تبادل للمنافع (مقابل مالي غالبًا)، ويتطلب اتخاذ قرارات متواصلة وتحمل مسؤوليات مستمرة ومخاطر تشغيلية، بغض النظر عن الحجم المادي أو مقدار الأرباح الأولية.',
    teacherGuidance: 'ابدأ الحصة بطرح السؤال كعصف ذهني واكتب إجابات الطلاب على السبورة في عمودين (هواية vs منظمة أعمال). وجّه تفكيرهم لتجاوز المظاهر الشكلية (مثل: امتلاك مقر فخم أو سجل تجاري أو أرباح ضخمة)، وركّز على السؤال الفلسفي: "لو كانت مريم تصنع الكعك وتوزعه مجانًا لأقاربها كل جمعة، هل تُعد منظمة أعمال؟ ولماذا؟" لترسيخ ركن التبادل والالتزام الخارجي.',
    pedagogicalObjective: 'استثارة الفضول الفكري وتدريب الطالب على التمييز المفاهيمي بين النشاط الشخصي العفوي والنشاط المؤسسي المنظم (بلوم: تذكر وفهم).',
    commonMistakesToAddress: 'خلط الطلاب الشائع بين "منظمة الأعمال" و"الشركة الكبرى"؛ وضّح أن المشروع المنزلي أو الفردي قد يكون منظمة أعمال مكتملة الأركان متى توافرت الاستمرارية والقيمة والتبادل.'
  },
  {
    stationNumber: 2,
    stationName: 'مقدمة وسيناريو دراسة الحالة (Case Scenario)',
    inquiry: 'ما المعضلة التشغيلية التي تواجه مريم عند تزايد الطلبات ومطالبة المقهى بمضاعفة التوريد؟ وكيف تؤثر على مستقبل نشاطها؟',
    modelAnswer: 'المعضلة تكمن في المفاضلة الصعبة بين جاذبية زيادة الإيرادات السريعة وبين حدود الطاقة التشغيلية المتاحة (توافر الوقت، المكونات، الحفاظ على ثبات الجودة، الالتزام بمواعيد التسليم، وتوازن وقت الدراسة مع متطلبات العمل). إذا قبلت مريم دون تخطيط ستخفق في الوفاء وتهتز سمعتها.',
    teacherGuidance: 'استخدم أسلوب المحاكاة الدرامية: كلّف أحد الطلاب بتمثيل دور مريم وطالبًا آخر بدور صاحب المقهى الضاغط. اسأل الصف: "ما العواقب المتتالية إذا وافقت مريم فورًا وعجزت عن التسليم في الصباح الباكر؟" اشرح لهم مفهوم (Overtrading Trap - فخ النمو المتسرع غير المحسوب).',
    pedagogicalObjective: 'تحليل المعضلات الإدارية الواقعية وتفكيك مشكلات إدارة الطاقة التشغيلية وسلاسل الإمداد الأولية (بلوم: تحليل).',
    commonMistakesToAddress: 'اندفاع الطلاب للاعتقاد بأن "كل زيادة في المبيعات هي نجاح تلقائي"، وتجاهل تكاليف التشغيل وضغوط الجودة والالتزام.'
  },

  // ==========================================
  // 🧠 المرحلة الثانية: البناء المفاهيمي والهندسة المعرفية
  // ==========================================
  {
    stationNumber: 3,
    stationName: 'تعلّم وتأصيل المتن المعرفي (Learn & Deepen Concepts)',
    inquiry: 'كيف نعرّف "منظمة الأعمال" تعريفًا علميًا رصينًا؟ وما أركانها الجوهرية الأربعة وفق المنهاج؟',
    modelAnswer: 'منظمة الأعمال هي: "نشاط منظم يقدم قيمة للآخرين ويتحمل مسؤوليات والتزامات مستمرة". أركانها الأربعة: (1) القصد لتقديم قيمة مضافة للغير تتجاوز المتعة الشخصية، (2) الاستمرارية والتكرار المخطط له، (3) التبادل والمقابل الاقتصادي، (4) المسؤولية والمخاطرة واتخاذ القرارات المستمرة.',
    teacherGuidance: 'اطلب من الطلاب فتح الدفاتر ورسم خريطة مفاهيمية رباعية الأضلاع تمثل الأركان الأربعة. اطلب منهم مقارنة كل ركن بالهواية (الغرض: شخصي vs خارجي / الاستمرارية: عرضية vs مخططة / التبادل: تبرعي vs اقتصادي / المسؤولية: معدومة vs مستمرة).',
    pedagogicalObjective: 'التأصيل المعجمي والمفاهيمي للمصطلحات الأساسية لمنهاج إدارة الأعمال وإرساء قواعد المعجم الاقتصادي للطالب (بلوم: فهم وتطبيق).',
    commonMistakesToAddress: 'حفظ التعريف دون إدراك مضامينه؛ اسأل دائمًا عن تطبيقات عملية لضمان الاستيعاب المعرفي العميق.'
  },
  {
    stationNumber: 4,
    stationName: 'الاستكشاف وتحليل الأنماط التنافسية (Competitive Patterns)',
    inquiry: 'كيف يتحول النشاط المنزلي والريادي الصغير إلى نمط تنافسي متميز في بيئة الأعمال المعاصرة؟',
    modelAnswer: 'يتحول عبر استراتيجية التمايز (Differentiation) من خلال تقديم قيمة فريدة يفضلها العميل على البدائل النمطية الكبرى (مثل: خلو المخبوزات من المواد الحافظة، طزاجة فورية، وتخصيص حسب الطلب)، وبناء علاقة ثقة مباشرة وشفافة مع المستهلك المحلي.',
    teacherGuidance: 'اطرح السؤال التنافسي: "لماذا قد يوافق عميل على دفع 20 جنيهًا لقطعة كعك من مريم بينما يبيعها المخبز الآلي بـ 12 جنيهًا؟" دع الطلاب يستنتجون مفهوم (القيمة المدركة - Perceived Value) والخدمة الشخصية المضافة التي تعوض فوارق وفورات الحجم لدى المنافسين الكبار.',
    pedagogicalObjective: 'استكشاف ديناميكيات السوق المحلي وفهم كيفية بناء الميزة التنافسية المستدامة للمشروعات الناشئة (بلوم: تحليل وتقييم).',
    commonMistakesToAddress: 'اعتقاد أن المنافسة تنحصر فقط في خفض الأسعار؛ وجّه الطلاب إلى محاور المنافسة الأخرى كالجودة، والتخصيص، والتجربة الحسية.'
  },
  {
    stationNumber: 5,
    stationName: 'مثال ونموذج استرشادي مبرر (Analyzed Strategic Model)',
    inquiry: 'حلل نموذج انتقال مريم: ما القرارات الإجرائية الملموسة التي اتخذتها وأثبتت خروجها نهائيًا من دائرة الهواية؟',
    modelAnswer: 'القرارات الخمسة هي: (1) الشراء المخطط للمكونات بكميات منتظمة وتحديد تكاليفها، (2) اعتماد تسعير محسوب يغطي النفقات، (3) الالتزام بجدول زمني ومواعيد تسليم محددة، (4) إدارة توقعات العملاء ومعالجة الملاحظات، (5) تخصيص وقت وموارد مستمرة للإنتاج.',
    teacherGuidance: 'قسّم الطلاب إلى مجموعات ثنائية واطلب منهم استخراج "الأفعال الإدارية" من سيناريو الحالة وتصنيفها تحت الوظائف الإدارية (تخطيط، تنظيم، تسعير، رقابة جودة). وضح لهم أن هذه الممارسات هي اللبنة الأولى لما سيتم دراسته في الوحدة الخامسة (الإدارة والقيادة).',
    pedagogicalObjective: 'تدريب الطالب على قراءة النماذج المحلولة واستنباط الشواهد العملية الدالة على المفاهيم النظرية (بلوم: تطبيق وتحليل).',
    commonMistakesToAddress: 'الاكتفاء بالوصف العام بدلاً من رصد القرارات الإجرائية الدقيقة؛ درّبهم على الاستشهاد بوقائع محددة من النص.'
  },
  {
    stationNumber: 6,
    stationName: 'الشرح والعمليات الحسابية والتشغيلية (Operational & Financial Logic)',
    inquiry: 'إذا بلغت تكلفة مكونات مريم 120 ج، والوقت والجهد المقدر 40 ج، وباعت 10 علب بسعر 20 ج للعلبة؛ فاحسب الإيراد الكلي، التكلفة الكلية، وصافي الربح. وهل يكفي هذا الربح وحده لضمان استقرار النشاط؟',
    modelAnswer: '1. الإيراد الكلي (TR) = 10 × 20 = 200 جنيه.\n2. التكلفة الكلية (TC) = 120 (مكونات) + 40 (وقت وجهد) = 160 جنيهًا.\n3. صافي الربح التشغيلي = 200 - 160 = 40 جنيهًا.\nالحكم: تحقيق الربح مؤشر إيجابي، لكنه غير كافٍ وحده لضمان الاستقرار؛ إذ يلزم التأكد من تدفق السيولة النقدية في مواعيدها، وثبات الطلب، والقدرة على مواجهة أي تلف أو زيادة في أسعار المكونات.',
    teacherGuidance: 'اكتب المعادلات على السبورة بوضوح (TR = P × Q / Profit = TR - TC). نبه الطلاب إلى نقطة خطيرة يغفلها أغلب رواد الأعمال المبتدئين: "إغفال احتساب قيمة وقت ومجهود صاحب العمل"، مما يظهر أرباحًا دفترية غير واقعية إذا لم تُحتسب تكلفة الفرصة البديلة للوقت.',
    pedagogicalObjective: 'تنمية الحس المالي والعددي لدى طلاب إدارة الأعمال والربط الصارم بين القرارات التشغيلية والنتائج المالية (بلوم: تطبيق وحساب).',
    commonMistakesToAddress: 'طرح التكاليف المباشرة فقط وتجاهل التكاليف غير المباشرة أو الجهد الشخصي؛ علّمهم الشمولية في حساب التكلفة.'
  },

  // ==========================================
  // 💼 المرحلة الثالثة: المحاكاة الاستراتيجية والممارسة التنفيذية
  // ==========================================
  {
    stationNumber: 7,
    stationName: 'فكّر كرائد أعمال (The Innovator\'s Vision)',
    inquiry: 'كيف يقتنص رائد الأعمال الفرصة السوقية الناشئة في بيئة مريم؟ وما القيمة المضافة غير المسبوقة التي يمكن تقديمها؟',
    modelAnswer: 'يقتنص رائد الأعمال الفرصة عبر رصد فجوة في السوق المحلي تتمثل في حاجة الموظفين والأسر لمخبوزات صحية مخصصة وسريعة التوصيل، ويصنع قيمة مضافة عبر تقديم اشتراكات أسبوعية مسبقة، وتغليف هدايا للمناسبات، وإمكانية تعديل الوصفات لمرضى السكري أو حساسية الغلوتين.',
    teacherGuidance: 'حرّك عقول الطلاب بسؤال ابتكاري: "لو كنت مستشارًا رياديًا لمريم، ما هي الخدمة أو الميزة غير التقليدية التي تقترح إضافتها لتجعل مشروعها فريدًا ولا يُقهر في الحي؟" اسمح بالأفكار الإبداعية ثم قيدها بمعيار الجدوى والقدرة على التنفيذ.',
    pedagogicalObjective: 'غرس عقلية ريادة الأعمال واكتشاف الفرص، وتنمية مهارات التفكير الابتكاري التوليدي (بلوم: ابتكار وتقييم).',
    commonMistakesToAddress: 'اقتراح أفكار خيالية مكلفة تفوق إمكانيات المشروع الناشئ؛ وجّههم نحو الابتكار البسيط عالي الأثر قليل التكلفة (Frugal Innovation).'
  },
  {
    stationNumber: 8,
    stationName: 'فكّر كمدير (The Executive Alignment)',
    inquiry: 'طُلب من مريم مضاعفة التوريد فورًا لمقهى جديد: ما القرار الإداري المتوازن والرشيد الذي يحفظ استقرار المنشأة؟',
    modelAnswer: 'القرار الإداري الرشيد هو: "القبول المشروط والمتدرج"؛ كأن توافق على زيادة التوريد بنسبة 25% إلى 30% كفترة اختبار لمدة أسبوعين، أو تطلب مهلة لتأمين مساعدة إضافية في التجهيز، مع رفض المضاعفة الفورية الكاملة إن كانت ستؤدي لانخفاض الجودة أو التأخير أو الإخلال بالدراسة.',
    teacherGuidance: 'قسّم الطلاب لفرق استشارية واطلب منهم صياغة "خطاب رد مهني" من مريم لصاحب المقهى يوضح قبول التعاون ولكن بشروط وجدول زمني مدروس. أكد للطلاب أن كلمة "لا" الذكية أو "نعم المشروطة" في الإدارة أهم أحيانًا من الموافقة العشوائية.',
    pedagogicalObjective: 'التدريب على حوكمة الموارد واتخاذ القرارات الإدارية تحت الضغط والموازنة بين الفرص والقدرات المتاحة (بلوم: تقييم واتخاذ قرار).',
    commonMistakesToAddress: 'الميل لإحدى الحافتين: إما الرفض القاطع وضياع الفرصة، أو القبول الأعمى والمخاطرة بالانهيار؛ درّبهم على "الحلول الإدارية المرنة والمرحلية".'
  },
  {
    stationNumber: 9,
    stationName: 'تطبيق حياتي واستدامة الأعمال (Life Application & CSR)',
    inquiry: 'كيف يمكن لمشروع مريم الصغير أن يتبنى ممارسات المسؤولية الاجتماعية للشركات (CSR) والاستدامة البيئية عمليًا؟',
    modelAnswer: 'عبر: (1) استخدام عبوات تغليف ورقية قابلة للتحلل وإعادة التدوير بدلاً من البلاستيك، (2) شراء المواد الخام من صغار المزارعين والتجار المحليين لدعم المجتمع، (3) التبرع بالفائض الصالح للاستهلاك للأسر المحتاجة، (4) ترشيد استهلاك الطاقة والمياه أثناء الإنتاج.',
    teacherGuidance: 'أدر نقاشًا حول أبعاد الاستدامة الثلاثة (البيئي، الاجتماعي، الاقتصادي). بيّن للطلاب أن ممارسات الاستدامة لم تعد ترفًا للشركات متعددة الجنسيات فقط، بل أصبحت ميزة تسويقية تزيد من تعاطف العملاء وولائهم للمشاريع المحلية الصغيرة.',
    pedagogicalObjective: 'ربط المعرفة الإدارية بقضايا المواطنة المؤسسية والاستدامة البيئية والتنمية المجتمعية المستدامة (بلوم: تطبيق وقيم تربوية).',
    commonMistakesToAddress: 'حصر المسؤولية الاجتماعية في مجرد التبرع بالمال؛ وضّح أن السلوك التشغيلي النزيه وحماية البيئة هو جوهر المسؤولية المستدامة.'
  },
  {
    stationNumber: 10,
    stationName: 'بنية المعرفة والهياكل الاستراتيجية (Strategic Frameworks)',
    inquiry: 'كيف نوظف "مصفوفة التحول" الرباعية كأداة تشخيصية سريعة لفحص أي نشاط في السوق؟',
    modelAnswer: 'تُطبق الأداة بطرح 4 أسئلة فاحصة:\n1. هل يقدم قيمة للآخرين؟ (فحص الغرض والخروج من الذاتية).\n2. هل يُمارس بانتظام؟ (فحص الاستمرارية والتخطيط).\n3. هل توجد عملية تبادل أو التزام؟ (فحص العلاقة الاقتصادية).\n4. هل يتطلب قرارات ومسؤولية؟ (فحص الجاهزية الإدارية والمخاطر).\nفإذا كانت الإجابات بنعم، اكتملت صفة منظمة الأعمال.',
    teacherGuidance: 'اعرض جدول مصفوفة التحول على الشاشة أو السبورة. اختر 3 حالات متباينة (مثل: طالب يبرمج تطبيقات في أوقات فراغه للمتعة، شاب يؤجر دراجات على الشاطئ بانتظام كل جمعة، سيدة تبيع تطريزًا يدويًا عبر إنستغرام وتستلم عربونًا ومواعيد). اطلب من الطلاب تمرير كل حالة على المصفوفة وتدوين الحكم.',
    pedagogicalObjective: 'تمكين الطالب من استخدام الهياكل والنماذج التحليلية كأدوات اتخاذ قرار موضوعية مبررة (بلوم: تحليل وتطبيق منهجي).',
    commonMistakesToAddress: 'التسرع في الحكم بناءً على إجابة سؤال واحد فقط؛ شدد على أن صفة منظمة الأعمال تتطلب استيفاء المعايير الأربعة مجتمعة.'
  },

  // ==========================================
  // 🧪 المرحلة الرابعة: ضبط النزاهة المعرفية وتصحيح المسار
  // ==========================================
  {
    stationNumber: 11,
    stationName: 'طبيعة المعرفة الاقتصادية وبحوث السوق (Market Research)',
    inquiry: 'كيف تجمع مريم أدلة موثوقة من السوق قبل اتخاذ قرارات التسعير أو التوسع بدلاً من الاعتماد على التخمين؟',
    modelAnswer: 'تجمع الأدلة عبر أدوات بحوث السوق الميدانية المبسطة: (1) استبيان رضا رقمي سريع مع كل طلبية يقيس الرضا عن الجودة والسعر، (2) المقارنة المرجعية الاستكشافية لأسعار المخبوزات المنافسة في المنطقة، (3) اختبار عينات تذوق صغيرة عند ابتكار صنف جديد لمعرفة رد فعل الجمهور قبل الإنتاج بكميات كبيرة.',
    teacherGuidance: 'فرّق للطلاب بوضوح بين "الحدس والتخمين الشخصي" و"القرار المبني على أدلة وبحوث السوق (Evidence-Based Decision)". وضّح لهم أن كبرى الشركات تفشل عندما تفترض معرفة ما يريده العميل دون سؤاله وجمع بيانات حقيقية.',
    pedagogicalObjective: 'ترسيخ المنهجية العلمية والنزاهة الإحصائية في جمع البيانات والتحقق من افتراضات رائد الأعمال قبل التنفيذ (بلوم: تطبيق ومنهجية بحث).',
    commonMistakesToAddress: 'الاعتماد على آراء الأهل والأصدقاء فقط في تقييم المنتج؛ نبههم إلى أن آراء الأقارب غالبًا ما تكون مجاملة وتضلل رائد الأعمال.'
  },
  {
    stationNumber: 12,
    stationName: 'التصورات الخطأ والفخاخ الإدارية (Exam Traps)',
    inquiry: 'ما التصويب العلمي للخطأ الشائع: "النشاط الصغير أو المنزلي ليس منظمة أعمال، والربح الكبير شرط لثبوت الصفة"؟',
    modelAnswer: 'الحجم المادي ورأس المال لا يحددان ماهية منظمة الأعمال؛ فالمنظمة تتحدد بالغرض والهيكل والاستمرارية والالتزامات والتبادل. وقد تكون منظمة الأعمال قائمة وتعمل بكفاءة في مراحلها التأسيسية وهي تحقق خسائر أو نقطة التعادل، فالربحية شرط بقاء طويل الأجل وليست شرطًا لثبوت صفة المنظمة قانونيًا وإداريًا.',
    teacherGuidance: 'ارسم إشارة تحذير ⚠️ واطلب من الطلاب تدوين هذا الفخ في دفتر الملاحظات كأحد "أفخاخ الامتحانات الوطنية المتكررة". اسألهم: "هل تصبح أوبر أو أمازون منظمة أعمال فقط بعد أن حققت أرباحًا، أم كانت منظمات أعمال منذ تأسيسها؟" (أمازون ظلت سنوات دون أرباح صريحة لكنها كانت أضخم منظمة أعمال).',
    pedagogicalObjective: 'معالجة المفاهيم المغلوطة الشائعة وتحصين الطلاب ضد فخاخ أسئلة الاختيار من متعدد والصواب والخطأ (بلوم: نقد وتحليل).',
    commonMistakesToAddress: 'ربط صفة منظمة الأعمال بتحقيق الربح الفوري أو بامتلاك مبنى ضخم؛ رسخ الأركان المفاهيمية الحقيقية.'
  },
  {
    stationNumber: 13,
    stationName: 'المعادلات والمفاهيم في لمحة (Formulas & Cheat Sheet)',
    inquiry: 'لخص القواعد الذهبية والعلاقات الرياضية الحاكمة لنشاط منظمات الأعمال في هذا الدرس في بطاقة سريعة.',
    modelAnswer: '1. معادلة الهيكل: منظمة أعمال = غرض خارجي + استمرارية + تبادل + قرارات ومسؤولية.\n2. الإيراد الكلي (TR) = السعر (P) × الكمية المباعة (Q).\n3. التكلفة الكلية (TC) = التكاليف الثابتة (FC) + التكاليف المتغيرة (VC).\n4. صافي الربح التشغيلي = إجمالي الإيراد - إجمالي التكلفة (TR - TC).\n5. معيار الاستمرار: التدفق النقدي اليومي الموجب كافٍ لسداد الالتزامات.',
    teacherGuidance: 'وجّه الطلاب لعمل "بطاقة فهرسة سريعة (Flashcard)" تتضمن هذه المعادلات الخمس. اطلب من طالبين اختبار بعضهما شفهيًا في دقيقة واحدة حول مسميات الرموز ودلالة كل متغير في بيئة الأعمال.',
    pedagogicalObjective: 'التثبيت المعرفي السريع للعلاقات والرموز المحورية وسهولة استدعائها تحت ضغط الاختبارات الفصيلة (بلوم: تذكر واستدعاء مركب).',
    commonMistakesToAddress: 'الخلط بين مفهوم "الإيراد" (Revenue) ومفهوم "الربح" (Profit)؛ أكد أن الإيراد هو حصيلة البيع قبل خصم أي تكاليف.'
  },

  // ==========================================
  // 🥇 المرحلة الخامسة: التمكين والاتقان وحوكمة الاستدلال
  // ==========================================
  {
    stationNumber: 14,
    stationName: 'حاول بنفسك وتحدي الدقيقة الواحدة (1 Minute Challenge)',
    inquiry: 'تمرين موجه: لو أطلقت صفحة لتقديم خدمات التصميم بانتظام وتتلقى أجرًا عن كل عمل، فهل أصبحت منظمة أعمال؟ برر بمصفوفة التحول.',
    modelAnswer: 'نعم، أصبحت منظمة أعمال مكتملة الأركان لأن النشاط: (1) يقدم قيمة حقيقية للعملاء، (2) يُمارس بانتظام واستمرارية معلنة، (3) يتضمن تبادلاً ماليًا متفقًا عليه، (4) يتطلب قرارات والتزامات ومسؤوليات نحو تسليم التصاميم بجودة ومواعيد محددة وتحمل مخاطر التعديل ورضا العميل.',
    teacherGuidance: 'اضبط المؤقت لمدة 60 ثانية بالضبط واطلب من كل طالب كتابة إجابته في جملتين محددتين. بعد انتهاء الوقت، اطلب من 3 طلاب قراءة إجاباتهم وقدّم تغذية راجعة فورية تركز على استخدام المصطلحات الإدارية الأربعة بدقة.',
    pedagogicalObjective: 'بناء الثقة الذاتية لدى الطالب وتدريبه على سرعة التعبير المكتوب الدقيق واستحضار الحجج في زمن قياسي (بلوم: تطبيق فوري).',
    commonMistakesToAddress: 'كتابة "نعم" مجردة دون تقديم التبرير المنهجي المقترن بمصفوفة التحول؛ درّبهم على اقتران الحكم بالدليل.'
  },
  {
    stationNumber: 15,
    stationName: 'تدريب وتقييمات متدرجة الصعوبة (النماذج أ، ب، ج)',
    inquiry: 'حلل نماذج التقييم الثلاثة المقررة للدرس:\n- نموذج أ (تذكر): عرّف منظمة الأعمال.\n- نموذج ب (تطبيق): صنف 4 أنشطة.\n- نموذج ج (تحليل): فسر لماذا لا يكفي الربح وحده للحكم.',
    modelAnswer: 'حل نموذج أ: نشاط منظم يقدم قيمة للآخرين بانتظام مع تحمل المسؤوليات والتبادل والقرارات.\nحل نموذج ب: بيع العمل الفني سنويًا والمساعدة المجانية = هوايات/أنشطة عارضة. تشغيل خدمة التوصيل اليومية والبيع المنتظم عبر الإنترنت = منظمات أعمال مكتملة الأركان.\nحل نموذج ج: لأن الربح قد يكون عارضًا أو مؤقتًا ناتجًا عن مضاربة أو ارتفاع طارئ في الأسعار، دون وجود هيكل تشغيلي منتظم أو تدفق نقدي كافٍ أو ولاء عملاء مستدام.',
    teacherGuidance: 'استخدم هذه النماذج في إدارة التمايز الصفي (Differentiated Instruction): وجّه النموذج (أ) للطلاب الذين يحتاجون تثبيت الأساسيات، والنموذج (ب) للتطبيق المباشر، والنموذج (ج) لتحفيز الطلاب المتفوقين في التفكير التحليلي والنقدي.',
    pedagogicalObjective: 'التدرج عبر مستويات هرم بلوم المعرفي وتحقيق مبدأ التقييم التكويني المستمر ومراعاة الفروق الفردية (بلوم: تذكر، تطبيق، تحليل).',
    commonMistakesToAddress: 'اكتفاء الطلاب بحل أسئلة التذكر والهروب من الأسئلة التحليلية المفتوحة؛ شجعهم على خوض تحدي النموذج (ج).'
  },
  {
    stationNumber: 16,
    stationName: 'تحدّ تفكيرك: مختبر الحكم والاستدلال (JRE 20-Point Lab)',
    inquiry: 'سؤال الاستدلال الوزاري الحاسم (سلم الـ 20 درجة):\n«هل ينبغي لكل صاحب هواية ناجحة أن يحولها فورًا إلى مشروع تجاري؟ أصدر حكمًا مدعومًا بالأدلة ومعايير الاستمرارية والمسؤولية والمفاضلة بين البدائل».',
    modelAnswer: 'نموذج الإجابة الاستدلالية المتكاملة وفق سلم الـ 20 درجة الوزاري:\n' +
      '1. [الحكم الصريح - 3 درجات]: لا ينبغي التحويل الفوري التلقائي لكل صاحب هواية؛ بل يجب أن يكون التحول قرارًا مشروطًا ومدروسًا بعناية.\n' +
      '2. [التبرير السببي - 4 درجات]: لأن ممارسة الهواية تنطلق من الشغف الذاتي والحرية دون ضغوط تعاقدية، بينما تحويلها لمنظمة أعمال يفرض التزامات قانونية وجداول تسليم ومخاطر تشغيلية ومالية قد تؤدي لفقدان متعة الهواية والإخفاق عند غياب المهارات الإدارية.\n' +
      '3. [الدليل السياقي والمفاهيمي - 5 درجات]: تثبت حالة مريم أن تزايد الطلبات حوّل النشاط إلى مسؤولية حقيقية تتطلب إدارة الوقت وحساب التكاليف ومواجهة طلبات التوريد، ومصفوفة التحول تؤكد أن المنظمة تتطلب استمرارية وتبادلاً وقرارات مستمرة وليس مجرد شغف فني.\n' +
      '4. [الرأي المقابل وتفنيده - 4 درجات]: قد يرى البعض أن تميز المنتج الفني كافٍ لنجاح أي مشروع؛ ويُفنّد ذلك بأن جودة المخبوزات وحدها لا تعوض العجز في إدارة التدفق النقدي أو الإخفاق في مواعيد التسليم أو إهمال متطلبات أصحاب المصلحة.\n' +
      '5. [الاستنتاج المشروط المتزن - 4 درجات]: يُستنتج أن التحول يكون صائبًا فقط إذا امتلك صاحب الهواية القدرة على الالتزام بالعمل المنتظم، وتوفرت لديه المهارات الإدارية أو الشريك المناسب، وضمن قدرته على إدارة التوقعات والمخاطر دون الإخلال بجودة حياته وأولوياته الأساسية.',
    teacherGuidance: 'هذه هي المحطة الذهبية التتويجية للدرس! اعرض سلم التقييم الخماسي للـ 20 درجة على الشاشة. درّب الطلاب على تقسيم إجابتهم المقالية إلى 5 فقرات واضحة تبدأ كل منها بالعنصر المخصص (الحكم، التبرير، الدليل، الرأي المقابل، الاستنتاج). وضّح لهم أن فقدان أي عنصر يكلفهم درجاته المحددة في الروبرك.',
    pedagogicalObjective: 'إتقان صياغة الاستجابة النقدية المكتوبة لسؤال تقييم الحالة بمستوى تفكير تركيبي استدلالي عالي وتطبيق روبرك الـ 20 درجة (بلوم: حكم واستدلال وتقييم نقدي).',
    commonMistakesToAddress: 'كتابة إجابة إنشائية عامة بدون حكم صريح أو إغفال مناقشة وتفنيد الرأي المقابل أو غياب الدليل المستمد من حالة الدرس.'
  },
  {
    stationNumber: 17,
    stationName: 'فكّر وتأمل والمراجعة المستدامة (Metacognitive Reflection)',
    inquiry: 'وقفة تأمل ختامية: ما الذي يتغير في علاقة الشخص بالنشاط عندما يتحول من هواية إلى عمل منظم؟ وكيف يمهد هذا الدرس لفهم الأشكال القانونية في الوحدة الثانية؟',
    modelAnswer: 'تتغير طبيعة العلاقة من "حرية الاختيار اللحظي والمتعة الذاتية غير الملزمة" إلى "مسؤولية تعاقدية واجتماعية ومساءلة أمام العملاء والشركاء والمجتمع". ويمهد هذا للوحدة الثانية لأن نشوء هذه الالتزامات والمسؤوليات يفرض اختيار الشكل القانوني الأنسب (منشأة فردية، شركة تضامن، شركة مساهمة) لتنظيم حدود المسؤولية وحماية الذمة المالية وتوزيع السيطرة.',
    teacherGuidance: 'اختم الحصة بنشاط (تذكرة الخروج - Exit Ticket): اطلب من كل طالب كتابة جملة واحدة في ورقة صغيرة تلخص "أهم فكرة إدارية غيرت نظرته للأعمال اليوم"، وكيف سيوظفها إذا فكر في تأسيس مشروعه المستقبلي. اجمع التذاكر واقرأ بعضها تشجيعًا لهم.',
    pedagogicalObjective: 'التفكير ما وراء المعرفي (Metacognition) والربط التراكمي المستدام بين مفاهيم المنهاج المتعاقبة واستشراف الوحدة التالية (بلوم: مراجعة تراكمية وتفكير تأملي).',
    commonMistakesToAddress: 'مغادرة الحصة دون تلخيص وتربيط خيوط التعلم؛ تأكد من وضوح الصورة الكلية للدرس في أذهان جميع الطلاب.'
  }
];

// إعادة تصدير أدلة المعلم البيداغوجية لبقية دروس الوحدة الأولى
export { UNIT1_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit1Lesson2';
export { UNIT1_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit1Lesson3';
export { UNIT1_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit1Lesson4';

import { UNIT1_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit1Lesson2';
import { UNIT1_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit1Lesson3';
import { UNIT1_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit1Lesson4';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة الثانية (أنواع منظمات الأعمال)
export { UNIT2_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson1';
export { UNIT2_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson2';
export { UNIT2_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson3';
export { UNIT2_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson4';
export { UNIT2_LESSON5_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson5';

import { UNIT2_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson1';
import { UNIT2_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson2';
import { UNIT2_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson3';
import { UNIT2_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson4';
import { UNIT2_LESSON5_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit2Lesson5';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة الثالثة (أهداف منظمات الأعمال وأصحاب المصلحة)
export { UNIT3_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson1';
export { UNIT3_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson2';
export { UNIT3_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson3';
export { UNIT3_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson4';
export { UNIT3_LESSON5_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson5';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة الرابعة (البيئة الداخلية والخارجية لمنظمات الأعمال)
export { UNIT4_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson1';
export { UNIT4_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson2';
export { UNIT4_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson3';
export { UNIT4_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson4';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة الخامسة (الإدارة والقيادة)
export { UNIT5_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson1';
export { UNIT5_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson2';
export { UNIT5_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson3';
export { UNIT5_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson4';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة السادسة (التسويق)
export { UNIT6_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson1';
export { UNIT6_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson2';
export { UNIT6_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson3';
export { UNIT6_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson4';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة السابعة (إدارة العمليات والإنتاج)
export { UNIT7_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson1';
export { UNIT7_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson2';
export { UNIT7_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson3';
export { UNIT7_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson4';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة الثامنة (إدارة الموارد البشرية)
export { UNIT8_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson1';
export { UNIT8_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson2';
export { UNIT8_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson3';
export { UNIT8_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson4';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة التاسعة (التمويل وأداء الأعمال)
export { UNIT9_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson1';
export { UNIT9_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson2';
export { UNIT9_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson3';
export { UNIT9_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson4';

// إعادة تصدير أدلة المعلم البيداغوجية لدروس الوحدة العاشرة (الاستراتيجية والتحليل واتخاذ القرار)
export { UNIT10_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson1';
export { UNIT10_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson2';
export { UNIT10_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson3';
export { UNIT10_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson4';

import { UNIT3_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson1';
import { UNIT3_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson2';
import { UNIT3_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson3';
import { UNIT3_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson4';
import { UNIT3_LESSON5_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit3Lesson5';

import { UNIT4_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson1';
import { UNIT4_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson2';
import { UNIT4_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson3';
import { UNIT4_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit4Lesson4';

import { UNIT5_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson1';
import { UNIT5_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson2';
import { UNIT5_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson3';
import { UNIT5_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit5Lesson4';

import { UNIT6_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson1';
import { UNIT6_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson2';
import { UNIT6_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson3';
import { UNIT6_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit6Lesson4';

import { UNIT7_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson1';
import { UNIT7_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson2';
import { UNIT7_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson3';
import { UNIT7_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit7Lesson4';

import { UNIT8_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson1';
import { UNIT8_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson2';
import { UNIT8_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson3';
import { UNIT8_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit8Lesson4';

import { UNIT9_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson1';
import { UNIT9_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson2';
import { UNIT9_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson3';
import { UNIT9_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit9Lesson4';

import { UNIT10_LESSON1_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson1';
import { UNIT10_LESSON2_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson2';
import { UNIT10_LESSON3_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson3';
import { UNIT10_LESSON4_TEACHER_STATIONS_GUIDE } from './teacherGuides/unit10Lesson4';

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة الأولى
 */
export const UNIT1_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u1-l1': UNIT1_LESSON1_TEACHER_STATIONS_GUIDE,
  'u1-l2': UNIT1_LESSON2_TEACHER_STATIONS_GUIDE,
  'u1-l3': UNIT1_LESSON3_TEACHER_STATIONS_GUIDE,
  'u1-l4': UNIT1_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة الثانية
 */
export const UNIT2_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u2-l1': UNIT2_LESSON1_TEACHER_STATIONS_GUIDE,
  'u2-l2': UNIT2_LESSON2_TEACHER_STATIONS_GUIDE,
  'u2-l3': UNIT2_LESSON3_TEACHER_STATIONS_GUIDE,
  'u2-l4': UNIT2_LESSON4_TEACHER_STATIONS_GUIDE,
  'u2-l5': UNIT2_LESSON5_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة الثالثة
 */
export const UNIT3_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u3-l1': UNIT3_LESSON1_TEACHER_STATIONS_GUIDE,
  'u3-l2': UNIT3_LESSON2_TEACHER_STATIONS_GUIDE,
  'u3-l3': UNIT3_LESSON3_TEACHER_STATIONS_GUIDE,
  'u3-l4': UNIT3_LESSON4_TEACHER_STATIONS_GUIDE,
  'u3-l5': UNIT3_LESSON5_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة الرابعة
 */
export const UNIT4_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u4-l1': UNIT4_LESSON1_TEACHER_STATIONS_GUIDE,
  'u4-l2': UNIT4_LESSON2_TEACHER_STATIONS_GUIDE,
  'u4-l3': UNIT4_LESSON3_TEACHER_STATIONS_GUIDE,
  'u4-l4': UNIT4_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة الخامسة
 */
export const UNIT5_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u5-l1': UNIT5_LESSON1_TEACHER_STATIONS_GUIDE,
  'u5-l2': UNIT5_LESSON2_TEACHER_STATIONS_GUIDE,
  'u5-l3': UNIT5_LESSON3_TEACHER_STATIONS_GUIDE,
  'u5-l4': UNIT5_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة السادسة
 */
export const UNIT6_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u6-l1': UNIT6_LESSON1_TEACHER_STATIONS_GUIDE,
  'u6-l2': UNIT6_LESSON2_TEACHER_STATIONS_GUIDE,
  'u6-l3': UNIT6_LESSON3_TEACHER_STATIONS_GUIDE,
  'u6-l4': UNIT6_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة السابعة
 */
export const UNIT7_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u7-l1': UNIT7_LESSON1_TEACHER_STATIONS_GUIDE,
  'u7-l2': UNIT7_LESSON2_TEACHER_STATIONS_GUIDE,
  'u7-l3': UNIT7_LESSON3_TEACHER_STATIONS_GUIDE,
  'u7-l4': UNIT7_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة الثامنة
 */
export const UNIT8_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u8-l1': UNIT8_LESSON1_TEACHER_STATIONS_GUIDE,
  'u8-l2': UNIT8_LESSON2_TEACHER_STATIONS_GUIDE,
  'u8-l3': UNIT8_LESSON3_TEACHER_STATIONS_GUIDE,
  'u8-l4': UNIT8_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة التاسعة
 */
export const UNIT9_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u9-l1': UNIT9_LESSON1_TEACHER_STATIONS_GUIDE,
  'u9-l2': UNIT9_LESSON2_TEACHER_STATIONS_GUIDE,
  'u9-l3': UNIT9_LESSON3_TEACHER_STATIONS_GUIDE,
  'u9-l4': UNIT9_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * خريطة أدلة المعلم للمحطات الـ 17 لدروس الوحدة العاشرة
 */
export const UNIT10_ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  'u10-l1': UNIT10_LESSON1_TEACHER_STATIONS_GUIDE,
  'u10-l2': UNIT10_LESSON2_TEACHER_STATIONS_GUIDE,
  'u10-l3': UNIT10_LESSON3_TEACHER_STATIONS_GUIDE,
  'u10-l4': UNIT10_LESSON4_TEACHER_STATIONS_GUIDE,
};

/**
 * الخريطة الشاملة لجميع أدلة المعلم لجميع الدروس
 */
export const ALL_TEACHER_STATIONS_GUIDES: Record<string, TeacherPedagogicalStationGuide[]> = {
  ...UNIT1_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT2_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT3_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT4_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT5_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT6_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT7_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT8_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT9_ALL_TEACHER_STATIONS_GUIDES,
  ...UNIT10_ALL_TEACHER_STATIONS_GUIDES,
};

/**
 * دالة مساعدة لجلب دليل المعلم للمحطات الـ 17 حسب الدرس
 */
export function getTeacherStationsGuideForLesson(lessonId: string, lessonNumber?: number, unitNumber?: number): TeacherPedagogicalStationGuide[] | undefined {
  if (ALL_TEACHER_STATIONS_GUIDES[lessonId]) {
    return ALL_TEACHER_STATIONS_GUIDES[lessonId];
  }

  // فحص ببادئة المعرّف للوحدة العاشرة
  if (lessonId.startsWith('u10-') || unitNumber === 10) {
    if (lessonNumber === 1 || lessonId === 'u10-l1') return UNIT10_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u10-l2') return UNIT10_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u10-l3') return UNIT10_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u10-l4') return UNIT10_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة التاسعة
  if (lessonId.startsWith('u9-') || unitNumber === 9) {
    if (lessonNumber === 1 || lessonId === 'u9-l1') return UNIT9_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u9-l2') return UNIT9_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u9-l3') return UNIT9_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u9-l4') return UNIT9_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة الثامنة
  if (lessonId.startsWith('u8-') || unitNumber === 8) {
    if (lessonNumber === 1 || lessonId === 'u8-l1') return UNIT8_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u8-l2') return UNIT8_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u8-l3') return UNIT8_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u8-l4') return UNIT8_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة السابعة
  if (lessonId.startsWith('u7-') || unitNumber === 7) {
    if (lessonNumber === 1 || lessonId === 'u7-l1') return UNIT7_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u7-l2') return UNIT7_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u7-l3') return UNIT7_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u7-l4') return UNIT7_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة السادسة
  if (lessonId.startsWith('u6-') || unitNumber === 6) {
    if (lessonNumber === 1 || lessonId === 'u6-l1') return UNIT6_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u6-l2') return UNIT6_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u6-l3') return UNIT6_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u6-l4') return UNIT6_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة الخامسة
  if (lessonId.startsWith('u5-') || unitNumber === 5) {
    if (lessonNumber === 1 || lessonId === 'u5-l1') return UNIT5_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u5-l2') return UNIT5_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u5-l3') return UNIT5_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u5-l4') return UNIT5_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة الرابعة
  if (lessonId.startsWith('u4-') || unitNumber === 4) {
    if (lessonNumber === 1 || lessonId === 'u4-l1') return UNIT4_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u4-l2') return UNIT4_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u4-l3') return UNIT4_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u4-l4') return UNIT4_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة الثالثة
  if (lessonId.startsWith('u3-') || unitNumber === 3) {
    if (lessonNumber === 1 || lessonId === 'u3-l1') return UNIT3_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u3-l2') return UNIT3_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u3-l3') return UNIT3_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u3-l4') return UNIT3_LESSON4_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 5 || lessonId === 'u3-l5') return UNIT3_LESSON5_TEACHER_STATIONS_GUIDE;
  }
  
  // فحص ببادئة المعرّف للوحدة الثانية
  if (lessonId.startsWith('u2-') || unitNumber === 2) {
    if (lessonNumber === 1 || lessonId === 'u2-l1') return UNIT2_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u2-l2') return UNIT2_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u2-l3') return UNIT2_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u2-l4') return UNIT2_LESSON4_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 5 || lessonId === 'u2-l5') return UNIT2_LESSON5_TEACHER_STATIONS_GUIDE;
  }

  // فحص ببادئة المعرّف للوحدة الأولى
  if (lessonId.startsWith('u1-') || unitNumber === 1) {
    if (lessonNumber === 1 || lessonId === 'u1-l1') return UNIT1_LESSON1_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 2 || lessonId === 'u1-l2') return UNIT1_LESSON2_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 3 || lessonId === 'u1-l3') return UNIT1_LESSON3_TEACHER_STATIONS_GUIDE;
    if (lessonNumber === 4 || lessonId === 'u1-l4') return UNIT1_LESSON4_TEACHER_STATIONS_GUIDE;
  }

  return undefined;
}

/**
 * دالة مساعدة لجلب دليل المعلم للمحطة المحددة
 */
export function getTeacherGuideForStation(stationNumber: number, lessonId: string = 'u1-l1'): TeacherPedagogicalStationGuide | undefined {
  const guideList = getTeacherStationsGuideForLesson(lessonId) || UNIT1_LESSON1_TEACHER_STATIONS_GUIDE;
  return guideList.find(s => s.stationNumber === stationNumber);
}

