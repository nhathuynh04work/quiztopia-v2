export type QuestionValidationError = {
  id: string;
  errors: string[];
};

export type QuizValidationError = {
  title: string;
  questions: QuestionValidationError[];
};
