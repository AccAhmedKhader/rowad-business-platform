import { TraceableQuestion } from '../expandedQuestionBank';
import { unit1CoreBank } from './unit1CoreBank';
import { unit2Bank } from './unit2Bank';
import { unit3Bank } from './unit3Bank';
import { unit4Bank } from './unit4Bank';
import { unit5Bank } from './unit5Bank';
import { unit6Bank } from './unit6Bank';
import { unit7Bank } from './unit7Bank';
import { unit8Bank } from './unit8Bank';
import { unit9Bank } from './unit9Bank';
import { unit10Bank } from './unit10Bank';
import { UNIFIED_LO_MAPPING, mapSourceLOToCanonical } from './loMapping';

export { unit1CoreBank } from './unit1CoreBank';
export { unit2Bank } from './unit2Bank';
export { unit3Bank } from './unit3Bank';
export { unit4Bank } from './unit4Bank';
export { unit5Bank } from './unit5Bank';
export { unit6Bank } from './unit6Bank';
export { unit7Bank } from './unit7Bank';
export { unit8Bank } from './unit8Bank';
export { unit9Bank } from './unit9Bank';
export { unit10Bank } from './unit10Bank';
export { UNIFIED_LO_MAPPING, mapSourceLOToCanonical } from './loMapping';

/**
 * بنك الأسئلة التدريبي الموحد (Unified Question Bank v10.0)
 * أسئلة تعليمية مصاغة ومحققة بدقة للوحدات 1 إلى 10 دون أي تكرار.
 */
export const UNIFIED_ALL_QUESTIONS: TraceableQuestion[] = [
  ...unit1CoreBank,
  ...unit2Bank,
  ...unit3Bank,
  ...unit4Bank,
  ...unit5Bank,
  ...unit6Bank,
  ...unit7Bank,
  ...unit8Bank,
  ...unit9Bank,
  ...unit10Bank
];

export function getUnifiedQuestionsByUnit(unitId: 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5' | 'unit-6' | 'unit-7' | 'unit-8' | 'unit-9' | 'unit-10'): TraceableQuestion[] {
  if (unitId === 'unit-1') return unit1CoreBank;
  if (unitId === 'unit-2') return unit2Bank;
  if (unitId === 'unit-3') return unit3Bank;
  if (unitId === 'unit-4') return unit4Bank;
  if (unitId === 'unit-5') return unit5Bank;
  if (unitId === 'unit-6') return unit6Bank;
  if (unitId === 'unit-7') return unit7Bank;
  if (unitId === 'unit-8') return unit8Bank;
  if (unitId === 'unit-10') return unit10Bank;
  if (unitId === 'unit-9') return unit9Bank;
  return [];
}

export function getUnifiedQuestionsBySkill(skillCode: string): TraceableQuestion[] {
  return UNIFIED_ALL_QUESTIONS.filter(q => q.skillCode === skillCode);
}

export function getUnifiedQuestionsByBloom(bloomLevel: string): TraceableQuestion[] {
  return UNIFIED_ALL_QUESTIONS.filter(q => q.bloomLevel === bloomLevel);
}

export function getUnifiedQuestionsByType(type: string): TraceableQuestion[] {
  return UNIFIED_ALL_QUESTIONS.filter(q => q.questionType === type);
}

export function getUnifiedQuestionById(id: string): TraceableQuestion | undefined {
  return UNIFIED_ALL_QUESTIONS.find(q => q.id === id || q.originalId === id);
}
