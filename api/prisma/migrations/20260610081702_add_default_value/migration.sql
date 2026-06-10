/*
  Warnings:

  - You are about to drop the column `published` on the `Quiz` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TEXT');

-- CreateEnum
CREATE TYPE "QuizVisibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "published",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "publishedDetails" JSONB,
ADD COLUMN     "visibility" "QuizVisibility" NOT NULL DEFAULT 'PRIVATE',
ALTER COLUMN "title" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "type" "QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "points" INTEGER NOT NULL DEFAULT 1000,
    "timeLimitMs" INTEGER NOT NULL DEFAULT 20000,
    "order" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "metadata" JSONB NOT NULL,
    "quizId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_quizId_idx" ON "Question"("quizId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
