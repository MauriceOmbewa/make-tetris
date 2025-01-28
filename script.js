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
console.log(num)
// // StartPosition(num);
// console.log(tetromino[num].length)
console.log(Color(num))

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