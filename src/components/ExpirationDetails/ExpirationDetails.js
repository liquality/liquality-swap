 import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cryptoassets from '@liquality/cryptoassets'
import { getFundExpiration, getClaimExpiration } from '../../utils/expiration'
import { shortenTransactionHash, getExplorerLink } from '../../utils/transactions'
import withCopyButton from '../withCopyButton'
import ClockIcon from '../../icons/clock.svg'
import CopyIcon from '../../icons/copy.svg'
import './ExpirationDetails.css'

class ExpirationDetails extends Component {
  constructor (props) {
    super(props)
    this.state = this.getExpirationState()
  }

  getTransaction (party) {
    const tx = this.props.transactions[party].initiation
    if (!tx.hash) return null

    const asset = this.props.assets[party].currency
    const explorerLink = tx && getExplorerLink(tx, asset)
    tx.explorerLink = explorerLink
    return tx
  }

  getExpirationState () {
    const party = this.props.isPartyB ? 'b' : 'a'
    const expiration = this.props.isClaim ? getClaimExpiration(this.props.expiration, party) : getFundExpiration(this.props.expiration, party)

    return {
      start: expiration.start,
      duration: expiration.duration,
      expiration: expiration.time,
      now: moment(),
      transactions: {
        a: this.getTransaction('a'),
        b: this.getTransaction('b')
      }
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
    console.log(filled)

    return <div className='ExpirationDetails'>
      <div className='ExpirationDetails_center'>
        <div className='ExpirationDetails_top'>
        <div className='ExpirationDetails_transactions'>
          <div className='ExpirationDetails_transaction'>
            <span className='ExpirationDetails_transaction_name'><strong>Your {cryptoassets[this.props.assets.a.currency].code} Transaction:</strong></span>
            { this.state.transactions.a && <a className='ExpirationDetails_transaction_link' href={this.state.transactions.a.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.state.transactions.a.hash)}</a> }
            { this.state.transactions.a && <span className='ExpirationDetails_transaction_confirmations'>{this.state.transactions.a.confirmations} Confirmations</span> }
            { !this.state.transactions.a && <span className='ExpirationDetails_transaction_missing'>&mdash;</span> }
          </div>
          <div className='ExpirationDetails_transaction_right'>
            <span className='ExpirationDetails_transaction_name'><strong>Partner's {cryptoassets[this.props.assets.b.currency].code} Transaction:</strong></span>
            { this.state.transactions.b && <a className='ExpirationDetails_transaction_link' href={this.state.transactions.b.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.state.transactions.b.hash)}</a> }
            { this.state.transactions.b && <span className='ExpirationDetails_transaction_confirmations'>{this.state.transactions.b.confirmations} Confirmations</span> }
            { !this.state.transactions.b && <span className='ExpirationDetails_transaction_missing'>&mdash;</span> }
          </div>
        </div>
      </div>
      <div className='ExpirationDetails_link'>
            <a href='javascript:void(0)' onClick={() => this.props.onCopyClick()}>Swap link<img src={CopyIcon} alt='Copy' /></a>
          </div>
        </div>
    </div>
  }
}

ExpirationDetails.propTypes = {
  isClaim: PropTypes.bool
}

export default withCopyButton(ExpirationDetails)
