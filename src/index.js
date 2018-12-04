import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import MetaMask from './MetaMask'
import registerServiceWorker from './registerServiceWorker'
import config from './config'

function addScript (code) {
  var s = document.createElement('script')
  s.type = 'text/javascript'
  s.innerHTML = code
  document.getElementsByTagName('head')[0].appendChild(s)
}

addScript(config.injectScript)

if (typeof web3 === 'undefined') {
  ReactDOM.render(<MetaMask />, document.getElementById('root'))
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}

registerServiceWorker()
