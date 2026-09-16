let canvas;
let ctx;
let world;
let keyboard;

function initGame() {
    if (world) world.destroy();
    keyboard = new Keyboard();
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext("2d");    
}