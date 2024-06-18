let health = 100;
let healthText;
let target = null;

class ExplorationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExplorationScene' });
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('tree', 'assets/tree.png');
        this.load.image('npc', 'assets/npc.png');
        this.load.image('enemy', 'assets/enemy.png');
    }

    async create() {
        console.log('create...');
        let setting = prompt("Enter a setting for the game (e.g., Medieval, Futuristic, etc.):");

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

        // Create enemies
        this.enemies = this.physics.add.group();
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
        this.physics.add.collider(this.player, this.enemies, this.startBattle, null, this);
        this.physics.add.collider(this.player, this.trees);
        this.physics.add.collider(this.npcs, this.trees);
        this.physics.add.collider(this.enemies, this.trees);
        this.physics.add.collider(this.npcs, this.enemies);
        this.physics.add.collider(this.npcs, this.npcs);
        this.physics.add.collider(this.enemies, this.enemies);

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
        const newsData = await fetchNews(personas, setting);
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
                alert(`${npc.persona}: ${npc.response}`);
            });
        });

        // Periodically spawn more enemies
        // this.time.addEvent({
        //     delay: 5000, // Spawn every 5 seconds
        //     callback: () => spawnEnemies(this),
        //     callbackScope: this,
        //     loop: true
        // });
    }

    update() {
        if (target) {
            this.physics.moveTo(this.player, target.x, target.y, 100);
        }

        // Enemy movement towards player
        this.enemies.children.iterate((enemy) => {
            this.physics.moveToObject(enemy, this.player, 50);
        });

        // Prevent NPCs from sliding after being pushed
        this.npcs.children.iterate((npc) => {
            if (npc.body.speed > 0) {
                npc.body.setVelocity(0, 0);
            }
        });

        // Prevent enemies from sliding after being pushed
        this.enemies.children.iterate((enemy) => {
            if (enemy.body.speed > 0) {
                enemy.body.setVelocity(0, 0);
            }
        });
    }

    startBattle(player, enemy) {
        // Transition to the battle scene, passing necessary data
        this.scene.start('BattleScene', { player: player, enemy: enemy });
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
        // Load assets for the battle scene
    }

    create(data) {
        this.player = data.player;
        this.enemy = data.enemy;

        // Initialize player and enemy data
        this.player = { name: 'Player', health: 100, speed: 5, sprite: null, actions: ['Attack', 'Defend'] };
        this.enemy = { name: 'Enemy', health: 100, speed: 3, sprite: null, actions: ['Attack'] };

        // Display player and enemy sprites
        this.player.sprite = this.add.sprite(100, 300, 'player');
        this.enemy.sprite = this.add.sprite(500, 300, 'enemy');

        // Initialize turn order and current turn index
        this.turnOrder = this.calculateTurnOrder();
        this.currentTurnIndex = 0;

        // Display UI elements
        this.createUI();
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
        let currentTime = 0;

        for (let i = 0; i < 10; i++) {
            participants.sort((a, b) => (currentTime + 1) / a.speed - (currentTime + 1) / b.speed);
            turnOrder.push(participants[0]);
            currentTime += 1 / participants[0].speed;
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
    }

    handlePlayerAction(action) {
        if (this.turnOrder[this.currentTurnIndex].name === 'Player') {
            if (action === 'Attack') {
                this.enemy.health -= 10;
                this.enemyHealthText.setText(`Health: ${this.enemy.health}`);
                this.playAttackAnimation(this.player.sprite, this.enemy.sprite);
            } else if (action === 'Defend') {
                // Implement defend logic
            }
            this.nextTurn();
        }
    }

    enemyAction() {
        if (this.turnOrder[this.currentTurnIndex].name === 'Enemy') {
            this.player.health -= 10;
            this.playerHealthText.setText(`Health: ${this.player.health}`);
            this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
            this.nextTurn();
        }
    }

    nextTurn() {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        if (this.turnOrder[this.currentTurnIndex].name === 'Enemy') {
            this.enemyAction();
        }
        this.updateTurnOrderDisplay();
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

function spawnEnemies(scene) {
    for (let i = 0; i < 3; i++) {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        let enemy = scene.enemies.create(x, y, 'enemy');
        enemy.setCollideWorldBounds(true);
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
        const structuredNews = structureNewsData(bodyData.articles.sort(() => 0.5 - Math.random()).slice(0, 1));
        let generatedAIResponses = await generateAIResponses(structuredNews, personas, setting);
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

async function generateAIResponses(newsData, personas, setting) {
    console.log('generateAIResponses... newsData: ', newsData);
    console.log('generateAIResponses... personas: ', personas);
    console.log('generateAIResponses... personas.personas: ', personas.personas);
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ''; // Clear previous content
    const responses = [];

    let foundPersonas = [];
    console.log('generateAIResponses... newsData: ', newsData);
    if (personas) {
        console.log('generateAIResponses... personas: ', personas);
        console.log('generateAIResponses... personas.personas: ', personas.personas);
        console.log('generateAIResponses... typeof personas.personas: ', typeof personas.personas);
        console.log('generateAIResponses... typeof personas: ', typeof personas);
        console.log('generateAIResponses... personas.length: ', personas.length);
        if (personas.personas && personas.personas.length && typeof personas.personas == 'object') {
            console.log('foundPersonas = personas.personas...');
            foundPersonas = personas.personas;
        } else if (personas.length && typeof personas == 'object') {
            console.log('foundPersonas = personas...');
            foundPersonas = personas;
        } else {
            // Failsafe
            console.log('Failsafe...');
            foundPersonas = ['Bob the Loser', 'John the terrible', 'No Work Terk', 'Jery the dim', 'Jimmy the reclaimer'];
        }
    } else {
        // MEGA Failsafe
        console.log('Mega Failsafe...');
        foundPersonas = ['Bob the Loser', 'John the terrible', 'No Work Terk', 'Jery the dim', 'Jimmy the reclaimer'];
    }
    console.log('generateAIResponses... foundPersonas: ', foundPersonas);

    for (let i = 0; i < newsData.length; i++) {
        const news = newsData[i];
        console.log('generateAIResponses... looped news: ', news);
        const persona = foundPersonas[i % foundPersonas.length]; // Cycle through personas
        console.log('generateAIResponses... looped persona: ', persona);
        const prompt = `As ${persona.name}, ${persona.description}, As if talking to the player of the game, discuss the following news article:\n\nTitle: ${news.title}\nDescription: ${news.description}, as it pertains to the setting chosen: ${setting}. Be sure to really, REALLY, get into character and blend the article with the setting without revealing ANY Brand names, celebrity names, etc.`;
        console.log('generateAIResponses... looped prompt: ', prompt);
        const encodedPrompt = encodeURIComponent(prompt); // Encoding the prompt

        try {
            const response = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test?prompt=${encodedPrompt}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const aiResponse = await response.json(); // This converts the response body to JSON
            
            if (aiResponse 
                && aiResponse.choices 
                && aiResponse.choices.length 
                && aiResponse.choices[0] 
                && aiResponse.choices[0].message
                && aiResponse.choices[0].message.content )
                {
                    const textContent = aiResponse.choices[0].message.content;
                    //responses.push({ response: aiResponse.choices[0].message.content, persona: persona });
                    
                    const imgPrompt = `Generate an image of ${persona.name}, ${persona.description} in the setting chosen: ${setting}.`;
                    console.log('generateAIResponses...  imgPrompt: ', imgPrompt);
                    const encodedPrompt = encodeURIComponent(imgPrompt); // Encoding the prompt
            
                    try {
                        const imageResponse  = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test/db?prompt=${encodedPrompt}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ prompt: imgPrompt, generateImage: true  })
                        })
            
                        if (!imageResponse .ok) {
                            throw new Error('Network response was not ok');
                        }
                        
                        const imageAIResponse = await imageResponse.json(); // This converts the response body to JSON
                        
                        if (imageAIResponse 
                            && imageAIResponse.data 
                            && imageAIResponse.data.length 
                            && imageAIResponse.data[0] 
                            && imageAIResponse.data[0].url) 
                            {
                                const imageUrl = imageAIResponse.data[0].url;
                                responses.push({ response: textContent, persona: persona, imageUrl: imageUrl });
                                displayAIResponse(news.title, textContent, persona, imageUrl);
                            }
                    } catch (error) {
                        console.error('Error generating AI response:', error);
                        newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
                    }
            
                    //displayAIResponse(news.title, aiResponse.choices[0].message.content, persona);
                }
        } catch (error) {
            console.error('Error generating AI response:', error);
            newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
        }
    }

    console.log('generateAIResponses... returning responses: ', responses);
    return responses;
}

