import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import MetaMask from './MetaMask'
import registerServiceWorker from './registerServiceWorker'

if (typeof web3 === 'undefined') {
  ReactDOM.render(<MetaMask />, document.getElementById('root'))
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}

registerServiceWorker()
