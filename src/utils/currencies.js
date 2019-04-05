import _ from 'lodash'
import * as ethUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'
import btcIcon from '../../node_modules/cryptocurrency-icons/svg/color/btc.svg'
import ethIcon from '../../node_modules/cryptocurrency-icons/svg/color/eth.svg'
import daiIcon from '../../node_modules/cryptocurrency-icons/svg/color/dai.svg'

let currencies = {
  'btc': {
    name: 'Bitcoin',
    icon: btcIcon,
    code: 'BTC',
    decimals: 8,
    // TODO: include network types in validation
    isValidAddress: address => /^[13mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address),
    formatAddress: address => address
  },
  'eth': {
    name: 'Ethereum',
    icon: ethIcon,
    code: 'ETH',
    decimals: 18,
    isValidAddress: ethUtil.isValidAddress,
    formatAddress: ethUtil.toChecksumAddress
  },
  'dai': {
    name: 'Dai',
    icon: daiIcon,
    code: 'DAI',
    decimals: 18,
    isValidAddress: ethUtil.isValidAddress,
    formatAddress: ethUtil.toChecksumAddress
  }
}

function withCurrencyConverters (currency) {
  const multiplier = BigNumber(10).pow(currency.decimals)
  currency.unitToCurrency = value => BigNumber(value).dividedBy(multiplier).toNumber()
  currency.currencyToUnit = value => BigNumber(value).times(multiplier).toNumber()
  return currency
}

currencies = _.mapValues(currencies, withCurrencyConverters)

export default currencies