function displayAIResponse(newsTitle, aiResponse, persona, imageUrl) {
    const newsContainer = document.getElementById('news');
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';

    const titleElement = document.createElement('h2');
    titleElement.textContent = newsTitle;
    newsItem.appendChild(titleElement);

    const contentElement = document.createElement('p');
    contentElement.textContent = aiResponse;
    newsItem.appendChild(contentElement);

    if (imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = 'Generated image';
        newsItem.appendChild(imageElement);
    }

    const personaElement = document.createElement('p');
    personaElement.textContent = `Persona: ${persona.name}`;
    newsItem.appendChild(personaElement);

    newsContainer.appendChild(newsItem);
}

async function generatePersonas(setting) {
    console.log('generatePersonas... setting: ', setting);
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
        })
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const aiResponse = await response.json(); // This converts the response body to JSON

        if (aiResponse 
            && aiResponse.choices 
            && aiResponse.choices.length 
            && aiResponse.choices[0] 
            && aiResponse.choices[0].message
            && aiResponse.choices[0].message.content )
            {
                parsedPersonas = parsePersonas(aiResponse.choices[0].message.content);
            }
    } catch (error) {
        console.error('Error generating AI response:', error);
        newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
    }

    console.log('generatePersonas... Returning parsedPersonas: ', parsedPersonas);
    return parsedPersonas;
}

function parsePersonas(content) {
    console.log('parsePersonas... content: ', content);
    try {
        console.log('parsePersonas... JSON.parse(content) ', JSON.parse(content));
        return JSON.parse(content);
    } catch (error) {
        console.error('Error parsing personas:', error);
        return [];
    }
}
