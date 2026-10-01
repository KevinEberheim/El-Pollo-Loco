class StatusBar extends DrawableObject {
    IMAGES_Health_Character = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_Coins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_Bottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    IMAGES_Health_Endboss = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percentage;
    images;

    /**
     * Creates a status bar and shows the initial percentage.
     * @param {number} x - X position on the canvas.
     * @param {number} y - Y position on the canvas.
     * @param {string} imagesKey - Name of the image array property to use (e.g. "IMAGES_Coins").
     * @param {number} startPercentage - Initial percentage value.
     */
    constructor(x, y, imagesKey, startPercentage) {
        super();
        this.images = this[imagesKey];
        this.loadImages(this.images);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setPercentage(startPercentage);
    }

    /**
     * Sets the percentage (minimum 0) and updates the displayed image.
     * @param {number} percentageValue - New percentage value.
     */
    setPercentage(percentageValue) {
        this.percentage = Math.max(0, percentageValue);
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the percentage to an image index in 20 percent steps.
     * @returns {number} Index of the image to display.
     */
    resolveImageIndex() {
        return Math.min(this.images.length - 1, Math.floor(this.percentage / 20));
    }
}