import update from 'immutability-helper'
import { types } from '../actions/assetSelector'
import { getReducerFunction } from './helpers'

const initialState = {
  open: false,
  party: null
}

function toggleAssetSelector (state, action) {
  return update(state, {
    open: { $set: !state.open },
    party: { $set: action.party }
  })
}

const reducers = {
  [types.TOGGLE_ASSET_SELECTOR]: toggleAssetSelector
}

const secretParams = getReducerFunction(reducers, initialState)

export default secretParams
