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
      <div className='SwapOfferConfirmation_terms'>Get {this.props.assets.b.value} {assetB.code} <br />
      for<br />
        {this.props.assets.a.value} {assetA.code}</div>
      <div className='SwapOfferConfirmation_rate'>Rate: 1 {assetA.code} = {this.props.assets.rate} {assetB.code}</div>
      <div className='SwapOfferConfirmation_info'>
        <p>To accept this quote please connect your: <br />
          {assetA.code} wallet to sign the first swap transaction<br />
          {assetB.code} wallet for the recipient
        </p>
        <p>All terms, including the quote will be confirmed in the next step.</p>
      </div>
      <div className='SwapOfferConfirmation_bottom'>
        <Button wide primary onClick={() => this.handleAcceptRate()}>Connect Wallets To Accept Quote</Button><br />
        <Button wide link onClick={() => this.handleCancel()}>Cancel</Button>
        <div className='SwapOfferConfirmation_footnote'>
          <p>*This quote will be processed by the trading partner after {this.props.quote.minConf} {isETHNetwork(this.props.assets.a.currency) ? 'ETH' : assetA.code} blockchain confirmation.<br />
            {isETHNetwork(this.props.assets.b.currency) && <span>**Your ETH address for receiving funds will need to have enough balance to cover gas fees.</span>}
          </p>
        </div>
      </div>
    </BrandCard>
  }
}

export default SwapOfferConfirmation
