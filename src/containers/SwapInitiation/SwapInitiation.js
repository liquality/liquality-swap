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
import AssetSelector from '../../components/AssetSelector/AssetSelector'
import './SwapInitiation.css'
import wallets from '../../utils/wallets'
import { getInitiationErrors } from '../../utils/validation'

class SwapInitiation extends Component {
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
        {!errors.initiation && !this.props.isPartyB && <Button wide primary loadingAfterClick loadingAfterClickMessage={buttonLoadingMessage} onClick={this.props.initiateSwap}>Next</Button>}
        {!errors.initiation && this.props.isPartyB && <Button wide primary loadingAfterClick loadingAfterClickMessage={buttonLoadingMessage} onClick={this.props.confirmSwap}>Confirm Terms</Button>}
        {errors.initiation && <div className='SwapInitiation_errorMessage'>{errors.initiation}</div>}
      </div>
      <AssetSelector open />
    </div>
  }
}

export default SwapInitiation
