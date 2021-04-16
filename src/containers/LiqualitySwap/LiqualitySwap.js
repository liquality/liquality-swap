import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import moment from 'moment'
import cryptoassets from '@liquality/cryptoassets'
import { getFundExpiration, getClaimExpiration } from '../../utils/expiration'
import { shortenTransactionHash, getExplorerLink } from '../../utils/transactions'
import SwapInitiation from '../SwapInitiation'
import CounterPartyLinkCard from '../../components/CounterPartyLinkCard/CounterPartyLinkCard'
import BackupLinkCard from '../../components/BackupLinkCard/BackupLinkCard'
import WalletConnectPopup from '../../components/WalletConnectPopup/WalletConnectPopup'
import ErrorModal from '../../components/ErrorModal/ErrorModal'
import Waiting from '../Waiting'
import WalletPopups from '../WalletPopups'
import SwapRedemption from '../SwapRedemption'
import SwapCompleted from '../SwapCompleted'
import SwapRefund from '../SwapRefund'
import SwapRefunded from '../SwapRefunded'
import TopDetails from "../../containers/TopDetails/index"
import SwapProgressStepper from '../../components/SwapProgressStepper/SwapProgressStepper'
import { generateLink, APP_BASE_URL } from '../../utils/app-links'
import config from '../../config'

import { steps } from '../../components/SwapProgressStepper/steps'
import LiqualityLogo from '../../logo-text.png'
import './LiqualitySwap.css'

class LiqualitySwap extends Component {
  constructor (props) {
    super(props)

    this.getCounterPartyLinkCard = this.getCounterPartyLinkCard.bind(this)
    this.getBackupLinkCard = this.getBackupLinkCard.bind(this)
    this.getConnectWallet = this.getConnectWallet.bind(this)
    this.state = this.getExpirationState()
    this.state = {
      currentTime: Date.now(),
      step: 'INITIATION'
    }
  }

  getStartingScreen () {
    return <SwapInitiation />
  }

  getBackupLinkCard () {
    const link = this.props.swap.link
    const skipCounterParty = this.props.swap.isPartyB || this.props.swap.agent.quote
    return <BackupLinkCard link={link} onNextClick={() => this.props.history.replace(skipCounterParty ? '/waiting' : '/counterPartyLink')} />
  }

  getCounterPartyLinkCard () {
    const link = generateLink(this.props.swap, true)
    return <CounterPartyLinkCard link={link} onNextClick={() => { this.props.history.replace('/waiting') }} />
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

  getConnectWallet (currentWallet) {
    const walletA = this.props.swap.wallets.a
    const walletB = this.props.swap.wallets.b
    let closeAction = () => {
      this.props.history.replace(this.props.swap.agent.quote ? '/offerConfirmation' : '/assetSelection')
    }
    if (currentWallet === 'b' && walletB.connected) {
      closeAction = () => { this.props.history.replace('/walletA') }
    } else if (currentWallet === 'a' && walletA.connected) {
      closeAction = () => {
        this.props.history.replace('/initiation')
        this.props.setStep(steps.INITIATION)
      }
    } else if (currentWallet === 'a') {
      closeAction = () => { this.props.history.replace('/walletB') }
    }
    return <WalletConnectPopup
      open
      id={currentWallet}
      currency={this.props.swap.assets[currentWallet].currency}
      walletChosen={this.props.swap.wallets[currentWallet].chosen}
      walletConnecting={this.props.swap.wallets[currentWallet].connecting}
      walletConnectingError={this.props.swap.wallets[currentWallet].connectingError}
      wallet={this.props.swap.wallets[currentWallet].type}
      chooseWallet={this.props.waitForWallet}
      connectWallet={this.props.waitForWalletInitialization}
      disconnectWallet={this.props.onWalletDisconnected}
      addresses={this.props.swap.wallets[currentWallet].addresses}
      walletConnected={this.props.swap.wallets[currentWallet].connected}
      handleClose={closeAction}
    />
  }

  render () { 
    return <div className='LiqualitySwap'>
      <div className='LiqualitySwap_header'>
        <div className="LiqualitySwap_how">
        <a href={APP_BASE_URL}><img className='LiqualitySwap_logo' src={LiqualityLogo} alt='Liquality Logo' /></a>
          <h2>How It Works</h2>
          </div>
        <SwapProgressStepper state={this.props.swap.step} />
      </div>
      <div>
      {this.props.expiration ? <div className="LiqualitySwap_topDetails"><TopDetails /></div> : null }
      </div>
       {/* {this.state.expiration ? <div className='ExpirationDetails_progress'>
          <div className='ExpirationDetails_progress_fill' style={{width: `${filled}%`}} />
        </div>
        : 'null'} */}
      <div className='LiqualitySwap_main'> 
      {/* <div className="LiqualitySwap_timeLeft">
        <div className="LiqualitySwap_activeTime">You have 4 hrs 23 min to complete this swap by 10:39pm</div>
      </div> */}
        <div className='LiqualitySwap_wave' />
        <div className="SwapRedemption_whiteBar">
        <p>Swap {this.props.assets.a.value.toFixed()} {cryptoassets[this.props.assets.a.currency].code} for {this.props.assets.b.value.toFixed()} {cryptoassets[this.props.assets.b.currency].code}</p>
      </div>
        <div className='LiqualitySwap_wrapper'>
          { window.location.hash === '#otcswap' && <Redirect to='/assetSelection' /> }
          <Route exact path='/' render={this.getStartingScreen.bind(this)} />
          <Route path='/initiation' component={SwapInitiation} />
          <Route path='/backupLink' render={this.getBackupLinkCard} />
          <Route path='/counterPartyLink' render={this.getCounterPartyLinkCard} />
          <Route path='/waiting' component={Waiting} />
          <Route path='/redeem' component={SwapRedemption} />
          <Route path='/completed' component={SwapCompleted} />
          <Route path='/refund' component={SwapRefund} />
          <Route path='/refunded' component={SwapRefunded} />
          <WalletPopups />
        </div>
      </div>
      <footer dangerouslySetInnerHTML={{__html: config.injectFooter}} />
      <ErrorModal open={this.props.error} error={this.props.error} onClose={this.props.clearError} />
    </div>
  }
}

LiqualitySwap.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  duration: PropTypes.number,
  expiration: PropTypes.number
}

export default LiqualitySwap
