import React, { useState } from 'react';
import { 
  Printer, X, BookOpen, Layers, CheckCircle2, FileText, 
  ExternalLink, Sparkles, Scale, HelpCircle, ShieldCheck, Check,
  ChevronLeft, Award, FileDown, SlidersHorizontal, Settings2
} from 'lucide-react';
import { 
  ExportEdition, FontSizeScale, TrainingModuleType, 
  UNIT_PRINT_REGISTRY, TRAINING_MODULES_REGISTRY,
  printToPdf, buildPrintUrl, isRunningInIframe,
  exportToWord, exportStandalonePdf
} from '../../utils/printToPdf';
import { getLessonsForUnit } from '../../data/lessonsData';

interface PrintToPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUnitId?: string;
  defaultLessonId?: string;
  defaultModule?: TrainingModuleType;
}

export const PrintToPdfModal: React.FC<PrintToPdfModalProps> = ({
  isOpen,
  onClose,
  defaultUnitId = 'unit-1',
  defaultLessonId,
  defaultModule
}) => {
  const [targetType, setTargetType] = useState<'unit' | 'lesson' | 'module' | 'cover'>(
    defaultModule ? 'module' : defaultLessonId ? 'lesson' : 'unit'
  );

  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(
    defaultUnitId && defaultUnitId !== 'cover-only' ? parseInt(defaultUnitId.replace('unit-', ''), 10) || 1 : 1
  );

  const [selectedLessonId, setSelectedLessonId] = useState<string>(defaultLessonId || '');
  const [selectedModule, setSelectedModule] = useState<TrainingModuleType>(defaultModule || 'qbank');

  const [edition, setEdition] = useState<ExportEdition>('student');
  const [showSolutions, setShowSolutions] = useState<boolean>(true);
  const [showCoverAndToc, setShowCoverAndToc] = useState<boolean>(true);
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>('normal');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportError, setExportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUnitLessons = getLessonsForUnit(`unit-${selectedUnitNumber}`);
  const activeUnitMeta = UNIT_PRINT_REGISTRY[selectedUnitNumber];
  const inIframe = isRunningInIframe();

  const handleExportWord = () => {
    setIsExporting(true);
    setExportError(null);
    try {
      if (targetType === 'cover') {
        exportToWord({
          onlyCover: true,
          edition,
          showSolutions,
          showCoverAndToc: true,
          fontSizeScale,
          documentTitle: 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027'
        });
      } else if (targetType === 'unit') {
        exportToWord({
          unitNumber: selectedUnitNumber,
          edition,
          showSolutions,
          showCoverAndToc,
          fontSizeScale
        });
      } else if (targetType === 'lesson') {
        exportToWord({
          unitNumber: selectedUnitNumber,
          lessonId: selectedLessonId || currentUnitLessons[0]?.id,
          edition,
          showSolutions,
          showCoverAndToc: false,
          fontSizeScale
        });
      } else {
        exportToWord({
          trainingModule: selectedModule,
          edition: TRAINING_MODULES_REGISTRY[selectedModule].edition,
          showSolutions,
          showCoverAndToc,
          fontSizeScale
        });
      }
    } catch (err: any) {
      console.error('Word export error:', err);
      setExportError(err?.message || 'حدث خطأ أثناء تصدير ملف Word.');
    } finally {
      setTimeout(() => setIsExporting(false), 700);
    }
  };

  const handleStandalonePdf = async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      if (targetType === 'cover') {
        await exportStandalonePdf({
          onlyCover: true,
          edition,
          showSolutions,
          showCoverAndToc: true,
          fontSizeScale,
          documentTitle: 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027'
        });
      } else if (targetType === 'unit') {
        await exportStandalonePdf({
          unitNumber: selectedUnitNumber,
          edition,
          showSolutions,
          showCoverAndToc,
          fontSizeScale
        });
      } else if (targetType === 'lesson') {
        await exportStandalonePdf({
          unitNumber: selectedUnitNumber,
          lessonId: selectedLessonId || currentUnitLessons[0]?.id,
          edition,
          showSolutions,
          showCoverAndToc: false,
          fontSizeScale
        });
      } else {
        await exportStandalonePdf({
          trainingModule: selectedModule,
          edition: TRAINING_MODULES_REGISTRY[selectedModule].edition,
          showSolutions,
          showCoverAndToc,
          fontSizeScale
        });
      }
    } catch (err: any) {
      console.error('Standalone PDF error:', err);
      setExportError(err?.message || 'تعذر فتح نافذة التصدير. يرجى السماح بالنوافذ المنبثقة من إعدادات المتصفح.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrintNow = async () => {
    setIsExporting(true);
    try {
      if (targetType === 'cover') {
        await printToPdf({
          onlyCover: true,
          unitId: 'cover-only',
          edition,
          showSolutions,
          showCoverAndToc: true,
          fontSizeScale,
          documentTitle: 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027',
          openInNewTab: false
        });
      } else if (targetType === 'unit') {
        await printToPdf({
          unitNumber: selectedUnitNumber,
          edition,
          showSolutions,
          showCoverAndToc,
          fontSizeScale,
          openInNewTab: false
        });
      } else if (targetType === 'lesson') {
        await printToPdf({
          unitNumber: selectedUnitNumber,
          lessonId: selectedLessonId || currentUnitLessons[0]?.id,
          edition,
          showSolutions,
          showCoverAndToc: false,
          fontSizeScale,
          openInNewTab: false
        });
      } else {
        await printToPdf({
          trainingModule: selectedModule,
          edition: TRAINING_MODULES_REGISTRY[selectedModule].edition,
          showSolutions,
          showCoverAndToc,
          fontSizeScale,
          openInNewTab: false
        });
      }
    } catch (err) {
      console.warn('Print error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpenStandalone = () => {
    if (targetType === 'cover') {
      window.open(`/print?unit=cover-only&edition=${edition}&cover=true&autoprint=true`, '_blank');
      return;
    }
    const url = buildPrintUrl({
      unitNumber: targetType === 'unit' || targetType === 'lesson' ? selectedUnitNumber : undefined,
      lessonId: targetType === 'lesson' ? (selectedLessonId || currentUnitLessons[0]?.id) : undefined,
      trainingModule: targetType === 'module' ? selectedModule : undefined,
      edition: targetType === 'module' ? TRAINING_MODULES_REGISTRY[selectedModule].edition : edition,
      showSolutions,
      showCoverAndToc,
      fontSizeScale,
      autoprint: true
    });
    window.open(url, '_blank');
  };

  const handleFullPreview = () => {
    if (targetType === 'cover') {
      window.location.href = `/print?unit=cover-only&edition=${edition}&cover=true`;
      return;
    }
    const url = buildPrintUrl({
      unitNumber: targetType === 'unit' || targetType === 'lesson' ? selectedUnitNumber : undefined,
      lessonId: targetType === 'lesson' ? (selectedLessonId || currentUnitLessons[0]?.id) : undefined,
      trainingModule: targetType === 'module' ? selectedModule : undefined,
      edition: targetType === 'module' ? TRAINING_MODULES_REGISTRY[selectedModule].edition : edition,
      showSolutions,
      showCoverAndToc,
      fontSizeScale,
      autoprint: false
    });
    window.location.href = url;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs font-serif animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-[#FAF8F5] w-full max-w-2xl border-2 border-[#0C1E36] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Modal Header */}
        <div className="bg-[#0C1E36] text-[#FDFCF7] p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#C5A059]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C5A059] text-[#0C1E36] font-black rounded-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#FFFFFF] leading-tight">
                أداة تصدير وطباعة PDF المعتمدة
              </h3>
              <p className="text-xs text-[#E8DCC4]">
                تصدير الوحدات الدراسية والوحدات التدريبية بمواصفات النشر والطباعة A4
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#E8DCC4] hover:text-[#FFFFFF] hover:bg-[#1A2D47] transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-[#1D1D1B]">
          
          {/* Target Type Selector Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold font-sans text-[#0C1E36] uppercase tracking-wider">
              1. اختر نطاق التصدير إلى PDF:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setTargetType('unit')}
                className={`p-2.5 text-center font-bold text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                  targetType === 'unit'
                    ? 'bg-[#0C1E36] text-[#C5A059] border-[#C5A059] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#0C1E36] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>وحدة دراسية</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('lesson')}
                className={`p-2.5 text-center font-bold text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                  targetType === 'lesson'
                    ? 'bg-[#0C1E36] text-[#C5A059] border-[#C5A059] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#0C1E36] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>درس فردي</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('module')}
                className={`p-2.5 text-center font-bold text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                  targetType === 'module'
                    ? 'bg-[#0C1E36] text-[#C5A059] border-[#C5A059] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#0C1E36] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>وحدة تدريبية</span>
              </button>

              <button
                type="button"
                onClick={() => setTargetType('cover')}
                className={`p-2.5 text-center font-bold text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                  targetType === 'cover'
                    ? 'bg-[#0C1E36] text-[#C5A059] border-[#C5A059] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#0C1E36] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                }`}
              >
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span>غلاف الكتاب الرسمي</span>
              </button>
            </div>
          </div>

          {/* Section Cover: Dedicated Cover & Preface details */}
          {targetType === 'cover' && (
            <div className="space-y-3 bg-[#0C1E36] text-white p-4 sm:p-5 border-2 border-[#C5A059] shadow-md">
              <div className="flex items-center justify-between border-b border-[#C5A059]/40 pb-2.5">
                <span className="text-xs font-mono font-bold text-[#C5A059]">
                  OFFICIAL GRAND COVER EDITION • A4 PORTRAIT
                </span>
                <span className="bg-[#C5A059] text-[#0C1E36] px-2 py-0.5 text-[11px] font-black">
                  تنسيق المنصة 100%
                </span>
              </div>
              <div className="space-y-1.5 pt-1">
                <h4 className="text-base sm:text-lg font-bold font-serif text-[#C5A059]">
                  غلاف الكتاب المعتمد والصفحة التمهيدية (نسخة فاخرة بالكامل)
                </h4>
                <p className="text-xs sm:text-sm text-[#E8DCC4] leading-relaxed">
                  يصدر هذا الخيار غلاف الكتاب الرسمي بتنسيق المنصة الملكي (كحلي كلاسيكي وذهبي عيار 24)، حاملاً الترويسة الوزارية الرسمية، وشعار النسر الجمهوري، وأختام الاعتماد الأكاديمي، وركائز التميز الست، وبيانات دار الكتب ورقم الإيداع الدولي، تليها الصفحة التمهيدية وخارطة المنهج.
                </p>
              </div>
              <div className="bg-[#132238] p-3 border border-[#C5A059]/30 text-xs text-[#E8DCC4] flex items-center justify-between">
                <span>جاهز للطباعة المباشرة والتصدير الفوري لكلا صيغتي PDF و Microsoft Word</span>
                <span className="font-mono text-[#C5A059] font-bold">2 صفحات A4</span>
              </div>
            </div>
          )}

          {/* Section A: Individual Unit Selection */}
          {(targetType === 'unit' || targetType === 'lesson') && (
            <div className="space-y-3 bg-[#FFFFFF] p-3.5 sm:p-4 border border-[#0C1E36]/20 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-[#0C1E36]">
                  اختر الوحدة الدراسية:
                </span>
                <span className="text-[11px] font-mono text-[#8C1D2A] font-bold">
                  {activeUnitMeta?.badge}
                </span>
              </div>

              <select
                value={selectedUnitNumber}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSelectedUnitNumber(val);
                  setSelectedLessonId('');
                }}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#0C1E36]/30 text-xs sm:text-sm font-bold text-[#0C1E36] focus:border-[#C5A059] focus:outline-hidden"
              >
                {Object.values(UNIT_PRINT_REGISTRY).map((u) => (
                  <option key={u.unitNumber} value={u.unitNumber}>
                    {u.title} ({u.lessonsCount} دروس)
                  </option>
                ))}
              </select>

              {/* Sub-lesson dropdown if Lesson target */}
              {targetType === 'lesson' && (
                <div className="pt-2 border-t border-[#0C1E36]/10 space-y-1.5">
                  <label className="block text-xs font-bold text-[#0C1E36]">
                    اختر الدرس المراد تصديره:
                  </label>
                  <select
                    value={selectedLessonId || (currentUnitLessons[0]?.id || '')}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#0C1E36]/30 text-xs sm:text-sm font-bold text-[#0C1E36] focus:border-[#C5A059] focus:outline-hidden"
                  >
                    {currentUnitLessons.map((l, idx) => (
                      <option key={l.id} value={l.id}>
                        الدرس {idx + 1}: {l.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Section B: Training Module Selection */}
          {targetType === 'module' && (
            <div className="space-y-2 bg-[#FFFFFF] p-3.5 sm:p-4 border border-[#0C1E36]/20 shadow-2xs">
              <span className="font-bold text-xs sm:text-sm text-[#0C1E36] block">
                اختر الموديول التدريبي المعتمد:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {(Object.entries(TRAINING_MODULES_REGISTRY) as [TrainingModuleType, typeof TRAINING_MODULES_REGISTRY[TrainingModuleType]][]).map(([key, mod]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedModule(key)}
                    className={`p-3 text-right border-2 transition cursor-pointer space-y-1 ${
                      selectedModule === key
                        ? 'bg-[#0C1E36] text-[#FFFFFF] border-[#C5A059]'
                        : 'bg-[#FAF8F5] text-[#1D1D1B] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm">{mod.title}</span>
                      {selectedModule === key && <Check className="w-4 h-4 text-[#C5A059]" />}
                    </div>
                    <p className={`text-[11px] leading-relaxed ${selectedModule === key ? 'text-[#E8DCC4]' : 'text-[#1D1D1B]/70'}`}>
                      {mod.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Edition Selection (for Units and Lessons) */}
          {targetType !== 'module' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold font-sans text-[#0C1E36] uppercase tracking-wider">
                2. نوع النسخة المصدرة (Edition):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEdition('student')}
                  className={`p-2 text-center text-xs font-bold border transition cursor-pointer ${
                    edition === 'student'
                      ? 'bg-[#1A2D47] text-white border-[#C5A059]'
                      : 'bg-white text-[#1D1D1B] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                  }`}
                >
                  نسخة الطالب
                </button>
                <button
                  type="button"
                  onClick={() => setEdition('teacher')}
                  className={`p-2 text-center text-xs font-bold border transition cursor-pointer ${
                    edition === 'teacher'
                      ? 'bg-[#1A2D47] text-white border-[#C5A059]'
                      : 'bg-white text-[#1D1D1B] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                  }`}
                >
                  دليل المعلم
                </button>
                <button
                  type="button"
                  onClick={() => setEdition('answers')}
                  className={`p-2 text-center text-xs font-bold border transition cursor-pointer ${
                    edition === 'answers'
                      ? 'bg-[#1A2D47] text-white border-[#C5A059]'
                      : 'bg-white text-[#1D1D1B] border-[#0C1E36]/20 hover:bg-[#F0EBE1]'
                  }`}
                >
                  الإجابات النموذجية
                </button>
              </div>
            </div>
          )}

          {/* Print Preferences Checklist */}
          <div className="space-y-2 bg-[#FFFFFF] p-3.5 border border-[#0C1E36]/20 text-xs">
            <span className="font-bold text-[#0C1E36] block font-sans">
              3. خيارات وتنسيقات الطباعة A4:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSolutions}
                  onChange={(e) => setShowSolutions(e.target.checked)}
                  className="rounded-xs text-[#0C1E36] focus:ring-[#C5A059]"
                />
                <span className="font-medium">تضمين الحلول وسلالم التصحيح النموذجية</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCoverAndToc}
                  onChange={(e) => setShowCoverAndToc(e.target.checked)}
                  className="rounded-xs text-[#0C1E36] focus:ring-[#C5A059]"
                />
                <span className="font-medium">تضمين صفحة الغلاف والفهرس المنهجي</span>
              </label>
            </div>

            {/* Font scaling row */}
            <div className="flex items-center justify-between pt-2 border-t border-[#0C1E36]/10 text-[11px]">
              <span className="font-medium text-[#1D1D1B]/80">حجم خط الطباعة المعتمد:</span>
              <div className="flex items-center gap-1 font-sans">
                {(['compact', 'normal', 'large'] as FontSizeScale[]).map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setFontSizeScale(scale)}
                    className={`px-2 py-0.5 border text-[11px] font-bold cursor-pointer transition ${
                      fontSizeScale === scale
                        ? 'bg-[#0C1E36] text-[#C5A059] border-[#0C1E36]'
                        : 'bg-[#FAF8F5] text-[#1D1D1B] border-[#0C1E36]/20'
                    }`}
                  >
                    {scale === 'compact' ? 'مدمج' : scale === 'normal' ? 'قياسي' : 'كبير'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Iframe Hint notice if detected */}
          {inIframe && (
            <div className="bg-[#FFF9E6] border border-[#C5A059]/60 p-2.5 text-[11px] text-[#856404] leading-relaxed flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#C5A059]" />
              <span>
                تنبيه: لتجربة تصدير PDF مثالية دون قيود بيئة المعاينة، يمكنك استخدام زر <strong>«فتح في نافذة مستقلة للطباعة»</strong>.
              </span>
            </div>
          )}

          {/* Status & Error feedback */}
          {exportError && (
            <div className="bg-red-50 border border-red-300 p-2 text-xs text-red-800 rounded-xs flex items-center gap-2">
              <span className="font-bold">تنبيه:</span>
              <span>{exportError}</span>
            </div>
          )}

          {isExporting && (
            <div className="bg-[#0C1E36] text-[#C5A059] p-2 text-xs text-center font-bold animate-pulse rounded-xs">
              جارٍ تجهيز الكتاب للطباعة والتصدير…
            </div>
          )}

        </div>

        {/* 3. Modal Actions Footer */}
        <div className="bg-[#FAF8F5] border-t-2 border-[#0C1E36]/20 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#0C1E36]/30 text-xs font-bold text-[#1D1D1B] hover:bg-[#EAE6DF] transition cursor-pointer"
          >
            إلغاء
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportWord}
              disabled={isExporting}
              className="px-3.5 py-2 bg-[#1E3A8A] text-[#FFFFFF] border border-blue-400 hover:bg-[#2563EB] transition text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              title="تصدير وتحميل كملف Microsoft Word"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-200" />
              <span>تحميل Word (.doc)</span>
            </button>

            <button
              type="button"
              onClick={handleStandalonePdf}
              disabled={isExporting}
              className="px-3.5 py-2 bg-[#C5A059] text-[#0C1E36] border border-[#0C1E36] hover:bg-[#d4b06b] transition text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              title="تصدير بجودة A4 عبر محرك النشر المستقل"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>تصدير PDF احترافي</span>
            </button>

            <button
              type="button"
              onClick={handleOpenStandalone}
              disabled={isExporting}
              className="px-3.5 py-2 bg-[#1A2D47] text-[#C5A059] border border-[#C5A059] hover:bg-[#0C1E36] hover:text-[#FFFFFF] transition text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              title="فتح نافذة طباعة مخصصة خارج الإطار"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>نافذة مستقلة</span>
            </button>

            <button
              type="button"
              onClick={handlePrintNow}
              disabled={isExporting}
              className="px-4 py-2 bg-[#0C1E36] text-[#FFFFFF] border-2 border-[#C5A059] hover:bg-[#1A2D47] transition text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" />
              <span>{isExporting ? 'جارٍ التحضير...' : 'طباعة PDF الآن'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
