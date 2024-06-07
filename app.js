async function fetchNews() {
    const loadingMessage = document.getElementById('loading');
    const newsContainer = document.getElementById('news');
  
    loadingMessage.style.display = 'block';
    newsContainer.style.display = 'none';
  
    try {
      const response = await fetch('https://infinite-51b8nfu8e-allen-jones-projects.vercel.app/api/news');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      if (!jsonData.articles) {
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
  