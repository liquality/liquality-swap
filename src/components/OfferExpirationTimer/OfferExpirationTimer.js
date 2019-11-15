import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { shortenAddress } from '../../utils/address'

import './OfferExpirationTimer.css'

class OfferExpirationTimer extends Component {
  render () {
    const percentage = (this.props.currentTime - this.props.startTime) / (this.props.endTime - this.props.startTime) * 100
    const timeLeft = this.props.endTime - this.props.currentTime
    return <div class='OfferExpirationTimer'>
      <div class='OfferExpirationTimer_timeline'></div>
      <div class='OfferExpirationTimer_current' style={{background: '#2CD2CF', left: `${percentage}%`}}>{timeLeft}s</div>
    </div>
  }
}

OfferExpirationTimer.propTypes = {
  startTime: PropTypes.number,
  currentTime: PropTypes.number,
  endTime: PropTypes.number
}

OfferExpirationTimer.defaultProps = {
  startTime: 1000,
  currentTime: 1000,
  endTime: 1600
}

export default OfferExpirationTimer
