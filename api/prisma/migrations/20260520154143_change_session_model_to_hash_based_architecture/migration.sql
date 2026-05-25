/*
  Warnings:

  - You are about to drop the column `currentTokenHash` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `previousTokenHash` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currentHash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currentHash` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_expiresAt_idx";

-- DropIndex
DROP INDEX "Session_revokedAt_idx";

-- DropIndex
DROP INDEX "Session_userId_idx";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "currentTokenHash",
DROP COLUMN "previousTokenHash",
DROP COLUMN "version",
ADD COLUMN     "currentHash" TEXT NOT NULL,
ADD COLUMN     "previousHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Session_currentHash_key" ON "Session"("currentHash");

-- CreateIndex
CREATE INDEX "Session_userId_revokedAt_idx" ON "Session"("userId", "revokedAt");

-- CreateIndex
CREATE INDEX "Session_expiresAt_revokedAt_idx" ON "Session"("expiresAt", "revokedAt");
