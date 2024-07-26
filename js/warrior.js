const PLAYER_MOVE_SPEED = 3.0;

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
    this.keysOwned = 0;

    if (this.homeX == undefined) {
      let startingPointFound = false;
      roomGrid.forEach((trackTile, index) => {
        if (trackTile == TILE.PLAYER_START && !startingPointFound) {
          startingPointFound = true;
          const tileRow = Math.floor(index/ROOM_COLS);
          const tileCol = index % ROOM_COLS;
          this.homeX = tileCol * TILE_WIDTH + 0.5 * TILE_WIDTH;
          this.homeY = tileRow * TILE_HEIGHT + 0.5 * TILE_HEIGHT;
          roomGrid[index] = TILE.GROUND;
        }
      });
    }
    console.log(this.name, this.homeX, this.homeY)
    this.x = this.homeX;
    this.y = this.homeY;
  }

  draw() {
      drawBmp(canvasContext, this.graphic, this.x, this.y, 0.0) // 0.0 means never rotate this graphic
  }

  move() {
    let nextX = this.x;
    let nextY = this.y;

    if (this.keyHeld.north) {
      nextY -= PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld.south) {
      nextY += PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld.east) {
      nextX += PLAYER_MOVE_SPEED;
    }
    if (this.keyHeld.west) {
      nextX -= PLAYER_MOVE_SPEED;
    }

    const nextTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    let nextTileType = TILE.WALL;

    if (nextTileIndex != undefined) {
      nextTileType = roomGrid[nextTileIndex];
    }

    switch (nextTileType) {
      case TILE.GROUND:
        // let the player complete their movement
        this.x = nextX;
        this.y = nextY;
        break;
    
      case TILE.GOAL:
        // set win message, reset round
        document.getElementById("debugText").innerHTML = `${this.name} is victorious!`;
        this.reset();
        break;
    
      case TILE.DOOR:
        // check for key. If available, decrease key count & remove door
        if (this.keysOwned > 0) {
          this.keysOwned -= 1;
          roomGrid[nextTileIndex] = TILE.GROUND;
        }
        break;
    
      case TILE.KEY:
        // remove key tile & increase key count
        roomGrid[nextTileIndex] = TILE.GROUND;
        this.keysOwned += 1;
        break;
    
      case TILE.WALL:
      default:
        // any other tile type number was found... do nothing for now.
        break;
    }
  }
}
