class Cycle {
  constructor(){
    this.pos = [1, 1];
    this.color = "rgba(246,106,53, .5)";
    this.dir = [1, 0];
    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    this.keyPress = e => {
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
      }
    };
    document.addEventListener('keydown', this.keyPress);
  }

  attemptTurn(key){
    if(!(Cycle.TURNS[key][0] + this.dir[0] === 0 &&
       Cycle.TURNS[key][1] + this.dir[1] === 0)){
      this.dir = Cycle.TURNS[key];
    }
  }

  move(){
    this.pos = [this.pos[0] + this.dir[1], this.pos[1] + this.dir[0]];
  }

}

Cycle.TURNS = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

export default Cycle;
