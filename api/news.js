import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.get('/', async (req, res) => {
    const CORS_PROXY = 'https://api.allorigins.win/get?url=';
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const NEWS_API_URL = `https://newsapi.org/v2/everything?q=general&apiKey=${NEWS_API_KEY}`;
    
    try {
        const response = await fetch(CORS_PROXY + encodeURIComponent(NEWS_API_URL));
        const data = await response.json();
        const jsonData = JSON.parse(data.contents);

        res.json(jsonData);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

export default router;
