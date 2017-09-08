import Game from './game';

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }

  start(){
    let i = 3;
    let p = $('#countdown');
    let countdown = setInterval(() => {
      p.text(`${i}`);
      p.fadeIn(600);
      p.fadeOut(600);
      i -= 1;
      if(i === 0){
        clearInterval(countdown);
      }
    }, 1200);
    setTimeout(() => {
      p.text('BATTLE!');
      p.fadeIn(800);
      p.fadeOut(500);
    }, 4800);
    setTimeout(() => {
      this.animate();
    }, 6200);
  }

  animate(){

    this.game.moveCycles();
    this.game.draw();
    setTimeout(() => {
      if(!this.game.won){
        requestAnimationFrame(this.animate.bind(this));
      } else {
        alert('game over');
      }
    }, 16);
  }
}

export default GameView;
