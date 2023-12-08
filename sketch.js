// Setting Constants ===========================================================
const tileSize = 10;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(600, 600);
  frameRate(10);

  const hiddenLayers = new Map([
    [0, 10],
    [1, 7],
    [2, 5],
  ]);
  gameInstance = new GameInstance(7, hiddenLayers, 4, 0.1);
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
