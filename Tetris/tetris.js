// Game constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 25;
const COLORS = [
    '#FF0D72', // I - Hot Pink
    '#0DC2FF', // J - Cyan
    '#0DFF72', // L - Neon Green
    '#F538FF', // O - Magenta
    '#FF8E0D', // S - Orange
    '#FFE138', // T - Yellow
    '#3877FF'  // Z - Blue
];

// Tetromino shapes
const SHAPES = [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],                         // J
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],                         // L
    [[0, 4, 4], [0, 4, 4], [0, 0, 0]],                         // O
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],                         // S
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],                         // T
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]                          // Z
];

// Game variables
let canvas, ctx;
let nextCanvas, nextCtx;
let board = [];
let currentPiece;
let nextPiece;
let score = 0;
let level = 1;
let lines = 0;
let gameOver = false;
let isPaused = false;
let dropInterval;
let dropStart;

// Initialize the game
function init() {
    canvas = document.getElementById('tetris');
    ctx = canvas.getContext('2d');
    nextCanvas = document.getElementById('nextPiece');
    nextCtx = nextCanvas.getContext('2d');
    
    // Set canvas size based on block size
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
    nextCanvas.width = 4 * BLOCK_SIZE;
    nextCanvas.height = 4 * BLOCK_SIZE;
    
    // Scale the context
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    nextCtx.scale(BLOCK_SIZE/2, BLOCK_SIZE/2);
    
    // Initialize board
    createBoard();
    
    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('pauseBtn').addEventListener('click', togglePause);
    
    // Initial animation
    gsap.from('.game-container', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
}

function createBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function drawBlock(x, y, color, context = ctx) {
    // Draw main block
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
    
    // Draw pixelated highlight
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    context.fillRect(x, y, 0.2, 0.2);
    
    // Draw pixelated shadow
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillRect(x + 0.8, y + 0.8, 0.2, 0.2);
    
    // Draw border
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    context.lineWidth = 0.05;
    context.strokeRect(x, y, 1, 1);
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    // Draw board
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                drawBlock(x, y, COLORS[value - 1]);
            }
        });
    });
    
    // Draw current piece
    if (currentPiece) {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(x + currentPiece.x, y + currentPiece.y, COLORS[value - 1]);
                }
            });
        });
    }
    
    // Draw next piece
    if (nextPiece) {
        nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(x + 1, y + 1, COLORS[value - 1], nextCtx);
                }
            });
        });
    }
}

function createPiece() {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
        shape,
        x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
        y: 0
    };
}

function collision() {
    return currentPiece.shape.some((row, y) => {
        return row.some((value, x) => {
            if (!value) return false;
            const newX = x + currentPiece.x;
            const newY = y + currentPiece.y;
            return newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && board[newY]?.[newX]);
        });
    });
}

function merge() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[y + currentPiece.y][x + currentPiece.x] = value;
            }
        });
    });
}

function rotate() {
    const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );
    const previousShape = currentPiece.shape;
    currentPiece.shape = rotated;
    if (collision()) {
        currentPiece.shape = previousShape;
    }
}

function moveDown() {
    currentPiece.y++;
    if (collision()) {
        currentPiece.y--;
        merge();
        clearLines();
        currentPiece = nextPiece;
        nextPiece = createPiece();
        if (collision()) {
            gameOver = true;
            clearInterval(dropInterval);
            gsap.to('.game-container', {
                duration: 0.5,
                scale: 0.95,
                repeat: 1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    }
    dropStart = Date.now();
}

function moveLeft() {
    currentPiece.x--;
    if (collision()) {
        currentPiece.x++;
    }
}

function moveRight() {
    currentPiece.x++;
    if (collision()) {
        currentPiece.x--;
    }
}

function clearLines() {
    let linesCleared = 0;
    board.forEach((row, y) => {
        if (row.every(value => value !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
        }
    });
    
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100 * level;
        level = Math.floor(lines / 10) + 1;
        
        // Update UI
        document.getElementById('score').textContent = score;
        document.getElementById('level').textContent = level;
        document.getElementById('lines').textContent = lines;
        
        // Animation for cleared lines
        gsap.to('.game-container', {
            duration: 0.1,
            scale: 1.05,
            repeat: 1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
}

function handleKeyPress(event) {
    if (gameOver || isPaused) return;
    
    switch(event.keyCode) {
        case 37: // Left arrow
            moveLeft();
            break;
        case 39: // Right arrow
            moveRight();
            break;
        case 40: // Down arrow
            moveDown();
            break;
        case 38: // Up arrow
            rotate();
            break;
        case 32: // Space
            while (!collision()) {
                currentPiece.y++;
            }
            currentPiece.y--;
            merge();
            clearLines();
            currentPiece = nextPiece;
            nextPiece = createPiece();
            break;
    }
    draw();
}

function startGame() {
    if (gameOver) {
        createBoard();
        gameOver = false;
    }
    
    if (!currentPiece) {
        currentPiece = createPiece();
        nextPiece = createPiece();
    }
    
    dropInterval = setInterval(() => {
        moveDown();
        draw();
    }, 1000 / level);
    
    dropStart = Date.now();
    
    // Animate start button
    gsap.to('#startBtn', {
        duration: 0.3,
        scale: 0.95,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut'
    });
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(dropInterval);
        document.getElementById('pauseBtn').textContent = 'Resume';
    } else {
        dropInterval = setInterval(() => {
            moveDown();
            draw();
        }, 1000 / level);
        document.getElementById('pauseBtn').textContent = 'Pause';
    }
    
    // Animate pause button
    gsap.to('#pauseBtn', {
        duration: 0.3,
        scale: 0.95,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut'
    });
}

// Initialize the game when the page loads
window.addEventListener('load', init);
