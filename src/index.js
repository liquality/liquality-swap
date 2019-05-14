import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import config from './config'

function addScript (code) {
  var s = document.createElement('script')
  s.type = 'text/javascript'
  s.innerHTML = code
  document.getElementsByTagName('head')[0].appendChild(s)
}

addScript(config.injectScript)

ReactDOM.render(<App />, document.getElementById('root'))

unregisterServiceWorker() // Incase anyone has it
