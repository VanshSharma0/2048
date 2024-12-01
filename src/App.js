import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    // Retrieve best score from local storage
    const savedBestScore = localStorage.getItem('2048-best-score');
    return savedBestScore ? parseInt(savedBestScore) : 0;
  });

  const updateScore = (newScore) => {
    setScore(newScore);
    
    // Update best score if necessary
    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem('2048-best-score', newScore.toString());
    }
  };

  const resetGame = () => {
    setScore(0);
  };

  return (
    <div className="app">
      <header>
        <h1>2048 Game</h1>
      </header>
      <ScoreBoard score={score} bestScore={bestScore} />
      <GameBoard 
        onScoreChange={updateScore} 
        currentScore={score}
      />
      <div className="game-instructions">
        <p>Use arrow keys or buttons to move tiles. Merge tiles with the same number!</p>
      </div>
    </div>
  );
}

export default App;