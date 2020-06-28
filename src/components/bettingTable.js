import React from 'react';
import styled from 'styled-components'

const BetTable = styled.div`
  margin: 20px auto;
  height: 100px;
  width: 700px;
  background-color: #d9dbdd;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Bet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Chips = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MoneyItem = styled.p`
  font-weight: 800;
  font-size: 23px;
  width: 100px;
  letter-spacing: 4px;
  color: #484e56;
  text-transform: uppercase;
`

const Chip = styled.div`
  width: 75px;
  height: 75px;
  background: lightgray;
  color: gray;
  font-size: 20px;
  font-weight: bolder;
  border-radius: 50px;
  border: 5px dashed gray;
  margin-right: 18px;
`

const ChipFive = styled(Chip)`
  background: no-repeat center/contain url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-5.png");
  border: none;
  width: 80px;
  height: 80px;
  cursor: pointer;
`

const ChipTen = styled(Chip)`
  background: no-repeat center/contain url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-7.png");
  border: none;
  width: 80px;
  height: 80px;
  cursor: pointer;
`

const ChipFifteen = styled(Chip)`
  background: no-repeat center/contain url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-4.png");
  border: none;
  width: 80px;
  height: 80px;
  cursor: pointer;
`

const ChipFifty = styled(Chip)`
  background: no-repeat center/contain url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-3.png");
  border: none;
  width: 80px;
  height: 80px;
  cursor: pointer;
`

const addBet = (bets) => {
  return {
    type: 'addBet',
    bets,
  }
}

function BettingTable({
  wallet,
  bet,
  isPlaying,
  dispatch
}) {
  return (
    <BetTable>
      <Bet>
        <MoneyItem>
          BET
        </MoneyItem>
        <MoneyItem>
          ${bet}
        </MoneyItem>
      </Bet>
      {wallet >= 5 ? <ChipFive onClick={isPlaying ? () => {} : () => dispatch(addBet(5))}/> : <Chip/>}
      {wallet >= 10 ?<ChipTen onClick={isPlaying ? () => {} :() => dispatch(addBet(10))}/> : <Chip/>}
      {wallet >= 15 ?<ChipFifteen onClick={isPlaying ? () => {} :() => dispatch(addBet(15))}/> : <Chip/>}
      {wallet >= 50 ? <ChipFifty onClick={isPlaying ? () => {} :() => dispatch(addBet(50))}/> : <Chip/>}
      <Chips>
        <MoneyItem>
          CHIPS
        </MoneyItem>
        <MoneyItem>
          ${wallet}
        </MoneyItem>
      </Chips>
    </BetTable>
  )
}

export default BettingTable;