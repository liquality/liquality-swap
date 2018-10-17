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

    const unusedAddress = isPartyB ? wallets[party].addresses[0] : (await client.getUnusedAddress()).address
    let usedAddresses = []
    let unusedAddressFound = false
    let addressesIndex = 0
    while (true) {
      let addresses = await client.getAddresses(addressesIndex, 5)
      addresses = addresses.map(addr => addr.address)
      for (const address of addresses) {
        if (address === unusedAddress) {
          unusedAddressFound = true
          break
        } else {
          usedAddresses.push(address)
        }
      }
      if (unusedAddressFound) break
      addressesIndex += 5
      await sleep(1000)
    }

    const balance = await client.getBalance([...usedAddresses, unusedAddress])
    const formattedBalance = currencies[currency].unitToCurrency(balance).toFixed(3)
    dispatch(connectWallet(party, [unusedAddress, ...usedAddresses], formattedBalance))
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
