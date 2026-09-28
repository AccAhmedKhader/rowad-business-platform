import { BankQuestion } from '../../types';
import { UNIT_3_CANONICAL_QUESTIONS } from './unit3BankCanonical';
import { UNIT_3_PART1_QUESTIONS } from './unit3BankPart1';
import { UNIT_3_PART2_QUESTIONS } from './unit3BankPart2';

/**
 * U03 MASTER QUESTION BANK — GOLDEN MASTER v1.0
 * 
 * Total Bank Questions: 72
 * - Canonical Platform Bank: 7 items (U03-CAN-001 to U03-CAN-007)
 * - Canonical Textbook Items: 5 items (U03-CAN-008 to U03-CAN-012)
 * - Objective Derived MCQs: 16 items (U03-M001 to U03-M016)
 * - Objective Derived True/False: 10 items (U03-T001 to U03-T010)
 * - Analytical Open / Short Essay: 24 items (U03-O001 to U03-O024)
 * - Strategic Judgment & Reasoning (JRE): 10 items (U03-J001 to U03-J010)
 *
 * Duplication Audit Status: 0 Duplicates across all 72 items.
 * Exclusion Families Enforced: F01, F02, F03, F04, F05, F06.
 */

export const UNIT_3_BANK_STATS = {
  totalQuestions: 72,
  mcqCount: 21,
  trueFalseCount: 11,
  openEssayCount: 28,
  jreCount: 12,
  canonicalCount: 12,
  derivedCount: 60,
  zeroDuplicationVerified: true,
  goldenMasterVersion: "1.0"
};

export const UNIT_3_QUESTIONS: BankQuestion[] = [
  ...UNIT_3_CANONICAL_QUESTIONS,
  ...UNIT_3_PART1_QUESTIONS,
  ...UNIT_3_PART2_QUESTIONS
];

export {
  UNIT_3_CANONICAL_QUESTIONS,
  UNIT_3_PART1_QUESTIONS,
  UNIT_3_PART2_QUESTIONS
};
