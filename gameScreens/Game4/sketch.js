let words = ["apple", "banana", "cherry", "grape", "orange", "kiwi", "mango", "lemon", "peach"];
let currentWord = "";
let typedWord = "";
let score = 0;
let timer = 30;
let gameState = "start";
let lives = 3;

function setup() {
  createCanvas(600, 400);
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(180, 0, 180);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "game") {
    drawGameScreen();
  } else if (gameState === "gameOver") {
    drawGameOverScreen();
  }
}

function drawStartScreen() {
  fill(0);
  textSize(40);
  text("Click to Start!", width / 2, height / 2 - 20);
  textSize(20);
  text("Type the words to score points!", width / 2, height / 2 + 20);
}

function drawGameScreen() {
  fill(0);
  text(`Type: ${currentWord}`, width / 2, height / 2 - 50);
  fill(0);
  text(typedWord, width / 2, height / 2);
  
  fill(0);
  text(`Score: ${score}`, width / 2, height - 80);
  text(`Time: ${timer}`, width / 2, height - 50);
  text(`Lives: ${lives}`, width / 2, height - 120);

  if (timer <= 0 || lives <= 0) {
    gameState = "gameOver";
  }
}

function drawGameOverScreen() {
  fill(0);
  textSize(40);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  text(`Your Score: ${score}`, width / 2, height / 2 + 20);
  text("Click to Play Again", width / 2, height / 2 + 60);
}

function mousePressed() {
  if (gameState === "start" || gameState === "gameOver") {
    startGame();
  }
}

function startGame() {
  score = 0;
  timer = 30;
  typedWord = "";
  lives = 3;
  resetWord();
  gameState = "game";


  setInterval(() => {
    if (gameState === "game" && timer > 0) timer--;
  }, 1000);
}

function keyPressed() {
  if (gameState !== "game") return;

  if (key === "Backspace") {
    typedWord = typedWord.slice(0, -1);
  } else if (key.length === 1) {
  
    if (currentWord.charAt(typedWord.length) === key) {
      typedWord += key;
      if (typedWord.length === currentWord.length) {
        score++;
        timer += 2;
        resetWord();
      }
    } else {
      lives--;
      if (lives < 0) lives = 0;
    }
  }
}

function resetWord() {
  currentWord = random(words);
  typedWord = "";
}
