import { QuizVisibility } from "@/generated/prisma/enums";
import { Question } from "@/generated/prisma/client";

export type QuizBase = {
  id: string;
  title: string;
  description: string;
  theme: string;
  coverImage: string | null;
  visibility: QuizVisibility;
};

export type QuizListItem = QuizBase & {
  lastModified: Date;
  user: {
    name: string;
    avatar: null;
  };
  questionCount: number;
  isDraft: boolean;
  hasUnsavedChanges: boolean;
};

export type QuizForEditor = QuizBase & {
  questions: Question[];
};

export type QuizForDrawer = QuizBase & {
  questions: Question[];
  user: {
    name: string;
    avatar: null;
  };
  hasUnsavedChanges: boolean;
};
