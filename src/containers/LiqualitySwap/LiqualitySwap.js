import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

import SwapInitiation from '../SwapInitiation'
import CounterPartyLinkCard from '../../components/CounterPartyLinkCard/CounterPartyLinkCard'
import BackupLinkCard from '../../components/BackupLinkCard/BackupLinkCard'
import Waiting from '../Waiting'
import SwapRedemption from '../SwapRedemption'
import SwapCompleted from '../SwapCompleted'
import SwapRefund from '../SwapRefund'
import SwapProgressStepper from '../../components/SwapProgressStepper/SwapProgressStepper'
import { generateLink } from '../../utils/app-links'
import { transactionPaths as blockExplorerTxUrl } from '../../utils/block-explorers'

import LiqualityLogo from '../../logo-text.png'
import './LiqualitySwap.css'

class LiqualitySwap extends Component {
  constructor (props) {
    super(props)
    this.getCounterPartyLinkCard = this.getCounterPartyLinkCard.bind(this)
    this.getBackupLinkCard = this.getBackupLinkCard.bind(this)
    this.getWaitingScreen = this.getWaitingScreen.bind(this)
  }

  getBackupLinkCard () {
    const link = generateLink(this.props.swap)
    return <BackupLinkCard link={link} onNextClick={() => this.props.history.push(this.props.swap.isPartyB ? '/waiting' : '/counterPartyLink')} />
  }

  getCounterPartyLinkCard () {
    const currency = this.props.swap.assets.a.currency
    const initiationHash = this.props.swap.transactions.a.fund.hash
    const txLink = `${blockExplorerTxUrl[currency]}/${initiationHash}`
    const link = generateLink(this.props.swap, true)
    return <CounterPartyLinkCard link={link} transactionLink={txLink} onNextClick={() => this.props.history.push('/waiting')} />
  }

  getWaitingScreen () {
    if (this.props.swap.isPartyB) {
      this.props.waitForSwapClaim()
    } else {
      this.props.waitForSwapConfirmation()
    }
    return <Waiting />
  }

  render () {
    return <div className='LiqualitySwap'>
      <div class='LiqualitySwap_bar' />
      <div class='LiqualitySwap_header'>
        <img class='LiqualitySwap_logo' src={LiqualityLogo} />
        <SwapProgressStepper state={this.props.swap.step} />
      </div>
      <div className='LiqualitySwap_main'>
        <div class='LiqualitySwap_wave' />
        <Route path='/'>
          <div className='LiqualitySwap_wrapper'>
            <Route exact path='/' component={SwapInitiation} />
            <Route path='/backupLink' render={this.getBackupLinkCard} />
            <Route path='/counterPartyLink' render={this.getCounterPartyLinkCard} />
            <Route path='/waiting' render={this.getWaitingScreen} />
            <Route path='/redeem' component={SwapRedemption} />
            <Route path='/completed' component={SwapCompleted} />
            <Route path='/refund' component={SwapRefund} />
          </div>
        </Route>
      </div>
    </div>
  }
}

export default LiqualitySwap
