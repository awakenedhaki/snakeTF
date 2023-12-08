/**
 * Represents a food object that appears on the canvas for the snake to eat.
 * @class Food
 */
class Food {
  /**
   * Constructs a Food object.
   * @constructor
   */
  constructor(position) {
    this.position = position || Food.generate2DCoordinates();
  }

  /**
   * Updates the location of the food within the canvas grid.
   * @method Food#updateLocation
   */
  updateLocation() {
    this.position = generate2DCoordinates();
  }

  /**
   * Displays the food on the canvas.
   * @method Food#show
   */
  show() {
    stroke(227, 228, 219);
    fill(59, 37, 44);
    rect(this.position.x, this.position.y, tileSize, tileSize);
  }

  static generate2DCoordinates() {
    const rows = floor(height / tileSize);
    const columns = floor(width / tileSize);

    const x = floor(random(rows)) * tileSize;
    const y = floor(random(columns)) * tileSize;

    return createVector(x, y);
  }

  copy() {
    return new Food(this.position.copy());
  }

  /**
   * Get the x-coordinate of the food's position.
   * @returns {number} The x-coordinate of the food's position.
   */
  get x() {
    return this.position.x;
  }

  /**
   * Get the y-coordinate of the food's position.
   * @returns {number} The y-coordinate of the food's position.
   */
  get y() {
    return this.position.y;
  }
}
