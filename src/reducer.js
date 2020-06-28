function reducer(state, action) {
  switch (action.type) {
    case 'addBet':
      return {
        ...state,
        wallet: state.wallet - action.bets,
        bet: state.bet+action.bets
      }
    case 'clearBet':
      return {
        ...state,
        wallet: state.wallet + state.bet,
        bet: 0
      }
    case 'changeInput':
      if (action.wallet !== undefined) {
        return {
          ...state,
          wallet: action.wallet
        }
      } else if(action.minBet !== undefined) {
        return {
          ...state,
          minBet: action.minBet
        }
      }
    case 'initalDark':
      return {
        ...state,
        deck: action.deck,
        dealerDarkCard: action.dealerDarkCard,
        isPlaying: true 
      }
    case 'initalDeck':
      return {
        ...state,
        deck: action.deck,
        dealerCards: action.dealerCards,
        playerCards: action.playerCards,
        isPlaying: true 
      }
    case 'hitDeck': 
      return {
        ...state,
        deck: action.deck,
        playerCards: action.playerCards
      }
    case 'dealerHit':
      return {
        ...state,
        deck: action.deck,
        dealerCards: action.dealerCards
      }
    case 'status':
      return {
        ...state,
        gameMsg: action.msg
      }
    case 'stand':
      return {
        ...state,
        stand: true
      }
    case 'mergeCards': 
      return {
        ...state,
        dealerCards: state.dealerCards.concat(state.dealerDarkCard)
      }
    case 'resetGame':
      return {
        ...state,
        deck: [],
        dealerCards: [],
        dealerDarkCard: [],
        playerCards: [],
        bet: 0,
        minBet: 10,
        wallet: action.chips,
        isPlaying: false,
        stand: false,
        gameMsg: null
      }
    default:
      return state
  }
}

export default reducer