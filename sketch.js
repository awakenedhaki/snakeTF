// Declaring Global Variables ==================================================
let snake, food;

// Setting Constants ===========================================================
const tileSize = 10;

// p5js Boilerplate ============================================================
function setup() {
  createCanvas(600, 600);
  frameRate(10);

  snake = new Snake(300, 300);
  food = new Food();
}

function draw() {
  background(59, 37, 44);

  // Game Loop
  food.show();
  if (snake.eat(food)) {
    food.updateLocation();
    snake.extendBody();
  }
  snake.update();
  snake.show();

  // Terminate Game
  if (gameOver(snake)) {
    translate(width / 2, height / 2);
    textAlign(CENTER, CENTER);

    fill(250, 128, 114);
    textSize(32);
    text("Game Over.", 0, 0);

    fill(255, 128, 114);
    textSize(24);
    text("Score: " + (snake.body.length - 1), 0, 25);
    noLoop();
  }
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
