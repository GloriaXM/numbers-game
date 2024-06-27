import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
// import { User, Post } from './models/index.js';
import userRoutes from './routes/users.js';
// const {PrismaClient} = require('@prisma/client');
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

import express from 'express'
const app = express();

// require('dotenv').config()
import {} from 'dotenv/config'
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: `http://localhost:${PORT}`,
  credentials: true
}));
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan())

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`
));

// Session middleware
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

// app.use(userRoutes);

// Route to get all posts, with associated users
// app.get('/posts', async (req, res) => {
//   try {
//     const posts = await Post.findAll({
//       include: [{ model: User, as: 'user' }],
//       order: [['createdAt', 'DESC']]
//     });
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Route to create a new post
// app.post('/posts', async (req, res) => {
//   try {
//     // Check if user is logged in
//     if (!req.session.user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Retrieve the current user from the session
//     const currentUser = req.session.user;

//     // Create the post with the current user ID
//     const post = await Post.create({
//       ...req.body,
//       userId: currentUser.id
//     });

//     const postWithUser = await Post.findOne({
//       where: { id: post.id },
//       include: [{ model: User, as: 'user' }]
//     });

//     res.status(201).json(postWithUser);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// sequelize.sync({ alter: true })
//   .then(() => {
//     const port = 3000;
//     app.listen(port, () => {
//       console.log(`App is listening on port ${port}`);
//     });
//   })
//   .catch(error => {
//     console.error('Unable to connect to the database:', error);
//   });
