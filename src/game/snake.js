/**
 * Represents a snake in the game.
 * Each snake has a body represented by an array of vectors, and x and y
 * velocities.
 * The snake can change direction, check for collisions with itself, eat food,
 * and extend its body.
 * @class
 */
class Snake {
  /**
   * Creates a new snake object.
   * The snake's body starts with one segment at the given position, and it
   * starts moving to the right.
   * @constructor
   * @param {number} x - The initial x-coordinate of the snake's head.
   * @param {number} y - The initial y-coordinate of the snake's head.
   */
  constructor(x, y) {
    this.body = [createVector(x, y)];
    this.xvelocity = 1;
    this.yvelocity = 0;
  }

  /**
   * Changes the direction of the snake's movement.
   * If the new direction is opposite to the current direction, the direction
   * is not changed.
   * @param {number} x - The new x velocity.
   * @param {number} y - The new y velocity.
   */
  changeDirection(x, y) {
    if (
      (x !== 0 && x === -this.xvelocity) ||
      (y !== 0 && y === -this.yvelocity)
    ) {
      return;
    }

    this.xvelocity = x;
    this.yvelocity = y;
  }

  /**
   * Checks if the snake has collided with itself.
   * The snake is considered to have collided with itself if its head is in the
   * same position as any part of its body.
   * @returns {boolean} - True if the snake has collided with itself, false otherwise.
   */
  collision() {
    if (this.body.length < 3) {
      return false;
    }

    const head = this.head;
    for (let i = 1; i < this.body.length; i++) {
      if (head.equals(this.body[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the snake has eaten a given food.
   * The snake is considered to have eaten the food if its head is in the same
   * position as the food.
   * @param {Food} food - The food to check.
   * @returns {boolean} - True if the snake has eaten the food, false otherwise.
   */
  eat(food) {
    return this.head.equals(food.position);
  }

  /**
   * Adds a new segment to the snake's body at its current head position.
   * @returns {void}
   */
  extendBody() {
    const tail = this.body[this.body.length - 1].copy();
    this.body.push(tail);
  }

  /**
   * Updates the snake's position based on its current velocity.
   * The new position becomes the new head of the snake, and the last segment of
   * the body is removed.
   * @returns {void}
   */
  update() {
    const segment = this.head.copy();
    this.body.pop();

    segment.x += this.xvelocity * tileSize;
    segment.y += this.yvelocity * tileSize;

    this.body.unshift(segment);
  }

  /**
   * Displays the snake on the canvas.
   * @returns {void}
   */
  show() {
    fill(227, 228, 219);
    noStroke();
    for (let i = 0; i < this.body.length; i++) {
      const segment = this.body[i];
      rect(segment.x, segment.y, tileSize, tileSize);
    }
  }

  /**
   * Creates a copy of the snake object.
   * @returns {Snake} - The copied snake.
   */
  copy() {
    const snakeCopy = new Snake(this.head.x, this.head.y);
    return snakeCopy;
  }

  /**
   * Gets the position of the snake's head.
   * @returns {p5.Vector} - The position of the snake's head.
   */
  get head() {
    return this.body[0];
  }

  /**
   * Gets the position of the snake's tail.
   * @returns {p5.Vector} - The position of the snake's tail.
   */
  get tail() {
    return this.body[this.body.length - 1];
  }
}
