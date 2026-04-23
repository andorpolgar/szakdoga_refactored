/*
  Warnings:

  - Added the required column `defending` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dribbling` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overall` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pace` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passing` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physical` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shooting` to the `BasePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defending` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dribbling` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overall` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pace` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passing` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physical` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shooting` to the `SavePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BasePlayer" ADD COLUMN     "defending" INTEGER NOT NULL,
ADD COLUMN     "dribbling" INTEGER NOT NULL,
ADD COLUMN     "lineupPosition" TEXT,
ADD COLUMN     "marketValue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "overall" INTEGER NOT NULL,
ADD COLUMN     "pace" INTEGER NOT NULL,
ADD COLUMN     "passing" INTEGER NOT NULL,
ADD COLUMN     "physical" INTEGER NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "shooting" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SavePlayer" ADD COLUMN     "defending" INTEGER NOT NULL,
ADD COLUMN     "dribbling" INTEGER NOT NULL,
ADD COLUMN     "isTransferListed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lineupPosition" TEXT,
ADD COLUMN     "marketValue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "overall" INTEGER NOT NULL,
ADD COLUMN     "pace" INTEGER NOT NULL,
ADD COLUMN     "passing" INTEGER NOT NULL,
ADD COLUMN     "physical" INTEGER NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "shooting" INTEGER NOT NULL;
