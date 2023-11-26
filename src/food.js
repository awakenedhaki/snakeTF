/**
 * Represents a food object that appears on the canvas for the snake to eat.
 * @class Food
 */
class Food {
  /**
   * Constructs a Food object.
   * @constructor
   */
  constructor() {
    this.position = createVector(100, 100);
  }

  /**
   * Updates the location of the food within the canvas grid.
   * @method Food#updateLocation
   */
  updateLocation() {
    let rows = floor(height / tileSize);
    let columns = floor(width / tileSize);

    let x = floor(random(rows)) * tileSize;
    let y = floor(random(columns)) * tileSize;

    this.position = createVector(x, y);
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
}
