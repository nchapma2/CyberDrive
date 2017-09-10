
class Board {
  constructor() {
    this.board = [];
    for(let i = 0; i < 142; i++) {
      this.board.push([]);
      for(let j = 0; j < 140; j++){
        this.board[i].push(0);
      }
    }
  }

  fillPath(cycle){
    this.board[cycle.pos[0]][cycle.pos[1]] = 1;
  }
}
export default Board;
