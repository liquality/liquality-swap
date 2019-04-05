import { providers } from '@liquality/chainabstractionlayer/dist/index.umd.js'
import config from '../config'

const networksMap = {
  btc: providers.bitcoin.networks,
  eth: providers.ethereum.networks,
  erc20: providers.ethereum.networks
}

function getNetworkByCurrency (asset) {
  const assetConfig = config.assets[asset]
  const networkId = assetConfig.network
  const networks = networksMap[asset] || networksMap[assetConfig.type]
  return networks[networkId]
}

export { getNetworkByCurrency }
