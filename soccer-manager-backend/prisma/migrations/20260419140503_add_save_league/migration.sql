-- CreateTable
CREATE TABLE "SaveLeague" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSaveId" TEXT NOT NULL,

    CONSTRAINT "SaveLeague_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SaveLeague_gameSaveId_idx" ON "SaveLeague"("gameSaveId");

-- AddForeignKey
ALTER TABLE "SaveLeague" ADD CONSTRAINT "SaveLeague_gameSaveId_fkey" FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
