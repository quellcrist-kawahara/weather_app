import React from 'react';

const GameStatus = ({results}) => {
  const isWin = results.filter(i => i.result).length >= 3;
   
  return (
    <h1 style={{color: isWin ? 'green' : 'red'}}>You {isWin ? 'won' : 'lost'}</h1>
  )
}

export default GameStatus;