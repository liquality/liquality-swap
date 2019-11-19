import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import config from '../../config/config'

import './CounterPartySelection.css'

class CounterPartySelection extends Component {
  render () {
    return <div className='CounterPartySelection'>
      <h1>Do you have a counterparty?</h1>
      <p>If not, don't worry. <br />You can trade with <strong>{config.hostName}</strong>.</p>
      <div class='CounterPartySelection_buttons'>
        <p><Button wide secondary onClick={() => this.props.history.replace('/assetSelection')}>I have a counterparty</Button></p>
        <Button wide secondary onClick={() => this.props.connectAgent()}>Choose {config.hostName} as counterparty</Button>
      </div>
    </div>
  }
}
export default CounterPartySelection
