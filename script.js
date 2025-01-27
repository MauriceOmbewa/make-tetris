const length = 20;
const width = 10;
let arr = Array.from({length: length}, () => new Array(width).fill(0))

// console.log(arr);
// RandomTetromino();

function RandomTetromino(){
    let num = 10;
    while(num > 5){
        num = Math.floor(Math.random()*10)
    }
    // console.log(num);
    return num;
}