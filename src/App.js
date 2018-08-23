import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { MuiThemeProvider } from '@material-ui/core/styles'

import LiqualitySwap from './containers/LiqualitySwap/LiqualitySwap'
import reducers from './reducers'
import theme from './theme'
import './App.css'

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(reducers),
  applyMiddleware(thunk, routerMiddleware(history))
)

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
