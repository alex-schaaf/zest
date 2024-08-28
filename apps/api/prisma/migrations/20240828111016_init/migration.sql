-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "settingsId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stravaClientId" TEXT,
    "stravaClientSecret" TEXT,
    "stravaAccessToken" TEXT,
    "stravaRefreshToken" TEXT,
    "stravaTokenExpiresAt" INTEGER,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "elevationGain" DOUBLE PRECISION NOT NULL,
    "averageHeartrate" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3) NOT NULL,
    "originService" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "data" BYTEA NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_settingsId_key" ON "users"("settingsId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
