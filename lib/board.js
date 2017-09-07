
class Board {
  constructor() {
    this.board = [];
    for(let i = 0; i < 50; i++) {
      this.board.push([]);
      for(let j = 0; j < 70; j++){
        this.board[i].push(0);
      }
    }
  }
}
export default Board;
