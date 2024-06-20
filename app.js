let health = 100;
let healthText;
let target = null;
let newsData = []; // Global variable to store news articles
let setting = ''; // Global variable to store the game setting
let enemySpriteUrl = '';
let enemyImageBase64 = '';
let base64Image = '';
let npcBase64image = '';

class ExplorationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExplorationScene' });
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('tree', 'assets/tree.png');
        this.load.image('npc', 'assets/npc.png');
        // Enemy image will be dynamically loaded
    }

    async create() {
        console.log('create...');
        setting = prompt("Enter a setting for the game (e.g., Medieval, Futuristic, etc.):");

        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);

        // Create NPCs
        this.npcs = this.physics.add.group({ immovable: true });
        for (let i = 0; i < 5; i++) {
            let x = Phaser.Math.Between(50, 750);
            let y = Phaser.Math.Between(50, 550);
            this.npcs.create(x, y, 'npc').setCollideWorldBounds(true);
        }

        // Initialize enemies group
        this.enemies = this.physics.add.group();

        // Create trees
        this.trees = this.physics.add.staticGroup();
        for (let i = 0; i < 10; i++) {
            let x = Phaser.Math.Between(50, 750);
            let y = Phaser.Math.Between(50, 550);
            this.trees.create(x, y, 'tree');
        }

        // Add collisions
        this.physics.add.collider(this.player, this.npcs);
        this.physics.add.collider(this.player, this.trees);
        this.physics.add.collider(this.npcs, this.trees);
        this.physics.add.collider(this.npcs, this.npcs);

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
        const personas = await generatePersonas(setting);
        console.log('create... personas: ', personas);
        newsData = await fetchNews(personas, setting); // Store fetched news data globally
        console.log('create... newsData: ', newsData);

        this.npcs.children.iterate((npc, index) => {
            let persona = personas[index % personas.length]; // Cycle through personas
            npc.persona = persona;
            // Assign news articles to NPCs
            let newsIndex = index % newsData.length;
            npc.newsText = newsData[newsIndex].description; // or use AI response
        });

        // Enable NPC interaction
        this.npcs.children.iterate((npc) => {
            npc.setInteractive();
            npc.on('pointerdown', () => {
                alert(`${npc.persona.name}: ${npc.newsText}`);
            });
        });

        const newsArticle = newsData[0]; // Use the first article for the enemy
        enemyImageBase64 = await generateEnemyImage(newsArticle, setting);
        console.log('create... enemyImageBase64: ', enemyImageBase64);

        // Spawn enemies after data is ready
        spawnEnemies(this);
    }

    startBattle(player, enemy) {
        // Transition to the battle scene, passing necessary data
        this.scene.start('BattleScene', { player: this.player, enemy: enemy });
    }

    update() {
        if (target) {
            this.physics.moveTo(this.player, target.x, target.y, 100);
        }

        // Enemy movement towards player
        if (this.enemies && this.enemies.children) {
            this.enemies.children.iterate((enemy) => {
                this.physics.moveToObject(enemy, this.player, 50);
            });

            // Prevent enemies from sliding after being pushed
            this.enemies.children.iterate((enemy) => {
                if (enemy.body.speed > 0) {
                    enemy.body.setVelocity(0, 0);
                }
            });
        }

        // Prevent NPCs from sliding after being pushed
        this.npcs.children.iterate((npc) => {
            if (npc.body.speed > 0) {
                npc.body.setVelocity(0, 0);
            }
        });
    }
}

