import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { store, initialAppState } from './store'
import history from './history'
import errorHandler from './errorHandler'

import { actions as swapActions } from './actions/swap'
import { actions as transactionActions } from './actions/transactions'
import { actions as assetActions } from './actions/assets'

import LiqualitySwap from './containers/LiqualitySwap'
import './App.css'

window.onbeforeunload = () => { // Prompt on trying to leave app
  return true
}

window.addEventListener('error', errorHandler)
window.addEventListener('unhandledrejection', e => errorHandler(e.reason))

if (initialAppState.swap) {
  store.dispatch(transactionActions.setTransaction(
    'a', 'fund', initialAppState.swap.transactions.a.fund
  ))
  store.dispatch(assetActions.changeRate(initialAppState.swap.assets.rate))
  if (initialAppState.swap.isPartyB) {
    // Need to use action to kick off tx monitoring
    store.dispatch(transactionActions.setTransaction(
      'b', 'fund', initialAppState.swap.transactions.b.fund
    ))
    store.dispatch(swapActions.verifyInitiateSwapTransaction)
    store.dispatch(assetActions.changeAmount('b', initialAppState.swap.assets.b.value)) // Trigger rate calc
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LiqualitySwap />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
