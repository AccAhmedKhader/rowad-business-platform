/**
 * Publication Export Engine for Financial Accounting Curriculum
 * Replaces screen-based window.print() with an independent, dedicated publication generator.
 * Generates standalone, RTL-compliant, publication-ready A4 documents for Word (.doc) and PDF export.
 */

import { LessonContent, UnitDefinition } from '../types';
import { allLessons, getLessonsForUnit, availableUnits } from '../data/lessonsData';
import { expandedQuestionBank } from '../data/expandedQuestionBank';
import { comprehensiveExams } from '../data/examsData';
import { allGlossaryTerms, GLOSSARY_UNITS_CONFIG } from '../data/glossary';
import { CANONICAL_MASTER_ASSESSMENTS } from '../data/canonicalMasterAssessments';

export type PublicationEdition =
  | 'student'
  | 'teacher'
  | 'answers'
  | 'qbank'
  | 'exams'
  | 'glossary'
  | 'assessments';

export interface PublicationExportOptions {
  title: string;
  subtitle?: string;
  edition: PublicationEdition;
  unitNumber?: number;
  unitTitle?: string;
  lessonId?: string;
  trainingModule?: string;
  includeAnswers: boolean;
  includeCover: boolean;
  includeTableOfContents: boolean;
  onlyCover?: boolean;
  academicYear?: string;
  teacherName?: string;
  schoolName?: string;
  studentName?: string;
  contentHtml?: string;
}

/**
 * Escapes unsafe characters for HTML inclusion while preserving Arabic text
 */
export function escapeHtml(str: string | number | undefined | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitizes file names to remove illegal filesystem characters: \ / : * ? " < > |
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .trim();
}

/**
 * Formats standard, clean Arabic filenames for exports
 */
export function formatPublicationFilename(
  options: PublicationExportOptions,
  extension: 'doc' | 'pdf'
): string {
  const yearTag = options.academicYear ? options.academicYear.replace(/[\/\s]/g, '_') : '2026_2027';

  let scope = 'المنهج_الكامل';
  if (options.unitNumber) {
    scope = `الوحدة_${options.unitNumber}`;
  } else if (options.lessonId) {
    scope = `درس_${options.lessonId}`;
  } else if (options.trainingModule) {
    const modMap: Record<string, string> = {
      qbank: 'بنك_الأسئلة_الشامل',
      exams: 'نماذج_الامتحانات_الرسمية',
      glossary: 'معجم_المصطلحات_المحاسبية',
      assessments: 'كتاب_الأداءات_والتقييمات',
      answers: 'دليل_الإجابات_النموذجية'
    };
    scope = modMap[options.trainingModule] || options.trainingModule;
  }

  let editionTag = 'نسخة_الطالب';
  if (options.edition === 'teacher') editionTag = 'دليل_المعلم';
  else if (options.edition === 'answers') editionTag = 'الإجابات_النموذجية';
  else if (options.edition === 'qbank') editionTag = 'بنك_الأسئلة';
  else if (options.edition === 'exams') editionTag = 'نماذج_الامتحانات';
  else if (options.edition === 'glossary') editionTag = 'معجم_المصطلحات';
  else if (options.edition === 'assessments') editionTag = 'كتاب_التقييمات';

  const base = `المحاسبة_المالية_${scope}_${editionTag}_${yearTag}`;
  return `${sanitizeFilename(base)}.${extension}`;
}

/**
 * Builds standalone, isolated CSS dedicated strictly for A4 print and Word documents
 */
export function getPublicationStyles(isWordMode = false): string {
  const fontFamily = isWordMode
    ? 'Tahoma, Arial, "Traditional Arabic", sans-serif'
    : 'Cairo, Amiri, Tahoma, Arial, sans-serif';

  return `
    @page {
      size: A4 portrait;
      margin: 15mm 15mm 18mm 15mm;
    }
    @page Section1 {
      size: A4 portrait;
      margin: 2cm 2cm 2cm 2cm;
      mso-header-margin: 1cm;
      mso-footer-margin: 1cm;
    }
    .WordSection1 {
      page: Section1;
      direction: rtl;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #FFFFFF;
      color: #111827;
      direction: rtl;
      text-align: right;
      font-family: ${fontFamily};
      font-size: ${isWordMode ? '12pt' : '11pt'};
      line-height: 1.7;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      unicode-bidi: plaintext;
    }
    * {
      box-sizing: border-box;
    }
    img, svg {
      max-width: 100%;
    }
    .no-print {
      display: none !important;
    }
    .publication-document {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 0;
    }
    
    /* Grand Front Book Cover Page (Exact Royal Navy & Gold External Commercial Standard) */
    .publication-cover {
      background-color: #0C1E36 !important;
      color: #FDFCF7 !important;
      border: 6pt solid #C5A059 !important;
      padding: 16pt 16pt !important;
      margin-bottom: 24pt !important;
      min-height: 255mm !important;
      box-sizing: border-box !important;
      text-align: center !important;
      page-break-after: always !important;
      break-after: page !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      position: relative !important;
    }
    .publication-cover-inner {
      border: 1.5pt solid rgba(197, 160, 89, 0.5) !important;
      padding: 12pt 14pt !important;
      box-sizing: border-box !important;
      min-height: 245mm !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
    }
    .publication-cover-header-table {
      width: 100% !important;
      border-collapse: collapse !important;
      border-bottom: 2pt solid #C5A059 !important;
      padding-bottom: 8pt !important;
      margin-bottom: 10pt !important;
    }
    .publication-cover-header-table td {
      border: none !important;
      padding: 4pt !important;
      vertical-align: middle !important;
    }
    .publication-pillar-table {
      width: 100% !important;
      border-collapse: separate !important;
      border-spacing: 5pt !important;
      margin: 10pt 0 !important;
    }
    .publication-pillar-table td {
      width: 50% !important;
      background: #1A2D47 !important;
      border: 1pt solid rgba(197, 160, 89, 0.45) !important;
      padding: 6pt 8pt !important;
      text-align: right !important;
      vertical-align: top !important;
    }
    .publication-pillar-title {
      font-size: 9.5pt !important;
      font-weight: bold !important;
      color: #C5A059 !important;
      margin-bottom: 2pt !important;
    }
    .publication-pillar-desc {
      font-size: 8pt !important;
      color: #E8DCC4 !important;
      line-height: 1.4 !important;
    }

    /* Inside Preface & Study Roadmap Page */
    .publication-preface {
      border: 2pt solid #0C1E36 !important;
      background: #FFFFFF !important;
      padding: 18pt 20pt !important;
      margin-bottom: 24pt !important;
      page-break-after: always !important;
      break-after: page !important;
      box-sizing: border-box !important;
    }
    
    /* Metadata Block */
    .publication-metadata {
      margin: 20pt 0;
      page-break-after: always;
      break-after: page;
    }

    /* Headings */
    .publication-heading {
      color: #0C1E36;
      break-after: avoid;
      page-break-after: avoid;
      margin: 18pt 0 8pt 0;
    }
    h1.publication-heading { font-size: 20pt; border-bottom: 2px solid #0C1E36; padding-bottom: 6pt; }
    h2.publication-heading { font-size: 16pt; color: #0C1E36; }
    h3.publication-heading { font-size: 13pt; color: #781D28; }
    h4.publication-heading { font-size: 11.5pt; color: #1F2937; }

    /* Table of Contents */
    .publication-toc {
      margin: 20pt 0;
      page-break-after: always;
      break-after: page;
    }
    .publication-toc-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dotted #9CA3AF;
      padding: 6pt 0;
      font-size: 11pt;
    }
    .publication-toc-title { font-weight: bold; color: #0C1E36; }
    .publication-toc-page { font-family: monospace; color: #4B5563; }

    /* Unit Divider */
    .publication-unit-divider {
      break-before: page;
      page-break-before: always;
      border: 3px solid #0C1E36;
      background: #FAF8F5;
      padding: 24pt 20pt;
      margin: 24pt 0;
      text-align: center;
    }
    .publication-unit-divider h2 {
      font-size: 22pt;
      font-weight: 900;
      color: #0C1E36;
      margin: 10pt 0;
    }
    .publication-unit-divider p {
      font-size: 12pt;
      color: #781D28;
      font-weight: bold;
    }
    .publication-big-idea {
      background: #FFFFFF;
      border: 1px solid #C5A059;
      padding: 10pt 14pt;
      margin: 14pt auto;
      text-align: right;
      font-size: 10.5pt;
      line-height: 1.6;
    }

    /* Lesson Container */
    .publication-lesson {
      margin-bottom: 24pt;
      break-after: page;
      page-break-after: always;
    }
    .publication-lesson-header {
      border: 2px solid #0C1E36;
      background: #FFFFFF;
      padding: 14pt;
      margin-bottom: 14pt;
    }
    .publication-lesson-tag {
      background: #781D28;
      color: #FFFFFF;
      padding: 2pt 8pt;
      font-size: 9.5pt;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 6pt;
    }

    /* Cards and Sections */
    .publication-section {
      break-inside: auto;
      page-break-inside: auto;
      margin: 14pt 0;
    }
    .publication-card {
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
      padding: 12pt 14pt;
      margin: 10pt 0;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .publication-card-callout {
      border-right: 4px solid #C5A059;
      background: #FAF8F5;
      padding: 10pt 12pt;
      margin: 10pt 0;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .publication-card-warning {
      border-right: 4px solid #DC2626;
      background: #FEF2F2;
      padding: 10pt 12pt;
      margin: 10pt 0;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .publication-card-teacher {
      border: 2px dashed #1E3A8A;
      background: #EFF6FF;
      padding: 12pt;
      margin: 12pt 0;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    /* Tables */
    .publication-table {
      width: 100%;
      max-width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin: 12pt 0;
      font-size: 10pt;
      direction: rtl;
    }
    .publication-table th,
    .publication-table td {
      border: 1px solid #9CA3AF;
      padding: 5pt 7pt;
      text-align: right;
      vertical-align: top;
      overflow-wrap: anywhere;
      word-break: normal;
    }
    .publication-table thead {
      display: table-header-group;
      background: #0C1E36;
      color: #FFFFFF;
      font-weight: bold;
    }
    .publication-table tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .publication-table tbody tr:nth-child(even) {
      background: #F9FAFB;
    }

    /* Questions & Answers */
    .publication-question {
      border: 1px solid #D1D5DB;
      padding: 12pt;
      margin: 10pt 0;
      background: #FFFFFF;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .publication-question-stem {
      font-weight: bold;
      font-size: 11pt;
      color: #0C1E36;
      margin-bottom: 8pt;
    }
    .publication-options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6pt;
      margin: 8pt 0;
    }
    .publication-option {
      border: 1px solid #E5E7EB;
      background: #F9FAFB;
      padding: 6pt 8pt;
      font-size: 10pt;
      display: flex;
      align-items: center;
      gap: 6pt;
    }
    .publication-option-letter {
      display: inline-block;
      width: 18pt;
      height: 18pt;
      line-height: 18pt;
      text-align: center;
      border: 1px solid #9CA3AF;
      font-weight: bold;
      background: #FFFFFF;
      shrink: 0;
    }
    .publication-answer {
      border-right: 4px solid #16A34A;
      background: #F0FDF4;
      padding: 8pt 10pt;
      margin-top: 8pt;
      font-size: 10pt;
      color: #14532D;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .publication-answer-blank {
      border-bottom: 1px dashed #9CA3AF;
      min-height: 24pt;
      margin: 8pt 0;
      color: #9CA3AF;
      font-size: 9pt;
      padding-top: 4pt;
    }

    /* Footer */
    .publication-footer {
      border-top: 1px solid #D1D5DB;
      padding-top: 10pt;
      margin-top: 20pt;
      text-align: center;
      font-size: 9pt;
      color: #6B7280;
    }

    /* Inline formula / numbers */
    .num-ltr {
      direction: ltr;
      display: inline-block;
      font-family: monospace;
      unicode-bidi: embed;
    }
  `;
}

