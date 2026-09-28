import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Bookmark, CheckCircle2, AlertTriangle, Lightbulb, 
  Scale, ShieldCheck, Sparkles, QrCode, Tag, Search, Filter, 
  Layers, GraduationCap, Copy, Check, FileText, BookA
} from 'lucide-react';
import { 
  allGlossaryTerms, 
  GLOSSARY_UNITS_CONFIG, 
  AccountingGlossaryItem,
  SupportedGlossaryUnitId
} from '../../data/accountingGlossaryData';

interface PrintGlossaryBookletProps {
  selectedUnitId?: string; // 'all' or 'unit-1' ... 'unit-10'
  showSolutions?: boolean;
}

export const PrintGlossaryBooklet: React.FC<PrintGlossaryBookletProps> = ({
  selectedUnitId = 'all'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered units based on selectedUnitId
  const activeUnits = useMemo(() => {
    if (selectedUnitId === 'all') {
      return GLOSSARY_UNITS_CONFIG;
    }
    return GLOSSARY_UNITS_CONFIG.filter(u => u.id === selectedUnitId);
  }, [selectedUnitId]);

  // All terms matching unit, category, and search
  const filteredTerms = useMemo(() => {
    return allGlossaryTerms.filter(item => {
      // Unit filter
      if (selectedUnitId !== 'all' && item.unitId !== selectedUnitId) {
        return false;
      }
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.trim().toLowerCase();
        const matchesTerm = item.term.toLowerCase().includes(query);
        const matchesEn = item.termEn.toLowerCase().includes(query);
        const matchesSimple = item.simpleDefinition.toLowerCase().includes(query);
        const matchesAcademic = item.academicDefinition.toLowerCase().includes(query);
        const matchesMistake = item.commonMistake.toLowerCase().includes(query);
        const matchesTags = item.tags?.some(t => t.toLowerCase().includes(query));
        return matchesTerm || matchesEn || matchesSimple || matchesAcademic || matchesMistake || matchesTags;
      }
      return true;
    });
  }, [selectedUnitId, activeCategory, searchTerm]);

  // Alphabetically sorted terms for Master A-Z Lexicon Index
  const alphabeticalTerms = useMemo(() => {
    return [...allGlossaryTerms].sort((a, b) => a.term.localeCompare(b.term, 'ar'));
  }, []);

  const handleCopy = (item: AccountingGlossaryItem) => {
    const text = `${item.term} (${item.termEn})
المفهوم ببساطة: ${item.simpleDefinition}
التعريف الأكاديمي: ${item.academicDefinition}
تطبيق عملي: ${item.practicalExample}
فخ الامتحان: ${item.commonMistake}`;

    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {});
  };

  return (
    <div className="space-y-12 font-serif text-[#1D1D1B]" dir="rtl">

      {/* =========================================================================
          1. FORMAL BOOKLET FRONTISPIECE / TITLE HEADER
         ========================================================================= */}
      <section className="border-4 border-[#0C1E36] bg-[#FAF8F5] p-6 sm:p-10 shadow-md relative overflow-hidden page-break-after">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <BookA className="w-[450px] h-[450px] text-[#C5A059]" />
        </div>

        {/* Ministerial National Header */}
        <div className="border-b-2 border-[#C5A059] pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold text-[#0C1E36]">
          <div className="space-y-0.5 text-center sm:text-right">
            <span className="text-sm font-black block">جمهورية مصر العربية — وزارة التربية والتعليم</span>
            <span className="text-[#8A5D00]">قطاع التعليم العام والتجاري • الإدارة المركزية لتطوير المناهج</span>
          </div>
          <div className="px-4 py-1.5 bg-[#0C1E36] text-[#C5A059] border border-[#C5A059]/40 text-center">
            <span className="block text-[10px] tracking-widest uppercase">EGYPTIAN BACCALAUREATE (EB)</span>
            <span className="text-xs font-black text-white">معجم المصطلحات والمفاهيم المحاسبية المعتمد</span>
          </div>
          <div className="text-center sm:text-left space-y-0.5">
            <span className="text-xs text-[#781D28] block">العام الدراسي: 2026 / 2027</span>
            <span className="text-[10px] text-[#1D1D1B]/70">إيداع دار الكتب: 14280 / 2026</span>
          </div>
        </div>

        {/* Grand Title Banner */}
        <div className="text-center py-8 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#1A2D47] text-[#C5A059] border border-[#C5A059]/60 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الإصدار المرجعي المطبوع الفاخر — عربي / English</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#0C1E36] tracking-tight leading-tight">
            معجم المصطلحات والمفاهيم المحاسبية
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="h-0.5 w-16 bg-[#C5A059]" />
            <h2 className="text-xl sm:text-3xl font-bold font-serif text-[#781D28]">
              الدليل المعجمي المقنن والشامل للبكالوريا المصرية
            </h2>
            <div className="h-0.5 w-16 bg-[#C5A059]" />
          </div>

          <p className="text-sm sm:text-base text-[#1D1D1B]/85 max-w-3xl mx-auto font-sans leading-relaxed pt-2">
            مرجع الطالب والمعلم المتكامل: يجمع كافة مصطلحات المنهج الوزاري عبر الوحدات العشر (1-10)، 
            مع التفسير المبسط، الصياغة الأكاديمية المقننة، التطبيقات الرقمية من واقع السوق المصري، 
            والتحذير الصريح من أخطر الأفخاخ الامتحانية ومزالق درجات الـ JRE.
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <span className="px-3 py-1.5 bg-[#FFFFFF] border border-[#0C1E36]/30 font-bold text-[#0C1E36] shadow-2xs">
              📚 {allGlossaryTerms.length} مصطلحاً ومفهوماً محورياً
            </span>
            <span className="px-3 py-1.5 bg-[#FFFFFF] border border-[#0C1E36]/30 font-bold text-[#781D28] shadow-2xs">
              🏛️ 10 وحدات دراسية و 58 درساً
            </span>
            <span className="px-3 py-1.5 bg-[#FFFFFF] border border-[#0C1E36]/30 font-bold text-[#8A5D00] shadow-2xs">
              🎯 مطابقة بنسبة 100% لكتاب الوزارة
            </span>
            <span className="px-3 py-1.5 bg-[#FFFFFF] border border-[#0C1E36]/30 font-bold text-emerald-800 shadow-2xs">
              ⚖️ تأصيل كامل لمقال الاستدلال JRE
            </span>
          </div>
        </div>

        {/* Legal Deposit & ISBN Strip */}
        <div className="border-t border-[#0C1E36]/20 pt-3 flex flex-wrap items-center justify-between text-[11px] text-[#1D1D1B]/70 font-mono">
          <span>الترقيم الدولي الموحد (ISBN): 978-977-08-4120-1</span>
          <span>سلسلة المحاسبة المالية ببساطة وإتقان • دار التميز للنشر والتقنيات التعليمية</span>
          <span>حقوق الطبع والتأليف محفوظة © 2026/2027</span>
        </div>
      </section>

      {/* =========================================================================
          2. THEMATIC UNITS INDEX MATRIX (خارطة الأبواب المعجمية)
         ========================================================================= */}
      <section className="bg-[#FFFFFF] border-2 border-[#0C1E36] p-6 sm:p-8 space-y-4 page-break-after shadow-xs">
        <div className="border-b-2 border-[#0C1E36] pb-3 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-mono font-bold text-[#8A5D00] uppercase tracking-widest">
              SYLLABUS COVERAGE & LEXICAL MATRIX
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0C1E36] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C5A059]" />
              <span>فهرس الأبواب المعجمية وتوزيع المصطلحات على وحدات المنهج</span>
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-[#0C1E36] bg-[#FAF8F5] px-3 py-1.5 border border-[#C5A059]">
            {GLOSSARY_UNITS_CONFIG.length} أبواب مقررة
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#1D1D1B]/80 font-sans leading-relaxed">
          تم تصنيف مصطلحات المعجم بدقة موضوعية ترتبط مباشرة بصفحات كتاب الوزارة، لتسهيل المراجعة السريعة قبل الامتحانات وضمان الإلمام بكافة المفردات الأكاديمية والمهنية.
        </p>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#0C1E36] text-[#FFFFFF] font-serif">
                <th className="p-3 border border-[#0C1E36] text-center w-16">الوحدة</th>
                <th className="p-3 border border-[#0C1E36]">اسم الوحدة المقررة والمحور المفاهيمي</th>
                <th className="p-3 border border-[#0C1E36] text-center">صفحات كتاب الوزارة</th>
                <th className="p-3 border border-[#0C1E36] text-center">عدد المصطلحات</th>
                <th className="p-3 border border-[#0C1E36]">المجالات المعجمية المغطاة</th>
              </tr>
            </thead>
            <tbody>
              {GLOSSARY_UNITS_CONFIG.map((u, idx) => (
                <tr 
                  key={u.id} 
                  className={`border-b border-[#0C1E36]/15 hover:bg-[#FAF8F5] transition ${
                    idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F5]/60'
                  }`}
                >
                  <td className="p-2.5 font-mono font-bold text-center border border-[#0C1E36]/15 text-[#0C1E36]">
                    U{u.unitNumber}
                  </td>
                  <td className="p-2.5 font-serif font-bold text-[#0C1E36] border border-[#0C1E36]/15">
                    {u.title}
                  </td>
                  <td className="p-2.5 font-mono text-center border border-[#0C1E36]/15 text-[#781D28] font-bold">
                    {u.officialPages}
                  </td>
                  <td className="p-2.5 font-mono font-bold text-center border border-[#0C1E36]/15 text-[#8A5D00]">
                    {u.termsCount} مصطلحات
                  </td>
                  <td className="p-2.5 font-sans text-[#1D1D1B]/80 text-[11px] border border-[#0C1E36]/15 leading-relaxed">
                    {u.unitNumber === 1 && 'الفروض الأربعة، المبادئ المحاسبية، معادلة الميزانية، والكيان المستقل'}
                    {u.unitNumber === 2 && 'الدورة المستندية، القيد المزدوج، دفتر اليومية، الأستاذ، وميزان المراجعة'}
                    {u.unitNumber === 3 && 'اليوميات المساعدة الأربعة، دفاتر الأستاذ التحليلية، وحسابات المراقبة الإجمالية'}
                    {u.unitNumber === 4 && 'الأخطاء المتكافئة، السهو والارتكاب، القيد العكسي، والحساب المعلق'}
                    {u.unitNumber === 5 && 'أساس الاستحقاق، المقدمات والمستحقات، حساب المتاجرة، والأرباح والخسائر'}
                    {u.unitNumber === 6 && 'السجلات غير المكتملة، طريقة المقارنة الرأسمالية، ومذكرة تسوية البنك'}
                    {u.unitNumber === 7 && 'قسط الإهلاك الثابت والمتناقص، مخصص الإهلاك، ومخصص الديون المشكوك فيها'}
                    {u.unitNumber === 8 && 'حساب توزيع الأرباح، فائدة رأس المال والمسحوبات، وجاري الشركاء'}
                    {u.unitNumber === 9 && 'رأس المال المرخص والمصدر، الأسهم العادية والممتازة، والسندات وعلاوة الإصدار'}
                    {u.unitNumber === 10 && 'نسب السيولة والربحية، معدل دوران الأصول والمخزون، والرافعة المالية'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE SEARCH & CATEGORY FILTER STRIP (HIDDEN IN PRINT)
         ========================================================================= */}
      <section className="no-print bg-[#FAF8F5] border-2 border-[#C5A059] p-4 space-y-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5A059]/40 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0C1E36]">
            <Search className="w-4 h-4 text-[#8A5D00]" />
            <span>البحث والتصفية السريعة قبل الطباعة:</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#781D28]">
            المعروض: {filteredTerms.length} من أصل {allGlossaryTerms.length} مصطلحاً
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Keyword Search Input */}
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث بالاسم العربي، الإنجليزي، المفهوم، أو الفخ الامتحاني..."
              className="w-full bg-[#FFFFFF] border border-[#0C1E36]/30 px-3 py-2 text-xs font-sans text-[#1D1D1B] focus:outline-hidden focus:border-[#C5A059]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-2.5 top-2.5 text-xs text-zinc-500 hover:text-zinc-800"
              >
                مسح
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#0C1E36]/30 px-3 py-2 text-xs font-bold font-sans text-[#0C1E36] focus:outline-hidden"
            >
              <option value="all">كافة التصنيفات المعجمية</option>
              <option value="فروض ومبادئ">فروض ومبادئ محاسبية</option>
              <option value="معادلة وقيد">معادلة وقيد ودورة مستندية</option>
              <option value="أستاذ وميزان">أستاذ وميزان مراجعة</option>
              <option value="دفاتر مساعدة">دفاتر مساعدة ويوميات</option>
              <option value="تسويات وحسابات ختامية">تسويات وحسابات ختامية</option>
              <option value="سجلات غير مكتملة">سجلات غير مكتملة وبنك</option>
              <option value="إهلاك ومخصصات">إهلاك ومخصصات وديون</option>
              <option value="شركات أشخاص وتضامن">شركات أشخاص وتضامن</option>
              <option value="شركات أموال ومساهمة">شركات أموال ومساهمة</option>
              <option value="تحليل مالي ونسب">تحليل مالي ونسب أداء</option>
              <option value="استدلال JRE">استدلال محاسبي JRE</option>
            </select>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CORE LEXICAL CHAPTERS (THE 10 UNITS LOOP)
         ========================================================================= */}
      <div className="space-y-12">
        {activeUnits.map((unit) => {
          // Terms belonging to this unit (considering search & category filters)
          const unitTerms = filteredTerms.filter(t => t.unitId === unit.id);

          if (unitTerms.length === 0) return null;

          return (
            <section key={unit.id} className="space-y-6">
              
              {/* Unit Chapter Separator Banner (Classical Egyptian Textbook Layout) */}
              <div className="border-3 border-[#0C1E36] bg-[#FAF8F5] p-5 sm:p-7 shadow-xs page-break-after page-break-before">
                <div className="flex flex-wrap items-center justify-between border-b-2 border-[#C5A059] pb-2.5 text-xs font-mono font-bold">
                  <span className="bg-[#0C1E36] text-[#C5A059] px-3 py-1">
                    UNIT {unit.unitNumber} OF 10 • الباب المعجمي
                  </span>
                  <span className="text-[#781D28]">
                    كتاب الوزارة المعتمد: {unit.officialPages}
                  </span>
                </div>

                <div className="py-4 space-y-2 text-center sm:text-right">
                  <span className="text-xs font-bold text-[#8A5D00] uppercase tracking-widest font-mono block">
                    LEXICAL CHAPTER • مصطلحات الباب
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#0C1E36]">
                    {unit.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#1D1D1B]/80 font-sans pt-1">
                    <span className="font-bold">المصطلحات المضمنة في هذا الباب: {unitTerms.length} مصطلحاً</span>
                    <span>•</span>
                    <span>تأصيل لغوي واصطلاحي وفق معايير المحاسبة المصرية (EAS)</span>
                    <span>•</span>
                    <span>أدلة استدلالية لسؤال الـ JRE</span>
                  </div>
                </div>
              </div>

              {/* Unit Terms Grid / List */}
              <div className="space-y-6">
                {unitTerms.map((item, idx) => (
                  <article
                    key={item.id}
                    id={`term-${item.id}`}
                    className="border-2 border-[#0C1E36] bg-[#FFFFFF] p-5 sm:p-7 space-y-4 shadow-sm page-break-inside-avoid relative"
                  >
                    {/* Top Running Header of Term */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#0C1E36]/15 pb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#0C1E36] text-[#C5A059]">
                          #{idx + 1}
                        </span>
                        <h3 className="text-lg sm:text-2xl font-black font-serif text-[#0C1E36]">
                          {item.term}
                        </h3>
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#781D28] tracking-wide dir-ltr">
                          ({item.termEn})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#FAF8F5] border border-[#C5A059] text-[#8A5D00] font-sans">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#1D1D1B]/70 bg-zinc-100 px-2 py-0.5 border border-zinc-300">
                          {item.lessonTitle}
                        </span>

                        {/* Copy Button (no-print) */}
                        <button
                          onClick={() => handleCopy(item)}
                          className="no-print p-1 hover:bg-zinc-100 text-zinc-600 transition border border-transparent hover:border-zinc-300 cursor-pointer"
                          title="نسخ بيانات المصطلح"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 4 Pillars of Term Explanation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                      
                      {/* Pillar 1: المفهوم ببساطة (The Intuitive Plain-Language Core) */}
                      <div className="p-3.5 bg-[#FAF8F5] border-r-4 border-[#C5A059] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-black text-[#8A5D00] font-serif text-xs">
                          <Lightbulb className="w-4 h-4 text-[#8A5D00] shrink-0" />
                          <span>المفهوم ببساطة وبدون تعقيد (Mental Model):</span>
                        </div>
                        <p className="text-[#1D1D1B] leading-relaxed font-sans text-xs sm:text-[13px]">
                          {item.simpleDefinition}
                        </p>
                      </div>

                      {/* Pillar 2: التعريف الأكاديمي والمعياري (Academic Standard Definition) */}
                      <div className="p-3.5 bg-[#F8FAFC] border-r-4 border-[#0C1E36] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-black text-[#0C1E36] font-serif text-xs">
                          <BookOpen className="w-4 h-4 text-[#0C1E36] shrink-0" />
                          <span>التعريف الأكاديمي المعتمد بالمعايير (Standard Definition):</span>
                        </div>
                        <p className="text-[#1D1D1B] leading-relaxed font-serif text-xs sm:text-[13px]">
                          {item.academicDefinition}
                        </p>
                      </div>

                      {/* Pillar 3: التطبيق العملي بالأرقام (Practical Egyptian Application) */}
                      <div className="p-3.5 bg-[#F0FDF4] border-r-4 border-emerald-700 space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-black text-emerald-900 font-serif text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>تطبيق عملي من واقع السوق والقيود المحاسبية:</span>
                        </div>
                        <p className="text-emerald-950 leading-relaxed font-sans text-xs sm:text-[13px]">
                          {item.practicalExample}
                        </p>
                      </div>

                      {/* Pillar 4: ⚠️ فخ الامتحان والتنبيه المنهجي (Critical Exam Pitfall) */}
                      <div className="p-3.5 bg-[#FEF2F2] border-r-4 border-[#8A1F1D] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-black text-[#8A1F1D] font-serif text-xs">
                          <AlertTriangle className="w-4 h-4 text-[#8A1F1D] shrink-0" />
                          <span>انتبه! فخ امتحاني ومزلق شائع (Exam Pitfall):</span>
                        </div>
                        <p className="text-[#781D28] leading-relaxed font-sans text-xs sm:text-[13px]">
                          {item.commonMistake}
                        </p>
                      </div>

                    </div>

                    {/* Tags & Cross-References Footer */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="pt-2 border-t border-[#0C1E36]/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#1D1D1B]/70 font-mono">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Tag className="w-3 h-3 text-[#C5A059]" />
                          <span className="font-bold">المفاهيم والوسوم المرتبطة:</span>
                          {item.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="px-2 py-0.5 bg-[#FAF8F5] border border-[#0C1E36]/15 text-[#0C1E36] font-sans"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-[10px] text-[#1D1D1B]/50 font-sans">
                          سلسلة المحاسبة المالية ببساطة وإتقان • البكالوريا المصرية 2027
                        </div>
                      </div>
                    )}

                  </article>
                ))}
              </div>

            </section>
          );
        })}
      </div>

      {/* =========================================================================
          5. MASTER ALPHABETICAL LEXICON INDEX (الفهرس الهجائي الشامل أ - ي)
         ========================================================================= */}
      <section className="bg-[#FAF8F5] border-3 border-[#0C1E36] p-6 sm:p-8 space-y-5 page-break-before page-break-after shadow-sm">
        <div className="border-b-2 border-[#0C1E36] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-[#8A5D00] uppercase tracking-widest">
              MASTER A-Z LEXICON INDEX
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0C1E36] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C5A059]" />
              <span>الفهرس الهجائي الألفبائي الشامل للمصطلحات (أ - ي)</span>
            </h3>
          </div>
          <span className="font-mono text-xs font-bold bg-[#0C1E36] text-[#C5A059] px-3 py-1">
            {alphabeticalTerms.length} مصطلحاً مرتباً ألفبائياً
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#1D1D1B]/80 font-sans leading-relaxed">
          دليل الكشف السريع: يتيح للباحث والطالب الوصول المباشر إلى أي مصطلح محاسبي، ومعرفة ترجمته الإنجليزية الرسمية، والباب التابع له، مع موجز مكثف لمدلوله الفني.
        </p>

        {/* 2-Column Compact Alphabetical Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {alphabeticalTerms.map((term, idx) => (
            <div 
              key={term.id}
              className="bg-[#FFFFFF] border border-[#0C1E36]/20 p-2.5 flex items-start justify-between gap-2 hover:border-[#C5A059] transition"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-[10px] font-bold text-[#8A5D00]">
                    #{idx + 1}
                  </span>
                  <strong className="font-serif text-[#0C1E36] text-xs sm:text-sm">
                    {term.term}
                  </strong>
                </div>
                <div className="font-mono text-[11px] text-[#781D28] dir-ltr text-right">
                  {term.termEn}
                </div>
                <p className="text-[11px] text-[#1D1D1B]/80 line-clamp-1 font-sans">
                  {term.simpleDefinition}
                </p>
              </div>

              <div className="text-left shrink-0 font-mono text-[10px] text-[#0C1E36] space-y-0.5">
                <span className="px-1.5 py-0.5 bg-[#FAF8F5] border border-[#0C1E36]/20 block font-bold">
                  {term.unitId.replace('unit-', 'الوحدة ')}
                </span>
                <span className="text-[#8A5D00] block text-[9px]">
                  {term.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. BOOKLET OFFICIAL BACK COVER & CERTIFICATION
         ========================================================================= */}
      <footer className="border-4 border-[#0C1E36] bg-[#0C1E36] text-[#FDFCF7] p-8 text-center space-y-4 page-break-after shadow-md">
        <div className="inline-block px-4 py-1 bg-[#1A2D47] text-[#C5A059] border border-[#C5A059]/40 text-xs font-mono font-bold uppercase">
          OFFICIAL PUBLICATION CLOSING
        </div>

        <h4 className="text-xl sm:text-3xl font-black font-serif text-[#FFFFFF]">
          سلسلة المحاسبة المالية ببساطة وإتقان
        </h4>
        <p className="text-xs sm:text-sm text-[#E8DCC4] max-w-xl mx-auto font-sans leading-relaxed">
          كتيب معجم المصطلحات والمفاهيم المحاسبية — ملحق رسمي معتمد مع كتاب الشرح وبنك الأسئلة الموحد لشهادة البكالوريا المصرية (EB) 2026/2027.
        </p>

        <div className="pt-4 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3 text-xs text-[#E8DCC4] font-mono">
          <span>إيداع دار الكتب المصرية: 14280 / 2026</span>
          <span>ISBN: 978-977-08-4120-1</span>
          <span>طبعة معتمدة بجمهورية مصر العربية</span>
        </div>
      </footer>

    </div>
  );
};
