import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        if (!(this.props.transactions.a.initiation.confirmations > 0)) {
          return ['Confirming Transactions', `Initial Transaction Pending Confirmation On The Blockchain...`]
        }
        if (!this.props.transactions.b.claim.hash) {
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
    const showPartnerTransactionStatus = !this.props.isPartyB && (this.props.transactions.a.initiation.confirmations > 0 || this.props.transactions.b.initiation.hash)
    const showPartnerClaimTransactionStatus = this.props.isPartyB && (this.props.transactions.a.initiation.confirmations > 0 || this.props.transactions.b.claim.hash)
    const [ title, description ] = this.getWaitingStatus()
    return <BrandCard className='Waiting' title={title}>
                  <div className="Waiting_whiteBar">
                <p>Swap {this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code} for {this.props.assets.b.value.toFixed()} {cryptoassets[this.props.assets.b.currency].code}</p>
            </div>
      {/* { props.timer && <svg width='300' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg' className='Rate_timer'>
      <g transform='translate(110,110)'>
        <g transform='rotate(-90)'>
          <circle r='100' className='Rate_timer_progress' style={{
            animation: props.timer.current === props.timer.duration ? 'none' : `countdown ${props.timer.duration - 1}s linear 1 forwards`
          }} />
          <g className='Rate_timer_pointer'>
            <circle cx='100' cy='0' r='6' className='Rate_timer_pointer_c' style={{
              animation: props.timer.current === props.timer.duration ? 'none' : `pointer ${props.timer.duration - 1}s linear 1 forwards`
            }} />
          </g>
        </g>
      </g>
    </svg> } */}
                    <div className="StatusMessage_statusMessage">

<StatusMessage
message={`Locking ${cryptoassets[this.props.assets.a.currency].code} and confirming quote`}
completedMessage={this.props.quote
? `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction and Quote Confirmed`
: `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction Confirmed`}
complete={this.props.transactions.a.initiation.confirmations > 0}
estimate={getConfirmationEstimate(this.props.assets.a.currency)} />
{ showPartnerTransactionStatus && <StatusMessage
message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.b.currency].code} Transaction`}
complete={this.props.transactions.b.initiation.confirmations > 0}
estimate={getConfirmationEstimate(this.props.assets.b.currency)} /> }
{ showPartnerClaimTransactionStatus && <StatusMessage
message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.a.currency].code} Claim Transaction`}
complete={this.props.transactions.b.claim.hash && this.props.secretParams.secret}
estimate={getConfirmationEstimate(this.props.assets.a.currency)} /> }

</div>
    <div style={{height: "500px"}}>
              <div className="Waiting_spinningGradient">
            <span></span>
            <span></span>
            <span></span>
            </div>
            </div>
      {/* <StatusMessage
        message={`Locking ${cryptoassets[this.props.assets.a.currency].code} and confirming quote`}
        completedMessage={this.props.quote
          ? `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction and Quote Confirmed`
          : `Your ${cryptoassets[this.props.assets.a.currency].code} Transaction Confirmed`}
        complete={this.props.transactions.a.initiation.confirmations > 0}
        estimate={getConfirmationEstimate(this.props.assets.a.currency)} />
      { showPartnerTransactionStatus && <StatusMessage
        message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.b.currency].code} Transaction`}
        complete={this.props.transactions.b.initiation.confirmations > 0}
        estimate={getConfirmationEstimate(this.props.assets.b.currency)} /> }
      { showPartnerClaimTransactionStatus && <StatusMessage
        message={`Waiting For Trading Partner's ${cryptoassets[this.props.assets.a.currency].code} Claim Transaction`}
        complete={this.props.transactions.b.claim.hash && this.props.secretParams.secret}
        estimate={getConfirmationEstimate(this.props.assets.a.currency)} /> } */}
      <p className='Waiting_status'>{description}</p>
      <ExpirationDetails isClaim />
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
