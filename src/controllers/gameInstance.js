/**
 * Represents a game instance in the game.
 * Each game instance has a snake and a food, and it can update the game state,
 * check for game over, and display a game over message.
 * @class
 */
class GameInstance {
  /**
   * Creates a new game instance.
   * @constructor
   * @param {Snake} snake - The snake in the game instance.
   * @param {Food} food - The food in the game instance.
   */
  constructor(snake, food) {
    this.snake = snake;
    this.food = food;
    this.isOver = false;
  }

  /**
   * Runs the game instance.
   * This includes displaying the food, checking if the snake eats the food,
   * updating the snake's location, displaying the snake, and checking if the
   * game is over.
   * @returns {void}
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

  /**
   * Calculates the fitness of the snake in the game instance.
   * The fitness is calculated based on the mean distance the snake has traveled and the length of the snake.
   * @returns {number} - The calculated fitness.
   */
  calculateFitness() {
    const meanDistance = this.snake.totalDistance / frameCount;
    const fitness =
      (meanDistance * this.snake.length) / (meanDistance + this.snake.length);

    return fitness;
  }
  /**
   * Updates the direction of the snake's movement.
   * @param {number} x - The new x velocity.
   * @param {number} y - The new y velocity.
   * @returns {void}
   */
  updateSnakeDirection(x, y) {
    this.snake.changeDirection(x, y);
  }

  /**
   * Checks if the snake has collided with the border.
   * The snake is considered to have collided with the border if its head is outside the canvas.
   * @returns {boolean} - True if the snake has collided with the border, false otherwise.
   */
  borderCollision() {
    return (
      this.snake.body[0].x < 0 ||
      this.snake.body[0].x > width ||
      this.snake.body[0].y < 0 ||
      this.snake.body[0].y > height
    );
  }

  /**
   * Checks if the game is over.
   * The game is considered to be over if the snake has collided with the border or with itself.
   * @returns {boolean} - True if the game is over, false otherwise.
   */
  gameOver() {
    return this.borderCollision() || this.snake.collision();
  }

  /**
   * Displays a game over message on the canvas.
   * @returns {void}
   */
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
