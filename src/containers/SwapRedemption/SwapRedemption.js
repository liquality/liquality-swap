import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import currencies from '../../utils/currencies'
import { wallets } from '../../utils/wallets'
import ExpirationDetails from '../../components/ExpirationDetails'

import './SwapRedemption.css'

class SwapRedemption extends Component {
  render () {
    const wallet = wallets[this.props.wallets.b.type]
    const buttonLoadingMessage = wallet && `Confirm on ${wallet.name}`

    return <BrandCard className='SwapRedemption' title='Claim Funds'>
      <div className='SwapRedemption_confirmation'>
        <p className='SwapRedemption_terms'>
          Get <strong>{this.props.assets.b.value} {currencies[this.props.assets.b.currency].code}</strong>
          &nbsp;for <strong>{this.props.assets.a.value} {currencies[this.props.assets.a.currency].code}</strong>
        </p>
        <p>Thanks to the <strong>Atomic Swap</strong> you don't need to trust the counterparty and avoid the middleman.</p>
      </div>
      <ExpirationDetails isClaim />
      <p><Button wide primary loadingAfterClick loadingAfterClickMessage={buttonLoadingMessage} onClick={this.props.redeemSwap}>Claim your funds</Button></p>
    </BrandCard>
  }
}

export default SwapRedemption
