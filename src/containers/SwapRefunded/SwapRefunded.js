import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import HexaDisplay from '../../components/HexaDisplay/HexaDisplay'
import Button from '../../components/Button/Button'
import { assets as cryptoassets } from '@liquality/cryptoassets'
import { APP_BASE_URL } from '../../utils/app-links'

import './SwapRefunded.css'

class SwapRefunded extends Component {
  render () {
    const title = cryptoassets[this.props.assets.a.currency].code + ' SUCCESFULLY RECLAIMED'
    return <div>
      <BrandCard className='SwapRefunded' title={title}>
        <div className='SwapRefunded_expiredFrame'>
          <div className='SwapRefunded_expiredFrame_content'>

            <p className='SwapRefunded_expiredFrame_content_title'>
              Expired Swap offer
            </p>
            <hr />
            <p>
              Receive: <span className='SwapRefunded_expiredFrame_content_value'>{this.props.assets.b.value.toFixed()} {cryptoassets[this.props.assets.b.currency].code}</span>
            </p>
            <p>
              For: <span className='SwapRefunded_expiredFrame_content_value'>{this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code}</span>
            </p>
            <p>
              Expired: <span className='SwapRefunded_expiredFrame_content_value'>{this.props.expiration.format('DD/MM/YYYY h:mm a')}</span>
            </p>
            <hr />
          </div>
        </div>
        <div className='SwapRefunded_confirmation'>
          <p className='SwapRefunded_terms'>
            {this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code} Returned
          </p>
          <p>Address: <HexaDisplay address={this.props.wallets.a.addresses[0]} /></p>
          <p>Transaction: <HexaDisplay address={this.props.refundTransaction.hash} /></p>
        </div>
        <Button className='SwapRefunded_button' wide primary onClick={() => window.location.replace(APP_BASE_URL)}>Start another Swap</Button>
      </BrandCard>
    </div>
  }
}

export default SwapRefunded
