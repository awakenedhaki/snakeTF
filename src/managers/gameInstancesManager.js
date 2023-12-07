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
  createGameInstance() {
    return new GameInstance();
  }

  /**
   * Creates multiple game instances.
   */
  createGameInstances() {
    for (let i = 0; i < this.nInstances; i++) {
      this.GameInstances.push(this.createGameInstance());
    }
  }

  /**
   * Updates all game instances.
   */
  update() {}

  /**
   * Displays all game instances.
   */
  show() {}

  get snakes() {
    return this.gameInstances.map((gameInstance) => gameInstance.snake);
  }
}