/**
 * Builds HTML for Front Cover and Preface matching the platform's Grand Edition
 */
function buildCoverHtml(options: PublicationExportOptions): string {
  const editionTitleMap: Record<PublicationEdition, string> = {
    student: 'نسخة الطالب المتكاملة — الإصدار الأكاديمي المعتمد',
    teacher: 'نسخة المعلم الإرشادية وخطط التدريس النموذجية',
    answers: 'كتيب الإجابات النموذجية وسلالم التحكيم الوزارية',
    qbank: 'كتيب بنك الأسئلة الموحد (أسئلة معتمدة ومصنفة)',
    exams: 'كتيب الامتحانات والمحاكاة الرسمية للبكالوريا',
    glossary: 'معجم المصطلحات والمفاهيم المحاسبية المعتمد',
    assessments: 'كتاب الأداءات والتقييمات المدرسية المعتمدة (ص ۳ - ۸٤)'
  };

  const editionText = editionTitleMap[options.edition] || 'نسخة معتمدة';

  let badgeSubtitle = 'الكتاب الخارجي المرجعي الأكبر في مصر لشهادة البكالوريا';
  let mainBookTitle = 'المحاسبة المالية';
  let secondaryBookTitle = 'ببساطة وإتقان';
  let taglineDesc = 'المرجع المتكامل في الشرح النظري، التطبيقات المحلولة، الدورة المستندية، ودليل إتقان مقال الاستدلال المحاسبي الوزاري (JRE)';
  let scopeBadgeText = 'المنهاج المعتمد الكامل: 10 وحدات دراسية • 58 درساً مفصلاً • 250+ مسألة';

  if (options.edition === 'assessments' || options.trainingModule === 'assessments') {
    badgeSubtitle = 'كتاب الأداءات والتقييمات المدرسية المعتمدة لشهادة البكالوريا المصرية';
    mainBookTitle = 'الأداءات والتقييمات';
    secondaryBookTitle = 'المدرسية المعتمدة (ص ۳ - ۸٤)';
    taglineDesc = 'تفريغ رسمي شامل لكافة الأنشطة الصفية والواجبات المنزلية والتقييمات الأسبوعية ونماذج الشهور، مربوطة بمستويات بلوم ونواتج التعلم';
    scopeBadgeText = 'توثيق رسمي ۲۸۸ مفرداً معتمداً • الوحدات 1 إلى 5 • نماذج أ، ب، ج كاملة بالحلول';
  } else if (options.edition === 'glossary' || options.trainingModule === 'glossary') {
    badgeSubtitle = 'كتيب الملحق المعجمي الرسمي المعتمد لشهادة البكالوريا المصرية';
    mainBookTitle = 'معجم المصطلحات والمفاهيم';
    secondaryBookTitle = 'المحاسبية المعتمد (عربي — إنجليزي)';
    taglineDesc = 'الدليل المعجمي المقنن: التفسير المبسط، التعريف الأكاديمي المعياري، التطبيق بالأرقام، وأخطر الأفخاخ الامتحانية';
    scopeBadgeText = 'المنهاج المعتمد الكامل: 10 وحدات دراسية • كافة مصطلحات كتاب الوزارة • فهرس ألفبائي';
  } else if (options.unitNumber) {
    const meta = availableUnits.find(u => u.unitNumber === options.unitNumber);
    scopeBadgeText = `إصدار خاص: الوحدة المقررة (${meta ? meta.title : `الوحدة ${options.unitNumber}`})`;
  } else if (options.lessonId) {
    scopeBadgeText = `إصدار الدرس المقنن: ${options.lessonId}`;
  }

  return `
    <header class="publication-cover">
      <div class="publication-cover-inner">
        <!-- 1. Top Ministerial Header Table -->
        <table class="publication-cover-header-table">
          <tr>
            <td style="text-align: right; width: 35%;">
              <div style="font-weight: 900; font-size: 11pt; color: #FFFFFF;">جمهورية مصر العربية</div>
              <div style="font-size: 9.5pt; color: #C5A059; font-weight: bold; margin-top: 1pt;">وزارة التربية والتعليم والتعليم الفني</div>
              <div style="font-size: 7.5pt; color: #E8DCC4;">قطاع التعليم العام والتجاري • الإدارة المركزية لتطوير المناهج</div>
            </td>
            <td style="text-align: center; width: 30%;">
              <div style="background: #1A2D47; border: 1pt solid #C5A059; padding: 4pt 8pt; display: inline-block;">
                <div style="font-size: 7.5pt; font-family: monospace; font-weight: bold; color: #C5A059; letter-spacing: 1px;">EGYPTIAN BACCALAUREATE (EB)</div>
                <div style="font-size: 9.5pt; font-weight: 900; color: #FFFFFF;">سلسلة التميز الأكاديمي المعتمدة</div>
              </div>
            </td>
            <td style="text-align: left; width: 35%;">
              <div style="font-size: 10pt; font-family: monospace; font-weight: 900; color: #C5A059;">2026 / 2027</div>
              <div style="font-size: 9.5pt; font-weight: bold; color: #FFFFFF;">شهادة البكالوريا المصرية</div>
              <div style="font-size: 7.5pt; color: #E8DCC4;">مسار إدارة الأعمال • الصف الثاني الثانوي</div>
            </td>
          </tr>
        </table>

        <!-- 2. Accreditation Seals -->
        <div style="margin: 4pt 0 10pt 0;">
          <div style="display: inline-block; background: #C5A059; color: #0C1E36; font-weight: 900; font-size: 8.5pt; padding: 3.5pt 10pt; border: 1pt solid #FFFFFF; margin: 2pt;">
            🛡️ مطابق 100% للمواصفات الوزارية وأحدث قرارات التطوير الأكاديمي
          </div>
          <div style="display: inline-block; background: #1A2D47; color: #C5A059; font-weight: bold; font-size: 8.5pt; padding: 3.5pt 10pt; border: 1pt solid rgba(197, 160, 89, 0.4); margin: 2pt;">
            ✨ طبعة فاخرة موثقة بدار الكتب
          </div>
        </div>

        <!-- 3. Grand Book Title Section -->
        <div style="margin: 8pt 0 12pt 0;">
          <div style="display: inline-block; background: #1A2D47; color: #C5A059; border: 1pt solid #C5A059; padding: 3pt 12pt; font-size: 8.5pt; font-weight: bold; margin-bottom: 6pt;">
            ${escapeHtml(badgeSubtitle)}
          </div>

          <h1 style="font-size: 34pt; font-weight: 900; color: #FFFFFF; margin: 4pt 0; line-height: 1.15; font-family: 'Amiri', 'Cairo', serif;">
            ${escapeHtml(mainBookTitle)}
          </h1>

          <div style="display: flex; align-items: center; justify-content: center; gap: 8pt; margin: 6pt 0;">
            <span style="display: inline-block; height: 1.5pt; width: 40pt; background: #C5A059;"></span>
            <span style="font-size: 20pt; font-weight: 900; color: #C5A059; letter-spacing: 0.5px;">
              ${escapeHtml(secondaryBookTitle)}
            </span>
            <span style="display: inline-block; height: 1.5pt; width: 40pt; background: #C5A059;"></span>
          </div>

          <p style="font-size: 9.5pt; color: #E8DCC4; max-width: 85%; margin: 6pt auto; line-height: 1.5;">
            ${escapeHtml(taglineDesc)}
          </p>

          <div style="display: inline-block; background: #781D28; color: #FFFFFF; font-weight: bold; font-size: 9pt; padding: 4pt 14pt; border: 1.5pt solid #C5A059; margin-top: 6pt;">
            ${escapeHtml(scopeBadgeText)}
          </div>
        </div>

        <!-- 4. Commercial Highlight Grid (6 Pillars) -->
        <table class="publication-pillar-table">
          <tr>
            <td>
              <div class="publication-pillar-title">📖 10 وحدات و 58 درساً</div>
              <div class="publication-pillar-desc">تغطية شاملة ومفصلة من الفروض المحاسبية والقيود وحتى القوائم والتحليل المالي.</div>
            </td>
            <td>
              <div class="publication-pillar-title">✔️ 250+ مسألة وتطبيق</div>
              <div class="publication-pillar-desc">تدرج متوازن بالحلول التفصيلية، دفاتر اليومية الرسمية، وحسابات الأستاذ T.</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="publication-pillar-title">⚖️ دليل استدلال JRE (20 درجة)</div>
              <div class="publication-pillar-desc">تدريب تخصصي لصياغة الحجج وضمان درجات مقال التفسير المحاسبي الوزاري.</div>
            </td>
            <td>
              <div class="publication-pillar-title">🎓 بنك الأسئلة الموحد</div>
              <div class="publication-pillar-desc">أكثر من 300 سؤال تدريبي مصنف بمستويات بلوم مع إجابات وسلالم تصحيح نموذجية.</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="publication-pillar-title">📄 دراسات حالة واقعية</div>
              <div class="publication-pillar-desc">سيناريوهات أعمال من قلب السوق المصري (مخبز مريم، محلات بلال، زيد، حسن).</div>
            </td>
            <td>
              <div class="publication-pillar-title">🏆 كبسولات المراجعة والأفخاخ</div>
              <div class="publication-pillar-desc">ملخصات سريعة ومصطلحات معتمدة وتحذير من أخطر مصائد الامتحانات الوزارية.</div>
            </td>
          </tr>
        </table>

        <!-- 5. Footer Credits, Barcode & Legal Bar -->
        <div style="border-top: 1.5pt solid #C5A059; padding-top: 8pt; margin-top: 8pt;">
          <table style="width: 100%; border: none; border-collapse: collapse;">
            <tr>
              <td style="text-align: right; border: none; padding: 2pt;">
                <div style="font-weight: bold; color: #FFFFFF; font-size: 9.5pt;">الصف الثاني الثانوي — مسار إدارة الأعمال (شهادة البكالوريا المصرية 2027)</div>
                <div style="font-size: 8pt; color: #C5A059; margin-top: 2pt;">إعداد وتأليف نخبة من كبار الخبراء وموجهي المحاسبة المالية بجمهورية مصر العربية</div>
                ${options.studentName ? `<div style="font-size: 8pt; color: #FFFFFF; margin-top: 2pt;">اسم الطالب: <strong>${escapeHtml(options.studentName)}</strong></div>` : ''}
                ${options.schoolName ? `<div style="font-size: 8pt; color: #E8DCC4;">المدرسة: ${escapeHtml(options.schoolName)}</div>` : ''}
              </td>
              <td style="text-align: left; border: none; padding: 2pt; width: 140pt;">
                <div style="background: #1A2D47; border: 1pt solid #C5A059; padding: 4pt 8pt; text-align: center;">
                  <div style="font-size: 7.5pt; font-family: monospace; font-weight: bold; color: #FFFFFF;">OFFICIAL DIGITAL EDITION</div>
                  <div style="font-size: 7.5pt; font-family: monospace; color: #C5A059; font-weight: bold;">ISBN: 978-977-08-4120-1</div>
                </div>
              </td>
            </tr>
          </table>

          <div style="border-top: 1pt solid rgba(197, 160, 89, 0.4); margin-top: 6pt; padding-top: 4pt; font-size: 7.5pt; color: #C5A059; display: flex; justify-content: space-between;">
            <span>${escapeHtml(editionText)}</span>
            <span>إيداع دار الكتب والوثائق المصرية: 14280 / 2026</span>
            <span>جميع الحقوق محفوظة © دار التميز للنشر والتقنيات التعليمية</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Inside Preface & 4 Golden Study Rules Page -->
    <section class="publication-preface">
      <div style="border-bottom: 2.5pt solid #0C1E36; padding-bottom: 6pt; margin-bottom: 12pt; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 8pt; font-weight: bold; color: #8A5D00; font-family: monospace; letter-spacing: 1px;">PREFACE & METHODOLOGY</div>
          <h2 style="font-size: 15pt; font-weight: 900; color: #0C1E36; margin: 2pt 0 0 0;">مقدمة الطبعة ودليل التفوق الدراسي</h2>
        </div>
        <div style="text-align: left; font-size: 8.5pt; font-family: monospace; color: #0C1E36;">
          <div style="font-weight: bold;">طبعة البكالوريا 2027</div>
          <div style="color: #15803D; font-weight: bold;">مطابقة 100% للوزارة</div>
        </div>
      </div>

      <div style="font-size: 9.5pt; line-height: 1.7; color: #1D1D1B; margin-bottom: 14pt;">
        <p style="font-weight: bold; font-size: 11pt; color: #0C1E36; margin-bottom: 6pt;">
          أبناءنا وبناتنا طلاب وطالبات البكالوريا المصرية، زملاءنا الأفاضل معلمي وموجهي مادة المحاسبة المالية:
        </p>
        <p style="margin-bottom: 6pt;">
          يسرنا أن نضع بين أيديكم هذا الكتاب التعليمي المرجعي الشامل <strong>«المحاسبة المالية ببساطة وإتقان»</strong>، والذي تم تصميمه وتأليفه وفق أحدث المناهج المطورة لشهادة البكالوريا المصرية (EB) لمسار إدارة الأعمال، ليكون رفيقكم الأمين ليس فقط لاجتياز الامتحانات بتفوق مستحق، بل لبناء عقلية محاسبية واعية ومحترفة تفهم أسرار عالم المال والأعمال.
        </p>
        <p>
          لقد راعينا في هذا الإصدار كسر النمطية والجمود التقليدي للكتب، فدمجنا بين: <strong>الفهم النظري المتين القائم على الفروض والمبادئ</strong>، و <strong>التطبيق الرقمي العملي خطوة بخطوة</strong>، و <strong>دراسات الحالة الواقعية المستمدة من نبض الاقتصاد المصري</strong>، بالإضافة إلى <strong>المعالجة الشاملة لسؤال الاستدلال المحاسبي (JRE)</strong> الذي يمثل 20 درجة محورية في الورقة الامتحانية الوزارية.
        </p>
      </div>

      <!-- 4 Golden Study Rules Box -->
      <div style="background: #FAF8F5; border: 1.5pt solid #C5A059; padding: 10pt 12pt; margin-bottom: 14pt;">
        <div style="font-weight: 900; font-size: 10.5pt; color: #0C1E36; border-bottom: 1pt solid rgba(197, 160, 89, 0.4); padding-bottom: 4pt; margin-bottom: 8pt;">
          ✨ خارطة طريق الطالب المتفوق — 4 خطوات للدرجة النهائية (100%):
        </div>
        <table style="width: 100%; border: none; border-collapse: separate; border-spacing: 6pt;">
          <tr>
            <td style="width: 50%; vertical-align: top; border: none; padding: 0;">
              <div style="font-weight: bold; color: #0C1E36; font-size: 9.5pt; margin-bottom: 2pt;">1. ابدأ بالتمهيد وافهم (لماذا؟):</div>
              <div style="font-size: 8.5pt; color: #374151; line-height: 1.45;">اقرأ قصة الدرس الواقعية؛ فالمحاسبة وُجدت لحل مشاكل التجارة، وفهم السبب يرسخ القيد للأبد.</div>
            </td>
            <td style="width: 50%; vertical-align: top; border: none; padding: 0;">
              <div style="font-weight: bold; color: #0C1E36; font-size: 9.5pt; margin-bottom: 2pt;">2. حل المسألة بيدك قبل النظر للإجابة:</div>
              <div style="font-size: 8.5pt; color: #374151; line-height: 1.45;">المحاسبة مهارة يد وذهن، تتبع خطوات التفكير ثم طابق قيودك وأرقامك مع خطوات الحل النموذجية.</div>
            </td>
          </tr>
          <tr>
            <td style="width: 50%; vertical-align: top; border: none; padding: 0;">
              <div style="font-weight: bold; color: #991B1B; font-size: 9.5pt; margin-bottom: 2pt;">3. احذر صناديق (⚠️ خطأ شائع):</div>
              <div style="font-size: 8.5pt; color: #374151; line-height: 1.45;">رصدنا أكثر من 100 فخ امتحاني يقع فيها معظم الطلاب؛ فاقرأها بتركيز شديد.</div>
            </td>
            <td style="width: 50%; vertical-align: top; border: none; padding: 0;">
              <div style="font-weight: bold; color: #0C1E36; font-size: 9.5pt; margin-bottom: 2pt;">4. أتقن بنية مقال الاستدلال JRE:</div>
              <div style="font-size: 8.5pt; color: #374151; line-height: 1.45;">لا تكتفِ بالناتج فقط، بل برهن على صحة معالجتك مستنداً للمبدأ وفند الرأي الخطأ.</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Legal & Anti-Piracy Box -->
      <div style="border: 1pt solid #0C1E36; background: #FAF8F5; padding: 8pt 10pt; font-size: 8pt; color: #1F2937;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1pt solid rgba(12,30,54,0.15); padding-bottom: 3pt; margin-bottom: 4pt; font-weight: bold; color: #0C1E36;">
          <span>© بيان التوثيق القانوني وحماية الملكية الفكرية:</span>
          <span style="color: #781D28; font-family: monospace;">قانون رقم 82 لسنة 2002</span>
        </div>
        <table style="width: 100%; border: none; border-collapse: collapse;">
          <tr>
            <td style="border: none; padding: 2pt; width: 50%; vertical-align: top;">
              <div><strong>الناشر:</strong> دار التميز للنشر والتقنيات التعليمية الحديثة — ج.م.ع.</div>
              <div><strong>رقم الإيداع بدار الكتب المصرية:</strong> 14280 لسنة 2026.</div>
              <div><strong>الترقيم الدولي الموحد:</strong> ISBN: 978-977-08-4120-1.</div>
            </td>
            <td style="border: none; padding: 2pt; width: 50%; vertical-align: top;">
              <div><strong>العام الدراسي:</strong> 2026 / 2027.</div>
              <div><strong>المطابقة المنهجية:</strong> معتمد وفق مواصفات المركز القومي للامتحانات والتقويم التربوي.</div>
              <div><strong>تحذير قانوني:</strong> يُحظر تماماً استنساخ أي جزء من هذا المصنف دون إذن كتابي مسبق.</div>
            </td>
          </tr>
        </table>
      </div>
    </section>
  `;
}

