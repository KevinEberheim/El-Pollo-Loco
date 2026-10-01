class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_end_x = 719 * 3;

    /**
     * Creates a level with all its game objects.
     * @param {MovableObject[]} enemies - Enemies of the level.
     * @param {Cloud[]} clouds - Background clouds.
     * @param {Coins[]} coins - Collectible coins.
     * @param {Bottles[]} bottles - Collectible bottles.
     * @param {BackgroundObject[]} backgroundObjects - Background layers for the parallax effect.
     */
    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}
