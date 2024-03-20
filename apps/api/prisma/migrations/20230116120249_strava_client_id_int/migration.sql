/*
  Warnings:

  - The `stravaClientId` column on the `Settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "stravaClientId",
ADD COLUMN     "stravaClientId" INTEGER;
