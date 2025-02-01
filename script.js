const length = 20;
const width = 10;
let arr = Array.from({length: length}, () => new Array(width).fill(0))
const tetromino = [
    [[1,1,1,1]],//_
    [[0,0,1], [1,1,1]],//l
    [[1,0,0], [1,1,1]],//j orange
    [[1,1,0], [0,1,1]],//z
    [[0,1,1], [1,1,0]],//s
    [[0,1,0], [1,1,1]]//t
]
const tetrominoColor = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange'
]

function RandomTetromino(){
    let num = 10;
    while(num > 5){
        num = Math.floor(Math.random()*10)
    }
    return num;
}

function Color(num){
    return tetrominoColor[num];
}

let grid = [
    [2, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
]

let t = [
    [1, 1, 1, 1],
    [2, 2, 2, 2],
    [3, 3, 3, 3],
    [4, 4, 4, 4],
    [5, 5, 5, 5],
    [6, 6, 6, 6]
]

// Here’s a function that efficiently removes multiple rows from the grid at once without looping and removing one by one. It reconstructs the grid by filtering out the unwanted rows.

function removeRows(grid, indexesToRemove) {
    // Create a new grid by filtering out rows that exist in indexesToRemove
    let newGrid = grid.filter((_, index) => !indexesToRemove.includes(index));
    return newGrid;
}

let indexes = [4, 2];

let updatedGrid = removeRows(t, indexes);
// console.log(updatedGrid);

Rotation(grid);
console.log(grid);



document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft'){
        if (CheckHorizontal(grid, 'left') == true){
            MoveLeft(grid);
            RenderGrid(grid);
        }
    } else if (event.key === 'ArrowRight'){
        if (CheckHorizontal(grid, 'right') == true){
            MoveRight(grid);
            RenderGrid(grid);
        }
    } else if (event.key === 'ArrowUp'){
        Rotation(grid);
        RenderGrid(grid);
    } else if (event.key === 'ArrowDown'){
        if (CheckDown(grid) == true){
            MoveDown(grid);
            RenderGrid(grid);
        } else {
            StackTetromino(grid);
            RenderGrid(grid);
        }
    }
});


function Rotation(grid) {
    let tetrominoShape = [];
    let startRow = -1;
    let startCol = -1;

    // Find the tetromino in the grid
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                if (startRow === -1) {
                    startRow = r;
                    startCol = c;
                }
                if (!tetrominoShape[r - startRow]) {
                    tetrominoShape[r - startRow] = [];
                }
                tetrominoShape[r - startRow][c - startCol] = 1;
            }
        }
    }

    if (tetrominoShape.length === 0) {
        return grid; // No tetromino found
    }

    // Rotate the tetromino shape
    let column = tetrominoShape[0].length;
    let finalarr = Array.from({ length: column }, () => new Array(tetrominoShape.length).fill(0));

    for (let i = 0; i < tetrominoShape.length; i++) {
        for (let j = 0; j < column; j++) {
            finalarr[j][tetrominoShape.length - 1 - i] = tetrominoShape[i][j];
        }
    }

    // Check if the rotated tetromino can be placed in the grid
    for (let r = 0; r < finalarr.length; r++) {
        for (let c = 0; c < finalarr[r].length; c++) {
            if (finalarr[r][c] === 1 && (startRow + r >= grid.length || startCol + c >= grid[0].length || grid[startRow + r][startCol + c] === 2)) {
                return grid; // Cannot rotate due to collision or out of bounds
            }
        }
    }

    // Clear the original tetromino from the grid
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                grid[r][c] = 0;
            }
        }
    }

    // Place the rotated tetromino back into the grid
    for (let r = 0; r < finalarr.length; r++) {
        for (let c = 0; c < finalarr[r].length; c++) {
            if (finalarr[r][c] === 1) {
                grid[startRow + r][startCol + c] = 1;
            }
        }
    }

    return grid;
}

function PlaceTetromino(grid, tetromino){
    let startcolumn = 4;
    let startrow = 0;

    for (let r = 0; r < tetromino.length; r++){
        for (let c = 0; c < tetromino[r].length; c++){
            if (tetromino[r][c] == 1){
                grid[startrow+r][startcolumn+c] = 1;
            }
        }
    }
}

function CheckDown(grid){
    // let okay = true;
    for (let r = grid.length-1; r >= 0; r--){
        for (let c = 0; c < grid[r].length; c++){
            if (grid[r][c] == 1){
                if (grid[r+1][c] == 2 || r+1 == grid.length){
                    // okay = false;
                    return false;
                }
            }
        }
    }
    return true;
}

function MoveDown(grid){
    for (let r = grid.length-1; r >= 0; r--){
        for (let c = 0; c < grid.length; c++){
            if (grid[r][c] == 1){
                grid[r+1][c] = 1;
                grid[r][c] = 0;
            }
        }
    }
}
function MoveLeft(grid){
    for (let r = grid.length-1; r >= 0; r--){
        for (let c = 0; c < grid.length; c++){
            if (grid[r][c] == 1 && c-1 >= 0){
                grid[r][c-1] = 1;
                grid[r][c] = 0;
            }
        }
    }
}

function MoveRight(grid){
    for (let r = grid.length-1; r >= 0; r--){
        for (let c = grid.length-1; c >= 0 ; c--){
            if (grid[r][c] == 1 && c+1 < grid[r].length){
                grid[r][c+1] = 1;
                grid[r][c] = 0;
            }
        }
    }
}

function StackTetromino(grid){
    for (let r = 0; r < grid.length; r++){
        for (let c = 0; c < grid[r].length; c++){
            if (grid[r][c] == 1){
                grid[r][c] = 2;
            }
        }
    }
}

function CheckHorizontal(grid, direction){
    for (let r = 0; r < grid.length; r++){
        for (c = 0; c < grid[r].length; c++){
            if (direction == 'left'){
                if (grid[r][c] == 1 && c-1 >= 0 && grid[r][c-1] == 2){
                    return false;
                }
            } else if (direction == 'right'){
                if (grid[r][c] == 1 && c+1 < grid[r].length && grid[r][c+1] == 2){
                    return false;
                }
            }
        }
    }
    return true;
}

function CheckFullRows(grid, completeRows){
    let num = 0;
    for (r = grid.length-1; r >= 0; r--){
        for (c = 0; c < grid[r].length; c++){
            if (grid[r][c] !== 2){
                break
            } else if (grid[r][c] == 2){
                num = num + 2;
            }
        }
        if (num == 20){
            completeRows.push(r);
        }
        num = 0;
    }
}

function RemoveRows(grid, completeRowIndex){
    return grid.filter(function(element, index){
        return !completeRowIndex.includes(index);
    });
}

function AddEmptyRows(grid, completeRowIndex){
    let newRows = Array.from({length:completeRowIndex.length}, () => new Array(4).fill(0));
    return newRows.concat(grid)
}

function GameOver(grid, tetromino){
    for (let r = 0; r < tetromino.length; r++){
        for (let c = 0; c < tetromino.length; c++){
            if (grid[r][c+3] == 2){
                return true
            }
        }
    }
    return false
}