// Additional functions for handling damage and other game logic
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

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    preload() {
        console.log('preload... npcBase64image:', npcBase64image);
        console.log('preload... enemyImageBase64:', enemyImageBase64);
    
        if (npcBase64image) {
            try {
                this.textures.addBase64('npcBase64image', npcBase64image);
                console.log('preload... NPC Base64 image added successfully');
            } catch (error) {
                console.error('preload... Error adding NPC Base64 image:', error);
            }
        } else {
            console.error('preload... NPC Base64 image is missing');
        }
    
        if (enemyImageBase64) {
            try {
                this.textures.addBase64('enemyImageBase64', enemyImageBase64);
                console.log('preload... Enemy Base64 image added successfully');
            } catch (error) {
                console.error('preload... Error adding Enemy Base64 image:', error);
            }
        } else {
            console.error('preload... Enemy Base64 image is missing');
        }
    }
    
    async create(data) {
        this.player = data.player;
        this.enemy = data.enemy;
    
        // Initialize player and enemy data
        this.player = { name: 'Player', health: 100, speed: 5, sprite: null, actions: ['Attack', 'Defend'] };
        this.enemy = { name: 'Enemy', health: 100, speed: 3, sprite: null, actions: ['Attack'] };
    
        console.log('create... NPC Base64 image:', npcBase64image);
        console.log('create... Enemy Base64 image:', enemyImageBase64);
    
        if (npcBase64image) {
            this.textures.addBase64('npcBase64image', npcBase64image);
            console.log('create... NPC Base64 image added');
        } else {
            console.error('create... NPC Base64 image is missing');
        }
    
        if (enemyImageBase64) {
            this.textures.addBase64('enemyImageBase64', enemyImageBase64);
            console.log('create... Enemy Base64 image added');
        } else {
            console.error('create... Enemy Base64 image is missing');
        }
    
        // Use a custom timer to check when all Base64 images have been loaded
        this.loadTimer = this.time.addEvent({
            delay: 500,
            callback: this.checkTexturesLoaded,
            callbackScope: this,
            loop: true
        });
    }
    
    checkTexturesLoaded() {
        if (this.textures.exists('npcBase64image') && this.textures.exists('enemyImageBase64')) {
            console.log('All Base64 textures are loaded.');
    
            this.player.sprite = this.add.sprite(100, 300, 'npcBase64image');
            console.log('Player sprite added successfully');
    
            this.enemy.sprite = this.add.sprite(500, 300, 'enemyImageBase64');
            console.log('Enemy sprite added successfully');
    
            this.loadTimer.remove(false); // Stop the timer once textures are loaded
    
            // Initialize turn order and current turn index
            this.turnOrder = this.calculateTurnOrder();
            this.currentTurnIndex = 0;
    
            // Cooldown flag
            this.isCooldown = false;
    
            // Display UI elements
            this.createUI();
        } else {
            console.log('Waiting for Base64 textures to load...');
        }
    }
                
    update() {
        if (this.player.health <= 0) {
            this.endBattle('lose');
        } else if (this.enemy.health <= 0) {
            this.endBattle('win');
        }
    }

    endBattle(result) {
        if (result === 'win') {
            // Handle victory logic
        } else {
            // Handle defeat logic
        }

        // Return to the exploration scene
        this.scene.start('ExplorationScene', { player: this.player });
    }

    createUI() {
        // Display health bars and actions
        this.playerHealthText = this.add.text(50, 50, `Health: ${this.player.health}`, { fontSize: '20px', fill: '#fff' });
        this.enemyHealthText = this.add.text(450, 50, `Health: ${this.enemy.health}`, { fontSize: '20px', fill: '#fff' });

        // Display action buttons for the player
        this.actions = this.add.group();
        for (let i = 0; i < this.player.actions.length; i++) {
            let actionText = this.add.text(50, 100 + i * 30, this.player.actions[i], { fontSize: '20px', fill: '#fff' });
            actionText.setInteractive();
            actionText.on('pointerdown', () => this.handlePlayerAction(this.player.actions[i]));
            this.actions.add(actionText);
        }

        // Display turn order list
        this.turnOrderText = this.add.text(600, 50, 'Turn Order:', { fontSize: '20px', fill: '#fff' });
        this.updateTurnOrderDisplay();
    }

    calculateTurnOrder() {
        let participants = [
            { name: 'Player', speed: this.player.speed, sprite: this.player.sprite },
            { name: 'Enemy', speed: this.enemy.speed, sprite: this.enemy.sprite }
        ];

        let turnOrder = [];
        let currentTime = [0, 0]; // Initialize current times for both participants

        for (let i = 0; i < 10; i++) {
            // Determine whose turn is next based on speed and elapsed time
            let nextTurnIndex = currentTime[0] / participants[0].speed <= currentTime[1] / participants[1].speed ? 0 : 1;
            turnOrder.push(participants[nextTurnIndex]);
            currentTime[nextTurnIndex] += 1; // Increment the chosen participant's elapsed time
        }

        return turnOrder;
    }

    updateTurnOrderDisplay() {
        // Clear previous turn order text
        if (this.turnOrderList) {
            this.turnOrderList.destroy();
        }

        // Create new turn order text
        let orderText = '';
        for (let i = 0; i < 10; i++) {
            orderText += `${this.turnOrder[(this.currentTurnIndex + i) % this.turnOrder.length].name}\n`;
        }

        this.turnOrderList = this.add.text(600, 80, orderText, { fontSize: '20px', fill: '#fff' });

        // Add a fade-in effect for the turn order text
        this.turnOrderList.alpha = 0;
        this.tweens.add({
            targets: this.turnOrderList,
            alpha: 1,
            duration: 500,
            ease: 'Power1'
        });
    }

    handlePlayerAction(action) {
        if (!this.isCooldown && this.turnOrder[this.currentTurnIndex].name === 'Player') {
            if (action === 'Attack') {
                this.enemy.health -= 10;
                this.enemyHealthText.setText(`Health: ${this.enemy.health}`);
                this.playAttackAnimation(this.player.sprite, this.enemy.sprite);
            } else if (action === 'Defend') {
                // Implement defend logic
            }
            this.startCooldown();
        }
    }

    enemyAction() {
        if (!this.isCooldown && this.turnOrder[this.currentTurnIndex].name === 'Enemy') {
            this.player.health -= 10;
            this.playerHealthText.setText(`Health: ${this.player.health}`);
            this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
            this.startCooldown();
        }
    }

    startCooldown() {
        this.isCooldown = true;

        // Update turn order display immediately
        this.updateTurnOrderDisplay();

        // Set a timer for the cooldown period (e.g., 2 seconds)
        this.time.delayedCall(2000, () => {
            this.isCooldown = false;
            this.nextTurn();
        }, [], this);
    }

    nextTurn() {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        if (this.turnOrder[this.currentTurnIndex].name === 'Enemy') {
            this.enemyAction();
        } else {
            this.updateTurnOrderDisplay();
        }
    }

    playAttackAnimation(attacker, defender) {
        // Simple attack animation: move attacker sprite towards defender and back
        this.tweens.add({
            targets: attacker,
            x: defender.x - 50,
            duration: 300,
            yoyo: true,
            ease: 'Power1',
            onComplete: () => {
                // Optionally, add a hit effect or sound here
            }
        });
    }
}

