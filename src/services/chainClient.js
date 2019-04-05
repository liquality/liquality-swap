/* global web3, localStorage */

import { Client, providers } from '@liquality/chainabstractionlayer/dist/index.umd.js'
import config from '../config'

function createBtcClient () {
  const networks = providers.bitcoin.networks
  const btcClient = new Client()
  btcClient.addProvider(new providers.bitcoin.BitcoreRPCProvider(
    localStorage.btcRpc || window.btcRpc || process.env.REACT_APP_BTC_RPC || config.btc.rpc.url,
    localStorage.btcRpcUser || window.btcRpcUser || process.env.REACT_APP_BTC_RPC_USER || config.btc.rpc.username,
    localStorage.btcRpcPass || window.btcRpcPass || process.env.REACT_APP_BTC_RPC_PASS || config.btc.rpc.password,
    config.btc.feeNumberOfBlocks
  ))
  btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider({network: networks[config.btc.network]}))
  btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider({network: networks[config.btc.network]}))
  return btcClient
}

function createEthClient () {
  const networks = providers.ethereum.networks
  const ethClient = new Client()
  ethClient.addProvider(new providers.ethereum.EthereumRPCProvider(
    localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || config.eth.rpc.url
  ))
  ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider, networks[config.eth.network]))
  ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())
  return ethClient
}

function createERC20Client (asset) {
  const networks = providers.ethereum.networks
  const erc20Client = new Client()
  erc20Client.addProvider(new providers.ethereum.EthereumRPCProvider(
    localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || config[asset].rpc.url
  ))
  erc20Client.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider, networks[config[asset].network]))
  erc20Client.addProvider(new providers.ethereum.EthereumERC20Provider(config[asset].contractAddress))
  erc20Client.addProvider(new providers.ethereum.EthereumERC20SwapProvider())
  return erc20Client
}

const clientCreators = {
  btc: createBtcClient,
  eth: createEthClient,
  dai: createERC20Client
}

const clients = {}

function getClient (asset) {
  if (asset in clients) return clients[asset]
  const creator = clientCreators[asset]
  const client = creator(asset)
  clients[asset] = client
  return client
}

export { getClient }
