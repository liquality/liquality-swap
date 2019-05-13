import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import cryptoassets from '@liquality/cryptoassets'
import './SwapRefund.css'

class SwapRedemption extends Component {
  render () {
    return <BrandCard className='SwapRefund' title='Refund'>
      <div className='SwapRefund_confirmation'>
        <p className='SwapRefund_terms'>
          {this.props.assets.a.value} {cryptoassets[this.props.assets.a.currency].code}
        </p>
        <p>Your funds are ready for a refund.</p>
      </div>
      <p><Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.refundSwap}>Get Refund</Button></p>
    </BrandCard>
  }
}

export default SwapRedemption
