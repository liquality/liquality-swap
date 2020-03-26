import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TickIcon from '../../icons/tick.svg'
import Spinner from '../../icons/spinner.svg'
import './StatusMessage.css'

class StatusMessage extends Component {
  render () {
    return (
      <div className={classNames('StatusMessage', {'StatusMessage_complete': this.props.complete})}>
        <div className='StatusMessage_wrapper'>
          <img src={this.props.complete ? TickIcon : Spinner} alt='status' />
          <div className='StatusMessage_right'>
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
