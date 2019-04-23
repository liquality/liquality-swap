import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import ExpirationDetails from '../../components/ExpirationDetails'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import HandshakeIcon from '../../icons/handshake.png'
import SwapIcon from '../../icons/switch.svg'
import CounterPartyWallets from '../CounterPartyWallets'
import CurrencyInputs from '../CurrencyInputs'
import InitiatorExpirationInfo from '../InitiatorExpirationInfo'
import WalletPanel from '../WalletPanel'
import './SwapInitiation.css'
import { wallets } from '../../utils/wallets'
import { getInitiationErrors } from '../../utils/validation'
import { APP_BASE_URL } from '../../utils/app-links'

class SwapInitiation extends Component {

  componentDidMount() {
    this.forceWalletConnection()
  }

  forceWalletConnection () {
    console.log('We force wallet connection')
    this.props.toggleWalletConnect('b')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wallets.b.connectOpen && !this.props.wallets.b.connectOpen && this.props.wallets.b.connected && !this.props.wallets.a.connected) {
      console.log(this.props.wallets.b)
      this.props.toggleWalletConnect('a')
    }
  }

  render () {
    const wallet = wallets[this.props.wallets.a.type]
    const buttonLoadingMessage = wallet && `Confirm on ${wallet.name}`
    const errors = getInitiationErrors(this.props.transactions, this.props.isVerified, this.props.isPartyB)

    return <div className='SwapInitiation'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        icon={this.props.isPartyB ? undefined : SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='SwapInitiation_top'>
        <CurrencyInputs disabled={this.props.isPartyB} showRate />
      </div>
      <WalletPanel />
      <div className='SwapInitiation_bottom'>
        { this.props.isPartyB
          ? <span className='SwapInitiation_handshake'><img src={HandshakeIcon} alt='Agree' /></span>
          : <h5 className='SwapInitiation_counterPartyLabel'>Counter party wallets</h5> }
        { this.props.isPartyB || <CounterPartyWallets /> }
        { this.props.isPartyB
          ? <ExpirationDetails />
          : <InitiatorExpirationInfo /> }
        {!errors.initiation && !this.props.isPartyB && <Button wide primary loadingAfterClick loadingAfterClickMessage={buttonLoadingMessage} onClick={this.props.initiateSwap}>Initiate Swap</Button>}
        {!errors.initiation && this.props.isPartyB && <Button wide primary disabled={this.props.wallets.a === null || !this.props.wallets.a.chosen || this.props.wallets.b === null || !this.props.wallets.b.chosen} loadingAfterClick loadingAfterClickMessage={buttonLoadingMessage} onClick={this.props.confirmSwap}>Confirm Terms</Button>}<br />
        {/* TODO: Do actual resetting of app state instead of refresh. */}
        <Button wide link onClick={() => window.location.replace(APP_BASE_URL)}>{ this.props.isPartyB ? 'Abandon Swap' : 'Cancel' }</Button>
        {errors.initiation && <div className='SwapInitiation_errorMessage'>{errors.initiation}</div>}
      </div>
    </div>
  }
}

export default SwapInitiation
