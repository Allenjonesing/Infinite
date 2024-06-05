import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const NEWS_API_KEY = '91512918f7c546c88c7c734f348c1709'; // Replace with your API key
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=true crime&apiKey=${NEWS_API_KEY}`;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/news', async (req, res) => {
    try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
