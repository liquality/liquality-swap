import update from 'immutability-helper'
import actions from '../actions'
import { getReducerFunction } from './helpers'

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

function switchSides (state, action) {
  return update(state, {
    a: { $set: state.b },
    b: { $set: state.a }
  })
}

function changeAmount (state, action) {
  return update(state, {
    [action.party]: { value: { $set: action.newValue } }
  })
}

const reducers = {
  [actions.SWITCH_SIDES]: switchSides,
  [actions.CHANGE_AMOUNT]: changeAmount
}

const assets = getReducerFunction(reducers, initialState)

export default assets
