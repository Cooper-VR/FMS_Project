let bgType = "gradient"; // Change this value to "image", "waves", or "particles" for different backgrounds
let backgroundImg;
let particles = [];
let waveOffset = 0;
let score = 0;
let totalShapes = 5;
let sourceShapes = [];
let targetShapes = [];
let draggingShape = null;
let offsetX, offsetY;
let matchMessage = "";

function preload() {
  // Load background image (uncomment if you want to use it)
  // backgroundImg = loadImage('background.jpg'); // Replace with the path to your image
}

function setup() {
  createCanvas(800, 600);

  // Define shape types
  let shapes = ["circle", "square", "triangle", "star", "hexagon"];
  
  // Define source shapes in fixed positions on the left side
  sourceShapes.push({ shape: shapes[0], x: 100, y: 100, matched: false });
  sourceShapes.push({ shape: shapes[1], x: 100, y: 200, matched: false });
  sourceShapes.push({ shape: shapes[2], x: 100, y: 300, matched: false });
  sourceShapes.push({ shape: shapes[3], x: 100, y: 400, matched: false });
  sourceShapes.push({ shape: shapes[4], x: 100, y: 500, matched: false });

  // Shuffle and assign target shapes in random order on the right side
  shapes = shuffle(shapes);
  targetShapes.push({ shape: shapes[0], x: 600, y: 100, matched: false });
  targetShapes.push({ shape: shapes[1], x: 600, y: 200, matched: false });
  targetShapes.push({ shape: shapes[2], x: 600, y: 300, matched: false });
  targetShapes.push({ shape: shapes[3], x: 600, y: 400, matched: false });
  targetShapes.push({ shape: shapes[4], x: 600, y: 500, matched: false });

  // Initialize particles for particle effect
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  // Background choice based on bgType
  if (bgType === "gradient") {
    // Radial gradient background
    setGradient(0, 0, width, height, color(135, 206, 250), color(240, 248, 255));
  } 
  else if (bgType === "image") {
    // Static image background
    image(backgroundImg, 0, 0, width, height);
  } 
  else if (bgType === "waves") {
    // Animated wave effect
    background(240, 248, 255);
    stroke(0, 100, 255);
    noFill();
    beginShape();
    for (let x = 0; x < width; x++) {
      let y = height / 2 + sin(radians(x + waveOffset)) * 50;
      vertex(x, y);
    }
    endShape();
    waveOffset += 2;
  } 
  else if (bgType === "particles") {
    // Particle background effect
    background(240, 248, 255);
    for (let particle of particles) {
      particle.update();
      particle.show();
    }
  }

  // Display instructions and score
  textSize(24);
  fill(50);
  textAlign(LEFT);
  text("Drag the shapes to their matching targets!", 20, 30);
  text("Score: " + score, 20, 60);

  // Draw target shapes
  for (let target of targetShapes) {
    if (!target.matched) {
      drawShape(target.shape, target.x, target.y, 80, false);
    }
  }

  // Draw source shapes
  for (let source of sourceShapes) {
    if (!source.matched) {
      drawShape(source.shape, source.x, source.y, 80, true);
    }
  }

  // Display match message briefly
  if (matchMessage) {
    textSize(32);
    fill(0, 150, 0);
    textAlign(CENTER);
    text(matchMessage, width / 2, height / 2);
  }

  // Check if all shapes are matched to display a completion message
  if (score === totalShapes) {
    textSize(36);
    fill(0, 102, 204);
    textAlign(CENTER);
    text("Congratulations! All shapes matched!", width / 2, height - 50);
  }
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = 0; i <= 1; i += 0.01) {
    let inter = map(i, 0, 1, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    ellipse(x + w / 2, y + h / 2, w * i, h * i);
  }
}

// Particle class for particle effect
function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.size = random(2, 5);
  this.speedX = random(-1, 1);
  this.speedY = random(-1, 1);
  
  this.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };

  this.show = function() {
    noStroke();
    fill(0, 150, 255, 150);
    ellipse(this.x, this.y, this.size);
  };
}

function drawShape(shape, x, y, size, isSource) {
  let fillColor = isSource ? color(255, 182, 193) : color(173, 216, 230);
  let shadowColor = color(200, 200, 200, 100);
  
  // Draw shadow for a 3D effect
  fill(shadowColor);
  noStroke();
  if (shape === "circle") {
    ellipse(x + 5, y + 5, size);
  } else if (shape === "square") {
    rect(x - size / 2 + 5, y - size / 2 + 5, size, size);
  } else if (shape === "triangle") {
    triangle(x + 5, y - size / 2 + 5, x - size / 2 + 5, y + size / 2 + 5, x + size / 2 + 5, y + size / 2 + 5);
  } else if (shape === "star") {
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = TWO_PI / 5 * i;
      let sx = x + 5 + cos(angle) * size / 2;
      let sy = y + 5 + sin(angle) * size / 2;
      vertex(sx, sy);
      sx = x + 5 + cos(angle + PI / 5) * size / 4;
      sy = y + 5 + sin(angle + PI / 5) * size / 4;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  } else if (shape === "hexagon") {
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI / 6 * i;
      let sx = x + 5 + cos(angle) * size / 2;
      let sy = y + 5 + sin(angle) * size / 2;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  // Draw shape with color
  fill(fillColor);
  if (shape === "circle") {
    ellipse(x, y, size);
  } else if (shape === "square") {
    rect(x - size / 2, y - size / 2, size, size);
  } else if (shape === "triangle") {
    triangle(x, y - size / 2, x - size / 2, y + size / 2, x + size / 2, y + size / 2);
  } else if (shape === "star") {
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = TWO_PI / 5 * i;
      let sx = x + cos(angle) * size / 2;
      let sy = y + sin(angle) * size / 2;
      vertex(sx, sy);
      sx = x + cos(angle + PI / 5) * size / 4;
      sy = y + sin(angle + PI / 5) * size / 4;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  } else if (shape === "hexagon") {
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI / 6 * i;
      let sx = x + cos(angle) * size / 2;
      let sy = y + sin(angle) * size / 2;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}

function mousePressed() {
  // Check if a source shape is clicked
  for (let i = 0; i < sourceShapes.length; i++) {
    let shape = sourceShapes[i];
    if (!shape.matched && dist(mouseX, mouseY, shape.x, shape.y) < 40) {
      draggingShape = shape;
      offsetX = shape.x - mouseX;
      offsetY = shape.y - mouseY;
      break;
    }
  }
}

function mouseDragged() {
  if (draggingShape) {
    draggingShape.x = mouseX + offsetX;
    draggingShape.y = mouseY + offsetY;
  }
}

function mouseReleased() {
  if (draggingShape) {
    // Check if the dragged shape is close to any target shape for matching
    for (let target of targetShapes) {
      if (!target.matched && draggingShape.shape === target.shape && dist(draggingShape.x, draggingShape.y, target.x, target.y) < 50) {
        draggingShape.x = target.x;  // Snap into place
        draggingShape.y = target.y;
        draggingShape.matched = true;
        target.matched = true;
        score++;  // Increase score for a correct match
        matchMessage = "Matched " + draggingShape.shape + "!";
        setTimeout(() => matchMessage = "", 1000);  // Clear match message after 1 second
        break;
      }
    }
    draggingShape = null;
  }
}
