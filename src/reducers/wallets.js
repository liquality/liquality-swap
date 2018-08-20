import update from 'immutability-helper'
import actions from '../actions'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    addresses: null,
    balance: 1000,
    connectOpen: false,
    connected: false,
    chosen: false,
    type: ''
  },
  b: {
    addresses: null,
    balance: 5,
    connectOpen: false,
    connected: false,
    chosen: false,
    type: ''
  }
}

function switchSides (state, action) {
  return update(state, {
    a: { $set: state.b },
    b: { $set: state.a }
  })
}

function toggleWalletConnect (state, action) {
  return update(state, {
    [action.party]: {
      connectOpen: { $set: !state[action.party].connectOpen },
      anchorEl: { $set: action.target }
    }
  })
}

function chooseWallet (state, action) {
  return update(state, {
    [action.party]: {
      chosen: { $set: true },
      type: { $set: action.wallet }
    }
  })
}

function connectWallet (state, action) {
  return update(state, {
    [action.party]: {
      addresses: { $set: action.addresses },
      connected: { $set: true }
    }
  })
}

function disconnectWallet (state, action) {
  return update(state, {
    [action.party]: {
      connected: { $set: false },
      chosen: { $set: false },
      type: { $set: '' }
    }
  })
}

const reducers = {
  [actions.SWITCH_SIDES]: switchSides,
  [actions.TOGGLE_WALLET_CONNECT]: toggleWalletConnect,
  [actions.CHOOSE_WALLET]: chooseWallet,
  [actions.CONNECT_WALLET]: connectWallet,
  [actions.DISCONNECT_WALLET]: disconnectWallet
}

const wallets = getReducerFunction(reducers, initialState)

export default wallets
