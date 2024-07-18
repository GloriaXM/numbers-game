/*
  Warnings:

  - You are about to drop the `Opponent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Opponent" DROP CONSTRAINT "Opponent_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Opponent" DROP CONSTRAINT "Opponent_userId_fkey";

-- DropTable
DROP TABLE "Opponent";

-- CreateTable
CREATE TABLE "OpponentTeamPlayer" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL DEFAULT '',
    "outsideOffenseScore" INTEGER NOT NULL DEFAULT 0,
    "insideOffenseScore" INTEGER NOT NULL DEFAULT 0,
    "offenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
    "defenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
    "consistencyScore" INTEGER NOT NULL DEFAULT 0,
    "reboundingScore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OpponentTeamPlayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpponentTeamPlayer" ADD CONSTRAINT "OpponentTeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpponentTeamPlayer" ADD CONSTRAINT "OpponentTeamPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
