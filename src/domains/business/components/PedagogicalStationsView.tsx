import React, { useState, useEffect } from 'react';
import { UnitLesson, PedagogicalStations, UnitData } from '../types';
import { 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Search, 
  Lightbulb, 
  Calculator, 
  Rocket, 
  Settings, 
  Leaf, 
  Network, 
  BarChart3, 
  AlertTriangle, 
  FileSpreadsheet, 
  Zap, 
  Dumbbell, 
  Scale, 
  RefreshCw, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  BookMarked, 
  LayoutList, 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff,
  Layers,
  Award,
  Briefcase,
  Check,
  TrendingUp,
  Brain,
  Target,
  GraduationCap,
  Printer,
  Copy
} from 'lucide-react';
import { InteractiveDiagram } from './InteractiveDiagrams';
import { useUser } from '../context/UserContext';
import { UNIT1_LESSON1_TEACHER_STATIONS_GUIDE, getTeacherStationsGuideForLesson } from '../data/teacherStationsGuide';
import { printDocumentAsPdf } from '../utils/exportEngine';

interface PedagogicalStationsViewProps {
  lesson: UnitLesson;
  unit: UnitData;
  onOpenJreModal?: (unit: UnitData) => void;
  presentationScale?: 'normal' | 'large' | 'xlarge';
}

/**
 * تعريف المراحل الخمس المنهجية المطورة (The 5 Pedagogical Stages)
 */
export interface PedagogicalStageMeta {
  id: number;
  name: string;
  englishName: string;
  bloom: string;
  verb: string;
  educationalGoal: string;
  theme: {
    bgLight: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    activeTab: string;
    accent: string;
    nodeBg: string;
    gradient: string;
  };
  stationIds: number[];
}

export const PEDAGOGICAL_STAGES: PedagogicalStageMeta[] = [
  {
    id: 1,
    name: 'اليقظة الريادية والاستكشاف السياقي',
    englishName: 'Entrepreneurial Vigilance',
    bloom: 'تذكر وفهم (بلوم 1 و 2)',
    verb: 'لاحظ • تساءل',
    educationalGoal: 'تحفيز الملاحظة عبر ربط عقل الطالب بظواهر ومواقف حقيقية من بيئة الأعمال المصرية.',
    theme: {
      bgLight: 'bg-amber-50/90',
      border: 'border-amber-300',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-950',
      activeTab: 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400',
      accent: 'amber',
      nodeBg: 'bg-amber-50 border-amber-300 text-amber-900',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
    },
    stationIds: [1, 2]
  },
  {
    id: 2,
    name: 'البناء المفاهيمي والهندسة المعرفية',
    englishName: 'Analytical Grounding',
    bloom: 'فهم وتطبيق (بلوم 2 و 3)',
    verb: 'استقصِ • فصّل',
    educationalGoal: 'تفكيك الأطر العلمية وتأصيل المكون المعجمي والرياضي الصارم لمنظمات الأعمال.',
    theme: {
      bgLight: 'bg-emerald-50/90',
      border: 'border-emerald-300',
      text: 'text-emerald-950',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-950',
      activeTab: 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400',
      accent: 'emerald',
      nodeBg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
    },
    stationIds: [3, 4, 5, 6]
  },
  {
    id: 3,
    name: 'المحاكاة الاستراتيجية والممارسة التنفيذية',
    englishName: 'Strategic Simulation',
    bloom: 'تحليل وتقييم (بلوم 4 و 5)',
    verb: 'طبّق • وازن',
    educationalGoal: 'التموضع في أدوار صناع القرار، والتحول من رصد البيانات إلى التخطيط والموازنة التنافسية الأخلاقية.',
    theme: {
      bgLight: 'bg-blue-50/90',
      border: 'border-blue-300',
      text: 'text-blue-950',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-950',
      activeTab: 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400',
      accent: 'blue',
      nodeBg: 'bg-blue-50 border-blue-300 text-blue-900',
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
    },
    stationIds: [7, 8, 9, 10]
  },
  {
    id: 4,
    name: 'ضبط النزاهة المعرفية وتصحيح المسار',
    englishName: 'Validation & Remediation',
    bloom: 'تحليل ونقد الأخطاء (بلوم 4)',
    verb: 'استقصِ الأدلة • صحح الفخاخ',
    educationalGoal: 'فرز البيانات ومراجعة الفجوات الإدارية الشائعة لضمان دقة وصحة التفكير الاقتصادي.',
    theme: {
      bgLight: 'bg-rose-50/90',
      border: 'border-rose-300',
      text: 'text-rose-950',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-950',
      activeTab: 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400',
      accent: 'rose',
      nodeBg: 'bg-rose-50 border-rose-300 text-rose-900',
      gradient: 'from-rose-500/20 via-pink-500/10 to-transparent'
    },
    stationIds: [11, 12, 13]
  },
  {
    id: 5,
    name: 'التمكين والإتقان وحوكمة الاستدلال',
    englishName: 'Mastery & JRE Capstone',
    bloom: 'التقييم وإصدار الأحكام المبررة (بلوم 5 و 6)',
    verb: 'حكّم ووازِن',
    educationalGoal: 'قياس الكفاءة التدريبية المتدرجة والوصول للتتويج التقييمي النهائي لنظام البكالوريا.',
    theme: {
      bgLight: 'bg-purple-50/90',
      border: 'border-purple-300',
      text: 'text-purple-950',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-950',
      activeTab: 'bg-purple-700 text-white shadow-md ring-2 ring-purple-400',
      accent: 'purple',
      nodeBg: 'bg-purple-50 border-purple-300 text-purple-900',
      gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent'
    },
    stationIds: [14, 15, 16, 17]
  }
];

/**
 * المحطات الـ 17 المعتمدة كاملة مع عناوينها ومسمياتها المنهجية
 */
export const STATION_NAMES = [
  // المرحلة 1
  { 
    id: 1, 
    stageId: 1, 
    name: 'سؤال توجيهي واستثارة فكرية', 
    short: '1. سؤال واستثارة', 
    englishName: 'Guiding Question & Cognitive Trigger', 
    icon: HelpCircle, 
    badge: 'استثارة فكرية',
    color: 'text-amber-700 bg-amber-50 border-amber-300' 
  },
  { 
    id: 2, 
    stageId: 1, 
    name: 'مقدمة وسيناريو دراسة الحالة', 
    short: '2. سيناريو الحالة', 
    englishName: 'Case Scenario & Context', 
    icon: Sparkles, 
    badge: 'سياق واقعي',
    color: 'text-orange-700 bg-orange-50 border-orange-300' 
  },

  // المرحلة 2
  { 
    id: 3, 
    stageId: 2, 
    name: 'تعلّم وتأصيل المتن المعرفي', 
    short: '3. تأصيل المتن', 
    englishName: 'Core Conceptualization', 
    icon: BookOpen, 
    badge: 'أطر وقوانين',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-300' 
  },
  { 
    id: 4, 
    stageId: 2, 
    name: 'الاستكشاف وتحليل الأنماط التنافسية', 
    short: '4. تحليل الأنماط', 
    englishName: 'Market Patterns & Exploration', 
    icon: Search, 
    badge: 'سلوك السوق',
    color: 'text-teal-700 bg-teal-50 border-teal-300' 
  },
  { 
    id: 5, 
    stageId: 2, 
    name: 'مثال ونموذج استرشادي مبرر', 
    short: '5. نموذج استرشادي', 
    englishName: 'Justified Exemplar Model', 
    icon: Lightbulb, 
    badge: 'حالة محلولة',
    color: 'text-green-700 bg-green-50 border-green-300' 
  },
  { 
    id: 6, 
    stageId: 2, 
    name: 'الشرح والعمليات الحسابية والتشغيلية', 
    short: '6. عمليات وحسابات', 
    englishName: 'Operational & Financial Logic', 
    icon: Calculator, 
    badge: 'حسابات وتكاليف',
    color: 'text-cyan-700 bg-cyan-50 border-cyan-300' 
  },

  // المرحلة 3
  { 
    id: 7, 
    stageId: 3, 
    name: 'فكّر كرائد أعمال (The Innovator’s Vision)', 
    short: '7. فكّر كرائد أعمال', 
    englishName: 'The Innovator’s Vision', 
    icon: Rocket, 
    badge: 'اقتناص الفرص',
    color: 'text-blue-700 bg-blue-50 border-blue-300' 
  },
  { 
    id: 8, 
    stageId: 3, 
    name: 'فكّر كمدير (The Executive Alignment)', 
    short: '8. فكّر كمدير', 
    englishName: 'The Executive Alignment', 
    icon: Settings, 
    badge: 'حوكمة ورقابة',
    color: 'text-indigo-700 bg-indigo-50 border-indigo-300' 
  },
  { 
    id: 9, 
    stageId: 3, 
    name: 'تطبيق حياتي واستدامة الأعمال', 
    short: '9. استدامة و CSR', 
    englishName: 'CSR & Sustainability', 
    icon: Leaf, 
    badge: 'مسؤولية مجتمعية',
    color: 'text-emerald-800 bg-emerald-50 border-emerald-300' 
  },
  { 
    id: 10, 
    stageId: 3, 
    name: 'بنية المعرفة والهياكل الاستراتيجية', 
    short: '10. هياكل استراتيجية', 
    englishName: 'Strategic Frameworks', 
    icon: Network, 
    badge: 'PESTEL / SWOT',
    color: 'text-slate-800 bg-slate-100 border-slate-300' 
  },

  // المرحلة 4
  { 
    id: 11, 
    stageId: 4, 
    name: 'طبيعة المعرفة الاقتصادية وبحوث السوق', 
    short: '11. بحوث السوق', 
    englishName: 'Market Research & Empirical Data', 
    icon: BarChart3, 
    badge: 'أدلة إحصائية',
    color: 'text-sky-700 bg-sky-50 border-sky-300' 
  },
  { 
    id: 12, 
    stageId: 4, 
    name: 'التصورات الخطأ والفخاخ الإدارية', 
    short: '12. فخاخ وتصورات خاطئة', 
    englishName: 'Misconceptions & Pitfalls', 
    icon: AlertTriangle, 
    badge: 'تفكيك الفخاخ',
    color: 'text-rose-700 bg-rose-50 border-rose-300' 
  },
  { 
    id: 13, 
    stageId: 4, 
    name: 'المعادلات والمفاهيم في لمحة', 
    short: '13. معادلات في لمحة', 
    englishName: 'Formulas & Quick Summary', 
    icon: FileSpreadsheet, 
    badge: 'نافذة مرجعية',
    color: 'text-amber-800 bg-amber-50 border-amber-300' 
  },

  // المرحلة 5
  { 
    id: 14, 
    stageId: 5, 
    name: 'حاول بنفسك وتمارين موجهة', 
    short: '14. حاول بنفسك', 
    englishName: 'Guided Practice & Challenge', 
    icon: Zap, 
    badge: 'تحدي فوري',
    color: 'text-amber-700 bg-amber-50 border-amber-300' 
  },
  { 
    id: 15, 
    stageId: 5, 
    name: 'تدريب وتقييمات متدرجة الصعوبة (أ، ب، ج)', 
    short: '15. تقييمات وزارية (أ، ب، ج)', 
    englishName: 'Tiered Ministry Assessments', 
    icon: Dumbbell, 
    badge: 'نماذج وزارية',
    color: 'text-green-800 bg-green-50 border-green-300' 
  },
  { 
    id: 16, 
    stageId: 5, 
    name: 'تحدّ تفكيرك (مختبر الحكم والاستدلال JRE)', 
    short: '16. مختبر JRE الاستدلالي', 
    englishName: 'Reasoning & Judgment Lab', 
    icon: Scale, 
    badge: 'سلم الـ 20 درجة',
    color: 'text-fuchsia-800 bg-fuchsia-50 border-fuchsia-300' 
  },
  { 
    id: 17, 
    stageId: 5, 
    name: 'فكّر وتأمل والمراجعة المستدامة', 
    short: '17. تأمل ومراجعة', 
    englishName: 'Metacognition & Cumulative Review', 
    icon: RefreshCw, 
    badge: 'تثبيت مستدام',
    color: 'text-violet-800 bg-violet-50 border-violet-300' 
  }
];

