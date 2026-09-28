import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronDown,
  Compass,
  Link2Off,
  ListChecks,
  Scale,
  TriangleAlert,
  Zap,
} from 'lucide-react';
import {
  getLessonMindMap,
  getUnitMindMapBySlug,
  type MindMapNode,
  type MindMapLesson,
} from '../data/mindMaps';
import { BilateralMindMapCanvas } from './mindmap/BilateralMindMapCanvas';
import { UnitBilateralMindMapCanvas } from './mindmap/UnitBilateralMindMapCanvas';
import { LayoutGrid, Network, MapPin } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * ألوان الخريطة — مطابقة لألوان الكتاب المطبوع حتى يتعرّف الطالب على
 * نفس الفئات في الورق وعلى الشاشة.
 * ------------------------------------------------------------------ */
const PANELS = {
  rules: {
    label: 'قواعد جوهرية',
    Icon: Scale,
    dot: 'bg-[#3F4A59]',
    edge: 'border-r-[#3F4A59]',
  },
  rel: {
    label: 'علاقات مهمة',
    Icon: Compass,
    dot: 'bg-[#B4813A]',
    edge: 'border-r-[#B4813A]',
  },
  traps: {
    label: 'فخاخ شائعة',
    Icon: TriangleAlert,
    dot: 'bg-[#B4413F]',
    edge: 'border-r-[#B4413F]',
  },
  solve: {
    label: 'دليل الحل السريع',
    Icon: Zap,
    dot: 'bg-[#2F6B4F]',
    edge: 'border-r-[#2F6B4F]',
  },
} as const;

type PanelKey = keyof typeof PANELS;

export interface MindMapViewProps {
  /** معرّف الدرس كما في src/data (مثال: 'lesson-7-1') */
  lessonId: string;
  /** يفتح قسم الشرح المقابل للفرع */
  onOpenSection?: (sectionId: string) => void;
  /** يفتح أسئلة مرتبطة بعقدة أو بفخ */
  onOpenQuestions?: (payload: { questionIds?: string[]; hint?: string }) => void;
  /** يفتح محاكياً أو استوديو تفاعلياً */
  onOpenTool?: (toolKey: string) => void;
  /** يظهر تنبيهاً على الفروع التي لا شرح خلفها — للمحرّر لا للطالب */
  editorMode?: boolean;
  /** ترويسة العنوان: تُخفى عند تضمين الخريطة داخل صفحة تعرض العنوان أصلاً */
  showHeader?: boolean;
  className?: string;
}

const asNode = (n: string | MindMapNode): MindMapNode =>
  typeof n === 'string' ? { t: n } : n;

/* ------------------------------ العقدة ------------------------------ */

const Leaf: React.FC<{ node: MindMapNode; depth: number }> = ({ node, depth }) => (
  <li
    className={`relative border-r border-[#E4DED0] pr-4 leading-relaxed ${
      depth === 1 ? 'text-[15px]' : 'text-sm'
    } text-[#454540]`}
  >
    <span className="absolute right-[-4px] top-[0.65em] h-[7px] w-[7px] rounded-full bg-[#C4A484]" />
    {node.t}
    {node.c && node.c.length > 0 && (
      <ul className="mt-2 space-y-2">
        {node.c.map((child, i) => (
          <Leaf key={i} node={asNode(child)} depth={depth + 1} />
        ))}
      </ul>
    )}
  </li>
);

