// Declaring Global Variables ==================================================

// Setting Constants ===========================================================
const tileSize = 10;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(600, 600);
  frameRate(10);

  gameInstance = new GameInstance();
}

function draw() {
  gameInstance.run();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    gameInstance.updateSnakeDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    gameInstance.updateSnakeDirection(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    gameInstance.updateSnakeDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    gameInstance.updateSnakeDirection(1, 0);
  }
}
