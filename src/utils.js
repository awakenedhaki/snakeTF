/**
 * Calculates the Manhattan distance between the snake's head and the food in terms of tiles.
 * @param {Snake} snake - The snake object.
 * @param {Food} food - The food object.
 * @returns {number} The Manhattan distance between the snake's head and the food in terms of tiles..
 */
function manhattanDistance(snake, food) {
  return (abs(snake.head.x - food.x) + abs(snake.head.y - food.y)) / tileSize;
}
