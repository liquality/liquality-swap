import React, { Component } from 'react'
import CurrencyInputs from '../CurrencyInputs'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import Button from '../../components/Button/Button'

import CompletedIcon from '../../icons/completed.svg'
import HandshakeIcon from '../../icons/handshake.png'
import './SwapCompleted.css'
import config from '../../config'

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
      <div className='SwapCompleted_top'>
        <CurrencyInputs disabled />
        <h2 className='SwapCompleted_label'>Swap Completed</h2>
        <p className='SwapCompleted_subLabel'>
          Go to {this.props.assets.b.currency === 'btc' ? 'Ledger Live' : 'MetaMask'} to confirm your balance
        </p>
        <span className='SwapCompleted_handshake'><img src={HandshakeIcon} alt='' /></span>
      </div>
      <div className='SwapCompleted_bottom'>
        <Button wide primary onClick={() => window.location.replace('/')}>Start another Swap</Button>
        {config.twitterButton && <a className='twitter-share-button' href={'https://twitter.com/intent/tweet' + config.twitterButton} data-size='large'>Tweet</a>}
      </div>
    </div>
  }
}

export default SwapCompleted
