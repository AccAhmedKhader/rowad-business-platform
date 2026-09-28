import { describe, it, expect } from 'vitest';
import { allLessons, unit1EnrichmentLesson } from '../lessonsData';
import {
  MIND_MAP_UNITS,
  MIND_MAP_LESSON_COUNT,
  getLessonMindMap,
  getUnitMindMapBySlug,
  type MindMapNode,
} from '../mindMaps';

const mapLessons = MIND_MAP_UNITS.flatMap((u) => u.lessons);
// allLessons لا يتضمن الدرس الإثرائي للوحدة الأولى، وهو مُصدَّر منفصلاً
const curriculumLessons = [...allLessons, unit1EnrichmentLesson];
const curriculumIds = new Set(curriculumLessons.map((l) => l.id));

const walk = (nodes: (string | MindMapNode)[]): MindMapNode[] =>
  nodes.flatMap((n) =>
    typeof n === 'string' ? [] : [n, ...walk(n.c ?? [])]
  );

describe('خرائط المنهج الذهنية', () => {
  it('تغطي كل دروس المنهج بلا زيادة ولا نقصان', () => {
    const mapIds = new Set(mapLessons.map((l) => l.id));
    const missing = [...curriculumIds].filter((id) => !mapIds.has(id));
    const orphan = [...mapIds].filter((id) => !curriculumIds.has(id));
    expect(missing).toEqual([]);
    expect(orphan).toEqual([]);
  });

  it('تحتوي 10 وحدات و59 درساً', () => {
    expect(MIND_MAP_UNITS).toHaveLength(10);
    expect(MIND_MAP_LESSON_COUNT).toBe(59);
  });

  it('لا تكرر معرّف درس', () => {
    const ids = mapLessons.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('كل درس له فرع واحد على الأقل وفئاته الأربع معرّفة', () => {
    for (const lesson of mapLessons) {
      expect(lesson.map.b.length, lesson.id).toBeGreaterThan(0);
      expect(Array.isArray(lesson.map.rules), lesson.id).toBe(true);
      expect(Array.isArray(lesson.map.rel), lesson.id).toBe(true);
      expect(Array.isArray(lesson.map.traps), lesson.id).toBe(true);
      expect(Array.isArray(lesson.map.solve), lesson.id).toBe(true);
    }
  });

  it('كل مرجع sec يشير إلى قسم موجود فعلاً في الدرس', () => {
    const problems: string[] = [];
    for (const lesson of mapLessons) {
      const source = curriculumLessons.find((l) => l.id === lesson.id);
      const sectionIds = new Set((source?.sections ?? []).map((s) => s.id));
      for (const node of walk(lesson.map.b)) {
        if (node.sec && !sectionIds.has(node.sec)) {
          problems.push(`${lesson.id} → ${node.sec}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('الدوال المساعدة تعمل بالمعرّف وبالـslug', () => {
    expect(getLessonMindMap('lesson-1')?.no).toBe(1);
    expect(getLessonMindMap('غير-موجود')).toBeUndefined();
    expect(getUnitMindMapBySlug('unit-7')?.n).toBe(7);
    expect(getUnitMindMapBySlug(7)?.n).toBe(7);
  });
});
