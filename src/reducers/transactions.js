import update from 'immutability-helper'
import { types } from '../actions/transactions'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    initiation: {},
    fund: {},
    claim: {},
    refund: {},
    startBlock: null
  },
  b: {
    initiation: {},
    fund: {},
    claim: {},
    refund: {},
    startBlock: null
  },
  isVerified: false
}

function setIsVerified (state, action) {
  return update(state, {
    isVerified: { $set: action.isVerified }
  })
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
  [types.SET_START_BLOCK]: setStartBlock,
  [types.SET_IS_VERIFIED]: setIsVerified
}

const transactions = getReducerFunction(reducers, initialState)

export default transactions
