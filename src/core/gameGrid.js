/**
 * @todo Scale snake and food size with grid size
 * @todo Create next generation of snakes
 * @todo Create a way to save the best snake
 * @todo Reposition food
 */
class GameGrid {
  constructor(nGames) {
    this.nGames = nGames;
    this.grid = this.calculateGrid();
    this.games = this.createGameGrid();
  }

  calculateGrid() {
    const columns = sqrt(this.nGames);
    const rows = this.nGames / columns;
    const tileWidth = width / columns;
    const tileHeight = height / rows;

    return {
      width: tileWidth,
      height: tileHeight,
      columns: columns,
      rows: rows,
    };
  }

  createGameGrid() {
    const games = [];
    const { width, height, columns, rows } = this.grid;
    for (let i = 0; i < this.nGames; i++) {
      const rowIndex = i % columns;
      const columnIndex = floor(i / rows);

      const layers = new Map([
        [0, 20],
        [1, 50],
        [2, 20],
      ]);
      const brain = new Brain(7, layers, 4, 0.3);
      const snake = new NNSnake(width, height, brain);
      const food = new Food();

      const game = new Game(
        width + width * rowIndex,
        height + height * columnIndex,
        snake,
        food
      );
      games.push(game);
    }
    return games;
  }

  run() {
    this.games.forEach((game) => {
      if (!game.isOver) {
        game.run();
      } else {
        game.renderGameOverMessage();
      }
    });
  }
}
