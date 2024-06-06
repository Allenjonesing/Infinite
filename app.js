document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

function fetchNews() {
    const loadingMessage = document.getElementById('loading');
    const newsContainer = document.getElementById('news');
    
    loadingMessage.style.display = 'block';
    newsContainer.style.display = 'none';

    const CORS_PROXY = 'https://api.allorigins.win/get?url=';
    const NEWS_API_KEY = '91512918f7c546c88c7c734f348c1709'; // Replace with your API key
    const NEWS_API_URL = `https://newsapi.org/v2/everything?q=general&apiKey=${NEWS_API_KEY}`; // Changed to a general lookup

    fetch(CORS_PROXY + encodeURIComponent(NEWS_API_URL))
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const jsonData = JSON.parse(data.contents);
            if (!jsonData.articles) {
                throw new Error('No articles found in the response');
            }
            const structuredNews = structureNewsData(jsonData.articles);
            displayNews(structuredNews);
            loadingMessage.style.display = 'none';
            newsContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = `<div class="error-message">Error fetching news: ${error.message}</div>`;
            loadingMessage.style.display = 'none';
            newsContainer.style.display = 'block';
        });
}

function structureNewsData(articles) {
    return articles.map(article => {
        return {
            title: article.title,
            description: article.description,
            url: article.url,
            activity: generateActivity(article)
        };
    });
}

function generateActivity(article) {
    return {
        type: 'question',
        content: `Based on the article titled "${article.title}", what is the main suspect's motive?`,
        options: [
            "Revenge",
            "Money",
            "Passion",
            "Unknown"
        ],
        correctAnswer: "Unknown" // Example answer, modify as needed
    };
}

function displayNews(newsData) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = '';

    newsData.forEach(news => {
        const newsArticle = document.createElement('div');
        newsArticle.className = 'news-article';

        const title = document.createElement('div');
        title.className = 'news-title';
        title.textContent = news.title;

        const description = document.createElement('div');
        description.className = 'news-description';
        description.textContent = news.description;

        const activity = document.createElement('div');
        activity.className = 'news-activity';
        activity.textContent = `Activity: ${news.activity.content}`;

        const options = document.createElement('div');
        options.className = 'activity-options';

        news.activity.options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.addEventListener('click', () => checkAnswer(news.activity, option));
            options.appendChild(optionButton);
        });

        newsArticle.appendChild(title);
        newsArticle.appendChild(description);
        newsArticle.appendChild(activity);
        newsArticle.appendChild(options);
        newsContainer.appendChild(newsArticle);
    });
}

function checkAnswer(activity, selectedOption) {
    if (selectedOption === activity.correctAnswer) {
        alert('Correct!');
    } else {
        alert('Incorrect, try again.');
    }
}
