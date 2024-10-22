let time = 0;
let score = 0;
let misses = 3;
let speed = 1;
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
  createCanvas(window.innerWidth, window.innerHeight*0.95);
}

function draw() {
  speed += (deltaTime / 4000);

  if (!gameStarted) {
    // Display a start screen if the game hasn't started yet
    background(220);
    textSize(30);
    textAlign(CENTER);
    text("Press Space to Start", window.innerWidth / 2, window.innerHeight / 2);
    return;
  }

  if (!GameOver) {
    background(220);

    time += deltaTime / 1000;

    if (time > 1.5) {
      positionsArray.push(random(0, window.innerWidth));
      positionsArray2.push(50);
      time = 0;
    }

    for (let i = 0; i < positionsArray.length; i++) {
      fill(0, 0, 0);
      circle(positionsArray[i], positionsArray2[i], frutSize);
      positionsArray2[i] += speed + deltaTime / 1000;

      let dist = Math.sqrt(Math.pow(positionsArray[i] - mouseX, 2) + Math.pow(positionsArray2[i] - ((window.innerHeight * 0.9) - 20), 2));

      if (dist < (playerSize + frutSize) / 2) {
        score++;
        removeIndexes = i;
      }

      if (positionsArray2[i] > positionThreshold) {
        misses--;
        removeIndexes = i;
      }
    }

    if (removeIndexes > -1) {
      positionsArray.splice(removeIndexes, 1); // Fix: correctly remove the element
      positionsArray2.splice(removeIndexes, 1); // Fix: correctly remove the element
      removeIndexes = -1;
    }

    // Check if the game is over
    if (misses == 0) {
      GameOver = true;
    }

    // Player basket (mouse controlled)
    fill(50, 50, 50);
    circle(mouseX, (window.innerHeight * 0.9) - 20, playerSize);
    
    scoreString = "Score: " + score;
    missesString = "Misses left: " + misses;

    textSize(20);
    textAlign(LEFT);
    text(scoreString, 50, 50);
    text(missesString, 50, 70);
  } else {
    // Display Game Over screen
    textSize(50);
    textAlign(CENTER);
    text("Game Over", window.innerWidth / 2, window.innerHeight / 2);
    textSize(30);
    text("Press Space to Restart", window.innerWidth / 2, window.innerHeight / 2 + 50);
  }

  console.log('game started: ' + gameStarted);
  console.log('game over: ' + GameOver);
}
