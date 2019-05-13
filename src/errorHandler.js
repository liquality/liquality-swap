import { NodeError, WalletError } from '@liquality/errors'
import { store } from './store'
import { actions as errorActions } from './actions/errors'

function errorHandler (e) {
  if (e instanceof WalletError ||
      e instanceof NodeError) {
    store.dispatch(errorActions.setError(e))
  } else {
    throw e
  }
}

export default errorHandler
