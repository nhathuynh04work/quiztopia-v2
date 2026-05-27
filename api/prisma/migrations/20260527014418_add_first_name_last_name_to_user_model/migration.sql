/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User"
ADD COLUMN     "firstName" TEXT ,
ADD COLUMN     "lastName" TEXT ;

UPDATE "User"
SET
  "firstName" = split_part("name", ' ', 1),
  "lastName" = 'Doe';

ALTER TABLE "User"
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

ALTER TABLE "User"
DROP COLUMN "name";
