export const QUIZ_STATUS_FILTER = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
} as const;

export type QuizStatusFilter =
  (typeof QUIZ_STATUS_FILTER)[keyof typeof QUIZ_STATUS_FILTER];
