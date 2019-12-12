import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import assets from '@liquality/cryptoassets'
import { APP_BASE_URL } from '../../utils/app-links'
import './SwapOfferConfirmation.css'
import BrandCard from '../../components/BrandCard/BrandCard'
import TimeProgressBar from '../../components/TimeProgressBar/TimeProgressBar'

class SwapOfferConfirmation extends Component {
  handleAcceptRate () {
    this.props.history.replace('/walletB')
  }

  handleCancel () {
    window.location.replace(APP_BASE_URL)
    // TODO: instead clear the quote from the state and navigate to counterparty selection?
  }
  render () {
    return <BrandCard className='SwapOfferConfirmation' title='Offer'>
      <TimeProgressBar startTime={this.props.quote.retrievedAt} endTime={this.props.quote.expiresAt} />
      <div class='SwapOfferConfirmation_terms'>Get {this.props.assets.b.value} {assets[this.props.assets.b.currency].code} <br />
      for<br />
        {this.props.assets.a.value} {assets[this.props.assets.a.currency].code}</div>
      <div class='SwapOfferConfirmation_rate'>Rate: 1 {assets[this.props.assets.a.currency].code} = {this.props.assets.rate} {assets[this.props.assets.b.currency].code}</div>
      <div className='SwapOfferConfirmation_bottom'>
        <Button wide primary onClick={() => this.handleAcceptRate()}>Connect Wallets</Button><br />
        <Button wide link onClick={() => this.handleCancel()}>Cancel</Button>
      </div>
    </BrandCard>
  }
}

export default SwapOfferConfirmation
