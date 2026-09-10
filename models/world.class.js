class World {
    character = new Character();
    level = level1;
    ctx;
    keyboard;
    camera_x = 0;
    coinsCounter = 0;
    bottleCounter = 0;
    statusBarHealth = new StatusBar(10, 0, 'IMAGES_Health', 100);
    statusBarCoins = new StatusBar(10, 50, 'IMAGES_Coins', 0);
    statusBarBottle = new StatusBar(10, 100, 'IMAGES_Bottle', 0);
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }, 1000 / 60);

        setInterval(() => {
            if(this.bottleCounter == 0){return}
            this.checkThrowObjects();
        }, 200);
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
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
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
                return false;
            }
            return true;
        });
    }

    checkBottleCollisions() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCounter++;
                this.statusBarBottle.setPercentage(this.bottleCounter * 20);
                return false;
            }
            return true;
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins)
        this.addObjectsToMap(this.level.bottles)
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
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
        movableObject.drawFrame(this.ctx);

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