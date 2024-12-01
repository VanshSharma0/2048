import React, { useState, useEffect, useCallback } from "react";
import Tile from "./Tile";
import "../styles/GameBoard.css";

const GameBoard = ({ onScoreChange, currentScore }) => {
  // Helper functions defined before state
  const createInitialGrid = useCallback(() => {
    return Array(4).fill(null).map(() => Array(4).fill(null));
  }, []);

  const addRandomTile = useCallback((currentGrid) => {
    const grid = currentGrid || createInitialGrid();
    let emptyCells = [];
    grid.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (!cell) emptyCells.push([i, j]);
      })
    );
    
    if (emptyCells.length === 0) return grid;
    
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map(row => [...row]);
    newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    
    return newGrid;
  }, [createInitialGrid]);

  // Use state for grid
  const [gridState, setGridState] = useState(createInitialGrid());
  const [newTiles, setNewTiles] = useState([]);

  // Initial tile placement
  useEffect(() => {
    let newGrid = addRandomTile(gridState);
    newGrid = addRandomTile(newGrid);
    setGridState(newGrid);
  }, [addRandomTile]);

  // Memoize other helper functions
  const rotateGrid = useCallback((grid) => {
    return grid[0].map((val, index) => grid.map(row => row[index]).reverse());
  }, []);

  const moveLeft = useCallback((row) => {
    // Remove zeros
    const filteredRow = row.filter(cell => cell !== null);
    
    // Merge tiles
    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2;
        filteredRow.splice(i + 1, 1);
      }
    }
    
    // Pad with nulls
    while (filteredRow.length < 4) {
      filteredRow.push(null);
    }
    
    return filteredRow;
  }, []);

  const handleMove = useCallback((direction) => {
    let rotatedGrid = [...gridState];
    let moved = false;
    let newScore = currentScore;

    // Rotate grid to always move left
    switch (direction) {
      case 'up':
        rotatedGrid = rotateGrid(rotatedGrid);
        break;
      case 'right':
        rotatedGrid = rotatedGrid.map(row => row.reverse());
        break;
      case 'down':
        rotatedGrid = rotateGrid(rotateGrid(rotateGrid(rotatedGrid)));
        break;
      default: // left
        break;
    }

    // Move and merge
    const newGrid = rotatedGrid.map(row => {
      const movedRow = moveLeft(row);
      
      // Check if row changed
      if (JSON.stringify(movedRow) !== JSON.stringify(row)) {
        moved = true;
      }
      
      // Update score for merged tiles
      const mergedTiles = movedRow.filter(cell => cell !== null);
      mergedTiles.forEach(tile => {
        if (tile > 2) {
          newScore += tile;
        }
      });
      
      return movedRow;
    });

    // Rotate back
    let finalGrid;
    switch (direction) {
      case 'up':
        finalGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
        break;
      case 'right':
        finalGrid = newGrid.map(row => row.reverse());
        break;
      case 'down':
        finalGrid = rotateGrid(rotateGrid(newGrid));
        break;
      default: // left
        finalGrid = newGrid;
    }

    // Only update if move is valid
    if (moved) {
      setGridState(finalGrid);
      const newGridWithRandomTile = addRandomTile(finalGrid);
      if (newGridWithRandomTile) {
        setGridState(newGridWithRandomTile);
        const newTilePosition = newGridWithRandomTile.flatMap((row, i) =>
          row.map((cell, j) => (cell && !gridState[i][j] ? `${i}-${j}` : null))
        ).filter(Boolean);
        setNewTiles(newTilePosition);
      }
    }
    
    // Call onScoreChange if it's a prop
    if (onScoreChange) {
      onScoreChange(newScore);
    }
  }, [gridState, currentScore, rotateGrid, moveLeft, addRandomTile, onScoreChange]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          handleMove('up');
          break;
        case 'ArrowDown':
          handleMove('down');
          break;
        case 'ArrowLeft':
          handleMove('left');
          break;
        case 'ArrowRight':
          handleMove('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMove]);

  return (
    <div className="game-container">
      <div className="grid">
        {gridState.map((row, i) =>
          row.map((tile, j) => {
            const key = `${i}-${j}`;
            return (
              <Tile 
                key={key} 
                value={tile} 
                isNew={tile && newTiles.includes(key)}
                style={{
                  top: `${i * 110}px`,
                  left: `${j * 110}px`
                }}
              />
            );
          })
        )}
      </div>
      <div className="keyboard-container">
        <div className="keyboard-navigation">
          <button 
            className="direction-key up-key" 
            onClick={() => handleMove("up")}
          >
            ▲
          </button>
          <button 
            className="direction-key down-key" 
            onClick={() => handleMove("down")}
          >
            ▼
          </button>
          <button 
            className="direction-key left-key" 
            onClick={() => handleMove("left")}
          >
            ◀
          </button>
          <button 
            className="direction-key right-key" 
            onClick={() => handleMove("right")}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;