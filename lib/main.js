import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let posX = 0;
  let posY = 0;

  // for(let i = 25; i < 700; i += 25){
  //   let j = 0;
  //   setInterval()
  // }

  for(let j = 0; j < 700; j+= 1){
      for(let i = 25; i < 700; i += 25) {
        setTimeout(() => {
          ctx.beginPath();
          ctx.strokeStyle = '#18CAE6';
          ctx.moveTo(i, j);
          ctx.lineTo(i, j + 1);
          ctx.stroke();
          ctx.moveTo(j, i);
          ctx.lineTo(j + 1, i);
          ctx.stroke();
        }, 0);
      }
  }
  // let game = new Game(1, ctx);
  let gameView = new GameView(ctx);
  // gameView.animate();
  gameView.start();

  // let gameLoop = setInterval(() => {
  //   game.moveCycles();
  //   game.draw();
  //   console.log(game.player1.pos);
  // }, 16);

  //   function animate(){
  //   game.moveCycles();
  //   game.draw();
  //   console.log(game.player1.pos);
  //   setTimeout(() => {
  //     requestAnimationFrame(animate);
  //   }, 16);
  // }
  // animate();
});
