/**
 * Represents a game instance in the game.
 * Each game instance has a snake and a food, and it can update the game state,
 * check for game over, and display a game over message.
 * @class
 */
class Game {
  /**
   * Creates a new game instance.
   * @constructor
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   * @param {Snake} snake - The snake in the game instance.
   * @param {Food} food - The food in the game instance.
   */
  constructor(width, height, snake, food) {
    // Game Properties
    this.width = width;
    this.height = height;
    this.isOver = false;

    // Game Entities
    if (!Game.validateEntityPosition(snake.head, width, height)) {
      snake.position = createVector(this.width / 2, this.height / 2);
    }

    if (!Game.validateEntityPosition(food, width, height)) {
      food.updateLocation(this.width, this.height);
    }

    this.snake = snake;
    this.food = food;
  }

  /**
   * Runs the game instance.
   * This includes displaying the food, checking if the snake eats the food,
   * updating the snake's location, displaying the snake, and checking if the
   * game is over.
   * @returns {void}
   */
  run() {
    this.renderCanvas();

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
      this.isOver = true;
    }
  }

  /**
   * Renders the canvas.
   * @returns {void}
   */
  renderCanvas() {
    push();
    rectMode(CENTER);
    noFill();
    stroke(255);
    rect(this.width / 2, this.height / 2, this.width, this.height);
    pop();
  }

  /**
   * Checks if the game is over.
   * The game is considered to be over if the snake has collided with the border
   * or with itself.
   * @returns {boolean} - True if the game is over, false otherwise.
   */
  gameOver() {
    return (
      this.snake.checkBorderCollision(this.width, this.height) ||
      this.snake.checkSelfCollision()
    );
  }

  /**
   * Displays a game over message on the canvas.
   * @returns {void}
   */
  renderGameOverMessage() {
    push();
    rectMode(CENTER);
    fill(255, 100);
    rect(this.width / 2, this.height / 2, this.width, this.height);
    pop();
  }

  /**
   * Validates the position of an entity.
   * @static
   * @param {Entity} entity - The entity to validate.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   * @returns {boolean} - True if the entity's position is valid, false otherwise.
   */
  static validateEntityPosition(entity, width, height) {
    return (
      entity.x >= 0 && entity.x < width && entity.y >= 0 && entity.y < height
    );
  }
}
