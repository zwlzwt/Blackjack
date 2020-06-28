import React from 'react';
import styled, { keyframes } from 'styled-components'


const showOut = keyframes`
  from{
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
  
`

const MessageBg = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(100,100,100,0.2);
`

const Message = styled.p`
  text-align: center;
  margin: 100px 0;
  padding: 100px 0;
  font-size: 5em; 
  font-weight: bolder;
  background-color: rgba(0,24,0,0.15);
  border-style: solid;
  border-width: 2px;
  width: 95%;
  cursor: pointer;
  animation: ${showOut} 0.5s linear;
`



const GameMessage = ({
  wallet,
  bet,
  gameMsg,
  dispatch
}) => {

  const resetGame = () => {
    let chips = wallet;
    //Calculate chips
    if (gameMsg === "Push") {
      chips = chips + bet;
    } else if (gameMsg === "Player Wins!!!") {
      chips = chips + (bet * 2);
    } else if (gameMsg === 'Dealer Bust!!!') {
      chips = chips + bet;
    }
    dispatch({ type: 'resetGame', chips })
  }


  return (
    <MessageBg>
      <Message onClick={() => resetGame()}>{gameMsg}</Message>
    </MessageBg>
  );
};

export default GameMessage;