/* global web3 */

import { Client, providers, networks } from 'chainabstractionlayer'

const ethClient = new Client()
ethClient.addProvider(new providers.ethereum.EthereumRPCProvider('http://localhost:8545'))
ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider))
ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())

const btcClient = new Client()
btcClient.addProvider(new providers.bitcoin.BitcoinRPCProvider('http://localhost:8545'))
btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider({network: networks.bitcoin_testnet}))
btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider())

const clients = {
  eth: ethClient,
  btc: btcClient
}

function getClient (code) {
  return clients[code]
}

export { getClient, ethClient, btcClient }
