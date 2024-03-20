/*
  Warnings:

  - You are about to drop the column `stravaClientSecretHash` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "stravaClientSecretHash",
ADD COLUMN     "stravaClientSecret" TEXT;
