import React from 'react';
import { 
  BookOpen, Layers, CheckCircle2, Award, Bookmark, 
  ChevronLeft, FileText, Scale, TrendingUp, ShieldCheck 
} from 'lucide-react';
import { getLessonsForUnit } from '../../data/lessonsData';

interface BookTableOfContentsProps {
  onSelectUnit?: (unitId: string) => void;
  selectedUnitId?: string;
}

export interface UnitTocItem {
  id: string;
  num: number;
  arabicNum: string;
  title: string;
  subtitle: string;
  pageRange: string;
  examWeight: string;
  color: string;
  caseStudy: string;
  lessons: {
    number: number;
    title: string;
    page: number;
    subtopics: string[];
    isJre?: boolean;
  }[];
}

export const unitsTableOfContents: UnitTocItem[] = [
  {
    id: 'unit-1',
    num: 1,
    arabicNum: 'الوحدة الأولى',
    title: 'المبادئ والمفاهيم المحاسبية والبيئة الاقتصادية',
    subtitle: 'الفروض والمبادئ • معادلة الميزانية • أثر المعاملات • طبيعة الحسابات',
    pageRange: 'ص 1 - 40',
    examWeight: '10%',
    color: '#1A365D',
    caseStudy: 'دراسة حالة مخبز مريم بالإسكندرية',
    lessons: [
      { number: 1, title: 'المفاهيم المحاسبية الأساسية ودورها الاقتصادي', page: 3, subtopics: ['مفهوم المحاسبة ووظائفها', 'مستخدمو القوائم المالية', 'الفروض المحاسبية الأربعة'] },
      { number: 2, title: 'المبادئ المحاسبية المعيارية في إعداد التقارير', page: 9, subtopics: ['التكلفة التاريخية', 'التحقق والاستحقاق', 'الحيطة والحذر والإفصاح'] },
      { number: 3, title: 'معادلة الميزانية وأثر المعاملات المالية', page: 15, subtopics: ['هيكل معادلة الميزانية', 'أثر المعاملات على الأصول والخصوم', 'توازن المركز المالي'] },
      { number: 4, title: 'طبيعة الحسابات وقواعد المديونية والدائنية', page: 21, subtopics: ['قاعدة الزيادة والنقصان', 'الحسابات ذات الطبيعة المدينة', 'الحسابات ذات الطبيعة الدائنة'] },
      { number: 5, title: 'التقارير المالية الأساسية للمنشأة الفردية', page: 27, subtopics: ['قائمة الدخل المبسطة', 'قائمة المركز المالي', 'العلاقة بين الربح وحقوق الملكية'] },
      { number: 6, title: 'مقال الاستدلال JRE ودراسة حالة مخبز مريم', page: 33, subtopics: ['تطبيق الدورة كاملة', 'تفنيد الأخطاء المفاهيمية', 'سلم تصحيح مقال JRE (20 درجة)'], isJre: true }
    ]
  },
  {
    id: 'unit-2',
    num: 2,
    arabicNum: 'الوحدة الثانية',
    title: 'التسجيل المحاسبي ونظرية القيد المزدوج ودورة اليومية والأستاذ',
    subtitle: 'المستندات الثبوتية • قيود اليومية • دفتر الأستاذ T • ميزان المراجعة الأولي',
    pageRange: 'ص 41 - 80',
    examWeight: '10%',
    color: '#2B4C7E',
    caseStudy: 'دراسة حالة منشأة النيل للتوريدات وتطبيق الدورة المستندية',
    lessons: [
      { number: 1, title: 'المستندات الثبوتية والدورة المحاسبية الأولية', page: 43, subtopics: ['الفاتورة والإيصال والشيك', 'إذن الاستلام والصرف', 'الرقابة المستندية'] },
      { number: 2, title: 'نظرية القيد المزدوج وقواعد التسجيل', page: 49, subtopics: ['المدين والدائن رياضياً', 'القيود البسيطة والمركبة', 'شرح القيد النظامي'] },
      { number: 3, title: 'دفتر اليومية العامة وسجل المعاملات اليومية', page: 55, subtopics: ['التسطير الرسمي لليومية', 'تسلسل التواريخ ورقم المستند', 'الإقفال اليومي'] },
      { number: 4, title: 'دفتر الأستاذ العام وحسابات T والترصيد', page: 61, subtopics: ['آلية الترحيل من اليومية للأستاذ', 'أنواع الأرصدة (مدين/دائن/مقفول)', 'تحديد الرصيد المنقول'] },
      { number: 5, title: 'إعداد ميزان المراجعة الأولي بالمجاميع والأرصدة', page: 67, subtopics: ['الموازنة الجبرية للأستاذ', 'كشف الأرصدة الشامل', 'دلالات التوازن وعدم التوازن'] },
      { number: 6, title: 'مقال الاستدلال المحاسبي JRE والدورة المستندية', page: 73, subtopics: ['برهان أخطاء الترحيل', 'حماية الرقابة الداخلية', 'حل سيناريو منشأة النيل'], isJre: true }
    ]
  },
  {
    id: 'unit-3',
    num: 3,
    arabicNum: 'الوحدة الثالثة',
    title: 'الدفاتر المحاسبية المساعدة وحسابات المراقبة والرقابة على النقدية',
    subtitle: 'اليوميات المتخصصة • الخصم التجاري والنقدي • دفتر النقدية • السلفة المستديمة',
    pageRange: 'ص 81 - 120',
    examWeight: '10%',
    color: '#0F4C5C',
    caseStudy: 'دراسة حالة محلات بلال التجارية (الكتاب المدرسي ص 8 - 98)',
    lessons: [
      { number: 1, title: 'دفاتر اليومية المساعدة وفلسفة تقسيم العمل', page: 83, subtopics: ['عجز اليومية العامة في المشروعات الكبرى', 'دفتر يومية المشتريات الآجلة', 'دفتر يومية المبيعات الآجلة'] },
      { number: 2, title: 'دفاتر مردودات المشتريات والمبيعات والإشعارات', page: 89, subtopics: ['الإشعار المدين والدائن', 'مردودات ومسموحات المبيعات', 'الترحيل للأستاذ المساعد'] },
      { number: 3, title: 'المعالجة المحاسبية للخصم التجاري والخصم النقدي', page: 95, subtopics: ['الخصم التجاري كأداة تسعير', 'خصم تعجيل الدفع (المسموح به والمكتسب)', 'فروق التسجيل المحاسبي'] },
      { number: 4, title: 'دفتر النقدية ذو الأعمدة المتعددة والرقابة', page: 101, subtopics: ['الجانب المقبوض والمدفوع', 'تسجيل حركة الخزينة والبنك', 'معاملات التحويل الداخلي (Contra)'] },
      { number: 5, title: 'صندوق المصروفات النثرية ونظام السلفة المستديمة', page: 107, subtopics: ['تأسيس السلفة المستديمة', 'استعاضة المنصرفات بإيصالات', 'جرد الصندوق واكتشاف العجز/الزيادة'] },
      { number: 6, title: 'مقال الاستدلال JRE ودراسة حالة محلات بلال', page: 113, subtopics: ['الربط بين اليوميات المساعدة والأستاذ العام', 'حماية النقدية وتفادي الاختلاس', 'صياغة مقال بلال الكامل'], isJre: true }
    ]
  },
  {
    id: 'unit-4',
    num: 4,
    arabicNum: 'الوحدة الرابعة',
    title: 'ميزان المراجعة واكتشاف الأخطاء المحاسبية وتصحيحها والحساب المعلق',
    subtitle: 'أنواع الأخطاء • الأخطاء غير المؤثرة • أخطاء عدم التوازن • الحساب المعلق',
    pageRange: 'ص 121 - 160',
    examWeight: '10%',
    color: '#781822',
    caseStudy: 'دراسة حالة منشأة زيد للتجارة (التطبيق الشامل للأخطاء بالكتاب المدرسي)',
    lessons: [
      { number: 1, title: 'طبيعة ميزان المراجعة وحدود رقابته المحاسبية', page: 123, subtopics: ['التوازن كشرط لازم غير كافٍ', 'الفروق بين الأخطاء الجوهرية والشكلية', 'خريطة فحص الميزان'] },
      { number: 2, title: 'الأخطاء التي لا تؤثر على توازن ميزان المراجعة', page: 129, subtopics: ['خطأ السهو والإغفال التام', 'خطأ التكافؤ والتعويض', 'خطأ في مبدأ محاسبي وخطأ ارتكابي'] },
      { number: 3, title: 'الأخطاء التي تسبب عدم توازن ميزان المراجعة', page: 135, subtopics: ['خطأ الجمع والنقل الخاطئ', 'الترحيل لطرف واحد فقط', 'عكس جانب المدين والدائن'] },
      { number: 4, title: 'الحساب المعلق (Suspense Account) وأساليب فتحه', page: 141, subtopics: ['تعريف الحساب المعلق وطبيعته المؤقتة', 'معالجة الفرق المدين والدائن', 'إقفال الحساب وتصفيره'] },
      { number: 5, title: 'قيود تصحيح الأخطاء بالطريقة المطولة والمختصرة', page: 147, subtopics: ['خطوات التصحيح بدون حساب معلق', 'قيود التصحيح باستخدام الحساب المعلق', 'أثر التصحيح على قائمة الدخل'] },
      { number: 6, title: 'مقال الاستدلال JRE ودراسة حالة منشأة زيد', page: 153, subtopics: ['تشخيص أخطاء التوازن في شركة زيد', 'صياغة تقرير المراجع الخارجي المستقل', 'حل نموذج الامتحان الوزاري'], isJre: true }
    ]
  },
  {
    id: 'unit-5',
    num: 5,
    arabicNum: 'الوحدة الخامسة',
    title: 'الحسابات الختامية والقوائم المالية والتسويات الجردية',
    subtitle: 'قائمة الدخل • المركز المالي • الاستحقاق والمقدمات والمستحقات • مخزون آخر المدة',
    pageRange: 'ص 161 - 200',
    examWeight: '12%',
    color: '#2A4D3E',
    caseStudy: 'دراسة حالة مؤسسة الدلتا الحديثة والتسويات الجردية الختامية',
    lessons: [
      { number: 1, title: 'مفهوم التسويات الجردية وأساس الاستحقاق المحاسبي', page: 163, subtopics: ['الأساس النقدي مقابل أساس الاستحقاق', 'مبدأ مقابلة الإيرادات بالمصروفات', 'دورة الجرد الفعلي'] },
      { number: 2, title: 'التسويات الجردية للمصروفات (المقدمة والمستحقة)', page: 169, subtopics: ['المصروف المستحق كالتزام متداول', 'المصروف المدفوع مقدماً كأصل متداول', 'قيود التسوية والإقفال'] },
      { number: 3, title: 'التسويات الجردية للإيرادات (المستحقة والمقدمة)', page: 175, subtopics: ['الإيراد المستحق كأصل متداول', 'الإيراد المحصل مقدماً كالتزام', 'أثر التسوية على ربحية الفترة'] },
      { number: 4, title: 'تسوية بضاعة آخر المدة وتكلفة المبيعات', page: 181, subtopics: ['تقييم المخزون بالتكلفة أو صافي القيمة القابلة للتحقق', 'معادلة تكلفة البضاعة المباعة', 'حساب المتاجرة وقائمة الدخل'] },
      { number: 5, title: 'إعداد القوائم المالية المبوبة بعد التسويات', page: 187, subtopics: ['قائمة الدخل ذات الخطوات المتعددة', 'قائمة المركز المالي المبوبة', 'قائمة حقوق الملكية'] },
      { number: 6, title: 'مقال الاستدلال JRE والتسويات في مؤسسة الدلتا', page: 193, subtopics: ['حساب الأثر المالي للتسويات المنسية', 'الدفاع عن سلامة القوائم المالية', 'سلم تصحيح JRE الرسمي'], isJre: true }
    ]
  },
  {
    id: 'unit-6',
    num: 6,
    arabicNum: 'الوحدة السادسة',
    title: 'السجلات غير المكتملة (القيد المفرد) ونظم الرقابة ومذكرة تسوية البنك',
    subtitle: 'القيد المفرد • معادلة رأس المال • تسوية كشف حساب البنك • حسابات المراقبة',
    pageRange: 'ص 201 - 240',
    examWeight: '10%',
    color: '#5C3D2E',
    caseStudy: 'دراسة حالة ورشة الأهرام الهندسية وتسوية رصيد البنك',
    lessons: [
      { number: 1, title: 'طبيعة السجلات غير المكتملة ومبررات حدوثها', page: 203, subtopics: ['مفهوم القيد المفرد وعيوبه', 'المنشآت الصغيرة والحرائق وفقد السجلات', 'الحاجة للتحويل للقيد المزدوج'] },
      { number: 2, title: 'تحديد صافي الربح بطريقة مقارنة رأس المال', page: 209, subtopics: ['قائمة المركز المالي الافتتاحية والختامية', 'معادلة رأس المال والمسحوبات والاستثمارات', 'قياس الأداء المالي'] },
      { number: 3, title: 'إعادة تكوين الحسابات المفقودة عبر حسابات المراقبة', page: 215, subtopics: ['حساب مراقبة المدينين لتحديد المبيعات الآجلة', 'حساب مراقبة الدائنين للمشتريات', 'تحليل المقبوضات والمدفوعات'] },
      { number: 4, title: 'كشف حساب البنك وأسباب اختلاف رصيد الدفاتر عن البنك', page: 221, subtopics: ['الفوارق الزمنية (شيكات لم تصرف / إيداعات بالطريق)', 'عمليات قيدها البنك ولم تسجلها المنشأة', 'الأخطاء المحاسبية في الطرفين'] },
      { number: 5, title: 'إعداد مذكرة تسوية البنك وقيود تعديل الدفاتر', page: 227, subtopics: ['الوصول إلى الرصيد الصحيح المعدل', 'قيود إثبات الفوائد والمصاريف والشيكات المرفوضة', 'أثر الرصيد المعدل في الميزانية'] },
      { number: 6, title: 'مقال الاستدلال JRE في الرقابة المصرفية والقيد المفرد', page: 233, subtopics: ['حماية أصول المنشأة من التحايل', 'تبرير الفروق بين رصيد الدفاتر والبنك', 'صياغة مقال ورشة الأهرام'], isJre: true }
    ]
  },
  {
    id: 'unit-7',
    num: 7,
    arabicNum: 'الوحدة السابعة',
    title: 'الإهلاك المحاسبي ومخصصات الأصول والديون المشكوك فيها واستبعاد الأصول',
    subtitle: 'مفهوم الإهلاك • القسط الثابت والمتناقص • استبعاد الأصول • مخصص الديون المشكوك فيها',
    pageRange: 'ص 241 - 275',
    examWeight: '10%',
    color: '#3B3B3B',
    caseStudy: 'دراسة حالة مصنع حسن للصناعات المعدنية (الإهلاك والديون)',
    lessons: [
      { number: 1, title: 'مفهوم الإهلاك وأسبابه والعوامل المحددة لقسطه', page: 243, subtopics: ['الإهلاك كتوزيع للتكلفة وليس تقييماً سوقياً', 'التكلفة التاريخية والقيمة التخريدية والعمر الإنتاجي', 'مبدأ المقابلة'] },
      { number: 2, title: 'طرق حساب الإهلاك (القسط الثابت والقسط المتناقص)', page: 249, subtopics: ['معادلة القسط الثابت وجدول الإهلاك', 'معادلة القسط المتناقص ومبرراته الاقتصادية', 'مقارنة الأثر على أرباح السنوات الأولى'] },
      { number: 3, title: 'المعالجة الدفترية للإهلاك ومجمع الإهلاك في الميزانية', page: 255, subtopics: ['الطريقة المباشرة مقابل الطريقة غير المباشرة', 'حساب مجمع الإهلاك كحساب عكسي للأصول', 'عرض القيمة الدفترية الصافية'] },
      { number: 4, title: 'استبعاد وبيع الأصول الثابتة وحساب أرباح/خسائر الاستبعاد', page: 261, subtopics: ['حساب استبعاد الأصول (Asset Disposal Account)', 'مقارنة سعر البيع بالقيمة الدفترية', 'الأثر على قائمة الدخل'] },
      { number: 5, title: 'الديون المعدومة ومخصص الديون المشكوك في تحصيلها ومقال JRE', page: 267, subtopics: ['إعدام الدين أثناء وبعد الفترة', 'تكوين وتعديل مخصص الديون المشكوك فيها', 'دراسة حالة مصنع حسن ومقال JRE'], isJre: true }
    ]
  },
  {
    id: 'unit-8',
    num: 8,
    arabicNum: 'الوحدة الثامنة',
    title: 'محاسبة شركات الأشخاص (التضامن) وتوزيع الأرباح وتغير الشركاء',
    subtitle: 'عقد الشراكة • حساب توزيع الأرباح • فائدة رأس المال • الحسابات الجارية • الشهرة',
    pageRange: 'ص 276 - 315',
    examWeight: '10%',
    color: '#8A5D00',
    caseStudy: 'دراسة حالة شركة عمر وياسر للتضامن بالقاهرة',
    lessons: [
      { number: 1, title: 'طبيعة شركة التضامن والمسؤولية غير المحدودة وعقد الشركة', page: 278, subtopics: ['خصائص شركات الأشخاص', 'المسؤولية التضامنية المطلقة للشركاء', 'بنود عقد الشراكة الأساسية'] },
      { number: 2, title: 'حساب توزيع الأرباح والخسائر (Profit & Loss Appropriation)', page: 284, subtopics: ['الفرق بين صافي الربح وقابل التوزيع', 'فائدة رأس المال ومكافأة الشريك المدير', 'فائدة المسحوبات وأثرها'] },
      { number: 3, title: 'الحسابات الجارية للشركاء (Current Accounts) وعرضها', page: 290, subtopics: ['الحساب الجاري المدين والدائن', 'حساب رأس المال الثابت مقابل المتغير', 'العرض في قائمة المركز المالي'] },
      { number: 4, title: 'محاسبة الشهرة (Goodwill) وإعادة التقدير', page: 296, subtopics: ['مفهوم الشهرة وأسباب نشوئها', 'تقييم الشهرة في السجلات وإثباتها/عدم إثباتها', 'نسب توزيع الأرباح والخسائر القديمة والجديدة'] },
      { number: 5, title: 'تغير عقد الشراكة (انضمام وانفصال شريك) ومقال JRE', page: 302, subtopics: ['معالجة سداد الشريك المنفصل لحقوقه', 'تسوية حسابات الشركاء', 'مقال JRE في عدالة توزيع الأرباح'], isJre: true }
    ]
  },
  {
    id: 'unit-9',
    num: 9,
    arabicNum: 'الوحدة التاسعة',
    title: 'محاسبة شركات الأموال (المساهمة) والأسهم والسندات والتمويل',
    subtitle: 'رأس المال المرخص والمصدر • إصدار الأسهم بالأقساط وعلاوة الإصدار • قروض السندات',
    pageRange: 'ص 316 - 360',
    examWeight: '12%',
    color: '#1B4D2E',
    caseStudy: 'دراسة حالة شركة الأمل للصناعات الدوائية المساهمة المصرية',
    lessons: [
      { number: 1, title: 'الخصائص الجوهرية لشركات الأموال ورأس المال القانوني', page: 318, subtopics: ['المسؤولية المحدودة للمساهم', 'رأس المال المرخص والمصدر والمدفوع', 'أنواع الأسهم (العادية والممتازة)'] },
      { number: 2, title: 'إصدار الأسهم النقدية وسداد قيمتها دفعة واحدة وعلاوة الإصدار', page: 324, subtopics: ['حساب المكتتبين في الأسهم', 'علاوة الإصدار والاحتياطي القانوني', 'مصاريف التأسيس والإصدار'] },
      { number: 3, title: 'إصدار الأسهم على أقساط ومعالجة المساهم المتأخر', page: 330, subtopics: ['قسط الاكتتاب والتخصيص والأول والأخير', 'بيع الأسهم في المزاد العلني', 'تسوية رصيد المساهم المتأخر'] },
      { number: 4, title: 'الاكتتاب في الأسهم بزيادة (Over-subscription) والتخصيص النسبي', page: 336, subtopics: ['رد الزيادة للمكتتبين', 'حجز الزيادة لسداد الأقساط التالية', 'حساب نسبة التخصيص'] },
      { number: 5, title: 'قروض السندات (Debentures) وفوائدها مقارنة بالأسهم', page: 342, subtopics: ['السند كأداة دين طويلة الأجل', 'إصدار السندات بالقيمة الاسمية وبعلاوة/خصم', 'فائدة السندات كمصروف تمويلي'] },
      { number: 6, title: 'مقال الاستدلال JRE في هيكل التمويل (أسهم أم سندات؟)', page: 348, subtopics: ['المفاضلة بين حقوق الملكية والاقتراض', 'الرفع المالي والمخاطر وحماية الدائنين', 'حل نموذج شركة الأمل'], isJre: true }
    ]
  },
  {
    id: 'unit-10',
    num: 10,
    arabicNum: 'الوحدة العاشرة',
    title: 'تحليل القوائم المالية وتفسيرها ومؤشرات الأداء واتخاذ القرار',
    subtitle: 'التحليل الأفقي والرأسي • نسب الربحية والسيولة والكفاءة • ROCE • مقال JRE الشامل',
    pageRange: 'ص 361 - 405',
    examWeight: '14%',
    color: '#38220F',
    caseStudy: 'دراسة حالة شركة النصر الهندسية والمقارنة المعيارية الشاملة',
    lessons: [
      { number: 1, title: 'أهداف التحليل المالي وأدواته (التحليل الأفقي والرأسي)', page: 363, subtopics: ['تحليل الاتجاه عبر السنوات', 'التحليل بالحجم المشترك (Common-size)', 'قراءة التغيرات الهيكلية'] },
      { number: 2, title: 'نسب الربحية ومعدل العائد على رأس المال المستثمر (ROCE)', page: 369, subtopics: ['هامش مجمل وصافي الربح', 'حساب العائد ROCE وتفكيكه', 'معدل العائد على حقوق الملكية ROE'] },
      { number: 3, title: 'نسب السيولة والملاءة المالية وإدارة رأس المال العامل', page: 375, subtopics: ['نسبة التداول (Current Ratio)', 'نسبة السيولة السريعة (Acid-test)', 'مخاطر تجميد السيولة'] },
      { number: 4, title: 'نسب الكفاءة والنشاط ودوران الأصول والمخزون', page: 381, subtopics: ['معدل دوران المخزون وفترة تصريفه', 'فترة تحصيل المدينين وسداد الدائنين', 'الدورة النقدية التشغيلية'] },
      { number: 5, title: 'المقارنة المعيارية ومحددات التحليل المالي ومصداقية القوائم', page: 387, subtopics: ['المقارنة بمتوسط الصناعة والمنافسين', 'أثر التضخم واختلاف السياسات المحاسبية', 'تجميل القوائم (Window Dressing)'] },
      { number: 6, title: 'مقال الاستدلال JRE المتكامل في اتخاذ القرارات الاستثمارية', page: 393, subtopics: ['الهيكل النموذجي لمقال JRE الشامل (20 درجة)', 'الجمع بين السيولة والربحية والمخاطر', 'تقديم الحكم النهائي المبرر بالأدلة'], isJre: true }
    ]
  }
];

