let playerPic = document.createElement("img");

let tilePics = [];
let tileGround = document.createElement("img");
let tileWall = document.createElement("img");
let tileGoal = document.createElement("img");
let tileKey = document.createElement("img");
let tileDoor = document.createElement("img");

let numberOfImagesToLoad;

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode], fileName);
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = `images/${fileName}`;
}

function countLoadedImageAndLaunchIfReady() {
  numberOfImagesToLoad--;
  if (numberOfImagesToLoad === 0) {
    startGame();
  }
}

function loadImages() {
  const images = [
    {varName: playerPic, fileName: 'warrior.png'}, 

    {
      tileType: TILE.GROUND,
      fileName: 'world_ground.png'
    },
    {
      tileType: TILE.WALL,
      fileName: 'world_wall.png'
    },
    {
      tileType: TILE.KEY,
      fileName: 'world_key.png'
    },
    {
      tileType: TILE.DOOR,
      fileName: 'world_door.png'
    },
    {
      tileType: TILE.GOAL,
      fileName: 'world_goal.png'
    },
  ];

  numberOfImagesToLoad = images.length;

  images.forEach((image) => {
    if(image.tileType != undefined){
      loadImageForTileCode(image.tileType, image.fileName);
    } else {
      beginLoadingImage(image.varName, image.fileName)
    }
  })
}
