import React from 'react'
import styled from 'styled-components'

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 14px;
  color: darkgray;
  cursor: pointer;
  font-family: arial,tahoma,sans-serif;
`

const Input = styled.input`
  &:focus {
    border-color: cornflowerblue;
  }
  margin:5px 0;
	padding: 10px;
	width:100%;
	outline:none;
	border:1px solid #bbb;
	border-radius:20px;
	box-sizing:border-box;
`

function Setting({
  minBet,
  wallet,
  dispatch
}) {


  const handleChange = (event, key) => {
    let value = Number.parseInt(event.target.value)
    if (Number.isNaN(value)) {
      value = 0
    }
    if (key === 'minBet') {
      dispatch({ type: 'changeInput', 'minBet': value })
    } else if (key === 'wallet') {
      dispatch({ type: 'changeInput', 'wallet': value })
    }
  }

  return (
    <SettingGroup>
      <Label>MinBet</Label>
      <Input
        value={minBet}
        onChange={(e) => handleChange(e, 'minBet')}
      />
      <Label>Wallet Balance</Label>
      <Input
        value={wallet}
        onChange={e => handleChange(e, 'wallet')}
      />
    </SettingGroup>
  )
}

export default Setting