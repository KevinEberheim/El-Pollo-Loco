class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    imgSecond;

    /**
     * Creates a cloud made of two images placed next to each other
     * at a randomized x position and starts its movement.
     * @param {number} x - Base x position, a random offset of up to 500 is added.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.imgSecond = new Image();
        this.imgSecond.src = 'img/5_background/layers/4_clouds/2.png';
        this.x = x + Math.random() * 500;
        this.animate();
    }

    /**
     * Moves the cloud to the left at 60 FPS.
     */
    animate() {
        this.addInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Draws both cloud images directly behind each other.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.imgSecond, this.x + this.width, this.y, this.width, this.height);
    }
}