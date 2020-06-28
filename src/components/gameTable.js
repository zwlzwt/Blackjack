import React, { useEffect } from 'react';
import styled from 'styled-components';

import CardList from './cardList'


const Table = styled.div`
  width: 90%;
  height: 500px;
  margin: 10px;
  border-radius: 20px;
  border: solid #444242;
  background-color: #33a233;
  box-shadow: 2px 2px 5px #807b7b;
`


function GameTable({
  status,
  playerScore,
  playerMinScore,
  dealerMinScore,
  dealerScore,
  dealerCards,
  playerCards,
  isPlaying,
  stand,
  dispatch
}) {

  useEffect(() => {
    let timeID
    if(status) {
      timeID = window.setTimeout(() => {
        dispatch({ type: 'status', msg: status })
        
      }, 800);
    }
    return () => {
      window.clearTimeout(timeID);
    }
  }, [dispatch, status])

  return (
    <Table>
      <CardList 
        cardDisplay="Dealer:"
        cardTotal={dealerScore}
        cardTotalAlt={dealerMinScore}
        cards={dealerCards}
        isPlaying={isPlaying}
        stand={stand}
        />
      <CardList 
        cardDisplay="Player:"
        cardTotal={playerScore}
        cardTotalAlt={playerMinScore}
        cards={playerCards} 
        />
    </Table>
  )
}

export default GameTable;