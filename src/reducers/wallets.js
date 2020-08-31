import update from 'immutability-helper'
import { types as walletTypes } from '../actions/wallets'
import { types as swapTypes } from '../actions/swap'
import { types as assetTypes } from '../actions/assets'
import { getReducerFunction } from './helpers'
import { getAssetWallets } from '../utils/wallets'

const initialState = {
  a: {
    addresses: [], // TODO: why multiple addresses?
    balance: null,
    networkBalance: null,
    connectOpen: false,
    connected: false,
    connecting: false,
    connectingError: null,
    chosen: false,
    type: ''
  },
  b: {
    addresses: [],
    balance: null,
    networkBalance: null,
    connectOpen: false,
    connected: false,
    connecting: false,
    connectingError: null,
    chosen: false,
    type: ''
  },
  popup: {
    open: false,
    steps: null,
    step: null
  }
}

function switchSides (state, action) {
  return update(state, {
    a: { $set: state.b },
    b: { $set: state.a }
  })
}

function setAsset (state, action) {
  const currentWallet = state[action.party].type
  const assetWallets = getAssetWallets(action.currency)
  if (currentWallet === '') return state
  if (assetWallets.includes(currentWallet)) return state

  // If selected asset is not supported on selected wallet: Disconnect the wallet
  return disconnectWallet(state, { party: action.party })
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
      connecting: { $set: true },
      connectingError: { $set: null }
    }
  })
}

function connectingWalletError (state, action) {
  return update(state, {
    [action.party]: {
      connectingError: { $set: action.error }
    }
  })
}

function connectWallet (state, action) {
  return update(state, {
    [action.party]: {
      addresses: { $set: action.addresses },
      connected: { $set: true },
      balance: { $set: action.balance },
      networkBalance: { $set: action.networkBalance }
    }
  })
}

function disconnectWallet (state, action) {
  const cleanState = initialState[action.party]
  if (action.preserveAddress) {
    delete cleanState.addresses
  }
  return update(state, {
    [action.party]: { $merge: cleanState }
  })
}

function setPopupSteps (state, action) {
  return update(state, {
    popup: {
      steps: { $set: action.steps }
    }
  })
}

function setPopupStep (state, action) {
  return update(state, {
    popup: {
      open: { $set: true },
      step: { $set: action.step }
    }
  })
}

function closePopup (state, action) {
  return update(state, {
    popup: {
      $set: initialState.popup
    }
  })
}

const reducers = {
  [swapTypes.SWITCH_SIDES]: switchSides,
  [assetTypes.SET_ASSET]: setAsset,
  [walletTypes.TOGGLE_WALLET_CONNECT]: toggleWalletConnect,
  [walletTypes.CHOOSE_WALLET]: chooseWallet,
  [walletTypes.START_CONNECTING_WALLET]: startConnecting,
  [walletTypes.CONNECTING_WALLET_ERROR]: connectingWalletError,
  [walletTypes.CONNECT_WALLET]: connectWallet,
  [walletTypes.DISCONNECT_WALLET]: disconnectWallet,

  [walletTypes.SET_POPUP_STEPS]: setPopupSteps,
  [walletTypes.SET_POPUP_STEP]: setPopupStep,
  [walletTypes.CLOSE_POPUP]: closePopup
}

const wallets = getReducerFunction(reducers, initialState)

export default wallets
