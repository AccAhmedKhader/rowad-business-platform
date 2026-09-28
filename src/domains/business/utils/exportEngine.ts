/**
 * محرك التصدير المكتبي الفائق (Word & PDF Export Engine)
 * مصمم بمواصفات إخراج وتنسيق الكتب والمذكرات التعليمية الرائدة والمعيارية
 * يدعم توليد وثائق Microsoft Word (.doc) بترميز عربي أصيل RTL
 * وطباعة مستندات PDF فائقة الجودة Print-Ready متوافقة مع ورق A4
 */

export interface ExportDocumentOptions {
  title: string;
  subtitle?: string;
  bookType: 'student_book' | 'textbook_questions' | 'assessments' | 'question_bank' | 'teacher_guide' | 'comprehensive_unit';
  unitNumber?: number; // 0 for all units
  unitTitle?: string;
  includeAnswers: boolean;
  schoolName?: string;
  teacherName?: string;
  studentName?: string;
  academicYear?: string;
  partsFilter?: string[]; // for question bank
  contentHtml: string;
}

/**
 * تنزيل مستند Microsoft Word متوافق بصيغة HTML/Word XML بتنسيق كتاب خارجي احترافي
 */
export function downloadAsWordDocument(options: ExportDocumentOptions) {
  const academicYear = options.academicYear || '2026 / 2027';
  const school = options.schoolName || 'مدرسة : ................................. الثانوية';
  const teacher = options.teacherName || 'الأستاذ / أحمد خضر';
  const modeLabel = options.includeAnswers ? 'نسخة المعلم النموذجية (مصحوبة بالإجابات والسلالم التحليلية)' : 'نسخة الطالب والتدريب الفصلي (جاهزة للاختبارات والحل)';

  const htmlDocument = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'
      lang='ar' dir='rtl'>
<head>
  <meta charset='utf-8'>
  <title>${options.title}</title>
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
    @page Section1 {
      size: A4 portrait;
      margin: 1.4cm 1.4cm 1.4cm 1.4cm;
      mso-header-margin: 0.6cm;
      mso-footer-margin: 0.6cm;
      mso-paper-source: 0;
    }
    div.Section1 {
      page: Section1;
      direction: rtl;
      width: 100%;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Cairo', 'Traditional Arabic', 'Times New Roman', Tahoma, Arial, sans-serif;
      font-size: 11.5pt;
      line-height: 1.65;
      color: #1e293b;
      direction: rtl;
      text-align: right;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      width: 100%;
    }
    p {
      text-align: justify;
      text-justify: inter-word;
      text-align-last: right;
      line-height: 1.75;
      margin: 4pt 0 8pt 0;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Alexandria', 'Cairo', 'Traditional Arabic', Tahoma, sans-serif;
      font-weight: bold;
      color: #0f172a;
      margin-top: 12pt;
      margin-bottom: 6pt;
      page-break-after: avoid;
    }
    h1 { font-size: 19pt; color: #1e3a8a; text-align: center; border-bottom: 2pt solid #1e3a8a; padding-bottom: 6pt; }
    h2 { font-size: 15pt; color: #0369a1; border-bottom: 1.5pt solid #93c5fd; padding-bottom: 3pt; }
    h3 { font-size: 13pt; color: #047857; }
    h4 { font-size: 11.5pt; color: #334155; }
    
    /* غلاف الكتاب الخارجي الفاخر */
    .cover-page {
      text-align: center;
      padding: 24pt 16pt;
      page-break-after: always;
      border: 3pt double #1e3a8a;
      background-color: #f8fafc;
      margin-bottom: 16pt;
      width: 100%;
    }
    .cover-top-ribbon {
      font-size: 11pt;
      color: #475569;
      font-weight: bold;
      margin-bottom: 10pt;
      letter-spacing: 0.5pt;
    }
    .cover-series-badge {
      display: inline-block;
      padding: 5pt 16pt;
      background-color: #1e3a8a;
      color: #ffffff;
      font-weight: 900;
      border-radius: 20pt;
      font-size: 13pt;
      margin-bottom: 14pt;
    }
    .cover-title {
      font-size: 24pt;
      color: #0f172a;
      font-weight: 900;
      margin: 10pt 0 8pt 0;
      line-height: 1.25;
    }
    .cover-subtitle {
      font-size: 14pt;
      color: #0369a1;
      font-weight: bold;
      margin-bottom: 16pt;
    }
    .cover-mode-tag {
      display: inline-block;
      padding: 4pt 14pt;
      background-color: #ecfdf5;
      color: #065f46;
      font-weight: bold;
      border: 1.5pt solid #10b981;
      border-radius: 6pt;
      font-size: 11pt;
      margin-bottom: 16pt;
    }
    .cover-features {
      width: 100%;
      margin: 12pt 0;
      text-align: right;
      background-color: #ffffff;
      border: 1pt solid #cbd5e1;
      border-radius: 6pt;
      padding: 10pt 14pt;
    }
    .cover-features li {
      font-size: 10.5pt;
      color: #334155;
      margin-bottom: 4pt;
      line-height: 1.5;
    }
    .cover-meta-table {
      width: 100%;
      margin: 14pt 0 0 0;
      border-collapse: collapse;
      text-align: right;
    }
    .cover-meta-table td {
      padding: 6pt 10pt;
      border: 1pt solid #cbd5e1;
      font-size: 11pt;
    }
    .cover-meta-table td.label {
      background-color: #f1f5f9;
      font-weight: bold;
      width: 32%;
      color: #1e293b;
    }

    /* بطاقات الأسئلة والشرح بمظهر الكتاب الخارجي */
    .unit-section {
      margin-bottom: 18pt;
      width: 100%;
    }
    .lesson-block {
      border: 1pt solid #cbd5e1;
      border-radius: 8pt;
      padding: 12pt 14pt;
      margin-bottom: 14pt;
      background-color: #ffffff;
      page-break-inside: avoid;
      width: 100%;
    }
    .golden-key-box {
      background-color: #fffbeb;
      border-right: 4pt solid #d97706;
      border: 1pt solid #fef3c7;
      border-right-width: 4pt;
      padding: 10pt 14pt;
      border-radius: 6pt;
      margin: 12pt 0;
    }
    .exam-trap-box {
      background-color: #fff1f2;
      border-right: 4pt solid #e11d48;
      border: 1pt solid #ffe4e6;
      border-right-width: 4pt;
      padding: 10pt 14pt;
      border-radius: 6pt;
      margin: 12pt 0;
    }
    .tool-box {
      background-color: #f0fdf4;
      border-right: 4pt solid #16a34a;
      border: 1pt solid #dcfce7;
      border-right-width: 4pt;
      padding: 10pt 14pt;
      border-radius: 6pt;
      margin: 12pt 0;
    }
    .question-card {
      border: 1pt solid #cbd5e1;
      background-color: #ffffff;
      padding: 14pt 16pt;
      margin-bottom: 16pt;
      border-radius: 8pt;
      page-break-inside: avoid;
    }
    .question-header {
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 6pt;
      font-size: 13pt;
      border-bottom: 1pt dotted #e2e8f0;
      padding-bottom: 4pt;
    }
    .question-badge {
      display: inline-block;
      font-size: 10.5pt;
      font-weight: bold;
      padding: 2pt 8pt;
      background-color: #1e3a8a;
      color: #ffffff;
      border-radius: 4pt;
      margin-left: 6pt;
    }
    .question-taxonomy {
      font-size: 10pt;
      color: #64748b;
      font-weight: normal;
    }
    .question-text {
      font-size: 13.5pt;
      font-weight: bold;
      color: #0f172a;
      line-height: 1.7;
      margin: 8pt 0 10pt 0;
    }
    .options-grid {
      margin: 8pt 0 12pt 0;
      padding-right: 14pt;
    }
    .options-grid li {
      margin-bottom: 6pt;
      font-size: 12.5pt;
    }
    .option-pill {
      font-weight: bold;
      color: #1e3a8a;
      margin-left: 4pt;
    }
    .answer-box {
      background-color: #f0fdf4;
      border: 1.5pt solid #86efac;
      padding: 10pt 14pt;
      margin-top: 10pt;
      border-radius: 6pt;
      font-size: 12.5pt;
      color: #14532d;
    }
    .answer-title {
      font-weight: bold;
      color: #166534;
      margin-bottom: 4pt;
      font-size: 13pt;
    }
    .student-lines {
      margin-top: 8pt;
      border-bottom: 1pt dotted #94a3b8;
      height: 22pt;
    }
    .student-draft-space {
      border: 1pt dashed #94a3b8;
      background-color: #fafaf9;
      height: 60pt;
      margin-top: 10pt;
      border-radius: 6pt;
      text-align: center;
      color: #78716c;
      font-size: 11pt;
      padding-top: 20pt;
    }
    .rubric-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
      font-size: 11.5pt;
    }
    .rubric-table th, .rubric-table td {
      border: 1pt solid #cbd5e1;
      padding: 7pt 10pt;
      text-align: right;
    }
    .rubric-table th {
      background-color: #f1f5f9;
      font-weight: bold;
      color: #0f172a;
    }
    .page-break {
      page-break-after: always;
    }
    .footer-note {
      text-align: center;
      font-size: 10pt;
      color: #64748b;
      margin-top: 30pt;
      border-top: 1pt solid #e2e8f0;
      padding-top: 8pt;
    }
  </style>
</head>
<body>
  <div class="Section1">
    <!-- غلاف الكتاب الخارجي الفاخر -->
    <div class="cover-page">
      <div class="cover-top-ribbon">${school} • العام الدراسي ${academicYear}</div>
      <div class="cover-series-badge">سلسلة رواد الأعمال التعليمية — كتاب خارجي مطوّر</div>
      <div class="cover-title">${options.title}</div>
      ${options.subtitle ? `<div class="cover-subtitle">${options.subtitle}</div>` : ''}
      <div class="cover-mode-tag">${modeLabel}</div>
      
      <div class="cover-features">
        <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 6pt; font-size: 12.5pt;">⭐ مزايا هذا الإصدار الشامل والمتكامل:</div>
        <ul style="margin: 0; padding-right: 18pt;">
          <li><strong>شرح مفاهيمي تحليلي دقيق:</strong> مدعوم بخرائط ذهنية وسيناريوهات واقعية من كبرى الشركات المصرية والعالمية.</li>
          <li><strong>معالجة فخاخ الاختبارات والتقييمات (Exam Traps):</strong> رصد أدق الأخطاء الشائعة للطلاب وتصويبها وفق الأطر التربوية المعتمدة.</li>
          <li><strong>بنك أسئلة معياري متعدد المستويات:</strong> مصنف بدقة وفق هرم بلوم للمستويات المعرفية (تذكر، فهم، تطبيق، تحليل، تقويم).</li>
          <li><strong>مختبر استدلال JRE سلم الـ 20 درجة:</strong> تدريب فريد ومكثف على أعلى أسئلة التقييم وزناً وفق روبرك التصحيح النموذجي.</li>
          <li><strong>توثيق دقيق وشامل:</strong> فهرسة منهجية متكاملة لموضوعات المقرر والتقييمات الأسبوعية وأرقام الصفحات.</li>
        </ul>
      </div>

      <table class="cover-meta-table">
        <tr>
          <td class="label">المادة والمستوى:</td>
          <td>إدارة الأعمال — الصف الثاني الثانوي (البكالوريا المصرية 2027)</td>
        </tr>
        <tr>
          <td class="label">نطاق المحتوى:</td>
          <td>${options.unitTitle || (options.unitNumber ? `الوحدة رقم ${options.unitNumber}` : 'المنهج الكامل — جميع الوحدات (1 - 10)')}</td>
        </tr>
        <tr>
          <td class="label">المعلم / واضع المذكرة:</td>
          <td>${teacher}</td>
        </tr>
        ${options.studentName ? `
        <tr>
          <td class="label">اسم الطالب:</td>
          <td>${options.studentName}</td>
        </tr>` : ''}
        <tr>
          <td class="label">المواصفة الاختبارية:</td>
          <td>معتمد ومطابق لأحدث المعايير والمواصفات الصادرة عن المركز القومي للتقويم التربوي</td>
        </tr>
      </table>
    </div>

    <!-- المحتوى الداخلي للكتاب -->
    <div class="main-content">
      ${options.contentHtml}
    </div>

    <div class="footer-note">
      تم إنشاء هذا المستند وتصديره عبر «سلسلة ومكتبة رواد الأعمال 2027» • جميع الحقوق محفوظة لأسرة التطوير التعليمي
    </div>
  </div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff' + htmlDocument], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  
  // Format clean Arabic filename
  const cleanTitle = options.title.replace(/[\\/:*?"<>|]/g, '_');
  const filename = `${cleanTitle}_${options.includeAnswers ? 'نسخة_المعلم' : 'نسخة_الطالب'}.doc`;
  downloadLink.download = filename;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

/**
 * تشغيل نافذة طباعة احترافية فائقة الدقة لإنشاء ملف PDF أو الطباعة المباشرة بمظهر الكتاب الخارجي
 */
export function printDocumentAsPdf(options: ExportDocumentOptions) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('يرجى السماح بالنوافذ المنبثقة لطباعة المستند.');
    return;
  }

  const school = options.schoolName || 'مدرسة : ................................. الثانوية';
  const teacher = options.teacherName || 'الأستاذ / أحمد خضر';
  const modeLabel = options.includeAnswers ? 'نسخة المعلم النموذجية (مجابة وسلالم تقدير)' : 'نسخة الطالب والتدريب الفصلي (للاختبارات والحل)';

  printWindow.document.write(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>${options.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800;900&family=Cairo:wght@400;600;700;800;900&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 16mm 18mm 16mm; /* هوامش تعليمية معيارية موسعة توفر راحة بصرية فائقة ومساحات لتدوين الملاحظات والتدبيس */
      @top-right {
        content: "سلسلة رواد الأعمال التعليمية | مادة إدارة الأعمال — المرحلة الثانوية";
        font-family: 'Cairo', sans-serif;
        font-size: 8.5pt;
        font-weight: 700;
        color: #1e3a8a;
        border-bottom: 0.75pt solid #cbd5e1;
        padding-bottom: 2.5mm;
      }
      @top-left {
        content: "${options.title}";
        font-family: 'Cairo', sans-serif;
        font-size: 8.5pt;
        font-weight: 600;
        color: #475569;
        border-bottom: 0.75pt solid #cbd5e1;
        padding-bottom: 2.5mm;
      }
      @bottom-center {
        content: "— " counter(page) " —";
        font-family: 'Cairo', sans-serif;
        font-size: 8.5pt;
        font-weight: 800;
        color: #1e293b;
        border-top: 0.75pt solid #e2e8f0;
        padding-top: 2.5mm;
      }
      @bottom-right {
        content: "العام الدراسي ${options.academicYear || '2026 / 2027'} • إعداد: ${teacher}";
        font-family: 'Cairo', sans-serif;
        font-size: 7.5pt;
        color: #64748b;
        border-top: 0.75pt solid #e2e8f0;
        padding-top: 2.5mm;
      }
      @bottom-left {
        content: "${school} • إصدار تعليمي مستقل";
        font-family: 'Cairo', sans-serif;
        font-size: 7.5pt;
        color: #64748b;
        border-top: 0.75pt solid #e2e8f0;
        padding-top: 2.5mm;
      }
    }
    @page:first {
      margin: 12mm 14mm 12mm 14mm;
      @top-right { content: none; border: none; }
      @top-left { content: none; border: none; }
      @bottom-center { content: none; border: none; }
      @bottom-right { content: none; border: none; }
      @bottom-left { content: none; border: none; }
    }
    * {
      box-sizing: border-box;
    }
    html, body {
      font-family: 'Cairo', 'Alexandria', Tahoma, sans-serif;
      font-size: 10.5pt;
      line-height: 1.8; /* مسافة أسطر مريحة لقرنية العين تمنع الإجهاد في ساعات المذاكرة الطويلة */
      color: #1e293b; /* حبر رمادي فحمي مريح للنظر بدلاً من الأسود الحاد المسبب لزغللة العين */
      direction: rtl;
      text-align: right;
      margin: 0;
      padding: 0;
      width: 100%;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    p, .justified, .long-text, .lesson-block p, .integrated-stations-stream p, .question-card p, article p, .station-body p, .teacher-guidance-box p, blockquote {
      text-align: justify;
      text-justify: inter-word;
      text-align-last: right;
      line-height: 1.8;
      word-spacing: 0.03em;
    }
    
    /* غلاف الكتاب والمذكرة الخارجي المطبوع */
    .print-cover {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 94vh;
      text-align: center;
      border: 2px solid #1e3a8a;
      border-radius: 8px;
      padding: 16px 20px;
      page-break-after: always;
      box-sizing: border-box;
      background: #ffffff;
      position: relative;
      width: 100%;
    }
    .print-cover-header {
      font-size: 11pt;
      color: #475569;
      font-weight: 700;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .print-series-brand {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      padding: 5px 20px;
      border-radius: 20px;
      font-size: 11.5pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      font-family: 'Alexandria', sans-serif;
    }
    .print-cover-title {
      font-size: 23pt;
      color: #0f172a;
      font-weight: 900;
      margin: 6px 0 4px 0;
      line-height: 1.3;
      font-family: 'Alexandria', sans-serif;
    }
    .print-cover-sub {
      font-size: 13pt;
      color: #0369a1;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .print-badge {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #10b981;
      padding: 4px 16px;
      border-radius: 9999px;
      font-weight: 800;
      font-size: 10pt;
      display: inline-block;
      margin-bottom: 12px;
    }
    .print-highlights {
      width: 100%;
      margin: 8px 0 12px 0;
      text-align: right;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-right: 4px solid #1e3a8a;
      border-radius: 6px;
      padding: 10px 14px;
      box-sizing: border-box;
    }
    .print-highlights li {
      font-size: 9.5pt;
      color: #334155;
      margin-bottom: 4px;
      line-height: 1.6;
    }
    .print-meta-grid {
      width: 100%;
      margin: 8px 0;
      border: 1px solid #cbd5e1;
      border-collapse: collapse;
      box-sizing: border-box;
    }
    .print-meta-grid td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      font-size: 9.5pt;
    }
    .print-meta-grid td.bold {
      background: #f8fafc;
      font-weight: 700;
      width: 28%;
      color: #1e3a8a;
    }

    /* هيكل جسم الصفحة للطباعة */
    .print-body {
      width: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .unit-section {
      margin-bottom: 18pt;
      width: 100%;
      box-sizing: border-box;
      page-break-inside: auto;
    }
    .unit-title-bar {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 6pt;
      margin-bottom: 12pt;
      width: 100%;
    }
    .unit-title-bar h1 {
      color: #0f172a;
      font-size: 19pt;
      margin: 2pt 0 4pt 0;
      font-family: 'Alexandria', sans-serif;
      font-weight: 900;
    }
    .golden-key-box {
      background: #fffdf5;
      border: 1px solid #fef3c7;
      border-right: 4px solid #d97706;
      padding: 10pt 14pt;
      border-radius: 6px;
      margin: 10pt 0;
      page-break-inside: avoid;
      width: 100%;
      box-sizing: border-box;
    }
    .exam-trap-box {
      background: #fffafa;
      border: 1px solid #fee2e2;
      border-right: 4px solid #dc2626;
      padding: 10pt 14pt;
      border-radius: 6px;
      margin: 10pt 0;
      page-break-inside: avoid;
      width: 100%;
      box-sizing: border-box;
    }
    .lesson-block {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12pt 14pt;
      margin-bottom: 14pt;
      background: #ffffff;
      page-break-inside: auto;
      width: 100%;
      box-sizing: border-box;
    }
    .pedagogical-stations-doc {
      width: 100% !important;
      box-sizing: border-box !important;
      margin-top: 10pt !important;
      padding: 10pt 12pt !important;
      page-break-inside: auto;
    }
    .question-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10pt 14pt;
      margin-bottom: 12pt;
      page-break-inside: avoid;
      background: #ffffff;
      width: 100%;
      box-sizing: border-box;
    }
    .question-header {
      border-bottom: 1px dotted #cbd5e1;
      padding-bottom: 4pt;
      margin-bottom: 6pt;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .question-badge {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      font-size: 9pt;
      font-weight: 800;
      padding: 2pt 8pt;
      border-radius: 4px;
      margin-left: 6px;
    }
    .question-text {
      font-size: 11pt;
      font-weight: 700;
      margin: 6pt 0 8pt 0;
      color: #0f172a;
      line-height: 1.65;
    }
    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6pt 16pt;
      margin: 8pt 0;
      padding-right: 4pt;
      width: 100%;
    }
    .options-grid li {
      list-style-type: none;
      font-size: 10.5pt;
      line-height: 1.55;
      padding: 4pt 8pt;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
    }
    .answer-box {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-right: 3px solid #16a34a;
      border-radius: 6px;
      padding: 8pt 12pt;
      margin-top: 8pt;
      font-size: 10.5pt;
      color: #14532d;
      width: 100%;
      box-sizing: border-box;
      line-height: 1.6;
    }
    .answer-title {
      font-weight: 800;
      color: #166534;
      margin-bottom: 3pt;
      font-size: 11pt;
    }
    .student-lines {
      margin-top: 8pt;
      border-bottom: 1px dotted #94a3b8;
      height: 26px; /* ارتفاع سطر واسع ومريح لكتابة يد الطالب بالقلم */
      width: 100%;
    }
    .student-draft-space {
      border: 1px dashed #cbd5e1;
      border-radius: 6px;
      background: #fafaf9;
      height: 52px;
      margin-top: 8pt;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      font-size: 9.5pt;
      font-weight: 600;
      width: 100%;
      box-sizing: border-box;
    }
    .rubric-table {
      width: 100% !important;
      border-collapse: collapse;
      margin: 8pt 0;
      font-size: 9.5pt;
      box-sizing: border-box;
    }
    .rubric-table th, .rubric-table td {
      border: 1px solid #cbd5e1;
      padding: 6pt 10pt;
    }
    .rubric-table th {
      background: #f8fafc;
      font-weight: 800;
      color: #1e3a8a;
    }
    table {
      width: 100% !important;
      box-sizing: border-box;
    }
    .page-break {
      page-break-after: always;
    }
    @media print {
      @page {
        size: A4 portrait;
        margin: 18mm 16mm 18mm 16mm !important;
      }
      @page:first {
        margin: 12mm 14mm 12mm 14mm !important;
      }
      html, body {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .print-cover {
        min-height: calc(100vh - 16mm) !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 14px 16px !important;
        box-sizing: border-box !important;
        page-break-after: always !important;
      }
      .print-body {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }
      .unit-section, .lesson-block, .pedagogical-stations-doc, .question-card, table {
        width: 100% !important;
        max-width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        box-sizing: border-box !important;
      }
      .lesson-block {
        page-break-inside: auto !important;
      }
      .unit-section {
        page-break-inside: auto !important;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <!-- غلاف خارجي متميز -->
  <div class="print-cover">
    <div class="print-cover-header">${school} • العام الدراسي ${options.academicYear || '2026 / 2027'}</div>
    
    <div>
      <div class="print-series-brand">سلسلة رواد الأعمال التعليمية — كتاب خارجي مطوّر</div>
      <div class="print-cover-title">${options.title}</div>
      ${options.subtitle ? `<div class="print-cover-sub">${options.subtitle}</div>` : ''}
      <div class="print-badge">${modeLabel}</div>
    </div>

    <div class="print-highlights">
      <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 6pt; font-size: 11.5pt;">⭐ مزايا هذا الإصدار الشامل والمتكامل:</div>
      <ul style="margin: 0; padding-right: 18pt;">
        <li>شرح مفاهيمي تفاعلي وتحليل استراتيجي واقعي من كبرى الشركات المصرية.</li>
        <li>رصد دقيق لفخاخ الاختبارات والتقييمات (Exam Traps) والتصويب المنهجي الرسمي.</li>
        <li>أكبر بنك أسئلة معياري متدرج من التذكر حتى التقويم ومستويات التفكير العليا.</li>
        <li>مختبر استدلال JRE سلم الـ 20 درجة مع تدريب تطبيقي على الروبرك الخماسي.</li>
      </ul>
    </div>

    <table class="print-meta-grid">
      <tr>
        <td class="bold">المادة والمستوى:</td>
        <td>إدارة الأعمال — الصف الثاني الثانوي (البكالوريا المصرية الحديثة)</td>
      </tr>
      <tr>
        <td class="bold">نطاق المحتوى:</td>
        <td>${options.unitTitle || (options.unitNumber ? `الوحدة رقم ${options.unitNumber}` : 'المنهج الكامل — جميع الوحدات')}</td>
      </tr>
      <tr>
        <td class="bold">المعلم / واضع المذكرة:</td>
        <td>${teacher}</td>
      </tr>
      <tr>
        <td class="bold">بيانات الطالب:</td>
        <td>
          <div style="display: flex; justify-content: space-between; gap: 10pt; font-size: 9pt; line-height: 1.6;">
            <span><strong>الاسم:</strong> ${options.studentName || '...................................................'}</span>
            <span><strong>المدرسة:</strong> ${school}</span>
            <span><strong>الفصل / الجلوس:</strong> .................</span>
          </div>
        </td>
      </tr>
    </table>

    <div style="font-size: 9.5pt; color: #64748b; margin-top: 15px;">
      إصدار تعليمي مستقل شامل — مراجعة وتدريب منهجي وفق أحدث معايير التقويم لمرحلة البكالوريا
    </div>
  </div>

  <div class="print-body">
    <div class="sheet-running-header" style="border-bottom: 1.5px solid #1e3a8a; padding-bottom: 6pt; margin-bottom: 18pt; display: flex; align-items: center; justify-content: space-between; font-size: 8.5pt; color: #475569; font-weight: 700;">
      <span style="color: #1e3a8a; font-weight: 800;">سلسلة رواد الأعمال التعليمية | مادة إدارة الأعمال — المرحلة الثانوية</span>
      <span style="color: #0f172a; font-weight: 900;">${options.title}</span>
      <span>العام الدراسي ${options.academicYear || '2026 / 2027'} • إعداد: ${teacher}</span>
    </div>
    ${options.contentHtml}
    <div class="sheet-running-footer" style="border-top: 1px solid #cbd5e1; padding-top: 8pt; margin-top: 24pt; display: flex; align-items: center; justify-content: space-between; font-size: 8pt; color: #64748b;">
      <span>منصة وسلسلة رواد الأعمال التعليمية — إصدار تعليمي مستقل غير تابع لأي جهة حكومية</span>
      <span>${school}</span>
      <span>مصرح بالطباعة والاستخدام التعليمي</span>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `);

  printWindow.document.close();
}
