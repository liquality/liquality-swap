
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
import { generateSwapState } from './utils/app-links'
import { handleProtocolURI } from './utils/protocolHandler'
import history from './history'

handleProtocolURI()

const initialAppState = {
  swap: generateSwapState(window.location)
}

const devTools = composeWithDevTools({})

const store = createStore(
  connectRouter(history)(reducers),
  initialAppState,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
)

export { store, initialAppState }
