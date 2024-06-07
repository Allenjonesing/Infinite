import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import newsRouter from './news.js';
import generateRouter from './generate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRouter);
app.use('/api/generate', generateRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
