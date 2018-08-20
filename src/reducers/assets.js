import update from 'immutability-helper'
import { getActionTypes, getReducerFunction } from './helpers'

const initialState = {
  a: {
    currency: 'eth',
    name: 'Ethereum',
    value: 50
  },
  b: {
    currency: 'btc',
    name: 'Bitcoin',
    value: 10
  }
}

function changeAmount (state, action) {
  return update(state, {
    [action.party]: { value: { $set: action.newValue } }
  })
}

const reducers = {
  CHANGE_AMOUNT: changeAmount
}

const actionTypes = getActionTypes(reducers)
const assets = getReducerFunction(reducers, initialState)

export { actionTypes, assets }
