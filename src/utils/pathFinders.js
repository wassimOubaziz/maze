// Helper function for all algorithms
const getValidNeighbors = (maze, cell) => {
    const neighbors = [];
    const { row, col } = cell;
    
    const directions = [
      { dx: 0, dy: -1, wall: 'top' },
      { dx: 1, dy: 0, wall: 'right' },
      { dx: 0, dy: 1, wall: 'bottom' },
      { dx: -1, dy: 0, wall: 'left' }
    ];
  
    for (const dir of directions) {
      const newRow = row + dir.dy;
      const newCol = col + dir.dx;
  
      if (newRow >= 0 && newRow < maze.length && 
          newCol >= 0 && newCol < maze[0].length) {
        if (!cell.walls[dir.wall]) {
          neighbors.push(maze[newRow][newCol]);
        }
      }
    }
  
    return neighbors;
  };
  
  // 1. Breadth-First Search (BFS)
  export const bfs = (maze, start, end) => {
    const queue = [start];
    const visited = new Set([start]);
    const steps = [];
    
    while (queue.length > 0) {
      const current = queue.shift();
      current.isCurrent = true;
      steps.push(current.clone());
  
      if (current === end) {
        const path = reconstructPath(current);
        return { path, steps };
      }
  
      const neighbors = getValidNeighbors(maze, current);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          neighbor.parent = current;
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
      
      current.isCurrent = false;
    }
  
    return { path: [], steps };
  };
  
  // 2. Depth-First Search (DFS)
  export const dfs = (maze, start, end) => {
    const stack = [start];
    const visited = new Set([start]);
    const steps = [];
  
    while (stack.length > 0) {
      const current = stack.pop();
      current.isCurrent = true;
      steps.push(current.clone());
  
      if (current === end) {
        const path = reconstructPath(current);
        return { path, steps };
      }
  
      const neighbors = getValidNeighbors(maze, current);
      for (const neighbor of neighbors.reverse()) {
        if (!visited.has(neighbor)) {
          neighbor.parent = current;
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
      
      current.isCurrent = false;
    }
  
    return { path: [], steps };
  };
  
  // 3. A* Search Algorithm
  export const aStar = (maze, start, end) => {
    const openSet = [start];
    const closedSet = new Set();
    const gScore = new Map();
    const fScore = new Map();
    const steps = [];
  
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, end));
  
    while (openSet.length > 0) {
      const current = openSet.reduce((a, b) => 
        (fScore.get(a) < fScore.get(b) ? a : b));
      
      current.isCurrent = true;
      steps.push(current.clone());
  
      if (current === end) {
        const path = reconstructPath(current);
        return { path, steps };
      }
  
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.add(current);
  
      const neighbors = getValidNeighbors(maze, current);
      for (const neighbor of neighbors) {
        if (closedSet.has(neighbor)) continue;
  
        const tentativeGScore = gScore.get(current) + 1;
  
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeGScore >= gScore.get(neighbor)) {
          continue;
        }
  
        neighbor.parent = current;
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, gScore.get(neighbor) + heuristic(neighbor, end));
      }
      
      current.isCurrent = false;
    }
  
    return { path: [], steps };
  };
  
  function heuristic(cell, end) {
    return Math.abs(cell.row - end.row) + Math.abs(cell.col - end.col);
  }
  
  // 4. Dijkstra's Algorithm
  export const dijkstra = (maze, start, end) => {
    const distances = new Map();
    const unvisited = new Set(maze.flat());
    const steps = [];
  
    // Initialize distances
    for (const cell of unvisited) {
      distances.set(cell, Infinity);
    }
    distances.set(start, 0);
  
    while (unvisited.size > 0) {
      const current = Array.from(unvisited).reduce((a, b) => 
        distances.get(a) < distances.get(b) ? a : b);
      
      current.isCurrent = true;
      steps.push(current.clone());
  
      if (current === end) {
        const path = reconstructPath(current);
        return { path, steps };
      }
  
      unvisited.delete(current);
  
      const neighbors = getValidNeighbors(maze, current).filter(n => unvisited.has(n));
      for (const neighbor of neighbors) {
        const alt = distances.get(current) + 1;
        if (alt < distances.get(neighbor)) {
          distances.set(neighbor, alt);
          neighbor.parent = current;
        }
      }
      
      current.isCurrent = false;
    }
  
    return { path: [], steps };
  };
  
  // 5. Greedy Best-First Search
  export const greedyBestFirst = (maze, start, end) => {
    const openSet = [start];
    const closedSet = new Set();
    const steps = [];
  
    while (openSet.length > 0) {
      const current = openSet.reduce((a, b) => 
        heuristic(a, end) < heuristic(b, end) ? a : b);
      
      current.isCurrent = true;
      steps.push(current.clone());
  
      if (current === end) {
        const path = reconstructPath(current);
        return { path, steps };
      }
  
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.add(current);
  
      const neighbors = getValidNeighbors(maze, current);
      for (const neighbor of neighbors) {
        if (closedSet.has(neighbor)) continue;
  
        if (!openSet.includes(neighbor)) {
          neighbor.parent = current;
          openSet.push(neighbor);
        }
      }
      
      current.isCurrent = false;
    }
  
    return { path: [], steps };
  };
  
  // Helper function to reconstruct path
  function reconstructPath(endCell) {
    const path = [];
    let current = endCell;
    while (current !== null) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }