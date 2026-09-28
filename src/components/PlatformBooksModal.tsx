import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, BookOpen, Printer, CheckCircle2, ShieldCheck, Sparkles, 
  ExternalLink, FileText, Award, Scale, HelpCircle, Bookmark
} from 'lucide-react';

interface PlatformBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGlossary?: () => void;
}

interface PlatformBookItem {
  id: string;
  title: string;
  categoryTag: string;
  subtitle: string;
  description: string;
  pageCountInfo: string;
  depositNumber: string;
  badgeColor: string;
  primaryActionLabel: string;
  primaryActionUrl: string;
  printEditionKey: string;
  isSpecialHighlighted?: boolean;
}

export const PlatformBooksModal: React.FC<PlatformBooksModalProps> = ({
  isOpen,
  onClose,
  onOpenGlossary
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const books: PlatformBookItem[] = [
    {
      id: 'assessments',
      title: 'كتاب الأداءات والتقييمات المدرسية المعتمدة',
      categoryTag: 'الأداءات والتقييمات (الإصدار الوزاري الكامل)',
      subtitle: 'تفريغ رسمي شامل للأنشطة الصفية والواجبات المنزلية والتقييمات الأسبوعية وتدريبات الشهور',
      description: 'يحتوي على ۲۸۸ سؤالاً وتدريباً معتمداً تغطي الوحدات من 1 إلى 5 بكتاب الوزارة (ص ۳ إلى ۸٤)، مع النماذج الثلاثية (أ، ب، ج)، ومربوطة بمستويات بلوم ونواتج التعلم LO ومفاتيح الإجابات النموذجية وسلالم التصحيح.',
      pageCountInfo: 'ص ۳ إلى ۸٤ (۲۸۸ مفرداً)',
      depositNumber: 'إيداع دار الكتب: 14280 / 2026',
      badgeColor: 'bg-[#8A1F1D] text-white',
      primaryActionLabel: 'تصفح الأداءات والتقييمات',
      primaryActionUrl: '/assessment/ministry-assessments',
      printEditionKey: 'assessments',
      isSpecialHighlighted: true
    },
    {
      id: 'student',
      title: 'المحاسبة المالية ببساطة وإتقان (نسخة الطالب المعتمدة)',
      categoryTag: 'كتاب الشرح الدراسي الكامل',
      subtitle: 'المرجع الأكاديمي الشامل الأول لشهادة البكالوريا المصرية (EB)',
      description: 'يغطي المنهاج الوزاري كاملاً عبر 10 وحدات و 58 درساً مفصلاً، مع أكثر من 250 مسألة محلولة، ودليل متكامل لإتقان مقال الاستدلال المحاسبي الوزاري JRE (سلم الـ 20 درجة).',
      pageCountInfo: '10 وحدات • 58 درساً',
      depositNumber: 'ISBN: 978-977-08-4120-1',
      badgeColor: 'bg-[#0C1E36] text-[#C5A059]',
      primaryActionLabel: 'فهرس المنهج والدروس',
      primaryActionUrl: '/curriculum',
      printEditionKey: 'student'
    },
    {
      id: 'teacher',
      title: 'دليل المعلم الإرشادي وخطط التدريس النموذجية',
      categoryTag: 'نسخة المعلم والتوجيه الفني',
      subtitle: 'دليل التخطيط التربوي وتوزيع المنهج ونواتج التعلم وسلالم التحكيم',
      description: 'مخصص للسادة المعلمين والموجهين التربويين؛ يشمل خطط الدروس التفصيلية، أهداف الأداء ومؤشرات النجاح، استراتيجيات معالجة صعوبات التعلم، وموجهات تصحيح مقال JRE.',
      pageCountInfo: 'دليل تربوي قياسي',
      depositNumber: 'اعتماد التوجيه الفني 2026',
      badgeColor: 'bg-[#1E3A8A] text-white',
      primaryActionLabel: 'فتح لوحة المعلم',
      primaryActionUrl: '/teacher-dashboard',
      printEditionKey: 'teacher'
    },
    {
      id: 'glossary',
      title: 'معجم المصطلحات والمفاهيم المحاسبية المعتمد',
      categoryTag: 'الملحق المعجمي الرسمي (عربي — إنجليزي)',
      subtitle: 'المعجم المقنن: التفسير المبسط، التعريف الأكاديمي، والأفخاخ الامتحانية',
      description: 'تغطية شاملة لأكثر من 150 مصطلحاً محاسبياً لكافة الوحدات (1 - 10) مع الأمثلة الرقمية من واقع السوق، ونماذج ذهنية لتفادي الخلط في أسئلة الامتحان والاستدلال.',
      pageCountInfo: 'معجم ألفبائي كامل',
      depositNumber: 'إيداع رسمي معجمي',
      badgeColor: 'bg-[#14532D] text-white',
      primaryActionLabel: 'فتح القاموس التفاعلي',
      primaryActionUrl: 'glossary_modal',
      printEditionKey: 'glossary'
    },
    {
      id: 'qbank',
      title: 'كتيب بنك الأسئلة الشامل الموحد',
      categoryTag: 'بنك الأسئلة والتدريبات المقننة',
      subtitle: 'أسئلة تدريبية مصنفة بمستويات بلوم المعرفية ونواتج التعلم',
      description: 'مئات الأسئلة الموضوعية والمقالية المتدرجة في الصعوبة من التذكر والفهم إلى التطبيق والتحليل، مع ربط كل سؤال بصفحات كتاب الوزارة وناتج التعلم المستهدف.',
      pageCountInfo: '300+ سؤال تدريبي',
      depositNumber: 'إيداع دار الكتب: 14280 / 2026',
      badgeColor: 'bg-[#781D28] text-white',
      primaryActionLabel: 'فتح بنك الأسئلة',
      primaryActionUrl: '/assessment/question-bank',
      printEditionKey: 'qbank'
    },
    {
      id: 'exams',
      title: 'كتيب الامتحانات والمحاكاة الرسمية للبكالوريا',
      categoryTag: 'نماذج الامتحانات الرسمية',
      subtitle: '5 امتحانات مطابقة 100% لمواصفات الورقة الامتحانية الوزارية',
      description: 'نماذج شاملة بضوابط زمنية وتوزيع درجات رسمي، تشتمل على أسئلة الاختيار من متعدد، والمسائل العملية المباشرة، وسؤال مقال الاستدلال JRE مع أوراق الإجابة.',
      pageCountInfo: '5 امتحانات قياسية',
      depositNumber: 'مطابق لمواصفات المركز القومي',
      badgeColor: 'bg-[#0F4C5C] text-white',
      primaryActionLabel: 'دخول الامتحانات المحاكية',
      primaryActionUrl: '/assessment/mock-exams',
      printEditionKey: 'exams'
    },
    {
      id: 'answers',
      title: 'دليل الإجابات النموذجية وسلالم التصحيح الوزارية',
      categoryTag: 'دليل الحلول والسلالم',
      subtitle: 'حلول تفصيلية لكافة مسائل المنهاج وتبريراتها المحاسبية',
      description: 'مرجع الحلول المعتمد للطلاب والمعلمين؛ يقدم خطوات الحل خطوة بخطوة، القيود المحاسبية السليمة، الجداول الحسابية، وتبرير المعالجات وفق المعايير المصرية.',
      pageCountInfo: 'دليل الحلول الشامل',
      depositNumber: 'وثيقة الحلول المعتمدة',
      badgeColor: 'bg-[#854D0E] text-white',
      primaryActionLabel: 'عرض وطباعة دليل الحلول',
      primaryActionUrl: '/print?edition=answers',
      printEditionKey: 'answers'
    }
  ];

  const handleOpenPrintBook = (editionKey: string) => {
    onClose();
    navigate(`/print?edition=${editionKey}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrimaryAction = (book: PlatformBookItem) => {
    onClose();
    if (book.primaryActionUrl === 'glossary_modal') {
      if (onOpenGlossary) {
        onOpenGlossary();
      }
    } else {
      navigate(book.primaryActionUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="platform-books-title"
      dir="rtl"
    >
      <div className="bg-[#FFFFFF] w-full max-w-5xl border-4 border-[#1D1D1B] shadow-2xl overflow-hidden font-serif flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header Bar */}
        <div className="bg-[#0C1E36] text-[#FFFFFF] p-4 sm:p-6 border-b-4 border-[#C5A059] flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#C5A059] text-[#0C1E36] text-xs font-bold px-2 py-0.5 uppercase tracking-wider font-mono">
                PLATFORM PUBLICATIONS LIBRARY
              </span>
              <span className="text-xs text-[#E8DCC4] hidden sm:inline">
                منظومة الإصدارات والكتب الرسمية المعتمدة للبكالوريا (EB)
              </span>
            </div>
            <h2 id="platform-books-title" className="text-xl sm:text-2xl font-black font-serif text-[#FFFFFF] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#C5A059]" />
              <span>كتب المنصة والمطبوعات المعتمدة</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#E8DCC4] hover:text-[#FFFFFF] hover:bg-[#1A2D47] transition cursor-pointer border border-[#C5A059]/40"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Books Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#F9F7F2]">
          
          <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B]/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="space-y-0.5 text-right">
              <span className="font-bold text-[#0C1E36] block">
                مكتبة الإصدارات الأكاديمية والكتب المرجعية:
              </span>
              <p className="text-[#1D1D1B]/75 leading-relaxed">
                جميع هذه الكتب متاحة للقراءة التفاعلية المباشرة على المنصة، أو للتصدير والطباعة الورقية الفاخرة بجودة A4 ومطابقة تامة للمواصفات الوزارية الرسمية.
              </p>
            </div>
            <button
              onClick={() => handleOpenPrintBook('student')}
              className="px-4 py-2 bg-[#0C1E36] text-[#C5A059] hover:bg-[#1A2D47] font-bold text-xs flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer shrink-0 border border-[#C5A059]/40"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>مركز الطباعة الموحد</span>
            </button>
          </div>

          {/* Books Listing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.map((book) => (
              <div 
                key={book.id}
                className={`bg-[#FFFFFF] border-2 transition-all p-5 flex flex-col justify-between space-y-4 shadow-sm ${
                  book.isSpecialHighlighted 
                    ? 'border-[#8A1F1D] ring-2 ring-[#8A1F1D]/20 bg-[#FFFDFD]' 
                    : 'border-[#1D1D1B]/20 hover:border-[#1D1D1B]'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 ${book.badgeColor}`}>
                      {book.categoryTag}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#1D1D1B]/60">
                      {book.pageCountInfo}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0C1E36] leading-snug">
                    {book.title}
                  </h3>

                  <p className="text-xs font-bold text-[#781D28] leading-normal">
                    {book.subtitle}
                  </p>

                  <p className="text-xs text-[#1D1D1B]/80 leading-relaxed font-sans">
                    {book.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1D1D1B]/15 space-y-3">
                  <div className="text-[10px] text-[#1D1D1B]/60 font-mono flex items-center justify-between">
                    <span>{book.depositNumber}</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>معتمد 2026/2027</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <button
                      onClick={() => handlePrimaryAction(book)}
                      className="px-3 py-2 bg-[#F9F7F2] hover:bg-[#EFECE6] text-[#1D1D1B] border border-[#1D1D1B]/30 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#C4A484]" />
                      <span>{book.primaryActionLabel}</span>
                    </button>

                    <button
                      onClick={() => handleOpenPrintBook(book.printEditionKey)}
                      className={`px-3 py-2 text-white flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs ${
                        book.isSpecialHighlighted
                          ? 'bg-[#8A1F1D] hover:bg-[#701917]'
                          : 'bg-[#0C1E36] hover:bg-[#1A2D47]'
                      }`}
                    >
                      <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>عرض وطباعة (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] p-3 sm:p-4 border-t-2 border-[#1D1D1B]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-[#1D1D1B]/75 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-bold">
              جميع الكتب والمطبوعات مسجلة وموثقة بدار الكتب المصرية ومتوافقة 100% مع معايير البكالوريا (EB).
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1D1D1B] text-[#FFFFFF] hover:bg-[#333330] font-bold transition cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
