class Bottles extends MovableObject {
    width = 80;
    height = 80;
    x;
    y = 350;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.offset = { top: 20, left: 25, right: 25, bottom: 10 };
        this.x = 250 + Math.random() * 1000;
        this.changeBottleImage();
    }

    changeBottleImage() {
        this.animateInterval = this.addInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500);
    }
}