# LexikonJavaScriptSokoBan
An assigment for my education as a .NET developer

## Assignment Description

You are going to create a simple JavaScript game, based on the game called ”Sokoban”.
The first task is to create the game board itself. You will be given an array of characters that
represents a tile-based map. Your task is to take that character array, and turn it into a grid of
html elements that can be used to represent the map, that the player can then move around
inside.
The second part of making the game is to create functions to be able to move your player
through the game using the arrow keys on the keyboard. The game should respond to inputs
without the normal behavior of the arrow keys (i.e. scrolling in the web page).
### Required Features:
- Create functions to get the keypresses to move your player, up, down, left and right.
- Create tile-based objects to present different kind of things.
- Create a grid of html elements to build the tile-based map
- A grid of html elements representing a tile-based game board
- A player object that can move between the tiles of the board.
  - Walls should stop the player
- Movable blocks that can be pushed by the player into empty spaces.
  - The game should end once all blocks have been pushed into the right spaces on
the game board.
- You are NOT allowed to use Canvas.
### Code Requirements:
- You must use event listeners to handle key presses to make the player move.
  - The key press event listener should be able to handle the up, down, left and right
arrow keys
  - The normal effect of those keys should be suppressed, to make sure that the
- page does not scroll when you press them.
- The grid map must be made up of html elements created through JavaScript commands.
  - The player and blocks should be represented by html elements.
