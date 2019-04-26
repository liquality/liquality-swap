import { errors } from '@liquality/chainabstractionlayer'
import { store } from './store'
import { actions as errorActions } from './actions/errors'

function errorHandler (e) {
  if (e instanceof errors.WalletError ||
      e instanceof errors.NodeError) {
    store.dispatch(errorActions.setError(e))
  } else {
    throw e
  }
}

export default errorHandler
