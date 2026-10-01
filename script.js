const startScreenMusic = SoundManager.create('audio/startScreen.mp3', 0.1, true);
const gameStartMusic = SoundManager.create('audio/gameStart.mp3', 0.1, true);
const endbossMusic = SoundManager.create('audio/endbossArrived.mp3', 0.1, true);
let isPaused = false;
const portraitQuery = window.matchMedia('(orientation: portrait) and (pointer: coarse)');

/**
 * Pauses or resumes the game, including sounds and keyboard input.
 * Does nothing without a running world, after game over, or when resuming in portrait mode.
 * @param {boolean} state - True to pause, false to resume.
 */
function setPaused(state) {
    if (!world || world.gameOver) return;
    if (!state && portraitQuery.matches) return;
    isPaused = state;
    DrawableObject.paused = state;
    if (state) {
        SoundManager.pauseAll();
        keyboard.reset();
    } else {
        SoundManager.resumeAll();
    }
    setPlayIcon(state);
}

/**
 * Toggles the pause state and removes focus from the pause button.
 */
function togglePause() {
    setPaused(!isPaused);
    document.getElementById('btnPause').blur();
}

/**
 * Resumes the game if it is paused, otherwise starts (or restarts) it.
 */
function onPlayClick() {
    if (isPaused) {
        setPaused(false);
        document.getElementById('btnPlay').blur();
    } else {
        init();
    }
}

/**
 * Stops all background music tracks and plays the given one.
 * @param {HTMLAudioElement} track - The music track to play.
 */
function playMusic(track) {
    [startScreenMusic, gameStartMusic, endbossMusic].forEach(SoundManager.stop);
    SoundManager.play(track);
}

/**
 * Switches from the start screen to the game and starts a new session.
 */
function init() {
    document.getElementById('impressumLink').classList.add('dp-none');
    document.getElementById('hud').style.backgroundImage = 'none';
    document.getElementById('canvas').classList.remove('dp-none');
    document.getElementById('btnPlay').blur();
    playMusic(gameStartMusic);
    setPlayIcon(false);
    setGameRunning(true);
    initGame();
}

/**
 * Checks whether the document is currently in fullscreen mode (with vendor prefixes).
 * @returns {boolean} True if an element is displayed in fullscreen.
 */
function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

/**
 * Enters or exits fullscreen mode.
 * @param {string} id - ID of the element that should go fullscreen.
 */
function toggleFullscreen(id) {
    if (isFullscreen()) {
        exitFullscreen();
    } else {
        enterFullscreen(document.getElementById(id));
    }
    document.getElementById('btnFullscreen').blur();
}

/**
 * Requests fullscreen for the element, using vendor prefixes as fallback.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
    const request = element.requestFullscreen
        || element.webkitRequestFullscreen
        || element.msRequestFullscreen;
    if (request) request.call(element);
}

/**
 * Exits fullscreen mode, using vendor prefixes as fallback.
 */
function exitFullscreen() {
    const exit = document.exitFullscreen
        || document.webkitExitFullscreen
        || document.msExitFullscreen;
    if (exit) exit.call(document);
}

/**
 * Updates the fullscreen button icon according to the current fullscreen state.
 */
function updateFullscreenIcon() {
    document.getElementById('btnFullscreenImg').src = isFullscreen()
        ? 'img/assets/fullscreen_exit.svg'
        : 'img/assets/fullscreen_open.svg';
}

/**
 * Hides the end screen and starts a new game.
 */
function restartGame() {
    document.getElementById('endscreen').close();
    playMusic(gameStartMusic);
    initGame();
}

/**
 * Hides the end screen and the canvas and shows the start screen again.
 */
function goToStartScreen() {
    document.getElementById('endscreen').close();
    document.getElementById('canvas').classList.add('dp-none');
    document.getElementById('impressumLink').classList.remove('dp-none');
    document.getElementById('hud').style.backgroundImage = "url('img/9_intro_outro_screens/start/startscreen_1.png')";
    setPlayIcon(true);
    setGameRunning(false);
    playMusic(startScreenMusic);
}

/**
 * Toggles the sound on or off and removes focus from the mute button.
 */
function switchSoundOnOff() {
    SoundManager.toggle();
    document.getElementById('btnMute').blur();
}

/**
 * Shows or hides the help screen.
 */
function toggleHelp() {
    const help = document.getElementById('helpscreen');
    if (help.open) help.close();
    else openDialog('helpscreen');
    document.getElementById('btnHelp').blur();
}

/**
 * Sets the icon of the play button.
 * @param {boolean} isHome - True for the play icon (start screen), false for the replay icon.
 */
function setPlayIcon(isHome) {
    document.getElementById('btnPlayImg').src = isHome
        ? 'img/assets/play.svg'
        : 'img/assets/replay.svg';
}

/**
 * Registers global listeners (fullscreen changes, orientation changes)
 * and sets the initial mute button icon.
 */
function bindGlobalEvents() {
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    portraitQuery.addEventListener('change', (e) => {
        if (e.matches) setPaused(true);
    });
    SoundManager.updateButton();
    disableTouchContextMenu();
}

/**
 * Opens a dialog without making it modal and removes the automatic focus.
 * @param {string} id - ID of the dialog element.
 */
function openDialog(id) {
    document.getElementById(id).show();
    document.activeElement.blur();
}

/**
 * Shows or hides the pause button and the touch controls.
 * @param {boolean} running - True while a game is running, false on the start screen.
 */
function setGameRunning(running) {
    document.getElementById('btnPause').classList.toggle('dp-none', !running);
    document.getElementById('touchControls').classList.toggle('dp-none', !running);
}

/**
 * Blocks the context menu on touch devices (long press), keeps it on desktop.
 */
function disableTouchContextMenu() {
    document.addEventListener('contextmenu', (e) => {
        if (window.matchMedia('(pointer: coarse)').matches) e.preventDefault();
    });
}