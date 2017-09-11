import Board from './board';
import Cycle from './cycle';

class Game {
  constructor(numPlayers, ctx){
    this.Board = new Board();
    this.board = this.Board.board;
    this.players = [];
    this.ctx = ctx;
    this.phaser = new Audio('./images/phaser.mp3');
    this.explosion = new Audio('./images/explosion.mp3');
    this.cheer = new Audio('./images/cheer.mp3');
    this.won = false;
    this.checkWallCollision = this.checkWallCollision.bind(this);
    this.checkPathCollision = this.checkPathCollision.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  drawBoard(){
    this.phaser.play();
    for(let j = 0; j < 700; j+= 3){
        for(let i = 25; i < 700; i += 25) {
          setTimeout(() => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#18CAE6';
            this.ctx.moveTo(i, j);
            this.ctx.lineTo(i, j + 3);
            this.ctx.stroke();
            this.ctx.moveTo(j, i);
            this.ctx.lineTo(j + 3, i);
            this.ctx.stroke();
          }, 0);
        }
    }
  }

  addCycles(players){
    for(let i = 1; i < Object.keys(players).length + 1; i ++){
      players[`player${i}`].playerNumber = i;
      if(i === 1){
        players[`player${i}`].dir = [1, 0];
        players[`player${i}`].pos = [1, 1];
        this.players.push(new Cycle(players[`player${i}`]));
      } else {
        players[`player${i}`].dir = [-1, 0];
        players[`player${i}`].pos = [139, 138];
        this.players.push(new Cycle(players[`player${i}`]));
      }
    }
    if(Object.keys(players).length === 1){
      this.players.push(new Cycle(Cycle.AI));
    }
    return true;
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
      this.explosion.play();
      return true;
    }
  }

  checkWallCollision(){
    let collision = false;
    this.players.forEach(player => {
      if(player.pos[1] < -1 || player.pos[1] > 140 ||
        player.pos[0] < 1 || player.pos[0] > 140){
          player.crashed = true;
          collision = true;
        }
    });
    return collision;
  }

  checkPathCollision(){
    let collision = false;
    this.players.forEach(player => {
      if(this.board[player.pos[0]][player.pos[1]] === 1){
        player.crashed = true;
        collision = true;
      }
    });
    return collision;
  }

  gameOver(){
    let winner;
    for(let i = 0; i < this.players.length; i ++){
      if(!this.players[i].crashed){
        winner = this.players[i];
      }
    }
    let p = $('#countdown');
    p.text(`${winner.name} wins!`);
    p.fadeIn(600);
    this.cheer.play();
    setTimeout(() => {
      p.fadeOut(1000);
      setTimeout(() => {
        p.text('Again? Y or N');
        p.fadeIn(1000);
      }, 1000);
    }, 2200);
  }



  resetBoard(){
      this.Board = new Board();
      this.board = this.Board.board;
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, 700, 700);
      this.won = false;
  }

  resetPlayers(){
    this.players.forEach(player => player.reset());
  }
}

export default Game;
