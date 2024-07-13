import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const INIT_SCORE = 40;

function calcOutSideOffenseScore(
  field_attempts,
  three_attempts,
  three_fg,
  three_percent
) {
  let outsideOffenseScore = INIT_SCORE;

  if (field_attempts !== 0) {
    outsideOffenseScore = (three_attempts / field_attempts) * 50;
  }

  outsideOffenseScore += (three_percent - 0.33) * 1000;

  outsideOffenseScore += three_fg / 50;

  return outsideOffenseScore;
}

function calcInsideOffenseScore(
  field_attempts,
  two_attempts,
  two_fg,
  two_percent,
  games,
  ORB,
  fta,
  ft_percent
) {
  let insideOffenseScore = INIT_SCORE;

  if (field_attempts !== 0) {
    insideOffenseScore += (two_attempts / field_attempts) * 50;
  }

  insideOffenseScore += two_fg / 80;

  if (two_percent != 0) {
    insideOffenseScore += (two_percent - 0.5) * 50;
  }

  if (games != 0) {
    insideOffenseScore += ORB / games + (fta * ft_percent) / games;
  }

  return insideOffenseScore;
}

function calcOffenseDisciplineScore(games, effect_fg_percent, TOV, ORB, AST) {
  let offenseDisciplineScore = INIT_SCORE;

  offenseDisciplineScore += (effect_fg_percent - 0.53) * 100;

  if (games != 0) {
    offenseDisciplineScore += (2 * (10 * ORB - 6 * TOV + 5 * AST)) / games;
  }

  return offenseDisciplineScore;
}

function calcDefenseDisciplineScore(games, DRB, STL, BLK, PF) {
  let defenseDisciplineScore = INIT_SCORE;

  if (games != 0) {
    defenseDisciplineScore += (5 * DRB + 7 * STL + 7 * BLK - 8 * PF) / games;
  }
  return defenseDisciplineScore;
}

function calcConsistencyScore(games) {
  return INIT_SCORE + games / 2;
}

function calcReboundingScore(games, ORB, DRB) {
  if (games === 0) {
    return INIT_SCORE;
  }

  return INIT_SCORE - 10 + 10 * (ORB / games) + 6 * (DRB / games);
}

async function calcPerformanceScores(playerId) {
  let player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });

  const outsideOffenseScore = calcOutSideOffenseScore(
    player.field_attempts,
    player.three_attempts,
    player.three_fg,
    player.three_percent
  );

  const insideOffenseScore = calcInsideOffenseScore(
    player.field_attempts,
    player.two_attempts,
    player.two_fg,
    player.two_percent,
    player.games,
    player.ORB,
    player.fta,
    player.ft_percent
  );

  const offenseDisciplineScore = calcOffenseDisciplineScore(
    player.games,
    parseFloat(player.effect_fg_percent),
    player.TOV,
    player.ORB,
    player.AST
  );

  const defenseDisciplineScore = calcDefenseDisciplineScore(
    player.games,
    player.DRB,
    player.STL,
    player.BLK,
    player.PF
  );

  const consistencyScore = calcConsistencyScore(player.games);

  const reboundingScore = calcReboundingScore(
    player.games,
    player.ORB,
    player.DRB
  );

  return {
    outsideOffenseScore: outsideOffenseScore,
    insideOffenseScore: insideOffenseScore,
    offenseDisciplineScore: offenseDisciplineScore,
    defenseDisciplineScore: defenseDisciplineScore,
    consistencyScore: consistencyScore,
    reboundingScore: reboundingScore,
  };
}

export { calcPerformanceScores };
