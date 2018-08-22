import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'

import LiqualitySwap from './containers/LiqualitySwap/LiqualitySwap'
import reducers from './reducers'

import './App.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0a2647'
    },
    secondary: pink
  }
})

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
