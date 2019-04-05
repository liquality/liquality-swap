/* global web3, localStorage */

import { Client, providers } from '@liquality/chainabstractionlayer/dist/index.umd.js'
import config from '../config'

function createBtcClient () {
  const networks = providers.bitcoin.networks
  const btcConfig = config.assets.btc
  const btcClient = new Client()
  btcClient.addProvider(new providers.bitcoin.BitcoreRPCProvider(
    localStorage.btcRpc || window.btcRpc || process.env.REACT_APP_BTC_RPC || btcConfig.rpc.url,
    localStorage.btcRpcUser || window.btcRpcUser || process.env.REACT_APP_BTC_RPC_USER || btcConfig.rpc.username,
    localStorage.btcRpcPass || window.btcRpcPass || process.env.REACT_APP_BTC_RPC_PASS || btcConfig.rpc.password,
    btcConfig.feeNumberOfBlocks
  ))
  btcClient.addProvider(new providers.bitcoin.BitcoinLedgerProvider({network: networks[btcConfig.network]}))
  btcClient.addProvider(new providers.bitcoin.BitcoinSwapProvider({network: networks[btcConfig.network]}))
  return btcClient
}

function createEthClient () {
  const networks = providers.ethereum.networks
  const ethConfig = config.assets.eth
  const ethClient = new Client()
  ethClient.addProvider(new providers.ethereum.EthereumRPCProvider(
    localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || ethConfig.rpc.url
  ))
  ethClient.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider, networks[ethConfig.network]))
  ethClient.addProvider(new providers.ethereum.EthereumSwapProvider())
  return ethClient
}

function createERC20Client (asset) {
  const networks = providers.ethereum.networks
  const assetConfig = config.assets[asset]
  const erc20Client = new Client()
  erc20Client.addProvider(new providers.ethereum.EthereumRPCProvider(
    localStorage.ethRpc || window.ethRpc || process.env.REACT_APP_ETH_RPC || assetConfig.rpc.url
  ))
  erc20Client.addProvider(new providers.ethereum.EthereumMetaMaskProvider(web3.currentProvider, networks[assetConfig.network]))
  erc20Client.addProvider(new providers.ethereum.EthereumERC20Provider(assetConfig.contractAddress))
  erc20Client.addProvider(new providers.ethereum.EthereumERC20SwapProvider())
  return erc20Client
}

const clientCreators = {
  btc: createBtcClient,
  eth: createEthClient,
  erc20: createERC20Client
}

const clients = {}

function getClient (asset) {
  if (asset in clients) return clients[asset]
  const assetConfig = config.assets[asset]
  const creator = clientCreators[asset] || clientCreators[assetConfig.type]
  const client = creator(asset)
  clients[asset] = client
  return client
}

export { getClient }
