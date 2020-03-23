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
        <img src={this.props.complete ? TickIcon : Spinner} alt='status' />
        <div className='StatusMessage_message'>
          {this.props.completedMessage && this.props.complete ? this.props.completedMessage : this.props.message}
        </div>
      </div>
    )
  }
}

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  completedMessage: PropTypes.string,
  complete: PropTypes.bool
}

export default StatusMessage
