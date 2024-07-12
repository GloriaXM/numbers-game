import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function calcPerformanceScores(playerId) {
  let player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });
  let outsideOffenseScore = 40;

  if (player.field_attempts !== 0) {
    outsideOffenseScore =
      (player.three_attempts / player.field_attempts) * 50 +
      (player.three_percent - 0.33) * 1000;
  }
  //TODO: implement other formulas

  return {
    outsideOffenseScore: outsideOffenseScore,
    insideOffenseScore: 50,
    offenseDisciplineScore: 50,
    defenseDisciplineScore: 50,
    consistencyScore: 50,
    reboundingScore: 50,
  };
}

export { calcPerformanceScores };
