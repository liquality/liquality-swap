import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import config from '../../config/config'

import './CounterPartySelection.css'

class CounterPartySelection extends Component {
  handleHostCounterPartyClick () {
    this.props.setAgent(config.hostAgent)
    this.props.history.replace('/assetSelection')
  }

  render () {
    return <div className='CounterPartySelection'>
      <h1>Do you have a counterparty?</h1>
      <p>If not, don't worry. <br /> Find one or choose <strong>{config.hostName}</strong>.</p>
      <div class='CounterPartySelection_buttons'>
        <p><Button wide secondary onClick={() => this.props.history.replace('/assetSelection')}>I have a counterparty</Button></p>
        <Button wide secondary onClick={() => this.handleHostCounterPartyClick()}>Choose {config.hostName} as counterparty</Button>
      </div>
    </div>
  }
}

export default CounterPartySelection
