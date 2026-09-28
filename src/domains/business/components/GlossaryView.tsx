import React, { useState, useMemo, useEffect } from 'react';
import { GLOSSARY_ITEMS } from '../data/glossaryData';
import { GlossaryItem } from '../types';
import { 
  BookA, 
  Search, 
  Filter, 
  Sparkles, 
  Globe, 
  Building2, 
  ExternalLink,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { PresentationToolbar, PresentationScale } from './PresentationToolbar';

interface GlossaryViewProps {
  onAskAi: (term: string, context?: string) => void;
  selectedUnitNumber?: number;
  onSelectUnit?: (unitNumber: number) => void;
  isAutoFillPage?: boolean;
  onToggleAutoFillPage?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  presentationScale?: PresentationScale;
  onChangeScale?: (scale: PresentationScale) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  onAskAi,
  selectedUnitNumber,
  onSelectUnit,
  isAutoFillPage = true,
  onToggleAutoFillPage,
  isFullscreen = false,
  onToggleFullscreen,
  presentationScale = 'large',
  onChangeScale = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<number>(selectedUnitNumber || 0); // 0 = all

  // Synchronize with selectedUnitNumber when changed from navbar
  useEffect(() => {
    if (selectedUnitNumber !== undefined && selectedUnitNumber > 0) {
      setSelectedUnit(selectedUnitNumber);
    }
  }, [selectedUnitNumber]);

  const filteredItems = useMemo(() => {
    return GLOSSARY_ITEMS.filter(item => {
      if (selectedUnit !== 0 && item.unitNumber !== selectedUnit) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesArabic = item.arabic.toLowerCase().includes(query);
        const matchesEnglish = item.english.toLowerCase().includes(query);
        const matchesDef = item.definition.toLowerCase().includes(query);
        if (!matchesArabic && !matchesEnglish && !matchesDef) return false;
      }
      return true;
    });
  }, [searchQuery, selectedUnit]);

  return (
    <div className="space-y-6">
      {/* Presentation Toolbar for Whiteboards and Screens */}
      <PresentationToolbar
        title="شاشة عرض المعجم الوزاري والمصطلحات"
        badge={isAutoFillPage ? 'ملء تلقائي للصفحة (100%)' : 'العرض القياسي'}
        isAutoFillPage={isAutoFillPage}
        onToggleAutoFillPage={onToggleAutoFillPage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        presentationScale={presentationScale}
        onChangeScale={onChangeScale}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-pink-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-rose-500/20 text-rose-300 font-bold px-3 py-1 rounded-full text-xs border border-rose-400/30 flex items-center gap-1.5">
                <BookA className="w-3.5 h-3.5" />
                المعجم الوزاري ثنائي اللغة
              </span>
              <span className="bg-amber-400/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs border border-amber-400/30">
                عربي • English
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-['Cairo'] tracking-tight">
              قاموس مصطلحات إدارة الأعمال (الوحدات 1 - 10)
            </h1>
            <p className="text-rose-200 text-sm mt-1 max-w-2xl leading-relaxed">
              مرجع شامل لكافة المصطلحات والمفاهيم الإدارية والاقتصادية الواردة في المنهج المعتمد مع التعريفات الرسمية وأمثلة واقعية من السوق المصري.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-rose-700/50 rounded-2xl p-4 text-center shrink-0 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block font-medium">إجمالي المصطلحات</span>
            <span className="text-2xl font-black text-rose-400">{GLOSSARY_ITEMS.length}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">مصطلح معتمد</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث بالاسم العربي أو الإنجليزي أو نص التعريف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-10 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 text-slate-800"
          />
        </div>

        <select
          value={selectedUnit}
          onChange={(e) => {
            const val = Number(e.target.value);
            setSelectedUnit(val);
            if (val > 0 && onSelectUnit) {
              onSelectUnit(val);
            }
          }}
          className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-rose-500 cursor-pointer"
        >
          <option value={0}>جميع الوحدات العشر</option>
          <option value={1}>الوحدة 1: مدخل إلى الأعمال وغايتها</option>
          <option value={2}>الوحدة 2: أنواع منظمات الأعمال</option>
          <option value={3}>الوحدة 3: أهداف المنظمات وأصحاب المصلحة</option>
          <option value={4}>الوحدة 4: البيئة الداخلية والخارجية</option>
          <option value={5}>الوحدة 5: الإدارة والقيادة</option>
          <option value={6}>الوحدة 6: التسويق</option>
          <option value={7}>الوحدة 7: إدارة العمليات والإنتاج</option>
          <option value={8}>الوحدة 8: إدارة الموارد البشرية</option>
          <option value={9}>الوحدة 9: التمويل وأداء الأعمال</option>
          <option value={10}>الوحدة 10: الاستراتيجية وصنع القرار</option>
        </select>
      </div>

      {/* Grid of Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-black bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                  الوحدة {item.unitNumber}
                </span>
                <span className="text-[11px] text-slate-400 font-mono" dir="ltr">
                  {item.english}
                </span>
              </div>

              <h3 className={`font-black text-slate-900 ${
                presentationScale === 'xlarge' ? 'text-lg sm:text-xl' : presentationScale === 'large' ? 'text-base sm:text-lg' : 'text-base'
              }`}>
                {item.arabic}
              </h3>

              <p className={`text-slate-700 leading-relaxed mt-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100 ${
                presentationScale === 'xlarge' ? 'text-base leading-[1.8]' : presentationScale === 'large' ? 'text-sm leading-[1.75]' : 'text-xs'
              }`}>
                {item.definition}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className={`text-emerald-900 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200/60 leading-relaxed ${
                presentationScale === 'xlarge' ? 'text-sm' : 'text-[11px]'
              }`}>
                <strong className="text-emerald-800 block mb-0.5 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  مثال تطبيقي من السوق:
                </strong>
                {item.realWorldExample}
              </div>

              <button
                onClick={() => onAskAi(`اشرح لي بالتفصيل مفهوم (${item.arabic} - ${item.english}) وكيف يأتي في امتحان البكالوريا؟`, item.definition)}
                className="w-full text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>شرح مفصل بالمستشار الذكي</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
