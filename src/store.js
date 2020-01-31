
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import reducers from './reducers'
import { generateSwapState } from './utils/app-links'
import { handleProtocolURI } from './utils/protocolHandler'
import history from './history'

handleProtocolURI()

const initialAppState = {
  swap: generateSwapState(window.location)
}

const store = createStore(
  connectRouter(history)(reducers),
  initialAppState,
  applyMiddleware(thunk, routerMiddleware(history))
)

export { store, initialAppState }
