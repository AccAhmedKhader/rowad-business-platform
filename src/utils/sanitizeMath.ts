/**
 * دالة تنظيف وتنسيق المعادلات المحاسبية في كامل المنصة
 * تحول أي نصوص أو صيغ LaTeX (مثل \text{}, \times, \frac, $$, $)
 * إلى صياغة عربية محاسبية واضحة وأنيقة متوافقة مع كتب الوزارة ونظام البكالوريا.
 */
export function sanitizeMathContent(content: string): string {
  if (!content) return '';

  return content
    // معالجة كتل المعادلات المغلفة بـ $$ ... $$
    .replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, (_, inner) => {
      const cleaned = cleanMathString(inner);
      return `\n> **${cleaned}**\n`;
    })
    // معالجة المعادلات المضمنة بـ $ ... $
    .replace(/\$([^\$\n]+)\$/g, (_, inner) => {
      return cleanMathString(inner);
    })
    // تنظيف أي وسوم LaTeX متبقية في النص العادي
    .replace(/\\mathbf\{([^}]+)\}/g, '**$1**')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 ÷ $2)')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\longrightarrow/g, '←')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\pm/g, '±')
    .replace(/\\%/g, '%');
}

function cleanMathString(str: string): string {
  return str
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 ÷ $2)')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\longrightarrow/g, '←')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\pm/g, '±')
    .replace(/\\%/g, '%')
    .replace(/\s+/g, ' ')
    .trim();
}
