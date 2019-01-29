import update from 'immutability-helper'
import { types as assetTypes } from '../actions/assets'
import { types as swapTypes } from '../actions/swap'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    currency: 'eth',
    value: ''
  },
  b: {
    currency: 'btc',
    value: ''
  },
  rate: {
    value: ''
  }
}

function switchSides (state, action) {
  const newRate = +(parseFloat(state.b.value) / parseFloat(state.a.value)).toFixed(6)
  return update(state, {
    a: { $set: state.b },
    b: { $set: state.a },
    rate: { $set: { value: newRate.toString() } }
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
