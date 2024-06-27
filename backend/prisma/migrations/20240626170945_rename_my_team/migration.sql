/*
  Warnings:

  - You are about to drop the `FavoritedPlayer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoritedPlayer" DROP CONSTRAINT "FavoritedPlayer_playerId_fkey";

-- DropTable
DROP TABLE "FavoritedPlayer";

-- CreateTable
CREATE TABLE "MyTeamPlayer" (
    "id" SERIAL NOT NULL,
    "performanceScore" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "MyTeamPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MyTeamPlayer_playerId_key" ON "MyTeamPlayer"("playerId");

-- AddForeignKey
ALTER TABLE "MyTeamPlayer" ADD CONSTRAINT "MyTeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
