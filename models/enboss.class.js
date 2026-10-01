class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 50;
    IMAGES_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_Alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_Attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_Dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
  
    isDead = false;
    isAlerting = false;
    hasAlerted = false;
    energy = 100;
    walkInterval;
    animateInterval;
    deathInterval;
    hitSound = SoundManager.create('audio/chickenHit.mp3', 0.4);
    deathSound = SoundManager.create('audio/chickenDeath.mp3', 0.4);

    /**
     * Creates the endboss, preloads all images and starts its animations.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Alert);
        this.loadImages(this.IMAGES_Attack);
        this.loadImages(this.IMAGES_Hurt);
        this.loadImages(this.IMAGES_Dead);
        this.offset.left = 50;
        this.x = 2500;
        this.speed = 2.5 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Starts the movement and animation intervals.
     */
    animate() {
        this.walkInterval = this.addInterval(() => this.updateMovement(), 1000 / 60);
        this.animateInterval = this.addInterval(() => this.updateAnimation(), 1000 / 15);
    }

    /**
     * Moves the endboss to the left unless it is alerting, has alerted or is dead.
     */
    updateMovement() {
        if (!this.isAlerting && !this.hasAlerted && !this.isDead) this.moveLeft();
    }

    /**
     * Chooses the animation based on state and distance to the character.
     */
    updateAnimation() {
        if (this.isDead || this.world.character.isDead()) return;
        if (this.isAlerting) this.playAlert();
        else if (this.distanceToCharacter() > 200) this.playWalk();
        else if (!this.hasAlerted) this.startAlert();
        else this.playAnimation(this.IMAGES_Attack);
    }

    /**
     * Calculates the horizontal distance to the character.
     * @returns {number} Distance in pixels (positive if the boss is to the right).
     */
    distanceToCharacter() {
        return this.x - this.world.character.x;
    }

    /**
     * Plays the walking animation and resets the alert state.
     */
    playWalk() {
        this.playAnimation(this.IMAGES_Walking);
        this.hasAlerted = false;
    }

    /**
     * Starts the alert phase from the first alert image.
     */
    startAlert() {
        this.isAlerting = true;
        this.currentImage = 0;
    }

    /**
     * Plays the alert animation once and finishes the alert phase afterwards.
     */
    playAlert() {
        this.playAnimationOnce(this.IMAGES_Alert);
        if (this.currentImage >= this.IMAGES_Alert.length) this.alertIsFinished();
    }

    /**
     * Ends the alert phase and moves the boss slightly forward.
     */
    alertIsFinished() {
        this.isAlerting = false;
        this.hasAlerted = true;
        this.x -= 140;
    }

    /**
     * Reduces the boss energy by 20 and either kills or hurts it.
     * Ignored while the boss is dead or in its hurt cooldown.
     */
    hit() {
        if (this.isDead || this.isHurt()) return;
        this.energy -= 20;
        if (this.energy < 20) this.kill();
        else this.playHurt();
    }

    /**
     * Plays the hurt sound and animation and starts the hurt cooldown.
     */
    playHurt() {
        SoundManager.play(this.hitSound);
        this.playAnimationOnce(this.IMAGES_Hurt);
        this.lastHit = new Date().getTime();
    }

    /**
     * Checks whether the boss was hit within the last second.
     * @returns {boolean} True if the hurt cooldown is still active.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Kills the boss: plays the death sound, stops all movement and starts the death animation.
     */
    kill() {
        SoundManager.play(this.deathSound);
        this.energy = 0;
        this.isDead = true;
        this.speed = 0;
        clearInterval(this.walkInterval);
        clearInterval(this.animateInterval);
        this.deathInterval = this.addInterval(() => this.playAnimationOnce(this.IMAGES_Dead), 100);
    }
}