export class Cell {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.walls = { top: true, right: true, bottom: true, left: true };
      this.visited = false;
      this.isStart = false;
      this.isEnd = false;
      this.isPath = false;
      this.isVisited = false;
      this.isCurrent = false;
      this.parent = null;
    }
  
    reset() {
      this.isPath = false;
      this.isVisited = false;
      this.isCurrent = false;
      this.parent = null;
    }
  
    clone() {
      const newCell = new Cell(this.row, this.col);
      newCell.walls = { ...this.walls };
      newCell.visited = this.visited;
      newCell.isStart = this.isStart;
      newCell.isEnd = this.isEnd;
      newCell.isPath = this.isPath;
      newCell.isVisited = this.isVisited;
      newCell.isCurrent = this.isCurrent;
      newCell.parent = this.parent;
      return newCell;
    }
  }