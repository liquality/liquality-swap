import { combineReducers } from 'redux'

import { types } from '../actions/swap'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'
import transactions from './transactions'
import secretParams from './secretparams'
import assetSelector from './assetSelector'
import agent from './agent'
import sync from './sync'

const swapReducer = combineReducers({
  assets,
  wallets,
  counterParty,
  transactions,
  secretParams,
  assetSelector,
  agent,
  sync,
  step: (state = null, action) => {
    return action.type === types.SET_STEP ? action.step : state
  },
  expiration: (state = null, action) => {
    return action.type === types.SET_EXPIRATION ? action.expiration : state
  },
  link: (state = null, action) => {
    return action.type === types.SET_LINK ? action.link : state
  },
  showErrors: (state = false, action) => {
    return action.type === types.SET_SHOW_ERRORS ? action.showErrors : state
  },
  loadingMessage: (state = null, action) => {
    return action.type === types.SET_LOADING_MESSAGE ? action.loadingMessage : state
  },
  isPartyB: (state = false) => state
})

export default (state, action) => {
  if (action.type === types.RESET) {
    state = undefined
  }

  return swapReducer(state, action)
}
