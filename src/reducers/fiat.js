import update from 'immutability-helper'
import { types } from '../actions/fiat'
import { getReducerFunction } from './helpers'

const initialState = {
  rates: {}
}

function setRates (state, action) {
  return update(state, {
    rates: {
      $set: action.rates
    }
  })
}

const reducers = {
  [types.SET_RATES]: setRates
}

const fiat = getReducerFunction(reducers, initialState)

export default fiat
