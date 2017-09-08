import Board from './board';
import Cycle from './cycle';

class Game {
  constructor(numPlayers, ctx){
    this.Board = new Board();
    this.board = this.Board.board;
    this.players = [];
    this.ctx = ctx;
    this.numPlayers = numPlayers ;
    this.won = false;
    this.addCycles();
    this.checkWallCollision = this.checkWallCollision.bind(this);
    this.checkPathCollision = this.checkPathCollision.bind(this);
  }

  addCycles(){
    this.players.push(new Cycle({name: 'nate', pos: [1, 1], dir: [1, 0], number: 1}));
    if(this.numPlayers === 2){
      this.players.push(new Cycle({name: 'kyle', color: "rgba(255,230,77, .5)", pos:[100, 140], dir: [-1, 0], number: 2}));
    }

  }

  moveCycles(){
    this.players.forEach(player => {
      player.move();
    });
    this.checkCollision();
    this.players.forEach(player => {
      this.Board.fillPath(player);
    });
  }

  draw(){
    this.players.forEach(player => {
      this.ctx.fillStyle = player.color;
      this.ctx.fillRect((player.pos[1] - 1) * 5,
      (player.pos[0] - 1) * 5, 10, 10);
    });
    }


  checkCollision(){
    if(this.checkWallCollision() || this.checkPathCollision()){
      this.won = true;
      return true;
    }
  }

  checkWallCollision(){
    let collision = false;
    this.players.forEach(player => {
      if(player.pos[1] < -1 || player.pos[1] > 140 ||
        player.pos[0] < 1 || player.pos[0] > 100){
          alert('hit a wall');
          collision = true;
        }
    });
    return collision;
  }

  checkPathCollision(){
    let collision = false;
    this.players.forEach(player => {
      if(this.board[player.pos[0]][player.pos[1]] === 1){
        alert('hit a light path');
        collision = true;
      }
    });
    return collision;
  }

}

export default Game;
