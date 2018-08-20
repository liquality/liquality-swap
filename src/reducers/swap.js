import { combineReducers } from 'redux'
import update from 'immutability-helper'
import { getActionTypes, getReducerFunction } from './helpers'

import { assets } from './assets'
import { wallets } from './wallets'
import { counterParty } from './counterparty'

const childReducers = combineReducers({
  assets,
  wallets,
  counterParty
})

function switchSides (state, action) {
  return update(state, {
    assets: {
      a: { $set: state.assets.b },
      b: { $set: state.assets.a }
    },
    wallets: {
      a: { $set: state.wallets.b },
      b: { $set: state.wallets.a }
    }
  })
}

const reducers = {
  SWITCH_SIDES: switchSides
}

const swap = getReducerFunction(reducers, undefined, childReducers)
const actionTypes = getActionTypes(reducers)

export { actionTypes, swap }
