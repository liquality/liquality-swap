import axios from 'axios'

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
    this._cache = {}
  }

  async getCoins () {
    if ('coins' in this._cache) {
      return this._cache.coins
    }

    const response = await this._axios.get('/coins/list')
    const coins = response.data
    this._cache.coins = coins
    return coins
  }

  async getPrices (baseCurrencies, toCurrency) {
    const coins = await this.getCoins()
    const coindIds = baseCurrencies.map(currency => coins.find(coin => coin.symbol === currency).id)
    const response = await this._axios.get(`/simple/price?ids=${coindIds.join(',')}&vs_currencies=${toCurrency}`)
    const prices = response.data
    const symbolPrices = Object.entries(prices).reduce((curr, [id, toPrices]) => {
      const currencySymbol = coins.find(coin => coin.id === id).symbol
      return Object.assign(curr, { [currencySymbol]: toPrices[toCurrency] })
    }, {})
    return symbolPrices
  }
}

const coingecko = new CoinGecko()

export default coingecko
