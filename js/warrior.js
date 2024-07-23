const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.4;

class Warrior {
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
      north: false,
      south: false,
      west: false,
      east: false,
    };

    this.controlKey = {
      north: undefined,
      south: undefined,
      west: undefined,
      east: undefined,
    };

    this.graphic = undefined;
    this.name = undefined;
    this.homeX;
    this.homeY;
  }

  setupControls(forwardKey, reverseKey, leftKey, rightKey) {
    this.controlKey.north = forwardKey;
    this.controlKey.south = reverseKey;
    this.controlKey.west = leftKey;
    this.controlKey.east = rightKey;
  }

  init(graphic, warriorName) {
    this.graphic = graphic;
    this.name = warriorName;
    this.reset();
  }

  reset() {
    this.speed = 0;
    this.angle = -0.5 * Math.PI;

    if (this.homeX == undefined) {
      let startingPointFound = false;
      worldGrid.forEach((trackTile, index) => {
        if (trackTile == TRACK.PLAYER_START && !startingPointFound) {
          startingPointFound = true;
          const tileRow = Math.floor(index/WORLD_TILE_COLS);
          const tileCol = index % WORLD_TILE_COLS;
          this.homeX = tileCol * WORLD_TILE_WIDTH + 0.5 * WORLD_TILE_WIDTH;
          this.homeY = tileRow * WORLD_TILE_HEIGHT + 0.5 * WORLD_TILE_HEIGHT;
          worldGrid[index] = TRACK.ROAD;
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
      if (this.keyHeld.west) {
        this.angle -= TURN_RATE * Math.PI;
      }
      if (this.keyHeld.east) {
        this.angle += TURN_RATE * Math.PI;
      }
    }

    if (this.keyHeld.north) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeld.south) {
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
      this.reset();
    } else {
      this.speed *= -0.5;
    }

    this.speed *= GROUNDSPEED_DECAY_MULT;
  }
}
