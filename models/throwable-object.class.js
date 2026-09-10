class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y, world) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.world = world
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        let throwInterval = setInterval(() => {
            let endboss = this.world.level.enemies[this.world.level.enemies.length - 1];
            let bossHitboxForBottle = { ...endboss, offset: { ...endboss.offset, left: 100 } };

            if (this.isColliding(bossHitboxForBottle)) {
                endboss.hit();
                this.splashAndRemove(throwInterval);
            } else if (!this.isAboveGround()) {
                this.splashAndRemove(throwInterval);
            } else {
                this.x += 10;
                this.playAnimation(this.IMAGES_ROTATE);
            }
        }, 1000 / 25);
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