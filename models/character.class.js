class Character extends MovableObject {
    y = 140;
    height = 300;
    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);

        this.animate();
    }

    animate() {
        setInterval(() => {
            let indexImage = this.currentImage % this.IMAGES_IDLE.length;
            let path = this.IMAGES_IDLE[indexImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000);

        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.x -= 5;
            }
            if (this.world.keyboard.RIGHT) {
                this.moveRight();
            }
        }, 1000 / 10);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let indexImage = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[indexImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 1000 / 10);

    }

    jump() {
        this.y -= 5;
    }
}