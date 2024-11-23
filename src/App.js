import React, { useState, useEffect } from 'react';
import MazeGrid from './components/MazeGrid';
import { createEmptyMaze, randomDFS } from './utils/mazeGenerators';
import { bfs, dfs, aStar, dijkstra, greedyBestFirst } from './utils/pathFinders';

const MAZE_SIZE = 15;

const algorithms = {
  bfs: { name: 'Breadth-First Search', fn: bfs },
  dfs: { name: 'Depth-First Search', fn: dfs },
  aStar: { name: 'A* Search', fn: aStar },
  dijkstra: { name: 'Dijkstra\'s Algorithm', fn: dijkstra },
  greedy: { name: 'Greedy Best-First Search', fn: greedyBestFirst },
};

function App() {
  const [maze, setMaze] = useState([]);
  const [originalMaze, setOriginalMaze] = useState([]); // Store the original maze
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bfs');
  const [algorithmStats, setAlgorithmStats] = useState({}); // Store stats for all algorithms

  const generateNewMaze = async () => {
    setIsGenerating(true);
    setAlgorithmStats({}); // Reset stats when generating new maze
    const newMaze = createEmptyMaze(MAZE_SIZE, MAZE_SIZE);
    setMaze(newMaze);

    const steps = randomDFS(newMaze);
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setMaze(prevMaze => {
        const newMaze = prevMaze.map(row => row.map(cell => cell.clone()));
        newMaze[step.row][step.col] = step;
        return newMaze;
      });
      await new Promise(resolve => setTimeout(resolve, 20));
    }

    newMaze[0][0].isStart = true;
    newMaze[MAZE_SIZE - 1][MAZE_SIZE - 1].isEnd = true;
    
    // Store the original maze
    const finalMaze = newMaze.map(row => row.map(cell => cell.clone()));
    setOriginalMaze(finalMaze);
    setMaze(finalMaze);
    setIsGenerating(false);
  };

  const resetMaze = () => {
    // Reset maze to original state without solving paths
    const resetMaze = originalMaze.map(row => 
      row.map(cell => {
        const newCell = cell.clone();
        newCell.isVisited = false;
        newCell.isPath = false;
        newCell.isCurrent = false;
        return newCell;
      })
    );
    setMaze(resetMaze);
  };

  const solveMaze = async () => {
    if (isGenerating || isSolving) return;
    setIsSolving(true);
  
    resetMaze(); // Reset maze before new solve
  
    // Create a working copy of the maze
    const mazeCopy = maze.map(row => 
      row.map(cell => {
        const newCell = cell.clone();
        newCell.isVisited = false;
        newCell.isPath = false;
        newCell.isCurrent = false;
        return newCell;
      })
    );
  
    const start = mazeCopy[0][0];
    const end = mazeCopy[mazeCopy.length - 1][mazeCopy[0].length - 1];
    
    const startTime = performance.now();
    const { path, steps } = algorithms[selectedAlgorithm].fn(mazeCopy, start, end);
  
    // Visualize the search process
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setMaze(prevMaze => {
        const newMaze = prevMaze.map(row => row.map(cell => cell.clone()));
        newMaze[step.row][step.col].isVisited = true;
        newMaze[step.row][step.col].isCurrent = step.isCurrent;
        return newMaze;
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  
    // Highlight the final path
    if (path.length > 0) {
      for (let i = 0; i < path.length; i++) {
        const cell = path[i];
        setMaze(prevMaze => {
          const newMaze = prevMaze.map(row => row.map(cell => cell.clone()));
          newMaze[cell.row][cell.col].isPath = true;
          return newMaze;
        });
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  
    const endTime = performance.now(); // Moved to after animations
    const timeElapsed = Math.round(endTime - startTime);
  
    // Update stats for this algorithm
    setAlgorithmStats(prevStats => ({
      ...prevStats,
      [selectedAlgorithm]: {
        steps: steps.length,
        pathLength: path.length,
        time: timeElapsed,
        timeInSeconds: (timeElapsed / 1000).toFixed(2) // Added seconds conversion
      }
    }));
  
    setIsSolving(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Maze Generator & Solver</h1>
          <div className="flex flex-col gap-4 items-center mb-8">
            <div className="flex gap-4">
              <button
                onClick={generateNewMaze}
                disabled={isGenerating || isSolving}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg disabled:opacity-50"
              >
                Generate New Maze
              </button>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="bg-gray-700 px-4 py-2 rounded-lg"
                disabled={isGenerating || isSolving}
              >
                {Object.entries(algorithms).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
              <button
                onClick={solveMaze}
                disabled={isGenerating || isSolving}
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg disabled:opacity-50"
              >
                Solve Maze
              </button>
            </div>

            {/* Algorithm Statistics */}
            {Object.keys(algorithmStats).length > 0 && (
  <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-4 mt-4">
    <h3 className="text-lg font-semibold mb-2">Algorithm Performance</h3>
    <div className="grid grid-cols-1 gap-2">
      {Object.entries(algorithmStats).map(([algo, stats]) => (
        <div key={algo} className="flex justify-between items-center bg-gray-700 rounded p-2">
          <span className="font-medium">{algorithms[algo].name}</span>
          <div className="text-sm">
            <span className="mr-4">Steps: {stats.steps}</span>
            <span className="mr-4">Path Length: {stats.pathLength}</span>
            <span className="text-green-400">Time: {stats.timeInSeconds}s</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
        </div>

        <div className="flex justify-center">
          <MazeGrid maze={maze} />
        </div>
        
        <div className="mt-8 text-center text-gray-400">
          <p>Green: Start • Red: End • Blue: Current • Light Green: Visited • White: Path</p>
        </div>
      </div>
    </div>
  );
}

export default App;