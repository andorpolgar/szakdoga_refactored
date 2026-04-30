CREATE TABLE IF NOT EXISTS "SeasonChampion" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "seasonNumber" INTEGER NOT NULL,

  "championTeamId" TEXT NOT NULL,
  "championTeamName" TEXT NOT NULL,
  "championTeamShortName" TEXT NOT NULL,

  "points" INTEGER NOT NULL,
  "wins" INTEGER NOT NULL,
  "draws" INTEGER NOT NULL,
  "losses" INTEGER NOT NULL,
  "goalsFor" INTEGER NOT NULL,
  "goalsAgainst" INTEGER NOT NULL,

  "gameSaveId" TEXT NOT NULL,

  CONSTRAINT "SeasonChampion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "SeasonChampion_gameSaveId_seasonNumber_key"
ON "SeasonChampion"("gameSaveId", "seasonNumber");

CREATE INDEX IF NOT EXISTS "SeasonChampion_gameSaveId_idx"
ON "SeasonChampion"("gameSaveId");

CREATE INDEX IF NOT EXISTS "SeasonChampion_championTeamId_idx"
ON "SeasonChampion"("championTeamId");

ALTER TABLE "SeasonChampion"
ADD CONSTRAINT "SeasonChampion_gameSaveId_fkey"
FOREIGN KEY ("gameSaveId") REFERENCES "GameSave"("id")
ON DELETE CASCADE ON UPDATE CASCADE;