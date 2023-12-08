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
  brain = new Brain(7, hiddenLayers, 4, 0.3);
  snake = new NNSnake(width / 2, height / 2, brain);
  food = new Food();

  gameInstancesManager = new GameInstancesManager(1);
  gameInstancesManager.createGameInstances(snake, food);
  brain.dispose();
}

function draw() {
  background(59, 37, 44);

  gameInstancesManager.runInstances();

  if (gameInstancesManager.allInstancesOver()) {
    gameInstancesManager.nextGeneration();
  }
}
