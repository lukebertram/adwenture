// Track-related CONSTANTS
const WORLD_TILE_WIDTH = 40;
const WORLD_TILE_HEIGHT = 40;
const WORLD_TILE_COLS = 20;
const WORLD_TILE_ROWS = 15;

const TRACK = {
  ROAD: 0,
  WALL: 1,
  PLAYER_START: 2,
  GOAL: 3,
  TREE: 4,
  FLAG: 5,
};
const WORLD_ONE = [	
  4,	4,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	4,
  4,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,
  1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
  1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,
  1,	0,	0,	0,	1,	1,	5,	1,	4,	4,	4,	1,	1,	1,	1,	1,	1,	0,	0,	1,
  1,	0,	0,	1,	1,	0,	0,	0,	1,	4,	1,	0,	0,	0,	0,	5,	1,	0,	0,	1,
  1,	0,	0,	1,	0,	0,	0,	0,	0,	5,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,
  1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,
  1,	0,	0,	1,	0,	0,	0,	1,	1,	5,	1,	1,	0,	0,	0,	0,	1,	0,	0,	1,
  1,	0,	0,	1,	0,	0,	5,	0,	0,	0,	1,	0,	5,	0,	0,	0,	1,	0,	0,	1,
  1,	0,	2,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	5,	0,	0,	1,
  1,	1,	5,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,
  0,	3,	0,	0,	0,	0,	1,	4,	1,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,
  0,	3,	0,	0,	0,	0,	1,	4,	4,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,
  1,	1,	5,	1,	1,	1,	1,	4,	4,	4,	4,	4,	4,	1,	1,	1,	1,	1,	1,	1, ];

// Variable to hold the game's current track
let worldGrid = WORLD_ONE;

function trackTileToIndex(col, row) {
  return (col + WORLD_TILE_COLS * row); // returns a given tile's index within the worldGrid[]
}

function isWallAtTileCoord(trackCol, trackRow) {
  let trackIndex = trackCol + WORLD_TILE_COLS * trackRow;
  return (worldGrid[trackIndex] == TRACK.WALL);
}

// function getTrackTypeAtCoord(trackCol, trackRow) {
//   let trackIndex = trackCol + WORLD_TILE_COLS * trackRow;
//   return worldGrid[trackIndex]
// }

function getTrackAtPixelCoord(pixelX, pixelY) {
  const tileCol = Math.floor(pixelX / WORLD_TILE_WIDTH);
  const tileRow = Math.floor(pixelY / WORLD_TILE_HEIGHT);

  if(tileCol < 0 || tileCol >= WORLD_TILE_COLS || tileRow < 0 || tileRow >= WORLD_TILE_ROWS) {
    return TRACK.WALL; // Treat game bounds as walls
  }

  const trackIndex = trackTileToIndex(tileCol, tileRow);
  return worldGrid[trackIndex];
}

function drawTrack() {
  let trackIndex = 0;
  let trackTileX = 0;
  let trackTileY = 0;
  
  for (let row = 0; row < WORLD_TILE_ROWS; row++) { // For each row of the track...
    trackTileX = 0;

    for (let col = 0; col < WORLD_TILE_COLS; col++) { // For each column in that row...
      const trackType = worldGrid[trackIndex];
      canvasContext.drawImage(trackPics[trackType], trackTileX, trackTileY);
      trackIndex++; // increment trackIndex to look at next tile
      trackTileX += WORLD_TILE_WIDTH;
    }

    trackTileY += WORLD_TILE_HEIGHT;
  }
}
