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
    energy = 100;
    hitSound = SoundManager.create('audio/chickenHit.mp3', 0.4);
    deathSound = SoundManager.create('audio/chickenDeath.mp3', 0.4);


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_Alert);
        this.loadImages(this.IMAGES_Attack);
        this.loadImages(this.IMAGES_Hurt);
        this.loadImages(this.IMAGES_Dead);
        this.offset.left = -50
        this.x = 2500;
        this.speed = 2.5 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.walkInterval = this.addInterval(() => {
            if (!this.isAlerting && !this.hasAlerted && !this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60)

        this.animateInterval = this.addInterval(() => {
            if (this.isDead) return;
            let distance = this.x - this.world.character.x;

            if (this.isAlerting) {
                this.playAnimationOnce(this.IMAGES_Alert);
                if (this.currentImage >= this.IMAGES_Alert.length) {
                    this.alertIsFinished();
                }
                return;
            }

            if (distance > 200) {
                this.playAnimation(this.IMAGES_Walking);
                this.hasAlerted = false;
            } else if (distance <= 200 && !this.hasAlerted) {
                this.isAlerting = true;
                this.currentImage = 0;
            } else if (this.hasAlerted) {
                this.playAnimation(this.IMAGES_Attack);
            }

        }, 1000 / 15);
    }

    alertIsFinished() {
        this.isAlerting = false;
        this.hasAlerted = true;
        this.x -= 40;
    };

    hit() {
        if (this.isHurt()) return;
        this.energy -= 20;
        if (this.energy >= 20) {
            SoundManager.play(this.hitSound);
            this.playAnimationOnce(this.IMAGES_Hurt);
        }
        if (this.energy < 20) {
            SoundManager.play(this.deathSound);
            this.energy = 0;
            this.kill();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    kill() {
        this.isDead = true;
        this.speed = 0;
        clearInterval(this.walkInterval);
        clearInterval(this.animateInterval);
        this.deathIntervall = this.addInterval(() => { this.playAnimationOnce(this.IMAGES_Dead) }, 100)
    }
}