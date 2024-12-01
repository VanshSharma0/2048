import React from 'react';
import '../styles/Tile.css';

const Tile = ({ value, isNew }) => {
  const getTileClass = () => {
    if (!value) return 'tile empty';
    const baseClass = `tile tile-${value}`;
    return isNew ? `${baseClass} new-tile` : baseClass;
  };

  return (
    <div className={getTileClass()}>
      {value || ''}
    </div>
  );
};

export default Tile;