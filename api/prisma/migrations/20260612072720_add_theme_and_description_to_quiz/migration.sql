/*
  Warnings:

  - Added the required column `description` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "theme" TEXT NOT NULL;