async function generateEnemyImage(newsArticle, setting) {
    return new Promise(async function (resolve, reject) {
        console.log('generateEnemyImage... newsArticle: ', newsArticle);
        const prompt = `Generate an image of an enemy based on the following news article and setting:\n\nTitle: ${newsArticle.title}\nDescription: ${newsArticle.description}\nSetting: ${setting}`;
        const encodedPrompt = encodeURIComponent(prompt);

        try {
            const imageResponse = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test/db?prompt=${encodedPrompt}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt, generateImage: true })
            });

            if (!imageResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await imageResponse.json();
            const parsedBody = JSON.parse(data.body);
            if (parsedBody && parsedBody.base64_image) {
                console.log('generateEnemyImage... parsedBody.base64_image: ', parsedBody.base64_image);
                resolve(`data:image/png;base64,${parsedBody.base64_image}`);
            } else {
                console.error('generateEnemyImage... No image generated');
                reject(new Error('No image generated'));
            }
        } catch (error) {
            console.error('Error generating enemy image:', error);
            reject(new Error('No image generated'));
        }
    });
}

function spawnEnemies(scene) {
    console.log('spawnEnemies... ');
    if (newsData.length > 0) {
        const newsArticle = newsData[0]; // Use the first article for the enemy
        console.log('spawnEnemies... Generating new enemy image... ', newsArticle);
        const imageKey = 'enemyImageBase64';

        if (enemyImageBase64) {
            try {
                scene.textures.addBase64(imageKey, enemyImageBase64);
                console.log('spawnEnemies... enemyImageBase64 added:', enemyImageBase64);

                // Immediately check if the texture is added
                if (scene.textures.exists(imageKey)) {
                    console.log('Texture added and verified immediately.');
                } else {
                    console.error('Texture not found immediately after adding.');
                }

                // Log all texture keys to debug
                console.log('All texture keys:', scene.textures.getTextureKeys());
            } catch (error) {
                console.error('spawnEnemies... Error adding enemy Base64 image:', error);
                return;
            }
        } else {
            console.error('spawnEnemies... Enemy Base64 image is missing');
            return;
        }

        if (scene.textures.exists(imageKey)) {
            for (let i = 0; i < 3; i++) {
                let x = Phaser.Math.Between(50, 750);
                let y = Phaser.Math.Between(50, 550);
                let enemy = scene.enemies.create(x, y, imageKey); // Create enemies using the Base64 image
                enemy.setCollideWorldBounds(true);
                console.log('spawnEnemies... Enemy sprite added at', x, y);
            }
            // Add enemy collisions
            scene.physics.add.collider(scene.player, scene.enemies, scene.startBattle, null, scene);
            scene.physics.add.collider(scene.enemies, scene.trees);
            scene.physics.add.collider(scene.npcs, scene.enemies);
            scene.physics.add.collider(scene.enemies, scene.enemies);
        } else {
            console.error('spawnEnemies... Failed to verify enemy texture existence');
        }
    } else {
        console.error('No news data available to generate enemies');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ExplorationScene, BattleScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

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
        await generateAIResponses(structuredNews, personas, setting);
        loadingMessage.style.display = 'none';
        newsContainer.style.display = 'block';
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `<div class="error-message">Error fetching news: ${error.message}</div>`;
        loadingMessage.style.display = 'none';
        newsContainer.style.display = 'block';
    }
}

