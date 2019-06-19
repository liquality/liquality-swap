import update from 'immutability-helper'
import { sha256 } from '@liquality/crypto'
import { types } from '../actions/secretparams'
import { getReducerFunction } from './helpers'

const initialState = {}

function setSecret (state, action) {
  return update(state, {
    secret: { $set: action.secret },
    secretHash: { $set: sha256(action.secret) }
  })
}

function setSecretHash (state, action) {
  return update(state, {
    secretHash: { $set: action.secretHash }
  })
}

const reducers = {
  [types.SET_SECRET]: setSecret,
  [types.SET_SECRET_HASH]: setSecretHash
}

const secretParams = getReducerFunction(reducers, initialState)

export default secretParams
