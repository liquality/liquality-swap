import React, { Component } from 'react'
import SwapInitiation from './components/SwapInitiation/SwapInitiation'
import CAL from 'chainabstractionlayer'
import liqUI from 'liquality-ui'

import './App.css'

console.log(CAL)
console.log(liqUI)

class App extends Component {
  render () {
    return (
      <div>
        <SwapInitiation />
      </div>
    )
  }
}

export default App
