import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router();

//Route for user signup
router.post('/users', async (req, res) => {
  const { username, password} = req.body;
  console.log("HHERE")
  console.log(username);
  console.log(password)

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
        }
     });

    req.session.user = newUser;

    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.session.user = user;

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
