import { store } from './store'
import { actions as errorActions } from './actions/errors'

function errorHandler (e) {
  if (e instanceof Error) {
    store.dispatch(errorActions.setError(e))
  } else {
    throw e
  }
}

export default errorHandler
