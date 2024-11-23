import React from 'react';
import MazeCell from './MazeCell';

const MazeGrid = ({ maze, cellSize = 25 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-0">
      {maze.map((row, i) => (
        <div key={i} className="flex gap-0">
          {row.map((cell, j) => (
            <MazeCell key={`${i}-${j}`} cell={cell} size={cellSize} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MazeGrid;