import React, { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import cards from '../card'


const ControlBar = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  &:hover {
    border: 1px solid #071982;
    color: #80ffd3;
  }
  &:disabled {
    background: gray;
    pointer-events: none;
  }
  &:focus {
    outline: none;
  }
  color: #fff;
  width: 130px;
  background-color: #EFEFEF;
  border: none;
  border-radius: 25px;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.1em;
  margin: 12px;
  vertical-align: top;
  height: 50px;
  background: #262730;
  cursor: pointer;
`

function shuffle(a) {
  let t, i = a.length;

  // For each element in the array, swap it with a random
  // element (which might be itself)
  while (i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)) | 0;
    t = a[randomIndex];
    a[randomIndex] = a[i];
    a[i] = t;
  }
  return a;
}

const checkDeck = (deck) => {
  return deck.length < 10 ? deck.concat(shuffle(cards)) : deck;
};

function Controller({
  checkDealerStatus,
  stand,
  playerScore,
  playerMinScore,
  dealerScore,
  deck,
  dealerCards,
  dealerDarkCard,
  playerCards,
  isPlaying,
  bet,
  minBet,
  dispatch
}) {

  useEffect(() => {
    const newDeck = checkDeck(deck);
    let timeID
    let playerTotal = Math.max(playerScore, playerMinScore)
    if (playerTotal > 21) {
      playerTotal = Math.min(playerScore, playerMinScore);
    }
    if (dealerScore < 17 && stand) {
      dispatch({
        type: 'dealerHit',
        deck: newDeck,
        dealerCards: drawCards(newDeck, dealerCards, 1)
      })
    } else if(dealerScore >= 17 && dealerScore <=21 && stand) {
      timeID = window.setTimeout(() => {
        dispatch({ type: 'status', msg: checkDealerStatus(dealerCards, playerTotal) })
      }, 800);      
    }
    return () => {
      window.clearTimeout(timeID);
    }
  }, [dealerScore, stand])


  const drawCards = (deck, playerCards, numberOfCards) => {
    while (numberOfCards--) {
      let card = deck.pop();
      playerCards.push(card);
    }
    return playerCards;
  };

  const handleDeal = () => {
    const newDeck = checkDeck(deck);

    dispatch({
      type: 'initalDark',
      deck: newDeck,
      dealerDarkCard: drawCards(newDeck, dealerDarkCard, 1)
    })
    dispatch({ 
      type: 'initalDeck', 
      deck: newDeck, 
      dealerCards: drawCards(newDeck, dealerCards, 1),
      playerCards: drawCards(newDeck, playerCards, 2)
    });
  }


  const handleHit = () => {
    const newDeck = checkDeck(deck);
    
    dispatch({
      type: 'hitDeck',
      deck: newDeck,
      playerCards: drawCards(newDeck, playerCards, 1)
    })
  }; 

  const handleStand = () => {
    dispatch({ type: 'stand' })
    dispatch({ type: 'mergeCards' })
  }

  return (
    <ControlBar>
      {
        isPlaying 
      ? <Fragment>
          <Button
            disabled={!isPlaying || stand}
            onClick={() => handleHit()}
          >
            Hit
          </Button>
          <Button
            disabled={!isPlaying}
            onClick={() => handleStand()}
          >
            {stand ? 'Dealer Hit' : 'Stand'}
          </Button> 
        </Fragment>
      :
        <Fragment>
          <Button
            disabled={isPlaying}
            onClick={bet < minBet ? () => {} : () => handleDeal()}
          >
            Deal
          </Button>
          <Button
            disabled={isPlaying}
            onClick={() => dispatch({ type: 'clearBet' })}
          >
            Clear
          </Button>
        </Fragment>
      }
      
      
    </ControlBar>
  )
}

export default Controller