const Board = require('./board');

class Game {
  constructor(board, numPlayers){
    this.board = new Board();
    this.numPlayers = 1;
  }
}
