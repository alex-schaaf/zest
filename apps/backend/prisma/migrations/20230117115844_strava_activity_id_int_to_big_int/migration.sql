/*
  Warnings:

  - The primary key for the `StravaActivities` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "StravaActivities" DROP CONSTRAINT "StravaActivities_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "StravaActivities_pkey" PRIMARY KEY ("id");
