/*
  Warnings:

  - You are about to drop the column `performanceScore` on the `MyTeamPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `playingStyle` on the `MyTeamPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `performanceScore` on the `Opponent` table. All the data in the column will be lost.
  - You are about to drop the column `playingStyle` on the `Opponent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MyTeamPlayer" DROP COLUMN "performanceScore",
DROP COLUMN "playingStyle",
ADD COLUMN     "consistencyScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "defenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "insideOffenseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "offenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "outsideOffenseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reboundingScore" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Opponent" DROP COLUMN "performanceScore",
DROP COLUMN "playingStyle",
ADD COLUMN     "consistencyScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "defenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "insideOffenseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "offenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "outsideOffenseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reboundingScore" INTEGER NOT NULL DEFAULT 0;
