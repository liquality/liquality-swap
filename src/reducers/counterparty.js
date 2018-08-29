import update from 'immutability-helper'
import { types } from '../actions/counterparty'
import { getReducerFunction } from './helpers'

const initialState = {
  eth: {address: '', valid: false},
  btc: {address: '', valid: false}
}

function changeCounterPartyAddress (state, action) {
  return update(state, {
    [action.currency]: { address: { $set: action.newValue }, valid: { $set: action.valid } }
  })
}

const reducers = {
  [types.CHANGE_COUNTER_PARTY_ADDRESS]: changeCounterPartyAddress
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
