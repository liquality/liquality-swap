import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button/Button'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import BrandCard from '../../components/BrandCard/BrandCard'
import { getFundExpiration, getClaimExpiration } from '../../utils/expiration'
import { shortenTransactionHash, getExplorerLink } from '../../utils/transactions'
import cryptoassets from '@liquality/cryptoassets'

//Social Icons
import Facebook from '../../icons/facebookicon.svg'
import Twitter from '../../icons/twittericon.svg'
import Telegram from '../../icons/telegramicon.svg'
import Medium from '../../icons/mediumicon.svg'
import Web from '../../icons/webicon.svg'
import Github from '../../icons/githubicon.svg'

import config from '../../config'
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
    const fundHash = this.props.transactions.[party].fund.hash
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
    const total = this.props.value.times(BigNumber(this.props.fiatRate)).toFixed(2)
    return total
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
    console.log(this.props)

    const claimCurrency = cryptoassets[this.props.assets.b.currency]
    const sentCurrency = cryptoassets[this.props.assets.a.currency]

    return <div className='SwapCompleted_bigWrap'>
      
      <BrandCard title="Swap Completed">

      <div className="SwapCompleted_top">
        <h4 className="mt-5">Received</h4>
        <h1>{this.props.assets.b.value.toFixed()} {claimCurrency.code}</h1>
        <h5></h5>

        <h4 className="mt-4">Sent</h4>
        <h1>{this.props.assets.a.value.toFixed()} {sentCurrency.code}</h1>

        <h4 className="mt-4">Rate</h4>
        <h4>1 {sentCurrency.code} = {this.props.assets.rate.toFixed()} {claimCurrency.code}</h4>

        <h4 className="mt-4">Network Fees</h4>
        {/* <h3>{sentCurrency.code} {this.state.transactions.a.intiation.fee.toFixed(2)}</h3>
        <h3>{sentCurrency.code} {this.state.transactions.b.intiation.fee.toFixed(2)}</h3> */}

      </div>
      <div className="SwapCompleted_bottom px-2 mt-5">
        <div className="SwapCompleted_right">
          <h4><strong>Partner's {sentCurrency.code} Transaction:</strong><span className="ml-2 SwapCompleted_transactionHash">{shortenTransactionHash(this.state.transactions.a.hash)}</span></h4>
          <h4><strong>Partner's {claimCurrency.code} Transaction:</strong><span className="ml-2 SwapCompleted_transactionHash"></span></h4>
        </div>
        <div className="SwapCompleted_left">
        <h4><strong>Your {sentCurrency.code} Transaction:</strong><span className="ml-2 SwapCompleted_transactionHash">{shortenTransactionHash(this.state.transactions.b.hash)}</span></h4>
        <h4><strong>Your {claimCurrency.code} Transaction:</strong><span className="ml-2 SwapCompleted_transactionHash"></span></h4>
        </div>
      </div>
      <div className='SwapCompleted_bottomButton mt-5'>
        <Button wide primary onClick={() => window.location.replace(APP_BASE_URL)}>Start another Swap</Button>
      </div>
      <div className="SwapCompleted_shareSection mt-3">
        <div className="SwapCompleted_shareLeft">
            <h3 className="p-4 mt-1">SHARE</h3>
            <img className="mr-3" src={Facebook} alt="facebook logo" />
            <img className="mr-3" src={Twitter} alt="twitter logo" onClick={() => window.open('https://twitter.com/Liquality_io')} />
            <img className="mr-3" src={Telegram} alt="telegram logo" onClick={() => window.open('https://t.me/liquality')} />
        </div>
        <div className="SwapCompleted_shareRight">
            <h3 className="p-4 mt-1">FIND US</h3>
            <img className="mr-3" src={Medium} alt="telegram logo" onClick={() => window.open('https://medium.com/liquality')} />
            <img className="mr-3" src={Web} alt="liquality logo" onClick={() => window.open('https://liquality.io/')} />
            <img className="mr-3" src={Github} alt="github logo" onClick={() => window.open('https://github.com/liquality')} />
        </div>
      </div>

    </BrandCard>
    </div>
  }
}

SwapCompleted.propTypes = {
  retrievedAt: PropTypes.number,
  expiresAt: PropTypes.number,
  fiatRate: PropTypes.number,
  value: PropTypes.instanceOf(BigNumber),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
}

export default SwapCompleted
