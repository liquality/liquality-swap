import update from 'immutability-helper'
import { types as agentTypes } from '../actions/agent'
import { getReducerFunction } from './helpers'

const initialState = {
  markets: [],
  market: null,
  quote: null,
  quoteLocked: false
}

function setMarkets (state, action) {
  return update(state, {
    markets: { $set: action.markets }
  })
}

function setMarket (state, action) {
  return update(state, {
    market: { $set: action.market }
  })
}

function setQuote (state, action) {
  return update(state, {
    quote: { $set: action.quote }
  })
}

function setQuoteLocked (state, action) {
  return update(state, {
    quoteLocked: { $set: action.locked }
  })
}

const reducers = {
  [agentTypes.SET_MARKETS]: setMarkets,
  [agentTypes.SET_MARKET]: setMarket,
  [agentTypes.SET_QUOTE]: setQuote,
  [agentTypes.SET_QUOTE_LOCKED]: setQuoteLocked
}

const agent = getReducerFunction(reducers, initialState)

export default agent
