import { getClient, getNetworkClient } from '../services/chainClient'
import { steps } from '../components/SwapProgressStepper/steps'
import { assets as cryptoassets, chains, unitToCurrency } from '@liquality/cryptoassets'

const types = {
  TOGGLE_WALLET_CONNECT: 'TOGGLE_WALLET_CONNECT',
  CHOOSE_WALLET: 'CHOOSE_WALLET',
  START_CONNECTING_WALLET: 'START_CONNECTING_WALLET',
  CONNECT_WALLET: 'CONNECT_WALLET',
  CONNECTING_WALLET_ERROR: 'CONNECTING_WALLET_ERROR',
  DISCONNECT_WALLET: 'DISCONNECT_WALLET',
  SET_POPUP_STEPS: 'SET_POPUP_STEPS',
  SET_POPUP_STEP: 'SET_POPUP_STEP',
  CLOSE_POPUP: 'CLOSE_POPUP'
}

function waitForWallet (party, currency, wallet) {
  return async (dispatch, getState) => {
    dispatch(chooseWallet(party, wallet))
  }
}

async function connectToWallet (party, wallet, dispatch, getState) {
  const { assets, wallets } = getState().swap
  dispatch(startConnecting(party))
  const currencyCode = assets[party].currency
  const currency = cryptoassets[currencyCode]
  const chain = chains[currency.chain]
  const client = getClient(currencyCode, wallet)
  const networkClient = getNetworkClient(currencyCode, wallet)

  const addressesPerCall = 100
  const unusedAddress = await client.wallet.getUnusedAddress()
  let allAddresses = await client.wallet.getUsedAddresses(addressesPerCall)

  allAddresses = [ ...new Set([ unusedAddress, ...allAddresses ].map(a => a.address)) ]
  allAddresses = allAddresses.map(address => chain.formatAddress(address))
  if (wallets[party].addresses[0] !== null) { // Preserve the preset address for party B
    const expectedAddress = wallets[party].addresses[0]
    if (allAddresses.includes(expectedAddress)) {
      allAddresses = [expectedAddress, ...allAddresses.filter(address => address !== expectedAddress)]
    }
  }

  const balance = await client.chain.getBalance(allAddresses)
  const networkBalance = networkClient === client ? balance : await networkClient.chain.getBalance(allAddresses)
  const otherParty = party === 'a' ? 'b' : 'a'
  const swapState = getState().swap
  const walletParty = swapState.assets[party].currency === currencyCode ? party : otherParty
  if (swapState.wallets[walletParty].connecting) {
    dispatch(connectWallet(walletParty, allAddresses, unitToCurrency(currency, balance), unitToCurrency(currency, networkBalance)))
  }
}

function waitForWalletInitialization (party, currency, wallet) {
  return async (dispatch, getState) => {
    let walletConnectionError
    try {
      await connectToWallet(party, wallet, dispatch, getState)
    } catch (e) {
      console.log(e)
      walletConnectionError = e
    }

    if (walletConnectionError) {
      dispatch(connectingError(party, walletConnectionError))
    }
  }
}

function toggleWalletConnect (party) {
  return { type: types.TOGGLE_WALLET_CONNECT, party }
}

function chooseWallet (party, wallet) {
  return { type: types.CHOOSE_WALLET, party, wallet }
}

function startConnecting (party) {
  return { type: types.START_CONNECTING_WALLET, party }
}

function connectingError (party, error) {
  return { type: types.CONNECTING_WALLET_ERROR, party, error }
}

function connectWallet (party, addresses, balance, networkBalance) {
  return { type: types.CONNECT_WALLET, party, addresses, balance, networkBalance }
}

function disconnectWallet (party) {
  return async (dispatch, getState) => {
    const swap = getState().swap
    dispatch({ type: types.DISCONNECT_WALLET, party, preserveAddress: swap.isPartyB || swap.step !== steps.INITIATION })
    dispatch(closePopup())
  }
}

function setPopupSteps (steps) {
  return { type: types.SET_POPUP_STEPS, steps }
}

function setPopupStep (step) {
  return { type: types.SET_POPUP_STEP, step }
}

function closePopup () {
  return { type: types.CLOSE_POPUP }
}

const actions = {
  waitForWallet,
  waitForWalletInitialization,
  toggleWalletConnect,
  chooseWallet,
  connectWallet,
  disconnectWallet,
  setPopupSteps,
  setPopupStep,
  closePopup
}

export { types, actions }
