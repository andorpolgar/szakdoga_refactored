-- CreateTable
CREATE TABLE "SaveFixture" (
    "id" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSaveId" TEXT NOT NULL,
    "saveLeagueId" TEXT,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,

    CONSTRAINT "SaveFixture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SaveFixture_gameSaveId_idx" ON "SaveFixture"("gameSaveId");

-- CreateIndex
CREATE INDEX "SaveFixture_saveLeagueId_idx" ON "SaveFixture"("saveLeagueId");

-- AddForeignKey
ALTER TABLE "SaveFixture" ADD CONSTRAINT "SaveFixture_gameSaveId_fkey" FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaveFixture" ADD CONSTRAINT "SaveFixture_saveLeagueId_fkey" FOREIGN KEY ("saveLeagueId") REFERENCES "SaveLeague"("id") ON DELETE SET NULL ON UPDATE CASCADE;
