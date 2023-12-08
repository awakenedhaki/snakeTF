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
  createGameInstance(brain) {
    return new GameInstance(brain);
  }

  /**
   * Creates multiple game instances.
   */
  createGameInstances(brain) {
    for (let i = 0; i < this.nInstances; i++) {
      this.gameInstances.push(this.createGameInstance(brain));
    }
  }

  runInstances() {
    this.gameInstances.forEach((gameInstance) => gameInstance.run());
  }

  get snakes() {
    return this.gameInstances.map((gameInstance) => gameInstance.snake);
  }
}
