/**
 * Represents a brain in the game.
 * Each brain has a model, which is a neural network, and can predict outputs,
 * mutate itself, and create a copy of itself.
 * @class
 */
class Brain {
  /**
   * Creates a new brain object.
   * @constructor
   * @param {number} nInputNodes - The number of input nodes in the neural network.
   * @param {Map<number, number>} hiddenLayers - The number of nodes in each hidden layer of the neural network.
   * @param {number} nOutputNodes - The number of output nodes in the neural network.
   */
  constructor(nInputNodes, hiddenLayers, nOutputNodes, mutationRate, model) {
    this.nInputNodes = nInputNodes;
    this.hiddenLayers = hiddenLayers;
    this.nOutputNodes = nOutputNodes;
    this.mutationRate = mutationRate;
    this.model = model || this.createModel();
  }

  /**
   * Creates a new model for the brain.
   * This method creates a sequential model with a number of dense layers
   * specified by the hiddenLayers map. Each layer has a number of units and
   * uses the sigmoid activation function. The input shape of each hidden layer
   * is determined by the number of units in the previous layer, with the first
   * layer taking the number of input nodes. An output layer is added at the end
   * with a number of units equal to the number of output nodes and also uses
   * the sigmoid activation function.
   * @returns {tf.LayersModel} - The created model.
   */
  createModel() {
    const model = tf.sequential();

    const hiddenLayerKeys = Array.from(this.hiddenLayers.keys());
    const hiddenLayerValues = Array.from(this.hiddenLayers.values());
    for (let i = 0; i < hiddenLayerKeys.length; i++) {
      const hiddenLayer = tf.layers.dense({
        units: hiddenLayerValues[i],
        activation: "sigmoid",
        inputShape: i === 0 ? [this.nInputNodes] : [hiddenLayerValues[i - 1]],
      });
      model.add(hiddenLayer);
    }

    const output = tf.layers.dense({
      units: this.nOutputNodes,
      activation: "sigmoid",
    });
    model.add(output);

    return model;
  }

  /**
   * Predicts the output for a given input using the neural network.
   * This method works by passing the input to the model's predict method, which
   * returns a tensor of output values. The argMax method is then used to find
   * the index of the maximum value in the tensor, and this index is returned.
   * @param {number[]} inputs - The inputs to the neural network.
   * @returns {number} - The index of the maximum output value.
   */
  predict(inputs) {
    return tf.tidy(() => {
      const output = this.model.predict(tf.tensor2d([inputs]));
      return output.argMax(1).dataSync();
    });
  }

  /**
   * Mutates the weights of the neural network by a given rate.
   * This method works by creating a tensor of random values with the same shape
   * as the weights tensor, and a tensor of booleans where each value is true
   * with a probability equal to the mutation rate. It then adds the random
   * values to the weights tensor, but only where the boolean tensor is true.
   * This effectively changes some of the weights by a small amount, simulating
   * mutation in genetic algorithms.
   * @param {number} rate - The mutation rate, a value between 0 and 1 representing the probability of each weight being mutated.
   * @returns {void}
   */
  mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();

      const mutatedWeights = weights.map((tensor) => {
        // Create a tensor of random values with the same shape as `tensor`
        const randomGaussianTensor = tf.randomNormal(tensor.shape);

        // Create a tensor of booleans, where each value is true with probability `rate`
        const mutationMask = tf.randomUniform(tensor.shape).less(rate);

        // Add the random values to `tensor`, but only where `mutationMask` is true
        const mutatedTensor = tensor.add(
          randomGaussianTensor.mul(mutationMask)
        );

        return mutatedTensor;
      });

      this.model.setWeights(mutatedWeights);
    });
  }

  /**
   * Creates a copy of the brain.
   * This method works by creating a new Brain object with the same number of
   * input nodes, hidden layers, and output nodes. The weights of the model in
   * the new Brain object are then set to the weights of the model in the
   * current Brain object.
   * @returns {Brain} - The copied brain.
   */
  copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel(
        this.nInputNodes,
        this.hiddenLayers,
        this.nOutputNodes
      );
      const weights = this.model
        .getWeights()
        .map((weights) => tf.clone(weights));

      modelCopy.setWeights(weights);

      return new Brain(
        this.nInputNodes,
        this.hiddenLayers,
        this.nOutputNodes,
        this.mutationRate,
        modelCopy
      );
    });
  }

  /**
   * Disposes of the brain's model to free up memory.
   * @returns {void}
   */
  dispose() {
    this.model.dispose();
  }
}
