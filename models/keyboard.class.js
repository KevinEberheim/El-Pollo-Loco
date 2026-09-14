class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    UP = false;
    DOWN = false;
    D = false;

    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }

    bindBtsPressEvents(){
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });

        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }


    bindKeyPressEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowRight") {
                this.RIGHT = true;
            }
            if (e.key == "ArrowLeft") {
                this.LEFT = true;
            }
            if (e.key == " ") {
                this.SPACE = true;
            }
            if (e.key == "ArrowUp") {
                this.UP = true;
            }
            if (e.key == "ArrowDown") {
                this.DOWN = true;
            }
            if (e.key == "d") {
                this.D = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowRight") {
                this.RIGHT = false;
            }
            if (e.key == "ArrowLeft") {
                this.LEFT = false;
            }
            if (e.key == " ") {
                this.SPACE = false;
            }
            if (e.key == "ArrowUp") {
                this.UP = false;
            }
            if (e.key == "ArrowDown") {
                this.DOWN = false;
            }
            if (e.key == "d") {
                this.D = false;
            }
        });
    }

}