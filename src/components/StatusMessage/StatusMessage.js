import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './StatusMessage.css'

class StatusMessage extends Component {
  render (props) {
    return (
      <div className={classNames('StatusMessage', {'StatusMessage_complete': this.props.complete})}>
        <div className='StatusMessage_wrapper'>
          {/* <div className="StatusMessage_spinningGradient">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div> */}
          <div className='StatusMessage_circle'>
          {/* { props.timer && <svg width='300' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg' className='StatusMessage_timer'>
      <g transform='translate(110,110)'>
        <g transform='rotate(-90)'>
          <circle r='100' className='StatusMessage_timer_progress' style={{
            animation: props.timer.current === props.timer.duration ? 'none' : `countdown ${props.timer.duration - 1}s linear 1 forwards`
          }} />
          <g className='StatusMessage_timer_pointer'>
            <circle cx='100' cy='0' r='6' className='StatusMessage_timer_pointer_c' style={{
              animation: props.timer.current === props.timer.duration ? 'none' : `pointer ${props.timer.duration - 1}s linear 1 forwards`
            }} />
          </g>
        </g>
      </g>
    </svg> }           */}
          <div className='StatusMessage_message'>{this.props.completedMessage && this.props.complete ? this.props.completedMessage : this.props.message}</div>
            {!this.props.complete && <div className='StatusMessage_estimate'>this will take ~{this.props.estimate.asMinutes()}min</div>}
          </div>
        </div>
      </div>
    )
  }
}

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  completedMessage: PropTypes.string,
  complete: PropTypes.bool,
  estimate: PropTypes.any,
  timer: PropTypes.shape({
    current: PropTypes.number,
    duration: PropTypes.number
  })
}

export default StatusMessage
