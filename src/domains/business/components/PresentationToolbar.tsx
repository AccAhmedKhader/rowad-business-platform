import React from 'react';
import { Maximize2, Minimize2, Tv, ZoomIn } from 'lucide-react';

export type PresentationScale = 'normal' | 'large' | 'xlarge';

interface PresentationToolbarProps {
  title?: string;
  badge?: string;
  isAutoFillPage?: boolean;
  onToggleAutoFillPage?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  presentationScale: PresentationScale;
  onChangeScale: (scale: PresentationScale) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  sidebarToggleLabel?: string;
}

export const PresentationToolbar: React.FC<PresentationToolbarProps> = ({
  title = 'شاشة العرض التفاعلية',
  badge,
  isAutoFillPage,
  onToggleAutoFillPage,
  isFullscreen,
  onToggleFullscreen,
  presentationScale,
  onChangeScale,
  isSidebarCollapsed,
  onToggleSidebar,
  sidebarToggleLabel
}) => {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-bold text-slate-800 font-['Cairo']">{title}:</span>
        <span className="bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-md text-[11px]">
          {badge || (isAutoFillPage ? 'ملء تلقائي للصفحة (100%)' : 'العرض القياسي')}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Toggle Auto Fill Page Width */}
        {onToggleAutoFillPage && (
          <button
            onClick={onToggleAutoFillPage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all border ${
              isAutoFillPage
                ? 'bg-amber-500/15 border-amber-400/60 text-amber-900 hover:bg-amber-500/25'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={isAutoFillPage ? 'العودة للعرض المحصور' : 'ملء تلقائي لكامل مساحة الشاشة'}
          >
            {isAutoFillPage ? <Minimize2 className="w-3.5 h-3.5 text-amber-700" /> : <Maximize2 className="w-3.5 h-3.5 text-slate-700" />}
            <span>{isAutoFillPage ? 'ملء تلقائي 100%' : 'ملء تلقائي للصفحة'}</span>
          </button>
        )}

        {/* Optional Sidebar Toggle Button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all border ${
              isSidebarCollapsed
                ? 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={isSidebarCollapsed ? 'إظهار الفهرس الجانبي' : 'توسيع العرض بنسبة 100%'}
          >
            <span>{sidebarToggleLabel || (isSidebarCollapsed ? 'إظهار الفهرس' : 'توسيع العرض (100%)')}</span>
          </button>
        )}

        {/* Fullscreen Mode Button */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold transition-all shadow-2xs"
            title={isFullscreen ? 'الخروج من ملء الشاشة' : 'شاشة العرض الكاملة (للسبورة الذكية والبروجكتور)'}
          >
            <Tv className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">{isFullscreen ? 'إنهاء ملء الشاشة' : 'ملء الشاشة (سبورة ذكية)'}</span>
          </button>
        )}

        {/* Presentation Font Scale Buttons */}
        <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-[11px] font-bold shadow-2xs">
          <span className="px-2 text-slate-500 hidden md:inline flex items-center gap-1">
            <ZoomIn className="w-3 h-3 text-slate-400" />
            <span>حجم الخط:</span>
          </span>
          <button
            onClick={() => onChangeScale('normal')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              presentationScale === 'normal' ? 'bg-white shadow-xs text-slate-900 font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="حجم خط عادي للمذاكرة الفردية"
          >
            عادي
          </button>
          <button
            onClick={() => onChangeScale('large')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              presentationScale === 'large' ? 'bg-white shadow-xs text-amber-950 font-black ring-1 ring-amber-300' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="شاشة عرض واضحة ومذاكرة مريحة (115% - 120%)"
          >
            شاشة عرض
          </button>
          <button
            onClick={() => onChangeScale('xlarge')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              presentationScale === 'xlarge' ? 'bg-white shadow-xs text-amber-950 font-black ring-1 ring-amber-300' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="قاعة كبيرة وسبورة ذكية (130% - 140%)"
          >
            قاعة كبيرة
          </button>
        </div>
      </div>
    </div>
  );
};
