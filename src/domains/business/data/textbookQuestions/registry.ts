import { TextbookQuestion } from '../../types';
import { 
  UNIT1_TEXTBOOK_QUESTIONS, 
  UNIT1_AXES_MAP, 
  UNIT1_AUDIT_LOG,
  UnitAxis 
} from '../textbookQuestionsData';
import { UNIT2_TEXTBOOK_QUESTIONS, UNIT2_AXES_MAP, UNIT2_AUDIT_LOG } from './unit2TextbookQuestions';
import { UNIT3_TEXTBOOK_QUESTIONS, UNIT3_AXES_MAP, UNIT3_AUDIT_LOG } from './unit3TextbookQuestions';
import { UNIT4_TEXTBOOK_QUESTIONS, UNIT4_AXES_MAP, UNIT4_AUDIT_LOG } from './unit4TextbookQuestions';
import { UNIT5_TEXTBOOK_QUESTIONS, UNIT5_AXES_MAP, UNIT5_AUDIT_LOG } from './unit5TextbookQuestions';
import { UNIT6_TEXTBOOK_QUESTIONS, UNIT6_AXES_MAP, UNIT6_AUDIT_LOG } from './unit6TextbookQuestions';
import { UNIT7_TEXTBOOK_QUESTIONS, UNIT7_AXES_MAP, UNIT7_AUDIT_LOG } from './unit7TextbookQuestions';
import { UNIT8_TEXTBOOK_QUESTIONS, UNIT8_AXES_MAP, UNIT8_AUDIT_LOG } from './unit8TextbookQuestions';
import { UNIT9_TEXTBOOK_QUESTIONS, UNIT9_AXES_MAP, UNIT9_AUDIT_LOG } from './unit9TextbookQuestions';
import { UNIT10_TEXTBOOK_QUESTIONS, UNIT10_AXES_MAP, UNIT10_AUDIT_LOG } from './unit10TextbookQuestions';

export interface UnitTextbookQuestionsBundle {
  unitNumber: number;
  unitTitle: string;
  auditLog: {
    unitCode: string;
    unitTitle: string;
    source: string;
    pageRange: string;
    totalQuestions: number;
    modelAnswersAdded: boolean;
    systematicJustificationAdded: boolean;
    reasoningPathAdded: boolean;
    rubricsTableIncluded: boolean;
    note: string;
  };
  axesMap: UnitAxis[];
  questions: TextbookQuestion[];
}

export const TEXTBOOK_QUESTIONS_REGISTRY: Record<number, UnitTextbookQuestionsBundle> = {
  1: {
    unitNumber: 1,
    unitTitle: "مدخل إلى الأعمال وغايتها",
    auditLog: UNIT1_AUDIT_LOG,
    axesMap: UNIT1_AXES_MAP,
    questions: UNIT1_TEXTBOOK_QUESTIONS
  },
  2: {
    unitNumber: 2,
    unitTitle: "أنواع منظمات الأعمال",
    auditLog: UNIT2_AUDIT_LOG,
    axesMap: UNIT2_AXES_MAP,
    questions: UNIT2_TEXTBOOK_QUESTIONS
  },
  3: {
    unitNumber: 3,
    unitTitle: "أهداف منظمات الأعمال وأصحاب المصلحة",
    auditLog: UNIT3_AUDIT_LOG,
    axesMap: UNIT3_AXES_MAP,
    questions: UNIT3_TEXTBOOK_QUESTIONS
  },
  4: {
    unitNumber: 4,
    unitTitle: "البيئة الداخلية والخارجية لمنظمات الأعمال",
    auditLog: UNIT4_AUDIT_LOG,
    axesMap: UNIT4_AXES_MAP,
    questions: UNIT4_TEXTBOOK_QUESTIONS
  },
  5: {
    unitNumber: 5,
    unitTitle: "الإدارة والقيادة",
    auditLog: UNIT5_AUDIT_LOG,
    axesMap: UNIT5_AXES_MAP,
    questions: UNIT5_TEXTBOOK_QUESTIONS
  },
  6: {
    unitNumber: 6,
    unitTitle: "التسويق",
    auditLog: UNIT6_AUDIT_LOG,
    axesMap: UNIT6_AXES_MAP,
    questions: UNIT6_TEXTBOOK_QUESTIONS
  },
  7: {
    unitNumber: 7,
    unitTitle: "إدارة العمليات والإنتاج",
    auditLog: UNIT7_AUDIT_LOG,
    axesMap: UNIT7_AXES_MAP,
    questions: UNIT7_TEXTBOOK_QUESTIONS
  },
  8: {
    unitNumber: 8,
    unitTitle: "إدارة الموارد البشرية",
    auditLog: UNIT8_AUDIT_LOG,
    axesMap: UNIT8_AXES_MAP,
    questions: UNIT8_TEXTBOOK_QUESTIONS
  },
  9: {
    unitNumber: 9,
    unitTitle: "التمويل وأداء الأعمال",
    auditLog: UNIT9_AUDIT_LOG,
    axesMap: UNIT9_AXES_MAP,
    questions: UNIT9_TEXTBOOK_QUESTIONS
  },
  10: {
    unitNumber: 10,
    unitTitle: "الاستراتيجية والتحليل واتخاذ القرار",
    auditLog: UNIT10_AUDIT_LOG,
    axesMap: UNIT10_AXES_MAP,
    questions: UNIT10_TEXTBOOK_QUESTIONS
  }
};

export function getTextbookQuestionsBundle(unitNumber: number): UnitTextbookQuestionsBundle | undefined {
  return TEXTBOOK_QUESTIONS_REGISTRY[unitNumber];
}

export function hasTextbookQuestionsData(unitNumber: number): boolean {
  return Boolean(TEXTBOOK_QUESTIONS_REGISTRY[unitNumber] && TEXTBOOK_QUESTIONS_REGISTRY[unitNumber].questions.length > 0);
}

export function getTotalTextbookQuestionsCount(): number {
  return Object.values(TEXTBOOK_QUESTIONS_REGISTRY).reduce((total, bundle) => total + bundle.questions.length, 0);
}
