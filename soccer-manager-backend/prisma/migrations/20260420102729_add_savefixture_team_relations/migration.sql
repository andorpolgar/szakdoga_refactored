-- AddForeignKey
ALTER TABLE "SaveFixture" ADD CONSTRAINT "SaveFixture_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "SaveTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaveFixture" ADD CONSTRAINT "SaveFixture_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "SaveTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
