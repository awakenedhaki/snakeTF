# Neural Network Snake Game

This project is an implementation of the classic Snake game using p5.js, a JavaScript library for creative coding. The snake is controlled by a neural network that is evolved over time using a genetic algorithm, powered by tensorflow.js.

## Description

The Snake game involves a snake on a grid that is controlled by a neural network. The snake moves continuously and grows longer as it consumes food items. The objective is to evolve a neural network that can navigate the snake without colliding into itself or the game boundaries.

## Features

- Neural network controlled snake.
- Genetic algorithm for evolving the neural network.
- The snake grows longer upon eating food.
- Game ends if the snake collides with itself or the border.

## How to Play

You can access the game by clicking [here](https://editor.p5js.org/awakenedhaki/sketches/IrOfLF8tr)!

1. **Gameplay**:
   - The snake moves continuously in the direction determined by the neural network.
   - When the snake eats the food, it grows longer, and new food appears.
   - Avoid collisions with the snake's body or the game border.
2. **Game Over**:
   - The game ends if the snake collides with itself or the border.
   - Press 'Refresh' to restart the game.

## Code Structure

The main components of the code include:

- `Snake` class: Controls the behavior of the snake.
- `Food` class: Manages the food items on the game board.
- `NNSnake` class: A snake controlled by a neural network.
- `Brain` class: Represents the neural network that controls the snake.
- `GameInstance` class: Represents a single instance of the game, including the snake, food, and game state.
- `GameInstancesManager` class: Manages multiple game instances for the genetic algorithm.
- Game loop: Handles the game logic and drawing on the canvas.

## Dependencies

- [p5.js](https://p5js.org/) library
- [TensorFlow.js](https://www.tensorflow.org/js) library