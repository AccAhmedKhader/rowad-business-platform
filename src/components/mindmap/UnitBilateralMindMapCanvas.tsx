import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Printer,
  Search,
  X,
  BookOpen,
  ListChecks,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Target,
  Dumbbell,
  GraduationCap,
  Scale,
  TriangleAlert,
  Zap,
  ArrowRight,
  ExternalLink,
  PlayCircle,
  FileText,
  Compass,
  CheckCircle2,
  HelpCircle,
  Info,
  ChevronsUpDown,
  ChevronsDownUp
} from 'lucide-react';
import {
  getUnitMasterMindMap,
  UnitMasterMindMap,
  UnitLessonBinding,
  UnitOutcomeBinding,
  UNIT_BOOK_PAGES
} from '../../data/unitMindMapsData';
import { useCurriculumFilter } from '../../context/CurriculumFilterContext';

/* ألوان أفرع الدروس في الجناح الأيمن */
const LESSON_BRANCH_COLORS = [
  '#1E6BB8', // أزرق ملكي
  '#6B46C1', // بنفسجي عميق
  '#137A63', // زمردي بترولي
  '#8E2A59', // توتي عنابي
  '#A0652F', // برونزي كراميل
  '#0F766E', // فيروزي داكن
  '#4338CA', // نيلي إنديجو
];

/* ألوان ركائز الامتحان ونواتج التعلم في الجناح الأيسر */
const LEFT_PILLAR_COLORS = {
  outcomes: '#1E6BB8', // أزرق ملكي لنواتج التعلم
  rules: '#334155',    // كحلي أردوازي للقواعد الجوهرية
  traps: '#C83737',    // أحمر قرمزي لفخاخ الامتحان
  jre: '#6B2A82',      // بنفسجي لسؤال ومقال JRE
  tools: '#1E7E4E',    // أخضر غابي للمحاكيات والتدريبات
} as const;

/* أبعاد لوحة الرسم الهندسية الثابتة المتوافقة مع أبعاد A4 بالعرض (1440 × 900) */
const CANVAS_W = 1440;
const CANVAS_H = 900;
const CENTER_X = 720;
const CENTER_Y = 455;
const CENTER_W = 240;
const CENTER_H = 94;

export interface UnitBilateralMindMapCanvasProps {
  unitId?: string | number;
  onSelectLessonMindMap?: (lessonId: string) => void;
  onSwitchToLessonMaps?: () => void;
  className?: string;
}

interface SvgBezierPath {
  id: string;
  d: string;
  color: string;
  width: number;
}

interface RenderUnitNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subTitle?: string;
  type: 'center' | 'lesson-pill' | 'concept-card' | 'pillar-pill' | 'pillar-card';
  color?: string;
  categoryLabel: string;
  metaType: 'unit' | 'lesson' | 'concept' | 'outcome' | 'rule' | 'trap' | 'tool' | 'jre';
  payload?: any;
  branchKey?: string;
  isCollapsed?: boolean;
  childCount?: number;
  canToggle?: boolean;
}

