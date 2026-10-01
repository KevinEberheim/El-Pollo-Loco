class World {
    character = new Character();
    level = level1;
    ctx;
    keyboard;
    camera_x = 0;
    coinsCounter = 0;
    bottleCounter = 0;
    totalCoins;
    lastThrowTime = 0;
    lastEndbossEnergy;
    stopRendering = false;
    statusBarHealthCharacter = new StatusBar(10, 0, 'IMAGES_Health_Character', 100);
    statusBarCoins = new StatusBar(10, 50, 'IMAGES_Coins', 0);
    statusBarBottle = new StatusBar(10, 100, 'IMAGES_Bottle', 0);
    statusBarHealthEndboss;
    coinCollectSound = SoundManager.create('audio/coinCollect.mp3', 0.4);
    bottleCollectSound = SoundManager.create('audio/itemCollect.mp3', 0.4);
    loseSound = SoundManager.create('audio/gameOverFail.mp3', 0.4);
    winSound = SoundManager.create('audio/gameOverWin.mp3', 0.4);
    endboss;
    throwableObjects = [];
    worldIntervals = [];
    gameOver = false;

    /**
     * Creates the world, starts rendering and the game logic.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The shared keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Registers a world interval that only runs while the game is not paused.
     * @param {Function} fn - Callback executed on each tick.
     * @param {number} time - Interval time in milliseconds.
     * @returns {number} The interval ID.
     */
    addWorldInterval(fn, time) {
        let id = setInterval(() => {
            if (!DrawableObject.paused) fn();
        }, time);
        this.worldIntervals.push(id);
        return id;
    }

    /**
     * Links the character to this world and stores the total coin count.
     */
    setWorld() {
        this.character.world = this;
        this.totalCoins = this.level.coins.length;
    }

    /**
     * Starts the collision/game-state loop (60 FPS) and the throw loop (20 FPS).
     */
    run() {
        this.addWorldInterval(() => {
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkEndbossHit();
            this.checkGameOver();
        }, 1000 / 60);
        this.addWorldInterval(() => this.checkThrowObjects(), 1000 / 20);
    }

    /**
     * Checks the character against all living enemies and handles stomps and damage.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead || !this.character.isColliding(enemy)) return;
            if (this.isJumpingOnTop(enemy)) {
                enemy.kill();
                this.character.speedY = 15;
            } else {
                this.character.hit();
                this.statusBarHealthCharacter.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks whether the character is falling onto the top of the given enemy.
     * @param {MovableObject} enemy - The enemy the character collides with.
     * @returns {boolean} True if the character crossed the enemy's top while falling.
     */
    isJumpingOnTop(enemy) {
        const c = this.character;
        const enemyTop = enemy.y + enemy.offset.top;
        const charBottom = c.y + c.height - c.offset.bottom;
        const previousCharBottom = c.prevY + c.height - c.offset.bottom;
        const isFalling = c.prevSpeedY < 0;
        return isFalling && previousCharBottom < enemyTop && charBottom >= enemyTop;
    }

    /**
     * Throws a bottle if D is pressed, bottles are available and the cooldown has passed.
     */
    checkThrowObjects() {
        let now = Date.now();
        if (this.bottleCounter > 0 && this.keyboard.D && now - this.lastThrowTime >= 1000) {
            this.lastThrowTime = now;
            const left = this.character.otherDirection;
            const startX = left ? this.character.x - 30 : this.character.x + 50;
            this.throwableObjects.push(new ThrowableObject(startX, this.character.y + 120, this, left));
            this.bottleCounter--;
            this.statusBarBottle.setPercentage(this.bottleCounter * 20);
        }
    }

    /**
     * Collects coins the character touches and spawns the endboss once all are collected.
     */
    checkCoinCollisions() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsCounter++;
                this.statusBarCoins.setPercentage(this.coinsCounter * 20);
                SoundManager.play(this.coinCollectSound);
                return false;
            }
            return true;
        });
        if (!this.endboss && this.coinsCounter >= this.totalCoins) this.spawnEndboss();
    }

    /**
     * Collects bottles the character touches and stops their animation intervals.
     */
    checkBottleCollisions() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.clearAllIntervals();
                this.bottleCounter++;
                this.statusBarBottle.setPercentage(this.bottleCounter * 20);
                SoundManager.play(this.bottleCollectSound);
                return false;
            }
            return true;
        });
    }

    /**
     * Creates the endboss, adds it to the enemies, shows its status bar and starts its music.
     */
    spawnEndboss() {
        this.endboss = new Endboss();
        this.endboss.world = this;
        this.level.enemies.push(this.endboss);
        this.statusBarHealthEndboss = new StatusBar(500, 50, 'IMAGES_Health_Endboss', 100);
        playMusic(endbossMusic);
    }

    /**
     * Updates the endboss status bar when its energy has changed.
     */
    checkEndbossHit() {
        if (!this.endboss) return;
        if (this.endboss.energy !== this.lastEndbossEnergy) {
            this.statusBarHealthEndboss.setPercentage(this.endboss.energy);
            this.lastEndbossEnergy = this.endboss.energy;
        }
    }

    /**
     * Ends the game if the character or the endboss is dead.
     */
    checkGameOver() {
        if (this.gameOver) return;
        if (this.character.isDead()) this.endGame(false, 1500);
        else if (this.endboss && this.endboss.energy <= 0) this.endGame(true, 500);
    }

    /**
     * Marks the game as over and shows the end screen after a delay.
     * @param {boolean} won - True if the player won.
     * @param {number} delay - Delay before the end screen in milliseconds.
     */
    endGame(won, delay) {
        this.gameOver = true;
        setTimeout(() => {
            SoundManager.stop(endbossMusic);
            SoundManager.stop(gameStartMusic);
            this.destroy();
            this.showEndScreen(won);
            SoundManager.play(won ? this.winSound : this.loseSound);
        }, delay);
    }

    /**
     * Shows the end screen: first "Game over", after 1.5 seconds the win or lose image.
     * @param {boolean} won - True if the player won.
     */
    showEndScreen(won) {
        let overlay = document.getElementById('endscreen');
        let img = document.getElementById('endscreenImg');
        img.src = 'img/You won, you lost/Game over A.png';
        overlay.classList.remove('dp-none');
        setTimeout(() => {
            img.src = won
                ? 'img/You won, you lost/You Win A.png'
                : 'img/You won, you lost/You lost.png';
        }, 1500);
    }

    /**
     * Stops rendering and clears all intervals of the world and its objects.
     */
    destroy() {
        this.stopRendering = true;
        this.worldIntervals.forEach(id => clearInterval(id));
        this.worldIntervals = [];
        this.character.clearAllIntervals();
        [...this.level.enemies, ...this.level.clouds, ...this.level.bottles, ...this.throwableObjects]
            .forEach(obj => obj.clearAllIntervals());
    }

    /**
     * Renders one frame and schedules the next one unless rendering is stopped.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.drawWithCamera(() => this.drawBackground());
        this.drawStatusBars();
        this.drawWithCamera(() => this.drawEntities());
        if (!this.stopRendering) requestAnimationFrame(() => this.draw());
    }

    /**
     * Runs a draw callback with the canvas shifted by the camera position.
     * @param {Function} drawFn - Callback that draws the objects.
     */
    drawWithCamera(drawFn) {
        this.ctx.translate(this.camera_x, 0);
        drawFn();
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws background layers, clouds, coins and collectable bottles.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Draws the status bars at a fixed screen position.
     */
    drawStatusBars() {
        this.addToMap(this.statusBarHealthCharacter);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        if (this.statusBarHealthEndboss) this.addToMap(this.statusBarHealthEndboss);
    }

    /**
     * Draws the character, enemies and thrown bottles.
     */
    drawEntities() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws a list of objects.
     * @param {DrawableObject[]} objects - Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Draws a single object and mirrors it if it faces the other direction.
     * @param {DrawableObject} movableObject - The object to draw.
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        // movableObject.drawFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Mirrors the canvas horizontally for the given object.
     * @param {DrawableObject} movableObject - The object to mirror.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the canvas and the x position after mirroring.
     * @param {DrawableObject} movableObject - The mirrored object.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}