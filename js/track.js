// Track-related CONSTANTS
const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

const TRACK = {
  ROAD: 0,
  WALL: 1,
  PLAYER_START: 2,
  GOAL: 3,
  TREE: 4,
  FLAG: 5,
};
const TRACK_ONE = [	
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
  1,	2,	2,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	5,	0,	0,	1,
  1,	1,	5,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,
  0,	3,	0,	0,	0,	0,	1,	4,	1,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,
  0,	3,	0,	0,	0,	0,	1,	4,	4,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,
  1,	1,	5,	1,	1,	1,	1,	4,	4,	4,	4,	4,	4,	1,	1,	1,	1,	1,	1,	1, ];

// Variable to hold the game's current track
let trackGrid = TRACK_ONE;

function trackTileToIndex(col, row) {
  return (col + TRACK_COLS * row); // returns a given tile's index within the trackGrid[]
}

function isWallAtTileCoord(trackCol, trackRow) {
  let trackIndex = trackCol + TRACK_COLS * trackRow;
  return (trackGrid[trackIndex] == TRACK.WALL);
}

// function getTrackTypeAtCoord(trackCol, trackRow) {
//   let trackIndex = trackCol + TRACK_COLS * trackRow;
//   return trackGrid[trackIndex]
// }

function getTrackAtPixelCoord(pixelX, pixelY) {
  const tileCol = Math.floor(pixelX / TRACK_WIDTH);
  const tileRow = Math.floor(pixelY / TRACK_HEIGHT);

  if(tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS) {
    return TRACK.WALL; // Treat game bounds as walls
  }

  const trackIndex = trackTileToIndex(tileCol, tileRow);
  return trackGrid[trackIndex];
}

function drawTrack() {
  let trackIndex = 0;
  let trackTileX = 0;
  let trackTileY = 0;
  
  for (let row = 0; row < TRACK_ROWS; row++) { // For each row of the track...
    trackTileX = 0;

    for (let col = 0; col < TRACK_COLS; col++) { // For each column in that row...
      const trackType = trackGrid[trackIndex];
      canvasContext.drawImage(trackPics[trackType], trackTileX, trackTileY);
      trackIndex++; // increment trackIndex to look at next tile
      trackTileX += TRACK_WIDTH;
    }

    trackTileY += TRACK_HEIGHT;
  }
}
