import update from 'immutability-helper'
import { getActionTypes, getReducerFunction } from './helpers'

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
  CHANGE_COUNTER_PARTY_ADDRESS: changeCounterPartyAddress
}

const actionTypes = getActionTypes(reducers)
const counterParty = getReducerFunction(reducers, initialState)

export { actionTypes, counterParty }
