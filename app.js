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
let statRequirements = 'They must be in JSON like {health,mana,atk,def,spd,eva,magAtk,magDef,luk,wis,element: {fire, ice, water, lightning }, where health is 1000-10000, mana is 100-500, atk through wis are each 1-50, and the 4 elements are each a float between -1.0 and 3.0, where -1.0 is the strongest (Given to those of that element) and 3 is the weakest (Given to those that oppose  this element).';
let battleEnded = false;

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
                this.player.sprite = this.add.sprite(150, 300, 'npcBase64image');
                this.enemy.sprite = this.add.sprite(550, 300, 'enemyImageBase64');

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
                } else {
                    this.showPlayerActions();
                }
            } else {
                console.error('Failed to generate enemy image');
            }
        }
    }

    update() {
        if (battleEnded == false) {
            if (this.player.health <= 0) {
                this.endBattle('lose');
            } else if (this.enemy.health <= 0) {
                battleEnded = true;
                this.endBattle('win');
            }
        }
    }
    
    endBattle(result) {
        battleEnded = true;
        this.time.delayedCall(1000, () => {

            if (result === 'win') {
                // Handle victory logic
                this.helpText.setText('You Won! Please wait for the window to reload...');
                this.enemy.sprite.destroy(); // Remove enemy sprite
            } else {
                // Handle defeat logic
                this.helpText.setText('You Lost! Please wait for the window to reload...');
                this.player.sprite.destroy(); // Remove player sprite
            }
            
            this.time.delayedCall(4000, () => {
                // Refresh the whole page after the battle ends
                location.reload();
            }, [], this);
        }, [], this);
    }

    createUI() {
        // Help text at the top
        this.helpText = this.add.text(20, 20, 'A battle has begun...', { fontSize: '18px', fill: '#fff' });
    
        // Player health and mana
        this.playerHealthText = this.add.text(50, 100, `Health: ${this.player.health}`, { fontSize: '20px', fill: '#fff' });
        this.playerManaText = this.add.text(50, 130, `Mana: ${this.player.mana}`, { fontSize: '20px', fill: '#fff' });
        
        // Enemy health and mana
        this.enemyHealthText = this.add.text(450, 100, `Health: ${this.enemy.health}`, { fontSize: '20px', fill: '#fff' });
        this.enemyManaText = this.add.text(450, 130, `Mana: ${this.enemy.mana}`, { fontSize: '20px', fill: '#fff' });
    
        // Turn order list
        this.turnOrderText = this.add.text(675, 80, 'Turn List', { fontSize: '20px', fill: '#fff' });
        this.updateTurnOrderDisplay();
    
        // Action buttons at the bottom
        this.actions = this.add.group();
        const actionNames = ['Attack', 'Defend', 'Magic Attack'];
        for (let i = 0; i < actionNames.length; i++) {
            let actionText = this.add.text(200 + i * 150, 500, actionNames[i], { fontSize: '20px', fill: '#fff', backgroundColor: '#000', padding: { left: 10, right: 10, top: 5, bottom: 5 } });
            actionText.setInteractive();
            actionText.on('pointerdown', () => this.handlePlayerAction(actionNames[i]));
            this.actions.add(actionText);
        }
    
        // Add borders around health and mana areas
        this.add.graphics().lineStyle(2, 0x00ff00).strokeRect(40, 90, 200, 75);
        this.add.graphics().lineStyle(2, 0xff0000).strokeRect(440, 90, 200, 75);
    
        // Add border around action buttons
        this.actionBox = this.add.graphics().lineStyle(2, 0xffff00).strokeRect(190, 490, 520, 60);
    
        // Initially hide the action buttons and box
        this.actions.children.each(action => action.setVisible(false));
        this.actionBox.setVisible(false);
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

        this.turnOrderList = this.add.text(700, 110, orderText, { fontSize: '20px', fill: '#fff' });

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
            if (action === 'Magic Attack' && !elementType) {
                this.showElementSelection();
                return;
            }
    
            let damage = 0;
            let critical = false;
            if (action === 'Attack') {
                damage = this.calculateDamage(this.player.atk, this.enemy.def, this.player.luk, this.enemy.eva);
                critical = Math.random() < 0.1;
                if (critical) {
                    damage = this.calculateDamage(this.player.atk, 0, this.player.luk, this.enemy.eva);
                }
                this.showDamageIndicator(this.enemy.sprite, damage, critical);
                this.helpText.setText(`Player attacks! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                this.playAttackAnimation(this.player.sprite, this.enemy.sprite);
            } else if (action === 'Magic Attack') {
                if (this.player.mana >= 10) {
                    damage = this.calculateMagicDamage(this.player.magAtk, this.enemy.magDef, this.player.element[elementType], this.enemy.element[elementType], this.player.luk, this.enemy.eva);
                    this.player.mana -= 10;
                    this.helpText.setText(`Player uses ${elementType} Magic Attack! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                    this.playMagicAttackAnimation(this.player.sprite, this.enemy.sprite, elementType, damage, critical);
                } else {
                    this.helpText.setText("Not enough mana!");
                    return;
                }
            } else if (action === 'Defend') {
                this.player.def *= 2; // Temporary defense boost
                this.player.isDefending = true; // Temporary defense boost
                this.helpText.setText('Player defends, boosting defense for this turn.');
            }
            this.enemy.health -= damage;
            this.enemyHealthText.setText(`Health: ${this.enemy.health}`);
            this.playerManaText.setText(`Mana: ${this.player.mana}`);
            this.startCooldown();
            this.hidePlayerActions();
        }
    }
    
    showElementSelection() {
        const elements = ['fire', 'ice', 'water', 'lightning'];
        this.elementButtons = this.add.group();
    
        for (let i = 0; i < elements.length; i++) {
            let elementText = this.add.text(200 + i * 150, 550, elements[i], { fontSize: '20px', fill: '#fff', backgroundColor: '#000', padding: { left: 10, right: 10, top: 5, bottom: 5 } });
            elementText.setInteractive();
            elementText.on('pointerdown', () => {
                this.handlePlayerAction('Magic Attack', elements[i]);
                this.elementButtons.clear(true, true);
            });
            this.elementButtons.add(elementText);
        }
    
        this.helpText.setText('Choose an element for your Magic Attack:');
    }
    
    enemyAction() {
        const performEnemyAction = () => {
            console.log('performEnemyAction called');
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
                    this.helpText.setText(`Enemy attacks! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                    this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
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
                        this.helpText.setText(`Enemy uses ${elementType} Magic Attack! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                        this.playMagicAttackAnimation(this.enemy.sprite, this.player.sprite, elementType, damage, critical);
                    } else {
                        console.log('Not enough mana for Magic Attack');
                        return;
                    }
                } else if (action === 'Defend') {
                    this.enemy.def *= 2; // Temporary defense boost
                    this.enemy.isDefending = true; // Temporary defense boost
                    this.helpText.setText('Enemy defends, boosting defense for this turn.');
                }
                this.player.health -= damage;
                this.playerHealthText.setText(`Health: ${this.player.health}`);
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
        let fontColor = critical ? '#ff0000' : '#f0d735';
        if (damage < 0) {
            fontColor = '#0cc43d'
        }
        const damageText = this.add.text(target.x, target.y - 50, damage, { fontSize: '60px', fill: fontColor, fontStyle: 'bold' });
        this.tweens.add({
            targets: damageText,
            y: target.y - 250,
            alpha: { from: 1, to: 0 },
            duration: 2500,
            ease: 'Power1',
            onComplete: () => {
                damageText.destroy();
            }
        });
    }

    calculateDamage(atk, def, luk, eva) {
        let criticalChance = luk / 100;
        let critical = Math.random() < criticalChance;
        let variance = Phaser.Math.FloatBetween(0.9, 1.1);
        
        let baseDamage;
        if (critical) {
            baseDamage = Math.floor(atk * 4 * variance);
        } else {
            baseDamage = Math.floor((4 * atk - 2 * def) * variance);
        }
    
        baseDamage = Math.max(1, baseDamage); // Ensure minimum damage is 1
        let evaded = Math.random() < (eva * 0.01);
        return evaded ? 0 : baseDamage;
    }
        
    calculateMagicDamage(magAtk, magDef, attackerElement, defenderElement, luk) {
        let criticalChance = luk 
