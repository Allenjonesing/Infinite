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
            fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test?prompt=${encodedPrompt}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // This converts the response body to JSON
            })
            .then(data => {
                console.log('data: ', data); // Now 'data' is a JavaScript object
                console.log('typeof data: ', typeof data); // Now 'data' is a JavaScript object
                displayAIResponse(news.title, data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Proxy server error! Status: ${response.status} Response: ${errorText}`);
            }

            // const jsonResponse = response.json();
            // console.log('typeof jsonResponse: ', typeof jsonResponse);
            // console.log('jsonResponse: ', jsonResponse);
            // console.log('typeof jsonResponse.text(): ', typeof jsonResponse.text());
            // console.log('response.jsonResponse(): ', response.jsonResponse());
            // console.log('typeof jsonResponse.data: ', typeof jsonResponse.data);
            // console.log('jsonResponse.data: ', jsonResponse.data);
            // displayAIResponse(news.title, response);
        } catch (error) {
            console.error('Error generating AI response:', error);
            newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
        }
    }
}

function displayAIResponse(newsTitle, apiResponse) {
    const content = extractFirstChoiceContent(apiResponse);
    console.log('typeof content: ', typeof content);
    console.log('content: ', content);
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

    // Replace escaped backslashes and escape control characters
    response = response.replace(/\\\\/g, '\\').replace(/\\'/g, "'");

    // Decode Unicode escape sequences and escape control characters in JSON string literals
    response = response.replace(/\\n/g, "\\n").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t");

    // Attempt to parse the JSON string into an object
    let responseObject;
    try {
        responseObject = JSON.parse(response);
    } catch (e) {
        console.error("Error parsing JSON:", e);
        return null;
    }

    // Access the first choice's content if available
    if (responseObject && responseObject.choices && responseObject.choices.length > 0) {
        const content = responseObject.choices[0].message.content;
        return content;
    } else {
        return "No content available";
    }
}
