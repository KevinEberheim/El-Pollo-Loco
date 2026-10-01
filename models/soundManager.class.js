class SoundManager {
    static muted = localStorage.getItem('muted') === 'true';
    static sounds = new Map();

    /**
     * Returns a cached Audio object for the given source or creates it on first use.
     * @param {string} src - Path to the audio file.
     * @param {number} [volume=1] - Volume between 0 and 1.
     * @param {boolean} [loop=false] - Whether the audio loops.
     * @returns {HTMLAudioElement} The shared audio element for this source.
     */
    static create(src, volume = 1, loop = false) {
        let audio = SoundManager.sounds.get(src);
        if (!audio) {
            audio = new Audio(src);
            SoundManager.sounds.set(src, audio);
        }
        audio.volume = volume;
        audio.loop = loop;
        audio.muted = SoundManager.muted;
        return audio;
    }

    /**
     * Plays the given audio from the beginning.
     * @param {HTMLAudioElement} audio - The audio to play.
     */
    static play(audio) {
        audio.currentTime = 0;
        audio.play();
    }

    /**
     * Stops the given audio and resets it to the beginning.
     * @param {HTMLAudioElement} audio - The audio to stop.
     */
    static stop(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    /**
     * Toggles the mute state, saves it in localStorage and updates all sounds and the button.
     */
    static toggle() {
        SoundManager.muted = !SoundManager.muted;
        localStorage.setItem('muted', SoundManager.muted);
        SoundManager.sounds.forEach(s => s.muted = SoundManager.muted);
        SoundManager.updateButton();
    }

    /**
     * Updates the mute button icon according to the mute state.
     */
    static updateButton() {
        document.getElementById('btnMuteImg').src = SoundManager.muted
            ? 'img/assets/no_sound.svg'
            : 'img/assets/volume.svg';
    }

    /**
     * Pauses all playing sounds and remembers which ones were playing.
     */
    static pauseAll() {
        SoundManager.sounds.forEach(s => {
            s.wasPlaying = !s.paused;
            if (!s.paused) s.pause();
        });
    }

    /**
     * Resumes all sounds that were playing before pauseAll() was called.
     */
    static resumeAll() {
        SoundManager.sounds.forEach(s => {
            if (s.wasPlaying) s.play();
            s.wasPlaying = false;
        });
    }
}