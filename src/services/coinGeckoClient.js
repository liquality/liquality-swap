import axios from 'axios'
import _ from 'lodash'
import { assets as cryptoassets } from '@liquality/cryptoassets'

class CoinGecko {
  constructor (url = 'https://api.coingecko.com/api/v3') {
    this._url = url
    this._axios = axios.create({baseURL: this._url})
    this._axios.interceptors.response.use(function (response) {
      return response
    }, function (e) {
      let error = ''
      if (e.response && e.response.data && e.response.data.error) error = '. ' + e.response.data.error
      throw new Error(`CoinGecko: ${e.message}${error}`)
    })
  }

  async getPrices (baseCurrencies, toCurrency) {
    const coindIds = baseCurrencies.map(currency => cryptoassets[currency].coinGeckoId)
    const { data } = await this._axios.get(`/simple/price?ids=${coindIds.join(',')}&vs_currencies=${toCurrency}`)
    let prices = _.mapKeys(data, (v, coinGeckoId) => _.findKey(cryptoassets, asset => asset.coinGeckoId === coinGeckoId))
    prices = _.mapValues(prices, rates => _.mapKeys(rates, (v, k) => k.toUpperCase()))
    const symbolPrices = _.mapValues(prices, rates => rates[toCurrency.toUpperCase()])
    return symbolPrices
  }
}

const coingecko = new CoinGecko()

export default coingecko
