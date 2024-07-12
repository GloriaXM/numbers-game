-- AlterTable
ALTER TABLE "MyTeamPlayer" ADD COLUMN     "playingStyle" TEXT NOT NULL DEFAULT 'versatile';

-- CreateTable
CREATE TABLE "Opponent" (
    "id" SERIAL NOT NULL,
    "performanceScore" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "playingStyle" TEXT NOT NULL DEFAULT 'versatile',

    CONSTRAINT "Opponent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opponent" ADD CONSTRAINT "Opponent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opponent" ADD CONSTRAINT "Opponent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
