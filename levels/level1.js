let level1;

/**
 * Initializes the first game level by creating a new Level instance
 * with all required game objects.
 *
 * This function assembles the main level configuration, including:
 * - enemies such as small chickens and regular chickens
 * - background clouds
 * - collectible coins
 * - throwable bottles
 * - layered background objects for the parallax effect
 *
 * The created level is stored in the global `level1` variable and can
 * then be used by the game world for rendering and gameplay logic.
 *
 * @returns {void}
 */
function initLevel() {
    level1 = new Level(
        [
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
        ],
        [
            new Cloud(10),
            new Cloud(750),
            new Cloud(1500),
        ],
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
        ],
        [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ]
    );
}