import Board from './board';
import Cycle from './cycle';

class Game {
  constructor(numPlayers, ctx){
    this.Board = new Board();
    this.board = this.Board.board;
    this.ctx = ctx;
    this.numPlayers = 1;
    this.addCycles();
    this.checkWallCollision = this.checkWallCollision.bind(this);
    this.checkPathCollision = this.checkPathCollision.bind(this);
  }

  addCycles(){
    if(this.numPlayers === 1){
      this.player1 = new Cycle();
    }
  }

  moveCycles(){
    this.player1.move();
    this.checkCollision();
    this.Board.fillPath(this.player1);
  }

  draw(){
    this.ctx.fillStyle = this.player1.color;
    this.ctx.fillRect((this.player1.pos[1] - 1) * 10,
     (this.player1.pos[0] - 1) * 10, 10, 10);
  }

  checkCollision(){
    if(this.checkWallCollision() || this.checkPathCollision()){
      return true;
    }
  }

  checkWallCollision(){
    if(this.player1.pos[1] < -1 || this.player1.pos[1] > 70 ||
       this.player1.pos[0] < 1 || this.player1.pos[0] > 50){
         alert('hit a wall');
         return true;
    }
  }

  checkPathCollision(){
    if(this.board[this.player1.pos[0]][this.player1.pos[1]] === 1){
      alert('hit a light path');
      return true;
    }
  }

}

export default Game;
