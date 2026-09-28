import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'modern-thanaweya' | 'classic' | 'night';

export type FontMode = 'alexandria' | 'tajawal' | 'readex' | 'almarai' | 'cairo' | 'amiri';

export interface ThemeOption {
  id: ThemeMode;
  nameAr: string;
  taglineAr: string;
  descriptionAr: string;
  icon: string;
  previewColors: {
    primary: string;
    background: string;
    accent: string;
    card: string;
  };
}

export interface FontOption {
  id: FontMode;
  nameAr: string;
  fontFamily: string;
  descriptionAr: string;
  sampleText: string;
  category: 'عصري' | 'تفاعلي' | 'أكاديمي' | 'تراثي';
}

export const THEME_OPTIONS: Record<ThemeMode, ThemeOption> = {
  'modern-thanaweya': {
    id: 'modern-thanaweya',
    nameAr: 'ثيم الثانوية العامة العصري',
    taglineAr: 'تصميم تفاعلي ملون وممتع لمذاكرة دفعة 2027',
    descriptionAr: 'ألوان حيوية متعددة محفزة للدماغ (أزرق نيلي للفهم، زمردي للتطبيق، بنفسجي للتحليل، عنبري للتفوق)، مع بطاقات عصرية وشارات ملونة تسهل الحفظ والاستيعاب.',
    icon: '🎓',
    previewColors: {
      primary: '#1E40AF',
      background: '#F8FAFC',
      accent: '#2563EB',
      card: '#FFFFFF'
    }
  },
  'classic': {
    id: 'classic',
    nameAr: 'الثيم الأكاديمي الكلاسيكي',
    taglineAr: 'طابع الكتاب الخارجي والورق التراثي الأصيل',
    descriptionAr: 'الألوان الأصلية للمنصة المستوحاة من ورق الكتب المدرسية التراثية (#F9F7F2) والخط الأميري الكلاسيكي لطباعة وتصفح المناهج بالطابع التقليدي الهادئ.',
    icon: '📜',
    previewColors: {
      primary: '#1D1D1B',
      background: '#F9F7F2',
      accent: '#C4A484',
      card: '#FFFFFF'
    }
  },
  'night': {
    id: 'night',
    nameAr: 'ثيم المذاكرة الليلية',
    taglineAr: 'هدوء وتركيز فائق لليالي الامتحانات',
    descriptionAr: 'واجهة داكنة مريحة للعينين لجلسات المذاكرة وحل بنك الأسئلة ليلاً مع إبراز نقاط الضعف والمراجعات المركزة.',
    icon: '🌙',
    previewColors: {
      primary: '#3B82F6',
      background: '#0B0F19',
      accent: '#60A5FA',
      card: '#1E293B'
    }
  }
};

