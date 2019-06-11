import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import config from './config'

function addScript (code) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.innerHTML = code
  document.getElementsByTagName('head')[0].appendChild(script)
}

addScript(config.injectScript)

ReactDOM.render(<App />, document.getElementById('root'))

unregisterServiceWorker() // Incase anyone has it
