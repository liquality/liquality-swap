import { types } from '../actions/swap'
import { getReducerFunction } from './helpers'

const initialState = null

function setLink (state, action) {
  return action.link
}

const reducers = {
  [types.SET_LINK]: setLink
}

const expiration = getReducerFunction(reducers, initialState)

export default expiration
