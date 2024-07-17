import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { calcPerformanceScores } from "./routes/scoreCalculations.js";
import { run } from "./routes/cronJob.js";
const prisma = new PrismaClient();

import express from "express";
const app = express();

import {} from "dotenv/config";
import { STAT_MEANS, STAT_VARIANCES } from "./routes/statDictionaries.js";
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
  const players = await prisma.opponentTeamPlayer.findMany({
    where: {
      userId,
    },
  });
  res.json(players);
});

app.get("/teams/startingFive", async (req, res) => {
  const playingStyle = req.query.playingStyle;
  const userId = parseInt(req.query.userId);
  const teamType = req.query.teamType;

  const players = await prisma[teamType].findMany({
    where: { userId },
    orderBy: [
      {
        [playingStyle]: "desc",
      },
    ],
  });
  res.json(players);
});

app.get("/scoutOpponent", async (req, res) => {
  const userId = parseInt(req.query.userId);
  return {};
});

//POSTS
app.post("/player", async (req, res) => {
  const playerType = req.body.playerType;
  const playerId = parseInt(req.body.playerId);
  const userId = parseInt(req.body.userId);
  const playerName = decodeURI(req.body.playerName);

  try {
    const existingPlayer = await prisma[playerType].findMany({
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

    const performanceScores = await calcPerformanceScores(playerId);

    const newPlayer = await prisma[playerType].create({
      data: {
        playerId,
        userId,
        playerName,
        outsideOffenseScore: performanceScores.outsideOffenseScore,
        insideOffenseScore: performanceScores.insideOffenseScore,
        offenseDisciplineScore: performanceScores.offenseDisciplineScore,
        defenseDisciplineScore: performanceScores.defenseDisciplineScore,
        consistencyScore: performanceScores.consistencyScore,
        reboundingScore: performanceScores.reboundingScore,
      },
    });

    res.json({ player: newPlayer });
  } catch (error) {
    res.status(500).json({ error: error });
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
app.delete("/teamPlayer", async (req, res) => {
  const playerId = parseInt(req.body.playerId);
  const teamType = req.body.teamType;

  const player = await prisma[teamType].delete({
    where: {
      id: playerId,
    },
  });

  //TODO: add error handling here
  res.json(player);
});

cron.schedule("46 11 * * *", function () {
  run();
});
