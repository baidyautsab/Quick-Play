# Snake Game

A classic Snake game implementation built with HTML5 Canvas, CSS, and JavaScript. Features smooth animations powered by GSAP and responsive design for both desktop and mobile devices.

![Snake Game](https://img.shields.io/badge/Game-Snake-green) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow) ![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange) ![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue)

## Features

- **Classic Snake Gameplay**: Navigate the snake to eat food and grow longer
- **Smooth Animations**: Powered by GSAP for fluid visual effects
- **Progressive Difficulty**: Game speed increases as your score gets higher
- **High Score Tracking**: Persistent high score storage using localStorage
- **Responsive Design**: Works on both desktop and mobile devices
- **Mobile Controls**: Touch-friendly directional buttons for mobile play
- **Visual Feedback**: Score animations and game over effects

## How to Play

### Desktop Controls
- Use **Arrow Keys** to control the snake's direction:
  - ↑ Arrow: Move Up
  - ↓ Arrow: Move Down
  - ← Arrow: Move Left
  - → Arrow: Move Right

### Game Rules
1. Guide the snake to eat the red food circles
2. Each food eaten increases your score by 10 points
3. The snake grows longer with each food consumed
4. Game speed increases progressively as you score more points
5. Avoid hitting the walls or the snake's own body
6. Try to beat your high score!

## Installation & Setup

1. **Clone or Download** the project files
2. Ensure you have the following files in your project directory:
   ```
   ├── snake.html
   ├── snake.css
   ├── snake.js
   └── README.md
   ```
3. **Open** `index.html` in a web browser
4. **Click** "Start Game" to begin playing

## File Structure

```
Snake/
│
├── snake.html          # Main HTML file with game structure
├── snake.css           # Stylesheet for game appearance (not included)
├── snake.js            # Main game logic and functionality
└── README.md           # This documentation file
```

## Technical Details

### Technologies Used
- **HTML5 Canvas**: For game rendering and graphics
- **JavaScript (ES6)**: Core game logic and functionality
- **CSS3**: Styling and responsive design
- **GSAP 3.12.5**: Animation library for smooth visual effects

### Game Architecture

The game is built using an object-oriented approach with a single `SnakeGame` class that handles:

- **Game State Management**: Snake position, food generation, scoring
- **Input Handling**: Keyboard and touch controls
- **Collision Detection**: Wall and self-collision detection
- **Rendering**: Canvas drawing and animations
- **Game Loop**: Continuous update and draw cycles

### Key Features Implementation

#### Grid-Based Movement
- 20x20 grid system (400px canvas with 20px grid cells)
- Snake and food positions stored as grid coordinates
- Smooth pixel-perfect movement

#### Speed Progression
- Initial speed: 150ms per frame (~6.7 FPS)
- Speed increases by 5ms every time food is eaten
- Minimum speed cap: 50ms per frame (~20 FPS)

#### Collision System
- **Wall Collision**: Detects when snake head goes beyond canvas boundaries
- **Self Collision**: Prevents snake from colliding with its own body segments
- **Food Collision**: Triggers scoring and snake growth

## Browser Compatibility

- **Chrome**: ✅ Fully supported
- **Firefox**: ✅ Fully supported
- **Safari**: ✅ Fully supported
- **Edge**: ✅ Fully supported

## Performance Notes

- Game runs at variable frame rates (6.7 FPS to 20 FPS)
- GSAP animations are GPU-accelerated for smooth performance
- Lightweight implementation suitable for all modern devices

## Credits

**Designed by Utsab Baidya, 2025**

### Dependencies
- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) - Animation library

Enjoy playing Snake! 🐍