export const UnitBilateralMindMapCanvas: React.FC<UnitBilateralMindMapCanvasProps> = ({
  unitId = 'unit-1',
  onSelectLessonMindMap,
  onSwitchToLessonMaps,
  className = '',
}) => {
  const navigate = useNavigate();
  const { selectUnit, selectLesson } = useCurriculumFilter();

  const [activeUnitId, setActiveUnitId] = useState<string>(
    typeof unitId === 'number' ? `unit-${unitId}` : unitId
  );

  useEffect(() => {
    setActiveUnitId(typeof unitId === 'number' ? `unit-${unitId}` : unitId);
  }, [unitId]);

  // تحميل بيانات الخريطة الذهنية الشاملة للوحدة
  const unitData: UnitMasterMindMap = useMemo(() => {
    return getUnitMasterMindMap(activeUnitId);
  }, [activeUnitId]);

  // حالة طي وفرد الفروع التفاعلية ديناميكياً
  const [collapsedBranches, setCollapsedBranches] = useState<Set<string>>(new Set());

  const toggleBranch = useCallback((branchKey: string) => {
    setCollapsedBranches((prev) => {
      const next = new Set(prev);
      if (next.has(branchKey)) {
        next.delete(branchKey);
      } else {
        next.add(branchKey);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setCollapsedBranches(new Set());
  }, []);

  const collapseAll = useCallback(() => {
    const allKeys = new Set<string>();
    unitData.lessons.forEach((_, idx) => allKeys.add(`lesson-${idx}`));
    ['outcomes', 'rules', 'traps', 'jre', 'tools'].forEach((key) => allKeys.add(`pillar-${key}`));
    setCollapsedBranches(allKeys);
  }, [unitData]);

  // حساب الارتفاع التكيفي لاستيعاب كامل النصوص
  const calcAdaptiveHeight = (text: string, width: number, hasSubText = false): number => {
    const charsPerLine = Math.floor(width / 9.5);
    const estimatedLines = Math.max(1, Math.ceil(text.length / charsPerLine));
    const baseHeight = estimatedLines * 19 + (hasSubText ? 28 : 16);
    return Math.max(38, Math.min(100, baseHeight));
  };

  // أدوات التحكم
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<RenderUnitNode | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'lesson' | 'outcomes' | 'training' | 'assessment'>('overview');
  const [cognitiveFilter, setCognitiveFilter] = useState<'all' | 'understand' | 'apply' | 'analyze' | 'evaluate'>('all');

  const containerRef = useRef<HTMLDivElement>(null);

  // البحث اللحظي
  const isMatch = useCallback(
    (txt: string) => {
      if (!searchQuery.trim()) return false;
      return txt.toLowerCase().includes(searchQuery.trim().toLowerCase());
    },
    [searchQuery]
  );

  /* ------------------------------------------------------------------ *
   * محرك التخطيط الهندسي الشجري الشامل للوحدة (Unit Master Layout Engine)
   * ------------------------------------------------------------------ */
  const { nodes, paths } = useMemo(() => {
    const calculatedNodes: RenderUnitNode[] = [];
    const calculatedPaths: SvgBezierPath[] = [];

    const makeCurve = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      width = 2,
      id: string
    ): SvgBezierPath => {
      const midX = (x1 + x2) / 2;
      return {
        id,
        d: `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`,
        color,
        width,
      };
    };

    // 1. العقدة المركزية الكحلية (Unit Center Node)
    const centerNode: RenderUnitNode = {
      id: 'node-unit-center',
      x: CENTER_X - CENTER_W / 2,
      y: CENTER_Y - CENTER_H / 2,
      w: CENTER_W,
      h: CENTER_H,
      title: unitData.title,
      subTitle: `${unitData.label} · ${unitData.lessons.length} دروس متكاملة`,
      type: 'center',
      categoryLabel: 'الصورة الكبيرة للوحدة',
      metaType: 'unit',
      payload: unitData,
    };
    calculatedNodes.push(centerNode);

    const centerLeftAnchor = { x: CENTER_X - CENTER_W / 2, y: CENTER_Y };
    const centerRightAnchor = { x: CENTER_X + CENTER_W / 2, y: CENTER_Y };

    /* ---------------------------------------------------------------- *
     * 2. الجناح الأيمن: مسار دروس الوحدة (Lessons Progression)
     * ---------------------------------------------------------------- */
    const lessonsList = unitData.lessons;
    const totalLessons = lessonsList.length;

    // حساب إجمالي الصفوف مع مراعاة حالة الطي والفرد
    const totalRightRows = lessonsList.reduce((acc, l, lIdx) => {
      const isCollapsed = collapsedBranches.has(`lesson-${lIdx}`);
      if (isCollapsed) return acc + 1;
      return acc + Math.max(l.keyConcepts.length, 1);
    }, 0);

    const startYRight = 95;
    const endYRight = 825;
    const rowHeightRight = (endYRight - startYRight) / Math.max(totalRightRows, 1);

    const rightPillX = 905;
    const rightPillW = 165;
    const rightPillH = 38;

    const rightCardX = 1115;
    const rightCardW = 245;

    let currentRightConceptRow = 0;

    lessonsList.forEach((lesson, lIdx) => {
      const branchKey = `lesson-${lIdx}`;
      const isCollapsed = collapsedBranches.has(branchKey);
      const branchColor = LESSON_BRANCH_COLORS[lIdx % LESSON_BRANCH_COLORS.length];
      const lessonConceptYs: number[] = [];

      if (!isCollapsed) {
        lesson.keyConcepts.forEach((conceptTitle, cIdx) => {
          const rowCenterY = startYRight + (currentRightConceptRow + 0.5) * rowHeightRight;
          lessonConceptYs.push(rowCenterY);

          const cardH = calcAdaptiveHeight(conceptTitle, rightCardW);
          const conceptNode: RenderUnitNode = {
            id: `right-concept-${lIdx}-${cIdx}`,
            x: rightCardX,
            y: rowCenterY - cardH / 2,
            w: rightCardW,
            h: cardH,
            title: conceptTitle,
            type: 'concept-card',
            color: branchColor,
            categoryLabel: `مفهوم بالدرس ${lesson.no}`,
            metaType: 'concept',
            payload: { lesson, conceptTitle },
          };
          calculatedNodes.push(conceptNode);

          currentRightConceptRow++;
        });
      } else {
        const rowCenterY = startYRight + (currentRightConceptRow + 0.5) * rowHeightRight;
        lessonConceptYs.push(rowCenterY);
        currentRightConceptRow++;
      }

      // موضع كبسولة الدرس Y
      const pillCenterY =
        lessonConceptYs.length > 0
          ? lessonConceptYs.reduce((a, b) => a + b, 0) / lessonConceptYs.length
          : startYRight + (currentRightConceptRow + 0.5) * rowHeightRight;

      const lessonPillNode: RenderUnitNode = {
        id: `right-lesson-pill-${lIdx}`,
        x: rightPillX,
        y: pillCenterY - rightPillH / 2,
        w: rightPillW,
        h: rightPillH,
        title: `الدرس ${lesson.no}: ${lesson.title}`,
        type: 'lesson-pill',
        color: branchColor,
        categoryLabel: `محطة معرفية (${lIdx + 1} من ${totalLessons})`,
        metaType: 'lesson',
        payload: lesson,
        branchKey,
        isCollapsed,
        childCount: lesson.keyConcepts.length,
        canToggle: lesson.keyConcepts.length > 0,
      };
      calculatedNodes.push(lessonPillNode);

      // خط من المركز إلى كبسولة الدرس
      calculatedPaths.push(
        makeCurve(
          centerRightAnchor.x,
          centerRightAnchor.y,
          rightPillX,
          pillCenterY,
          branchColor,
          2.2,
          `path-c-to-rlesson-${lIdx}`
        )
      );

      // خطوط من كبسولة الدرس إلى مفاهيمها في حال عدم الطي
      if (!isCollapsed) {
        lessonConceptYs.forEach((cCenterY, cIdx) => {
          calculatedPaths.push(
            makeCurve(
              rightPillX + rightPillW,
              pillCenterY,
              rightCardX,
              cCenterY,
              branchColor,
              1.8,
              `path-rlesson-to-concept-${lIdx}-${cIdx}`
            )
          );
        });
      }
    });

    /* ---------------------------------------------------------------- *
     * 3. الجناح الأيسر: ركائز الامتحان ونواتج التعلم (Outcomes & Pillars)
     * ---------------------------------------------------------------- */
    interface LeftPillarGroup {
      key: keyof typeof LEFT_PILLAR_COLORS;
      label: string;
      metaType: 'outcome' | 'rule' | 'trap' | 'jre' | 'tool';
      items: { text: string; subText?: string; payload: any }[];
      color: string;
    }

    const leftGroups: LeftPillarGroup[] = [
      {
        key: 'outcomes',
        label: 'نواتج التعلم ومستوى بلوم',
        metaType: 'outcome',
        color: LEFT_PILLAR_COLORS.outcomes,
        items: unitData.outcomes.slice(0, 3).map((o) => ({
          text: `Sub-LO ${o.subLo}: ${o.description}`,
          subText: `مستوى: ${o.bloomLevel}`,
          payload: o,
        })),
      },
      {
        key: 'rules',
        label: 'المعايير والقواعد الحاكمة',
        metaType: 'rule',
        color: LEFT_PILLAR_COLORS.rules,
        items: unitData.goldenRules.slice(0, 3).map((r) => ({
          text: r,
          payload: { rule: r },
        })),
      },
      {
        key: 'traps',
        label: 'فخاخ امتحانات الوحدة',
        metaType: 'trap',
        color: LEFT_PILLAR_COLORS.traps,
        items: unitData.examTraps.slice(0, 3).map((t) => ({
          text: t.title,
          subText: t.error,
          payload: t,
        })),
      },
      {
        key: 'jre',
        label: 'المقال المالي JRE (20 درجة)',
        metaType: 'jre',
        color: LEFT_PILLAR_COLORS.jre,
        items: [
          {
            text: unitData.jreEssayPrompt.title,
            subText: 'صياغة الحجة والموازنة وإصدار الحكم المدعوم',
            payload: unitData.jreEssayPrompt,
          },
        ],
      },
      {
        key: 'tools',
        label: 'المحاكيات وورش العمل',
        metaType: 'tool',
        color: LEFT_PILLAR_COLORS.tools,
        items: unitData.interactiveTools.map((tool) => ({
          text: tool.name,
          subText: tool.description,
          payload: tool,
        })),
      },
    ];

    const totalLeftRows = leftGroups.reduce((acc, g) => {
      const isCollapsed = collapsedBranches.has(`pillar-${g.key}`);
      if (isCollapsed) return acc + 1;
      return acc + Math.max(g.items.length, 1);
    }, 0);

    const startYLeft = 95;
    const endYLeft = 825;
    const rowHeightLeft = (endYLeft - startYLeft) / Math.max(totalLeftRows, 1);

    const leftPillW = 150;
    const leftPillH = 38;
    const leftPillX = 385;

    const leftCardW = 260;
    const leftCardX = 80;

    let currentLeftRowIndex = 0;

    leftGroups.forEach((group) => {
      const branchKey = `pillar-${group.key}`;
      const isCollapsed = collapsedBranches.has(branchKey);
      const cardCenterYs: number[] = [];

      if (!isCollapsed) {
        group.items.forEach((item, iIdx) => {
          const rowCenterY = startYLeft + (currentLeftRowIndex + 0.5) * rowHeightLeft;
          cardCenterYs.push(rowCenterY);

          const cardH = calcAdaptiveHeight(item.text, leftCardW, Boolean(item.subText));
          const cardNode: RenderUnitNode = {
            id: `left-card-${group.key}-${iIdx}`,
            x: leftCardX,
            y: rowCenterY - cardH / 2,
            w: leftCardW,
            h: cardH,
            title: item.text,
            subTitle: item.subText,
            type: 'pillar-card',
            categoryLabel: group.label,
            color: group.color,
            metaType: group.metaType,
            payload: item.payload,
          };
          calculatedNodes.push(cardNode);

          currentLeftRowIndex++;
        });
      } else {
        const rowCenterY = startYLeft + (currentLeftRowIndex + 0.5) * rowHeightLeft;
        cardCenterYs.push(rowCenterY);
        currentLeftRowIndex++;
      }

      const pillCenterY =
        cardCenterYs.length > 0
          ? cardCenterYs.reduce((a, b) => a + b, 0) / cardCenterYs.length
          : startYLeft + (currentLeftRowIndex + 0.5) * rowHeightLeft;

      const pillNode: RenderUnitNode = {
        id: `left-pillar-pill-${group.key}`,
        x: leftPillX,
        y: pillCenterY - leftPillH / 2,
        w: leftPillW,
        h: leftPillH,
        title: group.label,
        type: 'pillar-pill',
        color: group.color,
        categoryLabel: 'ركيزة امتحان ونواتج تعلم',
        metaType: group.metaType,
        payload: { groupKey: group.key },
        branchKey,
        isCollapsed,
        childCount: group.items.length,
        canToggle: group.items.length > 0,
      };
      calculatedNodes.push(pillNode);

      // خط من المركز إلى كبسولة الركيزة
      calculatedPaths.push(
        makeCurve(
          centerLeftAnchor.x,
          centerLeftAnchor.y,
          leftPillX + leftPillW,
          pillCenterY,
          group.color,
          2.2,
          `path-c-to-lpillar-${group.key}`
        )
      );

      // خطوط من الكبسولة إلى بطاقاتها إذا لم تكن مطوية
      if (!isCollapsed) {
        cardCenterYs.forEach((cCenterY, cIdx) => {
          calculatedPaths.push(
            makeCurve(
              leftPillX,
              pillCenterY,
              leftCardX + leftCardW,
              cCenterY,
              group.color,
              1.8,
              `path-lpillar-to-card-${group.key}-${cIdx}`
            )
          );
        });
      }
    });

    return { nodes: calculatedNodes, paths: calculatedPaths };
  }, [unitData, collapsedBranches]);

  // إدارة التحريك والتكبير
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 || e.button === 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // فتح صفحة الدرس
  const handleGoToLesson = (lesson: UnitLessonBinding) => {
    navigate(lesson.lessonUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // فتح التدريبات التطبيقية
  const handleGoToExercises = (lesson?: UnitLessonBinding) => {
    if (lesson) {
      navigate(lesson.exercisesUrl);
    } else {
      navigate(`/training/exercises?unit=${unitData.unitId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // فتح بنك الأسئلة المفلتر
  const handleGoToQuestionBank = (lesson?: UnitLessonBinding) => {
    selectUnit(unitData.unitId);
    if (lesson) {
      selectLesson(unitData.unitId, lesson.id);
    }
    navigate('/assessment/question-bank');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // فتح اختبار الوحدة التقييمي
  const handleGoToUnitTest = () => {
    navigate('/assessment/unit-tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // فتح محاكي تفاعلي
  const handleGoToTool = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bookPageNumber = UNIT_BOOK_PAGES[unitData.unitId] || 2;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col bg-[#F8FAFC] rounded-2xl border border-[#CBD5E1] shadow-sm overflow-hidden select-none ${className}`}
      dir="rtl"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* ------------------------------------------------------------------ *
       * شريط الأدوات العلوي المتقدم للوحدة الشاملة
       * ------------------------------------------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-white border-b border-[#CBD5E1] shadow-2xs z-30 print:hidden">
        {/* محدد الوحدات العشر 1..10 */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-700 ml-1 whitespace-nowrap flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>الوحدات:</span>
          </span>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setActiveUnitId(`unit-${num}`);
                  setSelectedNode(null);
                }}
                className={`min-w-[32px] h-7 px-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeUnitId === `unit-${num}`
                    ? 'bg-[#1E293B] text-white shadow-xs scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title={`الانتقال لخريطة الوحدة ${num}`}
              >
                و{num}
              </button>
            ))}
          </div>

          {/* زر التبديل إلى خرائط الدروس الفردية */}
          {onSwitchToLessonMaps && (
            <button
              type="button"
              onClick={onSwitchToLessonMaps}
              className="mr-2 flex items-center gap-1.5 px-3 h-7 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition shadow-2xs whitespace-nowrap"
              title="استعراض خرائط الدروس الفردية التفصيلية"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>خرائط الدروس التفصيلية</span>
            </button>
          )}
        </div>

        {/* البحث، التكبير، والتفاعل */}
        <div className="flex items-center gap-2 mr-auto">
          {/* حقل البحث اللحظي */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في مفاهيم الوحدة..."
              className="w-32 sm:w-48 pr-8 pl-6 py-1 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-500 text-slate-800 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-4 w-px bg-slate-300" />

          {/* أزرار الطي والفرد الشاملة لجميع فروع الوحدة */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={expandAll}
              title="فرد جميع فروع وركائز الوحدة بالكامل"
              className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                collapsedBranches.size === 0
                  ? 'bg-white text-slate-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-[#1E6BB8]" />
              <span className="hidden sm:inline">فرد الكل</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              title="طي جميع الفروع لعرض العناوين والمحطات الكبرى فقط"
              className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                collapsedBranches.size > 0
                  ? 'bg-white text-slate-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ChevronsDownUp className="w-3.5 h-3.5 text-[#8E2A59]" />
              <span className="hidden sm:inline">طي الكل</span>
            </button>
          </div>

          <div className="h-4 w-px bg-slate-300" />

          {/* التكبير والتصغير */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
              title="تصغير (-)"
              className="p-1.5 rounded text-slate-600 hover:bg-white hover:shadow-xs transition"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-slate-700 px-1.5 min-w-[36px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
              title="تكبير (+)"
              className="p-1.5 rounded text-slate-600 hover:bg-white hover:shadow-xs transition"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={resetView}
              title="إعادة ضبط 100%"
              className="p-1.5 rounded text-slate-600 hover:bg-white hover:shadow-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* طباعة A4 */}
          <button
            type="button"
            onClick={() => window.print()}
            title="طباعة خريطة الوحدة بجودة A4 مطابقة للكتاب"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* ملء الشاشة */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة'}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ *
       * منصة الرسم الهندسية الشاملة (Canvas Area 1440 × 900)
       * ------------------------------------------------------------------ */}
      <div
        className="w-full overflow-hidden flex items-center justify-center bg-[#E2E8F0] min-h-[740px] p-4 sm:p-8 cursor-grab active:cursor-grabbing print:p-0 print:bg-white print:m-0"
        onMouseDown={handleMouseDown}
      >
        <div
          style={{
            width: `${CANVAS_W}px`,
            height: `${CANVAS_H}px`,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
          className="relative bg-white border border-[#CBD5E1] shadow-xl rounded-2xl shrink-0 print:border-none print:shadow-none print:rounded-none print:m-0 print:transform-none"
        >
          {/* 1. ترويسة صفحة الكتاب الرسمية */}
          <div className="absolute top-0 inset-x-0 px-12 pt-7 z-10 pointer-events-none">
            <div className="flex items-center justify-between pb-2 text-sm text-[#334155] font-semibold">
              <div className="text-right">
                {unitData.label} · {unitData.title}
              </div>
              <div className="text-left font-bold text-[#1E293B]">
                خريطة الوحدة الشاملة المتكاملة (مسار المعرفة ونواتج التعلم)
              </div>
            </div>
            <div className="w-full h-px bg-[#CBD5E1]" />
          </div>

          {/* 2. طبقة خطوط الربط المنحنية المتجهة (SVG Vector Curves) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            width={CANVAS_W}
            height={CANVAS_H}
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          >
            {paths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                stroke={p.color}
                strokeWidth={p.width}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* 3. طبقة عناصر الخريطة (Nodes: Center, Lesson Pills, Pillar Pills, Cards) */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            {nodes.map((node) => {
              const matched = isMatch(node.title) || (node.subTitle && isMatch(node.subTitle));
              const isSelected = selectedNode?.id === node.id;

              // أ. العقدة المركزية الكحلية
              if (node.type === 'center') {
                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      setSelectedNode(node);
                      setSelectedTab('overview');
                    }}
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      width: `${node.w}px`,
                      height: `${node.h}px`,
                    }}
                    className="absolute pointer-events-auto rounded-3xl bg-[#1E293B] text-white flex flex-col items-center justify-center text-center px-4 py-2 cursor-pointer shadow-lg hover:scale-[1.03] transition-transform duration-200 border-none group"
                  >
                    <span className="text-[11px] font-medium text-[#94A3B8] mb-1 group-hover:text-slate-200 transition">
                      {node.subTitle}
                    </span>
                    <h1 className="text-sm font-bold text-white leading-tight tracking-normal">
                      {node.title}
                    </h1>
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-amber-300 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>الفكرة الكبرى والسؤال الجوهري</span>
                    </span>
                  </div>
                );
              }

              // ب. كبسولات الدروس والركائز (Pills) مع إمكانية الطي والفرد التفاعلي
              if (node.type === 'lesson-pill' || node.type === 'pillar-pill') {
                const isBranchCollapsed = Boolean(node.isCollapsed);
                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      if (node.canToggle && node.branchKey) {
                        toggleBranch(node.branchKey);
                      }
                      setSelectedNode(node);
                      setSelectedTab(node.type === 'lesson-pill' ? 'lesson' : 'outcomes');
                    }}
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      width: `${node.w}px`,
                      height: `${node.h}px`,
                      backgroundColor: node.color,
                    }}
                    title={
                      node.canToggle
                        ? isBranchCollapsed
                          ? `انقر لفرد هذا الفرع وإظهار (${node.childCount} عنصر)`
                          : 'انقر لطي هذا الفرع'
                        : node.title
                    }
                    className={`absolute pointer-events-auto rounded-full text-white flex items-center justify-between px-3 py-1 cursor-pointer shadow-xs hover:scale-105 transition-all duration-200 group ${
                      matched ? 'ring-3 ring-amber-400 font-extrabold' : ''
                    } ${isSelected ? 'ring-3 ring-white shadow-md scale-105' : ''} ${
                      isBranchCollapsed ? 'ring-2 ring-white/80 border border-white/40 shadow-sm brightness-110' : ''
                    }`}
                  >
                    <span className="text-xs font-bold whitespace-nowrap leading-none tracking-tight flex-1 text-center truncate px-1">
                      {node.title}
                    </span>
                    {node.canToggle && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          if (node.branchKey) toggleBranch(node.branchKey);
                        }}
                        className="w-5 h-5 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center text-[10px] font-bold text-white shrink-0 transition"
                        title={isBranchCollapsed ? 'فرد الفرع' : 'طي الفرع'}
                      >
                        {isBranchCollapsed ? `+${node.childCount ?? ''}` : '−'}
                      </span>
                    )}
                  </div>
                );
              }

              // ج. البطاقات البيضاء (المفاهيم وركائز الامتحان) - تستوعب كامل النصوص بدقة ووضوح
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNode(node);
                    if (node.metaType === 'lesson' || node.metaType === 'concept') {
                      setSelectedTab('lesson');
                    } else if (node.metaType === 'outcome') {
                      setSelectedTab('outcomes');
                    } else if (node.metaType === 'tool') {
                      setSelectedTab('training');
                    } else {
                      setSelectedTab('overview');
                    }
                  }}
                  title={node.title}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.w}px`,
                    height: `${node.h}px`,
                  }}
                  className={`absolute pointer-events-auto rounded-lg border bg-white flex flex-col items-center justify-center text-center px-2.5 py-1.5 cursor-pointer shadow-2xs transition-all duration-150 group ${
                    matched
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400 font-bold text-amber-950'
                      : isSelected
                      ? 'border-slate-800 ring-2 ring-slate-800 shadow-sm bg-slate-50'
                      : 'border-[#CBD5E1] text-[#1E293B] hover:border-slate-400 hover:shadow-xs hover:scale-[1.02]'
                  }`}
                >
                  <span
                    className={`font-semibold leading-snug break-words text-center select-none ${
                      node.title.length > 55
                        ? 'text-[10.5px]'
                        : node.title.length > 35
                        ? 'text-[11px]'
                        : 'text-xs'
                    } ${matched ? 'text-amber-950 font-bold' : 'text-[#1E293B]'}`}
                  >
                    {node.title}
                  </span>
                  {node.subTitle && (
                    <span className="text-[10px] text-slate-500 font-normal mt-0.5 line-clamp-2 leading-tight">
                      {node.subTitle}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 4. تذييل صفحة الكتاب الرسمي */}
          <div className="absolute bottom-0 inset-x-0 px-12 pb-7 z-10 pointer-events-none">
            <div className="w-full h-px bg-[#CBD5E1]" />
            <div className="flex items-center justify-between pt-2 text-xs text-[#64748B] font-medium">
              <div className="text-right">
                خرائط المنهج الذهنية – المحاسبة ببساطة وإتقان · بكالوريا 2027 (الهيكل التكاملي)
              </div>
              <div className="text-left font-mono font-bold text-[#334155] text-sm">
                {bookPageNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ *
       * لوحة التفاعل والربط السفلية الشاملة (Integrated Linking Dock)
       * تربط الخريطة بالدروس، والتدريبات، والاختبارات، ونواتج التعلم
       * ------------------------------------------------------------------ */}
      {selectedNode && (
        <div className="sticky bottom-0 inset-x-0 bg-white border-t border-[#CBD5E1] shadow-2xl z-40 animate-in slide-in-from-bottom-3 duration-200">
          {/* شريط تبويبات الربط الأربعة */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2 border-b border-slate-200 bg-slate-50/80">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-2xs"
                style={{ backgroundColor: selectedNode.color || '#1E293B' }}
              >
                {selectedNode.categoryLabel}
              </span>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                {selectedNode.title}
              </h3>
            </div>

            {/* أزرار التبويب الذكية */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedTab('overview')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedTab === 'overview'
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                نظرة عامة
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab('lesson')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  selectedTab === 'lesson'
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>الدرس والشرح</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab('outcomes')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  selectedTab === 'outcomes'
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>نواتج التعلم</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab('training')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  selectedTab === 'training'
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>التدريبات والمحاكاة</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab('assessment')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  selectedTab === 'assessment'
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>الاختبارات وبنك الأسئلة</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition ml-2"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* محتوى التبويب النشط */}
          <div className="p-5 max-w-6xl mx-auto">
            {/* 1. تبويب نظرة عامة */}
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>الفكرة الكبرى للوحدة:</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                    {unitData.bigIdea}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 pt-1">
                    <Compass className="w-4 h-4 text-sky-600" />
                    <span>السؤال الجوهري (Essential Question):</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 bg-sky-50/60 p-2.5 rounded-xl border border-sky-200">
                    {unitData.essentialQuestion}
                  </p>
                </div>

                <div className="space-y-3 flex flex-col justify-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-600">إجراءات سريعة على الوحدة:</span>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={handleGoToUnitTest}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1E293B] text-white text-xs font-bold hover:bg-slate-800 transition shadow-xs"
                    >
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                        <span>اختبار الوحدة التقييمي الشامل</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGoToQuestionBank()}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition shadow-2xs"
                    >
                      <span className="flex items-center gap-1.5">
                        <ListChecks className="w-3.5 h-3.5 text-sky-600" />
                        <span>بنك الأسئلة المعتمد ({unitData.assessment.totalUnitQuestions} سؤالاً)</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGoToExercises()}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition shadow-2xs"
                    >
                      <span className="flex items-center gap-1.5">
                        <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ورشة التدريبات والمسائل</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. تبويب الدرس والشرح */}
            {selectedTab === 'lesson' && (
              <div className="space-y-4">
                {selectedNode.metaType === 'lesson' ? (
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-white text-[11px] font-bold">
                          الدرس {selectedNode.payload.no}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">
                          {selectedNode.payload.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        {selectedNode.payload.subtitle || selectedNode.payload.progressionStage}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleGoToLesson(selectedNode.payload)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E293B] text-white text-xs font-bold hover:bg-slate-800 transition shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>الانتقال لشرح الدرس كاملاً</span>
                      </button>

                      {onSelectLessonMindMap && (
                        <button
                          type="button"
                          onClick={() => onSelectLessonMindMap(selectedNode.payload.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>فتح خريطة هذا الدرس التفصيلية</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600">
                      هذا المفهوم يقع ضمن دروس الوحدة. يمكنك اختيار الدرس المناسب للانتقال إليه مباشرة:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {unitData.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          onClick={() => handleGoToLesson(lesson)}
                          className="p-3 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-400 rounded-lg cursor-pointer transition shadow-2xs flex items-center justify-between"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-slate-500">الدرس {lesson.no}</span>
                            <h5 className="text-xs font-bold text-slate-800">{lesson.title}</h5>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. تبويب نواتج التعلم المستهدفة */}
            {selectedTab === 'outcomes' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>مصفوفة نواتج التعلم ومستوى بلوم المعرفي ({unitData.outcomes.length} نواتج):</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleGoToQuestionBank()}
                    className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                  >
                    <span>عرض كل أسئلة النواتج في بنك الأسئلة</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {unitData.outcomes.map((lo, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs hover:border-blue-300 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          Sub-LO {lo.subLo}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {lo.bloomLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {lo.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleGoToQuestionBank()}
                        className="w-full text-center py-1 text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        تدرب على أسئلة هذا الناتج ←
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. تبويب التدريبات والمحاكاة */}
            {selectedTab === 'training' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Dumbbell className="w-4 h-4 text-emerald-600" />
                    <span>المحاكيات التفاعلية وورش العمل المخصصة للوحدة:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleGoToExercises()}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>فتح بنك التدريبات الشاملة</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {unitData.interactiveTools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl space-y-2 shadow-2xs transition group"
                    >
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition" />
                        <h4 className="text-xs font-bold text-slate-900">{tool.name}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tool.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleGoToTool(tool.path)}
                        className="w-full mt-2 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <span>بدء المحاكاة الآن</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. تبويب الاختبارات وبنك الأسئلة */}
            {selectedTab === 'assessment' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* كارت اختبار الوحدة */}
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      <h4 className="text-sm font-bold text-slate-900">
                        اختبار الوحدة التقييمي الشامل
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      اختبار قياسي يغطي جميع نواتج تعلم {unitData.label}، يجمع بين أسئلة الاختيار من متعدد، والمسائل العملية، ومقال التفسير المالي JRE.
                    </p>
                    <button
                      type="button"
                      onClick={handleGoToUnitTest}
                      className="w-full py-2 rounded-lg bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>بدء اختبار الوحدة الآن</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* كارت بنك الأسئلة المفلتر */}
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-blue-600" />
                      <h4 className="text-sm font-bold text-slate-900">
                        بنك الأسئلة المعتمد للوحدة ({unitData.assessment.totalUnitQuestions} سؤالاً)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      استعراض الأسئلة الموزعة على مستويات الصعوبة (أساسي، متوسط، متقدم) مع نماذج الإجابة النموذجية وسلم التقييم المعتمد.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleGoToQuestionBank()}
                      className="w-full py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>فتح بنك الأسئلة المفلتر للوحدة</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
