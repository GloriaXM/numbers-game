/*
  Warnings:

  - The `effect_fg_percent` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "effect_fg_percent",
ADD COLUMN     "effect_fg_percent" DOUBLE PRECISION NOT NULL DEFAULT 0;
