import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import SwapInitiation from '../SwapInitiation'
import CounterPartyLinkCard from '../../components/CounterPartyLinkCard/CounterPartyLinkCard'
import BackupLinkCard from '../../components/BackupLinkCard/BackupLinkCard'
import Button from '../../components/Button/Button'
import Modal from '@material-ui/core/Modal';
import Waiting from '../Waiting'
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
  }

  getBackupLinkCard () {
    const link = this.props.swap.link
    return <BackupLinkCard link={link} onNextClick={() => this.props.history.replace(this.props.swap.isPartyB ? '/waiting' : '/counterPartyLink')} />
  }

  getCounterPartyLinkCard () {
    const link = generateLink(this.props.swap, true)
    return <CounterPartyLinkCard link={link} onNextClick={() => { this.props.waitForSwapConfirmation() }} />
  }

  render () {
    return <div className='LiqualitySwap'>
      <div className='LiqualitySwap_bar' />
      <div className='LiqualitySwap_header'>
        <img className='LiqualitySwap_logo' src={LiqualityLogo} />
        <SwapProgressStepper state={this.props.swap.step} />
      </div>
      <div className='LiqualitySwap_main'>
        <div className='LiqualitySwap_wave' />
        <div className='LiqualitySwap_wrapper'>
          <Route exact path='/' component={SwapInitiation} />
          <Route path='/backupLink' render={this.getBackupLinkCard} />
          <Route path='/counterPartyLink' render={this.getCounterPartyLinkCard} />
          <Route path='/waiting' component={Waiting} />
          <Route path='/redeem' component={SwapRedemption} />
          <Route path='/completed' component={SwapCompleted} />
          <Route path='/refund' component={SwapRefund} />
        </div>
      </div>
      <footer dangerouslySetInnerHTML={{__html: config.injectFooter}} />
      {window.location.href.indexOf("challenge") > -1 &&
      <Modal open={true}>
        <div className='SwapChallengeModal'>
          <h4>Thanks to all of you who have participated in the Swap Challenge</h4>
          <h2>The Challenge is now complete</h2>
          <Button wide primary onClick={() => window.open("https://liquality.io", "_self")}>Back to home page</Button>
        </div>
      </Modal>}
      
    </div>
  }
}

export default LiqualitySwap
