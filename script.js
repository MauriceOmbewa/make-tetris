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

// PlaceTetromino(grid, tetromino[1]);
// console.log(grid);

// function MoveDown(arr) {
//      let EmptyLine = false;
//     for  (let row = arr.length-1; row >= 0 ; row--){
//         for (let column = 0; column < arr[row].length; column++){
//             if (arr[row][column] === 1){
//                 // EmptyLine = true;
//                 break;
//             } else if (arr[row][column] === 0 && column === arr[row].length-1){
//                 EmptyLine = true;
//                 break;
//             }
//         }
//         if (EmptyLine === true){
//             arr.splice(row, 1);
//             break;
//         }

//     }
// }




































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