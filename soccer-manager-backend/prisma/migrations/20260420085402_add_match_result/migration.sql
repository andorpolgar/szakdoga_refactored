-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "homeGoals" INTEGER NOT NULL,
    "awayGoals" INTEGER NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSaveId" TEXT NOT NULL,
    "saveFixtureId" TEXT NOT NULL,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_saveFixtureId_key" ON "MatchResult"("saveFixtureId");

-- CreateIndex
CREATE INDEX "MatchResult_gameSaveId_idx" ON "MatchResult"("gameSaveId");

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_gameSaveId_fkey" FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_saveFixtureId_fkey" FOREIGN KEY ("saveFixtureId") REFERENCES "SaveFixture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
