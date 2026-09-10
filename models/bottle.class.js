class Bottles extends DrawableObject{
    width = 80;
    height = 80;
    x;
    y = 350;


    constructor() {
        super().loadImage('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.offset = { top: 20, left: 25, right: 25, bottom: 10 };
        this.x = 500 + Math.random() * 1500; 
    }
}