import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import currencies from '../../utils/currencies'
import './SwapRedemption.css'
import ExpirationDetails from '../../components/ExpirationDetails'

class SwapRedemption extends Component {
  render () {
    return <BrandCard className='SwapRedemption' title='Claim Funds'>
      <div className='SwapRedemption_confirmation'>
        <p className='SwapRedemption_terms'>
          Get <strong>{this.props.assets.b.value} {currencies[this.props.assets.b.currency].code}</strong>
          &nbsp;for <strong>{this.props.assets.a.value} {currencies[this.props.assets.a.currency].code}</strong>
        </p>
        <p>Thanks to the <strong>Atomic Swap</strong> you don't need to trust the counterparty and avoid the middleman.</p>
      </div>
      <ExpirationDetails isClaim />
      <p><Button wide primary loadingAfterClick loadingAfterClickMessage='Check wallet for action' onClick={this.props.redeemSwap}>Claim your funds</Button></p>
    </BrandCard>
  }
}

export default SwapRedemption
