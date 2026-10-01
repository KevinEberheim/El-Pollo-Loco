class DrawableObject {
    static paused = false;
    img;
    imageCache = {};
    currentImage = 0;
    intervals = [];
    x = 100;
    y = 350;
    height = 80;
    width = 130;
    offset = {
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0
    }

    /**
     * Registers an interval that only runs while the game is not paused.
     * @param {Function} fn - Callback executed on each tick.
     * @param {number} time - Interval time in milliseconds.
     * @returns {number} The interval ID.
     */
    addInterval(fn, time) {
        let id = setInterval(() => {
            if (!DrawableObject.paused) fn();
        }, time);
        this.intervals.push(id);
        return id;
    }

    /**
     * Clears all intervals registered via addInterval.
     */
    clearAllIntervals() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
    }

    /**
     * Draws the current image onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a debug frame around the collision box (Character and ChickenSmall only).
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    /**
     * Loads a single image and stores it as the current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images into the image cache.
     * @param {string[]} arr - Image paths to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}