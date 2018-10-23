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
    dispatch(chooseWallet(party, wallet))
    const currency = assets[party].currency
    const client = getClient(currency)

    let unusedAddress
    let usedAddresses = []
    let addressesIndex = 0
    while (true) {
      let addresses = await client.getAddresses(addressesIndex, 5)
      addresses = addresses.map(addr => addr.address)
      for (const address of addresses) {
        if (await client.isAddressUsed(address)) {
          usedAddresses.push(address)
        } else {
          unusedAddress = address
          break
        }
      }
      if (unusedAddress) break
      addressesIndex += 5
    }

    let allAddresses = [unusedAddress, ...usedAddresses]
    if (isPartyB) { // Preserve the preset address for party B
      const expectedAddress = wallets[party].addresses[0]
      if (allAddresses.includes(expectedAddress)) {
        allAddresses = [expectedAddress, ...allAddresses.filter(address => address !== expectedAddress)]
      }
    }

    const balance = await client.getBalance(allAddresses)
    const formattedBalance = currencies[currency].unitToCurrency(balance).toFixed(3)
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
