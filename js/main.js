let canvas, canvasContext;
let p1 = new Warrior();


function startGame() {
  let framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
  
}


window.onload = function() {
  canvas = document.getElementById('gameCanvas'); // this object holds the HTML canvas dimensions
  canvasContext = canvas.getContext('2d'); // this object lets one draw on or manipulate the canvas
  canvas.style.cursor = 'crosshair';

  p1.init(playerPic, "Glipnar the Warrior");
  initializeInput();
  loadImages();
}

function moveEverything() {
  p1.move();
}

function drawEverything() {
  canvasContext.textAlign = 'center';
  // draw the background
  // colorRect(canvasContext, 0, 0, canvas.width, canvas.height, 'black');

  // draw the track
  drawTrack();

  // draw the car
  p1.draw();
}
