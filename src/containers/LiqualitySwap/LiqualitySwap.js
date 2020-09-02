import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

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
      { this.props.swap.assetSelector.open && <div className='LiqualitySwap_blur' /> }
      <div className='LiqualitySwap_bar' />
      <div className='LiqualitySwap_header'>
        <a href={APP_BASE_URL}><img className='LiqualitySwap_logo' src={LiqualityLogo} alt='Liquality Logo' /></a>
        { this.props.swap.step && <SwapProgressStepper state={this.props.swap.step} /> }
      </div>
      <div className='LiqualitySwap_main'>
        <div className='LiqualitySwap_wave' />
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

export default LiqualitySwap
