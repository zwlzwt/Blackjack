import React, { useReducer } from 'react';
import styled from 'styled-components'

import BettingTable from './components/bettingTable'
import Controller from './components/controller'
import GameTable from './components/gameTable'
import GameMessage from './components/message'
import Setting from './components/settingModal'

import reducer from './reducer'

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const HeadLine = styled.img`
  height: 50px;
`

const Title = styled.h1`
  letter-spacing: 4px;
`

const PlayerTable = styled.div`
  display: flex;
  align-items: center;
`

const initalState = {
  deck: [],
  dealerCards: [],
  dealerDarkCard: [],
  playerCards: [],
  bet: 0,
  minBet: 10,
  wallet: 1000,
  isPlaying: false,
  stand: false,
  gameMsg: null
}



function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  

  const calcCardTotal = (cards, eleven) => {
    let sum = Object.keys(cards).reduce((total, card) => {
      let cardVal = cards[card].cardValue;
      cardVal = (cardVal === 1 && eleven) ? 11 : cardVal;
      return total + cardVal;
    }, 0);
    return sum;
  };

  const checkDealerStatus = (dealerCards, playerTotal) => {
    let t1, t2, status = "";

    t1 = calcCardTotal(dealerCards, false);
    t2 = calcCardTotal(dealerCards, true);

    if ((t1 <= 21 && t1 === playerTotal) || (t2 <= 21 && t2 === playerTotal)) {
      status = "Push";
    }
    else if ((t1 <= 21 && t1 > playerTotal) || (t2 <= 21 && t2 > playerTotal)) {
      status = "Dealer wins!!!";
    } else if((t1 <= 21 && t1 < playerTotal) || (t2 <= 21 && t2 < playerTotal)) {
      status = "Player Wins!!!"
    }

    return status;
  };

  const checkBust = (player, role) => {
    let t1, t2, min, status = "";
    t1 = calcCardTotal(player, false);
    t2 = calcCardTotal(player, true);
    min = Math.min(t1, t2);
    if (min > 21 && role === 'player') {
      status = "Player Bust!!!";
    } 
    if (min > 21 && role === 'dealer') {
      status = "Dealer Bust!!!";
    } 

    return status
  }

  const playerScore = calcCardTotal(state.playerCards, true)
  const playerMinScore = calcCardTotal(state.playerCards, false)
  const dealerScore = calcCardTotal(state.dealerCards, true)
  const dealerMinScore = calcCardTotal(state.dealerCards, false)

  const gameStatus = () => {
    let msg = null;
    if (checkBust(state.dealerCards, 'dealer')) {
      msg = checkBust(state.dealerCards, 'dealer')
    } else if (checkBust(state.playerCards, 'player')) {
      msg = checkBust(state.playerCards, 'player')
    } 
    return msg;
  }

  return (
    <div>
      <Header>
        <HeadLine src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/poker_logo2.png" alt="Poker Logo"/>
        <Title>BLACKJACK</Title>
        <GameTable
          status={gameStatus()}
          playerMinScore={playerMinScore}
          dealerMinScore={dealerMinScore}
          playerScore={playerScore}
          dealerScore={dealerScore}
          dealerCards={state.dealerCards}
          playerCards={state.playerCards}
          isPlaying={state.isPlaying}
          stand={state.stand}
          dispatch={dispatch}
        />
        <PlayerTable>
          <Setting
            minBet={state.minBet}
            wallet={state.wallet}
            dispatch={dispatch}
        />
          <Controller
            checkDealerStatus={checkDealerStatus}
            playerMinScore={playerMinScore}
            playerScore={playerScore}
            dealerScore={dealerScore}
            deck={state.deck}
            dealerCards={state.dealerCards}
            dealerDarkCard={state.dealerDarkCard}
            playerCards={state.playerCards}
            bet={state.bet}
            minBet={state.minBet}
            isPlaying={state.isPlaying}
            stand={state.stand}
            dispatch={dispatch}
          />
          <BettingTable
            wallet={state.wallet}
            bet={state.bet}
            isPlaying={state.isPlaying}
            dispatch={dispatch}
          />
        </PlayerTable>
        {
          state.gameMsg 
          &&
          <GameMessage
            wallet={state.wallet}
            bet={state.bet}
            gameMsg={state.gameMsg}
            dispatch={dispatch}
          />
        }
        
      </Header>
    </div>
  )
}

export default App;
