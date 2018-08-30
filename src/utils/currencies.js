import btcIcon from '../icons/btc.svg'
import ethIcon from '../icons/eth.svg'

const currencies = {
  'btc': {
    icon: btcIcon,
    code: 'BTC',
    // TODO: include network types in validation
    isValidAddress: address => /^[13mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address)
  },
  'eth': {
    icon: ethIcon,
    code: 'ETH',
    isValidAddress: address => /^[0-9a-fA-F]{40}$/.test(address)
  }
}

export default currencies
