import { AccountingGlossaryItem, GlossaryUnitConfig, SupportedGlossaryUnitId, AccountingGlossaryCategory } from './types';
import { unit1GlossaryTerms } from './unit1Terms';
import { unit2GlossaryTerms } from './unit2Terms';
import { unit3GlossaryTerms } from './unit3Terms';
import { unit4GlossaryTerms } from './unit4Terms';
import { unit5GlossaryTerms } from './unit5Terms';
import { unit6GlossaryTerms } from './unit6Terms';
import { unit7GlossaryTerms } from './unit7Terms';
import { unit8GlossaryTerms } from './unit8Terms';
import { unit9GlossaryTerms } from './unit9Terms';
import { unit10GlossaryTerms } from './unit10Terms';

export * from './types';

export const allGlossaryTerms: AccountingGlossaryItem[] = [
  ...unit1GlossaryTerms,
  ...unit2GlossaryTerms,
  ...unit3GlossaryTerms,
  ...unit4GlossaryTerms,
  ...unit5GlossaryTerms,
  ...unit6GlossaryTerms,
  ...unit7GlossaryTerms,
  ...unit8GlossaryTerms,
  ...unit9GlossaryTerms,
  ...unit10GlossaryTerms
];

export const accountingGlossary: AccountingGlossaryItem[] = allGlossaryTerms;

export const GLOSSARY_UNITS_CONFIG: GlossaryUnitConfig[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'الوحدة الأولى: المبادئ والمفاهيم المحاسبية',
    shortTitle: 'الوحدة 1 (المبادئ والمعادلة)',
    officialPages: 'ص 5 - 42',
    termsCount: unit1GlossaryTerms.length
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'الوحدة الثانية: التسجيل المحاسبي والدورة المستندية',
    shortTitle: 'الوحدة 2 (التسجيل والترحيل)',
    officialPages: 'ص 43 - 82',
    termsCount: unit2GlossaryTerms.length
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'الوحدة الثالثة: دفاتر اليومية والأستاذ المساعدة',
    shortTitle: 'الوحدة 3 (اليوميات المساعدة)',
    officialPages: 'ص 83 - 122',
    termsCount: unit3GlossaryTerms.length
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'الوحدة الرابعة: تصحيح الأخطاء المحاسبية والحساب المعلق',
    shortTitle: 'الوحدة 4 (تصحيح الأخطاء)',
    officialPages: 'ص 123 - 158',
    termsCount: unit4GlossaryTerms.length
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'الوحدة الخامسة: الحسابات الختامية والتسويات الجردية',
    shortTitle: 'الوحدة 5 (التسويات والقوائم)',
    officialPages: 'ص 159 - 202',
    termsCount: unit5GlossaryTerms.length
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    title: 'الوحدة السادسة: السجلات غير المكتملة وتسوية البنك',
    shortTitle: 'الوحدة 6 (السجلات غير المكتملة)',
    officialPages: 'ص 203 - 240',
    termsCount: unit6GlossaryTerms.length
  },
  {
    id: 'unit-7',
    unitNumber: 7,
    title: 'الوحدة السابعة: الإهلاك والديون المشكوك فيها',
    shortTitle: 'الوحدة 7 (الإهلاك والمخصصات)',
    officialPages: 'ص 241 - 280',
    termsCount: unit7GlossaryTerms.length
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    title: 'الوحدة الثامنة: محاسبة شركات الأشخاص (التضامن)',
    shortTitle: 'الوحدة 8 (شركات التضامن)',
    officialPages: 'ص 281 - 322',
    termsCount: unit8GlossaryTerms.length
  },
  {
    id: 'unit-9',
    unitNumber: 9,
    title: 'الوحدة التاسعة: محاسبة شركات الأموال (المساهمة)',
    shortTitle: 'الوحدة 9 (شركات المساهمة)',
    officialPages: 'ص 323 - 368',
    termsCount: unit9GlossaryTerms.length
  },
  {
    id: 'unit-10',
    unitNumber: 10,
    title: 'الوحدة العاشرة: التحليل المالي ومؤشرات الأداء',
    shortTitle: 'الوحدة 10 (التحليل المالي)',
    officialPages: 'ص 369 - 410',
    termsCount: unit10GlossaryTerms.length
  }
];

export const GLOSSARY_CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'كافة التصنيفات' },
  { id: 'فروض ومبادئ', label: 'فروض ومبادئ' },
  { id: 'معادلة وقيد', label: 'معادلة وقيد' },
  { id: 'أستاذ وميزان', label: 'أستاذ وميزان' },
  { id: 'دفاتر مساعدة', label: 'دفاتر مساعدة' },
  { id: 'تسويات وحسابات ختامية', label: 'تسويات وقوائم ختامية' },
  { id: 'سجلات غير مكتملة', label: 'سجلات غير مكتملة وبنك' },
  { id: 'إهلاك ومخصصات', label: 'إهلاك ومخصصات' },
  { id: 'شركات أشخاص وتضامن', label: 'شركات تضامن وأشخاص' },
  { id: 'شركات أموال ومساهمة', label: 'شركات مساهمة وأموال' },
  { id: 'تحليل مالي ونسب', label: 'تحليل مالي ونسب' },
  { id: 'استدلال JRE', label: 'استدلال JRE ومنهجية' }
];

export function getTermsByUnit(unitId: string): AccountingGlossaryItem[] {
  return allGlossaryTerms.filter(term => term.unitId === unitId);
}

export function getTermsByLesson(lessonId: string): AccountingGlossaryItem[] {
  return allGlossaryTerms.filter(term => term.relatedLessonId === lessonId || term.lessonId === lessonId);
}

export function getGlossaryItemById(id: string): AccountingGlossaryItem | undefined {
  return allGlossaryTerms.find(term => term.id === id);
}

export function searchGlossary(
  query: string,
  unitId?: string,
  category?: string
): AccountingGlossaryItem[] {
  const normalizedQuery = (query || '').trim().toLowerCase();
  
  return allGlossaryTerms.filter(item => {
    // Unit match
    if (unitId && unitId !== 'all' && item.unitId !== unitId) {
      return false;
    }
    
    // Category match
    if (category && category !== 'all' && item.category !== category) {
      return false;
    }
    
    // Query match
    if (!normalizedQuery) return true;
    
    const termMatches = item.term.toLowerCase().includes(normalizedQuery);
    const enMatches = item.termEn.toLowerCase().includes(normalizedQuery);
    const simpleMatches = item.simpleDefinition.toLowerCase().includes(normalizedQuery);
    const academicMatches = item.academicDefinition.toLowerCase().includes(normalizedQuery);
    const tagMatches = item.tags.some(t => t.toLowerCase().includes(normalizedQuery));
    const lessonMatches = item.lessonTitle.toLowerCase().includes(normalizedQuery);
    
    return termMatches || enMatches || simpleMatches || academicMatches || tagMatches || lessonMatches;
  });
}
