document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

function fetchNews() {
    fetch('/news')
        .then(response => response.json())
        .then(data => {
            const structuredNews = structureNewsData(data.articles);
            displayNews(structuredNews);
        })
        .catch(error => console.error('Error fetching news:', error));
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
    // Generate a question based on the article
    return {
        type: 'question', // other types could be 'puzzle', 'clue', etc.
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
