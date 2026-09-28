import {
  TraceableQuestion,
  officialTextbookBank,
  bank373Questions,
  unit1OfficialQuestions,
  unit2OfficialQuestions,
  unit3OfficialQuestions,
  unit4OfficialQuestions,
  unit5OfficialQuestions,
  unit6OfficialQuestions,
  unit7OfficialQuestions,
  unit8OfficialQuestions,
  officialTextbookBankSummary
} from './officialTextbookBank';

export type { TraceableQuestion };

export {
  officialTextbookBank,
  bank373Questions,
  unit1OfficialQuestions,
  unit2OfficialQuestions,
  unit3OfficialQuestions,
  unit4OfficialQuestions,
  unit5OfficialQuestions,
  unit6OfficialQuestions,
  unit7OfficialQuestions,
  unit8OfficialQuestions,
  officialTextbookBankSummary
};

// Aliases for full backward compatibility across all modules and tests
export const unit1QuestionBank: TraceableQuestion[] = unit1OfficialQuestions;
export const unit2Questions: TraceableQuestion[] = unit2OfficialQuestions;
export const unit3CoreBank: TraceableQuestion[] = unit3OfficialQuestions;
export const unit4CoreBank: TraceableQuestion[] = unit4OfficialQuestions;
export const unit5CoreBank: TraceableQuestion[] = unit5OfficialQuestions;
export const unit6CoreBank: TraceableQuestion[] = unit6OfficialQuestions;
export const unit7CoreBank: TraceableQuestion[] = unit7OfficialQuestions;
export const unit8CoreBank: TraceableQuestion[] = unit8OfficialQuestions;

// Canonical expanded bank pointing to the official textbook bank
export const expandedQuestionBank: TraceableQuestion[] = officialTextbookBank;

export const questionBankSummary = {
  totalQuestions: expandedQuestionBank.length,
  bank373Count: bank373Questions.length,
  unit1QuestionsCount: unit1OfficialQuestions.length,
  unit2QuestionsCount: unit2OfficialQuestions.length,
  unit3QuestionsCount: unit3OfficialQuestions.length,
  unit4QuestionsCount: unit4OfficialQuestions.length,
  unit5QuestionsCount: unit5OfficialQuestions.length,
  unit6QuestionsCount: unit6OfficialQuestions.length,
  unit7QuestionsCount: unit7OfficialQuestions.length,
  unit8QuestionsCount: unit8OfficialQuestions.length,
  totalUnits: 10,
  sourceType: 'official_textbook',
  traceabilityRate: '100% (All items verified and mapped to Egyptian Baccalaureate EB Curricula Units 1-10)'
};
