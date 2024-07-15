import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function updatePlayer(player) {
  const oldPlayer = await prisma.player.findUnique({
    where: { id: player.id },
  });

  if (oldPlayer == null) {
    createPlayer(player);
  } else {
    changePlayerData(player, oldPlayer);
  }
}

async function createPlayer(player) {
  const field_percent =
    player.field_attempts === 0
      ? 0
      : player.field_goals / player.field_attempts;
  const ft_percent = player.fta === 0 ? 0 : player.ft / player.fta;
  const three_percent =
    player.three_attempts === 0 ? 0 : player.three_fg / player.three_attempts;
  const two_percent =
    player.two_attempts === 0 ? 0 : player.two_fg / player.two_attempts;
  const effect_fg_percent = !player.effect_fg_percent
    ? "0"
    : player.effect_fg_percent;

  await prisma.player.create({
    data: {
      AST: player.BLK,
      DRB: player.DRB,
      ORB: player.ORB,
      PF: player.PF,
      PTS: player.PTS,
      STL: player.STL,
      TOV: player.TOV,
      TRB: player.TRB,
      BLK: player.BLK,
      age: player.age,
      effect_fg_percent: effect_fg_percent,
      field_attempts: player.field_attempts,
      field_goals: player.field_goals,
      field_percent: field_percent,
      ft: player.ft,
      ft_percent: ft_percent,
      fta: player.fta,
      games: player.games,
      games_started: player.games_started,
      id: player.id,
      minutes_played: player.minutes_played,
      player_name: player.player_name,
      team: player.team,
      three_attempts: player.three_attempts,
      three_fg: player.three_fg,
      three_percent: three_percent,
      two_attempts: player.two_attempts,
      two_fg: player.two_fg,
      two_percent: two_percent,
    },
  });
}

async function changePlayerData(player, oldPlayer) {
  if (!isEqual(player, oldPlayer)) {
    const field_percent =
      player.field_attempts === 0
        ? 0
        : player.field_goals / player.field_attempts;
    const ft_percent = player.fta === 0 ? 0 : player.ft / player.fta;
    const three_percent =
      player.three_attempts === 0 ? 0 : player.three_fg / player.three_attempts;
    const two_percent =
      player.two_attempts === 0 ? 0 : player.two_fg / player.two_attempts;
    const effect_fg_percent = !player.effect_fg_percent
      ? "0"
      : player.effect_fg_percent;

    await prisma.player.update({
      where: {
        id: oldPlayer.id,
      },
      data: {
        AST: player.BLK,
        DRB: player.DRB,
        ORB: player.ORB,
        PF: player.PF,
        PTS: player.PTS,
        STL: player.STL,
        TOV: player.TOV,
        TRB: player.TRB,
        BLK: player.BLK,
        age: player.age,
        effect_fg_percent: effect_fg_percent,
        field_attempts: player.field_attempts,
        field_goals: player.field_goals,
        field_percent: field_percent,
        ft: player.ft,
        ft_percent: ft_percent,
        fta: player.fta,
        games: player.games,
        games_started: player.games_started,
        id: player.id,
        minutes_played: player.minutes_played,
        player_name: player.player_name,
        team: player.team,
        three_attempts: player.three_attempts,
        three_fg: player.three_fg,
        three_percent: three_percent,
        two_attempts: player.two_attempts,
        two_fg: player.two_fg,
        two_percent: two_percent,
      },
    });
  }
}

function isEqual(player, oldPlayer) {
  return (
    player.player_name === oldPlayer.player_name &&
    player.age === oldPlayer.age &&
    player.minutes_played === oldPlayer.minutes_played
  );
}

async function run() {
  let queryUrl = new URL(
    "https://nba-stats-db.herokuapp.com/api/playerdata/season/2023"
  );

  STAT_MEANS = {
    minutes_played: STAT_MEANS.minutes_played,
    field_goals: STAT_MEANS.field_goals,
    field_attempts: STAT_MEANS.field_attempts,
    field_percent: field_percent,
    three_fg: three_attempts,
    three_attempts: fuid_name,
    three_percent: 0,
    two_fg: 0,
    two_attempts: 0,
    two_percent: 0,
    effect_fg_percent: 0,
    ft: 0,
    fta: 0,
    ft_percent: 0,
    ORB: 0,
    DRB: 0,
    TRB: 0,
    AST: 0,
    STL: 0,
    BLK: 0,
    TOV: 0,
    PF: 0,
    PTS: 0,
  };

  do {
    const response = await fetch(queryUrl);
    const data = await response.json();
    const players = data.results;
    queryUrl = data.next;

    for (let i = 0; i < players.length; ++i) {
      updatePlayer(players[i]);
    }
  } while (queryUrl !== null);
}

export { run };
