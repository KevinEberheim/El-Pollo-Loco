class Character extends MovableObject {
    y = 140;
    height = 300;
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    hurtSound = SoundManager.create('audio/characterHurt.mp3', 0.4);
    jumpSound = SoundManager.create('audio/jump.mp3', 0.4);
    deathSoundPlayed = false;

    /**
    * Creates the character, preloads all images and starts gravity and animations.
    */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.offset = { top: 120, left: 20, right: 20, bottom: 10 };
        this.speed = 10;
        this.animate();
    }

    /**
     * Starts all character intervals (idle, walking, movement, state animation).
     */
    animate() {
        this.startIdleAnimation();
        this.startWalkAnimation();
        this.startMovementLoop();
        this.startStateAnimation();
    }

    /**
     * Plays the idle animation while the character stands still on the ground.
     */
    startIdleAnimation() {
        this.addInterval(() => {
            if (this.world.gameOver) return;
            if (!this.isAboveGround() && !(this.key.LEFT || this.key.RIGHT)) {
                this.playAnimationOnce(this.IMAGES_IDLE);
            }
        }, 500);
    }

    /**
     * Plays the walking animation while a direction key is pressed on the ground.
     */
    startWalkAnimation() {
        this.addInterval(() => {
            if (this.world.gameOver) return;
            if ((this.key.RIGHT || this.key.LEFT) && !this.isAboveGround() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    /**
     * Updates position, camera and jumping at 60 FPS.
     */
    startMovementLoop() {
        this.addInterval(() => {
            if (this.world.gameOver) return;
            this.handleMovement();
            this.world.camera_x = -this.x + 100;
            this.handleJumpInput();
        }, 1000 / 60);
    }

    /**
     * Moves the character left or right depending on keyboard input and level bounds.
     */
    handleMovement() {
        if (this.key.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.key.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /**
     * Triggers a jump if jump input is active and the character is on the ground.
     */
    handleJumpInput() {
        if ((this.key.SPACE || this.key.UP) && !this.isAboveGround()) this.jump();
    }

    /**
     * Plays death, jump or hurt animation depending on the current state.
     */
    startStateAnimation() {
        this.addInterval(() => {
            if (this.isDead()) this.handleDeathState();
            else if (this.isAboveGround()) this.playAnimationOnce(this.IMAGES_JUMPING);
            else if (this.isHurt()) this.handleHurtState();
        }, 200);
    }

    /**
     * Makes the character jump and plays the jump sound.
     */
    jump() {
        SoundManager.play(this.jumpSound);
        this.currentImage = 0;
        this.speedY = 30;
    }

    /**
     * Plays the death animation and the hurt sound once.
     */
    handleDeathState() {
        this.playAnimationOnce(this.IMAGES_DEAD);
        this.playSoundOnce('deathSoundPlayed');
    }

    /**
     * Plays the hurt animation and a throttled hurt sound.
     */
    handleHurtState() {
        this.playAnimationOnce(this.IMAGES_HURT);
        this.playSoundThrottled('lastHurtSound', 1000);
    }

    /**
     * Plays the hurt sound only once, tracked by a flag on this object.
     * @param {string} flagName - Name of the boolean property used as guard.
     */
    playSoundOnce(flagName) {
        if (!this[flagName]) {
            this[flagName] = true;
            SoundManager.play(this.hurtSound);
        }
    }

    /**
     * Plays the hurt sound only if the minimum interval has passed.
     * @param {string} timestampName - Name of the property storing the last play time.
     * @param {number} minInterval - Minimum time between plays in milliseconds.
     */
    playSoundThrottled(timestampName, minInterval) {
        const now = new Date().getTime();
        if (!this[timestampName] || now - this[timestampName] >= minInterval) {
            this[timestampName] = now;
            SoundManager.play(this.hurtSound);
        }
    }

    /**
     * Returns the keyboard input handler of the current world.
    * @returns {Keyboard} The shared keyboard instance.
    */
    get key() {
        return this.world.keyboard;
    }

}