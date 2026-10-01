let level1;

/**
 * Initializes the first game level and stores it in the global `level1` variable.
 * @returns {void}
 */
function initLevel() {
    level1 = new Level(
        createEnemies(),
        [new Cloud(10), new Cloud(1500)],
        Array.from({ length: 5 }, () => new Coins()),
        Array.from({ length: 10 }, () => new Bottles()),
        createBackgroundObjects()
    );
}

/**
 * Creates the enemies of the level: three small and three normal chickens.
 * @returns {Chicken[]} The enemies.
 */
function createEnemies() {
    return [
        ...Array.from({ length: 3 }, () => new ChickenSmall()),
        ...Array.from({ length: 3 }, () => new Chicken())
    ];
}

/**
 * Creates the layered background objects for the positions -2 to 3.
 * @returns {BackgroundObject[]} The background objects in draw order.
 */
function createBackgroundObjects() {
    const objects = [];
    for (let i = -2; i <= 3; i++) {
        objects.push(...createBackgroundSet(i));
    }
    return objects;
}

/**
 * Creates the four background layers for one position.
 * The image number alternates between 1 and 2 depending on the position.
 * @param {number} position - Position index, multiplied by 719 to get the x value.
 * @returns {BackgroundObject[]} The layers of this position (air first, first layer last).
 */
function createBackgroundSet(position) {
    const x = 719 * position;
    const n = Math.abs(position) % 2 === 0 ? 1 : 2;
    const base = 'img/5_background/layers/';
    return [
        new BackgroundObject(`${base}air.png`, x),
        new BackgroundObject(`${base}3_third_layer/${n}.png`, x),
        new BackgroundObject(`${base}2_second_layer/${n}.png`, x),
        new BackgroundObject(`${base}1_first_layer/${n}.png`, x)
    ];
}