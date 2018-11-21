import update from 'immutability-helper'
import { types as assetTypes } from '../actions/assets'
import { types as swapTypes } from '../actions/swap'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    currency: 'eth',
    value: null
  },
  b: {
    currency: 'btc',
    value: null
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
  [swapTypes.SWITCH_SIDES]: switchSides,
  [assetTypes.CHANGE_AMOUNT]: changeAmount
}

const assets = getReducerFunction(reducers, initialState)

export default assets
