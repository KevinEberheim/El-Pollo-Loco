class StatusBar extends DrawableObject {
    IMAGES_Health = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    persentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_Health);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.persentage);
    }

    setPercentage(persentage) {
        this.persentage = persentage;
        let path = this.IMAGES_Health[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.persentage == 100) {
            return 5;
        }
        else if (this.persentage >= 80) {
            return 4;
        }
        else if (this.persentage >= 60) {
            return 3;
        }
        else if (this.persentage >= 40) {
            return 2;
        }
        else if (this.persentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}