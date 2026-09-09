class Coins extends DrawableObject{
    width = 150;
    height = 150;
    x;
    y;


    constructor() {
        super().loadImage('../img/8_coin/coin_1.png');
        this.offset = { top: 95, left: 95, right: 95, bottom: 95 };
        this.x = 500 + Math.random() * 500;
        this.y = 100 + Math.random() * 200; 
    }
}