
let tracing = false;
let playerPath = [];
let targetPath = [];
let score = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    defineTargetPath();
}

function draw() {
    background(248, 222, 255);
    
    // Draw the target shape
    stroke(173, 79, 230);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let point of targetPath) {
        vertex(point.x, point.y);
    }
    endShape();
    //point.x, point.y

    // Draw the player's path
    stroke(35, 41, 115);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let point of playerPath) {
        vertex(point.x, point.y);
    }
    endShape();

    // Display score
    fill(11, 48, 19 );
    stroke(89, 196, 113);
    textSize(24);
    text(`Score: ${score}`, 10, 30);
}

function mousePressed() {
    tracing = true;
    playerPath = [];
    score = 0; // Reset score
}

function mouseReleased() {
    tracing = false;
    calculateScore();
    text(`Your score is: ${score}`,50, 50);
}

function mouseDragged() {
    if (tracing) {
        playerPath.push(createVector(mouseX, mouseY));
    }
}

function defineTargetPath() {
    targetPath = [
        createVector(600, 50),
        createVector(400, 200),
        createVector(600, 350),
        createVector(800, 200),
        createVector(600, 50)
    ];
}

function calculateScore() {
    score = 0;
    for (let playerPoint of playerPath) {
        let closestDistance = Infinity;

        for (let targetPoint of targetPath) {
            const distance = dist(playerPoint.x, playerPoint.y, targetPoint.x, targetPoint.y);
            if (distance < closestDistance) {
                closestDistance = distance;
            }
        }

        // Award points based on distance
        if (closestDistance < 10) {
            score += 10; // Close to target
        } else if (closestDistance < 20) {
            score += 5; // Fairly close
        } else if (closestDistance < 30) {
            score += 1; // A bit far
        }
    }
}
