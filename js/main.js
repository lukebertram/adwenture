let canvas, canvasContext;
let p2 = new Car();
let p1 = new Car();


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

  p2.init(p2CarPic, "Green Car"); 
  p1.init(p1CarPic, "Blue Car");
  initializeInput();
  loadImages();
}

function moveEverything() {
  p2.move();
  p1.move();
}

function drawEverything() {
  canvasContext.textAlign = 'center';
  // draw the background
  // colorRect(canvasContext, 0, 0, canvas.width, canvas.height, 'black');

  // draw the track
  drawTrack();

  // draw the car
  p2.draw();
  p1.draw();
}
