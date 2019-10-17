import update from 'immutability-helper'
import { types as counterPartyTypes } from '../actions/counterparty'
import { types as swapTypes } from '../actions/swap'
import { getReducerFunction } from './helpers'

const initialState = {
  a: { address: '', valid: false },
  b: { address: '', valid: false },
  visible: true
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

function setCounterPartyVisible (state, action) {
  return update(state, {
    visible: { $set: action.visible }
  })
}

const reducers = {
  [swapTypes.SWITCH_SIDES]: switchSides,
  [counterPartyTypes.CHANGE_COUNTER_PARTY_ADDRESS]: changeCounterPartyAddress,
  [counterPartyTypes.SET_COUNTER_PARTY_VISIBLE]: setCounterPartyVisible
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
