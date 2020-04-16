import update from 'immutability-helper'
import { types as agentTypes } from '../actions/agent'
import { getReducerFunction } from './helpers'

const initialState = {
  markets: [],
  quote: null,
  defaultMarketSet: false
}

function setMarkets (state, action) {
  return update(state, {
    markets: { $set: action.markets }
  })
}

function setQuote (state, action) {
  return update(state, {
    quote: { $set: action.quote }
  })
}

function defaultSet (state) {
  return update(state, {
    defaultMarketSet: { $set: true }
  })
}

const reducers = {
  [agentTypes.SET_MARKETS]: setMarkets,
  [agentTypes.SET_QUOTE]: setQuote,
  [agentTypes.DEFAULT_SET]: defaultSet
}

const agent = getReducerFunction(reducers, initialState)

export default agent
