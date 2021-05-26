import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { assets as cryptoassets } from '@liquality/cryptoassets'
import BrandCard from '../../components/BrandCard/BrandCard'
import TransactionDetails from '../../components/TransactionDetails'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import { steps } from '../../components/SwapProgressStepper/steps'
import { getConfirmationEstimate } from '../../utils/networks'
import config from '../../config/index'
import './Waiting.css'

class Waiting extends Component {
  getWaitingStatus () {
    if (this.props.step === steps.AGREEMENT) {
      if (this.props.isPartyB) {
        if (!(this.props.transactions.a.initiation.confirmations > 0)) {
          return ['Confirming Transactions', `Initial Transaction Pending Confirmation On The Blockchain...`]
        }
        if (!this.props.transactions.b.claim.hash) {
          return ['Confirming Transactions', `When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`]
        }
        if (!this.props.transactions.b.fund.hash) {
          return ['Confirming Transactions', `When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`]
        }
      } else {
        if (!this.props.transactions.b.initiation.hash) {
          if (this.props.transactions.a.initiation.confirmations > 0) {
            return ['Confirming Transactions', `When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`]
          } else {
            if (this.props.quote) {
              return ['Confirming Transactions', `Next the trading partner's Transaction will be confirmed`]
            } else {
              return ['Confirming Transactions', `Next the trading partner's Transaction will be confirmed`]
            }
          }
        }
        if (!this.props.transactions.b.initiation.confirmations > 0) {
          return ['Confirming Transactions', `When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`]
        }
      }
    }
    return ['Confirming Transactions', '']
  }

  render () {
    const isERC20 = config.assets[this.props.assets.b.currency].type === 'erc20'
    const showPartnerTransactionStatus = !this.props.isPartyB && (this.props.transactions.a.initiation.confirmations > 0 || this.props.transactions.b.initiation.hash)
    const showPartnerClaimTransactionStatus = this.props.isPartyB && (this.props.transactions.a.initiation.confirmations > 0 || this.props.transactions.b.claim.hash)
    const [ title, description ] = this.getWaitingStatus()
    return <BrandCard className='Waiting' title={title}>
      <div className='Waiting_whiteBar'>
        <p>Swap {this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code} for {this.props.assets.b.value.toFixed()} {cryptoassets[this.props.assets.b.currency].code}</p>
      </div>
      <div className='StatusMessage_statusMessage'>

        <StatusMessage
          message={`Locking your ${cryptoassets[this.props.assets.a.currency].code} and confirming quote`}
          completedMessage={this.props.quote
            ? `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction and Quote Confirmed`
            : `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction Confirmed`}
          complete={this.props.transactions.a.initiation.confirmations > 0}
          estimate={getConfirmationEstimate(this.props.assets.a.currency)} />
        { showPartnerTransactionStatus && <StatusMessage
          message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.b.currency].code} Transaction`}
          complete={!isERC20 ? this.props.transactions.b.initiation.confirmations > 0 : this.props.transactions.b.initiation.confirmations > 0 && this.props.transactions.b.fund.confirmations > 0}
          estimate={getConfirmationEstimate(this.props.assets.b.currency)} /> }
        { showPartnerClaimTransactionStatus && <StatusMessage
          message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.a.currency].code} Claim Transaction`}
          complete={this.props.transactions.b.claim.hash && this.props.secretParams.secret}
          estimate={getConfirmationEstimate(this.props.assets.a.currency)} /> }

      </div>
      <div style={{height: '125px'}}>
        <div className='Waiting_spinningGradient'>
          <span />
          <span />
          <span />
        </div>
      </div>
      {!description ? <p className='Waiting_status'>{`When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`}</p> : <p className='Waiting_status'>{description}</p>}
      <TransactionDetails isClaim />
    </BrandCard>
  }
}

Waiting.propTypes = {
  message: PropTypes.string.isRequired,
  completedMessage: PropTypes.string,
  complete: PropTypes.bool,
  estimate: PropTypes.any,
  timer: PropTypes.shape({
    current: PropTypes.number,
    duration: PropTypes.number
  })
}

export default Waiting
