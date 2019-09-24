import { actions as assetActions } from './assets'
import { actions as counterPartyActions } from './counterparty'
import agent from '../services/agentClient'

const types = {
  SET_QUOTE: 'SET_QUOTE'
}

function setQuote (quote) {
  return { type: types.SET_QUOTE, quote }
}

function retrieveAgentQuote (from, to, min) {
  return async (dispatch, getState) => {
    const quote = await agent.getQuote(from, to, min)
    dispatch(assetActions.setAsset('a', from.toLowerCase()))
    dispatch(assetActions.setAsset('b', to.toLowerCase()))
    dispatch(setQuote(quote))
    dispatch(assetActions.changeRate(quote.rate))
    dispatch(assetActions.lockRate())
    dispatch(assetActions.changeAmount('a', quote.amount))
    dispatch(counterPartyActions.changeCounterPartyAddress('a', quote.fromCounterPartyAddress))
    dispatch(counterPartyActions.changeCounterPartyAddress('b', quote.toCounterPartyAddress))
    dispatch(counterPartyActions.setCounterPartyVisible(false))
  }
}

const actions = {
  setQuote,
  retrieveAgentQuote
}

export { types, actions }
