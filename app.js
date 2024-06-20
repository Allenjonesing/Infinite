let health = 100;
let healthText;
let target = null;
let newsData = []; // Global variable to store news articles
let setting = ''; // Global variable to store the game setting
let enemyImageBase64 = '';
let npcBase64image = '';
let monsterDescription = '';
let personas;
let persona;
let statRequirements = 'They must be in JSON like {health,mana,atk,def,spd,eva,magAtk,magDef,luk,wis,element: {fire, ice, water, lightning }, where health is 10-1000, mana is 10-500, atk through wis are each 1-100, and the 4 elements are each a float between 0.0 and 3.0, where 0 is immune and 3 is very weak. Balance the stats so that if one is high, another is low. Personalize it so that the size, element, type all affect the stats.';

class ExplorationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExplorationScene' });
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('tree', 'assets/tree.png');
        this.load.image('npc', 'assets/npc.png');
    }

    async create() {
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
        newsData = await fetchNews();

        this.npcs.children.iterate((npc, index) => {
            let persona = personas[index % personas.length]; // Cycle through personas
            npc.persona = persona;
            // Assign news articles to NPCs
            let newsIndex = index % newsData.length;
            npc.newsText = newsData[newsIndex].description;
        });

        // Enable NPC interaction
        this.npcs.children.iterate((npc) => {
            npc.setInteractive();
            npc.on('pointerdown', () => {
                alert(`${npc.persona}: ${npc.response}`);
            });
        });

        const newsArticle = newsData[0]; // Use the first article for the enemy
        enemyImageBase64 = await generateEnemyImage(newsArticle, setting);

        // Spawn enemies after data is ready
        spawnEnemies(this);
    }

    startBattle(player, enemy) {
        // Transition to the battle scene, passing necessary data
        this.scene.start('BattleScene', { player: player, enemy: enemy });
    }

    update() {
        if (this.input.activePointer.isDown) {
            target = { x: this.input.activePointer.worldX, y: this.input.activePointer.worldY };
        }

        if (target) {
            this.physics.moveTo(this.player, target.x, target.y, 100);
        }

        if (this.enemies && this.enemies.children) {
            this.enemies.children.iterate((enemy) => {
                this.physics.moveToObject(enemy, this.player, 50);
            });

            this.enemies.children.iterate((enemy) => {
                if (enemy.body.speed > 0) {
                    enemy.body.setVelocity(0, 0);
                }
            });
        }

        this.npcs.children.iterate((npc) => {
            if (npc.body.speed > 0) {
                npc.body.setVelocity(0, 0);
            }
        });
    }
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

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    async create(data) {
        this.player = data.player;
        this.enemy = data.enemy;

        // Initialize player and enemy data
        const playerStats = await fetchPlayerStats();
        console.log('create... playerStats: ', playerStats);
        this.player = {
            name: 'Player',
            health: playerStats.health,
            mana: playerStats.mana,
            atk: playerStats.atk,
            def: playerStats.def,
            spd: playerStats.spd,
            eva: playerStats.eva,
            magAtk: playerStats.magAtk,
            magDef: playerStats.magDef,
            luk: playerStats.luk,
            wis: playerStats.wis,
            sprite: null,
            actions: ['Attack', 'Defend', 'Magic Attack'],
            element: playerStats.element // Example element multipliers
        };

        console.log('create... this.player: ', this.player);

        const enemyStats = await fetchEnemyStats();
        console.log('create... enemyStats: ', enemyStats);
        this.enemy = {
            name: 'Enemy',
            health: enemyStats.health,
            mana: enemyStats.mana,
            atk: enemyStats.atk,
            def: enemyStats.def,
            spd: enemyStats.spd,
            eva: enemyStats.eva,
            magAtk: enemyStats.magAtk,
            magDef: enemyStats.magDef,
            luk: enemyStats.luk,
            wis: enemyStats.wis,
            sprite: null,
            actions: ['Attack', 'Defend', 'Magic Attack'],
            element: enemyStats.element // Example element multipliers
        };
        console.log('create... this.enemy: ', this.enemy);

        // Generate enemy image based on news article and setting
        if (newsData.length > 0) {
            if (enemyImageBase64) {
                this.player.sprite = this.add.sprite(100, 450, 'npcBase64image');
                this.enemy.sprite = this.add.sprite(500, 450, 'enemyImageBase64');

                // Initialize turn order and current turn index
                this.turnOrder = this.calculateTurnOrder();
                this.currentTurnIndex = 0;

                // Cooldown flag
                this.isCooldown = false;

                // Display UI elements
                this.createUI();

                // Check whose turn it is and start the action immediately if it's the enemy's turn
                if (this.turnOrder[this.currentTurnIndex].name === 'Enemy') {
                    this.enemyAction();
                }
            } else {
                console.error('Failed to generate enemy image');
            }
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
        this.playerHealthText = this.add.text(50, 20, `Health: ${this.player.health}`, { fontSize: '20px', fill: '#fff' });
        this.playerManaText = this.add.text(50, 50, `Mana: ${this.player.mana}`, { fontSize: '20px', fill: '#fff' });
        this.enemyHealthText = this.add.text(650, 20, `Health: ${this.enemy.health}`, { fontSize: '20px', fill: '#fff' });

        this.actions = this.add.group();
        for (let i = 0; i < this.player.actions.length; i++) {
            let actionText = this.add.text(50, 100 + i * 50, this.player.actions[i], { fontSize: '20px', fill: '#fff', backgroundColor: '#000', padding: { left: 10, right: 10, top: 5, bottom: 5 } });
            actionText.setInteractive();
            actionText.on('pointerdown', () => this.handlePlayerAction(this.player.actions[i], this.chooseElement()));
            this.actions.add(actionText);
        }

        this.turnOrderText = this.add.text(700, 100, 'Turn Order:', { fontSize: '20px', fill: '#fff' });
        this.updateTurnOrderDisplay();

        // Help bar at the top
        this.helpText = this.add.text(50, 80, '', { fontSize: '20px', fill: '#fff' });
        this.helpText.setText('A battle has started! Choose your actions wisely.');
    }

    chooseElement() {
        const elements = ['fire', 'ice', 'water', 'lightning'];
        return elements[Math.floor(Math.random() * elements.length)];
    }

    calculateTurnOrder() {
        let participants = [
            { name: 'Player', speed: this.player.spd, sprite: this.player.sprite },
            { name: 'Enemy', speed: this.enemy.spd, sprite: this.enemy.sprite }
        ];
    
        let turnOrder = [];
        let currentTime = [0, 0]; // Initialize current times for both participants
        let totalTurns = 0;
    
        // Calculate the total number of turns based on the highest speed
        let totalParticipantTurns = 100; // Arbitrary large number to ensure enough turns are calculated
        for (let i = 0; i < totalParticipantTurns; i++) {
            let nextTurnIndex = currentTime[0] / participants[0].speed <= currentTime[1] / participants[1].speed ? 0 : 1;
            turnOrder.push(participants[nextTurnIndex]);
            currentTime[nextTurnIndex] += 1; // Increment the chosen participant's elapsed time
            totalTurns++;
        }
    
        return turnOrder;
    }
    
    updateTurnOrderDisplay() {
        if (this.turnOrderList) {
            this.turnOrderList.destroy();
        }
    
        let orderText = '';
        for (let i = 0; i < 10; i++) {
            orderText += `${this.turnOrder[(this.currentTurnIndex + i) % this.turnOrder.length].name}\n`;
        }
    
        this.turnOrderList = this.add.text(700, 100, orderText, { fontSize: '20px', fill: '#fff' });
    
        this.turnOrderList.alpha = 0;
        this.tweens.add({
            targets: this.turnOrderList,
            alpha: 1,
            duration: 500,
            ease: 'Power1'
        });
    }
    
    handlePlayerAction(action, elementType = null) {
        if (!this.isCooldown && this.turnOrder[this.currentTurnIndex].name === 'Player') {
            let damage = 0;
            let critical = false;
            if (action === 'Attack') {
                damage = this.calculateDamage(this.player.atk, this.enemy.def, this.player.luk, this.enemy.eva);
                critical = Math.random() < 0.1;
                if (critical) {
                    damage = this.calculateDamage(this.player.atk, 0, this.player.luk, this.enemy.eva);
                }
                this.showDamageIndicator(this.enemy.sprite, damage, critical);
            } else if (action === 'Magic Attack') {
                if (this.player.mana >= 10) {
                    damage = this.calculateMagicDamage(this.player.magAtk, this.enemy.magDef, this.player.element[elementType], this.enemy.element[elementType], this.player.luk, this.enemy.eva);
                    critical = Math.random() < 0.1;
                    if (critical) {
                        damage = this.calculateMagicDamage(this.player.magAtk, 0, this.player.element[elementType], this.enemy.element[elementType], this.player.luk, this.enemy.eva);
                    }
                    this.player.mana -= 10;
                    this.showDamageIndicator(this.enemy.sprite, damage, critical);
                } else {
                    this.helpText.setText("Not enough mana!");
                    return;
                }
            } else if (action === 'Defend') {
                this.player.def += 5; // Temporary defense boost
                this.helpText.setText('You defend, boosting your defense for this turn.');
            }
            this.enemy.health -= damage;
            this.enemyHealthText.setText(`Health: ${this.enemy.health}`);
            this.playerManaText.setText(`Mana: ${this.player.mana}`);
            this.playAttackAnimation(this.player.sprite, this.enemy.sprite);
            this.startCooldown();
        }
    }

    enemyAction() {
        const performEnemyAction = () => {
            console.log('performEnemyAction called, this.turnOrder[this.currentTurnIndex].name: ', this.turnOrder[this.currentTurnIndex].name);
            console.log('performEnemyAction called, this.isCooldown: ', this.isCooldown);
            if (this.turnOrder[this.currentTurnIndex].name === 'Enemy' && !this.isCooldown) {
                console.log('Enemy turn and not in cooldown');
                let damage = 0;
                let critical = false;
                const action = this.enemy.actions[Math.floor(Math.random() * this.enemy.actions.length)];
                console.log('Enemy action:', action);
                if (action === 'Attack') {
                    damage = this.calculateDamage(this.enemy.atk, this.player.def, this.enemy.luk, this.player.eva);
                    critical = Math.random() < 0.1;
                    if (critical) {
                        damage = this.calculateDamage(this.enemy.atk, 0, this.enemy.luk, this.player.eva);
                    }
                    this.showDamageIndicator(this.player.sprite, damage, critical);
                } else if (action === 'Magic Attack') {
                    const elements = ['fire', 'ice', 'water', 'lightning'];
                    const elementType = elements[Math.floor(Math.random() * elements.length)];
                    console.log('Enemy element type:', elementType);
                    if (this.enemy.mana >= 10) {
                        damage = this.calculateMagicDamage(this.enemy.magAtk, this.player.magDef, this.enemy.element[elementType], this.player.element[elementType], this.enemy.luk, this.player.eva);
                        critical = Math.random() < 0.1;
                        if (critical) {
                            damage = this.calculateMagicDamage(this.enemy.magAtk, 0, this.enemy.element[elementType], this.player.element[elementType], this.enemy.luk, this.player.eva);
                        }
                        this.enemy.mana -= 10;
                        this.showDamageIndicator(this.player.sprite, damage, critical);
                    } else {
                        console.log('Not enough mana for Magic Attack');
                        return;
                    }
                }
                this.player.health -= damage;
                this.playerHealthText.setText(`Health: ${this.player.health}`);
                this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
                this.startCooldown();
            } else {
                console.log('Enemy turn but in cooldown or not enemy turn');
                this.time.delayedCall(200, performEnemyAction, [], this);
            }
        };
        console.log('Enemy action started');
        performEnemyAction();
    }

    showDamageIndicator(target, damage, critical) {
        const damageText = this.add.text(target.x, target.y - 50, damage, { fontSize: '20px', fill: critical ? '#ff0000' : '#ffffff' });
        this.tweens.add({
            targets: damageText,
            y: target.y - 100,
            alpha: { from: 1, to: 0 },
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                damageText.destroy();
            }
        });
    }

    calculateDamage(atk, def, luk, eva) {
        let critical = Math.random() < 0.1; // 10% chance for critical hit
        let baseDamage = atk - (critical ? 0 : def) + Phaser.Math.Between(-2, 2);
        baseDamage = Math.max(1, baseDamage); // Ensure minimum damage is 1
        let evaded = Math.random() < (eva * 0.01);
        return evaded ? 0 : baseDamage;
    }

    calculateMagicDamage(magAtk, magDef, attackerElement, defenderElement, luk, eva) {
        let critical = Math.random() < 0.1; // 10% chance for critical hit
        let baseDamage = magAtk - (critical ? 0 : magDef) + Phaser.Math.Between(-2, 2);
        baseDamage = Math.max(1, baseDamage); // Ensure minimum damage is 1
        baseDamage *= attackerElement * defenderElement; // Elemental multiplier
        let evaded = Math.random() < (eva * 0.01);
        return evaded ? 0 : baseDamage;
    }

    startCooldown() {
        this.isCooldown = true;

        this.time.delayedCall(1000, () => {  // Delay of 1 second for a more natural response
            this.isCooldown = false;
            this.nextTurn();
            this.updateTurnOrderDisplay();  // Ensure UI updates immediately after turn change
        }, [], this);
    }

    nextTurn() {
        console.log('nextTurn...');
        if (this.turnOrder[this.currentTurnIndex].name === 'Player' && this.player.isDefending) {
            this.player.def /= 2; // Reset defense boost after turn
            this.player.isDefending = false;
        }

        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        if (this.turnOrder[this.currentTurnIndex].name === 'Enemy') {
            this.enemyAction();
        } else {
            this.updateTurnOrderDisplay();
        }
    }

    playAttackAnimation(attacker, defender) {
        this.tweens.add({
            targets: attacker,
            x: defender.x - 50,
            duration: 300,
            yoyo: true,
            ease: 'Power1'
        });
    }
}

