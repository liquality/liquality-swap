import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import currencies from '../../utils/currencies'
import wallets from '../../utils/wallets'
import './SwapRefund.css'

class SwapRedemption extends Component {
  render () {
    const wallet = wallets[this.props.wallets.a.type]
    const buttonLoadingMessage = wallet && `Confirm on ${wallet.name}`

    return <BrandCard className='SwapRefund' title='Refund'>
      <div className='SwapRefund_confirmation'>
        <p className='SwapRefund_terms'>
          {this.props.assets.a.value} {currencies[this.props.assets.a.currency].code}
        </p>
        <p>Your funds are ready for a refund.</p>
      </div>
      <p><Button wide primary loadingAfterClick loadingAfterClickMessage={buttonLoadingMessage} onClick={this.props.refundSwap}>Get Refund</Button></p>
    </BrandCard>
  }
}

export default SwapRedemption