export const FONT_OPTIONS: Record<FontMode, FontOption> = {
  'alexandria': {
    id: 'alexandria',
    nameAr: 'خط الإسكندرية (Alexandria)',
    fontFamily: "'Alexandria', system-ui, sans-serif",
    descriptionAr: 'خط عصري قوي وجذاب جداً للعناوين والمفاهيم البارزة، يعطي طاقة وحيوية شبابية للمذاكرة.',
    sampleText: 'المحاسبة المالية إتقان وتفوق',
    category: 'عصري'
  },
  'tajawal': {
    id: 'tajawal',
    nameAr: 'خط تجوال (Tajawal)',
    fontFamily: "'Tajawal', system-ui, sans-serif",
    descriptionAr: 'خط هندسي ناعم ومريح جداً للعين أثناء القراءة الطويلة والحل المكثف للتمارين.',
    sampleText: 'خطوات الحل المتسلسلة بوضوح',
    category: 'تفاعلي'
  },
  'readex': {
    id: 'readex',
    nameAr: 'خط ريدكس برو (Readex Pro)',
    fontFamily: "'Readex Pro', system-ui, sans-serif",
    descriptionAr: 'خط تقني حديث للأرقام والشارات والمصطلحات الدقيقة بنقاء فائق.',
    sampleText: 'نسبة الإنجاز 100% في الامتحان',
    category: 'عصري'
  },
  'almarai': {
    id: 'almarai',
    nameAr: 'خط المراعي (Almarai)',
    fontFamily: "'Almarai', system-ui, sans-serif",
    descriptionAr: 'خط عربي معاصر متوازن وواضح يعشقه الطلاب لقراءة الشروحات السريعة.',
    sampleText: 'فهم العمليات المالية وقيود اليومية',
    category: 'أكاديمي'
  },
  'cairo': {
    id: 'cairo',
    nameAr: 'خط القاهرة (Cairo)',
    fontFamily: "'Cairo', system-ui, sans-serif",
    descriptionAr: 'الخط القياسي المعتمد في التطبيقات والمنصات التعليمية الرسمية.',
    sampleText: 'دفتر الأستاذ وميزان المراجعة بالمجاميع',
    category: 'أكاديمي'
  },
  'amiri': {
    id: 'amiri',
    nameAr: 'خط أميري الكلاسيكي (Amiri)',
    fontFamily: "'Amiri', Georgia, serif",
    descriptionAr: 'خط نسخ عربي رصين ومميز للقواعد الفقهية والمحاسبية والمصادر الوزارية.',
    sampleText: 'المبدأ المحاسبي الحاكم للقيد المزدوج',
    category: 'تراثي'
  }
};

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  font: FontMode;
  setFont: (font: FontMode) => void;
  isModernThanaweya: boolean;
  isClassic: boolean;
  isNight: boolean;
  activeThemeOption: ThemeOption;
  activeFontOption: FontOption;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'modern-thanaweya',
  setTheme: () => {},
  toggleTheme: () => {},
  font: 'alexandria',
  setFont: () => {},
  isModernThanaweya: true,
  isClassic: false,
  isNight: false,
  activeThemeOption: THEME_OPTIONS['modern-thanaweya'],
  activeFontOption: FONT_OPTIONS['alexandria']
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('eb_platform_theme') as ThemeMode;
      if (saved && (saved === 'modern-thanaweya' || saved === 'classic' || saved === 'night')) {
        return saved;
      }
      return 'modern-thanaweya';
    } catch {
      return 'modern-thanaweya';
    }
  });

  const [font, setFontState] = useState<FontMode>(() => {
    try {
      const saved = localStorage.getItem('eb_platform_font') as FontMode;
      if (saved && FONT_OPTIONS[saved]) {
        return saved;
      }
      return 'alexandria';
    } catch {
      return 'alexandria';
    }
  });

  // Apply theme & font to document root and body
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      root.setAttribute('data-font', font);
      
      // Update body classes for styling hook
      document.body.classList.remove('theme-modern-thanaweya', 'theme-classic', 'theme-night');
      document.body.classList.add(`theme-${theme}`);

      document.body.classList.remove(
        'font-preset-alexandria', 
        'font-preset-tajawal', 
        'font-preset-readex', 
        'font-preset-almarai', 
        'font-preset-cairo', 
        'font-preset-amiri'
      );
      document.body.classList.add(`font-preset-${font}`);

      localStorage.setItem('eb_platform_theme', theme);
      localStorage.setItem('eb_platform_font', font);
    } catch (e) {
      console.error('Failed to set theme attributes', e);
    }
  }, [theme, font]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setFont = (newFont: FontMode) => {
    setFontState(newFont);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'modern-thanaweya') return 'classic';
      if (prev === 'classic') return 'night';
      return 'modern-thanaweya';
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        font,
        setFont,
        isModernThanaweya: theme === 'modern-thanaweya',
        isClassic: theme === 'classic',
        isNight: theme === 'night',
        activeThemeOption: THEME_OPTIONS[theme],
        activeFontOption: FONT_OPTIONS[font]
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  return context || defaultThemeContext;
};
