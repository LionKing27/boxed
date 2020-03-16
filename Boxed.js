const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
let player;
let controller;
let loop;
let boxReady = false;
let floorReady = false;
const floorImage = new Image();
let wallReady = false;
const wallImage = new Image();
let walReady = false;
const walImage = new Image();
const boxImage = new Image();
ctx.imageSmoothingEnabled = false;
boxImage.onload = function() {
  boxReady = true;
};
boxImage.src = 'box.png';
floorImage.onload = function() {
  floorReady = true;
};
floorImage.src = 'floooooR.png';
wallImage.onload = function() {
  wallReady = true;
};
wallImage.src = 'WALLL.png';
walImage.onload = function() {
  walReady = true;
};
walImage.src = 'WALLLLL.png';
/* prettier disable */
const gameMap = [
    1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

Map = {
  tW: 50,
  tH: 50,
  mW: 18,
  mH: 17
};

scroll = {
  X: 0,
  Y: 0
};

function drawGame() {
  for (let j = 0; j < Map.mH; ++j) {
    for (let i = 0; i < Map.mW; ++i) {
      switch (gameMap[j * Map.mW + i]) {
        case 0:
          if (floorReady) {
            ctx.drawImage(floorImage, i * Map.tW - scroll.X, j * Map.tW - scroll.Y, 50, 50);
          }
          break;
        case 1:
          if (wallReady) {
            ctx.drawImage(wallImage, i * Map.tW - scroll.X, j * Map.tW - scroll.Y, 50, 50);
          }
          break;
          case 2:
            if (walReady) {
              ctx.drawImage(walImage, i * Map.tW - scroll.X, j * Map.tW - scroll.Y, 50, 50);
            }
      }
    }
  }
};
player = {
  height: 50,
  width: 50,
  x: 375,
  y: 350,
  xv: 0,
  yv: 0
};

controller = {
  left: false,
  right: false,
  up: false,
  down: false,
  keyListener: function(event) {
    let key_state = event.type == 'keydown' ? true : false;

    switch (event.keyCode) {
      case 37:
        controller.left = key_state;
        break;
      case 38:
        controller.up = key_state;
        break;
      case 39:
        controller.right = key_state;
        break;
      case 40:
        controller.down = key_state;
        break;
    }
  }
};

loop = function() {
  if (controller.right) {
    if (player.xv < 7) {
      player.xv += 0.4;
    } else {
      player.xv = 6;
    }
  }

  if (controller.left) {
    if (player.xv > -7) {
      player.xv -= 0.4;
    } else {
      player.xv = -6;
    }
  }

  if (controller.up) {
    if (player.yv > -7) {
      player.yv -= 0.4;
    } else {
      player.yv = -7;
    }
  }

  if (controller.down) {
    if (player.yv < 7) {
      player.yv += 0.4;
    } else {
      player.yv = 7;
    }
  }

  if (player.xv < 0) {
    if (gameMap[(Map.mW * (Math.floor((player.y) / 50)) + Math.floor((player.x) / 50))] !==  0 || gameMap[(Map.mW * (Math.floor((player.y) / 50) + 1) + Math.floor((player.x) / 50))] !==  0) {
      player.x -= player.xv
      player.xv = 0
    };
  }else {
    player.x += player.xv;
  };
  if (player.xv > 0) {
    if (gameMap[(Map.mW * (Math.floor((player.y) / 50)) + Math.floor((player.x) / 50) + 1)] !==  0 || gameMap[(Map.mW * (Math.floor((player.y) / 50) + 1) + Math.floor((player.x) / 50) + 1)] !==  0) {
      player.x -= player.xv
      player.xv = 0
    };
  }else {
    player.x += player.xv;
  };
  if (player.yv < 0) {
    if (gameMap[(Map.mW * (Math.floor((player.y) / 50)) + Math.floor((player.x) / 50))] !==  0 || gameMap[(Map.mW * (Math.floor((player.y) / 50)) + Math.floor((player.x) / 50) + 1)] !==  0) {
      player.y -= player.yv
      player.yv = 0
    };
  }else {
    player.y += player.yv;
  };
  if (player.yv > 0) {
    if (gameMap[(Map.mW * (Math.floor((player.y) / 50) + 1) + Math.floor((player.x) / 50))] !==  0 || gameMap[(Map.mW * (Math.floor((player.y) / 50) + 1) + Math.floor((player.x) / 50) + 1)] !==  0) {
      player.y -= player.yv
      player.yv = 0
    };
  }else {
    player.y += player.yv;
  };

  if (controller.left || controller.right) {
  } else {
    // i do not understand why you made these physics the way you did. like why
    player.xv *= 0.85;
  }
  if (controller.up || controller.down) {
  } else {
    player.yv *= 0.85;
  }
//scrolling
scroll.X = player.x - ((Map.mW * 50)/2);
scroll.Y = player.y - ((Map.mH * 50)/2);
if (scroll.X > 100) {
  scroll.X = 100
};
if (scroll.X < 0) {
  scroll.X = 0
};
if (scroll.Y > 50) {
  scroll.Y = 50
};
if (scroll.Y < 0) {
  scroll.Y = 0
};
console.log (scroll.X);
ctx.fillRect(0,0,800,800);  
drawGame();
  if (boxReady) {
    ctx.drawImage(boxImage, player.x - scroll.X, player.y - scroll.Y);
  }
  window.requestAnimationFrame(loop);
};

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);

