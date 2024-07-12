import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function calcPerformanceScores(playerId) {
  const playerStats = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });

  return {
    outsideOffenseScore: 50,
    insideOfenseScore: 50,
    offenseDisciplineScore: 50,
    defenseDisciplineScore: 50,
    consistencyScore: 50,
    reboundingScore: 50,
  };
}

export { checkForUpdate };
