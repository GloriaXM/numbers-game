//Handles performance score calculations for cron job and recommendations
//Main methods are calcPerformanceStyles and generateRecommendations

import { PrismaClient } from "@prisma/client";
import {
  STAT_MEANS,
  STAT_VARIANCES,
  OPPONENT_STYLE_TO_MYTEAM_STYLE,
  STYLE_FEEDBACK,
} from "./statDictionaries.js";
const prisma = new PrismaClient();

const INIT_SCORE = 40;

function calcOutSideOffenseScore(
  field_attempts,
  three_attempts,
  three_fg,
  three_percent
) {
  let outsideOffenseScore = INIT_SCORE;

  //Normalize raw stats to population
  //TODO: pull calculating normalized stats up one level to avoid duplicate calculations
  const normalizedFieldAttempts =
    (field_attempts - STAT_MEANS.field_attempts) /
    Math.sqrt(STAT_VARIANCES.field_attempts);

  const normalizedThreeAttempts =
    (three_attempts - STAT_MEANS.three_attempts) /
    Math.sqrt(STAT_VARIANCES.three_attempts);

  const normalizedThreeFG =
    (three_fg - STAT_MEANS.three_fg) / Math.sqrt(STAT_VARIANCES.three_fg);

  const normalizedThreePercent =
    (three_percent - STAT_MEANS.three_percent) /
    Math.sqrt(STAT_VARIANCES.three_percent);

  const threesProportionVariance = calcRatioVariance(
    STAT_MEANS.three_attempts,
    STAT_VARIANCES.three_attempts,
    STAT_MEANS.field_attempts,
    STAT_VARIANCES.field_attempts
  );

  //Normalized proportion of 3 point shots taken relative to all shots taken
  const threesProportion =
    normalizedThreeAttempts == 0
      ? 0
      : (normalizedThreeAttempts / normalizedFieldAttempts -
          STAT_MEANS.three_attempts / STAT_MEANS.field_attempts) /
        Math.sqrt(threesProportionVariance);

  outsideOffenseScore += threesProportion * 5000;
  outsideOffenseScore += normalizedThreeFG * 15;
  outsideOffenseScore += normalizedThreePercent * 25;

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

  const normalizedFieldAttempts =
    (field_attempts - STAT_MEANS.field_attempts) /
    Math.sqrt(STAT_VARIANCES.field_attempts);

  const normalizedTwoAttempts =
    (two_attempts - STAT_MEANS.two_attempts) /
    Math.sqrt(STAT_VARIANCES.two_attempts);

  const normalizedTwoFG =
    (two_fg - STAT_MEANS.two_fg) / Math.sqrt(STAT_VARIANCES.two_fg);

  const normalizedTwoPercent =
    (two_percent - STAT_MEANS.two_percent) /
    Math.sqrt(STAT_VARIANCES.two_percent);

  const normalizedORB = (ORB - STAT_MEANS.ORB) / Math.sqrt(STAT_VARIANCES.ORB);

  const normalizedFTA =
    (fta - STAT_MEANS.fta) / Math.sqrt(STAT_VARIANCES.field_attempts);

  const normalizedFTPercent =
    (ft_percent - STAT_MEANS.ft_percent) / Math.sqrt(STAT_VARIANCES.ft_percent);

  const twosProportionVariance = calcRatioVariance(
    STAT_MEANS.two_attempts,
    STAT_VARIANCES.two_attempts,
    STAT_MEANS.field_attempts,
    STAT_VARIANCES.field_attempts
  );

  const twosProportion =
    normalizedTwoAttempts == 0
      ? 0
      : (normalizedTwoAttempts / normalizedFieldAttempts -
          STAT_MEANS.two_attempts / STAT_MEANS.field_attempts) /
        Math.sqrt(twosProportionVariance);

  insideOffenseScore += twosProportion * 10000;
  insideOffenseScore += normalizedTwoFG * 8;
  insideOffenseScore += normalizedTwoPercent * 15;
  insideOffenseScore += normalizedORB * 10;
  insideOffenseScore += normalizedFTA * 15;
  insideOffenseScore += normalizedFTPercent * 10;
  return insideOffenseScore;
}

