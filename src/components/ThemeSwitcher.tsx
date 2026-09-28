import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, Moon, BookOpen, GraduationCap, X, ChevronDown, Type } from 'lucide-react';
import { useTheme, THEME_OPTIONS, FONT_OPTIONS, ThemeMode, FontMode } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  variant?: 'compact' | 'badge' | 'full';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ variant = 'badge', className = '' }) => {
  const { theme, setTheme, font, setFont, activeThemeOption, activeFontOption } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectTheme = (mode: ThemeMode) => {
    setTheme(mode);
  };

  const handleSelectFont = (fMode: FontMode) => {
    setFont(fMode);
  };

  // Compact Variant: Single icon button
  if (variant === 'compact') {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title={`تخصيص المظهر والخط: ${activeThemeOption.nameAr} • ${activeFontOption.nameAr}`}
          className="p-1.5 rounded-lg border border-current/20 hover:bg-current/10 transition-colors flex items-center justify-center cursor-pointer"
          aria-expanded={isOpen}
          aria-label="تغيير ثيم وخط المنصة"
        >
          {theme === 'modern-thanaweya' && <GraduationCap className="w-4 h-4 text-blue-500" />}
          {theme === 'classic' && <BookOpen className="w-4 h-4 text-[#C4A484]" />}
          {theme === 'night' && <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {isOpen && (
          <ThemeDropdownMenu
            theme={theme}
            font={font}
            onSelectTheme={handleSelectTheme}
            onSelectFont={handleSelectFont}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  // Badge Variant: In Header Masthead or Main Nav
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer shadow-xs border border-white/20 bg-white/10 hover:bg-white/20 text-inherit"
        title="تخصيص ثيم وألوان وخطوط المذاكرة"
        aria-expanded={isOpen}
      >
        <Palette className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <span className="flex items-center gap-1">
          <span className="hidden sm:inline">المظهر:</span>
          <span>{activeThemeOption.nameAr}</span>
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ThemeDropdownMenu
          theme={theme}
          font={font}
          onSelectTheme={handleSelectTheme}
          onSelectFont={handleSelectFont}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

interface ThemeDropdownMenuProps {
  theme: ThemeMode;
  font: FontMode;
  onSelectTheme: (mode: ThemeMode) => void;
  onSelectFont: (fMode: FontMode) => void;
  onClose: () => void;
}

const ThemeDropdownMenu: React.FC<ThemeDropdownMenuProps> = ({ 
  theme, 
  font, 
  onSelectTheme, 
  onSelectFont, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'fonts'>('themes');

  return (
    <div 
      className="absolute left-0 mt-2 w-80 sm:w-[420px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800 dark:text-slate-100 max-h-[85vh] overflow-y-auto"
      style={{ minWidth: '19rem' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              استوديو المظهر والخطوط
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              تخصيص بيئة المذاكرة لتكون ممتعة وأكثر تشويقاً
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Switcher: Themes vs Fonts */}
      <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('themes')}
          className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'themes'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>ثيمات الألوان الممتعة</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('fonts')}
          className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'fonts'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>تنوع الخطوط العربية</span>
        </button>
      </div>

      {/* Tab Content: Themes */}
      {activeTab === 'themes' && (
        <div className="space-y-2.5">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-1">
            اختر الثيم المفضل لمرحلتك: ثيم الثانوية العامة العصري يمنحك تنوعاً لونياً مبهجاً للمستويات المعرفية.
          </p>

          {(Object.keys(THEME_OPTIONS) as ThemeMode[]).map((key) => {
            const opt = THEME_OPTIONS[key];
            const isSelected = theme === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectTheme(key)}
                className={`w-full text-right p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 dark:border-blue-500 shadow-xs ring-2 ring-blue-600/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 shadow-xs mt-0.5"
                  style={{
                    backgroundColor: opt.previewColors.background,
                    border: `2px solid ${opt.previewColors.primary}`
                  }}
                >
                  <span>{opt.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {opt.nameAr}
                      </span>
                      {key === 'modern-thanaweya' && (
                        <span className="text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-2 py-0.5 rounded-full shadow-2xs">
                          موصى به لـ 2027
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>مفعل</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                    {opt.taglineAr}
                  </p>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {opt.descriptionAr}
                  </p>

                  {/* Visual swatches */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[9px] text-slate-400">لوحة الألوان:</span>
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: opt.previewColors.primary }}
                      title="اللون الرئيسي"
                    />
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: opt.previewColors.accent }}
                      title="لون التمييز"
                    />
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: opt.previewColors.background }}
                      title="الخلفية"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Tab Content: Fonts */}
      {activeTab === 'fonts' && (
        <div className="space-y-2">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
            نوّع خط القراءة والشرح ليناسب راحتك البصرية ويجعل التصفح ممتعاً وغير مُمِل:
          </p>

          {(Object.keys(FONT_OPTIONS) as FontMode[]).map((fKey) => {
            const fOpt = FONT_OPTIONS[fKey];
            const isSelected = font === fKey;

            return (
              <button
                key={fKey}
                type="button"
                onClick={() => onSelectFont(fKey)}
                className={`w-full text-right p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-xs ring-2 ring-indigo-600/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="font-extrabold text-sm text-slate-900 dark:text-white"
                      style={{ fontFamily: fOpt.fontFamily }}
                    >
                      {fOpt.nameAr}
                    </span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-1.5 py-0.2 rounded-md">
                      {fOpt.category}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1.5">
                    {fOpt.descriptionAr}
                  </p>

                  <div 
                    className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    style={{ fontFamily: fOpt.fontFamily }}
                  >
                    «{fOpt.sampleText}»
                  </div>
                </div>

                {isSelected && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Check className="w-4 h-4" />
                    <span>محدد</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-center text-slate-400">
        يتم حفظ اختياراتك للثيم والخط تلقائياً لجميع الجلسات القادمة 🎯
      </div>
    </div>
  );
};
