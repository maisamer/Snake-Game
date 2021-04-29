const grid = document.querySelector('.grid')
function createBoard(){
    for(let i=0;i<100;i++){
        var card = document.createElement('div');
        card.setAttribute('data-id',i);
        grid.appendChild(card);
    }
}
createBoard()
const squares = document.querySelectorAll('.grid div') // get all divs in grid class
const scoreDisplay = document.querySelector('span')
const startBtn = document.querySelector('.start')
const gameOver = document.querySelector('#end')

const width = 10
let currentIndex = 0
let appleIndex = 0
let currentSnake = [2,1,0]
let direction = 1
let score = 0
let speed = 0.9
let intervalTime = 0
let interval = 0
let currentDirection = 39 //init to right moving

// to start an restart game
function startGame(){
    gameOver.textContent = squares.length
    currentSnake.forEach(index=>squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    direction = 1
    scoreDisplay.textContent = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index=>squares[index].classList.add('snake'))
    randomApple()
    interval = setInterval(moveOutcomes,intervalTime)
}


function moveOutcomes(){
    //deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
        gameOver.textContent = "Game Over"
      return clearInterval(interval) //this will clear the interval if any of the above happen
    }
    const tail = currentSnake.pop() //removes last item of the array and shows it
    console.log(tail)
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}
function randomApple(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length)
    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

// assign function to keyword
// right = 39 , left = 37 , up = 38 ,and down = 40
function control(e){
    squares[currentIndex].classList.remove('snake') // remove all the class of snake from all squares
    if(e.keyCode === 39 && currentDirection != 37){ // press right arrow ,the snake will go right one
        direction = 1
        currentDirection = 39
    }else if(e.keyCode === 38 && currentDirection!= 40){ // press up arrow ,the snake will go back ten divs , appearing to go up
        direction = -width
        currentDirection = 38
    }else if(e.keyCode === 37 && currentDirection != 39){ // press left ,the snake will go left one div
        direction = -1
        currentDirection = 37
    }else if(e.keyCode === 40 && currentDirection != 38){ // press down ,the snake head will instatly appear in the div ten divs from where you are now
        direction = +width
        currentDirection = 40
    }
}
document.addEventListener('keyup',control)
startBtn.addEventListener('click',startGame)