function calcOffenseDisciplineScore(games, effect_fg_percent, TOV, ORB, AST) {
  let offenseDisciplineScore = INIT_SCORE;

  const normalizedEffectFGPercent =
    (effect_fg_percent - STAT_MEANS.effect_fg_percent) /
    Math.sqrt(STAT_VARIANCES.effect_fg_percent);

  const TOVPerGameVariance = calcRatioVariance(
    STAT_MEANS.TOV,
    STAT_VARIANCES.TOV,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const TOVPerGame =
    (TOV / games - STAT_MEANS.TOV / STAT_MEANS.games) /
    Math.sqrt(TOVPerGameVariance);

  const ORBPerGameVariance = calcRatioVariance(
    STAT_MEANS.ORB,
    STAT_VARIANCES.ORB,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const ORBPerGame =
    (ORB / games - STAT_MEANS.ORB / STAT_MEANS.games) /
    Math.sqrt(ORBPerGameVariance);

  const ASTPerGameVariance = calcRatioVariance(
    STAT_MEANS.AST,
    STAT_VARIANCES.AST,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const ASTPerGame =
    (AST / games - STAT_MEANS.AST / STAT_MEANS.games) /
    Math.sqrt(ASTPerGameVariance);

  offenseDisciplineScore += normalizedEffectFGPercent * 150;
  offenseDisciplineScore += TOVPerGame * 1000;
  offenseDisciplineScore += ORBPerGame * 1000;
  offenseDisciplineScore += ASTPerGame * 1000;

  return offenseDisciplineScore;
}

function calcDefenseDisciplineScore(games, DRB, STL, BLK, PF) {
  let defenseDisciplineScore = INIT_SCORE;

  const DRBPerGameVariance = calcRatioVariance(
    STAT_MEANS.DRB,
    STAT_VARIANCES.DRB,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const DRBPerGame =
    (DRB / games - STAT_MEANS.DRB / STAT_MEANS.games) /
    Math.sqrt(DRBPerGameVariance);

  const STLPerGameVariance = calcRatioVariance(
    STAT_MEANS.STL,
    STAT_VARIANCES.STL,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const STLPerGame =
    (STL / games - STAT_MEANS.STL / STAT_MEANS.games) /
    Math.sqrt(STLPerGameVariance);

  const BLKPerGameVariance = calcRatioVariance(
    STAT_MEANS.BLK,
    STAT_VARIANCES.BLK,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const BLKPerGame =
    (BLK / games - STAT_MEANS.BLK / STAT_MEANS.games) /
    Math.sqrt(BLKPerGameVariance);

  const PFPerGameVariance = calcRatioVariance(
    STAT_MEANS.PF,
    STAT_VARIANCES.PF,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const PFPerGame =
    (PF / games - STAT_MEANS.PF / STAT_MEANS.games) /
    Math.sqrt(PFPerGameVariance);

  defenseDisciplineScore +=
    1000 * (DRBPerGame + STLPerGame + BLKPerGame + PFPerGame);
  return defenseDisciplineScore;
}

function calcConsistencyScore(games) {
  return (
    INIT_SCORE + ((games - STAT_MEANS.games) / STAT_VARIANCES.games) * 1000
  );
}

function calcReboundingScore(games, ORB, DRB) {
  let reboundingScore = INIT_SCORE;

  const ORBPerGameVariance = calcRatioVariance(
    STAT_MEANS.ORB,
    STAT_VARIANCES.ORB,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const ORBPerGame =
    (ORB / games - STAT_MEANS.ORB / STAT_MEANS.games) /
    Math.sqrt(ORBPerGameVariance);

  const DRBPerGameVariance = calcRatioVariance(
    STAT_MEANS.DRB,
    STAT_VARIANCES.DRB,
    STAT_MEANS.games,
    STAT_VARIANCES.games
  );
  const DRBPerGame =
    (DRB / games - STAT_MEANS.DRB / STAT_MEANS.games) /
    Math.sqrt(DRBPerGameVariance);

  reboundingScore += 1500 * (ORBPerGame + DRBPerGame);
  return reboundingScore;
}

function calcRatioVariance(
  numeratorMean,
  numeratorVariance,
  denominatorMean,
  denominatorVariance
) {
  return (
    (numeratorMean / denominatorMean) ** 2 *
    (numeratorVariance ** 2 / numeratorMean ** 2 +
      denominatorVariance ** 2 / denominatorMean)
  );
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

  await prisma.player.update({
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

function sortPlayingStyles(player) {
  let scores = [
    { style: "outsideOffenseScore", score: player.outsideOffenseScore },
    { style: "insideOffenseScore", score: player.insideOffenseScore },
    { style: "offenseDisciplineScore", score: player.offenseDisciplineScore },
    { style: "defenseDisciplineScore", score: player.defenseDisciplineScore },
    { style: "consistencyScore", score: player.consistencyScore },
    { style: "reboundingScore", score: player.reboundingScore },
  ];

  scores.sort((styleA, styleB) => {
    return styleB.score - styleA.score;
  });

  return scores;
}

function calcTeamPlayingStyles(team) {
  const teamScores = {
    outsideOffenseScore: 0,
    insideOffenseScore: 0,
    offenseDisciplineScore: 0,
    defenseDisciplineScore: 0,
    consistencyScore: 0,
    reboundingScore: 0,
  };

  team.forEach((player) => {
    teamScores.outsideOffenseScore += player.outsideOffenseScore;
    teamScores.insideOffenseScore += player.insideOffenseScore;
    teamScores.offenseDisciplineScore += player.offenseDisciplineScore;
    teamScores.defenseDisciplineScore += player.defenseDisciplineScore;
    teamScores.consistencyScore += player.consistencyScore;
    teamScores.reboundingScore += player.reboundingScore;
  });

  const sortedScores = sortPlayingStyles(teamScores);
  return sortedScores;
}

function calcMostFittingStyles(idealStyle, myTeamStyles) {
  const idealStyles = OPPONENT_STYLE_TO_MYTEAM_STYLE[idealStyle.style];
  const NORMALIZING_CONST = 10;

  myTeamStyles.sort((styleA, styleB) => {
    const styleACompatibility =
      styleA.score +
      (NORMALIZING_CONST - idealStyles.indexOf(styleA.style)) *
        NORMALIZING_CONST;
    const styleBCompatibility =
      styleB.score +
      (NORMALIZING_CONST - idealStyles.indexOf(styleB.style)) *
        NORMALIZING_CONST;
    return styleBCompatibility - styleACompatibility;
  });

  return myTeamStyles;
}

function calcBestPlayers(bestFitStyle, teamPlayers) {
  teamPlayers.sort((playerA, playerB) => {
    const scoreA = playerA[bestFitStyle.style];
    const scoreB = playerB[bestFitStyle.style];
    return scoreB - scoreA;
  });
  return teamPlayers;
}

function generateFeedback(bestFitStyles) {
  const keyPoints = STYLE_FEEDBACK[bestFitStyles[0].style];
  const areasOfImprovement =
    STYLE_FEEDBACK[bestFitStyles[bestFitStyles.length - 1].style];
  return { keyPoints, areasOfImprovement };
}

async function getTeam(userId, teamType) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        [teamType]: true,
      },
    });
    const team = result[teamType];
    return team;
  } catch {
    return { error: "Could not get team players" };
  }
}

async function generateRecommendations(userId) {
  try {
    const opponentPlayers = await getTeam(userId, "opponents");
    const myTeamPlayers = await getTeam(userId, "myTeamPlayers");

    const opponentStyles = calcTeamPlayingStyles(opponentPlayers);
    const myTeamStyles = calcTeamPlayingStyles(myTeamPlayers);
    const bestFitStyles = calcMostFittingStyles(
      opponentStyles[0],
      myTeamStyles
    );

    const bestPlayers = calcBestPlayers(bestFitStyles[0], myTeamPlayers);
    const response = generateFeedback(bestFitStyles);
    const keyPoints = response.keyPoints;
    const areasOfImprovement = response.areasOfImprovement;
    return {
      response: {
        keyPoints,
        areasOfImprovement,
        recommendedStyle: bestFitStyles[0],
      },
      bestPlayers,
    };
  } catch (error) {
    return { error: "Cannot generate recommendations" };
  }
}

export { calcPerformanceScores, generateRecommendations };
