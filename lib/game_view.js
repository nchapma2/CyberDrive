import Game from './game';

class GameView {
  constructor(ctx){
    this.ctx = ctx;
    this.game = new Game(2, this.ctx);
    this.animate = this.animate.bind(this);
    this.numPlayers = 0;
    this.players = {};
    this.flashMessage = null;
    this.numPlayersEvent = this.numPlayersEvent.bind(this);
    this.setupPlayers = this.setupPlayers.bind(this);
    this.reset = this.reset.bind(this);
  }

  setupForm(numPlayers){
    this.numPlayers = numPlayers;
    let playerDetails = $('#player-details');
    let form = $('#player-form');
    form.off('submit', this.setupPlayers);
    form.submit(this.setupPlayers);
    $('#player-id').text('Player 1');
    $('.controls').text('Controls: W A S D');
    playerDetails.show();
  }

  setupPlayers(e){
    e.preventDefault();
    e.stopPropagation();
    let name = $('.name').val();
    $('.name').val("");
    let color = $('.driver-color').val();
    $('.driver-color').val("");
    if(!this.players.player1){
      this.players.player1 = {name, color};
      if(this.numPlayers === 1){
        $('#player-select-div').hide();
        this.game.addCycles(this.players);
        this.game.drawBoard();
        this.start();
      } else {
        $('#player-id').text('Player 2');
        $('.controls').text('Controls: Up Down Left Right');
      }
    } else if(this.numPlayers === 2) {
      this.players.player2 = {name, color};
      $('#player-select-div').hide();
      this.game.addCycles(this.players);
      this.game.drawBoard();
      this.start();
    }
  }

  numPlayersEvent(){
    event.preventDefault();
    if(event.key === '1' || event.key === '2'){
      clearInterval(this.flashMessage);
      let select = $('#flash-player-select');
      select.hide();
      document.removeEventListener('keydown', this.numPlayersEvent);
      this.setupForm(parseInt(event.key));
    }
  }

  playerSelect(){
    let playerDetails = $('#player-details');
    playerDetails.hide();
    let selectDiv = $('#player-select-div');
    selectDiv.show();
    let select = $('#flash-player-select');
    this.flashMessage = setInterval(() => {
      select.fadeIn(800);
      select.fadeOut(800);
    }, 1700);
    document.addEventListener('keydown', this.numPlayersEvent);
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
      p.fadeOut(600);
      // snd1.play();
      i -= 1;
      if(i === 0){
        clearInterval(countdown);
        setTimeout(() => {
          p.text('BATTLE!');
          p.fadeIn(800);
          p.fadeOut(500);
          // snd2.play();
        }, 1200);
      }
    }, 1400);
    setTimeout(() => {
      this.animate();
    }, 6800);
  }

  reset(e) {
    event.preventDefault();
    console.log(e);
    if(event.key === "y"){
      $('#countdown').fadeOut(100);
      this.game.resetBoard();
      this.game.resetPlayers();
      this.game.drawBoard();
      document.removeEventListener('keydown', this.reset);
      this.start();
    } else if(event.key === "n"){
      document.removeEventListener('keydown', this.reset);
      $('#countdown').fadeOut(100);
      this.game.resetBoard();
      this.game.players.forEach(player => {
        player.removeHandler();
      });
      this.game.players = [];
      this.players = {};
      this.playerSelect();
    }
  }

  animate(){
    this.game.moveCycles();
    this.game.draw();
    setTimeout(() => {
      if(!this.game.won){
        requestAnimationFrame(this.animate.bind(this));
      } else {
        setTimeout(() => {
          this.game.gameOver();
        }, 800);
        document.addEventListener('keydown', this.reset);
      }
    }, 16);
  }
}

export default GameView;
