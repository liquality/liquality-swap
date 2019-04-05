import update from 'immutability-helper'
import { types as counterPartyTypes } from '../actions/counterparty'
import { types as swapTypes } from '../actions/swap'
import { getReducerFunction } from './helpers'

const initialState = {
  a: { address: '', valid: false },
  b: { address: '', valid: false }
}

function switchSides (state) {
  return update(state, {
    a: { $set: state.b },
    b: { $set: state.a }
  })
}

function changeCounterPartyAddress (state, action) {
  return update(state, {
    [action.party]: { address: { $set: action.newValue }, valid: { $set: action.valid } }
  })
}

const reducers = {
  [swapTypes.SWITCH_SIDES]: switchSides,
  [counterPartyTypes.CHANGE_COUNTER_PARTY_ADDRESS]: changeCounterPartyAddress
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
