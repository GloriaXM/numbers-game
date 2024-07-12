/*
  Warnings:

  - The `playingStyle` column on the `MyTeamPlayer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `playingStyle` column on the `Opponent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MyTeamPlayer" DROP COLUMN "playingStyle",
ADD COLUMN     "playingStyle" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Opponent" DROP COLUMN "playingStyle",
ADD COLUMN     "playingStyle" TEXT[] DEFAULT ARRAY[]::TEXT[];
