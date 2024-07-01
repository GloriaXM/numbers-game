/*
  Warnings:

  - You are about to drop the column `minutes_played` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `player_name` on the `Player` table. All the data in the column will be lost.
  - Added the required column `minutes_pg` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "minutes_played",
DROP COLUMN "player_name",
ADD COLUMN     "minutes_pg" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "field_goals" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "field_attempts" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "three_fg" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "three_attempts" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "two_fg" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "two_attempts" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ft" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fta" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ORB" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "DRB" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "TRB" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "AST" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "STL" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "BLK" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "TOV" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "PF" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "PTS" SET DATA TYPE DOUBLE PRECISION;
