class Game2048 {
    constructor() {
        // Initialize 4x4 grid with all zeros (empty cells)
        this.grid = Array(4).fill().map(() => Array(4).fill(0));
        
        // Track current score and retrieve best score from localStorage
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
        
        // Set up initial game state and event handlers
        this.setupNewGame();
        this.setupEventListeners();
    }

    setupNewGame() {
        // Reset grid to empty state (all zeros)
        this.grid = Array(4).fill().map(() => Array(4).fill(0));
        
        // Reset current score to zero
        this.score = 0;
        
        // Add two initial tiles (typically 2s) to random empty positions
        this.addNewTile();
        this.addNewTile();
        
        // Refresh the visual display to show initial state
        this.updateDisplay();
    }

    setupEventListeners() {
        // Listen for arrow key presses for tile movement
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        
        // Add click handler for new game button to restart
        document.getElementById('new-game').addEventListener('click', () => {
            this.setupNewGame();
        });
    }

    handleKeyPress(event) {
        // Only respond to arrow keys, ignore all other key presses
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        
        // Prevent default browser behavior (like scrolling) for arrow keys
        event.preventDefault();
        
        // Store current grid state to check if move was valid (changed the grid)
        const oldGrid = JSON.stringify(this.grid);
        
        // Execute appropriate move based on arrow key pressed
        switch(event.key) {
            case 'ArrowLeft':
                this.moveLeft();
                break;
            case 'ArrowRight':
                this.moveRight();
                break;
            case 'ArrowUp':
                this.moveUp();
                break;
            case 'ArrowDown':
                this.moveDown();
                break;
        }

        // Only proceed if the move actually changed the grid state
        if (oldGrid !== JSON.stringify(this.grid)) {
            // Add new tile (2 or 4) to random empty position after valid move
            this.addNewTile();
            
            // Update visual display with new grid state and score
            this.updateDisplay();
            
            // Check if no more moves are possible and show game over
            if (this.isGameOver()) {
                alert('Game Over! Your score: ' + this.score);
            }
        }
    }

    moveLeft() {
        // Process each row independently for left movement
        for (let i = 0; i < 4; i++) {
            // Remove zeros (empty cells) to compress tiles to the left
            let row = this.grid[i].filter(cell => cell !== 0);
            
            // Merge adjacent identical tiles from left to right
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    // Double the left tile value and add to score
                    row[j] *= 2;
                    this.score += row[j];
                    
                    // Remove the merged tile (right one)
                    row.splice(j + 1, 1);
                }
            }
            
            // Fill remaining positions with zeros to maintain 4-cell row
            while (row.length < 4) row.push(0);
            
            // Update the grid row with processed result
            this.grid[i] = row;
        }
    }

    moveRight() {
        // Process each row independently for right movement
        for (let i = 0; i < 4; i++) {
            // Remove zeros to compress tiles, but merge from right to left
            let row = this.grid[i].filter(cell => cell !== 0);
            
            // Merge adjacent identical tiles from right to left
            for (let j = row.length - 1; j > 0; j--) {
                if (row[j] === row[j - 1]) {
                    // Double the right tile value and add to score
                    row[j] *= 2;
                    this.score += row[j];
                    
                    // Remove the merged tile (left one) and add zero at start
                    row.splice(j - 1, 1);
                    row.unshift(0);
                }
            }
            
            // Fill remaining positions with zeros at the beginning
            while (row.length < 4) row.unshift(0);
            
            // Update the grid row with processed result
            this.grid[i] = row;
        }
    }

    moveUp() {
        // Process each column independently for upward movement
        for (let j = 0; j < 4; j++) {
            // Extract column values and remove zeros (empty cells)
            let column = this.grid.map(row => row[j]).filter(cell => cell !== 0);
            
            // Merge adjacent identical tiles from top to bottom
            for (let i = 0; i < column.length - 1; i++) {
                if (column[i] === column[i + 1]) {
                    // Double the top tile value and add to score
                    column[i] *= 2;
                    this.score += column[i];
                    
                    // Remove the merged tile (bottom one)
                    column.splice(i + 1, 1);
                }
            }
            
            // Fill remaining positions with zeros at the bottom
            while (column.length < 4) column.push(0);
            
            // Update the grid column with processed result
            for (let i = 0; i < 4; i++) {
                this.grid[i][j] = column[i];
            }
        }
    }

    moveDown() {
        // Process each column independently for downward movement
        for (let j = 0; j < 4; j++) {
            // Extract column values and remove zeros, but merge from bottom to top
            let column = this.grid.map(row => row[j]).filter(cell => cell !== 0);
            
            // Merge adjacent identical tiles from bottom to top
            for (let i = column.length - 1; i > 0; i--) {
                if (column[i] === column[i - 1]) {
                    // Double the bottom tile value and add to score
                    column[i] *= 2;
                    this.score += column[i];
                    
                    // Remove the merged tile (top one) and add zero at start
                    column.splice(i - 1, 1);
                    column.unshift(0);
                }
            }
            
            // Fill remaining positions with zeros at the top
            while (column.length < 4) column.unshift(0);
            
            // Update the grid column with processed result
            for (let i = 0; i < 4; i++) {
                this.grid[i][j] = column[i];
            }
        }
    }

    addNewTile() {
        // Find all empty cells (cells with value 0) in the grid
        const emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0) {
                    // Store coordinates of empty cells
                    emptyCells.push({x: i, y: j});
                }
            }
        }
        
        // Only add tile if there are empty cells available
        if (emptyCells.length > 0) {
            // Select random empty cell from available options
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            
            // 90% chance for value 2, 10% chance for value 4 (classic 2048 probability)
            this.grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    updateDisplay() {
        // Get the main grid container element
        const gridContainer = document.querySelector('.grid-container');
        
        // Clear existing content to rebuild from scratch
        gridContainer.innerHTML = '';
        
        // Create visual representation of each grid cell
        for (let i = 0; i < 4; i++) {
            // Create row container for proper CSS grid layout
            const row = document.createElement('div');
            row.className = 'grid-row';
            
            for (let j = 0; j < 4; j++) {
                // Create individual cell container
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                
                // Only create tile element if cell has a value (not zero)
                if (this.grid[i][j] !== 0) {
                    const tile = document.createElement('div');
                    
                    // Add CSS classes for styling based on tile value
                    tile.className = `tile tile-${this.grid[i][j]}`;
                    
                    // Display the numeric value on the tile
                    tile.textContent = this.grid[i][j];
                    
                    // Add tile to cell container
                    cell.appendChild(tile);
                }
                
                // Add cell to row container
                row.appendChild(cell);
            }
            
            // Add completed row to grid container
            gridContainer.appendChild(row);
        }

        // Update score display with current score
        document.getElementById('score').textContent = this.score;
        
        // Update best score if current score exceeds it
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            
            // Persist new best score to localStorage for future sessions
            localStorage.setItem('bestScore', this.bestScore);
        }
        
        // Update best score display
        document.getElementById('best-score').textContent = this.bestScore;
    }

    isGameOver() {
        // First check: if any empty cells exist, game can continue
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0) return false;
            }
        }

        // Second check: if any adjacent cells can merge, game can continue
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const current = this.grid[i][j];
                
                // Check if current cell matches cell below (vertical merge possible)
                if (i < 3 && current === this.grid[i + 1][j]) {
                    return false;
                }
                
                // Check if current cell matches cell to the right (horizontal merge possible)
                if (j < 3 && current === this.grid[i][j + 1]) {
                    return false;
                }
            }
        }

        // If no empty cells and no possible merges, game is over
        return true;
    }
}

// Initialize and start the game when script loads
const game = new Game2048();