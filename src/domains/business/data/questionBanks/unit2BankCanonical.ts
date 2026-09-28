import { BankQuestion } from '../../types';
import { UNIT_2_BANK_PART1_QUESTIONS } from './unit2BankPart1';
import { UNIT_2_BANK_PART2_QUESTIONS } from './unit2BankPart2';

/**
 * البنك المعياري الكانونيكال الكامل للوحدة الثانية — أنواع منظمات الأعمال
 * 80 سؤالاً ذهبياً معيارياً شاملاً (Golden Master Standards):
 * - الأسئلة 01-25: اختيار من متعدد (MCQ) متوازن النواتج والدروس
 * - الأسئلة 26-40: صواب وخطأ مع التعليل وتصحيح الخطأ بدقة
 * - الأسئلة 41-52: مقالي قصير وتحليلي عميق
 * - الأسئلة 53-60: مسائل حسابية وتطبيقات المسؤولية والأنصبة الرقمية
 * - الأسئلة 61-70: دراسات حالة ومصفوفة المفاضلة الهيكلية السبعة
 * - الأسئلة 71-80: حكم واستدلال استراتيجي (JRE) خماسي الأبعاد
 */
export const UNIT_2_BANK_CANONICAL_QUESTIONS: BankQuestion[] = [
  ...UNIT_2_BANK_PART1_QUESTIONS,
  ...UNIT_2_BANK_PART2_QUESTIONS
];
