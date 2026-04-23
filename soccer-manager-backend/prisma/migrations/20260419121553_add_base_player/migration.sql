-- CreateTable
CREATE TABLE "BasePlayer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BasePlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BasePlayer_teamId_idx" ON "BasePlayer"("teamId");

-- AddForeignKey
ALTER TABLE "BasePlayer" ADD CONSTRAINT "BasePlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "BaseTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
