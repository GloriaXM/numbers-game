/*
  Warnings:

  - You are about to drop the column `minutes_pg` on the `Player` table. All the data in the column will be lost.
  - You are about to alter the column `field_goals` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `field_attempts` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `three_fg` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `three_attempts` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `two_fg` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `two_attempts` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `ft` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fta` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `ORB` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `DRB` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `TRB` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `AST` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `STL` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `BLK` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `TOV` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `PF` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `PTS` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `minutes_played` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "minutes_pg",
ADD COLUMN     "minutes_played" INTEGER NOT NULL,
ALTER COLUMN "field_goals" SET DATA TYPE INTEGER,
ALTER COLUMN "field_attempts" SET DATA TYPE INTEGER,
ALTER COLUMN "three_fg" SET DATA TYPE INTEGER,
ALTER COLUMN "three_attempts" SET DATA TYPE INTEGER,
ALTER COLUMN "two_fg" SET DATA TYPE INTEGER,
ALTER COLUMN "two_attempts" SET DATA TYPE INTEGER,
ALTER COLUMN "ft" SET DATA TYPE INTEGER,
ALTER COLUMN "fta" SET DATA TYPE INTEGER,
ALTER COLUMN "ORB" SET DATA TYPE INTEGER,
ALTER COLUMN "DRB" SET DATA TYPE INTEGER,
ALTER COLUMN "TRB" SET DATA TYPE INTEGER,
ALTER COLUMN "AST" SET DATA TYPE INTEGER,
ALTER COLUMN "STL" SET DATA TYPE INTEGER,
ALTER COLUMN "BLK" SET DATA TYPE INTEGER,
ALTER COLUMN "TOV" SET DATA TYPE INTEGER,
ALTER COLUMN "PF" SET DATA TYPE INTEGER,
ALTER COLUMN "PTS" SET DATA TYPE INTEGER;
