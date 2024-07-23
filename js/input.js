// ARROW movement keycodes
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

// WASD movement keycodes
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

function setKeyHoldState(keyCode, player, isHeld) {
  switch (keyCode) {

    case player.controlKey.north:
      player.keyHeld.north = isHeld;
      break;

    case player.controlKey.south:
      player.keyHeld.south = isHeld;
      break;

    case player.controlKey.west:
      player.keyHeld.west = isHeld;
      break;

    case player.controlKey.east:
      player.keyHeld.east = isHeld;
      break;
  
    default:
      break;
  }
}

function handleKeydown(e) {
  document.getElementById('debugText').innerHTML = `Keydown Code: ${e.keyCode}`;
  setKeyHoldState(e.keyCode, p1, true);
  e.preventDefault();
}

function handleKeyup(e) {
  // document.getElementById('debugText').innerHTML = `Keyup Code: ${e.keyCode}`;
  setKeyHoldState(e.keyCode, p1, false);
}

function initializeInput() {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);
  p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
}
