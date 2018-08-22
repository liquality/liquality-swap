import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import LiqualitySwap from './containers/LiqualitySwap/LiqualitySwap'
import reducers from './reducers'
import theme from './theme'
import './App.css'

const store = createStore(reducers)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <LiqualitySwap />
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default App
