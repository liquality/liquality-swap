import { combineReducers } from 'redux'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'
import transactions from './transactions'
import step from './step'
import secretParams from './secretparams'
import expiration from './expiration'

export default combineReducers({
  assets,
  wallets,
  counterParty,
  transactions,
  step,
  secretParams,
  expiration,
  isPartyB: (state = false) => state
})
