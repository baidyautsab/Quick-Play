# Tic-Tac-Toe Game

A classic Tic-Tac-Toe game implementation built with vanilla HTML5, CSS3, and JavaScript. Play the timeless strategy game where two players take turns marking spaces in a 3×3 grid to achieve three in a row!

## 🎮 Game Overview

Tic-Tac-Toe (also known as Noughts and Crosses) is a paper-and-pencil game for two players who take turns marking the spaces in a three-by-three grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.

### How to Play

1. **Two Player Game:** Player X always goes first, followed by Player O
2. **Make Your Move:** Click on any empty cell in the 3×3 grid
3. **Winning Conditions:** Get three of your symbols in a row:
   - **Horizontally:** Three across any row
   - **Vertically:** Three down any column  
   - **Diagonally:** Three across either diagonal line
4. **Game End:** Game ends when someone wins or all 9 cells are filled (draw)
5. **Start Over:** Click "Reset Game" to play again

### Core Technologies
- **HTML5:** Semantic structure with data attributes
- **CSS3:** Modern styling with grid layout and responsive design
- **Vanilla JavaScript:** Pure JavaScript without frameworks or libraries
- **DOM Manipulation:** Real-time updates and event handling

### Game Architecture

#### Data Structure
```javascript
// Game state represented as a 9-element array
gameBoard = ['', '', '', '', '', '', '', '', '']
// Maps to grid positions:
// [0][1][2]
// [3][4][5] 
// [6][7][8]
```

#### Core Components

**Game State Management:**
- `currentPlayer`: Tracks active player ('X' or 'O')
- `gameBoard`: Array representing the 3×3 grid state
- `gameActive`: Boolean flag controlling game flow

**Win Detection Algorithm:**
- Static array of all 8 possible winning combinations
- Uses `Array.some()` and `Array.every()` for efficient checking
- Checks after each move for immediate win detection

**Event Handling:**
- Click listeners on all grid cells
- Data attribute mapping for position identification
- Move validation before processing

## 🎯 Game Logic Details

### Winning Combinations
The game recognizes 8 possible winning patterns:

| Type | Combinations | Grid Positions |
|------|-------------|----------------|
| **Rows** | 3 horizontal lines | [0,1,2], [3,4,5], [6,7,8] |
| **Columns** | 3 vertical lines | [0,3,6], [1,4,7], [2,5,8] |
| **Diagonals** | 2 diagonal lines | [0,4,8], [2,4,6] |

### Game Flow
1. **Initialization:** Player X starts, empty board, game active
2. **Move Validation:** Check if cell is empty and game is active
3. **Move Execution:** Update board state and display
4. **Win Check:** Evaluate if current move creates winning pattern
5. **Draw Check:** Verify if board is full without winner
6. **Turn Switch:** Alternate between X and O players
7. **Game End:** Display result and disable further moves

### Move Validation Rules
- Cell must be empty (contains empty string)
- Game must be active (not ended)
- Only one move per cell allowed
- No moves allowed after game ends

## 🎨 Design Features

- **Grid Layout:** CSS Grid for perfect 3×3 alignment
- **Interactive Cells:** Hover effects and click feedback
- **Status Display:** Real-time turn and result notifications
- **Responsive Design:** Adapts to different screen sizes
- **Clean Typography:** Clear, readable fonts and spacing
- **Professional Styling:** Modern color scheme and layout

### Quick Start
1. **Download** or clone the project files
2. **Maintain file structure:**
   ```
   Tic Tac Toe/
   ├── tic-tac-toe.html
   ├── tic-tac-toe.css
   └── tic-tac-toe.js
   ```
3. **Open `index.html`** in your web browser
4. **Start playing** immediately!

## 🎮 Controls & Interface

| Action | Method | Description |
|--------|--------|-------------|
| **Make Move** | Mouse Click | Click any empty cell to place your symbol |
| **Reset Game** | Button Click | Start a new game anytime |
| **View Status** | Visual Display | Current player turn or game result |

## 📱 Compatibility

**Desktop Browsers:**
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## 🏆 Game Strategy Tips

### For Beginners:
- **Center Control:** The center square (position 4) is most valuable
- **Corner Strategy:** Corners offer more winning opportunities than edges
- **Block Opponent:** Always block when opponent has two in a row

### Advanced Strategy:
- **Fork Creation:** Set up multiple winning opportunities
- **Forced Win:** Create situations where opponent cannot prevent your win
- **Opening Patterns:** Learn optimal first-move strategies

## 🧪 Testing Scenarios

**Win Conditions:**
- Horizontal wins: [0,1,2], [3,4,5], [6,7,8]
- Vertical wins: [0,3,6], [1,4,7], [2,5,8]
- Diagonal wins: [0,4,8], [2,4,6]

**Edge Cases:**
- Draw game (all cells filled, no winner)
- Clicking occupied cells (should be ignored)
- Rapid clicking (should maintain turn order)
- Reset during active game

## 🐛 Troubleshooting

**Common Issues:**

**Game doesn't respond to clicks:**
- Ensure JavaScript is enabled in browser
- Check browser console for errors
- Verify all files are in same directory

**Visual display problems:**
- Confirm CSS file is loading properly
- Check for conflicting styles
- Verify HTML structure is intact

**Reset button not working:**
- Ensure `resetGame()` function is accessible globally
- Check for JavaScript errors in console

## 👨‍💻 Developer

**Designed by Utsab Baidya, 2025**

A demonstration of clean, efficient web development using vanilla JavaScript, HTML5, and CSS3.

---

### 🎯 Quick Reference

**Game Rules:** 3 in a row wins | **Players:** 2 (X and O) | **Grid:** 3×3
**Controls:** Click to play | **Reset:** Button to restart | **Status:** Live updates

**Ready to Play? Open `index.html` and start your first game! 🎮**