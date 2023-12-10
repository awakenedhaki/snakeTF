/**
 * Represents a food object in the game.
 * Each food object has a position and can update its location, display itself,
 * and be copied.
 * @class
 */
class Food {
  /**
   * Creates a new food object.
   * If no position is provided, a random position is generated.
   * @constructor
   * @param {p5.Vector} position - The initial position of the food.
   */
  constructor(position) {
    this.position = position || Food.generate2DCoordinates();
  }

  /**
   * Updates the location of the food to a new random position.
   * @returns {void}
   */
  updateLocation() {
    this.position = generate2DCoordinates();
  }

  /**
   * Displays the food on the canvas.
   * @returns {void}
   */
  show() {
    stroke(227, 228, 219);
    fill(59, 37, 44);
    rect(this.position.x, this.position.y, tileSize, tileSize);
  }

  /**
   * Generates a random 2D coordinate within the canvas with consideration to
   * the tile size global variable.
   * @static
   * @returns {p5.Vector} - The generated 2D coordinate.
   */
  static generate2DCoordinates() {
    const rows = floor(height / tileSize);
    const columns = floor(width / tileSize);

    const x = floor(random(rows)) * tileSize;
    const y = floor(random(columns)) * tileSize;

    return createVector(x, y);
  }

  /**
   * Creates a copy of the food object.
   * @returns {Food} - The copied food.
   */
  copy() {
    return new Food(this.position.copy());
  }

  /**
   * Gets the x-coordinate of the food's position.
   * @returns {number} - The x-coordinate of the food's position.
   */
  get x() {
    return this.position.x;
  }
  /**
   * Gets the y-coordinate of the food's position.
   * @returns {number} - The y-coordinate of the food's position.
   */
  get y() {
    return this.position.y;
  }
}
