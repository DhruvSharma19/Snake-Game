let inputDir = { x: 0, y: 0 };

let musicSound=new Audio("mixkit-arcade-retro-run-sound-220.wav")
let gameOverSound=new Audio("Game-end-sound-effect.mp3")
let foodSound=new Audio("Smash Toast - QuickSounds.com.mp3")
let snakeArray = [
    { x: 13, y: 15 }
];
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let foodItem = { x: 3, y: 8 };







function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake) {

    //if bump into youself

    for(let i=1;i<snake.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
 
    }

    if((snake[0].x>=18 || snake[0].x<=0) || (snake[0].y>=18 || snake[0].y<=0)){
        return true;
    }
    return false;
}

function gameEngine() {

    //updating snake and food
    if (isCollide(snakeArray)) {
        score = 0;
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Press Any Key To Start The Game Again");
        snakeArray = [{ x: 13, y: 15 }];
        musicSound.play();
        scoreBox.innerHTML="SCORE: "+score;
        
    }



    //if food

    if (snakeArray[0].x === foodItem.x && snakeArray[0].y === foodItem.y) {
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="SCORE: "+score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x , y: snakeArray[0].y + inputDir.y});
        let a=2;
        let b=16;
        foodItem={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}        
    }




    //moving the snake


    for(let i=snakeArray.length-2;i>=0;i--){
        
        snakeArray[i+1]={...snakeArray[i]};
    }

    snakeArray[0].x+=inputDir.x;
    snakeArray[0].y+=inputDir.y;






    //displaying snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('body');
        }
        board.appendChild(snakeElement)
    });

    //displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodItem.y;
    foodElement.style.gridColumnStart = foodItem.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);





    
}
musicSound.play();
window.requestAnimationFrame(main);


window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});