import Game from './game';

class GameView {
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game(2, this.ctx);
    this.animate = this.animate.bind(this);
  }

  initialize(numPlayers){
    console.log(numPlayers);
  }



  playerSelect(){
    document.addEventListener('keydown', (e) => {
      console.log(e);
      if(e.key === '1' || e.key === '2'){
        clearInterval(flashMessage);
        selectDiv.hide();
        this.initialize(parseInt(e.key));
      }
    });
    let selectDiv = $('#player-select-div');
    let select = $('#flash-player-select');
    let flashMessage = setInterval(() => {
      select.fadeIn(800);
      select.fadeOut(800);
    }, 1700);
  }

  start(){
    let snd1 = new Audio('./images/count.ogg');
    let snd2 = new Audio('./images/start.ogg');
    this.game.draw();
    let i = 3;
    let p = $('#countdown');
    let countdown = setInterval(() => {

      p.text(`${i}`);
      p.fadeIn(600);
      snd1.play();
      p.fadeOut(600);
      i -= 1;
      if(i === 0){
        clearInterval(countdown);
        setTimeout(() => {
          p.text('BATTLE!');
          p.fadeIn(800);
          snd2.play();
          p.fadeOut(500);
        }, 1200);
      }
    }, 1400);
    setTimeout(() => {
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
