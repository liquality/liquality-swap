import moment from 'moment'
import axios from 'axios'

class Agent {
  constructor (url) {
    this._url = url
    this._axios = axios.create({baseURL: this._url})
    this._axios.interceptors.response.use(function (response) {
      return response
    }, function (e) {
      let error = ''
      if (e.response && e.response.data && e.response.data.error) error = '. ' + e.response.data.error
      throw new Error(`Agent: ${e.message}${error}`)
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
    return {
      ...response.data,
      swapExpiration: moment.unix(response.data.swapExpiration),
      retrievedAt: Date.now()
    }
  }

  async submitOrder (quoteId, fundHash, fromAddress, toAddress, secretHash) {
    const response = await this._axios.post(`/api/swap/order/${quoteId}`, {
      fromFundHash: fundHash,
      fromAddress,
      toAddress,
      secretHash
    })
    return response.data
  }
}

const agentClients = {}

function getAgentClient (url) {
  if (url in agentClients) {
    return agentClients[url]
  } else {
    const client = new Agent(url)
    agentClients[url] = client
    return client
  }
}

export { getAgentClient }
