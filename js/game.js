let canvas;
let world;
let keyboard;

/**
 * Starts a new game session: resets the pause state, destroys the old world,
 * creates the keyboard once, loads the level and creates a new world.
 * @returns {void}
 */
function initGame() {
    isPaused = false;
    DrawableObject.paused = false;
    if (world) world.destroy();
    if (!keyboard) keyboard = new Keyboard();
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}