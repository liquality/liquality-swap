import React, { Component } from 'react'
import { Route } from 'react-router-dom'

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
    return <BackupLinkCard link={link} onNextClick={() => this.props.history.push(this.props.swap.isPartyB ? '/swap/waiting' : '/swap/counterPartyLink')} />
  }

  getCounterPartyLinkCard () {
    const currency = this.props.swap.assets.a.currency
    const initiationHash = this.props.swap.transactions.a.fund.hash
    const txLink = `${blockExplorerTxUrl[currency]}/${initiationHash}`
    const link = generateLink(this.props.swap, true)
    return <CounterPartyLinkCard link={link} transactionLink={txLink} onNextClick={() => this.props.history.push('/swap/waiting')} />
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
        <Route path='/swap/'>
          <div className='LiqualitySwap_wrapper'>
            <Route exact path='/swap/' component={SwapInitiation} />
            <Route path='/swap/backupLink' render={this.getBackupLinkCard} />
            <Route path='/swap/counterPartyLink' render={this.getCounterPartyLinkCard} />
            <Route path='/swap/waiting' render={this.getWaitingScreen} />
            <Route path='/swap/redeem' component={SwapRedemption} />
            <Route path='/swap/completed' component={SwapCompleted} />
            <Route path='/swap/refund' component={SwapRefund} />
          </div>
        </Route>
      </div>
    </div>
  }
}

export default LiqualitySwap
