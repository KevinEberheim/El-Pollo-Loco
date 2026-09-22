class SoundManager {
    static muted = localStorage.getItem('muted') === 'true';
    static sounds = [];

    static create(src, volume = 1, loop = false) {
        const audio = new Audio(src);
        audio.volume = volume;
        audio.loop = loop;
        audio.muted = SoundManager.muted;
        SoundManager.sounds.push(audio);
        return audio;
    }

    static play(audio) {
        audio.currentTime = 0;
        audio.play();
    }

    static stop(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    static toggle() {
        SoundManager.muted = !SoundManager.muted;
        localStorage.setItem('muted', SoundManager.muted);
        SoundManager.sounds.forEach(s => s.muted = SoundManager.muted);
        SoundManager.updateButton();
    }

    static updateButton() {
        document.getElementById('btnMute').textContent = SoundManager.muted ? 'unmute' : 'mute';
    }
}