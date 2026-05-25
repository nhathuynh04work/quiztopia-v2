/*
  Warnings:

  - You are about to drop the column `currentVersion` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `currentVersionExpiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `currentVersionIssuedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `currentVersionTokenHash` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `previousVersionExpiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `previousVersionTokenHash` on the `Session` table. All the data in the column will be lost.
  - Added the required column `currentTokenHash` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_currentVersionExpiresAt_idx";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "currentVersion",
DROP COLUMN "currentVersionExpiresAt",
DROP COLUMN "currentVersionIssuedAt",
DROP COLUMN "currentVersionTokenHash",
DROP COLUMN "previousVersionExpiresAt",
DROP COLUMN "previousVersionTokenHash",
ADD COLUMN     "currentTokenHash" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "previousTokenHash" TEXT,
ADD COLUMN     "previousValidUntil" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");