async function fetchNews(personas, setting) {
    console.log('fetchNews... personas: ', personas);
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
        newsData = structureNewsData(bodyData.articles.sort(() => 0.5 - Math.random()).slice(0, 1));
        let generatedAIResponses = await generateAIResponses(personas, setting);
        loadingMessage.style.display = 'none';
        newsContainer.style.display = 'block';
        return generatedAIResponses;
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

async function generateAIResponses(personas, setting) {
    console.log('generateAIResponses... newsData: ', newsData);
    console.log('generateAIResponses... personas: ', personas);
    console.log('generateAIResponses... personas.personas: ', personas.personas);
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ''; // Clear previous content
    const responses = [];

    let foundPersonas = [];
    if (personas) {
        if (personas.personas && personas.personas.length && typeof personas.personas == 'object') {
            foundPersonas = personas.personas;
        } else if (personas.length && typeof personas == 'object') {
            foundPersonas = personas;
        } else {
            // Failsafe
            foundPersonas = ['Bob the Loser', 'John the terrible', 'No Work Terk', 'Jery the dim', 'Jimmy the reclaimer'];
        }
    } else {
        // MEGA Failsafe
        foundPersonas = ['Bob the Loser', 'John the terrible', 'No Work Terk', 'Jery the dim', 'Jimmy the reclaimer'];
    }

    for (let i = 0; i < newsData.length; i++) {
        const news = newsData[i];
        const persona = foundPersonas[i % foundPersonas.length]; // Cycle through personas
        const prompt = `As ${persona.name}, ${persona.description}, As if narrating from the perspective of the player of the game, discuss the following news article:\n\nTitle: ${news.title}\nDescription: ${news.description}, as it pertains to the setting chosen: ${setting}. Be sure to really, REALLY, get into character and blend the article with the setting without revealing ANY Brand names, celebrity names, etc.`;
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
                throw new Error('Network response was not ok');
            }

            const aiResponse = await response.json(); // This converts the response body to JSON

            if (aiResponse
                && aiResponse.choices
                && aiResponse.choices.length
                && aiResponse.choices[0]
                && aiResponse.choices[0].message
                && aiResponse.choices[0].message.content) {
                const textContent = aiResponse.choices[0].message.content;

                const imgPrompt = `Generate an image of ${persona.name}, ${persona.description} in the setting chosen: ${setting}.`;
                const encodedPrompt = encodeURIComponent(imgPrompt); // Encoding the prompt

                try {
                    const imageResponse = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test/db?prompt=${encodedPrompt}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ prompt: imgPrompt, generateImage: true })
                    });

                    if (!imageResponse.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await imageResponse.json();
                    const parsedBody = JSON.parse(data.body);
                    if (parsedBody && parsedBody.base64_image) {
                        const base64string = `data:image/png;base64,${parsedBody.base64_image}`;
                        responses.push({ response: textContent, persona: persona, imageBase64: base64string });
                        displayAIResponse(news.title, textContent, persona, base64string);
                    } else {
                        throw new Error('No image generated');
                    }
                } catch (error) {
                    console.error('Error generating AI response:', error);
                    newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
                }
            }
        } catch (error) {
            console.error('Error generating AI response:', error);
            newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
        }
    }

    return responses;
}

