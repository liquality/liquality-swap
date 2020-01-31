import update from 'immutability-helper'
import { types } from '../actions/transactions'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    fund: {},
    claim: {},
    refund: {},
    startBlock: null
  },
  b: {
    fund: {},
    claim: {},
    refund: {},
    startBlock: null
  }
}

function setTransaction (state, action) {
  return update(state, {
    [action.party]: { [action.kind]: { $set: {confirmations: 0, ...action.tx} } }
  })
}

function setStartBlock (state, action) {
  return update(state, {
    [action.party]: { startBlock: { $set: action.blockNumber } }
  })
}

const reducers = {
  [types.SET_TRANSACTION]: setTransaction,
  [types.SET_START_BLOCK]: setStartBlock
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
