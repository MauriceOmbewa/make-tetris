const length = 20;
const width = 10;
let grid = Array.from({ length: length }, () => new Array(width).fill(0));
const tetromino = [
    [[1, 1, 1, 1]], // I
    [[0, 0, 1], [1, 1, 1]], // L
    [[1, 0, 0], [1, 1, 1]], // J
    [[1, 1, 0], [0, 1, 1]], // Z
    [[0, 1, 1], [1, 1, 0]], // S
    [[0, 1, 0], [1, 1, 1]] // T
];
const tetrominoColor = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange'
];
let score = 0;
let currentTetromino = null;
let nextTetromino = tetromino[RandomTetromino()];
 let level = 1;
 let baseInterval = 1000;
 let timeInterval = baseInterval;
 let interval;

const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const levelElement = document.createElement('div');
levelElement.id = 'level';
scoreElement.parentNode.insertBefore(levelElement, scoreElement.nextSibling);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        if (CheckHorizontal(grid, 'left')) {
            MoveLeft(grid);
            RenderGrid(grid);
        }
    } else if (event.key === 'ArrowRight') {
        if (CheckHorizontal(grid, 'right')) {
            MoveRight(grid);
            RenderGrid(grid);
        }
    } else if (event.key === 'ArrowUp') {
        Rotation(grid);
        RenderGrid(grid);
    } else if (event.key === 'ArrowDown') {
        if (CheckDown(grid)) {
            MoveDown(grid);
            RenderGrid(grid);
        } else {
            StackTetromino(grid);
            
            // Handle completed rows
            let completeRows = [];
            CheckFullRows(grid, completeRows);
            if (completeRows.length > 0) {
                grid = RemoveRows(grid, completeRows);
                grid = AddEmptyRows(grid, completeRows);
                score += completeRows.length * 100;
                scoreElement.textContent = `Score: ${score}`;
            }
            
            // Check for game over
            if (GameOver(grid, currentTetromino.shape)) {
                clearInterval(interval);
                alert(`Game Over! Your score: ${score}`);
                return;
            }
            
            // Reset current tetromino to trigger new piece creation in next game loop
            currentTetromino = null;
            RenderGrid(grid);
        }
    }
});

// Modified GameLoop function
function GameLoop() {
    if (!currentTetromino) {
        let num = RandomTetromino();
        currentTetromino = {
            shape: tetromino[num],
            color: tetrominoColor[num],
            row: 0,
            col: Math.floor((width - tetromino[0].length) / 2)
        };
        PlaceTetromino(grid, currentTetromino);
    }

    if (CheckDown(grid)) {
        MoveDown(grid);
    } else {
        StackTetromino(grid);

        let completeRows = [];
        CheckFullRows(grid, completeRows);
        if (completeRows.length > 0) {
            grid = RemoveRows(grid, completeRows);
            grid = AddEmptyRows(grid, completeRows);
            score += completeRows.length * 100;
            checkLevelUp();
            updateGameInfo();
        }

        if (GameOver(grid, currentTetromino.shape)) {
            clearInterval(interval);
            alert(`Game Over!\nFinal Score: ${score}\nLevel Reached: ${level}`);
            return;
        }

        currentTetromino = null;
    }

    RenderGrid(grid);
}


// Start the game
updateGameInfo();
interval = setInterval(GameLoop, timeInterval);
console.log(`Game started at level ${level} with interval ${timeInterval}ms`);


// Update game info display
function updateGameInfo() {
    scoreElement.textContent = `Score: ${score}`;
    levelElement.textContent = `Level: ${level}`;
}

// Check and handle level up
function checkLevelUp() {
    const newLevel = Math.floor(score / 1000) + 1;
    if (newLevel !== level) {
        level = newLevel;
        timeInterval = baseInterval / Math.pow(2, level - 1); // Halve the interval for each level
        
        // Reset the game loop with new interval
        clearInterval(interval);
        interval = setInterval(GameLoop, timeInterval);
        
        // Visual feedback for level up
        levelElement.style.animation = 'levelUp 1s';
        setTimeout(() => {
            levelElement.style.animation = '';
        }, 1000);
        
        console.log(`Level up! Now at level ${level} with interval ${timeInterval}ms`);
    }
}

// Add CSS for level up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes levelUp {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); color: gold; }
        100% { transform: scale(1); }
    }
    #level {
        font-size: 24px;
        margin: 10px 0;
    }
