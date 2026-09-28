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
  ChevronRight,
  ChevronLeft,
  Move,
  Layers,
  Sparkles,
  Info,
  Dumbbell,
  GraduationCap,
  Target,
  ArrowRight,
  ExternalLink,
  ChevronsUpDown,
  ChevronsDownUp,
  Plus,
  Minus
} from 'lucide-react';
import { MindMapLesson, MindMapNode, getLessonMindMap, MIND_MAP_UNITS } from '../../data/mindMaps';
import { useCurriculumFilter } from '../../context/CurriculumFilterContext';
import { curriculumRegistry } from '../../domain/curriculum/CurriculumRegistry';

/* ------------------------------------------------------------------ *
 * لوحة الألوان الرسمية المعتمدة من كتاب الخرائط الذهنية المطبوع
 * ------------------------------------------------------------------ */
const RIGHT_BRANCH_COLORS = [
  '#1E6BB8', // فرع 0: أزرق ملكي
  '#6B46C1', // فرع 1: بنفسجي عميق
  '#137A63', // فرع 2: زمردي / بترولي
  '#8E2A59', // فرع 3: توتي / عنابي داكن
  '#A0652F', // فرع 4: برونزي / كراميل دافئ
];

const LEFT_PANEL_COLORS = {
  rubric: '#6B2A82', // بنفسجي ملكي لسلم التقييم (الدرس 6)
  rules: '#334155',  // كحلي أردوازي لقواعد جوهرية
  rel: '#B46A28',    // عسلي دافئ لعلاقات مهمة
  traps: '#C83737',  // أحمر قرمزي لفخاخ شائعة
  solve: '#1E7E4E',  // أخضر غابي لدليل الحل السريع
} as const;

/* أرقام صفحات كتاب الخرائط الذهنية المطبوع */
const BOOK_PAGE_NUMBERS: Record<string, number> = {
  'lesson-1': 3,
  'lesson-2': 4,
  'lesson-2-5': 5,
  'lesson-3': 6,
  'lesson-4': 7,
  'lesson-5': 8,
  'lesson-6': 9,
  'u2-lesson-1': 10,
  'u2-lesson-2': 11,
  'u2-lesson-3': 12,
  'u2-lesson-4': 13,
  'u2-lesson-5': 14,
  'u2-lesson-6': 15,
};

/* أبعاد لوحة الرسم الهندسية الثابتة المتوافقة مع أبعاد A4 بالعرض (1440 × 900) */
const CANVAS_W = 1440;
const CANVAS_H = 900;
const CENTER_X = 720;
const CENTER_Y = 455;
const CENTER_W = 230;
const CENTER_H = 84;

export interface BilateralMindMapCanvasProps {
  lesson: MindMapLesson;
  onOpenSection?: (sectionId: string) => void;
  onOpenQuestions?: (payload: { questionIds?: string[]; hint?: string }) => void;
  onOpenTool?: (toolKey: string) => void;
  onSwitchToUnitMap?: () => void;
  className?: string;
}

interface SvgBezierPath {
  id: string;
  d: string;
  color: string;
  width: number;
}

interface RenderNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subTitle?: string;
  type: 'center' | 'pill' | 'card' | 'inter-card';
  color?: string;
  categoryLabel: string;
  sectionId?: string;
  isLeaf?: boolean;
  branchKey?: string;
  isCollapsed?: boolean;
  childCount?: number;
  canToggle?: boolean;
}

