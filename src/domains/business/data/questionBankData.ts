import { BankQuestion } from '../types';
import { UNIT_1_QUESTIONS } from './questionBanks/unit1Bank';
import { UNIT_2_QUESTIONS } from './questionBanks/unit2Bank';
import { UNIT_3_QUESTIONS } from './questionBanks/unit3Bank';
import { UNIT_4_QUESTIONS } from './questionBanks/unit4Bank';
import { UNIT_5_QUESTIONS } from './questionBanks/unit5Bank';
import { UNIT_6_QUESTIONS } from './questionBanks/unit6Bank';
import { UNIT_7_QUESTIONS } from './questionBanks/unit7Bank';
import { UNIT_8_QUESTIONS } from './questionBanks/unit8Bank';
import { UNIT_9_QUESTIONS } from './questionBanks/unit9Bank';
import { UNIT_10_QUESTIONS } from './questionBanks/unit10Bank';

export const ALL_BANK_QUESTIONS: BankQuestion[] = [
  ...UNIT_1_QUESTIONS,
  ...UNIT_2_QUESTIONS,
  ...UNIT_3_QUESTIONS,
  ...UNIT_4_QUESTIONS,
  ...UNIT_5_QUESTIONS,
  ...UNIT_6_QUESTIONS,
  ...UNIT_7_QUESTIONS,
  ...UNIT_8_QUESTIONS,
  ...UNIT_9_QUESTIONS,
  ...UNIT_10_QUESTIONS
];