`;
document.head.appendChild(style);

function RandomTetromino() {
    return Math.floor(Math.random() * tetromino.length);
}

function PlaceTetromino(grid, tetromino) {
    for (let r = 0; r < tetromino.shape.length; r++) {
        for (let c = 0; c < tetromino.shape[r].length; c++) {
            if (tetromino.shape[r][c] === 1) {
                grid[tetromino.row + r][tetromino.col + c] = 1;
            }
        }
    }
}

function CheckDown(grid) {
    for (let r = grid.length - 1; r >= 0; r--) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                if (r + 1 >= grid.length || grid[r + 1][c] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function MoveDown(grid) {
    for (let r = grid.length - 2; r >= 0; r--) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                grid[r + 1][c] = 1;
                grid[r][c] = 0;
            }
        }
    }
    currentTetromino.row++;
}

function MoveLeft(grid) {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1 && c - 1 >= 0 && grid[r][c - 1] !== 2) {
                grid[r][c - 1] = 1;
                grid[r][c] = 0;
            }
        }
    }
    currentTetromino.col--;
}

function MoveRight(grid) {
    for (let r = 0; r < grid.length; r++) {
        for (let c = grid[r].length - 1; c >= 0; c--) {
            if (grid[r][c] === 1 && c + 1 < grid[r].length && grid[r][c + 1] !== 2) {
                grid[r][c + 1] = 1;
                grid[r][c] = 0;
            }
        }
    }
    currentTetromino.col++;
}

function StackTetromino(grid) {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                grid[r][c] = 2;
            }
        }
    }
}

function CheckHorizontal(grid, direction) {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                if (direction === 'left' && (c - 1 < 0 || grid[r][c - 1] === 2)) {
                    return false;
                }
                if (direction === 'right' && (c + 1 >= grid[r].length || grid[r][c + 1] === 2)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function Rotation(grid) {
    let tetrominoShape = [];
    let startRow = currentTetromino.row;
    let startCol = currentTetromino.col;

    // Extract the current tetromino shape
    for (let r = 0; r < currentTetromino.shape.length; r++) {
        tetrominoShape[r] = [];
        for (let c = 0; c < currentTetromino.shape[r].length; c++) {
            tetrominoShape[r][c] = currentTetromino.shape[r][c];
        }
    }

    // Rotate the tetromino shape
    let rotatedShape = [];
    for (let c = 0; c < tetrominoShape[0].length; c++) {
        rotatedShape[c] = [];
        for (let r = tetrominoShape.length - 1; r >= 0; r--) {
            rotatedShape[c][tetrominoShape.length - 1 - r] = tetrominoShape[r][c];
        }
    }

    // Check if the rotated shape can be placed
    for (let r = 0; r < rotatedShape.length; r++) {
        for (let c = 0; c < rotatedShape[r].length; c++) {
            if (rotatedShape[r][c] === 1) {
                if (
                    startRow + r >= grid.length ||
                    startCol + c < 0 ||
                    startCol + c >= grid[0].length ||
                    grid[startRow + r][startCol + c] === 2
                ) {
                    return; // Cannot rotate
                }
            }
        }
    }

    // Clear the current tetromino from the grid
    for (let r = 0; r < currentTetromino.shape.length; r++) {
        for (let c = 0; c < currentTetromino.shape[r].length; c++) {
            if (currentTetromino.shape[r][c] === 1) {
                grid[startRow + r][startCol + c] = 0;
            }
        }
    }

    // Update the tetromino shape and place it back
    currentTetromino.shape = rotatedShape;
    PlaceTetromino(grid, currentTetromino);
}

function CheckFullRows(grid, completeRows) {
    for (let r = 0; r < grid.length; r++) {
        if (grid[r].every(cell => cell === 2)) {
            completeRows.push(r);
        }
    }
}

function RemoveRows(grid, indexesToRemove) {
    return grid.filter((_, index) => !indexesToRemove.includes(index));
}

function AddEmptyRows(grid, indexesToRemove) {
    let newRows = Array.from({ length: indexesToRemove.length }, () => new Array(width).fill(0));
    return newRows.concat(grid);
}

function GameOver(grid, tetrominoShape) {
    for (let r = 0; r < tetrominoShape.length; r++) {
        for (let c = 0; c < tetrominoShape[r].length; c++) {
            if (tetrominoShape[r][c] === 1 && grid[r][currentTetromino.col + c] === 2) {
                return true;
            }
        }
    }
    return false;
}

function RenderGrid(grid) {
    gridElement.innerHTML = '';
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (grid[r][c] === 1) {
                cell.classList.add('filled');
                cell.style.backgroundColor = currentTetromino.color;
            } else if (grid[r][c] === 2) {
                cell.classList.add('stacked');
                cell.style.backgroundColor = 'blue';
            }
            gridElement.appendChild(cell);
        }
    }
}