import update from 'immutability-helper'
import { types } from '../actions/assetSelector'
import { getReducerFunction } from './helpers'

const initialState = {
  open: false,
  party: null,
  search: ''
}

function openAssetSelector (state, action) {
  return update(state, {
    open: { $set: true },
    party: { $set: action.party }
  })
}

function closeAssetSelector (state, action) {
  return update(state, { $set: initialState })
}

function setAssetSelectorSearch (state, action) {
  return update(state, {
    search: { $set: action.value }
  })
}

const reducers = {
  [types.OPEN_ASSET_SELECTOR]: openAssetSelector,
  [types.CLOSE_ASSET_SELECTOR]: closeAssetSelector,
  [types.SET_ASSET_SELECTOR_SEARCH]: setAssetSelectorSearch
}

const secretParams = getReducerFunction(reducers, initialState)

export default secretParams
