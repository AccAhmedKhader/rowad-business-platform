import { UnitAnalysisReport, unitAnalysisData } from './unitAnalysis';
import { unit2AnalysisData } from './unit2Analysis';
import { unit3AnalysisData } from './unit3Analysis';
import { unit4AnalysisData } from './unit4Analysis';
import { unit5AnalysisData } from './unit5Analysis';
import { unit6AnalysisData } from './unit6Analysis';
import { unit7AnalysisData } from './unit7Analysis';
import { unit8AnalysisData } from './unit8Analysis';
import { unit9AnalysisData } from './unit9Analysis';
import { unit10AnalysisData } from './unit10Analysis';

export type SupportedAnalysisUnitId = 
  | 'unit-1' 
  | 'unit-2' 
  | 'unit-3' 
  | 'unit-4' 
  | 'unit-5' 
  | 'unit-6' 
  | 'unit-7' 
  | 'unit-8' 
  | 'unit-9' 
  | 'unit-10';

export const allUnitsAnalysisData: Record<SupportedAnalysisUnitId, UnitAnalysisReport> = {
  'unit-1': unitAnalysisData,
  'unit-2': unit2AnalysisData,
  'unit-3': unit3AnalysisData,
  'unit-4': unit4AnalysisData,
  'unit-5': unit5AnalysisData,
  'unit-6': unit6AnalysisData,
  'unit-7': unit7AnalysisData,
  'unit-8': unit8AnalysisData,
  'unit-9': unit9AnalysisData,
  'unit-10': unit10AnalysisData
};

export interface MasterCurriculumMatchingRow {
  unitId: SupportedAnalysisUnitId;
  unitNum: number;
  unitName: string;
  sourceReference: string;
  pages: string;
  lessonsCount: number;
  totalExercises: number;
  jreCaseTitle: string;
  matchingPercentage: string;
  accreditationStatus: string;
}

export const masterCurriculumMatchingRows: MasterCurriculumMatchingRow[] = [
  {
    unitId: 'unit-1',
    unitNum: 1,
    unitName: 'المبادئ والمفاهيم المحاسبية والبيئة الاقتصادية',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج1',
    pages: 'ص 11 - 34',
    lessonsCount: 6,
    totalExercises: 45,
    jreCaseTitle: 'مخبز مريم - الشخصية المعنوية والمركز المالي',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-2',
    unitNum: 2,
    unitName: 'التسجيل المحاسبي، القيد المزدوج، والدورة المستندية',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج1',
    pages: 'ص 35 - 78',
    lessonsCount: 6,
    totalExercises: 52,
    jreCaseTitle: 'منشأة الأمل - التوازن المحاسبي ومعادلة الميزانية',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-3',
    unitNum: 3,
    unitName: 'الدفاتر المحاسبية المساعدة وحسابات المراقبة الإجمالية',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج1',
    pages: 'ص 59 - 88',
    lessonsCount: 6,
    totalExercises: 48,
    jreCaseTitle: 'محلات بلال - تخصص الدفاتر ومخاطر الرقابة',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-4',
    unitNum: 4,
    unitName: 'ميزان المراجعة وتصحيح الأخطاء والحساب المعلق',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج1',
    pages: 'ص 89 - 120',
    lessonsCount: 6,
    totalExercises: 59,
    jreCaseTitle: 'زيد للتجارة - الأخطاء المبدئية وتصفير المعلق',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-5',
    unitNum: 5,
    unitName: 'الحسابات الختامية والقوائم المالية والتسويات الجردية',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج1',
    pages: 'ص 116 - 155',
    lessonsCount: 6,
    totalExercises: 58,
    jreCaseTitle: 'فريدة للملابس - استحقاق المصروفات وأرباح القروض',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-6',
    unitNum: 6,
    unitName: 'السجلات غير المكتملة (القيد المفرد) ونظم الرقابة',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج2',
    pages: 'ص 161 - 208',
    lessonsCount: 6,
    totalExercises: 50,
    jreCaseTitle: 'كريم وأشرف - كلفة المحاسب ومخاطر القيد المفرد',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-7',
    unitNum: 7,
    unitName: 'الإهلاك والمخصصات واستبعاد الأصول غير المتداولة',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج2',
    pages: 'ص 21 - 44',
    lessonsCount: 5,
    totalExercises: 41,
    jreCaseTitle: 'منشأة حسن - تغيير طريقة الإهلاك ومبدأ الثبات',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-8',
    unitNum: 8,
    unitName: 'محاسبة شركات الأشخاص والتضامن وتوزيع الأرباح',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج2',
    pages: 'ص 1 - 65',
    lessonsCount: 5,
    totalExercises: 42,
    jreCaseTitle: 'النور والوفاء - عدالة فائدة رأس المال والمسحوبات',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-9',
    unitNum: 9,
    unitName: 'محاسبة شركات الأموال والمساهمة (الأسهم والسندات)',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج2',
    pages: 'ص 1 - 78',
    lessonsCount: 6,
    totalExercises: 58,
    jreCaseTitle: 'هيكل التمويل - المفاضلة بين الأسهم والسندات',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  },
  {
    unitId: 'unit-10',
    unitNum: 10,
    unitName: 'تحليل القوائم المالية وتفسير النسب واتخاذ القرار',
    sourceReference: 'كتاب الوزارة - الصف الثاني - ج2',
    pages: 'ص 93 - 172',
    lessonsCount: 6,
    totalExercises: 57,
    jreCaseTitle: 'المفاضلة الاستثمارية - النمو والسيولة مقابل الهامش',
    matchingPercentage: '100%',
    accreditationStatus: 'معتمد وموثق بالكامل'
  }
];
