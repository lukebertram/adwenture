const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.4;

class Car {
  constructor() {
    // const startIndex = trackGrid.findIndex(val => val == TRACK.PLAYER_START);
    // trackGrid[startIndex] = TRACK.ROAD; // replace start position with road in the tilemap
    // const tileRow = Math.floor(startIndex/TRACK_COLS);
    // const tileCol = startIndex % TRACK_COLS;
    this.width = 10;
    this.radius = this.width / 2;
    // this.x = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
    // this.y = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
    this.speed = 0;
    this.angle = -0.5 * Math.PI;
    
    this.keyHeld = {
      gas: false,
      reverse: false,
      turnLeft: false,
      turnRight: false,
    };

    this.controlKey = {
      gas: undefined,
      reverse: undefined,
      left: undefined,
      right: undefined,
    };

    this.graphic = undefined;
    this.name = undefined;
    this.homeX;
    this.homeY;
  }

  setupControls(forwardKey, reverseKey, leftKey, rightKey) {
    this.controlKey.gas = forwardKey;
    this.controlKey.reverse = reverseKey;
    this.controlKey.left = leftKey;
    this.controlKey.right = rightKey;
  }

  init(graphic, carName) {
    this.graphic = graphic;
    this.name = carName;
    this.reset();
  }

  reset() {
    this.speed = 0;
    this.angle = -0.5 * Math.PI;

    if (this.homeX == undefined) {
      let startingPointFound = false;
      trackGrid.forEach((trackTile, index) => {
        if (trackTile == TRACK.PLAYER_START && !startingPointFound) {
          startingPointFound = true;
          const tileRow = Math.floor(index/TRACK_COLS);
          const tileCol = index % TRACK_COLS;
          this.homeX = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
          this.homeY = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
          trackGrid[index] = TRACK.ROAD;
        }
      });
    }
    console.log(this.name, this.homeX, this.homeY)
    this.x = this.homeX;
    this.y = this.homeY;
  }

  draw() {
      drawBmp(canvasContext, this.graphic, this.x, this.y, this.angle)
  }

  move() {
    if (Math.abs(this.speed) >= MIN_TURN_SPEED) {
      if (this.keyHeld.turnLeft) {
        this.angle -= TURN_RATE * Math.PI;
      }
      if (this.keyHeld.turnRight) {
        this.angle += TURN_RATE * Math.PI;
      }
    }

    if (this.keyHeld.gas) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeld.reverse) {
      this.speed -= REVERSE_POWER;
    }

    const nextX = this.x + Math.cos(this.angle) * this.speed;
    const nextY = this.y + Math.sin(this.angle) * this.speed;

    const nextTrackType = getTrackAtPixelCoord(nextX, nextY);
    if (nextTrackType == TRACK.ROAD) {
      this.x = nextX;
      this.y = nextY;
    } else if (nextTrackType == TRACK.GOAL) {
      document.getElementById("debugText").innerHTML = `${this.name || "Someone"} wins!`
      p2.reset();
      p1.reset();
    } else {
      this.speed *= -0.5;
    }

    this.speed *= GROUNDSPEED_DECAY_MULT;
  }
}
