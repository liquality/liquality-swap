import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import './SwapRedemption.css'
import ExpirationDetails from '../../components/ExpirationDetails/ExpirationDetails'

class SwapRedemption extends Component {
  render () {
    return <BrandCard className='SwapRedemption' title='Claim Funds'>
      <div class='SwapRedemption_confirmation'>
        <p class='SwapRedemption_terms'>Get <strong>{this.props.assets.b.value} {this.props.assets.b.currency}</strong> for <strong>{this.props.assets.a.value} {this.props.assets.a.currency}</strong></p>
        <p>Thanks to the <strong>Atomic Swap</strong> you don't need to trust the counterparty and avoid the middleman.</p>
      </div>
      <ExpirationDetails expiration={this.props.expiration} isPartyB={this.props.isPartyB} isClaim />
      <p><Button primary onClick={this.props.redeemSwap}>Claim your funds</Button></p>
    </BrandCard>
  }
}

export default SwapRedemption
