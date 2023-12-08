/**
 * Represents a snake controlled by a neural network in the game.
 * Each NNSnake has a brain, which is a neural network, and can predict its next
 * move, change its direction, and mutate its brain.
 * @class
 * @extends Snake
 */
class NNSnake extends Snake {
  /**
   * Creates a new NNSnake object.
   * @constructor
   * @param {number} x - The x-coordinate of the snake's head.
   * @param {number} y - The y-coordinate of the snake's head.
   * @param {Brain} brain - The brain of the snake.
   */
  constructor(x, y, brain) {
    super(x, y);
    this.brain = brain;
    this.totalDistance = 0;
  }

  /**
   * Predicts the next move of the snake using its brain.
   * This method works by creating an array of inputs, which includes the
   * normalized coordinates of the snake's head and the food, the current
   * direction of the snake, and the normalized distance between the snake and
   * the food. The inputs are then passed to the brain's predict method, which
   * returns the index of the direction the snake should move in. The snake's
   * direction is then changed to the predicted direction.
   * @param {Food} food - The food in the game.
   * @returns {void}
   */
  predict(food) {
    const distance = manhattanDistance(this, food);

    // Side effect
    this.totalDistance += distance;

    const inputs = [
      // Normalizing the X and Y coodinates of the snake's head by the canvas size
      this.head.x / width,
      this.head.y / height,
      // Normalizing distance between snake and food by the canvas size
      // Assuming that width === height
      distance / (width + height),
      // Current direction of snake
      this.xvelocity,
      this.yvelocity,
      // Normalizing the X and Y coodinates of the food by the canvas size
      food.x / width,
      food.y / height,
    ];

    const output = this.brain.predict(inputs);

    this.changeDirection(output);
  }

  /**
   * Changes the direction of the snake's movement.
   * This method works by creating an array of possible directions, and then
   * calling the changeDirection method of the Snake class with the direction
   * at the given index.
   * @param {number} directionIndex - The index of the direction in the directions array.
   * @returns {void}
   */
  changeDirection(directionIndex) {
    const directions = [
      [0, -1], // UP
      [0, 1], // DOWN
      [-1, 0], // LEFT
      [1, 0], // RIGHT
    ];

    Snake.prototype.changeDirection.call(this, ...directions[directionIndex]);
  }

  /**
   * Mutates the brain of the snake by a given rate.
   * This method works by calling the mutate method of the Brain class with the
   * given rate.
   * @param {number} rate - The mutation rate.
   * @returns {void}
   */
  mutate(rate) {
    this.brain.mutate(rate);
  }

  /**
   * Resets the neural network snake.
   * @returns {void}
   */
  reset() {
    super.reset();
    this.totalDistance = 0;
  }

  /**
   * Creates a copy of the NNSnake.
   * @returns {NNSnake} - The copied NNSnake.
   */
  copy() {
    return new NNSnake(this.head.x, this.head.y, this.brain.copy());
  }

  /**
   * Disposes of the NNSnake's brain to free up memory.
   * @returns {void}
   */
  dispose() {
    this.brain.dispose();
  }
}
