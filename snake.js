/**
 * Represents a Snake object that moves and grows in a grid.
 * @constructor
 * @param {number} x - The initial x-coordinate of the snake.
 * @param {number} y - The initial y-coordinate of the snake.
 */
class Snake {
  constructor(x, y) {
    this.body = [createVector(x, y)];
    this.xvelocity = 1;
    this.yvelocity = 0;
  }

  /**
   * Gets the head of the snake.
   * @returns {p5.Vector} The vector representing the head of the snake.
   */
  get head() {
    return this.body[0];
  }

  /**
   * Gets the tail of the snake.
   * @returns {p5.Vector} The vector representing the tail of the snake.
   */
  get tail() {
    return this.body[this.body.length - 1];
  }

  /**
   * Extends the length of the snake by adding a new segment to its body.
   */
  extendBody() {
    const tail = this.body[this.body.length - 1].copy();
    this.body.push(tail);
  }

  /**
   * Checks if the snake has eaten the food.
   * @param {Food} food - The food object to check against.
   * @returns {boolean} True if the snake's tail position matches the food position; otherwise, false.
   */
  eat(food) {
    return this.tail.equals(food.position);
  }

  /**
   * Changes the direction of the snake's movement.
   * @param {number} x - The x-component of the new velocity.
   * @param {number} y - The y-component of the new velocity.
   */
  changeDirection(x, y) {
    this.xvelocity = x;
    this.yvelocity = y;
  }

  /**
   * Checks for collision of the snake's head with its body segments.
   * @returns {boolean} True if there is a collision; otherwise, false.
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
   * Updates the position and movement of the snake.
   */
  update() {
    const segment = this.head.copy();
    this.body.pop();

    segment.x += this.xvelocity * tileSize;
    segment.y += this.yvelocity * tileSize;
  
    this.body.unshift(segment)
  }

  /**
   * Displays the snake on the canvas.
   */
  show() {
    fill(227, 228, 219);
    noStroke();
    for (let i = 0; i < this.body.length; i++) {
      const segment = this.body[i];
      rect(segment.x, segment.y, tileSize, tileSize);
    }
  }
}