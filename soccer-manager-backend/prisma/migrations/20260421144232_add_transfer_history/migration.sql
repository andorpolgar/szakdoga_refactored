-- CreateTable
CREATE TABLE "TransferHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSaveId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "fromSaveTeamId" TEXT,
    "toSaveTeamId" TEXT,
    "type" TEXT NOT NULL,
    "marketValue" INTEGER NOT NULL,

    CONSTRAINT "TransferHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TransferHistory_gameSaveId_idx" ON "TransferHistory"("gameSaveId");

-- CreateIndex
CREATE INDEX "TransferHistory_playerId_idx" ON "TransferHistory"("playerId");

-- CreateIndex
CREATE INDEX "TransferHistory_fromSaveTeamId_idx" ON "TransferHistory"("fromSaveTeamId");

-- CreateIndex
CREATE INDEX "TransferHistory_toSaveTeamId_idx" ON "TransferHistory"("toSaveTeamId");

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_gameSaveId_fkey" FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "SavePlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_fromSaveTeamId_fkey" FOREIGN KEY ("fromSaveTeamId") REFERENCES "SaveTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_toSaveTeamId_fkey" FOREIGN KEY ("toSaveTeamId") REFERENCES "SaveTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
