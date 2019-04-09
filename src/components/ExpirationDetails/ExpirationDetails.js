import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cryptoassets from '@liquality/cryptoassets'
import { getClaimExpiration } from '../../utils/expiration'
import withCopyButton from '../withCopyButton'
import ClockIcon from '../../icons/clock.svg'
import CopyIcon from '../../icons/copy.svg'
import './ExpirationDetails.css'

class ExpirationDetails extends Component {
  constructor (props) {
    super(props)
    this.state = this.getExpirationState()
  }

  getTransaction () {
    const transactions = this.props.transactions
    const displayOrder = [
      transactions.b.claim,
      transactions.a.claim
    ]

    if (this.props.isPartyB) {
      displayOrder.push(transactions.a.fund, transactions.b.fund)
    } else {
      displayOrder.push(transactions.b.fund, transactions.a.fund)
    }

    return displayOrder.find(tx => tx.hash) || {}
  }

  getExpirationState () {
    const party = this.props.isPartyB ? 'b' : 'a'
    const expiration = getClaimExpiration(this.props.expiration, party)
    return {
      start: expiration.start,
      duration: expiration.duration,
      expiration: expiration.time,
      now: moment(),
      transaction: this.getTransaction()
    }
  }

  componentDidMount () {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  tick () {
    this.setState(this.getExpirationState())
  }

  render () {
    const maxNow = this.state.now.isAfter(this.state.expiration) ? this.state.expiration : this.state.now
    const left = moment.duration(this.state.expiration.diff(maxNow))
    const passed = moment.duration(maxNow.diff(this.state.start))
    const total = this.state.duration

    const filled = (((total.asSeconds() - left.asSeconds()) / total.asSeconds()) * 100).toFixed(2)

    return <div className='ExpirationDetails'>
      <img src={ClockIcon} className='ExpirationDetails_clock' alt='Clock Icon' />
      <div className='ExpirationDetails_passed'>{moment.utc(passed.asMilliseconds()).format('HH:mm')}hr</div>
      <div className='ExpirationDetails_center'>
        <div className='ExpirationDetails_top'>
          <div className='ExpirationDetails_terms'>
            <em>Get {this.props.assets.b.value} {cryptoassets[this.props.assets.b.currency].code}
            &nbsp;for {this.props.assets.a.value} {cryptoassets[this.props.assets.a.currency].code}</em>
            &nbsp;Active for {moment.utc(left.asMilliseconds()).format('HH:mm')}hr {this.state.expiration.format('L LT')}
          </div>
          <div className='ExpirationDetails_link'>
            <a href='#copy' onClick={() => this.props.onCopyClick()}>Swap link<img src={CopyIcon} alt='Copy' /></a>
          </div>
        </div>
        <div className='ExpirationDetails_progress'>
          <div className='ExpirationDetails_progress_fill' style={{width: `${filled}%`}} />
        </div>
        <div className='ExpirationDetails_bottom'>
          <div className='ExpirationDetails_transaction'>
            <strong>Transaction ID: </strong> {this.state.transaction.hash}
          </div>
          <div className='ExpirationDetails_confirmations'>
            Confirmations: {this.state.transaction.confirmations}
          </div>
        </div>
      </div>
      <div className='ExpirationDetails_left'>{moment.utc(left.asMilliseconds()).format('HH:mm')}hr</div>
    </div>
  }
}

ExpirationDetails.propTypes = {
  isClaim: PropTypes.bool
}

export default withCopyButton(ExpirationDetails)
