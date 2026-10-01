class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    prevY;
    prevSpeedY;
    currentAnimation;

    /**
     * Applies gravity at 25 FPS and stores the previous position and vertical speed.
     */
    applyGravity() {
        this.addInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.prevY = this.y;
                this.prevSpeedY = this.speedY;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y > 140 && !(this instanceof ThrowableObject)) this.y = 140;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above its ground level.
     * @returns {boolean} True if the object is in the air.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 350;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Checks whether this object collides with another one, respecting both offsets.
     * @param {MovableObject|DrawableObject} movableObject - The other object.
     * @returns {boolean} True if the collision boxes overlap.
     */
    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    /**
     * Reduces the energy by 20 unless the object is in its hurt cooldown.
     */
    hit() {
        if (this.isHurt()) return;
        this.energy = Math.max(0, this.energy - 20);
        this.lastHit = new Date().getTime();
    }

    /**
     * Checks whether the object was hit within the last second.
     * @returns {boolean} True if the hurt cooldown is active.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return this.energy < 100 && timepassed < 1;
    }

    /**
     * Checks whether the energy is used up.
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays the given animation in a loop. Restarts at the first image when the animation changes.
     * @param {string[]} images - Image paths of the animation.
     */
    playAnimation(images) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0;
        }
        let indexImage = this.currentImage % images.length;
        let path = images[indexImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the given animation once and stays on the last image.
     * Restarts at the first image when the animation changes.
     * @param {string[]} images - Image paths of the animation.
     */
    playAnimationOnce(images) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0;
        }
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }
}