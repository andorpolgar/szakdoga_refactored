-- AlterTable
ALTER TABLE "SavePlayer" ADD COLUMN     "lineupSlot" TEXT;

-- AlterTable
ALTER TABLE "SaveTeam" ADD COLUMN     "formation" TEXT NOT NULL DEFAULT '4-3-3';

-- CreateIndex
CREATE INDEX "SavePlayer_lineupSlot_idx" ON "SavePlayer"("lineupSlot");
