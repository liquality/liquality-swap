import React, { Component } from 'react'
import cryptoassets from '@liquality/cryptoassets'
import BrandCard from '../../components/BrandCard/BrandCard'
import ExpirationDetails from '../../components/ExpirationDetails'
import TimeProgressBar from '../../components/TimeProgressBar/TimeProgressBar'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import { steps } from '../../components/SwapProgressStepper/steps'
import { getConfirmationEstimate } from '../../utils/networks'
import './Waiting.css'

class Waiting extends Component {
  getWaitingStatus () {
    if (this.props.step === steps.AGREEMENT) {
      if (this.props.isPartyB) {
        if (!(this.props.transactions.a.fund.confirmations > 0)) {
          return ['Confirming Terms', `Initial Transaction Pending Confirmation On The Blockchain...`]
        }
        if (!this.props.transactions.b.claim.hash) {
          return ['Confirming Terms', `When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`]
        }
      } else {
        if (!this.props.transactions.b.fund.hash) {
          if (this.props.transactions.a.fund.confirmations > 0) {
            return ['Confirming Terms', `When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`]
          } else {
            if (this.props.quote) {
              return ['Confirming Terms', `Once the transaction is confirmed the quote is guaranteed`]
            } else {
              return ['Confirming Terms', `Initial Transaction Pending Confirmation On The Blockchain...`]
            }
          }
        }
        if (!this.props.transactions.b.fund.confirmations > 0) {
          return ['Confirming Terms', `When Completed You Can Claim Your ${cryptoassets[this.props.assets.b.currency].code}`]
        }
      }
    }
    return ['Confirming Terms', '']
  }

  render () {
    const showQuoteTimer = this.props.quote && this.props.transactions.a.fund.confirmations < this.props.quote.minConf
    const showPartnerTransactionStatus = !this.props.isPartyB && (this.props.transactions.a.fund.confirmations > 0 || this.props.transactions.b.fund.hash)
    const showPartnerClaimTransactionStatus = this.props.isPartyB && (this.props.transactions.a.fund.confirmations > 0 || this.props.transactions.b.claim.hash)
    const [ title, description ] = this.getWaitingStatus()
    return <BrandCard className='Waiting' title={title}>
      {showQuoteTimer && <div className='Waiting_quoteTimer'><TimeProgressBar startTime={this.props.quote.retrievedAt} endTime={this.props.quote.expiresAt} /></div>}
      <StatusMessage
        message={`Confirming Your ${cryptoassets[this.props.assets.a.currency].code} Transaction`}
        completedMessage={this.props.quote
          ? `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction and Quote Confirmed`
          : `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction Confirmed`}
        complete={this.props.transactions.a.fund.confirmations > 0}
        estimate={getConfirmationEstimate(this.props.assets.a.currency)} />
      { showPartnerTransactionStatus && <StatusMessage
        message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.b.currency].code} Transaction`}
        complete={this.props.transactions.b.fund.confirmations > 0}
        estimate={getConfirmationEstimate(this.props.assets.b.currency)} /> }
      { showPartnerClaimTransactionStatus && <StatusMessage
        message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.a.currency].code} Claim Transaction`}
        complete={this.props.transactions.b.claim.hash && this.props.secretParams.secret}
        estimate={getConfirmationEstimate(this.props.assets.a.currency)} /> }
      <p className='Waiting_status'>{description}</p>
      <ExpirationDetails isClaim />
    </BrandCard>
  }
}

export default Waiting
