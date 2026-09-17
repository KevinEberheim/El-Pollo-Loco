function init() {
    document.getElementById('hud').style.backgroundImage = 'none';
    document.getElementById('canvas').classList.remove('dp-none');
    document.getElementById('btnPlay').blur();
    initGame();
}

function toggleFullscreen(id) {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen(document.getElementById(id));
    }
    document.getElementById('btnFullscreen').blur();
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function restartGame() {
    document.getElementById('endscreen').classList.add('dp-none');
    initGame();
}

function goToStartScreen() {
    document.getElementById('endscreen').classList.add('dp-none');
    document.getElementById('canvas').classList.add('dp-none');
    document.getElementById('hud').style.backgroundImage = "url('img/9_intro_outro_screens/start/startscreen_1.png')";
}