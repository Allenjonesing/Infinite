import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error(`AI API error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data.choices[0].text);
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({ error: 'Failed to generate AI response' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
