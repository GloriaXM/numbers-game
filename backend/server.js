import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import express from "express";
const app = express();

import {} from "dotenv/config";
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

app.use(
  cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan());

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })
);

app.use(userRoutes);

//GETS
app.get("/players", async (req, res) => {
  const { sortType, sortDirection, playerName } = req.query;

  if (sortType != "no_sort" && sortDirection != "no_direction") {
    const players = await prisma.player.findMany({
      where: {
        ...(playerName !== ""
          ? {
              player_name: {
                contains: playerName,
                mode: "insensitive",
              },
            }
          : {}),
      },
      orderBy: [
        {
          [sortType]: sortDirection,
        },
      ],
    });
    res.json(players);
  } else {
    const players = await prisma.player.findMany({
      where: {
        ...(playerName !== ""
          ? {
              player_name: {
                contains: playerName,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });
    res.json(players);
  }
});

app.get("/searchPlayers", async (req, res) => {
  const { playerName } = req.query;

  const players = await prisma.player.findMany({
    where: {
      player_name: {
        contains: playerName,
        mode: "insensitive",
      },
    },
  });

  res.json(players);
});

app.get("/myTeamPlayers", async (req, res) => {
  const userId = parseInt(req.query.userId);
  const players = await prisma.myTeamPlayer.findMany({
    where: {
      userId,
    },
  });
  res.json(players);
});

app.get("/singlePlayerStats", async (req, res) => {
  const playerId = parseInt(req.query.playerId);
  const player = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });
  res.json(player);
});

app.get("/opponents", async (req, res) => {
  const userId = parseInt(req.query.userId);
  const players = await prisma.opponent.findMany({
    where: {
      userId,
    },
  });
  res.json(players);
});

//POSTS
app.post("/myTeamPlayer", async (req, res) => {
  const playerId = parseInt(req.body.playerId);
  const userId = parseInt(req.body.userId);

  try {
    const existingPlayer = await prisma.myTeamPlayer.findMany({
      where: {
        playerId,
        userId,
      },
    });
    if (existingPlayer.length != 0) {
      return res
        .status(400)
        .json({ error: "Player has already been added to MyTeam" });
    }
    //TODO: define algorithm to calculate initial performance score
    const newMyTeamPlayer = await prisma.myTeamPlayer.create({
      data: {
        performanceScore: 50,
        playerId,
        userId,
      },
    });

    res.json({ player: newMyTeamPlayer });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//UPDATES
app.patch("/myTeamPlayer/performance", async (req, res) => {
  const playerId = parseInt(req.body.playerId);
  const performance = parseFloat(req.body.performance);

  try {
    //TODO: define algorithm to calculate initial performance score
    const newMyTeamPlayer = await prisma.myTeamPlayer.update({
      where: {
        id: playerId,
      },
      data: {
        performanceScore: performance,
      },
    });

    res.json({ player: newMyTeamPlayer });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//DELETES
app.delete("/myTeamPlayer", async (req, res) => {
  const playerId = parseInt(req.body.playerId);
  const player = await prisma.myTeamPlayer.delete({
    where: {
      id: playerId,
    },
  });

  //TODO: add error handling here
  res.json(player);
});

//Define cron job
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

cron.schedule("0 1 * * *", function () {
  run();
});
