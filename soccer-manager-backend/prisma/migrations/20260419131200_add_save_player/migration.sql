-- CreateTable
CREATE TABLE "SavePlayer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSaveId" TEXT NOT NULL,
    "saveTeamId" TEXT NOT NULL,

    CONSTRAINT "SavePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavePlayer_gameSaveId_idx" ON "SavePlayer"("gameSaveId");

-- CreateIndex
CREATE INDEX "SavePlayer_saveTeamId_idx" ON "SavePlayer"("saveTeamId");

-- AddForeignKey
ALTER TABLE "SavePlayer" ADD CONSTRAINT "SavePlayer_gameSaveId_fkey" FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavePlayer" ADD CONSTRAINT "SavePlayer_saveTeamId_fkey" FOREIGN KEY ("saveTeamId") REFERENCES "SaveTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
