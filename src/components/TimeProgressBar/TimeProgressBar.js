import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'

import './TimeProgressBar.css'

class TimeProgressBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: Date.now()
    }
  }

  tick () {
    this.setState({
      currentTime: Math.min(Date.now(), this.props.endTime)
    })
  }

  componentDidMount () {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const percentage = (this.state.currentTime - this.props.startTime) / (this.props.endTime - this.props.startTime) * 100
    const timeLeft = this.props.endTime - this.state.currentTime
    const duration = moment.duration(timeLeft)
    return <div className='progress TimeProgressBar'>
      <span>Quote Expires In {duration.hours() > 0 ? `${duration.hours()} Hrs,` : ''} {duration.minutes() > 0 ? `${duration.minutes()} Mins,` : ''} {duration.seconds()} Secs</span>
      <div
        className={classNames('progress-bar', { 'bg-danger': percentage > 75, 'bg-info': percentage < 75 })}
        role='progressbar'
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin='0' aria-valuemax='100' />
    </div>
  }
}

TimeProgressBar.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number
}

export default TimeProgressBar
