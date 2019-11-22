import axios from 'axios'
import config from '../config'

class Agent {
  constructor (url) {
    this._url = url
    this._axios = axios.create({baseURL: this._url})
    this._axios.interceptors.response.use(function (response) {
      return response
    }, function (e) {
      if (e.response.data && e.response.data.error) {
        throw new Error(`Agent: ${e.response.data.error}`)
      } else return e
    })
  }

  async getMarketInfo () {
    const response = await this._axios.get('/api/swap/marketinfo')
    return response.data
  }

  async getQuote (from, to, fromAmount) {
    const response = await this._axios.post('/api/swap/order', {
      from: from.toUpperCase(), to: to.toUpperCase(), fromAmount
    })
    return response.data
  }

  async submitOrder (quoteId, fundHash, fromAddress, toAddress, secretHash, expiration) {
    const response = await this._axios.post(`/api/swap/order/${quoteId}`, {
      fromFundHash: fundHash,
      fromAddress,
      toAddress,
      secretHash,
      swapExpiration: expiration
    })
    return response.data
  }
}

const agent = new Agent(config.hostAgent)

export default agent
