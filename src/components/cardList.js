import React from 'react';
import styled, { keyframes } from 'styled-components';

const CardArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 258px;
`

const ScoreTitle = styled.h1`
  color: white;
  margin: 10px;
  background: #277d27;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  opacity: 0.65;
`

const PlayerArea = styled.div`
  display: flex;

`

const slidDown = keyframes`
  from{
    transform: translateY(-200px)
  }
  to {
    transform: translate(0px,0px)
  }
`

const Card = styled.img`
  animation: ${slidDown} 0.5s linear;
`

const DarkCardBack = styled.div`
  position: relative;
  box-shadow: 0 0 1px rgba(250,250,250,.15);
  border: 1px solid #bababa;
  width: 106px;
  height: 148px;
  border-radius: 10px;
  background: linear-gradient(45deg, #1fa5ff 25%, #1053ff 25%, #1053ff 50%, #1fa5ff 50%, #1fa5ff 75%, #1053ff 75%, #1053ff 100%);
  background-size: 35px 35px;
  animation: ${slidDown} 0.5s linear;
`



const CardList = ({ cards, cardDisplay, cardTotal, isPlaying, stand, cardTotalAlt=0 }) => {

  const displayTotal = (total, totalAlt) => {
    return (total !== totalAlt && totalAlt <= 21)
      ? total + "/" + totalAlt
      : total.toString();
  }

  return (
    <CardArea>
      <ScoreTitle>
        {cardDisplay + " " + displayTotal(cardTotal, cardTotalAlt)}
      </ScoreTitle>
      <PlayerArea >
        {cards.map((card,index) => <Card src={card.images.png} height="150px" alt={card.suit} key={index}/>)}
        {cardDisplay === 'Dealer:' && isPlaying && !stand ? <DarkCardBack></DarkCardBack> : null}
      </PlayerArea>
    </CardArea>
  );
};

export default CardList;