import { UnitData } from '../types';
import { UNITS_PART_1 } from './unitsPart1';
import { UNITS_PART_2 } from './unitsPart2';

export const ALL_UNITS: UnitData[] = [...UNITS_PART_1, ...UNITS_PART_2];

export function getUnitById(id: string): UnitData | undefined {
  return ALL_UNITS.find(u => u.id === id);
}

export function getUnitByNumber(number: number): UnitData | undefined {
  return ALL_UNITS.find(u => u.number === number);
}
