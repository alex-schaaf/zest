/*
  Warnings:

  - Added the required column `updatedAt` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activities" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "time" REAL NOT NULL,
    "speed" REAL NOT NULL,
    "elevationGain" REAL NOT NULL,
    "averageHeartrate" REAL,
    "startDate" DATETIME NOT NULL,
    "originService" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "data" BLOB NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_activities" ("active", "averageHeartrate", "data", "distance", "elevationGain", "id", "originService", "speed", "startDate", "time", "type", "userId") SELECT "active", "averageHeartrate", "data", "distance", "elevationGain", "id", "originService", "speed", "startDate", "time", "type", "userId" FROM "activities";
DROP TABLE "activities";
ALTER TABLE "new_activities" RENAME TO "activities";
PRAGMA foreign_key_check("activities");
PRAGMA foreign_keys=ON;
