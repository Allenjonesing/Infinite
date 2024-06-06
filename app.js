document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

async function fetchNews() {
    const loadingMessage = document.getElementById('loading');
    const newsContainer = document.getElementById('news');

    loadingMessage.style.display = 'block';
    newsContainer.style.display = 'none';

    const CORS_PROXY = 'https://api.allorigins.win/get?url=';
    const NEWS_API_KEY = '91512918f7c546c88c7c734f348c1709'; // Replace with your API key
    const NEWS_API_URL = `https://newsapi.org/v2/everything?q=general&apiKey=${NEWS_API_KEY}`; // Changed to a general lookup

    try {
        const response = await fetch(CORS_PROXY + encodeURIComponent(NEWS_API_URL));
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const jsonData = JSON.parse(data.contents);
        if (!jsonData.articles) {
            throw new Error('No articles found in the response');
        }

        const structuredNews = structureNewsData(jsonData.articles);
        await generateAIResponse(structuredNews);
        loadingMessage.style.display = 'none';
        newsContainer.style.display = 'block';
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `<div class="error-message">Error fetching news: ${error.message}</div>`;
        loadingMessage.style.display = 'none';
        newsContainer.style.display = 'block';
    }
}

function structureNewsData(articles) {
    return articles.map(article => {
        return {
            title: article.title,
            description: article.description,
            url: article.url
        };
    });
}

async function generateAIResponse(newsData) {
    const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
    const prompt = `Generate a discussion about the following news articles:\n\n${newsData.map(news => `${news.title}: ${news.description}`).join('\n\n')}`;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
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
        displayAIResponse(data.choices[0].text);
    } catch (error) {
        console.error('Error generating AI response:', error);
        const newsContainer = document.getElementById('news');
        newsContainer.innerHTML = `<div class="error-message">Error generating AI response: ${error.message}</div>`;
    }
}

function displayAIResponse(responseText) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = `<div class="ai-response">${responseText}</div>`;
}
