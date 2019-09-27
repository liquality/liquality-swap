import { combineReducers } from 'redux'

import { types } from '../actions/swap'
import { steps } from '../components/SwapProgressStepper/steps'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'
import transactions from './transactions'
import secretParams from './secretparams'
import assetSelector from './assetSelector'
import sync from './sync'

export default combineReducers({
  assets,
  wallets,
  counterParty,
  transactions,
  secretParams,
  assetSelector,
  sync,
  step: (state = steps.INITIATION, action) => {
    return action.type === types.SET_STEP ? action.step : state
  },
  expiration: (state = null, action) => {
    return action.type === types.SET_EXPIRATION ? action.expiration : state
  },
  link: (state = null, action) => {
    return action.type === types.SET_LINK ? action.link : state
  },
  isVerified: (state = false, action) => {
    return action.type === types.SET_IS_VERIFIED ? action.isVerified : state
  },
  showErrors: (state = false, action) => {
    return action.type === types.SET_SHOW_ERRORS ? action.showErrors : state
  },
  loadingMessage: (state = null, action) => {
    return action.type === types.SET_LOADING_MESSAGE ? action.loadingMessage : state
  },
  isPartyB: (state = false) => state
})