export const BookTableOfContents: React.FC<BookTableOfContentsProps> = ({ 
  onSelectUnit,
  selectedUnitId = 'all'
}) => {
  return (
    <div className="bg-[#FFFFFF] p-6 sm:p-10 border border-[#1D1D1B]/20 text-[#1D1D1B] space-y-8 page-break-after">
      
      {/* Header of the Table of Contents */}
      <div className="border-b-2 border-[#1D1D1B] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-[#C5A059] font-bold uppercase tracking-widest block">
            GENERAL CURRICULUM DIRECTORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#1D1D1B]">
            فهرس المحتويات العام للمنهاج المعتمد
          </h2>
          <p className="text-xs text-[#1D1D1B]/70 mt-1 font-sans">
            مقسم طبقاً للوحدات العشر المقررة ومطابق 100% لكتاب الوزارة وتوزيع درجات الامتحان الرسمي
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold bg-[#FAF7EE] px-3 py-1.5 border border-[#C5A059]">
          <Bookmark className="w-4 h-4 text-[#C5A059]" />
          <span>10 وحدات • 58 درساً • 250+ تطبيقاً</span>
        </div>
      </div>

      {/* Units Grid Layout */}
      <div className="space-y-6">
        {unitsTableOfContents.map((unit) => {
          const isSelected = selectedUnitId === unit.id;
          return (
            <div 
              key={unit.id}
              id={`toc-${unit.id}`}
              className={`border-2 transition-all p-4 sm:p-5 ${
                isSelected 
                  ? 'border-[#C5A059] bg-[#FFFDF9] shadow-md' 
                  : 'border-[#1D1D1B]/20 hover:border-[#1D1D1B]/50 bg-[#FAFAFA]'
              }`}
            >
              {/* Unit Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1D1D1B]/15 pb-3">
                <div className="flex items-center gap-3">
                  <span 
                    className="w-8 h-8 rounded-none text-[#FFFFFF] flex items-center justify-center font-bold font-mono text-sm shrink-0 shadow-sm"
                    style={{ backgroundColor: unit.color }}
                  >
                    {unit.num}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#C5A059] font-serif">{unit.arabicNum}</span>
                      <span className="text-[10px] px-2 py-0.2 bg-[#1D1D1B]/10 text-[#1D1D1B] font-bold">
                        وزن الامتحان: {unit.examWeight}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black font-serif text-[#1D1D1B]">
                      {unit.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="bg-[#1D1D1B] text-[#FFFFFF] px-2.5 py-0.5 font-bold">
                    {unit.pageRange}
                  </span>
                  {onSelectUnit && (
                    <button
                      onClick={() => onSelectUnit(unit.id)}
                      className="text-[#0E1A2B] hover:text-[#C5A059] font-bold underline cursor-pointer text-xs flex items-center gap-0.5"
                    >
                      <span>عرض وطباعة الوحدة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Case study banner */}
              <div className="mt-3 mb-3 bg-[#FAF7EE] border-r-4 border-[#C5A059] border-y border-l border-[#C5A059]/40 px-3.5 py-1.5 text-xs text-[#0E1A2B] flex items-center gap-2 font-sans shadow-2xs">
                <FileText className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-bold text-[#0C1E36]">دراسة الحالة التطبيقية:</span>
                <span className="font-medium text-[#1D1D1B]">{unit.caseStudy}</span>
              </div>

              {/* Lessons Table / List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm pt-1">
                {unit.lessons.map((lesson) => (
                  <div 
                    key={lesson.number}
                    className="flex items-start justify-between p-2.5 bg-[#FFFFFF] border border-[#1D1D1B]/15 hover:border-[#0C1E36] transition shadow-2xs"
                  >
                    <div className="space-y-1 pr-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#0C1E36] font-serif text-sm">
                          الدرس {lesson.number}:
                        </span>
                        <span className="font-bold text-[#1D1D1B] text-sm">
                          {lesson.title}
                        </span>
                        {lesson.isJre && (
                          <span className="px-2 py-0.5 bg-[#8C1D2A] text-[#FFFFFF] text-[10px] font-bold font-mono">
                            JRE (20 درجة)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#1D1D1B]/75 leading-relaxed">
                        {lesson.subtopics.join(' • ')}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0C1E36] shrink-0 mr-2 bg-[#FAF8F5] border border-[#C5A059]/40 px-2 py-1">
                      ص {lesson.page}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Annexes & Question Bank Reference */}
      <div className="border-2 border-[#0C1E36] p-6 bg-[#FAF8F5] space-y-4 shadow-sm">
        <h4 className="font-bold text-base text-[#0C1E36] font-serif border-b-2 border-[#C5A059] pb-2 flex items-center justify-between">
          <span>الملحقات والكتيبات التكميلية الملحقة بالكتاب:</span>
          <span className="text-xs font-mono text-[#8A5D00] font-bold">OFFICIAL STUDY ANNEXES</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-sm">
          <div className="bg-[#FFFFFF] p-3.5 border-r-4 border-[#8A1F1D] border-y border-l border-[#0C1E36]/15 shadow-2xs space-y-1">
            <span className="font-bold block text-[#8A1F1D] text-sm font-serif">1. كتاب الأداءات والتقييمات (ص 3 - 84):</span>
            <p className="text-xs text-[#1D1D1B]/85 leading-relaxed">
              تفريغ رسمي معتمد لـ 288 أداءً صفياً ومنزلياً وتقييمات أسبوعية وشهرية مع نماذج الإجابة.
            </p>
          </div>
          <div className="bg-[#FFFFFF] p-3.5 border-r-4 border-[#781D28] border-y border-l border-[#0C1E36]/15 shadow-2xs space-y-1">
            <span className="font-bold block text-[#781D28] text-sm font-serif">2. بنك الأسئلة الموحد (ص 406):</span>
            <p className="text-xs text-[#1D1D1B]/85 leading-relaxed">
              أكثر من 300 سؤال تدريبي مصنف بمستويات التذكر والفهم والتطبيق والتحليل.
            </p>
          </div>
          <div className="bg-[#FFFFFF] p-3.5 border-r-4 border-[#0F4C5C] border-y border-l border-[#0C1E36]/15 shadow-2xs space-y-1">
            <span className="font-bold block text-[#0F4C5C] text-sm font-serif">3. نماذج الامتحانات الرسمية (ص 430):</span>
            <p className="text-xs text-[#1D1D1B]/85 leading-relaxed">
              نماذج مطابقة تماماً لمواصفات الورقة الامتحانية الوزارية مع سلالم التصحيح.
            </p>
          </div>
          <div className="bg-[#FFFFFF] p-3.5 border-r-4 border-[#14532D] border-y border-l border-[#0C1E36]/15 shadow-2xs space-y-1">
            <span className="font-bold block text-[#14532D] text-sm font-serif">4. قاموس المصطلحات المعتمد (ص 455):</span>
            <p className="text-xs text-[#1D1D1B]/85 leading-relaxed">
              معجم شامل للمصطلحات باللغتين العربية والإنجليزية وأخطاء الامتحان الشائعة.
            </p>
          </div>
        </div>

        {/* Table of Contents Legal Deposit & Copyright Strip */}
        <div className="pt-3 border-t border-[#0C1E36]/15 text-center text-xs text-[#1D1D1B]/80 font-sans leading-relaxed">
          <p className="font-bold text-[#0C1E36] text-xs sm:text-sm">
            جميع الحقوق محفوظة © 2026/2027 — سلسلة المحاسبة المالية ببساطة وإتقان (البكالوريا المصرية EB)
          </p>
          <p className="text-[#1D1D1B]/70 font-mono text-[11px] mt-0.5">
            رقم الإيداع بدار الكتب: 14280 / 2026 • ISBN: 978-977-08-4120-1 • دار التميز للنشر والتقنيات التعليمية
          </p>
        </div>
      </div>

    </div>
  );
};
