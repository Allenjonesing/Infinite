document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
const personas = ['Peasant Farmer who is living in fear', 'Enslaved worker under the evil reign', 'Evil Overlord who\'s captured the land ', 'Tired Knight unable to continue in battle', 'Greedy merchant overcharging weary Knights and poor peasants'];

let health = 100;
let healthText;
let target = null;
let enemies;

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('tree', 'assets/tree.png');
    this.load.image('npc', 'assets/npc.png');
    this.load.image('enemy', 'assets/enemy.png');
}

async function create() {
    // Create player
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);

    // Create NPCs
    this.npcs = this.physics.add.group({
        immovable: true
    });
    for (let i = 0; i < 5; i++) {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.npcs.create(x, y, 'npc').setCollideWorldBounds(true);
    }

    // Create enemies
    enemies = this.physics.add.group();
    spawnEnemies(this);

    // Create trees
    this.trees = this.physics.add.staticGroup();
    for (let i = 0; i < 10; i++) {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.trees.create(x, y, 'tree');
    }

    // Add collisions
    this.physics.add.collider(this.player, this.npcs);
    this.physics.add.collider(this.player, enemies, takeDamage, null, this);
    this.physics.add.collider(this.player, this.trees);
    this.physics.add.collider(this.npcs, this.trees);
    this.physics.add.collider(enemies, this.trees);
    this.physics.add.collider(this.npcs, enemies);
    this.physics.add.collider(this.npcs, this.npcs);
    this.physics.add.collider(enemies, enemies);

    // Health HUD
    healthText = this.add.text(16, 16, 'Health: 100', { fontSize: '32px', fill: '#fff' });

    // Input handling
    this.input.on('pointerdown', (pointer) => {
        target = { x: pointer.x, y: pointer.y };
    });

    this.input.on('pointerup', () => {
        target = null;
        this.player.body.setVelocity(0, 0);
    });

    // Fetch news data and generate AI responses
    const newsData = await fetchNews();

// Assign news articles to NPCs
this.npcs.children.iterate((npc, index) => {
    let newsIndex = index % newsData.length;
    npc.newsText = newsData[newsIndex].description; // or use AI response
});

// Enable NPC interaction
this.npcs.children.iterate((npc) => {
    npc.setInteractive();
    npc.on('pointerdown', () => {
        alert(npc.newsText);
    });
});

    // Periodically spawn more enemies
    this.time.addEvent({
        delay: 5000, // Spawn every 5 seconds
        callback: () => spawnEnemies(this),
        callbackScope: this,
        loop: true
    });
}

function update() {
    if (target) {
        this.physics.moveTo(this.player, target.x, target.y, 100);
    }

    // Enemy movement towards player
    enemies.children.iterate((enemy) => {
        this.physics.moveToObject(enemy, this.player, 50);
    });

    // Prevent NPCs from sliding after being pushed
    this.npcs.children.iterate((npc) => {
        if (npc.body.speed > 0) {
            npc.body.setVelocity(0, 0);
        }
    });

    // Prevent enemies from sliding after being pushed
    enemies.children.iterate((enemy) => {
        if (enemy.body.speed > 0) {
            enemy.body.setVelocity(0, 0);
        }
    });
}

function takeDamage(player, enemy) {
    health -= 0.1; // Reduce health gradually
    healthText.setText('Health: ' + Math.max(Math.round(health), 0));

    if (health <= 0) {
        // Handle player death (restart game or end game)
        this.physics.pause();
        player.setTint(0xff0000);
        healthText.setText('Health: 0');
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
        await generateAIResponses(structuredNews);        loadingMessage.style.display = 'none';
        newsContainer.style.display = 'block';
        return structuredNews;
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `<div class="error-message">Error fetching news: ${error.message}</div>`;
        loadingMessage.style.display = 'none';
        newsContainer.style.display = 'block';
        return [];
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

    for (let i = 0; i < newsData.length; i++) {
        const news = newsData[i];
        const persona = personas[i % personas.length]; // Cycle through personas
        const prompt = `As a ${persona} in teh dark ages, discuss the following news article as if it were happening here and causing these enemies to spawn:\n\nTitle: ${news.title}\nDescription: ${news.description}`;
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
                displayAIResponse(news.title, data, persona);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        } catch (error) {
            console.error('Error generating AI response:', error);
            newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
        }
    }
}

function displayAIResponse(newsTitle, aiResponse, persona) {
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
                <div class="ai-response">
                    <p><strong>${persona}:</strong> ${aiResponse.choices[0].message.content}</p>
                </div>
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

function spawnEnemies(scene) {
    for (let i = 0; i < 3; i++) {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        let enemy = enemies.create(x, y, 'enemy');
        enemy.setCollideWorldBounds(true);
    }
}