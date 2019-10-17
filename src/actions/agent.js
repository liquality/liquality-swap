import { actions as assetActions } from './assets'
import { actions as counterPartyActions } from './counterparty'
import cryptoassets from '@liquality/cryptoassets'
import agent from '../services/agentClient'

const types = {
  SET_QUOTE: 'SET_QUOTE'
}

function setQuote (quote) {
  return { type: types.SET_QUOTE, quote }
}

function retrieveAgentQuote (from, to, amount) {
  return async (dispatch, getState) => {
    const quote = await agent.getQuote(from, to, amount)
    dispatch(assetActions.setAsset('a', from.toLowerCase()))
    dispatch(assetActions.setAsset('b', to.toLowerCase()))
    dispatch(setQuote(quote))

    dispatch(assetActions.changeAmount('a', cryptoassets[from.toLowerCase()].unitToCurrency(quote.fromAmount)))
    dispatch(assetActions.changeAmount('b', cryptoassets[to.toLowerCase()].unitToCurrency(quote.toAmount)))
    dispatch(assetActions.changeAmount('b', cryptoassets[to.toLowerCase()].unitToCurrency(quote.toAmount)))

    dispatch(assetActions.lockRate())
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
