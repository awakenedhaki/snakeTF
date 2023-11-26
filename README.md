# Snake Game using p5.js

This project is an implementation of the classic Snake game using p5.js, a JavaScript library for creative coding.

## Description

The Snake game involves controlling a snake on a grid. The snake moves continuously in a particular direction and grows longer as it consumes food items. The objective is to navigate the snake without colliding into itself or the game boundaries.

## Features

- Control the snake using arrow keys.
- The snake grows longer upon eating food.
- Game ends if the snake collides with itself or the border.

## How to Play

You can access the game by clicking [here](https://editor.p5js.org/awakenedhaki/sketches/IrOfLF8tr)!

1. **Controls**:
   - Use the arrow keys (UP, DOWN, LEFT, RIGHT) to change the snake's direction.
2. **Gameplay**:
   - The snake moves continuously in the current direction.
   - When the snake eats the food, it grows longer, and new food appears.
   - Avoid collisions with the snake's body or the game border.
3. **Game Over**:
   - The game ends if the snake collides with itself or the border.
   - Press 'Refresh' to restart the game.

## Code Structure

The main components of the code include:
- `Snake` class: Controls the behavior of the snake.
- `Food` class: Manages the food items on the game board.
- Game loop: Handles the game logic and drawing on the canvas.

## Dependencies

- [p5.js](https://p5js.org/) library
