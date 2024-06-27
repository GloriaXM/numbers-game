const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors()); // Allow backend to make requests to frontend

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`
));

app.post('/players', async (req, res) => {
  const {imagesrc, boardname, boardtype, description} = req.body;
  const newBoard = await prisma.board.create({
      data: {
          imageSrc: imagesrc,
          boardName: boardname,
          boardType: boardtype,
          description: description
      }
  });
  res.json(newBoard);
});
