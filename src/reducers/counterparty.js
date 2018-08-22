import update from 'immutability-helper'
import { types } from '../actions/counterparty'
import { getReducerFunction } from './helpers'

const initialState = {
  eth: '',
  btc: ''
}

function changeCounterPartyAddress (state, action) {
  return update(state, {
    [action.currency]: { $set: action.newValue }
  })
}

const reducers = {
  [types.CHANGE_COUNTER_PARTY_ADDRESS]: changeCounterPartyAddress
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
