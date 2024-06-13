document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('npc', 'assets/npc.png');
    this.load.image('enemy', 'assets/enemy.png');
}

function create() {
    // Create player
    this.player = this.physics.add.sprite(400, 300, 'player');

    // Create NPCs
    this.npcs = this.physics.add.group();
    for (let i = 0; i < 5; i++) {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.npcs.create(x, y, 'npc');
    }

    // Create enemies
    this.enemies = this.physics.add.group();
    for (let i = 0; i < 5; i++) {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.enemies.create(x, y, 'enemy');
    }

    // Input handling
    this.input.on('pointerdown', (pointer) => {
        this.physics.moveTo(this.player, pointer.x, pointer.y, 200);
    });

    // Fetch news data and generate AI responses
    fetch('/news')
        .then(response => response.json())
        .then(data => {
            this.newsData = data;

            // Assign news articles to NPCs
            this.npcs.children.iterate((npc, index) => {
                let newsIndex = index % this.newsData.length;
                npc.newsText = this.newsData[newsIndex].title; // or use AI response
            });
        });

        // Enable NPC interaction
        this.npcs.children.iterate((npc) => {
        npc.setInteractive();
        npc.on('pointerdown', () => {
            alert(npc.newsText);
        });
    });

    // Add trees
    this.trees = this.physics.add.staticGroup();
    for (let i = 0; i < 10; i++) {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.trees.create(x, y, 'tree');
    }

    // Collision handling between player and trees
    this.physics.add.collider(this.player, this.trees);
}

function update() {
    // Player movement logic
    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.input.x, this.input.y) < 4) {
        this.player.body.setVelocity(0, 0);
    }
}

async function connectToDb() {
    try {
        const apiUrl = 'https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com';
        const newsEndpoint = '/test/db';
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
        const structuredNews = structureNewsData(bodyData.articles.sort(() => 0.5 - Math.random()).slice(0, 5));
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
        const structuredNews = structureNewsData(bodyData.articles.sort(() => 0.5 - Math.random()).slice(0, 5));
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

            // if (!response.ok) {
            //     const errorText = await response.text();
            //     throw new Error(`Proxy server error! Status: ${response.status} Response: ${errorText}`);
            // }

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

function displayAIResponse(newsTitle, aiResponse) {
    const newsContainer = document.getElementById('news');
    if (aiResponse 
        && aiResponse.choices 
        && aiResponse.choices.length 
        && aiResponse.choices[0] 
        && aiResponse.choices[0].message
        && aiResponse.choices[0].message.content )
        {
            newsContainer.innerHTML += `
            <div class="news-article">
            <h3>${newsTitle}</h3>
            <div class="ai-response">${aiResponse.choices[0].message.content}</div>
            </div>
            `;
        } else {
            console.error('No choices found!');
            newsContainer.innerHTML += `
            <div class="news-article">
            <h3>${newsTitle}</h3>
            <div class="ai-response">No choices found!</div>
            </div>
            `;
        }
}