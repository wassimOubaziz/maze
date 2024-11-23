# Maze Generator & Solver

A React-based web application that generates random mazes and visualizes different pathfinding algorithms to solve them.

## Features

- Interactive maze generation using Randomized Depth-First Search algorithm
- Multiple pathfinding algorithms:
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - A* Search
  - Dijkstra's Algorithm
  - Greedy Best-First Search
- Real-time visualization of maze generation and solving process
- Performance statistics for each algorithm:
  - Number of steps explored
  - Final path length
  - Execution time
- Responsive design with a clean, modern interface

## Demo
[Live Demo](https://maze-sage-six.vercel.app/)

## Technologies Used

- React.js
- TailwindCSS
- JavaScript (ES6+)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/wassimOubaziz/maze.git
```

2. Navigate to the project directory:
```bash
cd maze
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Usage

1. Click "Generate New Maze" to create a random maze
2. Select a pathfinding algorithm from the dropdown menu
3. Click "Solve Maze" to visualize the solving process
4. Compare different algorithms using the performance statistics

## Color Guide

1. Green: Start position
2. Red: End position
3. Blue: Current cell being explored
4. Light Green: Visited cells
5. White: Final path

# Algorithm Details
## Maze Generation

* Uses Randomized Depth-First Search (DFS) with backtracking
* Ensures a perfect maze with exactly one path between any two points

# Pathfinding Algorithms

## Breadth-First Search (BFS)

* Guarantees the shortest path
* Explores cells in layers


## Depth-First Search (DFS)

* Memory-efficient
* May not find the shortest path


## A Search*

* Uses heuristics to find the optimal path
* Combines distance from start and estimated distance to end


## Dijkstra's Algorithm

* Guarantees the shortest path
* More efficient than BFS for weighted graphs


## Greedy Best-First Search

* Uses heuristics to make local optimal choices
* Faster but may not find the optimal path



# Contributing

* Fork the repository
* Create your feature branch (git checkout -b feature/AmazingFeature)
* Commit your changes (git commit -m 'Add some AmazingFeature')
* Push to the branch (git push origin feature/AmazingFeature)
* Open a Pull Request

# License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

* Inspired by various pathfinding visualizers
* Built with React and TailwindCSS
