// p1 keycodes
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

// p2 keycodes
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

function setKeyHoldState(keyCode, car, isHeld) {
  switch (keyCode) {

    case car.controlKey.gas:
      car.keyHeld.gas = isHeld;
      break;

    case car.controlKey.reverse:
      car.keyHeld.reverse = isHeld;
      break;

    case car.controlKey.left:
      car.keyHeld.turnLeft = isHeld;
      break;

    case car.controlKey.right:
      car.keyHeld.turnRight = isHeld;
      break;
  
    default:
      break;
  }
}

function handleKeydown(e) {
  document.getElementById('debugText').innerHTML = `Keydown Code: ${e.keyCode}`;
  setKeyHoldState(e.keyCode, p1, true);
  setKeyHoldState(e.keyCode, p2, true);
  e.preventDefault();
}

function handleKeyup(e) {
  // document.getElementById('debugText').innerHTML = `Keyup Code: ${e.keyCode}`;
  setKeyHoldState(e.keyCode, p1, false);
  setKeyHoldState(e.keyCode, p2, false);
}

function initializeInput() {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);
  p2.setupControls(KEY_W, KEY_S, KEY_A, KEY_D);
  p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
}
