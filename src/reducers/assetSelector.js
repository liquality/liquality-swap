import update from 'immutability-helper'
import { types } from '../actions/assetSelector'
import { getReducerFunction } from './helpers'

const initialState = {
  open: false,
  party: null
}

function openAssetSelector (state, action) {
  return update(state, {
    open: { $set: true },
    party: { $set: action.party }
  })
}

function closeAssetSelector (state, action) {
  return update(state, {
    open: { $set: false },
    party: { $set: null }
  })
}

const reducers = {
  [types.OPEN_ASSET_SELECTOR]: openAssetSelector,
  [types.CLOSE_ASSET_SELECTOR]: closeAssetSelector
}

const secretParams = getReducerFunction(reducers, initialState)

export default secretParams
