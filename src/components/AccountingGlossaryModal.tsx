import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookA, Search, X, BookOpen, AlertTriangle, CheckCircle2, 
  Lightbulb, Bookmark, ArrowUpRight, Copy, Check, Layers,
  GraduationCap, FolderTree, Printer
} from 'lucide-react';
import { 
  accountingGlossary, 
  AccountingGlossaryItem,
  GLOSSARY_UNITS_CONFIG,
  GLOSSARY_CATEGORIES
} from '../data/accountingGlossaryData';

interface AccountingGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string | null;
  onNavigateToLesson?: (lessonIndex: number, unitId?: string, lessonId?: string) => void;
  onOpenPrintGlossary?: () => void;
}

export const AccountingGlossaryModal: React.FC<AccountingGlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTermId,
  onNavigateToLesson,
  onOpenPrintGlossary
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTermId, setSelectedTermId] = useState<string>(
    initialTermId || accountingGlossary[0]?.id || 'entity-concept'
  );
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);

  // Sync when initialTermId changes (e.g. user clicked a term chip in LessonViewer)
  useEffect(() => {
    if (initialTermId) {
      setSelectedTermId(initialTermId);
      const found = accountingGlossary.find(g => g.id === initialTermId);
      if (found) {
        setSelectedUnitId(found.unitId || 'all');
        setSelectedCategory('all');
      }
    }
  }, [initialTermId]);

  // Handle term definition copying
  const handleCopyDefinition = (item: AccountingGlossaryItem) => {
    const textToCopy = `${item.term} (${item.termEn})
المفهوم ببساطة: ${item.simpleDefinition}
التعريف الأكاديمي: ${item.academicDefinition}
مثال تطبيقي: ${item.practicalExample}
تنبيه منهجي: ${item.commonMistake}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedTermId(item.id);
      setTimeout(() => setCopiedTermId(null), 2000);
    }).catch(() => {
      // Fallback if clipboard API unavailable
    });
  };

  // Filtered items based on Unit, Category, and Search Query
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return accountingGlossary.filter(item => {
      // Unit match
      if (selectedUnitId !== 'all' && item.unitId !== selectedUnitId) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Query match
      if (!query) return true;

      const matchesTerm = item.term.toLowerCase().includes(query);
      const matchesEn = item.termEn.toLowerCase().includes(query);
      const matchesSimple = item.simpleDefinition.toLowerCase().includes(query);
      const matchesAcademic = item.academicDefinition.toLowerCase().includes(query);
      const matchesExample = item.practicalExample.toLowerCase().includes(query);
      const matchesMistake = item.commonMistake.toLowerCase().includes(query);
      const matchesLesson = item.lessonTitle.toLowerCase().includes(query);
      const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));

      return matchesTerm || matchesEn || matchesSimple || matchesAcademic || 
             matchesExample || matchesMistake || matchesLesson || matchesTags;
    });
  }, [searchQuery, selectedUnitId, selectedCategory]);

  // Active selected item
  const activeItem: AccountingGlossaryItem | undefined = useMemo(() => {
    if (filteredItems.length === 0) return undefined;
    return filteredItems.find(i => i.id === selectedTermId) || filteredItems[0];
  }, [selectedTermId, filteredItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1D1D1B]/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="accounting-glossary-modal"
        className="bg-[#FDFCF7] border-2 border-[#1D1D1B] w-full max-w-6xl h-[92vh] max-h-[820px] shadow-2xl flex flex-col overflow-hidden text-[#1D1D1B]"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#1D1D1B] text-[#F9F7F2] flex items-center justify-between border-b border-[#1D1D1B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-bold shrink-0">
              <BookA className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black font-serif tracking-wide">
                  معجم وقاموس المصطلحات المحاسبية المعتمد
                </h2>
                <span className="px-2 py-0.5 bg-[#C4A484]/30 text-[#E8DCC4] text-[10px] font-mono border border-[#C4A484]/40">
                  {accountingGlossary.length} مصطلحاً • 10 وحدات كاملة
                </span>
              </div>
              <p className="text-xs text-[#E8DCC4]/80 hidden sm:block">
                مرجع أكاديمي وتطبيقي شامل موزع على وحدات ودروس المنهج، يشمل المفاهيم المبسطة والأمثلة والتحذيرات المنهجية
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onOpenPrintGlossary && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPrintGlossary();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C4A484] hover:bg-[#b89574] text-[#1D1D1B] font-bold text-xs shadow-xs transition cursor-pointer"
                title="طباعة وتصدير كتيب المصطلحات الورقي الرسمي (A4 فاخر)"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">كتيب الطباعة المعتمد (A4)</span>
                <span className="sm:hidden">طباعة</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#E8DCC4] hover:text-[#FFFFFF] hover:bg-[#333330] transition cursor-pointer"
              title="إغلاق القاموس"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-3 sm:p-4 bg-[#FFFFFF] border-b border-[#1D1D1B]/15 space-y-3 shrink-0">
          
          {/* Row 1: Search & Total Stats */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#1D1D1B]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن أي مصطلح عربي أو إنجليزي، أو مفهوم (مثل: الاستحقاق، التكلفة، ROCE، الإهلاك، الشهرة)..."
                className="w-full pr-9 pl-14 py-2 text-xs sm:text-sm bg-[#F9F7F2] border border-[#1D1D1B]/30 focus:border-[#1D1D1B] focus:bg-[#FFFFFF] outline-hidden transition font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs bg-[#1D1D1B]/10 hover:bg-[#1D1D1B]/20 text-[#1D1D1B] px-1.5 py-0.5"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Quick Reset if filters applied */}
            {(selectedUnitId !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedUnitId('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs px-2.5 py-2 bg-[#F9F7F2] hover:bg-[#E8DCC4]/50 border border-[#1D1D1B]/25 text-[#1D1D1B] font-bold shrink-0 transition"
              >
                إلغاء التصفية ({filteredItems.length})
              </button>
            )}
          </div>

          {/* Row 2: Units Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs scrollbar-none border-t border-[#1D1D1B]/10 pt-2">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#1D1D1B]/70 shrink-0 ml-1">
              <Layers className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>الوحدات:</span>
            </div>

            <button
              onClick={() => setSelectedUnitId('all')}
              className={`px-2.5 py-1 font-bold whitespace-nowrap transition cursor-pointer border text-[11px] ${
                selectedUnitId === 'all'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B]/80 hover:bg-[#E8DCC4]/40 border-[#1D1D1B]/20'
              }`}
            >
              جميع الوحدات ({accountingGlossary.length})
            </button>

            {GLOSSARY_UNITS_CONFIG.map((u) => {
              const isSelected = selectedUnitId === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnitId(u.id)}
                  className={`px-2.5 py-1 font-bold whitespace-nowrap transition cursor-pointer border text-[11px] ${
                    isSelected
                      ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                      : 'bg-[#F9F7F2] text-[#1D1D1B]/80 hover:bg-[#E8DCC4]/40 border-[#1D1D1B]/20'
                  }`}
                  title={u.title}
                >
                  الوحدة {u.unitNumber} ({u.termsCount})
                </button>
              );
            })}
          </div>

          {/* Row 3: Categories Selector */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-xs scrollbar-none">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#1D1D1B]/70 shrink-0 ml-1">
              <FolderTree className="w-3.5 h-3.5 text-[#8C6D4F]" />
              <span>الموضوع:</span>
            </div>

            {GLOSSARY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 text-[10px] font-bold whitespace-nowrap transition cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#C4A484] text-[#1D1D1B] border-[#1D1D1B]'
                    : 'bg-[#FFFFFF] text-[#1D1D1B]/70 hover:bg-[#F9F7F2] border-[#1D1D1B]/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Modal Main Workspace: Split View */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left / Sidebar: List of Terms (4 Cols on md, 5 on lg) */}
          <div className="md:col-span-4 lg:col-span-5 border-l border-[#1D1D1B]/15 bg-[#F9F7F2] overflow-y-auto p-2 space-y-1.5 max-h-[260px] md:max-h-full">
            <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-[#1D1D1B]/70 border-b border-[#1D1D1B]/10 pb-1">
              <span>قائمة المصطلحات ({filteredItems.length})</span>
              <span className="text-[10px] text-[#1D1D1B]/50">اختر للقراءة والتحليل</span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#1D1D1B]/60 space-y-2">
                <BookOpen className="w-8 h-8 mx-auto opacity-30" />
                <p className="font-bold">لا توجد مصطلحات مطابقة للشروط المختارة.</p>
                <p className="text-[11px] text-[#1D1D1B]/50">جرّب تغيير كلمات البحث أو اختيار "جميع الوحدات".</p>
              </div>
            ) : (
              filteredItems.map(item => {
                const isSelected = activeItem?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTermId(item.id)}
                    className={`w-full text-right p-2.5 transition border cursor-pointer block space-y-1 ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#1D1D1B] shadow-xs translate-x-0.5 border-r-4 border-r-[#C4A484]'
                        : 'bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] border-[#1D1D1B]/10 text-[#1D1D1B]/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-bold font-serif line-clamp-1 ${isSelected ? 'text-[#1D1D1B]' : 'text-[#1D1D1B]/90'}`}>
                        {item.term}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#E8DCC4] text-[#1D1D1B] font-mono shrink-0 font-bold">
                        {item.unitId.replace('unit-', 'و')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#1D1D1B]/60 font-mono">
                      <span className="line-clamp-1 truncate max-w-[200px]">{item.termEn}</span>
                      <span className="text-[9px] text-[#1D1D1B]/50">{item.category}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right: Detailed Term Inspector (8 Cols on md, 7 on lg) */}
          <div className="md:col-span-8 lg:col-span-7 bg-[#FFFFFF] overflow-y-auto p-4 sm:p-6 space-y-5">
            {activeItem ? (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* Header of Term */}
                <div className="pb-3.5 border-b border-[#1D1D1B]/15 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 bg-[#1D1D1B] text-[#F9F7F2] text-[11px] font-bold font-mono">
                        {activeItem.unitName}
                      </span>
                      <span className="px-2 py-1 bg-[#C4A484]/30 text-[#1D1D1B] border border-[#C4A484] text-[11px] font-bold font-sans">
                        {activeItem.category}
                      </span>
                      <span className="px-2 py-1 bg-[#F9F7F2] text-[#1D1D1B]/70 border border-[#1D1D1B]/20 text-[10px] font-mono">
                        الدرس {activeItem.lessonNumber}
                      </span>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyDefinition(activeItem)}
                      className="px-2.5 py-1 bg-[#F9F7F2] hover:bg-[#1D1D1B] text-[#1D1D1B] hover:text-[#F9F7F2] border border-[#1D1D1B]/20 transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="نسخ الشرح والتعريف"
                    >
                      {copiedTermId === activeItem.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#C4A484]" />
                          <span>نسخ الشرح</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-serif text-[#1D1D1B]">
                      {activeItem.term}
                    </h3>
                    <div className="text-xs text-[#1D1D1B]/60 font-mono mt-0.5">
                      {activeItem.termEn}
                    </div>
                  </div>
                </div>

                {/* 1. Simple Direct Student Definition */}
                <div className="p-4 bg-[#FDFCF7] border-r-4 border-r-[#C4A484] border border-[#1D1D1B]/15 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1B]">
                    <Lightbulb className="w-4 h-4 text-[#8C6D4F]" />
                    <span>المفهوم ببساطة (الفهم المباشر):</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D1D1B] leading-relaxed font-sans">
                    {activeItem.simpleDefinition}
                  </p>
                </div>

                {/* 2. Academic & Standard Definition */}
                <div className="p-4 bg-[#FFFFFF] border border-[#1D1D1B]/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1B]/80 font-mono">
                    <BookOpen className="w-4 h-4 text-[#1D1D1B]" />
                    <span>التعريف الأكاديمي والمعياري المعتمد:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D1D1B]/95 leading-relaxed font-sans">
                    {activeItem.academicDefinition}
                  </p>
                </div>

                {/* 3. Practical Example with Numbers/Entries */}
                <div className="p-4 bg-[#E8DCC4]/20 border border-[#C4A484]/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1B]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>مثال تطبيقي عملي بالأرقام والقيود:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D1D1B] leading-relaxed">
                    {activeItem.practicalExample}
                  </p>
                </div>

                {/* 4. Common Misconception Warning */}
                <div className="p-4 bg-amber-50/70 border border-amber-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>انتبه! خطأ شائع وتنبيه منهجي للامتحان:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-sans">
                    {activeItem.commonMistake}
                  </p>
                </div>

                {/* 5. Tags */}
                {activeItem.tags && activeItem.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[11px] text-[#1D1D1B]/50 font-bold">الوسوم:</span>
                    {activeItem.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] px-2 py-0.5 bg-[#F9F7F2] border border-[#1D1D1B]/15 text-[#1D1D1B]/70 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Link to Lesson */}
                <div className="pt-3 flex items-center justify-between flex-wrap gap-2 text-xs border-t border-[#1D1D1B]/10">
                  <div className="flex items-center gap-1.5 text-[#1D1D1B]/70">
                    <Bookmark className="w-3.5 h-3.5 text-[#C4A484]" />
                    <span>الدرس التابع له:</span>
                    <span className="font-bold text-[#1D1D1B]">
                      {activeItem.lessonTitle}
                    </span>
                  </div>

                  {onNavigateToLesson && (
                    <button
                      onClick={() => {
                        onNavigateToLesson(0, activeItem.unitId, activeItem.relatedLessonId);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 bg-[#1D1D1B] text-[#F9F7F2] hover:bg-[#333330] font-bold text-xs flex items-center gap-1.5 cursor-pointer transition shadow-xs"
                    >
                      <GraduationCap className="w-4 h-4 text-[#C4A484]" />
                      <span>الانتقال لشرح الدرس بالمنهج</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#1D1D1B]/50">
                اختر مصطلحاً لعرض تفاصيله
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F9F7F2] border-t border-[#1D1D1B]/15 flex items-center justify-between text-xs text-[#1D1D1B]/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
            <span className="text-[11px] sm:text-xs">
              قاموس موزع ومعتمد وفق المعايير المحاسبية والمقرر الوزاري للبكالوريا المصرية (10 وحدات و 58 درساً)
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onOpenPrintGlossary && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPrintGlossary();
                }}
                className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#b08b45] text-[#0C1E36] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>عرض وطباعة كتيب المصطلحات الورقي</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1D1D1B] text-[#F9F7F2] font-bold text-xs hover:bg-[#333330] transition cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
