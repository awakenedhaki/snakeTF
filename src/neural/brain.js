class Brain {
  /**
   * Represents a Brain object.
   * @constructor
   * @param {number} nInputNodes - The number of input nodes.
   * @param {Map<number, number>} hiddenLayers - The map specifying the number of layers and nodes in each layer.
   * @param {number} nOutputNodes - The number of output nodes.
   * @param {object} model - The pre-existing model (optional).
   */
  constructor(nInputNodes, hiddenLayers, nOutputNodes, mutationRate, model) {
    this.nInputNodes = nInputNodes;
    this.hiddenLayers = hiddenLayers;
    this.nOutputNodes = nOutputNodes;
    this.mutationRate = mutationRate;
    this.model =
      model || this.createModel(nInputNodes, hiddenLayers, nOutputNodes);
  }

  /**
   * Creates a neural network model with the specified number of input nodes, hidden nodes, hidden layers, and output nodes.
   * @param {number} nInputNodes - The number of input nodes.
   * @param {Map<number, number>} hiddenLayers - The map specifying the number of layers and nodes in each layer.
   * @param {number} nOutputNodes - The number of output nodes.
   * @returns {tf.Sequential} The created neural network model.
   */
  createModel(nInputNodes, hiddenLayers, nOutputNodes) {
    const model = tf.sequential();

    const hiddenLayerKeys = Array.from(hiddenLayers.keys());
    const hiddenLayerValues = Array.from(hiddenLayers.values());
    for (let i = 0; i < hiddenLayerKeys.length; i++) {
      const hiddenLayer = tf.layers.dense({
        units: hiddenLayerValues[i],
        activation: "sigmoid",
        inputShape: i === 0 ? [nInputNodes] : [hiddenLayerValues[i - 1]],
      });
      model.add(hiddenLayer);
    }

    const output = tf.layers.dense({
      units: nOutputNodes,
      activation: "sigmoid",
    });
    model.add(output);

    return model;
  }

  /**
   * Predicts the output based on the given inputs.
   * @param {Array} inputs - The input values for prediction.
   * @returns {Array} - The predicted output values.
   */
  predict(inputs) {
    return tf.tidy(() => {
      const output = this.model.predict(tf.tensor2d([inputs]));
      return output.argMax(1).dataSync();
    });
  }

  /**
   * Mutates the weights of the neural network model.
   * @param {number} rate - The mutation rate, indicating the probability of mutation for each weight.
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
   * @returns {Brain} The copy of the brain.
   * @todo Implement.
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
        modelCopy
      );
    });
  }

  /**
   * Disposes the brain by disposing the model.
   * @returns {void}
   */
  dispose() {
    this.model.dispose();
  }
}
