import Board from './board';
import Cycle from './cycle';

class Game {
  constructor(board, numPlayers, ctx){
    this.board = new Board();
    this.numPlayers = 1;
    this.addCycles();
    debugger
  }

  addCycles(){
    if(this.numPlayers === 1){
      this.player1 = new Cycle();
    }
  }



}

export default Game;
