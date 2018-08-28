import { combineReducers } from 'redux'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'
import transactions from './transactions'
import step from './step'

export default combineReducers({
  assets,
  wallets,
  counterParty,
  transactions,
  step,
  isPartyB: (state = false) => state
})