async function generateEnemyImage(newsArticle, setting) {
    const prompt = `Generate an image of an enemy based on the following description:${monsterDescription}`;
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
            return `data:image/png;base64,${parsedBody.base64_image}`;
        } else {
            throw new Error('No image generated');
        }
    } catch (error) {
        console.error('Error generating enemy image:', error);
        throw new Error('No image generated');
    }
}

function spawnEnemies(scene) {
    if (newsData.length > 0) {
        scene.textures.addBase64('enemyImageBase64', enemyImageBase64);
        scene.textures.addBase64('npcBase64image', npcBase64image);
        for (let i = 0; i < 3; i++) {
            let x = Phaser.Math.Between(50, 750);
            let y = Phaser.Math.Between(50, 550);
            let enemy = scene.enemies.create(x, y, 'enemyImageBase64');
            enemy.setCollideWorldBounds(true);
        }
        scene.physics.add.collider(scene.player, scene.enemies, scene.startBattle, null, scene);
        scene.physics.add.collider(scene.enemies, scene.trees);
        scene.physics.add.collider(scene.npcs, scene.enemies);
        scene.physics.add.collider(scene.enemies, scene.enemies);
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

        const bodyData = JSON.parse(jsonData.body);

        if (!bodyData) {
            throw new Error('No body found in the response!');
        }

        if (!bodyData.articles) {
            throw new Error('No articles found in the body!');
        }

        newsData = structureNewsData(bodyData.articles.sort(() => 0.5 - Math.random()).slice(0, 1));
        let generatedAIResponses = await generateAIResponses();
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

async function generateAIResponses() {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ''; // Clear previous content
    const responses = [];


    for (let i = 0; i < newsData.length; i++) {
        const news = newsData[i];

        var prompt = `Describe in 10-20 words a fictional version of following news article with no likeness to real people or brand names:\n\nTitle: ${news.title}\nDescription: ${news.description}`;

        try {
            const settingResponse = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test?prompt=${encodeURIComponent(prompt)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!settingResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const settingResponseJson = await settingResponse.json();

            if (settingResponseJson && settingResponseJson.choices && settingResponseJson.choices[0] && settingResponseJson.choices[0].message && settingResponseJson.choices[0].message.content) {
                const textContent = settingResponseJson.choices[0].message.content;

                personas = await generatePersonas(textContent);
                let foundPersonas = personas.characters && Array.isArray(personas.characters) ? personas.characters : personas;
                persona = foundPersonas[i % foundPersonas.length]; // Cycle through personas
                prompt = `As ${persona.name}, ${persona.description}, in the setting chosen: ${setting}. Describe in 10-20 words a Monster that we'll be faced to fight due to a made up reason that makes sense.`;

                try {
                    const monsterDescriptionResponse = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test?prompt=${encodeURIComponent(prompt)}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ prompt: prompt })
                    });

                    if (!monsterDescriptionResponse.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const monsterDescriptionResponseJson = await monsterDescriptionResponse.json();

                    if (monsterDescriptionResponseJson && monsterDescriptionResponseJson.choices && monsterDescriptionResponseJson.choices[0] && monsterDescriptionResponseJson.choices[0].message && monsterDescriptionResponseJson.choices[0].message.content) {
                        monsterDescription = monsterDescriptionResponseJson.choices[0].message.content;
                        const imgPrompt = `Generate an image of ${persona.name}, ${persona.description} in the setting chosen: ${setting}.`;

                        try {
                            const imageResponse = await fetch(`https://bjvbrhjov8.execute-api.us-east-2.amazonaws.com/test/db?prompt=${encodeURIComponent(imgPrompt)}`, {
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
                                responses.push({ response: monsterDescription, persona: persona, imageBase64: base64string });
                                displayAIResponse(news.title, monsterDescription, persona, base64string);
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
        } catch (error) {
            console.error('Error generating AI response:', error);
            newsContainer.innerHTML += `<div class="error-message">Error generating AI response for article "${news.title}": ${error.message}</div>`;
        }

        return responses;
    }
}

async function displayAIResponse(newsTitle, aiResponse, persona, imageBase64) {
    const newsContainer = document.getElementById('news');
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';

    const titleElement = document.createElement('h2');
    titleElement.textContent = `Based on the News Article: ${newsTitle}`;
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
    personaElement.textContent = `Persona: ${persona.name}, ${persona.description}`;
    newsItem.appendChild(personaElement);

    newsContainer.appendChild(newsItem);
}

async function generatePersonas(setting) {
    const prompt = `Generate 5 short (5-10 word) and detailed fictional character (Ensure no likeness to real people/places/brands) for a ${setting} setting in JSON format. Each persona should have a name and a description.`;
    const encodedPrompt = encodeURIComponent(prompt);
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

        const aiResponse = await response.json();

        if (aiResponse && aiResponse.choices && aiResponse.choices[0] && aiResponse.choices[0].message && aiResponse.choices[0].message.content) {
            parsedPersonas = JSON.parse(aiResponse.choices[0].message.content);
        }
    } catch (error) {
        console.error('Error generating AI response:', error);
    }

    return parsedPersonas;
}

async function fetchEnemyStats() {
    console.log('fetchEnemyStats...');
    const prompt = `Generate stats for an enemy based on this description: ${monsterDescription}. ${statRequirements}`;
    const encodedPrompt = encodeURIComponent(prompt);

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

        console.log('fetchEnemyStats... response: ', response);
        const data = await response.json();
        console.log('fetchEnemyStats... data: ', data);
        if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            return JSON.parse(data.choices[0].message.content);
        } else {
            throw new Error('No stats generated');
        }
    } catch (error) {
        console.error('Error fetching enemy stats:', error);
        throw new Error('No stats generated');
    }
}

async function fetchPlayerStats() {
    console.log('fetchPlayerStats...');
    const prompt = `Generate stats for the player based on this description: ${persona.name}, ${persona.description}. ${statRequirements}`;
    const encodedPrompt = encodeURIComponent(prompt);

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

        console.log('fetchPlayerStats... response: ', response);
        const data = await response.json();
        console.log('fetchPlayerStats... data: ', data);
        if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            return JSON.parse(data.choices[0].message.content);
        } else {
            throw new Error('No stats generated');
        }
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw new Error('No stats generated');
    }
}
