let canvas;
let ctx;
let world;
let keyboard;

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