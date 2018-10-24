import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import { expirationDurations, getPartyExpiration, generateExpiration } from '../../utils/expiration'

import './ExpirationDetails.css'

class ExpirationDetails extends Component {
  constructor (props) {
    super(props)
    this.state = this.getExpirationState()
  }

  getExpirationState () {
    let expiration
    let duration

    if (this.props.isClaim) {
      expiration = getPartyExpiration(this.props.expiration, this.props.isPartyB ? 'a' : 'b')
      duration = moment.duration(expiration.diff(moment()))
    } else {
      if (this.props.isPartyB) {
        expiration = this.props.expiration
        duration = moment.duration(expiration.diff(moment()))
      } else {
        expiration = generateExpiration()
        duration = expirationDurations.a
      }
    }

    return {
      duration,
      expiration
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
    return <Grid container xs={12} className='expiration'>
      <Grid item xs={12} sm={6}>
        <Typography component='p' align='center'><strong>OFFER ACTIVE</strong> {this.state.duration.hours()} Hours {this.state.duration.minutes()} Minutes</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography component='p' align='center'><strong>EXPIRATION</strong> {this.state.expiration.format('D/M/Y HH:mm')}</Typography>
      </Grid>
    </Grid>
  }
}

ExpirationDetails.propTypes = {
  expiration: PropTypes.object,
  isClaim: PropTypes.bool.isRequired,
  isPartyB: PropTypes.bool.isRequired
}

export default ExpirationDetails
