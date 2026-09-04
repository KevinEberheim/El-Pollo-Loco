class MovableObject {
    x = 100;
    y = 100;
    img;
    height = 100;
    width = 50;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        this.x += 5;
    }

    moveLeft() {
        this.x -= 5;
    }
}