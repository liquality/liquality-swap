import update from 'immutability-helper'
import { types as agentTypes } from '../actions/agent'
import { getReducerFunction } from './helpers'

const initialState = {
  quote: null
}

function setQuote (state, action) {
  return update(state, {
    quote: { $set: action.quote }
  })
}

const reducers = {
  [agentTypes.SET_QUOTE]: setQuote
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
