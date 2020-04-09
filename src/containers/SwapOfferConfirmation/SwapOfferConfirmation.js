import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import assets from '@liquality/cryptoassets'
import { isETHNetwork } from '../../utils/networks'
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
    const assetA = assets[this.props.assets.a.currency]
    const assetB = assets[this.props.assets.b.currency]

    return <BrandCard className='SwapOfferConfirmation' title='Accept Quote'>
      <TimeProgressBar startTime={this.props.quote.retrievedAt} endTime={this.props.quote.expiresAt} />
      <div className='SwapOfferConfirmation_terms'>Get {this.props.assets.b.value.toFixed()} {assetB.code} <br />
      for<br />
        {this.props.assets.a.value.toFixed()} {assetA.code}</div>
      <div className='SwapOfferConfirmation_rate'>Rate: 1 {assetA.code} = {this.props.assets.rate.toFixed()} {assetB.code}</div>
      <div className='SwapOfferConfirmation_info'>
        <p>To accept this quote please connect your:</p>
        <ul>
          <li>{assetA.code} wallet to sign the first swap transaction</li>
          <li>{assetB.code} wallet for the receiving address</li>
          {isETHNetwork(this.props.assets.b.currency) && <li>ETH wallet has to have enough funds to cover transaction fee</li>}
        </ul>
        <p>All terms, including the quote will be confirmed in the next step.</p>
      </div>
      <div className='SwapOfferConfirmation_bottom'>
        <Button wide primary onClick={() => this.handleAcceptRate()}>Connect Wallets To Accept Quote</Button><br />
        <Button wide link onClick={() => this.handleCancel()}>Cancel</Button>
      </div>
    </BrandCard>
  }
}

export default SwapOfferConfirmation
