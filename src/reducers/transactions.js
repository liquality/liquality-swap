import update from 'immutability-helper'
import { types } from '../actions/transactions'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    fund: {},
    claim: {}
  },
  b: {
    fund: {},
    claim: {}
  }
}

function setTransaction (state, action) {
  return update(state, {
    [action.party]: { [action.kind]: { $set: action.tx } }
  })
}

const reducers = {
  [types.SET_TRANSACTION]: setTransaction
}

const counterParty = getReducerFunction(reducers, initialState)

export default counterParty
