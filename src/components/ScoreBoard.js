import React, { useEffect } from 'react';
import '../styles/ScoreBoard.css';

const ScoreBoard = ({ currentScore, bestScore }) => {
  useEffect(() => {
    // Update best score in local storage if current score is higher
    const storedBestScore = localStorage.getItem('bestScore') || 0;
    if (currentScore > storedBestScore) {
      localStorage.setItem('bestScore', currentScore);
    }
  }, [currentScore]);

  return (
    <div className="score-container">
      <div className="score-box">
        <div className="score-label">Score</div>
        <div className="score-value">{currentScore}</div>
      </div>
      <div className="score-box">
        <div className="score-label">Best</div>
        <div className="score-value">{bestScore}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;