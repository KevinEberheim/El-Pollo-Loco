let canvas;
let ctx;
let world;
let keyboard;

function init() {
    keyboard = new Keyboard();
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext("2d");    
}