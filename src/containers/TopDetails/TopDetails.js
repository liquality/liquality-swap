import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getClaimExpiration } from '../../utils/expiration'
import { getExplorerLink } from '../../utils/transactions'

import './TopDetails.css'

class TopDetails extends Component {
  constructor (props) {
    super(props)
    this.state = this.getExpirationState()
  }

  getTransaction (party) {
    const tx = this.props.transactions[party].initiation
    if (!tx.hash) return null

    const asset = this.props.assets[party].currency
    const explorerLink = tx && getExplorerLink(tx, asset)
    tx.explorerLink = explorerLink
    return tx
  }

  getExpirationState () {
    const party = this.props.isPartyB ? 'b' : 'a'
    const expiration = getClaimExpiration(this.props.expiration, party)

    return {
      start: expiration.start,
      duration: expiration.duration,
      expiration: expiration.time,
      now: moment(),
      transactions: {
        a: this.getTransaction('a'),
        b: this.getTransaction('b')
      }
    }
  }

  componentDidMount () {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  tick () {
    this.setState(this.getExpirationState())
  }

  render () {
    const maxNow = this.state.now.isAfter(this.state.expiration) ? this.state.expiration : this.state.now
    const left = moment.duration(this.state.expiration.diff(maxNow))
    const total = this.state.duration
    const filled = (((total.asSeconds() - left.asSeconds()) / total.asSeconds()) * 100).toFixed(2)

    return <div className='TopDetails'>
      <div className='TopDetails_progress'>
        <div className='TopDetails_progress_fill' style={{width: `${filled}%`}} />
      </div>
      <div className='TopDetails_timeLeft'>
        You have {moment.utc(left.asMilliseconds()).format('HH:mm')}hours to complete this swap by {this.state.expiration.format('L LT')}
      </div>
    </div>
  }
}

TopDetails.propTypes = {
  isClaim: PropTypes.bool,
  startTime: PropTypes.number,
  endTime: PropTypes.number
}

export default TopDetails
