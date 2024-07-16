-- DropForeignKey
ALTER TABLE "MyTeamPlayer" DROP CONSTRAINT "MyTeamPlayer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "MyTeamPlayer" DROP CONSTRAINT "MyTeamPlayer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Opponent" DROP CONSTRAINT "Opponent_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Opponent" DROP CONSTRAINT "Opponent_userId_fkey";

-- AddForeignKey
ALTER TABLE "MyTeamPlayer" ADD CONSTRAINT "MyTeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyTeamPlayer" ADD CONSTRAINT "MyTeamPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opponent" ADD CONSTRAINT "Opponent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opponent" ADD CONSTRAINT "Opponent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
