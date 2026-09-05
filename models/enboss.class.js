class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 50;
    IMAGES_Walking = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    constructor() {
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_Walking);
        this.x = 2500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_Walking)
        }, 1000 / 5);
    }
}