import { describe, it, expect } from 'vitest';
import { 
  allGlossaryTerms, 
  GLOSSARY_UNITS_CONFIG, 
  getTermsByUnit, 
  getTermsByLesson, 
  searchGlossary,
  accountingGlossary
} from '../index';

describe('Accounting Glossary & Dictionary Multi-Unit Integrity', () => {
  it('contains terms across all 10 units of the Egyptian Baccalaureate curriculum', () => {
    expect(GLOSSARY_UNITS_CONFIG).toHaveLength(10);
    expect(allGlossaryTerms.length).toBeGreaterThanOrEqual(70);
    expect(accountingGlossary).toEqual(allGlossaryTerms);

    for (let u = 1; u <= 10; u++) {
      const unitId = `unit-${u}`;
      const unitTerms = getTermsByUnit(unitId);
      expect(unitTerms.length).toBeGreaterThan(0);
      
      const configItem = GLOSSARY_UNITS_CONFIG.find(c => c.id === unitId);
      expect(configItem).toBeDefined();
      expect(configItem?.termsCount).toBe(unitTerms.length);
    }
  });

  it('validates that each term contains required pedagogical fields', () => {
    allGlossaryTerms.forEach(item => {
      expect(item.id).toBeTruthy();
      expect(item.term).toBeTruthy();
      expect(item.termEn).toBeTruthy();
      expect(item.unitId).toMatch(/^unit-(10|[1-9])$/);
      expect(item.unitName).toBeTruthy();
      expect(item.lessonId).toBeTruthy();
      expect(item.relatedLessonId).toBeTruthy();
      expect(item.lessonNumber).toBeGreaterThan(0);
      expect(item.lessonTitle).toBeTruthy();
      expect(item.simpleDefinition.length).toBeGreaterThan(15);
      expect(item.academicDefinition.length).toBeGreaterThan(15);
      expect(item.practicalExample.length).toBeGreaterThan(15);
      expect(item.commonMistake.length).toBeGreaterThan(15);
      expect(item.tags.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('correctly filters terms by lesson and search keywords', () => {
    // Lesson query
    const u1Lesson1Terms = getTermsByLesson('lesson-1');
    expect(u1Lesson1Terms.length).toBeGreaterThanOrEqual(5);

    // Search query in Arabic
    const searchAccrual = searchGlossary('استحقاق');
    expect(searchAccrual.some(i => i.id === 'accrual-basis')).toBe(true);

    // Search query in English
    const searchROCE = searchGlossary('ROCE');
    expect(searchROCE.some(i => i.id === 'u10-roce')).toBe(true);

    // Search with unit filter
    const unit8Search = searchGlossary('', 'unit-8');
    expect(unit8Search.every(i => i.unitId === 'unit-8')).toBe(true);
    expect(unit8Search.length).toBe(getTermsByUnit('unit-8').length);
  });
});
