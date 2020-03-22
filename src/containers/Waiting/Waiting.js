import React, { Component } from 'react'
import cryptoassets from '@liquality/cryptoassets'
import BrandCard from '../../components/BrandCard/BrandCard'
import ExpirationDetails from '../../components/ExpirationDetails'
import TimeProgressBar from '../../components/TimeProgressBar/TimeProgressBar'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import { steps } from '../../components/SwapProgressStepper/steps'
import './Waiting.css'

class Waiting extends Component {
  getWaitingStatus () {
    if (this.props.step === steps.AGREEMENT) {
      if (this.props.isPartyB) {
        if (!this.props.transactions.b.claim.hash) {
          return ['Swap In Progress', 'Waiting for transaction...']
        }
        if (!this.props.transactions.b.claim.confirmations > 0) {
          return ['Awaiting Confirmation', `Trade Partner's Claim Transaction Pending Confirmation On The Blockchain...`]
        }
      } else {
        if (!this.props.transactions.b.fund.hash) {
          if (this.props.transactions.a.fund.confirmations > 0) {
            return ['Swap In Progress', 'Confirming terms...']
          } else {
            if (this.props.quote) {
              return ['Awaiting Confirmation', `Once the transaction is confirmed, the quote is locked and the assets can be securely swapped.`]
            } else {
              return ['Awaiting Confirmation', `Initial Transaction Pending Confirmation On The Blockchain...`]
            }
          }
        }
        if (!this.props.transactions.b.fund.confirmations > 0) {
          return ['Awaiting Confirmation', `Trade Partner's Transaction Pending Confirmation On The Blockchain...`]
        }
      }
    }
    return ['Swap In Progress', '']
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
        complete={this.props.transactions.a.fund.confirmations > 0} />
      { showPartnerTransactionStatus && <StatusMessage
        message={`Confirming Your Trading Partner's ${cryptoassets[this.props.assets.b.currency].code} Transaction`}
        complete={this.props.transactions.b.fund.confirmations > 0} /> }
      { showPartnerClaimTransactionStatus && <StatusMessage
        message={`Confirming Your Trading Partner's ${cryptoassets[this.props.assets.a.currency].code} Claim Transaction`}
        complete={this.props.transactions.b.claim.hash && this.props.secretParams.secret} /> }
      <p className='Waiting_status'>{description}</p>
      <ExpirationDetails isClaim />
    </BrandCard>
  }
}

export default Waiting
