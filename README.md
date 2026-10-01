# El Pollo Loco

A 2D browser jump-and-run game built with vanilla JavaScript and the HTML5 Canvas API. You play Pepe, a Mexican hero who has to collect coins, defeat chickens, and finally beat the Endboss with salsa bottles.

No frameworks, no build step, no external dependencies.

## Table of Contents

- [Features](#features)
- [Gameplay](#gameplay)
- [Controls](#controls)
- [Game Rules in Detail](#game-rules-in-detail)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Code Conventions](#code-conventions)
- [Browser and Device Support](#browser-and-device-support)
- [Known Issues](#known-issues)
- [Credits and Legal](#credits-and-legal)

## Features

- Side-scrolling level with a parallax background and a camera that follows the character
- Animated character states: idle, long idle, walking, jumping, hurt, dead
- Three enemy types: normal chicken, small chicken, Endboss (walk, alert, attack, hurt, dead)
- Collectible coins and salsa bottles with status bars
- Throwable bottles with rotation and splash animation
- Endboss that spawns after all coins are collected, with its own health bar and music
- Pause, restart, help screen, mute, and fullscreen
- Mute state is persisted in `localStorage`
- Touch controls for mobile devices, plus a rotate-to-landscape hint in portrait mode
- Automatic pause when the device is rotated to portrait
- End screen with win/lose image, replay and home buttons
- Legal notice page (`impressum.html`)

## Gameplay

1. Press the play button on the start screen.
2. Run through the level, collect all 5 coins, and pick up salsa bottles.
3. Avoid or defeat the chickens.
4. Once the last coin is collected, the Endboss spawns and the boss music starts.
5. Defeat the Endboss to win. If Pepe's health reaches zero, you lose.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move left / right | Arrow Left / Arrow Right | On-screen left / right buttons |
| Jump | Space or Arrow Up | On-screen jump button |
| Throw bottle | D | On-screen throw button |

HUD buttons (top left): play/replay, pause, help, mute, fullscreen.

Touch controls are only displayed on devices with a coarse pointer (`@media (pointer: coarse)`).

## Game Rules in Detail

**Character**
- Starts with 100 health. Each enemy hit costs 20 health (5 hits to die).
- After a hit, the character is invulnerable for 1 second.
- Jumping on an enemy from above kills it and bounces the character slightly upward.

**Enemies**
- 3 small chickens and 3 normal chickens, placed randomly with random speeds.
- Normal chickens: defeated by stomping or by a thrown bottle.
- Small chickens: can only be defeated by stomping.
- Endboss: spawns at x = 2500 once all coins are collected. It walks toward the character, plays an alert animation when close, then attacks.

**Endboss**
- 100 health, each bottle hit costs 20 (5 hits to kill).
- After a hit, it has a 1-second hurt cooldown during which further hits are ignored.
- Its health is shown in a separate status bar.

**Collectibles**
- 5 coins, 10 bottles, randomly placed.
- Coins and bottles each have a status bar in 20 % steps.
- Bottle throws have a 1-second cooldown. Bottles can be thrown to the left or right depending on the facing direction.

**Pause**
- Pausing stops all game intervals (via `DrawableObject.paused`), pauses all sounds, and resets keyboard input.
- Resuming in portrait mode on a touch device is blocked.

## Getting Started

### Prerequisites

A modern browser. A local web server is recommended so images and audio load reliably.

### Run locally

1. Clone or download the repository.
2. Serve the project root with any static web server, for example:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

Alternatively, open `index.html` directly in the browser. Behavior may vary depending on the browser's handling of local files.

## Project Structure

Paths as referenced by `index.html`:

```
.
├── index.html                 Main page (game, HUD, end screen, help screen)
├── impressum.html             Legal notice
├── script.js                  UI logic: pause, music, fullscreen, help, start/restart
├── style.css                  Global styles
├── js/
│   └── game.js                Game session setup (initGame)
├── levels/
│   └── level1.js              Level creation (initLevel and helpers)
├── models/
│   ├── drawable-object.class.js
│   ├── movable-object.class.js
│   ├── character.class.js
│   ├── chicken.class.js
│   ├── chickenSmall.class.js
│   ├── enboss.class.js
│   ├── cloud.class.js
│   ├── coin.class.js
│   ├── bottle.class.js
│   ├── throwable-object.class.js
│   ├── background-object.class.js
│   ├── status-bar.class.js
│   ├── level.class.js
│   ├── world.class.js
│   ├── keyboard.class.js
│   └── soundManager.class.js
├── styles/
│   ├── assets.css             Game wrapper, HUD, buttons, touch controls
│   ├── endscreen.css
│   ├── helpscreen.css
│   └── impressum.css
├── img/                       Sprites, backgrounds, status bars, icons, screens
└── audio/                     Music and sound effects
```

Script load order in `index.html` matters: base classes (`SoundManager`, `DrawableObject`, `MovableObject`) are loaded before the classes that extend them.

## Architecture

### Class hierarchy

```
DrawableObject
├── MovableObject
│   ├── Character
│   ├── Chicken
│   │   └── ChickenSmall
│   ├── Endboss
│   ├── Cloud
│   ├── Bottles               (collectible on the ground)
│   ├── ThrowableObject       (thrown bottle)
│   └── BackgroundObject
├── Coins
└── StatusBar
```

Standalone classes: `World`, `Level`, `Keyboard`, `SoundManager`.

### Responsibilities

| Class | Responsibility |
|---|---|
| `DrawableObject` | Image loading and caching, drawing, collision offset, pause-aware interval registration (`addInterval`) |
| `MovableObject` | Movement, gravity, collision detection, hit/energy handling, animation helpers |
| `Character` | Player animations, movement loop, jumping, sounds |
| `Chicken` / `ChickenSmall` | Enemy movement, walk animation, death handling |
| `Endboss` | Walk, alert, attack, hurt and death states with distance-based behavior |
| `ThrowableObject` | Flight, hit detection (boss and normal chickens), splash and removal |
| `StatusBar` | Maps a percentage to one of six images in 20 % steps |
| `Level` | Container for enemies, clouds, coins, bottles, and background layers |
| `World` | Game loop, rendering with camera, collision checks, collecting, endboss spawn, game over |
| `Keyboard` | Keyboard and touch input state |
| `SoundManager` | Cached audio, mute with persistence, pause/resume of all sounds |

### Game loop

- Rendering: `requestAnimationFrame` in `World.draw()`.
- Game logic: intervals registered through `addWorldInterval` and `addInterval`, all of which are skipped while `DrawableObject.paused` is `true`.
  - Collisions, collecting, endboss status, game over check: 60 times per second
  - Throw check: 20 times per second
  - Gravity: 25 times per second
- On game over, `World.destroy()` stops rendering and clears all intervals to prevent leaks across restarts.

### Input

`Keyboard` maps `KeyboardEvent.key` values and touch events on the on-screen buttons to boolean flags (`LEFT`, `RIGHT`, `SPACE`, `UP`, `DOWN`, `D`). The keyboard instance is created once and shared between worlds.

## Code Conventions

- Every JavaScript function has a maximum length of 14 lines. This includes the signature, closing brace, and blank lines.
- Every function is documented in English using JSDoc.
- Plain JavaScript classes, no modules, no bundler.

## Browser and Device Support

- Desktop browsers with Canvas, Web Audio/HTMLAudioElement, and `localStorage` support.
- Fullscreen uses vendor-prefixed fallbacks for WebKit and MS.
- Mobile: landscape orientation required. Portrait mode shows a rotate hint and pauses the game.
- Layout is scaled via CSS for viewports up to 720 px wide or 480 px high.

Tested browsers and devices are not documented yet.

## Known Issues

- The help screen states that the Endboss must be defeated with bottles. In the current code, `World.checkEnemyCollisions()` applies the stomp check to all enemies, including the Endboss, and calls `kill()` on it. Stomping the Endboss therefore kills it instantly, bypassing its health.
- `ThrowableObject.findHitChicken()` only matches `Chicken` exactly (`e.constructor === Chicken`), which is intentional so that small chickens and the boss are excluded.
- `Endboss` declares several class fields twice (`isDead`, `isAlerting`, `hasAlerted`, `energy`, intervals, sounds). This is harmless but redundant.
- The debug collision frame (`drawFrame`) is disabled (commented out in `World.addToMap`) and only supports `Character` and `ChickenSmall`.

## Credits and Legal

- Code: Kevin Eberheim
- Graphics and audio: source to be specified (the legal notice currently contains a placeholder: "[Quelle / Developer Akademie]").
- The legal notice is available in `impressum.html` (German).
- License: not specified.