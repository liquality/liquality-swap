import { errors } from '@liquality/chainabstractionlayer/dist/index.umd.js'
import { store } from './store'
import { actions as errorActions } from './actions/errors'

function errorHandler (e) {
  if (e.reason instanceof errors.WalletError) {
    store.dispatch(errorActions.setError(e.reason))
  } else {
    throw e
  }
}

export default errorHandler
