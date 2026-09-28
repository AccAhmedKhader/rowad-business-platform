/**
 * Print to PDF Utility for Financial Accounting Curriculum
 * Uses window.print() API with custom print CSS (@media print) to export:
 * - Individual lesson units (Units 1 - 10)
 * - Individual lessons
 * - Comprehensive training modules (Question Bank, Mock Exams, Glossary, Model Answers)
 */

import {
  PublicationExportOptions,
  buildPublicationHtml,
  downloadAsWordDocument,
  printPublicationAsPdf,
  sanitizeFilename,
  formatPublicationFilename
} from './publicationExportEngine';

export {
  buildPublicationHtml,
  downloadAsWordDocument,
  printPublicationAsPdf,
  sanitizeFilename,
  formatPublicationFilename
};
export type { PublicationExportOptions };

export type ExportEdition = 'student' | 'teacher' | 'answers' | 'qbank' | 'exams' | 'glossary' | 'assessments';
export type FontSizeScale = 'compact' | 'normal' | 'large' | 'xlarge';
export type TrainingModuleType = 'qbank' | 'exams' | 'glossary' | 'answers' | 'assessments';

export interface PrintToPdfOptions {
  /** Target unit ID (e.g., 'unit-1', 'unit-7') or unit number (1 to 10) */
  unitId?: string;
  unitNumber?: number;

  /** Target individual lesson ID (e.g., 'lesson-1', 'lesson-2_1') */
  lessonId?: string;

  /** Target training module */
  trainingModule?: TrainingModuleType;

  /** Edition type to export */
  edition?: ExportEdition;

  /** Include answers / model solutions in output */
  showSolutions?: boolean;

  /** Include front cover and syllabus table of contents */
  showCoverAndToc?: boolean;

  /** Export ONLY the official book front cover & preface page */
  onlyCover?: boolean;

  /** Typography scale for print */
  fontSizeScale?: FontSizeScale;

  /** Custom PDF document title (sets browser default save-as filename) */
  documentTitle?: string;

  /** Open in a standalone tab/window (recommended in sandboxed iframes) */
  openInNewTab?: boolean;

  /** Automatically trigger browser print dialog upon opening */
  autoprint?: boolean;
}

export interface UnitMetadataItem {
  id: string;
  unitNumber: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  lessonsCount: number;
}

export const UNIT_PRINT_REGISTRY: Record<number, UnitMetadataItem> = {
  1: {
    id: 'unit-1',
    unitNumber: 1,
    title: 'الوحدة الأولى: أساسيات المحاسبة والتقارير المالية',
    shortTitle: 'الوحدة الأولى',
    subtitle: 'المبادئ الأساسية • معادلة الميزانية • أثر المعاملات • القوائم المالية',
    badge: 'الوحدة 1 (الأساسيات)',
    lessonsCount: 6
  },
  2: {
    id: 'unit-2',
    unitNumber: 2,
    title: 'الوحدة الثانية: التسجيل المحاسبي والدورة المستندية',
    shortTitle: 'الوحدة الثانية',
    subtitle: 'القيد المزدوج • اليومية العامة • دفتر الأستاذ • ميزان المراجعة',
    badge: 'الوحدة 2 (التسجيل والترحيل)',
    lessonsCount: 6
  },
  3: {
    id: 'unit-3',
    unitNumber: 3,
    title: 'الوحدة الثالثة: دفاتر اليومية المساعدة',
    shortTitle: 'الوحدة الثالثة',
    subtitle: 'الدفاتر المساعدة • المبيعات والمشتريات • المردودات • دفتر النقدية',
    badge: 'الوحدة 3 (الدفاتر المتخصصة)',
    lessonsCount: 6
  },
  4: {
    id: 'unit-4',
    unitNumber: 4,
    title: 'الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء',
    shortTitle: 'الوحدة الرابعة',
    subtitle: 'ميزان المراجعة • الأخطاء المؤثرة وغير المؤثرة • الحساب المعلق • قيود التصحيح',
    badge: 'الوحدة 4 (ميزان المراجعة والأخطاء)',
    lessonsCount: 6
  },
  5: {
    id: 'unit-5',
    unitNumber: 5,
    title: 'الوحدة الخامسة: القوائم المالية للمنشأة الفردية',
    shortTitle: 'الوحدة الخامسة',
    subtitle: 'حساب المتاجرة • الأرباح والخسائر • التسويات الجردية • المركز المالي',
    badge: 'الوحدة 5 (القوائم المالية)',
    lessonsCount: 6
  },
  6: {
    id: 'unit-6',
    unitNumber: 6,
    title: 'الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية',
    shortTitle: 'الوحدة السادسة',
    subtitle: 'القيد المفرد • معادلة رأس المال • حسابات المراقبة • تسوية البنك',
    badge: 'الوحدة 6 (السجلات غير المكتملة)',
    lessonsCount: 6
  },
  7: {
    id: 'unit-7',
    unitNumber: 7,
    title: 'الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول',
    shortTitle: 'الوحدة السابعة',
    subtitle: 'الإهلاك الثابت والمتناقص • مخصص الديون • استبعاد الأصول الثابتة',
    badge: 'الوحدة 7 (الإهلاك والمخصصات)',
    lessonsCount: 5
  },
  8: {
    id: 'unit-8',
    unitNumber: 8,
    title: 'الوحدة الثامنة: محاسبة شركات الأشخاص والتضامن',
    shortTitle: 'الوحدة الثامنة',
    subtitle: 'توزيع الأرباح • فائدة رأس المال • الحسابات الجارية • انضمام وانفصال شريك',
    badge: 'الوحدة 8 (شركات الأشخاص)',
    lessonsCount: 5
  },
  9: {
    id: 'unit-9',
    unitNumber: 9,
    title: 'الوحدة التاسعة: محاسبة شركات الأموال (المساهمة)',
    shortTitle: 'الوحدة التاسعة',
    subtitle: 'الأسهم والسندات • الأقساط والاكتتاب بزيادة • التوزيعات • هيكل التمويل',
    badge: 'الوحدة 9 (شركات الأموال)',
    lessonsCount: 6
  },
  10: {
    id: 'unit-10',
    unitNumber: 10,
    title: 'الوحدة العاشرة: تحليل القوائم المالية وتفسيرها',
    shortTitle: 'الوحدة العاشرة',
    subtitle: 'نسب الربحية والسيولة والكفاءة • المقارنة واتخاذ القرار • الاستدلال JRE',
    badge: 'الوحدة 10 (التحليل المالي)',
    lessonsCount: 6
  }
};

