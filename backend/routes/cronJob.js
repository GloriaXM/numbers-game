//This file holds the functions run during the daily cron job to update the database

import { PrismaClient } from "@prisma/client";
import { STAT_MEANS, STAT_VARIANCES } from "./statDictionaries.js";
import { calcPerformanceScores } from "./scoreCalculations.js";
const prisma = new PrismaClient();

async function updatePlayer(player) {
  const oldPlayer = await prisma.player.findUnique({
    where: { id: player.id },
  });

  player.field_percent =
    player.field_attempts === 0
      ? 0
      : player.field_goals / player.field_attempts;
  player.ft_percent = player.fta === 0 ? 0 : player.ft / player.fta;
  player.three_percent =
    player.three_attempts === 0 ? 0 : player.three_fg / player.three_attempts;
  player.two_percent =
    player.two_attempts === 0 ? 0 : player.two_fg / player.two_attempts;
  player.effect_fg_percent = !player.effect_fg_percent
    ? 0
    : parseFloat(player.effect_fg_percent);

  delete player.season;

  if (!isEqual(player, oldPlayer)) {
    player = await createOrUpdate(player);
  }
}

function resetPopulationStats() {
  Object.keys(STAT_MEANS).forEach(function (stat) {
    STAT_MEANS[stat] = 0;
    STAT_VARIANCES[stat] = 0;
  });
}

function updatePopulationTotal(player) {
  Object.keys(STAT_MEANS).forEach(function (stat) {
    STAT_MEANS[stat] += player[stat];
  });
}

function calcVariance(player) {
  Object.keys(STAT_VARIANCES).forEach(function (stat) {
    STAT_VARIANCES[stat] += (player[stat] - STAT_MEANS[stat]) ** 2;
  });
}

async function createOrUpdate(player) {
  const newPlayer = await prisma.player.upsert({
    where: { id: player.id },
    update: { ...player },
    create: { ...player },
  });

  return newPlayer;
}

function isEqual(player, oldPlayer) {
  if (oldPlayer == null) {
    return false;
  }

  return (
    player.player_name === oldPlayer.player_name &&
    player.age === oldPlayer.age &&
    player.games === oldPlayer.games
  );
}

async function run() {
  let queryUrl = new URL(
    "https://nba-stats-db.herokuapp.com/api/playerdata/season/2023"
  );

  do {
    const response = await fetch(queryUrl);
    const data = await response.json();
    const players = data.results;
    queryUrl = data.next;

    for (let i = 0; i < players.length; ++i) {
      updatePlayer(players[i]);
    }
  } while (queryUrl !== null);

  const allPlayers = await prisma.player.findMany();

  resetPopulationStats();
  allPlayers.forEach((player) => {
    updatePopulationTotal(player);
  });
  const popSize = allPlayers.length;
  Object.keys(STAT_MEANS).forEach(function (stat) {
    STAT_MEANS[stat] /= popSize;
  });

  allPlayers.forEach((player) => {
    calcVariance(player);
  });
  Object.keys(STAT_VARIANCES).forEach(function (stat) {
    STAT_VARIANCES[stat] /= popSize;
  });

  allPlayers.forEach((player) => {
    calcPerformanceScores(player);
  });
}

export { run };
