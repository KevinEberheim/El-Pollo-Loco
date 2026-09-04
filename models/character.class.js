class Character extends MovableObject {
    y = 140;
    height = 300;
    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
    }

    jump() {
        this.y -= 5;
    }
}