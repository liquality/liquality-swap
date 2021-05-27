import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import BrandCard from '../../components/BrandCard/BrandCard'
import { getFundExpiration, getClaimExpiration } from '../../utils/expiration'
import { shortenTransactionHash, getExplorerLink } from '../../utils/transactions'
import { assets as cryptoassets, chains } from '@liquality/cryptoassets'
import withCopyButton from '../../components/withCopyButton'
import CopyIcon from '../../icons/copy.svg'

// Social Icons
import Facebook from '../../icons/facebookicon.svg'
import Twitter from '../../icons/twittericon.svg'
import Telegram from '../../icons/telegramicon.svg'
import Medium from '../../icons/mediumicon.svg'
import Web from '../../icons/webicon.svg'
import Github from '../../icons/githubicon.svg'

import { APP_BASE_URL } from '../../utils/app-links'

import './SwapCompleted.css'

class SwapCompleted extends Component {
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

  getFiatValue () {
    const { b: assetB } = this.props.assets
    const total = this.props.assets.b.value.times(BigNumber(this.props.fiatRates[assetB.currency])).toFixed(2)
    return isNaN(total) ? '' : total
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
    const claimCurrency = cryptoassets[this.props.assets.b.currency]
    const sentCurrency = cryptoassets[this.props.assets.a.currency]

    return <div className='SwapCompleted'>

      <div className='SwapCompleted_confetti-wrapper'>

        <div>{Array.from({ length: 150 }, (_, i) => (
          <div key={i} className={`confetti-${i}`} />
        ))}</div>

      </div>

      <BrandCard title='Swap Completed'>

        <div className='SwapCompleted_top'>
          <h4 className='mt-5'>RECEIVED</h4>
          <h1 className='SwapCompleted_receivedAmount'>{this.props.assets.b.value.toFixed()} {claimCurrency.code}</h1>
          <h5>${this.getFiatValue()} USD</h5>

          <h4 className='mt-4'>SENT</h4>
          <p className='SwapCompleted_sentAmount'>{this.props.assets.a.value.toFixed()} {sentCurrency.code}</p>

          {this.props.assets.rate && <h4 className='mt-4'>RATE</h4>}
          {this.props.assets.rate && <h4 className='SwapCompleted_rateAmount'>1 {sentCurrency.code} = {this.props.assets.rate.toFixed()} {claimCurrency.code}</h4>}

          <h4 className='mt-4 d-flex justify-content-center'>NETWORK FEES</h4>
          <h5 className='d-flex justify-content-center'>{sentCurrency.code} {this.props.transactions.a.initiation.feePrice} {chains[sentCurrency.chain].fees.unit}</h5>
          <h5 className='d-flex justify-content-center'>{claimCurrency.code} {this.props.transactions.b.initiation.feePrice} {chains[claimCurrency.chain].fees.unit}</h5>

        </div>
        <div className='SwapCompleted_bottom px-2 mt-5'>
          <div className='SwapCompleted_right'>
            <h4><strong><span className='SwapCompleted_transactionTitle'>Partner {sentCurrency.code} Transaction:</span></strong><a className='SwapCompleted_transactionHash' href={this.props.transactions.b.initiation.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.props.transactions.b.initiation.hash)}</a><span className='SwapCompleted_confs' >{this.props.transactions.b.initiation.confirmations} <span className='SwapCompleted_confText'>Confirmations</span></span></h4>
            {this.props.transactions.b.claim.hash ? <h4><strong><span className='SwapCompleted_transactionTitle'>Partner {claimCurrency.code} Transaction:</span></strong><a className='SwapCompleted_transactionHash' href={this.props.transactions.a.initiation.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.props.transactions.a.claim.hash)}</a><span className='SwapCompleted_confs' >{this.props.transactions.a.claim.confirmations}</span><span className='SwapCompleted_confText'>Confirmations</span></h4> : '' }
          </div>
          <div className='SwapCompleted_left'>
            <h4><strong><span className='SwapCompleted_transactionTitle'>Your {sentCurrency.code} Transaction:</span></strong><a className='SwapCompleted_transactionHash' href={this.props.transactions.a.initiation.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.props.transactions.a.initiation.hash)}</a><span className='SwapCompleted_confs' >{this.props.transactions.a.initiation.confirmations}</span><span className='SwapCompleted_confText'>Confirmations</span></h4>
            {/* {this.props.transactions.a.claim.hash ? <h4><strong><span className='SwapCompleted_transactionTitle'>Your {claimCurrency.code} Transaction:</span></strong><a className='SwapCompleted_transactionHash' href={this.props.transactions.b.initiation.explorerLink} target='_blank' rel='noopener noreferrer'>{shortenTransactionHash(this.props.transactions.b.claim.hash)}</a><span className='SwapCompleted_confs' >{this.props.transactions.b.claim.confirmations}</span><span className='SwapCompleted_confText'>Confirmations</span></h4> : '' } */}
          </div>
        </div>
        <div className='SwapCompleted_link mt-2'>
          <a href='javascript:void(0)' onClick={() => this.props.onCopyClick()}>Swap link<img src={CopyIcon} alt='Copy' className='ml-2' /></a>
        </div>
        <div className='SwapCompleted_bottomButton mt-2'>
          <Button wide primary onClick={() => window.location.replace(APP_BASE_URL)}>Start another Swap</Button>
        </div>
        <div className='SwapCompleted_shareSection mt-3'>
          <div className='SwapCompleted_shareLeft'>
            <h3 className='p-4 mt-1'>SHARE</h3>
            <img className='mr-3' src={Facebook} alt='facebook logo' />
            <img className='mr-3' src={Twitter} alt='twitter logo' onClick={() => window.open('https://twitter.com/Liquality_io')} />
            <img className='mr-3' src={Telegram} alt='telegram logo' onClick={() => window.open('https://t.me/liquality')} />
          </div>
          <div className='SwapCompleted_shareRight'>
            <h3 className='p-4 mt-1'>FIND US</h3>
            <img className='mr-3' src={Medium} alt='telegram logo' onClick={() => window.open('https://medium.com/liquality')} />
            <img className='mr-3' src={Web} alt='liquality logo' onClick={() => window.open('https://liquality.io/')} />
            <img className='mr-3' src={Github} alt='github logo' onClick={() => window.open('https://github.com/liquality')} />
          </div>
        </div>
      </BrandCard>
    </div>
  }
}

SwapCompleted.propTypes = {
  retrievedAt: PropTypes.number,
  assets: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(cryptoassets))),
  expiresAt: PropTypes.number,
  fiatRates: PropTypes.number,
  value: PropTypes.instanceOf(BigNumber),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number
}

export default withCopyButton(SwapCompleted)
