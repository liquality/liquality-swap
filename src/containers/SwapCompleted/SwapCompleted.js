import React, { Component } from 'react'
import CurrencyInputs from '../CurrencyInputs'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import Button from '../../components/Button/Button'
import TickIcon from '../../icons/tick.svg'
import HandshakeIcon from '../../icons/handshake.png'

import config from '../../config'
import { APP_BASE_URL } from '../../utils/app-links'

import './SwapCompleted.css'

class SwapCompleted extends Component {
  render () {
    return <div className='SwapCompleted'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        haveLabel='Sent'
        wantLabel='Received'
        icon={TickIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='SwapCompleted_top'>
        <CurrencyInputs showInputs leftInputDisabled rightInputDisabled />
        <h2 className='SwapCompleted_label'>Swap Completed</h2>
        <p className='SwapCompleted_subLabel'>
          Go to {this.props.assets.b.currency === 'btc' ? 'Ledger Live' : 'MetaMask'} to confirm your balance
        </p>
        <span className='SwapCompleted_handshake'><img src={HandshakeIcon} alt='' /></span>
      </div>
      <div className='SwapCompleted_bottom'>
        <Button wide primary onClick={() => window.location.replace(APP_BASE_URL)}>Start another Swap</Button>
        {config.twitterButton && <a className='twitter-share-button' href={'https://twitter.com/intent/tweet' + config.twitterButton} data-size='large'>Tweet</a>}
      </div>
    </div>
  }
}

export default SwapCompleted
