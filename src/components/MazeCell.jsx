import React from 'react';

const MazeCell = ({ cell, size }) => {
  const getCellColor = () => {
    if (cell.isStart) return 'bg-maze-start';
    if (cell.isEnd) return 'bg-maze-end';
    if (cell.isPath) return 'bg-maze-path';
    if (cell.isCurrent) return 'bg-maze-current';
    if (cell.isVisited) return 'bg-maze-visited opacity-40';
    return 'bg-maze-wall'; // This will now be orange
  };

  const getBorderStyles = () => {
    return {
      borderTop: cell.walls.top ? '2px solid #ea580c' : 'none',     // Darker orange for borders
      borderRight: cell.walls.right ? '2px solid #ea580c' : 'none',
      borderBottom: cell.walls.bottom ? '2px solid #ea580c' : 'none',
      borderLeft: cell.walls.left ? '2px solid #ea580c' : 'none',
    };
  };

  return (
    <div
      className={`${getCellColor()} transition-all duration-200`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...getBorderStyles(),
      }}
    />
  );
};

export default MazeCell;