export const PedagogicalStationsView: React.FC<PedagogicalStationsViewProps> = ({
  lesson,
  unit,
  onOpenJreModal,
  presentationScale = 'normal'
}) => {
  // Main view mode:
  // 'stages' (5 tabs with interactive step nodes - Recommended UI/UX)
  // 'unified' (continuous cohesive textbook flow)
  // 'modular' (collapsible accordion cards grouped by stages)
  const [viewMode, setViewMode] = useState<'stages' | 'unified' | 'modular'>('stages');

  // Currently active stage (1 to 5)
  const [activeStageId, setActiveStageId] = useState<number>(1);

  // Currently active station inside stage (1 to 17)
  const [activeStationId, setActiveStationId] = useState<number>(1);

  // Tracking completed stations to enforce and gamify pedagogical governance
  const [completedStations, setCompletedStations] = useState<Record<number, boolean>>({});

  // Mode: Guided flow (sequential unlock) vs Free explore
  const [isStrictSequence, setIsStrictSequence] = useState<boolean>(false);

  // Accordion state for modular mode
  const [expandedStations, setExpandedStations] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    for (let i = 1; i <= 17; i++) initial[i] = true;
    return initial;
  });

  // Revealable state for interactive exercises
  const [revealedTryAnswers, setRevealedTryAnswers] = useState<Record<number, boolean>>({});
  const [revealedStepNotes, setRevealedStepNotes] = useState<Record<number, boolean>>({});

  // Keep activeStageId in sync when activeStationId changes
  useEffect(() => {
    const stn = STATION_NAMES.find(s => s.id === activeStationId);
    if (stn && stn.stageId !== activeStageId) {
      setActiveStageId(stn.stageId);
    }
  }, [activeStationId]);

  const activeStage = PEDAGOGICAL_STAGES.find(s => s.id === activeStageId) || PEDAGOGICAL_STAGES[0];
  const activeStation = STATION_NAMES.find(s => s.id === activeStationId) || STATION_NAMES[0];

  const toggleExpand = (stationId: number) => {
    setExpandedStations(prev => ({ ...prev, [stationId]: !prev[stationId] }));
  };

  const expandAllStations = () => {
    const allOpen: Record<number, boolean> = {};
    for (let i = 1; i <= 17; i++) allOpen[i] = true;
    setExpandedStations(allOpen);
  };

  const collapseAllStations = () => {
    const allClosed: Record<number, boolean> = {};
    for (let i = 1; i <= 17; i++) allClosed[i] = false;
    setExpandedStations(allClosed);
  };

  const toggleTryAnswer = (stationId: number) => {
    setRevealedTryAnswers(prev => ({ ...prev, [stationId]: !prev[stationId] }));
  };

  const markStationComplete = (stationId: number) => {
    setCompletedStations(prev => ({ ...prev, [stationId]: true }));
    // Automatically advance to the next station
    if (stationId < 17) {
      setActiveStationId(stationId + 1);
      const nextStn = STATION_NAMES.find(s => s.id === stationId + 1);
      if (nextStn) {
        setActiveStageId(nextStn.stageId);
      }
    }
  };

  const scrollToStation = (stationId: number) => {
    setActiveStationId(stationId);
    const targetStn = STATION_NAMES.find(s => s.id === stationId);
    if (targetStn) {
      setActiveStageId(targetStn.stageId);
    }
    if (viewMode === 'modular') {
      setExpandedStations(prev => ({ ...prev, [stationId]: true }));
    }
    const element = document.getElementById(`station-${stationId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Typography Scaling Classes based on Presentation/Study Mode
  const fontStyles = {
    bodyText: 
      presentationScale === 'xlarge'
        ? 'text-xl sm:text-2xl leading-[2.1] text-slate-800 font-normal'
        : presentationScale === 'large'
        ? 'text-lg sm:text-xl leading-[2.0] text-slate-800 font-normal'
        : 'text-base sm:text-lg leading-[1.85] text-slate-800 font-normal',
    bodyLead:
      presentationScale === 'xlarge'
        ? 'text-2xl sm:text-3xl leading-snug font-black text-slate-950 font-[\'Cairo\']'
        : presentationScale === 'large'
        ? 'text-xl sm:text-2xl leading-snug font-black text-slate-950 font-[\'Cairo\']'
        : 'text-lg sm:text-xl leading-snug font-black text-slate-950 font-[\'Cairo\']',
    stationHeading:
      presentationScale === 'xlarge'
        ? 'text-2xl sm:text-3xl font-black text-slate-950 font-[\'Cairo\']'
        : presentationScale === 'large'
        ? 'text-xl sm:text-2xl font-black text-slate-950 font-[\'Cairo\']'
        : 'text-lg sm:text-xl font-black text-slate-950 font-[\'Cairo\']',
    subTitle:
      presentationScale === 'xlarge'
        ? 'text-lg sm:text-xl font-bold font-[\'Cairo\']'
        : presentationScale === 'large'
        ? 'text-base sm:text-lg font-bold font-[\'Cairo\']'
        : 'text-sm sm:text-base font-bold font-[\'Cairo\']',
  };

  // Resolve station content gracefully
  const st: PedagogicalStations = lesson.stations || {};
  const firstConcept = lesson.concepts[0];
  const bmBox = firstConcept?.businessManagerBox || st.thinkAsManager;

  // Role and Teacher Assistant Integration
  const { user, switchRole } = useUser();
  const isTeacher = user.role === 'teacher';

  const teacherGuideList = lesson.teacherStationsGuide || getTeacherStationsGuideForLesson(lesson.id, lesson.lessonNumber, unit.number) || (lesson.id === 'u1-l1' || (unit.number === 1 && lesson.lessonNumber === 1) ? UNIT1_LESSON1_TEACHER_STATIONS_GUIDE : undefined);

  // For teacher mode: expanded status for each station guidance card
  const [expandedTeacherGuides, setExpandedTeacherGuides] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    for (let i = 1; i <= 17; i++) init[i] = true;
    return init;
  });
  const [showAllTeacherGuides, setShowAllTeacherGuides] = useState<boolean>(true);
  const [copiedStationId, setCopiedStationId] = useState<number | null>(null);

  const handlePrintTeacherGuide = () => {
    const list = teacherGuideList || getTeacherStationsGuideForLesson(lesson.id, lesson.lessonNumber, unit.number) || UNIT1_LESSON1_TEACHER_STATIONS_GUIDE;
    const contentHtml = `
      <div style="font-family: 'Cairo', sans-serif;">
        <div style="background: #eef2ff; border: 1.5pt solid #c7d2fe; border-right: 6pt solid #4338ca; border-radius: 8pt; padding: 14pt 18pt; margin-bottom: 18pt;">
          <h1 style="color: #312e81; margin: 0 0 6pt 0; font-size: 18pt; font-weight: 900;">
            👨‍🏫 دليل المعلم ومساعد التعلم البيداغوجي للمحطات الـ 17
          </h1>
          <div style="font-size: 12pt; color: #4338ca; font-weight: bold; margin-bottom: 4pt;">
            النموذج التطبيقي الرائد: ${unit.title} — ${lesson.title}
          </div>
          <p style="margin: 0; font-size: 10.5pt; color: #3730a3; line-height: 1.7; text-align: justify;">
            دليل إرشادي استدلالي حصري للمعلم يتضمن إجابات نموذجية لتساؤلات محطات الدرس الـ 17، وتوجيهات بيداغوجية لإدارة الحوار الصفي، وتصويب المفاهيم المغلوطة وفق مصفوفة نواتج التعلم لنظام البكالوريا 2027.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14pt;">
          ${list.map(guide => `
            <div style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 12pt 16pt; background: #ffffff; page-break-inside: avoid; margin-bottom: 12pt;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1pt solid #e2e8f0; padding-bottom: 6pt; margin-bottom: 8pt;">
                <span style="font-weight: 900; color: #1e3a8a; font-size: 12pt;">
                  المحطة ${guide.stationNumber}: ${guide.stationName}
                </span>
                <span style="font-size: 9pt; background: #f1f5f9; color: #475569; padding: 2pt 6pt; border-radius: 4pt; font-weight: bold;">
                  ${guide.pedagogicalObjective}
                </span>
              </div>

              <div style="background: #f8fafc; border-right: 3.5pt solid #64748b; padding: 6pt 10pt; border-radius: 4pt; margin-bottom: 8pt;">
                <strong style="color: #0f172a; font-size: 10pt;">❓ التساؤل الصفي المطروح:</strong>
                <p style="margin: 3pt 0 0 0; font-size: 10.5pt; color: #1e293b; font-weight: bold;">« ${guide.inquiry} »</p>
              </div>

              <div style="background: #f0fdf4; border: 1pt solid #bbf7d0; border-right: 3.5pt solid #16a34a; padding: 8pt 12pt; border-radius: 6pt; margin-bottom: 8pt;">
                <strong style="color: #166534; font-size: 10.5pt;">✅ الإجابة النموذجية والاستدلالية المعتمدة:</strong>
                <p style="margin: 4pt 0 0 0; font-size: 10.5pt; color: #0f172a; line-height: 1.75; text-align: justify; white-space: pre-line;">${guide.modelAnswer}</p>
              </div>

              <div style="background: #fffbeb; border: 1pt solid #fef3c7; border-right: 3.5pt solid #d97706; padding: 6pt 10pt; border-radius: 4pt; margin-bottom: 8pt;">
                <strong style="color: #92400e; font-size: 10pt;">🎯 توجيهات المعلم لإدارة الحوار الصفي:</strong>
                <p style="margin: 3pt 0 0 0; font-size: 10pt; color: #78350f; line-height: 1.65; text-align: justify;">${guide.teacherGuidance}</p>
              </div>

              ${guide.commonMistakesToAddress ? `
                <div style="background: #fff1f2; border: 1pt solid #fecdd3; border-right: 3.5pt solid #e11d48; padding: 6pt 10pt; border-radius: 4pt;">
                  <strong style="color: #9f1239; font-size: 10pt;">⚠️ التنبيه للأخطاء الشائعة وطريقة علاجها صفيًا:</strong>
                  <p style="margin: 3pt 0 0 0; font-size: 10pt; color: #881337; line-height: 1.65; text-align: justify;">${guide.commonMistakesToAddress}</p>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    printDocumentAsPdf({
      title: `دليل المعلم ومساعد التعلم للمحطات الـ 17 — ${lesson.title}`,
      subtitle: 'النموذج التطبيقي الرائد مع الإجابات النموذجية والتوجيهات الصفية',
      bookType: 'teacher_guide',
      unitNumber: unit.number,
      unitTitle: unit.title,
      includeAnswers: true,
      schoolName: 'سلسلة رواد الأعمال التعليمية',
      teacherName: user.name || 'دليل المعلم المعتمد',
      contentHtml
    });
  };

  const renderTeacherGuidanceBox = (stationId: number) => {
    if (!isTeacher) return null; // strictly for teacher role only

    const guide = teacherGuideList?.find(g => g.stationNumber === stationId);
    if (!guide) return null;

    const isExpanded = expandedTeacherGuides[stationId] ?? true;

    return (
      <div 
        key={`teacher-guide-${stationId}`} 
        className="mt-6 rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/95 via-sky-50/30 to-white p-5 sm:p-7 shadow-sm space-y-4 text-slate-800 transition-all duration-300"
      >
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-indigo-950">
                  👨‍🏫 مساعد التعلم والتوجيه التربوي (خاص بالمعلم فقط)
                </span>
                <span className="text-[10px] font-bold bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded-md">
                  🔒 مرجع صفي محجوب عن الطلاب
                </span>
              </div>
              <p className="text-[11px] text-indigo-700 font-medium">
                دليل إرشادي استدلالي وإجابة نموذجية للمحطة {stationId} ({guide.stationName})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-white/90 border border-indigo-200 px-2.5 py-1 rounded-lg">
              🎯 {guide.pedagogicalObjective.split('(')[1]?.replace(')', '') || guide.pedagogicalObjective}
            </span>
            <button
              onClick={() => {
                setExpandedTeacherGuides(prev => ({ ...prev, [stationId]: !isExpanded }));
              }}
              className="p-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 transition-colors cursor-pointer"
              title={isExpanded ? 'طي دليل المعلم' : 'عرض دليل المعلم'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-1 animate-in fade-in duration-200">
            {/* 1. التساؤل أو التحدي الصفي المطروح بالمحطة */}
            <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs sm:text-sm">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>التساؤل أو التحدي الصفي المطروح بالمحطة:</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed pr-6">
                « {guide.inquiry} »
              </p>
            </div>

            {/* 2. الإجابة النموذجية والاستدلالية المعتمدة */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>الإجابة النموذجية والاستدلالية المعتمدة:</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(guide.modelAnswer);
                    setCopiedStationId(stationId);
                    setTimeout(() => setCopiedStationId(null), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedStationId === stationId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>تم النسخ ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الإجابة</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs sm:text-sm text-slate-900 whitespace-pre-line leading-relaxed font-normal bg-white/70 p-3 rounded-xl border border-emerald-100 text-justify">
                {guide.modelAnswer}
              </div>
            </div>

            {/* 3. التوجيه التربوي وإدارة الحوار الصفي */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs sm:text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>إرشادات المعلم لإدارة الحوار الصفي وطريقة التدريس:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                {guide.teacherGuidance}
              </p>
            </div>

            {/* 4. معالجة المفاهيم المغلوطة إن وجدت */}
            {guide.commonMistakesToAddress && (
              <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-950 font-bold text-xs sm:text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>تنبيه تربوي للأخطاء الشائعة وطريقة تصويبها صفيًا:</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed text-justify">
                  {guide.commonMistakesToAddress}
                </p>
              </div>
            )}

            {/* 5. ناتج التعلم ومستوى بلوم */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-indigo-100 font-medium">
              <span>🎯 ناتج التعلم المستهدف: {guide.pedagogicalObjective}</span>
              <span className="font-mono text-indigo-700">دليل المعلم — المحطة {stationId} من 17</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Station Content Generator (Rendered in Stage Tabs, Unified Flow, or Modular Accordion)
  const renderStationParagraphBody = (stationId: number) => {
    switch (stationId) {
      case 1: // المحطة 1: سؤال توجيهي واستثارة فكرية
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-950 font-bold">
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className={fontStyles.subTitle}>السؤال التوجيهي المحوري (The Core Inquiry):</span>
                </div>
                <span className="text-xs bg-amber-200/80 text-amber-950 px-2.5 py-1 rounded-lg font-bold">
                  استثارة فكرية تنافسية
                </span>
              </div>
              <p className={`${fontStyles.bodyLead} text-slate-950`}>
                « {st.guidingQuestion || lesson.guidingQuestion || "ما الأساس العلمي والتشغيلي لاتخاذ هذا القرار في بيئة الأعمال الحديثة؟ وكيف تميّز المنظمة نفسها عن المنافسين؟"} »
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
              <span className={`inline-flex items-center gap-2 text-amber-900 font-bold ${fontStyles.subTitle}`}>
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>الربط بالواقع التنافسي ومفتاح الفهم (Strategic Key):</span>
              </span>
              <p className={fontStyles.bodyText}>
                {st.strategicKey || `يرتكز هذا الدرس على ربط المفهوم الإداري بالظواهر الاقتصادية المعاشة في السوق المصري. أثناء مذاكرتك، تفكر دائمًا في سلسلة الأثر التنافسي: كيف يؤثر القرار الحالي على تكاليف التشغيل، ولاء العملاء، وحصة المنظمة في السوق المحلي؟ فامتحان شهادة البكالوريا المصرية يركز على المحاكمة الإدارية الرشيدة واختيار البدائل الأكثر استدامة.`}
              </p>
            </div>
          </div>
        );

      case 2: // المحطة 2: مقدمة وسيناريو دراسة الحالة
        const caseTitle = st.caseScenario?.title || unit.caseStudy.title || "دراسة الحالة الميدانية للدرس";
        const caseStory = st.caseScenario?.scenario || st.caseScenario?.story || st.introduction || lesson.priorContext || unit.caseStudy.story;
        const caseDilemma = st.caseScenario?.dilemma || unit.caseStudy.analysis;
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-orange-50/80 border border-orange-200 space-y-3">
              <div className="flex items-center justify-between border-b border-orange-200 pb-2.5">
                <div className="flex items-center gap-2 text-orange-950 font-bold">
                  <Sparkles className="w-5 h-5 text-orange-600 shrink-0" />
                  <h4 className={fontStyles.subTitle}>{caseTitle}</h4>
                </div>
                <span className="text-xs bg-orange-200 text-orange-950 font-bold px-2.5 py-1 rounded-lg">
                  معضلة تشغيلية واقعية
                </span>
              </div>
              <p className={fontStyles.bodyText}>
                {caseStory}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-orange-200 space-y-2 shadow-2xs">
              <span className={`block text-orange-950 font-bold ${fontStyles.subTitle}`}>
                أهمية المعضلة التشغيلية في السوق والمجتمع:
              </span>
              <p className={`${fontStyles.bodyText} text-slate-800`}>
                {caseDilemma || `تتجلى أهمية هذه المعضلة في أنها توضح كيف يمكن لقرار تشغيلي بسيط (مثل اختيار المورد أو تحديد آلية التسعير) أن ينعكس مباشرة على استقرار المنشأة وثقة المستهلك، وتبرز ضرورة التوازن بين الطموح التوسعي والسيولة المالية المتاحة.`}
              </p>
            </div>
          </div>
        );

      case 3: // المحطة 3: تعلّم وتأصيل المتن المعرفي
        return (
          <div className="space-y-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/90 border border-emerald-300 space-y-3">
              <h4 className={`${fontStyles.bodyLead} text-emerald-950 flex items-center gap-2`}>
                <BookOpen className="w-6 h-6 text-emerald-700 shrink-0" />
                <span>{st.learnTitle || firstConcept?.title || lesson.title}</span>
              </h4>
              <p className={fontStyles.bodyText}>
                {st.learnContent || firstConcept?.summary || "تحدد الأطر العلمية المعتمدة في كتاب الوزارة القواعد المنهجية التي تنظم هذا المفهوم، وتعد أساسًا لا غنى عنه لكل مدير يطمح لقيادة فريق عمل بكفاءة وفعالية عالية."}
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
              <span className={`block font-black text-slate-900 ${fontStyles.subTitle}`}>
                التعريفات الهيكلية والقوانين المنظمة (Structural Frameworks):
              </span>
              <div className="grid grid-cols-1 gap-3 pt-1">
                {(st.learnPoints || firstConcept?.keyPoints || [
                  "فهم المنطق الاقتصادي والتنظيمي وراء كل إجراء إداري معتمد.",
                  "الموازنة الدقيقة بين المصالح المتعارضة لمختلف أصحاب المصلحة (Stakeholders).",
                  "الاستناد إلى بيانات السوق الموثوقة بدلاً من التخمين العشوائي.",
                  "مراعاة مرونة المنشأة وقدرتها على الاستجابة لتغيرات بيئة الأعمال المصرية وسلاسل التوريد."
                ]).map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-950 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 border border-emerald-300">
                      {idx + 1}
                    </span>
                    <p className={`${fontStyles.bodyText} text-slate-800`}>
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // المحطة 4: الاستكشاف وتحليل الأنماط التنافسية
        const patternsDesc = st.competitivePatterns?.description || st.explore || `استقصاء سلوك السوق وتحليل ديناميكيات المنافسة في البيئة الاقتصادية المصرية الحديثة: كيف تتحول الفرص السوقية إلى ميزات تنافسية مستدامة، وما التداعيات المتوقعة عند تغير أسعار الفائدة، سلاسل الإمداد، وتفضيلات المستهلكين؟`;
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-3">
              <div className="flex items-center gap-2 text-teal-950 font-bold">
                <Search className="w-5 h-5 text-teal-700 shrink-0" />
                <h4 className={fontStyles.subTitle}>استقصاء سلوك السوق وتحليل الأنماط:</h4>
              </div>
              <p className={fontStyles.bodyText}>
                {patternsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-teal-200 space-y-1.5 shadow-2xs">
                <span className="text-xs font-bold text-teal-800 uppercase block">1. رصد العلاقات والارتباطات:</span>
                <p className="text-sm text-slate-700">
                  تحديد الارتباط المباشر بين متغيرات القرار الداخلي (كفاءة التكاليف وسرعة التسليم) ومتغيرات السوق الخارجي.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-teal-200 space-y-1.5 shadow-2xs">
                <span className="text-xs font-bold text-teal-800 uppercase block">2. توقع المآلات والتحولات:</span>
                <p className="text-sm text-slate-700">
                  استشراف ردود فعل المنافسين عند تبني استراتيجيات جديدة في التسعير أو الترويج لتفادي حروب الأسعار الضارة.
                </p>
              </div>
            </div>
          </div>
        );

      case 5: // المحطة 5: مثال ونموذج استرشادي مبرر
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-green-50/80 border border-green-200 space-y-3">
              <div className="flex items-center justify-between border-b border-green-200 pb-2.5">
                <div className="flex items-center gap-2 text-green-950 font-bold">
                  <Lightbulb className="w-5 h-5 text-green-700 shrink-0" />
                  <h4 className={fontStyles.subTitle}>
                    {st.analyzedExample?.title || "حالة تطبيقية استرشادية من واقع قطاع الأعمال المصري"}
                  </h4>
                </div>
                <span className="text-xs bg-green-200 text-green-950 font-bold px-2 py-0.5 rounded-lg">
                  نموذج محلول ومبرر
                </span>
              </div>
              <p className={`${fontStyles.bodyText} text-slate-900`}>
                {st.analyzedExample?.scenario || unit.caseStudy.story}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-green-200 space-y-2 shadow-2xs">
              <span className={`block text-green-950 font-bold ${fontStyles.subTitle}`}>
                التحليل والتبرير الإداري النموذجي:
              </span>
              <p className={`${fontStyles.bodyText} text-slate-800`}>
                {st.analyzedExample?.analysis || st.analyzedExample?.justification || unit.caseStudy.analysis}
              </p>
            </div>
          </div>
        );

      case 6: // المحطة 6: الشرح والعمليات الحسابية والتشغيلية
        const calcData = st.operationalCalculations;
        const explainText = st.explain || `التركيز على منطق التفكير العلمي في إدارة العمليات اليومية وحسابات التكلفة والربحية ونقطة التعادل. يتطلب التفكير التشغيلي السليم الفصل التام بين التكاليف الثابتة والتكاليف المتغيرة ومراقبة هامش المساهمة بدقة لضمان استقرار التدفقات النقدية.`;
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-cyan-50/80 border border-cyan-200 space-y-3">
              <div className="flex items-center gap-2 text-cyan-950 font-bold">
                <Calculator className="w-5 h-5 text-cyan-700 shrink-0" />
                <h4 className={fontStyles.subTitle}>
                  {calcData?.title || "منطق الحسابات التشغيلية والمالية وإدارة التكاليف:"}
                </h4>
              </div>
              <p className={fontStyles.bodyText}>
                {calcData?.description || explainText}
              </p>
            </div>

            {calcData?.formula && (
              <div className="p-4 rounded-xl bg-white border border-cyan-300 font-mono text-center text-sm sm:text-base font-bold text-cyan-950 shadow-2xs">
                {calcData.formula}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-cyan-200 space-y-1.5 shadow-2xs">
                <strong className="text-xs font-bold text-cyan-900 block">قاعدة احتساب نقطة التعادل والربحية:</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  نقطة التعادل = التكاليف الثابتة ÷ (سعر بيع الوحدة - التكلفة المتغيرة للوحدة). يمثل الفارق هامش الأمان للمنظمة.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-cyan-200 space-y-1.5 shadow-2xs">
                <strong className="text-xs font-bold text-cyan-900 block">حل المشكلات التشغيلية (Bottlenecks):</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  تحديد عنق الزجاجة في خط الإنتاج وتوجيه الموارد الإضافية لعلاجه لرفع الطاقة التشغيلية الإجمالية دون تكاليف باهظة.
                </p>
              </div>
            </div>
          </div>
        );

      case 7: // المحطة 7: فكّر كرائد أعمال (The Innovator’s Vision)
        const entre = st.thinkAsEntrepreneur;
        return (
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 border-2 border-blue-300 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-200 pb-3">
              <div className="flex items-center gap-2 text-blue-950 font-black">
                <Rocket className="w-5 h-5 text-blue-700 shrink-0" />
                <span className={fontStyles.subTitle}>محاكاة عقلية رائد الأعمال (The Innovator’s Vision)</span>
              </div>
              <span className="bg-blue-200 text-blue-950 text-xs font-bold px-2.5 py-1 rounded-lg">
                اقتناص الفرص
              </span>
            </div>

            <h4 className={`${fontStyles.bodyLead} text-blue-950`}>
              {entre?.title || "رؤية رائد الأعمال: تحويل التحديات والتقلبات إلى ميزات تنافسية"}
            </h4>

            <div className="p-4 rounded-xl bg-white border border-blue-200 space-y-2 shadow-2xs">
              <span className="text-xs font-bold text-blue-900 block">اقتناص الفرص السوقية وبناء القيمة المضافة:</span>
              <p className={fontStyles.bodyText}>
                {entre?.opportunity || entre?.valueProposition || st.thinkAsProfessional || `رائد الأعمال لا ينتظر استقرار الأوضاع ليبدأ، بل يبحث في كل تغير اقتصادي (مثل التضخم أو ارتفاع تكاليف الاستيراد) عن فرصة لتوفير بدائل محلية بجودة موثوقة وسعر تنافسي. القيمة المضافة ليست مجرد بيع سلعة، بل حل مشكلة حقيقية يعاني منها العميل في السوق المصري.`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-100/70 border border-blue-300 space-y-1.5">
              <strong className="block text-xs font-bold text-blue-950">إدارة المخاطر والاستثمار المحسوب:</strong>
              <p className="text-xs sm:text-sm text-blue-950 font-medium">
                {entre?.riskManagement || "يبدأ رائد الأعمال بنموذج أولي قابل للاختبار (MVP) للتأكد من إقبال المستهلكين قبل ضخ كامل رأس المال، مما يقلل احتمالية الخسائر الكارثية."}
              </p>
            </div>
          </div>
        );

      case 8: // المحطة 8: فكّر كمدير (The Executive Alignment)
        return (
          <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/80 border-2 border-indigo-300 space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
              <div className="flex items-center gap-2 text-indigo-950 font-black">
                <Settings className="w-5 h-5 text-indigo-700 shrink-0" />
                <span className={fontStyles.subTitle}>محاكاة عقلية المدير التنفيذي (The Executive Alignment)</span>
              </div>
              <span className="bg-indigo-200 text-indigo-950 text-xs font-bold px-2.5 py-1 rounded-lg">
                حوكمة وتشغيل
              </span>
            </div>

            <h4 className={`${fontStyles.bodyLead} text-indigo-950`}>
              {bmBox?.title || "حوكمة الموارد وتنظيم تدفق المهام والرقابة على الجودة"}
            </h4>

            <div className="p-4 rounded-xl bg-white border border-indigo-200 space-y-2 shadow-2xs">
              <span className="text-xs font-bold text-indigo-900 block">الموقف الإداري والمعضلة القيادية:</span>
              <p className={fontStyles.bodyText}>
                {bmBox?.scenario || "واجهت الإدارة تحدياً في الموازنة بين زيادة الإنتاجية وسرعة تسليم الطلبات مع الحفاظ على المعايير الصارمة لضبط الجودة ومنع الهدر التشغيلي في خطوط الإمداد."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-100/70 border border-indigo-300 space-y-1.5">
              <span className={`block font-black text-indigo-950 ${fontStyles.subTitle}`}>
                ❓ سؤال القرار الاستراتيجي والتفويض:
              </span>
              <p className={`${fontStyles.bodyText} font-bold text-indigo-950`}>
                {bmBox?.decisionQuestion || "لو كنت تتولى منصب المدير التنفيذي، كيف تفوض المهام بوضوح، وما مؤشرات الأداء (KPIs) التي تعتمدها للرقابة المستمرة؟"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-indigo-200 space-y-1.5 shadow-2xs">
              <span className={`block font-bold text-indigo-900 ${fontStyles.subTitle}`}>
                التوجيه الإداري الرشيد:
              </span>
              <p className={fontStyles.bodyText}>
                {bmBox?.guidance || "حوكمة الموارد تتطلب توزيع الصلاحيات بالتوازي مع تحديد المسؤوليات بدقة، ووضع نقاط تفتيش مرحلية للجودة تضمن اكتشاف الأخطاء ومعالجتها قبل وصول المنتج للمستهلك."}
              </p>
            </div>
          </div>
        );

      case 9: // المحطة 9: تطبيق حياتي واستدامة الأعمال
        return (
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
              <div className="flex items-center gap-2 text-emerald-950 font-bold">
                <Leaf className="w-5 h-5 text-emerald-700 shrink-0" />
                <h4 className={fontStyles.subTitle}>المسؤولية الاجتماعية للشركات (CSR) والتنمية المستدامة:</h4>
              </div>
              <span className="text-xs bg-emerald-200 text-emerald-950 font-bold px-2 py-0.5 rounded-lg">
                مواطنة مؤسسية
              </span>
            </div>
            <p className={fontStyles.bodyText}>
              {st.lifeApplication || `في الاقتصاد الحديث، لم يعد تقييم الشركات مقتصرًا على أرباحها الفصلية فحسب، بل على مدى التزامها بالمعايير البيئية والمجتمعية (ESG). الشركات المصرية الرائدة التي تستثمر في ترشيد استهلاك الطاقة، وإعادة التدوير، ورعاية مجتمعاتها المحلية تحظى بولاء استثنائي من المستهلكين وتقلص تكاليف المخاطر التنظيمية على المدى الطويل.`}
            </p>
            <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-900">
              <strong>أين تشاهد هذا في حياتك اليومية؟</strong> عندما تختار شراء منتجات ذات عبوات صديقة للبيئة أو تفضل علامة تجارية تدعم المزارعين أو المصنعين المحليين، فأنت شريك في ترسيخ هذه الاستدامة.
            </div>
          </div>
        );

      case 10: // المحطة 10: بنية المعرفة والهياكل الاستراتيجية
        const diag = st.strategicFrameworks?.diagramType || st.toolOrMetric?.diagramType || firstConcept?.diagramType;
        const tbl = st.strategicFrameworks?.table || st.toolOrMetric?.table || firstConcept?.comparisonTable;
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-100/90 border border-slate-300 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-300 pb-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Network className="w-5 h-5 text-slate-700 shrink-0" />
                  <h4 className={fontStyles.subTitle}>
                    {st.strategicFrameworks?.title || st.toolOrMetric?.title || "النماذج والأطر الكلية (PESTEL & SWOT & سلاسل القيمة)"}
                  </h4>
                </div>
                <span className="text-xs bg-slate-300 text-slate-900 font-bold px-2 py-0.5 rounded-lg">
                  هياكل استراتيجية
                </span>
              </div>
              <p className={fontStyles.bodyText}>
                {st.strategicFrameworks?.description || st.toolOrMetric?.description || `ربط المفهوم الحالي ببقية أجزاء المنظمة عبر أطر التحليل الاستراتيجي الشاملة (مثل أبعاد PESTEL الستة أو مصفوفة SWOT) لضمان اتساق القرارات التشغيلية مع الرؤية الكلية للشركة.`}
              </p>
            </div>

            {diag && (
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-300 shadow-2xs">
                <InteractiveDiagram type={diag} />
              </div>
            )}

            {tbl && (
              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-right">
                  <thead className="bg-slate-100 text-slate-900 font-black">
                    <tr>
                      {tbl.headers.map((h, i) => (
                        <th key={i} className="p-3.5 sm:p-4 border-b border-slate-200 text-xs sm:text-sm font-['Cairo']">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tbl.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-l border-slate-100 text-xs sm:text-sm">{row.label}</td>
                        {row.values.map((v, j) => (
                          <td key={j} className="p-3.5 sm:p-4 border-l last:border-l-0 border-slate-100 text-xs sm:text-sm text-slate-700">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 11: // المحطة 11: طبيعة المعرفة الاقتصادية وبحوث السوق
        const researchData = st.marketResearch;
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-3">
              <div className="flex items-center gap-2 text-sky-950 font-bold">
                <BarChart3 className="w-5 h-5 text-sky-700 shrink-0" />
                <h4 className={fontStyles.subTitle}>
                  {researchData?.title || "منهجيات جمع البيانات والبحوث التسويقية والأدلة الإحصائية:"}
                </h4>
              </div>
              <p className={fontStyles.bodyText}>
                {researchData?.methodology || st.natureOfBusiness || `لا تُبنى القرارات الاقتصادية الناجحة على الانطباعات الشخصية أو التخمين، بل على دراسات وبحوث سوقية منهجية تجمع بين البيانات الكمية (حجم المبيعات، ومعدلات النمو، وأرقام الاستهلاك) والبيانات النوعية (استطلاعات الرأي ومجموعات التركيز لفهم دوافع الشراء وتفضيلات العملاء).`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-sky-200 space-y-1.5 shadow-2xs">
                <span className="text-xs font-bold text-sky-900 block">تصميم الاستبيانات وقياس الرضا:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  صياغة أسئلة محايدة غير موجهة لضمان مصداقية الإجابات وتجنب التحيز التأكيدي في بحوث السوق.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-sky-200 space-y-1.5 shadow-2xs">
                <span className="text-xs font-bold text-sky-900 block">التفسير التسويقي المبني على الأدلة:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ربط التغيرات في المبيعات بمتغيرات محددة (مثل تعديل السعر أو الحملة الإعلانية) لاختبار الفرضيات علميًا.
                </p>
              </div>
            </div>
          </div>
        );

      case 12: // المحطة 12: التصورات الخطأ والفخاخ الإدارية
        const trapText = st.challengeIdea?.trap || firstConcept?.examTrap;
        const tipText = st.challengeIdea?.correction || firstConcept?.examTip;
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/90 border-2 border-rose-300 space-y-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                <h4 className={`${fontStyles.subTitle} text-rose-950`}>
                  الفخاخ الإدارية والتصورات الشائعة الخاطئة في السوق والتقييمات:
                </h4>
              </div>
              <p className={fontStyles.bodyText}>
                {trapText || "من أكبر الأخطاء التي يقع فيها رواد الأعمال والطلاب: الخلط بين الربح المحاسبي والتدفق النقدي الفعلي! فالشركة قد تظهر أرباحًا ورقية في قائمة الدخل ولكنها تعجز عن سداد التزاماتها العاجلة فتفلس بسبب أزمة سيولة."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-2 shadow-2xs">
              <span className={`block text-emerald-900 font-bold ${fontStyles.subTitle}`}>
                التفكيك العلمي والتصحيح المنهجي:
              </span>
              <p className={`${fontStyles.bodyText} text-slate-800`}>
                {tipText || st.challengeIdea?.scientificDeconstruction || "الربح المحاسبي هو الفارق بين الإيرادات والمصروفات المستحقة، بينما التدفق النقدي هو حركة النقدية الفعلية داخل وخارج الخزينة؛ السيولة هي شريان الحياة اليومي للمنشأة، بينما الربحية هي شرط بقائها على المدى الطويل."}
              </p>
            </div>
          </div>
        );

      case 13: // المحطة 13: المعادلات والمفاهيم في لمحة
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2.5">
                <div className="flex items-center gap-2 text-amber-950 font-bold">
                  <FileSpreadsheet className="w-5 h-5 text-amber-700 shrink-0" />
                  <h4 className={fontStyles.subTitle}>نافذة مرجعية سريعة: المعادلات والرموز والعلاقات الجوهرية</h4>
                </div>
                <span className="text-xs bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded-lg">
                  ملخص سريع للاستدعاء
                </span>
              </div>
              <p className={fontStyles.bodyText}>
                مرجع مكثف يلخص العلاقات الرياضية والمفاهيم الأساسية للدرس لسهولة الحفظ والاسترجاع السريع قبل الاختبارات:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-bold">إجمالي الإيرادات (TR):</span>
                <p className="font-mono text-sm font-bold text-slate-900">TR = P × Q</p>
                <p className="text-[11px] text-slate-500">السعر × الكمية المباعة</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-bold">إجمالي التكاليف (TC):</span>
                <p className="font-mono text-sm font-bold text-slate-900">TC = FC + VC</p>
                <p className="text-[11px] text-slate-500">التكاليف الثابتة + المتغيرة</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-bold">صافي الربح التشغيلي:</span>
                <p className="font-mono text-sm font-bold text-slate-900">Profit = TR - TC</p>
                <p className="text-[11px] text-slate-500">الإيراد الكلي - التكلفة الكلية</p>
              </div>
            </div>
          </div>
        );

      case 14: // المحطة 14: حاول بنفسك وتمارين موجهة
        const isTryRevealed = revealedTryAnswers[stationId];
        return (
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border-2 border-amber-300 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-3">
              <div className="flex items-center gap-2 text-amber-950 font-black">
                <Zap className="w-5 h-5 text-amber-600 shrink-0" />
                <h4 className={fontStyles.subTitle}>حاول بنفسك: تمرين موجه وتحدي الدقيقة الواحدة (1 Minute Challenge)</h4>
              </div>
              <button
                onClick={() => toggleTryAnswer(stationId)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5"
              >
                <span>{isTryRevealed ? 'إخفاء الإجابة النموذجية' : 'كشف الحل النموذجي والتحليل'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-amber-200">
              <p className={`${fontStyles.bodyText} font-bold text-slate-900`}>
                « {st.tryYourself || `إذا قررت إحدى المنشآت المحلية رفع سعر بيع منتجها النمطي بنسبة 20% دون إدخال أي تحسين على الجودة، ما الخطر التسويقي والتشغيلي المباشر الذي يهدد بقاءها في ظل توافر منتجات بديلة للمنافسين؟`} »
              </p>
            </div>

            {isTryRevealed && (
              <div className="p-4 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in duration-200 shadow-2xs">
                <strong className={`block text-amber-900 font-black ${fontStyles.subTitle}`}>
                  الحل والتحليل الاقتصادي المعتمد:
                </strong>
                <p className={fontStyles.bodyText}>
                  {st.tryYourselfAnswer || `انتقال سريع لقاعدة المستهلكين إلى السلع البديلة للمنافسين بسبب ارتفاع مرونة الطلب السعرية؛ مما يترتب عليه هبوط حاد في الحصة السوقية وإجمالي الإيرادات بنسبة تفوق بكثير الزيادة السعرية المأمولة.`}
                </p>
              </div>
            )}
          </div>
        );

      case 15: // المحطة 15: تدريب وتقييمات متدرجة الصعوبة (النماذج أ، ب، ج)
        return (
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-green-50/80 border border-green-300 space-y-3">
              <div className="flex items-center justify-between border-b border-green-200 pb-2.5">
                <div className="flex items-center gap-2 text-green-950 font-bold">
                  <Dumbbell className="w-5 h-5 text-green-700 shrink-0" />
                  <h4 className={fontStyles.subTitle}>تدريب متدرج الصعوبة يطابق النماذج الوزارية الثلاثة (أ، ب، ج)</h4>
                </div>
                <span className="text-xs bg-green-200 text-green-950 font-bold px-2 py-0.5 rounded-lg">
                  تدرج بلوم للتقييم
                </span>
              </div>
              <p className={fontStyles.bodyText}>
                أسئلة اختبارية تحاكي معايير نماذج التقييمات والاختبارات الرسمية للوزارة متدرجة من الاستيعاب الأساسي وحتى التحليل والحل الحسابي:
              </p>
            </div>

            <div className="space-y-4">
              {lesson.quickCheck.map((qc, i) => (
                <div key={i} className="p-5 sm:p-6 bg-white rounded-2xl border border-green-200 space-y-3.5 shadow-2xs">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-100 text-green-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-green-300">
                      {i + 1}
                    </span>
                    <h5 className={`${fontStyles.bodyLead} text-slate-900`}>
                      {qc.question}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {qc.options.map((opt, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          idx === qc.correctIndex 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-2xs' 
                            : 'bg-slate-50/70 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={fontStyles.bodyText}>{opt}</span>
                          {idx === qc.correctIndex && (
                            <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full shrink-0 mr-2">
                              الإجابة الصحيحة ✓
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
                    <strong className={`block text-emerald-900 font-bold ${fontStyles.subTitle}`}>
                      التعليل العلمي المعتمد للدرجة النهائية:
                    </strong>
                    <p className={fontStyles.bodyText}>
                      {qc.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 16: // المحطة 16: تحدّ تفكيرك (مختبر الحكم والاستدلال JRE)
        const jrePrompt = st.jreQuestion?.prompt || unit.jreQuestion?.prompt || `قيّم الموقف الإداري المعقد وصُغ حكمًا مبررًا مدعومًا بالأدلة المحاسبية والسياقية.`;
        const jreAnswer = unit.jreQuestion?.modelAnswer;
        return (
          <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-fuchsia-50/80 via-purple-50/80 to-indigo-50/80 border-2 border-fuchsia-300 space-y-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fuchsia-200 pb-4">
              <div className="flex items-center gap-2.5 text-fuchsia-950 font-black">
                <Scale className="w-6 h-6 text-fuchsia-700 shrink-0" />
                <h4 className={fontStyles.stationHeading}>
                  المحطة 16: مختبر الحكم والاستدلال (JRE) وفق سلم الـ 20 درجة الوزاري
                </h4>
              </div>
              {onOpenJreModal && (
                <button
                  onClick={() => onOpenJreModal(unit)}
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-sm transition-all flex items-center gap-2"
                >
                  <span>فتح مختبر تصحيح JRE التفاعلي</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-white border border-fuchsia-200 space-y-2 shadow-2xs">
              <span className={`block text-fuchsia-950 font-black ${fontStyles.subTitle}`}>
                نص المعضلة الإدارية المقالية الوزارية:
              </span>
              <p className={`${fontStyles.bodyLead} text-slate-950`}>
                {jrePrompt}
              </p>
            </div>

            {/* قالب صياغة الحجة الوزاري الرباعي */}
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-100/80 border border-purple-300 space-y-2">
              <strong className="block text-xs font-black text-purple-950">
                قالب صياغة الحجة الدفاعية الصارمة المعتمد في التصحيح:
              </strong>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-purple-900">
                <span className="px-2.5 py-1 bg-white rounded-lg border border-purple-200">1. الحكم الصريح المباشر</span>
                <span>➔</span>
                <span className="px-2.5 py-1 bg-white rounded-lg border border-purple-200">2. التبرير السببي المنطقي</span>
                <span>➔</span>
                <span className="px-2.5 py-1 bg-white rounded-lg border border-purple-200">3. الدليل السياقي والمفاهيمي</span>
                <span>➔</span>
                <span className="px-2.5 py-1 bg-white rounded-lg border border-purple-200">4. الاستنتاج المشروط</span>
              </div>
            </div>

            {/* Ministerial Rubric Grid */}
            <div className="p-5 rounded-2xl bg-fuchsia-100/70 border border-fuchsia-200 space-y-3">
              <strong className={`block text-fuchsia-950 font-bold ${fontStyles.subTitle}`}>
                توزيع درجات السؤال المقالي في سلم الـ 20 درجة الوزاري:
              </strong>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200 shadow-2xs">
                  <span className="block text-xs text-slate-500 font-bold">1. الحكم الصريح</span>
                  <span className="text-base sm:text-lg font-black text-fuchsia-700">3 درجات</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200 shadow-2xs">
                  <span className="block text-xs text-slate-500 font-bold">2. التبرير السببي</span>
                  <span className="text-base sm:text-lg font-black text-fuchsia-700">4 درجات</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200 shadow-2xs">
                  <span className="block text-xs text-slate-500 font-bold">3. الدليل والمفاهيم</span>
                  <span className="text-base sm:text-lg font-black text-fuchsia-700">5 درجات</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200 shadow-2xs">
                  <span className="block text-xs text-slate-500 font-bold">4. الحجة المقابلة</span>
                  <span className="text-base sm:text-lg font-black text-fuchsia-700">4 درجات</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200 shadow-2xs">
                  <span className="block text-xs text-slate-500 font-bold">5. الاستنتاج المشروط</span>
                  <span className="text-base sm:text-lg font-black text-fuchsia-700">4 درجات</span>
                </div>
              </div>
            </div>

            {jreAnswer && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-fuchsia-200 space-y-3.5 text-slate-800 shadow-2xs">
                <strong className={`block text-fuchsia-950 font-black ${fontStyles.subTitle}`}>
                  الإجابة النموذجية المكتملة المحققة للدرجة النهائية (20 / 20):
                </strong>
                <div className="space-y-2.5">
                  <p className={fontStyles.bodyText}><strong className="text-fuchsia-900 font-bold">[1. الحكم الصريح المباشر]:</strong> {jreAnswer.judgment}</p>
                  <p className={fontStyles.bodyText}><strong className="text-fuchsia-900 font-bold">[2. التبرير المنطقي والتعليل]:</strong> {jreAnswer.reasoning}</p>
                  <p className={fontStyles.bodyText}><strong className="text-fuchsia-900 font-bold">[3. الدليل والمصطلحات من دراسة الحالة]:</strong> {jreAnswer.evidence}</p>
                  <p className={fontStyles.bodyText}><strong className="text-fuchsia-900 font-bold">[4. الرأي المقابل والموازنة الموضوعية]:</strong> {jreAnswer.counterArgument}</p>
                  <p className={fontStyles.bodyText}><strong className="text-fuchsia-900 font-bold">[5. الخاتمة والاستنتاج المشروط]:</strong> {jreAnswer.conclusion}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 17: // المحطة 17: فكّر وتأمل والمراجعة المستدامة
        return (
          <div className="p-5 sm:p-6 rounded-2xl bg-violet-50/80 border border-violet-200 space-y-4">
            <div className="flex items-center justify-between border-b border-violet-200 pb-2.5">
              <div className="flex items-center gap-2 text-violet-950 font-bold">
                <RefreshCw className="w-5 h-5 text-violet-700 shrink-0" />
                <h4 className={fontStyles.subTitle}>وقفة تأمل ختامية وتأصيل الروابط المعرفية التراكمية</h4>
              </div>
              <span className="text-xs bg-violet-200 text-violet-950 font-bold px-2 py-0.5 rounded-lg">
                تثبيت طويل المدى
              </span>
            </div>
            
            <p className={fontStyles.bodyText}>
              {st.reflect || `وقفة ختامية تفاعلية لمراجعة وتأصيل الروابط بين هذا الدرس والدروس السابقة في الوحدة: كيف يتكامل التخطيط السليم مع هياكل الملكية ومعطيات البيئة الخارجية؟ إن استيعاب هذا الترابط يضمن جاهزيتك التامة للاختبارات الشهرية والتقييم الوزاري النهائي بنظام البكالوريا.`}
            </p>

            <div className="p-4 rounded-xl bg-white border border-violet-200 space-y-2 shadow-2xs">
              <strong className="block text-xs font-bold text-violet-900">
                أسئلة ما وراء المعرفة (Metacognitive Reflection):
              </strong>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1">
                <li>ما المفهوم الأعمق أثراً الذي تعلّمته اليوم ويمكنك توظيفه في إدارة مشروعك الخاص؟</li>
                <li>لو واجهت شركة مماثلة صدمة غير متوقعة في السوق، كيف تعيد ترتيب أولويات خطتها التشغيلية؟</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Stations for current stage in Stages View
  const stageStations = STATION_NAMES.filter(s => s.stageId === activeStageId);

  return (
    <div className="w-full space-y-6 transition-all duration-300">
      
      {/* =========================================================================
          TOP BANNER: Pedagogical Framework Title & View Mode Selector
          ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
              <h3 className="text-base sm:text-lg font-black text-slate-950 font-['Cairo'] flex items-center gap-2">
                <span>🗺️ الدليل المنهجي المطور للمحطات الـ 17 للدرس</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              المسار الاستكشافي المتكامل: <span className="text-amber-800 font-bold">(لاحظ • تساءل • استقصِ • فصّل • طبّق • حكّم ووازِن)</span>
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('stages')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'stages'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
              title="عرض المراحل الخمس التفاعلية مع محطاتها المتسلسلة"
            >
              <Layers className="w-4 h-4" />
              <span>المراحل الـ 5 التفاعلية</span>
            </button>

            <button
              onClick={() => setViewMode('unified')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'unified'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
              title="الهيكل الموحد المتناسق كفقرات دراسية متصلة"
            >
              <BookMarked className="w-4 h-4" />
              <span>الهيكل الموحد</span>
            </button>

            <button
              onClick={() => setViewMode('modular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'modular'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
              title="عرض البطاقات المفصلة القابلة للطي"
            >
              <LayoutList className="w-4 h-4" />
              <span>البطاقات المفصلة</span>
            </button>
          </div>
        </div>

        {/* Global Progress Strip across all 17 stations */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
          <div className="flex items-center gap-2">
            <span>إنجاز محطات الدرس:</span>
            <span className="font-mono text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              {Object.keys(completedStations).length} من 17 محطة مكتملة
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStrictSequence(!isStrictSequence)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
              title="تفعيل أو تعطيل تدفق التعلّم الإلزامي بالتتابع"
            >
              {isStrictSequence ? <Lock className="w-3.5 h-3.5 text-amber-600" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
              <span>{isStrictSequence ? 'حوكمة تتابعية مفعلة' : 'تصفح حر مرن'}</span>
            </button>
          </div>
        </div>

        {/* Quick Horizontal Jump Strip of all 17 Stations */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span className="flex items-center gap-1.5 text-slate-900">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>فهرس المحطات الـ 17 المعتمدة كاملة (انقر للانتقال المباشر لأي محطة):</span>
            </span>
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300">
              المحطة المعروضة: {activeStationId} من 17
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar pt-0.5">
            {STATION_NAMES.map(stn => {
              const isCurrent = stn.id === activeStationId;
              const isDone = completedStations[stn.id];
              return (
                <button
                  key={stn.id}
                  onClick={() => scrollToStation(stn.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-xl font-bold shrink-0 transition-all border flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-amber-500 border-amber-500 text-slate-950 font-black shadow-xs ring-2 ring-amber-300'
                      : isDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-950'
                  }`}
                  title={`${stn.name} (المرحلة ${stn.stageId})`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isCurrent ? 'bg-slate-950 text-white' : isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isDone ? '✓' : stn.id}
                  </span>
                  <span>{stn.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          TEACHER PEDAGOGICAL ASSISTANT BANNER & CONTROLS
          Appears exclusively for the teacher role (with role switcher for testing)
          ========================================================================= */}
      {isTeacher ? (
        <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 p-4 sm:p-5 text-white shadow-md flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0 shadow-inner">
              <GraduationCap className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-black text-white">
                  👨‍🏫 وضع المعلم مفعّل: مساعد التعلم البيداغوجي وإجابات المحطات الـ 17
                </span>
                <span className="text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  الدرس الأول كنموذج تطبيقي رائد
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-medium mt-0.5">
                تظهر لك أدناه الإجابات النموذجية والاستدلالية، وتوجيهات إدارة الحوار الصفي، وتصويب المفاهيم المغلوطة لكل محطة.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const nextState = !showAllTeacherGuides;
                setShowAllTeacherGuides(nextState);
                const updated: Record<number, boolean> = {};
                for (let i = 1; i <= 17; i++) updated[i] = nextState;
                setExpandedTeacherGuides(updated);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {showAllTeacherGuides ? <EyeOff className="w-4 h-4 text-indigo-300" /> : <Eye className="w-4 h-4 text-indigo-300" />}
              <span>{showAllTeacherGuides ? 'طي كافة إرشادات المعلم' : 'فتح كافة إرشادات المعلم'}</span>
            </button>

            <button
              onClick={handlePrintTeacherGuide}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ طباعة دليل إجابات الـ 17 محطة</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🎓</span>
            <span>
              <strong>عرض الطالب:</strong> مساعد التعلم والإجابات النموذجية لتساؤلات المحطات الـ 17 تظهر فقط لحساب المعلم كتوجيه تربوي خاص.
            </span>
          </div>
          <button
            onClick={() => switchRole('teacher')}
            className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>👨‍🏫 التبديل إلى حساب المعلم لمعاينة الإجابات والتوجيهات</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 1: 5 STAGES INTERACTIVE PIPELINE (المراحل الخمس التفاعلية)
          Recommended standard UI/UX as per user brief
          ========================================================================= */}
      {viewMode === 'stages' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* 5 Main Stage Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {PEDAGOGICAL_STAGES.map(stage => {
              const isActive = stage.id === activeStageId;
              const completedInStage = stage.stationIds.filter(id => completedStations[id]).length;
              const isAllStageCompleted = completedInStage === stage.stationIds.length;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStageId(stage.id);
                    // Select first station of stage if current active is not in stage
                    if (!stage.stationIds.includes(activeStationId)) {
                      setActiveStationId(stage.stationIds[0]);
                    }
                  }}
                  className={`relative p-3.5 sm:p-4 rounded-2xl text-right transition-all flex flex-col justify-between border ${
                    isActive 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400' 
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                      }`}>
                        المرحلة {stage.id}
                      </span>
                      {isAllStageCompleted && (
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm line-clamp-2 font-['Cairo']">
                      {stage.name}
                    </h4>
                    <p className={`text-[11px] truncate ${isActive ? 'text-amber-200/90' : 'text-slate-400'}`}>
                      {stage.englishName}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100/20 flex items-center justify-between text-[10px]">
                    <span className={isActive ? 'text-slate-300' : 'text-slate-500'}>
                      {stage.bloom.split(' ')[0]}
                    </span>
                    <span className={`font-mono font-bold ${isActive ? 'text-amber-300' : 'text-slate-600'}`}>
                      {completedInStage}/{stage.stationIds.length}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Callout Banner */}
          <div className={`p-5 sm:p-6 rounded-3xl border ${activeStage.theme.bgLight} ${activeStage.theme.border} space-y-4 shadow-sm`}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-3.5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 text-slate-900 shadow-2xs">
                    المرحلة {activeStage.id} من 5
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-white/70 px-2 py-1 rounded-lg">
                    {activeStage.bloom}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 font-['Cairo']">
                  {activeStage.name} ({activeStage.englishName})
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-white/90 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-800">
                  المسار: <strong className="text-amber-900">{activeStage.verb}</strong>
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">🎯 الهدف التربوي للمرحلة:</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                {activeStage.educationalGoal}
              </p>
            </div>

            {/* Interactive Station Nodes Stepper */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                المحطات الاستكشافية التابعة لهذه المرحلة (انقر للتنقل):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {stageStations.map(stn => {
                  const Icon = stn.icon;
                  const isCurrent = stn.id === activeStationId;
                  const isDone = completedStations[stn.id];
                  
                  return (
                    <button
                      key={stn.id}
                      onClick={() => setActiveStationId(stn.id)}
                      className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                        isCurrent
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100/70'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrent 
                          ? 'bg-amber-400 text-slate-950' 
                          : isDone 
                          ? 'bg-emerald-200 text-emerald-950' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isDone ? '✓' : <Icon className="w-4 h-4" />}
                      </div>

                      <div className="min-w-0">
                        <span className={`text-[10px] font-bold block truncate ${isCurrent ? 'text-amber-300' : 'text-slate-400'}`}>
                          محطة {stn.id} من 17
                        </span>
                        <h5 className="font-bold text-xs truncate">
                          {stn.name.split(':')[0]}
                        </h5>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Station Full Content Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Station Header inside Active Stage */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm border ${activeStation.color} shrink-0 shadow-2xs`}>
                  {React.createElement(activeStation.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-mono">
                      المحطة {activeStation.id} من 17
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {activeStage.name}
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                      {activeStation.badge}
                    </span>
                  </div>
                  <h3 className={`${fontStyles.stationHeading} mt-1`}>
                    {activeStation.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {activeStation.englishName}
                  </p>
                </div>
              </div>

              {/* Status Mark Button */}
              <div>
                <button
                  onClick={() => markStationComplete(activeStation.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    completedStations[activeStation.id]
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{completedStations[activeStation.id] ? 'تم إنجاز المحطة ✓' : 'تحديد كمكتملة والمتابعة'}</span>
                </button>
              </div>
            </div>

            {/* Station Body Content */}
            <div className="pt-2">
              {renderStationParagraphBody(activeStation.id)}
              {renderTeacherGuidanceBox(activeStation.id)}
            </div>

            {/* Bottom In-Station Navigation Stepper */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  if (activeStationId > 1) {
                    setActiveStationId(activeStationId - 1);
                  }
                }}
                disabled={activeStationId <= 1}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>المحطة السابقة ({activeStationId > 1 ? STATION_NAMES[activeStationId - 2]?.short : ''})</span>
              </button>

              <div className="text-xs text-slate-400 font-bold">
                المحطة {activeStationId} من 17 • المرحلة {activeStageId} من 5
              </div>

              <button
                onClick={() => markStationComplete(activeStationId)}
                disabled={activeStationId >= 17}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>المحطة التالية ({activeStationId < 17 ? STATION_NAMES[activeStationId]?.short : 'نهاية المحطات'})</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: UNIFIED CONTINUOUS FLOW (الهيكل الموحد المتناسق كفقرات دراسية)
          Grouped beautifully under the 5 stages with full pedagogical fidelity
          ========================================================================= */}
      {viewMode === 'unified' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-12 animate-in fade-in duration-300">
          
          {/* Introductory Chapter Badge */}
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 text-xs sm:text-sm font-black uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>المتن الدراسي الشامل للدرس - المسار الاستكشافي المتكامل (17 محطة في 5 مراحل)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-['Cairo']">
              {lesson.title}
            </h3>
            {lesson.subtitle && (
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                {lesson.subtitle}
              </p>
            )}
          </div>

          {/* Sequential 5 Stages with their Stations */}
          <div className="space-y-16">
            {PEDAGOGICAL_STAGES.map(stage => (
              <section key={stage.id} className="space-y-8">
                
                {/* Stage Section Header Banner */}
                <div className={`p-5 rounded-2xl border ${stage.theme.bgLight} ${stage.theme.border} space-y-2 shadow-2xs`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900">
                      المرحلة {stage.id}: {stage.name} ({stage.englishName})
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-white/70 px-2 py-0.5 rounded-lg">
                      {stage.bloom}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    🎯 الهدف التربوي: {stage.educationalGoal}
                  </p>
                </div>

                {/* Stations inside this Stage */}
                <div className="space-y-12 pr-1 sm:pr-4">
                  {STATION_NAMES.filter(stn => stn.stageId === stage.id).map(stn => {
                    const Icon = stn.icon;
                    return (
                      <article
                        key={stn.id}
                        id={`station-${stn.id}`}
                        className="space-y-4 pt-4 first:pt-0 scroll-mt-28"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs border ${stn.color} shrink-0 shadow-2xs`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-black uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                                  المحطة {stn.id} من 17
                                </span>
                                <span className="text-[11px] font-bold text-slate-400">
                                  {stage.name}
                                </span>
                              </div>
                              <h4 className={`${fontStyles.stationHeading} mt-0.5`}>
                                {stn.name}
                              </h4>
                            </div>
                          </div>
                        </div>

                        <div className="pt-1">
                          {renderStationParagraphBody(stn.id)}
                          {renderTeacherGuidanceBox(stn.id)}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Lesson Completion Summary Note */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 mt-12 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>اكتملت محطات الدرس الـ 17 بنجاح</span>
            </div>
            <p className={fontStyles.bodyText + ' text-slate-200'}>
              لقد أتممت دراسة كافة المحطات المعرفية والتطبيقية لهذا الدرس من المفاهيم التأسيسية حتى تقييم الحكم والاستدلال الوزاري JRE. يمكنك الآن الانتقال للاختبارات وبنك الأسئلة لتثبيت حصيلتك واختبار قدرتك على حل نماذج التقييمات والاختبارات الرسمية.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 3: MODULAR ACCORDION CARDS (عرض البطاقات المفصلة القابلة للطي)
          ========================================================================= */}
      {viewMode === 'modular' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
            <span>عرض البطاقات مصنفة في المراحل الخمس:</span>
            <div className="flex items-center gap-2">
              <button onClick={expandAllStations} className="text-slate-600 hover:text-slate-950 underline">فتح كافة البطاقات</button>
              <span>•</span>
              <button onClick={collapseAllStations} className="text-slate-600 hover:text-slate-950 underline">طي كافة البطاقات</button>
            </div>
          </div>

          {PEDAGOGICAL_STAGES.map(stage => (
            <div key={stage.id} className="space-y-3">
              <div className={`p-4 rounded-2xl border ${stage.theme.bgLight} ${stage.theme.border} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase px-2 py-0.5 rounded-md bg-white text-slate-900 border border-slate-200">
                    المرحلة {stage.id}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 font-['Cairo']">
                    {stage.name} ({stage.englishName})
                  </h4>
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  {stage.bloom}
                </span>
              </div>

              <div className="space-y-3">
                {STATION_NAMES.filter(s => s.stageId === stage.id).map(stn => {
                  const Icon = stn.icon;
                  const isExpanded = expandedStations[stn.id] !== false;

                  return (
                    <div 
                      key={stn.id} 
                      id={`station-${stn.id}`}
                      className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs ${
                        isExpanded ? 'border-slate-300' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div 
                        onClick={() => toggleExpand(stn.id)}
                        className={`flex items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer select-none transition-colors ${
                          isExpanded 
                            ? 'bg-slate-50/90 border-b border-slate-200' 
                            : 'bg-white hover:bg-slate-50/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs border ${stn.color} shrink-0 shadow-2xs`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-black uppercase text-slate-500 font-mono">
                                المحطة {stn.id} من 17
                              </span>
                              <span className="text-[11px] font-bold text-slate-400">
                                {stage.name}
                              </span>
                            </div>
                            <h4 className={fontStyles.stationHeading}>
                              {stn.name}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg hidden sm:inline ${
                            isExpanded ? 'bg-amber-100 text-amber-950' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isExpanded ? 'انقر للطي' : 'انقر للفتح'}
                          </span>
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-5 sm:p-7 animate-in fade-in duration-200">
                          {renderStationParagraphBody(stn.id)}
                          {renderTeacherGuidanceBox(stn.id)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
