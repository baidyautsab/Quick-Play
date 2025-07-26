# 2048 Game

A classic 2048 puzzle game implementation built with vanilla JavaScript, HTML5, and CSS3. Slide numbered tiles on a grid to combine them and create a tile with the number 2048!

## 🎮 Game Overview

2048 is a single-player sliding block puzzle game where the objective is to slide numbered tiles on a grid to combine them and create a tile with the number 2048. The game continues beyond 2048 to achieve higher scores.

### How to Play

1. **Use arrow keys** to move tiles in four directions:
   - ← Left Arrow: Move tiles left
   - → Right Arrow: Move tiles right  
   - ↑ Up Arrow: Move tiles up
   - ↓ Down Arrow: Move tiles down

2. **Tile Movement Rules:**
   - All tiles slide as far as possible in the chosen direction
   - When two tiles with the same number touch, they merge into one
   - After each move, a new tile (2 or 4) appears in a random empty spot

3. **Winning & Losing:**
   - **Win:** Create a tile with the number 2048
   - **Lose:** No more moves possible (grid full with no possible merges)
   - Continue playing after winning to achieve higher scores!

## 🚀 Features

- **Smooth Gameplay:** Responsive controls with arrow keys
- **Score Tracking:** Current score and best score persistence
- **New Game Function:** Restart anytime with the "New Game" button
- **Responsive Design:** Clean, modern interface
- **Local Storage:** Best score saved between sessions
- **Game Over Detection:** Automatic detection when no moves are possible

## 🛠️ Technical Implementation

### File Structure
```
2048-game/
├── 2048.html          # Main HTML structure
├── 2048.css           # Styling and animations
├── 2048.js            # Game logic and mechanics
└── README.md          # This documentation
```

### Core Technologies
- **HTML5:** Semantic structure and accessibility
- **CSS3:** Modern styling, animations, and responsive design
- **Vanilla JavaScript:** Pure JavaScript without frameworks
- **Local Storage API:** Best score persistence

### Key Components

#### Game Class (`Game2048`)
- **Grid Management:** 4×4 array representing the game board
- **Movement Logic:** Four directional movement algorithms
- **Tile Merging:** Adjacent identical tiles combination
- **Score Calculation:** Points awarded for each merge
- **Game State:** New game setup and game over detection

#### Core Methods
- `moveLeft()`, `moveRight()`, `moveUp()`, `moveDown()`: Directional movement
- `addNewTile()`: Spawns new tiles (90% chance of 2, 10% chance of 4)
- `updateDisplay()`: DOM manipulation for visual updates
- `isGameOver()`: Checks for available moves
- `setupNewGame()`: Initializes fresh game state

## 🎯 Game Mechanics

### Tile Movement Algorithm
1. **Compression:** Remove empty spaces by filtering zeros
2. **Merging:** Combine adjacent identical tiles from movement direction
3. **Scoring:** Add merged tile value to current score
4. **Padding:** Fill remaining spaces with zeros
5. **Validation:** Only proceed if grid state changed

### Scoring System
- Points awarded equal to the value of merged tiles
- Example: Merging two 4s gives 8 points and creates an 8 tile
- Best score automatically saved and persists between sessions

### Probability System
- New tiles spawn with weighted probability:
  - 90% chance: Value of 2
  - 10% chance: Value of 4

## 🎨 Design Features

- **Modern UI:** Clean, minimalist design
- **Background Typography:** Large "2048" text for branding
- **Color-Coded Tiles:** Different colors for each tile value
- **Responsive Layout:** Adapts to different screen sizes
- **Smooth Animations:** CSS transitions for tile movements
- **Score Display:** Prominent current and best score tracking

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No additional dependencies or installations required

### Installation & Setup
1. **Clone or download** the project files
2. **Ensure file structure** is maintained:
   ```
   2048/
   ├── 2048.html
   ├── 2048.css
   └── 2048.js
   ```
3. **Open `index.html`** in your web browser
4. **Start playing** immediately!

## 🎮 Controls Reference

| Key | Action |
|-----|--------|
| ← | Move tiles left |
| → | Move tiles right |
| ↑ | Move tiles up |
| ↓ | Move tiles down |
| Mouse Click | New Game button |

## 📱 Browser Compatibility

- **Chrome:** Full support
- **Firefox:** Full support  
- **Safari:** Full support
- **Edge:** Full support
- **Mobile Browsers:** Responsive design supports touch devices

## 🏆 Achievement Targets

- **Beginner:** Reach 256
- **Intermediate:** Reach 512  
- **Advanced:** Reach 1024
- **Expert:** Reach 2048
- **Master:** Continue beyond 2048!

## 🐛 Known Issues & Solutions

**Issue:** Game doesn't respond to arrow keys
- **Solution:** Click on the game area to focus, then use arrow keys

**Issue:** Best score not saving
- **Solution:** Ensure browser allows localStorage, check privacy settings

**Issue:** Tiles not displaying correctly
- **Solution:** Verify CSS file is loading properly

## 👨‍💻 Developer

**Designed by Utsab Baidya, 2025**

---

### 🎯 Quick Start Summary

1. Open `index.html` in browser
2. Use arrow keys to move tiles
3. Combine matching numbers
4. Reach 2048 to win
5. Click "New Game" to restart

**Happy Gaming! 🎮**