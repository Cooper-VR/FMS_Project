const video = document.getElementById('video');

    // Check if the browser supports the getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the camera
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          // Set the video element's source to the camera stream
          video.srcObject = stream;
        })
        .catch(function(err) {
          console.log("Error accessing the camera: " + err.name + ": " + err.message);
        });
    } else {
      alert("Sorry, your browser does not support camera access.");
    }





function setup(){
    createCanvas(displayWidth, displayHeight, WEBGL);

}
var x = 0;
var y = 0;
var x_dir = -1;
var y_dir = -1;
var ballSpeed_x = 0.4;
var ballSpeed_y = 0.2;

function draw(){
    background(200);
    // Rotate around the y-axis.
  //rotateY(frameCount * 0.01);

  // Draw the triangle.
  fill(255, 0, 0);
  stroke(0, 0, 0);
  circle(x, y, 10);

  fill(0, 255, 0);
  stroke(0, 0, 0);
  rect(300, (mouseY - displayHeight/2 - 50), 10, 100);

  fill(0, 0, 255);
  stroke(0, 0, 0);
  rect(-300, (mouseY - displayHeight/2 - 50), 10, 100);

  fill(200, 10, 10);
  stroke(0, 0, 0);

//  y++;
if (x > 300-(10/2)-(10/2) && x < 300+(10/2)+(10/2) && y > mouseY - displayHeight/2 - 50 && y < mouseY - displayHeight/2 + 50){
    console.log("hit");
    x_dir *= -1;
}


if (x < -(300-(10/2)-(10/2)) && x > -(300+(10/2)+(10/2)) && y > mouseY - displayHeight/2 - 50 && y < mouseY - displayHeight/2 + 50){
    console.log("hit");
    x_dir *= -1;
}
checkBounds();
  
}

function checkBounds(){
    if (x > displayWidth/2 -10){
        x_dir = -1;
    }
    else if (x < -displayWidth/2 + 10) {
        x_dir = 1;
    }
    
    if (x_dir == 1) x+= ballSpeed_x * deltaTime;
    else x-= ballSpeed_x * deltaTime;

    if (y > displayHeight/2 -200){
        y_dir = -1;
    }
    else if (y < -displayHeight/2 + 10) {
        y_dir = 1;
    }
    
    if (y_dir == 1) y+= ballSpeed_y * deltaTime;
    else y-= ballSpeed_y * deltaTime;
}