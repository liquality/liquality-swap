import { store } from './store'
import { actions as errorActions } from './actions/errors'
import { mapErrorMessage } from './utils/errors'

function errorHandler (e) {
  if (e instanceof Error) {
    console.log(e.message)
    const errorMapping = mapErrorMessage(e.message)
    if (errorMapping) {
      e.name = ''
      e.message = errorMapping
    }
    store.dispatch(errorActions.setError(e))
  } else {
    throw e
  }
}

export default errorHandler
