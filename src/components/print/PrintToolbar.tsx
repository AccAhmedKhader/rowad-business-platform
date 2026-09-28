import React, { useState } from 'react';
import { 
  Printer, ArrowRight, BookOpen, Layers, CheckCircle2, 
  Settings2, Eye, EyeOff, FileText, Type, ZoomIn, ZoomOut, Sparkles,
  ExternalLink, HelpCircle, AlertCircle, X, Check, Download, FileDown,
  ChevronLeft, ChevronRight, SlidersHorizontal, PanelLeftClose, PanelLeftOpen,
  Award
} from 'lucide-react';
import { ExportEdition, FontSizeScale } from '../PrintView';
import { printToPdf, formatPdfDocumentTitle, exportToWord, exportStandalonePdf } from '../../utils/printToPdf';

interface PrintToolbarProps {
  onBack: () => void;
  selectedEdition: ExportEdition;
  onSelectEdition: (edition: ExportEdition) => void;
  selectedUnit: string;
  onSelectUnit: (unitId: string) => void;
  showSolutions: boolean;
  onToggleSolutions: () => void;
  showCoverAndToc: boolean;
  onToggleCoverAndToc: () => void;
  fontSizeScale: FontSizeScale;
  onChangeFontSize: (scale: FontSizeScale) => void;
}

