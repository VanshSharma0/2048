import React from 'react';
import '../styles/ScoreBoard.css';

const ScoreBoard = ({ score, bestScore }) => {
  return (
    <div className="score-container">
      <div className="score-box">
        <span className="score-label">Score</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-box">
        <span className="score-label">Best</span>
        <span className="score-value">{bestScore}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;