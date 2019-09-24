import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import BrandCard from '../../components/BrandCard/BrandCard'
import agent from '../../services/agentClient'
import config from '../../config/config'

import './CounterPartySelection.css'

class CounterPartySelection extends Component {
  constructor () {
    super()
    this.state = { marketInfo: [] }
  }

  componentDidMount () {
    agent.getMarketInfo().then((marketInfo) => {
      this.setState({ marketInfo })
    })
  }

  handleAcceptOffer (from, to, min) {
    this.props.retrieveAgentQuote(from, to, min)
    this.props.history.replace('/walletB')
  }

  render () {
    return <BrandCard className='CounterPartySelection' title='Trade with us or bring your own counterparty'>
      <h2>Offers</h2>
      <table class='CounterPartySelection_table'>
        <thead>
          <tr>
            <th>Have</th>
            <th>Want</th>
            <th>Rate</th>
            <th>Min</th>
            <th>Max</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { this.state.marketInfo.map(market => <tr>
            <th>{market.from}</th>
            <td>{market.to}</td>
            <td>{market.rate}</td>
            <td>{market.min} {market.from}</td>
            <td>{market.max} {market.from}</td>
            <td className='button'><Button secondary small wide onClick={() => { this.handleAcceptOffer(market.from, market.to, market.min) }}>Accept</Button></td>
          </tr>) }
        </tbody>
      </table>
      <div class='CounterPartySelection_buttons'>
        <p><Button wide secondary onClick={() => this.props.history.replace('/assetSelection')}>I have a counterparty</Button></p>
      </div>
    </BrandCard>
  }
}

export default CounterPartySelection
