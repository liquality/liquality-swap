import React, { Component } from 'react'
import BrandCard from '../../components/BrandCard/BrandCard'
import ExpirationDetails from '../../components/ExpirationDetails'
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
          return 'Counterparty hasn\'t confirmed terms.'
        }
        if (!this.props.transactions.b.fund.confirmations > 0) {
          return 'Counterparty has confirmed terms. Awaiting confirmations.'
        }
      }
    }
    return ''
  }

  render () {
    return <BrandCard className='Waiting' title='Awaiting Counterparty'>
      <p className='Waiting_status'>{ this.getWaitingStatus() }</p>
      <p>Thanks to the Atomic Swap you don't need to trust the counterparty and avoid the middlemen.</p>
      <p><img className='LiqualitySwap_logo' src={LiqualityLogo} alt='Liquality Logo' /></p>
      <ExpirationDetails isClaim />
    </BrandCard>
  }
}

export default Waiting
