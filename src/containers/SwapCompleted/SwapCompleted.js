import React, { Component } from 'react'
import CurrencyInputs from '../CurrencyInputs'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import Button from '../../components/Button/Button'

import CompletedIcon from '../../icons/completed.svg'
import HandshakeIcon from '../../icons/handshake.png'
import './SwapCompleted.css'

class SwapCompleted extends Component {
  render () {
    return <div className='SwapCompleted'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        haveLabel='Sent'
        wantLabel='Received'
        icon={CompletedIcon}
        onIconClick={() => this.props.switchSides()} />
      <div class='SwapCompleted_top'>
        <CurrencyInputs disabled />
        <h2 class='SwapCompleted_label'>Swap Completed</h2>
        <p class='SwapCompleted_subLabel'>
          Go to {this.props.assets.b.currency === 'btc' ? 'Ledger Live' : 'MetaMask'} to confirm your balance
        </p>
        <span class='SwapCompleted_handshake'><img src={HandshakeIcon} /></span>
      </div>
      <div class='SwapCompleted_bottom'>
        <Button wide primary onClick={() => window.location.replace('/')}>Start another Swap</Button>
      </div>
    </div>
  }
}

export default SwapCompleted
