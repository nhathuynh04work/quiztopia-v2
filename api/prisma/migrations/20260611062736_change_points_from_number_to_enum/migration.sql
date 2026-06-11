/*
  Warnings:

  - The `points` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PointsMode" AS ENUM ('STANDARD', 'DOUBLE_POINTS', 'NO_POINTS');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "points",
ADD COLUMN     "points" "PointsMode" NOT NULL DEFAULT 'STANDARD';
