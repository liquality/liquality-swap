import { getClient } from '../services/chainClient'
import currencies from '../utils/currencies'

const types = {
  TOGGLE_WALLET_CONNECT: 'TOGGLE_WALLET_CONNECT',
  CHOOSE_WALLET: 'CHOOSE_WALLET',
  CONNECT_WALLET: 'CONNECT_WALLET',
  DISCONNECT_WALLET: 'DISCONNECT_WALLET'
}

function waitForWallet (party, currency, wallet) {
  return async (dispatch, getState) => {
    const {
      assets,
      wallets,
      isPartyB
    } = getState().swap

    const currency = assets[party].currency
    const client = getClient(currency)

    if (currency === 'eth') {
      window.ethereum.enable()
    }

    dispatch(chooseWallet(party, wallet))
    const addressesPerCall = 100
    const unusedAddress = await client.getUnusedAddress()
    let allAddresses = await client.getUsedAddresses(addressesPerCall)
    allAddresses = [ unusedAddress, ...allAddresses ].map(a => a.address)

    if (isPartyB) { // Preserve the preset address for party B
      const expectedAddress = wallets[party].addresses[0]
      if (allAddresses.includes(expectedAddress)) {
        allAddresses = [expectedAddress, ...allAddresses.filter(address => address !== expectedAddress)]
      }
    }

    const balance = await client.getBalance(allAddresses)
    const formattedBalance = currencies[currency].unitToCurrency(balance).toFixed(6)
    dispatch(connectWallet(party, allAddresses, formattedBalance))
  }
}

function toggleWalletConnect (party, target) {
  return { type: types.TOGGLE_WALLET_CONNECT, party, target }
}

function chooseWallet (party, wallet) {
  return { type: types.CHOOSE_WALLET, party, wallet }
}

function connectWallet (party, addresses, balance) {
  return { type: types.CONNECT_WALLET, party, addresses, balance }
}

function disconnectWallet (party) {
  return { type: types.DISCONNECT_WALLET, party }
}

const actions = {
  waitForWallet,
  toggleWalletConnect,
  chooseWallet,
  connectWallet,
  disconnectWallet
}

export { types, actions }
