export type SupportedGlossaryUnitId = 
  | 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5' 
  | 'unit-6' | 'unit-7' | 'unit-8' | 'unit-9' | 'unit-10';

export type AccountingGlossaryCategory = 
  | 'فروض ومبادئ'
  | 'معادلة وقيد'
  | 'أستاذ وميزان'
  | 'دفاتر مساعدة'
  | 'تسويات وحسابات ختامية'
  | 'سجلات غير مكتملة'
  | 'إهلاك ومخصصات'
  | 'شركات أشخاص وتضامن'
  | 'شركات أموال ومساهمة'
  | 'تحليل مالي ونسب'
  | 'استدلال JRE';

export interface AccountingGlossaryItem {
  id: string;
  term: string;
  termEn: string;
  unitId: SupportedGlossaryUnitId;
  unitName: string;
  lessonId: string;
  relatedLessonId: string; // matches lesson.id for backwards compatibility
  lessonNumber: number;
  lessonTitle: string;
  category: AccountingGlossaryCategory;
  simpleDefinition: string;
  academicDefinition: string;
  practicalExample: string;
  commonMistake: string;
  tags: string[];
}

export interface GlossaryUnitConfig {
  id: SupportedGlossaryUnitId;
  unitNumber: number;
  title: string;
  shortTitle: string;
  officialPages: string;
  termsCount: number;
}