export const TRAINING_MODULES_REGISTRY: Record<TrainingModuleType, { title: string; subtitle: string; edition: ExportEdition }> = {
  qbank: {
    title: 'بنك الأسئلة الشامل المعتمد',
    subtitle: 'أسئلة تدريبية مصنفة وفق مستويات بلوم ونواتج التعلم الوزارية',
    edition: 'qbank'
  },
  exams: {
    title: 'نماذج الامتحانات والمحاكاة الرسمية للبكالوريا',
    subtitle: 'نماذج امتحانية مطابقة للمواصفات الوزارية وسلالم الدرجات (100 درجة)',
    edition: 'exams'
  },
  glossary: {
    title: 'معجم المصطلحات والمفاهيم المحاسبية المعتمد',
    subtitle: 'المفاهيم الأساسية، المعايير، والمصفوفة المعجمية للمنهج الكامل',
    edition: 'glossary'
  },
  answers: {
    title: 'دليل الإجابات النموذجية وسلالم التصحيح',
    subtitle: 'حلول تفصيلية لكافة أسئلة ونماذج المنهاج مع التبريرات المحاسبية',
    edition: 'answers'
  },
  assessments: {
    title: 'كتاب الأداءات والتقييمات المدرسية المعتمدة',
    subtitle: 'تفريغ رسمي شامل للأنشطة الصفية والواجبات المنزلية والتقييمات الأسبوعية وتدريبات الشهور (ص ۳ - ۸٤)',
    edition: 'assessments'
  }
};

/**
 * Checks if current JavaScript environment is running inside an iframe (e.g. AI Studio preview).
 */
