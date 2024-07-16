/*
  Warnings:

  - You are about to drop the `MyTeamPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpponentTeamPlayer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `myTeamUserId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentUserId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MyTeamPlayer" DROP CONSTRAINT "MyTeamPlayer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "MyTeamPlayer" DROP CONSTRAINT "MyTeamPlayer_userId_fkey";

-- DropForeignKey
ALTER TABLE "OpponentTeamPlayer" DROP CONSTRAINT "OpponentTeamPlayer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "OpponentTeamPlayer" DROP CONSTRAINT "OpponentTeamPlayer_userId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "consistencyScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "defenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "insideOffenseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "myTeamUserId" INTEGER NOT NULL,
ADD COLUMN     "offenseDisciplineScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "opponentUserId" INTEGER NOT NULL,
ADD COLUMN     "outsideOffenseScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reboundingScore" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "MyTeamPlayer";

-- DropTable
DROP TABLE "OpponentTeamPlayer";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_myTeamUserId_fkey" FOREIGN KEY ("myTeamUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_opponentUserId_fkey" FOREIGN KEY ("opponentUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
