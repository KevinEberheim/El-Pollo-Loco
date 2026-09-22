class World {
    character = new Character();
    level = level1;
    ctx;
    keyboard;
    camera_x = 0;
    coinsCounter = 0;
    bottleCounter = 0;
    lastThrowTime = 0;
    statusBarHealthCharakter = new StatusBar(10, 0, 'IMAGES_Health_Character', 100);
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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    addWorldInterval(fn, time) {
        let id = setInterval(fn, time);
        this.worldIntervals.push(id);
        return id;
    }

    setWorld() {
        this.character.world = this;
        this.totalCoins = this.level.coins.length;
    }

    run() {
        this.addWorldInterval(() => {
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkEndbossHit();
            this.checkGameOver();
        }, 1000 / 60);

        this.addWorldInterval(() => {
            if (this.bottleCounter == 0) { return }
            this.checkThrowObjects();
        }, 1000 / 20);
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead) return;

            if (this.character.isColliding(enemy)) {
                const enemyTop = enemy.y + enemy.offset.top;
                const charBottom = this.character.y + this.character.height - this.character.offset.bottom;
                const previousCharBottom = this.character.prevY + this.character.height - this.character.offset.bottom;
                const isFalling = this.character.prevSpeedY < 0;
                const crossedEnemyTop = previousCharBottom < enemyTop && charBottom >= enemyTop;
                const isJumpingOnTop = isFalling && crossedEnemyTop;

                if (isJumpingOnTop) {
                    enemy.kill();
                    this.character.speedY = 15;
                } else {
                    this.character.hit();
                    this.statusBarHealthCharakter.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkThrowObjects() {
        let now = Date.now();
        if (this.keyboard.D && now - this.lastThrowTime >= 1000) {
            this.lastThrowTime = now;
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 120, this);
            this.throwableObjects.push(bottle);
            this.bottleCounter--;
            this.statusBarBottle.setPercentage(this.bottleCounter * 20);
        }
    }

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

        if (!this.endboss && this.coinsCounter >= this.totalCoins) {
            this.spawnEndboss();
        }
    }

    checkBottleCollisions() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCounter++;
                this.statusBarBottle.setPercentage(this.bottleCounter * 20);
                SoundManager.play(this.bottleCollectSound);
                return false;
            }
            return true;
        });
    }

    spawnEndboss() {
        this.endboss = new Endboss();
        this.endboss.world = this;
        this.level.enemies.push(this.endboss);
        this.statusBarHealthEndboss = new StatusBar(500, 50, 'IMAGES_Health_Endboss', 100);
        playMusic(endbossMusic);
    }

    checkEndbossHit() {
        if (!this.endboss) return;
        if (this.endboss.energy !== this.lastEndbossEnergy) {
            this.statusBarHealthEndboss.setPercentage(this.endboss.energy);
            this.lastEndbossEnergy = this.endboss.energy;
        }
    }

    checkGameOver() {
        if (this.gameOver) return;
        if (this.character.isDead()) {
            this.gameOver = true;
            setTimeout(() => {
                SoundManager.stop(endbossMusic);
                SoundManager.stop(gameStartMusic);
                this.stopRendering = true;
                this.destroy();
                this.showEndScreen(false);
                SoundManager.play(this.loseSound)
            }, 1500);
        } else if (this.endboss && this.endboss.energy <= 0) {
            this.gameOver = true;
            setTimeout(() => {
                SoundManager.stop(endbossMusic);
                this.stopRendering = true;
                this.destroy();
                this.showEndScreen(true);
                SoundManager.play(this.winSound)
            }, 500);
        }
    }

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

    destroy() {
        this.worldIntervals.forEach(id => clearInterval(id));
        this.worldIntervals = [];
        this.character.clearAllIntervals();
        this.level.enemies.forEach(enemy => enemy.clearAllIntervals());
        this.throwableObjects.forEach(t => t.clearAllIntervals());
    }


    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins)
        this.addObjectsToMap(this.level.bottles)
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealthCharakter);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        if (this.statusBarHealthEndboss) this.addToMap(this.statusBarHealthEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        if (!this.stopRendering) {
            requestAnimationFrame(() => this.draw());
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

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

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}