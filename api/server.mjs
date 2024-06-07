import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import newsRouter from './news.js';
import generateRouter from './generate.js';

app.use('/api/news', newsRouter);
app.use('/api/generate', generateRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
