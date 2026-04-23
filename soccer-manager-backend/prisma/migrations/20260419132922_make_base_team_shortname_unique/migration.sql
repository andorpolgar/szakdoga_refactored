/*
  Warnings:

  - A unique constraint covering the columns `[shortName]` on the table `BaseTeam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BaseTeam_shortName_key" ON "BaseTeam"("shortName");
