time = 0;

let positionThreshold = 500;
let removeIndexes = -1;
let positionsArray = [];
let positionsArray2 = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight * 0.9);
}

function draw() {
  background(220);

  time += deltaTime / 1000;

  if (time > 3){
    positionsArray.push(random(0, window.innerWidth));
    positionsArray2.push(50);
    time = 0;
  }

  for (let i = 0; i < positionsArray.length; i++){
    circle(positionsArray[i], positionsArray2[i], 10);
    positionsArray2[i] += 1;

    if (positionsArray2[i] > positionThreshold){
      removeIndexes = i;
    }
  }

  if (removeIndexes > -1){
    positionsArray.shift();
    positionsArray2.shift();
    removeIndexes = -1;
  }


  //circle is place holder basket
  circle(mouseX, (window.innerHeight * 0.9)-20, 20);
}

//i could spawn them after a time theshold is exceeded

