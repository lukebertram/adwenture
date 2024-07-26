// World-related CONSTANTS
const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

const TILE = {
  GROUND: 0,
  WALL: 1,
  PLAYER_START: 2,
  GOAL: 3,
  KEY: 4,
  DOOR: 5,
};

const TRANSPARENCY_TILES = [
  TILE.GOAL,
  TILE.KEY,
  TILE.DOOR,
];

function tileHasTransparency(type) {
  return (TRANSPARENCY_TILES.includes(type));
}
const ROOM_ONE = [	
  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
  1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	5,	0,	1,	1,	1,	1,
  1,	0,	4,	0,	4,	0,	1,	0,	2,	0,	1,	0,	1,	4,	4,	1,
  1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	5,	1,	5,	1,	1,
  1,	1,	1,	5,	1,	1,	1,	0,	4,	0,	1,	0,	0,	0,	1,	1,
  1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	4,	0,	1,	1,
  1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	1,
  1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	4,	0,	1,	1,
  1,	0,	1,	0,	1,	0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	1,
  1,	0,	5,	0,	5,	0,	5,	0,	3,	0,	1,	1,	1,	1,	1,	1,
  1,	0,	1,	0,	1,	0,	1,	0,	0,	0,	1,	1,	1,	1,	1,	1,
  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1 ];

// Variable to hold the game's current room layout
let roomGrid = ROOM_ONE;

function roomTileToIndex(col, row) {
  return (col + ROOM_COLS * row); // returns a given tile's index within the roomGrid[]
}

function isWallAtTileCoord(roomCol, roomRow) {
  let roomIndex = roomCol + ROOM_COLS * roomRow;
  return (roomGrid[roomIndex] == TILE.WALL);
}

// function getWorldTypeAtCoord(roomCol, roomRow) {
//   let roomIndex = roomCol + ROOM_COLS * roomRow;
//   return roomGrid[roomIndex]
// }

function getTileIndexAtPixelCoord(pixelX, pixelY) {
  const tileCol = Math.floor(pixelX / TILE_WIDTH);
  const tileRow = Math.floor(pixelY / TILE_HEIGHT);

  if(tileCol < 0 || tileCol >= ROOM_COLS || tileRow < 0 || tileRow >= ROOM_ROWS) {
     console.error(`The roomGrid array contains no index corresponding to the tile at (${pixelX}, ${pixelY}).`)
  }

  return roomTileToIndex(tileCol, tileRow);
}

function drawRoom() {
  let tileIndex = 0;
  let roomTileX = 0;
  let roomTileY = 0;
  
  for (let row = 0; row < ROOM_ROWS; row++) { // For each row of the room...
    roomTileX = 0;

    for (let col = 0; col < ROOM_COLS; col++) { // For each column in that row...
      const tileType = roomGrid[tileIndex];
      if (tileHasTransparency(tileType)) {
        canvasContext.drawImage(tilePics[TILE.GROUND], roomTileX, roomTileY);
      }
      canvasContext.drawImage(tilePics[tileType], roomTileX, roomTileY);
      tileIndex++; // increment tileIndex to look at next tile
      roomTileX += TILE_WIDTH;
    }

    roomTileY += TILE_HEIGHT;
  }
}