/**
 * Builds HTML for Book Metadata Page
 */
function buildMetadataTableHtml(options: PublicationExportOptions): string {
  const academicYear = options.academicYear || '2026 / 2027';

  return `
    <section class="publication-metadata">
      <h2 class="publication-heading">بيانات وتوثيق المصنف الأكاديمي</h2>
      <table class="publication-table">
        <tbody>
          <tr>
            <td style="width: 30%; font-weight: bold; background: #F3F4F6;">اسم المصنف:</td>
            <td>المحاسبة المالية ببساطة وإتقان — شهادة البكالوريا المصرية (EB)</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #F3F4F6;">المؤلف وجهة الإعداد:</td>
            <td>فريق تطوير المناهج والتعليم التجاري والمهني — معتمد وفق معايير EAS</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #F3F4F6;">نوع الإصدار المنشور:</td>
            <td><strong>${escapeHtml(options.edition === 'teacher' ? 'دليل المعلم وخطط التدريس' : options.edition === 'answers' ? 'الإجابات وسلالم التحكيم' : 'نسخة الطالب المتكاملة')}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #F3F4F6;">العام الدراسي المستهدف:</td>
            <td>${escapeHtml(academicYear)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #F3F4F6;">المرجعية المعيارية:</td>
            <td>معايير المحاسبة المصرية (EAS) وقانون الشركات المصري 159 لسنة 1981 وقانون التجارة 17 لسنة 1999</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #F3F4F6;">حقوق النشر والتوزيع:</td>
            <td>جميع الحقوق محفوظة للمنصة التعليمية • لا يجوز نسخ المصنف لأغراض تجارية دون إذن كتابي مسبق</td>
          </tr>
        </tbody>
      </table>
    </section>
  `;
}

