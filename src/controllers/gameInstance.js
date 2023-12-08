/**
 * Represents a game instance.
 * @class
 */
class GameInstance {
  constructor(snake, food) {
    this.snake = snake;
    this.food = food;
    this.isOver = false;
  }

  /**
   * Runs the game instance.
   */
  run() {
    background(59, 37, 44);

    this.food.show();
    if (this.snake.eat(this.food)) {
      this.food.updateLocation();
      this.snake.extendBody();
    }

    this.snake.predict(this.food);

    this.snake.update();
    this.snake.show();

    // Terminate Game
    if (this.gameOver(this.snake)) {
      this.gameOverMessage();
    }
  }

  calculateFitness() {
    const meanDistance = this.snake.totalDistance / frameCount;
    const fitness =
      (meanDistance * this.snake.length) / (meanDistance + this.snake.length);

    return fitness;
  }

  updateSnakeDirection(x, y) {
    this.snake.changeDirection(x, y);
  }

  borderCollision() {
    return (
      this.snake.body[0].x < 0 ||
      this.snake.body[0].x > width ||
      this.snake.body[0].y < 0 ||
      this.snake.body[0].y > height
    );
  }

  gameOver() {
    return this.borderCollision() || this.snake.collision();
  }

  gameOverMessage() {
    translate(width / 2, height / 2);
    textAlign(CENTER, CENTER);

    fill(250, 128, 114);
    textSize(32);
    text("Game Over.", 0, 0);

    fill(255, 128, 114);
    textSize(24);
    text("Score: " + (this.snake.body.length - 1), 0, 25);
    noLoop();
  }
}
