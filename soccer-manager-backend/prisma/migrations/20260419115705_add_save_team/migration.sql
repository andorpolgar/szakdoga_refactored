-- CreateTable
CREATE TABLE "SaveTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSaveId" TEXT NOT NULL,

    CONSTRAINT "SaveTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SaveTeam_gameSaveId_idx" ON "SaveTeam"("gameSaveId");

-- AddForeignKey
ALTER TABLE "SaveTeam" ADD CONSTRAINT "SaveTeam_gameSaveId_fkey" FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
