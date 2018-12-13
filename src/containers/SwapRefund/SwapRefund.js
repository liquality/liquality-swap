import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import currencies from '../../utils/currencies'
import './SwapRefund.css'

class SwapRedemption extends Component {
  render () {
    return <BrandCard className='SwapRefund' title='Refund'>
      <div class='SwapRefund_confirmation'>
        <p class='SwapRefund_terms'>
          {this.props.assets.a.value} {currencies[this.props.assets.a.currency].code}
        </p>
        <p>Your funds are ready for a refund.</p>
      </div>
      <p><Button wide primary loadingAfterClickMessage='Check wallet for action' onClick={this.props.refundSwap}>Get Refund</Button></p>
    </BrandCard>
  }
}

export default SwapRedemption
