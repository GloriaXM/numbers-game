import { PrismaClient } from "@prisma/client";
import { STAT_MEANS, STAT_VARIANCES } from "./statDictionaries.js";
const prisma = new PrismaClient();

const INIT_SCORE = 40;

function calcOutSideOffenseScore(
  field_attempts,
  three_attempts,
  three_fg,
  three_percent
) {
  let outsideOffenseScore = INIT_SCORE;
  const normFieldAttempts =
    (field_attempts - STAT_MEANS.field_attempts) /
    Math.sqrt(STAT_VARIANCES.field_attempts);
  const normThreeAttempts =
    (three_attempts - STAT_MEANS.three_attempts) /
    Math.sqrt(STAT_VARIANCES.three_attempts);
  const normThreeFG =
    (three_fg - STAT_MEANS.three_fg) / Math.sqrt(STAT_VARIANCES.three_fg);
  const normThreePercent =
    (three_percent - STAT_MEANS.three_percent) /
    Math.sqrt(STAT_VARIANCES.three_percent);

  const threesProportionVariance =
    (STAT_MEANS.three_attempts / STAT_MEANS.field_attempts) ** 2 *
    (STAT_VARIANCES.three_attempts ** 2 / STAT_MEANS.three_attempts ** 2 +
      STAT_VARIANCES.field_attempts ** 2 / STAT_MEANS.field_attempts);
  const threesProportion =
    normThreeAttempts == 0
      ? 0
      : (normThreeAttempts / normFieldAttempts -
          STAT_MEANS.three_attempts / STAT_MEANS.field_attempts) /
        Math.sqrt(threesProportionVariance);

  outsideOffenseScore += threesProportion * 1000;

  outsideOffenseScore += normThreeFG * 10;

  outsideOffenseScore += normThreePercent * 10;

  return outsideOffenseScore;
}

function calcInsideOffenseScore(
  field_attempts,
  two_attempts,
  two_fg,
  two_percent,
  ORB,
  fta,
  ft_percent
) {
  let insideOffenseScore = INIT_SCORE;

  const normFieldAttempts =
    (field_attempts - STAT_MEANS.field_attempts) /
    Math.sqrt(STAT_VARIANCES.field_attempts);
  const normTwoAttemps =
    (two_attempts - STAT_MEANS.two_attempts) /
    Math.sqrt(STAT_VARIANCES.two_attempts);
  const normTwoFG =
    (two_fg - STAT_MEANS.two_fg) / Math.sqrt(STAT_VARIANCES.two_fg);
  const normTwoPercent =
    (two_percent - STAT_MEANS.two_percent) /
    Math.sqrt(STAT_VARIANCES.two_percent);
  const normORB = (ORB - STAT_MEANS.ORB) / Math.sqrt(STAT_VARIANCES.ORB);
  const normFTA =
    (fta - STAT_MEANS.fta) / Math.sqrt(STAT_VARIANCES.field_attempts);
  const normFTPercent =
    (ft_percent - STAT_MEANS.ft_percent) / Math.sqrt(STAT_VARIANCES.ft_percent);

  const twosProportionVariance =
    (STAT_MEANS.two_attempts / STAT_MEANS.field_attempts) ** 2 *
    (STAT_VARIANCES.two_attempts ** 2 / STAT_MEANS.two_attempts ** 2 +
      STAT_VARIANCES.field_attempts ** 2 / STAT_MEANS.two_attempts);
  const twosProportion =
    normTwoAttemps == 0
      ? 0
      : (normTwoAttemps / normFieldAttempts -
          STAT_MEANS.two_attempts / STAT_MEANS.field_attempts) /
        Math.sqrt(twosProportionVariance);

  insideOffenseScore += twosProportion * 10000;
  insideOffenseScore += normTwoFG * 8;
  insideOffenseScore += normTwoPercent * 15;
  insideOffenseScore += normORB * 10;
  insideOffenseScore += normFTA * 15;
  insideOffenseScore += normFTPercent * 10;
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

async function calcPerformanceScores(player) {
  const effect_fg_percent =
    parseFloat(player.effect_fg_percent) === 0
      ? 0
      : parseFloat(player.effect_fg_percent);
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
    player.ORB,
    player.fta,
    player.ft_percent
  );

  const offenseDisciplineScore = calcOffenseDisciplineScore(
    player.games,
    effect_fg_percent,
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

  const curr = await prisma.player.update({
    where: {
      id: player.id,
    },
    data: {
      outsideOffenseScore: outsideOffenseScore,
      insideOffenseScore: insideOffenseScore,
      offenseDisciplineScore: offenseDisciplineScore,
      defenseDisciplineScore: defenseDisciplineScore,
      consistencyScore: consistencyScore,
      reboundingScore: reboundingScore,
    },
  });
}

export { calcPerformanceScores };
