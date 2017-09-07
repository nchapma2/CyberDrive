class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }

  animate(){
    game.moveCycles();

    game.draw();
    requestAnimationFrame(this.animate);
  }

}
