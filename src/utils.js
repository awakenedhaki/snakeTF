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
