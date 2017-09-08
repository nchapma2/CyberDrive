class Cycle {
  constructor(){
    this.pos = [1, 1];
    this.color = "rgba(246,106,53, .5)";
    this.dir = [1, 0];
    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    this.keyPress = e => {
      console.log(e.key);
      switch(e.key){
        case "w":
          this.attemptTurn("w");
          break;
        case "a":
          this.attemptTurn("a");
          break;
        case "s":
          this.attemptTurn("s");
          break;
        case "d":
          this.attemptTurn("d");
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "ArrowDown":
        case "ArrowRight":

      }
    };
    document.addEventListener('keydown', this.keyPress);
  }

  attemptTurn(key){
    if(!(Cycle.P1TURNS[key][0] + this.dir[0] === 0 &&
       Cycle.P1TURNS[key][1] + this.dir[1] === 0)){
      this.dir = Cycle.P1TURNS[key];
    }
  }

  move(){
    this.pos = [this.pos[0] + this.dir[1], this.pos[1] + this.dir[0]];
  }

}

Cycle.P2TURNS = {
  "ArrowUp": [0, -1],
  "ArrowLeft": [-1, 0],
  "ArrowDown": [0, 1],
  "ArrowRight": [1, 0]
};

Cycle.P1TURNS = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

export default Cycle;
