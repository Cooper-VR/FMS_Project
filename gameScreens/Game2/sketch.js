let time = 0;
let score = 0;
let misses = 3;
let speed = 1;
let playerSize = 60;
let frutSize = 30;
let missesString = "";
let scoreString = "";
let positionThreshold = (window.innerHeight * 0.9);
let removeIndexes = -1;
let positionsArray = [];
let positionsArray2 = [];
let fruitArray = [];
let fruitArrayImg = [];
let gameStarted = false;
let GameOver = false;
let basket;
let backgroundImg;

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    if (GameOver) {
      // Reset the game if it's over and space is pressed
      resetGame();
    } else {
      gameStarted = true; // Start the game on space press
    }
  }
});

function preload() {
  basket = loadImage('./assets/basket.png');
  backgroundImg = loadImage('./assets/background.jpg');
  fruitArrayImg.push(loadImage('./assets/cherry.png'));
  fruitArrayImg.push(loadImage('./assets/grapes.png'));
  fruitArrayImg.push(loadImage('./assets/bannana.png'));
  fruitArrayImg.push(loadImage('./assets/cherry.png'));
  fruitArrayImg.push(loadImage('./assets/grapes.png'));
  fruitArrayImg.push(loadImage('./assets/bannana.png'));
  fruitArrayImg.push(loadImage('./assets/fly.png'));
}

function resetGame() {
  // Reset all game variables
  score = 0;
  misses = 3;
  positionsArray = [];
  positionsArray2 = [];
  time = 0;
  gameStarted = true;
  GameOver = false;
  speed = 1;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  image(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);
}

function draw() {
  speed += (deltaTime / 5000);
  image(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);
  

  if (!gameStarted) {
    // Display a start screen if the game hasn't started yet
    background(220);
    image(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);
    textSize(30);
    fill(255, 255, 255)
    textAlign(CENTER);
    text("Press Space to Start", window.innerWidth / 2, window.innerHeight / 2);
    return;
  }

  if (!GameOver) {
    background(220);
    image(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);
    time += deltaTime / 1000;

    if (time > 1.5) {
      positionsArray.push(random(0, window.innerWidth));
      positionsArray2.push(50);
      fruitArray.push(random(fruitArrayImg));
      time = 0;
    }

    for (let i = 0; i < positionsArray.length; i++) {
      fill(0, 0, 0, 0);
      stroke(0, 0, 0, 0);
      circle(positionsArray[i], positionsArray2[i], frutSize);

      image(fruitArray[i], positionsArray[i] - frutSize / 2, positionsArray2[i] - frutSize / 2, frutSize, frutSize);

      positionsArray2[i] += speed + deltaTime / 1000;

      let dista = Math.sqrt(Math.pow(positionsArray[i] - mouseX, 2) + Math.pow(positionsArray2[i] - ((window.innerHeight * 0.9) - 20), 2));

      if (dista < (playerSize + frutSize) / 2) {
        if (fruitArray[i] == fruitArrayImg[6]){
          misses--;
        }else{
        score++;
      }
        removeIndexes = i;
      }

      if (positionsArray2[i] > positionThreshold) {
        if (fruitArray[i] != fruitArrayImg[6]){
          misses--;
        }
        removeIndexes = i;
      }
    }

    if (removeIndexes > -1) {
      positionsArray.splice(removeIndexes, 1); // Fix: correctly remove the element
      positionsArray2.splice(removeIndexes, 1); // Fix: correctly remove the element
      fruitArray.splice(removeIndexes, 1); // Fix: correctly remove the element
      removeIndexes = -1;
    }

    // Check if the game is over
    if (misses == 0) {
      GameOver = true;
    }

    // Player basket (mouse controlled)
    fill(0, 0, 0, 0);
    stroke(0, 0, 0, 0);
    circle(mouseX, (window.innerHeight * 0.9) - 20, playerSize);
    image(basket, mouseX-(playerSize/2), (window.innerHeight * 0.9)-playerSize, playerSize, playerSize);
    
    scoreString = "Score: " + score;
    missesString = "Misses left: " + misses;

    textSize(20);
    textAlign(LEFT);
    fill(255, 255, 255)
    text(scoreString, 50, 50);
    text(missesString, 50, 70);
  } else {
    // Display Game Over screen
    textSize(50);
    textAlign(CENTER);
    fill(255, 255, 255)
    text("Game Over", window.innerWidth / 2, window.innerHeight / 2);
    textSize(30);
    text("Press Space to Restart", window.innerWidth / 2, window.innerHeight / 2 + 50);
  }
}
