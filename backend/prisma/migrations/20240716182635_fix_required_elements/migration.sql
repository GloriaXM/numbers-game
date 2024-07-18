/*
  Warnings:

  - You are about to drop the column `myTeamUserId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `opponentUserId` on the `Player` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_myTeamUserId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_opponentUserId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "myTeamUserId",
DROP COLUMN "opponentUserId";

-- CreateTable
CREATE TABLE "_myTeamPlayers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_opponents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_myTeamPlayers_AB_unique" ON "_myTeamPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_myTeamPlayers_B_index" ON "_myTeamPlayers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_opponents_AB_unique" ON "_opponents"("A", "B");

-- CreateIndex
CREATE INDEX "_opponents_B_index" ON "_opponents"("B");

-- AddForeignKey
ALTER TABLE "_myTeamPlayers" ADD CONSTRAINT "_myTeamPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_myTeamPlayers" ADD CONSTRAINT "_myTeamPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_opponents" ADD CONSTRAINT "_opponents_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_opponents" ADD CONSTRAINT "_opponents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
