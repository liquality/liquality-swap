import { combineReducers } from 'redux'

import { types } from '../actions/swap'
import { steps } from '../components/SwapProgressStepper/steps'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'
import transactions from './transactions'
import secretParams from './secretparams'

export default combineReducers({
  assets,
  wallets,
  counterParty,
  transactions,
  secretParams,
  step: (state = steps.INITIATION, action) => {
    return action.type === types.SET_STEP ? action.step : state
  },
  expiration: (state = null, action) => {
    return action.type === types.SET_EXPIRATION ? action.expiration : state
  },
  link: (state = null, action) => {
    return action.type === types.SET_LINK ? action.link : state
  },
  isPartyB: (state = false) => state
})
