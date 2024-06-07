// server.mjs

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

app.use(express.json());

const handler = (req, res) => {
  res.json({ message: 'Hello, World!' });
};

app.get('/news', allowCors(async (req, res) => {
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
}));

app.post('/generate', allowCors(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI API error! Status: ${response.status} Response: ${errorText}`);
      if (response.status === 429) {
        throw new Error('You have exceeded your API quota. Please check your plan and billing details.');
      }
      throw new Error(`AI API error! Status: ${response.status} Response: ${errorText}`);
    }

    const data = await response.json();
    res.json(data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating AI response:', error.message);
    res.status(500).json({ error: 'Failed to generate AI response', details: error.message });
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
