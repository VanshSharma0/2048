import React from 'react';
import '../styles/Tile.css';

const Tile = ({ value, isNew, style }) => {
  const tileClass = value 
    ? `tile tile-${value} ${isNew ? 'new-tile' : ''}` 
    : 'tile empty';

  return (
    <div 
      className={tileClass} 
      style={{
        ...style,
        width: '90px',
        height: '90px',
        position: 'absolute'
      }}
    >
      {value || ''}
    </div>
  );
};

export default Tile;