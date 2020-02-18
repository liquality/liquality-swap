import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import cryptoassets from '@liquality/cryptoassets'
import { getClaimErrors } from '../../utils/validation'
import ExpirationDetails from '../../components/ExpirationDetails'

import './SwapRedemption.css'

class SwapRedemption extends Component {
  render () {
    const errors = getClaimErrors(this.props.transactions, this.props.isPartyB)
    const claimCurrency = cryptoassets[this.props.assets.b.currency]

    return <BrandCard className='SwapRedemption' title={`Claim your ${claimCurrency.code}`}>
      <div className='SwapRedemption_confirmation'>
        <p className='SwapRedemption_terms'>
          Get <strong>{this.props.assets.b.value} {cryptoassets[this.props.assets.b.currency].code}</strong>
          &nbsp;for <strong>{this.props.assets.a.value} {cryptoassets[this.props.assets.a.currency].code}</strong>
        </p>
      </div>
      <ExpirationDetails isClaim />
      <div className='SwapRedemption_info'>
        <p><strong>To claim your {cryptoassets[this.props.assets.b.currency].code}, you will need to connect the wallet and {cryptoassets[this.props.assets.b.currency].code} account you used to create the swap.</strong></p>
        <p>After launching your wallet application, press the button below to connect and sign this transaction.</p>
      </div>
      <p>
        {!errors.claim && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.redeemSwap}>Claim Your Funds</Button>}
        {errors.claim && <div className='SwapRedemption_errorMessage'>{errors.claim}</div>}
      </p>
    </BrandCard>
  }
}

export default SwapRedemption
