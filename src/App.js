import React, { Component } from 'react'
import SwapInitiation from './containers/SwapInitiation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'

import './App.css'

const store = createStore(reducers)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <SwapInitiation />
      </Provider>
    )
  }
}

export default App
