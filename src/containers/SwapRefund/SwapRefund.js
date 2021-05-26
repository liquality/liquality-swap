import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import Button from '../../components/Button/Button'
import { assets as cryptoassets } from '@liquality/cryptoassets'
import './SwapRefund.css'

class SwapRedemption extends Component {
  render () {
    return <div>
      <BrandCard className='SwapRefund' title='RECLAIM YOUR ASSETS'>
        <div className='SwapRefund_confirmation'>
          Refund amount:
          <p className='SwapRefund_terms'>
            {this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code}
          </p>
          <p>To process this refund, press the reclaim button.</p>
        </div>
        <p><Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.refundSwap}>Reclaim</Button></p>
        <div className='SwapRefund_expiredFrame'>
          <div className='SwapRefund_expiredFrame_content'>

            <p className='SwapRefund_expiredFrame_content_title'>
              <strong>Expired Swap offer</strong>
            </p>
            <hr />
            <div className='SwapRefund_pairDiv'>
              <p>
                <strong>Receive:</strong>
              </p>
              <span className='SwapRefund_expiredFrame_content_value'>{this.props.assets.b.value.toFixed()} {cryptoassets[this.props.assets.b.currency].code}</span>
            </div>
            <div className='SwapRefund_pairDiv'>
              <p>
                <strong>For:</strong>
              </p>
              <span className='SwapRefund_expiredFrame_content_value'>{this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code}</span>
            </div>
            <div className='SwapRefund_pairDiv'>
              <p>
                <strong>Expired:</strong>
              </p>
              <span className='SwapRefund_expiredFrame_content_value'>{this.props.expiration.format('DD/MM/YYYY h:mm a')}</span>
            </div>
            <hr />
          </div>
        </div>
      </BrandCard>
    </div>
  }
}

export default SwapRedemption
