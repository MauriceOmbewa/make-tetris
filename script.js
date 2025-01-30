const length = 20;
const width = 10;
let arr = Array.from({length: length}, () => new Array(width).fill(0))
const tetromino = [
    [[1,1,1]],//_
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]


function  Movement(arr, direction, tetrominoShape){
    if (direction === 'left'){
        for (let row = 0; row < arr.length; row++){
            for (let index = 0; index < arr[row].length; index++){
                if (arr[row][index] === 1){
                    // if (arr[row][index-1] === 0 && index-1 >= 0){
                    // }
                    arr[row][index-1] = 1
                    arr[row][index] = 0
                }
            }
        }
        console.log(arr)
    } else if (direction === 'right'){
        for (let row = 0; row < arr.length; row++){
            for (let index = arr[row].length-1; index >= 0; index--){
                if (arr[row][index] === 1){
                    arr[row][index+1] = 1
                    arr[row][index] = 0
                }
            }
        }
        console.log(arr)
    } else if (direction === 'up'){
        tetrominoShape = Rotation(tetrominoShape)
    }
}

function Rotation(tetrominoShape) {
    let column = tetrominoShape[0].length;
    let finalarr = Array.from({length: column}, () => new Array(tetrominoShape.length).fill(0));

    for (let i = 0; i < tetrominoShape.length; i++) {
        for (let j = 0; j < column; j++) {
            finalarr[j][tetrominoShape.length - 1 - i] = tetrominoShape[i][j];
        }
    }

    console.log(finalarr);
    return finalarr;
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

PlaceTetromino(grid, tetromino[1]);
FallDown(grid);
// Movement(grid, 'left')
console.log(grid);

// let okay = true;

function CheckDown(grid){
    // let okay = true;
    for (let r = grid.length-1; r >= 0; r--){
        for (let c = 0; c < grid[r].length; c++){
            if (grid[r][c] == 1){
                if (grid[r+1][c] == 2){
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




































// for (let row = 0; row < arr.length; row++){
//     for (let index = 0; index < arr[row].length; index++){
//         if (arr[row][index] === 1 && line === 0){
//             // arr[row][index-1] = 1
//             lines[line] = row
//             line++
//             break
//         } else if (arr[row][index] === 1 && line === 1){
//             lines[line] = row
//             line++
//             break
//         }
//     }
// }