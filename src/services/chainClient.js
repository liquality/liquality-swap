/* global web3 */

import { Client, providers, networks } from '@liquality/chainabstractionlayer/dist/index.umd.js'

const ethClient = new Client()
ethClient.addProvider(new providers.ethereum.EthereumRPCProvider('https://rinkeby.infura.io:443/'))
ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider))
ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())

const btcClient = new Client()
btcClient.addProvider(new providers.bitcore.BitcoreRPCProvider('https://btc-testnet.leep.it:443', 'bitcoin', 'local321'))
//btcClient.addProvider(new providers.bitcore.BitcoreRPCProvider('https://btc.leep.it:443', 'bitcoin', 'local321'))
btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider({network: networks.bitcoin_testnet}))
btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider({network: networks.bitcoin_testnet}))

const clients = {
  eth: ethClient,
  btc: btcClient
}

function getClient (code) {
  return clients[code]
}

export { getClient, ethClient, btcClient }
