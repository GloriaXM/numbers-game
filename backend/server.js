import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
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
  }),
);
app.use(express.json());
app.use(morgan());

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
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
  }),
);

app.use(userRoutes);

//POSTS
app.post("/player", async (req, res) => {
  const {
    AST,
    BLK,
    DRB,
    ORB,
    PF,
    PTS,
    STL,
    TOV,
    TRB,
    age,
    effect_fg_percent,
    field_attempts,
    field_goals,
    field_percent,
    ft,
    ft_percent,
    fta,
    games,
    games_started,
    id,
    minutes_played,
    player_name,
    team,
    three_attempts,
    three_fg,
    three_percent,
    two_attempts,
    two_fg,
    two_percent,
  } = req.body;

  const newPlayer = await prisma.player.create({
    data: {
      AST,
      BLK,
      DRB,
      ORB,
      PF,
      PTS,
      STL,
      TOV,
      TRB,
      age,
      effect_fg_percent,
      field_attempts,
      field_goals,
      field_percent,
      ft,
      ft_percent,
      fta,
      games,
      games_started,
      id,
      minutes_played,
      player_name,
      team,
      three_attempts,
      three_fg,
      three_percent,
      two_attempts,
      two_fg,
      two_percent,
    },
  });
  res.json(newPlayer);
});

app.post("/myTeamPlayer", async (req, res) => {
  const { performanceScore, playerId } = req.body;

  const newPlayer = await prisma.myTeamPlayer.create({
    data: {
      performanceScore,
      playerId,
    },
  });
  res.json(newPlayer);
});

//GETS
app.get("/player", async (req, res) => {
  const { team, orderParam, ascending } = req.query;
  let orderBy = {};

  switch (orderParam) {
    case "three_percent":
      orderBy = { three_percent: ascending };
      break;
    default:
      orderBy = { id: "asc" };
  }

  const players = await prisma.player.findMany({
    where: { team },
    orderBy,
  });
  res.json(players);
});

//TODO: this should be a direct fetch from the third party api
app.get("/player/:id", async (req, res) => {
  const id = req.params.id;

  const player = await prisma.player.findUnique({
    where: { id },
  });
  res.json(player);
});

//TODO: decide if we expect to make a lot of state changes / if it should be stored as state array or in datatbase
app.get("/myTeamPlayer", async (req, res) => {
  const players = await prisma.myTeamPlayer.findMany({
    where: {
      id,
    },
  });
  res.json(players);
});

app.patch("/myTeamPlayer", async (req, res) => {
  const { id, performanceScore, playerId } = req.body;

  const newPlayer = await prisma.myTeamPlayer.update({
    where: {
      id,
    },
    data: {
      performanceScore,
      playerId,
    },
  });
  res.json(newPlayer);
});

app.delete("/myTeamPlayer", async (req, res) => {
  const id = req.body.id;
  await prisma.myTeamPlayer.delete({
    where: {
      id: id,
    },
  });

  //TODO: add error handling here
  res.status(204).send();
});
