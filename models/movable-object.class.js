class MovableObject {
    x = 100;
    y = 350;
    img;
    height = 80;
    width = 130;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += 50;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
        
    }

    playAnimation(images) {
        let indexImage = this.currentImage % images.length;
        let path = images[indexImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}