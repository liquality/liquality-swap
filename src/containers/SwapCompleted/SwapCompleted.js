import React, { Component } from 'react'
import CurrencyInputs from '../CurrencyInputs'
import Button from '../../components/Button/Button'
import moment from 'moment'
import TickIcon from '../../icons/tick.svg'
import HandshakeIcon from '../../icons/handshake.png'
import BrandCard from '../../components/BrandCard/BrandCard'
import { getFundExpiration, getClaimExpiration } from '../../utils/expiration'
import { shortenTransactionHash, getExplorerLink } from '../../utils/transactions'
import cryptoassets from '@liquality/cryptoassets'

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

  render (props) {

    const claimCurrency = cryptoassets[this.props.assets.b.currency]
    const sentCurrency = cryptoassets[this.props.assets.a.currency]

    return <BrandCard title="Swap Completed">

      <div className="SwapCompleted_top">
        <h4 className="mt-5">Received</h4>
        <h1>{this.props.assets.b.value.toFixed()} {claimCurrency.code}</h1>

        <h4 className="mt-4">Sent</h4>
        <h1>{this.props.assets.a.value.toFixed()} {sentCurrency.code}</h1>

        <h4 className="mt-4">Rate</h4>
        <h1></h1>

        <h4 className="mt-4">Network Fees</h4>
        <h1></h1>
      </div>
      <div className="SwapCompleted_bottom px-2 mt-5">
        <div className="SwapCompleted_right">
          <h4><strong>Partner's {sentCurrency.code} Transaction</strong></h4>
          <h4><strong>Partner's {claimCurrency.code} Transaction</strong></h4>
        </div>
        <div className="SwapCompleted_left">
        <h4><strong>Your {sentCurrency.code} Transaction</strong></h4>
        <h4><strong>Your {claimCurrency.code} Transaction</strong></h4>
        </div>
      </div>
      <div className='SwapCompleted_bottomButton mt-5'>
        <Button wide primary onClick={() => window.location.replace(APP_BASE_URL)}>Start another Swap</Button>
      </div>

    </BrandCard>
  }
}

export default SwapCompleted

{/* <div className='SwapCompleted'>
      <div className='SwapCompleted_top'>
        <CurrencyInputs showInputs leftInputDisabled rightInputDisabled />
        <h2 className='SwapCompleted_label'>Swap Completed</h2>
        <p className='SwapCompleted_subLabel'>
          Go to {this.props.assets.b.currency === 'BTC' ? 'Ledger Live' : 'MetaMask'} to confirm your balance
        </p>
        <span className='SwapCompleted_handshake'><img src={HandshakeIcon} alt='' /></span>
      </div>
      <div className='SwapCompleted_bottom'>
        <Button wide primary onClick={() => window.location.replace(APP_BASE_URL)}>Start another Swap</Button>
        {config.twitterButton && <a className='twitter-share-button' href={'https://twitter.com/intent/tweet' + config.twitterButton} data-size='large'>Tweet</a>}
      </div>
    </div> */}
