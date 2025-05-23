import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '../routes/index'
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Routes
app.get('/', (req, res) => {
  res.send('Medical App API is running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Close Prisma when the app terminates
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});