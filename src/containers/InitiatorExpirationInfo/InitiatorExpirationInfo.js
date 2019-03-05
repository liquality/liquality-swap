import React, { Component } from 'react'
import { generateExpiration, expirationDurations } from '../../utils/expiration'

import LockIcon from '../../icons/lock.svg'
import ClockIcon from '../../icons/clock.svg'
import './InitiatorExpirationInfo.css'

class InitiatorExpirationInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expiration: generateExpiration()
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({
        expiration: generateExpiration()
      })
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return <div className='InitiatorExpirationInfo'>
      <div className='row justify-content-center'>
        <div><img src={LockIcon} className='InitiatorExpirationInfo_icon' alt='Lock Icon' />Funds Locked {expirationDurations.a.asHours().toFixed(2)} HRS</div>
        <div><img src={ClockIcon} className='InitiatorExpirationInfo_icon' alt='Clock Icon' />Offer Active {expirationDurations.b.asHours().toFixed(2)} HRS</div>
        <div><strong>~ {this.state.expiration.format('L LT')}</strong></div>
      </div>
    </div>
  }
}

export default InitiatorExpirationInfo
