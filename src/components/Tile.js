import React from 'react';
import './Tile.css';

const Tile = ({ value }) => {
  const getTileClass = () => {
    if (!value) return 'tile empty';
    return `tile tile-${value}`;
  };

  return (
    <div className={getTileClass()}>
      {value || ''}
    </div>
  );
};

export default Tile;