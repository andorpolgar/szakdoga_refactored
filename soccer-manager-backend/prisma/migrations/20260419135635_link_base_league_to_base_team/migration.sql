-- AlterTable
ALTER TABLE "BaseTeam" ADD COLUMN     "leagueId" TEXT;

-- CreateIndex
CREATE INDEX "BaseTeam_leagueId_idx" ON "BaseTeam"("leagueId");

-- AddForeignKey
ALTER TABLE "BaseTeam" ADD CONSTRAINT "BaseTeam_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "BaseLeague"("id") ON DELETE SET NULL ON UPDATE CASCADE;
