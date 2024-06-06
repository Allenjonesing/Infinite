document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

async function fetchNews() {
    const loadingMessage = document.getElementById('loading');
    const newsContainer = document.getElementById('news');

    loadingMessage.style.display = 'block';
    newsContainer.style.display = 'none';

    const CORS_PROXY = 'https://api.allorigins.win/get?url=';
    const NEWS_API_KEY = process.env.NEWS_API_KEY; // Ensure this is set in your environment
    const NEWS_API_URL = `https://newsapi.org/v2/everything?q=general&apiKey=${NEWS_API_KEY}`; // General lookup

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
    const prompt = `Generate a discussion about the following news articles:\n\n${newsData.map(news => `${news.title}: ${news.description}`).join('\n\n')}`;

    try {
        const response = await fetch('http://localhost:3000/generate', {  // Ensure your proxy server is running locally
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error(`Proxy server error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayAIResponse(data);
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
