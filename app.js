const costSavingMode = true;
const genericEnemyBase64 = 'pVIZCWQUPQcmngyP91zLjIrrVObZPn5vLelIIorYzVr6iq6NkQJzG3b+tYxACNBx40C7DKHyGiAZ+cdRERilBiiSBTA5c9sCLSgYWMx0caRb0yllCRaowZRwqQEowB2Nl6EyMACyMsUYA8CShQgqJT+7n/0ysnZ4r/6q4/JyN/++itV01zYHr378aMvVOcUoQdwPiSZPTysWfx/8nuv/R/+4ff/wR+997/++99CUrpfaEVImObaLHxoW5+gFAbQ6CxPseM+iASIAhqVymyhlWq911avbKSt98Fz44LzGMU/f2X87kdPf+EbV1i4blySqeCoaf2gSN77aB8MvfWNi71MYhAiQgRiQAJRnXcDEHVUEWSAyJEQoaOTMAFTtxkBURJFmAhJW/PcleLjTxbdPFb0CxKMVWvQ2by4+2Tn/tFR+zcCWv7mGbBWkxbhKIKAMcZz414v7e1N5oLUOtcG33jnvQ8cBJ5ZaiuK8ad633O99PXt8dPj+SC13jsErYTQkBJWbaXapp3K4dPYJ6OMyYrheLjKvRHnA0kMKCUSGYAQmBlwGfMsAJG59U4EGJi6qw/JKEXaFsamWSbMMUaJgVli8MEHEVFd5rxRzHByOj04OgYRa+14NFpZXwGTT07bo+N7Md4yhoaDwcb62up4lGWDNGfnfbOoQTxojUghBh/8YtaexsiAgJIaypJVM17LCaRdVLMTwBkicYyy9BxgAREGARb8KRFBmH0IIURmhmfR8cvVqha01KYsxEKiNESBKjgMItJ0Rm3sI4h01bptAiJoownFaK0QowQk8EBax7/7d176z//vP/kn/+aTzZXxl187p1Kwibr/5PTLb647x4QaRoopnhzX47H5O7/+6v/t//mT//bP3/+VN87p9ZWCI8cImSGsoXLBe4ZEgaimjV0/pzQhgrXGGqVJZWmqFJGCLNfoGHPbIxYCceH5Cyt//f7jk7N2bdX6EOraW2MUyWzuvvP2zoXzo8U0zCaRlhMkiwgSCgJHYUYJEYSXPGTVcbFYALQ2ClkhdmxyxI6/H5RyGwO7smKmE9PvpYQ94bJuFigRGJ5MTooikYpdCD97ADolO6GSKC40kWN3X11eX/vP/sf/w7e/95M7e++TV957x46l27x3eRbamsTH8LPHYKWfXj6/VlWBiGKQiIAanO9aas0IDIAixFHa1jqXz+tp3Kk1Up7b3tAMxpj3ITVsDSMKi8CST4/ADCIdXgPAKFFEdVnwQJqUtgY7LnHkGIIPIYTgvPe+EmYi0oa01ixydHLy9PCQmY3ReZ6vroxWV1ZbNzs4OA3Bg+BwUKyvr4xXR3nRS1C1dSt1GTmKUUYpAeQYmzbMFjUzK1KJzdLsYjbCvgaLoIPzbu7aqpzPXdW6tvHRCyIKiggptNbkeYIIzBy8E2RKNBiWFIKOThyyAAP7Za4aM7NE7BitBARCQiKslXFNM+j1us2YUoolduLk2Vk9KOgP/+CN/+N/8aP/8o/fuXjxV89v59evbP3gh4/efP2CVggQ8r4uRsnu/nxjY+vG1eHv/tKL//zf3lob9rXVWkgkoTQ3MIMyhMmkzvLCWI3L7aDEIOAjoCdFSpss40UTA/L+adO2c2OShDInPu8nw0EBADdvH3z7F68whm7baI39+LPJo+P5N799gwBCVDEKs2cWRiQVlSKjlNFEVhEBAoqwd1yXAYUIyYlvKlcvHJG2xqIAKRJkREryYnWUPdaqV+TC7dls4l2TJno4MF/50qvPnx/9mx8++uHtB58/tVobIuSOgwsRnnVLr167+Pf+4Pdef/W1v/yzv174CnzH+e7qBhqlE2OBqHHOe/ezhyoE3lwdHR5VVRvqxkcWw5oRoJNSIAXgjkhJgNB5s3OQEPGshLNjIj20RZL1TgtbDUbQH1CSgdKypAUw/pS91mGTEEBExAdBgCU7HRRqbRJIAHKOoW2d8877yNHVLnjHEq22WusYZT5fTGfTe/cfaKOHw+Hq6mq/6E0rd/TZTgx3jDWDQX88HIxHgywrSJH3zrc+AAizQoV';
const genericPlayerBase64 = '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';
const version = 'Alpha v0.2'

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
let statRequirements = 'Ensure that the stats match the described creature. They must be in JSON like {health,mana,atk,def,spd,eva,magAtk,magDef,luk,wis,element: {fire, ice, water, lightning }, where health is 1000-10000, mana is 100-500, atk through wis are each 1-100, and the 4 elements are each a int between -1 and 3, where -1 is the strongest (Given to those of that element) and 3 is the weakest (Given to those that oppose this element). Include status immunities in the format {immunities: ["Poison", "Stun", "Burn", "Freeze"]}, only immune half of the statuses in this example.';
let battleEnded = false;

class ExplorationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExplorationScene' });
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemy.png');
    }

    async create() {
        this.scale.on('resize', this.resize, this);

        // Add a loading text
        let loadingText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, `Loading Version: ${version}...`, {
            fontSize: '32px',
            fill: '#fff',
            wordWrap: { width: window.innerWidth - 40 }
        }).setOrigin(0.5).setAlign('center');

        // Add a warning text
        let warningText = this.add.text(window.innerWidth / 2, window.innerHeight - 50,
            'Warning: This game may contain flashing lights that could potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion is advised. Content generated by AI is not rated. Any resemblance to real persons, living or dead, brands, companies, or games is purely coincidental. By using this website, you agree to our terms and policies found at https://www.jonesingstudio.com/. Powered by OpenAI, NewsAPI.org, and Phaser. Game not yet rated. Copyright 2024 Jonesing Studio.', {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: window.innerWidth - 40 },
            align: 'center'
        }).setOrigin(0.5);


        // Fetch news data and generate AI responses
        await fetchNews();
        loadingText.setText(`${loadingText.text}\n\nBased on the article: ${newsData[0].title}`);

        await generateAIResponses();
        loadingText.setText(`${loadingText.text}\n\nYou'll play as: ${persona.name}, ${persona.description}`);
        loadingText.setText(`${loadingText.text}\n\nYou'll be fighting: ${monsterDescription}`);

        const newsArticle = newsData[0]; // Use the first article for the enemy
        enemyImageBase64 = await generateEnemyImage(newsArticle, setting);

        // Prep Base64 images
        this.prepBase64Images();

        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.description = `${persona.name}, ${persona.description}`;
        this.player.setCollideWorldBounds(true);

        // Initialize enemies group
        this.enemies = this.physics.add.group();
        // Spawn enemies after data is ready
        spawnEnemies(this);
        // Remove the loading text and warning text after all steps are complete
        loadingText.destroy();
        warningText.destroy();
    }

    prepBase64Images() {
        if (enemyImageBase64 && npcBase64image) {
            this.textures.addBase64('enemyImageBase64', enemyImageBase64);
            this.textures.addBase64('npcBase64image', npcBase64image);
        }
    }

    startBattle(player, enemy) {
        // Transition to the battle scene, passing necessary data
        this.scene.start('BattleScene', { player: player, enemy: enemy });
    }

    displayNewsInfo(news, persona) {
        this.add.text(20, 20, `Based on the news article: ${news.title}`, { fontSize: '24px', fill: '#fff', wordWrap: { width: window.innerWidth - 40 } });
        this.add.text(20, 60, `You'll play as: ${persona.name}, ${persona.description}`, { fontSize: '24px', fill: '#fff', wordWrap: { width: window.innerWidth - 40 } });
        this.add.text(20, 100, `You'll be fighting: ${monsterDescription}`, { fontSize: '24px', fill: '#fff', wordWrap: { width: window.innerWidth - 40 } });

        if (enemyImageBase64) {
            this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'enemyImageBase64').setScale(0.5); // Adjust the scale as necessary
        }
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
                if (enemy.body.speed > 0) {
                    enemy.body.setVelocity(0, 0);
                }
            });
        }
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width;
        let height = gameSize.height;

        if (width === undefined) { width = this.sys.game.config.width; }
        if (height === undefined) { height = this.sys.game.config.height; }

        this.cameras.resize(width, height);

        // Adjust other elements like UI, if necessary
    }
}

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
        this.helpMessages = [];
        this.loadingIndicator = null;
    }

    async create(data) {
        this.scale.on('resize', this.resize, this);

        this.player = data.player;
        this.enemy = data.enemy;

        // Show loading indicator
        this.showLoadingIndicator();

        // Initialize player and enemy data
        const playerStats = await fetchPlayerStats();
        this.player = {
            name: 'Player',
            description: `${persona.name}, ${persona.description}`,
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
            actions: ['Attack', 'Defend', 'Spells', 'Skills'],
            element: playerStats.element,
            statusEffects: [],
            immunities: playerStats.immunities || []
        };

        const enemyStats = await fetchEnemyStats();
        this.enemy = {
            name: 'Enemy',
            description: monsterDescription,
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
            actions: this.generateEnemyActions(enemyStats),
            element: enemyStats.element, // Example element multipliers
            learnedElementalWeaknesses: {
                fire: 0,
                ice: 0,
                water: 0,
                lightning: 0,
                physical: 0 // Track physical attack damage
            },
            learnedStatusImmunities: [],
            triedElements: {
                fire: false,
                ice: false,
                water: false,
                lightning: false,
                physical: false
            },
            statusEffects: [],
            immunities: enemyStats.immunities || []
        };

        // Hide loading indicator
        this.hideLoadingIndicator();

        // Generate enemy image based on news article and setting
        if (newsData.length > 0) {
            if (enemyImageBase64) {
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

    showLoadingIndicator() {
        this.loadingIndicator = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.loadingIndicator,
            alpha: { from: 1, to: 0.3 },
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    hideLoadingIndicator() {
        if (this.loadingIndicator) {
            this.loadingIndicator.destroy();
            this.loadingIndicator = null;
        }
    }

    addHelpText(message) {
        this.helpMessages.push(message);
        if (this.helpMessages.length > 3) {
            this.helpMessages.shift(); // Remove the oldest message if we have more than 3
        }
        this.updateHelpTextDisplay();
    }

    updateHelpTextDisplay() {
        if (this.helpMessages && Array.isArray(this.helpMessages)) {
            this.helpText.setText(this.helpMessages.join('\n'));
        } else {
            this.helpText.setText('');
        }
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width;
        let height = gameSize.height;

        if (width === undefined) { width = this.sys.game.config.width; }
        if (height === undefined) { height = this.sys.game.config.height; }

        this.cameras.resize(width, height);

        // Adjust other elements like UI, if necessary
        this.createUI(); // Recreate the UI on resize
    }

    generateEnemyActions(stats) {
        let actions = {
            physical: ['Attack'],
            skills: [],
            magic: []
        };

        // Determine if attack is far greater than magic attack or vice versa
        const isPhysicalOnly = stats.atk > 2 * stats.magAtk;
        const isMagicOnly = stats.magAtk > 2 * stats.atk;

        // Add skills if atk is high and not exclusively magic
        if (!isMagicOnly) {
            if (stats.element.fire <= 0) actions.skills.push('Burn');
            if (stats.element.ice <= 0) actions.skills.push('Freeze');
            if (stats.element.lightning <= 0) actions.skills.push('Stun');
            if (stats.element.water <= 0) actions.skills.push('Poison');
        }

        // Add magic attacks based on elemental strengths and not exclusively physical
        if (!isPhysicalOnly) {
            for (const [element, value] of Object.entries(stats.element)) {
                if (value <= 0) { // Strong in this element
                    actions.magic.push(`${element.charAt(0).toUpperCase() + element.slice(1)} Spells`);
                }
            }

            // Add more magic attacks if magAtk is high
            if (stats.magAtk > stats.atk) {
                if (stats.element.fire <= 0) actions.magic.push('Fire Spells');
                if (stats.element.ice <= 0) actions.magic.push('Ice Spells');
                if (stats.element.lightning <= 0) actions.magic.push('Lightning Spells');
                if (stats.element.water <= 0) actions.magic.push('Water Spells');
            }

            // Add healing spells
            actions.magic.push('Heal');
        }

        return actions;
    }

    update() {
        if (!battleEnded) {
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
                this.addHelpText('You Won! Please wait for the window to reload...');
                this.enemy.sprite.destroy(); // Remove enemy sprite
            } else {
                // Handle defeat logic
                this.addHelpText('You Lost! Please wait for the window to reload...');
                this.player.sprite.destroy(); // Remove player sprite
            }

            this.time.delayedCall(4000, () => {
                // Refresh the whole page after the battle ends
                location.reload();
            }, [], this);
        }, [], this);
    }

    createUI() {
        // Clear existing UI elements if any
        if (this.uiContainer) {
            this.uiContainer.destroy(true);
        }

        // Create a container for all UI elements
        this.uiContainer = this.add.container(0, 0);

        // Set padding and element dimensions
        const padding = this.scale.width / 15;
        const topMargin = 200;
        const elementHeight = 30;
        const actionButtonHeight = 50;
        const halfWidth = this.scale.width / 2;

        // Help text at the very top
        this.helpText = this.add.text(padding, padding, '', {
            fontSize: '24px',
            fill: '#fff',
            wordWrap: { width: this.scale.width - 2 * padding }
        });
        this.uiContainer.add(this.helpText);
        this.addHelpText(`A battle has begun based on the article: ${newsData[0].title}`);

        // Player health and mana
        this.playerHealthText = this.add.text(padding, topMargin + elementHeight, `Health: ${this.player.health}`, { fontSize: '26px', fill: '#fff' });
        this.playerManaText = this.add.text(padding, topMargin + elementHeight * 2, `Mana: ${this.player.mana}`, { fontSize: '20px', fill: '#fff' });

        // Enemy health and mana
        this.enemyHealthText = this.add.text(this.scale.width - padding - 200, topMargin + elementHeight, `Health: ${this.enemy.health}`, { fontSize: '26px', fill: '#fff' });
        this.enemyManaText = this.add.text(this.scale.width - padding - 200, topMargin + elementHeight * 2, `Mana: ${this.enemy.mana}`, { fontSize: '20px', fill: '#fff' });

        // Add borders around health and mana areas
        const playerHealthBox = this.add.graphics().lineStyle(2, 0x00ff00).strokeRect(padding - 10, topMargin + elementHeight - 10, 200, 75);
        const enemyHealthBox = this.add.graphics().lineStyle(2, 0xff0000).strokeRect(this.scale.width - padding - 210, topMargin + elementHeight - 10, 200, 75);
        this.uiContainer.add(playerHealthBox);
        this.uiContainer.add(enemyHealthBox);

        // Player and enemy sprites
        this.player.sprite = this.add.sprite(padding + 100, topMargin + elementHeight * 10 + 50, 'npcBase64image'); // Adjust position as necessary
        this.enemy.sprite = this.add.sprite(this.scale.width - padding - 100, topMargin + elementHeight * 10 + 50, 'enemyImageBase64'); // Adjust position as necessary

        // Add hover animations
        this.add.tween({
            targets: this.player.sprite,
            y: this.player.sprite.y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.add.tween({
            targets: this.enemy.sprite,
            y: this.enemy.sprite.y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.uiContainer.add(this.player.sprite);
        this.uiContainer.add(this.enemy.sprite);

        // Player and enemy names and descriptions
        const playerDescriptionText = `${this.player.name}: ${this.player.description}`;
        const enemyDescriptionText = `${this.enemy.name}: ${this.enemy.description}`;

        const playerDescription = this.add.text(padding, this.scale.height / 2, playerDescriptionText, { fontSize: '24px', fill: '#fff', wordWrap: { width: 200 } });
        const enemyDescription = this.add.text(this.scale.width - padding - 200, this.scale.height / 2, enemyDescriptionText, { fontSize: '24px', fill: '#fff', wordWrap: { width: 200 } });

        // Add borders around descriptions
        const playerDescriptionBox = this.add.graphics().lineStyle(2, 0x00ff00).strokeRect(padding - 10, this.scale.height / 2, 200, playerDescription.height + 20);
        const enemyDescriptionBox = this.add.graphics().lineStyle(2, 0xff0000).strokeRect(this.scale.width - padding - 210, this.scale.height / 2, 200, enemyDescription.height + 20);
        this.uiContainer.add(playerDescriptionBox);
        this.uiContainer.add(enemyDescriptionBox);

        this.uiContainer.add(playerDescription);
        this.uiContainer.add(enemyDescription);

        // Turn order list
        this.turnOrderText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Turns:', { fontSize: '36px', fill: '#fff' }).setOrigin(0.5);
        this.updateTurnOrderDisplay();

        // Add elements to the UI container
        this.uiContainer.add([this.playerHealthText, this.playerManaText, this.enemyHealthText, this.enemyManaText, this.turnOrderText]);

        // Action buttons at the bottom
        this.actions = this.add.group();
        const actionNames = ['Attack', 'Defend', 'Spells', 'Skills', 'Heal'];
        const actionButtonWidth = (this.scale.width - padding * 2) / 5;

        actionNames.forEach((actionName, index) => {
            const x = (padding + halfWidth) - (actionNames.length * actionButtonWidth) / 2 + index * actionButtonWidth;
            const actionText = this.add.text(x, this.scale.height - actionButtonHeight - padding, actionName, {
                fontSize: '30px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { left: 20, right: 20, top: 10, bottom: 10 }
            }).setOrigin(0.5);
            actionText.setInteractive();
            actionText.on('pointerdown', () => this.handlePlayerAction(actionName));
            this.actions.add(actionText);
            this.uiContainer.add(actionText);
        });

        // Add animation and colorful effect to action buttons
        this.actions.children.iterate(actionText => {
            this.tweens.add({
                targets: actionText,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Power1'
            });
        });

        // Add action box around action buttons
        this.actionBox = this.add.graphics().lineStyle(2, 0xffff00).strokeRect(padding, this.scale.height - actionButtonHeight - padding * 2, this.scale.width - padding * 2, actionButtonHeight + padding);
        this.uiContainer.add(this.actionBox);
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

        this.turnOrderList = this.add.text(this.scale.width / 2, this.scale.height / 2 + 200, orderText, { fontSize: '30px', fill: '#fff' }).setOrigin(0.5);

        this.turnOrderList.alpha = 0;
        this.tweens.add({
            targets: this.turnOrderList,
            alpha: 1,
            duration: 500,
            ease: 'Power1'
        });
    }

    applyHealingEffect(target) {
        let healingLight = this.add.graphics();
        healingLight.fillStyle(0x00ff00, 0.5); // Green color with some transparency
        healingLight.fillCircle(target.x, target.y, 50);
        this.tweens.add({
            targets: healingLight,
            alpha: { from: 1, to: 0 },
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                healingLight.destroy();
            }
        });
    }

    applyEffect(target, color) {
        let effectLight = this.add.graphics();
        effectLight.fillStyle(color, 0.5);
        effectLight.fillCircle(target.x, target.y, 50);
        this.tweens.add({
            targets: effectLight,
            alpha: { from: 1, to: 0 },
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                effectLight.destroy();
            }
        });
    }

    handlePlayerAction(action, elementType = null) {
        this.hideSubOptions(); // Ensure sub-options are hidden when a main action is chosen

        if (!this.isCooldown && this.turnOrder[this.currentTurnIndex].name === 'Player') {
            let damage = 0;
            let healing = 0;
            let critical = false;

            if (action === 'Spells' && !elementType) {
                this.showElementSelection();
                return;
            }

            if (action === 'Attack') {
                damage = this.calculateDamage(this.player.atk, this.enemy.def, this.player.luk, this.enemy.eva);
                this.showDamageIndicator(this.enemy.sprite, damage, critical);
                this.addHelpText(`Player attacks! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                this.playAttackAnimation(this.player.sprite, this.enemy.sprite);
            } else if (action === 'Spells') {
                if (this.player.mana >= 10) {
                    damage = this.calculateMagicDamage(this.player.magAtk, this.enemy.magDef, this.enemy.element[elementType], this.player.luk, this.enemy.eva);
                    this.player.mana -= 10;
                    this.addHelpText(`Player uses ${elementType} Spells! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                    this.playMagicAttackAnimation(this.player.sprite, this.enemy.sprite, elementType, damage, critical, this.enemy.element[elementType]);
                } else {
                    this.addHelpText("Not enough mana!");
                    return;
                }
            } else if (action === 'Defend') {
                this.player.def *= 4; // Temporary defense boost
                this.player.isDefending = true;
                this.addHelpText('Player defends, boosting defense for this turn.');
            } else if (action === 'Skills') {
                this.showSkillSelection();
                return;
            } else if (action === 'Heal') {
                if (this.player.mana >= 15) {
                    healing = this.calculateHealing(this.player.magAtk);
                    this.player.mana -= 15;
                    this.player.health += healing;
                    this.addHelpText(`Player uses Heal! Restores ${healing} health.`);
                    this.showDamageIndicator(this.player.sprite, -healing, critical);
                    this.applyHealingEffect(this.player.sprite);
                } else {
                    this.addHelpText("Not enough mana!");
                    return;
                }
            }

            this.enemy.health -= damage;
            this.playerHealthText.setText(`Health: ${this.player.health}`);
            this.enemyHealthText.setText(`Health: ${this.enemy.health}`);
            this.playerManaText.setText(`Mana: ${this.player.mana}`);
            this.startCooldown();
            this.hidePlayerActions();
        }
    }

    calculateHealing(magAtk) {
        let variance = Phaser.Math.FloatBetween(0.9, 1.1);
        let baseHealing = Math.floor((4 * magAtk + 200) * variance);
        return Math.max(1, baseHealing); // Ensure minimum healing is 1
    }

    showSkillSelection() {
        this.hideSubOptions(); // Hide any existing sub-options

        const skills = ['Poison', 'Stun', 'Burn', 'Freeze']; // Example status effects
        this.skillButtons = this.add.group();

        // Create a new action box for skills above the original action box
        const skillBoxY = this.scale.height - 200 - 50; // Adjust as necessary
        const skillBoxWidth = this.scale.width - 40; // Adjust as necessary
        this.skillBox = this.add.graphics().lineStyle(2, 0x00ff00).strokeRect(20, skillBoxY, skillBoxWidth, 50);

        // Add skill buttons to the new action box
        skills.forEach((skill, index) => {
            const elementWidth = (this.scale.width - 100) / skills.length;
            const x = 100 + index * elementWidth; // Adjust spacing as necessary
            const skillText = this.add.text(x, skillBoxY + 25, skill, {
                fontSize: '30px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }).setOrigin(0.5);
            skillText.setInteractive();
            skillText.on('pointerdown', () => {
                this.playAttackAnimation(this.player.sprite, this.enemy.sprite);
                this.applyStatusEffect('Player', 'Enemy', skill);
                this.skillButtons.clear(true, true);
                this.startCooldown();
                this.hidePlayerActions();
                this.skillBox.destroy();
            });
            this.skillButtons.add(skillText);

            // Add animation and colorful effect
            this.tweens.add({
                targets: skillText,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Power1'
            });
        });
    }

    showElementSelection() {
        this.hideSubOptions(); // Hide any existing sub-options

        const elements = ['Fire', 'Ice', 'Water', 'Lightning'];
        this.elementButtons = this.add.group();

        // Create a new action box for elements above the original action box
        const elementBoxY = this.scale.height - 200 - 50; // Adjust as necessary
        const elementBoxWidth = this.scale.width - 40; // Adjust as necessary
        this.elementBox = this.add.graphics().lineStyle(2, 0x00ff00).strokeRect(20, elementBoxY, elementBoxWidth, 50);

        // Add element buttons to the new action box
        elements.forEach((element, index) => {
            const elementWidth = (this.scale.width - 100) / elements.length;
            const x = 100 + index * elementWidth; // Adjust spacing as necessary
            const elementText = this.add.text(x, elementBoxY + 25, element, {
                fontSize: '30px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }).setOrigin(0.5);
            elementText.setInteractive();
            elementText.on('pointerdown', () => {
                this.handlePlayerAction('Spells', element.toLowerCase());
                this.elementButtons.clear(true, true);
                this.elementBox.destroy();
            });
            this.elementButtons.add(elementText);

            // Add animation and colorful effect
            this.tweens.add({
                targets: elementText,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Power1'
            });
        });
    }

    hideSubOptions() {
        if (this.skillButtons) {
            this.skillBox.clear();
            this.skillButtons.clear(true, true);
        }
        if (this.elementButtons) {
            this.elementBox.clear();
            this.elementButtons.clear(true, true);
        }
    }

    enemyAction() {
        console.log('enemyAction...');
        console.log('performEnemyAction... this.turnOrder[this.currentTurnIndex].name: ', this.turnOrder[this.currentTurnIndex].name);
        if ((this.turnOrder[this.currentTurnIndex].name === 'Enemy')) {
            const performEnemyAction = () => {
                console.log('performEnemyAction...');
                console.log('performEnemyAction... this.isCooldown: ', this.isCooldown);
                if (!this.isCooldown) {
                    let damage = 0;
                    let critical = false;
                    let actionType;
                    let action;
                    let highestDamage = 0;
                    let bestElement = 'physical';

                    // Periodically reset tried attacks and skills
                    if (this.enemy.triedElements.resetCounter === undefined || this.enemy.triedElements.resetCounter >= 20) {
                        console.log('performEnemyAction... Resetting learned damages...');
                        this.enemy.triedElements = {
                            fire: this.enemy.learnedElementalWeaknesses.fire < 0 ? this.enemy.triedElements.fire : false,
                            ice: this.enemy.learnedElementalWeaknesses.ice < 0 ? this.enemy.triedElements.fire : false,
                            water: this.enemy.learnedElementalWeaknesses.water < 0 ? this.enemy.triedElements.fire : false,
                            lightning: this.enemy.learnedElementalWeaknesses.lightning < 0 ? this.enemy.triedElements.fire : false,
                            physical: this.enemy.learnedElementalWeaknesses.physical < 0 ? this.enemy.triedElements.fire : false,
                            skills: this.enemy.triedElements.skills || [],
                            resetCounter: 0
                        };
                    } else {
                        this.enemy.triedElements.resetCounter++;
                    }

                    // Determine if there's an element, physical attack, or skill that hasn't been tried yet
                    const elements = Object.keys(this.enemy.triedElements).filter(e => e !== 'resetCounter' && e !== 'skills');
                    let untriedElement = elements.find(element => !this.enemy.triedElements[element]);

                    const skills = this.enemy.actions.skills || [];
                    let untriedSkill = skills.find(skill => !this.enemy.triedElements.skills.includes(skill));

                    if (!untriedElement && untriedSkill) {
                        actionType = 'skills';
                        action = untriedSkill;
                    } else if (!untriedElement && !untriedSkill) {
                        // Determine the best attack based on the highest damage dealt so far
                        for (const [element, dmg] of Object.entries(this.enemy.learnedElementalWeaknesses)) {
                            console.log(`performEnemyAction... Checking damage for element ${element}: ${dmg}`);
                            if (dmg > highestDamage) {
                                highestDamage = dmg;
                                bestElement = element;
                            }
                        }
                        if (bestElement === 'physical') {
                            actionType = 'physical';
                            action = 'Attack';
                        } else {
                            actionType = 'magic';
                            action = `${bestElement.charAt(0).toUpperCase() + bestElement.slice(1)} Spells`;
                        }
                    } else if (untriedElement) {
                        if (untriedElement === 'physical') {
                            actionType = 'physical';
                            action = 'Attack';
                        } else {
                            actionType = 'magic';
                            action = `${untriedElement.charAt(0).toUpperCase() + untriedElement.slice(1)} Spells`;
                        }
                    }

                    console.log('performEnemyAction... actionType: ', actionType);
                    console.log('performEnemyAction... action: ', action);
                    if (actionType === 'physical') {
                        damage = this.calculateDamage(this.enemy.atk, this.player.def, this.enemy.luk, this.player.eva);
                        this.showDamageIndicator(this.player.sprite, damage, critical);
                        this.addHelpText(`Enemy attacks! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                        this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
                        this.enemy.learnedElementalWeaknesses.physical = Math.max(this.enemy.learnedElementalWeaknesses.physical, damage);
                        this.enemy.triedElements.physical = true; // Mark physical attack as tried
                    } else if (actionType === 'magic') {
                        const elementType = action.split(' ')[0].toLowerCase();

                        if (this.enemy.mana >= 10) {
                            damage = this.calculateMagicDamage(this.enemy.magAtk, this.player.magDef, this.player.element[elementType], this.enemy.luk);
                            this.enemy.mana -= 10;
                            this.addHelpText(`Enemy uses ${elementType.charAt(0).toUpperCase() + elementType.slice(1)} Spells! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                            this.playMagicAttackAnimation(this.enemy.sprite, this.player.sprite, elementType, damage, critical, this.player.element[elementType]);

                            // Learn about player's elemental weaknesses
                            this.enemy.learnedElementalWeaknesses[elementType] = Math.max(this.enemy.learnedElementalWeaknesses[elementType], damage);
                            this.enemy.triedElements[elementType] = true; // Mark this element as tried
                        } else {
                            // Fallback to physical attack if not enough mana
                            damage = this.calculateDamage(this.enemy.atk, this.player.def, this.enemy.luk, this.player.eva);
                            this.showDamageIndicator(this.player.sprite, damage, critical);
                            this.addHelpText(`Enemy attacks! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                            this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
                            this.enemy.learnedElementalWeaknesses.physical = Math.max(this.enemy.learnedElementalWeaknesses.physical, damage);
                            this.enemy.triedElements.physical = true; // Mark physical attack as tried
                        }
                    } else if (actionType === 'skills') {
                        this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
                        if (skills.includes(action)) {
                            this.addHelpText(`Enemy uses ${action}!`);
                            this.applyStatusEffect('Enemy', 'Player', action);
                            this.enemy.triedElements.skills.push(action); // Mark skill as tried
                        } else {
                            damage = this.calculateDamage(this.enemy.atk, this.player.def, this.enemy.luk, this.player.eva);
                            this.showDamageIndicator(this.player.sprite, damage, critical);
                            this.addHelpText(`Enemy attacks! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                            this.enemy.learnedElementalWeaknesses.physical = Math.max(this.enemy.learnedElementalWeaknesses.physical, damage);
                        }
                    } else if (actionType === 'Heal') {
                        if (this.enemy.mana >= 15) {
                            damage = -this.calculateHealing(this.enemy.magAtk);
                            this.enemy.mana -= 15;
                            this.enemy.health -= damage; // Assuming 100 is max health
                            this.addHelpText(`Enemy uses Heal! Restores ${-damage} health.`);
                            this.showDamageIndicator(this.enemy.sprite, damage, critical);
                            this.applyHealingEffect(this.enemy.sprite);
                        } else {
                            // Fallback to physical attack if not enough mana
                            damage = this.calculateDamage(this.enemy.atk, this.player.def, this.enemy.luk, this.player.eva);
                            this.showDamageIndicator(this.player.sprite, damage, critical);
                            this.addHelpText(`Enemy attacks! ${critical ? 'Critical hit! ' : ''}Deals ${damage} damage.`);
                            this.playAttackAnimation(this.enemy.sprite, this.player.sprite);
                            this.enemy.learnedElementalWeaknesses.physical = Math.max(this.enemy.learnedElementalWeaknesses.physical, damage);
                            this.enemy.triedElements.physical = true; // Mark physical attack as tried
                        }
                    } else if (actionType === 'Defend') {
                        this.enemy.def *= 4; // Temporary defense boost
                        this.enemy.isDefending = true; // Temporary defense boost
                        this.addHelpText('Enemy defends, boosting defense for this turn.');
                    }
                    console.log('performEnemyAction... damage: ', damage);

                    this.player.health -= damage;
                    this.playerHealthText.setText(`Health: ${this.player.health}`);
                    this.enemyHealthText.setText(`Health: ${this.enemy.health}`);
                    this.enemyManaText.setText(`Mana: ${this.enemy.mana}`);
                    this.startCooldown();
                } else {
                    console.log('Delaying Call to performEnemyAction...');
                    this.time.delayedCall(200, performEnemyAction, [], this);
                }
            };
            performEnemyAction();
        } else {
            console.error('It is not currently the enemy\'s turn');
        }
    }

    applyStatusEffect(caster, target, statusEffect) {
        console.log('applyStatusEffect... caster: ', caster);
        console.log('applyStatusEffect... target: ', target);
        console.log('applyStatusEffect... statusEffect: ', statusEffect);

        this.time.delayedCall(150, () => {
            let targetCharacter = target === 'Player' ? this.player : this.enemy;
            let casterCharacter = caster === 'Player' ? this.player : this.enemy;

            console.log('applyStatusEffect... targetCharacter.immunities: ', targetCharacter.immunities);
            if (targetCharacter.immunities && targetCharacter.immunities.includes(statusEffect)) {
                console.log('applyStatusEffect... IMMUNE');
                this.addHelpText(`${targetCharacter.name} is immune to ${statusEffect}!`);
                this.showPhraseIndicator(targetCharacter.sprite, 'IMMUNE', '#2bf1ff');
                if (caster === 'Enemy') {
                    this.enemy.learnedStatusImmunities[statusEffect] = true;
                }
            } else {
                console.log('applyStatusEffect... Not Immune');
                let existingEffect = targetCharacter.statusEffects.find(effect => effect.type === statusEffect);
                console.log('applyStatusEffect... existingEffect: ', existingEffect);
                if (existingEffect) {
                    if (existingEffect.turns !== -1) { // Only refresh if it is not infinite
                        if (statusEffect === 'Stun') existingEffect.turns = 1;
                        else if (statusEffect === 'Freeze') existingEffect.turns = 5;
                        this.addHelpText(`${targetCharacter.name} is already affected by ${statusEffect}. Duration refreshed.`);
                    }
                } else {
                    let turns = (statusEffect === 'Stun' ? 1 : (statusEffect === 'Freeze' ? 5 : 3)); // 3 turns for non-infinite status effects
                    targetCharacter.statusEffects.push({ type: statusEffect, turns });
                    this.addHelpText(`${targetCharacter.name} is now affected by ${statusEffect}!`);
                }
            }

            this.updateStatusIndicators(targetCharacter);
        }, [], this);
    }

    updateStatusIndicators(character) {
        if (character.statusIndicators) {
            character.statusIndicators.clear(true, true);
        }

        character.statusIndicators = this.add.group();
        const statusEffects = character.statusEffects;
        for (let i = 0; i < statusEffects.length; i++) {
            let statusText = this.add.text(character.sprite.x - 100, 300 + i * 30, `${statusEffects[i].type} (${statusEffects[i].turns > 0 ? statusEffects[i].turns : '∞'})`, { fontSize: '20px', fill: '#fff', backgroundColor: '#000', padding: { left: 10, right: 10, top: 5, bottom: 5 } });
            character.statusIndicators.add(statusText);
        }
    }

    showDamageIndicator(target, damage, critical, elementValue) {
        let fontColor = '#f0d735';
        let delaytime = 0;

        if (elementValue <= 0.0) {
            delaytime = 300;
            fontColor = elementValue < 0.0 ? '#0cc43d' : '#2bf1ff';
            const immunityText = elementValue < 0.0 ? 'BUFF' : 'IMMUNE';
            const displayText = this.add.text(target.x, target.y - 50, immunityText, { fontSize: '50px', fill: fontColor, fontStyle: 'bold' });
            this.tweens.add({
                targets: displayText,
                y: target.y - 250,
                alpha: { from: 1, to: 0 },
                duration: 2500,
                ease: 'Power1',
                onComplete: () => {
                    displayText.destroy();
                }
            });
        } else if (critical) {
            delaytime = 500;
            fontColor = '#f0d735'
            const displayText = this.add.text(target.x, target.y - 50, 'CRITICAL', { fontSize: '50px', fill: fontColor, fontStyle: 'bold' });
            this.tweens.add({
                targets: displayText,
                y: target.y - 250,
                alpha: { from: 1, to: 0 },
                duration: 2500,
                ease: 'Power1',
                onComplete: () => {
                    displayText.destroy();
                }
            });
        }

        if (damage < 0) {
            fontColor = '#0cc43d'
        } else if (critical) {
            fontColor = '#f0d735'
        }

        this.time.delayedCall(delaytime, () => {
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
        }, [], this);
    }

    showPhraseIndicator(target, phrase, color) {
        let delaytime = 0;

        this.time.delayedCall(delaytime, () => {
            const damageText = this.add.text(target.x, target.y - 50, phrase, { fontSize: '60px', fill: color, fontStyle: 'bold' });
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
        }, [], this);
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

    calculateMagicDamage(magAtk, magDef, defenderElement, luk) {
        let criticalChance = luk / 100;
        let critical = Math.random() < criticalChance;
        let variance = Phaser.Math.FloatBetween(0.9, 1.1);

        let baseDamage;
        if (critical) {
            baseDamage = Math.floor((2 * magAtk) * variance)
        } else {
            baseDamage = Math.floor((2 * magAtk - magDef) * variance);
        }

        baseDamage *= defenderElement;

        return Math.floor(baseDamage); // Allow negative values for potential healing
    }

    startCooldown() {
        console.log('startCooldown...');
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
            this.player.def /= 4; // Reset defense boost after turn
            this.player.isDefending = false;
        }
        if (this.turnOrder[this.currentTurnIndex].name === 'Enemy' && this.enemy.isDefending) {
            this.enemy.def /= 4; // Reset defense boost after turn
            this.enemy.isDefending = false;
        }

        // Move to the next character's turn
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        const currentCharacter = this.turnOrder[this.currentTurnIndex].name === 'Player' ? this.player : this.enemy;

        if (this.isCharacterFrozenOrStunned(currentCharacter)) {
            this.startCooldown();
        } else {
            if (this.turnOrder[this.currentTurnIndex].name === 'Player') {
                this.showPlayerActions();
            } else if (this.turnOrder[this.currentTurnIndex].name === 'Enemy') {
                this.hidePlayerActions();
                this.enemyAction();
            } else {
                console.error('this.turnOrder[this.currentTurnIndex].name: ', this.turnOrder[this.currentTurnIndex].name);
            }
            this.updateTurnOrderDisplay();
        }

        // Decrement status effect turns only here
        for (let effect of currentCharacter.statusEffects) {
            if (effect.turns > 0) {
                effect.turns--;
            }
        }

        this.handleStatusEffects();
    }

    isCharacterFrozenOrStunned(character) {
        console.log('isCharacterFrozenOrStunned... character: ', character);

        const frozenStatus = character.statusEffects.find(effect => effect.type === 'Freeze');
        const stunnedStatus = character.statusEffects.find(effect => effect.type === 'Stun');

        if (frozenStatus) {
            this.addHelpText(`${character.name} is frozen and skips a turn!`);
            return true;
        }

        if (stunnedStatus) {
            this.addHelpText(`${character.name} is stunned and skips a turn!`);
            return true;
        }

        return false;
    }

    handleStatusEffects() {
        const currentCharacter = this.turnOrder[this.currentTurnIndex].name === 'Player' ? this.player : this.enemy;

        for (let i = currentCharacter.statusEffects.length - 1; i >= 0; i--) {
            this.time.delayedCall(500 * i, () => {
                let effect = currentCharacter.statusEffects[i];
                let damage = 0;

                if (effect && effect.type) {

                    switch (effect.type) {
                        case 'Poison':
                            damage = Math.floor(currentCharacter.health * 0.05);
                            currentCharacter.health -= damage;
                            this.addHelpText(`${currentCharacter.name} takes poison damage!`);
                            this.showDamageIndicator(currentCharacter.sprite, damage);
                            break;
                        case 'Burn':
                            damage = Math.floor(currentCharacter.health * 0.05);
                            currentCharacter.health -= damage;
                            this.addHelpText(`${currentCharacter.name} takes burn damage!`);
                            this.showDamageIndicator(currentCharacter.sprite, damage);
                            break;
                        // Stun and Freeze are handled in isCharacterFrozenOrStunned method
                    }

                    if (currentCharacter.health <= 0) {
                        this.endBattle(currentCharacter.name === 'Player' ? 'lose' : 'win');
                    }
                }
            }, [], this);
        }

        // Filter out status effects with 0 turns left
        currentCharacter.statusEffects = currentCharacter.statusEffects.filter(effect => effect.turns !== 0);

        this.updateStatusIndicators(currentCharacter);
    }

    showPlayerActions() {
        this.actions.children.each(action => action.setVisible(true));
        this.actionBox.setVisible(true);
    }

    hidePlayerActions() {
        this.actions.children.each(action => action.setVisible(false));
        this.hideSubOptions(); // Ensure sub-options are hidden
        this.actionBox.setVisible(false);
    }

    playAttackAnimation(attacker, defender) {
        this.tweens.add({
            targets: attacker,
            x: defender.x - 50,
            duration: 300,
            yoyo: true,
            ease: 'Power1'
        });

        this.time.delayedCall(150, () => {
            this.tweens.add({
                targets: defender,
                angle: { from: -5, to: 5 },
                duration: 50,
                yoyo: true,
                repeat: 5,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    defender.angle = 0; // Reset defender angle
                }
            });
        }, [], this);
    }

    playMagicAttackAnimation(attacker, defender, elementType, damage, critical, elementValue) {
        let color;
        let statusEffect = null;

        switch (elementType) {
            case 'fire':
                color = 0xff4500; // Orange
                statusEffect = 'Burn';
                break;
            case 'ice':
                color = 0x00ffff; // Cyan
                statusEffect = 'Freeze';
                break;
            case 'water':
                color = 0x1e90ff; // DodgerBlue
                break;
            case 'lightning':
                color = 0xffff00; // Yellow
                break;
            default:
                color = 0xffffff; // Default to white
                break;
        }

        let magicBall = this.add.circle(attacker.x, attacker.y, 30, color);
        this.physics.add.existing(magicBall);
        this.physics.moveTo(magicBall, defender.x, defender.y, 500);

        this.time.delayedCall(500, () => {
            magicBall.destroy();
            this.applyEffect(defender, color);
            this.showDamageIndicator(defender, damage, critical, elementValue);

            // Inflict status effect if applicable and defender has immunities property
            if (statusEffect && defender.immunities && !defender.immunities.includes(statusEffect)) {
                this.applyStatusEffect(attacker.name, defender.name, statusEffect);
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    game.scale.resize(newWidth, newHeight);
    game.scene.scenes.forEach(scene => {
        scene.scale.resize(newWidth, newHeight);
        scene.children.list.forEach(child => {
            if (child.isText) {
                // Adjust font size or reposition texts if needed
                child.setFontSize(newHeight / 25); // Example adjustment
            }
        });
    });
});

async function generateEnemyImage(newsArticle, setting) {
    const prompt = `Generate an image of an enemy based on the following description:${monsterDescription}`;
    const encodedPrompt = encodeURIComponent(prompt);

    if (!costSavingMode) {
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
            return generateEnemyImage(newsArticle, setting); // Retry on failure
        }
    } else {
        // Cost Saving Mode
        console.warn('Cost Saving Mode Enabled, No image generation.');
        return `data:image/png;base64,${genericEnemyBase64}`;
    }
}

function spawnEnemies(scene) {
    if (newsData.length > 0) {
        let enemy = scene.enemies.create(400, 300, 'enemy');
        enemy.setCollideWorldBounds(true);
        scene.physics.add.collider(scene.player, scene.enemies, scene.startBattle, null, scene);
        scene.physics.add.collider(scene.enemies, scene.enemies);
        enemy.description = `${monsterDescription}`;

    } else {
        console.error('No news data available to generate enemies');
    }
}

async function fetchNews() {
    if (!costSavingMode) {

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
            return;
        } catch (error) {
            console.error('Error fetching news:', error);
            return fetchNews(); // Retry on failure
        }
    } else {
        console.warn('Cost Saving Mode Enabled, returning mock news data.');
        // Mock news data for cost-saving mode
        newsData = structureNewsData([
            {
                title: 'Local Hero Saves Cat from Tree',
                description: 'A brave individual scaled a tall oak tree to rescue a cat stuck for hours.',
                url: 'https://mocknews.com/hero-saves-cat'
            },
            {
                title: 'Mysterious Lights Spotted Over City',
                description: 'Residents reported seeing strange, glowing lights hovering over downtown.',
                url: 'https://mocknews.com/mysterious-lights'
            }
        ]);
        return;
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
    const responses = [];

    for (let i = 0; i < newsData.length; i++) {
        const news = newsData[i];
        var prompt = `Describe in 10-20 words a fictional version of following news article with no likeness to real people or brand names:\n\nTitle: ${news.title}\nDescription: ${news.description}`;

        if (!costSavingMode) {
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

                            if (!costSavingMode) {
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
                                        npcBase64image = base64string; // Cache player image correctly
                                    } else {
                                        throw new Error('No image generated');
                                    }
                                } catch (error) {
                                    console.error('Error generating AI response:', error);
                                    return generateAIResponses(); // Retry on failure
                                }
                            } else {
                                // Cost Saving Mode
                                console.warn('Cost Saving Mode Enabled, No image generation.');
                                npcBase64image = `data:image/png;base64,${genericPlayerBase64}`;
                                responses.push({ response: monsterDescription, persona: persona, imageBase64: npcBase64image });
                            }
                        }
                    } catch (error) {
                        console.error('Error generating AI response:', error);
                        return generateAIResponses(); // Retry on failure
                    }
                }
            } catch (error) {
                console.error('Error generating AI response:', error);
                return generateAIResponses(); // Retry on failure
            }
        } else {
            // Simulated AI response for the setting and persona
            personas = [
                { name: "Luna", description: "A mysterious warrior with ice powers" },
                { name: "Darius", description: "A fire mage from the mountains" }
            ];
            persona = personas[0]; // Select the first persona

            // Simulated monster description generation
            monsterDescription = "A towering ice golem with the ability to freeze its surroundings.";

            // Assign a generic NPC image
            npcBase64image = `data:image/png;base64,${genericPlayerBase64}`;
        }
    }

    return responses;
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
        loacation.reload();
        console.error('Error generating AI response:', error);
    }

    return parsedPersonas;
}

async function fetchEnemyStats() {
    const prompt = `Generate stats for an enemy based on this description: ${monsterDescription}. ${statRequirements}`;
    const encodedPrompt = encodeURIComponent(prompt);

    if (!costSavingMode) {

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

            const data = await response.json();
            if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                return JSON.parse(data.choices[0].message.content);
            } else {
                throw new Error('No stats generated');
            }
        } catch (error) {
            console.error('Error fetching enemy stats:', error);
            return fetchEnemyStats(); // Retry on failure
        }
    } else {
        // Simulated enemy stats
        return {
            health: 5000,
            mana: 200,
            atk: 80,
            def: 70,
            spd: 50,
            eva: 30,
            magAtk: 90,
            magDef: 60,
            luk: 40,
            wis: 75,
            element: { fire: 2, ice: -1, water: 0, lightning: 3 },
            immunities: ["Freeze", "Poison"]
        };
    }
}

async function fetchPlayerStats() {
    const prompt = `Generate stats for the player based on this description: ${persona.name}, ${persona.description}. ${statRequirements}`;
    const encodedPrompt = encodeURIComponent(prompt);

    if (!costSavingMode) {

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

            const data = await response.json();
            if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                return JSON.parse(data.choices[0].message.content);
            } else {
                throw new Error('No stats generated');
            }
        } catch (error) {
            console.error('Error fetching player stats:', error);
            return fetchPlayerStats(); // Retry on failure
        }
    } else {
        // Simulated player stats
        return {
            health: 6000,
            mana: 300,
            atk: 85,
            def: 65,
            spd: 55,
            eva: 35,
            magAtk: 100,
            magDef: 70,
            luk: 50,
            wis: 80,
            element: { fire: -1, ice: 2, water: 1, lightning: 0 },
            immunities: ["Burn", "Stun"]
        };
    }
}
