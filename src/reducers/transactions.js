import update from 'immutability-helper'
import { types } from '../actions/transactions'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    fund: {},
    claim: {},
    refund: {}
  },
  b: {
    fund: {},
    claim: {},
    refund: {}
  }
}

function setTransaction (state, action) {
  return update(state, {
    [action.party]: { [action.kind]: { $set: {confirmations: 0, ...action.tx} } }
  })
}

const reducers = {
  [types.SET_TRANSACTION]: setTransaction
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
