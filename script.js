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

// console.log(arr);
let num = RandomTetromino();
// console.log(num)
// // StartPosition(num);
// console.log(tetromino[num].length)
// console.log(Color(num))

function RandomTetromino(){
    let num = 10;
    while(num > 5){
        num = Math.floor(Math.random()*10)
    }
    // console.log(num);
    return num;
}

function StartPosition(num, arr, tetromino){
    const tetrominoShape = tetromino[num];

    for (let row = 0; row < tetrominoShape.legth; row++){
        for (column = 0; column < tetrominoShape[row].length; column++){
            arr[row][3 + column] = tetrominoShape[row][column];
        }
    }
}

function Color(num){
    return tetrominoColor[num];
}

// let arr5 = [
//     [0, 0, 1, 1, 0],
//     [0, 0, 1, 0, 0]
// ]

// Movement(arr5, 'right')

function  Movement(arr, direction){
    if (direction === 'left'){
        for (let row = 0; row < arr.length; row++){
            for (let index = 0; index < arr[row].length; index++){
                if (arr[row][index] === 1){
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