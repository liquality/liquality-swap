import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'

import { actions as swapActions } from './actions/swap'
import LiqualitySwap from './containers/LiqualitySwap'
import reducers from './reducers'
import { generateSwapState } from './utils/app-links'
import './App.css'

const history = createBrowserHistory({basename: window.location.pathname})

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
    store.dispatch(swapActions.findAndVerifyInitiateSwapTransaction)
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
