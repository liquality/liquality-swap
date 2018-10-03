import { types } from '../actions/secretparams'
import { getReducerFunction } from './helpers'

const initialState = {}

function setSecretParams (state, action) {
  return action.secretParams
}

const reducers = {
  [types.SET_SECRET_PARAMS]: setSecretParams
}

const secretParams = getReducerFunction(reducers, initialState)

export default secretParams