const Branch: React.FC<{
  node: MindMapNode;
  index: number;
  open: boolean;
  onToggle: () => void;
  onOpenSection?: (id: string) => void;
  onOpenTool?: (key: string) => void;
  onOpenQuestions?: (p: { questionIds?: string[]; hint?: string }) => void;
  editorMode?: boolean;
}> = ({ node, index, open, onToggle, onOpenSection, onOpenTool, onOpenQuestions, editorMode }) => {
  const hasExplanation = Boolean(node.sec);
  const panelId = `mindmap-branch-${index}`;

  return (
    <section className="rounded-lg border border-[#E4DED0] bg-white">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-right transition-colors hover:bg-[#F9F7F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A484]"
        >
          {open ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-[#C4A484]" aria-hidden />
          ) : (
            <ChevronLeft className="h-4 w-4 shrink-0 text-[#C4A484]" aria-hidden />
          )}
          <span className="flex-1 font-semibold text-[#1D1D1B]">{node.t}</span>
          {editorMode && !hasExplanation && (
            <span className="flex items-center gap-1 rounded-full bg-[#FBEEEC] px-2 py-0.5 text-xs text-[#B4413F]">
              <Link2Off className="h-3 w-3" aria-hidden />
              بلا شرح
            </span>
          )}
          {editorMode && node.linkConfidence === 'auto' && (
            <span className="rounded-full bg-[#FAF3E4] px-2 py-0.5 text-xs text-[#B4813A]">
              ربط آلي
            </span>
          )}
        </button>
      </h3>

      {open && (
        <div id={panelId} className="px-4 pb-4">
          <ul className="space-y-2 pr-1">
            {(node.c ?? []).map((child, i) => (
              <Leaf key={i} node={asNode(child)} depth={1} />
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#F0EBE0] pt-3">
            {node.sec && onOpenSection && (
              <button
                type="button"
                onClick={() => onOpenSection(node.sec!)}
                className="flex items-center gap-2 rounded-md bg-[#1D1D1B] px-3 py-1.5 text-sm text-[#F9F7F2] transition-colors hover:bg-[#333330] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A484]"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                اقرأ الشرح
              </button>
            )}
            {node.q && node.q.length > 0 && onOpenQuestions && (
              <button
                type="button"
                onClick={() => onOpenQuestions({ questionIds: node.q })}
                className="flex items-center gap-2 rounded-md border border-[#C4A484] px-3 py-1.5 text-sm text-[#1D1D1B] transition-colors hover:bg-[#F9F7F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A484]"
              >
                <ListChecks className="h-4 w-4" aria-hidden />
                تدرّب على {node.q.length} أسئلة
              </button>
            )}
            {node.tool && onOpenTool && (
              <button
                type="button"
                onClick={() => onOpenTool(node.tool!)}
                className="flex items-center gap-2 rounded-md border border-[#C4A484] px-3 py-1.5 text-sm text-[#1D1D1B] transition-colors hover:bg-[#F9F7F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A484]"
              >
                <Zap className="h-4 w-4" aria-hidden />
                افتح المحاكي
              </button>
            )}
            {!node.sec && !editorMode && (
              <p className="text-sm text-[#8A857A]">هذا الفرع للمراجعة السريعة فقط.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

/* ------------------------- لوحات الفئات الأربع ------------------------- */

const Panel: React.FC<{
  kind: PanelKey;
  items: string[];
  onOpenQuestions?: (p: { questionIds?: string[]; hint?: string }) => void;
}> = ({ kind, items, onOpenQuestions }) => {
  if (!items.length) return null;
  const { label, Icon, dot, edge } = PANELS[kind];
  const trainable = kind === 'traps' && Boolean(onOpenQuestions);

  return (
    <section className={`rounded-lg border border-[#E4DED0] border-r-4 ${edge} bg-white p-4`}>
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-[#1D1D1B]">
        <span className={`flex h-6 w-6 items-center justify-center rounded ${dot}`}>
          <Icon className="h-3.5 w-3.5 text-white" aria-hidden />
        </span>
        {label}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[15px] leading-relaxed text-[#454540]">
            <span className={`mt-[0.6em] h-[6px] w-[6px] shrink-0 rounded-full ${dot}`} />
            <span className="flex-1">{item}</span>
            {trainable && (
              <button
                type="button"
                onClick={() => onOpenQuestions!({ hint: item })}
                className="shrink-0 rounded px-2 py-0.5 text-xs text-[#B4413F] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B4413F]"
              >
                تدرّب عليه
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

/* --------------------------- خريطة الدرس --------------------------- */

export const MindMapView: React.FC<MindMapViewProps> = ({
  lessonId,
  onOpenSection,
  onOpenQuestions,
  onOpenTool,
  editorMode = false,
  showHeader = true,
  className = '',
}) => {
  const lesson: MindMapLesson | undefined = useMemo(
    () => getLessonMindMap(lessonId),
    [lessonId]
  );
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [displayMode, setDisplayMode] = useState<'canvas' | 'list'>('canvas');

  if (!lesson) {
    return (
      <div className={`rounded-lg border border-dashed border-[#E4DED0] bg-[#F9F7F2] p-6 text-center text-[#8A857A] ${className}`}>
        لا توجد خريطة ذهنية لهذا الدرس بعد.
      </div>
    );
  }

  const { map } = lesson;

  return (
    <div className={`space-y-4 ${className}`} dir="rtl">
      {showHeader && (
        <header className="rounded-xl bg-[#1D1D1B] px-6 py-5 text-[#F9F7F2] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-[#C4A484]">
              {lesson.enrich ? 'درس إثرائي' : `الدرس ${lesson.no}`}
            </p>
            <h2 className="mt-1 text-xl font-bold leading-snug md:text-2xl">{lesson.title}</h2>
            {lesson.sub && (
              <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-[#D8D3C7]">{lesson.sub}</p>
            )}
          </div>

          <div className="flex items-center gap-1 bg-[#2C2C28] p-1 rounded-lg self-start md:self-center shrink-0">
            <button
              type="button"
              onClick={() => setDisplayMode('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                displayMode === 'canvas'
                  ? 'bg-[#F9F7F2] text-[#1D1D1B]'
                  : 'text-[#D8D3C7] hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>خريطة الكتاب التفاعلية</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                displayMode === 'list'
                  ? 'bg-[#F9F7F2] text-[#1D1D1B]'
                  : 'text-[#D8D3C7] hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>عرض القائمة والبطاقات</span>
            </button>
          </div>
        </header>
      )}

      {/* شريط تبديل العرض إذا كان showHeader = false */}
      {!showHeader && (
        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-1 bg-[#F0ECE1] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setDisplayMode('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                displayMode === 'canvas'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                  : 'text-[#555] hover:text-[#111]'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>خريطة الكتاب التفاعلية (الشكل المطبوع)</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                displayMode === 'list'
                  ? 'bg-[#1D1D1B] text-[#F9F7F2] shadow-xs'
                  : 'text-[#555] hover:text-[#111]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>عرض القائمة والبطاقات</span>
            </button>
          </div>

          <span className="text-xs text-[#8A857A] hidden sm:inline">
            خريطة ذهنية تفاعلية ثنائية الأجنحة مع أدوات التكبير والبحث والتنقل
          </span>
        </div>
      )}

      {/* العرض 1: خريطة الكتاب التفاعلية ثنائية الجناحين */}
      {displayMode === 'canvas' && (
        <BilateralMindMapCanvas
          lesson={lesson}
          onOpenSection={onOpenSection}
          onOpenQuestions={onOpenQuestions}
          onOpenTool={onOpenTool}
        />
      )}

      {/* العرض 2: عرض القائمة والبطاقات */}
      {displayMode === 'list' && (
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-3">
            <p className="text-sm text-[#8A857A]">
              افتح أي فرع لترى تفاصيله، ثم انتقل منه إلى الشرح أو التدريب.
            </p>
            {map.b.map((branch, i) => (
              <Branch
                key={i}
                node={branch}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                onOpenSection={onOpenSection}
                onOpenTool={onOpenTool}
                onOpenQuestions={onOpenQuestions}
                editorMode={editorMode}
              />
            ))}
          </div>

          <div className="space-y-4">
            <Panel kind="rules" items={map.rules} />
            <Panel kind="rel" items={map.rel} />
            <Panel kind="traps" items={map.traps} onOpenQuestions={onOpenQuestions} />
            <Panel kind="solve" items={map.solve} />
          </div>
        </div>
      )}
    </div>
  );
};

/* --------------------------- خريطة الوحدة --------------------------- */

export interface UnitMindMapViewProps {
  /** 'unit-1', 'unit-7' أو 7 */
  unit: string | number;
  onSelectLesson?: (lessonId: string) => void;
  onSelectLessonMindMap?: (lessonId: string) => void;
  /** يُستخدم لتعطيل درس لا يوجد له مسار في التطبيق بعد */
  isLessonAvailable?: (lessonId: string) => boolean;
  defaultMode?: 'canvas' | 'cards';
  className?: string;
}

export const UnitMindMapView: React.FC<UnitMindMapViewProps> = ({
  unit,
  onSelectLesson,
  onSelectLessonMindMap,
  isLessonAvailable,
  defaultMode = 'canvas',
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<'canvas' | 'cards'>(defaultMode);
  const data = useMemo(() => getUnitMindMapBySlug(unit), [unit]);

  if (!data) {
    return (
      <div className={`rounded-lg border border-dashed border-[#E4DED0] bg-[#F9F7F2] p-6 text-center text-[#8A857A] ${className}`}>
        لا توجد خريطة لهذه الوحدة.
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`} dir="rtl">
      {/* شريط التحكم بالنمط (خريطة كانفاس هندسية تفاعلية vs شبكة بطاقات) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-[#C4A484]">{data.label}</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#1D1D1B]">{data.title}</h2>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'canvas'
                ? 'bg-[#1E293B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>الخريطة الذهنية الشاملة (Canvas)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-[#1E293B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>قائمة وبطاقات الدروس</span>
          </button>
        </div>
      </div>

      {viewMode === 'canvas' ? (
        <UnitBilateralMindMapCanvas
          unitId={unit}
          onSelectLessonMindMap={(lessonId) => {
            if (onSelectLessonMindMap) {
              onSelectLessonMindMap(lessonId);
            } else if (onSelectLesson) {
              onSelectLesson(lessonId);
            }
          }}
        />
      ) : (
        <ol className="grid gap-3 md:grid-cols-2">
          {data.lessons.map((lesson) => {
            const available = isLessonAvailable ? isLessonAvailable(lesson.id) : true;
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  disabled={!available}
                  onClick={() => onSelectLesson?.(lesson.id)}
                  className={`h-full w-full rounded-lg border p-4 text-right transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A484] ${
                    available
                      ? 'border-[#E4DED0] bg-white hover:border-[#C4A484] hover:bg-[#F9F7F2]'
                      : 'cursor-not-allowed border-dashed border-[#E4DED0] bg-[#F9F7F2] opacity-70'
                  }`}
                >
                  <span className="text-sm text-[#C4A484]">
                    {lesson.enrich ? 'درس إثرائي' : `الدرس ${lesson.no}`}
                  </span>
                  <span className="mt-1 block font-semibold leading-snug text-[#1D1D1B]">
                    {lesson.title}
                  </span>
                  <span className="mt-2 block text-sm text-[#8A857A]">
                    {available
                      ? `${lesson.map.b.length} فروع · ${lesson.map.traps.length} فخاخ`
                      : 'الخريطة جاهزة — صفحة الدرس لم تُفتح بعد'}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default MindMapView;
