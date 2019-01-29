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
    return <div class='InitiatorExpirationInfo'>
      <div class='row justify-content-center'>
        <div><img src={LockIcon} class='InitiatorExpirationInfo_icon' />Funds Locked {expirationDurations.a.asHours().toFixed(2)} HRS</div>
        <div><img src={ClockIcon} class='InitiatorExpirationInfo_icon' />Offer Active {expirationDurations.b.asHours().toFixed(2)} HRS</div>
        <div><strong>~ {this.state.expiration.format('D/M/YY HH:mm')}</strong></div>
      </div>
    </div>
  }
}

export default InitiatorExpirationInfo
