import { types } from '../actions/swap'
import { getReducerFunction } from './helpers'

const initialState = null

function setExpiration (state, action) {
  return action.expiration
}

const reducers = {
  [types.SET_EXPIRATION]: setExpiration
}

const expiration = getReducerFunction(reducers, initialState)

export default expiration
