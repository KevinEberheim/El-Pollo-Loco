class StatusBar extends DrawableObject {
    IMAGES_Health = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    IMAGES_Coins = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    IMAGES_Bottle = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    persentage;

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

    setPercentage(startPercentage) {
        this.persentage = startPercentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    // resolveImageIndex() {
    //     if (this.persentage == 100) {
    //         if (this.images == this.IMAGES_Health) {
    //             return 5;
    //         }
    //         else {
    //             return 0;
    //         }
    //     }
    //     else if (this.persentage >= 80) {
    //         if (this.images == this.IMAGES_Health) {
    //             return 4;
    //         }
    //         else {
    //             return 1;
    //         }
    //     }
    //     else if (this.persentage >= 60) {
    //         if (this.images == this.IMAGES_Health) {
    //             return 3;
    //         }
    //         else {
    //             return 2;
    //         }
    //     }
    //     else if (this.persentage >= 40) {
    //         if (this.images == this.IMAGES_Health) {
    //             return 2;
    //         }
    //         else {
    //             return 3;
    //         }
    //     }
    //     else if (this.persentage >= 20) {
    //         if (this.images == this.IMAGES_Health) {
    //             return 1;
    //         }
    //         else {
    //             return 4;
    //         }
    //     } else {
    //         if (this.images == this.IMAGES_Health) {
    //             return 0;
    //         }
    //         else {
    //             return 5;
    //         }
    //     }
    // }

    resolveImageIndex() {
        return Math.min(5, Math.floor(this.persentage / 20));
    }
}