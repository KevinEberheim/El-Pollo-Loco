class Chicken extends MovableObject {
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    isDead = false;
    walkInterval;
    animInterval;

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD)
        this.offset = { top: 5, left: 5, right: 5, bottom: 5 };
        this.x = 500 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.walkInterval = setInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 60);

        this.animateInterval = setInterval(() => {
            if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);
    }

    kill() {
        this.isDead = true;
        this.speed = 0;
        this.loadImage(this.IMAGES_DEAD[0]);
        setTimeout(() => {
            clearInterval(this.walkInterval);
            clearInterval(this.animateInterval);
        }, 500);
    }
}