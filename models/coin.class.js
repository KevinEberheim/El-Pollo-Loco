class Coins extends DrawableObject {
    width = 150;
    height = 150;

    /**
     * Creates a coin at a random position and sets its collision offset.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.offset = { top: 50, left: 50, right: 50, bottom: 50 };
        this.x = 500 + Math.random() * 1500;
        this.y = 100 + Math.random() * 200;
    }
}