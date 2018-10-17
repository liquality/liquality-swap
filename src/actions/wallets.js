import { getClient } from '../services/chainClient'
import currencies from '../utils/currencies'
import { sleep } from '../utils/async'

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
    dispatch(chooseWallet(party, wallet))
    const currency = assets[party].currency
    const client = getClient(currency)
    let addresses = []
    while (true) {
      addresses = await getClient(currency).getAddresses(0, 5)
      if (addresses.length > 0) break
      await sleep(1000)
    }
    addresses = addresses.map(addr => addr.address)
    const balance = await client.getBalance(addresses)
    const formattedBalance = currencies[currency].unitToCurrency(balance).toFixed(3)
    const unusedAddress = isPartyB ? wallets[party].addresses[0] : (await client.getUnusedAddress()).address
    dispatch(connectWallet(party, [unusedAddress], formattedBalance))
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
  toggleWalletConnect,
  waitForWallet,
  chooseWallet,
  connectWallet,
  disconnectWallet
}

export { types, actions }
