import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import cryptoassets from '@liquality/cryptoassets'
import { getClaimErrors } from '../../utils/validation'
import ExpirationDetails from '../../components/ExpirationDetails'
import TopDetails from '../../containers/TopDetails'

import './SwapRedemption.css'

class SwapRedemption extends Component {
  render () {
    const errors = getClaimErrors(this.props.transactions, this.props.isPartyB)
    const claimCurrency = cryptoassets[this.props.assets.b.currency]

    return <div className="SwapRedemption_bigWrap">
      <BrandCard className='SwapRedemption' title='Claiming'>
      <div className='SwapRedemption_info mt-4'>
        <p className="d-flex justify-content-center">Before you claim,
        Connect the account that you provided as <br /> {claimCurrency.code} receiving address</p>
      </div>
      <div class="SwapRedemption_confetti-wrapper">
          <div key="`${n} in 150`" className="`confetti-${n}`"></div>
            <p>
              {!errors.claim && <Button className='SwapRedemption_claimButton' wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.redeemSwap}>Claim {this.props.assets.b.value.toFixed()} {claimCurrency.code}</Button>}
              {errors.claim && <div className='SwapRedemption_errorMessage'>{errors.claim}</div>}
            </p>
        </div>
      {/* <p>
        {!errors.claim && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.redeemSwap}>Claim Your {claimCurrency.code}</Button>}
        {errors.claim && <div className='SwapRedemption_errorMessage'>{errors.claim}</div>}
      </p> */}
      <ExpirationDetails isClaim />
    </BrandCard>
    </div>
  }
}

export default SwapRedemption
