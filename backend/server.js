import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { generateRecommendations } from "./routes/scoreCalculations.js";
import { run } from "./routes/cronJob.js";
import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const FRONTEND_PORT = process.env.FRONTEND_PORT;
const prisma = new PrismaClient();
const app = express();

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
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //One month expiration in milliseconds
    },
  })
);

app.use(userRoutes);

//GETS
app.get("/players", async (req, res) => {
  const { sortType, sortDirection, playerName } = req.query;

  if (sortType != "no_sort" && sortDirection != "no_direction") {
    try {
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
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }
});

app.get("/teamPlayers", async (req, res) => {
  const userId = parseInt(req.query.userId);
  const teamType = req.query.teamType;
  const playingStyle =
    req.query.playingStyle == null
      ? "outsideOffenseScore"
      : req.query.playingStyle;

  try {
    const players = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        [teamType]: {
          orderBy: {
            [playingStyle]: "desc",
          },
        },
      },
    });

    res.json(players);
  } catch (error) {
    console.error(error);
  }
});

app.get("/scoutOpponent", async (req, res) => {
  const userId = parseInt(req.query.userId);
  try {
    const result = await generateRecommendations(userId);
    return res.json(result);
  } catch {
    console.error(error);
  }
});

//UPDATES
app.patch("/player", async (req, res) => {
  const playerType = req.body.playerType;
  const playerId = parseInt(req.body.playerId);
  const userId = parseInt(req.body.userId);

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        [playerType]: {
          connect: {
            id: playerId,
          },
        },
      },
    });

    res.json({ response: "Player added to team" });
  } catch (error) {
    console.error(error);
  }
});

//DELETES
app.delete("/player", async (req, res) => {
  const playerId = parseInt(req.body.playerId);
  const teamType = req.body.teamType;
  const userId = req.body.userId;

  try {
    const player = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { [teamType]: { disconnect: { id: playerId } } },
    });

    res.json(player);
  } catch (error) {
    console.error(error);
  }
});

//CRON_JOB for deployment
app.get("/cronJob", async (req, res) => {
  run();
});

//Cron Job
//Run the cron job every day at midnight
cron.schedule("16 11 * * *", function () {
  run();
});
