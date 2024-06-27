-- CreateTable
CREATE TABLE "FavoritedPlayer" (
    "id" SERIAL NOT NULL,
    "performanceScore" TEXT NOT NULL,
    "notes" TEXT[],
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "FavoritedPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoritedPlayer_playerId_key" ON "FavoritedPlayer"("playerId");

-- AddForeignKey
ALTER TABLE "FavoritedPlayer" ADD CONSTRAINT "FavoritedPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
