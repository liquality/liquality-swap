import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { assets as cryptoassets } from '@liquality/cryptoassets'
import { getFundExpiration, getClaimExpiration } from '../../utils/expiration'
import { shortenTransactionHash, getExplorerLink } from '../../utils/transactions'
import withCopyButton from '../withCopyButton'
import CopyIcon from '../../icons/copy.svg'
import './TransactionDetails.css'

class TransactionDetails extends Component {
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
    return <div className='TransactionDetails'>
      <div className='TransactionDetails_center'>
        <div className='TransactionDetails_top'>
          <div className='TransactionDetails_transactions'>
            <div className='TransactionDetails_transaction'>
              <span className='TransactionDetails_transaction_name'><strong>Your {cryptoassets[this.props.assets.a.currency].code} Transaction:</strong></span>
              { this.state.transactions.a && <a className='TransactionDetails_transaction_link' href={this.state.transactions.a.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.state.transactions.a.hash)}</a> }
              { this.state.transactions.a && <span className='TransactionDetails_transaction_confirmations'>{this.state.transactions.a.confirmations} Confirmations</span> }
              { !this.state.transactions.a && <span className='TransactionDetails_transaction_missing'>&mdash;</span> }
            </div>
            <div className='TransactionDetails_transaction_right'>
              <span className='TransactionDetails_transaction_name'><strong>Partner's {cryptoassets[this.props.assets.b.currency].code} Transaction:</strong></span>
              { this.state.transactions.b && <a className='TransactionDetails_transaction_link' href={this.state.transactions.b.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.state.transactions.b.hash)}</a> }
              { this.state.transactions.b && <span className='TransactionDetails_transaction_confirmations'>{this.state.transactions.b.confirmations} Confirmations</span> }
              { !this.state.transactions.b && <span className='TransactionDetails_transaction_missing'>&mdash;</span> }
            </div>
          </div>
        </div>
        <div className='TransactionDetails_link'>
          <a href='javascript:void(0)' onClick={() => this.props.onCopyClick()}>Swap link<img src={CopyIcon} alt='Copy' /></a>
        </div>
      </div>
    </div>
  }
}

TransactionDetails.propTypes = {
  isClaim: PropTypes.bool
}

export default withCopyButton(TransactionDetails)
