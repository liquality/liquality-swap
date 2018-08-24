import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

import SwapInitiation from '../SwapInitiation'
import SwapLinkCard from '../../components/SwapLinkCard/SwapLinkCard'
import SwapProgressStepper from '../../components/SwapProgressStepper/SwapProgressStepper'
import { steps } from '../../components/SwapProgressStepper/steps'
import { generateCounterPartyLink } from '../../utils/app-links'
import { transactionPaths as blockExplorerTxUrl } from '../../utils/block-explorers'

import LiqualityLogo from '../../logo.png'
import LiqualityText from '../../logo-text.png'
import './LiqualitySwap.css'

class LiqualitySwap extends Component {
  constructor (props) {
    super(props)
    this.getSwapLinkCard = this.getSwapLinkCard.bind(this)
  }

  getSwapLinkCard () {
    const currency = this.props.swap.assets.a.currency
    const initiationHash = this.props.swap.transactions.ours.fund.hash
    const txLink = `${blockExplorerTxUrl[currency]}/${initiationHash}`
    const link = generateCounterPartyLink(this.props.swap)
    return <SwapLinkCard link={link} transactionLink={txLink} />
  }

  render () {
    return <div className='LiqualitySwap'>
      <AppBar position='static'>
        <Toolbar>
          <img className='LiqualitySwap_logo' src={LiqualityLogo} /><img className='LiqualitySwap_logoText' src={LiqualityText} />
        </Toolbar>
      </AppBar>
      <Route path='/'>
        <div className='LiqualitySwap_main'>
          <SwapProgressStepper state={steps.INITATION} />
          <Route exact path='/' component={SwapInitiation} />
          <Route path='/link' render={this.getSwapLinkCard} />
        </div>
      </Route>
    </div>
  }
}

export default LiqualitySwap
