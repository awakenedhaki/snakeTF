/**
 * Represents a game instance.
 * @class
 */
class GameInstance {
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.score = 0;
    this.isOver = false;
  }

  /**
   * Updates the game instance.
   */
  update() {}

  /**
   * Displays the game instance.
   */
  show() {}

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
}
