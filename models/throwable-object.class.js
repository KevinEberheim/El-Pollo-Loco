class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    world;
    goesLeft;
    throwInterval;
    isSplashing = false;

    /**
     * Creates a thrown bottle, preloads its images and starts the throw.
     * @param {number} x - Start x position.
     * @param {number} y - Start y position.
     * @param {World} world - The world the bottle belongs to.
     * @param {boolean} goesLeft - True if the bottle flies to the left.
     */
    constructor(x, y, world, goesLeft) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.world = world;
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.goesLeft = goesLeft;
        this.throw();
    }

    /**
     * Applies the initial upward speed and starts gravity and the throw loop.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = this.addInterval(() => this.updateThrow(), 1000 / 25);
    }

    /**
     * Updates the bottle: splashes on impact or ground contact, otherwise keeps flying.
     */
    updateThrow() {
        if (this.isSplashing) return this.splashAndRemove();
        const chicken = this.findHitChicken();
        if (this.world.gameOver || !this.isAboveGround()) this.startSplash();
        else if (this.hitsBoss()) { this.world.endboss.hit(); this.startSplash(); }
        else if (chicken) { chicken.kill(); this.startSplash(); }
        else this.fly();
    }

    /**
     * Freezes the bottle in place and switches to the splash phase.
     */
    startSplash() {
        this.isSplashing = true;
        this.speedY = 0;
        this.acceleration = 0;
    }

    /**
     * Moves the bottle horizontally and plays the rotation animation.
     */
    fly() {
        this.x += this.goesLeft ? -10 : 10;
        this.playAnimation(this.IMAGES_ROTATE);
    }

    /**
     * Checks whether the bottle hits the endboss (with an adjusted left offset).
     * @returns {boolean} True if the bottle collides with the endboss.
     */
    hitsBoss() {
        const boss = this.world.endboss;
        if (!boss) return false;
        return this.isColliding({ ...boss, offset: { ...boss.offset, left: 100 } });
    }

    /**
     * Finds a living normal chicken the bottle collides with.
     * Small chickens and the endboss are excluded on purpose.
     * @returns {Chicken|undefined} The hit chicken or undefined.
     */
    findHitChicken() {
        return this.world.level.enemies.find(
            e => e.constructor === Chicken && !e.isDead && this.isColliding(e)
        );
    }

    /**
     * Plays the splash animation once and removes the bottle afterwards.
     */
    splashAndRemove() {
        this.playAnimationOnce(this.IMAGES_SPLASH);
        if (this.currentImage >= this.IMAGES_SPLASH.length) {
            this.clearAllIntervals();
            this.removeFromWorld();
        }
    }

    /**
     * Removes the bottle from the throwable objects of the world.
     */
    removeFromWorld() {
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
}