class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a background layer image at the given x position.
     * @param {string} path - Path to the background image.
     * @param {number} x - X position of the layer.
     */
    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.y = 480 - this.height;
    }
}