-- CreateTable
CREATE TABLE "SaveStanding" (
    "id" TEXT NOT NULL,
    "played" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "goalsFor" INTEGER NOT NULL DEFAULT 0,
    "goalsAgainst" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "gameSaveId" TEXT NOT NULL,
    "saveTeamId" TEXT NOT NULL,

    CONSTRAINT "SaveStanding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaveStanding_saveTeamId_key" ON "SaveStanding"("saveTeamId");

-- CreateIndex
CREATE INDEX "SaveStanding_gameSaveId_idx" ON "SaveStanding"("gameSaveId");

-- AddForeignKey
ALTER TABLE "SaveStanding" ADD CONSTRAINT "SaveStanding_gameSaveId_fkey" FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaveStanding" ADD CONSTRAINT "SaveStanding_saveTeamId_fkey" FOREIGN KEY ("saveTeamId") REFERENCES "SaveTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
