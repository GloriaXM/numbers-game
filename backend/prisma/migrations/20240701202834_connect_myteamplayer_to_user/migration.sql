/*
  Warnings:

  - You are about to drop the column `myTeam` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `MyTeamPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MyTeamPlayer_playerId_key";

-- AlterTable
ALTER TABLE "MyTeamPlayer" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "myTeam";

-- AddForeignKey
ALTER TABLE "MyTeamPlayer" ADD CONSTRAINT "MyTeamPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
