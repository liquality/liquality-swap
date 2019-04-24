import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AssetSelection from '../AssetSelection'
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
import SwapProgressStepper from '../../components/SwapProgressStepper/SwapProgressStepper'
import { generateLink } from '../../utils/app-links'
import config from '../../config'

import LiqualityLogo from '../../logo-text.png'
import './LiqualitySwap.css'

class LiqualitySwap extends Component {
  constructor (props) {
    super(props)

    this.getCounterPartyLinkCard = this.getCounterPartyLinkCard.bind(this)
    this.getBackupLinkCard = this.getBackupLinkCard.bind(this)
    this.getConnectWallet = this.getConnectWallet.bind(this)
  }

  getBackupLinkCard () {
    const link = this.props.swap.link
    return <BackupLinkCard link={link} onNextClick={() => this.props.history.replace(this.props.swap.isPartyB ? '/waiting' : '/counterPartyLink')} />
  }

  getCounterPartyLinkCard () {
    const link = generateLink(this.props.swap, true)
    return <CounterPartyLinkCard link={link} onNextClick={() => { this.props.waitForSwapConfirmation() }} />
  }

  getConnectWallet() {
    if (this.props.swap.wallets.b.connected && this.props.swap.wallets.a.connected) {
      this.props.history.replace('/initiation')
    }
    const currentWallet = this.props.swap.wallets.b.connected ? 'a' : 'b'
    let closeAction = () => { this.props.history.replace('/') }
    if (currentWallet === 'a') {
      closeAction = () => { this.props.onWalletDisconnected('b') }
    }
    return <WalletConnectPopup
      open={true}
      id={currentWallet}
      currency={this.props.swap.assets[currentWallet].currency}
      walletChosen={this.props.swap.wallets[currentWallet].chosen}
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
      <div className='LiqualitySwap_bar' />
      <div className='LiqualitySwap_header'>
        <img className='LiqualitySwap_logo' src={LiqualityLogo} alt='Liquality Logo' />
        <SwapProgressStepper state={this.props.swap.step} />
      </div>
      <div className='LiqualitySwap_main'>
        <div className='LiqualitySwap_wave' />
        <div className='LiqualitySwap_wrapper'>
          <Route exact path='/' component={this.props.swap.isPartyB ? SwapInitiation : AssetSelection} />
          <Route path='/wallets' render={this.getConnectWallet} />
          <Route path='/initiation' component={SwapInitiation} />
          <Route path='/backupLink' render={this.getBackupLinkCard} />
          <Route path='/counterPartyLink' render={this.getCounterPartyLinkCard} />
          <Route path='/waiting' component={Waiting} />
          <Route path='/redeem' component={SwapRedemption} />
          <Route path='/completed' component={SwapCompleted} />
          <Route path='/refund' component={SwapRefund} />
          <WalletPopups />
        </div>
      </div>
      <footer dangerouslySetInnerHTML={{__html: config.injectFooter}} />
      <ErrorModal open={this.props.error} error={this.props.error} onClose={this.props.clearError} />
    </div>
  }
}

export default LiqualitySwap
