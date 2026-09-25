const startScreenMusic = SoundManager.create('audio/startScreen.mp3', 0.1, true);
const gameStartMusic = SoundManager.create('audio/gameStart.mp3', 0.1, true);
const endbossMusic = SoundManager.create('audio/endbossArrived.mp3', 0.1, true);

function playMusic(track) {
    [startScreenMusic, gameStartMusic, endbossMusic].forEach(SoundManager.stop);
    SoundManager.play(track);
}

function init() {
    document.getElementById('hud').style.backgroundImage = 'none';
    document.getElementById('canvas').classList.remove('dp-none');
    document.getElementById('btnPlay').blur();
    playMusic(gameStartMusic);
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
    playMusic(gameStartMusic);
    initGame();
}

function goToStartScreen() {
    document.getElementById('endscreen').classList.add('dp-none');
    document.getElementById('canvas').classList.add('dp-none');
    document.getElementById('hud').style.backgroundImage = "url('img/9_intro_outro_screens/start/startscreen_1.png')";
    playMusic(startScreenMusic)
}

function switchSoundOnOff() {
    SoundManager.toggle();
    document.getElementById('btnMute').blur();
    SoundManager.updateButton();
}

function toggleHelp() {
    document.getElementById('helpscreen').classList.toggle('dp-none');
    document.getElementById('btnHelp').blur();
}