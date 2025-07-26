// Game state variables - track current game status
let currentPlayer = 'X';  // Always start with player X, alternates between 'X' and 'O'
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // 9-element array representing 3x3 grid (index 0-8)
let gameActive = true;  // Boolean flag to prevent moves after game ends (win/draw)

// Static array defining all possible winning combinations on a 3x3 grid
// Each sub-array contains indices that form a winning line
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal rows: top, middle, bottom
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical columns: left, center, right  
    [0, 4, 8], [2, 4, 6]             // Diagonal lines: top-left to bottom-right, top-right to bottom-left
];

// Event listener setup - attach click handlers to all grid cells
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        // Extract the data-index attribute to determine which cell was clicked (0-8)
        const index = cell.getAttribute('data-index');
        
        // Only allow move if: cell is empty AND game is still active (not ended)
        if (gameBoard[index] === '' && gameActive) {
            makeMove(index);
        }
    });
});

/**
 * Handles a player's move and all subsequent game state updates
 * @param {string} index - The board position (0-8) where the move is made
 */
function makeMove(index) {
    // Update internal game state with current player's symbol
    gameBoard[index] = currentPlayer;
    
    // Update DOM to visually display the move on the clicked cell
    document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer;
    
    // Check if current move resulted in a win condition
    if (checkWin()) {
        // Display win message and stop further gameplay
        document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;  // Prevent any additional moves
        return;  // Exit function early to avoid player switching
    }

    // Check if all cells are filled without a winner (draw condition)
    if (checkDraw()) {
        // Display draw message and stop further gameplay
        document.getElementById('status').textContent = "It's a draw!";
        gameActive = false;  // Prevent any additional moves
        return;  // Exit function early to avoid player switching
    }

    // Switch to the other player using ternary operator
    // If current is 'X', switch to 'O'; if current is 'O', switch to 'X'
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    // Update status display to show whose turn it is next
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

/**
 * Checks if the current player has achieved a winning combination
 * @returns {boolean} - True if current player has won, false otherwise
 */
function checkWin() {
    // Use Array.some() to check if ANY winning combination is satisfied
    return winningCombinations.some(combination => {
        // For each winning combination, use Array.every() to check if ALL positions
        // in that combination belong to the current player
        return combination.every(index => {
            // Compare each position in the combination to current player's symbol
            return gameBoard[index] === currentPlayer;
        });
    });
}

/**
 * Checks if the game board is completely filled (draw condition)
 * @returns {boolean} - True if all cells are occupied, false if any empty cells remain
 */
function checkDraw() {
    // Use Array.every() to verify that NO cells contain empty strings
    // Returns true only when all 9 positions have been filled
    return gameBoard.every(cell => cell !== '');
}

/**
 * Resets the entire game to initial state for a new game
 * Called when reset/new game button is clicked
 */
function resetGame() {
    // Reset player to starting player (X always goes first)
    currentPlayer = 'X';
    
    // Clear the internal game board array (all positions become empty strings)
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    
    // Reactivate the game to allow new moves
    gameActive = true;
    
    // Reset status message to indicate X's turn
    document.getElementById('status').textContent = "Player X's turn";
    
    // Clear all visual cells in the DOM to remove X's and O's
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';  // Remove any displayed X or O symbols
    });
}