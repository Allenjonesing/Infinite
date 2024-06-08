document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

async function fetchNews() {
    const loadingMessage = document.getElementById('loading');
    const newsContainer = document.getElementById('news');

    loadingMessage.style.display = 'block';
    newsContainer.style.display = 'none';

    try {
        const VercelUrl = 'https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com';
        const newsEndpoint = '/test';
        const allOriginsUrl = 'https://api.allorigins.win/get?url=';
        const response = await fetch(VercelUrl + newsEndpoint, {
            headers: {
                'Authorization': `Bearer E6RTRBlGoC7V94MGmgSk2usz`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        if (!jsonData || !jsonData.body || !jsonData.body.articles) {
            throw new Error('No articles found in the response');
        }

        // Limit to 5 articles
        const structuredNews = structureNewsData(jsonData.articles.slice(0, 5));
        await generateAIResponses(structuredNews);
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

async function generateAIResponses(newsData) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ''; // Clear previous content

    for (const news of newsData) {
        const prompt = `Discuss the following news article:\n\nTitle: ${news.title}\nDescription: ${news.description}`;

        try {
            const response = await fetch('https://infinite-pqi7ezojz-allen-jones-projects.vercel.app/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Proxy server error! Status: ${response.status} Response: ${errorText}`);
            }

            const data = await response.json();
            displayAIResponse(news.title, data);
        } catch (error) {
            console.error('Error generating AI response:', error);
            newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
        }
    }
}

function displayAIResponse(newsTitle, responseText) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML += `
        <div class="news-article">
            <h3>${newsTitle}</h3>
            <div class="ai-response">${responseText}</div>
        </div>
    `;
}
