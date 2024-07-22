let p1CarPic = document.createElement("img");
let p2CarPic = document.createElement("img");

let trackPics = [];
let trackPicRoad = document.createElement("img");
let trackPicWall = document.createElement("img");
let trackPicTree = document.createElement("img");
let trackPicFlag = document.createElement("img");
let trackPicGoal = document.createElement("img");

let numberOfImagesToLoad;

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
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
    {varName: p1CarPic, fileName: 'player1.png'}, 
    {varName: p2CarPic, fileName: 'player2.png'},

    {
      trackType: TRACK.ROAD,
      fileName: 'track_road.png'
    },
    {
      trackType: TRACK.WALL,
      fileName: 'track_wall.png'
    },
    {
      trackType: TRACK.TREE,
      fileName: 'track_tree.png'
    },
    {
      trackType: TRACK.FLAG,
      fileName: 'track_flag.png'
    },
    {
      trackType: TRACK.GOAL,
      fileName: 'track_goal.png'
    },
  ];

  numberOfImagesToLoad = images.length;

  images.forEach((image) => {
    if(image.trackType != undefined){
      loadImageForTrackCode(image.trackType, image.fileName);
    } else {
      beginLoadingImage(image.varName, image.fileName)
    }
  })
}
