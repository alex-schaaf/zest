-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "settingsId" INTEGER NOT NULL,
    CONSTRAINT "users_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "settings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "stravaClientId" TEXT,
    "stravaClientSecret" TEXT,
    "stravaAccessToken" TEXT,
    "stravaRefreshToken" TEXT,
    "stravaTokenExpiresAt" INTEGER
);

-- CreateTable
CREATE TABLE "activities" (
    "id" BIGINT NOT NULL PRIMARY KEY,
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_settingsId_key" ON "users"("settingsId");
