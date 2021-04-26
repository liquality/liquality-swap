import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './StatusMessage.css'

class StatusMessage extends Component {
  render () {
    return (
      <div className={classNames('StatusMessage', {'StatusMessage_complete': this.props.complete})}>
        <div className='StatusMessage_wrapper'>
          <div className='StatusMessage_circle'>
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
  estimate: PropTypes.any
}

export default StatusMessage
