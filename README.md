# CyberDrive

CyberDrive is a fun one and two player game inspired by Tron. Players start off in different corners of a grid before driving around, leaving 'light trails' behind. Players must avoid their opponent's light trails, as well as their own, while trying to trick the other player into crashing into a light trail or wall. The game is written using HTML5 Canvas and JavaScript. CyberDrive can be played [here](http://natechapman.tech/CyberDrive).

## Features & Implementation

### Board

The board and player movements are drawn in Canvas, but every 5 pixels corresponds to a point in a 140 x 140 matrix (array of arrays) in `board.js` file. As players move across the Canvas, their previous positions are recorded with a 1. This tells the `game` where to draw the "light path" on the canvas, as well as providing a way to check for player collisions with "light paths".

### Multiplayer

The game includes the option for two players. When two players are chosen, the `Game View` waits for two player option objects to be built before adding the `cycles` (player vehicles) to the `game`. This ensures that the two event handlers are added to the body of the page after the player details are typed in. The listeners pass different `player numbers` to a `cycle` method that determines the new direction based on the player's key press.

### AI

The game also has a single player option. The player will have a primitive AI component which has a forward "sight" of 75 pixels, or 15 "spaces" in the underlying grid matrix. This sight is exactly that point in the grid, so if the AI turns and a "light path" or a wall is closer than those 75 pixels, the AI will change directions randomly. This allows for a semi-skilled player to trap the AI with clever moves, but also allows the AI to be competitive with open space to work with.

## Future Direction

### Sprites

The game will soon have sprites added in the form of small vehicles being drawn at player positions (and leaving behind "light paths"). When a player runs into a wall or another light path, an explosion sprite will be drawn as well.

### Improved AI

The game could be more engaging if the AI were given difficulty levels. This could be done by increasing or decreasing the "sight" of the AI; the shorter the sight, the better the AI, as players can undercut the AI sight and cause it to continue forward into a light path.
