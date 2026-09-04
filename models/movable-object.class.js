class MovableObject {
    x = 100;
    y = 350;
    img;
    height = 80;
    width = 130;

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