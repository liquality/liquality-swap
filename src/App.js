import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { store, initialAppState } from './store'
import history from './history'

import { actions as swapActions } from './actions/swap'
import { actions as transactionActions } from './actions/transactions'

import LiqualitySwap from './containers/LiqualitySwap'
import './App.css'

window.onbeforeunload = () => { // Prompt on trying to leave app
  return true
}

if (initialAppState.swap) {
  store.dispatch(transactionActions.loadTransactions())
  if (initialAppState.swap.isPartyB) {
    // Need to use action to kick off tx monitoring
    store.dispatch(transactionActions.setTransaction(
      'b', 'fund', initialAppState.swap.transactions.b.fund
    ))
    store.dispatch(swapActions.verifyInitiateSwapTransaction)
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
