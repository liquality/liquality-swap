import update from 'immutability-helper'
import { types as assetTypes } from '../actions/assets'
import { types as swapTypes } from '../actions/swap'
import { getReducerFunction } from './helpers'
import config from '../config'
import BigNumber from 'bignumber.js'

const initialState = {
  a: {
    currency: Object.keys(config.assets)[0],
    value: BigNumber(0)
  },
  b: {
    currency: Object.keys(config.assets)[1],
    value: BigNumber(0)
  },
  rate: BigNumber(0)
}

function switchSides (state, action) {
  const newRate = BigNumber(state.b.value.div(state.a.value).toFixed(6))
  return update(state, {
    a: { $set: state.b },
    b: { $set: state.a },
    rate: { $set: BigNumber(newRate) }
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

const reducers = {
  [swapTypes.SWITCH_SIDES]: switchSides,
  [assetTypes.SET_ASSET]: setAsset,
  [assetTypes.CHANGE_AMOUNT]: changeAmount,
  [assetTypes.CHANGE_RATE]: changeRate
}

const assets = getReducerFunction(reducers, initialState)

export default assets
