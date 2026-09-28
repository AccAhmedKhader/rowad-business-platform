import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library, BookOpen, Printer, Search, FileText, Award, 
  Scale, ShieldCheck, CheckCircle2, Bookmark, Download, 
  ExternalLink, Sparkles, Filter, ChevronLeft, ArrowRight,
  BookA, Layers, HelpCircle
} from 'lucide-react';

export type LibraryCategory = 'all' | 'textbooks' | 'assessments' | 'guides' | 'units';

export interface LibraryPublication {
  id: string;
  title: string;
  category: LibraryCategory;
  categoryLabel: string;
  subtitle: string;
  description: string;
  pageCountInfo: string;
  depositNumber: string;
  editionDate: string;
  badgeColor: string;
  primaryActionLabel: string;
  primaryActionUrl: string;
  printEditionKey: string;
  features: string[];
  isHighlighted?: boolean;
}

export const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const publications: LibraryPublication[] = [
    {
      id: 'assessments',
      title: 'كتاب الأداءات والتقييمات المدرسية المعتمدة',
      category: 'assessments',
      categoryLabel: 'الأداءات والتقييمات الرسمية',
      subtitle: 'تفريغ رسمي شامل للأنشطة الصفية والواجبات المنزلية والتقييمات الأسبوعية وتدريبات الشهور',
      description: 'يحتوي على ۲۸۸ سؤالاً وتدريباً معتمداً تغطي الوحدات من 1 إلى 5 بكتاب الوزارة (ص ۳ إلى ۸٤)، مع النماذج الثلاثية (أ، ب، ج)، ومربوطة بمستويات بلوم ونواتج التعلم LO ومفاتيح الإجابات النموذجية وسلالم التصحيح.',
      pageCountInfo: 'ص ۳ إلى ۸٤ (۲۸۸ مفرداً)',
      depositNumber: 'إيداع دار الكتب: 14280 / 2026',
      editionDate: 'طبعة العام الدراسي 2025 / 2026',
      badgeColor: 'bg-[#8A1F1D] text-white',
      primaryActionLabel: 'تصفح الأداءات والتقييمات التفاعلية',
      primaryActionUrl: '/assessment/ministry-assessments',
      printEditionKey: 'assessments',
      features: [
        '۲۸۸ سؤالاً وتدريباً وزارياً',
        'تغطية الوحدات 1 إلى 5 بالكامل',
        'النماذج الأسبوعية الثلاثية (أ، ب، ج)',
        'سلالم درجات نموذجية ومفاتيح إجابة'
      ],
      isHighlighted: true
    },
    {
      id: 'student',
      title: 'المحاسبة المالية ببساطة وإتقان (نسخة الطالب المعتمدة)',
      category: 'textbooks',
      categoryLabel: 'الكتاب المدرسي والشرح المرجعي',
      subtitle: 'المرجع الأكاديمي الشامل الأول لشهادة البكالوريا المصرية (EB)',
      description: 'يغطي المنهاج الوزاري كاملاً عبر 10 وحدات و 58 درساً مفصلاً، مع أكثر من 250 مسألة محلولة، ودليل متكامل لإتقان مقال الاستدلال المحاسبي الوزاري JRE (سلم الـ 20 درجة).',
      pageCountInfo: '10 وحدات • 58 درساً',
      depositNumber: 'ISBN: 978-977-08-4120-1',
      editionDate: 'طبعة منقحة ومعتمدة 2026',
      badgeColor: 'bg-[#1D1D1B] text-[#C4A484]',
      primaryActionLabel: 'قراءة المنهج والدروس',
      primaryActionUrl: '/curriculum',
      printEditionKey: 'student',
      features: [
        '58 درساً تفصيلياً متوافقاً مع المعايير',
        '250+ مسألة محلولة خطوة بخطوة',
        'ربط نظري وتطبيقي بالحياة العملية',
        'معالجة شاملة لمعادلة الميزانية والقيد المزدوج'
      ],
      isHighlighted: true
    },
    {
      id: 'teacher',
      title: 'دليل المعلم الإرشادي وخطط التدريس النموذجية',
      category: 'guides',
      categoryLabel: 'أدلة التوجيه والتدريس',
      subtitle: 'دليل التخطيط التربوي وتوزيع المنهج ونواتج التعلم وسلالم التحكيم',
      description: 'مخصص للسادة المعلمين والموجهين التربويين؛ يشمل خطط الدروس التفصيلية، أهداف الأداء ومؤشرات النجاح، استراتيجيات معالجة صعوبات التعلم، وموجهات تصحيح مقال JRE.',
      pageCountInfo: 'دليل تربوي قياسي',
      depositNumber: 'اعتماد التوجيه الفني المركزي 2026',
      editionDate: 'إصدار التوجيه العام 2026',
      badgeColor: 'bg-[#1E3A8A] text-white',
      primaryActionLabel: 'فتح لوحة المعلم',
      primaryActionUrl: '/teacher-dashboard',
      printEditionKey: 'teacher',
      features: [
        'خطط توزيع المنهج الزمني بالأسابيع',
        'مصفوفة نواتج التعلم ومستويات بلوم',
        'استراتيجيات معالجة المفاهيم البديلة',
        'سلالم تحكيم وتصحيح معيارية'
      ]
    },
    {
      id: 'glossary',
      title: 'معجم المصطلحات والمفاهيم المحاسبية المعتمد',
      category: 'guides',
      categoryLabel: 'الملحق المعجمي الرسمي (عربي — إنجليزي)',
      subtitle: 'المعجم المقنن: التفسير المبسط، التعريف الأكاديمي، والأفخاخ الامتحانية',
      description: 'تغطية شاملة لأكثر من 150 مصطلحاً محاسبياً لكافة الوحدات (1 - 10) مع الأمثلة الرقمية من واقع السوق، ونماذج ذهنية لتفادي الخلط في أسئلة الامتحان والاستدلال.',
      pageCountInfo: 'معجم ألفبائي شامل (150+ مصطلح)',
      depositNumber: 'إيداع رسمي معجمي',
      editionDate: 'إصدار معجمي محدث 2026',
      badgeColor: 'bg-[#14532D] text-white',
      primaryActionLabel: 'فتح المعجم التفاعلي',
      primaryActionUrl: '/curriculum',
      printEditionKey: 'glossary',
      features: [
        'أكثر من 150 مصطلحاً بالإنجليزية والعربية',
        'تفسير مبسط مع أمثلة رقمية حية',
        'تنبيهات للأفخاخ الامتحانية والمصطلحات المتشابهة',
        'تصنيف معجمي بحسب الوحدات العشر'
      ]
    },
    {
      id: 'qbank',
      title: 'كتيب بنك الأسئلة الشامل الموحد',
      category: 'assessments',
      categoryLabel: 'بنوك الأسئلة والتدريبات المقننة',
      subtitle: 'أسئلة تدريبية مصنفة بمستويات بلوم المعرفية ونواتج التعلم المستهدفة',
      description: 'مئات الأسئلة الموضوعية والمقالية المتدرجة في الصعوبة من التذكر والفهم إلى التطبيق والتحليل، مع ربط كل سؤال بصفحات كتاب الوزارة وناتج التعلم المستهدف.',
      pageCountInfo: '300+ مفرداً تدريبياً',
      depositNumber: 'إيداع دار الكتب: 14280 / 2026',
      editionDate: 'الإصدار الموحد 2026',
      badgeColor: 'bg-[#781D28] text-white',
      primaryActionLabel: 'تصفح بنك الأسئلة الذكي',
      primaryActionUrl: '/assessment/question-bank',
      printEditionKey: 'qbank',
      features: [
        'تصنيف بلوم السداسي الكامل',
        'تغطية شاملة لنواتج التعلم LO 1.1 - LO 5.4',
        'تصفية تفاعلية حسب الوحدة ومستوى الصعوبة',
        'تغذية راجعة فورية مع التبرير المحاسبي'
      ]
    },
    {
      id: 'exams',
      title: 'كتيب الامتحانات والمحاكاة الرسمية للبكالوريا (EB)',
      category: 'assessments',
      categoryLabel: 'الامتحانات والمحاكاة الرسمية',
      subtitle: '5 امتحانات شاملة مطابقة 100% لمواصفات المركز القومي للامتحانات',
      description: 'نماذج امتحانية نهائية تحاكي نظام التقييم الرسمي للبكالوريا المصرية، تشمل الأسئلة الموضوعية والمقالية المتطورة، وسؤال الاستدلال المحاسبي JRE مع مسودات الإجابة وسلالم الدرجات.',
      pageCountInfo: '5 امتحانات نموذجية كاملة',
      depositNumber: 'إيداع امتحاني رسمي 2026',
      editionDate: 'نماذج تدريبية نهائية 2026',
      badgeColor: 'bg-[#0F766E] text-white',
      primaryActionLabel: 'بدء امتحان محاكاة مؤقت',
      primaryActionUrl: '/assessment/mock-exams',
      printEditionKey: 'exams',
      features: [
        'مؤقت زمني يحاكي أجواء الامتحان الفعلي',
        'مطابقة كاملة لوزن درجات الورقة الامتحانية',
        'سؤال استدلال محاسبي JRE لكل نموذج',
        'تقرير فوري بتحليل نقاط القوة ومكامن الضعف'
      ]
    },
    {
      id: 'answers',
      title: 'دليل الإجابات النموذجية وسلالم التصحيح الوزارية',
      category: 'guides',
      categoryLabel: 'سلالم التصحيح والحلول النموذجية',
      subtitle: 'خطوات الحل الحسابي، قيود اليومية، وترحيل الأستاذ وسلالم التحكيم الرسمية',
      description: 'دليل رسمي يضم كافة الحلول النموذجية لمسائل الوحدات، وتدريبات الأداءات الأسبوعية، مع تفصيل توزيع الدرجات الجزئية وموجهات التصحيح المعتمدة من وزارة التربية والتعليم.',
      pageCountInfo: 'دليل إجابات وسلالم معيارية',
      depositNumber: 'اعتماد رسمي 2026',
      editionDate: 'طبعة الموجهين والمصححين 2026',
      badgeColor: 'bg-[#581C87] text-white',
      primaryActionLabel: 'مراجعة حلول الأداءات',
      primaryActionUrl: '/assessment/ministry-assessments',
      printEditionKey: 'answers',
      features: [
        'خطوات الحل الرياضي والمحاسبي بالتفصيل',
        'قيود يومية وحسابات أستاذ T مدققة',
        'توزيع الدرجات الجزئية لكل خطوة',
        'نماذج استرشادية لمقال الاستدلال المالي'
      ]
    },
    {
      id: 'unit1',
      title: 'ملزمة الوحدة الأولى: ماهية المحاسبة والتقارير المالية',
      category: 'units',
      categoryLabel: 'كتيب دراسي تخصصي للوحدة',
      subtitle: 'الدروس 1 إلى 6: تعريف المحاسبة، مستخدمو المعلومات، الفروع، المبادئ، والأسس',
      description: 'كتيب دراسي شامل ومستقل للوحدة الأولى، يتضمن شرح المفاهيم، جداول المقارنة، التنبيهات من الأخطاء الشائعة، و 24 مسألة محلولة خطوة بخطوة.',
      pageCountInfo: 'الوحدة 1 • 6 دروس',
      depositNumber: 'كود الوحدة: U01-EB',
      editionDate: '2026',
      badgeColor: 'bg-[#1D1D1B] text-[#F9F7F2]',
      primaryActionLabel: 'دراسة الوحدة الأولى',
      primaryActionUrl: '/curriculum/unit-1',
      printEditionKey: 'student',
      features: ['تغطية كاملة للدروس من 1 إلى 6', 'مصفوفة المقارنة والمبادئ المحاسبية', 'تمارين تدريبية بعد كل درس']
    },
    {
      id: 'unit2',
      title: 'ملزمة الوحدة الثانية: معادلة الميزانية وتحليل العمليات',
      category: 'units',
      categoryLabel: 'كتيب دراسي تخصصي للوحدة',
      subtitle: 'الدروس 1 إلى 6: الأصول، الخصوم، حقوق الملكية، الإيرادات والمصروفات، وتأثير العمليات',
      description: 'كتيب تطبيقي مكثف يركز على معادلة الميزانية (الأصول = الخصوم + حقوق الملكية)، كيفية تحليل كل عملية مالية وتحديد أثرها الثنائي بدقة متناهية.',
      pageCountInfo: 'الوحدة 2 • 6 دروس',
      depositNumber: 'كود الوحدة: U02-EB',
      editionDate: '2026',
      badgeColor: 'bg-[#1D1D1B] text-[#F9F7F2]',
      primaryActionLabel: 'دراسة الوحدة الثانية',
      primaryActionUrl: '/curriculum/unit-2',
      printEditionKey: 'student',
      features: ['محاكاة معادلة الميزانية الديناميكية', 'حالات عملية لتحليل 30 معاملة مالية', 'اختبار شامل لنهاية الوحدة']
    },
    {
      id: 'unit3',
      title: 'ملزمة الوحدة الثالثة: الدورة المحاسبية والتسجيل',
      category: 'units',
      categoryLabel: 'كتيب دراسي تخصصي للوحدة',
      subtitle: 'الدروس 1 إلى 6: المستندات المؤيدة، قيود اليومية، الترحيل للأستاذ، وميزان المراجعة',
      description: 'الدليل العملي الشامل للدورة المحاسبية وقواعد القيد المزدوج، وإعداد اليومية العامة وترحيل الحركات إلى حسابات T واستخراج الأرصدة.',
      pageCountInfo: 'الوحدة 3 • 6 دروس',
      depositNumber: 'كود الوحدة: U03-EB',
      editionDate: '2026',
      badgeColor: 'bg-[#1D1D1B] text-[#F9F7F2]',
      primaryActionLabel: 'دراسة الوحدة الثالثة',
      primaryActionUrl: '/curriculum/unit-3',
      printEditionKey: 'student',
      features: ['تطبيق قواعد المدين والدائن المعتمدة', 'دفتر اليومية العامة وحسابات T', 'إعداد ميزان المراجعة بالمجاميع والأرصدة']
    },
    {
      id: 'unit4',
      title: 'ملزمة الوحدة الرابعة: التسويات الجردية والأخطاء المحاسبية',
      category: 'units',
      categoryLabel: 'كتيب دراسي تخصصي للوحدة',
      subtitle: 'الدروس 1 إلى 6: تسوية المصروفات والإيرادات المقدمة والمستحقة، وتصحيح الأخطاء',
      description: 'معالجة أكاديمية رصينة للتسويات الجردية وفق أساس الاستحقاق، تصحيح الأخطاء المحاسبية بالطريقتين المطولة والمختصرة، وإعداد ميزان المراجعة المعدل.',
      pageCountInfo: 'الوحدة 4 • 6 دروس',
      depositNumber: 'كود الوحدة: U04-EB',
      editionDate: '2026',
      badgeColor: 'bg-[#1D1D1B] text-[#F9F7F2]',
      primaryActionLabel: 'دراسة الوحدة الرابعة',
      primaryActionUrl: '/curriculum/unit-4',
      printEditionKey: 'student',
      features: ['جدول التسويات الجردية الأربعة', 'معمل تصحيح الأخطاء المحاسبية', 'ميزان المراجعة قبل وبعد التسوية']
    },
    {
      id: 'unit5',
      title: 'ملزمة الوحدة الخامسة: القوائم المالية وإقفال الحسابات',
      category: 'units',
      categoryLabel: 'كتيب دراسي تخصصي للوحدة',
      subtitle: 'الدروس 1 إلى 6: قائمة الدخل، قائمة المركز المالي، قيود الإقفال، وتدوير الحسابات',
      description: 'الإصدار الختامي للدورة المحاسبية: إعداد قائمة الدخل لحساب صافي الربح أو الخسارة، وقائمة المركز المالي المبوبة، وقيود إقفال الحسابات المؤقتة.',
      pageCountInfo: 'الوحدة 5 • 6 دروس',
      depositNumber: 'كود الوحدة: U05-EB',
      editionDate: '2026',
      badgeColor: 'bg-[#1D1D1B] text-[#F9F7F2]',
      primaryActionLabel: 'دراسة الوحدة الخامسة',
      primaryActionUrl: '/curriculum/unit-5',
      printEditionKey: 'student',
      features: ['نماذج معتمدة لقائمة الدخل والميزانية', 'قيود الإقفال الأربعة وحساب ملخص الدخل', 'دراسة حالة تكاملية كبرى']
    }
  ];

  const filteredPublications = useMemo(() => {
    return publications.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.depositNumber.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1D1D1B] font-serif pb-16">
      {/* Hero Header Section */}
      <section className="bg-[#1D1D1B] text-[#F9F7F2] border-b-4 border-[#C4A484] px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F9F7F2]/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-bold shadow-xs">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  مكتبة إصدارات ومطبوعات المنصة
                </h1>
                <p className="text-xs sm:text-sm text-[#F9F7F2]/80">
                  منظومة المراجع والكتب الدراسية المعتمدة لشهادة البكالوريا المصرية (EB) — طبعة 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/print?edition=assessments')}
                className="px-3.5 py-2 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-bold transition flex items-center gap-2 border border-[#8A1F1D] cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>طباعة كتاب الأداءات (ص ۳-۸٤)</span>
              </button>

              <button
                onClick={() => navigate('/print?edition=student')}
                className="px-3.5 py-2 bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] text-xs font-bold transition flex items-center gap-2 border border-[#1D1D1B] cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4 text-[#C4A484]" />
                <span>مركز الطباعة والملازم</span>
              </button>
            </div>
          </div>

          {/* Quick Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#FFFFFF]/10 border border-[#F9F7F2]/15 p-3 text-right">
              <span className="text-[11px] text-[#C4A484] font-bold block">إجمالي الإصدارات</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-mono">12+ مجلداً</span>
            </div>
            <div className="bg-[#FFFFFF]/10 border border-[#F9F7F2]/15 p-3 text-right">
              <span className="text-[11px] text-[#C4A484] font-bold block">كتاب الأداءات الوزاري</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-mono">۲۸۸ تدريباً</span>
            </div>
            <div className="bg-[#FFFFFF]/10 border border-[#F9F7F2]/15 p-3 text-right">
              <span className="text-[11px] text-[#C4A484] font-bold block">المنهاج المعتمد</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-mono">10 وحدات</span>
            </div>
            <div className="bg-[#FFFFFF]/10 border border-[#F9F7F2]/15 p-3 text-right">
              <span className="text-[11px] text-[#C4A484] font-bold block">الاعتماد والتوثيق</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-mono">دار الكتب</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Filtering */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Filter Controls & Search */}
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  selectedCategory === 'all'
                    ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                    : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#1D1D1B]/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>الكل ({publications.length})</span>
              </button>

              <button
                onClick={() => setSelectedCategory('assessments')}
                className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  selectedCategory === 'assessments'
                    ? 'bg-[#8A1F1D] text-white border-[#8A1F1D]'
                    : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#1D1D1B]/5'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>الأداءات والتقييمات والامتحانات</span>
              </button>

              <button
                onClick={() => setSelectedCategory('textbooks')}
                className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  selectedCategory === 'textbooks'
                    ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                    : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#1D1D1B]/5'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C4A484]" />
                <span>الكتاب المدرسي الشامل</span>
              </button>

              <button
                onClick={() => setSelectedCategory('guides')}
                className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  selectedCategory === 'guides'
                    ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                    : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#1D1D1B]/5'
                }`}
              >
                <BookA className="w-3.5 h-3.5 text-[#C4A484]" />
                <span>الأدلة والمعاجم وسلالم الإجابة</span>
              </button>

              <button
                onClick={() => setSelectedCategory('units')}
                className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  selectedCategory === 'units'
                    ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                    : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#1D1D1B]/5'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-[#C4A484]" />
                <span>ملازم الوحدات المستقلة</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#1D1D1B]/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث في عناوين الكتب أو الإيداع..."
                className="w-full pl-3 pr-9 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/30 text-xs text-[#1D1D1B] placeholder:text-[#1D1D1B]/50 focus:outline-none focus:border-[#1D1D1B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#1D1D1B]/60 hover:text-[#1D1D1B]"
                >
                  مسح
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPublications.map(pub => {
            const isAssessmentsBook = pub.id === 'assessments';

            return (
              <article
                key={pub.id}
                className={`bg-[#FFFFFF] p-5 sm:p-6 transition-all flex flex-col justify-between shadow-xs ${
                  isAssessmentsBook
                    ? 'border-2 border-[#8A1F1D] ring-2 ring-[#8A1F1D]/15'
                    : 'border-2 border-[#1D1D1B]'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1D1D1B]/15 pb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 ${pub.badgeColor}`}>
                      {pub.categoryLabel}
                    </span>
                    <span className="font-mono text-[11px] text-[#1D1D1B]/70 bg-[#F9F7F2] px-2 py-0.5 border border-[#1D1D1B]/15">
                      {pub.pageCountInfo}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="font-extrabold text-lg sm:text-xl text-[#1D1D1B] leading-snug">
                      {pub.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#8A1F1D] font-bold mt-1">
                      {pub.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed">
                    {pub.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-1.5 pt-1">
                    {pub.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#1D1D1B]/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A484] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Meta Details */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1D1D1B]/10 text-[11px] text-[#1D1D1B]/70 font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#C4A484]" />
                      <span>{pub.depositNumber}</span>
                    </span>
                    <span>{pub.editionDate}</span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-5 mt-4 border-t border-[#1D1D1B]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={() => navigate(pub.primaryActionUrl)}
                    className={`flex-1 py-2.5 px-3 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                      isAssessmentsBook
                        ? 'bg-[#8A1F1D] hover:bg-[#701917] text-white'
                        : 'bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>{pub.primaryActionLabel}</span>
                  </button>

                  <button
                    onClick={() => navigate(`/print?edition=${pub.printEditionKey}`)}
                    className="py-2.5 px-4 bg-[#F9F7F2] hover:bg-[#EFECE6] text-[#1D1D1B] border border-[#1D1D1B] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    title="توليد وعرض النسخة الورقية للطباعة أو التصدير PDF"
                  >
                    <Printer className="w-4 h-4 text-[#8A1F1D]" />
                    <span>طباعة ورقية (PDF)</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredPublications.length === 0 && (
          <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-8 text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-[#C4A484] mx-auto" />
            <h3 className="font-bold text-base text-[#1D1D1B]">لم يتم العثور على نتائج مطابقة لبحثك</h3>
            <p className="text-xs text-[#1D1D1B]/70">
              يرجى تجربة كلمات بحث أخرى أو إعادة ضبط التصنيف للكل.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold cursor-pointer"
            >
              عرض جميع المطبوعات
            </button>
          </div>
        )}

        {/* Academic Legal Footnote & Accreditation */}
        <section className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 space-y-3 text-right">
          <div className="flex items-center gap-2 border-b border-[#1D1D1B]/15 pb-2">
            <ShieldCheck className="w-5 h-5 text-[#C4A484]" />
            <h3 className="font-bold text-sm sm:text-base text-[#1D1D1B]">
              بيانات التوثيق والاعتماد الأكاديمي لمطبوعات المنصة
            </h3>
          </div>
          <p className="text-xs text-[#1D1D1B]/80 leading-relaxed">
            كافة المطبوعات والكتب الصادرة عن منصة «المحاسبة ببساطة وإتقان» مسجلة ومودعة قانوناً بدار الكتب والوثائق القومية المصرية، ومتوافقة بنسبة 100% مع معايير المحاسبة المصرية (EAS) ومواصفات الورقة الامتحانية المعتمدة من المركز القومي للامتحانات والتقويم التربوي لشهادة البكالوريا المصرية (EB). يُحظر الاقتباس التجاري دون إذن كتابي رسمي من هيئة التحرير.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#1D1D1B]/60 font-mono pt-1">
            <span>© 2026 جميع الحقوق محفوظة لهيئة التأليف والنشر</span>
            <span>•</span>
            <span>النسخة الورقية مصممة وفق مقاس الطباعة القياسي A4 الدولي</span>
          </div>
        </section>
      </main>
    </div>
  );
};
