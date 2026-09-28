import { 
  AccountingGlossaryItem,
  allGlossaryTerms,
  GLOSSARY_UNITS_CONFIG,
  GLOSSARY_CATEGORIES,
  getTermsByUnit,
  getTermsByLesson,
  getGlossaryItemById,
  searchGlossary,
  SupportedGlossaryUnitId,
  AccountingGlossaryCategory,
  GlossaryUnitConfig
} from './glossary';

export type { 
  AccountingGlossaryItem,
  SupportedGlossaryUnitId,
  AccountingGlossaryCategory,
  GlossaryUnitConfig
};

export {
  allGlossaryTerms,
  GLOSSARY_UNITS_CONFIG,
  GLOSSARY_CATEGORIES,
  getTermsByUnit,
  getTermsByLesson,
  getGlossaryItemById,
  searchGlossary
};

export const accountingGlossary: AccountingGlossaryItem[] = allGlossaryTerms;
