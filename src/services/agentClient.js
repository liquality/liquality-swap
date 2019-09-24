import axios from 'axios'
import config from '../config'

class Agent {
  constructor (url) {
    this._url = url
    this._axios = axios.create({baseURL: this._url})
  }

  async getMarketInfo () {
    const response = await this._axios.get('/api/swap/marketinfo')
    return response.data
  }

  async getQuote (from, to, amount) {
    const response = await this._axios.post('/api/swap/order', {
      from, to, amount
    })
    return response.data
  }

  async submitOrder (quoteId, fundHash, amount, fromAddress, toAddress, secretHash, expiration) {
    const response = await this._axios.post(`/api/swap/order/${quoteId}`, {
      fromFundHash: fundHash,
      amount,
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
