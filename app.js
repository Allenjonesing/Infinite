document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

async function fetchNews() {
    const loadingMessage = document.getElementById('loading');
    const newsContainer = document.getElementById('news');

    loadingMessage.style.display = 'block';
    newsContainer.style.display = 'none';

    try {
        const apiUrl = 'https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com';
        const newsEndpoint = '/test';
        const response = await fetch(apiUrl + newsEndpoint);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        
        if (!jsonData) {
            throw new Error('No Data gathered!');
        }

        // Parsing the stringified JSON data in the body
        const bodyData = JSON.parse(jsonData.body);
        
        if (!bodyData) {
            throw new Error('No body found in the response!');
        }

        if (!bodyData.articles) {
            throw new Error('No articles found in the body!');
        }

        // Limit to 5 articles
        const structuredNews = structureNewsData(bodyData.articles.slice(0, 5));
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
        const encodedPrompt = encodeURIComponent(prompt); // Encoding the prompt

        try {
            const response = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test?prompt=${encodedPrompt}`, {
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

            console.log('typeof response: ', typeof response);
            console.log('response: ', response);
            console.log('typeof response.text(): ', typeof response.text());
            console.log('response.text(): ', response.text());
            console.log('typeof response.data: ', typeof response.data);
            console.log('response.data: ', response.data);
            displayAIResponse(news.title, response);
        } catch (error) {
            console.error('Error generating AI response:', error);
            newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
        }
    }
}

function displayAIResponse(newsTitle, responseText) {
    const content = extractFirstChoiceContent(responseText);
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML += `
        <div class="news-article">
            <h3>${newsTitle}</h3>
            <div class="ai-response">${content}</div>
        </div>
    `;
}

function extractFirstChoiceContent(response) {
    // Strip the leading "b'" and trailing single quote if present
    if (response.startsWith("b'")) {
        response = response.slice(2, -1);
    }

    // Replace escaped backslashes and newlines to properly format the JSON
    response = response.replace(/\\\\n/g, "").replace(/\\"/g, '"');

    // Parse the JSON string into an object
    const responseObject = JSON.parse(response);

    // Access the first choice's content
    const content = responseObject.choices[0].message.content;

    return content;
}

