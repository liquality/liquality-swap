import update from 'immutability-helper'
import { types as walletTypes } from '../actions/wallets'
import { types as swapTypes } from '../actions/swap'
import { getReducerFunction } from './helpers'

const initialState = {
  a: {
    addresses: [], // TODO: why multiple addresses?
    balance: null,
    connectOpen: false,
    connected: false,
    connecting: false,
    chosen: false,
    type: ''
  },
  b: {
    addresses: [],
    balance: null,
    connectOpen: false,
    connected: false,
    connecting: false,
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
      connectOpen: { $set: !state[action.party].connectOpen }
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

function startConnecting (state, action) {
  return update(state, {
    [action.party]: {
      connecting: { $set: true }
    }
  })
}

function connectWallet (state, action) {
  return update(state, {
    [action.party]: {
      addresses: { $set: action.addresses },
      connected: { $set: true },
      balance: { $set: action.balance }
    }
  })
}

function disconnectWallet (state, action) {
  return update(state, {
    [action.party]: { $set: initialState[action.party] }
  })
}

const reducers = {
  [swapTypes.SWITCH_SIDES]: switchSides,
  [walletTypes.TOGGLE_WALLET_CONNECT]: toggleWalletConnect,
  [walletTypes.CHOOSE_WALLET]: chooseWallet,
  [walletTypes.START_CONNECTING_WALLET]: startConnecting,
  [walletTypes.CONNECT_WALLET]: connectWallet,
  [walletTypes.DISCONNECT_WALLET]: disconnectWallet
}

const wallets = getReducerFunction(reducers, initialState)

export default wallets
