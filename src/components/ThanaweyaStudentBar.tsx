import React, { useState } from 'react';
import { 
  GraduationCap, 
  Flame, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  X, 
  Eye, 
  EyeOff, 
  Clock, 
  Palette,
  TrendingUp,
  Award,
  Type
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThanaweyaStudentBarProps {
  completedExercisesCount?: number;
  totalExercisesCount?: number;
  onOpenQuickTheme?: () => void;
}

export const ThanaweyaStudentBar: React.FC<ThanaweyaStudentBarProps> = ({
  completedExercisesCount = 14,
  totalExercisesCount = 50,
  onOpenQuickTheme
}) => {
  const { theme, setTheme, font, setFont, isModernThanaweya, activeFontOption } = useTheme();
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    try {
      return localStorage.getItem('eb_student_bar_minimized') === 'true';
    } catch {
      return false;
    }
  });

  const toggleMinimized = () => {
    setIsMinimized(prev => {
      const next = !prev;
      try {
        localStorage.setItem('eb_student_bar_minimized', String(next));
      } catch {}
      return next;
    });
  };

  // Only render if in modern-thanaweya mode or if user has toggled
  if (!isModernThanaweya) {
    return null;
  }

  const completionPercent = Math.min(100, Math.round((completedExercisesCount / (totalExercisesCount || 1)) * 100));

  if (isMinimized) {
    return (
      <aside 
        aria-label="شريط تفوق الثانوية العامة المصغر"
        className="no-print bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-4 py-1 text-xs flex items-center justify-between border-b border-blue-600/40 shadow-xs"
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5 text-blue-200" />
          <span className="font-bold text-[11px]">مظهر الثانوية العامة العصري نشط</span>
          <span className="text-blue-200 text-[10px] hidden sm:inline">• هدف الـ 100% في المحاسبة المالية</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme('classic')}
            className="text-[10px] bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded font-bold transition flex items-center gap-1 cursor-pointer"
            title="التحويل للثيم الأكاديمي الكلاسيكي الورقي"
          >
            <span>📜 الثيم الكلاسيكي</span>
          </button>
          <button
            type="button"
            onClick={toggleMinimized}
            className="text-[10px] text-blue-200 hover:text-white flex items-center gap-1 cursor-pointer"
            title="فرد شريط تحفيز الثانوية العامة"
          >
            <Eye className="w-3 h-3" />
            <span>عرض تفاصيل التحفيز</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="شريط التفوق والإنجاز لطلاب الثانوية العامة"
      className="no-print bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-b border-blue-600/30 px-4 py-2.5 shadow-md relative overflow-hidden transition-all duration-300"
    >
      {/* Subtle modern glowing accent backdrop */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-10 w-60 h-20 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 relative z-10">
        {/* Left Side: Thanaweya Student Identity & Motivation */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-sm shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide flex items-center gap-1.5">
                <span>دفعة ثانوية عامة 2027</span>
                <span className="bg-blue-500/30 text-blue-300 border border-blue-400/40 text-[10px] font-bold px-2 py-0.2 rounded-full">
                  طريق الـ 100% 🎯
                </span>
              </span>

              <span className="hidden md:inline text-slate-300 text-xs font-normal">
                «المحاسبة فهم وتطبيق عملي — كل سؤال تتقنه يقربك من حلم كليتك»
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-0.5">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>حماس المذاكرة: 7 أيام متتالية</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>إتقان التدريبات: {completionPercent}%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Theme Switcher & Minimize Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Quick 1-Click Switcher to Classic Theme */}
          <div className="flex items-center bg-white/10 hover:bg-white/15 p-1 rounded-lg border border-white/15 text-xs transition">
            <span className="text-[11px] text-slate-300 px-2 font-medium hidden sm:inline">
              التبديل بين الثيمات:
            </span>
            <button
              type="button"
              onClick={() => setTheme('modern-thanaweya')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                theme === 'modern-thanaweya'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="ثيم الثانوية العامة العصري"
            >
              <span>🎓 عصري</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('classic')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                theme === 'classic'
                  ? 'bg-[#C4A484] text-[#1D1D1B] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="الثيم الأكاديمي الكلاسيكي الورقي"
            >
              <span>📜 كلاسيكي</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('night')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                theme === 'night'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="ثيم المذاكرة الليلية"
            >
              <span>🌙 ليلي</span>
            </button>
          </div>

          {/* Quick Font Selector Pill */}
          <div className="flex items-center bg-white/10 hover:bg-white/15 p-1 rounded-lg border border-white/15 text-xs transition">
            <span className="text-[11px] text-slate-300 px-1.5 font-medium hidden sm:inline">
              الخط:
            </span>
            <button
              type="button"
              onClick={() => {
                const order: ('alexandria' | 'tajawal' | 'readex' | 'almarai' | 'cairo' | 'amiri')[] = [
                  'alexandria', 'tajawal', 'readex', 'almarai', 'cairo', 'amiri'
                ];
                const idx = order.indexOf(font);
                setFont(order[(idx + 1) % order.length]);
              }}
              className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="تبديل خط المنصة (إسكندرية / تجوال / ريدكس / المراعي / القاهرة / أميري)"
            >
              <Type className="w-3 h-3 text-indigo-300" />
              <span>{activeFontOption.nameAr.split(' ')[0]}</span>
            </button>
          </div>

          {/* Minimize / Dismiss Button */}
          <button
            type="button"
            onClick={toggleMinimized}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition cursor-pointer"
            title="تصغير شريط التحفيز"
            aria-label="تصغير شريط التحفيز"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
