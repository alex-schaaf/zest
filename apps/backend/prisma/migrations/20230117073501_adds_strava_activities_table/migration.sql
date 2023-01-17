-- CreateTable
CREATE TABLE "StravaActivities" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "elevationGain" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StravaActivities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StravaActivities_userId_key" ON "StravaActivities"("userId");

-- AddForeignKey
ALTER TABLE "StravaActivities" ADD CONSTRAINT "StravaActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
