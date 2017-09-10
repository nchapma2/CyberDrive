import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let posX = 0;
  let posY = 0;


  let gameView = new GameView(ctx);
  gameView.playerSelect();
  gameView.game.drawBoard();
  // gameView.start();

});
