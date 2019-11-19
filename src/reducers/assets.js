import update from 'immutability-helper'
import { types as assetTypes } from '../actions/assets'
import { types as swapTypes } from '../actions/swap'
import { getReducerFunction } from './helpers'
import config from '../config'

const initialState = {
  a: {
    currency: Object.keys(config.assets)[0],
    value: ''
  },
  b: {
    currency: Object.keys(config.assets)[1],
    value: ''
  },
  rate: '',
  rateLocked: false
}

function switchSides (state, action) {
  const newRate = +(parseFloat(state.b.value) / parseFloat(state.a.value)).toFixed(6)
  return update(state, {
    a: { $set: state.b },
    b: { $set: state.a },
    rate: { $set: newRate.toString() }
  })
}

function setAsset (state, action) {
  return update(state, {
    [action.party]: {
      currency: { $set: action.currency }
    }
  })
}

function changeAmount (state, action) {
  return update(state, {
    [action.party]: { value: { $set: action.newValue } }
  })
}

function changeRate (state, action) {
  return update(state, {
    rate: { $set: action.newValue }
  })
}

function lockRate (state) {
  return update(state, {
    rateLocked: { $set: true }
  })
}

const reducers = {
  [swapTypes.SWITCH_SIDES]: switchSides,
  [assetTypes.SET_ASSET]: setAsset,
  [assetTypes.CHANGE_AMOUNT]: changeAmount,
  [assetTypes.CHANGE_RATE]: changeRate,
  [assetTypes.LOCK_RATE]: lockRate
}

const assets = getReducerFunction(reducers, initialState)

export default assets
