class Chicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    isDead = false;
    walkInterval;
    animateInterval;
    deathSound = SoundManager.create('audio/chickenDeath.mp3', 0.4);

    /**
    * Creates a chicken, preloads its images and starts its animations.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.offset = { top: 5, left: 5, right: 5, bottom: 5 };
        this.x = 500 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 1;
        this.animate();
    }

    /**
     * Starts the movement and walking animation intervals while the chicken is alive.
     */
    animate() {
        this.walkInterval = this.addInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 60);

        this.animateInterval = this.addInterval(() => {
            if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);
    }

    /**
     * Kills the chicken: plays the death sound, stops movement, shows the dead image
     * and clears the animation intervals after a short delay.
     */
    kill() {
        SoundManager.play(this.deathSound);
        this.isDead = true;
        this.speed = 0;
        this.loadImage(this.IMAGES_DEAD[0]);
        setTimeout(() => {
            clearInterval(this.walkInterval);
            clearInterval(this.animateInterval);
        }, 500);
    }
}