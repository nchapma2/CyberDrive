class Cycle {
  constructor(){
    this.pos = [1,1];
    this.color = "rgba(246,106,53, .6)";
    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    this.keyPress = e => {
      switch(e.code){
        case "w":
          this.attemptTurn("w")
          break;
        case "a":
          this.attemptTurn("a")
          break;
        case "s":
          this.attemptTurn("s")
          break;
        case "d":
          this.attemptTurn("d")
          break;

      }
    }
  }

  attemptTurn(e)
}

Cycle.TURNS = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};