async function displayAIResponse(newsTitle, aiResponse, persona, imageBase64) {
    const newsContainer = document.getElementById('news');
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';

    const titleElement = document.createElement('h2');
    titleElement.textContent = newsTitle;
    newsItem.appendChild(titleElement);

    const contentElement = document.createElement('p');
    contentElement.textContent = aiResponse;
    newsItem.appendChild(contentElement);

    if (imageBase64) {
        const imageElement = document.createElement('img');
        imageElement.setAttribute("id", "enemyImage");
        imageElement.src = imageBase64;
        imageElement.alt = 'Generated image';
        newsItem.appendChild(imageElement);
        npcBase64image = imageBase64;
    }

    const personaElement = document.createElement('p');
    personaElement.textContent = `Persona: ${persona.name}`;
    newsItem.appendChild(personaElement);

    newsContainer.appendChild(newsItem);
}

async function generatePersonas(setting) {
    const prompt = `Generate 5 short (5-10 word) and detailed fictional personas for a ${setting} setting in JSON format. Each persona should have a name and a description.`;
    const encodedPrompt = encodeURIComponent(prompt); // Encoding the prompt
    let parsedPersonas = [];

    try {
        const response = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test?prompt=${encodedPrompt}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const aiResponse = await response.json(); // This converts the response body to JSON

        if (aiResponse
            && aiResponse.choices
            && aiResponse.choices.length
            && aiResponse.choices[0]
            && aiResponse.choices[0].message
            && aiResponse.choices[0].message.content) {
            parsedPersonas = parsePersonas(aiResponse.choices[0].message.content);
        }
    } catch (error) {
        console.error('Error generating AI response:', error);
        const newsContainer = document.getElementById('news');
        newsContainer.innerHTML += `<div class="error-message">Error generating personas: ${error.message}</div>`;
    }

    return parsedPersonas;
}

function parsePersonas(content) {
    try {
        return JSON.parse(content);
    } catch (error) {
        console.error('Error parsing personas:', error);
        return [];
    }
}

async function fetchImageAsBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
