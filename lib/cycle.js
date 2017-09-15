class Cycle {
  constructor(options){
    this.name = options.name;
    this.ai = options.ai || false;
    this.playerNumber = options.playerNumber;
    this.pos = options.pos;
    this.color = options.color;
    this.dir = options.dir;
    this.crashed = false;
    this.bindKeyHandlers();
  }

  keyPress(e) {
    e.preventDefault();
    if(this.playerNumber === 1){
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
    } else if(this.playerNumber === 2) {
        switch(e.key){
          case "ArrowUp":
          this.attemptTurn("ArrowUp");
          break;
          case "ArrowLeft":
          this.attemptTurn("ArrowLeft");
          break;
          case "ArrowDown":
          this.attemptTurn("ArrowDown");
          break;
          case "ArrowRight":
          this.attemptTurn("ArrowRight");
          break;
        }
      }

  }

  bindKeyHandlers() {
    this.specificFunc = this.keyPress.bind(this);
    document.addEventListener('keydown', this.specificFunc);
  }

  removeHandler(){
    document.removeEventListener('keydown', this.specificFunc);
  }

  attemptTurn(key){
    if(this.playerNumber === 1){
      if(!(Cycle.P1TURNS[key][0] + this.dir[0] === 0 &&
        Cycle.P1TURNS[key][1] + this.dir[1] === 0)){
          this.dir = Cycle.P1TURNS[key];
        }
    } else if(this.playerNumber === 2){
      if(!(Cycle.P2TURNS[key][0] + this.dir[0] === 0 &&
        Cycle.P2TURNS[key][1] + this.dir[1] === 0)){
          this.dir = Cycle.P2TURNS[key];
        }
      }
  }

  move(){
    this.pos = [this.pos[0] + this.dir[1], this.pos[1] + this.dir[0]];
  }

  reset(){
    this.crashed = false;
    if(this.playerNumber === 1){
      this.pos = [1, 1];
      this.dir = [1, 0];
    } else if(this.playerNumber === 2){
      this.pos = [139, 139];
      this.dir = [-1, 0];
    } else if(this.playerNumber === 3){
      this.pos = [139, 90];
      this.dir = [0, -1];
    }
  }
}

Cycle.P1TURNS = {
  "w": [0, -1],
  "a": [-1 ,0],
  "s": [0, 1],
  "d": [1, 0]
};

Cycle.P2TURNS = {
  "ArrowUp": [0, -1],
  "ArrowLeft": [-1, 0],
  "ArrowDown": [0, 1],
  "ArrowRight": [1, 0]
};


Cycle.AI = {
  color: "rgba(0, 255, 255, 0.5)",
  ai: true,
  playerNumber: 3,
  pos: [139, 90],
  name: "CyberTron",
  dir: [0, -1]
};

export default Cycle;
