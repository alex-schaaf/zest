/*
  Warnings:

  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'email@example.com';

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
