/**
 * Manages multiple game instances.
 */
class GameInstancesManager {
  constructor(nInstances) {
    this.nInstances = nInstances;
    this.gameInstances = [];
  }

  /**
   * Creates a new game instance.
   * @returns {GameInstance} The created game instance.
   */
  createGameInstance(snake, food) {
    return new GameInstance(snake, food);
  }

  /**
   * Creates multiple game instances.
   */
  createGameInstances(snake, food) {
    for (let i = 0; i < this.nInstances; i++) {
      const snakeCopy = snake.copy();
      const foodCopy = food.copy();
      this.gameInstances.push(this.createGameInstance(snakeCopy, foodCopy));
    }
  }

  runInstances() {
    this.gameInstances.forEach((gameInstance) => gameInstance.run());
  }

  get snakes() {
    return this.gameInstances.map((gameInstance) => gameInstance.snake);
  }
}
