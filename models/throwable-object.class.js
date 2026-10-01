class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y, world, goesLeft) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.world = world
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.goesLeft = goesLeft;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = this.addInterval(() => this.updateThrow(), 1000 / 25);
    }

    updateThrow() {
        const i = this.throwInterval;
        const chicken = this.findHitChicken();
        if (this.world.gameOver || !this.isAboveGround()) this.splashAndRemove(i);
        else if (this.hitsBoss()) { this.world.endboss.hit(); this.splashAndRemove(i); }
        else if (chicken) { chicken.kill(); this.splashAndRemove(i); }
        else this.fly();
    }

    fly() {
        this.x += this.goesLeft ? -10 : 10;
        this.playAnimation(this.IMAGES_ROTATE);
    }

    hitsBoss() {
        const boss = this.world.endboss;
        if (!boss) return false;
        return this.isColliding({ ...boss, offset: { ...boss.offset, left: 100 } });
    }

    findHitChicken() {
        return this.world.level.enemies.find(
            e => e.constructor === Chicken && !e.isDead && this.isColliding(e)
        );
    }

    splashAndRemove(interval) {
        this.playAnimationOnce(this.IMAGES_SPLASH);
        if (this.currentImage >= this.IMAGES_SPLASH.length) {
            clearInterval(interval);
            this.removeFromWorld();
        }
    }

    removeFromWorld() {
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
}