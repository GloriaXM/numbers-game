/*
  Warnings:

  - Changed the type of `performanceScore` on the `MyTeamPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `field_percent` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `three_percent` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `two_percent` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ft_percent` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MyTeamPlayer" DROP COLUMN "performanceScore",
ADD COLUMN     "performanceScore" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "field_percent",
ADD COLUMN     "field_percent" DOUBLE PRECISION NOT NULL,
DROP COLUMN "three_percent",
ADD COLUMN     "three_percent" DOUBLE PRECISION NOT NULL,
DROP COLUMN "two_percent",
ADD COLUMN     "two_percent" DOUBLE PRECISION NOT NULL,
DROP COLUMN "ft_percent",
ADD COLUMN     "ft_percent" DOUBLE PRECISION NOT NULL;
