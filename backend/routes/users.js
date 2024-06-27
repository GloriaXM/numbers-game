import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router();

// Route for user registration
router.post('/users', async (req, res) => {
  const { username, password} = req.body;
  console.log("HHERE")
  console.log(username);
  console.log(password)

  try {
    // Check if username or email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
        }
     });

    // Set the user in the session
    req.session.user = newUser;

    // Return the user data in the response
    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for user login
router.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set the user in the session
    req.session.user = user;

    // Return the user data in the response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
