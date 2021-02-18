import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { store, initialAppState } from './store'
import history from './history'
import errorHandler from './errorHandler'
import config from './config'

import { actions as syncActions } from './actions/sync'
import { actions as transactionActions } from './actions/transactions'
import { actions as assetActions } from './actions/assets'
import { actions as agentActions } from './actions/agent'
import { actions as fiatActions } from './actions/fiat'

import LiqualitySwap from './containers/LiqualitySwap'
import './App.css'

window.onbeforeunload = () => { // Prompt on trying to leave app
  return true
}

window.addEventListener('error', errorHandler)
window.addEventListener('unhandledrejection', e => errorHandler(e.reason))

if (initialAppState.swap) {
  store.dispatch(transactionActions.setTransaction(
    'a', 'initiation', initialAppState.swap.transactions.a.initiation
  ))
  if (initialAppState.swap.transactions.b.initiation) {
    store.dispatch(transactionActions.setTransaction(
      'b', 'initiation', initialAppState.swap.transactions.b.initiation
    ))
  }
  if (initialAppState.swap.isPartyB) {
    // Need to use action to kick off tx monitoring
    store.dispatch(assetActions.changeAmount('b', initialAppState.swap.assets.b.value)) // Trigger rate calc
  }
  store.dispatch(syncActions.sync('a'))
  store.dispatch(syncActions.sync('b'))
} else {
  if (config.agents && config.agents.length) {
    store.dispatch(agentActions.connectAgents())
  }
}

store.dispatch(fiatActions.syncFiatRates())

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
