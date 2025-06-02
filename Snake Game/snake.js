class SnakeGame {
    constructor() {
        // Get canvas element from DOM and set up 2D rendering context
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas dimensions - 400x400 pixels creates a square game area
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // Grid size of 20 means 20x20 game grid (400/20 = 20 cells per row/column)
        this.gridSize = 20;
        
        // Initialize snake as array of coordinate objects, starting at position (5,5)
        this.snake = [{x: 5, y: 5}];
        
        // Generate initial food position randomly on the grid
        this.food = this.generateFood();
        
        // Current movement direction and queued next direction (prevents instant direction reversal)
        this.direction = 'right';
        this.nextDirection = 'right';
        
        // Game scoring system
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;  // Retrieve saved high score or default to 0
        
        // Game loop interval reference for starting/stopping game
        this.gameLoop = null;
        
        // Game speed in milliseconds (150ms = ~6.7 FPS), decreases as game progresses
        this.speed = 150;
        
        // Flag to track if game has ended
        this.isGameOver = false;

        // Initialize event handlers and display high score
        this.setupEventListeners();
        this.updateHighScore();
    }

    setupEventListeners() {
        // Listen for keyboard arrow keys for desktop control
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        
        // Start/restart game button handler
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        
        // Mobile touch controls - individual buttons for each direction
        document.getElementById('upBtn').addEventListener('click', () => this.setDirection('up'));
        document.getElementById('downBtn').addEventListener('click', () => this.setDirection('down'));
        document.getElementById('leftBtn').addEventListener('click', () => this.setDirection('left'));
        document.getElementById('rightBtn').addEventListener('click', () => this.setDirection('right'));
    }

    handleKeyPress(event) {
        // Map keyboard arrow keys to direction strings
        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };

        // Get direction string from pressed key
        const newDirection = keyMap[event.key];
        
        // Only process valid arrow key presses
        if (newDirection) {
            this.setDirection(newDirection);
        }
    }

    setDirection(newDirection) {
        // Define opposite directions to prevent snake from immediately reversing into itself
        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };

        // Only allow direction change if new direction isn't opposite to current
        // This prevents the snake from moving backwards and colliding with itself
        if (opposites[newDirection] !== this.direction) {
            this.nextDirection = newDirection;  // Queue the direction for next update
        }
    }

    generateFood() {
        // Calculate random x coordinate (0 to canvas width divided by grid size)
        const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
        
        // Calculate random y coordinate (0 to canvas height divided by grid size)
        const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
        
        // Return food position as coordinate object
        return {x, y};
    }

    update() {
        // Create new head position by copying current head coordinates
        const head = {...this.snake[0]};
        
        // Apply queued direction change (prevents multiple direction changes per frame)
        this.direction = this.nextDirection;

        // Move head position based on current direction
        switch(this.direction) {
            case 'up': head.y--; break;      // Move up (decrease y coordinate)
            case 'down': head.y++; break;    // Move down (increase y coordinate)
            case 'left': head.x--; break;    // Move left (decrease x coordinate)  
            case 'right': head.x++; break;   // Move right (increase x coordinate)
        }

        // Check for collision with walls (boundary detection)
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.gameOver();
            return;  // Exit early to prevent further processing
        }

        // Check for collision with snake body (self-collision detection)
        // Loop through all segments except the tail (length-1) since tail will be removed
        for (let i = 0; i < this.snake.length - 1; i++) {
            if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
                this.gameOver();
                return;  // Exit early to prevent further processing
            }
        }

        // Add new head to front of snake array (snake grows by one segment)
        this.snake.unshift(head);

        // Check if snake head collides with food
        if (head.x === this.food.x && head.y === this.food.y) {
            // Food eaten: increase score, update display, generate new food
            this.score += 10;
            document.getElementById('score').textContent = this.score;
            this.food = this.generateFood();
            this.animateScore();  // Visual feedback for scoring
            this.increaseSpeed(); // Make game progressively faster
            
            // Don't remove tail - snake grows by one segment
        } else {
            // No food eaten: remove tail segment (snake maintains same length)
            this.snake.pop();
        }
    }

    draw() {
        // Clear entire canvas for fresh frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw each snake segment with GSAP animation
        this.snake.forEach((segment, index) => {
            gsap.to(this.ctx, {
                duration: 0.1,  // 100ms smooth animation
                onStart: () => {
                    // Head is brighter green (#4CAF50), body segments are darker (#45a049)
                    this.ctx.fillStyle = index === 0 ? '#4CAF50' : '#45a049';
                    this.ctx.fillRect(
                        segment.x * this.gridSize,        // Convert grid coordinate to pixel position
                        segment.y * this.gridSize,        // Convert grid coordinate to pixel position
                        this.gridSize - 2,                // Width (2px smaller for spacing)
                        this.gridSize - 2                 // Height (2px smaller for spacing)
                    );
                }
            });
        });

        // Draw food as a red circle with GSAP animation
        gsap.to(this.ctx, {
            duration: 0.1,  // 100ms smooth animation
            onStart: () => {
                this.ctx.fillStyle = '#ff4757';  // Red color for food
                this.ctx.beginPath();
                this.ctx.arc(
                    this.food.x * this.gridSize + this.gridSize/2,  // Center x in grid cell
                    this.food.y * this.gridSize + this.gridSize/2,  // Center y in grid cell
                    this.gridSize/2 - 2,                            // Radius (slightly smaller than cell)
                    0,                                              // Start angle (0 radians)
                    Math.PI * 2                                     // End angle (full circle)
                );
                this.ctx.fill();  // Fill the circle
            }
        });
    }

    animateScore() {
        // Create scale animation when score increases (visual feedback)
        gsap.to('#score', {
            scale: 1.5,      // Scale to 150% size
            duration: 0.2,   // 200ms animation duration
            yoyo: true,      // Reverse animation (scale back down)
            repeat: 1        // Repeat once (total: scale up, scale down)
        });
    }

    increaseSpeed() {
        // Gradually increase game speed (decrease interval time) with minimum limit
        if (this.speed > 50) {  // Don't go faster than 50ms intervals (~20 FPS)
            this.speed -= 5;    // Decrease by 5ms (faster game)
            
            // Restart game loop with new speed
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => this.gameStep(), this.speed);
        }
    }

    gameStep() {
        // Main game loop function - called every frame
        this.update();  // Update game state (move snake, check collisions)
        this.draw();    // Render current game state to canvas
    }

    startGame() {
        // Clear any existing game loop to prevent multiple intervals
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        
        // Reset all game state to initial values
        this.snake = [{x: 5, y: 5}];    // Reset snake to single segment at (5,5)
        this.direction = 'right';        // Reset direction to rightward movement
        this.score = 0;                  // Reset score to zero
        this.speed = 150;                // Reset speed to initial value (150ms)
        this.isGameOver = false;         // Clear game over flag
        
        // Update score display and generate new food
        document.getElementById('score').textContent = '0';
        this.food = this.generateFood();
        
        // Start new game loop with initial speed
        this.gameLoop = setInterval(() => this.gameStep(), this.speed);
        
        // Animate start button for visual feedback
        gsap.to('#startBtn', {
            scale: 1.1,      // Scale to 110% size
            duration: 0.2,   // 200ms animation
            yoyo: true,      // Reverse animation
            repeat: 1        // Repeat once (scale up, scale down)
        });
    }

    gameOver() {
        // Stop the game loop immediately
        clearInterval(this.gameLoop);
        this.isGameOver = true;
        
        // Check if current score beats high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            // Persist new high score to localStorage for future sessions
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateHighScore();  // Update display
        }

        // Visual feedback for game over - red flash effect
        gsap.to('#gameCanvas', {
            backgroundColor: 'rgba(255, 0, 0, 0.2)',  // Semi-transparent red overlay
            duration: 0.5,    // 500ms animation
            yoyo: true,       // Reverse animation (fade out red)
            repeat: 1         // Repeat once (fade in red, fade out red)
        });
    }

    updateHighScore() {
        // Update high score display element with current high score value
        document.getElementById('highScore').textContent = this.highScore;
    }
}

// Initialize and start the game when script loads
const game = new SnakeGame();