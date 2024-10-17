time = 0;

let score = 0;
let misses = 3;
let speed = 4;
let playerSize = 20;
let frutSize = 15;
let missesString = "";
let scoreString = "";
let positionThreshold = (window.innerHeight * 0.9);
let removeIndexes = -1;
let positionsArray = [];
let positionsArray2 = [];
let gameStarted = false;

let GameOver = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight * 0.9);
  textSize(50);
  text("Press space to start", window.innerWidth / 2, window.innerHeight / 2);
}

//start game when space is pressed
function keyPressed(){
  if (keyCode === 32){
    gameStarted = true;
  }
}

while (!gameStarted){
  textSize(50);
  text("Press space to start", window.innerWidth / 2, window.innerHeight / 2);
}

function draw() {
  if (!GameOver){
    background(220);

    time += deltaTime / 1000;

    if (time > 3){
      positionsArray.push(random(0, window.innerWidth));
      positionsArray2.push(50);
      time = 0;
    }

    for (let i = 0; i < positionsArray.length; i++){
      circle(positionsArray[i], positionsArray2[i], frutSize);
      positionsArray2[i] += speed + deltaTime / 1000;

      let dist = Math.sqrt(Math.pow(positionsArray[i] - mouseX, 2) + Math.pow(positionsArray2[i] - ((window.innerHeight * 0.9)-20), 2));

      if (dist < (playerSize + frutSize) / 2){
        console.log('hit');
        score++;
        removeIndexes = i;
      }

      if (positionsArray2[i] > positionThreshold){
        misses--;
        removeIndexes = i;
      }
    }

    if (removeIndexes > -1){
      positionsArray.shift();
      positionsArray2.shift();
      removeIndexes = -1;
    }

    GameOver = (misses == 0)? true : false;


  //circle is place holder basket
    circle(mouseX, (window.innerHeight * 0.9)-20, playerSize);
    scoreString = "Score: " + score;
    missesString = "Misses left: " + misses;

    textSize(20);
    text(scoreString, 50, 50);
    text(missesString, 50, 70);
  }
  textSize(50);
  text("Game Over", window.innerWidth / 2, window.innerHeight / 2);
}

//i could spawn them after a time theshold is exceeded

