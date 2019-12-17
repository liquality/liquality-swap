import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import ExpirationDetails from '../../components/ExpirationDetails'
import TimeProgressBar from '../../components/TimeProgressBar/TimeProgressBar'
import LiqualityLogo from '../../logo.png'
import { steps } from '../../components/SwapProgressStepper/steps'
import './Waiting.css'

class Waiting extends Component {
  getWaitingStatus () {
    if (this.props.step === steps.AGREEMENT) {
      if (this.props.isPartyB) {
        if (!this.props.transactions.b.claim.hash) {
          return 'Counterparty hasn\'t claimed.'
        }
        if (!this.props.transactions.b.claim.confirmations > 0) {
          return 'Counterparty has claimed. Awaiting confirmations.'
        }
      } else {
        if (!this.props.transactions.b.fund.hash) {
          if (this.props.quote) {
            return `Counterparty will confirm terms after ${this.props.quote.minConf} confirmations.`
          } else {
            return 'Counterparty will confirm terms before you can claim funds.'
          }
        }
        if (!this.props.transactions.b.fund.confirmations > 0) {
          return 'Counterparty has confirmed terms. Awaiting confirmations.'
        }
      }
    }
    return ''
  }

  render () {
    const showQuoteTimer = this.props.quote && this.props.transactions.a.fund.confirmations < this.props.quote.minConf
    return <BrandCard className='Waiting' title='Awaiting Counterparty'>
      {showQuoteTimer && <div className='Waiting_quoteTimer'><TimeProgressBar startTime={this.props.quote.retrievedAt} endTime={this.props.quote.expiresAt} /></div>}
      <p className='Waiting_status'>{ this.getWaitingStatus() }</p>
      <p>Thanks to the Atomic Swap you don't need to trust the counterparty and avoid the middlemen.</p>
      <p><img className='LiqualitySwap_logo' src={LiqualityLogo} alt='Liquality Logo' /></p>
      <ExpirationDetails isClaim />
    </BrandCard>
  }
}

export default Waiting
