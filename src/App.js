import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { actions as swapActions } from './actions/swap'
import LiqualitySwap from './containers/LiqualitySwap'
import reducers from './reducers'
import theme from './theme'
import { generateSwapState } from './utils/app-links'

const history = createBrowserHistory()

const initialAppState = {
  swap: generateSwapState(window.location)
}

const store = createStore(
  connectRouter(history)(reducers),
  initialAppState,
  applyMiddleware(thunk, routerMiddleware(history))
)

if (initialAppState.swap) {
  store.dispatch(swapActions.waitForExpiration)

  if (initialAppState.swap.isPartyB) {
    store.dispatch(swapActions.findAndVerifyInitiateSwapTransaction)
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <LiqualitySwap />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
