import { combineReducers } from 'redux'
import { types } from '../actions/errors'
import swap from './swap'

export default combineReducers({
  swap,
  error: (state = null, action) => {
    return action.type === types.SET_ERROR ? action.error : state
  }
})
