/**
 * Generates random 2D coordinates within the specified grid.
 * @returns {p5.Vector} - The generated 2D coordinates as a p5.Vector object.
 */
function generate2DCoordinates() {
  let rows = floor(height / tileSize);
  let columns = floor(width / tileSize);

  let x = floor(random(rows)) * tileSize;
  let y = floor(random(columns)) * tileSize;

  return createVector(x, y);
}

/**
 * Calculates the Manhattan distance between the snake's head and the food.
 * @param {Snake} snake - The snake object.
 * @param {Food} food - The food object.
 * @returns {number} The Manhattan distance between the snake's head and the food.
 */
function manhattanDistance(snake, food) {
  return abs(snake.head.x - food.x) + abs(snake.head.y - food.y);
}