export const PrintToolbar: React.FC<PrintToolbarProps> = ({
  onBack,
  selectedEdition,
  onSelectEdition,
  selectedUnit,
  onSelectUnit,
  showSolutions,
  onToggleSolutions,
  showCoverAndToc,
  onToggleCoverAndToc,
  fontSizeScale,
  onChangeFontSize
}) => {
  // Sidebar open/collapse state - can be opened or closed at any time to preserve 100% reading space
  const [isOpen, setIsOpen] = useState(false);
  const [showPdfGuide, setShowPdfGuide] = useState(false);
  const [printStatus, setPrintStatus] = useState<'idle' | 'triggered' | 'blocked'>('idle');
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const scaleLevels: FontSizeScale[] = ['compact', 'normal', 'large', 'xlarge'];
  const currentIndex = scaleLevels.indexOf(fontSizeScale);

  // Check if running inside an iframe (such as AI Studio preview)
  const isInIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

  // Standalone URL for opening in a clean browser tab with zero iframe restrictions
  const standaloneUrl = `/print?edition=${selectedEdition}&unit=${selectedUnit}&solutions=${showSolutions}&cover=${showCoverAndToc}&scale=${fontSizeScale}&autoprint=true`;

  const handleZoomIn = () => {
    if (currentIndex < scaleLevels.length - 1) {
      onChangeFontSize(scaleLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    if (currentIndex > 0) {
      onChangeFontSize(scaleLevels[currentIndex - 1]);
    }
  };

  const getScaleLabel = (scale: FontSizeScale) => {
    switch (scale) {
      case 'compact': return { name: 'مدمج (15px)', desc: 'للطباعة الاقتصادية' };
      case 'normal': return { name: 'قياسي (17.5px)', desc: 'المقاس المعتمد للكتب' };
      case 'large': return { name: 'كبير (20px)', desc: 'موصى به للمذاكرة' };
      case 'xlarge': return { name: 'فائق (22.5px)', desc: 'راحة تامة للعينين' };
    }
  };

  const handleDirectPrint = async () => {
    setPrintStatus('triggered');
    try {
      const isCover = selectedUnit === 'cover-only';
      const uNum = !isCover && selectedUnit !== 'all' ? parseInt(selectedUnit.replace('unit-', ''), 10) : undefined;
      await printToPdf({
        unitNumber: uNum,
        unitId: isCover ? 'cover-only' : (selectedUnit !== 'all' ? selectedUnit : undefined),
        edition: selectedEdition,
        showSolutions,
        showCoverAndToc: true,
        onlyCover: isCover,
        fontSizeScale,
        documentTitle: isCover ? 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027' : undefined,
        openInNewTab: false
      });
      setTimeout(() => setPrintStatus('idle'), 3000);
    } catch (err) {
      console.warn('Native window.print() was blocked by browser sandbox:', err);
      setPrintStatus('blocked');
      setShowPdfGuide(true);
    }
  };

  const handleExportWord = (forceCoverOnly = false) => {
    setIsExportingWord(true);
    setExportError(null);
    try {
      const isCover = forceCoverOnly || selectedUnit === 'cover-only';
      const uNum = !isCover && selectedUnit !== 'all' ? parseInt(selectedUnit.replace('unit-', ''), 10) : undefined;
      exportToWord({
        unitNumber: uNum,
        unitId: isCover ? 'cover-only' : (selectedUnit !== 'all' ? selectedUnit : undefined),
        edition: selectedEdition,
        showSolutions,
        showCoverAndToc: true,
        onlyCover: isCover,
        fontSizeScale,
        documentTitle: isCover ? 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027' : undefined
      });
    } catch (err: any) {
      console.error('Word export error:', err);
      setExportError(err?.message || 'حدث خطأ أثناء تصدير ملف Word.');
    } finally {
      setTimeout(() => setIsExportingWord(false), 700);
    }
  };

  const handleExportStandalonePdf = async (forceCoverOnly = false) => {
    setIsExportingPdf(true);
    setExportError(null);
    try {
      const isCover = forceCoverOnly || selectedUnit === 'cover-only';
      const uNum = !isCover && selectedUnit !== 'all' ? parseInt(selectedUnit.replace('unit-', ''), 10) : undefined;
      await exportStandalonePdf({
        unitNumber: uNum,
        unitId: isCover ? 'cover-only' : (selectedUnit !== 'all' ? selectedUnit : undefined),
        edition: selectedEdition,
        showSolutions,
        showCoverAndToc: true,
        onlyCover: isCover,
        fontSizeScale,
        documentTitle: isCover ? 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027' : undefined
      });
    } catch (err: any) {
      console.error('Standalone PDF error:', err);
      setExportError(err?.message || 'تعذر فتح نافذة التصدير. يرجى السماح بالنوافذ المنبثقة من إعدادات المتصفح.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <>
      {/* 1. Unobtrusive Floating Trigger Bar (Shown when user wants reading space) */}
      <div className="no-print fixed top-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-2 bg-[#0E1A2B] text-[#C5A059] border-2 border-[#C5A059] shadow-2xl hover:bg-[#1A2D47] hover:text-white transition font-bold text-xs sm:text-sm cursor-pointer rounded-xs ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          title="فتح القائمة الجانبية لإعدادات وأدوات الطباعة"
          id="open-print-sidebar-btn"
        >
          <Printer className="w-4 h-4 text-[#C5A059]" />
          <span>أدوات وإعدادات الطباعة</span>
          <span className="text-[10px] bg-[#C5A059] text-[#0E1A2B] px-1.5 py-0.5 font-black">
            القائمة الجانبية
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onBack}
          className={`p-2 bg-[#0E1A2B]/90 text-[#E8DCC4] border border-[#C5A059]/40 hover:bg-[#1A2D47] hover:text-white transition cursor-pointer text-xs font-bold shadow-lg ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          title="العودة للمنصة التفاعلية"
          id="back-to-platform-compact-btn"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Backdrop Overlay on mobile/tablet */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="no-print fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* 3. The Dedicated Print & Typography Sidebar (قائمة جانبية متكاملة) */}
      <aside
        id="print-sidebar-panel"
        className={`no-print fixed inset-y-0 left-0 z-50 w-84 sm:w-96 bg-[#0E1A2B] text-[#FDFCF7] border-r-2 border-[#C5A059] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="القائمة الجانبية لأدوات الطباعة والقراءة"
      >
        
        {/* Sidebar Header */}
        <header className="p-4 border-b border-[#C5A059]/30 bg-[#08111D] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#C5A059] text-[#0E1A2B] font-black rounded-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#C5A059] leading-tight">
                أدوات وإعدادات الطباعة / حفظ PDF
              </h2>
              <p className="text-[11px] text-zinc-400">
                لوحة جانبية للتحكم بالنسخة الأكاديمية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1A2D47] border border-zinc-700 transition cursor-pointer"
              title="إغلاق القائمة الجانبية لتصفح الكتاب وقراءته بحرية"
              id="close-print-sidebar-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Quick Return to Platform */}
          <button
            onClick={onBack}
            className="w-full py-2 px-3 bg-[#1A2D47] hover:bg-[#253E61] text-[#E8DCC4] hover:text-[#FFFFFF] transition flex items-center justify-center gap-2 text-xs font-bold border border-[#C5A059]/40 cursor-pointer"
            id="back-to-platform-sidebar-btn"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للمنصة التفاعلية</span>
          </button>

          {/* Quick PDF & Print Section */}
          <div className="p-3 bg-[#132238] border-2 border-[#C5A059] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-[#C5A059] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>التصدير والطباعة</span>
              </span>
              <button
                onClick={() => setShowPdfGuide(true)}
                className="text-[11px] text-amber-300 hover:text-white underline flex items-center gap-1 cursor-pointer"
                title="عرض خطوات وإعدادات حفظ PDF"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>دليل PDF</span>
              </button>
            </div>

            {/* Status & Loading Indicator */}
            {(isExportingWord || isExportingPdf) && (
              <div className="bg-[#08111D] border border-[#C5A059] p-2 text-center text-xs text-[#C5A059] font-bold animate-pulse rounded-xs">
                جارٍ تجهيز الكتاب للطباعة والتصدير…
              </div>
            )}

            {/* Error Alert Box */}
            {exportError && (
              <div className="bg-red-900/90 border border-red-500 p-2 text-white text-xs rounded-xs flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
                <span>{exportError}</span>
              </div>
            )}

            {/* 1. Word Document Export Button */}
            <button
              type="button"
              onClick={() => handleExportWord(false)}
              disabled={isExportingWord || isExportingPdf}
              className="w-full py-2.5 px-3 bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 border border-blue-300 cursor-pointer disabled:opacity-50"
              title="تصدير وتحميل المنهاج كملف Microsoft Word منسق باللغة العربية"
              id="export-word-btn"
            >
              <FileDown className="w-4 h-4 shrink-0 text-blue-200" />
              <span>{isExportingWord ? 'جارٍ إنشاء ملف Word...' : 'تحميل كملف Word (.doc)'}</span>
            </button>

            {/* 2. Professional Standalone PDF Button */}
            <button
              type="button"
              onClick={() => handleExportStandalonePdf(false)}
              disabled={isExportingWord || isExportingPdf}
              className="w-full py-2.5 px-3 bg-[#C5A059] hover:bg-[#d4b06b] text-[#0E1A2B] font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 border-2 border-white cursor-pointer disabled:opacity-50"
              title="تصدير الكتاب وطباعته بجودة A4 عبر محرك النشر المستقل"
              id="export-pdf-engine-btn"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>{isExportingPdf ? 'جارٍ إعداد صفحات PDF...' : 'تصدير PDF احترافي (المعالج المستقل)'}</span>
            </button>

            {/* 3. Direct Print from current window */}
            <button
              onClick={handleDirectPrint}
              disabled={isExportingWord || isExportingPdf}
              className="w-full py-2 px-3 bg-[#1A2D47] hover:bg-[#253E61] text-[#E8DCC4] hover:text-white font-bold text-xs border border-[#C5A059]/60 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              title="طباعة من الصفحة الحالية مباشرة (Ctrl+P)"
              id="direct-print-btn"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة مباشرة من المتصفح (Ctrl+P)</span>
            </button>

            {/* 4. Dedicated Quick Cover Export Card */}
            <div className="bg-[#091524] border border-[#C5A059]/60 p-2.5 space-y-1.5 mt-2">
              <div className="flex items-center justify-between text-xs text-[#C5A059] font-bold">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>تصدير الغلاف الرسمي فقط:</span>
                </span>
                <span className="text-[10px] text-[#E8DCC4] bg-[#1A2D47] px-1.5 py-0.5 border border-[#C5A059]/30">A4 معتمد</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleExportWord(true)}
                  disabled={isExportingWord || isExportingPdf}
                  className="py-1.5 px-2 bg-[#1E3A8A] hover:bg-[#2563EB] text-white text-[11px] font-bold border border-blue-400 transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  title="تصدير غلاف الكتاب فقط كملف Word"
                  id="export-cover-word-btn"
                >
                  <FileDown className="w-3 h-3" />
                  <span>غلاف (Word)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportStandalonePdf(true)}
                  disabled={isExportingWord || isExportingPdf}
                  className="py-1.5 px-2 bg-[#C5A059] hover:bg-[#d4b06b] text-[#0E1A2B] text-[11px] font-black border border-white transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  title="تصدير غلاف الكتاب فقط كملف PDF"
                  id="export-cover-pdf-btn"
                >
                  <Printer className="w-3 h-3" />
                  <span>غلاف (PDF)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scope Selector */}
          <div className="p-3 bg-[#132238] border border-[#C5A059]/40 space-y-2">
            <label className="font-bold text-[#C5A059] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>نطاق المحتوى المعروض:</span>
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => onSelectUnit(e.target.value)}
              className="w-full bg-[#1A2D47] text-[#FFFFFF] font-bold p-2 text-xs border border-[#C5A059]/50 focus:outline-hidden cursor-pointer"
              id="print-scope-select"
            >
              <option value="cover-only">👑 غلاف الكتاب والصفحة التمهيدية الرسمية فقط</option>
              <option value="all">الكتاب كاملاً (جميع الوحدات العشر 1 - 10)</option>
              <option value="unit-1">الوحدة 1: المبادئ والمفاهيم المحاسبية</option>
              <option value="unit-2">الوحدة 2: التسجيل المحاسبي والقيد المزدوج</option>
              <option value="unit-3">الوحدة 3: الدفاتر المحاسبية المساعدة</option>
              <option value="unit-4">الوحدة 4: ميزان المراجعة وتصحيح الأخطاء</option>
              <option value="unit-5">الوحدة 5: الحسابات الختامية والتسويات</option>
              <option value="unit-6">الوحدة 6: السجلات غير المكتملة وتسوية البنك</option>
              <option value="unit-7">الوحدة 7: الإهلاك والديون المشكوك فيها</option>
              <option value="unit-8">الوحدة 8: شركات الأشخاص (التضامن)</option>
              <option value="unit-9">الوحدة 9: شركات الأموال (المساهمة)</option>
              <option value="unit-10">الوحدة 10: التحليل المالي ومؤشرات الأداء</option>
            </select>
          </div>

          {/* Edition Selector */}
          <div className="p-3 bg-[#132238] border border-[#C5A059]/40 space-y-2">
            <label className="font-bold text-[#C5A059] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
              <span>نوع الإصدار الأكاديمي:</span>
            </label>
            <select
              value={selectedEdition}
              onChange={(e) => onSelectEdition(e.target.value as ExportEdition)}
              className="w-full bg-[#1A2D47] text-[#FFFFFF] font-bold p-2 text-xs border border-[#C5A059]/50 focus:outline-hidden cursor-pointer"
              id="print-edition-select"
            >
              <option value="student">نسخة الطالب المتكاملة (Student Edition)</option>
              <option value="teacher">نسخة المعلم الإرشادية (Teacher Edition)</option>
              <option value="assessments">كتاب الأداءات والتقييمات المدرسية المعتمدة (ص ۳ - ۸٤)</option>
              <option value="glossary">كتيب المصطلحات والمفاهيم المحاسبية (Glossary Booklet)</option>
              <option value="qbank">كتيب بنك الأسئلة الشامل (Question Bank)</option>
              <option value="exams">كتيب الامتحانات والمحاكاة الرسمية (Exams)</option>
              <option value="answers">كتيب الإجابات وسلالم التصحيح (Model Answers)</option>
            </select>
          </div>

          {/* Display & Study Toggles */}
          <div className="p-3 bg-[#132238] border border-[#C5A059]/40 space-y-2.5">
            <span className="font-bold text-[#C5A059] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
              <span>خيارات العرض والحلول:</span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              {/* Solutions Toggle */}
              <button
                onClick={onToggleSolutions}
                className={`p-2 font-bold text-xs border transition flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                  showSolutions 
                    ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200' 
                    : 'bg-zinc-800 border-zinc-600 text-zinc-300'
                }`}
                title="إظهار أو إخفاء الحلول للتدريب الذاتي"
                id="toggle-solutions-sidebar-btn"
              >
                {showSolutions ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-zinc-400" />}
                <span>{showSolutions ? 'الحلول ظاهرة' : 'الحلول مخفية'}</span>
              </button>

              {/* Cover & TOC Toggle */}
              <button
                onClick={onToggleCoverAndToc}
                className={`p-2 font-bold text-xs border transition flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                  showCoverAndToc 
                    ? 'bg-[#1A2D47] border-[#C5A059] text-[#C5A059]' 
                    : 'bg-zinc-800 border-zinc-600 text-zinc-300'
                }`}
                title="تضمين الغلاف والفهرس العام"
                id="toggle-cover-sidebar-btn"
              >
                <BookOpen className="w-4 h-4" />
                <span>{showCoverAndToc ? 'الغلاف + الفهرس' : 'بدون غلاف'}</span>
              </button>
            </div>
          </div>

          {/* Typography Scale for Comfortable Reading */}
          <div className="p-3 bg-[#08111D] border border-[#C5A059]/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#C5A059] flex items-center gap-1.5">
                <Type className="w-4 h-4 text-[#C5A059]" />
                <span>حجم خط القراءة والمذاكرة:</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono font-bold">
                {getScaleLabel(fontSizeScale).name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {scaleLevels.map((lvl) => {
                const isActive = fontSizeScale === lvl;
                const labels: Record<FontSizeScale, { name: string; desc: string }> = {
                  compact: { name: 'مدمج', desc: '15px' },
                  normal: { name: 'قياسي', desc: '17.5px' },
                  large: { name: 'كبير', desc: '20px' },
                  xlarge: { name: 'فائق', desc: '22.5px' }
                };

                return (
                  <button
                    key={lvl}
                    onClick={() => onChangeFontSize(lvl)}
                    className={`py-1.5 px-2 font-bold text-xs transition cursor-pointer border flex items-center justify-between ${
                      isActive
                        ? 'bg-[#C5A059] text-[#08111D] border-white shadow-sm'
                        : 'bg-[#1A2D47] text-[#E8DCC4] hover:bg-[#253E61] border-[#C5A059]/30'
                    }`}
                  >
                    <span>{labels[lvl].name}</span>
                    <span className="text-[10px] opacity-75 font-mono">{labels[lvl].desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#C5A059]/20">
              <button
                onClick={handleZoomOut}
                disabled={currentIndex === 0}
                className={`px-2 py-1 border transition cursor-pointer flex items-center gap-1 text-xs ${
                  currentIndex === 0 
                    ? 'opacity-40 cursor-not-allowed bg-zinc-800 border-zinc-700 text-zinc-400' 
                    : 'bg-[#1A2D47] hover:bg-[#253E61] border-[#C5A059]/50 text-[#E8DCC4]'
                }`}
              >
                <ZoomOut className="w-3.5 h-3.5" />
                <span>تصغير الخط</span>
              </button>

              <button
                onClick={handleZoomIn}
                disabled={currentIndex === scaleLevels.length - 1}
                className={`px-2 py-1 border transition cursor-pointer flex items-center gap-1 text-xs ${
                  currentIndex === scaleLevels.length - 1 
                    ? 'opacity-40 cursor-not-allowed bg-zinc-800 border-zinc-700 text-zinc-400' 
                    : 'bg-[#1A2D47] hover:bg-[#253E61] border-[#C5A059]/50 text-[#E8DCC4]'
                }`}
              >
                <span>تكبير الخط</span>
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Iframe Notice Banner if embedded */}
          {isInIframe && (
            <div className="bg-amber-950/60 border border-[#C5A059]/60 p-2.5 text-[11px] text-amber-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <AlertCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>تنبيه حفظ ملف PDF:</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                داخل إطار المعاينة، استخدم زر <strong>"فتح وطباعة كـ PDF (نافذة مستقلة)"</strong> لتجاوز حظر النوافذ المنبثقة وحفظ الملف مباشرة.
              </p>
            </div>
          )}

        </div>

        {/* Sidebar Footer: Quick Close to Continue Reading peacefully */}
        <footer className="p-3 border-t border-[#C5A059]/30 bg-[#08111D] shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-[#1A2D47] hover:bg-[#253E61] text-[#C5A059] font-bold text-xs border border-[#C5A059]/40 flex items-center justify-center gap-1.5 transition cursor-pointer"
            id="close-sidebar-read-mode-btn"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>إغلاق القائمة لتصفح الكتاب وقراءته</span>
          </button>
        </footer>

      </aside>

      {/* PDF Saving Instructions Modal */}
      {showPdfGuide && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0E1A2B] text-[#FDFCF7] border-2 border-[#C5A059] max-w-xl w-full p-6 shadow-2xl relative font-sans">
            
            <button
              onClick={() => setShowPdfGuide(false)}
              className="absolute top-4 left-4 p-1.5 text-zinc-400 hover:text-white bg-[#1A2D47] border border-zinc-700 transition"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 border-b border-[#C5A059]/30 pb-3">
              <div className="p-2 bg-[#C5A059] text-[#0E1A2B] font-bold">
                <FileDown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#C5A059]">
                  دليل حفظ الكتاب كملف PDF عالي الجودة
                </h3>
                <p className="text-xs text-zinc-300">
                  خطوات حفظ نسخة الطالب المعتمدة من متصفحك (Chrome, Edge, Safari, Firefox)
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="p-3 bg-[#1A2D47]/80 border-r-4 border-[#C5A059] space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#C5A059] text-[#0E1A2B] flex items-center justify-center text-[11px] font-black">1</span>
                  <span>افتح الملف في نافذة مستقلة (موصى به)</span>
                </div>
                <p className="text-zinc-300 pr-6">
                  اضغط على زر <strong>"فتح وطباعة كـ PDF (نافذة مستقلة)"</strong> أو اضغط <kbd className="px-1.5 py-0.5 bg-black border border-zinc-600 font-mono">Ctrl + P</kbd> في لوحة المفاتيح.
                </p>
              </div>

              <div className="p-3 bg-[#1A2D47]/80 border-r-4 border-emerald-500 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-[#0E1A2B] flex items-center justify-center text-[11px] font-black">2</span>
                  <span>اختر حفظ بتنسيق PDF</span>
                </div>
                <p className="text-zinc-300 pr-6">
                  في نافذة الطباعة المنبثقة، عند خانة <strong>الوجهة (Destination)</strong>، اختر <strong>"حفظ بتنسيق PDF" (Save as PDF)</strong> بدلاً من اختيار طابعة ورقية.
                </p>
              </div>

              <div className="p-3 bg-[#1A2D47]/80 border-r-4 border-amber-400 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-[#0E1A2B] flex items-center justify-center text-[11px] font-black">3</span>
                  <span>إعدادات الجودة والألوان الفاخرة (هام جداً)</span>
                </div>
                <ul className="text-zinc-300 pr-6 space-y-1 list-disc list-inside">
                  <li>
                    تأكد من تفعيل خيار <strong>"رسومات الخلفية" (Background Graphics)</strong> لطباعة الألوان والتصميمات الفاخرة.
                  </li>
                  <li>
                    المقاس (Paper size): <strong>A4</strong>.
                  </li>
                  <li>
                    الهوامش (Margins): <strong>افتراضية أو مخصصة (Default / None)</strong>.
                  </li>
                </ul>
              </div>

            </div>

            <div className="mt-6 pt-3 border-t border-[#C5A059]/30 flex items-center justify-between gap-3">
              <span className="text-[11px] text-zinc-400">
                نسخة الطالب المتكاملة مهيأة تلقائياً وفق مقاس A4 لجميع الوحدات العشر.
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={standaloneUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-[#C5A059] hover:bg-[#d4b06b] text-[#0E1A2B] font-bold text-xs transition flex items-center gap-1.5"
                  onClick={() => setShowPdfGuide(false)}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح والبدء بالطباعة</span>
                </a>
                <button
                  onClick={() => setShowPdfGuide(false)}
                  className="px-3 py-1.5 bg-[#1A2D47] text-white hover:bg-zinc-700 font-bold text-xs transition"
                >
                  إغلاق
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
