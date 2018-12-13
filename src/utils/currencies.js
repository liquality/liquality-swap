import btcIcon from '../icons/btc.svg'
import ethIcon from '../icons/eth.svg'
import BigNumber from 'bignumber.js'

const SAT_TO_BTC = 100000000
const WEI_TO_ETH = 1000000000000000000

const currencies = {
  'btc': {
    icon: btcIcon,
    code: 'BTC',
    // TODO: include network types in validation
    isValidAddress: address => /^[13mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address),
    unitToCurrency (value) {
      return BigNumber(value).dividedBy(SAT_TO_BTC).toNumber()
    },
    currencyToUnit (value) {
      return BigNumber(value).times(SAT_TO_BTC).toNumber()
    }
  },
  'eth': {
    icon: ethIcon,
    code: 'ETH',
    isValidAddress: address => /^(0x)?[0-9a-fA-F]{40}$/.test(address),
    unitToCurrency (value) {
      return BigNumber(value).dividedBy(WEI_TO_ETH).toNumber()
    },
    currencyToUnit (value) {
      return BigNumber(value).times(WEI_TO_ETH).toNumber()
    }
  }
}

export default currencies
