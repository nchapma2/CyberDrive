import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  let music = new Audio('./images/music.mp3');
  music.play();
  let isPlaying = true;
  let musicPlay = function() {
    if(isPlaying){
      isPlaying = false;
      music.pause();
    } else {
      isPlaying = true;
      music.play();
    }
  };

  $('.music-player').click(musicPlay);
  $('#player-details').hide();
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let posX = 0;
  let posY = 0;


  let gameView = new GameView(ctx);
  gameView.playerSelect();

});
