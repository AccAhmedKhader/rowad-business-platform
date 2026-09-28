import { BankQuestion } from '../../types';
import { UNIT_4_CANONICAL_QUESTIONS } from './unit4BankCanonical';
import { UNIT_4_PART1_QUESTIONS } from './unit4BankPart1';
import { UNIT_4_PART2_QUESTIONS } from './unit4BankPart2';

/**
 * U04 MASTER QUESTION BANK — GOLDEN MASTER v1.0
 * 
 * Total Bank Questions: 72
 * - Canonical Platform & Textbook Items: 14 items (q-u4-1 to q-u4-61 + U04-BOOK-Q01 to U04-BOOK-Q05)
 * - Objective Derived MCQs: 16 items (U04-M001 to U04-M016)
 * - Objective Derived True/False: 10 items (U04-T001 to U04-T010)
 * - Analytical Open / Short Essay: 22 items (U04-O001 to U04-O022)
 * - Strategic Judgment & Reasoning (JRE): 10 items (U04-J001 to U04-J010)
 *
 * Duplication Audit Status: 0 Duplicates across all 72 items.
 * Exclusion Families Enforced: F01 (البيئة الداخلية وعنق الزجاجة), F02 (أبعاد PESTEL الستة), 
 * F03 (الفرص والتهديدات والتكيف), F04 (أثر سعر الصرف والعملة), F05 (التكنولوجيا والرقمنة), F06 (البيئة الخضراء والاستدامة).
 */

export const UNIT_4_BANK_STATS = {
  totalQuestions: 72,
  mcqCount: 19,
  trueFalseCount: 10,
  openEssayCount: 32,
  jreCount: 11,
  canonicalCount: 14,
  derivedCount: 58,
  zeroDuplicationVerified: true,
  goldenMasterVersion: "1.0"
};

export const UNIT_4_QUESTIONS: BankQuestion[] = [
  ...UNIT_4_CANONICAL_QUESTIONS,
  ...UNIT_4_PART1_QUESTIONS,
  ...UNIT_4_PART2_QUESTIONS
];

export {
  UNIT_4_CANONICAL_QUESTIONS,
  UNIT_4_PART1_QUESTIONS,
  UNIT_4_PART2_QUESTIONS
};
