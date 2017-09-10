import Game from './game';

class GameView {
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game(2, this.ctx);
    this.animate = this.animate.bind(this);
  }

  initialize(e){
    console.log(e);
  }



  playerSelect(){
    document.addEventListener('keydown', (e) => {
      clearInterval(flashMessage);
      selectDiv.hide();
      this.initialize(e);
    });
    let selectDiv = $('#player-select-div');
    let select = $('#flash-player-select');
    let flashMessage = setInterval(() => {
      select.fadeIn(800);
      select.fadeOut(800);
    }, 1700);
  }

  start(){
    this.game.draw();
    let i = 3;
    let p = $('#countdown');
    let countdown = setInterval(() => {
      p.text(`${i}`);
      p.fadeIn(600);
      p.fadeOut(600);
      i -= 1;
      if(i === 0){
        clearInterval(countdown);
        setTimeout(() => {
          p.text('BATTLE!');
          p.fadeIn(800);
          p.fadeOut(500);
        }, 1200);
      }
    }, 1400);
    setTimeout(() => {
      console.log('now');
      this.animate();
    }, 6800);
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
