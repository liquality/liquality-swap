import { combineReducers } from 'redux'
import { getReducerFunction } from './helpers'

import assets from './assets'
import wallets from './wallets'
import counterParty from './counterparty'

const childReducers = combineReducers({
  assets,
  wallets,
  counterParty
})

const reducers = {}

const swap = getReducerFunction(reducers, undefined, childReducers)

export default swap
