/**
 * Manages multiple game instances.
 * Each game instances manager has a number of game instances and can create
 * game instances, run all game instances, and get all snakes from the game
 * instances.
 * @class
 */
class GameInstancesManager {
  /**
   * Creates a new game instances manager.
   * @constructor
   * @param {number} nInstances - The number of game instances to manage.
   */
  constructor(nInstances) {
    this.nInstances = nInstances;
    this.gameInstances = [];
    this.grid = this.calculateGrid();
  }

  /**
   * Creates a new game instance with a given snake and food.
   * @param {Snake} snake - The snake in the game instance.
   * @param {Food} food - The food in the game instance.
   * @returns {GameInstance} - The created game instance.
   */
  createGameInstance(snake, food) {
    return new GameInstance(snake, food, this.grid.width, this.grid.height);
  }

  /**
   * Creates the specified number of game instances, each with a copy of the
   * given snake and food.
   * @param {Snake} snake - The snake to copy for each game instance.
   * @param {Food} food - The food to copy for each game instance.
   */
  createGameInstances(snake, food) {
    for (let i = 0; i < this.nInstances; i++) {
      const snakeCopy = snake.copy();
      const foodCopy = food.copy();
      this.gameInstances.push(this.createGameInstance(snakeCopy, foodCopy));
    }
  }

  /**
   * Calculates the grid dimensions based on the number of game instances.
   * @returns {Object} The grid dimensions including width, height, columns, and rows.
   */
  calculateGrid() {
    const columns = sqrt(this.nInstances);
    const rows = this.nInstances / columns;
    const tileWidth = width / columns;
    const tileHeight = height / rows;

    return {
      width: tileWidth,
      height: tileHeight,
      columns: columns,
      rows: rows,
    };
  }

  /**
   * Runs all game instances managed by this game instances manager.
   * @returns {void}
   */
  runInstances() {
    this.gameInstances.forEach((gameInstance) => gameInstance.run());
  }

  /**
   * Renders all game instances on the grid.
   * @returns {void}
   */
  renderGameInstances() {
    for (let i = 0; i < this.nInstances; i++) {
      const x = (i % this.grid.columns) * this.grid.width;
      const y = floor(i / this.grid.rows) * this.grid.height;

      push();
      translate(x, y);
      this.gameInstances[i].run();
      pop();
    }

    if (this.allInstancesOver()) {
      this.nextGeneration();
    }
  }
  /**
   * Creates the next generation of game instances by performing selection and
   * mutation.
   * @returns {void}
   */
  nextGeneration() {
    this.selection();
    this.mutation();
  }

  /**
   * Performs selection on the game instances based on their fitness.
   * This method calculates the fitness of each game instance, normalizes the
   * fitness scores, and then selects a new set of game instances based on these
   * normalized fitness scores.
   * @returns {void}
   */
  selection() {
    const fitnesses = this.gameInstances.map((gameInstance) =>
      gameInstance.calculateFitness()
    );

    const totalFitness = fitnesses.reduce((acc, fitness) => acc + fitness, 0);
    const fitnessesNormalized = fitnesses.map(
      (fitness) => fitness / totalFitness
    );

    const newGameInstances = [];
    for (let i = 0; i < this.nInstances; i++) {
      const gameInstance = weightedRandomSelection(
        this.gameInstances,
        fitnessesNormalized
      );

      gameInstance.reset();

      newGameInstances.push(gameInstance);
    }

    this.gameInstances = newGameInstances;
  }

  /**
   * Performs mutation on the game instances.
   * @returns {void}
   */
  mutation() {
    this.gameInstances.forEach((gameInstance) => gameInstance.mutate());
  }

  /**
   * Checks if all game instances are over.
   * @returns {boolean} - True if all game instances are over, false otherwise.
   */
  allInstancesOver() {
    return this.gameInstances.every((gameInstance) => gameInstance.isOver);
  }

  /**
   * Gets all snakes from the game instances managed by this game instances manager.
   * @returns {Snake[]} - The snakes from the game instances.
   */
  get snakes() {
    return this.gameInstances.map((gameInstance) => gameInstance.snake);
  }
}
