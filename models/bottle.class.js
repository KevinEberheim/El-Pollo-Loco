class Bottles extends MovableObject {
    width = 80;
    height = 80;
    y = 350;
    animateInterval;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a bottle at a random x position and starts its image animation.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.offset = { top: 20, left: 25, right: 25, bottom: 10 };
        this.x = 250 + Math.random() * 1000;
        this.changeBottleImage();
    }

    /**
     * Alternates between the two ground images every 500 ms.
     */
    changeBottleImage() {
        this.animateInterval = this.addInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500);
    }
}