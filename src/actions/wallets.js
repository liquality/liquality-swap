import { getClient } from '../services/chainClient'
import cryptoassets from '@liquality/cryptoassets'

const types = {
  TOGGLE_WALLET_CONNECT: 'TOGGLE_WALLET_CONNECT',
  CHOOSE_WALLET: 'CHOOSE_WALLET',
  CONNECT_WALLET: 'CONNECT_WALLET',
  DISCONNECT_WALLET: 'DISCONNECT_WALLET'
}

function waitForWallet (party, currency, wallet) {
  return async (dispatch, getState) => {
    dispatch(chooseWallet(party, wallet))
  }
}

function waitForWalletInitialization (party, currency, wallet) {
  return async (dispatch, getState) => {
    const {
      assets,
      wallets,
      isPartyB
    } = getState().swap

    const currencyCode = assets[party].currency
    const currency = cryptoassets[currencyCode]
    const client = getClient(currencyCode, wallet)

    const addressesPerCall = 100
    const unusedAddress = await client.getUnusedAddress()
    let allAddresses = await client.getUsedAddresses(addressesPerCall)
    allAddresses = [ ...new Set([ unusedAddress, ...allAddresses ].map(a => a.address)) ]
    allAddresses = allAddresses.map(currency.formatAddress)

    if (isPartyB) { // Preserve the preset address for party B
      const expectedAddress = wallets[party].addresses[0]
      if (allAddresses.includes(expectedAddress)) {
        allAddresses = [expectedAddress, ...allAddresses.filter(address => address !== expectedAddress)]
      }
    }

    const balance = await client.getBalance(allAddresses)
    const formattedBalance = currency.unitToCurrency(balance).toFixed(6)
    const otherParty = party === 'a' ? 'b' : 'a'
    const walletParty = getState().swap.assets[party].currency === currencyCode ? party : otherParty
    dispatch(connectWallet(walletParty, allAddresses, formattedBalance))
  }
}

function toggleWalletConnect (party) {
  return { type: types.TOGGLE_WALLET_CONNECT, party }
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
  waitForWalletInitialization,
  toggleWalletConnect,
  chooseWallet,
  connectWallet,
  disconnectWallet
}

export { types, actions }
