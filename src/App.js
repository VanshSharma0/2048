import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import './App.css';

function App() {
  const [score, setScore] = useState(0);

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  return (
    <div className="app">
      <header>
        <h1>2048 Game</h1>
      </header>
      <ScoreBoard 
        currentScore={score} 
        bestScore={localStorage.getItem('bestScore') || 0} 
      />
      <GameBoard 
        onScoreChange={handleScoreChange} 
        currentScore={score} 
      />
      <div className="game-instructions">
        Use arrow keys or on-screen buttons to move tiles. 
        Combine tiles with the same number to score points!
      </div>
    </div>
  );
}

export default App;