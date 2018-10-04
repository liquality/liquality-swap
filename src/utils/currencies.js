import btcIcon from '../icons/btc.svg'
import ethIcon from '../icons/eth.svg'

const SAT_TO_BTC = 100000000
const WEI_TO_ETH = 1000000000000000000

const currencies = {
  'btc': {
    icon: btcIcon,
    code: 'BTC',
    // TODO: include network types in validation
    isValidAddress: address => /^[13mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address),
    unitToCurrency (value) {
      return value / SAT_TO_BTC
    },
    currencyToUnit (value) {
      return value * SAT_TO_BTC
    }
  },
  'eth': {
    icon: ethIcon,
    code: 'ETH',
    isValidAddress: address => /^[0-9a-fA-F]{40}$/.test(address),
    unitToCurrency (value) {
      return value / WEI_TO_ETH
    },
    currencyToUnit (value) {
      return value * WEI_TO_ETH
    }
  }
}

export default currencies