export const BilateralMindMapCanvas: React.FC<BilateralMindMapCanvasProps> = ({
  lesson: initialLesson,
  onOpenSection,
  onOpenQuestions,
  onOpenTool,
  onSwitchToUnitMap,
  className = '',
}) => {
  const navigate = useNavigate();
  const { selectUnit, selectLesson } = useCurriculumFilter();

  // معرف الدرس النشط المعروض
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLesson.id);

  // تحديث المعرف إذا تغيرت الخاصية الخارجية
  useEffect(() => {
    setActiveLessonId(initialLesson.id);
  }, [initialLesson.id]);

  // استرداد بيانات الدرس الحالي
  const currentLesson: MindMapLesson = useMemo(() => {
    const loaded = getLessonMindMap(activeLessonId);
    return loaded || initialLesson;
  }, [activeLessonId, initialLesson]);

  // معرفة الوحدة الحالية
  const currentUnit = useMemo(() => {
    for (const u of MIND_MAP_UNITS) {
      if (u.lessons.some((l) => l.id === currentLesson.id)) {
        return u;
      }
    }
    return {
      n: currentLesson.id.startsWith('u2') ? 2 : 1,
      label: currentLesson.id.startsWith('u2') ? 'الوحدة الثانية' : 'الوحدة الأولى',
      title: currentLesson.id.startsWith('u2')
        ? 'التسجيل المحاسبي والدورة المستندية'
        : 'أساسيات المحاسبة والتقارير المالية',
    };
  }, [currentLesson.id]);

  // أدوات التحكم: التكبير، التحريك، ملء الشاشة، والبحث
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<RenderNode | null>(null);

  // حالة طي وفرد الفروع ديناميكياً
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

  const collapseAll = useCallback(() => {
    const all = new Set<string>();
    all.add('left-rubric');
    all.add('left-rules');
    all.add('left-rel');
    all.add('left-traps');
    all.add('left-solve');
    currentLesson.map.b.forEach((_, idx) => {
      all.add(`right-${idx}`);
    });
    setCollapsedBranches(all);
  }, [currentLesson]);

  const expandAll = useCallback(() => {
    setCollapsedBranches(new Set());
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // حساب الارتفاع الديناميكي ليستوعب كل عنصر الكلام الموجود فيه بالكامل
  const calcAdaptiveHeight = (text: string, width: number): number => {
    const innerWidth = width - 20;
    const charsPerLine = Math.max(10, Math.floor(innerWidth / 7.2));
    const lines = Math.max(1, Math.ceil(text.length / charsPerLine));
    if (lines === 1) return 38;
    if (lines === 2) return 52;
    if (lines === 3) return 66;
    return Math.min(98, 32 + lines * 16);
  };

  // فحص تطابق البحث
  const isMatch = useCallback(
    (txt: string) => {
      if (!searchQuery.trim()) return false;
      return txt.toLowerCase().includes(searchQuery.trim().toLowerCase());
    },
    [searchQuery]
  );

  /* ------------------------------------------------------------------ *
   * محرك التخطيط الهندسي الشجري الدقيق 100% (Mathematical Tree Layout)
   * يدعم طي وفرد الفروع ديناميكياً مع إعادة الحساب التلقائي لكافة المسافات
   * ------------------------------------------------------------------ */
  const { nodes, paths } = useMemo(() => {
    const calculatedNodes: RenderNode[] = [];
    const calculatedPaths: SvgBezierPath[] = [];

    // دالة إنشاء منحنى بيزيير مكعب أفقي انسيابي (Smooth Horizontal S-Curve)
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

    // 1. العقدة المركزية الكحلية (Center Node)
    const centerNode: RenderNode = {
      id: 'node-center',
      x: CENTER_X - CENTER_W / 2,
      y: CENTER_Y - CENTER_H / 2,
      w: CENTER_W,
      h: CENTER_H,
      title: currentLesson.title,
      subTitle: `${currentUnit.label} · ${
        currentLesson.enrich ? 'الدرس 2.5 (إثرائي)' : `الدرس ${currentLesson.no}`
      }`,
      type: 'center',
      categoryLabel: `${currentUnit.label} · ${currentLesson.enrich ? 'درس إثرائي' : `الدرس ${currentLesson.no}`}`,
    };
    calculatedNodes.push(centerNode);

    const centerLeftAnchor = { x: CENTER_X - CENTER_W / 2, y: CENTER_Y };
    const centerRightAnchor = { x: CENTER_X + CENTER_W / 2, y: CENTER_Y };

    /* ---------------------------------------------------------------- *
     * 2. حساب الجناح الأيسر: ركائز الامتحان (قواعد، علاقات، فخاخ، حل، سلم)
     * ---------------------------------------------------------------- */
    const rubricBranch = currentLesson.map.b.find((branch) => branch.t.includes('سلم التقييم'));
    const rubricItems: string[] = rubricBranch && rubricBranch.c
      ? (typeof rubricBranch.c[0] !== 'string' && rubricBranch.c[0]?.c
          ? rubricBranch.c[0].c.map((item) => (typeof item === 'string' ? item : item.t))
          : [])
      : [];

    interface LeftGroup {
      key: keyof typeof LEFT_PANEL_COLORS;
      label: string;
      items: string[];
      color: string;
    }

    const leftGroups: LeftGroup[] = [];
    if (rubricItems.length > 0) {
      leftGroups.push({
        key: 'rubric',
        label: 'سلم التقييم (20 درجة)',
        items: rubricItems,
        color: LEFT_PANEL_COLORS.rubric,
      });
    }
    leftGroups.push(
      { key: 'rules', label: 'قواعد جوهرية', items: currentLesson.map.rules, color: LEFT_PANEL_COLORS.rules },
      { key: 'rel', label: 'علاقات مهمة', items: currentLesson.map.rel, color: LEFT_PANEL_COLORS.rel },
      { key: 'traps', label: 'فخاخ شائعة', items: currentLesson.map.traps, color: LEFT_PANEL_COLORS.traps },
      { key: 'solve', label: 'دليل الحل السريع', items: currentLesson.map.solve, color: LEFT_PANEL_COLORS.solve }
    );

    // حساب إجمالي الصفوف على اليسار مع أخذ الطي والفرد في الاعتبار
    const activeLeftGroups = leftGroups.filter((g) => g.items.length > 0);
    const totalLeftRows = activeLeftGroups.reduce((acc, g) => {
      const isCollapsed = collapsedBranches.has(`left-${g.key}`);
      return acc + (isCollapsed ? 1 : Math.max(g.items.length, 1));
    }, 0);

    const startYLeft = 95;
    const endYLeft = 825;
    const rowHeightLeft = (endYLeft - startYLeft) / Math.max(totalLeftRows, 1);

    let currentLeftRowIndex = 0;

    // مواضع الأعمدة على اليسار بأبعاد موسعة تستوعب كامل النصوص
    const leftPillW = 148;
    const leftPillH = 38;
    const leftPillX = 380;
    const leftCardW = 290;
    const leftCardX = 50;

    activeLeftGroups.forEach((group) => {
      const branchKey = `left-${group.key}`;
      const isCollapsed = collapsedBranches.has(branchKey);

      if (isCollapsed) {
        // الفرع مطوي: الكبسولة تأخذ صفاً واحداً ولا تُرسم البطاقات التابعة لها
        const rowCenterY = startYLeft + (currentLeftRowIndex + 0.5) * rowHeightLeft;
        currentLeftRowIndex++;

        const pillNode: RenderNode = {
          id: `left-pill-${group.key}`,
          x: leftPillX,
          y: rowCenterY - leftPillH / 2,
          w: leftPillW,
          h: leftPillH,
          title: group.label,
          type: 'pill',
          color: group.color,
          categoryLabel: 'ركيزة المراجعة للامتحان',
          branchKey,
          isCollapsed: true,
          childCount: group.items.length,
          canToggle: true,
        };
        calculatedNodes.push(pillNode);

        // خط من المركز إلى الكبسولة المطوية
        calculatedPaths.push(
          makeCurve(
            centerLeftAnchor.x,
            centerLeftAnchor.y,
            leftPillX + leftPillW,
            rowCenterY,
            group.color,
            2.2,
            `path-c-to-lpill-${group.key}`
          )
        );
      } else {
        // الفرع مفرود: رسم جميع البطاقات وحساب أطوالها بدقة
        const cardCenterYs: number[] = [];

        group.items.forEach((itemText, iIdx) => {
          const rowCenterY = startYLeft + (currentLeftRowIndex + 0.5) * rowHeightLeft;
          cardCenterYs.push(rowCenterY);

          // قياس ارتفاع البطاقة بناءً على كامل طول النص
          const cardH = calcAdaptiveHeight(itemText, leftCardW);
          const cardNode: RenderNode = {
            id: `left-card-${group.key}-${iIdx}`,
            x: leftCardX,
            y: rowCenterY - cardH / 2,
            w: leftCardW,
            h: cardH,
            title: itemText,
            type: 'card',
            categoryLabel: group.label,
            color: group.color,
            isLeaf: true,
          };
          calculatedNodes.push(cardNode);

          currentLeftRowIndex++;
        });

        // موضع الكبسولة Y هو المتوسط الحسابي الدقيق لبطاقاتها
        const pillCenterY =
          cardCenterYs.length > 0
            ? cardCenterYs.reduce((a, b) => a + b, 0) / cardCenterYs.length
            : startYLeft + (currentLeftRowIndex + 0.5) * rowHeightLeft;

        const pillNode: RenderNode = {
          id: `left-pill-${group.key}`,
          x: leftPillX,
          y: pillCenterY - leftPillH / 2,
          w: leftPillW,
          h: leftPillH,
          title: group.label,
          type: 'pill',
          color: group.color,
          categoryLabel: 'ركيزة المراجعة للامتحان',
          branchKey,
          isCollapsed: false,
          childCount: group.items.length,
          canToggle: true,
        };
        calculatedNodes.push(pillNode);

        // خط من المركز إلى الكبسولة
        calculatedPaths.push(
          makeCurve(
            centerLeftAnchor.x,
            centerLeftAnchor.y,
            leftPillX + leftPillW,
            pillCenterY,
            group.color,
            2.2,
            `path-c-to-lpill-${group.key}`
          )
        );

        // خطوط من الكبسولة إلى كل بطاقة تابعة
        cardCenterYs.forEach((cCenterY, cIdx) => {
          calculatedPaths.push(
            makeCurve(
              leftPillX,
              pillCenterY,
              leftCardX + leftCardW,
              cCenterY,
              group.color,
              1.8,
              `path-lpill-to-card-${group.key}-${cIdx}`
            )
          );
        });
      }
    });

    /* ---------------------------------------------------------------- *
     * 3. حساب الجناح الأيمن: موضوعات الدرس وتفرعاتها الشجرية مع الطي والفرد
     * ---------------------------------------------------------------- */
    const rightBranches = currentLesson.map.b.filter((branch) => !branch.t.includes('سلم التقييم'));

    // دالة لحساب عدد الأوراق النهائية لكل فرع
    const countBranchLeaves = (branch: MindMapNode): number => {
      if (!branch.c || branch.c.length === 0) return 1;
      return branch.c.reduce<number>((acc, child) => {
        if (typeof child === 'string') return acc + 1;
        if (child.c && child.c.length > 0) return acc + child.c.length;
        return acc + 1;
      }, 0);
    };

    // إجمالي عدد صفوف الجناح الأيمن مع أخذ الفروع المطوية في الاعتبار
    const totalRightLeaves = rightBranches.reduce((acc, b, bIdx) => {
      const isCollapsed = collapsedBranches.has(`right-${bIdx}`);
      return acc + (isCollapsed ? 1 : countBranchLeaves(b));
    }, 0);

    const startYRight = 95;
    const endYRight = 825;
    const leafHeightRight = (endYRight - startYRight) / Math.max(totalRightLeaves, 1);

    // مواضع الأعمدة على اليمين بأبعاد مستوعبة لكافة الكلمات
    const rightPillX = 875;
    const rightPillW = 165;
    const rightPillH = 38;

    const rightCol1X = 1070;
    const rightCol1W = 155; // للعقد الوسيطة
    const rightCol1FullW = 330; // للعقد الورقية المباشرة (يمتد حتى 1400)

    const rightCol2X = 1255;
    const rightCol2W = 155; // لأوراق المستوى الثاني

    let currentRightLeafIndex = 0;

    rightBranches.forEach((branch, bIdx) => {
      const branchKey = `right-${bIdx}`;
      const isCollapsed = collapsedBranches.has(branchKey);
      const branchColor = RIGHT_BRANCH_COLORS[bIdx % RIGHT_BRANCH_COLORS.length];
      const totalLeavesCount = countBranchLeaves(branch);

      if (isCollapsed) {
        // الفرع مطوي: الكبسولة تأخذ صفاً مخصصاً وتخفى عناصرها
        const leafY = startYRight + (currentRightLeafIndex + 0.5) * leafHeightRight;
        currentRightLeafIndex++;

        const branchPillNode: RenderNode = {
          id: `right-pill-${bIdx}`,
          x: rightPillX,
          y: leafY - rightPillH / 2,
          w: rightPillW,
          h: rightPillH,
          title: branch.t,
          type: 'pill',
          color: branchColor,
          categoryLabel: `موضوع الدرس (${bIdx + 1})`,
          sectionId: branch.sec,
          branchKey,
          isCollapsed: true,
          childCount: totalLeavesCount,
          canToggle: true,
        };
        calculatedNodes.push(branchPillNode);

        // خط من المركز إلى كبسولة الفرع المطوي
        calculatedPaths.push(
          makeCurve(
            centerRightAnchor.x,
            centerRightAnchor.y,
            rightPillX,
            leafY,
            branchColor,
            2.2,
            `path-c-to-rpill-${bIdx}`
          )
        );
      } else {
        // الفرع مفرود
        const branchLeafYs: number[] = [];

        branch.c?.forEach((child, cIdx) => {
          const isString = typeof child === 'string';
          const childTitle = isString ? child : child.t;
          const grandChildren = !isString && child.c ? child.c : [];

          if (grandChildren.length === 0) {
            // بطاقة ورقية مباشرة في المستوى الأول
            const leafY = startYRight + (currentRightLeafIndex + 0.5) * leafHeightRight;
            branchLeafYs.push(leafY);
            currentRightLeafIndex++;

            const cardH = calcAdaptiveHeight(childTitle, rightCol1FullW);
            const leafNode: RenderNode = {
              id: `right-l1-${bIdx}-${cIdx}`,
              x: rightCol1X,
              y: leafY - cardH / 2,
              w: rightCol1FullW,
              h: cardH,
              title: childTitle,
              type: 'card',
              color: branchColor,
              categoryLabel: branch.t,
              sectionId: branch.sec,
              isLeaf: true,
            };
            calculatedNodes.push(leafNode);
          } else {
            // عقدة وسيطة يتفرع عنها أوراق المستوى الثاني
            const subLeafYs: number[] = [];

            grandChildren.forEach((sub, sIdx) => {
              const subTitle = typeof sub === 'string' ? sub : sub.t;
              const subY = startYRight + (currentRightLeafIndex + 0.5) * leafHeightRight;
              subLeafYs.push(subY);
              branchLeafYs.push(subY);
              currentRightLeafIndex++;

              const subCardH = calcAdaptiveHeight(subTitle, rightCol2W);
              const subNode: RenderNode = {
                id: `right-l2-${bIdx}-${cIdx}-${sIdx}`,
                x: rightCol2X,
                y: subY - subCardH / 2,
                w: rightCol2W,
                h: subCardH,
                title: subTitle,
                type: 'card',
                color: branchColor,
                categoryLabel: `${branch.t} ← ${childTitle}`,
                sectionId: branch.sec,
                isLeaf: true,
              };
              calculatedNodes.push(subNode);
            });

            // موضع العقدة الوسيطة هو منتصف أوراقها
            const interY = subLeafYs.reduce((a, b) => a + b, 0) / subLeafYs.length;
            const interH = calcAdaptiveHeight(childTitle, rightCol1W);
            const interNode: RenderNode = {
              id: `right-l1-inter-${bIdx}-${cIdx}`,
              x: rightCol1X,
              y: interY - interH / 2,
              w: rightCol1W,
              h: interH,
              title: childTitle,
              type: 'inter-card',
              color: branchColor,
              categoryLabel: branch.t,
              sectionId: branch.sec,
            };
            calculatedNodes.push(interNode);

            // خطوط من العقدة الوسيطة إلى كل ورقة فرعية
            subLeafYs.forEach((sY, sIdx) => {
              calculatedPaths.push(
                makeCurve(
                  rightCol1X + rightCol1W,
                  interY,
                  rightCol2X,
                  sY,
                  branchColor,
                  1.7,
                  `path-inter-to-l2-${bIdx}-${cIdx}-${sIdx}`
                )
              );
            });
          }
        });

        // موضع كبسولة الفرع هو منتصف جميع أوراقه
        const branchCenterY =
          branchLeafYs.length > 0
            ? branchLeafYs.reduce((a, b) => a + b, 0) / branchLeafYs.length
            : startYRight + leafHeightRight;

        const branchPillNode: RenderNode = {
          id: `right-pill-${bIdx}`,
          x: rightPillX,
          y: branchCenterY - rightPillH / 2,
          w: rightPillW,
          h: rightPillH,
          title: branch.t,
          type: 'pill',
          color: branchColor,
          categoryLabel: `موضوع الدرس (${bIdx + 1})`,
          sectionId: branch.sec,
          branchKey,
          isCollapsed: false,
          childCount: totalLeavesCount,
          canToggle: true,
        };
        calculatedNodes.push(branchPillNode);

        // خط من المركز (يمين) إلى كبسولة الفرع (يسار)
        calculatedPaths.push(
          makeCurve(
            centerRightAnchor.x,
            centerRightAnchor.y,
            rightPillX,
            branchCenterY,
            branchColor,
            2.2,
            `path-c-to-rpill-${bIdx}`
          )
        );

        // خطوط من كبسولة الفرع إلى أطفال المستوى الأول
        branch.c?.forEach((child, cIdx) => {
          const isString = typeof child === 'string';
          const grandChildren = !isString && child.c ? child.c : [];

          if (grandChildren.length === 0) {
            const l1Node = calculatedNodes.find((n) => n.id === `right-l1-${bIdx}-${cIdx}`);
            if (l1Node) {
              calculatedPaths.push(
                makeCurve(
                  rightPillX + rightPillW,
                  branchCenterY,
                  l1Node.x,
                  l1Node.y + l1Node.h / 2,
                  branchColor,
                  1.8,
                  `path-rpill-to-l1-${bIdx}-${cIdx}`
                )
              );
            }
          } else {
            const interNode = calculatedNodes.find((n) => n.id === `right-l1-inter-${bIdx}-${cIdx}`);
            if (interNode) {
              calculatedPaths.push(
                makeCurve(
                  rightPillX + rightPillW,
                  branchCenterY,
                  interNode.x,
                  interNode.y + interNode.h / 2,
                  branchColor,
                  1.8,
                  `path-rpill-to-inter-${bIdx}-${cIdx}`
                )
              );
            }
          }
        });
      }
    });

    return { nodes: calculatedNodes, paths: calculatedPaths };
  }, [currentLesson, currentUnit, collapsedBranches]);

  // تبديل ملء الشاشة
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // معالجة التحريك بالسحب (Pan on drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    // تفعيل السحب فقط بالزر الأيسر أو الأوسط
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

  const pageNumber = BOOK_PAGE_NUMBERS[currentLesson.id] || 3;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col bg-[#F8FAFC] rounded-2xl border border-[#CBD5E1] shadow-sm overflow-hidden select-none ${className}`}
      dir="rtl"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* ------------------------------------------------------------------ *
       * شريط الأدوات العلوي المتقدم (محدد الدروس، البحث، التكبير، والطباعة)
       * ------------------------------------------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-white border-b border-[#CBD5E1] shadow-2xs z-30 print:hidden">
        {/* التبديل بين الدروس وزر خريطة الوحدة الشاملة */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {onSwitchToUnitMap && (
            <button
              type="button"
              onClick={onSwitchToUnitMap}
              className="flex items-center gap-1.5 px-3 h-7 rounded-lg text-xs font-bold bg-[#F8FAFC] hover:bg-amber-50 text-amber-900 border border-amber-300 transition shadow-2xs whitespace-nowrap cursor-pointer"
              title="الانتقال إلى خريطة الوحدة الشاملة"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>خريطة الوحدة الشاملة</span>
            </button>
          )}

          <span className="text-xs font-bold text-slate-500 ml-1 whitespace-nowrap flex items-center gap-1">
            <span>الدروس:</span>
          </span>

          {/* محدد الدروس بحسب الوحدة الحالية وجميع الوحدات المتاحة */}
          {MIND_MAP_UNITS.map((u) => (
            <div key={u.n} className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-extrabold text-slate-500 px-1">{`و${u.n}`}</span>
              {u.lessons.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setActiveLessonId(l.id);
                    setSelectedNode(null);
                  }}
                  className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeLessonId === l.id
                      ? 'bg-[#1E293B] text-white shadow-xs scale-105'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                  title={`${u.label} · ${l.enrich ? 'درس إثرائي' : `الدرس ${l.no}`}: ${l.title}`}
                >
                  {l.enrich ? `${l.no}*` : l.no}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* البحث، الطي والفرد، التكبير والتصغير، والطباعة */}
        <div className="flex items-center gap-2 mr-auto">
          {/* حقل البحث اللحظي */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مفهوم..."
              className="w-32 sm:w-44 pr-8 pl-6 py-1 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-500 text-slate-800 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-4 w-px bg-slate-300" />

          {/* أزرار الطي والفرد الشاملة لجميع الفروع */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={expandAll}
              title="فرد جميع الفروع وإظهار كافة التفاصيل"
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
              title="طي جميع الفروع لعرض ملخص العناوين الرئيسية فقط"
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

          {/* أزرار التكبير والتصغير وضبط العرض */}
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
              title="إعادة ضبط الموضع والحجم 100%"
              className="p-1.5 rounded text-slate-600 hover:bg-white hover:shadow-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* طباعة A4 مطابقة للكتاب */}
          <button
            type="button"
            onClick={() => window.print()}
            title="طباعة الخريطة بجودة A4 مطابقة تماماً للكتاب"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* وضع ملء الشاشة */}
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
       * منصة العرض والتحريك التفاعلية (Interactive Canvas Area)
       * ------------------------------------------------------------------ */}
      <div
        className="w-full overflow-hidden flex items-center justify-center bg-[#E2E8F0] min-h-[720px] p-4 sm:p-8 cursor-grab active:cursor-grabbing print:p-0 print:bg-white print:m-0"
        onMouseDown={handleMouseDown}
      >
        {/* صفحة الكتاب المطبوع البيضاء المطابقة تماماً لورقة الكتاب (1440 × 900) */}
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
          {/* 1. ترويسة الصفحة المطبوعة (Header) */}
          <div className="absolute top-0 inset-x-0 px-12 pt-7 z-10 pointer-events-none">
            <div className="flex items-center justify-between pb-2 text-sm text-[#334155] font-semibold">
              <div className="text-right">
                {currentUnit.label} · {currentUnit.title}
              </div>
              <div className="text-left font-bold text-[#1E293B]">
                {currentLesson.enrich ? 'درس إثرائي' : `الدرس ${currentLesson.no}`}
              </div>
            </div>
            {/* خط الترويسة الفاصل المطابق للكتاب */}
            <div className="w-full h-px bg-[#CBD5E1]" />
          </div>

          {/* 2. طبقة خطوط الربط المنحنية الهندسية (SVG Vector Curves) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            width={CANVAS_W}
            height={CANVAS_H}
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          >
            <defs>
              {/* تدرج أنيق للخطوط إن رغبنا */}
              <filter id="glow-subtle" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.08" />
              </filter>
            </defs>

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

          {/* 3. طبقة عناصر الخريطة (Nodes: Center, Pills, Cards) */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            {nodes.map((node) => {
              const matched = isMatch(node.title);
              const isSelected = selectedNode?.id === node.id;

              // أ. العقدة المركزية الكحلية
              if (node.type === 'center') {
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
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
                  </div>
                );
              }

              // ب. الكبسولات الملونة (Pills) مع إمكانية الطي والفرد التفاعلي
              if (node.type === 'pill') {
                const isBranchCollapsed = Boolean(node.isCollapsed);
                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      if (node.canToggle && node.branchKey) {
                        toggleBranch(node.branchKey);
                      }
                      setSelectedNode(node);
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

              // ج. البطاقات البيضاء والعقد الوسيطة (المستوى الأول والثاني واليسار)
              // تستوعب كامل النصوص بدقة ووضوح وبدون قص (No clipping)
              const isInterCard = node.type === 'inter-card';
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  title={node.title}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.w}px`,
                    height: `${node.h}px`,
                  }}
                  className={`absolute pointer-events-auto rounded-lg border flex items-center justify-center text-center px-2.5 py-1 cursor-pointer shadow-2xs transition-all duration-150 group ${
                    isInterCard
                      ? 'bg-[#F1F5F9] border-slate-300 font-bold'
                      : 'bg-white border-[#CBD5E1]'
                  } ${
                    matched
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400 font-bold text-amber-950'
                      : isSelected
                      ? 'border-slate-800 ring-2 ring-slate-800 shadow-sm bg-slate-50'
                      : 'text-[#1E293B] hover:border-slate-400 hover:shadow-xs hover:scale-[1.02]'
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
                </div>
              );
            })}
          </div>

          {/* 4. تذييل الصفحة المطبوعة (Footer) */}
          <div className="absolute bottom-0 inset-x-0 px-12 pb-7 z-10 pointer-events-none">
            {/* خط التذييل الفاصل المطابق للكتاب */}
            <div className="w-full h-px bg-[#CBD5E1]" />
            <div className="flex items-center justify-between pt-2 text-xs text-[#64748B] font-medium">
              <div className="text-right">
                خرائط المنهج الذهنية – المحاسبة ببساطة وإتقان · بكالوريا 2027
              </div>
              <div className="text-left font-mono font-bold text-[#334155] text-sm">
                {pageNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ *
       * لوحة التفاعل السفلية المنبثقة عند النقر على أي عقدة في الخريطة
       * ------------------------------------------------------------------ */}
      {selectedNode && (
        <div className="sticky bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#CBD5E1] p-4 shadow-xl z-40 flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-bottom-2 duration-200">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-2xs"
                style={{ backgroundColor: selectedNode.color || '#1E293B' }}
              >
                {selectedNode.categoryLabel}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{selectedNode.title}</h4>
            </div>
            {selectedNode.subTitle && (
              <p className="text-xs text-slate-500 font-medium">{selectedNode.subTitle}</p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* 1. قراءة الشرح بالدرس */}
            <button
              type="button"
              onClick={() => {
                if (selectedNode.sectionId && onOpenSection) {
                  onOpenSection(selectedNode.sectionId);
                } else {
                  navigate(`/curriculum/unit-${currentUnit.n}/lessons/lesson-${currentLesson.no}`);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] text-white text-xs font-bold hover:bg-slate-700 transition shadow-xs cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{selectedNode.sectionId ? 'اقرأ الشرح في الدرس' : 'صفحة الدرس والشرح'}</span>
            </button>

            {/* 2. تدريبات وتمارين الدرس التفاعلية */}
            <button
              type="button"
              onClick={() => {
                navigate(`/training/exercises?unit=unit-${currentUnit.n}&lesson=${currentLesson.id}`);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition shadow-2xs cursor-pointer"
            >
              <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
              <span>التدريبات التطبيقية</span>
            </button>

            {/* 3. أسئلة بنك الأسئلة للمفهوم */}
            <button
              type="button"
              onClick={() => {
                if (onOpenQuestions) {
                  onOpenQuestions({ hint: selectedNode.title });
                } else {
                  selectUnit(`unit-${currentUnit.n}`);
                  selectLesson(`unit-${currentUnit.n}`, currentLesson.id);
                  navigate('/assessment/question-bank');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              <ListChecks className="w-3.5 h-3.5 text-blue-600" />
              <span>أسئلة هذا المفهوم</span>
            </button>

            {/* 4. اختبار الوحدة الشامل */}
            <button
              type="button"
              onClick={() => {
                navigate('/assessment/unit-tests');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-800 text-xs font-bold hover:bg-purple-100 transition shadow-2xs cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
              <span>اختبار الوحدة</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition mr-1 cursor-pointer"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
