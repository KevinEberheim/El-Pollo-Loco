class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    UP = false;
    DOWN = false;
    D = false;

    static KEY_MAP = {
        ArrowRight: 'RIGHT',
        ArrowLeft: 'LEFT',
        ' ': 'SPACE',
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        d: 'D'
    };

    static BUTTON_MAP = {
        btnLeft: 'LEFT',
        btnRight: 'RIGHT',
        btnJump: 'UP',
        btnThrow: 'D'
    };

    /**
     * Creates the keyboard handler and registers keyboard and touch events.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }

    /**
     * Registers a touch listener pair for every on-screen control button.
     */
    bindBtsPressEvents() {
        Object.entries(Keyboard.BUTTON_MAP).forEach(([id, name]) => this.bindButton(id, name));
    }

    /**
     * Sets the given input state to true on touchstart and to false on touchend.
     * @param {string} id - Element ID of the button.
     * @param {string} name - Name of the input property (e.g. "LEFT").
     */
    bindButton(id, name) {
        const button = document.getElementById(id);
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this[name] = true;
        });
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            this[name] = false;
        });
    }

    /**
     * Registers the global keydown and keyup listeners.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => this.setKey(e.key, true));
        window.addEventListener('keyup', (e) => this.setKey(e.key, false));
    }

    /**
     * Sets the input property mapped to the given key, ignores unmapped keys.
     * @param {string} key - The value of KeyboardEvent.key.
     * @param {boolean} state - True if the key is pressed, false if released.
     */
    setKey(key, state) {
        const name = Keyboard.KEY_MAP[key];
        if (name) this[name] = state;
    }

    /**
     * Resets all input states to false.
     */
    reset() {
        this.LEFT = this.RIGHT = this.SPACE = this.UP = this.DOWN = this.D = false;
    }
}