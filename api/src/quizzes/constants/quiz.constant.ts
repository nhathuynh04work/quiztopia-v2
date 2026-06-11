export const DEFAULT_TIME_LIMIT_MS = 20000;

export const QUIZ_STATUS_FILTERS = {
  ALL: "all",
  PUBLISHED: "published",
  DRAFT: "draft",
} as const;

export const QUIZ_STATUS_FILTER_VALUES = [
  QUIZ_STATUS_FILTERS.ALL,
  QUIZ_STATUS_FILTERS.PUBLISHED,
  QUIZ_STATUS_FILTERS.DRAFT,
] as const;

export type QuizStatusFilter =
  (typeof QUIZ_STATUS_FILTERS)[keyof typeof QUIZ_STATUS_FILTERS];
