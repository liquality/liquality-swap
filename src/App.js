import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { hotjar } from 'react-hotjar'

import { actions as swapActions } from './actions/swap'
import { actions as transactionActions } from './actions/transactions'
import LiqualitySwap from './containers/LiqualitySwap'
import reducers from './reducers'
import { generateSwapState } from './utils/app-links'
import './App.css'

const history = createBrowserHistory({basename: window.location.pathname})

hotjar.initialize(1102216, 6)

const initialAppState = {
  swap: generateSwapState(window.location)
}

const store = createStore(
  connectRouter(history)(reducers),
  initialAppState,
  applyMiddleware(thunk, routerMiddleware(history))
)

if (initialAppState.swap) {
  if (initialAppState.swap.transactions.a.fund.hash) {
    store.dispatch(swapActions.waitForExpiration)
  }

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
