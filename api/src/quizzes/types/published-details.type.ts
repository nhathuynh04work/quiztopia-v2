import { QuizVisibility } from "@/generated/prisma/enums";

export interface PublishedDetails {
  title: string;
  description: string;
  theme: string;
  coverImage: string | null;
  visibility: QuizVisibility;
  publishedAt: Date;
  questions: any[];
}
