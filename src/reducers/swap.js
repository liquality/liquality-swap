import { combineReducers } from 'redux'
import { getReducerFunction } from './helpers'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'
import transactions from './transactions'
import step from './step'

const childReducers = combineReducers({
  assets,
  wallets,
  counterParty,
  transactions,
  step
})

const reducers = {}

const swap = getReducerFunction(reducers, undefined, childReducers)

export default swap
