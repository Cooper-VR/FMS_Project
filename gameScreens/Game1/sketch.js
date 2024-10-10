let ball;
let paddle;
let score = 0;
let lives = 3;
let gameOver = false;
let gameStarted = false;

function setup() {
  createCanvas(400, 600);
  ball = new Ball();
  paddle = new Paddle();
}

function draw() {
  background(220);
  
  if (!gameStarted) {
    showTitleScreen();
  } else if (!gameOver) {
    ball.update();
    ball.display();
  
    paddle.update();
    paddle.display();
  
    checkCatch();

    fill(0);
    textSize(20);
    textAlign(LEFT);
    text(`Score: ${score}`, 10, 30);
    text(`Lives: ${lives}`, 300, 30);
  } else {
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text("Press 'R' to Restart", width / 2, height / 2 + 40);
  }
}

function showTitleScreen() {
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Ball Catching Game", width / 2, height / 2 - 20);
  textSize(20);
  text("Click to Start", width / 2, height / 2 + 40);
}

function checkCatch() {
  if (ball.y + ball.size / 2 >= paddle.y &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width) {
    score++;
    ball.reset();
  } else if (ball.y - ball.size / 2 > height) {
    lives--;
    ball.reset();
    
    if (lives === 0) {
      gameOver = true;
    }
  }
}

function keyPressed() {
  if (gameOver && key === 'r') {
    resetGame();
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  gameOver = false;
  ball.reset();
}

class Ball {
  constructor() {
    this.size = 20;
    this.reset();
  }

  reset() {
    this.x = random(this.size / 2, width - this.size / 2);
    this.y = 0;
    this.speed = random(2, 5);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class Paddle {
  constructor() {
    this.width = 80;
    this.height = 10;
    this.x = width / 2 - this.width / 2;
    this.y = height - 40;
    this.speed = 7;
  }

  update() {
  
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    this.x = constrain(this.x, 0, width - this.width);
  }

  display() {
    fill(0);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
}
