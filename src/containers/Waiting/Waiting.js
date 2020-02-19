import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import ExpirationDetails from '../../components/ExpirationDetails'
import TimeProgressBar from '../../components/TimeProgressBar/TimeProgressBar'
import { steps } from '../../components/SwapProgressStepper/steps'
import './Waiting.css'

class Waiting extends Component {
  getWaitingStatus () {
    if (this.props.step === steps.AGREEMENT) {
      if (this.props.isPartyB) {
        if (!this.props.transactions.b.claim.hash) {
          return ['Pending Partner Transaction', 'Waiting For Trade Partner To Send Their Claim Transaction...']
        }
        if (!this.props.transactions.b.claim.confirmations > 0) {
          return ['Pending Confirmation', `Trade Partner's Claim Transaction Pending Confirmation On The Blockchain...`]
        }
      } else {
        if (!this.props.transactions.b.fund.hash) {
          if (this.props.transactions.a.fund.confirmations > 0) {
            return ['Pending Partner Transaction', 'Waiting For Trade Partner To Send Their Transaction...']
          } else {
            return ['Pending Confirmation', `Initial Transaction Pending Confirmation On The Blockchain...`]
          }
        }
        if (!this.props.transactions.b.fund.confirmations > 0) {
          return ['Pending Confirmation', `Trade Partner's Transaction Pending Confirmation On The Blockchain...`]
        }
      }
    }
    return ['Awaiting Partner Transaction', '']
  }

  render () {
    const showQuoteTimer = this.props.quote && this.props.transactions.a.fund.confirmations < this.props.quote.minConf
    const [ title, description ] = this.getWaitingStatus()
    return <BrandCard className='Waiting' title={title}>
      {showQuoteTimer && <div className='Waiting_quoteTimer'><TimeProgressBar startTime={this.props.quote.retrievedAt} endTime={this.props.quote.expiresAt} /></div>}
      <p className='Waiting_status'>{description}</p>
      <ExpirationDetails isClaim />
    </BrandCard>
  }
}

export default Waiting
