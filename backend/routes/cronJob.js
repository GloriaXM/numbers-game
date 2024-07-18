//This file holds the functions run during the daily cron job to update the database

import { PrismaClient } from "@prisma/client";
import {
  STAT_MEANS,
  STAT_VARIANCES,
  POP_SIZE,
  incrementPopSize,
} from "./statDictionaries.js";
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
    ? "0"
    : player.effect_fg_percent;

  delete player.season;

  if (!isEqual(player, oldPlayer)) {
    player = await createOrUpdate(player);
  }
  updatePopulationStats(player);
}

function updatePopulationStats(player) {
  if (POP_SIZE === 0) {
    Object.keys(STAT_MEANS).forEach(function (stat) {
      if (stat !== "effect_fg_percent") {
        STAT_MEANS[stat] = player[stat];
      }
    });

    STAT_MEANS.effect_fg_percent = parseFloat(player.effect_fg_percent);
  } else {
    Object.keys(STAT_MEANS).forEach(function (stat) {
      if (stat !== "effect_fg_percent") {
        STAT_MEANS[stat] =
          (STAT_MEANS[stat] * POP_SIZE + player[stat]) / (POP_SIZE + 1);

        STAT_VARIANCES[stat] =
          (POP_SIZE / (POP_SIZE + 1)) *
          (STAT_VARIANCES[stat] +
            (player[stat] - STAT_MEANS[stat]) ** 2 / (POP_SIZE + 1));
      }
    });

    const effect_fg_percent_float = parseFloat(player.effect_fg_percent);
    STAT_MEANS.effect_fg_percent =
      (STAT_MEANS.effect_fg_percent * POP_SIZE + effect_fg_percent_float) /
      (POP_SIZE + 1);

    STAT_VARIANCES.effect_fg_percent =
      (POP_SIZE / (POP_SIZE + 1)) *
      (STAT_VARIANCES.effect_fg_percent +
        (effect_fg_percent_float -
          (STAT_MEANS.effect_fg_percent / POP_SIZE) ** 2) /
          (POP_SIZE + 1));
  }

  incrementPopSize();
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

  //TODO: use two for loops to calculate population stats and calculate performance scores
  allPlayers.forEach((player) => {
    calcPerformanceScores(player);
  });
}

export { run, updatePopulationStats };
