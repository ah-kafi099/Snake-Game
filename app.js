
const playBoard = document.querySelector(".play-board")
const scoreEL = document.querySelector(".score")
const highScoreEl = document.querySelector(".high-score")
const controlsEl = document.querySelectorAll(".controls i")


let gameOver = false
let speedPower = 150;
let snakeBody = []
let foodY, foodX ;
let snakeY = 10, snakeX = 5;
let velocityX =  0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("highScore") || 0;

const changeFoodPosition = () => {
    foodX = Math.floor((Math.random() * 30)) + 1
    foodY = Math.floor((Math.random() * 30))+ 1
}
const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert(`GameOver Retry to Ok`)
    location.reload()
}
const changeDirection = (e) => {
    // console.log(e);

    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if(e.key === "ArrowDown"  && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    } else if(e.key === "ArrowLeft"  && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }else if(e.key === "ArrowRight"  && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}
controlsEl.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key : key.dataset.key}))
})
const initGame = () => {

    if(gameOver) return  handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++
        highScore = score >= highScore ? score : highScore
        localStorage.setItem("high-score", highScore) 
        scoreEL.innerText = `Score ${score}`
        highScoreEl.innerText = `High Score: ${highScore}`
    }


    for (let i = snakeBody.length - 1; i > 0;  i--) {
        snakeBody[i] = snakeBody[i - 1]
        
    }


    snakeBody[0] = [snakeX , snakeY]
    snakeX += velocityX
    snakeY += velocityY

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }


    for (let index = 0; index < snakeBody.length; index++) {
        
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[index][1]} / ${snakeBody[index][0]}"></div>`

        if(index  !== 0 && snakeBody[0][1] === snakeBody[index][1] && snakeBody[0][0] === snakeBody[index][0]) {
            gameOver = true
        } 
    }


    playBoard.innerHTML = htmlMarkup
}
changeFoodPosition();
setIntervalId = setInterval(initGame, speedPower)
document.addEventListener("keydown", changeDirection);