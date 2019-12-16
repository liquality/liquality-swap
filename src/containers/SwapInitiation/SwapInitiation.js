import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import ExpirationDetails from '../../components/ExpirationDetails'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import TimeProgressBar from '../../components/TimeProgressBar/TimeProgressBar'
import HandshakeIcon from '../../icons/handshake.png'
import SwapIcon from '../../icons/switch.svg'
import CounterPartyWallets from '../CounterPartyWallets'
import CurrencyInputs from '../CurrencyInputs'
import InitiatorExpirationInfo from '../InitiatorExpirationInfo'
import WalletPanel from '../WalletPanel'
import './SwapInitiation.css'
import { getInitiationErrors } from '../../utils/validation'
import { APP_BASE_URL } from '../../utils/app-links'

class SwapInitiation extends Component {
  render () {
    const errors = getInitiationErrors(this.props.transactions, this.props.expiration, this.props.isVerified, this.props.isPartyB, this.props.quote)
    const inputsDisabled = this.props.isPartyB || this.props.quote
    return <div className='SwapInitiation'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        icon={inputsDisabled ? undefined : SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='SwapInitiation_top'>
        {this.props.quote && <div className='SwapInitiation_quoteTimer'><TimeProgressBar startTime={this.props.quote.retrievedAt} endTime={this.props.quote.expiresAt} /></div>}
        <CurrencyInputs showInputs leftInputDisabled={inputsDisabled} rightInputDisabled={inputsDisabled} rateDisabled={this.props.assets.rateLocked} showRate />
      </div>
      <WalletPanel />
      <div className='SwapInitiation_bottom'>
        { this.props.isPartyB
          ? <span className='SwapInitiation_handshake'><img src={HandshakeIcon} alt='Agree' /></span>
          : this.props.counterParty.visible && <h5 className='SwapInitiation_counterPartyLabel'>Counter party wallets</h5> }
        { this.props.counterParty.visible && <CounterPartyWallets /> }
        { this.props.isPartyB
          ? <ExpirationDetails />
          : <InitiatorExpirationInfo /> }
        {!errors.initiation && !this.props.isPartyB && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.initiateSwap}>Initiate Swap</Button>}
        {!errors.initiation && this.props.isPartyB && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.confirmSwap}>Confirm Terms</Button>}
        {errors.initiation && <Button primary disabled>{ errors.initiation }</Button>}<br />
        {/* TODO: Do actual resetting of app state instead of refresh. */}
        <Button wide link onClick={() => window.location.replace(APP_BASE_URL)}>{ this.props.isPartyB ? 'Abandon Swap' : 'Cancel' }</Button>
      </div>
    </div>
  }
}

export default SwapInitiation
