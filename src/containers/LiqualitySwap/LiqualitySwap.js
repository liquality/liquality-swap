import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

import SwapInitiation from '../SwapInitiation'
import SwapLinkCard from '../../components/SwapLinkCard/SwapLinkCard'
import SwapProgressStepper from '../../components/SwapProgressStepper/SwapProgressStepper'
import { steps } from '../../components/SwapProgressStepper/steps'

import LiqualityLogo from '../../logo.png'
import LiqualityText from '../../logo-text.png'
import './LiqualitySwap.css'

class LiqualitySwap extends Component {
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
          <Route path='/link' component={SwapLinkCard} />
        </div>
      </Route>
    </div>
  }
}

export default LiqualitySwap
