/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `revoked` on the `Session` table. All the data in the column will be lost.
  - Added the required column `currentVersionExpiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentVersionTokenHash` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expiresAt",
DROP COLUMN "revoked",
ADD COLUMN     "currentVersion" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "currentVersionExpiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currentVersionIssuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentVersionTokenHash" TEXT NOT NULL,
ADD COLUMN     "previousVersionExpiresAt" TIMESTAMP(3),
ADD COLUMN     "previousVersionTokenHash" TEXT,
ADD COLUMN     "revokedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Session_currentVersionExpiresAt_idx" ON "Session"("currentVersionExpiresAt");

-- CreateIndex
CREATE INDEX "Session_revokedAt_idx" ON "Session"("revokedAt");
