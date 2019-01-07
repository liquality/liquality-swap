import { providers } from '@liquality/chainabstractionlayer/dist/index.umd.js'
import config from '../config'

const networksByCurrency = {
  btc: providers.bitcoin.networks,
  eth: providers.ethereum.networks
}

function getNetworkByCurrency (currency) {
  const networkId = config[currency].network
  return networksByCurrency[currency][networkId]
}

export { getNetworkByCurrency }
