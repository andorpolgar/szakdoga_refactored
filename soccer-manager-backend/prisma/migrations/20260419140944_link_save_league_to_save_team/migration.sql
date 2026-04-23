-- AlterTable
ALTER TABLE "SaveTeam" ADD COLUMN     "saveLeagueId" TEXT;

-- CreateIndex
CREATE INDEX "SaveTeam_saveLeagueId_idx" ON "SaveTeam"("saveLeagueId");

-- AddForeignKey
ALTER TABLE "SaveTeam" ADD CONSTRAINT "SaveTeam_saveLeagueId_fkey" FOREIGN KEY ("saveLeagueId") REFERENCES "SaveLeague"("id") ON DELETE SET NULL ON UPDATE CASCADE;
