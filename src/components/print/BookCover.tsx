import React from 'react';
import { 
  Award, BookOpen, CheckCircle2, ShieldCheck, Sparkles, 
  GraduationCap, QrCode, Bookmark, Scale, FileText, Check, AlertTriangle, Copyright, Layers
} from 'lucide-react';
import { bookMetadata } from '../../data/bookMetadata';

interface BookCoverProps {
  selectedUnitId?: string; // 'all' or 'unit-X'
  editionTitle?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ 
  selectedUnitId = 'all',
  editionTitle = 'نسخة الطالب الشاملة — الإصدار الأكاديمي المعتمد'
}) => {
  return (
    <div className="page-break-after space-y-12">
      
      {/* =========================================================================
          1. GRAND FRONT BOOK COVER (Egyptian Commercial Publishing Standard)
         ========================================================================= */}
      <div 
        id="book-front-cover"
        className="relative bg-[#0C1E36] text-[#FDFCF7] p-8 sm:p-12 border-8 border-[#C5A059] shadow-2xl flex flex-col justify-between min-h-[980px] overflow-hidden"
      >
        {/* Background Subtle Watermark Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <Scale className="w-[650px] h-[650px] text-[#C5A059]" />
        </div>

        {/* Decorative Inner Golden Border Frames */}
        <div className="absolute inset-2 sm:inset-3 border-2 border-[#C5A059]/40 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-[#C5A059]/20 pointer-events-none" />

        {/* 1. Official National & Ministerial Header */}
        <div className="relative z-10 border-b-2 border-[#C5A059]/60 pb-5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#E8DCC4]">
            <div className="space-y-1">
              <p className="tracking-wide text-sm font-black text-[#FFFFFF]">جمهورية مصر العربية</p>
              <p className="text-xs text-[#C5A059]">وزارة التربية والتعليم والتعليم الفني</p>
              <p className="text-[10px] text-[#E8DCC4]/80">قطاع التعليم العام والتجاري • الإدارة المركزية لتطوير المناهج</p>
            </div>

            <div className="text-center px-4 py-2 bg-[#1A2D47] border border-[#C5A059]/60 shadow-inner">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] block font-mono font-bold">
                EGYPTIAN BACCALAUREATE (EB)
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#FFFFFF]">
                سلسلة التميز الأكاديمي المعتمدة
              </span>
            </div>

            <div className="text-left space-y-1">
              <p className="font-mono text-xs text-[#C5A059] font-black">2026 / 2027</p>
              <p className="text-xs font-bold text-[#FFFFFF]">شهادة البكالوريا المصرية</p>
              <p className="text-[10px] text-[#E8DCC4]/80">مسار إدارة الأعمال • الصف 2</p>
            </div>
          </div>
        </div>

        {/* 2. Accreditation & Excellence Seals */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 my-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C5A059] text-[#0C1E36] font-extrabold text-xs shadow-md border border-[#E8DCC4]">
            <ShieldCheck className="w-4 h-4" />
            <span>مطابق 100% للمواصفات الوزارية وأحدث قرارات التطوير الأكاديمي</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A2D47] text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>طبعة فاخرة موثقة بدار الكتب</span>
          </div>
        </div>

        {/* 3. Grand Book Title Section */}
        <div className="relative z-10 text-center py-6 space-y-4">
          <div className="inline-block">
            <span className="text-xs sm:text-sm font-bold tracking-widest px-5 py-1.5 bg-[#1A2D47] text-[#C5A059] border border-[#C5A059]/60 uppercase shadow-inner">
              {editionTitle.includes('الأداءات') || editionTitle.includes('التقييمات')
                ? 'كتاب الأداءات والتقييمات المدرسية المعتمدة لشهادة البكالوريا المصرية'
                : editionTitle.includes('المصطلحات') || editionTitle.includes('معجم')
                ? 'كتيب الملحق المعجمي الرسمي المعتمد لشهادة البكالوريا المصرية'
                : 'الكتاب الخارجي المرجعي الأكبر في مصر لشهادة البكالوريا'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-[#FFFFFF] tracking-tight drop-shadow-md leading-tight">
            {editionTitle.includes('الأداءات') || editionTitle.includes('التقييمات')
              ? 'الأداءات والتقييمات'
              : editionTitle.includes('المصطلحات') || editionTitle.includes('معجم')
              ? 'معجم المصطلحات والمفاهيم'
              : 'المحاسبة المالية'}
          </h1>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-0.5 w-16 sm:w-24 bg-[#C5A059]" />
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-[#C5A059] tracking-wide">
              {editionTitle.includes('الأداءات') || editionTitle.includes('التقييمات')
                ? 'المدرسية المعتمدة (ص ۳ - ۸٤)'
                : editionTitle.includes('المصطلحات') || editionTitle.includes('معجم')
                ? 'المحاسبية المعتمد (عربي — إنجليزي)'
                : 'ببساطة وإتقان'}
            </h2>
            <div className="h-0.5 w-16 sm:w-24 bg-[#C5A059]" />
          </div>

          <p className="text-xs sm:text-base text-[#E8DCC4] max-w-xl mx-auto font-sans leading-relaxed font-medium">
            {editionTitle.includes('الأداءات') || editionTitle.includes('التقييمات')
              ? 'تفريغ رسمي شامل لكافة الأنشطة الصفية والواجبات المنزلية والتقييمات الأسبوعية ونماذج الشهور، مربوطة بمستويات بلوم ونواتج التعلم الوزارية وسلالم التحكيم'
              : editionTitle.includes('المصطلحات') || editionTitle.includes('معجم')
              ? 'الدليل المعجمي المقنن: التفسير المبسط، التعريف الأكاديمي المعياري، التطبيق بالأرقام، وأخطر الأفخاخ الامتحانية لكافة الوحدات (1 - 10)'
              : 'المرجع المتكامل في الشرح النظري، التطبيقات المحلولة، الدورة المستندية، ودليل إتقان مقال الاستدلال المحاسبي الوزاري (JRE)'}
          </p>

          <div className="inline-block px-6 py-2 bg-[#781D28] text-[#FFFFFF] font-bold text-xs sm:text-sm border-2 border-[#C5A059] shadow-sm">
            {editionTitle.includes('الأداءات') || editionTitle.includes('التقييمات')
              ? 'توثيق رسمي ۲۸۸ مفرداً معتمداً • الوحدات 1 إلى 5 • نماذج أ، ب، ج كاملة بالحلول'
              : editionTitle.includes('المصطلحات') || editionTitle.includes('معجم')
              ? 'المنهاج المعتمد الكامل: 10 وحدات دراسية • كافة مصطلحات كتاب الوزارة • فهرس ألفبائي شامل'
              : selectedUnitId === 'all' 
                ? 'المنهاج المعتمد الكامل: 10 وحدات دراسية • 58 درساً مفصلاً • 250+ مسألة' 
                : `إصدار خاص: الوحدة المقررة (${selectedUnitId.replace('unit-', 'الوحدة ')})`}
          </div>
        </div>

        {/* 4. Book Pillars & Pedagogical Highlights Grid (Commercial Style) */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-3">
          
          {editionTitle.includes('الأداءات') || editionTitle.includes('التقييمات') ? (
            <>
              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>تفريغ الوزارة الرسمي (ص ۳ - ۸٤)</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  مطابقة أصلية 100% مع صفحات كتاب التدريبات والأداءات المدرسية المعتمد.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>288 مفرداً وتدريباً مصنفاً</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  فصل منهجي تام بين الأنشطة الصفية، الواجبات المنزلية، والتقييمات الأسبوعية.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>النماذج الثلاثية (أ، ب، ج)</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  استيفاء كافة مجموعات الأسئلة الأسبوعية لكافة الأسابيع والفترات الدراسية.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>تصنيف بلوم ونواتج التعلم LO</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  تحديد دقيق للمستوى المعرفي (تذكر، فهم، تطبيق، تحليل) ومؤشر الصعوبة.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Scale className="w-4 h-4 shrink-0" />
                  <span>مفاتيح الإجابة وسلالم التصحيح</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  مسار الحل التفصيلي والخطوات الرياضية والقيود والتبريرات المحاسبية المقننة.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Bookmark className="w-4 h-4 shrink-0" />
                  <span>الوحدات 1 إلى 5 مكتملة</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  المفاهيم، القيد المزدوج، الدفاتر المساعدة، ميزان المراجعة، والحسابات الختامية.
                </p>
              </div>
            </>
          ) : editionTitle.includes('المصطلحات') || editionTitle.includes('معجم') ? (
            <>
              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>10 وحدات و 58 درساً</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  تغطية شاملة لكافة مصطلحات الفروض، التسجيل، التسويات، الشركات، والتحليل.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>التعريف الأكاديمي المعياري</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  صياغة علمية دقيقة مطابقة لمعايير المحاسبة المصرية وتوصيفات المركز القومي.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Scale className="w-4 h-4 shrink-0" />
                  <span>المفهوم المبسط دون تعقيد</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  نماذج ذهنية مبسطة لترسيخ المعنى في ذهن الطالب وبناء حجج سؤال JRE.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>أمثلة رقمية من واقع السوق</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  أرقام واقعية وقيود محاسبية تثبت أثر كل مفهوم على القوائم المالية.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>رصد الأفخاخ الامتحانية</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  تنبيه صريح من المفاهيم الخاطئة التي يقع فيها الطلاب في أسئلة الامتحان.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Bookmark className="w-4 h-4 shrink-0" />
                  <span>معجم ألفبائي شامل (أ - ي)</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  فهرس هجائي للوصول الفوري للمصطلح ومقابله باللغة الإنجليزية ومكانه بالمنهج.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>10 وحدات و 58 درساً</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  تغطية شاملة ومفصلة من الفروض المحاسبية والقيود وحتى القوائم والتحليل المالي.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>250+ مسألة وتطبيق</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  تدرج متوازن بالحلول التفصيلية، دفاتر اليومية الرسمية، وحسابات الأستاذ T.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Scale className="w-4 h-4 shrink-0" />
                  <span>دليل استدلال JRE (20 درجة)</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  تدريب تخصصي لصياغة الحجج وضمان درجات مقال التفسير المحاسبي الوزاري.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>بنك الأسئلة الموحد</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  أكثر من 300 سؤال تدريبي مصنف بمستويات بلوم مع إجابات وسلالم تصحيح نموذجية.
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>دراسات حالة واقعية</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  سيناريوهات أعمال من قلب السوق المصري (مخبز مريم، محلات بلال، منشأة زيد، حسن).
                </p>
              </div>

              <div className="bg-[#1A2D47]/95 border border-[#C5A059]/40 p-3 text-right space-y-1">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>كبسولات المراجعة والأفخاخ</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]/90 leading-normal">
                  ملخصات في دقيقة واحدة ومصطلحات معتمدة وتحذير من أخطر مصائد الامتحانات.
                </p>
              </div>
            </>
          )}

        </div>

        {/* 5. Book Footer: Target Level, Barcode, & Editorial Credits */}
        <div className="relative z-10 border-t-2 border-[#C5A059]/60 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DCC4]">
          <div className="space-y-0.5 text-center sm:text-right">
            <p className="font-bold text-[#FFFFFF] text-sm font-serif">
              الصف الثاني الثانوي — مسار إدارة الأعمال (شهادة البكالوريا المصرية 2027)
            </p>
            <p className="text-xs text-[#C5A059]">
              إعداد وتأليف نخبة من كبار الخبراء وموجهي المحاسبة المالية بجمهورية مصر العربية
            </p>
          </div>

          {/* Barcode & Digital ISBN Block */}
          <div className="flex items-center gap-3 bg-[#1A2D47] px-3.5 py-2 border-2 border-[#C5A059]">
            <QrCode className="w-10 h-10 text-[#C5A059] shrink-0" />
            <div className="text-[10px] font-mono leading-tight text-right">
              <div className="font-bold text-[#FFFFFF]">OFFICIAL DIGITAL EDITION</div>
              <div className="text-[#C5A059]">امسح للوصول للمنصة والمحاكيات</div>
              <div className="text-[#E8DCC4] font-bold">ISBN: 978-977-08-4120-1</div>
            </div>
          </div>
        </div>

        {/* Legal Deposit & Copyright Banner */}
        <div className="relative z-10 text-center pt-2 text-[10px] text-[#C5A059] font-mono border-t border-[#C5A059]/30 mt-3 flex flex-wrap justify-between gap-2">
          <span>{editionTitle}</span>
          <span>إيداع دار الكتب والوثائق المصرية: 14280 / 2026</span>
          <span>جميع الحقوق محفوظة © دار التميز للنشر والتقنيات التعليمية</span>
        </div>
      </div>

      {/* =========================================================================
          2. INSIDE PREFACE & LEGAL ACCREDITATION PAGE
         ========================================================================= */}
      <div className="bg-[#FFFFFF] p-8 sm:p-12 border-2 border-[#0C1E36] text-[#1D1D1B] space-y-8 page-break-after shadow-sm">
        <div className="border-b-4 border-[#0C1E36] pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8A5D00] uppercase tracking-widest font-mono">
              PREFACE & METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#0C1E36]">
              مقدمة الطبعة ودليل التفوق الدراسي
            </h2>
          </div>
          <div className="text-left font-mono text-xs text-[#0C1E36]">
            <div className="font-bold">طبعة البكالوريا 2027</div>
            <div className="text-emerald-700 font-bold">مطابقة 100% للوزارة</div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#1D1D1B] font-sans">
          <p className="font-bold text-lg text-[#0C1E36] font-serif">
            أبناءنا وبناتنا طلاب وطالبات البكالوريا المصرية، زملاءنا الأفاضل معلمي وموجهي مادة المحاسبة المالية:
          </p>
          <p className="leading-[1.85]">
            يسرنا أن نضع بين أيديكم هذا الكتاب التعليمي المرجعي الشامل <strong>«المحاسبة المالية ببساطة وإتقان»</strong>، والذي تم تصميمه وتأليفه وفق أحدث المناهج المطورة لشهادة البكالوريا المصرية (EB) لمسار إدارة الأعمال، ليكون رفيقكم الأمين ليس فقط لاجتياز الامتحانات بتفوق مستحق، بل لبناء عقلية محاسبية واعية ومحترفة تفهم أسرار عالم المال والأعمال.
          </p>
          <p className="leading-[1.85]">
            لقد راعينا في هذا الإصدار كسر النمطية والجمود التقليدي للكتب المدرسية، فدمجنا بين: 
            <strong> الفهم النظري المتين القائم على الفروض والمبادئ</strong>، و
            <strong> التطبيق الرقمي العملي خطوة بخطوة</strong>، و
            <strong> دراسات الحالة الواقعية المستمدة من نبض الاقتصاد المصري</strong>، بالإضافة إلى 
            <strong> المعالجة الشاملة لسؤال الاستدلال المحاسبي (JRE)</strong> الذي يمثل 20 درجة محورية في الورقة الامتحانية الوزارية.
          </p>
        </div>

        {/* 4 Golden Study Rules Box (El-Moasser / Al-Emtehan Blueprint) */}
        <div className="bg-[#FAF8F5] border-2 border-[#C5A059] p-6 space-y-4">
          <div className="flex items-center gap-2.5 font-black text-base sm:text-lg text-[#0C1E36] font-serif border-b border-[#C5A059]/40 pb-2.5">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <span>خارطة طريق الطالب المتفوق — 4 خطوات للدرجة النهائية (100%):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm sm:text-base">
            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-[#0C1E36] text-[#FFFFFF] flex items-center justify-center font-bold shrink-0 font-mono text-xs sm:text-sm">
                1
              </span>
              <div>
                <strong className="block text-[#0C1E36] mb-1 font-bold text-base">ابدأ بالتمهيد وافهم (لماذا؟):</strong>
                <p className="text-[#1D1D1B]/90 text-sm sm:text-base leading-relaxed">
                  اقرأ قصة الدرس الواقعية؛ فالمحاسبة وُجدت لحل مشاكل التجارة، وفهم السبب يرسخ القيد للأبد.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-[#0C1E36] text-[#FFFFFF] flex items-center justify-center font-bold shrink-0 font-mono text-xs sm:text-sm">
                2
              </span>
              <div>
                <strong className="block text-[#0C1E36] mb-1 font-bold text-base">حل المسألة بيدك قبل النظر للإجابة:</strong>
                <p className="text-[#1D1D1B]/90 text-sm sm:text-base leading-relaxed">
                  المحاسبة مهارة يد وذهن، تتبع خطوات التفكير ثم طابق قيودك وأرقامك مع خطوات الحل النموذجية.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-[#0C1E36] text-[#FFFFFF] flex items-center justify-center font-bold shrink-0 font-mono text-xs sm:text-sm">
                3
              </span>
              <div>
                <strong className="block text-[#781D28] mb-1 font-bold text-base">احذر صناديق (⚠️ خطأ شائع):</strong>
                <p className="text-[#1D1D1B]/90 text-sm sm:text-base leading-relaxed">
                  رصدنا في هذه الصناديق أكثر من 100 فخ امتحاني يقع فيها 80% من الطلاب؛ فاقرأها بتركيز شديد.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-[#0C1E36] text-[#FFFFFF] flex items-center justify-center font-bold shrink-0 font-mono text-xs sm:text-sm">
                4
              </span>
              <div>
                <strong className="block text-[#0C1E36] mb-1 font-bold text-base">أتقن بنية مقال الاستدلال JRE:</strong>
                <p className="text-[#1D1D1B]/90 text-sm sm:text-base leading-relaxed">
                  لا تكتفِ بذكر الناتج فقط، بل برهن على صحة معالجتك مستنداً للمبدأ المحاسبي وفند الرأي الخطأ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Official Publication & Anti-Piracy Intellectual Property Box */}
        <div className="border-2 border-[#0C1E36] p-6 bg-[#FAF8F5] space-y-3.5 text-sm">
          <div className="flex items-center justify-between border-b border-[#0C1E36]/20 pb-2.5">
            <div className="flex items-center gap-2 font-bold text-[#0C1E36] font-serif text-base">
              <Copyright className="w-5 h-5 text-[#8A5D00]" />
              <span>بيان التوثيق القانوني وحماية الملكية الفكرية:</span>
            </div>
            <span className="font-mono text-xs sm:text-sm text-[#781D28] font-bold">قانون رقم 82 لسنة 2002</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1D1D1B]/95 leading-relaxed">
            <div className="space-y-1.5">
              <p><strong>الناشر:</strong> دار التميز للنشر والتقنيات التعليمية الحديثة — جمهورية مصر العربية.</p>
              <p><strong>رقم الإيداع بدار الكتب المصرية:</strong> 14280 لسنة 2026.</p>
              <p><strong>الترقيم الدولي الموحد (ISBN):</strong> 978-977-08-4120-1.</p>
            </div>
            <div className="space-y-1.5">
              <p><strong>سنة الإصدار:</strong> العام الدراسي 2026 / 2027.</p>
              <p><strong>المطابقة المنهجية:</strong> معتمد وفق مواصفات المركز القومي للامتحانات والتقويم التربوي.</p>
              <p><strong>تحذير قانوني:</strong> يُحظر تماماً تصوير أو نسخ أو استنساخ أي جزء من هذا المصنف دون موافقة كتابية صريحة.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
