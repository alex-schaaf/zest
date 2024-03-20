-- AlterTable
ALTER TABLE "Activities" ADD COLUMN "originService" TEXT;

UPDATE "Activities" SET "originService" = 'strava';

ALTER TABLE "Activities" ALTER COLUMN "originService" SET NOT NULL;