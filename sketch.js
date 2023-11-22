let snake, food;
const tileSize = 10;

function setup() {
  createCanvas(600, 600);
  frameRate(10);

  snake = new Snake(300, 300);
  food = new Food();
}

function draw() {
  background(59, 37, 44);

  food.show();
  if (snake.eat(food)) {
    food.updateLocation();
    snake.extendBody();
  }
  snake.update();
  snake.show();

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

function borderCollision(snake) {
  return (snake.body[0].x < 0 || snake.body[0].x > width ||
          snake.body[0].y < 0 || snake.body[0].y > height);
}

function gameOver(snake) {
  return borderCollision(snake) || snake.collision();
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.yvelocity !== 1) {
    snake.changeDirection(0, -1)
  } else if (keyCode === DOWN_ARROW && snake.yvelocity !== -1) {
    snake.changeDirection(0, 1)
  } else if (keyCode === LEFT_ARROW && snake.xvelocity !== 1) {
    snake.changeDirection(-1, 0)
  } else if (keyCode === RIGHT_ARROW && snake.xvelocity !== -1) {
    snake.changeDirection(1, 0)
  }
}