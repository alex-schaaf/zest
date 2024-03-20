/*
  Warnings:

  - You are about to drop the column `userId` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[settingsId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usersId` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settingsId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- DropIndex
DROP INDEX "Settings_userId_key";

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "userId",
ADD COLUMN     "usersId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "settingsId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_settingsId_key" ON "Users"("settingsId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
