import { BitcoinNetworks } from '@liquality/bitcoin-networks'
import { EthereumNetworks } from '@liquality/ethereum-networks'
import config from '../config'
import moment from 'moment'

const networksMap = {
  BTC: BitcoinNetworks,
  ETH: EthereumNetworks,
  RBTC: EthereumNetworks,
  erc20: EthereumNetworks,
  MATIC: EthereumNetworks
}

function getNetworkByCurrency (asset) {
  const assetConfig = config.assets[asset]
  const networkId = assetConfig.network
  const networks = networksMap[asset] || networksMap[assetConfig.type]
  return networks[networkId]
}

function isEthereumAsset (asset) {
  const assetConfig = config.assets[asset]
  return asset === 'ETH' || assetConfig.type === 'erc20'
}

function isEthereumNetwork (asset) {
  return asset === 'RBTC' || asset === 'MATIC' || isEthereumAsset(asset)
}

function getConfirmationEstimate (asset) {
  if (isEthereumNetwork(asset)) {
    return moment.duration(1, 'minutes')
  } else if (asset === 'BTC') {
    return moment.duration(10, 'minutes')
  } else {
    throw new Error('UNSUPPORTED NETWORK FOR ESTIMATION')
  }
}

export { getNetworkByCurrency, isEthereumAsset, getConfirmationEstimate }
