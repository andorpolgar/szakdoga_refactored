-- CreateTable
CREATE TABLE "BaseFixtureTemplate" (
    "id" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leagueId" TEXT NOT NULL,

    CONSTRAINT "BaseFixtureTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BaseFixtureTemplate_leagueId_idx" ON "BaseFixtureTemplate"("leagueId");

-- AddForeignKey
ALTER TABLE "BaseFixtureTemplate" ADD CONSTRAINT "BaseFixtureTemplate_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "BaseLeague"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
