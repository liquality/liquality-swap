import { combineReducers } from 'redux'
import { types } from '../actions/errors'
import swap from './swap'
import fiat from './fiat'

export default combineReducers({
  swap,
  fiat,
  error: (state = null, action) => {
    return action.type === types.SET_ERROR ? action.error : state
  }
})
