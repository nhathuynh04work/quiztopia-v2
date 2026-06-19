import { Quiz, QuizVisibility } from "@/generated/prisma/client";

export interface QuizWithUser extends Quiz {
  user: {
    firstName: string;
    lastName: string;
  };
}

export type QuizListItem = {
  id: string;
  title: string;
  description: string;
  theme: string;
  coverImage: string | null;
  visibility: QuizVisibility;
  lastModified: Date;
  user: {
    name: string;
    avatar: null;
  };
  questionCount: number;
  isDraft: boolean;
  hasUnsavedChanges: boolean;
};
