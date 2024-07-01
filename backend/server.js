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

app.get("/recent", async (req, res) => {
  const offset = new Date();
  offset.setTime(Date.now() - 5 * 60 * 1000);
  const board = await prisma.board.findMany({
    where: { createdAt: { gte: offset } },
  });
  res.json(board);
});
