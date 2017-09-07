import Game from './game';
import Cycle from './cycle';
import Board from './board';



document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let posX = 0;
  let posY = 0;
  for(let i = 25; i < 700; i += 25) {
    ctx.beginPath();
    ctx.strokeStyle = '#18CAE6';
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 500);
    ctx.stroke();
  }
  for(let i = 25; i < 500; i += 25){
    ctx.beginPath();
    ctx.strokeStyle = '#18CAE6';
    ctx.moveTo(0, i);
    ctx.lineTo(700, i);
    ctx.stroke();
  }

  window.game = new Game(1, ctx);

  let gameLoop = setInterval( () => {

    game.moveCycles();
    game.draw();
    console.log(game.player1.pos);
  }, 40);
});
