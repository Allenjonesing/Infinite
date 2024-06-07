import fetch from 'node-fetch';

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const handler = async (req, res) => {
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
};

module.exports = allowCors(handler);