export function isRunningInIframe(): boolean {
  try {
    return typeof window !== 'undefined' && window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Generates an application URL configured for printing the specified unit, lesson, or training module.
 */
export function buildPrintUrl(options: PrintToPdfOptions = {}): string {
  const params = new URLSearchParams();

  // Edition resolution
  const edition = options.edition || (options.trainingModule ? TRAINING_MODULES_REGISTRY[options.trainingModule]?.edition : 'student') || 'student';
  params.set('edition', edition);

  // Unit resolution
  if (options.unitNumber) {
    params.set('unit', `unit-${options.unitNumber}`);
  } else if (options.unitId) {
    params.set('unit', options.unitId);
  }

  // Lesson resolution
  if (options.lessonId) {
    params.set('lesson', options.lessonId);
  }

  // Training module resolution
  if (options.trainingModule) {
    params.set('module', options.trainingModule);
  }

  // Solutions & Covers
  if (options.showSolutions !== undefined) {
    params.set('solutions', String(options.showSolutions));
  }
  if (options.showCoverAndToc !== undefined) {
    params.set('cover', String(options.showCoverAndToc));
  }

  // Font scale
  if (options.fontSizeScale) {
    params.set('scale', options.fontSizeScale);
  }

  // Custom document title
  if (options.documentTitle) {
    params.set('docTitle', options.documentTitle);
  }

  // Auto-print trigger
  if (options.autoprint !== false) {
    params.set('autoprint', 'true');
  }

  return `/print?${params.toString()}`;
}

/**
 * Formats a clean, publication-standard Arabic title to name the resulting PDF file.
 */
export function formatPdfDocumentTitle(options: PrintToPdfOptions = {}): string {
  if (options.documentTitle) {
    return options.documentTitle.replace(/\s+/g, '_');
  }

  if (options.trainingModule) {
    const mod = TRAINING_MODULES_REGISTRY[options.trainingModule];
    return `محاسبة_مالية_${mod.title.replace(/\s+/g, '_')}_بكالوريا_2027`;
  }

  if (options.unitNumber || options.unitId) {
    const num = options.unitNumber || parseInt((options.unitId || '').replace('unit-', ''), 10) || 1;
    const unitMeta = UNIT_PRINT_REGISTRY[num];
    const unitName = unitMeta ? unitMeta.shortTitle.replace(/\s+/g, '_') : `الوحدة_${num}`;
    const editionTag = options.edition === 'teacher' ? 'دليل_المعلم' : options.edition === 'answers' ? 'الإجابات_النموذجية' : 'نسخة_الطالب';
    return `المحاسبة_المالية_${unitName}_${editionTag}_2027`;
  }

  if (options.lessonId) {
    return `المحاسبة_المالية_درس_${options.lessonId}_2027`;
  }

  return 'المحاسبة_المالية_ببساطة_وإتقان_بكالوريا_2027';
}

/**
 * Core Print to PDF Function.
 * Uses window.print() API with custom print CSS already defined.
 * Dynamically adjusts document.title so the browser default PDF filename is clean and professional.
 */
export async function printToPdf(options: PrintToPdfOptions = {}): Promise<boolean> {
  const isIframe = isRunningInIframe();

  // If explicitly requested to open in new tab, or running in an iframe with openInNewTab defaulted
  if (options.openInNewTab || (isIframe && options.openInNewTab !== false)) {
    const printUrl = buildPrintUrl({ ...options, autoprint: true });
    try {
      const opened = window.open(printUrl, '_blank');
      if (opened) {
        return true;
      }
    } catch (e) {
      console.warn('Window.open failed, falling back to local print:', e);
    }
  }

  // Format and save document title
  const originalTitle = typeof document !== 'undefined' ? document.title : '';
  const pdfTitle = formatPdfDocumentTitle(options);

  if (typeof document !== 'undefined') {
    document.title = pdfTitle;
    document.body.classList.add('is-printing-pdf');
  }

  let cleanupDone = false;
  const cleanup = () => {
    if (cleanupDone) return;
    cleanupDone = true;
    if (typeof document !== 'undefined') {
      document.title = originalTitle;
      document.body.classList.remove('is-printing-pdf');
    }
  };

  return new Promise((resolve) => {
    // Listen for afterprint event
    const handleAfterPrint = () => {
      cleanup();
      window.removeEventListener('afterprint', handleAfterPrint);
      resolve(true);
    };

    window.addEventListener('afterprint', handleAfterPrint);

    try {
      window.print();
      // Set a fallback timer in case afterprint does not fire in some mobile browsers
      setTimeout(() => {
        cleanup();
        resolve(true);
      }, 3000);
    } catch (err) {
      console.error('PrintToPdf execution failed:', err);
      cleanup();
      // Fallback: Open in standalone window
      const fallbackUrl = buildPrintUrl({ ...options, autoprint: true });
      window.open(fallbackUrl, '_blank');
      resolve(false);
    }
  });
}

/**
 * Direct shortcut: Export an individual lesson unit (Units 1 to 10) to PDF.
 */
export async function exportLessonUnitToPdf(
  unitIdOrNumber: string | number,
  options: Partial<PrintToPdfOptions> = {}
): Promise<boolean> {
  const unitNumber = typeof unitIdOrNumber === 'number'
    ? unitIdOrNumber
    : parseInt(String(unitIdOrNumber).replace('unit-', ''), 10) || 1;

  const unitMeta = UNIT_PRINT_REGISTRY[unitNumber];
  const customDocTitle = options.documentTitle || (unitMeta ? `المحاسبة_المالية_${unitMeta.shortTitle.replace(/\s+/g, '_')}` : `الوحدة_${unitNumber}`);

  return printToPdf({
    unitNumber,
    unitId: `unit-${unitNumber}`,
    documentTitle: customDocTitle,
    edition: options.edition || 'student',
    showSolutions: options.showSolutions ?? true,
    showCoverAndToc: options.showCoverAndToc ?? true,
    fontSizeScale: options.fontSizeScale || 'normal',
    openInNewTab: options.openInNewTab ?? false,
    ...options
  });
}

/**
 * Direct shortcut: Export an individual lesson to PDF.
 */
export async function exportIndividualLessonToPdf(
  lessonId: string,
  options: Partial<PrintToPdfOptions> = {}
): Promise<boolean> {
  return printToPdf({
    lessonId,
    documentTitle: options.documentTitle || `المحاسبة_المالية_درس_${lessonId}`,
    edition: options.edition || 'student',
    showSolutions: options.showSolutions ?? true,
    showCoverAndToc: options.showCoverAndToc ?? false,
    fontSizeScale: options.fontSizeScale || 'normal',
    openInNewTab: options.openInNewTab ?? false,
    ...options
  });
}

/**
 * Direct shortcut: Export a training module (Question Bank, Exams, Glossary, Model Answers) to PDF.
 */
export async function exportTrainingModuleToPdf(
  trainingModule: TrainingModuleType,
  options: Partial<PrintToPdfOptions> = {}
): Promise<boolean> {
  const modMeta = TRAINING_MODULES_REGISTRY[trainingModule];
  const customDocTitle = options.documentTitle || `محاسبة_مالية_${modMeta.title.replace(/\s+/g, '_')}`;

  return printToPdf({
    trainingModule,
    edition: modMeta.edition,
    documentTitle: customDocTitle,
    showSolutions: options.showSolutions ?? true,
    showCoverAndToc: options.showCoverAndToc ?? true,
    fontSizeScale: options.fontSizeScale || 'normal',
    openInNewTab: options.openInNewTab ?? false,
    ...options
  });
}

/**
 * Direct shortcut: Export publication directly to Microsoft Word (.doc) format
 */
export function exportToWord(options: PrintToPdfOptions = {}): void {
  const isCoverOnly = options.onlyCover || options.unitId === 'cover-only';
  const uNum = (!isCoverOnly && options.unitNumber) || (!isCoverOnly && options.unitId ? parseInt(options.unitId.replace('unit-', ''), 10) : undefined);
  const unitMeta = uNum ? UNIT_PRINT_REGISTRY[uNum] : undefined;
  const title = options.documentTitle || (isCoverOnly ? 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027' : formatPdfDocumentTitle(options));

  downloadAsWordDocument({
    title,
    edition: (options.edition || 'student') as any,
    unitNumber: uNum,
    unitTitle: unitMeta?.title,
    lessonId: isCoverOnly ? undefined : options.lessonId,
    trainingModule: isCoverOnly ? undefined : options.trainingModule,
    includeAnswers: options.showSolutions ?? true,
    includeCover: true,
    includeTableOfContents: isCoverOnly ? false : (options.showCoverAndToc ?? true),
    onlyCover: isCoverOnly
  });
}

/**
 * Direct shortcut: Export publication to PDF via dedicated standalone window generator
 */
export async function exportStandalonePdf(options: PrintToPdfOptions = {}): Promise<boolean> {
  const isCoverOnly = options.onlyCover || options.unitId === 'cover-only';
  const uNum = (!isCoverOnly && options.unitNumber) || (!isCoverOnly && options.unitId ? parseInt(options.unitId.replace('unit-', ''), 10) : undefined);
  const unitMeta = uNum ? UNIT_PRINT_REGISTRY[uNum] : undefined;
  const title = options.documentTitle || (isCoverOnly ? 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027' : formatPdfDocumentTitle(options));

  return printPublicationAsPdf({
    title,
    edition: (options.edition || 'student') as any,
    unitNumber: uNum,
    unitTitle: unitMeta?.title,
    lessonId: isCoverOnly ? undefined : options.lessonId,
    trainingModule: isCoverOnly ? undefined : options.trainingModule,
    includeAnswers: options.showSolutions ?? true,
    includeCover: true,
    includeTableOfContents: isCoverOnly ? false : (options.showCoverAndToc ?? true),
    onlyCover: isCoverOnly
  });
}

/**
 * Direct shortcut: Export ONLY the Book Front Cover & Preface to Word (.doc)
 */
export function exportCoverToWord(options: Partial<PrintToPdfOptions> = {}): void {
  exportToWord({
    ...options,
    onlyCover: true,
    documentTitle: options.documentTitle || 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027'
  });
}

/**
 * Direct shortcut: Export ONLY the Book Front Cover & Preface to Standalone PDF
 */
export async function exportCoverToPdf(options: Partial<PrintToPdfOptions> = {}): Promise<boolean> {
  return exportStandalonePdf({
    ...options,
    onlyCover: true,
    documentTitle: options.documentTitle || 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027'
  });
}