/**
 * Builds HTML for Table of Contents
 */
function buildTableOfContentsHtml(activeUnits: UnitDefinition[]): string {
  return `
    <section class="publication-toc">
      <h2 class="publication-heading">فهرس المحتويات العام للمنهاج</h2>
      <div style="border-top: 2px solid #0C1E36; margin-top: 8pt; padding-top: 6pt;">
        ${activeUnits.map((u, idx) => {
          const lessons = getLessonsForUnit(u.id);
          return `
            <div class="publication-toc-item" style="background: ${idx % 2 === 0 ? '#FAF8F5' : '#FFFFFF'}; padding: 8pt;">
              <div>
                <span class="publication-toc-title">${escapeHtml(u.title)}</span>
                <div style="font-size: 9pt; color: #6B7280; margin-top: 2pt;">
                  ${escapeHtml(u.subtitle || '')} • (${lessons.length} دروس كاملة)
                </div>
              </div>
              <span class="publication-toc-page">الوحدة ${u.unitNumber}</span>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

/**
 * Builds HTML for Unit Divider Page
 */
function buildUnitDividerHtml(unit: UnitDefinition): string {
  const lessons = getLessonsForUnit(unit.id);

  return `
    <div class="publication-unit-divider">
      <div style="font-size: 11pt; font-weight: bold; color: #8A5D00; font-family: monospace;">
        CURRICULUM MODULE ${unit.unitNumber} OF 10
      </div>
      <h2>${escapeHtml(unit.title)}</h2>
      ${unit.subtitle ? `<p>${escapeHtml(unit.subtitle)}</p>` : ''}

      ${unit.bigIdea ? `
        <div class="publication-big-idea">
          <strong style="color: #0C1E36; display: block; margin-bottom: 4pt;">💡 الفكرة الكبرى للوحدة (Big Idea):</strong>
          <span>${escapeHtml(unit.bigIdea)}</span>
        </div>
      ` : ''}

      ${unit.essentialQuestion ? `
        <div style="font-size: 10.5pt; color: #781D28; font-weight: bold; margin-top: 8pt;">
          ❓ السؤال الجوهري: ${escapeHtml(unit.essentialQuestion)}
        </div>
      ` : ''}

      <div style="margin-top: 16pt; font-size: 9.5pt; color: #4B5563; border-top: 1px solid #D1D5DB; padding-top: 8pt;">
        تشتمل الوحدة على ${lessons.length} دروس تفصيلية • تطبيقات محاسبية ودورة مستندية • محطة استدلال مهني JRE
      </div>
    </div>
  `;
}

/**
 * Builds HTML for a single LessonContent
 */
function buildLessonHtml(
  lesson: LessonContent,
  options: PublicationExportOptions,
  unitTitle: string,
  lessonIndex: number
): string {
  const showAnswers = options.includeAnswers || options.edition === 'teacher' || options.edition === 'answers';
  const isTeacher = options.edition === 'teacher';
  const lessonNum = lesson.lessonNumber || lesson.order || lessonIndex;

  let html = `
    <article class="publication-lesson">
      <!-- Lesson Header Banner -->
      <div class="publication-lesson-header">
        <div style="display: flex; justify-content: space-between; font-size: 9.5pt; color: #6B7280; border-bottom: 1px solid #E5E7EB; padding-bottom: 4pt; margin-bottom: 8pt;">
          <span>المحاسبة المالية ببساطة وإتقان • شهادة البكالوريا</span>
          <span>${escapeHtml(unitTitle)}</span>
        </div>
        <span class="publication-lesson-tag">الدرس ${lessonNum}</span>
        <h2 class="publication-heading" style="margin: 4pt 0 6pt 0;">${escapeHtml(lesson.title)}</h2>
        ${lesson.subtitle ? `<div style="font-size: 11pt; color: #781D28; font-weight: bold;">${escapeHtml(lesson.subtitle)}</div>` : ''}
      </div>
  `;

  // Real-world hook story
  if (lesson.realWorldIntroduction) {
    html += `
      <section class="publication-card-callout">
        <h4 class="publication-heading" style="color: #0C1E36; margin-top: 0;">🧭 مدخل واقعي من بيئة الأعمال (لماذا نحتاج هذا الدرس؟):</h4>
        <p style="margin: 4pt 0 8pt 0;">${escapeHtml(lesson.realWorldIntroduction.hookStory)}</p>
        ${lesson.realWorldIntroduction.connectionToLesson ? `
          <div style="font-size: 9.5pt; color: #781D28; font-weight: bold; border-top: 1px dashed #C5A059; padding-top: 4pt;">
            💡 الربط بالدرس: <span style="color: #1F2937; font-weight: normal;">${escapeHtml(lesson.realWorldIntroduction.connectionToLesson)}</span>
          </div>
        ` : ''}
      </section>
    `;
  }

  // Learning Objectives
  const outcomes = lesson.whatYouWillLearn || lesson.objectives || [];
  if (outcomes.length > 0) {
    html += `
      <section class="publication-card">
        <h4 class="publication-heading" style="color: #0C1E36; margin-top: 0;">🎯 نواتج التعلم ومؤشرات الإتقان المستهدفة:</h4>
        <ul style="margin: 6pt 0; padding-right: 18pt;">
          ${outcomes.map((o, idx) => `
            <li style="margin-bottom: 4pt;">${escapeHtml(o)}</li>
          `).join('')}
        </ul>
      </section>
    `;
  }

  // Teacher Pedagogical Dossier (only in teacher edition)
  if (isTeacher && (lesson as any).teacherPedagogy) {
    const tp = (lesson as any).teacherPedagogy;
    html += `
      <section class="publication-card-teacher">
        <h4 class="publication-heading" style="color: #1E3A8A; margin-top: 0;">👨‍🏫 ملف التوجيه البيداغوجي للمعلم (Teacher Guidance Dossier):</h4>
        ${tp.pacing ? `<div><strong>⏱️ الخطة الزمنية:</strong> ${escapeHtml(tp.pacing)}</div>` : ''}
        ${tp.focusPoints ? `<div><strong>🔍 نقاط التركيز الأساسية:</strong> ${escapeHtml(tp.focusPoints)}</div>` : ''}
        ${tp.remediation ? `<div><strong>🛠️ علاج صعوبات التعلم:</strong> ${escapeHtml(tp.remediation)}</div>` : ''}
      </section>
    `;
  }

  // Conceptual Sections
  if (lesson.sections && lesson.sections.length > 0) {
    lesson.sections.forEach(sec => {
      html += `
        <section class="publication-section">
          <h3 class="publication-heading">${escapeHtml(sec.title)}</h3>
          <div style="margin: 6pt 0;">${escapeHtml(sec.content)}</div>
          ${(sec.keyTakeaways && sec.keyTakeaways.length > 0) ? `
            <div class="publication-card-callout" style="font-size: 9.5pt;">
              <strong>📌 خلاصات المفهوم:</strong> ${escapeHtml(sec.keyTakeaways.join(' • '))}
            </div>
          ` : (sec as any).keyTakeaway ? `
            <div class="publication-card-callout" style="font-size: 9.5pt;">
              <strong>📌 خلاصة المفهوم:</strong> ${escapeHtml((sec as any).keyTakeaway)}
            </div>
          ` : ''}
        </section>
      `;
    });
  }

  // Common Misconceptions & Caution
  const misconceptions = lesson.commonMisconceptions || (lesson as any).misconceptions || [];
  if (misconceptions.length > 0) {
    html += `
      <section class="publication-card-warning">
        <h4 class="publication-heading" style="color: #DC2626; margin-top: 0;">⚠️ فخاخ ومفاهيم خاطئة شائعة يجب الحذر منها:</h4>
        ${misconceptions.map((m: any) => `
          <div style="margin-bottom: 6pt;">
            <div style="font-weight: bold; color: #991B1B;">❌ الخطأ: ${escapeHtml(m.error || m.misconception)}</div>
            <div style="color: #166534; margin-top: 2pt;">✅ الصواب المحاسبي: ${escapeHtml(m.correction || m.explanation)}</div>
          </div>
        `).join('')}
      </section>
    `;
  }

  // Solved Examples
  if (lesson.solvedExamples && lesson.solvedExamples.length > 0) {
    html += `<h3 class="publication-heading">📝 أمثلة محلولة ونماذج تطبيقية معيارية:</h3>`;
    lesson.solvedExamples.forEach((ex, exIdx) => {
      html += `
        <div class="publication-card">
          <div style="font-weight: bold; font-size: 11pt; color: #0C1E36; margin-bottom: 6pt;">
            مثال (${exIdx + 1}): ${escapeHtml(ex.title)}
          </div>
          <p style="margin: 4pt 0 8pt 0;">${escapeHtml(ex.scenario)}</p>

          ${ex.required && ex.required.length > 0 ? `
            <div style="background: #FAF8F5; padding: 6pt 8pt; border: 1px solid #E5E7EB; margin-bottom: 8pt;">
              <strong>المطلوب:</strong>
              <ul style="margin: 4pt 0; padding-right: 16pt;">
                ${ex.required.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Solution Steps -->
          <div style="margin-top: 8pt;">
            <strong>مسار الحل والتطبيق:</strong>
            ${showAnswers ? `
              ${ex.steps && ex.steps.length > 0 ? ex.steps.map(st => `
                <div style="margin: 6pt 0; padding-right: 8pt; border-right: 2px solid #C5A059;">
                  <div><strong>خطوة (${st.stepNumber}):</strong> ${escapeHtml(st.description)}</div>
                  ${st.calculation ? `<div style="font-family: monospace; direction: ltr; text-align: right; background: #F3F4F6; padding: 4pt 6pt; margin: 4pt 0;">${escapeHtml(st.calculation)}</div>` : ''}
                  ${st.table ? `
                    <table class="publication-table">
                      <thead>
                        <tr>${st.table.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
                      </thead>
                      <tbody>
                        ${st.table.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}
                      </tbody>
                    </table>
                  ` : ''}
                </div>
              `).join('') : ''}

              ${ex.finalResult ? `
                <div class="publication-answer">
                  <strong>النتيجة النهائية المعتمدة:</strong> ${escapeHtml(ex.finalResult)}
                  ${ex.accountingJustification ? `<div style="margin-top: 4pt; font-size: 9pt;"><strong>التعليل المحاسبي:</strong> ${escapeHtml(ex.accountingJustification)}</div>` : ''}
                </div>
              ` : ''}
            ` : `
              <!-- Student Edition Blank Workspace -->
              <div style="border: 1px dashed #CBD5E1; background: #FAFAFA; padding: 16pt; margin-top: 8pt; text-align: center; color: #9CA3AF;">
                [مساحة مخصصة للحل وتدوين القيود المحاسبية والتسويات]
                <div class="publication-answer-blank"></div>
                <div class="publication-answer-blank"></div>
                <div class="publication-answer-blank"></div>
              </div>
            `}
          </div>
        </div>
      `;
    });
  }

  // Quick Check / Formative Questions
  const questions = lesson.quickCheckQuestions || (lesson as any).questions || [];
  if (questions.length > 0) {
    html += `<h3 class="publication-heading">❓ تقييمات ختامية وأسئلة إتقان الدرس:</h3>`;
    questions.forEach((q: any, qIdx: number) => {
      html += `
        <div class="publication-question">
          <div class="publication-question-stem">
            س (${qIdx + 1}): ${escapeHtml(q.question || q.statement)}
          </div>
          ${q.options && q.options.length > 0 ? `
            <div class="publication-options-grid">
              ${q.options.map((opt: string, optI: number) => `
                <div class="publication-option">
                  <span class="publication-option-letter">${String.fromCharCode(65 + optI)}</span>
                  <span>${escapeHtml(opt)}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${showAnswers ? `
            <div class="publication-answer">
              <strong>✓ الإجابة المعتمدة:</strong> ${escapeHtml(String(q.correctAnswer ?? q.answer ?? ''))}
              ${q.explanation ? `<div style="margin-top: 4pt; font-size: 9pt;"><strong>التفسير:</strong> ${escapeHtml(q.explanation)}</div>` : ''}
            </div>
          ` : `
            <div class="publication-answer-blank" style="margin-top: 10pt;">
              الإجابة: ............................................................................................
            </div>
          `}
        </div>
      `;
    });
  }

  // JRE Station
  if (lesson.jreAssessment || (lesson as any).jrePrompt) {
    const jre = lesson.jreAssessment || (lesson as any).jrePrompt;
    html += `
      <section class="publication-card" style="border: 2px solid #0C1E36; background: #FAF8F5;">
        <h4 class="publication-heading" style="color: #0C1E36; margin-top: 0;">⚖️ محطة مقال الاستدلال المحاسبي (JRE Capstone) — 20 درجة كاملة:</h4>
        <p style="margin: 4pt 0 8pt 0;">${escapeHtml(jre.prompt || jre.caseContext || jre.scenario || '')}</p>
        
        <table class="publication-table" style="font-size: 8.5pt;">
          <thead>
            <tr>
              <th style="width: 25%;">معيار التحكيم (Rubric)</th>
              <th style="width: 15%;">الدرجة</th>
              <th>المؤشر والدليل المطلوب</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. التكييف المحاسبي السليم</td>
              <td>4 درجات</td>
              <td>تحديد المعيار المحاسبي (EAS) أو المبدأ الحاكم وتشخيص الخلل بدقة.</td>
            </tr>
            <tr>
              <td>2. دقة الحسابات والقيود</td>
              <td>6 درجات</td>
              <td>إعداد القيود أو التسويات الرياضية بأطراف ومبالغ متوازنة تماماً.</td>
            </tr>
            <tr>
              <td>3. تبرير الأثر على القوائم</td>
              <td>6 درجات</td>
              <td>تحليل الأثر المتسلسل على الربح والمركز المالي والسيولة.</td>
            </tr>
            <tr>
              <td>4. التوصية المهنية الرقابية</td>
              <td>4 درجات</td>
              <td>صياغة إجراء رقابي وقائي يمنع تكرار الخطأ مستقبلاً.</td>
            </tr>
          </tbody>
        </table>

        ${!showAnswers ? `
          <div style="border: 1px dashed #9CA3AF; padding: 12pt; background: #FFFFFF; margin-top: 8pt;">
            <div style="font-weight: bold; color: #4B5563; margin-bottom: 6pt;">مساحة إجابة مقال الاستدلال JRE:</div>
            <div class="publication-answer-blank"></div>
            <div class="publication-answer-blank"></div>
            <div class="publication-answer-blank"></div>
            <div class="publication-answer-blank"></div>
          </div>
        ` : ''}
      </section>
    `;
  }

  html += `</article>`;
  return html;
}

/**
 * Builds HTML for Question Bank Module
 */
function buildQuestionBankHtml(options: PublicationExportOptions): string {
  const showAnswers = options.includeAnswers || options.edition === 'answers';

  return `
    <section class="publication-section">
      <div style="border: 2px solid #0C1E36; background: #FAF8F5; padding: 14pt; margin-bottom: 16pt;">
        <h2 class="publication-heading" style="margin: 0 0 6pt 0;">بنك الأسئلة الشامل المعتمد</h2>
        <p style="margin: 0; color: #4B5563; font-size: 10.5pt;">
          أسئلة تدريبية مقننة مصنفة وفق مستويات بلوم ونواتج التعلم الوزارية ومحالة لكتاب الوزارة
        </p>
      </div>

      <div>
        ${expandedQuestionBank.map((q, idx) => `
          <div class="publication-question">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E5E7EB; padding-bottom: 4pt; margin-bottom: 6pt; font-size: 9.5pt;">
              <strong>#${idx + 1} — ${escapeHtml(q.concept)} (${q.difficulty === 'basic' ? 'مستوى أساسي' : q.difficulty === 'intermediate' ? 'مستوى متوسط' : 'مستوى متقدم'})</strong>
              <span style="font-family: monospace; color: #6B7280;">كتاب الوزارة ص ${escapeHtml(q.sourceMapping.source_page)}</span>
            </div>
            <div class="publication-question-stem">${escapeHtml(q.question)}</div>

            ${q.options && q.options.length > 0 ? `
              <div class="publication-options-grid">
                ${q.options.map((opt, i) => `
                  <div class="publication-option">
                    <span class="publication-option-letter">${String.fromCharCode(65 + i)}</span>
                    <span>${escapeHtml(opt)}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${showAnswers ? `
              <div class="publication-answer">
                <strong>✓ الإجابة الصحيحة المعتمدة:</strong> ${escapeHtml(String(q.correctAnswer))}
                <div style="margin-top: 4pt; font-size: 9pt;"><strong>التفسير:</strong> ${escapeHtml(q.explanation)}</div>
              </div>
            ` : `
              <div class="publication-answer-blank" style="margin-top: 8pt;">
                الإجابة: ............................................................................................
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Builds HTML for Exams Module
 */
function buildExamsHtml(options: PublicationExportOptions): string {
  const showAnswers = options.includeAnswers || options.edition === 'answers';

  return `
    <section class="publication-section">
      <div style="border: 2px solid #0C1E36; background: #FAF8F5; padding: 14pt; margin-bottom: 16pt;">
        <h2 class="publication-heading" style="margin: 0 0 6pt 0;">نماذج الامتحانات والمحاكاة الرسمية للبكالوريا</h2>
        <p style="margin: 0; color: #4B5563; font-size: 10.5pt;">
          نماذج امتحانية معتمدة مطابقة لمواصفات الورقة الامتحانية وتوزيع الدرجات الرسمية (100 درجة)
        </p>
      </div>

      ${comprehensiveExams.map((exam) => `
        <article style="border: 2px solid #0C1E36; padding: 16pt; margin-bottom: 24pt; page-break-after: always; break-after: page;">
          <div style="text-align: center; border-bottom: 2px solid #0C1E36; padding-bottom: 10pt; margin-bottom: 12pt;">
            <div style="display: flex; justify-content: space-between; font-size: 10pt; font-weight: bold; color: #0C1E36;">
              <span>جمهورية مصر العربية — وزارة التربية والتعليم</span>
              <span>شهادة البكالوريا المصرية 2027</span>
            </div>
            <h3 style="font-size: 16pt; color: #0C1E36; margin: 8pt 0 4pt 0;">${escapeHtml(exam.title)}</h3>
            <div style="color: #781D28; font-weight: bold; font-size: 11pt;">${escapeHtml(exam.subtitle)}</div>
            <div style="font-size: 9.5pt; color: #4B5563; margin-top: 4pt;">
              زمن الإجابة: ${exam.timeAllowedMinutes} دقيقة • الدرجة الكلية: ${exam.totalMarks} درجة
            </div>
          </div>

          <!-- Student Information Box (Simulator) -->
          <table class="publication-table" style="margin-bottom: 14pt; font-size: 9pt;">
            <tbody>
              <tr>
                <td style="width: 25%;">اسم الطالب: ......................</td>
                <td style="width: 25%;">رقم الجلوس: ......................</td>
                <td style="width: 25%;">المدرسة: ......................</td>
                <td style="width: 25%;">الإدارة: ......................</td>
              </tr>
            </tbody>
          </table>

          <!-- Sections -->
          <div>
            ${exam.sections.map(sec => `
              <div style="margin: 12pt 0;">
                <div style="background: #F3F4F6; padding: 6pt 10pt; border-right: 4px solid #0C1E36; font-weight: bold; margin-bottom: 8pt;">
                  ${escapeHtml(sec.title)} (${sec.marks} درجة)
                </div>
                ${sec.questions.map((q, qI) => `
                  <div class="publication-question">
                    <div class="publication-question-stem">س (${qI + 1}): ${escapeHtml(q.prompt || (q as any).text || '')}</div>
                    ${q.options && q.options.length > 0 ? `
                      <div class="publication-options-grid">
                        ${q.options.map((opt, oI) => `
                          <div class="publication-option">
                            <span class="publication-option-letter">${String.fromCharCode(65 + oI)}</span>
                            <span>${escapeHtml(opt)}</span>
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${showAnswers ? `
                      <div class="publication-answer">
                        <strong>✓ الإجابة والحل المعتمد:</strong> ${escapeHtml(String(q.modelAnswer || ''))}
                        ${(q as any).rubric ? `<div style="font-size: 9pt; margin-top: 4pt;">${escapeHtml(JSON.stringify((q as any).rubric))}</div>` : ''}
                      </div>
                    ` : `
                      <div class="publication-answer-blank" style="margin-top: 8pt;">
                        الإجابة: ............................................................................................
                      </div>
                    `}
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </article>
      `).join('')}
    </section>
  `;
}

/**
 * Builds HTML for Glossary Module
 */
function buildGlossaryHtml(options: PublicationExportOptions): string {
  return `
    <section class="publication-section">
      <div style="border: 2px solid #0C1E36; background: #FAF8F5; padding: 14pt; margin-bottom: 16pt;">
        <h2 class="publication-heading" style="margin: 0 0 6pt 0;">معجم المصطلحات والمفاهيم المحاسبية المعتمد</h2>
        <p style="margin: 0; color: #4B5563; font-size: 10.5pt;">
          تفريغ معجمي قياسي شامل لكافة المصطلحات الفنية والمعايير المهنية للمنهج الكامل (الوحدات 1 - 10)
        </p>
      </div>

      <table class="publication-table">
        <thead>
          <tr>
            <th style="width: 25%;">المصطلح العربي</th>
            <th style="width: 25%;">المصطلح الإنجليزي</th>
            <th>التعريف العلمي والأثر المحاسبي</th>
          </tr>
        </thead>
        <tbody>
          ${allGlossaryTerms.map(term => `
            <tr>
              <td><strong>${escapeHtml(term.term)}</strong></td>
              <td class="num-ltr">${escapeHtml(term.termEn)}</td>
              <td>
                <div style="font-weight: 600; margin-bottom: 2pt;">${escapeHtml(term.academicDefinition || term.simpleDefinition)}</div>
                ${term.practicalExample ? `<div style="font-size: 8.5pt; color: #1E3A8A; margin-top: 2pt;"><strong>مثال تطبيقي:</strong> ${escapeHtml(term.practicalExample)}</div>` : ''}
                ${term.commonMistake ? `<div style="font-size: 8.5pt; color: #781D28; margin-top: 2pt;"><strong>خطأ شائع:</strong> ${escapeHtml(term.commonMistake)}</div>` : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

/**
 * Builds HTML for Assessments Module
 */
function buildAssessmentsHtml(options: PublicationExportOptions): string {
  const showAnswers = options.includeAnswers || options.edition === 'answers';

  return `
    <section class="publication-section">
      <div style="border: 2px solid #0C1E36; background: #FAF8F5; padding: 14pt; margin-bottom: 16pt;">
        <h2 class="publication-heading" style="margin: 0 0 6pt 0;">كتاب الأداءات والتقييمات المدرسية المعتمدة</h2>
        <p style="margin: 0; color: #4B5563; font-size: 10.5pt;">
          تفريغ رسمي شامل للأنشطة الصفية والواجبات المنزلية والتقييمات الأسبوعية وتدريبات الشهور
        </p>
      </div>

      <div>
        ${CANONICAL_MASTER_ASSESSMENTS.map((item, idx) => `
          <div class="publication-question">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E5E7EB; padding-bottom: 4pt; margin-bottom: 6pt; font-size: 9pt;">
              <strong>#${idx + 1} • كود: ${escapeHtml(item.question_id)} (${escapeHtml(item.source_type)})</strong>
              <span style="color: #6B7280;">كتاب الوزارة ص ${item.source_page} • ${escapeHtml(item.official_unit)}</span>
            </div>
            
            <div class="publication-question-stem">${escapeHtml(item.question_text)}</div>

            ${item.required ? `
              <div style="background: #F9FAFB; padding: 4pt 6pt; border: 1px solid #E5E7EB; font-size: 9.5pt; margin: 4pt 0;">
                <strong>المطلوب:</strong> ${escapeHtml(item.required)}
              </div>
            ` : ''}

            ${showAnswers ? `
              <div class="publication-answer">
                <strong>✓ الإجابة والحل المعتمد:</strong>
                <div style="margin-top: 4pt;">${escapeHtml(item.answer)}</div>
                ${item.solution_path && item.solution_path.length > 0 ? `
                  <div style="margin-top: 6pt; font-size: 9pt; border-top: 1px dashed #16A34A; padding-top: 4pt;">
                    <strong>مسار الحل:</strong>
                    <ul style="margin: 2pt 0; padding-right: 14pt;">
                      ${item.solution_path.map(st => `<li>${escapeHtml(st)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            ` : `
              <div class="publication-answer-blank" style="margin-top: 8pt;">
                الإجابة: ............................................................................................
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Core function to construct the publication HTML document
 */
export function buildPublicationHtml(options: PublicationExportOptions): string {
  const styles = getPublicationStyles(false);

  // If user requested only the book cover & preface page
  if (options.onlyCover) {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(options.title || 'غلاف_كتاب_المحاسبة_المالية_المعتمد_2027')}</title>
  ${styles}
</head>
<body>
  <div class="publication-container">
    ${buildCoverHtml(options)}
  </div>
</body>
</html>`;
  }

  let bodyContent = '';

  // 1. Cover
  if (options.includeCover) {
    bodyContent += buildCoverHtml(options);
  }

  // 2. Metadata
  bodyContent += buildMetadataTableHtml(options);

  // 3. Table of Contents
  if (options.includeTableOfContents && !options.trainingModule && !options.lessonId) {
    const units = options.unitNumber
      ? availableUnits.filter(u => u.unitNumber === options.unitNumber)
      : availableUnits;
    bodyContent += buildTableOfContentsHtml(units);
  }

  // 4. Content resolution
  if (options.contentHtml) {
    bodyContent += `<main class="publication-document">${options.contentHtml}</main>`;
  } else if (options.trainingModule === 'qbank') {
    bodyContent += buildQuestionBankHtml(options);
  } else if (options.trainingModule === 'exams') {
    bodyContent += buildExamsHtml(options);
  } else if (options.trainingModule === 'glossary') {
    bodyContent += buildGlossaryHtml(options);
  } else if (options.trainingModule === 'assessments') {
    bodyContent += buildAssessmentsHtml(options);
  } else if (options.trainingModule === 'answers') {
    bodyContent += buildQuestionBankHtml(options);
  } else {
    // Standard Curriculum Units & Lessons
    const unitsToRender = options.unitNumber
      ? availableUnits.filter(u => u.unitNumber === options.unitNumber)
      : availableUnits;

    unitsToRender.forEach(unit => {
      // Unit Divider
      bodyContent += buildUnitDividerHtml(unit);

      // Lessons for this unit
      let unitLessons = getLessonsForUnit(unit.id);
      if (options.lessonId) {
        unitLessons = unitLessons.filter(
          l => l.id === options.lessonId || (l as any).lessonId === options.lessonId
        );
      }

      unitLessons.forEach((lesson, lIdx) => {
        bodyContent += buildLessonHtml(lesson, options, unit.title, lIdx + 1);
      });
    });
  }

  // 5. Global Footer
  bodyContent += `
    <footer class="publication-footer">
      <div>المحاسبة المالية ببساطة وإتقان • شهادة البكالوريا المصرية (EB) • العام الدراسي ${escapeHtml(options.academicYear || '2026/2027')}</div>
      <div>جميع الحقوق محفوظة © دار التميز للنشر والطباعة • إيداع دار الكتب المصرية 14280 / 2026</div>
    </footer>
  `;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(options.title)}</title>
  <style>
    ${styles}
  </style>
</head>
<body>
  <div class="publication-document">
    ${bodyContent}
  </div>
</body>
</html>`;
}

/**
 * Downloads the publication as a Word Document (.doc) with MSO formatting and RTL support
 */
export function downloadAsWordDocument(options: PublicationExportOptions): void {
  const wordStyles = getPublicationStyles(true);
  const fullHtml = buildPublicationHtml(options);

  // Extract body inner content from fullHtml to place in WordSection1
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyInner = bodyMatch ? bodyMatch[1] : fullHtml;

  const wordDocumentHtml = `<!DOCTYPE html>
<html
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  xmlns="http://www.w3.org/TR/REC-html40"
  lang="ar"
  dir="rtl"
>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(options.title)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    ${wordStyles}
  </style>
</head>
<body lang="AR-EG" dir="rtl">
  <div class="WordSection1">
    ${bodyInner}
  </div>
</body>
</html>`;

  // Prepend UTF-8 BOM so Word opens Arabic characters correctly without encoding dialogs
  const blob = new Blob(['\ufeff' + wordDocumentHtml], {
    type: 'application/msword;charset=utf-8'
  });

  const filename = formatPublicationFilename(options, 'doc');

  if (typeof window !== 'undefined') {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Opens an independent standalone window and prints the publication document as a PDF
 */
export async function printPublicationAsPdf(
  options: PublicationExportOptions
): Promise<boolean> {
  const fullHtml = buildPublicationHtml(options);

  if (typeof window === 'undefined') {
    return false;
  }

  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    throw new Error('تعذر فتح نافذة التصدير. يرجى السماح بالنوافذ المنبثقة من إعدادات المتصفح.');
  }

  try {
    const filename = formatPublicationFilename(options, 'pdf');
    printWindow.document.open();
    printWindow.document.write(fullHtml);
    printWindow.document.close();

    // Set title in the new window so default browser PDF save filename is formatted properly
    printWindow.document.title = filename.replace('.pdf', '');

    // Wait for fonts in standalone document
    if ('fonts' in printWindow.document && printWindow.document.fonts) {
      try {
        await printWindow.document.fonts.ready;
      } catch (fontErr) {
        console.warn('Font loading check bypassed:', fontErr);
      }
    }

    // Small delay for layout calculation
    await new Promise((resolve) => setTimeout(resolve, 500));

    printWindow.print();
    return true;
  } catch (err) {
    console.error('Failed to trigger print in standalone window:', err);
    throw err;
  }
}
