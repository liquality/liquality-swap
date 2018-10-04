import { combineReducers } from 'redux'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'
import transactions from './transactions'
import step from './step'
import secretParams from './secretparams'

export default combineReducers({
  assets,
  wallets,
  counterParty,
  transactions,
  step,
  secretParams,
  isPartyB: (state = false) => state
})
