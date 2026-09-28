import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  PenTool, 
  Compass, 
  Calculator, 
  FileText, 
  BarChart3, 
  GraduationCap, 
  Clock, 
  ExternalLink, 
  Zap, 
  Target, 
  HelpCircle, 
  Check, 
  Printer, 
  FileCheck, 
  BrainCircuit, 
  Building2, 
  Scale,
  Library
} from 'lucide-react';
import { bookMetadata } from '../data/bookMetadata';

interface CoverPageProps {
  onStartReading: () => void;
  onOpenAnalysis: (unitId?: 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5' | 'unit-6' | 'unit-7' | 'unit-8' | 'unit-9' | 'unit-10') => void;
  onOpenGlossary?: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ 
  onStartReading, 
  onOpenAnalysis,
  onOpenGlossary 
}) => {
  const navigate = useNavigate();
  const [activePillar, setActivePillar] = useState<'overview' | 'curriculum' | 'pedagogy' | 'simulators' | 'assessment'>('overview');

  // The 10 Official Units Specification
  const platformUnits = [
    {
      id: 'unit-1',
      number: 'الأولى',
      num: 1,
      title: 'المبادئ والمفاهيم المحاسبية والبيئة الاقتصادية',
      pages: 'ص 1 - 40',
      lessonsCount: 6,
      desc: 'الأسس النظرية، معادلة المركز المالي، الشخصية المعنوية، والمدخل الواقعي لدراسة حالة مخبز مريم بالإسكندرية.',
      badge: 'الأساس المفاهيمي'
    },
    {
      id: 'unit-2',
      number: 'الثانية',
      num: 2,
      title: 'التسجيل المحاسبي ونظرية القيد المزدوج ودورة اليومية والأستاذ',
      pages: 'ص 41 - 80',
      lessonsCount: 6,
      desc: 'قواعد المديونية والدائنية، يومية العمليات، الترحيل لحسابات الأستاذ T، وميزان المراجعة الأولي.',
      badge: 'النظام المحاسبي'
    },
    {
      id: 'unit-3',
      number: 'الثالثة',
      num: 3,
      title: 'الدفاتر المحاسبية المساعدة وحسابات المراقبة الإجمالية',
      pages: 'ص 8 - 98',
      lessonsCount: 6,
      desc: 'دفاتر المبيعات والمشتريات الآجلة، المردودات، الخصم التجاري والتعجيل، دفتر النقدية، والسلفة المستديمة وحالة بلال.',
      badge: 'التخصص والرقابة'
    },
    {
      id: 'unit-4',
      number: 'الرابعة',
      num: 4,
      title: 'ميزان المراجعة واكتشاف الأخطاء المحاسبية وتصحيحها',
      pages: 'ص 99 - 140',
      lessonsCount: 6,
      desc: 'توازن ميزان المراجعة بالمجاميع والأرصدة، الأخطاء غير المؤثرة، أخطاء عدم التوازن، وحساب المعلق وتصحيح القيود.',
      badge: 'التدقيق والتسوية'
    },
    {
      id: 'unit-5',
      number: 'الخامسة',
      num: 5,
      title: 'الحسابات الختامية والقوائم المالية والتسويات الجردية',
      pages: 'ص 141 - 180',
      lessonsCount: 6,
      desc: 'قائمة الدخل، قائمة المركز المالي، مبدأ الاستحقاق، جرد المقدمات والمستحقات، وتسوية مخزون آخر المدة.',
      badge: 'الإفصاح المالي'
    },
    {
      id: 'unit-6',
      number: 'السادسة',
      num: 6,
      title: 'السجلات المحاسبية غير المكتملة ونظم القيد المفرد والرقابة',
      pages: 'ص 181 - 220',
      lessonsCount: 6,
      desc: 'تحديد نتيجة الأعمال بمقارنة حقوق الملكية، التحول للمنظومة المزدوجة، والرقابة على دفاتر المنشآت الفردية.',
      badge: 'التحليل الاستقصائي'
    },
    {
      id: 'unit-7',
      number: 'السابعة',
      num: 7,
      title: 'إهلاك الأصول الثابتة، المخصصات واستبعاد الأصول',
      pages: 'ص 161 - 200',
      lessonsCount: 5,
      desc: 'طرق القسط الثابت والمتناقص، مخصص الإهلاك المتراكم، استبعاد وبيع الأصول الثابتة، وأرباح وخسائر الرأسمالية.',
      badge: 'إدارة الأصول'
    },
    {
      id: 'unit-8',
      number: 'الثامنة',
      num: 8,
      title: 'محاسبة شركات الأشخاص وتوزيع الأرباح وقرض الشريك',
      pages: 'ص 201 - 230',
      lessonsCount: 5,
      desc: 'عقد التضامن والتوصية، الحسابات الجارية للشركاء، توزيع الأرباح والخسائر، فائدة رأس المال، وقرض الشريك.',
      badge: 'شركات الأشخاص'
    },
    {
      id: 'unit-9',
      number: 'التاسعة',
      num: 9,
      title: 'محاسبة شركات الأموال والمساهمة (الأسهم، السندات والأرباح)',
      pages: 'ص 1 - 26',
      lessonsCount: 6,
      desc: 'طبيعة شركة المساهمة، إصدار الأسهم النقدية والأقساط، زيادة الاكتتاب، إصدار السندات وفوائدها، وتوزيع الأرباح.',
      badge: 'شركات الأموال'
    },
    {
      id: 'unit-10',
      number: 'العاشرة',
      num: 10,
      title: 'تحليل القوائم المالية وتفسير النسب المحاسبية واتخاذ القرار',
      pages: 'ص 45 - 74',
      lessonsCount: 6,
      desc: 'نسب السيولة، هوامش الربحية، معدلات كفاءة دوران المخزون، المقارنة بين الشركات، ومقال الحكم JRE للمفاضلة الاستثمارية.',
      badge: 'التحليل والقرار'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1D1D1B] font-serif selection:bg-[#C4A484] selection:text-[#1D1D1B] pb-16">
      
      {/* 1. TOP OFFICIAL MASTHEAD & HERO */}
      <section className="border-b-2 border-[#1D1D1B] bg-[#FFFFFF] px-4 sm:px-8 pt-8 pb-12 shadow-xs">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Institutional Top Bar Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1D1D1B]/15">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-serif font-black text-xl border border-[#1D1D1B]">
                ١١
              </div>
              <div>
                <span className="inline-block border border-[#1D1D1B] bg-[#F9F7F2] text-[#1D1D1B] text-xs font-bold px-3 py-0.5 uppercase tracking-wider">
                  المنظومة الرقمية الوطنية المعتمدة • مسار الأعمال
                </span>
                <p className="text-xs text-[#1D1D1B]/70 mt-1 font-serif">
                  جمهورية مصر العربية • وزارة التربية والتعليم والتعليم الفني • البكالوريا المصرية الحديثة 2027
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#F9F7F2] px-3.5 py-1.5 border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B]">
                <ShieldCheck className="w-4 h-4 text-[#C4A484]" />
                <span>معايير البكالوريا الدولية (Advised by IB Approach)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1D1D1B] text-[#C4A484] px-3.5 py-1.5 text-xs font-bold font-mono">
                <span>تغطية معتمدة 100% (الوحدات 1 - 10)</span>
              </div>
            </div>
          </div>

          {/* Main Title & Vision Block */}
          <div className="text-center sm:text-right space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#1D1D1B] text-[#C4A484] px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>المحاسبة المالية للبكالوريا المصرية • الصف الثاني الثانوي</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1D1D1B] tracking-tight leading-tight">
              {bookMetadata.title}
            </h1>

            <h2 className="text-lg sm:text-2xl font-bold text-[#1D1D1B]/80 max-w-4xl leading-snug">
              {bookMetadata.subtitle}
            </h2>

            <p className="text-base sm:text-lg text-[#1D1D1B]/75 max-w-3xl leading-relaxed border-r-4 border-[#C4A484] pr-4 italic">
              «{bookMetadata.slogan}»
            </p>
          </div>

          {/* Core Reality Metrics (ما تم إنجازه بالفعل بالأرقام الحقيقية) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
            <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-center space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#1D1D1B] font-mono">10</span>
              <span className="text-xs font-bold text-[#1D1D1B]">وحدات دراسية</span>
              <p className="text-[11px] text-[#1D1D1B]/60 leading-tight">تطابق تام لكتاب الوزارة</p>
            </div>

            <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-center space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#1D1D1B] font-mono">58</span>
              <span className="text-xs font-bold text-[#1D1D1B]">درساً نموذجياً</span>
              <p className="text-[11px] text-[#1D1D1B]/60 leading-tight">شروحات ومسائل وأسئلة</p>
            </div>

            <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-center space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#1D1D1B] font-mono">5</span>
              <span className="text-xs font-bold text-[#1D1D1B]">امتحانات محاكية</span>
              <p className="text-[11px] text-[#1D1D1B]/60 leading-tight">50 درجة وضوابط زمنية</p>
            </div>

            <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-center space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#C4A484] font-mono">20/20</span>
              <span className="text-xs font-bold text-[#1D1D1B]">محرك مقال JRE</span>
              <p className="text-[11px] text-[#1D1D1B]/60 leading-tight">سلّم الاستدلال الخماسي</p>
            </div>

            <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-center space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#1D1D1B] font-mono">3</span>
              <span className="text-xs font-bold text-[#1D1D1B]">محاكيات معملية</span>
              <p className="text-[11px] text-[#1D1D1B]/60 leading-tight">القيود، المستندات، الامتحانات</p>
            </div>

            <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-center space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#1D1D1B] font-mono">100%</span>
              <span className="text-xs font-bold text-[#1D1D1B]">مواءمة معيارية</span>
              <p className="text-[11px] text-[#1D1D1B]/60 leading-tight">تصنيف بلوم ونواتج LO</p>
            </div>
          </div>

          {/* Quick Primary Call to Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1D1D1B]/15">
            <div className="flex items-center gap-2 text-xs text-[#1D1D1B]/75 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>طبعة 2026 / 2027 الرقمية التفاعلية المعتمدة — المنهج المكتمل والموثق بنسبة 100%</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                id="hero-start-curriculum-button"
                onClick={onStartReading}
                className="px-6 py-3 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs sm:text-sm font-bold transition flex items-center gap-2 border border-[#1D1D1B] cursor-pointer shadow-xs"
              >
                <span>ابدأ تصفح المنهاج الكامل (الوحدات 1 - 10)</span>
                <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
              </button>

              <button
                id="hero-mock-exams-button"
                onClick={() => navigate('/assessment/mock-exams')}
                className="px-4 py-3 bg-[#C4A484] hover:bg-[#b89574] text-[#1D1D1B] text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border border-[#1D1D1B] cursor-pointer shadow-xs"
              >
                <Clock className="w-4 h-4" />
                <span>محاكي الامتحانات (5 امتحانات)</span>
              </button>

              <button
                id="hero-print-book-button"
                onClick={() => navigate('/print')}
                className="px-4 py-3 bg-[#0E1A2B] hover:bg-[#1A2D47] text-[#FDFCF7] text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border-2 border-[#C5A059] cursor-pointer shadow-sm"
                title="فتح النسخة المطبوعة الفاخرة المعتمدة للكتاب (A4 PDF)"
              >
                <Printer className="w-4 h-4 text-[#C5A059]" />
                <span>النسخة المطبوعة الفاخرة (الكتاب كاملاً)</span>
              </button>

              <button
                id="hero-library-button"
                onClick={() => navigate('/library')}
                className="px-4 py-3 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border border-[#C4A484] cursor-pointer shadow-xs"
                title="تصفح كافة مطبوعات وكتب المنصة في تبويب المكتبة"
              >
                <Library className="w-4 h-4 text-[#C4A484]" />
                <span>مكتبة المطبوعات (كل الكتب)</span>
              </button>

              <button
                id="hero-assessments-book-button"
                onClick={() => navigate('/print?edition=assessments')}
                className="px-4 py-3 bg-[#8A1F1D] hover:bg-[#701917] text-[#FFFFFF] text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border border-[#8A1F1D] cursor-pointer shadow-xs"
                title="كتاب الأداءات والتقييمات المدرسية المعتمدة (ص ۳ إلى ۸٤)"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>كتاب الأداءات والتقييمات (ص ۳ - ۸٤)</span>
              </button>

              <button
                id="hero-simulators-button"
                onClick={() => navigate('/training')}
                className="px-4 py-3 bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border border-[#1D1D1B] cursor-pointer shadow-xs"
              >
                <Calculator className="w-4 h-4 text-[#C4A484]" />
                <span>المحاكيات والمعامل الرقمية</span>
              </button>

              <button
                id="hero-methodology-button"
                onClick={() => onOpenAnalysis('unit-10')}
                className="px-3.5 py-3 bg-[#F9F7F2] hover:bg-[#FFFFFF] text-[#1D1D1B] text-xs font-bold transition flex items-center gap-1.5 border border-[#1D1D1B]/30 cursor-pointer"
                title="استعراض تقرير النزاهة والمطابقة المنهجية"
              >
                <ShieldCheck className="w-4 h-4 text-[#C4A484]" />
                <span>مطابقة المنهج والاعتماد</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE PILLARS SWITCHER (استعراض أعمدة القدرة التعليمية والتربوية والتقنية) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-12 space-y-6">
        
        {/* Navigation Tabs for Pillars */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#1D1D1B] pb-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1B]">
              ركائز المنظومة المكتملة وإمكاناتها الميدانية
            </h3>
            <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-0.5">
              استكشف عمق التغطية المعرفية والتربوية والأدوات التقنية التي تم بناؤها واختبارها بالكامل
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <button
              id="pillar-tab-overview"
              onClick={() => setActivePillar('overview')}
              className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer border ${
                activePillar === 'overview'
                  ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B]'
                  : 'bg-[#FFFFFF] text-[#1D1D1B] hover:bg-[#F9F7F2] border-[#1D1D1B]/20'
              }`}
            >
              نظرة عامة والقدرات الكبرى
            </button>
            <button
              id="pillar-tab-curriculum"
              onClick={() => setActivePillar('curriculum')}
              className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer border ${
                activePillar === 'curriculum'
                  ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B]'
                  : 'bg-[#FFFFFF] text-[#1D1D1B] hover:bg-[#F9F7F2] border-[#1D1D1B]/20'
              }`}
            >
              المنهاج (الوحدات 1 - 10)
            </button>
            <button
              id="pillar-tab-pedagogy"
              onClick={() => setActivePillar('pedagogy')}
              className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer border ${
                activePillar === 'pedagogy'
                  ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B]'
                  : 'bg-[#FFFFFF] text-[#1D1D1B] hover:bg-[#F9F7F2] border-[#1D1D1B]/20'
              }`}
            >
              البعد التربوي ومحرك JRE
            </button>
            <button
              id="pillar-tab-simulators"
              onClick={() => setActivePillar('simulators')}
              className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer border ${
                activePillar === 'simulators'
                  ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B]'
                  : 'bg-[#FFFFFF] text-[#1D1D1B] hover:bg-[#F9F7F2] border-[#1D1D1B]/20'
              }`}
            >
              المحاكيات والمعامل الرقمية
            </button>
            <button
              id="pillar-tab-assessment"
              onClick={() => setActivePillar('assessment')}
              className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer border ${
                activePillar === 'assessment'
                  ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B]'
                  : 'bg-[#FFFFFF] text-[#1D1D1B] hover:bg-[#F9F7F2] border-[#1D1D1B]/20'
              }`}
            >
              التقويم والمسار التكيفي
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & SYSTEM CAPACITY */}
        {activePillar === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#FFFFFF] border border-[#1D1D1B] p-6 space-y-4 shadow-xs">
                <div className="w-10 h-10 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#1D1D1B]">القدرة التعليمية الشاملة</h4>
                <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed">
                  تغطية كاملة وشاملة لمنهاج المحاسبة المالية بالصف الثاني الثانوي من الوحدة الأولى وحتى العاشرة، بتسلسل تعليمي منظم يربط النظرية بالتطبيق العملي وفق المعايير المصرية والدولية.
                </p>
                <ul className="text-xs text-[#1D1D1B]/80 space-y-1.5 pt-2 border-t border-[#1D1D1B]/15">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>58 درساً مبنياً وفق هرمية المفاهيم ونواتج التعلم</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>أمثلة محلولة نموذجية ومسائل متدرجة الصعوبة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>فقرات «فكر كمحاسب» و«انتبه للفخاخ الامتحانية»</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FFFFFF] border border-[#1D1D1B] p-6 space-y-4 shadow-xs">
                <div className="w-10 h-10 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-bold">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#1D1D1B]">القدرة التربوية والتفكير الناقد</h4>
                <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed">
                  الانتقال الجوهري من أسلوب التلقين الآلي إلى مهارات الاستدلال المالي وصناعة الأحكام المبررة، عبر محرك مقال التفسير المحاسبي المدعوم بالأدلة (JRE) المعزز بسلم الـ 20 درجة الرسمي.
                </p>
                <ul className="text-xs text-[#1D1D1B]/80 space-y-1.5 pt-2 border-t border-[#1D1D1B]/15">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>الهيكل الخماسي لمقال JRE (تأطير، حجة، قيد، نقد، حكم)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>دراسات حالة اقتصادية من واقع مجتمع الأعمال المصري</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>تنمية التفكير الشكي المهني (Professional Skepticism)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FFFFFF] border border-[#1D1D1B] p-6 space-y-4 shadow-xs">
                <div className="w-10 h-10 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#1D1D1B]">القدرة التقنية والمعملية</h4>
                <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed">
                  بنية برمجية معمارية فائقة الدقة والسرعة (TypeScript + React)، توفر بيئة معملية حية للتسجيل المزدوج، محاكاة الدورة المستندية، ومحاكي الامتحانات السيكومتري الإلكتروني.
                </p>
                <ul className="text-xs text-[#1D1D1B]/80 space-y-1.5 pt-2 border-t border-[#1D1D1B]/15">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>محاكيات تفاعلية للقيود والدفاتر ومطابقة الرقابة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>وضع التركيز الخالي من المشتتات والتحكم بحجم الخط</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>محرك تصدير وطباعة أكاديمي متكامل لكافة الوحدات</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Quick Overview Showcase Banner */}
            <div className="bg-[#1D1D1B] text-[#F9F7F2] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-right">
                <span className="text-xs font-mono text-[#C4A484] font-bold">
                  جاهزية تشغيلية كاملة للمدارس والطلاب والمعلمين
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  منظومة تجمع بين كتاب الطالب، محاكي التدريب، وبنك الامتحانات في منصة واحدة
                </h3>
                <p className="text-xs sm:text-sm text-[#F9F7F2]/75 max-w-2xl">
                  لا حاجة لمصادر خارجية مشتتة؛ تجد هنا كل ما يلزم للتفوق في اختبارات البكالوريا واكتساب المهارات المحاسبية المهنية الحقيقية.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => navigate('/curriculum')}
                  className="px-5 py-2.5 bg-[#C4A484] hover:bg-[#b89574] text-[#1D1D1B] font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>استكشف المنهاج كاملاً</span>
                </button>
                <button
                  onClick={() => navigate('/assessment/mock-exams')}
                  className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B] font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#C4A484]" />
                  <span>دخول محاكي الامتحانات</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURRICULUM (THE 10 UNITS BREAKDOWN) */}
        {activePillar === 'curriculum' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#FFFFFF] p-4 border border-[#1D1D1B]/20">
              <div>
                <h4 className="text-base font-bold text-[#1D1D1B]">فهرس الوحدات العشر المعتمدة (كامل المنهج المقرر)</h4>
                <p className="text-xs text-[#1D1D1B]/70">58 درساً تفاعلياً مصمماً طبقاً للأهداف السلوكية والمعرفية الرسمية</p>
              </div>
              <button
                onClick={() => navigate('/curriculum')}
                className="text-xs font-bold text-[#1D1D1B] hover:text-[#8A1F1D] flex items-center gap-1 border-b border-[#1D1D1B]"
              >
                <span>فتح صفحة المنهج الممتدة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformUnits.map((u) => (
                <div
                  key={u.id}
                  className="bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] p-5 space-y-3 transition group shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-bold text-xs font-mono">
                        {u.num}
                      </span>
                      <span className="text-xs font-bold text-[#1D1D1B] font-mono">الوحدة {u.number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#F9F7F2] text-[#1D1D1B]/80 border border-[#1D1D1B]/15 text-[10px] font-bold px-2 py-0.5 font-mono">
                        {u.pages}
                      </span>
                      <span className="bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold px-2 py-0.5">
                        {u.badge}
                      </span>
                    </div>
                  </div>

                  <h5 className="font-bold text-sm sm:text-base text-[#1D1D1B] group-hover:text-[#8A1F1D] transition-colors leading-snug">
                    {u.title}
                  </h5>

                  <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
                    {u.desc}
                  </p>

                  <div className="pt-2 border-t border-[#1D1D1B]/10 flex items-center justify-between text-xs">
                    <span className="text-[#1D1D1B]/60 font-mono text-[11px]">
                      {u.lessonsCount} دروس تفاعلية
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/curriculum/${u.id}`)}
                        className="px-2.5 py-1 bg-[#F9F7F2] hover:bg-[#1D1D1B] hover:text-[#F9F7F2] text-[#1D1D1B] text-[11px] font-bold border border-[#1D1D1B]/20 transition cursor-pointer"
                      >
                        خريطة الوحدة
                      </button>
                      <button
                        onClick={() => navigate(`/curriculum/${u.id}/lessons/lesson-1`)}
                        className="px-3 py-1 bg-[#1D1D1B] text-[#F9F7F2] text-[11px] font-bold hover:bg-[#333330] transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>ادرس الوحدة</span>
                        <ArrowLeft className="w-3 h-3 text-[#C4A484]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PEDAGOGICAL DEPTH & JRE REASONING ENGINE */}
        {activePillar === 'pedagogy' && (
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#1D1D1B]/15 pb-4">
                <div className="p-2.5 bg-[#1D1D1B] text-[#C4A484]">
                  <PenTool className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#1D1D1B]">
                    محرك التفسير المحاسبي المدعوم بالأدلة (JRE Reasoning Engine)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-0.5">
                    Judgement & Reasoned Explanation • جوهر التقييم الحديث في اختبارات البكالوريا المصرية
                  </p>
                </div>
              </div>

              <div className="prose text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed max-w-none">
                <p>
                  يمثل سؤال الـ <strong>JRE</strong> الركيزة الأساسية للتمييز بين الحفظ النمطي للقيود المحاسبية وبين بناء عقلية مالية استشارية قادرة على نقد الأرقام وفهم الآثار الاقتصادية للقرارات. لا يُكتفى في مقال الـ JRE بصحة الناتج الرياضي، بل يُحاسب الطالب على مهارات الحِجاج المالي وفق سلم تقييم رسمي من 20 درجة مقسم إلى خمسة محاور:
                </p>
              </div>

              {/* The 5 Pillars of JRE Rubric */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                <div className="p-3.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-1 text-right">
                  <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">
                    المحور 1 (4 درجات)
                  </span>
                  <h5 className="font-bold text-xs text-[#1D1D1B] mt-1">المقدمة والتأطير المفاهيمي</h5>
                  <p className="text-[11px] text-[#1D1D1B]/70 leading-normal">
                    تأطير المشكلة، تحديد أطراف النزاع المالي، وتوضيح الفروض المحاسبية الحاكمة.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-1 text-right">
                  <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">
                    المحور 2 (4 درجات)
                  </span>
                  <h5 className="font-bold text-xs text-[#1D1D1B] mt-1">الحجة الأولى والأدلة الرقمية</h5>
                  <p className="text-[11px] text-[#1D1D1B]/70 leading-normal">
                    بناء أطروحة قوية مدعومة بحسابات كمية ومؤشرات وأثر المعاملة على القوائم.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-1 text-right">
                  <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">
                    المحور 3 (4 درجات)
                  </span>
                  <h5 className="font-bold text-xs text-[#1D1D1B] mt-1">الحجة المقابلة والمحددات</h5>
                  <p className="text-[11px] text-[#1D1D1B]/70 leading-normal">
                    كشف عيوب وجهة النظر الأخرى، والوعي بالقيود التاريخية والتقدير المحاسبي.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-1 text-right">
                  <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">
                    المحور 4 (4 درجات)
                  </span>
                  <h5 className="font-bold text-xs text-[#1D1D1B] mt-1">الموازنة والتقييم النقدي</h5>
                  <p className="text-[11px] text-[#1D1D1B]/70 leading-normal">
                    المفاضلة العادلة بين الرأيين، تفنيد الحتمية، وربط الأرقام بالأثر التشغيلي.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-1 text-right">
                  <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5">
                    المحور 5 (4 درجات)
                  </span>
                  <h5 className="font-bold text-xs text-[#1D1D1B] mt-1">الحكم النهائي والتوصية</h5>
                  <p className="text-[11px] text-[#1D1D1B]/70 leading-normal">
                    إصدار حكم مهني متوازن مقرون ببيان الشروط والتحفظات والبدائل الاستثمارية.
                  </p>
                </div>
              </div>

              {/* Case Studies Gallery */}
              <div className="border-t border-[#1D1D1B]/15 pt-4 space-y-3">
                <span className="text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#C4A484]" />
                  <span>دراسات الحالة الاقتصادية المعتمدة في المنهاج:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                    <span className="font-bold text-xs text-[#1D1D1B] block">حالة مخبز مريم (الوحدة 1)</span>
                    <p className="text-[11px] text-[#1D1D1B]/70 mt-1">الفصل بين الذمة المالية الشخصية والمنشأة وتأثيرها على المركز المالي.</p>
                  </div>
                  <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                    <span className="font-bold text-xs text-[#1D1D1B] block">حالة محلات بلال (الوحدة 3)</span>
                    <p className="text-[11px] text-[#1D1D1B]/70 mt-1">جدلية تخصص الدفاتر المساعدة وعلاقتها بتعزيز الرقابة الداخلية ومخاطر الفصل.</p>
                  </div>
                  <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                    <span className="font-bold text-xs text-[#1D1D1B] block">المفاضلة الاستثمارية (الوحدة 10)</span>
                    <p className="text-[11px] text-[#1D1D1B]/70 mt-1">المفاضلة بين الربحية المرتفعة والسيولة الحرجة مقابل الأمان المالي وسرعة الدوران.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => navigate('/training/jre')}
                  className="px-5 py-2 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold hover:bg-[#333330] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>التدرب في محاكي مقال JRE التفاعلي</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: SIMULATORS & TECHNICAL LABS */}
        {activePillar === 'simulators' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Simulator 1: Journal & T-Accounts */}
              <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold font-mono">
                      معمل الممارسة الحية
                    </span>
                    <Calculator className="w-5 h-5 text-[#C4A484]" />
                  </div>
                  <h4 className="text-base font-bold text-[#1D1D1B]">محاكي القيود المزدوجة والأستاذ T</h4>
                  <p className="text-xs text-[#1D1D1B]/75 leading-relaxed">
                    بيئة تفاعلية لاختبار توازن القيد المزدوج، ترحيل المعاملات لحظياً إلى حسابات الأستاذ ذات الحرف T، والتحقق التلقائي من تطابق مجموع المديونية والدائنية في ميزان المراجعة.
                  </p>
                  <div className="text-[11px] text-[#1D1D1B]/70 space-y-1 bg-[#F9F7F2] p-2.5 border border-[#1D1D1B]/15">
                    <div>• تدريب فوري على طرفي المعاملة (من حـ / إلى حـ)</div>
                    <div>• احتساب آلي للأرصدة المرحلة والمنقولة</div>
                    <div>• كشف أخطاء عدم التوازن وتوضيح الفروق</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/training/simulators')}
                  className="w-full py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>فتح محاكي القيود والأستاذ</span>
                </button>
              </div>

              {/* Simulator 2: Documentary Cycle */}
              <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold font-mono">
                      الرقابة والتدقيق
                    </span>
                    <Layers className="w-5 h-5 text-[#C4A484]" />
                  </div>
                  <h4 className="text-base font-bold text-[#1D1D1B]">محاكي الدورة المستندية والرقابة الداخلية</h4>
                  <p className="text-xs text-[#1D1D1B]/75 leading-relaxed">
                    تتبع حركة المستندات المالية (فواتير الشراء والبيع، إشعارات الخصم والإضافة، أوامر الدفع)، ومطابقة حركة الدفاتر المساعدة مع حسابات المراقبة الإجمالية لمنع التلاعب والاختلاس.
                  </p>
                  <div className="text-[11px] text-[#1D1D1B]/70 space-y-1 bg-[#F9F7F2] p-2.5 border border-[#1D1D1B]/15">
                    <div>• تدفق المستند الأصلي حتى القيد الدفتري</div>
                    <div>• مطابقة أستاذ مساعد العملاء والموردين</div>
                    <div>• تشخيص العجز والفروق الدفترية عملياً</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/training/documentary-cycle')}
                  className="w-full py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>فتح محاكي الدورة المستندية</span>
                </button>
              </div>

              {/* Simulator 3: Exam Simulator */}
              <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold font-mono">
                      التقييم الوزاري الرقمي
                    </span>
                    <Clock className="w-5 h-5 text-[#C4A484]" />
                  </div>
                  <h4 className="text-base font-bold text-[#1D1D1B]">محاكي الامتحانات المعياري الرسمي</h4>
                  <p className="text-xs text-[#1D1D1B]/75 leading-relaxed">
                    منظومة اختبارات كاملة تحاكي ضوابط وتوقيت الورقة الوزارية الحقيقية للبكالوريا (50 درجة لكل امتحان)، مع تصحيح آلي فوري، وإتاحة نماذج الإجابة وسلالم التصحيح النموذجية.
                  </p>
                  <div className="text-[11px] text-[#1D1D1B]/70 space-y-1 bg-[#F9F7F2] p-2.5 border border-[#1D1D1B]/15">
                    <div>• 5 امتحانات وزارية كاملة المواصفات</div>
                    <div>• مؤقت زمني دقيق وإيقاف مؤقت وتقرير نهائي</div>
                    <div>• بنك الأسئلة المربوط بنواتج التعلم LO</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/assessment/mock-exams')}
                  className="w-full py-2.5 bg-[#C4A484] hover:bg-[#b89574] text-[#1D1D1B] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>دخول محاكي الامتحانات</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: ASSESSMENT & ADAPTIVE LEARNING */}
        {activePillar === 'assessment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Card 1: كتاب الأداءات والتقييمات المدرسية المعتمدة */}
              <div className="bg-[#FFFFFF] border-2 border-[#8A1F1D] p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#8A1F1D]/20 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#8A1F1D]" />
                      <h4 className="font-bold text-base text-[#8A1F1D]">كتاب الأداءات والتقييمات المعتمد</h4>
                    </div>
                    <span className="bg-[#8A1F1D] text-white text-[10px] font-bold px-2 py-0.5">
                      ص ۳ إلى ۸٤
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed">
                    تفريغ شامل لـ <strong>۲۸۸ مفرداً وتدريباً وزارياً</strong> تشمل الأنشطة الصفية، الواجبات المنزلية، والتقييمات الأسبوعية الثلاثية (أ، ب، ج) واختبارات الشهور للوحدات من 1 إلى 5 مع نماذج الإجابات وسلالم الدرجات.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 bg-[#FFF5F5] border border-[#8A1F1D]/20">
                      <span className="font-bold block text-[#8A1F1D]">288 سؤالاً</span>
                      <span className="text-[#8A1F1D]/75 text-[11px]">أداءات وتقييمات</span>
                    </div>
                    <div className="p-2 bg-[#FFF5F5] border border-[#8A1F1D]/20">
                      <span className="font-bold block text-[#8A1F1D]">مرفق الحلول</span>
                      <span className="text-[#8A1F1D]/75 text-[11px]">سلالم تصحيح وزارية</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => navigate('/assessment/ministry-assessments')}
                    className="w-full py-2 bg-[#8A1F1D] text-white text-xs font-bold hover:bg-[#701917] transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-300" />
                    <span>تصفح الأداءات والتقييمات</span>
                  </button>
                  <button
                    onClick={() => navigate('/print?edition=assessments')}
                    className="w-full py-1.5 bg-[#F9F7F2] text-[#8A1F1D] border border-[#8A1F1D]/30 text-xs font-bold hover:bg-[#8A1F1D]/10 transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة الكتاب الورقي الفاخر</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#1D1D1B] p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 border-b border-[#1D1D1B]/15 pb-3">
                    <Target className="w-5 h-5 text-[#C4A484]" />
                    <h4 className="font-bold text-base text-[#1D1D1B]">بنك الأسئلة الموحد ونواتج التعلم (LOs)</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed">
                    تمت فهرسة مئات الأسئلة في بنك الأسئلة الموحد وربط كل سؤال بناتج تعلم مستهدف (`Learning Outcome`) وبمستوى معرفي محدد طبقاً لتصنيف بلوم (معرفة، فهم، تطبيق، تحليل، تركيب، تقويم).
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                      <span className="font-bold block text-[#1D1D1B]">تصفية تفاعلية</span>
                      <span className="text-[#1D1D1B]/60 text-[11px]">حسب الوحدة والدرس والمستوى</span>
                    </div>
                    <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                      <span className="font-bold block text-[#1D1D1B]">تغذية راجعة فورية</span>
                      <span className="text-[#1D1D1B]/60 text-[11px]">مع التبرير المحاسبي لكل إجابة</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/assessment/question-bank')}
                  className="w-full py-2 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold hover:bg-[#333330] transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>تصفح بنك الأسئلة الموحد</span>
                </button>
              </div>

              <div className="bg-[#FFFFFF] border border-[#1D1D1B] p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 border-b border-[#1D1D1B]/15 pb-3">
                    <TrendingUp className="w-5 h-5 text-[#C4A484]" />
                    <h4 className="font-bold text-base text-[#1D1D1B]">مسار الطالب التكيفي ولوحات التحليل (My Path)</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed">
                    خوارزمية ذكية تتتبع تفاعلات الطالب وإجاباته في المحاكيات والاختبارات، لتحدد بدقة مكامن القوة ونقاط الضعف المعرفية وتقترح دروساً ومسائل مراجعة موجهة لسد الفجوات.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                      <span className="font-bold block text-[#1D1D1B]">لوحة المعلم</span>
                      <span className="text-[#1D1D1B]/60 text-[11px]">متابعة الأداء الجماعي ومعدلات الإنجاز</span>
                    </div>
                    <div className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/10">
                      <span className="font-bold block text-[#1D1D1B]">القاموس الموحد</span>
                      <span className="text-[#1D1D1B]/60 text-[11px]">مصطلحات باللغتين العربية والإنجليزية</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/my-path')}
                  className="w-full py-2 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold hover:bg-[#333330] transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>عرض مسار إتقاني الشخصي</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </section>

      {/* 3. DIRECT ACCESS MATRIX (شبكة الوصول السريع المباشر لكافة أجزاء المنظومة) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-12 space-y-4">
        <div className="border-b border-[#1D1D1B]/20 pb-2">
          <h3 className="text-lg font-bold text-[#1D1D1B] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C4A484]" />
            <span>بوابة الانتقال السريع للمنصة (Direct Navigation Hub)</span>
          </h3>
          <p className="text-xs text-[#1D1D1B]/70">
            انتقل مباشرة إلى أي شاشة أو أداة معملية بنقرة واحدة
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          <button
            onClick={() => navigate('/curriculum')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>فهرس المنهج والدروس</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">الوحدات من 1 إلى 10 كاملة</p>
          </button>

          <button
            onClick={() => navigate('/training/jre')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>محاكي مقال JRE</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">سلم الـ 20 درجة ونماذج الوزارة</p>
          </button>

          <button
            onClick={() => navigate('/training/simulators')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>معمل القيود والأستاذ</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">القيد المزدوج وميزان المراجعة</p>
          </button>

          <button
            onClick={() => navigate('/training/documentary-cycle')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>الدورة المستندية</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">مطابقة الفواتير وحسابات المراقبة</p>
          </button>

          <button
            onClick={() => navigate('/assessment/question-bank')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>بنك الأسئلة الموحد</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">مئات الأسئلة ونواتج التعلم LO</p>
          </button>

          <button
            onClick={() => navigate('/assessment/ministry-assessments')}
            className="p-3 bg-[#FFF5F5] border-2 border-[#8A1F1D] hover:border-[#701917] text-right space-y-1 transition hover:bg-[#FFEBEB] cursor-pointer shadow-xs"
          >
            <span className="font-bold text-[#8A1F1D] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#8A1F1D]" />
              <span>الأداءات والتقييمات</span>
            </span>
            <p className="text-[11px] text-[#8A1F1D]/80">كتاب الوزارة ص ۳ إلى ۸٤ كاملة</p>
          </button>

          <button
            onClick={() => navigate('/assessment/mock-exams')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>الامتحانات المحاكية</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">5 امتحانات رسمية بضوابط زمنية</p>
          </button>

          <button
            onClick={() => navigate('/my-path')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>مساري التكيفي</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">تشخيص نقاط القوة والضعف</p>
          </button>

          <button
            onClick={() => navigate('/print')}
            className="p-3 bg-[#FFFFFF] border border-[#1D1D1B]/20 hover:border-[#1D1D1B] text-right space-y-1 transition hover:bg-[#F9F7F2] cursor-pointer"
          >
            <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>مركز الطباعة والتصدير</span>
            </span>
            <p className="text-[11px] text-[#1D1D1B]/65">تحويل المنهج والاختبارات لملازم A4</p>
          </button>

        </div>
      </section>

      {/* 4. OFFICIAL SEAL & PEDAGOGICAL STATEMENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1D1D1B] flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C4A484]" />
              <span>شهادة المطابقة والأصالة الأكاديمية (Academic Authenticity Guarantee)</span>
            </span>
            <p className="text-xs text-[#1D1D1B]/70 max-w-2xl leading-relaxed">
              تمت مراجعة وهندسة المحتوى وفق أحدث توجيهات وزارة التربية والتعليم والتعليم الفني المصرية، مع الالتزام بالمعايير القياسية والتقويمية المعتمدة ونماذج الإجابة الرسمية.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAnalysis('unit-10')}
              className="px-4 py-2 bg-[#1D1D1B] text-[#F9F7F2] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>عرض وثيقة المطابقة</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C4A484]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
