import update from 'immutability-helper'
import { types as syncActions } from '../actions/sync'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    currentBlock: null,
    synced: false
  },
  b: {
    currentBlock: null,
    synced: false
  }
}

function setCurrentBlock (state, action) {
  return update(state, {
    [action.party]: { currentBlock: { $set: action.blockNumber } }
  })
}

function setSynced (state, action) {
  return update(state, {
    [action.party]: { synced: { $set: action.synced } }
  })
}

const reducers = {
  [syncActions.SET_CURRENT_BLOCK]: setCurrentBlock,
  [syncActions.SET_SYNCED]: setSynced
}

const assets = getReducerFunction(reducers, initialState)

export default assets
