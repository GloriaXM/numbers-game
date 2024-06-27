import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

import express from 'express'
const app = express();

import {} from 'dotenv/config'
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: `http://localhost:5173`,
  credentials: true
}));
app.use(express.json());
app.use(morgan())

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`
));

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) // 1 year in milliseconds
    }
  })
);

app.use(userRoutes);

//TODO: refer back to lab code on getting user-specific data
