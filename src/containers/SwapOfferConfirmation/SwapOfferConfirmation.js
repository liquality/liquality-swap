import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import CurrencyInputs from '../CurrencyInputs'
import { APP_BASE_URL } from '../../utils/app-links'
import './SwapOfferConfirmation.css'

class SwapOfferConfirmation extends Component {
  handleAcceptRate () {
    this.props.history.replace('/walletB')
  }

  handleCancel () {
    window.location.replace(APP_BASE_URL)
    // TODO: instead clear the quote from the state and navigate to counterparty selection?
  }
  render () {
    return <div className='SwapOfferConfirmation'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        showCurrencyLabels />
      <div className='SwapOfferConfirmation_top'>
        <CurrencyInputs showInputs={false} showRate rateDisabled />
      </div>
      <div className='SwapOfferConfirmation_bottom'>
        <Button wide primary onClick={() => this.handleAcceptRate()}>Accept Rate</Button><br />
        <Button wide link onClick={() => this.handleCancel()}>Cancel</Button>
      </div>
    </div>
  }
}

export default SwapOfferConfirmation
