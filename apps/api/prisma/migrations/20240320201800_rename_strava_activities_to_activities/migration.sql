-- DropForeignKey
ALTER TABLE "StravaActivities" DROP CONSTRAINT "StravaActivities_userId_fkey";

-- RenameTable
ALTER TABLE "StravaActivities" RENAME TO "Activities";

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
