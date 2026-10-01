let canvas;
let ctx;
let world;
let keyboard;

/**
 * Initializes the game state and starts a new game session.
 *
 * This function resets the pause state, clears any existing world instance,
 * ensures the keyboard input handler is created once, loads the level data,
 * creates a new canvas-based game world, and prepares the 2D rendering context.
 *
 * @returns {void}
 *
 * @example
 * initGame();
 */
function initGame() {
    isPaused = false;
    DrawableObject.paused = false;
    if (world) world.destroy();
    if (!keyboard) keyboard = new Keyboard();
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext("2d");
}