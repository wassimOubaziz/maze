import { Cell } from './Cell';

export const createEmptyMaze = (rows, cols) => {
  const maze = Array(rows).fill().map(() => Array(cols).fill(null));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      maze[i][j] = new Cell(i, j);
    }
  }
  return maze;
};

export const getNeighbors = (maze, cell) => {
  const { row, col } = cell;
  const neighbors = [];
  const directions = [
    { row: -1, col: 0, wall: 'top' },
    { row: 1, col: 0, wall: 'bottom' },
    { row: 0, col: -1, wall: 'left' },
    { row: 0, col: 1, wall: 'right' },
  ];

  directions.forEach(({ row: r, col: c, wall }) => {
    const newRow = row + r;
    const newCol = col + c;
    if (
      newRow >= 0 &&
      newRow < maze.length &&
      newCol >= 0 &&
      newCol < maze[0].length
    ) {
      neighbors.push({ cell: maze[newRow][newCol], wall });
    }
  });

  return neighbors;
};

export const randomDFS = (maze) => {
  const startCell = maze[0][0];
  const stack = [startCell];
  startCell.visited = true;

  const steps = [];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const unvisitedNeighbors = getNeighbors(maze, current).filter(
      ({ cell }) => !cell.visited
    );

    if (unvisitedNeighbors.length === 0) {
      stack.pop();
      continue;
    }

    const { cell: next, wall } = unvisitedNeighbors[
      Math.floor(Math.random() * unvisitedNeighbors.length)
    ];

    current.walls[wall] = false;
    next.walls[
      wall === 'top'
        ? 'bottom'
        : wall === 'bottom'
        ? 'top'
        : wall === 'left'
        ? 'right'
        : 'left'
    ] = false;

    next.visited = true;
    stack.push(next);
    steps.push(current.clone());
  }

  return steps;
};