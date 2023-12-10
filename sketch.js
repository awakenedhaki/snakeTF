// Setting Constants ===========================================================
const tileSize = 10;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(600, 600);
  frameRate(10);

  const hiddenLayers = new Map([
    [0, 20],
    [1, 50],
    [2, 20],
  ]);
  gameGrid = new GameGrid(100);
}

function draw() {
  background(59, 37, 44);
  gameGrid.run();
}
